import Navbar from "../components/Navbar";
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertCircle, Loader2, XCircle } from "lucide-react";

const MAX_CHARS = 350; // 🆕 LIMIT PROMPT

function TanyaAI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Halo! 👋 Saya asisten AI kesehatan mental. Saya di sini untuk mendengarkan dan membantu Anda. Ceritakan apa yang Anda rasakan hari ini?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // 🆕 MODAL STATE
  const [showLimitModal, setShowLimitModal] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    // 🆕 CEK LIMIT DI SINI (STOP TOTAL)
    if (input.length > MAX_CHARS) {
      setShowLimitModal(true);
      return;
    }

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
          history: messages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .slice(-2),
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.reply ||
            "Aku tetap di sini 🌱 Kadang butuh satu napas sebelum lanjut.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Aku di sini ya 🌿 Kalau mau, kamu bisa lanjut cerita.",
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

      {/* 🆕 MODAL PERINGATAN LIMIT */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl animate-fadeIn">
            <div className="flex items-center gap-3 mb-3">
              <XCircle className="w-6 h-6 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Pesan Terlalu Panjang
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-600">
              AI belum bisa merespons pesan yang terlalu panjang.
              <br />
              Silakan persingkat dan fokus langsung ke inti masalah agar
              jawabannya lebih tepat.
            </p>

            <p className="mt-3 text-xs text-gray-500">
              Panjang pesan:{" "}
              <span className="font-semibold text-red-500">{input.length}</span>{" "}
              / {MAX_CHARS} karakter
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => {
                  setShowLimitModal(false);
                  inputRef.current?.focus();
                }}
                className="px-4 py-2 text-sm font-semibold text-white transition bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl hover:scale-105"
              >
                Edit Pesan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-screen pt-16">
        <div className="flex-1 overflow-hidden">
          <div className="container h-full max-w-4xl px-4 py-6 mx-auto">
            <div className="flex flex-col h-full bg-white border border-gray-200 shadow-xl rounded-2xl">
              <div className="flex-1 p-4 space-y-4 overflow-y-auto md:p-6">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-600">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white"
                          : "bg-gray-50 border"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.role === "user" && (
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-3">
                    <Bot className="w-10 h-10 p-2 text-white rounded-full bg-gradient-to-br from-teal-500 to-blue-600" />
                    <div className="px-4 py-3 border rounded-2xl">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* INPUT */}
              <div className="p-4 border-t bg-gray-50">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="2"
                  disabled={loading}
                  className={`w-full px-4 py-3 border-2 rounded-xl resize-none focus:outline-none ${
                    input.length > MAX_CHARS
                      ? "border-red-400"
                      : "border-gray-200 focus:border-teal-500"
                  }`}
                  placeholder="Ceritakan perasaanmu hari ini..."
                />

                <div className="flex items-center justify-between mt-2 text-xs">
                  <span
                    className={`${
                      input.length > MAX_CHARS
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {input.length} / {MAX_CHARS}
                  </span>

                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="p-3 text-white rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex gap-2 p-3 mt-3 text-xs text-gray-500 border rounded-lg bg-amber-50">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <p>
                    <strong>Penting:</strong> AI ini bukan pengganti profesional
                    kesehatan mental.
                  </p>
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
