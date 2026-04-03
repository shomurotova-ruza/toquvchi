"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const menuItems = [
  { label: "Bosh sahifa", href: "/", match: (path: string) => path === "/" },
  { label: "Ro‘yxatdan o‘tish", href: "/register", match: (path: string) => path === "/register" },
  {
    label: "Boshlang‘ich bilimlar",
    href: "/courses?cat=beginner",
    match: (path: string, cat: string | null) => path === "/courses" && cat === "beginner",
  },
  {
    label: "Kryuchokda to‘qish",
    href: "/courses?cat=crochet",
    match: (path: string, cat: string | null) => path === "/courses" && cat === "crochet",
  },
  {
    label: "Spitsda to‘qish",
    href: "/courses?cat=knitting",
    match: (path: string, cat: string | null) => path === "/courses" && cat === "knitting",
  },
  { label: "Biz bilan bog‘lanish", href: "/contact", match: (path: string) => path === "/contact" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  return (
    <aside className="sidebar">
      <div>
        <div className="brand-wrap">
          <h1 className="brand-title">To‘quvchi qiz</h1>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const active = item.match(pathname, cat);
            return (
              <Link key={item.href} href={item.href} className={active ? "menu-link active" : "menu-link"}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
