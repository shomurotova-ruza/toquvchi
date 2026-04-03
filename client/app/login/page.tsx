"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppFrame from "../ui/AppFrame";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message ?? "Xatolik yuz berdi");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.replace(nextUrl);
    } catch {
      setError("Serverga ulanib bo‘lmadi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppFrame>
      <div className="form-page">
        <h2 className="section-heading center">Kirish</h2>
        <form className="register-form" onSubmit={onSubmit}>
          <input className="form-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="form-input" type="password" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <div className="form-error">{error}</div> : null}
          <button type="submit" className="primary-btn">{loading ? "Kutilmoqda..." : "Kirish"}</button>
        </form>
      </div>
    </AppFrame>
  );
}
