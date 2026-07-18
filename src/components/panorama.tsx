"use client";

import { useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

/**
 * Interactive infinite-drag panorama viewer.
 * Loops seamlessly: the image is rendered twice and offset wraps modulo width.
 * Drifts slowly when idle, responds to pointer / touch drag with momentum.
 */
export function PanoramaViewer({
  src,
  title,
  meta,
  className,
}: {
  src: string;
  title?: string;
  meta?: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const s = useRef({ x: 0, w: 0, dragging: false, lastX: 0, vel: 0, raf: 0 });
  const [active, setActive] = useState(false);
  const [touched, setTouched] = useState(false);

  const measure = () => {
    s.current.w = imgRef.current?.clientWidth ?? 0;
  };

  useEffect(() => {
    const st = s.current;
    measure();
    const ro = new ResizeObserver(measure);
    if (imgRef.current) ro.observe(imgRef.current);
    window.addEventListener("resize", measure);

    const tick = () => {
      if (!st.dragging) {
        st.x -= 0.3;
        st.x += st.vel;
        st.vel *= 0.95;
      }
      const w = st.w;
      if (w > 0) {
        if (st.x <= -w) st.x += w;
        if (st.x > 0) st.x -= w;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${st.x}px,0,0)`;
        }
      }
      st.raf = requestAnimationFrame(tick);
    };
    st.raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(st.raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const down = (e: React.PointerEvent) => {
    const st = s.current;
    st.dragging = true;
    st.lastX = e.clientX;
    st.vel = 0;
    setActive(true);
    setTouched(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.lastX;
    st.lastX = e.clientX;
    st.x += dx;
    st.vel = dx * 0.12;
  };
  const up = () => {
    s.current.dragging = false;
    setActive(false);
  };

  return (
    <div
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className={`group relative select-none overflow-hidden bg-coal ${
        active ? "cursor-grabbing" : "cursor-grab"
      } ${className ?? ""}`}
      style={{ touchAction: "pan-y" }}
      role="img"
      aria-label={title ? `Panoramic view — ${title}` : "Interactive 360 panorama"}
    >
      <div ref={trackRef} className="flex h-full w-max will-change-transform">
        {[0, 1].map((i) => (
          <img
            key={i}
            ref={i === 0 ? imgRef : undefined}
            src={src}
            alt=""
            draggable={false}
            onLoad={measure}
            className="h-full w-auto max-w-none object-cover"
          />
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-espresso/60 to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-espresso/60 to-transparent md:w-28" />

      {/* Drag hint */}
      <div
        className={`pointer-events-none absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-2.5 border border-cream/25 bg-espresso/70 px-5 py-2.5 backdrop-blur-sm transition-opacity duration-500 ${
          touched ? "opacity-0" : "opacity-100"
        }`}
      >
        <MoveHorizontal size={14} className="text-brass-soft" />
        <span className="text-[0.58rem] font-medium tracking-[0.3em] uppercase text-cream">
          Drag to look around
        </span>
      </div>

      {/* Caption */}
      {(title || meta) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-espresso/85 to-transparent p-6 md:p-8">
          <div>
            {meta && (
              <p className="text-[0.58rem] font-medium tracking-[0.35em] uppercase text-brass-soft">
                {meta}
              </p>
            )}
            {title && (
              <p className="font-display mt-1.5 text-xl text-cream md:text-2xl">{title}</p>
            )}
          </div>
          <span className="mb-1 hidden items-center gap-2 text-[0.55rem] font-medium tracking-[0.3em] uppercase text-cream/50 sm:flex">
            360° Panorama
          </span>
        </div>
      )}
    </div>
  );
}
