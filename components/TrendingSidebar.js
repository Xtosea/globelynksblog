import Link from "next/link"

export default function TrendingSidebar({ posts }) {
  const trending = posts.slice(0, 5)

  return (
    <aside className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">
        🔥 Trending
      </h3>

      <div className="space-y-3">
        {trending.map(post => (
          <Link key={post._id} href={`/posts/${post.slug}`}>
            <p className="text-sm hover:text-red-600">
              {post.title}
            </p>
          </Link>
        ))}
      </div>
    </aside>
  )
}