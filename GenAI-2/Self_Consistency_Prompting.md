
# 🧠 Self-Consistency Prompting

## 🔹 Simple Explanation
- Instead of generating **one single answer**, the model is asked to generate **multiple reasoning paths**.  
- Then, the most **consistent/common final answer** is chosen.  
- Think of it like asking multiple people the same question, then picking the majority answer. ✅

---

## 🔹 Deep Explanation
- **Why it works?**
  - In CoT (Chain-of-Thought), sometimes the model takes a *wrong reasoning path* and gives an incorrect answer.  
  - Self-Consistency reduces this risk by generating **diverse reasoning traces**.
- **Steps:**
  1. Ask the model to **reason step by step** (like CoT).
  2. Generate **K different outputs** (e.g., 5–10 reasoning paths).
  3. Collect the **final answers** from each path.
  4. Do a **majority vote** → the most common answer is the final answer.

This makes the answer more **robust, reliable, and less biased**.

---

## 🔹 Dry Run Example
**Question:** What is `12 + 3 * 2` ?

👉 Using **Self-Consistency**:
1. Path 1 reasoning: Apply BODMAS → `12 + (3*2) = 12 + 6 = 18`
2. Path 2 reasoning: Wrongly left-to-right → `(12+3)*2 = 30`
3. Path 3 reasoning: Correct BODMAS again → `12 + 6 = 18`
4. Path 4 reasoning: Same mistake as path 2 → 30
5. Path 5 reasoning: Correct BODMAS → 18  

✅ Majority Answer → `18` (chosen as final).

---

## 🔹 JavaScript Example (using OpenAI/Gemini API)
```js
import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function selfConsistencyPrompting(question) {
  const responses = [];

  for (let i = 0; i < 5; i++) {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Solve step by step carefully." },
        { role: "user", content: question },
      ],
    });

    const answer = response.choices[0].message.content;
    console.log(`Path ${i + 1}:`, answer);
    responses.push(answer.trim());
  }

  // Majority vote
  const freq = {};
  for (let ans of responses) {
    freq[ans] = (freq[ans] || 0) + 1;
  }

  const finalAnswer = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  console.log(`✅ Final Answer (by majority): ${finalAnswer}`);
}

selfConsistencyPrompting("What is 12 + 3 * 2?");
```

---

## 🔹 ChatML Format Example
```yaml
<|system|>
You are a math expert. Solve problems step by step carefully.
Generate multiple reasoning paths for the same problem.

<|user|>
What is 12 + 3 * 2 ?

<|assistant|>
Path 1: Using BODMAS → 12 + (3*2) = 12 + 6 = 18
Path 2: Left to right → (12+3)*2 = 30
Path 3: Again BODMAS → 12 + 6 = 18
Final Answer (majority) → 18
```
