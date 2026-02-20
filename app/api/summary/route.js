"use client"
import { useState } from "react"

export default function Publisher() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    excerpt: "",
  })

  const [summaryLoading, setSummaryLoading] = useState(false)

  function handleChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  async function handleGenerateSummary() {
    if (!post.content) return alert("Write article content first")

    try {
      setSummaryLoading(true)

      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: post.content }),
      })

      const data = await res.json()

      if (!res.ok)
        return alert(data.message || "Failed to generate summary")

      setPost((prev) => ({ ...prev, excerpt: data.summary }))
    } catch (err) {
      console.error(err)
      alert("AI summary error")
    } finally {
      setSummaryLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <input
        name="title"
        value={post.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 mb-4 rounded"
      />

      <textarea
        name="content"
        value={post.content}
        onChange={handleChange}
        placeholder="Write article content..."
        rows="8"
        className="w-full border p-2 mb-4 rounded"
      />

      <button
        type="button"
        onClick={handleGenerateSummary}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        {summaryLoading ? "Generating..." : "Generate Summary"}
      </button>

      <textarea
        name="excerpt"
        value={post.excerpt}
        onChange={handleChange}
        placeholder="Summary will appear here"
        rows="4"
        className="w-full border p-2 mt-4 rounded"
      />
    </div>
  )
}