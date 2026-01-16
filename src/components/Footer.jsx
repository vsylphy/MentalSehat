import React from "react";
import {
  Heart,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
} from "lucide-react";

function Footer() {
  const location = {
    lat: -6.948222,
    lng: 107.6011221,
    address: "Bandung, Jawa Barat, Indonesia",
  };

  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      url: "#",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      url: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      url: "#",
      label: "Twitter",
      color: "hover:text-sky-500",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      url: "#",
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
      url: "#",
      label: "Email",
      color: "hover:text-teal-600",
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid gap-8 mb-8 md:grid-cols-2">
          {/* Left Section - Tagline & Social */}
          <div className="space-y-6">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl blur"></div>
                <div className="relative bg-gradient-to-br from-teal-500 to-blue-600 p-2.5 rounded-xl">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-transparent bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text">
                  MentalSehat
                </div>
                <div className="text-sm text-gray-600">
                  Platform Kesehatan Mental
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-3">
              <p className="max-w-md leading-relaxed text-gray-700">
                Kesehatan mental adalah prioritas. Kami hadir untuk mendukung
                perjalanan Anda menuju kehidupan yang lebih sehat dan bahagia.
              </p>
              <div className="flex items-center gap-2 text-lg font-semibold text-teal-600">
                <Heart className="w-5 h-5" fill="currentColor" />
                <span>You Are Not Alone</span>
                <span className="animate-pulse">💙</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-4">
              <h3 className="mb-4 text-sm font-semibold text-gray-700">
                Ikuti Kami
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className={`group bg-white p-3 rounded-xl border-2 border-gray-200 transition-all duration-300 hover:border-teal-400 hover:shadow-lg hover:scale-110 ${social.color}`}
                  >
                    <div className="text-gray-600 transition-transform group-hover:scale-110">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Google Maps */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              Lokasi Kami
            </h3>
            <div className="overflow-hidden transition-shadow duration-300 border-4 border-white shadow-lg rounded-2xl hover:shadow-2xl">
              <iframe
                src={`https://www.google.com/maps?q=${location.lat},${location.lng}&hl=es;z=14&output=embed`}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
                className="w-full"
              ></iframe>
            </div>
            <p className="flex items-center gap-2 text-sm text-gray-600">
              <svg
                className="w-4 h-4 text-teal-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {location.address}
            </p>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-center text-gray-600 md:text-left">
              © 2026 Mental Health Web — All Rights Reserved
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="transition-colors hover:text-teal-600">
                Kebijakan Privasi
              </a>
              <a href="#" className="transition-colors hover:text-teal-600">
                Syarat & Ketentuan
              </a>
              <a href="#" className="transition-colors hover:text-teal-600">
                Bantuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
