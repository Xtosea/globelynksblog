import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { getPostBySlug } from "../../lib/posts"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Head from "next/head"

export async function getStaticProps({ params }) {
  const { content, data } = getPostBySlug(params.slug)
  const mdxSource = await serialize(content)

  return {
    props: {
      mdxSource,
      frontMatter: {
        ...data,
        date: data.date.toString(), // ✅ FIXED
      },
    },
  }
}

export default function Post({ mdxSource, frontMatter }) {
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta name="description" content={frontMatter.excerpt} />
      </Head>

      <Navbar />

      <article className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">{frontMatter.title}</h1>

        <p className="text-gray-500 text-sm mb-8">
          {frontMatter.author} · {frontMatter.date}
        </p>

        <div className="prose prose-lg max-w-none">
          <MDXRemote {...mdxSource} />
        </div>
      </article>

      <Footer />
    </>
  )
}