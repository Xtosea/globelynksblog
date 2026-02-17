import mongoose from "mongoose";

const MONGODB_URI = import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

      const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedPost) return res.status(404).json({ message: 'Post not found' });

      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: "Globeblog1" }) // ✅ just this, no useNewUrlParser/useUnifiedTopology
      .then((mongoose) => {
        console.log("MongoDB connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}