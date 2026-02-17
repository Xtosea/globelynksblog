import Parser from "rss-parser";

const parser = new Parser();

export default async function handler(req, res) {
  const feeds = [
    "https://feeds.bbci.co.uk/news/politics/rss.xml",
    "https://www.reutersagency.com/feed/?best-topics=politics",
    // Add more feeds here
  ];

  try {
    let allItems = [];

    for (let feedUrl of feeds) {
      const feed = await parser.parseURL(feedUrl);
      const items = feed.items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: feed.title,
        snippet: item.contentSnippet,
      }));

      allItems = allItems.concat(items);
    }

    // Sort by latest
    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    res.status(200).json({ news: allItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch RSS feeds" });
  }
}