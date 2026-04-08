import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { name } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Estimate the current market price of the ${name} camera in USD. Give a short price range like "$900–$1100".`,
        },
      ],
    });

    const result = response.choices[0].message.content;

    return new Response(JSON.stringify({ price: result }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("REAL ERROR:", err);

    return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500 }
    );
 }
}