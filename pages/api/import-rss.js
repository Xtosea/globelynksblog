import RSSParser from "rss-parser";
import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const parser = new RSSParser();

    // 🔴 Replace with your real RSS feed
    const RSS_URL = "https://feeds.bbci.co.uk/news/rss.xml";

    console.log("Fetching RSS...");

    const feed = await parser.parseURL(RSS_URL);

    let importedCount = 0;

    for (const item of feed.items) {
      const exists = await Article.findOne({ title: item.title });
      if (exists) continue;

      await Article.create({
        title: item.title,
        content: item.content || item.contentSnippet || "",
        category: item.categories?.[0] || "General",
        image: item.enclosure?.url || "",
        views: 0,
        published: true,
        createdAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      });

      importedCount++;
    }

    return res.status(200).json({
      success: true,
      imported: importedCount,
      totalFeedItems: feed.items.length,
    });

  } catch (error) {
    console.error("RSS Import Error:", error);
    return res.status(500).json({ error: "Failed to import RSS" });
  }
}