// /pages/api/import-rss.js
import RSSParser from "rss-parser";
import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";

const RSS_FEEDS = [
  { url: "https://techcrunch.com/feed/", source: "TechCrunch" },
  { url: "http://feeds.bbci.co.uk/news/rss.xml", source: "BBC News" },
  { url: "http://rss.cnn.com/rss/edition.rss", source: "CNN" },
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed. Use POST." });
  }

  try {
    await connectDB();
    const importedArticles = [];

    const parser = new RSSParser();

    for (const feed of RSS_FEEDS) {
      console.log("Fetching feed:", feed.url);
      const rss = await parser.parseURL(feed.url);

      for (const item of rss.items) {
        // Skip duplicates by title
        const exists = await Article.findOne({ title: item.title });
        if (exists) continue;

        const article = await Article.create({
          title: item.title,
          content: item.content || item.contentSnippet || "",
          category: item.categories?.[0] || "General",
          image: item.enclosure?.url || "",
          views: 0,
          published: true,
          createdAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          source: feed.source,
          originalUrl: item.link || "",
        });

        importedArticles.push(article.title);
        console.log(`Imported: ${item.title} from ${feed.source}`);
      }
    }

    return res.status(200).json({
      message: "RSS import complete!",
      imported: importedArticles.length,
      titles: importedArticles,
    });
  } catch (err) {
    console.error("RSS import error:", err);
    return res.status(500).json({ message: "Error importing RSS feeds", error: err.message });
  }
}