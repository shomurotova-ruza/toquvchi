"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { categoryInfo, categoryThumbnailMap, fallbackLessons, getCategoryFromSearch, type Lesson } from "@/lib/site-data";
import { apiUrl } from "@/lib/api";

type Props = {
  catParam?: string | null;
  queryParam?: string | null;
};

export default function CoursesPageClient({ catParam, queryParam }: Props) {
  const category = getCategoryFromSearch(catParam ?? null);
  const [lessons, setLessons] = useState<Lesson[]>(fallbackLessons);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (category) params.set("cat", category);
        if (queryParam?.trim()) params.set("q", queryParam.trim());
        const res = await fetch(`${apiUrl("/api/lessons")}?${params.toString()}`, {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Darslar yuklanmadi.");
        if (!cancelled && Array.isArray(data?.lessons)) setLessons(data.lessons);
      } catch (err) {
        if (!cancelled) {
          const local = fallbackLessons.filter((lesson) => {
            const catOk = category ? lesson.category === category : true;
            const q = queryParam?.toLowerCase().trim();
            const qOk = q ? lesson.title.toLowerCase().includes(q) : true;
            return catOk && qOk;
          });
          setLessons(local);
          setError(err instanceof Error ? `${err.message} Fallback ma’lumot ko‘rsatildi.` : "Server bilan aloqa bo‘lmadi.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [category, queryParam]);

  const title = category ? categoryInfo[category].title : queryParam ? `Qidiruv natijasi: ${queryParam}` : "Barcha darslar";
  const activeKey = category ?? undefined;

  const visibleLessons = useMemo(() => lessons, [lessons]);

  return (
    <AppShell active={activeKey} initialSearch={queryParam ?? ""} pageTitle={title}>
      {!category && !queryParam ? <p className="page-subtitle">Kerakli darsni tanlang.</p> : null}

      {error ? <div className="message error">{error}</div> : null}
      {loading ? <div className="video-placeholder tall">Yuklanmoqda...</div> : null}

      {!loading && visibleLessons.length === 0 ? (
        <div className="video-placeholder tall">Hech qanday natija topilmadi.</div>
      ) : null}

      {!loading && visibleLessons.length > 0 ? (
        <div className="lesson-stack">
          {visibleLessons.map((lesson) => (
            <article key={lesson.id} className="lesson-card">
              <div className="lesson-card-top">
                <div>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.level} • {lesson.duration}</p>
                </div>
                <Link href={`/lesson/${lesson.id}`} className="primary-btn small">Ochish</Link>
              </div>
              <Link
                href={`/lesson/${lesson.id}`}
                className={`video-placeholder video-open-link video-theme-${lesson.category}`}
                style={{ backgroundImage: `url(${categoryThumbnailMap[lesson.category]})` }}
              >
                <span className="video-open-badge">Videoni ko‘rish</span>
              </Link>
            </article>
          ))}
        </div>
      ) : null}
    </AppShell>
  );
}
