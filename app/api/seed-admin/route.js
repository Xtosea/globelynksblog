import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req, res) {
  try {
    await connectDB();
    console.log("DB connected");

    const existingAdmin = await User.findOne({
      email: "admin@globelynks.com",
    });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@globelynks.com",
      password: "password123", // ✅ plain text
      role: "admin",
    });

    return res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Error in seed-admin:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}