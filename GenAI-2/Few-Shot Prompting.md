```js 
🟣 Few-Shot Prompting

Few-shot prompting is another system prompting style in Generative AI.
Here are the notes with explanation, dry runs, and examples.

🔹 What is Few-Shot Prompting?

Few-shot = The model is given a few examples of input-output pairs in the prompt.

Then you provide a new input, and the model continues the pattern.

This helps guide the model to follow a specific style, tone, or format.

👉 Think of it like showing a student a few solved problems before asking them to solve a new one.

🔹 Why Use Few-Shot Prompting?

✅ Increases accuracy compared to zero-shot
✅ Helps enforce formatting (tables, JSON, code)
✅ Teaches the model style and tone
✅ Useful for specialized tasks the model doesn’t naturally do well

⚠️ Limitation: Uses more tokens, examples must be chosen carefully.

🔹 Few-Shot vs Zero-Shot

Zero-shot: Only instructions, no examples.

Few-shot: You show the model some Q → A pairs first.

🔹 Dry Run Example

Prompt:

Convert numbers into words.

Example:
Input: 1 → Output: one
Input: 5 → Output: five
Input: 12 → Output: twelve
Input: 20 → Output:


Model Thinking Steps:

Reads examples → identifies task = "number to words".

Learns style = "Output: word".

New input = "20".

Looks up mapping → twenty.

Responds:

twenty

🔹 Few-Shot in JavaScript (Two Styles)

We’ll demonstrate your ChaiCode AI example in both styles.

✅ Style 1: Examples Embedded in System Message (Your Original Style)

This feels like Zero-Shot, but actually contains Few-Shot examples in the system prompt.

import "dotenv/config";  
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function run() {
  const response = await openai.chat.completions.create({
    model: "gemini-1.5-flash",
    messages: [
      {
        role: 'system',
        content: `
          You're an AI assistant expert in coding with Javascript. 
          You only and only know Javascript as coding language.
          If user asks anything other than Javascript coding question, Do not ans that question.
          You are an AI from ChaiCode which is an EdTech company transforming modern tech knowledge. 
          Your name is ChaiCode and always ans as if you represent ChaiCode.

          Examples:
          Q: Hey There
          A: Hey, Nice to meet you. How can I help you today? Do you want me to show what we are cooking at ChaiCode.

          Q: Hey, I want to learn Javascript
          A: Sure, Why don't you visit our website or YouTube at ChaiCode for more info.

          Q: I am bored
          A: What about a JS Quiz?

          Q: Can you write a code in Python?
          A: I can, but I am designed to help in JS.
        `,
      },
      { role: 'user', content: 'Hey gpt, My name is himanshu' },
      { role: 'assistant', content: 'Hello himanshu! How can I assist you today?' },
      { role: 'user', content: 'What is my name?' },
      { role: 'assistant', content: 'Your name is himanshu. How can I help you further?' },
      { role: 'user', content: 'Hey, do you have a YouTube channel?' },
    ],
  });

  console.log(response.choices[0].message.content);
}

run();

✅ Style 2: Clear Few-Shot with User + Assistant Turns

This makes the Few-Shot examples explicit, so the model clearly sees Q → A patterns.

import "dotenv/config";  
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function run() {
  const response = await openai.chat.completions.create({
    model: "gemini-1.5-flash",
    messages: [
      { role: 'system', content: "You are ChaiCode, an AI that only answers JavaScript coding questions. Always explain in a friendly tone 🎉. Always put JS code inside ```js ... ```." },

      { role: 'user', content: "Hey There" },
      { role: 'assistant', content: "Hey, Nice to meet you. How can I help you today? Do you want me to show what we are cooking at ChaiCode?" },

      { role: 'user', content: "Hey, I want to learn Javascript" },
      { role: 'assistant', content: "Sure, Why don't you visit our website or YouTube at ChaiCode for more info." },

      { role: 'user', content: "I am bored" },
      { role: 'assistant', content: "What about a JS Quiz? 🎉" },

      { role: 'user', content: "Can you write a code in Python?" },
      { role: 'assistant', content: "I can, but I am designed to help in JS. 🚀" },

      { role: 'user', content: "Hey gpt, My name is himanshu" }
    ],
  });

  console.log(response.choices[0].message.content);
}

run();

🔹 Key Differences

Style 1 (Embedded): Examples live in the system message. Looks like Zero-Shot but is still Few-Shot.

Style 2 (Explicit): Examples are separate user + assistant turns → clearer Few-Shot structure.

Both work, but Style 2 is cleaner and easier to maintain.

✅ In short: Few-Shot prompting = show a couple of examples → ask the model to continue in the same style.