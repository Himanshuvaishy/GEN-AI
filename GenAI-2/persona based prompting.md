

# persona based prompting

Persona-based prompting means instructing the model to “act as” a specific character or professional (e.g., senior JavaScript mentor, friendly travel guide) so responses match a desired tone, expertise, and style. It shapes voice and focus, improving relevance and user experience, especially for teaching, support, or creative tasks.

## Plain explanation

- A persona defines who the assistant is (background, goals, tone) and sometimes who the audience is, guiding word choice, depth, and examples.
- It’s most helpful for subjective or style-sensitive tasks; for objective factual tasks, personas may not improve accuracy and can sometimes distract.


## Analogy

Like asking a chef to “cook as a health-focused dietician” versus “cook as a street-food vendor”: same ingredients, different style and priorities.

## Key takeaways

- Define persona elements: role, expertise level, tone, constraints, target audience.
- Keep instructions short and concrete; include do/don’t lists to avoid drift.
- For reliability, combine persona with examples (few-shot) or a checklist of criteria.
- Use concise outputs for beginners; expand depth for advanced readers.


## Tiny JavaScript snippet (≤20 lines)

```js
const messages = [
  { role: "system", content: "Act as a friendly senior JavaScript tutor. Explain simply, use one analogy, 4 bullets, and a 10-line code example." },
  { role: "user", content: "Teach closures briefly." }
];
// Send messages to chat completions; read choices[^0].message.content
```


## Practice tasks

- Easy: Write a persona prompt for “empathetic tech support agent” helping a beginner reset a router in 4 steps.
- Slightly harder: Create two personas—“senior JS mentor” and “product manager”—and ask both to explain debounce vs throttle; compare tone and focus.

Next step: Build a small persona preset library (role, tone, audience, constraints) and reuse them across prompts; pair with few-shot examples to lock in structure and format.

