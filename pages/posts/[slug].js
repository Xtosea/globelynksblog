"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Head from "next/head"

export default function PostPage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    setLoading(true)
    fetch(`/api/posts/${slug}`) // 🔹 fetch single post from API
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [slug])

  if (loading) return <p className="p-6">Loading...</p>
  if (!post || post.message) return <p className="p-6">Post not found</p>

  return (
    <>
      <Head>
        <title>{post.title} | Globelynks Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <article className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <p className="text-sm text-gray-500 mb-6">
          {post.author} · {new Date(post.publishedAt).toDateString()}
        </p>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-xl mb-6"
          />
        )}

        <div className="prose prose-lg max-w-none">
          {post.content}
        </div>
      </article>
    </>
  )
}