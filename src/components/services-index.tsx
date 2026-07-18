"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CORE_SERVICE_SLUGS, serviceBySlug } from "@/lib/data";

export function ServicesIndex() {
  const services = CORE_SERVICE_SLUGS.map((s) => serviceBySlug(s)!);
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
      {/* Rows */}
      <div>
        {services.map((s, i) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            onMouseEnter={() => setActive(i)}
            className={`group block border-t border-ink/15 py-7 transition-opacity duration-500 md:py-9 ${
              active === i ? "opacity-100" : "lg:opacity-45"
            }`}
          >
            {/* Mobile image */}
            <div className="media-frame media-zoom mb-5 aspect-[16/10] lg:hidden">
              <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-start gap-6 md:gap-10">
              <span className="font-display pt-1 text-sm italic text-brass">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-normal text-ink transition-colors duration-300 group-hover:text-brass-deep md:text-[2rem]">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-umber">
                  {s.excerpt}
                </p>
                <span className="link-arrow mt-4">
                  Explore
                  <ArrowUpRight size={13} />
                </span>
              </div>
              <span className="mt-2 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:text-espresso md:flex">
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </span>
            </div>
          </Link>
        ))}
        <div className="border-t border-ink/15" />
      </div>

      {/* Sticky preview */}
      <div className="relative hidden lg:block">
        <div className="sticky top-32">
          <div className="media-frame aspect-[4/5]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={services[active].slug}
                src={services[active].image}
                alt={services[active].title}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[0.62rem] font-medium tracking-[0.35em] uppercase text-brass">
              {services[active].title}
            </p>
            <p className="font-display text-sm italic text-umber">
              {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
