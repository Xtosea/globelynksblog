import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function POST(req) {
  try {
    // 🔐 Get token from headers
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    // ✅ Verify JWT
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

    // If JWT fails, unauthorized
    if (err.name === "JsonWebTokenError") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}