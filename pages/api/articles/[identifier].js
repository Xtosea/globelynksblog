import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";
import mongoose from "mongoose";

export async function getServerSideProps({ params }) {
  await connectDB();

  const { identifier } = params;
  let post = null;

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    post = await Article.findById(identifier).lean();
  }

  if (!post) {
    post = await Article.findOne({ slug: identifier }).lean();
  }

  if (!post) {
    return { notFound: true };
  }

  // 🚀 Redirect RSS articles
  if (post.type === "rss" && post.originalUrl) {
    return {
      redirect: {
        destination: post.originalUrl,
        permanent: false,
      },
    };
  }

  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
  };
}