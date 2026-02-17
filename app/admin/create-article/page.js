"use client";

import { useState } from "react";
import BreakingNewsPanel from "@/components/BreakingNewsPanel";

export default function CreateArticle() {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    source: "",
  });

  function handleSelectNews(item) {
    setArticle({
      title: item.title,
      content: item.snippet + "\n\n[Write your original content here]",
      source: item.source,
    });
  }

  function handlePublish() {
    // Call your API to save the article
    console.log("Publishing article:", article);
    alert("Article ready to be published!"); // Replace with real API call
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Article</h1>

      <BreakingNewsPanel onSelect={handleSelectNews} />

      <div className="mt-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border mb-2"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border h-40 mb-2"
          value={article.content}
          onChange={(e) => setArticle({ ...article, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Source"
          className="w-full p-2 border mb-2"
          value={article.source}
          onChange={(e) => setArticle({ ...article, source: e.target.value })}
        />

        <button
          onClick={handlePublish}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Publish Article
        </button>
      </div>
    </div>
  );
}