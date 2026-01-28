import { useRouter } from 'next/router'
import { posts } from '../../data/posts'

export default function Post() {
  const router = useRouter()
  const { slug } = router.query

  const post = posts.find((p) => p.slug === slug)

  if (!post) return <p>Post not found!</p>

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{post.title}</h1>
      <p style={{ fontSize: '0.85rem', color: '#555' }}>
        {post.author} – {post.date}
      </p>
      <img src={post.coverImage} alt={post.title} style={{ maxWidth: '100%', marginTop: '1rem' }} />
      <p style={{ marginTop: '1rem' }}>{post.content}</p>
    </main>
  )
    }
