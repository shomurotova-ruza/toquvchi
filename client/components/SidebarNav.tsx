"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { contactItems } from "@/lib/site-data";

type Props = {
  active?: string;
  showContacts?: boolean;
};

const menuItems = [
  { key: "home", label: "Bosh sahifa", href: "/" },
  { key: "register", label: "Ro‘yxatdan o‘tish", href: "/register" },
  { key: "beginner", label: "Boshlang‘ich bilimlar", href: "/courses?cat=beginner" },
  { key: "crochet", label: "Kryuchokda to‘qish", href: "/courses?cat=crochet" },
  { key: "knitting", label: "Spitsda to‘qish", href: "/courses?cat=knitting" },
  { key: "contact", label: "Biz bilan bog‘lanish", href: "/contact" },
];

export default function SidebarNav({ active, showContacts = false }: Props) {
  const cat = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("cat") : null;
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    setIsRegistered(Boolean(localStorage.getItem("user") || localStorage.getItem("token")));
  }, []);

  return (
    <aside className="sidebar">
      <div>
        <div className="brand-wrap">
          <Link href="/" className="brand-title">To‘quvchi qiz</Link>
        </div>

        <nav className="sidebar-menu">
          {menuItems.filter((item) => !(isRegistered && item.key === "register")).map((item) => {
            const isActive = active
              ? active === item.key
              : item.key === cat;

            return (
              <Link key={item.key} href={item.href} className={`menu-link ${isActive ? "active" : ""}`.trim()}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {showContacts ? (
        <div className="sidebar-contacts">
          {contactItems.map((item) => (
            <a key={item.label} href={item.href} className="contact-chip" target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <span className="contact-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
