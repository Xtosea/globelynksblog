import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function POST(req) {
  try {
    // 🔐 Get token
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

    // 📦 Parse body
    const body = await req.json();

    // 🔌 Connect DB
    await connectDB();

    // ✍️ Create post
    const post = await Post.create(body);

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Unauthorized or server error" },
      { status: 401 }
    );
  }
}