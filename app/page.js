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

  if (!posts) return <p className="text-center mt-10">Loading...</p>

  // Sort by newest
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  )

  const featuredPost = sortedPosts[0]
  const otherPosts = sortedPosts.slice(1)

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* --- Blog Header --- */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Globelynks Blog</h1>
          <p className="text-gray-600">
            Fresh ideas, stories, and updates.
          </p>
        </header>

        {/* --- CATEGORY NAVIGATION --- */}
        <div className="flex gap-4 mb-10 flex-wrap justify-center">
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

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          <>
            {/* --- Featured Post --- */}
            <article className="bg-white rounded-xl shadow mb-10 overflow-hidden hover:shadow-lg transition">
              {featuredPost.image && (
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-72 md:h-96 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-2 hover:text-blue-600 transition">
                  <Link href={`/posts/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-gray-500 mb-3">
                  {featuredPost.author} · {new Date(featuredPost.publishedAt).toDateString()}
                </p>
                <p className="text-gray-700 line-clamp-3 mb-3">{featuredPost.excerpt}</p>
                <Link
                  href={`/posts/${featuredPost.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </article>

            {/* --- Other Posts Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherPosts.map(post => (
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
                    <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition">
                      <Link href={`/posts/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
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
          </>
        )}
      </div>
    </main>
  )
}