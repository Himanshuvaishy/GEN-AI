import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  try {
    // Choose the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = "Write a short poem about AI and coffee.";
    
    // Generate text
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    console.log("Gemini Response:\n", response.text());
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
