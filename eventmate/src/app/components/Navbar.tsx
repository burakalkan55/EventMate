"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// 💡 Güvenli JSON parse fonksiyonu
function parseJsonSafe<T = any>(raw: string | null): T | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (trimmed === "" || trimmed === "undefined" || trimmed === "null") return null;
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const parsed = parseJsonSafe(localStorage.getItem("user"));
    setUser(parsed);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; path=/;";
    setUser(null);
    router.push("/login");
  };

  const closeMobile = () => setMobileOpen(false);

  // 🟣 Kullanıcı login değilse -> Landing Navbar (Join Now)
  if (!user) {
      return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              <span className="text-pink-400">Event</span>Mate
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex gap-6 text-gray-900">
              <Link href="#features" className="hover:text-pink-400 transition">
                Features
              </Link>
              <Link href="#contact" className="hover:text-pink-400 transition">
                Contact
              </Link>
            </div>

            {/* Actions + Mobile hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href="/register"
                className="hidden sm:inline-block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
                onClick={closeMobile}
              >
                Join Now
              </Link>

              <button
                aria-label="Toggle menu"
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileOpen((s) => !s)}
              >
                {/* simple hamburger icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu panel */}
          {mobileOpen && (
            <div className="md:hidden bg-white border-t border-gray-100">
              <div className="px-4 pt-3 pb-4 space-y-2">
                <Link href="#features" className="block text-gray-900 py-2" onClick={closeMobile}>
                  Features
                </Link>
                <Link href="#contact" className="block text-gray-900 py-2" onClick={closeMobile}>
                  Contact
                </Link>
                <Link href="/register" className="block text-gray-900 py-2" onClick={closeMobile}>
                  Join Now
                </Link>
              </div>
            </div>
          )}
        </nav>
      );
  }
  // 🟢 Kullanıcı login olmuşsa -> Main Navbar
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          href="/events"
          className="text-2xl font-bold text-gray-900"
        >
          EventMate
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/events" className="text-gray-900 hover:text-purple-600 transition">
            Events
          </Link>
          <Link href="/profile" className="text-gray-900 hover:text-purple-600 transition">
            Profile
          </Link>
          <Link href="/messages" className="text-gray-900 hover:text-purple-600 transition">
            Messages
          </Link>

          <div className="flex items-center gap-4 ml-4">
            <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-r from-pink-300 to-purple-300 shadow-sm">
              <img
                src={
                  user?.image?.startsWith("data:image")
                    ? user.image
                    : `data:image/png;base64,${user?.image || ""}`
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover bg-white"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAABAfUpMAAAAMUlEQVR42mP8z8Dwn4EIwDiqGmDkgjBwB4w4MFAFowwMwygTA0FgyF5w7A8VvEAAAgBgCGpjBY4AAAAAElFTkSuQmCC";
                }}
              />
            </div>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Toggle menu"
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileOpen((s) => !s)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel for logged-in user */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-3 pb-4 space-y-2">
            <Link href="/events" className="block text-gray-900 py-2" onClick={closeMobile}>
              Events
            </Link>
            <Link href="/profile" className="block text-gray-900 py-2" onClick={closeMobile}>
              Profile
            </Link>
            <Link href="/messages" className="block text-gray-900 py-2" onClick={closeMobile}>
              Messages
            </Link>
            <button
              onClick={() => {
                closeMobile();
                handleLogout();
              }}
              className="w-full text-left text-gray-900 py-2"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
