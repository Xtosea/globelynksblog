"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function ArticlePage() {
  const router = useRouter()
  const { identifier } = router.query
  const [article, setArticle] = useState(null)

  useEffect(() => {
    if (!identifier) return

    const fetchArticle = async () => {
      const res = await fetch(`/api/articles/${identifier}`)
      if (res.ok) {
        const data = await res.json()
        setArticle(data)
      }
    }

    fetchArticle()
  }, [identifier])

  if (!article) return <p>Loading...</p>

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
      {article.image && (
        <img src={article.image} className="mb-6 rounded" />
      )}
      <p className="text-lg whitespace-pre-line">{article.content}</p>
    </div>
  )
}