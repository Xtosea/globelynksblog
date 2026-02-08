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

    // ✅ Verify token
    jwt.verify(token, process.env.JWT_SECRET);

    // 📦 Parse request body
    const body = await req.json();

    // 🔌 Connect to MongoDB
    await connectDB();

    // ✍️ Create new post
    const post = await Post.create(body);

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error(err);

    // Distinguish unauthorized vs server errors
    const status = err.name === "JsonWebTokenError" ? 401 : 500;
    const message = status === 401 ? "Unauthorized" : "Server error";

    return NextResponse.json({ message }, { status });
  }
}