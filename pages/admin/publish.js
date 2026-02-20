import { useState } from "react";
import { useRouter } from "next/router";

export default function Publisher() {
  const router = useRouter();

  const [post, setPost] = useState({
    title: "",
    category: "breaking",
    author: "Globelynks News",
    image: "",
    excerpt: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ Separate AI states
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [headlineLoading, setHeadlineLoading] = useState(false);
  const [headlineOptions, setHeadlineOptions] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // =========================
  // AI SUMMARY
  // =========================
  async function handleGenerateSummary() {
    if (!post.content) return alert("Write article content first");

    try {
      setSummaryLoading(true);

      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: post.content }),
      });

      const data = await res.json();

      if (!res.ok)
        return alert(data.message || "Failed to generate summary");

      setPost((prev) => ({ ...prev, excerpt: data.summary }));
    } catch (err) {
      console.error(err);
      alert("AI summary error");
    } finally {
      setSummaryLoading(false);
    }
  }

  // =========================
  // AI HEADLINES
  // =========================
  async function handleGenerateHeadlines() {
    if (!post.content) return alert("Write article content first");

    try {
      setHeadlineLoading(true);

      const res = await fetch("/api/ai/headlines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: post.content }),
      });

      const data = await res.json();

      if (!res.ok)
        return alert(data.message || "Failed to generate headlines");

      if (data.headlines) {
        setHeadlineOptions(data.headlines);
      }
    } catch (err) {
      console.error(err);
      alert("AI headline error");
    } finally {
      setHeadlineLoading(false);
    }
  }

  // =========================
  // IMAGE UPLOAD
  // =========================
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
        setPost((prev) => ({ ...prev, image: data.url }));
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

  // =========================
  // SUBMIT POST
  // =========================
  async function handleSubmit(e) {
    e.preventDefault();

    if (!post.title || !post.excerpt || !post.content)
      return alert("Title, excerpt, and content required");

    if (!post.image) return alert("Please upload an image");

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      const data = await res.json();

      if (!res.ok)
        return alert(data.message || "Failed to publish post");

      alert("Post published successfully!");

      setPost({
        title: "",
        category: "breaking",
        author: "Globelynks News",
        image: "",
        excerpt: "",
        content: "",
      });

      setHeadlineOptions([]);
    } catch (err) {
      console.error(err);
      alert("Server error. Check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Publisher Dashboard</h1>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Go to Admin Dashboard
          </button>
        </div>

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

          {/* IMAGE */}
          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
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

          {/* AI BUTTONS */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleGenerateSummary}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              {summaryLoading ? "Generating..." : "Generate Summary"}
            </button>

            <button
              type="button"
              onClick={handleGenerateHeadlines}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {headlineLoading ? "Generating..." : "Generate Headlines"}
            </button>
          </div>

          {/* AI HEADLINE SUGGESTIONS */}
          {headlineOptions.length > 0 && (
            <div className="bg-gray-100 p-4 rounded space-y-2 mt-4">
              <h3 className="font-semibold">AI Headline Suggestions</h3>

              {headlineOptions.map((headline, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setPost((prev) => ({ ...prev, title: headline }))
                  }
                  className="p-2 bg-white rounded cursor-pointer hover:bg-gray-200"
                >
                  {headline}
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || uploading || !post.image}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold ${
              loading || uploading || !post.image
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>

        </form>
      </div>
    </main>
  );
}