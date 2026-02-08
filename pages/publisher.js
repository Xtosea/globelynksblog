"use client";

import { useState } from "react";

export default function Publisher() {
  const [post, setPost] = useState({
    title: "",
    category: "breaking",
    author: "Globelynks News",
    image: "",
    excerpt: "",
    content: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!post.title || !post.excerpt || !post.content) {
      alert("Title, excerpt and content are required");
      return;
    }

    const slug = slugify(post.title);

    const newPost = {
      ...post,
      slug,
      publishedAt: new Date()
    };

    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // your JWT from login

      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newPost)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to publish post");
        setLoading(false);
        return;
      }

      alert("Post published successfully!");

      // Reset form
      setPost({
        title: "",
        category: "breaking",
        author: "Globelynks News",
        image: "",
        excerpt: "",
        content: ""
      });

    } catch (err) {
      console.error(err);
      alert("Server error. Check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Publisher Dashboard</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title"
            value={post.title}
            placeholder="News Title"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <select
            name="category"
            value={post.category}
            className="w-full border p-3 rounded"
            onChange={handleChange}
          >
            <option value="breaking">Breaking</option>
            <option value="politics">Politics</option>
            <option value="business">Business</option>
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
          </select>

          <input
            name="author"
            value={post.author}
            placeholder="Author name"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="image"
            value={post.image}
            placeholder="Image URL"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <textarea
            name="excerpt"
            value={post.excerpt}
            placeholder="Short excerpt"
            rows="3"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <textarea
            name="content"
            value={post.content}
            placeholder="Full article content"
            rows="8"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </main>
  );
}