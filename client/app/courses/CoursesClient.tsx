"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Level = "Boshlovchi" | "O‘rta" | "Professional";
type Category = "beginner" | "crochet" | "knitting";

type Lesson = {
  id: string;
  title: string;
  duration: string;
  level: Level;
  category: Category;
  videoId?: string;
};

const API = "http://localhost:4000";

export default function CoursesClient({
  initialCat,
}: {
  initialCat: Category | "all";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = React.useState("");
  const [level, setLevel] = React.useState<Level | "Barchasi">("Barchasi");
  const [cat, setCat] = React.useState<Category | "all">(initialCat);

  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // URL dan kelgan initialCat o‘zgarsa sync bo‘lsin
  React.useEffect(() => {
    setCat(initialCat);
  }, [initialCat]);

  // Backend’dan darslarni olib kelamiz
  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API}/api/lessons`, {
          method: "GET",
          // keyin auth kerak bo‘lsa ham ishlashi uchun:
          credentials: "include",
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message ?? "Lessons API xato qaytardi");
        }

        const list = (data?.lessons ?? data ?? []) as Lesson[];

        if (!cancelled) setLessons(list);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to fetch");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  function setCatAndUrl(nextCat: Category | "all") {
    setCat(nextCat);

    const sp = new URLSearchParams(searchParams.toString());
    if (nextCat === "all") sp.delete("cat");
    else sp.set("cat", nextCat);

    const qs = sp.toString();
    router.replace(qs ? `/courses?${qs}` : "/courses");
  }

  const filtered = lessons.filter((l) => {
    const byCat = cat === "all" ? true : l.category === cat;
    const byLevel = level === "Barchasi" ? true : l.level === level;
    const byQuery = l.title.toLowerCase().includes(query.toLowerCase().trim());
    return byCat && byLevel && byQuery;
  });

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Pill active={cat === "all"} onClick={() => setCatAndUrl("all")}>
            Barchasi
          </Pill>
          <Pill
            active={cat === "beginner"}
            onClick={() => setCatAndUrl("beginner")}
          >
            Boshlang‘ich
          </Pill>
          <Pill
            active={cat === "crochet"}
            onClick={() => setCatAndUrl("crochet")}
          >
            Kryuchok
          </Pill>
          <Pill
            active={cat === "knitting"}
            onClick={() => setCatAndUrl("knitting")}
          >
            Spitsa
          </Pill>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <select
            className="h-11 rounded-2xl border border-purple-100 bg-white px-4"
            value={level}
            onChange={(e) => setLevel(e.target.value as any)}
          >
            <option>Barchasi</option>
            <option>Boshlovchi</option>
            <option>O‘rta</option>
            <option>Professional</option>
          </select>

          <input
            className="h-11 w-full md:w-[320px] rounded-2xl border border-purple-100 bg-white px-4 outline-none focus:ring-2 focus:ring-purple-200"
            placeholder="Dars nomidan qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="mt-6 text-slate-600">Yuklanmoqda...</div>
      )}

      {error && (
        <div className="mt-6 text-red-600">Failed to fetch: {error}</div>
      )}

      {!loading && !error && (
        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((l) => (
              <a
                key={l.id}
                href={`/lesson/${l.id}`}
                className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="relative h-40 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                  <div className="w-12 h-12 rounded-full bg-white border border-purple-100 flex items-center justify-center">
                    ▶
                  </div>
                  <div className="absolute right-3 bottom-3 rounded-xl bg-white/90 border border-purple-100 px-3 py-1 text-sm text-slate-700">
                    {l.duration}
                  </div>
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">
                      {l.title}
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Badge>{l.level}</Badge>
                    </div>
                  </div>

                  <div className="mt-1 text-purple-700 text-sm">Ko‘rish →</div>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 text-slate-600">
              Hech narsa topilmadi. Filtr yoki qidiruvni o‘zgartirib ko‘ring.
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "h-11 px-4 rounded-2xl border transition text-sm",
        active
          ? "bg-purple-600 text-white border-purple-600"
          : "bg-white border-purple-100 text-purple-700 hover:bg-purple-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-xl border border-purple-100 bg-purple-50 px-3 py-1 text-sm text-purple-700">
      {children}
    </span>
  );
}