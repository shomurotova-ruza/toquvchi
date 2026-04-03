"use client";

import Link from "next/link";
import { Phone, Mail, Send, Camera } from "lucide-react";

const menuItems = [
  { label: "Bosh sahifa", href: "/" },
  { label: "Ro‘yxatdan o‘tish", href: "/register" },
  { label: "Boshlang‘ich bilimlar", href: "/courses?cat=beginner" },
  { label: "Kryuchokda to‘qish", href: "/courses?cat=crochet" },
  { label: "Spitsda to‘qish", href: "/courses?cat=knitting" },
  { label: "Biz bilan bog‘lanish", href: "/contact" },
];

export default function SidebarNav() {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand-wrap">
          <h1 className="brand-title">To‘quvchi qiz</h1>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <Link
              key={item.href + index}
              href={item.href}
              className={index === 0 ? "menu-link active" : "menu-link"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar-contacts">
        <div className="contact-chip">
          <Phone size={18} />
          <span>+998 12 345 67 77</span>
        </div>

        <div className="contact-chip">
          <Mail size={18} />
          <span>example@gmail.com</span>
        </div>

        <div className="contact-chip">
          <Send size={18} />
          <span>Telegram</span>
        </div>

        <div className="contact-chip">
          <Camera size={18} />
          <span>Instagram</span>
        </div>
      </div>
    </aside>
  );
}