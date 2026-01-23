import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  Brain,
  MessageCircle,
  TrendingUp,
  Sparkles,
  Users,
  Shield,
  Clock,
  Play,
  ExternalLink,
  Quote,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("semua");

  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const [activeAd, setActiveAd] = useState(0);
  const [showAds, setShowAds] = useState(() => {
    return localStorage.getItem("showads") !== "false";
  });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Pantau Mood Harian",
      description:
        "Catat perasaan Anda setiap hari dan lihat pola emosi Anda dari waktu ke waktu",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Tanya AI Kesehatan Mental",
      description:
        "Dapatkan dukungan dan saran dari AI yang dirancang khusus untuk kesehatan mental",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Analisis Perkembangan",
      description:
        "Pahami perjalanan kesehatan mental Anda melalui visualisasi dan insight yang mudah dipahami",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Self-Care Tips",
      description:
        "Artikel dan tips harian untuk merawat kesehatan mental Anda dengan cara yang sederhana",
    },
  ];

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      text: "100% Gratis untuk Semua",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Data Anda Aman & Privat",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Akses 24/7 Kapan Saja",
    },
  ];

  // Materi dari dokter terkenal
  const expertInsights = [
    {
      name: "Dr. Andri, Sp.KJ",
      title: "Psikiater",
      quote:
        "Kesehatan mental sama pentingnya dengan kesehatan fisik. Merawat pikiran adalah investasi terbaik untuk masa depan.",
      topic: "Pentingnya Kesehatan Mental",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    },
    {
      name: "Dr. Sari Psikolog, M.Psi",
      title: "Psikolog Klinis",
      quote:
        "Tidak ada yang salah dengan meminta bantuan. Berbicara tentang perasaan adalah tanda kekuatan, bukan kelemahan.",
      topic: "Stigma Kesehatan Mental",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    },
    {
      name: "Prof. Dr. Budi, Sp.KJ(K)",
      title: "Konsultan Psikiatri",
      quote:
        "Stres adalah bagian dari kehidupan, tetapi kita bisa belajar mengelolanya dengan cara yang sehat dan produktif.",
      topic: "Manajemen Stres",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    },
  ];

  const rawVideos = [
    // KECEMASAN
    { id: "1", url: "https://youtu.be/A3uIr2F2Ono", category: "anxiety" },
    { id: "2", url: "https://youtu.be/abajYksqvJI", category: "anxiety" },

    // DEPRESI
    { id: "3", url: "https://youtu.be/wr2IqS8bsS4", category: "depresi" },
    { id: "4", url: "https://youtu.be/9QnsB9SCzjw", category: "depresi" },

    // STRES
    { id: "5", url: "https://youtu.be/htY0Z7SEYR4", category: "stres" },

    // BURNOUT
    { id: "6", url: "https://youtu.be/R0on0Hat2AY", category: "burnout" },

    // MINDFULNESS
    { id: "7", url: "https://youtu.be/4wKh265mCiA", category: "mindfulness" },

    // MEDITASI
    { id: "8", url: "https://youtu.be/wIiUxN5sE7Y", category: "meditasi" },

    // SELF CARE
    { id: "9", url: "https://youtu.be/NJPbfv69PUM", category: "selfcare" },
    { id: "10", url: "https://youtu.be/gtXn4MnZEwE", category: "selfcare" },

    // TIDUR
    { id: "11", url: "https://youtu.be/ou4dNq_8CRA", category: "tidur" },

    // RELAKSASI
    { id: "12", url: "https://youtu.be/77ZozI0rw7w", category: "relaksasi" },

    // EMOSI
    { id: "13", url: "https://youtu.be/u2QeLPVULAs", category: "emosi" },
    { id: "14", url: "https://youtu.be/zyqpFFfMO_g", category: "emosi" },

    // MOTIVASI
    { id: "15", url: "https://youtu.be/kiEeW4Qd86o", category: "motivasi" },

    // RELASI
    { id: "16", url: "https://youtu.be/Sdwgjya0UaU", category: "relasi" },

    // SOSIAL
    { id: "17", url: "https://youtu.be/IdXPq_vi0X4", category: "sosial" },

    // PENGEMBANGAN DIRI
    {
      id: "18",
      url: "https://youtu.be/pRdIp1VjA4U",
      category: "pengembangandiri",
    },
    {
      id: "19",
      url: "https://youtu.be/cds-Zd9msdQ",
      category: "pengembangandiri",
    },

    // EDUKASI
    { id: "20", url: "https://youtu.be/_50igeHW7vw", category: "edukasi" },
  ];

  const categories = [
    { id: "semua", label: "Semua" },
    { id: "anxiety", label: "Kecemasan" },
    { id: "depresi", label: "Depresi" },
    { id: "stres", label: "Stres" },
    { id: "burnout", label: "Burnout" },
    { id: "mindfulness", label: "Mindfulness" },
    { id: "meditasi", label: "Meditasi" },
    { id: "selfcare", label: "Self-Care" },
    { id: "tidur", label: "Tidur" },
    { id: "relaksasi", label: "Relaksasi" },
    { id: "emosi", label: "Emosi" },
    { id: "motivasi", label: "Motivasi" },
    { id: "relasi", label: "Relasi" },
    { id: "sosial", label: "Sosial" },
    { id: "pengembangandiri", label: "Pengembangan Diri" },
    { id: "edukasi", label: "Edukasi" },
  ];

  const getYoutubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
    return match ? match[1] : null;
  };

  const formatDuration = (iso) => {
    const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const min = match?.[1] || "0";
    const sec = match?.[2] || "0";
    return `${min}:${sec.padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

      const results = await Promise.all(
        rawVideos.map(async (v) => {
          const videoId = getYoutubeId(v.url);

          const res = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`,
          );

          const data = await res.json();
          const item = data.items?.[0];
          if (!item) return null;

          return {
            id: v.id,
            category: v.category,
            youtubeId: videoId,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            thumbnail:
              item.snippet.thumbnails.maxres?.url ||
              item.snippet.thumbnails.high.url,
            duration: formatDuration(item.contentDetails.duration),
          };
        }),
      );

      setVideos(results.filter(Boolean));
      setLoadingVideos(false);
    };

    fetchVideos();
  }, []);

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredVideos =
    activeCategory === "semua"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);

  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const ads = [
    {
      id: 1,
      type: "video",
      src: "/videos/Video.mp4",
    },
    {
      id: 2,
      type: "video",
      src: "/videos/Video 1.mp4",
    },
    {
      id: 3,
      type: "video",
      src: "/videos/Video 2.mp4",
    },
    {
      id: 4,
      type: "image",
      src: "/images/banners/banner-2.jpg",
    },
    {
      id: 5,
      type: "image",
      src: "",
    },
  ];

  const AUTO_SLIDE_DELAY = 15000;
  useEffect(() => {
    if (!showAds || isPaused) return;

    const interval = setInterval(() => {
      setActiveAd((prev) => (prev + 1) % ads.length);
    }, AUTO_SLIDE_DELAY);

    return () => clearInterval(interval);
  }, [showAds, isPaused]);

  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (touchStartX.current - endX > 50) {
      setActiveAd((prev) => (prev + 1) % ads.length);
    }

    if (endX - touchStartX.current > 50) {
      setActiveAd((prev) => (prev - 1 + ads.length) % ads.length);
    }

    setIsPaused(false);
  };

  return (
    <>
      <Navbar />
      <div className="">
        {/* ===== PROMO BANNER ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50 to-white">
          <div className="container px-6 pt-20 pb-10 mx-auto mt-8">
            {/* BANNER */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className={
                "relative overflow-hidden transition-all duration-700 ease-in-out shadow-xl rounded-2xl " +
                (showAds
                  ? "opacity-100 scale-100 max-h-[500px]"
                  : "opacity-0 scale-95 max-h-0")
              }
            >
              <div className="relative w-full aspect-[16/9] max-h-[600px] md:max-h-[680px]">
                <div
                  key={activeAd}
                  className="absolute inset-0 transition-all duration-700 ease-in-out animate-fadeIn"
                >
                  {ads[activeAd].type === "video" ? (
                    <video
                      src={ads[activeAd].src}
                      autoPlay
                      muted
                      loop
                      onPlay={() => setIsPaused(true)}
                      onPause={() => setIsPaused(false)}
                      className="object-contain w-full h-full bg-transparent "
                    />
                  ) : (
                    <img
                      src={ads[activeAd].src}
                      alt="Promo Banner"
                      className="object-contain w-full h-full bg-transparent "
                    />
                  )}

                  {/* soft overlay biar nyatu ke hero */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
              {/* NAV DOT */}
              <div className="absolute z-20 flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
                {ads.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveAd(i)}
                    className={`transition-all duration-300 rounded-full ${
                      activeAd === i
                        ? "w-8 h-2 bg-white"
                        : "w-2 h-2 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* TOGGLE BUTTON */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAds(!showAds)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-teal-700 transition-all duration-300 bg-white border border-teal-200 rounded-full shadow-sm hover:shadow-md hover:bg-teal-50 hover:border-teal-300 group"
              >
                {showAds ? (
                  <>
                    <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    <span>Sembunyikan Banner</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                    <span>Tampilkan Banner</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50">
          <div
            className="absolute top-20 left-10 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <div className="w-16 h-16 bg-teal-200 rounded-full opacity-40 blur-xl"></div>
          </div>
          <div
            className="absolute top-40 right-20 animate-bounce"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          >
            <div className="w-24 h-24 bg-blue-200 rounded-full opacity-40 blur-xl"></div>
          </div>
          <div
            className="absolute bottom-20 left-1/4 animate-bounce"
            style={{ animationDuration: "5s", animationDelay: "2s" }}
          >
            <div className="w-20 h-20 bg-green-200 rounded-full opacity-40 blur-xl"></div>
          </div>

          <div className="container relative z-10 px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-teal-700 bg-teal-100 rounded-full animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Platform Kesehatan Mental Digital
                </span>
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-800 md:text-6xl">
                Kesehatan Mental
                <br />
                <span className="text-transparent bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text">
                  Dimulai dari Kamu
                </span>
                <span
                  className="inline-block ml-3 animate-bounce"
                  style={{ animationDuration: "2s" }}
                >
                  🌱
                </span>
              </h1>

              <p className="mb-10 text-xl leading-relaxed text-gray-600 md:text-2xl">
                Platform untuk mengenal mood, bertanya AI,
                <br />
                dan memahami diri sendiri dengan lebih baik
              </p>

              <div className="flex flex-col justify-center gap-4 mb-12 sm:flex-row">
                <button
                  onClick={() => (window.location.href = "/tanya-ai")}
                  className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 shadow-lg group bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:scale-105"
                >
                  Mulai Sekarang - Gratis
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "/pdf/Laporan Litdig Kel. 1 - Kampanye Kesehatan Mental di Era Digital - TIF RP 25E.pdf",
                      "blank",
                    )
                  }
                  className="px-8 py-4 text-lg font-semibold text-teal-600 transition-all duration-300 bg-white border-2 border-teal-200 rounded-xl hover:border-teal-400 hover:shadow-lg"
                >
                  Pelajari Lebih Lanjut
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 transition-all duration-300 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-105"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="text-teal-600">{benefit.icon}</div>
                    <span className="text-sm font-medium text-gray-700">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-800">
                Fitur yang Mendukung Perjalanan Anda
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-600">
                Berbagai tools sederhana namun powerful untuk membantu Anda
                merawat kesehatan mental setiap hari
              </p>
            </div>

            <div className="grid gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4 max-w-7xl">
              {features.map((feature, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`group relative bg-gradient-to-br from-white to-teal-50 p-8 rounded-2xl border-2 border-teal-100 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                    activeCard === i ? "shadow-2xl scale-105" : "shadow-md"
                  }`}
                  style={{
                    transform:
                      activeCard === i ? "translateY(-10px)" : "translateY(0)",
                  }}
                >
                  <div
                    className={`inline-flex p-4 bg-gradient-to-br from-teal-500 to-blue-500 text-white rounded-xl mb-6 transition-all duration-500 ${
                      activeCard === i ? "scale-110 rotate-6" : ""
                    }`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-800">
                    {feature.title}
                  </h3>

                  <p className="leading-relaxed text-gray-600">
                    {feature.description}
                  </p>

                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-2xl transition-opacity duration-500 ${
                      activeCard === i ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Insights Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
          <div className="container px-6 mx-auto">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-teal-700 bg-teal-100 rounded-full">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Dari Para Ahli</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-gray-800">
                Wawasan dari Dokter Terkenal
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-600">
                Pelajari tentang kesehatan mental dari para profesional
                terpercaya
              </p>
            </div>

            <div className="grid gap-8 mx-auto md:grid-cols-3 max-w-7xl">
              {expertInsights.map((expert, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl hover:scale-105"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 transition-all duration-300 bg-teal-100 rounded-bl-full opacity-50 group-hover:w-40 group-hover:h-40"></div>

                  <div className="relative p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="object-cover w-16 h-16 border-4 border-white rounded-full shadow-lg"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {expert.name}
                        </h3>
                        <p className="text-sm text-teal-600">{expert.title}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Quote className="w-8 h-8 mb-3 text-teal-300" />
                      <p className="italic leading-relaxed text-gray-700">
                        "{expert.quote}"
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm font-medium text-teal-600">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        {expert.topic}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-teal-700 bg-teal-100 rounded-full">
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Konten Edukatif</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-gray-800">
                Video Kesehatan Mental
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600">
                Tonton video pilihan untuk memahami dan merawat kesehatan mental
                Anda
              </p>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Video Grid */}
            <div className="grid gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
              {paginatedVideos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 shadow-lg group rounded-2xl hover:shadow-2xl hover:scale-105 hover:border-teal-400"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="object-cover w-full transition-transform duration-500 h-52 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black opacity-0 bg-opacity-40 group-hover:opacity-100">
                      <div className="flex items-center justify-center w-16 h-16 transition-transform duration-300 bg-white rounded-full group-hover:scale-110">
                        <Play
                          className="w-8 h-8 ml-1 text-teal-600"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                    <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-black rounded-lg bottom-3 right-3 bg-opacity-80">
                      {video.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-teal-600">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600">{video.channel}</p>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                      <span className="text-xs font-medium text-teal-600 uppercase">
                        {categories.find((c) => c.id === video.category)
                          ?.label || video.category}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400 transition-colors group-hover:text-teal-600" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
            {loadingVideos && (
              <p className="text-center text-gray-500">Memuat video...</p>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                      currentPage === i + 1
                        ? "bg-teal-500 text-white shadow-lg"
                        : "bg-white border hover:bg-teal-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
            {filteredVideos.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-xl text-gray-500">
                  Tidak ada video untuk kategori ini
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
