import User from "../../models/User";
import { connectDB } from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: "xto1971@gmail.com" });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const user = await User.create({
      name: "Admin",
      email: "xto1971@gmail.com",
      password: "123456", // will be hashed automatically by User model
      role: "admin",
    });

    res.status(201).json({ message: "Admin created successfully", user });
  } catch (err) {
    console.error("setup-admin error:", err);
    res.status(500).json({ message: "Server error" });
  }
}