# Retrieval-Augmented Generation (RAG) – Full Pipeline Notes

This document explains the **full working of RAG** in simple language, step by step, with indexing and retrieval phases.

---

## 🔹 What is RAG?
RAG = **Retrieval-Augmented Generation**.  
It combines:
- **Retriever** → finds relevant knowledge chunks from a database.  
- **Generator (LLM)** → uses those chunks to write accurate answers.  

This reduces hallucinations and allows the LLM to answer from your own data.

---

# 1. Indexing Phase (Preparing Knowledge Base)

Indexing = preparing documents so that they can be searched **by meaning** instead of just keywords.

### Steps

1. **Collect Raw Documents**
   - Sources: PDFs, Word, Web pages, Emails, etc.
   - Example: 3000 legal case files.

2. **Preprocess & Clean**
   - Remove junk text, fix encodings, OCR scans if needed.
   - Clean data = better embeddings.

3. **Chunking (Splitting into smaller pieces)**
   - Each document is broken into smaller chunks (200–1000 tokens).
   - Overlap (50–200 tokens) helps keep context.
   - Example: 20-page file → 40 chunks.

4. **Create Embeddings**
   - Each chunk is converted to a **vector** (dense array of numbers).
   - Embedding captures *meaning* (semantic similarity).
   - Example:  
     - "Dogs are pets" → vector A  
     - "Cats are kept as pets" → vector close to A

5. **Store in Vector Database**
   - Vectors + metadata are saved in a special DB (Pinecone, FAISS, Milvus).
   - Metadata includes: source id, page, original text.
   - Vector DB allows fast **similarity search**.

6. **Index Ready**
   - Now all documents are searchable by meaning.

---

# 2. Retrieval / Chat Phase (User Interaction)

Retrieval = when user asks, system finds the **most relevant chunks** and feeds them to the LLM.

### Steps

1. **User Query**
   - Example: "Can you tell me about case 420?"

2. **Embed the Query**
   - Convert query into a vector using same embedding model.

3. **Search in Vector DB**
   - Vector DB finds top-k most similar chunks.
   - Example: chunks from "case_420.pdf" are retrieved.

4. **(Optional) Re-rank & Filter**
   - Rerank results for precision.
   - Filter by metadata (e.g., case id, date).

5. **Build Prompt for LLM**
   - Combine retrieved chunks with the question.
   - Example:
     ```
     Use ONLY the passages below to answer. If not found, say "I don’t know."
     [case420_doc3_page12] The plaintiff alleges...
     [case420_doc7_page4] The final ruling...
     ---
     Question: Can you tell me about case 420?
     ```

6. **Chat Model Generates Answer**
   - LLM reads query + retrieved context.
   - Produces grounded, factual answer.

7. **Return Answer + Sources**
   - Example:  
     "According to [case420_doc3], the court ruled... See [case420_doc7]."

8. **Feedback Loop**
   - User feedback can improve retrieval & re-ranking.
   - Outdated docs can be re-indexed.

---

# 3. Example Flow

```js
// INDEXING
for (const doc of docs) {
  const chunks = chunkText(doc.text);
  for (const chunk of chunks) {
    const vec = await embed(chunk); 
    await vectorDB.upsert({
      id: chunk.id,
      vector: vec,
      metadata: { text: chunk, source: doc.id }
    });
  }
}

// RETRIEVAL
const qVec = await embed(userQuery);
const results = await vectorDB.search(qVec, { topK: 5 });
const context = results.map(r => `[${r.metadata.source}] ${r.metadata.text}`).join("\n---\n");
const prompt = `Use ONLY the passages below to answer:\n${context}\n\nQuestion: ${userQuery}`;
const answer = await LLM.generate(prompt);
```

---

# 4. Best Practices

- **Chunk size**: 200–1000 tokens, overlap 50–200.  
- **Top-k retrieval**: usually 3–5.  
- **Hybrid search**: combine keyword + embeddings.  
- **Reranker**: reorder candidates for better accuracy.  
- **Show citations**: always display sources.  
- **Security**: enforce access control, encrypt vectors.  
- **Monitor**: track latency, hallucination rate, user satisfaction.

---

# ✅ Summary

- **Indexing** = prepare documents (chunk → embed → vector DB).  
- **Retrieval** = embed query → find top chunks → give to LLM → generate answer.  
- This makes LLMs smarter, reduces hallucination, and allows them to use your own knowledge base effectively.
