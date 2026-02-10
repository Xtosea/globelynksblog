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
  const [uploading, setUploading] = useState(false);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  }

  // Slugify title
  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Handle image upload to Cloudinary
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setPost(prev => ({ ...prev, image: data.url }));
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error. Check console.");
    } finally {
      setUploading(false);
    }
  }

  // Handle publishing post
  async function handleSubmit(e) {
    e.preventDefault();

    if (!post.title || !post.excerpt || !post.content) {
      alert("Title, excerpt, and content are required");
      return;
    }

    if (!post.image) {
      alert("Please upload an image for the post");
      return;
    }

    const slug = slugify(post.title);

    const newPost = {
      ...post,
      slug,
      publishedAt: new Date(),
    };

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to publish post");
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
        content: "",
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

          {/* Image upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
            {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
            {post.image && (
              <img
                src={post.image}
                alt="Uploaded"
                className="w-40 h-40 object-cover rounded mt-2"
              />
            )}
          </div>

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
            disabled={loading || uploading || !post.image}
            className={`bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded font-semibold ${
              loading || uploading || !post.image ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </main>
  );
}