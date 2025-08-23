# 🎯 Module 2: Mastering Prompts in Generative AI
*From Beginner to Advanced Prompt Engineering*

---

## 📚 Table of Contents
1. [What is Prompt Engineering?](#what-is-prompt-engineering)
2. [Types of Prompts](#types-of-prompts)
3. [Prompt Structure & Components](#prompt-structure--components)
4. [Basic Prompting Techniques](#basic-prompting-techniques)
5. [Advanced Prompting Strategies](#advanced-prompting-strategies)
6. [JavaScript Implementation](#javascript-implementation)
7. [Real-World Examples](#real-world-examples)
8. [Common Mistakes & Best Practices](#common-mistakes--best-practices)
9. [Measuring Prompt Effectiveness](#measuring-prompt-effectiveness)

---

## 🔹 What is Prompt Engineering?

**Prompt Engineering** is the art and science of crafting inputs (prompts) to get the best possible outputs from AI models like GPT, Claude, or other LLMs.

### Why Prompt Engineering Matters:
- **Same model, different results** - A well-crafted prompt can dramatically improve output quality
- **Cost efficiency** - Better prompts reduce the need for multiple attempts
- **Consistency** - Good prompts produce more reliable results
- **Control** - You can guide the AI's behavior, tone, and output format

### The Prompt Engineering Spectrum:
```
Basic Query → Structured Prompt → Advanced Techniques → Prompt Optimization
    ↓              ↓                    ↓                    ↓
"Write code"   Clear instructions   Chain-of-thought    A/B testing
```

---

## 🔹 Types of Prompts

### 1. **Zero-Shot Prompts**
Give the model a task without any examples.

```
Translate this to French: "Hello, how are you?"
```

### 2. **Few-Shot Prompts** 
Provide examples to guide the model.

```
Translate these phrases to French:
English: "Good morning"
French: "Bonjour"

English: "Thank you"
French: "Merci"

English: "How are you?"
French:
```

### 3. **Chain-of-Thought (CoT) Prompts**
Ask the model to show its reasoning process.

```
Solve this step by step:
If a train travels 60 miles in 45 minutes, what's its speed in mph?

Think through this problem:
1. First, identify what we know
2. Then, determine what we need to find
3. Finally, calculate the answer
```

### 4. **Role-Based Prompts**
Ask the AI to adopt a specific persona or expertise.

```
You are a senior JavaScript developer with 10 years of experience.
Explain async/await to a junior developer who just learned callbacks.
```

### 5. **System Prompts**
High-level instructions that set the AI's behavior for the entire conversation.

```javascript
const systemPrompt = `You are a helpful coding assistant that:
- Writes clean, well-commented code
- Explains complex concepts simply
- Always considers edge cases
- Suggests best practices`;
```

---

## 🔹 Prompt Structure & Components

### Basic Prompt Anatomy:
```
[Context] + [Instruction] + [Input] + [Output Format] = Complete Prompt
```

### 1. **Context Setting**
```
You are an expert data analyst working with e-commerce data.
```

### 2. **Clear Instructions**
```
Analyze the following sales data and identify trends.
```

### 3. **Specific Input**
```
Sales Data:
- January: $50,000
- February: $65,000  
- March: $48,000
```

### 4. **Output Format**
```
Please provide:
1. Key trends identified
2. Potential reasons for changes
3. Recommendations for next quarter
```

### Complete Prompt Example:
```
You are an expert data analyst working with e-commerce data.

Analyze the following sales data and identify trends:

Sales Data:
- January: $50,000
- February: $65,000  
- March: $48,000

Please provide:
1. Key trends identified
2. Potential reasons for changes  
3. Recommendations for next quarter

Format your response as a professional report.
```

---

## 🔹 Basic Prompting Techniques

### 1. **Be Specific and Clear**

❌ **Bad:** "Write some code"
✅ **Good:** "Write a JavaScript function that validates email addresses using regex and returns true for valid emails, false for invalid ones"

### 2. **Use Examples (Few-Shot Learning)**

```
Convert these natural language queries to SQL:

Example 1:
Query: "Find all customers from New York"
SQL: SELECT * FROM customers WHERE city = 'New York';

Example 2:
Query: "Get the top 5 products by sales"
SQL: SELECT * FROM products ORDER BY sales DESC LIMIT 5;

Now convert this:
Query: "Find customers who made purchases in the last 30 days"
SQL:
```

### 3. **Ask for Step-by-Step Reasoning**

```
I need to debug this JavaScript code that's not working. 
Can you analyze it step by step?

[code here]

Please:
1. Identify what the code is trying to do
2. Find the specific errors
3. Explain why each error occurs
4. Provide the corrected version
```

### 4. **Specify Output Format**

```
List the differences between React and Vue.js in this format:

| Feature | React | Vue.js |
|---------|-------|--------|
| [feature] | [react approach] | [vue approach] |
```

### 5. **Use Constraints and Boundaries**

```
Explain machine learning in exactly 100 words, using only simple terms 
that a high school student would understand. Avoid jargon.
```

---

## 🔹 Advanced Prompting Strategies

### 1. **Chain-of-Thought (CoT) Prompting**

**Standard Prompt:**
```
What's 15% of 240?
```

**Chain-of-Thought Prompt:**
```
What's 15% of 240? Think step by step:
1. First, convert the percentage to decimal
2. Then multiply by the number
3. Show your work
```

### 2. **Tree of Thoughts**
Break complex problems into multiple reasoning paths.

```javascript
const treeOfThoughtsPrompt = `
Problem: Design a user authentication system for a web app.

Consider three different approaches:
Path A: Traditional username/password with sessions
Path B: JWT tokens with refresh tokens  
Path C: OAuth with third-party providers

For each path, analyze:
1. Security implications
2. User experience
3. Implementation complexity
4. Scalability

Then recommend the best approach and explain why.
`;
```

### 3. **Self-Consistency**
Ask for multiple solutions and compare them.

```
Solve this algorithm problem using 3 different approaches:

Problem: Find the two numbers in an array that add up to a target sum.

Approach 1: [Describe and implement]
Approach 2: [Describe and implement] 
Approach 3: [Describe and implement]

Compare time/space complexity and recommend the best solution.
```

### 4. **ReAct (Reasoning + Acting)**
Combine reasoning with tool usage.

```
I need to analyze website performance. Use this ReAct framework:

Thought: What metrics should I analyze?
Action: List key performance metrics
Observation: [Model provides metrics list]

Thought: How can I measure these with JavaScript?
Action: Provide code examples for each metric
Observation: [Model provides code]

Thought: What are the optimal values for these metrics?
Action: Define performance benchmarks
```

### 5. **Prompt Chaining**
Break complex tasks into sequential prompts.

```javascript
// Prompt 1: Analysis
const analysisPrompt = "Analyze this user feedback and extract key themes";

// Prompt 2: Categorization  
const categorizationPrompt = "Based on the themes identified, categorize them by priority";

// Prompt 3: Action Items
const actionPrompt = "Create specific action items for each high-priority theme";
```

---

## 🔹 JavaScript Implementation

### Building a Prompt Engineering Library

```javascript
class PromptEngineer {
  constructor(apiClient) {
    this.client = apiClient;
    this.templates = new Map();
  }

  // Template system for reusable prompts
  addTemplate(name, template) {
    this.templates.set(name, template);
  }

  // Fill template with variables
  fillTemplate(templateName, variables) {
    const template = this.templates.get(templateName);
    if (!template) throw new Error(`Template ${templateName} not found`);
    
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] || match;
    });
  }

  // Few-shot prompting
  createFewShotPrompt(task, examples, newInput) {
    let prompt = `Task: ${task}\n\nExamples:\n`;
    
    examples.forEach((example, index) => {
      prompt += `\nExample ${index + 1}:\n`;
      prompt += `Input: ${example.input}\n`;
      prompt += `Output: ${example.output}\n`;
    });
    
    prompt += `\nNow complete this:\nInput: ${newInput}\nOutput:`;
    return prompt;
  }

  // Chain of thought prompting
  createCoTPrompt(problem, steps = []) {
    let prompt = `Problem: ${problem}\n\n`;
    prompt += "Let's think step by step:\n";
    
    steps.forEach((step, index) => {
      prompt += `${index + 1}. ${step}\n`;
    });
    
    return prompt;
  }

  // Role-based prompting
  createRolePrompt(role, expertise, task, context = '') {
    return `You are a ${role} with expertise in ${expertise}.
    
    ${context ? `Context: ${context}\n` : ''}
    
    Task: ${task}
    
    Please respond based on your expertise and provide detailed, accurate information.`;
  }

  // Structured output prompting
  createStructuredPrompt(task, outputFormat) {
    return `${task}

Please format your response exactly as follows:
${outputFormat}`;
  }
}

// Usage Examples
const promptEngineer = new PromptEngineer(openaiClient);

// Add reusable templates
promptEngineer.addTemplate('codeReview', `
You are a senior {{language}} developer reviewing code.

Code to review:
{{code}}

Please provide:
1. Overall assessment (1-10 score)
2. Issues found (if any)
3. Suggestions for improvement
4. Security considerations
5. Performance optimizations
`);

// Use the template
const codeReviewPrompt = promptEngineer.fillTemplate('codeReview', {
  language: 'JavaScript',
  code: 'const getData = async () => { return fetch("/api/data"); }'
});
```

### Advanced Prompt Optimization

```javascript
class PromptOptimizer {
  constructor(apiClient) {
    this.client = apiClient;
    this.results = [];
  }

  // A/B test different prompts
  async comparePrompts(prompts, testInput, evaluationCriteria) {
    const results = [];
    
    for (const [name, prompt] of Object.entries(prompts)) {
      const response = await this.client.complete(prompt + testInput);
      const score = await this.evaluateResponse(response, evaluationCriteria);
      
      results.push({
        name,
        prompt,
        response,
        score
      });
    }
    
    return results.sort((a, b) => b.score - a.score);
  }

  async evaluateResponse(response, criteria) {
    const evaluationPrompt = `
    Evaluate this AI response based on these criteria:
    ${criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}
    
    Response to evaluate:
    "${response}"
    
    Provide a score from 1-10 for each criterion and an overall score.
    Format: {"criterion1": score, "criterion2": score, "overall": score}
    `;
    
    const evaluation = await this.client.complete(evaluationPrompt);
    return JSON.parse(evaluation).overall;
  }

  // Iterative prompt improvement
  async improvePrompt(initialPrompt, testCases, maxIterations = 3) {
    let currentPrompt = initialPrompt;
    let bestScore = 0;
    
    for (let i = 0; i < maxIterations; i++) {
      const variants = await this.generatePromptVariants(currentPrompt);
      const results = await this.testPrompts(variants, testCases);
      
      const bestResult = results[0];
      if (bestResult.score > bestScore) {
        bestScore = bestResult.score;
        currentPrompt = bestResult.prompt;
      }
    }
    
    return {
      prompt: currentPrompt,
      score: bestScore,
      iterations: maxIterations
    };
  }
}
```

### Prompt Libraries and Templates

```javascript
const promptLibrary = {
  // Code Generation
  codeGeneration: {
    basic: "Write a {{language}} function that {{description}}",
    withTests: `Write a {{language}} function that {{description}}.
    
    Requirements:
    - Include error handling
    - Add JSDoc comments
    - Write unit tests
    - Follow best practices`,
    
    withExamples: `Write a {{language}} function that {{description}}.
    
    Example usage:
    {{examples}}
    
    Implementation:`
  },

  // Analysis and Explanation
  analysis: {
    codeReview: `Review this {{language}} code:
    
    {{code}}
    
    Analyze:
    1. Code quality and style
    2. Performance implications
    3. Potential bugs or issues
    4. Security considerations
    5. Improvement suggestions`,
    
    debugging: `Debug this {{language}} code that's producing {{error}}:
    
    {{code}}
    
    Please:
    1. Identify the root cause
    2. Explain why it's happening
    3. Provide a fixed version
    4. Suggest how to prevent similar issues`
  },

  // Learning and Education
  education: {
    explain: `Explain {{topic}} to someone with {{level}} experience in {{domain}}.
    
    Include:
    - Clear definition
    - Key concepts
    - Practical examples
    - Common use cases`,
    
    tutorial: `Create a step-by-step tutorial for {{topic}}.
    
    Target audience: {{audience}}
    Format: {{format}}
    
    Include:
    - Learning objectives
    - Prerequisites
    - Hands-on examples
    - Practice exercises`
  }
};

// Helper function to use templates
function usePromptTemplate(category, template, variables) {
  const promptTemplate = promptLibrary[category][template];
  return promptTemplate.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match;
  });
}
```

---

## 🔹 Real-World Examples

### 1. **Customer Support Chatbot**

```javascript
const customerSupportPrompt = `
You are a helpful customer support representative for TechCorp, an e-commerce company.

Guidelines:
- Be friendly and professional
- Ask clarifying questions when needed  
- Provide step-by-step solutions
- Escalate to human agents for complex issues
- Always end with asking if they need further help

Customer Query: {{query}}

Response:
`;

// Usage
const query = "My order hasn't arrived and it's been 10 days";
const prompt = customerSupportPrompt.replace('{{query}}', query);
```

### 2. **Code Documentation Generator**

```javascript
const documentationPrompt = `
Generate comprehensive documentation for this JavaScript function:

{{code}}

Include:

## Function Name
Brief description of what it does

## Parameters
- param1 (type): description
- param2 (type): description

## Returns
- (type): description

## Usage Examples
\`\`\`javascript
// Example usage code
\`\`\`

## Error Handling
What errors might occur and how they're handled

## Notes
Any additional important information
`;
```

### 3. **Content Strategy Assistant**

```javascript
const contentStrategyPrompt = `
You are a content marketing strategist. Create a content plan for:

Business: {{business}}
Target Audience: {{audience}}  
Goals: {{goals}}
Timeline: {{timeline}}

Provide:

1. **Content Themes** (3-5 main topics)
2. **Content Types** (blog posts, videos, social media, etc.)
3. **Publishing Schedule** (frequency and timing)
4. **Success Metrics** (how to measure effectiveness)
5. **Content Calendar** (specific content ideas for first month)

Format as a professional strategy document.
`;
```

### 4. **API Documentation Generator**

```javascript
const apiDocPrompt = `
Generate API documentation for this endpoint:

Method: {{method}}
URL: {{url}}
Description: {{description}}

Request Format:
{{requestFormat}}

Generate:

# {{method}} {{url}}

## Description
{{description}}

## Request
- **Method**: {{method}}
- **URL**: {{url}}
- **Headers**: 
  - Content-Type: application/json
  - Authorization: Bearer {token}

## Request Body
\`\`\`json
{{requestFormat}}
\`\`\`

## Response
### Success (200)
\`\`\`json
{
  "success": true,
  "data": {}
}
\`\`\`

### Error (400)
\`\`\`json
{
  "success": false,
  "error": "Error message"
}
\`\`\`

## Example Usage
\`\`\`javascript
// JavaScript example
\`\`\`

\`\`\`curl
# cURL example
\`\`\`
`;
```

---

## 🔹 Common Mistakes & Best Practices

### ❌ Common Mistakes

1. **Too Vague**
   ```
   Bad: "Help me with code"
   Good: "Help me debug this JavaScript function that's throwing a TypeError when processing user input"
   ```

2. **No Context**
   ```
   Bad: "Optimize this function"
   Good: "Optimize this function for a high-traffic e-commerce site handling 1000+ requests/second"
   ```

3. **Mixed Instructions**
   ```
   Bad: "Write a function and also explain React hooks and make it funny"
   Good: "Write a JavaScript function that validates email addresses. Use a clear, professional tone."
   ```

4. **Assuming Knowledge**
   ```
   Bad: "Use the pattern we discussed"
   Good: "Use the observer pattern (where objects subscribe to events from a subject)"
   ```

### ✅ Best Practices

1. **Use the CLEAR Framework**
   - **C**ontext: Set the scene
   - **L**ength: Specify desired output length
   - **E**xamples: Provide examples when helpful
   - **A**udience: Define target audience
   - **R**esponse format: Specify how you want the output structured

2. **Iterative Refinement**
   ```javascript
   // Start simple
   let prompt = "Explain async/await";
   
   // Add context
   prompt = "Explain JavaScript async/await to a developer familiar with callbacks";
   
   // Add structure
   prompt += "\n\nCover:\n1. What it is\n2. How it works\n3. Benefits over callbacks\n4. Common pitfalls";
   
   // Add examples
   prompt += "\n\nInclude practical code examples";
   ```

3. **Test and Measure**
   ```javascript
   async function testPromptVariations(basePrompt, variations, testCases) {
     const results = [];
     
     for (const variation of variations) {
       const prompt = basePrompt + variation;
       const responses = await Promise.all(
         testCases.map(test => callAI(prompt + test))
       );
       
       const score = evaluateResponses(responses, testCases);
       results.push({ variation, score, responses });
     }
     
     return results.sort((a, b) => b.score - a.score);
   }
   ```

4. **Maintain Prompt Libraries**
   ```javascript
   const promptVersions = {
     'code-review-v1': '...',
     'code-review-v2': '...',
     'code-review-v3': '...'  // Current best
   };
   
   const promptMetadata = {
     'code-review-v3': {
       created: '2024-01-15',
       performanceScore: 8.5,
       useCases: ['JavaScript', 'Python', 'React'],
       author: 'john.doe@company.com'
     }
   };
   ```

---

## 🔹 Measuring Prompt Effectiveness

### Quantitative Metrics

1. **Response Quality Score**
   ```javascript
   function scoreResponse(response, criteria) {
     const scores = {
       accuracy: 0,      // Factual correctness
       relevance: 0,     // Addresses the question
       completeness: 0,  // Covers all aspects
       clarity: 0,       // Easy to understand
       usefulness: 0     // Actionable/practical
     };
     
     // Scoring logic here...
     return scores;
   }
   ```

2. **Task Completion Rate**
   ```javascript
   async function measureTaskCompletion(prompts, tasks) {
     const results = [];
     
     for (const prompt of prompts) {
       let completedTasks = 0;
       
       for (const task of tasks) {
         const response = await callAI(prompt + task.input);
         if (evaluateTaskCompletion(response, task.expectedOutput)) {
           completedTasks++;
         }
       }
       
       results.push({
         prompt,
         completionRate: completedTasks / tasks.length
       });
     }
     
     return results;
   }
   ```

3. **Consistency Measurement**
   ```javascript
   async function measureConsistency(prompt, inputs, runs = 5) {
     const allResponses = [];
     
     for (const input of inputs) {
       const responses = [];
       for (let i = 0; i < runs; i++) {
         responses.push(await callAI(prompt + input));
       }
       allResponses.push(responses);
     }
     
     return calculateConsistencyScore(allResponses);
   }
   ```

### A/B Testing Framework

```javascript
class PromptABTester {
  constructor(apiClient) {
    this.client = apiClient;
    this.experiments = new Map();
  }

  createExperiment(name, promptA, promptB, testCases) {
    this.experiments.set(name, {
      promptA,
      promptB,
      testCases,
      results: { a: [], b: [] }
    });
  }

  async runExperiment(name) {
    const experiment = this.experiments.get(name);
    if (!experiment) throw new Error(`Experiment ${name} not found`);

    for (const testCase of experiment.testCases) {
      // Test Prompt A
      const responseA = await this.client.complete(experiment.promptA + testCase.input);
      const scoreA = this.evaluateResponse(responseA, testCase.expected);
      experiment.results.a.push({ input: testCase.input, response: responseA, score: scoreA });

      // Test Prompt B  
      const responseB = await this.client.complete(experiment.promptB + testCase.input);
      const scoreB = this.evaluateResponse(responseB, testCase.expected);
      experiment.results.b.push({ input: testCase.input, response: responseB, score: scoreB });
    }

    return this.analyzeResults(experiment);
  }

  analyzeResults(experiment) {
    const avgScoreA = this.calculateAverageScore(experiment.results.a);
    const avgScoreB = this.calculateAverageScore(experiment.results.b);
    
    const winner = avgScoreA > avgScoreB ? 'A' : 'B';
    const improvement = Math.abs(avgScoreA - avgScoreB) / Math.min(avgScoreA, avgScoreB) * 100;
    
    return {
      winner,
      improvement: `${improvement.toFixed(1)}%`,
      scores: { a: avgScoreA, b: avgScoreB },
      confidence: this.calculateConfidence(experiment.results.a, experiment.results.b)
    };
  }
}
```

---

## 🎯 Key Takeaways

### Essential Principles:
1. **Clarity is King** - Be specific, not vague
2. **Context Matters** - Provide relevant background information
3. **Examples Work** - Show the AI what you want
4. **Structure Helps** - Organize your prompts logically
5. **Iterate and Improve** - Test different approaches

### Prompting Hierarchy:
```
Basic Query → Clear Instructions → Examples → Chain of Thought → Advanced Techniques
```

### When to Use Each Approach:
- **Zero-shot**: Simple, well-defined tasks
- **Few-shot**: Tasks requiring specific format or style
- **Chain-of-thought**: Complex reasoning or problem-solving
- **Role-based**: Domain expertise needed
- **System prompts**: Consistent behavior across conversations

### JavaScript Integration:
- Build reusable prompt templates
- Implement A/B testing for optimization
- Create evaluation metrics
- Version control your prompts
- Monitor performance over time

### Remember:
- **Prompt engineering is an iterative process** - Your first attempt won't be perfect
- **Different models respond differently** - What works for GPT might not work for Claude
- **Context length matters** - Longer prompts aren't always better
- **Test with real data** - Use actual use cases, not just toy examples

---

*Next up: Module 3 - Fine-tuning and Advanced Techniques! 🚀*