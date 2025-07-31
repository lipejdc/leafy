import { toast } from "sonner";
import * as styles from "./styles";
import { useState } from "react";

const fertiliserSeasons = ["Spring", "Summer", "Autumn", "Winter"];

// --- Image validation helper ---
function validateImageFile(file) {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    toast.error("Only JPG, PNG, GIF, or WEBP images are allowed.");
    return false;
  }
  if (file.size > maxSize) {
    toast.error("Image must be smaller than 5MB.");
    return false;
  }
  return true;
}

export default function Form({ onSubmit, initialValues = {} }) {
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.fertiliserSeason = formData.getAll("fertiliserSeason");

    // Custom validation: at least one fertiliserSeason checkbox checked
    if (data.fertiliserSeason.length === 0) {
      toast.error("Please select at least one fertiliser season.", {
        position: "top-center",
      });
      setUploading(false);
      return;
    }

    let imageUrl = initialValues.imageUrl || "";

    // Upload image if a new file is selected
    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        const resultJson = await res.json();
        if (res.ok) {
          imageUrl = resultJson.url;
        } else {
          toast.error(resultJson.error || "Image upload failed");
          setUploading(false);
          return;
        }
      } catch (err) {
        toast.error("Image upload failed");
        setUploading(false);
        return;
      }
    }

    // If no image is available, show error
    if (!imageUrl) {
      toast.error("Please upload an image.", {
        position: "top-center",
      });
      setUploading(false);
      return;
    }

    // Validate imageUrl (basic check)
    try {
      new URL(imageUrl);
    } catch {
      toast.error("Please upload a valid image.", {
        position: "top-center",
      });
      setUploading(false);
      return;
    }

    data.imageUrl = imageUrl;
    setUploading(false);
    onSubmit(data);
  }

  return (
    <>
      <styles.FormContainer onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initialValues.name || ""}
        />

        <label htmlFor="botanicalName">Botanical Name</label>
        <input
          id="botanicalName"
          name="botanicalName"
          type="text"
          required
          defaultValue={initialValues.botanicalName || ""}
        />

        <label htmlFor="imageFile">Upload Image</label>
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) {
              setImageFile(null);
              setPreviewUrl(null);
              return;
            }
            if (!validateImageFile(file)) {
              setImageFile(null);
              setPreviewUrl(null);
              e.target.value = "";
              return;
            }
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
          }}
          disabled={uploading}
        />
        {uploading && <p>Uploading image...</p>}

        {previewUrl && (
          <styles.PreviewWrapper>
            <styles.PreviewImg src={previewUrl} alt="Preview" />
            <styles.CloseButton
              type="button"
              onClick={() => {
                setPreviewUrl(null);
                setImageFile(null);
                document.getElementById("imageFile").value = "";
              }}
              aria-label="Remove image"
            >
              ×
            </styles.CloseButton>
          </styles.PreviewWrapper>
        )}

        <label htmlFor="waterNeed">Water Need</label>
        <select
          id="waterNeed"
          name="waterNeed"
          required
          defaultValue={initialValues.waterNeed || ""}
        >
          <option value="">Select water need</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label htmlFor="lightNeed">Light Need</label>
        <select
          id="lightNeed"
          name="lightNeed"
          required
          defaultValue={initialValues.lightNeed || ""}
        >
          <option value="">Select light need</option>
          <option value="Full Sun">Full Sun</option>
          <option value="Partial Shade">Partial Shade</option>
          <option value="Shade">Shade</option>
        </select>

        <label>Fertiliser Season</label>
        <div>
          {fertiliserSeasons.map((season) => (
            <label key={season} style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                name="fertiliserSeason"
                value={season}
                defaultChecked={initialValues.fertiliserSeason?.includes(
                  season
                )}
              />
              {season}
            </label>
          ))}
        </div>

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="5"
          required
          defaultValue={initialValues.description || ""}
        ></textarea>

        <button type="submit">Submit</button>
      </styles.FormContainer>
    </>
  );
}
