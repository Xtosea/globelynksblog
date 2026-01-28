import Link from 'next/link'
import { posts } from '../data/posts'

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to Globelynks Blog</h1>
      <p>Your fresh blog starts here. Click a post to read!</p>

      <div style={{ marginTop: '2rem' }}>
        {posts.map((post) => (
          <div key={post.slug} style={{ marginBottom: '1.5rem' }}>
            <h2>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.excerpt}</p>
            <p style={{ fontSize: '0.85rem', color: '#555' }}>
              {post.author} – {post.date}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
