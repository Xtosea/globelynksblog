import { useState } from "react"

export default function Publisher() {
  const [post, setPost] = useState({
    title: "",
    category: "breaking",
    author: "Globelynks News",
    image: "",
    excerpt: "",
    content: ""
  })

  const [token, setToken] = useState("") // store JWT from login
  const [message, setMessage] = useState("")

  function handleChange(e) {
    const { name, value } = e.target
    setPost(prev => ({ ...prev, [name]: value }))
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // Basic validation
    if (!post.title || !post.excerpt || !post.content) {
      alert("Title, excerpt and content are required")
      return
    }

    if (!token) {
      alert("You must be logged in first")
      return
    }

    const slug = slugify(post.title)

    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...post, slug })
      })

      const data = await res.json()

      if (res.ok) {
        setMessage("Post published successfully!")
        // reset form
        setPost({
          title: "",
          category: "breaking",
          author: "Globelynks News",
          image: "",
          excerpt: "",
          content: ""
        })
      } else {
        setMessage(data.message || "Failed to publish")
      }

    } catch (err) {
      console.error(err)
      setMessage("Server error")
    }
  }

  // Example login function (replace with your login form)
  async function handleLogin(email, password) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (res.ok) {
        setToken(data.token)
        alert("Logged in successfully!")
      } else {
        alert(data.message || "Login failed")
      }
    } catch (err) {
      console.error(err)
      alert("Server error")
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Publisher Dashboard</h1>

        {/* Optional: Quick login form for testing */}
        {!token && (
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Admin Login</h2>
            <input
              type="email"
              placeholder="Email"
              id="loginEmail"
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              id="loginPassword"
              className="border p-2 rounded w-full mb-2"
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() =>
                handleLogin(
                  document.getElementById("loginEmail").value,
                  document.getElementById("loginPassword").value
                )
              }
            >
              Login
            </button>
          </div>
        )}

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
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded font-semibold"
          >
            Publish
          </button>

          {message && <p className="mt-3 text-green-600">{message}</p>}
        </form>
      </div>
    </main>
  )
}