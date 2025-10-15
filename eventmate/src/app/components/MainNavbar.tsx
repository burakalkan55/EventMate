"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainNavbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // LocalStorage'dan kullanıcıyı çek
  useEffect(() => {
  const raw = localStorage.getItem("user");

  if (raw && raw !== "undefined" && raw !== "null") {
    try {
      setUser(JSON.parse(raw));
    } catch (e) {
      console.error("user parse error:", e);
    }
  } else {
    setUser(null);
  }
}, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; path=/;";
    router.push("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border-b border-purple-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/events"
          className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent hover:opacity-90 transition"
        >
          EventMate
        </Link>

        {/* Menü */}
        <div className="flex items-center gap-8">
          <Link href="/events" className="text-gray-700 hover:text-purple-600 transition">
            Events
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-purple-600 transition">
            Profile
          </Link>
          <Link href="/messages" className="text-gray-700 hover:text-purple-600 transition">
            Messages
          </Link>

          {/* Avatar + Logout */}
          {user && (
            <div className="flex items-center gap-4 ml-2">
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
                    // base64 bozuksa beyaz bir daire göster
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
          )}
        </div>
      </div>
    </nav>
  );
}
