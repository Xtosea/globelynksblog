import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export const runtime = "nodejs"; // important for Node APIs

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await cloudinary.uploader.upload_stream({ resource_type: "image" }, (err, res) => {
      if (err) throw err;
      return res;
    });

    // Upload using upload_stream
    const streamUpload = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "posts" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(buffer);
      });

    const uploadResult = await streamUpload(buffer);

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}