import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini", // you can use gpt-4, gpt-3.5-turbo, etc.
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        {
          role: "user",
          content: "Explain what is js in few words",
        },
      ],
      // max_tokens: 50, // restricts length
      // temperature: 0.2, // keeps answer precise
      // top_p: 0.8, // controls diversity
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
