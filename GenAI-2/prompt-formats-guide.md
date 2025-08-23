# 🎭 AI Prompt Formats & Styles Complete Guide
*Understanding Different Model Prompt Conventions*

---

## 📚 Table of Contents
1. [Why Prompt Formats Matter](#why-prompt-formats-matter)
2. [Alpaca Format](#alpaca-format)
3. [INST Format (Llama)](#inst-format-llama)
4. [ChatML Format](#chatml-format)
5. [Other Popular Formats](#other-popular-formats)
6. [JavaScript Implementation](#javascript-implementation)
7. [Format Comparison & When to Use Each](#format-comparison--when-to-use-each)
8. [Converting Between Formats](#converting-between-formats)

---

## 🔹 Why Prompt Formats Matter

Different AI models are **trained with specific conversation formats**. Using the correct format is crucial for:

- **Better Performance**: Models perform best with their native format
- **Consistent Behavior**: Proper formatting ensures reliable responses
- **Model Compatibility**: Different models expect different structures
- **Fine-tuning**: When training custom models, format consistency matters

### The Problem:
```javascript
// Same content, different formats - different results!
const samePrompt = "Explain JavaScript closures";

// Generic format (may work poorly)
const generic = samePrompt;

// Model-specific format (optimized performance)
const alpaca = `### Instruction:\nExplain JavaScript closures\n\n### Response:\n`;
const llama = `[INST] Explain JavaScript closures [/INST]`;
const chatml = `<|im_start|>user\nExplain JavaScript closures<|im_end|>\n<|im_start|>assistant\n`;
```

---

## 🔹 Alpaca Format

**Origin**: Created by Stanford for the Alpaca model (fine-tuned LLaMA)
**Used by**: Alpaca, Vicuna, many open-source models

### Structure:
```
### Instruction:
[Your instruction here]

### Input:
[Optional context or input data]

### Response:
[Model generates response here]
```

### Examples:

#### Basic Instruction:
```
### Instruction:
Write a JavaScript function to reverse a string.

### Response:
```

#### With Input Context:
```
### Instruction:
Debug this JavaScript code and fix the errors.

### Input:
function calculateSum(a, b) {
  return a + b
}

const result = calculateSum(5, "10");
console.log(result);

### Response:
```

#### Complex Multi-part:
```
### Instruction:
You are a senior JavaScript developer. Review the following code for best practices, performance, and security issues.

### Input:
const userInput = document.getElementById('search').value;
const query = "SELECT * FROM users WHERE name = '" + userInput + "'";
fetch('/api/search?q=' + query)
  .then(response => response.json())
  .then(data => document.body.innerHTML = data.html);

### Response:
```

### JavaScript Implementation:
```javascript
class AlpacaPromptFormatter {
  static format(instruction, input = null, response = null) {
    let prompt = `### Instruction:\n${instruction}\n\n`;
    
    if (input) {
      prompt += `### Input:\n${input}\n\n`;
    }
    
    prompt += `### Response:\n`;
    
    if (response) {
      prompt += response;
    }
    
    return prompt;
  }

  static parse(formattedPrompt) {
    const sections = {
      instruction: null,
      input: null,
      response: null
    };
    
    const instructionMatch = formattedPrompt.match(/### Instruction:\n(.*?)\n\n/s);
    if (instructionMatch) sections.instruction = instructionMatch[1];
    
    const inputMatch = formattedPrompt.match(/### Input:\n(.*?)\n\n/s);
    if (inputMatch) sections.input = inputMatch[1];
    
    const responseMatch = formattedPrompt.match(/### Response:\n(.*?)$/s);
    if (responseMatch) sections.response = responseMatch[1];
    
    return sections;
  }
}

// Usage
const prompt = AlpacaPromptFormatter.format(
  "Explain async/await in JavaScript",
  "Focus on practical examples and common pitfalls"
);
```

---

## 🔹 INST Format (Llama)

**Origin**: Meta's LLaMA and Llama 2 models
**Used by**: LLaMA, Llama 2, Code Llama, many derivatives

### Structure:
```
[INST] Your instruction here [/INST]
```

### For Conversations:
```
[INST] First message [/INST] First response [INST] Second message [/INST]
```

### Examples:

#### Simple Instruction:
```
[INST] Write a Python function to check if a number is prime. [/INST]
```

#### With System Message:
```
[INST] <<SYS>>
You are a helpful coding assistant specializing in JavaScript.
<</SYS>>

Explain how event bubbling works in JavaScript. [/INST]
```

#### Multi-turn Conversation:
```
[INST] What is a closure in JavaScript? [/INST] A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has finished executing. Here's an example:

```javascript
function outerFunction(x) {
  return function(y) {
    return x + y;
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // Output: 8
```

[INST] Can you show me a practical use case for closures? [/INST]
```

### JavaScript Implementation:
```javascript
class LlamaPromptFormatter {
  static format(instruction, systemMessage = null) {
    if (systemMessage) {
      return `[INST] <<SYS>>\n${systemMessage}\n<</SYS>>\n\n${instruction} [/INST]`;
    }
    return `[INST] ${instruction} [/INST]`;
  }

  static formatConversation(messages) {
    let formatted = '';
    
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      
      if (message.role === 'user') {
        if (i === 0 && message.system) {
          formatted += `[INST] <<SYS>>\n${message.system}\n<</SYS>>\n\n${message.content} [/INST]`;
        } else {
          formatted += `[INST] ${message.content} [/INST]`;
        }
      } else if (message.role === 'assistant') {
        formatted += ` ${message.content} `;
      }
    }
    
    return formatted;
  }

  static parse(formattedPrompt) {
    const messages = [];
    const parts = formattedPrompt.split(/\[INST\]|\[\/INST\]/);
    
    for (let i = 1; i < parts.length; i += 2) {
      const userPart = parts[i].trim();
      const assistantPart = parts[i + 1] ? parts[i + 1].trim() : null;
      
      // Extract system message if present
      const systemMatch = userPart.match(/<<SYS>>\n(.*?)\n<\/SYS>>\n\n(.*)/s);
      if (systemMatch) {
        messages.push({
          role: 'user',
          content: systemMatch[2],
          system: systemMatch[1]
        });
      } else {
        messages.push({
          role: 'user',
          content: userPart
        });
      }
      
      if (assistantPart) {
        messages.push({
          role: 'assistant',
          content: assistantPart
        });
      }
    }
    
    return messages;
  }
}

// Usage
const prompt = LlamaPromptFormatter.format(
  "Explain JavaScript promises",
  "You are an expert JavaScript developer"
);

const conversation = LlamaPromptFormatter.formatConversation([
  { role: 'user', content: 'What is async/await?', system: 'You are a helpful coding tutor' },
  { role: 'assistant', content: 'Async/await is a syntax that makes it easier to work with promises...' },
  { role: 'user', content: 'Can you show an example?' }
]);
```

---

## 🔹 ChatML Format

**Origin**: OpenAI (used in GPT-3.5, GPT-4, and other models)
**Used by**: OpenAI models, many fine-tuned models

### Structure:
```
<|im_start|>system
System message here
<|im_end|>
<|im_start|>user
User message here
<|im_end|>
<|im_start|>assistant
Assistant response here
<|im_end|>
```

### Examples:

#### Basic Chat:
```
<|im_start|>system
You are a helpful assistant specialized in JavaScript development.
<|im_end|>
<|im_start|>user
How do I handle errors in async functions?
<|im_end|>
<|im_start|>assistant
```

#### Multi-turn with Code:
```
<|im_start|>system
You are a code reviewer. Provide constructive feedback on code quality, performance, and best practices.
<|im_end|>
<|im_start|>user
Please review this JavaScript function:

function getData(url) {
  return fetch(url).then(r => r.json());
}
<|im_end|>
<|im_start|>assistant
Here's my review of your function:

**Positive aspects:**
- Clean and concise
- Uses modern fetch API
- Returns a promise for chaining

**Improvements needed:**
1. **Error Handling**: No error handling for network failures or non-200 responses
2. **Input Validation**: Should validate the URL parameter
3. **Type Safety**: Consider adding JSDoc or TypeScript

**Improved version:**
```javascript
/**
 * Fetches JSON data from a URL with proper error handling
 * @param {string} url - The URL to fetch from
 * @returns {Promise<Object>} The JSON response
 * @throws {Error} If the request fails or URL is invalid
 */
async function getData(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('Valid URL string is required');
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}
```
<|im_end|>
<|im_start|>user
Thanks! How would I use this with proper error handling in my app?
<|im_end|>
<|im_start|>assistant
```

### JavaScript Implementation:
```javascript
class ChatMLFormatter {
  static format(messages) {
    let formatted = '';
    
    messages.forEach(message => {
      formatted += `<|im_start|>${message.role}\n${message.content}\n<|im_end|>\n`;
    });
    
    return formatted;
  }

  static addMessage(formatted, role, content) {
    return formatted + `<|im_start|>${role}\n${content}\n<|im_end|>\n`;
  }

  static parse(formattedPrompt) {
    const messages = [];
    const messagePattern = /<\|im_start\|>(\w+)\n(.*?)\n<\|im_end\|>/gs;
    let match;
    
    while ((match = messagePattern.exec(formattedPrompt)) !== null) {
      messages.push({
        role: match[1],
        content: match[2]
      });
    }
    
    return messages;
  }

  static createSystemMessage(content) {
    return `<|im_start|>system\n${content}\n<|im_end|>\n`;
  }

  static startAssistantResponse(previousMessages) {
    return previousMessages + `<|im_start|>assistant\n`;
  }
}

// Usage
const messages = [
  { role: 'system', content: 'You are a helpful JavaScript tutor.' },
  { role: 'user', content: 'Explain event loops' },
  { role: 'assistant', content: 'The event loop is...' },
  { role: 'user', content: 'Can you provide an example?' }
];

const formatted = ChatMLFormatter.format(messages);
```

---

## 🔹 Other Popular Formats

### 1. **ShareGPT Format**
Used for training conversational models:
```json
{
  "conversations": [
    {
      "from": "human",
      "value": "How do JavaScript closures work?"
    },
    {
      "from": "gpt", 
      "value": "Closures are functions that have access to variables..."
    }
  ]
}
```

### 2. **OpenAssistant Format**
```
<|prompter|>Explain async/await in JavaScript<|endoftext|>
<|assistant|>Async/await is a modern JavaScript feature...<|endoftext|>
```

### 3. **Dolly Format**
```
### Instruction:
[instruction]

### Context:
[context if applicable]

### Response:
[response]
```

### 4. **Mistral Format**
```
<s>[INST] Your question here [/INST] Model response</s>[INST] Follow-up question [/INST]
```

### JavaScript Implementation for Multiple Formats:
```javascript
class UniversalPromptFormatter {
  static formats = {
    ALPACA: 'alpaca',
    LLAMA: 'llama', 
    CHATML: 'chatml',
    SHAREGPT: 'sharegpt',
    OPENASSISTANT: 'openassistant'
  };

  static format(messages, format, options = {}) {
    switch (format) {
      case this.formats.ALPACA:
        return this.formatAlpaca(messages, options);
      case this.formats.LLAMA:
        return this.formatLlama(messages, options);
      case this.formats.CHATML:
        return this.formatChatML(messages, options);
      case this.formats.SHAREGPT:
        return this.formatShareGPT(messages, options);
      case this.formats.OPENASSISTANT:
        return this.formatOpenAssistant(messages, options);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  static formatAlpaca(messages, options) {
    if (messages.length !== 1) {
      throw new Error('Alpaca format expects single instruction');
    }
    
    const { instruction, input } = messages[0];
    let prompt = `### Instruction:\n${instruction}\n\n`;
    
    if (input) {
      prompt += `### Input:\n${input}\n\n`;
    }
    
    prompt += `### Response:\n`;
    return prompt;
  }

  static formatLlama(messages, options) {
    let formatted = '';
    const systemMessage = options.system;
    
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      
      if (message.role === 'user') {
        if (i === 0 && systemMessage) {
          formatted += `[INST] <<SYS>>\n${systemMessage}\n<</SYS>>\n\n${message.content} [/INST]`;
        } else {
          formatted += `[INST] ${message.content} [/INST]`;
        }
      } else if (message.role === 'assistant') {
        formatted += ` ${message.content} `;
      }
    }
    
    return formatted;
  }

  static formatChatML(messages, options) {
    let formatted = '';
    
    messages.forEach(message => {
      formatted += `<|im_start|>${message.role}\n${message.content}\n<|im_end|>\n`;
    });
    
    if (options.startAssistant) {
      formatted += `<|im_start|>assistant\n`;
    }
    
    return formatted;
  }

  // Convert between formats
  static convert(prompt, fromFormat, toFormat, options = {}) {
    const messages = this.parse(prompt, fromFormat);
    return this.format(messages, toFormat, options);
  }

  static parse(prompt, format) {
    switch (format) {
      case this.formats.ALPACA:
        return this.parseAlpaca(prompt);
      case this.formats.LLAMA:
        return this.parseLlama(prompt);
      case this.formats.CHATML:
        return this.parseChatML(prompt);
      default:
        throw new Error(`Parsing not implemented for: ${format}`);
    }
  }

  // Auto-detect format
  static detectFormat(prompt) {
    if (prompt.includes('### Instruction:')) return this.formats.ALPACA;
    if (prompt.includes('[INST]')) return this.formats.LLAMA;
    if (prompt.includes('<|im_start|>')) return this.formats.CHATML;
    if (prompt.includes('<|prompter|>')) return this.formats.OPENASSISTANT;
    return null;
  }
}

// Usage Examples
const messages = [
  { role: 'system', content: 'You are a helpful assistant' },
  { role: 'user', content: 'Explain closures' }
];

// Format for different models
const alpacaPrompt = UniversalPromptFormatter.format(
  [{ instruction: 'Explain closures', input: 'Focus on JavaScript' }], 
  'alpaca'
);

const llamaPrompt = UniversalPromptFormatter.format(messages, 'llama', {
  system: 'You are a helpful assistant'
});

const chatMLPrompt = UniversalPromptFormatter.format(messages, 'chatml');

// Convert between formats
const converted = UniversalPromptFormatter.convert(
  alpacaPrompt, 
  'alpaca', 
  'chatml'
);

// Auto-detect and convert
const detectedFormat = UniversalPromptFormatter.detectFormat(somePrompt);
const converted = UniversalPromptFormatter.convert(somePrompt, detectedFormat, 'chatml');
```

---

## 🔹 Format Comparison & When to Use Each

| Format | Best For | Pros | Cons | Models |
|--------|----------|------|------|---------|
| **Alpaca** | Single instructions, training data | Simple, clear structure | Limited conversation support | Alpaca, Vicuna, many open models |
| **INST (Llama)** | Conversations, system prompts | Flexible, conversation-aware | More complex syntax | LLaMA, Llama 2, Code Llama |
| **ChatML** | Multi-turn chats, role-based | Very flexible, clear roles | Verbose, not all models support | GPT-3.5/4, many fine-tuned models |
| **ShareGPT** | Training conversational models | Standard for training | JSON format, not for inference | Training datasets |
| **OpenAssistant** | Open-source alternatives | Community standard | Limited adoption | OpenAssistant models |

### Model-Specific Recommendations:

```javascript
const formatRecommendations = {
  'llama-2-7b': 'llama',
  'llama-2-13b': 'llama', 
  'llama-2-70b': 'llama',
  'code-llama': 'llama',
  'alpaca-7b': 'alpaca',
  'vicuna-7b': 'alpaca',
  'gpt-3.5-turbo': 'chatml',
  'gpt-4': 'chatml',
  'mistral-7b': 'llama',
  'openchat': 'chatml'
};

function getRecommendedFormat(modelName) {
  return formatRecommendations[modelName.toLowerCase()] || 'chatml';
}
```

---

## 🔹 Practical Implementation Tips

### 1. **Dynamic Format Selection**
```javascript
class SmartPromptFormatter {
  constructor(modelName) {
    this.modelName = modelName;
    this.format = this.detectOptimalFormat(modelName);
  }

  detectOptimalFormat(modelName) {
    if (modelName.includes('llama') || modelName.includes('mistral')) {
      return 'llama';
    }
    if (modelName.includes('alpaca') || modelName.includes('vicuna')) {
      return 'alpaca';
    }
    return 'chatml'; // Default fallback
  }

  formatPrompt(messages, options = {}) {
    return UniversalPromptFormatter.format(messages, this.format, options);
  }
}
```

### 2. **Template System**
```javascript
const promptTemplates = {
  codeReview: {
    alpaca: {
      instruction: "Review this {{language}} code for best practices and potential issues.",
      input: "{{code}}"
    },
    llama: {
      system: "You are an expert {{language}} developer and code reviewer.",
      message: "Please review this code for best practices and potential issues:\n\n{{code}}"
    },
    chatml: [
      { role: 'system', content: 'You are an expert {{language}} developer and code reviewer.' },
      { role: 'user', content: 'Please review this code for best practices and potential issues:\n\n{{code}}' }
    ]
  }
};

function getFormattedPrompt(template, format, variables) {
  const promptTemplate = promptTemplates[template][format];
  
  if (format === 'chatml') {
    return promptTemplate.map(msg => ({
      ...msg,
      content: msg.content.replace(/\{\{(\w+)\}\}/g, (match, key) => variables[key] || match)
    }));
  }
  
  // Handle other formats...
  return promptTemplate;
}
```

### 3. **Performance Optimization**
```javascript
class PromptCache {
  constructor() {
    this.cache = new Map();
  }

  getFormattedPrompt(messages, format, cacheKey) {
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const formatted = UniversalPromptFormatter.format(messages, format);
    this.cache.set(cacheKey, formatted);
    return formatted;
  }

  clear() {
    this.cache.clear();
  }
}
```

---

## 🎯 Key Takeaways

### Essential Points:
1. **Format Matters** - Using the right format can improve model performance by 20-30%
2. **Model-Specific** - Each model family has preferred formats
3. **Consistency** - Stick to one format throughout your application
4. **Testing** - Always test different formats to find what works best

### Best Practices:
```javascript
// ✅ Good: Format-aware implementation
class AIClient {
  constructor(modelName) {
    this.model = modelName;
    this.formatter = new SmartPromptFormatter(modelName);
  }

  async generate(messages, options = {}) {
    const formattedPrompt = this.formatter.formatPrompt(messages, options);
    return await this.callModel(formattedPrompt);
  }
}

// ❌ Bad: One-size-fits-all approach
function generateResponse(prompt) {
  return callModel(prompt); // No format consideration
}
```

### Quick Reference:
- **Llama models**: Use `[INST]` format
- **Alpaca models**: Use `### Instruction:` format  
- **OpenAI models**: Use ChatML format
- **Unknown models**: Try ChatML first, then experiment

### Next Steps:
1. **Test with your models** - Try different formats and measure performance
2. **Build a formatter library** - Create reusable formatting utilities
3. **Monitor performance** - Track which formats work best for your use cases
4. **Stay updated** - New models may have new preferred formats

---

*Remember: The best format is the one that gives you the best results with your specific model and use case!* 🎯