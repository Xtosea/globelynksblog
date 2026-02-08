import { useEffect, useState } from "react"
import Link from "next/link"
import { posts as staticPosts } from "../data/posts"

export default function Home() {
  const [publishedPosts, setPublishedPosts] = useState([])

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("publishedPosts")) || []
    setPublishedPosts(stored)
  }, [])

  const posts = [...publishedPosts, ...staticPosts]

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* --- Blog Header --- */}
        <h1 className="text-4xl font-bold mb-2">Globelynks Blog</h1>
        <p className="text-gray-600 mb-6">
          Fresh ideas, stories, and updates.
        </p>

        {/* --- CATEGORY NAVIGATION --- */}
        <div className="flex gap-4 mb-10 flex-wrap">
          {["breaking", "politics", "business", "tech", "sports"].map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {cat.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* --- Blog Posts --- */}
        <div className="space-y-8">
          {posts.map(post => (
            <div
              key={post.slug}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-2xl font-semibold">
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {post.author} ·{" "}
                {new Date(post.date).toDateString()}
              </p>

              <p className="mt-4 text-gray-700">
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}