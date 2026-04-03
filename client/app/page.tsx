import Link from "next/link";
import AppFrame from "./ui/AppFrame";
import { categories, contacts } from "./ui/siteData";

export default function HomePage() {
  return (
    <AppFrame>
      <div className="courses-grid home-grid">
        {categories.map((card) => (
          <article className="course-card" key={card.key}>
            <div className="course-image-wrap">
              <img src={card.image} alt={card.title} className="course-image" />
            </div>
            <Link href={card.href} className="course-btn">
              {card.title}
            </Link>
          </article>
        ))}
      </div>

      <div className="bottom-contact-bar">
        <div className="bottom-chip">{contacts.phone}</div>
        <div className="bottom-chip">{contacts.email}</div>
        <div className="bottom-chip">{contacts.telegram}</div>
        <div className="bottom-chip">{contacts.instagram}</div>
      </div>
    </AppFrame>
  );
}
