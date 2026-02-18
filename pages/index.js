import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BreakingTicker from "../components/BreakingTicker"
import TrendingSidebar from "../components/TrendingSidebar"
import AdBlock from "../components/AdBlock"
import StickyShare from "../components/StickyShare"
import Link from "next/link"
import Image from "next/image"

import { connectDB } from "@/lib/mongodb"
import Article from "@/models/Article"

export const revalidate = 3600 // Cache page for 1 hour

export default async function Home() {
  await connectDB()

  const posts = await Article.find()
    .sort({ createdAt: -1 })
    .limit(20)
    .select("title slug image createdAt content source originalUrl")
    .lean()

  const getPostLink = (post) =>
    post.originalUrl || `/posts/${post.slug || post._id}`

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
        {/* Main Content */}
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
                <Image
                  src={posts[0].image}
                  alt={posts[0].title}
                  width={1200}
                  height={600}
                  className="w-full h-[400px] object-cover rounded"
                  priority
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

          {/* Other Posts */}
          {posts.slice(1).map((post) => (
            <div
              key={post._id || post.originalUrl}
              className="border-b pb-6 flex gap-4"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={200}
                  height={150}
                  className="w-32 h-24 object-cover rounded"
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