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
        // 1️⃣ Fetch trending/breaking articles (RSS)
        const trendingRes = await fetch("/api/articles/trending")
        const trendingData = await trendingRes.json()
        const trendingArticles = trendingData.topArticles || []

        // 2️⃣ Fetch old/internal posts
        const oldRes = await fetch("/api/posts")
        const oldPosts = await oldRes.json()

        // 3️⃣ Merge arrays and sort by date (newest first)
        const mergedPosts = [...trendingArticles, ...oldPosts].sort(
          (a, b) =>
            new Date(b.scheduledDate ?? b.createdAt) -
            new Date(a.scheduledDate ?? a.createdAt)
        )

        setPosts(mergedPosts)
      } catch (err) {
        console.error("Error fetching posts:", err)
      }
    }

    fetchPosts()
    const interval = setInterval(fetchPosts, 30000) // refresh every 30s
    return () => clearInterval(interval)
  }, [])

  // Helper to generate URL
const getPostLink = (post) => {
  return post.originalUrl || `/posts/${post.slug || post._id}`;
};

  // Helper to open external links in new tab
  const getLinkProps = (post) =>
    post?.originalUrl ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <>
      <Navbar />
      <BreakingTicker posts={posts} />
      <StickyShare />

      <main className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-10">
        {/* Main Content */}
        <div className="md:col-span-3 space-y-10">
          {/* Featured post */}
          {posts[0] && (
            <div>
              <Link href={getPostLink(posts[0])} {...getLinkProps(posts[0])}>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 hover:text-red-600">
                  {posts[0].title ?? "Untitled"}
                </h1>
              </Link>
              {posts[0].image && (
                <img
                  src={posts[0].image}
                  alt={posts[0].title ?? "Post image"}
                  className="w-full h-[400px] object-cover rounded"
                />
              )}
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
                {posts[0].content?.slice(0, 200) ?? "No content available"}...
              </p>
              {posts[0].source && (
                <p className="text-gray-400 text-sm mt-1">
                  Source: {posts[0].source}
                </p>
              )}
            </div>
          )}

          <AdBlock />

          {/* List of other posts */}
          {posts.slice(1).map((post) => (
            <div key={post._id ?? Math.random()} className="border-b pb-6">
              <Link href={getPostLink(post)} {...getLinkProps(post)}>
                <h2 className="text-xl font-bold hover:text-red-600">
                  {post.title ?? "Untitled"}
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                {post.content?.slice(0, 120) ?? "No content available"}...
              </p>
              {post.source && (
                <p className="text-gray-400 text-xs mt-1">Source: {post.source}</p>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TrendingSidebar posts={posts} />
          <AdBlock />
        </div>
      </main>

      <Footer />
    </>
  )
}