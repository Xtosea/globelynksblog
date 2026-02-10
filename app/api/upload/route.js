import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // we handle parsing manually
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: "Form parse error" });

    const file = files.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: "blog-images",
      });
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Cloudinary upload failed" });
    } finally {
      // Clean up temp file
      fs.unlink(file.filepath, () => {});
    }
  });
}