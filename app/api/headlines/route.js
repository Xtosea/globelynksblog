import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { content } = await req.json();

    if (!content) {
      return Response.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a viral news headline expert.",
        },
        {
          role: "user",
          content: `Generate 5 short powerful news headlines as a pure JSON array. Do NOT add explanations:\n\n${content}`,
        },
      ],
      temperature: 0.9,
    });

    let headlines;

    try {
      headlines = JSON.parse(response.choices[0].message.content);
    } catch {
      headlines = response.choices[0].message.content
        .split("\n")
        .map(h => h.replace(/^\d+[\).\s-]*/, "").trim())
        .filter(Boolean);
    }

    return Response.json({ headlines });

  } catch (error) {
    console.error("AI ERROR:", error);
    return Response.json(
      { message: "AI error" },
      { status: 500 }
    );
  }
}