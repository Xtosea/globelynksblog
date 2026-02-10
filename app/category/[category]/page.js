import Link from "next/link"
import { posts } from "../../../data/posts"

export default function CategoryPage({ params }) {
  const { category } = params

  const filteredPosts = posts.filter(post => post.category === category)

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold capitalize mb-8">
          {category} News
        </h1>

        {filteredPosts.length === 0 && (
          <p className="text-gray-600">
            No articles yet in this category.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {filteredPosts.map(post => (
            <div key={post._id} className="bg-white rounded-xl shadow overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  {post.author} · {new Date(post.publishedAt).toDateString()}
                </p>
                <p className="text-gray-700 text-sm">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}