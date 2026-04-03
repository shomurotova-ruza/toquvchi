'use client';

import Image from 'next/image';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type Props = {
  initialValue?: string;
};

export default function Topbar({ initialValue = '' }: Props) {
  const router = useRouter();
  const [term, setTerm] = useState(initialValue);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = term.trim();
    if (!value) {
      router.push('/courses');
      return;
    }
    router.push(`/courses?q=${encodeURIComponent(value)}`);
  }

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
          <button type="submit" className="search-submit">izla</button>
        </form>

        <div className="topbar-actions">
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
