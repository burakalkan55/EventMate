"use client";
import AuthNavbar from "../components/AuthNavbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "../components/common/Toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState<{ msg: string; type?: "success" | "error" | "info" } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({ msg: data.error || "Invalid credentials ❌", type: "error" });
        return;
      }

      setToast({ msg: "Welcome back 👋", type: "success" });
      setTimeout(() => router.push("/profile"), 1200);
    } catch {
      setToast({ msg: "Server error!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNavbar />
      <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-gray-100">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-pink-300 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-pink-300 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-pink-500 font-medium hover:underline">
              Register now
            </a>
          </p>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
