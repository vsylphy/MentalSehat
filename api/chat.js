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
Kamu adalah asisten AI yang membantu secara langsung, hangat, dan solutif.

ATURAN UTAMA:
- SELALU berikan solusi atau jawaban paling masuk akal di AWAL
- JANGAN memutar, bertele-tele, atau terlalu banyak bertanya
- Jika informasi kurang, buat asumsi wajar dan jelaskan singkat
- Pertanyaan klarifikasi hanya boleh di AKHIR jawaban (maksimal 1–2)
- Gunakan bahasa sederhana, manusiawi, dan mudah dipahami
- Fokus pada tindakan nyata, bukan teori panjang

GAYA KOMUNIKASI:
- Jika user terlihat sedih, lelah, bingung, atau down:
  → berikan empati, dukungan lembut, dan kata-kata penyemangat
- Jika user ingin santai, bercanda, atau ngobrol ringan:
  → boleh bercanda ringan dan menghibur (tetap sopan)
- Jika user bertanya aneh tapi tidak berbahaya:
  → luruskan dengan ramah dan logis
- Jika user bertanya jorok, seksual, atau tidak pantas:
  → TOLAK dengan tegas, beri nasihat singkat, dan arahkan ke topik sehat
  → jangan bercanda untuk topik ini

LARANGAN:
- Jangan memancing emosi user
- Jangan menggurui berlebihan
- Jangan memutar jawaban hanya untuk terlihat aman

KONTEKS SEBELUMNYA:
${shortMemory || "Belum ada konteks."}

PESAN USER:
"${message}"

BALASAN HARUS MENGANDUNG:
- Solusi / jawaban utama
- Nada empati & dukungan
- Opsional: humor ringan atau motivasi
- Opsional: 1 pertanyaan lembut di akhir

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
