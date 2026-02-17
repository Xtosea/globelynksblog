import cron from "node-cron";
import { connectDB } from '@/lib/mongodb';
import Article from "@/models/Article";

// Runs every minute
cron.schedule("* * * * *", async () => {
  await dbConnect();
  const now = new Date();
  const toPublish = await Article.find({ scheduledDate: { $lte: now }, published: false });

  for (let article of toPublish) {
    article.published = true;
    await article.save();
    console.log(`Published: ${article.title}`);
  }
});

export default function handler(req, res) {
  res.status(200).json({ message: "Scheduler running" });
}