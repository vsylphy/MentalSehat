import Navbar from "../components/Navbar";
import {
  ChevronDown,
  ChevronUp,
  Link,
  Linkedin,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAllFaq, setShowAllFaq] = useState(false);

  const faqs = [
    {
      q: "Apa itu MentalSehat?",
      a: "MentalSehat adalah platform berbasis teknologi yang membantu pengguna memahami kondisi emosional dan kesehatan mental dengan pendekatan empatik dan aman.",
    },
    {
      q: "Apakah AI di MentalSehat menggantikan psikolog?",
      a: "Tidak. AI berfungsi sebagai pendamping awal, bukan pengganti tenaga profesional. Kami mendorong pengguna untuk tetap mencari bantuan profesional bila dibutuhkan.",
    },
    {
      q: "Apakah data saya aman?",
      a: "Kami mengutamakan privasi. Percakapan tidak digunakan untuk identifikasi personal dan dirancang dengan prinsip privacy-first.",
    },
    {
      q: "Siapa yang bisa menggunakan MentalSehat?",
      a: "Siapa pun yang ingin memahami perasaan, emosi, atau membutuhkan ruang aman untuk bercerita.",
    },
    {
      q: "Apakah layanan ini gratis?",
      a: "Saat ini MentalSehat dapat digunakan secara gratis selama masa pengembangan.",
    },
    {
      q: "Kapan sebaiknya saya mencari bantuan profesional?",
      a: "Jika Anda merasa kewalahan, putus asa, atau memiliki pikiran menyakiti diri sendiri, segera hubungi profesional atau layanan darurat setempat.",
    },
  ];

  const team = [
    {
      name: "Radhi Nur Rubiansyah",
      role: "Founder • Engineer • AI Developer",
      image: "/images/1.png",
      linkedin: "https://www.linkedin.com/in/radhi-nur-rubiansyah-404298318/",
      highlight: true,
    },
    {
      name: "Mohamad Salman Alfarisi",
      role: "Co-Founder • Product & Direction",
      image: "/images/2.jpeg",
      linkedin: "",
      highlight: true,
    },
    {
      name: "Mohammad Rafi al-Qinthara",
      role: "Mental Health Observer • Main Educator",
      image: "/images/3.jpeg",
      linkedin:
        "https://www.linkedin.com/in/mohammad-rafi-al-qinthara-9a2689399/",
      highlight: true,
    },
    {
      name: "Miqdad Azzam Fawazy",
      role: "Observation Support • Insight Contributor",
      image: "/images/4.jpeg",
      linkedin: "https://www.linkedin.com/in/miqdad-azzam-fawazy-199830393/ ",
      highlight: true,
    },
    {
      name: "Yasfa Yulianti Nazia",
      role: "Visual Identity • Social Media & Reporting",
      image: "/images/5.jpeg",
      linkedin: "https://www.linkedin.com/in/yasfa-yulianti/",
      highlight: true,
    },
    {
      name: "Khaeyla Arsya Wijaya",
      role: "Videography • Editing & Field Support",
      image: "/images/6.jpeg",
      linkedin: "https://www.linkedin.com/in/khaeyla-arsya-44918a39b/",
      highlight: true,
    },
    {
      name: "Muhammad Fauzan Firmansyah",
      role: "Interactive Animation • Motion Design",
      image: "/images/7.jpeg",
      linkedin:
        "https://www.linkedin.com/in/muhammad-fauzan-firmansyah-a26458394/",
      highlight: true,
    },
  ];

  const visibleFaqs = showAllFaq ? faqs : faqs.slice(0, 3);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl px-6 mx-auto mt-24 mb-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Pusat Informasi & Bantuan 💬
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Temukan jawaban atas pertanyaan umum dan kenali tim di balik
            pengembangan MentalSehat.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Pertanyaan yang Sering Diajukan
          </h2>

          <div className="space-y-4">
            {visibleFaqs.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden transition bg-white border rounded-xl"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                >
                  <span className="font-medium text-gray-800">{faq.q}</span>
                  {openIndex === i ? (
                    <ChevronUp className="w-5 h-5 text-teal-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {openIndex === i && (
                  <div className="px-5 pb-4 leading-relaxed text-gray-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Show More */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setShowAllFaq(!showAllFaq);
                setOpenIndex(null);
              }}
              className="px-6 py-2 text-sm font-medium text-teal-600 transition border border-teal-500 rounded-full hover:bg-teal-50"
            >
              {showAllFaq ? "Tutup FAQ Lengkap" : "Lihat FAQ Lengkap"}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px my-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Team Section */}
        <h2 className="mb-10 text-2xl font-semibold text-center text-gray-800">
          Tim di Balik MentalSehat
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {team.map((person, i) => (
            <div
              key={i}
              className={`p-6 text-center rounded-2xl border transition-all duration-300
                ${
                  person.highlight
                    ? "border-teal-500 shadow-lg scale-[1.02]"
                    : "border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1"
                } bg-white`}
            >
              <img
                src={person.image}
                alt={person.name}
                className={`w-24 h-24 mx-auto mb-4 rounded-full object-cover ${
                  person.highlight ? "ring-4 ring-teal-400" : ""
                }`}
              />

              <h3 className="text-lg font-semibold text-gray-800">
                {person.name}
              </h3>

              <p className="text-sm text-gray-500">{person.role}</p>

              {person.highlight ? (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white transition rounded-full bg-gradient-to-r from-teal-500 to-blue-600 hover:scale-105"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4" />
                  Identitas dilindungi
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Faq;
