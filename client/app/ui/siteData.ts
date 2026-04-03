export const contacts = {
  phone: "123456777",
  email: "shomurotova.ruza@gmail.com",
  telegram: "Telegram",
  instagram: "Instagram",
};

export const categories = [
  {
    key: "beginner",
    title: "Boshlang‘ich bilimlar",
    description: "0 dan boshlovchilar uchun",
    href: "/courses?cat=beginner",
    image: "/images/course-1.svg",
  },
  {
    key: "crochet",
    title: "Kryuchokda to‘qish",
    description: "Ilgak bilan to‘qish darslari",
    href: "/courses?cat=crochet",
    image: "/images/course-2.svg",
  },
  {
    key: "knitting",
    title: "Spitsda to‘qish",
    description: "Spitsa bilan to‘qish darslari",
    href: "/courses?cat=knitting",
    image: "/images/course-3.svg",
  },
];

export const lessonsByCategory = {
  beginner: {
    heading: "Boshlang‘ich bilimlar",
    lessons: [
      { id: "b1", title: "1-dars: To‘qish uchun kerakli asboblar", duration: "12:31" },
      { id: "b2", title: "2-dars: Iplarni qanday tanlash", duration: "08:45" },
    ],
  },
  crochet: {
    heading: "Kryuchokda to‘qish darslari",
    lessons: [
      { id: "c1", title: "1-dars: Zanjircha to‘qish", duration: "08:27" },
      { id: "c2", title: "2-dars: Halqa shaklida boshlash", duration: "08:22" },
    ],
  },
  knitting: {
    heading: "Spitsda to‘qish darslari",
    lessons: [
      { id: "k1", title: "1-dars: Spitsni ushlash va boshlash", duration: "10:10" },
      { id: "k2", title: "2-dars: Oddiy naqsh (rezinka)", duration: "09:05" },
    ],
  },
} as const;
