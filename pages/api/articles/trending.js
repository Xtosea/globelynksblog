import { connectDB } from '@/lib/mongodb';
import Article from "@/models/Article";

export default async function handler(req, res) {
  try {
    await connectDB();  // <-- use connectDB, not dbConnect

    const topArticles = await Article.find({ published: true })
      .sort({ views: -1 })
      .limit(10);

    const categoryCount = await Article.aggregate([
      { $match: { published: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({ topArticles, categoryCount });
  } catch (err) {
    console.error("Error fetching trending articles:", err);
    res.status(500).json({ error: "Failed to fetch trending articles" });
  }
}