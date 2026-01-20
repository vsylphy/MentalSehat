import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Menu, X, Clock, Heart } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  // Update waktu setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Deteksi scroll untuk efek navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format waktu
  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/moodku", label: "Moodku" },
    { to: "/tanya-ai", label: "Tanya AI" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container px-4 mx-auto sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="relative -ml-6">
                <div className="relative">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="
      w-24 h-24 object-contain
      drop-shadow-[0_0_10px_rgba(20,184,166,0.6)]
    "
                  />
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="-ml-5 text-xl font-bold text-transparent bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text">
                MentalSehat
              </div>
              <div className="-ml-5 text-xs text-gray-500">
                Mental Sehat, Digital Balance
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-8 md:flex">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    className="relative px-4 py-2 font-medium text-gray-700 transition-all duration-300 rounded-lg hover:text-teal-600 hover:bg-teal-50 group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Clock Display - Desktop */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2.5 rounded-xl border border-teal-100">
              <Clock className="w-5 h-5 text-teal-600 animate-pulse" />
              <div className="text-left">
                <div className="text-sm font-bold text-gray-800 tabular-nums">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-gray-500 -mt-0.5">WIB</div>
              </div>
            </div>
          </div>

          {/* Mobile Clock & Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Clock */}
            <div className="flex items-center gap-2 px-3 py-2 border border-teal-100 rounded-lg bg-gradient-to-r from-teal-50 to-blue-50">
              <Clock className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-bold text-gray-800 tabular-nums">
                {formatTime(currentTime)}
              </span>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition-colors duration-300 rounded-lg hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-gray-100">
            {/* Date Display - Mobile */}
            <div className="px-4 py-3 mb-2 border border-teal-100 rounded-lg bg-gradient-to-r from-teal-50 to-blue-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>{formatDate(currentTime)}</span>
              </div>
              <div className="mt-1 ml-6 text-xs text-gray-500">
                {formatTime(currentTime)} WIB
              </div>
            </div>

            {navLinks.map((link, index) => (
              <a
                key={link.to}
                href={link.to}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 font-medium text-gray-700 transition-all duration-300 transform rounded-lg hover:text-teal-600 hover:bg-teal-50 hover:translate-x-1"
                style={{
                  animation: isOpen
                    ? `slideIn 0.3s ease-out ${index * 0.1}s both`
                    : undefined,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
