"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

type Lesson = {
  id: string;
  title: string;
  duration: string;
  level: "Boshlovchi" | "O‘rta" | "Professional";
};

const lessons: Lesson[] = [
  { id: "b1", title: "1-dars: To‘qish uchun kerakli asboblar", duration: "12:31", level: "Boshlovchi" },
  { id: "b2", title: "2-dars: Iplarni qanday tanlash", duration: "08:45", level: "Boshlovchi" },
  { id: "c1", title: "1-dars: Zanjircha to‘qish", duration: "08:27", level: "O‘rta" },
  { id: "c2", title: "2-dars: Halqa shaklida boshlash", duration: "08:22", level: "Boshlovchi" },
  { id: "k1", title: "1-dars: Spitsni ushlash va boshlash", duration: "10:10", level: "Boshlovchi" },
  { id: "k2", title: "2-dars: Oddiy naqsh (rezinka)", duration: "09:05", level: "O‘rta" },
];

export default function LessonPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
     router.replace(`/login?next=/lesson/${id}`);
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) {
    return (
      <div className="max-w-4xl">
        <div className="mt-6 rounded-3xl border border-purple-100 bg-white p-6 text-slate-700">
          Login tekshirilmoqda...
        </div>
      </div>
    );
  }

  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold text-purple-800">Dars topilmadi</h1>
        <a className="mt-4 inline-block text-purple-700" href="/courses">
          ← Kurslarga qaytish
        </a>
      </div>
    );
  }

  const videoSrc = `http://localhost:4000/api/video/${lesson.id}`;

  return (
    <div className="max-w-4xl">
      <a className="text-purple-700" href="/courses">
        ← Kurslarga qaytish
      </a>

      <h1 className="mt-4 text-3xl font-semibold text-purple-800">{lesson.title}</h1>
      <div className="mt-2 text-slate-600">
        {lesson.level} • {lesson.duration}
      </div>

      <div className="mt-6 rounded-3xl border border-purple-100 bg-black overflow-hidden">
        <video
  className="w-full aspect-video"
  controls
  preload="metadata"
  crossOrigin="use-credentials"
  src={videoSrc}
/>
      </div>
    </div>
  );
}