"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "../components/Navbar"
import layout from ../app/layout"


export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Blog Header */}
        <h1 className="text-4xl font-bold mb-2">Globelynks Blog</h1>
        <p className="text-gray-600 mb-6">Fresh ideas, stories, and updates.</p>

        {/* Category Navigation */}
        <div className="flex gap-4 mb-10 flex-wrap">
          {["breaking", "politics", "business", "tech", "sports", "Entertainment", "Education", "Wedding", "International/World", "Health & Science",  "News Bulletins/Alerts", "Interviews/Profiles", "Ceremonies"].map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {cat.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post._id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-500 text-sm mb-3">
                {post.author} ·{" "}
                {post.publishedAt
                  ? new Date(post.publishedAt).toDateString()
                  : "Unknown date"}
              </p>

              <p className="text-gray-700">{post.excerpt}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded mt-4"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}