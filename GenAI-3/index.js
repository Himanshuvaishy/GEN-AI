import OpenAI from "openai/index.js";
import dotenv from "dotenv";

dotenv.config();

// Use Perplexity endpoint (OpenAI compatible)
const client = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai", // 👈 important
});

async function main() {
  const response = await client.chat.completions.create({
    model: "sonar", // example Perplexity model
    messages: [
      { role: "system", content: "You are a helpful assistant. explain only few words" },
      { role: "user", content: "Explain binary search in simple words." },
    ],
    search_disabled: true,
    max_tokens: 80, // cap output tokens
    temperature: 0.3, // lower randomness often uses fewer tokens
  });

  console.log(response.choices[0].message.content);
}

main();
