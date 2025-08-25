### Chain‑of‑Thought (CoT) Prompting
```js 
Chain‑of‑Thought prompting asks the model to reason step‑by‑step before giving the final answer. It improves performance on tasks that need logic, arithmetic, or multi‑step decisions by explicitly eliciting intermediate reasoning steps.

What it is
CoT adds “think in steps” guidance so the model decomposes the problem and then answers.

Variants include zero‑shot CoT (“Let’s think step by step”), few‑shot CoT (provide worked examples), and auto‑CoT (automatically curate examples).

Why use it
Helps with math word problems, commonsense reasoning, data transformation, and planning tasks.

Increases reliability and makes reasoning more transparent; useful for verifying how an answer was reached.

Caution
For production systems, avoid exposing raw hidden reasoning if privacy or safety is a concern; instead, ask for a brief justification or structured intermediate steps.

CoT can increase token usage; use concise steps and cap output length.

Zero‑shot CoT example
Prompt:

text
Solve step by step, then give the final answer on a new line prefixed by "Answer:".
Question: A shop sells pens at ₹12 each. If Riya has ₹100 and buys as many pens as possible, how much money is left?
Possible model response:

text
Step 1: Maximum pens = floor(100 / 12) = 8.
Step 2: Cost = 8 * 12 = 96.
Step 3: Money left = 100 - 96 = 4.
Answer: ₹4
Few‑shot CoT example
Prompt:

text
Follow the pattern in the examples. Think in steps, then give "Answer:".

Example 1
Q: A train travels 150 km in 3 hours. What is its average speed?
Reasoning: Average speed = distance/time = 150/3 = 50 km/h.
Answer: 50 km/h

Example 2
Q: A rectangle has length 12 cm and width 7 cm. What is its area?
Reasoning: Area = l * w = 12 * 7 = 84 cm^2.
Answer: 84 cm^2

Now solve:
Q: A bag has 36 apples shared equally among 4 friends. How many apples per friend?
Reasoning:
Possible model continuation:

text
Reasoning: Each friend gets 36 / 4 = 9 apples.
Answer: 9
Structured CoT for extraction
Prompt:

text
Extract fields step-by-step, then output strict JSON.

Text: "Order 2x Mouse @ ₹599 each and 1x Keyboard @ ₹1299."
Steps:
1) Identify items and quantities.
2) Compute line totals and grand total.
3) Produce JSON with {items:[{name, qty, unit_price, line_total}], grand_total}.

Output only JSON.
Possible model response:

text
{"items":[
  {"name":"Mouse","qty":2,"unit_price":599,"line_total":1198},
  {"name":"Keyboard","qty":1,"unit_price":1299,"line_total":1299}
],
"grand_total":2497}
Tips
Use clear cues: “Think step by step”, “Explain briefly in steps”, “Show intermediate calculations.”

Keep steps concise; cap output with a max token limit if available.

For deterministic outputs, set a lower temperature.

For strict formats, show 1–2 worked examples (few‑shot CoT) and specify the exact final answer format.

Tiny JavaScript snippet (≤20 lines)
js
const zeroShotCoT = `
Solve step by step, then give "Answer:" on a new line.
Q: If a book costs ₹249 and I have ₹1000, how many can I buy and how much is left?
`;
const fewShotCoT = `
Q: 18 + 27
Reasoning: 18 + 20 = 38; 38 + 7 = 45.
Answer: 45

Q: 46 - 19
Reasoning: 46 - 20 = 26; 26 + 1 = 27.
Answer: 27

Q: 35 + 48
Reasoning:
`;
console.log({ zeroShotCoT, fewShotCoT });
Practice tasks
Easy: Write a zero‑shot CoT prompt for “A tank holds 120 L and leaks 8 L per hour. How long until empty?” Ask for steps and a final “Answer:”.

Harder: Create a few‑shot CoT template for extracting dates and amounts from short receipts, with two worked examples and a strict JSON schema.

Next step

Build a personal CoT template library: one zero‑shot CoT and one few‑shot CoT per task type (math, extraction, planning), each with clear step cues and a final explicit answer format.

### self consistency prompt

Self-consistency prompting is a technique where the model answers the same prompt multiple times (sampling diverse reasoning paths) and the final answer is chosen by majority vote among those outputs. The goal is to boost reliability on reasoning tasks by preferring the answer that appears most consistently across samples.

Simple explanation
Ask the model the same question several times with slight randomness, often using “think step by step.”

Collect multiple answers, then pick the one most frequently returned; this aggregates the model’s internal “opinions.”

Analogy
It’s like asking several classmates to solve the same math problem independently and then trusting the answer most of them agree on.

Key takeaways
Increases accuracy for math, logic, and commonsense tasks by exploring multiple reasoning paths.

Works best combined with chain-of-thought or at least a brief “think step by step” cue.

Costs more tokens because it runs multiple samples; balance k (number of samples) with budget.

Use deterministic final formatting (e.g., “Answer: <value>”) so aggregation is easy.