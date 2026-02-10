"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* --- Header --- */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">Globelynks Blog</h1>
          <p className="text-gray-600 text-lg">
            Fresh news, ideas, and stories from around the world.
          </p>
        </header>

        {/* --- Categories --- */}
        <nav className="flex justify-center gap-4 mb-12 flex-wrap">
          {["breaking", "politics", "business", "tech", "sports"].map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition font-medium"
            >
              {cat.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* --- Blog Posts Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map(post => (
            <article
              key={post._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  {post.author} · {new Date(post.publishedAt).toDateString()}
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  )
}