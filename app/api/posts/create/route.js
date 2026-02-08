import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function POST(req) {
  try {
    // 🔐 Get token from Authorization header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    // ✅ Verify JWT
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // 📦 Parse request body
    const body = await req.json();
    const { title, slug, excerpt, content, image, category, author } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { message: "Title, slug, excerpt, and content are required" },
        { status: 400 }
      );
    }

    // 🔌 Connect to MongoDB
    await connectDB();

    // ✍️ Create post
    const post = await Post.create({
      title,
      slug,
      excerpt,
      content,
      image: image || "/og.png",
      category,
      author,
      publishedAt: new Date()
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("Create post error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}