"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AuthControls() {
  const router = useRouter();
  const [userName, setUserName] = React.useState<string | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");
    if (token && userRaw) {
      try {
        const u = JSON.parse(userRaw);
        setUserName(u?.firstName ?? "User");
      } catch {
        setUserName("User");
      }
    } else {
      setUserName(null);
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserName(null);
    router.replace("/login");
  }

  if (!userName) {
    return (
      <a
        href="/login"
        className="h-10 px-4 rounded-2xl border border-purple-100 text-purple-700 flex items-center hover:bg-purple-50 transition"
      >
        Kirish
      </a>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm text-slate-600">Salom, {userName}</div>
      <button
        onClick={logout}
        className="h-10 px-4 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition"
      >
        Chiqish
      </button>
    </div>
  );
}