export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message || message.length > 500) {
      return res.status(200).json({
        reply: "Aku di sini 🤍 Coba kirim ulang pesannya ya.",
      });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    // ✅ ROLE DISAMAKAN DENGAN FRONTEND
    const safeHistory = Array.isArray(history)
      ? history
          .filter((m) => m.role === "user" || m.role === "ai")
          .slice(-2)
          .map((m) => `${m.role}: ${m.text.slice(0, 120)}`)
          .join("\n")
      : "Belum ada konteks.";

    const lower = message.toLowerCase();
    const isHibur =
      lower.includes("hibur") ||
      lower.includes("capek") ||
      lower.includes("sedih");

    const prompt = `
Kamu adalah asisten AI kesehatan mental yang RAMAH, JELAS, dan LANGSUNG MENJAWAB.

Gaya:
- Jawab permintaan user secara langsung
- Jika diminta list → buat list
- Jika diminta hiburan → hibur
- Jangan memutar
- Jangan mengulang kalimat yang sama
- Bahasa sederhana dan hangat

Konteks:
${safeHistory}

Kondisi user:
${isHibur ? "User sedang butuh hiburan dan dukungan." : "User meminta bantuan langsung."}

Pesan user:
"${message}"
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
      console.error("Gemini API error:", await response.text());
      return res.status(200).json({
        reply: "Aku di sini 🤍 Mau aku bantu apa sekarang?",
      });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      reply:
        reply?.trim() ||
        "Aku di sini 🤍 Mau aku bantu atau hibur kamu sebentar?",
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(200).json({
      reply: "Aku tetap di sini 🤍 Tarik napas dulu ya.",
    });
  }
}
