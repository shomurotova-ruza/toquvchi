"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import AppFrame from "../../ui/AppFrame";

type Lesson = {
  id: string;
  title: string;
  duration: string;
  level: string;
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
  }, [id, router]);

  const lesson = lessons.find((l) => l.id === id);
  const videoSrc = `http://localhost:4000/api/video/${lesson?.id}`;

  return (
    <AppFrame>
      {!checked ? (
        <div className="info-box">Login tekshirilmoqda...</div>
      ) : !lesson ? (
        <div className="info-box">Dars topilmadi.</div>
      ) : (
        <div className="lesson-detail">
          <h2 className="section-heading left">{lesson.title}</h2>
          <p className="lesson-subtitle">{lesson.level} • {lesson.duration}</p>
          <div className="video-player-wrap">
            <video className="video-player" controls preload="metadata" crossOrigin="use-credentials" src={videoSrc} />
          </div>
        </div>
      )}
    </AppFrame>
  );
}
