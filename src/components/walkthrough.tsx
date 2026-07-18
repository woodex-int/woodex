"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/** Click-to-play 3D walkthrough video card. */
export function WalkthroughVideo({
  video,
  poster,
  title,
  meta,
  duration,
  className,
}: {
  video: string;
  poster: string;
  title: string;
  meta: string;
  duration?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`group relative overflow-hidden bg-coal ${className ?? ""}`}>
      {playing ? (
        <video
          src={video}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="aspect-video h-full w-full object-cover"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="relative block h-full w-full cursor-pointer"
          aria-label={`Play walkthrough — ${title}`}
        >
          <div className="media-frame aspect-video h-full">
            <img
              src={poster}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/25 to-espresso/20 transition-colors duration-500 group-hover:via-espresso/10" />

          {/* Play button */}
          <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <span className="absolute h-24 w-24 rounded-full border border-brass/40 transition-all duration-500 group-hover:scale-125 group-hover:border-brass/20" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brass text-espresso shadow-[0_14px_44px_-8px_rgba(201,168,76,0.7)] transition-transform duration-500 group-hover:scale-110 group-hover:bg-brass-soft">
              <Play size={20} className="ml-1" fill="currentColor" />
            </span>
          </span>

          {duration && (
            <span className="absolute right-4 top-4 border border-cream/25 bg-espresso/60 px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-cream backdrop-blur-sm">
              {duration}
            </span>
          )}

          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-left">
            <span>
              <span className="block text-[0.58rem] font-medium tracking-[0.35em] uppercase text-brass-soft">
                {meta}
              </span>
              <span className="font-display mt-1.5 block text-xl text-cream md:text-2xl">
                {title}
              </span>
            </span>
            <span className="mb-1 hidden text-[0.55rem] font-medium tracking-[0.3em] uppercase text-cream/50 sm:block">
              Click to Play
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
