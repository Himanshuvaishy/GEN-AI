import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Perplexity API (OpenAI-compatible)
const client = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY, // store in .env
  baseURL: "https://api.perplexity.ai", // Perplexity endpoint
});

// Tokenize route
app.post("/tokenize", async (req, res) => {
  try {
    const { text } = req.body;

    // Local tokenization
    const tokens = text.split(/\s+/);

    // Call Perplexity API (chat completion example)
    const response = await client.chat.completions.create({
      model: "sonar",  // ✅ valid model
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Tokenize this text: ${text}` },
      ],
    });

    res.json({
      tokens,
      tokenCount: tokens.length,
      apiResponse: response.choices[0].message.content, // what Perplexity replied
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
