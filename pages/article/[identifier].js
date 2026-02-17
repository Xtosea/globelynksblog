import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";

export default async function ArticlePage({ params }) {
  const { identifier } = params; // could be slug or _id
  await connectDB();

  let article = null;

  // 1️⃣ Try fetching by _id first
  if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
    article = await Article.findById(identifier);
  }

  // 2️⃣ If not found, try fetching by slug
  if (!article) {
    article = await Article.findOne({ slug: identifier });
  }

  // 3️⃣ Handle not found
  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-4">{article.title}</h1>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-[400px] object-cover rounded mb-6"
        />
      )}
      <p className="text-gray-700 dark:text-gray-300 text-lg whitespace-pre-line">
        {article.content}
      </p>
    </div>
  );
}