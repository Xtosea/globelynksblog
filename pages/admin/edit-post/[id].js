"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPost() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch post by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        if (!res.ok) return alert(data.message || "Post not found");
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setSaving(true);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Failed to save post");
      alert("Post updated successfully!");
      router.push("/admin/posts");
    } catch (err) {
      console.error(err);
      alert("Server error. Check console.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="px-6 py-10">Loading post...</p>;
  if (!post) return <p className="px-6 py-10">Post not found.</p>;

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

        <form onSubmit={handleSave} className="space-y-5">
          <input
            name="title"
            value={post.title}
            placeholder="News Title"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />
          <select name="category" value={post.category} className="w-full border p-3 rounded" onChange={handleChange}>
            <option value="breaking">Breaking</option>
            <option value="politics">Politics</option>
            <option value="business">Business</option>
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
          </select>
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
            disabled={saving}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}