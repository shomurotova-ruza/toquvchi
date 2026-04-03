"use client";

import { Heart, ShoppingBag, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-gradient" />

      <div className="topbar-inner">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="izla" />
        </div>

        <div className="topbar-actions">
          <button className="icon-btn" aria-label="wishlist">
            <Heart size={24} />
          </button>

          <button className="icon-btn" aria-label="cart">
            <ShoppingBag size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}