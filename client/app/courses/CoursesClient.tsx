"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AppFrame from "../ui/AppFrame";
import { lessonsByCategory } from "../ui/siteData";

const fallback = lessonsByCategory.beginner;

export default function CoursesClient() {
  const searchParams = useSearchParams();
  const cat = (searchParams.get("cat") || "beginner") as keyof typeof lessonsByCategory;
  const current = lessonsByCategory[cat] || fallback;

  return (
    <AppFrame>
      <div className="section-heading">{current.heading}</div>

      <div className="lesson-list">
        {current.lessons.map((lesson) => (
          <Link key={lesson.id} href={`/lesson/${lesson.id}`} className="lesson-card">
            <div className="video-placeholder">video</div>
            <div className="lesson-meta">
              <strong>{lesson.title}</strong>
              <span>{lesson.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </AppFrame>
  );
}
