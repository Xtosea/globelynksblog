import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  image: String,
  category: String,
  author: String,
  publishedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Post ||
  mongoose.model("Post", PostSchema)