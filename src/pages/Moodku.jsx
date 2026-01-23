import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";

const questions = [
  {
    question: "Bagaimana perasaanmu saat bangun hari ini?",
    options: [
      { text: "Berenergi dan positif", score: 0 },
      { text: "Biasa saja", score: 1 },
      { text: "Lelah", score: 2 },
      { text: "Sangat berat", score: 3 },
    ],
  },
  {
    question: "Bagaimana kualitas tidurmu?",
    options: [
      { text: "Nyenyak", score: 0 },
      { text: "Cukup", score: 1 },
      { text: "Kurang", score: 2 },
      { text: "Hampir tidak tidur", score: 3 },
    ],
  },
  {
    question: "Apakah kamu overthinking hari ini?",
    options: [
      { text: "Tidak", score: 0 },
      { text: "Sedikit", score: 1 },
      { text: "Sering", score: 2 },
      { text: "Hampir sepanjang hari", score: 3 },
    ],
  },
  {
    question: "Bagaimana tekanan aktivitas hari ini?",
    options: [
      { text: "Ringan", score: 0 },
      { text: "Sedang", score: 1 },
      { text: "Berat", score: 2 },
      { text: "Sangat berat", score: 3 },
    ],
  },
  {
    question: "Seberapa sering kamu merasa cemas?",
    options: [
      { text: "Tidak pernah", score: 0 },
      { text: "Kadang", score: 1 },
      { text: "Sering", score: 2 },
      { text: "Hampir terus-menerus", score: 3 },
    ],
  },
  {
    question: "Bagaimana kondisi emosimu?",
    options: [
      { text: "Stabil", score: 0 },
      { text: "Sedikit sensitif", score: 1 },
      { text: "Mudah kesal", score: 2 },
      { text: "Tidak stabil", score: 3 },
    ],
  },
  {
    question: "Apakah kamu merasa sendirian?",
    options: [
      { text: "Tidak", score: 0 },
      { text: "Kadang", score: 1 },
      { text: "Sering", score: 2 },
      { text: "Sangat", score: 3 },
    ],
  },
  {
    question: "Apakah kamu masih menikmati hal kecil?",
    options: [
      { text: "Masih", score: 0 },
      { text: "Kadang", score: 1 },
      { text: "Jarang", score: 2 },
      { text: "Tidak sama sekali", score: 3 },
    ],
  },
  {
    question: "Bagaimana tingkat energi mentalmu?",
    options: [
      { text: "Penuh", score: 0 },
      { text: "Cukup", score: 1 },
      { text: "Hampir habis", score: 2 },
      { text: "Kosong", score: 3 },
    ],
  },
  {
    question: "Bagaimana harapanmu hari ini?",
    options: [
      { text: "Optimis", score: 0 },
      { text: "Netral", score: 1 },
      { text: "Pesimis", score: 2 },
      { text: "Hampa", score: 3 },
    ],
  },
];

/* =======================
   HASIL & SARAN
======================= */
const moodAdvice = {
  ringan: {
    label: "Stabil 🌱",
    text: "Kondisimu cukup baik hari ini. Pertahankan ritme sehat dan nikmati hal-hal kecil.",
    videos: ["4wKh265mCiA"],
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.4)]",
  },
  lelah: {
    label: "Lelah 😴",
    text: "Tubuh dan pikiranmu butuh jeda. Istirahat bukan kegagalan.",
    videos: ["ou4dNq_8CRA"],
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.4)]",
  },
  cemas: {
    label: "Cemas 💭",
    text: "Pikiranmu sedang ramai. Tarik napas, kamu aman saat ini.",
    videos: ["A3uIr2F2Ono"],
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.4)]",
  },
  stres: {
    label: "Stres ⚠️",
    text: "Tekanan terasa berat. Beri jarak sejenak dari tuntutan.",
    videos: ["htY0Z7SEYR4"],
    glow: "shadow-[0_0_35px_rgba(249,115,22,0.5)]",
  },
  sedih: {
    label: "Sedih 💙",
    text: "Perasaanmu valid. Kamu layak didengarkan.",
    videos: ["wr2IqS8bsS4"],
    glow: "shadow-[0_0_35px_rgba(99,102,241,0.5)]",
  },
  burnout: {
    label: "Burnout 🚨",
    text: "Kondisimu cukup berat. Kami menyarankan berbicara langsung dengan AI.",
    videos: ["R0on0Hat2AY"],
    glow: "shadow-[0_0_40px_rgba(239,68,68,0.6)]",
    redirect: true,
  },
};

function getMood(score) {
  if (score <= 8) return "ringan";
  if (score <= 14) return "lelah";
  if (score <= 20) return "cemas";
  if (score <= 24) return "stres";
  if (score <= 28) return "sedih";
  return "burnout";
}

/* =======================
   COMPONENT
======================= */
export default function Moodku() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = (value) => {
    setScore((prev) => prev + value);
    if (step + 1 < questions.length) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setFinished(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* =======================
     HASIL
  ======================= */
  if (finished) {
    const mood = getMood(score);
    const result = moodAdvice[mood];

    return (
      <>
        <Navbar />

        {mood === "burnout" && showAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
            <div className="max-w-sm p-6 text-center bg-white rounded-2xl">
              <h3 className="mb-3 text-lg font-bold text-red-600">
                Kondisi Cukup Berat 🚨
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Kamu tidak sendirian. Bantuan tersedia.
              </p>
              <button
                onClick={() => setShowAlert(false)}
                className="w-full py-2 font-semibold text-white bg-red-500 rounded-xl"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        )}

        <div className="max-w-4xl px-4 pb-16 mx-auto pt-28">
          <div className={`p-6 sm:p-8 bg-white rounded-2xl ${result.glow}`}>
            <h2 className="mb-3 text-2xl font-bold">
              Mood kamu hari ini:{" "}
              <span className="text-teal-600">{result.label}</span>
            </h2>

            <p className="mb-6 text-gray-700">{result.text}</p>

            <div className="grid gap-6 md:grid-cols-2">
              {result.videos.map((id) => (
                <iframe
                  key={id}
                  className="w-full rounded-xl aspect-video"
                  src={`https://www.youtube.com/embed/${id}`}
                  allowFullScreen
                  title="YouTube video"
                />
              ))}
            </div>

            {result.redirect && (
              <Link
                to="/tanya-ai"
                className="block w-full py-3 mt-8 font-semibold text-center text-white bg-red-500 rounded-xl hover:bg-red-600"
              >
                Lanjut Tanya AI 💬
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl px-4 pb-16 mx-auto pt-28">
        {/* Progress */}
        <div className="w-full h-2 mb-6 bg-gray-200 rounded-full">
          <div
            className="h-full transition-all bg-teal-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mb-2 text-sm text-gray-500">
          Pertanyaan {step + 1} dari {questions.length}
        </p>

        <h2 className="mb-6 text-xl font-semibold sm:text-2xl">
          {questions[step].question}
        </h2>

        <div className="space-y-4">
          {questions[step].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt.score)}
              className="w-full px-4 py-4 text-left transition bg-white border rounded-xl hover:bg-teal-50"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
