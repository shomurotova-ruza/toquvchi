"use client";

import Link from "next/link";
import SidebarNav from "../ui/SidebarNav";
import Topbar from "../ui/Topbar";

const cards = [
  {
    id: "1",
    title: "Boshlang‘ich bilimlar",
    desc: "0 dan boshlovchilar uchun darslar",
    image: "/images/course-1.jpg",
    href: "/lesson/beginner",
  },
  {
    id: "2",
    title: "Kryuchokda to‘qish",
    desc: "Ilgak bilan to‘qish darslari",
    image: "/images/course-2.jpg",
    href: "/lesson/crochet",
  },
  {
    id: "3",
    title: "Spitsda to‘qish",
    desc: "Spitsa bilan to‘qish darslari",
    image: "/images/course-3.jpg",
    href: "/lesson/knitting",
  },
];

export default function CoursesClient() {
  return (
    <main className="page-shell">
      <div className="page-frame">
        <Topbar />

        <div className="content-grid">
          <SidebarNav />

          <section className="main-content">
            <div className="hero-block">
              <h2>Kurslar platformasi</h2>
              <p>
                O‘zingizga mos yo‘nalishni tanlang va video darslarni boshlang.
              </p>
            </div>

            <div className="courses-grid">
              {cards.map((card) => (
                <article className="course-card" key={card.id}>
                  <div className="course-image-wrap">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="course-image"
                    />
                  </div>

                  <Link href={card.href} className="course-btn">
                    {card.title}
                  </Link>

                  <p className="course-desc">{card.desc}</p>
                </article>
              ))}
            </div>

            <div className="bottom-contact-bar">
              <div className="bottom-chip">123456777</div>
              <div className="bottom-chip">info@toquvchi.com</div>
              <div className="bottom-chip">Telegram</div>
              <div className="bottom-chip">Instagram</div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}