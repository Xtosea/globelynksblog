import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  source: { type: String, required: true },

  originalUrl: { type: String },   // ✅ ADD THIS
  image: { type: String },         // ✅ optional but useful
  slug: { type: String, unique: true }, // ✅ optional for SEO

  category: { type: String, default: "General" },
  tags: { type: [String], default: [] },
  scheduledDate: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Article || mongoose.model("Article", ArticleSchema);