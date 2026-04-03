import Link from "next/link";
import AppShell from "@/components/AppShell";
import { contactItems, homeCards } from "@/lib/site-data";

export default function HomePage() {
  return (
    <AppShell active="home">
      <div className="hero-title-wrap">
        <h1 className="page-title">Bosh sahifa</h1>
      </div>

      <div className="home-cards-grid">
        {homeCards.map((card) => (
          <article className="home-card" key={card.category}>
            <div className="home-card-image">
              <div className="illustration">{card.imageLabel}</div>
            </div>
            <Link className="home-card-button" href={card.href}>
              {card.title}
            </Link>
          </article>
        ))}
      </div>

      <div className="bottom-contact-bar">
        {contactItems.map((item) => (
          <a key={item.label} href={item.href} className="bottom-chip" target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            <span className="contact-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </AppShell>
  );
}
