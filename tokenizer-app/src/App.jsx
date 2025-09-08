import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [tokens, setTokens] = useState([]);
  const [tokenCount, setTokenCount] = useState(0);
  const [apiResponse, setApiResponse] = useState("");

  const handleTokenize = async () => {
    if (!text.trim()) return;

    // Local tokenization
    const localTokens = text.trim().split(/\s+/);
    setTokens(localTokens);
    setTokenCount(localTokens.length);

    try {
      const res = await fetch("http://localhost:1234/tokenize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setApiResponse(data.apiResponse);
    } catch (error) {
      console.error("Error fetching backend:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white/20 backdrop-blur-lg shadow-md py-4 px-6 flex justify-center sticky top-0 z-50">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">
          🌐 Tokenizer App
        </h1>
      </header>

      {/* Main Card */}
      <main className="flex flex-col items-center mt-10 w-full max-w-2xl p-6 bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40">
        <textarea
          className="w-full p-4 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-4 focus:ring-pink-400"
          rows="4"
          placeholder="✍️ Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button
          onClick={handleTokenize}
          className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-lg shadow-md hover:scale-105 transform transition"
        >
          🚀 Tokenize
        </button>

        {/* Token Count */}
        {tokenCount > 0 && (
          <p className="mt-6 text-lg font-medium text-white drop-shadow-md">
            Total Tokens: <span className="font-bold">{tokenCount}</span>
          </p>
        )}

        {/* Tokens Display */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tokens.map((token, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-green-200 to-green-400 text-green-900 rounded-full text-sm font-medium shadow-md"
            >
              {index + 1}. {token}
            </span>
          ))}
        </div>

        {/* API Response */}
        {apiResponse && (
          <div className="mt-8 w-full">
            <h2 className="text-xl font-semibold text-white mb-3 drop-shadow-lg">
              🤖 Perplexity Says:
            </h2>
            <div className="p-4 rounded-2xl bg-white shadow-lg relative">
              {console.log(apiResponse)}
              <p className="text-gray-700">{apiResponse}</p>
              <span className="absolute -top-2 left-4 w-4 h-4 bg-white rotate-45"></span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
