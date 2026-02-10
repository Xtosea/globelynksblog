import { connectDB } from "../../../lib/mongodb"
import Post from "../../../models/Post"

export default async function handler(req, res) {
  const { slug } = req.query

  await connectDB()
  const post = await Post.findOne({ slug })

  if (!post) return res.status(404).json({ message: "Post not found" })

  res.status(200).json(post)
}