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

    const lower = message.toLowerCase();

    if (
      lower.includes("hibur") ||
      lower.includes("capek") ||
      lower.includes("sedih")
    ) {
      return res.status(200).json({
        reply:
          "Aku di sini 🤍\n\n✨ Kamu nggak lemah, kamu lagi capek.\n🌱 Pelan-pelan juga nggak apa-apa.\n😄 Kalau mau, aku bisa bercanda dikit atau kasih kata manis.",
      });
    }
    const safeHistory = Array.isArray(history)
      ? history
          .slice(-2)
          .map((m) => `• ${m.role}: ${String(m.text).slice(0, 120)}`)
      : [];

    const context =
      safeHistory.length > 0 ? safeHistory.join("\n") : "Belum ada konteks.";

    const prompt = `
Kamu adalah asisten AI kesehatan mental yang responsif dan hangat.

Aturan:
- Jawab LANGSUNG kebutuhan user
- Jangan memutar
- Gunakan bahasa sederhana & manusiawi
- Jika user minta hiburan → langsung hibur
- Jika user down → beri dukungan
- Jangan mengulang kalimat yang sama
- Maks 1 pertanyaan klarifikasi (opsional)

Konteks:
${context}

Pesan user:
"${message}"
`;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      return res.status(200).json({
        reply: "Aku tetap di sini 🌱 Kita lanjut pelan-pelan ya. Aku dengerin.",
      });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      reply:
        reply?.trim() ||
        "Aku dengerin kok 🤍 Mau lanjut cerita, minta saran, atau hiburan?",
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(200).json({
      reply:
        "Aku masih di sini 🌿 Kalau mau, kita tarik napas sebentar bareng.",
    });
  }
}
