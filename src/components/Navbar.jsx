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
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-teal-500 to-blue-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                MentalSehat
              </div>
              <div className="text-xs text-gray-500 -mt-1">
                Platform Kesehatan Mental
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    className="px-4 py-2 text-gray-700 hover:text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-all duration-300 relative group"
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
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Clock */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-blue-50 px-3 py-2 rounded-lg border border-teal-100">
              <Clock className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-bold text-gray-800 tabular-nums">
                {formatTime(currentTime)}
              </span>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-teal-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            <div className="px-4 py-3 mb-2 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>{formatDate(currentTime)}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1 ml-6">
                {formatTime(currentTime)} WIB
              </div>
            </div>

            {navLinks.map((link, index) => (
              <a
                key={link.to}
                href={link.to}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg font-medium transition-all duration-300 transform hover:translate-x-1"
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
