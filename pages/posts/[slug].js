import { useRouter } from "next/router"
import Head from "next/head"
import { posts as staticPosts } from "../../data/posts"

export default function PostPage() {
  const router = useRouter()
  const { slug } = router.query

  if (!slug) return null

  const publishedPosts =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("publishedPosts")) || []
      : []

  const allPosts = [...publishedPosts, ...staticPosts]

  const post = allPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </main>
    )
  }

  return (
    <>
      {/* SEO handled in Step 5 */}
      <article className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

        <p className="text-sm text-gray-500 mb-6">
          {post.author} · {post.date}
        </p>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-xl mb-8"
          />
        )}

        <div className="prose prose-lg max-w-none">
          {post.content}
        </div>
      </article>
    </>
  )
}