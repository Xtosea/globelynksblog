import { NextResponse } from "next/server"
import { connectDB } from "../../../lib/mongodb"
import User from "../../../models/User"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    await connectDB()

    const adminExists = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    })

    if (adminExists) {
      return NextResponse.json({
        message: "Admin already exists",
      })
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    )

    await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    })

    return NextResponse.json({
      message: "Admin created successfully",
    })
  } catch (error) {
    console.error("Seed admin error:", error)
    return NextResponse.json(
      { error: "Failed to seed admin" },
      { status: 500 }
    )
  }
}