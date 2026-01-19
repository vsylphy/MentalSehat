import Navbar from "../components/Navbar";
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertCircle, Loader2 } from "lucide-react";

function TanyaAI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Halo! 👋 Saya asisten AI kesehatan mental. Saya di sini untuk mendengarkan dan membantu Anda. Ceritakan apa yang Anda rasakan hari ini?",
    },
  ]);
  const [loading, setLoading] = useState(false);
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

    const userMessage = input;

    // tampilkan pesan user
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          // 🔒 kirim history SUPER AMAN & konsisten
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
      setLoading(false); // ✅ WAJIB
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Bold text
      if (line.match(/^\*\*(.*)\*\*$/)) {
        return (
          <p key={i} className="mt-3 mb-1 font-bold text-gray-800">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      // Numbered list
      if (line.match(/^\d+\./)) {
        return (
          <p key={i} className="my-1 ml-4 text-gray-700">
            {line}
          </p>
        );
      }
      // Bullet or emoji start
      if (line.match(/^(💡|⚠️|✨)/)) {
        return (
          <p
            key={i}
            className="p-3 my-2 text-gray-700 border-l-4 border-teal-400 rounded-lg bg-teal-50"
          >
            {line}
          </p>
        );
      }
      // Regular text
      if (line.trim()) {
        return (
          <p key={i} className="my-2 leading-relaxed text-gray-700">
            {line}
          </p>
        );
      }
      return <br key={i} />;
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen pt-16">
        <div className="flex-1 overflow-hidden">
          <div className="container h-full max-w-4xl px-4 py-6 mx-auto">
            <div className="flex flex-col h-full bg-white border border-gray-200 shadow-xl rounded-2xl">
              <div className="flex-1 p-4 space-y-4 overflow-y-auto md:p-6 scroll-smooth">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    } animate-fadeIn`}
                  >
                    {/* AI Avatar */}
                    {msg.role === "ai" && (
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-md bg-gradient-to-br from-teal-500 to-blue-600">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg"
                          : "bg-gray-50 border border-gray-200 shadow-sm"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p className="leading-relaxed text-white">{msg.text}</p>
                      ) : (
                        <div className="text-sm">{formatMessage(msg.text)}</div>
                      )}
                    </div>

                    {/* User Avatar */}
                    {msg.role === "user" && (
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-md bg-gradient-to-br from-blue-500 to-purple-600">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading Indicator */}
                {loading && (
                  <div className="flex justify-start gap-3 animate-fadeIn">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-md bg-gradient-to-br from-teal-500 to-blue-600">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="px-4 py-3 border border-gray-200 shadow-sm bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">AI sedang mengetik...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 transition-all duration-300 bg-white border-2 border-gray-200 resize-none rounded-xl focus:outline-none focus:border-teal-500"
                      placeholder="Ceritakan perasaanmu hari ini..."
                      rows="2"
                      disabled={loading}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className={`p-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                      loading || !input.trim()
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-br from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105"
                    }`}
                  >
                    <Send
                      className={`w-5 h-5 ${
                        loading || !input.trim()
                          ? "text-gray-500"
                          : "text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 p-3 mt-3 text-xs text-gray-500 border rounded-lg bg-amber-50 border-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-amber-700">Penting:</strong> AI ini
                    adalah alat bantu dan bukan pengganti konsultasi profesional
                    kesehatan mental. Jika Anda mengalami krisis, segera hubungi
                    profesional atau layanan darurat.
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
