"use client";

import React from "react";

export default function RegisterPage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [okMsg, setOkMsg] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOkMsg(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ firstName, lastName, phone, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message ?? "Xatolik yuz berdi");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setOkMsg("✅ Ro‘yxatdan o‘tildi! Token saqlandi.");
    } catch {
      setError("Serverga ulana olmadik. Backend ishlayaptimi?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-4xl font-semibold text-purple-800">Ro‘yxatdan o‘tish</h1>
      <p className="mt-2 text-slate-600">Ma’lumotlarni kiriting va akkount yarating.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-3xl border border-purple-100 bg-white p-6">
        <Input label="Ism" placeholder="Ismingiz" value={firstName} onChange={setFirstName} />
        <Input label="Familya" placeholder="Familyangiz" value={lastName} onChange={setLastName} />
        <Input label="Telefon" placeholder="+998 90 123 45 67" value={phone} onChange={setPhone} />
        <Input label="Email" placeholder="example@gmail.com" type="email" value={email} onChange={setEmail} />
        <Input label="Parol" placeholder="••••••••" type="password" value={password} onChange={setPassword} />

        {error && <div className="text-sm text-red-600">{error}</div>}
        {okMsg && <div className="text-sm text-green-700">{okMsg}</div>}

        <button
          disabled={loading}
          className="mt-2 w-full h-12 rounded-2xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition disabled:opacity-60"
        >
          {loading ? "Yuborilmoqda..." : "Jo‘natish"}
        </button>

        <div className="text-sm text-slate-600">
          Akkount bormi?{" "}
          <a className="text-purple-700" href="/login">
            Kirish
          </a>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-slate-800">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-2xl border border-purple-100 bg-white px-4 outline-none focus:ring-2 focus:ring-purple-200"
      />
    </label>
  );
}