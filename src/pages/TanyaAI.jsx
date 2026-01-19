import Navbar from "../components/Navbar";
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertCircle, Loader2 } from "lucide-react";

function TanyaAI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Halo! 👋 Aku di sini untuk menemani kamu. Ceritakan apa yang kamu rasakan hari ini.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.filter((m) => m.role === "user" || m.role === "ai"),
        }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Aku masih di sini 🌿 Kalau mau, kamu bisa lanjut cerita.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen pt-16">
        <div className="flex-1 overflow-hidden">
          <div className="container h-full max-w-4xl px-4 py-6 mx-auto">
            <div className="flex flex-col h-full bg-white border shadow rounded-2xl">
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <Bot className="w-6 h-6 text-teal-600" />
                    )}
                    <div
                      className={`px-4 py-3 rounded-xl max-w-[75%] ${
                        msg.role === "user"
                          ? "bg-teal-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.role === "user" && (
                      <User className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI sedang mengetik...
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 p-3 border rounded-lg resize-none"
                    placeholder="Ceritakan perasaanmu..."
                    rows={2}
                    disabled={loading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="p-3 text-white bg-teal-500 rounded-lg"
                  >
                    <Send />
                  </button>
                </div>

                <div className="flex gap-2 mt-3 text-xs text-amber-700">
                  <AlertCircle className="w-4 h-4" />
                  AI ini bukan pengganti profesional kesehatan mental.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TanyaAI;
