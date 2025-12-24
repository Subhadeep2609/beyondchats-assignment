const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function rewriteContent(text) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Rewrite the following article in your own words, keeping it informative and original.",
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = { rewriteContent };
