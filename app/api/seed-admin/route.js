// pages/api/seed-admin.js
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed. Use POST." });
  }

  await dbConnect();

  const existing = await User.findOne({ email: "preciousikelegbe@gmail.com" });
  if (existing) return res.status(400).json({ message: "Admin already exists" });

  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = new User({
    email: "preciousikelegbe@gmail.com",
    password: hashedPassword,
    role: "admin",
  });

  await admin.save();

  res.status(201).json({ message: "Admin created successfully" });
}