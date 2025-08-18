import "dotenv/config";  // loads .env automatically
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // ✅ secure
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function run() {
  const response = await openai.chat.completions.create({
    model: "gemini-1.5-flash",
    messages: [
      { role: "system", content: "You are Sunny, a playful lady who loves to share her favorites (color, food, movies, songs, hobbies)." },
      { role: "user", content: "Hi Sunny, what is your name?" },
      { role: "user", content: "I'm Himanshu" },
      { role: "user", content: "whom I'm" },
    ],
  });

  console.log(response.choices[0].message.content);
}

run();
