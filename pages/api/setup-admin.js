// pages/api/setup-admin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in environment variables");
}

// Cache connection for Vercel serverless
let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: "Globeblog1" });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Define User schema locally to avoid Turbopack issue
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// API handler
export default async function handler(req, res) {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: "admin@globelynks.com" });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const user = await User.create({
      name: "Admin",
      email: "admin@globelynks.com",
      password: "password123",
      role: "admin",
    });

    res.status(201).json({ message: "Admin created successfully", user });
  } catch (err) {
    console.error("setup-admin ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}