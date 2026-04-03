import AppFrame from "../ui/AppFrame";
import { contacts } from "../ui/siteData";

export default function ContactPage() {
  return (
    <AppFrame>
      <div className="contact-list-page">
        <div className="contact-page-chip">📞 {contacts.phone}</div>
        <div className="contact-page-chip">✉️ {contacts.email}</div>
        <div className="contact-page-chip">✈️ {contacts.telegram}</div>
        <div className="contact-page-chip">📷 {contacts.instagram}</div>
      </div>
    </AppFrame>
  );
}
