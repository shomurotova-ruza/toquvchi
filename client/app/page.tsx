import Image from 'next/image';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { contactItems, homeCards } from '@/lib/site-data';

const imageMap: Record<string, string> = {
  beginner: '/assets/beginner.png',
  crochet: '/assets/crochet.png',
  knitting: '/assets/knitting.png',
};

export default function HomePage() {
  return (
    <AppShell active="home" homeVariant pageTitle="Bosh sahifa">
      <div className="home-cards-grid desired-home-grid">
        {homeCards.map((card) => (
          <article className="home-card desired-home-card" key={card.category}>
            <div className="home-card-image desired-home-image">
              <Image
                src={imageMap[card.category]}
                alt={card.title}
                width={220}
                height={160}
                className={`card-real-image ${card.category}`}
                priority
              />
            </div>
            <Link className="home-card-button desired-home-button" href={card.href}>
              {card.title}
            </Link>
          </article>
        ))}
      </div>

      <div className="bottom-contact-bar desired-contact-bar">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="bottom-chip"
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
          >
            <span className="contact-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </AppShell>
  );
}
