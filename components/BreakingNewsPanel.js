"use client";

import { useEffect, useState } from "react";

export default function BreakingNewsPanel({ onSelect }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/api/rss/fetch")
      .then(res => res.json())
      .then(data => setNews(data.news));
  }, []);

  return (
    <div>
      <h2>Suggested Breaking News</h2>
      <ul>
        {news.map((item, i) => (
          <li key={i} className="mb-4 border-b pb-2">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold"
            >
              {item.title}
            </a>
            <p>{item.snippet}</p>
            <small>
              {item.source} | {new Date(item.pubDate).toLocaleString()}
            </small>
            <br />
            <button
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
              onClick={() => onSelect(item)}
            >
              Create Article
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}