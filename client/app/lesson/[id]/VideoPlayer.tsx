"use client";

import React from "react";

export default function VideoPlayer({ src }: { src: string }) {
  const [err, setErr] = React.useState(false);

  if (err) {
    return (
      <div className="p-6 text-white">
        <div className="font-semibold">Video hozircha ochilmadi</div>
        <div className="mt-2 text-sm text-white/70">
          Sabablar:
          <br />• video hali yuklanmagan (404)
          <br />• login cookie yo‘q (401) — login fetch’ga credentials qo‘shiladi
        </div>
        <div className="mt-3 text-xs break-all text-white/60">{src}</div>
      </div>
    );
  }

  return (
    <video
      className="w-full aspect-video bg-black"
      controls
      preload="metadata"
      crossOrigin="use-credentials"
      src={src}
      onError={() => setErr(true)}
    />
  );
}