"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          <span className="text-pink-400">Event</span>Mate
        </Link>

        <div className="hidden md:flex gap-6 text-white">
          <Link href="#features" className="hover:text-pink-400 transition">Features</Link>
          
          <Link href="#contact" className="hover:text-pink-400 transition">Contact</Link>
        </div>

        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold">
          Join Now
        </button>
      </div>
    </nav>
  );
}
