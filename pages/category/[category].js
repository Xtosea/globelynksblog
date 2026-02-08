import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"
import { posts } from "../../data/posts"

export default function CategoryPage() {
  const router = useRouter()
  const { category } = router.query

  if (!category) return null

  const filteredPosts = posts.filter(
    post => post.category === category
  )

  return (
    <>
      <Head>
        <title>{category.toUpperCase()} News | Globelynks</title>
        <meta
          name="description"
          content={`Latest ${category} news on Globelynks`}
        />
      </Head>

      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold capitalize mb-8">
            {category} News
          </h1>

          {filteredPosts.length === 0 && (
            <p className="text-gray-600">
              No articles yet in this category.
            </p>
          )}

          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div
                key={post.slug}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-2xl font-semibold mb-1">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                  {post.author} · {post.date}
                </p>

                <p className="text-gray-700">
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  )
}