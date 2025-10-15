"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "../components/common/Toast";
import MainNavbar from "../components/MainNavbar";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type?: "success" | "error" | "info" } | null>(null);

  // 🔹 Kullanıcı verisini çek
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/profile", {
          credentials: "include",
          cache: "no-store",
        });
        if (res.status === 401) {
          router.replace("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setBio(data.user?.bio || "");
        setImage(data.user?.image || null);
      } catch {
        setToast({ msg: "Failed to load profile ❌", type: "error" });
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  // 🔹 Resim yükleme önizleme
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Profil kaydetme
  const save = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bio, image: preview || image }),
      });

      if (res.ok) {
        const d = await res.json();
        setUser(d.user);
        setToast({ msg: "Profile updated successfully 🎉", type: "success" });
      } else {
        setToast({ msg: "Update failed ❌", type: "error" });
      }
    } catch {
      setToast({ msg: "Server error ❌", type: "error" });
    }
  };

  // 🔹 Logout işlemi
  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    router.replace("/login");
  };

  // 🔹 Yükleniyor ekranı
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 border-4 border-transparent border-t-pink-500 border-r-purple-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-medium text-lg animate-pulse">
            Loading your profile...
          </p>
        </div>
      </div>
    );

  if (!user) return null;

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 px-4 py-10">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 flex flex-col items-center transition-all duration-300 hover:shadow-3xl">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Welcome, {user.name} 👋
          </h1>

          {/* Profile Image Upload */}
          <div className="relative w-36 h-36 mb-5">
            <img
              src={preview || image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-purple-400 shadow-md"
            />
            <label className="absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-medium py-1 px-3 rounded-full cursor-pointer hover:opacity-90">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </label>
          </div>

          {/* Bio */}
          <textarea
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none resize-none text-gray-700"
            rows={4}
            placeholder="Write something about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          {/* Save Button */}
          <button
            onClick={save}
            className="w-full mt-6 py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-all shadow-md"
          >
            Save Changes
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="mt-6 text-red-500 text-sm hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Toast Bildirimi */}
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
