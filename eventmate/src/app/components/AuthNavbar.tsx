"use client";
import Link from "next/link";

export default function AuthNavbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span className="text-pink-500">Event</span>
          <span className="text-gray-800">Mate</span>
        </Link>

        {/* Right Side */}
        <div>
        

          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold">
            <Link
            href="/"
            className=""
        >   Home
          </Link>
        </button>
        </div>
      </div>
    </nav>
  );
}
