# Multi-Head Attention Explained

## What is Multi-Head Attention?

Multi-head attention allows the model to look at the input sequence from multiple perspectives simultaneously. Each "head" learns different types of relationships and patterns.

## How Multi-Head Attention Works (Step-by-Step)

1. **Linear projections:** The input embeddings are projected into different query (Q), key (K), and value (V) spaces for each head.

2. **Independent attention:** Each head computes attention scores independently.

3. **Concatenation:** All attention results from different heads are concatenated.

4. **Final linear projection:** The concatenated output is projected to the original embedding dimension.

## Mathematical formula

```
MultiHead(Q, K, V) = Concat(head_1, head_2, ..., head_h) 	imes W^O
```

## Why multiple heads?

- Each head captures different patterns, e.g., syntactic, semantic, or positional relationships.
- Improves the model's ability to understand complex language structures.

## Example in JavaScript

```javascript
// Assume inputEmbeddings is an array of word vectors
// Wq, Wk, Wv, Wo are weight matrices

// Function to perform scaled dot-product attention
function scaledDotProductAttention(Q, K, V) {
  const matMulQK = math.multiply(Q, math.transpose(K));
  const dk = K[0].length;
  const scaledScores = math.divide(matMulQK, Math.sqrt(dk));
  const weights = scaledScores.map(row => softmax(row));
  return math.multiply(weights, V);
}

// Multi-head attention implementation
def multiHeadAttention(inputEmbeddings, Wq, Wk, Wv, Wo, numHeads) {
  const headSize = inputEmbeddings[0].length / numHeads;
  let heads = [];

  for (let i = 0; i < numHeads; i++) {
    const start = i * headSize;
    const end = start + headSize;
    const Q = math.multiply(inputEmbeddings, Wq.slice(start, end));
    const K = math.multiply(inputEmbeddings, Wk.slice(start, end));
    const V = math.multiply(inputEmbeddings, Wv.slice(start, end));
    const head = scaledDotProductAttention(Q, K, V);
    heads.push(head);
  }

  const concatenated = [].concat(...heads);
  return math.multiply(concatenated, Wo);
}
```

*Note: This example uses pseudo functions `math.multiply`, `softmax`, and assumes matrices are appropriately sized.*

Multi-head attention greatly enhances a transformer’s ability to capture rich, nuanced context by analyzing the input sequence in multiple representational subspaces at once.
