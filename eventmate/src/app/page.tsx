"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-gray-900"
      }`}
    >
      {/* 🌸 Navbar */}
      <Navbar />

      {/* 🌙 Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition shadow-md"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* 🌟 Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 pt-32 pb-40">
        <h1
          className={`text-5xl md:text-6xl font-extrabold mb-6 leading-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Discover Events, Meet People, <br />
          and{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Make Memories
          </span>
        </h1>

        <p
          className={`text-lg md:text-xl max-w-2xl mb-10 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          EventMate helps you find local events, connect with friends, and
          create unforgettable experiences — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/register"
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition"
          >
            Join Now
          </Link>
          <Link
            href="/login"
            className="border border-purple-400 text-purple-600 dark:text-purple-300 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition"
          >
            Already a member?
          </Link>
        </div>
      </main>

     {/* 💫 Features Section */}
<section
  id="features"
  className={`py-28 px-6 transition-colors duration-500 ${
    darkMode
      ? "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"
      : "bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
  }`}
>
  <div className="max-w-6xl mx-auto text-center">
    <h2
      className={`text-3xl font-bold mb-12 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      Why Choose{" "}
      <span className="text-pink-500 dark:text-pink-400">EventMate?</span>
    </h2>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          title: "🎟️ Explore Events",
          text: "Browse trending events in your city or create your own in seconds.",
        },
        {
          title: "🤝 Connect with People",
          text: "Meet others who share your interests and make new connections easily.",
        },
        {
          title: "📅 Manage Effortlessly",
          text: "Keep track of your upcoming events, attendees, and notifications.",
        },
      ].map((f, i) => (
        <div
          key={i}
          className={`p-8 rounded-3xl shadow-lg backdrop-blur-sm border transition-transform hover:scale-[1.03] ${
            darkMode
              ? "bg-gray-800/60 border-gray-700 hover:border-purple-500"
              : "bg-white/80 border-pink-100 hover:border-purple-300"
          }`}
        >
          <h3
            className={`text-xl font-semibold mb-3 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {f.title}
          </h3>
          <p className={`${darkMode ? "text-gray-200" : "text-black/90"}`}>
            {f.text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* 📩 Contact Section */}
      <section
        id="contact"
        className={`py-28 text-center px-6 ${
          darkMode ? "bg-gray-900" : "bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Stay <span className="text-pink-500">Connected</span> 💌
        </h2>
        <p
          className={`max-w-xl mx-auto mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Follow us for updates, collaborations and support!
        </p>

        <div className="flex justify-center gap-8 flex-wrap">
          {/* Email */}
          <a
            href="mailto:eventmate@support.com"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-md"
          >
            📧 eventmate@support.com
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/eventmateapp"
            target="_blank"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-md"
          >
            📸 @eventmateapp
          </a>
        </div>
      </section>

     

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
