import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(500).json({ error: "Error parsing the file" });
    }

    console.log("Files object:", files);

    // FIX: files.file is an array
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.mimetype)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid file type. Only JPG, PNG, GIF, or WEBP images are allowed.",
        });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return res
        .status(400)
        .json({ error: "File is too large. Max size is 5MB." });
    }

    console.log("File path:", file.filepath || file.path);

    try {
      const result = await cloudinary.uploader.upload(
        file.filepath || file.path,
        {
          folder: "leafy",
        }
      );
      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).json({ error: error.message });
    }
  });
}
