"use client";

import { Heart, ShoppingBag, Search, ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const showBack = pathname !== "/";

  return (
    <header className="topbar">
      <div className="topbar-gradient" />
      <div className="topbar-inner">
        <div className="topbar-side">
          {showBack ? (
            <button className="back-btn" onClick={() => router.back()} aria-label="Ortga qaytish">
              <ArrowLeft size={30} />
            </button>
          ) : (
            <div className="back-btn placeholder" />
          )}
        </div>

        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="izla" readOnly />
        </div>

        <div className="topbar-actions">
          <button className="icon-btn" aria-label="wishlist">
            <Heart size={28} />
          </button>
          <button className="icon-btn" aria-label="cart">
            <ShoppingBag size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}
