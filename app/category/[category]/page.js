import Link from "next/link"
import { notFound } from "next/navigation"
import Post from "@/models/Post"
import { connectDB } from "@/lib/mongodb"

export async function generateMetadata({ params }) {
  return {
    title: `${params.category.toUpperCase()} News | Globelynks`,
    description: `Latest ${params.category} news on Globelynks`,
  }
}

export default async function CategoryPage({ params }) {
  const { category } = params

  await connectDB()

  const posts = await Post.find({ category })
    .sort({ publishedAt: -1 })
    .lean()

  if (!posts) return notFound()

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold capitalize mb-8">
          {category} News
        </h1>

        {posts.length === 0 && (
          <p className="text-gray-600">
            No articles yet in this category.
          </p>
        )}

        <div className="grid gap-6">
          {posts.map(post => (
            <article
              key={post._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
              )}

              <h2 className="text-2xl font-semibold mb-1">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="text-sm text-gray-500 mb-3">
                {post.author} ·{" "}
                {new Date(post.publishedAt).toDateString()}
              </p>

              <p className="text-gray-700">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>

      </div>
    </main>
  )
}