import { dbConnect } from "@/lib/mongodb";
import Article from "@/models/Article";

export default async function handler(req, res) {
  const { identifier } = req.query;

  await dbConnect();

  let article = null;

  // If it's MongoDB ObjectId
  if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
    article = await Article.findById(identifier);
  }

  // If not found, try slug
  if (!article) {
    article = await Article.findOne({ slug: identifier });
  }

  if (!article) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(article);
}