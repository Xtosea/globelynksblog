"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BreakingTicker from "../components/BreakingTicker"
import TrendingSidebar from "../components/TrendingSidebar"
import AdBlock from "../components/AdBlock"
import StickyShare from "../components/StickyShare"
import Link from "next/link"

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const trendingRes = await fetch("/api/articles/trending")
        const trendingData = await trendingRes.json()
        const trendingArticles = trendingData.topArticles || []

        const oldRes = await fetch("/api/posts")
        const oldPosts = await oldRes.json()

        // 🔥 Merge and globally sort by newest date
        const mergedPosts = [...trendingArticles, ...oldPosts].sort(
          (a, b) =>
            new Date(
              b.pubDate || b.scheduledDate || b.createdAt || 0
            ) -
            new Date(
              a.pubDate || a.scheduledDate || a.createdAt || 0
            )
        )

        // 🔥 Remove duplicates (by URL or _id)
        const uniquePosts = mergedPosts.filter(
          (post, index, self) =>
            index ===
            self.findIndex(
              (p) =>
                p.originalUrl === post.originalUrl ||
                p._id === post._id
            )
        )

        setPosts(uniquePosts)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }

    fetchPosts()
    const interval = setInterval(fetchPosts, 30000)
    return () => clearInterval(interval)
  }, [])

  const getPostLink = (post) => {
    return post.originalUrl || `/posts/${post.slug || post._id}`
  }

  const getLinkProps = (post) =>
    post?.originalUrl
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}

  return (
    <>
      <Navbar />
      <BreakingTicker posts={posts} />
      <StickyShare />

      <main className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-3 space-y-10">

          {/* Featured Post */}
          {posts[0] && (
            <div>
              <Link href={getPostLink(posts[0])} {...getLinkProps(posts[0])}>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 hover:text-red-600">
                  {posts[0].title}
                </h1>
              </Link>

              {posts[0].image && (
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-[400px] object-cover rounded"
                  loading="lazy"
                />
              )}

              <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
                {posts[0].content?.slice(0, 200)}...
              </p>

              {posts[0].source && (
                <p className="text-gray-400 text-sm mt-1">
                  Source: {posts[0].source}
                </p>
              )}
            </div>
          )}

          <AdBlock />

          {/* Post List */}
          {posts.slice(1).map((post) => (
            <div
              key={post._id || post.originalUrl}
              className="border-b pb-6 flex gap-4"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-32 h-24 object-cover rounded"
                  loading="lazy"
                />
              )}

              <div>
                <Link href={getPostLink(post)} {...getLinkProps(post)}>
                  <h2 className="text-xl font-bold hover:text-red-600">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  {post.content?.slice(0, 120)}...
                </p>

                {post.source && (
                  <p className="text-gray-400 text-xs mt-1">
                    Source: {post.source}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <TrendingSidebar posts={posts} />
          <AdBlock />
        </div>
      </main>

      <Footer />
    </>
  )
}