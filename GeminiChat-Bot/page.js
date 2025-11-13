"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { text: prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      const botMessage = { text: data.text, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Sorry, something went wrong!", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          maxWidth: "600px",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "24px",
            marginBottom: "15px",
          }}
        >
          💬 Gemini Chatbot
        </h1>

        <div
          style={{
            flex: 1,
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            height: "400px",
            overflowY: "auto",
            backgroundColor: "#fafafa",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    msg.sender === "user" ? "#ffce73" : "#e2e3e5",
                  padding: "10px 14px",
                  borderRadius: "18px",
                  maxWidth: "75%",
                  wordWrap: "break-word",
                  fontSize: "15px",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ textAlign: "left", color: "#999" }}>Bot typing...</div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            marginTop: "15px",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            placeholder="Ask me something..."
            style={{
              flex: 1,
              padding: "12px",
              border: "1.5px solid #ccc",
              borderRadius: "10px",
              outline: "none",
              fontSize: "15px",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px 18px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
