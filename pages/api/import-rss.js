// /pages/api/import-rss.js
import RSSParser from "rss-parser";
import { connectDB } from "@/lib/mongodb"; // Make sure connectDB is exported correctly
import Article from "@/models/Article";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    const parser = new RSSParser();

    // 🔴 Replace with your real RSS feed URL
    const RSS_URL = "https://feeds.bbci.co.uk/news/rss.xml";

    console.log("📡 Fetching RSS from:", RSS_URL);
    const feed = await parser.parseURL(RSS_URL);

    console.log("📰 Feed title:", feed.title);
    console.log("🧾 Number of items in feed:", feed.items.length);

    let importedCount = 0;

    for (const item of feed.items) {
      // Skip duplicates by title
      const exists = await Article.findOne({ title: item.title });
      if (exists) continue;

      await Article.create({
        title: item.title,
        content: item.content || item.contentSnippet || "",
        category: item.categories?.[0] || "General",
        image: item.enclosure?.url || "",
        views: 0,
        published: true, // Important for trending API
        createdAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        source: item.link || "RSS Feed", // ✅ Required field fix
      });

      importedCount++;
      console.log("✅ Imported:", item.title);
    }

    return res.status(200).json({
      success: true,
      imported: importedCount,
      totalFeedItems: feed.items.length,
    });

  } catch (error) {
    console.error("❌ RSS Import Error:", error);
    return res.status(500).json({
      error: "Failed to import RSS",
      details: error.message
    });
  }
}