const categories = [
  {
    title: "Boshlang‘ich bilimlar",
    desc: "0 dan boshlovchilar uchun",
    href: "/courses?cat=beginner",
  },
  {
    title: "Kryuchokda to‘qish",
    desc: "Ilgak bilan to‘qish darslari",
    href: "/courses?cat=crochet",
  },
  {
    title: "Spitsda to‘qish",
    desc: "Spitsa bilan to‘qish darslari",
    href: "/courses?cat=knitting",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-4xl font-semibold text-purple-800">
        Kurslar platformasi
      </h1>
      <p className="mt-2 text-slate-600">
        O‘zingizga mos yo‘nalishni tanlang va video darslarni boshlang.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {categories.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="group rounded-3xl border border-purple-100 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="h-28 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 text-lg">
              Preview
            </div>

            <div className="mt-4">
              <div className="text-lg font-semibold text-slate-900 group-hover:text-purple-800">
                {c.title}
              </div>
              <div className="mt-1 text-sm text-slate-600">{c.desc}</div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-purple-700">
                Ko‘rish <span>→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}