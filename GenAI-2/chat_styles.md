
# Different Chat Styles with AI Models

This document explains the **different styles of prompting and chat formats** used when interacting with AI models, 
as illustrated in the provided diagram.

---

## 1. Alpaca Prompting Style
- **Format:**
  ```
  Instruction:
  ### Input:
  ### Response:
  ```

- **Example:**
  ```
  Instruction: Translate English to French
  Input: Hello, how are you?
  Response: Bonjour, comment ça va?
  ```

- **Usage:**  
  This was popularized by the **Alpaca model** (Stanford’s fine-tuned version of LLaMA).  
  It clearly separates instruction, input, and response for clarity.

---

## 2. INST Format (LLaMA-2)
- **Format:**
  ```
  [INST] What is an LRU Cache? [/INST]
  ```

- **Explanation:**  
  LLaMA-2 uses this **instruction-wrapped style** for training and inference.  
  Wrapping instructions inside `[INST] ... [/INST]` helps the model identify user queries.

---

## 3. FLAN-T5 Style
- **Format:**
  ```
  "Question: What is AI? 
  Answer:"
  ```

- **Explanation:**  
  FLAN-T5 (Google’s fine-tuned T5 model) uses a simple **Q → A format**.  
  It’s minimal and works well for instruction-following tasks.

---

## 4. ChatML (OpenAI Style)
- **Format:**
  ```json
  [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Write code in JS" },
    { "role": "assistant", "content": "Sure, here’s an example..." }
  ]
  ```

- **Explanation:**  
  OpenAI uses **ChatML**, which defines roles such as:
  - **system** → sets the behavior and tone of the assistant
  - **user** → human input
  - **assistant** → AI response
  - **developer** → special role for advanced use cases

This structured format allows **multi-turn conversations**.

---

## 5. Message Representations (Right Side of Diagram)
The same message can be represented in multiple formats depending on API/system design:

- **Plain Text:**  
  ```
  Hey, How are you?
  ```

- **JSON Format:**  
  ```json
  { "text": "Hey, How are you?" }
  ```

- **XML-like Format:**  
  ```xml
  <message>Hey, How are you?</message>
  ```

---

## Summary
- **Alpaca Prompt** → Instruction/Input/Response format  
- **INST Format** → Wrapped `[INST] ... [/INST]` for LLaMA-2  
- **FLAN-T5** → Q/A structured prompt  
- **ChatML** → Role-based messaging for OpenAI models  
- **Text Representations** → Same data shown as Plain text, JSON, or XML  

Each style reflects **how different models are trained and expected to receive input**.
