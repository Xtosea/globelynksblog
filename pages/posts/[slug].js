import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { getPostBySlug, getAllPosts } from "../../lib/posts"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Head from "next/head"

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map(post => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { content, data } = getPostBySlug(params.slug)
  const mdxSource = await serialize(content)

  return {
    props: {
      mdxSource,
      frontMatter: {
        ...data,
        slug: params.slug, // ✅ ensure slug is available for URLs
        date: data.date ? new Date(data.date).toISOString() : null, // ✅ safe date
      },
    },
  }
}

export default function Post({ mdxSource, frontMatter }) {
  return (
    <>
      <Head>
        {/* Page title */}
        <title>{frontMatter.title} | Globelynks Blog</title>

        {/* Meta description */}
        <meta
          name="description"
          content={frontMatter.excerpt || frontMatter.title}
        />

        {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontMatter.title} />
        <meta
          property="og:description"
          content={frontMatter.excerpt || frontMatter.title}
        />
        <meta
          property="og:url"
          content={`https://globelynks.com/posts/${frontMatter.slug}`}
        />
        <meta property="og:site_name" content="Globelynks Blog" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta
          name="twitter:description"
          content={frontMatter.excerpt || frontMatter.title}
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://globelynks.com/posts/${frontMatter.slug}`}
        />
      </Head>

      <Navbar />

      <article className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">{frontMatter.title}</h1>

        <p className="text-gray-500 text-sm mb-8">
          {frontMatter.author}
          {frontMatter.date && ` · ${frontMatter.date}`}
        </p>

        <div className="prose prose-lg max-w-none">
          <MDXRemote {...mdxSource} />
        </div>
      </article>

      <Footer />
    </>
  )
}