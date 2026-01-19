import React, { useState } from "react";
import { Heart, Instagram, Youtube, Linkedin, Mail } from "lucide-react";

function Footer() {
  const location = {
    lat: -6.948222,
    lng: 107.6011221,
    address: "Bandung, Jawa Barat, Indonesia",
  };

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSendEmail = () => {
    if (!form.name || !form.email || !form.message) return;

    const subject = encodeURIComponent(
      `Pesan dari ${form.name} (${form.email})`,
    );
    const body = encodeURIComponent(form.message);

    window.location.href = `mailto:mental.sehat.id@gmail.com?subject=${subject}&body=${body}`;

    setShowEmailModal(false);
    setForm({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      url: "https://www.instagram.com/mental_sehat.id/",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: (
        // OFFICIAL THREADS LOGO (SVG)
        <svg viewBox="0 0 192 192" className="w-5 h-5" fill="currentColor">
          <path d="M96 0C43 0 0 43 0 96s43 96 96 96 96-43 96-96S149 0 96 0zm26.9 138.7c-4.7 1.4-9.6 2.1-14.5 2.1-19.3 0-35-10.4-44.3-25.9l11.4-6.6c6.8 11.8 18.5 19.1 32.9 19.1 3.7 0 7.4-.5 10.9-1.6 9.3-2.8 15.2-10.6 15.2-20.4 0-11.8-8.4-21.5-20.5-23.5-2.2-.4-4.4-.5-6.6-.5-8.8 0-17 3.2-23.3 8.5l-9.1-9.1c8.4-7.5 19.3-12.1 31.3-12.1 3.1 0 6.3.3 9.4.8 17.7 3 30.5 18.2 30.5 36.2 0 15.3-9.8 28.6-24.2 33z" />
        </svg>
      ),
      url: "https://www.threads.com/@mental_sehat.id",
      label: "Threads",
      color: "hover:text-black",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      url: "https://youtube.com/@mentalsehat-dig",
      label: "YouTube",
      color: "hover:text-red-600",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      url: "#",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      color: "hover:text-teal-600",
      action: () => setShowEmailModal(true),
    },
  ];

  return (
    <>
      <footer className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid gap-8 mb-8 md:grid-cols-2">
            {/* LEFT */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                {/* LOGO */}
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-32 h-32 object-contain drop-shadow-[0_0_12px_rgba(20,184,166,0.6)]"
                />

                <div>
                  <div className="text-xl font-bold text-transparent bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text">
                    MentalSehat
                  </div>
                  <div className="text-sm text-gray-600">
                    Platform Kesehatan Mental
                  </div>
                </div>
              </div>

              <p className="max-w-md leading-relaxed text-gray-700">
                Kesehatan mental adalah prioritas. Kami hadir untuk mendukung
                perjalanan Anda menuju kehidupan yang lebih sehat dan bahagia.
              </p>

              <div className="flex items-center gap-2 text-lg font-semibold text-teal-600">
                <Heart className="w-5 h-5" fill="currentColor" />
                <span>You Are Not Alone</span>
                <span className="animate-pulse">💙</span>
              </div>

              {/* SOCIAL ICONS */}
              <div className="pt-4">
                <h3 className="mb-4 text-sm font-semibold text-gray-700">
                  Ikuti Kami
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <button
                      key={index}
                      onClick={
                        social.action
                          ? social.action
                          : () => window.open(social.url, "_blank")
                      }
                      aria-label={social.label}
                      className={`group bg-white p-3 rounded-xl border-2 border-gray-200 transition-all duration-300 hover:border-teal-400 hover:shadow-lg hover:scale-110 ${social.color}`}
                    >
                      <div className="text-gray-600 transition-transform group-hover:scale-110">
                        {social.icon}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT MAP */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                Lokasi Kami
              </h3>

              <div className="overflow-hidden border-4 border-white shadow-lg rounded-2xl">
                <iframe
                  src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Maps"
                />
              </div>

              <p className="text-sm text-gray-600">{location.address}</p>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-center text-gray-600">
              © 2026 Mental Health Web — All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="mb-4 text-xl font-bold text-teal-600">
              Kirim Pesan 📩
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nama"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-teal-500"
              />

              <input
                type="email"
                placeholder="Email kamu"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-teal-500"
              />

              <textarea
                rows="4"
                placeholder="Pesan yang ingin disampaikan..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 border resize-none rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Batal
              </button>
              <button
                onClick={handleSendEmail}
                className="px-5 py-2 font-semibold text-white transition rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 hover:scale-105"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
