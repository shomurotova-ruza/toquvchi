"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Expand, Play } from "lucide-react";
import AppShell from "@/components/AppShell";
import { categoryInfo, fallbackLessons, type Lesson } from "@/lib/site-data";

type Props = { id: string };

export default function LessonPageClient({ id }: Props) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Video ko‘rish uchun avval tizimga kiring.");
      setAuthReady(false);
      setLoading(false);
      return;
    }
    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (!authReady) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/lessons/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Dars topilmadi.");
        if (!cancelled) setLesson(data.lesson);
      } catch (err) {
        const local = fallbackLessons.find((item) => item.id === id) ?? null;
        if (!cancelled) {
          setLesson(local);
          setError(err instanceof Error ? `${err.message} Fallback ma’lumot ko‘rsatildi.` : "Dars yuklanmadi.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [authReady, id]);

  const active = useMemo(() => lesson?.category, [lesson]);

  async function openFullscreen() {
    if (!videoRef.current) return;
    try {
      if (videoRef.current.requestFullscreen) {
        await videoRef.current.requestFullscreen();
      }
    } catch {
      setError("Full screen rejimi ochilmadi.");
    }
  }

  return (
    <AppShell active={active}>
      {!authReady ? (
        <div className="form-card narrow">
          <div className="message error">{error || "Avval login qiling."}</div>
          <Link href={`/login?next=/lesson/${id}`} className="primary-btn auth-submit">Login</Link>
        </div>
      ) : null}

      {authReady && loading ? <div className="video-placeholder tall">Yuklanmoqda...</div> : null}

      {authReady && !loading && !lesson ? (
        <div className="form-card narrow">
          <div className="message error">Dars topilmadi.</div>
          <Link href="/courses" className="primary-btn auth-submit">Ortga qaytish</Link>
        </div>
      ) : null}

      {authReady && !loading && lesson ? (
        <div className="lesson-page-block">
          <h1 className="page-title">{lesson.title}</h1>
          <p className="page-subtitle">
            {categoryInfo[lesson.category].title} • {lesson.level} • {lesson.duration}
          </p>

          {error ? <div className="message error">{error}</div> : null}

          <div className="player-card">
            <video
              ref={videoRef}
              className="lesson-video"
              controls
              preload="metadata"
              src={`http://localhost:4000/api/video/${lesson.videoId}`}
              crossOrigin="use-credentials"
            />
            <div className="player-actions">
              <button className="primary-btn small" type="button" onClick={() => videoRef.current?.play()}>
                <Play size={16} /> Boshlash
              </button>
              <button className="secondary-btn small" type="button" onClick={openFullscreen}>
                <Expand size={16} /> Full screen
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
