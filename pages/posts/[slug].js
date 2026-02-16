"use client"

import { useEffect, useState } from "react"
import Head from "next/head"

export default function PostPage({ post }) {
  // State to hold live view count
  const [views, setViews] = useState(post.views || 0)
  const slug = post.slug

  // Increment views on page load
  useEffect(() => {
    if (!slug) return

    fetch(`/api/posts/${slug}/view`, { method: "POST" })
      .then(res => res.json())
      .then(data => {
        if (data.views !== undefined) setViews(data.views)
      })
      .catch(err => console.error("Failed to increment view:", err))
  }, [slug])

  return (
    <>
      <Head>
        <title>{post.title} | Globelynks News</title>
        <meta name="description" content={post.excerpt} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta
          property="og:url"
          content={`https://trendingnews.globelynks.com/posts/${post.slug}`}
        />
        <meta property="og:site_name" content="Globelynks News" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={post.image} />
      </Head>

      <article className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

        <p className="text-sm text-gray-500 mb-2">
          {post.author} · {new Date(post.publishedAt).toDateString()}
        </p>

        {/* Views */}
        <p className="text-sm text-gray-500 mb-6">👁 {views} views</p>

        {post.image && (
          <img src={post.image} alt={post.title} className="w-full rounded-xl mb-8" />
        )}

        <div className="prose prose-lg max-w-none whitespace-pre-line">
          {post.content}
        </div>
      </article>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${params.slug}`
  )

  if (!res.ok) return { notFound: true }

  const post = await res.json()

  return { props: { post } }
}