'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  password: string;
};

export default function ProfileForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadMe() {
      try {
        const res = await fetch('http://localhost:4000/api/auth/me', {
          credentials: 'include',
          headers: getAuthHeaders(),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Profil yuklanmadi.');
        const user = data.user;
        setForm({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phone: user.phone || '',
          address: user.address || '',
          email: user.email || '',
          password: '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Profil yuklanmadi.');
      } finally {
        setLoading(false);
      }
    }
    loadMe();
  }, []);

  function update(name: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage('');
    setError('');
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/auth/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Profil saqlanmadi.');
      if (data?.token) localStorage.setItem('token', data.token);
      if (data?.user) localStorage.setItem('user', JSON.stringify(data.user));
      setForm((prev) => ({ ...prev, password: '' }));
      setMessage(data?.message || 'Profil saqlandi.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profil saqlanmadi.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="video-placeholder tall">Profil yuklanmoqda...</div>;
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <Field label="Ism" value={form.firstName} onChange={(v) => update('firstName', v)} />
          <Field label="Familya" value={form.lastName} onChange={(v) => update('lastName', v)} />
          <Field label="Telefon" value={form.phone} onChange={(v) => update('phone', v)} />
          <Field label="Email" value={form.email} onChange={(v) => update('email', v)} type="email" />
          <Field label="Manzil" value={form.address} onChange={(v) => update('address', v)} />
          <Field label="Yangi parol (ixtiyoriy)" value={form.password} onChange={(v) => update('password', v)} type="password" />

          {error ? <div className="message error">{error}</div> : null}
          {message ? <div className="message success">{message}</div> : null}

          <button className="primary-btn auth-submit" type="submit" disabled={saving}>
            {saving ? 'Saqlanmoqda...' : 'Profilni saqlash'}
          </button>
        </form>
      </div>
    </div>
  );
}

function getAuthHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
};

function Field({ label, value, onChange, type = 'text' }: FieldProps) {
  return (
    <label className="field-block">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="text-input"
      />
    </label>
  );
}
