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

    // 🔒 Memory SUPER AMAN (ringkas saja)
    const safeHistory = Array.isArray(history)
      ? history.slice(-2).map((m) => `• ${m.role}: ${m.text.slice(0, 120)}`)
      : [];

    const context =
      safeHistory.length > 0 ? safeHistory.join("\n") : "Belum ada konteks.";

    const prompt = `
Kamu adalah asisten AI kesehatan mental yang LANGSUNG membantu.

Aturan WAJIB:
- Beri solusi paling masuk akal di AWAL
- Jangan memutar atau terlalu banyak bertanya
- Gunakan bahasa sederhana dan hangat
- Jika user minta hiburan → hibur & beri semangat
- Jika user sedang down → dukung dengan kata manis
- Jika user nyeleneh / seksual → tolak tegas dan arahkan
- Pertanyaan klarifikasi hanya boleh di AKHIR (maks 1)

Konteks singkat:
${context}

Pesan pengguna:
"${message}"

Balas dengan:
1. Empati singkat
2. Solusi / dukungan langsung
3. Kalimat penyemangat
4. (Opsional) satu pertanyaan lembut
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
        reply:
          "Aku masih di sini 🌱 Tarik napas sebentar ya. Kamu tidak sendirian.",
      });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      reply:
        reply?.trim() ||
        "Aku mendengarkanmu 🌿 Ceritakan pelan-pelan, aku di sini.",
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(200).json({
      reply: "Aku tetap di sini 🌱 Kadang butuh satu napas sebelum lanjut.",
    });
  }
}
