import { connectDB } from "../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  console.log("Seed admin route hit");

  try {
    await connectDB();
    console.log("DB connected");

    // Only create admin if it doesn't exist
    const existingAdmin = await User.findOne({ email: "admin@globelynks.com" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Admin",
      email: "xto1971@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (err) {
    console.error("Error in seed-admin:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}