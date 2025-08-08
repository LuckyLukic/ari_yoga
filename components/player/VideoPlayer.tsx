"use client";

import { useRef, useState } from "react";

export function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-black">
      <video
        ref={ref}
        controls
        poster={poster}
        className="h-full w-full"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {/* video demo CC0 */}
        <source src={src} type="video/mp4" />
        Il tuo browser non supporta il tag video.
      </video>

      {!isPlaying && poster && (
        <span className="pointer-events-none absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
          Demo player
        </span>
      )}
    </div>
  );
}
