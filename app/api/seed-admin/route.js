export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { connectDB } from "../../../lib/mongodb"
import User from "../../../models/User"

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

    await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD, // plain text
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