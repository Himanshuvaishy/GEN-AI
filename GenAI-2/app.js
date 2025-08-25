import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
//console.log(process.env.PERPLEXITY_API_KEY);

const client = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

const resp = await client.chat.completions.create({
  model: "sonar",
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant and Return only the exact answer. No explanations or citations.",
    },
    { role: "user", content: "I am Himanshu vaishy a software developer." },
    {
      role: "assistant",
      content:
        "You introduced yourself as **Himanshu Vaishy, software developer**.",
    },
    { role: "user", content: "What is recursion" },
  ],
  search_disabled: true,
  max_tokens: 80, // cap output tokens
  temperature: 0.3, // lower randomness often uses fewer tokens
});
console.log(resp.choices[0].message.content);


