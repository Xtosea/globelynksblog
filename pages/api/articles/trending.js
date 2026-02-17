import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export default async function handler(req, res) {
  await dbConnect();

  const topArticles = await Article.find({ published: true })
    .sort({ views: -1 })
    .limit(10);

  const categoryCount = await Article.aggregate([
    { $match: { published: true } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json({ topArticles, categoryCount });
}