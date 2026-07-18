"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Image that gently reveals with a clip + scale, editorial style. */
export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`media-frame ${className ?? ""}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(8% 6% 8% 6%)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${imgClassName ?? ""}`}
        initial={reduce ? undefined : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.6, delay, ease: EASE }}
      />
    </motion.div>
  );
}

/** Scroll-linked parallax wrapper — children drift vertically while scrolling. */
export function Parallax({
  children,
  className,
  speed = 0.16,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}%`, `-${speed * 100}%`]
  );
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-0 scale-[1.28]"
      >
        {children}
      </motion.div>
    </div>
  );
}
