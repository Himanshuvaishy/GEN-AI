```js
ChatML Prompt Style

ChatML (Chat Markup Language) is a structured format for defining conversational prompts for generative AI models. It is mainly used to encode multi-turn dialogues, providing clear boundaries for system, user, and assistant messages.

Structure
Each message in ChatML is wrapped between special boundary tokens:

text
<|im_start|>role
message content
<|im_end|>
role: Identifies the message type and should be system, user, assistant, or (less frequently) tool.

Multiple messages are concatenated to create a complete chat prompt.

Example
Basic Example:

text
<|im_start|>system
Assistant is a large language model trained by OpenAI.
<|im_end|>
<|im_start|>user
Who were the founders of Microsoft?
<|im_end|>
<|im_start|>assistant

<|im_end|>
With Instructions:

text
<|im_start|>system
Assistant is an intelligent chatbot designed to help users answer their tax related questions.

Instructions:
- Only answer questions related to taxes.
- If you're unsure of an answer, say "I don't know" and recommend visiting the IRS website.
<|im_end|>
<|im_start|>user
When are my taxes due?
<|im_end|>
<|im_start|>assistant

<|im_end|>
Roles
system: Sets up context, constraints, or instructions.

user: Represents messages from the user.

assistant: The model’s replies.

tool: Optional, for tool outputs (rarely used unless supported).

Key Principles
Each message is bounded by <|im_start|>role and <|im_end|>.

Message order matters: The system message should come first, followed by the conversation turns.

Use plain text between the tokens; avoid adding extra markup inside the message body.

Usage in Code (JavaScript Example)
javascript
const chatml = [
  "<|im_start|>system",
  "You are a helpful AI assistant.",
  "<|im_end|>",
  "<|im_start|>user",
  "Explain the concept of ChatML.",
  "<|im_end|>",
  "<|im_start|>assistant",
  // Model response goes here
  "<|im_end|>"
].join('\n');
Benefits
Clarity: Boundaries prevent role confusion in multi-turn chat prompts.

Flexibility: Easily add as many turns as needed.

Compatibility: Used in OpenAI and compatible frameworks.

Best Practices
Always start with a system message for context.

Alternate clearly between user and assistant.

For complex instructions, enumerate them as bullet points inside the system message.

Leave the assistant’s reply blank if you want the model to generate the next response.