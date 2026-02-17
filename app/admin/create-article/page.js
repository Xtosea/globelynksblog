"use client";
import { useState } from "react";
import BreakingNewsPanel from "@/components/BreakingNewsPanel";

export default function CreateArticle() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleSelectNews(selectedItems) {
    const prepared = selectedItems.map(item => ({
      title: item.title,
      content: item.snippet + "\n\n[Write your original content here]",
      source: item.source,
      category: item.category,
      tags: [],
      scheduledDate: new Date().toISOString(),
    }));
    setArticles(prepared);
    setCurrentIndex(0);
  }

  function handleChangeField(field, value) {
    const updated = [...articles];
    updated[currentIndex][field] = value;
    setArticles(updated);
  }

  function handleNext() {
    if (currentIndex < articles.length - 1) setCurrentIndex(currentIndex + 1);
  }

  function handlePrev() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  function handlePublish() {
    // Call your API to save all articles
    console.log("Publishing articles:", articles);
    alert(`Ready to publish ${articles.length} articles!`);
  }

  if (articles.length === 0) {
    return <BreakingNewsPanel onSelect={handleSelectNews} />;
  }

  const article = articles[currentIndex];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Articles ({currentIndex + 1}/{articles.length})</h1>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border mb-2"
        value={article.title}
        onChange={(e) => handleChangeField("title", e.target.value)}
      />

      <textarea
        placeholder="Content"
        className="w-full p-2 border h-40 mb-2"
        value={article.content}
        onChange={(e) => handleChangeField("content", e.target.value)}
      />

      <input
        type="text"
        placeholder="Source"
        className="w-full p-2 border mb-2"
        value={article.source}
        onChange={(e) => handleChangeField("source", e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        className="w-full p-2 border mb-2"
        value={article.category}
        onChange={(e) => handleChangeField("category", e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-2 border mb-2"
        value={article.tags.join(", ")}
        onChange={(e) => handleChangeField("tags", e.target.value.split(","))}
      />

      <input
        type="datetime-local"
        className="w-full p-2 border mb-2"
        value={article.scheduledDate.slice(0,16)}
        onChange={(e) => handleChangeField("scheduledDate", e.target.value)}
      />

      <div className="flex justify-between mt-2">
        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={handlePrev}>Prev</button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={handleNext}>Next</button>
      </div>

      <button
        onClick={handlePublish}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Publish All Articles
      </button>
    </div>
  );
}