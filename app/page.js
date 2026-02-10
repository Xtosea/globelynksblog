import Link from "next/link"
import { posts } from "../data/posts"

export default function Home() {
  // Sort posts by published date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  )

  // Featured post = newest post
  const [featured, ...rest] = sortedPosts

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* --- Header --- */}
        <h1 className="text-5xl font-bold mb-2 text-center">Globelynks Blog</h1>
        <p className="text-gray-600 text-center mb-10">
          Fresh ideas, stories, and updates from Nigeria and beyond
        </p>

        {/* --- Category Navigation --- */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {["breaking", "politics", "business", "tech", "sports"].map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              {cat.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* --- Featured Post --- */}
        {featured && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-2">
                <Link href={`/posts/${featured.slug}`} className="hover:underline">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {featured.author} · {new Date(featured.publishedAt).toDateString()}
              </p>
              <p className="text-gray-700">{featured.excerpt}</p>
            </div>
          </div>
        )}

        {/* --- Other Posts Grid --- */}
        <div className="grid md:grid-cols-2 gap-8">
          {rest.map(post => (
            <div key={post._id} className="bg-white rounded-xl shadow overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
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