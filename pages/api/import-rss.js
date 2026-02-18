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
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const parser = new RSSParser();
    let importedCount = 0;

    for (const feedInfo of RSS_FEEDS) {
      console.log(`Fetching feed: ${feedInfo.url}`);
      try {
        const feed = await parser.parseURL(feedInfo.url);

        for (const item of feed.items) {
          const exists = await Article.findOne({ title: item.title });
          if (exists) continue;

          await Article.create({
            title: item.title,
            content: item.content || item.contentSnippet || "",
            category: item.categories?.[0] || "General",
            image: item.enclosure?.url || "",
            source: feedInfo.source,
            originalUrl: item.link || "",
            views: 0,
            published: true,
            createdAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          });

          importedCount++;
          console.log(`Imported: ${item.title} from ${feedInfo.source}`);
        }
      } catch (err) {
        console.error(`Error importing feed ${feedInfo.url}:`, err);
      }
    }

    res.status(200).json({ message: "RSS import complete", imported: importedCount });
  } catch (err) {
    console.error("Error in RSS import API:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}