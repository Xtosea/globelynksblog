import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { message: "Missing OpenAI API key" },
        { status: 500 }
      );
    }

    const { content } = await req.json();

    if (!content) {
      return Response.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You summarize news professionally.",
        },
        {
          role: "user",
          content: `Summarize this article:\n\n${content}`,
        },
      ],
    });

    return Response.json({
      summary: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "AI summary error" },
      { status: 500 }
    );
  }
}