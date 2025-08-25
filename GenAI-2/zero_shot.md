

### Zero‑Shot vs Few‑Shot Prompting
```js 
Zero‑shot gives an instruction with no examples; few‑shot adds a handful of input→output examples to teach the pattern in context. Few‑shot tends to improve accuracy and format control for non‑trivial tasks.

Zero‑shot prompting
Definition: Direct instruction without any demonstrations; relies on pre‑trained knowledge and instruction‑tuning.

When useful: Simple, common tasks (classification, basic Q&A) where the model already “knows” the task.

Caveat: Can be brittle on nuanced tasks; add examples if outputs are inconsistent.

Example (classification)

text
Task: Classify the sentiment as Positive, Negative, or Neutral.
Text: I think the vacation is okay.
Answer:
Typical output: Neutral.

Few‑shot prompting
Definition: Provide 2+ input→output examples before the new query so the model infers the pattern (in‑context learning).

When useful: Formatting control, domain‑specific tone, or tasks needing pattern adherence (extraction, transformation).

Tip: Keep examples close to the target distribution; be explicit and consistent in formatting.

Example (classification)

text
Task: Classify the sentiment as Positive, Negative, or Neutral.

Text: The product is terrible.
Sentiment: Negative

Text: Super helpful, worth it.
Sentiment: Positive

Text: It doesn’t work!
Sentiment:
Typical output: Negative.

Analogy
Zero‑shot is like asking a chef to cook a dish by name only; few‑shot is giving two sample recipes first so the chef copies the style and plating more reliably.

Key takeaways
Zero‑shot: fastest setup; may vary in quality on complex tasks.

Few‑shot: adds examples to steer pattern and format; improves reliability.

Match examples to the desired output distribution; keep them concise and consistent.

Escalate: zero‑shot → one‑shot → few‑shot as task complexity/precision needs increase.

Tiny JS snippet (≤20 lines)
js
const zeroShot = `Classify sentiment as Positive/Negative/Neutral.
Text: "Service was okay."
Answer:`;

const fewShot = `Classify sentiment as Positive/Negative/Neutral.
Text: "Awful experience." Sentiment: Negative
Text: "Loved the service!" Sentiment: Positive
Text: "Service was okay." Sentiment:`;

console.log({ zeroShot, fewShot });



