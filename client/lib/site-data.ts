export type CategoryKey = "beginner" | "crochet" | "knitting";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  level: "Boshlovchi" | "O‘rta" | "Professional";
  category: CategoryKey;
  videoId: string;
};

export const categoryInfo: Record<
  CategoryKey,
  { title: string; description: string; short: string; emoji: string }
> = {
  beginner: {
    title: "Boshlang‘ich bilimlar",
    description: "0 dan boshlovchilar uchun video darslar",
    short: "Boshlang‘ich bilimlar",
    emoji: "🧶",
  },
  crochet: {
    title: "Kryuchokda to‘qish",
    description: "Ilgak bilan to‘qish darslari",
    short: "Kryuchokda to‘qish",
    emoji: "🪡",
  },
  knitting: {
    title: "Spitsda to‘qish",
    description: "Spitsa bilan to‘qish darslari",
    short: "Spitsda to‘qish",
    emoji: "🧵",
  },
};

export const fallbackLessons: Lesson[] = [
  { id: "b1", title: "1-dars: To‘qish uchun kerakli asboblar", duration: "12:31", level: "Boshlovchi", category: "beginner", videoId: "b1" },
  { id: "b2", title: "2-dars: Iplarni qanday tanlash", duration: "08:45", level: "Boshlovchi", category: "beginner", videoId: "b2" },
  { id: "c1", title: "1-dars: Zanjircha to‘qish", duration: "08:27", level: "O‘rta", category: "crochet", videoId: "c1" },
  { id: "c2", title: "2-dars: Halqa shaklida boshlash", duration: "08:22", level: "Boshlovchi", category: "crochet", videoId: "c2" },
  { id: "k1", title: "1-dars: Spitsni ushlash va boshlash", duration: "10:10", level: "Boshlovchi", category: "knitting", videoId: "k1" },
  { id: "k2", title: "2-dars: Oddiy naqsh (rezinka)", duration: "09:05", level: "O‘rta", category: "knitting", videoId: "k2" },
];

export const homeCards = [
  {
    category: "beginner" as CategoryKey,
    title: categoryInfo.beginner.title,
    description: categoryInfo.beginner.description,
    imageLabel: "I LOVE YARN",
    href: "/courses?cat=beginner",
  },
  {
    category: "crochet" as CategoryKey,
    title: categoryInfo.crochet.title,
    description: categoryInfo.crochet.description,
    imageLabel: "KRYUCHOK",
    href: "/courses?cat=crochet",
  },
  {
    category: "knitting" as CategoryKey,
    title: categoryInfo.knitting.title,
    description: categoryInfo.knitting.description,
    imageLabel: "SPITSA",
    href: "/courses?cat=knitting",
  },
];

export const contactItems = [
  { label: "123456777", href: "tel:+998123456777", icon: "☎" },
  { label: "shomurotova.ruza@gmail.com", href: "mailto:shomurotova.ruza@gmail.com", icon: "✉" },
  { label: "Telegram", href: "https://t.me/", icon: "➤" },
  { label: "Instagram", href: "https://instagram.com/", icon: "◎" },
];

export function getCategoryFromSearch(value: string | null): CategoryKey | null {
  if (value === "beginner" || value === "crochet" || value === "knitting") {
    return value;
  }
  return null;
}
