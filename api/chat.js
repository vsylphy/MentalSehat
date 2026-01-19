export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message || message.length > 500) {
      return res.status(400).json({ error: "Invalid message" });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    // 🔒 Batasi memory (AMAN)
    const shortMemory = history
      .slice(-3)
      .map((m) => `${m.role}: ${m.text}`)
      .join("\n");

    const prompt = `
Kamu adalah asisten AI kesehatan mental yang empatik dan menenangkan.

Aturan:
- Bahasa Indonesia natural
- Validasi emosi
- Jangan menghakimi
- Maksimal 1 emoji 🌱
- Jawaban singkat & hangat
- Jika krisis, arahkan ke bantuan profesional secara lembut

Konteks:
${shortMemory || "Belum ada konteks."}

Pesan pengguna:
"${message}"

Balas dengan:
- Empati
- Dukungan
- Pertanyaan lembut
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini API error:", err);
      return res.status(200).json({
        reply: "Aku masih di sini ya 🌱 Kamu boleh cerita pelan-pelan.",
      });
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Aku mendengarkanmu 🌱";

    return res.status(200).json({ reply: reply.trim() });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(200).json({
      reply: "Aku di sini, hanya perlu waktu sebentar ya 🌿",
    });
  }
}
