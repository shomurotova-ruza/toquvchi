import AppShell from "@/components/AppShell";
import { contactItems } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <AppShell active="contact" pageTitle="Biz bilan bog‘lanish">
      <div className="contact-page">
        {contactItems.map((item) => (
          <a key={item.label} href={item.href} className="contact-large-chip" target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            <span className="contact-icon big">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </AppShell>
  );
}
