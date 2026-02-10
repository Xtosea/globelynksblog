// pages/api/seed-admin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { connectDB } from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: "admin@globelynks.com" });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash("password123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "xto1971@gmail.com",
      password: 123456,
      role: "admin",
    });

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}