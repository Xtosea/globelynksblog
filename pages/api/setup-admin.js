// pages/api/setup-admin.js
import User from "../../models/User";
import { connectDB } from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: "admin@globelynks.com" });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const user = await User.create({
      name: "Admin",
      email: "admin@globelynks.com",
      password: "password123",
      role: "admin",
    });

    res.status(201).json({ message: "Admin created successfully", user });
  } catch (err) {
    console.error("setup-admin ERROR:", err); // 👈 log full error
    res.status(500).json({ message: "Server error", error: err.message }); // show real error in response
  }
}