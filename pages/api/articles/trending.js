import { connectDB } from '@/lib/mongodb';
import Article from "@/models/Article";

import Parser from "rss-parser"

export default async function handler(req, res) {
  try {
    const parser = new Parser({
      customFields: {
        item: [
          ["media:content", "mediaContent"],
          ["media:thumbnail", "mediaThumbnail"],
          ["content:encoded", "contentEncoded"]
        ]
      }
    })

    const feed = await parser.parseURL("YOUR_RSS_FEED_URL")

    const topArticles = feed.items.map((item) => ({
      title: item.title,
      content:
        item.contentSnippet ||
        item.contentEncoded ||
        item.content ||
        "",
      originalUrl: item.link,
      source: feed.title,
      pubDate: item.pubDate,

      // 🔥 IMAGE EXTRACTION FIX
      image:
        item.enclosure?.url ||
        item.mediaContent?.url ||
        item.mediaThumbnail?.url ||
        (item.contentEncoded?.match(/<img.*?src="(.*?)"/)?.[1]) ||
        null
    }))

    res.status(200).json({ topArticles })
  } catch (err) {
    console.error("RSS fetch error:", err)
    res.status(500).json({ error: "Failed to fetch RSS feed" })
  }
}