import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDir = path.join(process.cwd(), "posts")

export function getAllPosts() {
  const files = fs.readdirSync(postsDir)

  return files.map(file => {
    const slug = file.replace(".mdx", "")
    const filePath = path.join(postsDir, file)
    const content = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(content)

    return { slug, ...data }
  })
}

export function getPostBySlug(slug) {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  const content = fs.readFileSync(filePath, "utf-8")
  return matter(content)
                   }
