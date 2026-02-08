import { useRouter } from "next/router"
import { posts } from "../../data/posts"
import Link from "next/link"

export default function CategoryPage() {
  const { category } = useRouter().query

  const filtered = posts.filter(
    post => post.category === category
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold capitalize mb-6">
        {category} News
      </h1>

      {filtered.map(post => (
        <Link key={post.slug} href={`/posts/${post.slug}`}>
          <div className="mb-6 p-4 bg-white shadow rounded cursor-pointer">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}