# 🟢 Zero-Shot Prompting

Zero-shot prompting is one of the **system prompting styles** in Generative AI.  
Here are the full notes with explanation, dry runs, and examples.

---

## 🔹 What is Zero-Shot Prompting?
- **Zero-shot** = The model performs a task **without being given examples**.  
- You provide **only the instruction** (and input if needed).  
- The model uses its **pretrained knowledge** to figure out the answer.

👉 Think of it like asking a human a direct question without showing any sample solutions.

---

## 🔹 Why Use Zero-Shot Prompting?
✅ Fastest and simplest method — no dataset required  
✅ Great for common tasks (translation, summarization, classification, Q&A)  
✅ Useful for testing baseline model ability  

⚠️ Limitation: May fail if instruction is vague or task is unusual.

---

## 🔹 Examples

### 1. Sentiment Classification
**Prompt:**
```
Classify the sentiment of this review as Positive, Negative, or Neutral:
"I really love the new phone, the battery lasts forever!"
```

**Response:**
```
Positive
```

---

### 2. Translation
**Prompt:**
```
Translate this sentence into French:
"Good evening, how are you?"
```

**Response:**
```
Bonsoir, comment ça va ?
```

---

### 3. Summarization
**Prompt:**
```
Summarize the following in one sentence:
"The iPhone 15 introduces a new A17 chip, better battery life, and improved cameras."
```

**Response:**
```
The iPhone 15 is faster with better battery and cameras.
```

---

### 4. Question Answering
**Prompt:**
```
Who wrote the play Romeo and Juliet?
```

**Response:**
```
William Shakespeare
```

---

## 🔹 Dry Run (How the Model Thinks Internally)

### Example: Sentiment Classification
**Prompt:**
```
Classify the sentiment of this review as Positive, Negative, or Neutral:
"I really love the new phone, the battery lasts forever!"
```

**Step 1:** Read the instruction → task = sentiment classification  
**Step 2:** Focus on input → “love”, “lasts forever” → positive tone  
**Step 3:** Recall learned patterns from training → "love" → Positive sentiment  
**Step 4:** Restrict to options (Positive / Negative / Neutral)  
**Step 5:** Output → **Positive**  

---

### Example: Translation
**Prompt:**
```
Translate this sentence into French:
"Good morning, how are you?"
```

**Step 1:** Instruction → translation task  
**Step 2:** Input → "Good morning, how are you?"  
**Step 3:** Recall learned mappings → Good morning → Bonjour, How are you? → Comment ça va ?  
**Step 4:** Output → **"Bonjour, comment ça va ?"**

---

## 🔹 Zero-Shot Example in **ChatML Format** (JS Task)

**Task:** Write a JavaScript function to reverse a string.

**ChatML Prompt:**
```json
[
  {"role": "system", "content": "You are a helpful assistant that writes clean JavaScript code."},
  {"role": "user", "content": "Write a JavaScript function that reverses a string."}
]
```

**Expected Model Response:**
```js
function reverseString(str) {
  return str.split("").reverse().join("");
}
```

---

✅ In short: Zero-shot prompting = *ask directly, no examples given*.  
The model generalizes from what it already knows.
