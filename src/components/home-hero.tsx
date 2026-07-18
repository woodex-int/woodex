"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { BUSINESS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export type HeroContent = {
  eyebrow: string;
  line1: string;
  line2: string;
  line3: string;
  subline: string;
};

export function HomeHero({ content }: { content?: HeroContent }) {
  const c: HeroContent = content ?? {
    eyebrow: "Interior Design · Custom Furniture · Lahore",
    line1: "Interior design company",
    line2: "in Lahore for homes,",
    line3: "offices & retail spaces",
    subline:
      "Woodex Interior creates thoughtfully planned spaces that look distinctive, function efficiently and support the people who use them — with design and custom furniture under one coordinated service.",
  };

  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 900], [0, 200]);
  const imgScale = useTransform(scrollY, [0, 900], [1.06, 1.2]);
  const contentY = useTransform(scrollY, [0, 600], [0, -90]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-espresso text-cream">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <motion.img
          src="/img/hero.jpg"
          alt="Luxury living room interior designed by Woodex Interior, Lahore"
          className="h-full w-full object-cover"
          initial={{ scale: 1.15, opacity: 0.6 }}
          animate={{ scale: 1.06, opacity: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/75 via-espresso/30 to-espresso/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/60 via-transparent to-transparent" />

      {/* Side label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="side-label absolute bottom-32 left-6 hidden text-cream/50 xl:block"
      >
        Interior · Architecture of Living · Est. Lahore
      </motion.p>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex h-full flex-col justify-end"
      >
        <div className="mx-auto w-full max-w-[1500px] px-5 pb-24 sm:pb-28 md:px-10">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
            className="mb-6 flex items-center gap-2.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-brass/70" />
              <span className="h-2 w-2 rounded-full bg-brass" />
            </span>
            <span className="text-[0.58rem] font-medium tracking-[0.35em] uppercase text-cream/70">
              Now accepting new projects · {BUSINESS.city}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: EASE }}
            className="eyebrow"
          >
            {c.eyebrow}
          </motion.p>

          <h1 className="headline mt-6 text-[clamp(2.35rem,8.4vw,6.4rem)] sm:mt-7">
            <motion.span
              className="block text-cream"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 1.1, ease: EASE }}
            >
              {c.line1}
            </motion.span>
            <motion.span
              className="block text-cream"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.1, ease: EASE }}
            >
              {c.line2.includes("for homes") ? (
                <>
                  in Lahore <span className="italic gold-shimmer-text">for homes,</span>
                </>
              ) : (
                <span className="italic gold-shimmer-text">{c.line2}</span>
              )}
            </motion.span>
            <motion.span
              className="block italic gold-shimmer-text"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 1.1, ease: EASE }}
            >
              {c.line3}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 1, ease: EASE }}
            className="mt-6 max-w-xl text-[0.94rem] font-light leading-relaxed text-cream/75 sm:mt-8 md:text-lg"
          >
            {c.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: EASE }}
            className="mt-8 flex flex-col gap-3.5 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <Link href="/contact" className="btn btn-brass w-full justify-center sm:w-auto">
              Discuss Your Project <ArrowUpRight size={13} />
            </Link>
            <Link href="/projects" className="btn btn-outline-light w-full justify-center sm:w-auto">
              View Our Projects
            </Link>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="relative border-t border-cream/15"
        >
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 sm:py-5 md:px-10">
            <div className="flex items-center gap-3.5">
              <span className="relative hidden h-10 w-px overflow-hidden bg-cream/20 sm:flex">
                <span className="animate-scroll-cue absolute inset-0 bg-brass-soft" />
              </span>
              <span className="flex items-center gap-2 text-[0.58rem] font-medium tracking-[0.4em] uppercase text-cream/60">
                <ArrowDown size={10} /> Scroll
              </span>
            </div>
            <p className="hidden items-center gap-2 text-[0.58rem] font-medium tracking-[0.35em] uppercase text-cream/60 md:flex">
              <Sparkles size={11} className="text-brass-soft" />
              Residential · Office · Retail · Commercial
            </p>
            <p className="flex items-center gap-2 text-[0.58rem] font-medium tracking-[0.3em] sm:tracking-[0.35em] uppercase text-brass-soft">
              <MapPin size={11} /> {BUSINESS.addressShort}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
