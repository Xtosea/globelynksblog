import { useRouter } from "next/router"
import { posts } from "../../data/posts"

export default function Post() {
  const { slug } = useRouter().query
  const post = posts.find(p => p.slug === slug)

  if (!post) return null

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <article className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-4xl font-bold">{post.title}</h1>

        <p className="text-gray-500 text-sm mt-2">
          {post.author} · {post.date}
        </p>

        <img
          src={post.coverImage}
          alt={post.title}
          className="rounded-lg my-6"
        />

        <p className="text-lg text-gray-800 leading-relaxed">
          {post.content}
        </p>
      </article>
    </main>
  )
}
