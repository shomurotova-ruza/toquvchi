"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Expand, Play, X } from "lucide-react";
import AppShell from "@/components/AppShell";
import { categoryInfo, fallbackLessons, type Lesson } from "@/lib/site-data";
import { apiUrl } from "@/lib/api";

type Props = { id: string };

export default function LessonPageClient({ id }: Props) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token") || "";
    if (!savedToken) {
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
        const res = await fetch(apiUrl(`/api/lessons/${id}`), {
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
  const videoSrc = lesson ? apiUrl(`/api/video/${lesson.videoId}`) : "";

  async function openFullscreen() {
    const video = videoRef.current as (HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitRequestFullscreen?: () => Promise<void> | void;
      msRequestFullscreen?: () => Promise<void> | void;
    }) | null;
    if (!video) return;
    try {
      if (video.requestFullscreen) {
        await video.requestFullscreen();
        return;
      }
      if (video.webkitRequestFullscreen) {
        await video.webkitRequestFullscreen();
        return;
      }
      if (video.msRequestFullscreen) {
        await video.msRequestFullscreen();
        return;
      }
      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
        return;
      }
      setError("Bu brauzerda full screen qo‘llanmaydi.");
    } catch {
      setError("Full screen rejimi ochilmadi.");
    }
  }

  return (
    <AppShell active={active} pageTitle={lesson?.title || "Dars"}>
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
          <p className="page-subtitle">
            {categoryInfo[lesson.category].title} • {lesson.level} • {lesson.duration}
          </p>

          {error ? <div className="message error">{error}</div> : null}

          {!openVideo ? (
            <div className="video-placeholder tall lesson-open-box">
              <button className="primary-btn open-video-btn" type="button" onClick={() => setOpenVideo(true)}>
                Ochish
              </button>
            </div>
          ) : (
            <div className="video-modal">
              <div className="video-modal-card">
                <div className="video-modal-header">
                  <strong>{lesson.title}</strong>
                  <button className="icon-close-btn" type="button" onClick={() => setOpenVideo(false)}>
                    <X size={18} />
                  </button>
                </div>

                <video
                  ref={videoRef}
                  className="lesson-video"
                  controls
                  autoPlay
                  preload="metadata"
                  src={videoSrc}
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
          )}
        </div>
      ) : null}
    </AppShell>
  );
}
