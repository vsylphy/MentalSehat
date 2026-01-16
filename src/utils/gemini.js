export const fetchGeminiResponse = async (prompt) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!API_KEY) {
    throw new Error("API KEY Gemini tidak ditemukan");
  }

  const url =
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
    API_KEY;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("🔥 Gemini Error:", err);
    throw new Error("Gemini API Error");
  }

  const result = await response.json();

  return (
    result?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Maaf, aku belum bisa merespons sekarang."
  );
};
