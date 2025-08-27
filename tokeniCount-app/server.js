import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY, // required
  baseURL: "https://api.perplexity.ai",  // Perplexity API
});

// Remote token counting via API usage response
app.post("/api/count-remote", async (req, res) => {
  const { text, model = "sonar" } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: text }],
      max_tokens: 1, // only need a minimal response
    });

    // usage object is returned from API
    return res.json({
      method: "remote",
      usage: response.usage,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`)
);
