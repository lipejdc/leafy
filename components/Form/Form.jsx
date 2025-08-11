import { toast } from "sonner";
import { FormContainer, PreviewWrapper, PreviewImg, CloseButton } from "./styles";
import { useState } from "react";
import WaterNeedPicker from "../WaterNeedPicker/WaterNeedPicker";
import LightNeedPicker from "../LightNeedPicker/LightNeedPicker";

const fertiliserSeasons = ["Spring", "Summer", "Autumn", "Winter"];

export default function Form({ onSubmit, initialValues = {} }) {
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialValues.imageUrl || "");
  const [waterNeed, setWaterNeed] = useState(initialValues.waterNeed || "");
  const [lightNeed, setLightNeed] = useState(initialValues.lightNeed || "");

  function validateImageFile(file) {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

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

  async function handleSubmit(event) {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.fertiliserSeason = formData.getAll("fertiliserSeason");

    if (data.fertiliserSeason.length === 0) {
      toast.error("Please select at least one fertiliser season.");
      setUploading(false);
      return;
    }

    let imageUrl = initialValues.imageUrl || "";

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
      } catch {
        toast.error("Image upload failed");
        setUploading(false);
        return;
      }
    }

    if (!imageUrl) {
      toast.error("Please upload an image.");
      setUploading(false);
      return;
    }

    data.imageUrl = imageUrl;
    data.waterNeed = waterNeed;
    data.lightNeed = lightNeed;

    setUploading(false);
    onSubmit(data);
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
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
            setPreviewUrl("");
            return;
          }
          if (!validateImageFile(file)) {
            setImageFile(null);
            setPreviewUrl("");
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
        <PreviewWrapper>
          <PreviewImg src={previewUrl} alt="Preview" />
          <CloseButton
            type="button"
            onClick={() => {
              setPreviewUrl("");
              setImageFile(null);
              document.getElementById("imageFile").value = "";
            }}
            aria-label="Remove image"
          >
            ×
          </CloseButton>
        </PreviewWrapper>
      )}

      <label>Water Need</label>
      <WaterNeedPicker value={waterNeed} onChange={setWaterNeed} />

      <label>Light Need</label>
      <LightNeedPicker value={lightNeed} onChange={setLightNeed} />

      <label>Fertiliser Season</label>
      <div>
        {fertiliserSeasons.map((season) => (
          <label key={season} style={{ marginRight: "1rem" }}>
            <input
              type="checkbox"
              name="fertiliserSeason"
              value={season}
              defaultChecked={initialValues.fertiliserSeason?.includes(season)}
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
    </FormContainer>
  );
}
