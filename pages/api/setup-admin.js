// pages/api/setup-admin.js (temporary, run once)
import User from "../../models/User";
import { connectDB } from "../../lib/mongodb";

export default async function handler(req, res) {
  await connectDB();

  // Check if admin already exists
  const existingAdmin = await User.findOne({ email: "admin@globelynks.com" });
  if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

  const user = await User.create({
    name: "Admin",
    email: "admin@globelynks.com",
    password: "password123",
    role: "admin",
  });

  res.status(201).json(user);
}