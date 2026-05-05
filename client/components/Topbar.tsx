'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { apiUrl } from '@/lib/api';

type Props = {
  initialValue?: string;
};

type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export default function Topbar({ initialValue = '' }: Props) {
  const router = useRouter();
  const [term, setTerm] = useState(initialValue);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  async function logout() {
    try {
      await fetch(apiUrl('/api/auth/logout'), {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
    router.refresh();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = term.trim();
    if (!value) {
      router.push('/courses');
      return;
    }
    router.push(`/courses?q=${encodeURIComponent(value)}`);
  }

  const displayName = user?.firstName ? `${user.firstName}${user?.lastName ? ` ${user.lastName}` : ''}` : '';

  return (
    <header className="topbar">
      <div className="topbar-gradient">
        <div className="topbar-logo-wrap">
          <Image src="/assets/logo.png" alt="To‘quvchi qiz logosi" width={44} height={36} className="topbar-logo" priority />
        </div>
      </div>
      <div className="topbar-inner">
        <div className="topbar-left-placeholder" />

        <form className="search-box" onSubmit={onSubmit}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="izla"
            aria-label="Qidiruv"
          />
          <button type="submit" className="search-submit" aria-label="Izlash">
            <Search size={16} />
          </button>
        </form>

        <div className="topbar-actions">
          {user ? (
            <div className="user-mini-panel">
              <span className="user-mini-name">{displayName}</span>
              <Link href="/profile" className="top-mini-link">Profil</Link>
              <button className="top-mini-link logout" type="button" onClick={logout}>Chiqish</button>
            </div>
          ) : (
            <div className="user-mini-panel guest">
              <Link href="/login" className="top-mini-link">Kirish</Link>
              <Link href="/register" className="top-mini-link">Ro‘yxatdan o‘tish</Link>
            </div>
          )}
          <button className="icon-btn" type="button" title="Sevimlilar">
            <Heart size={24} />
          </button>
          <button className="icon-btn" type="button" title="Savat">
            <ShoppingBag size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
