// pages/api/articles/[identifier].js
import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";

export default async function handler(req, res) {
  const { identifier } = req.query;

  try {
    await connectDB(); // connect to MongoDB

    // Fetch article by _id or slug
    const article = await Article.findOne({
      $or: [{ _id: identifier }, { slug: identifier }],
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (err) {
    console.error("Error fetching article:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}