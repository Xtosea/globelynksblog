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

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading posts...
      </div>
    )
  }

  // Featured post is the latest one
  const [featured, ...rest] = posts.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  )

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* --- Header --- */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">Globelynks News</h1>
          <p className="text-gray-600 text-lg">
            Latest stories, updates, and trending news.
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

        {/* --- Featured Post --- */}
        {featured && (
          <article className="mb-12 bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
            {featured.image && (
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-80 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-2 hover:text-blue-600 transition">
                <Link href={`/posts/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {featured.author} · {new Date(featured.publishedAt).toDateString()}
              </p>
              <p className="text-gray-700 line-clamp-4 mb-4">{featured.excerpt}</p>
              <Link
                href={`/posts/${featured.slug}`}
                className="text-blue-600 font-medium hover:underline"
              >
                Read full article →
              </Link>
            </div>
          </article>
        )}

        {/* --- Other Posts Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map(post => (
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
                <h3 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {post.author} · {new Date(post.publishedAt).toDateString()}
                </p>
                <p className="text-gray-700 line-clamp-3 mb-3">{post.excerpt}</p>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 font-medium hover:underline"
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