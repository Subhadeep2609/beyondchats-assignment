async function rewriteContent(original) {
  // Fallback when OpenAI quota is exhausted
  if (!process.env.OPENAI_API_KEY) {
    return (
      "Rewritten Content (Fallback Mode):\n\n" +
      original.slice(0, 800) +
      "\n\n[This content was processed using fallback logic due to API quota limits.]"
    );
  }

  const OpenAI = require("openai");
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "Rewrite the following article in a professional, SEO-optimized, original style.",
      },
      {
        role: "user",
        content: original.slice(0, 12000),
      },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = { rewriteContent };
