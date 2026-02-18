// pages/api/seed-admin.js
import { connectDB } from '@/lib/mongodb'; // adjust path if needed
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  try {
    // Check if admin already exists
    const existing = await User.findOne({ email: "preciousikelegbe@gmail.com" });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Create admin
    const admin = new User({
      email: "preciousikelegbe@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}z