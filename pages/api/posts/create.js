import jwt from "jsonwebtoken"
import { connectDB } from "../../../lib/mongodb"
import Post from "../../../models/Post"

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()

  const token = req.headers.authorization?.split(" ")[1]

  try {
    jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({ message: "Unauthorized" })
  }

  await connectDB()
  const post = await Post.create(req.body)

  res.status(201).json(post)
}