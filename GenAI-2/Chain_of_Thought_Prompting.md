# 🧠 Chain of Thought (CoT) Prompting

Chain of Thought (CoT) is a prompting technique where an AI model is
encouraged to **reason step-by-step** before giving the final output.\
Instead of answering immediately, the model explicitly "thinks out loud"
in a structured manner.

------------------------------------------------------------------------

## 📌 Why Chain of Thought?

-   Encourages **structured reasoning**
-   Improves accuracy in multi-step problems (math, logic, code
    debugging)
-   Makes the model's thought process transparent (easy to debug and
    verify)
-   Works best with **complex queries**

------------------------------------------------------------------------

## ⚡ How It Works

In CoT, the model produces output in **phases** like: 1. **START** →
Understand the problem 2. **THINK** → Break it down into smaller
reasoning steps 3. **EVALUATE** → Verify correctness of the reasoning 4.
**OUTPUT** → Give the final answer

------------------------------------------------------------------------

## ✅ Example (Math Problem)

**User:** Solve `3 + 4 * 10 - 4 * 3`

**Assistant (CoT style):**

``` json
{ "step": "START", "content": "The user wants me to solve 3 + 4 * 10 - 4 * 3" }
{ "step": "THINK", "content": "This is a math problem where BODMAS applies" }
{ "step": "EVALUATE", "content": "Alright, going good" }
{ "step": "THINK", "content": "First, solve 4 * 10 = 40" }
{ "step": "EVALUATE", "content": "Alright, going good" }
{ "step": "THINK", "content": "Now the equation is 3 + 40 - 12" }
{ "step": "EVALUATE", "content": "Alright, going good" }
{ "step": "THINK", "content": "Finally, 43 - 12 = 31" }
{ "step": "OUTPUT", "content": "3 + 4 * 10 - 4 * 3 = 31" }
```

------------------------------------------------------------------------

## 🚀 LLM-as-Judge Technique

CoT can be combined with **LLM-as-Judge** to validate each reasoning
step.

### 🔎 What is LLM-as-Judge?

Using another LLM (or the same model with a strict rubric) to **evaluate
outputs** step-by-step.

**Why?** - Acts like a reviewer/teacher - Helps avoid logical errors -
Ensures outputs follow strict format/rules

**Pros** - Fast, scalable automated evaluation - Improves quality &
safety - Easy to adapt by changing rubric

**Cons** - Judge can still be wrong or biased - Higher cost & latency
(extra calls) - Not a replacement for human review in critical tasks

**Best Practices** - Use **temperature: 0** for judge (deterministic
output) - Enforce **strict JSON format** for parsing - Keep prompts
**short & clear** - Add **loop safety guards** to prevent infinite
reasoning - For critical tasks → **human-in-the-loop**

------------------------------------------------------------------------

## ✅ Example with JS (Gemini API)

Below is an implementation of CoT with LLM-as-Judge in **JavaScript**.

``` js
import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function main() {
  const SYSTEM_PROMPT = `
    You are an AI assistant who works on START, THINK and OUTPUT format.
    Always think step by step and verify using EVALUATE before OUTPUT.
    Use JSON format strictly.
  `;

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: 'Write a code in JS to find a prime number as fast as possible' },
  ];

  while (true) {
    const response = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages,
    });

    const rawContent = response.choices[0].message.content;
    const parsedContent = JSON.parse(rawContent);

    messages.push({ role: 'assistant', content: JSON.stringify(parsedContent) });

    if (parsedContent.step === 'START') {
      console.log("🔥", parsedContent.content);
      continue;
    }

    if (parsedContent.step === 'THINK') {
      console.log("🧠", parsedContent.content);

      // LLM-as-Judge evaluation (dummy example)
      messages.push({
        role: 'developer',
        content: JSON.stringify({
          step: 'EVALUATE',
          content: 'Nice, going correct ✅',
        }),
      });

      continue;
    }

    if (parsedContent.step === 'OUTPUT') {
      console.log("🤖", parsedContent.content);
      break;
    }
  }
}

main();
```

------------------------------------------------------------------------

## 🎯 Key Takeaways

-   CoT makes reasoning **transparent & reliable**
-   Combine with **LLM-as-Judge** for safer outputs
-   Always enforce **structured JSON outputs**
-   Add **safety controls** to avoid runaway loops
-   For critical applications, keep **human in the loop**

**Todo**
```js
// Experiment with different models (Gemini, GPT-4, Claude)
import "dotenv/config";  // loads .env automatically
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // ✅ secure
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

console.log("🔑 GEMINI_API_KEY loaded:", !!process.env.GEMINI_API_KEY);

// Helper: safely parse JSON
function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

// === LLM-as-Judge: sends THINK step to Gemini for evaluation ===
async function evaluateThinkStep(messages, thinkObj) {
  const evaluationPrompt = `
You are a strict evaluator. Judge the assistant's THINK step.

- Check if the reasoning is correct, logical, and safe.
- Return ONLY JSON with this format:
{ "step": "EVALUATE", "content": "short evaluation message" }
`;

  const resp = await client.chat.completions.create({
    model: "gpt-4.1-mini", // or "gemini-1.5-flash"
    messages: [
      { role: "system", content: evaluationPrompt },
      { role: "user", content: `THINK step: ${thinkObj.content}` },
    ],
    temperature: 0, // deterministic judge
  });

  const raw = resp.choices[0].message.content;
  const parsed = safeParseJSON(raw);
  return parsed || { step: "EVALUATE", content: "Judge could not parse output" };
}

async function main() {
  const SYSTEM_PROMPT = `
    You are an AI assistant who works on START, THINK and OUTPUT format.
    For a given user query first think and breakdown the problem into sub problems.
    You should always keep thinking before giving the actual output.
    Also, before outputting the final result to user you must check once if everything is correct.

    Rules:
    - Strictly follow JSON output format
    - Always follow sequence: START → THINK → EVALUATE → OUTPUT
    - After every THINK, an EVALUATE step must happen (done by a judge)
    - Do one step at a time and wait
    - Final OUTPUT must only come after enough THINK + EVALUATE

    JSON Format:
    { "step": "START | THINK | EVALUATE | OUTPUT", "content": "string" }
  `;

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: "Write a code in JS to find a prime number as fast as possible" },
  ];

  while (true) {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
    });

    const rawContent = response.choices[0].message.content;
    const parsedContent = safeParseJSON(rawContent);

    if (!parsedContent) {
      console.error("❌ Could not parse assistant response:", rawContent);
      break;
    }

    messages.push({ role: "assistant", content: JSON.stringify(parsedContent) });

    if (parsedContent.step === "START") {
      console.log("🔥 START:", parsedContent.content);
      continue;
    }

    if (parsedContent.step === "THINK") {
      console.log("🧠 THINK:", parsedContent.content);

      // ✅ Use Gemini as judge
      const judgeEval = await evaluateThinkStep(messages, parsedContent);

      console.log("✅ EVALUATE:", judgeEval.content);

      messages.push({
        role: "developer", // can also use "user" if "developer" not supported
        content: JSON.stringify(judgeEval),
      });

      continue;
    }

    if (parsedContent.step === "OUTPUT") {
      console.log("🤖 OUTPUT:", parsedContent.content);
      break;
    }
  }

  console.log("✅ Done...");
}

main();
