# 🧑‍💻 Prompting Styles in Generative AI (with Examples)

This guide summarizes different **prompting formats** used by various models.  
Keep this as a reference when working with OpenAI, Claude, LLaMA, and other models.

---

## 1. Plain Text Prompting
**Description:** Raw text input, no roles, no structure.  
**Used in:** GPT-2, early GPT-3, HuggingFace text-generation models.

**Example:**
```
Translate to French: "Good morning"
```

---

## 2. ChatML (OpenAI style)
**Description:** Structured format using messages with roles (`system`, `user`, `assistant`, `tool`).  
**Used in:** GPT-3.5, GPT-4.

**Example:**
```json
[
  {"role": "system", "content": "You are a helpful assistant."},
  {"role": "user", "content": "Write a haiku about JavaScript."}
]
```

---

## 3. Instruction-Tuning Format (Alpaca / LLaMA style)
**Description:** Uses explicit *Instruction* and *Response* sections.  
**Used in:** Alpaca, Vicuna, Falcon-Instruct, LLaMA-based instruct models.

**Example:**
```
### Instruction:
Write a function in JavaScript that reverses a string.

### Response:
function reverseString(str) {
  return str.split("").reverse().join("");
}
```

---

## 4. Human / Assistant Tags (Claude style)
**Description:** Conversational format with `Human:` and `Assistant:` markers.  
**Used in:** Anthropic Claude.

**Example:**
```
Human: Write a short bedtime story about a dragon.
Assistant: Once upon a time, in a faraway land...
```

---

## 5. RLHF Training Format
**Description:** Dataset style with `prompt`, `chosen`, and `rejected` responses.  
**Used in:** Reinforcement Learning with Human Feedback datasets.

**Example:**
```json
{
  "prompt": "Explain what an API is in simple words.",
  "chosen": "An API is like a waiter that takes your request and brings back what you need.",
  "rejected": "An API is an abbreviation for Application Programming Interface."
}
```

---

## 6. Tool / Function Calling Prompts
**Description:** Models return structured JSON to call external functions or APIs.  
**Used in:** OpenAI function calling, LangChain agents.

**Example:**
```json
{
  "role": "system",
  "content": "You can call functions when necessary."
},
{
  "role": "user",
  "content": "What's the weather in London?"
}
```

Model responds:
```json
{
  "name": "get_weather",
  "arguments": { "location": "London" }
}
```

---

## 7. Custom RAG Templates (Retrieval-Augmented Generation)
**Description:** Extra context is added to the prompt for knowledge-based Q&A.  
**Used in:** LangChain, LlamaIndex, RAG pipelines.

**Example:**
```
You are an assistant answering questions based on context.

Context:
[Document snippets here]

Question: What are Typed Arrays in JS?
Answer:
```

---

# ⚡ Quick Comparison Table

| Style                | Example Models            | When to Use |
|-----------------------|---------------------------|-------------|
| Plain text           | GPT-2, raw HuggingFace    | Simple tasks |
| ChatML               | GPT-3.5, GPT-4            | Chat-like apps |
| Instruction/Alpaca   | Alpaca, LLaMA, Falcon     | Instruction-tuned models |
| Human/Assistant      | Claude, some OSS models   | Conversational AI |
| Function calling     | OpenAI tools, LangChain   | Structured outputs |
| Custom RAG templates | Any model                 | Knowledge-based QA |

---

✅ Keep this cheat sheet handy when switching between providers — prompt formatting matters!  
