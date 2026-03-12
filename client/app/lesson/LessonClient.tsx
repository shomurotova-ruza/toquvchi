"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LessonClient({ videoSrc }: { videoSrc: string }) {
  const router = useRouter();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="mt-6 rounded-3xl border border-purple-100 bg-white p-6 text-slate-700">
        Tekshirilmoqda...
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl border border-purple-100 bg-black overflow-hidden">
      <video className="w-full aspect-video" controls preload="metadata" src={videoSrc} />
    </div>
  );
}