"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { apiUrl } from "@/lib/api";

type Mode = "login" | "register";

type Props = { mode: Mode };

type Errors = Record<string, string>;

export default function AuthForm({ mode }: Props) {
  const isRegister = mode === "register";
  const router = useRouter();
  const [nextUrl, setNextUrl] = useState("/");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setNextUrl(params.get("next") || "/");
  }, []);

  const title = useMemo(() => (isRegister ? "Ro‘yxatdan o‘tish" : "Kirish"), [isRegister]);

  function update(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerMessage("");
  }

  function validate() {
    const nextErrors: Errors = {};

    if (isRegister) {
      if (form.firstName.trim().length < 2) nextErrors.firstName = "Ism kamida 2 ta harf bo‘lsin.";
      if (form.lastName.trim().length < 2) nextErrors.lastName = "Familya kamida 2 ta harf bo‘lsin.";
      if (form.phone.replace(/\D/g, "").length < 9) nextErrors.phone = "Telefon raqamni to‘liq kiriting.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "To‘g‘ri email kiriting.";
    if (form.password.length < 6) nextErrors.password = "Parol kamida 6 ta belgidan iborat bo‘lsin.";
    if (isRegister && form.password !== form.confirmPassword) nextErrors.confirmPassword = "Parollar bir xil emas.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerMessage("");
    setSuccessMessage("");

    if (!validate()) return;
    setLoading(true);

    try {
      const endpoint = isRegister ? apiUrl("/api/auth/register") : apiUrl("/api/auth/login");
      const payload = isRegister
        ? {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            email: form.email.trim().toLowerCase(),
            password: form.password,
          }
        : {
            email: form.email.trim().toLowerCase(),
            password: form.password,
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const fieldErrors = Array.isArray(data?.errors) ? data.errors : [];
        if (fieldErrors.length) {
          const mapped: Errors = {};
          for (const item of fieldErrors) {
            const field = item.path?.[0];
            if (typeof field === "string" && !mapped[field]) mapped[field] = item.message;
          }
          setErrors((prev) => ({ ...prev, ...mapped }));
        }
        setServerMessage(data?.message || "Xatolik yuz berdi.");
        return;
      }

      if (data?.token) localStorage.setItem("token", data.token);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

      const success = isRegister ? "Ro‘yxatdan muvaffaqiyatli o‘tildi." : "Tizimga muvaffaqiyatli kirildi.";
      setSuccessMessage(success);

      setTimeout(() => {
        router.replace(nextUrl);
        router.refresh();
      }, 700);
    } catch {
      setServerMessage("Serverga ulanib bo‘lmadi. Backend ishlayotganini tekshiring.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="hero-title-wrap auth-title-wrap">
          <h1 className="page-title center">{title}</h1>
        </div>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {isRegister ? (
            <>
              <Field label="Ism" value={form.firstName} onChange={(v) => update("firstName", v)} error={errors.firstName} />
              <Field label="Familya" value={form.lastName} onChange={(v) => update("lastName", v)} error={errors.lastName} />
              <Field label="Telefon" value={form.phone} onChange={(v) => update("phone", v)} error={errors.phone} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} error={errors.email} />
              <Field label="Manzil" value={form.address} onChange={(v) => update("address", v)} error={errors.address} />
            </>
          ) : (
            <>
              <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} error={errors.email} />
            </>
          )}

          <Field label="Parol" type="password" value={form.password} onChange={(v) => update("password", v)} error={errors.password} />
          {isRegister ? (
            <Field
              label="Parolni tasdiqlang"
              type="password"
              value={form.confirmPassword}
              onChange={(v) => update("confirmPassword", v)}
              error={errors.confirmPassword}
            />
          ) : null}

          {serverMessage ? <div className="message error">{serverMessage}</div> : null}
          {successMessage ? <div className="message success">{successMessage}</div> : null}

          <button className="primary-btn auth-submit" type="submit" disabled={loading}>
            {loading ? "Yuborilmoqda..." : isRegister ? "Jo‘natish" : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
};

function Field({ label, value, onChange, error, type = "text" }: FieldProps) {
  return (
    <label className="field-block">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className={`text-input ${error ? "has-error" : ""}`}
      />
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
