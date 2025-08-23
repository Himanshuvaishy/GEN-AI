# What Happens in a Transformer Layer

## Overview

The **transformer layer** performs the core processing operations that transform input representations by extracting and refining linguistic information. Each layer contains specific sublayers that work together to understand and process sequences.

---

## Encoder Layer Components

Each **encoder layer** contains two primary sublayers:

### 1. Multi-Head Self-Attention
- **Purpose:** Allows each position to attend to all positions in the input sequence.
- **Function:** Computes relationships between words, determining which input parts are most relevant to each other.
- **Process:** Uses queries (Q), keys (K), and values (V) to calculate attention weights.

### 2. Feed-Forward Network (FFN)
- **Structure:** Two linear transformations with an activation function in between.
- **Function:** Applies position-wise transformations to enhance representations.

---

## Decoder Layer Components

Each **decoder layer** contains three sublayers:
1. **Masked Multi-Head Self-Attention**
    - Prevents the decoder from looking at future tokens during training.
    - Uses causal masking to ensure autoregressive generation.
2. **Cross-Attention (Encoder-Decoder Attention)**
    - Allows decoder to attend to encoder outputs.
    - Helps the decoder focus on relevant parts of the input.
3. **Feed-Forward Network**
    - Same as in encoder layers.

---

## Essential Supporting Components

- **Layer Normalization:** Applied before each sublayer in modern transformers (pre-LN). Stabilizes training and improves convergence.
- **Residual Connections:** Prevent vanishing gradients and preserve information flow.
- **Dropout:** Used during training to prevent overfitting.

---

## Processing Flow

Below is the pattern of operations in a transformer layer:

1. Input → Layer Normalization → Self-Attention → Add Residual
2. Result → Layer Normalization → Feed-Forward → Add Residual  
3. Output passed to next layer

---

## Mathematical Operations

### Attention:
\[
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
\]

### Feed-Forward Network:
\[
\text{FFN}(x) = \max(0, xW_1 + b_1)W_2 + b_2
\]

---

## Information Flow

The transformer layer operates through a **residual stream**, where:
- Each component reads from and writes back to this stream.
- Information accumulates progressively through layers.
- Earlier representations are preserved as new info is added.

---

This design allows transformer layers to build increasingly sophisticated representations of the input sequence, capturing both local relationships and long-range dependencies needed for advanced understanding of sequential data.
