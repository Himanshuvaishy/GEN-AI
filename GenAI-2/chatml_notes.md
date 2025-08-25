````js 
**ChatML Prompting Notes**

ChatML structures conversations with role-tagged messages so models know who is speaking and how to respond. The core roles are: system, user, assistant, and tool. They should alternate like a dialogue.

What it is
ChatML is a simple message list with roles and content that guides a chat model’s behavior.

Order matters: after optional system messages, roles should alternate user → assistant → user → assistant.

Keeps prompts clean, predictable, and easy to debug.

Roles
System
Purpose: Global rules, persona, tone, safety, and output format.

Guidance: Keep concise and unambiguous; front-load the most important constraints.

Example:

“You are a helpful assistant. Answer briefly. Output only the final answer.”

User
Purpose: Human request, question, or task description.

Guidance: State the task and desired format; include minimal context.

Example:

“Explain recursion in one sentence.”

Assistant
Purpose: Model’s reply to the latest user turn, following the system rules.

Guidance: Direct, structured, and aligned with requested format.

Example:

“Recursion is when a function solves a problem by calling a smaller version of itself.”

Tool
Purpose: When the assistant calls a function/API, the tool role carries the tool’s raw result back to the model.

Guidance: Use machine-readable, factual outputs only (no narrative).

Example content:

JSON string or plain text returned by a calculator, search, or database.

Alternation Rules
Valid sequence:

[system?], user, assistant, user, assistant, …

Avoid consecutive same-role turns (e.g., user followed by user) without an assistant turn in between.

Treat each assistant reply as the model’s turn that closes the current user turn.

Analogy
Think of a play: system = director’s notes, user = audience prompt, assistant = actor’s line, tool = stagehand delivering a prop.

Key Takeaways
System sets behavior; user asks; assistant answers; tool returns data.

Messages must alternate after system; this prevents 400 errors for invalid dialogue order.

Keep system rules short and specific to get predictable outputs.

Put strict formatting requirements in system to control verbosity.

Tiny JavaScript Example (≤20 lines)
js
const messages = [
  { role: "system", content: "Answer briefly. Output only the final answer." },
  { role: "user", content: "2 + 2?" }
];
// Send messages to a Chat Completions API
// Read the result from choices[0].message.content
