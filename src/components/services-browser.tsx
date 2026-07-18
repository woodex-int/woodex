"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import type { Service } from "@/lib/data";

const GROUPS = ["All", "Interiors", "Planning & Execution", "Furniture & Woodwork"] as const;

export function ServicesBrowser({ services }: { services: Service[] }) {
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return services.filter(
      (s) =>
        (group === "All" || s.group === group) &&
        (!term ||
          `${s.title} ${s.nav} ${s.excerpt} ${s.list.join(" ")}`
            .toLowerCase()
            .includes(term))
    );
  }, [services, group, q]);

  return (
    <div>
      {/* Controls */}
      <div className="mb-12 flex flex-col gap-5 border-b border-ink/12 pb-8 md:mb-16 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2.5">
          {GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={`border px-5 py-2.5 text-[0.62rem] font-medium tracking-[0.26em] uppercase transition-all duration-400 ${
                group === g
                  ? "border-brass bg-brass text-espresso"
                  : "border-ink/20 text-ink/60 hover:border-brass/50 hover:text-brass-deep"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-brass" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services — 'café', 'wardrobe'…"
            className="w-full border-b border-ink/25 bg-transparent py-2.5 pl-7 text-[0.85rem] font-light text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-brass"
          />
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm font-light text-umber">
          No services match — try a different term or category.
        </p>
      ) : (
        <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 [column-fill:balance]">
          <AnimatePresence initial={false}>
            {filtered.map((s, i) => (
              <motion.div
                key={s.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.04 * (i % 3), ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 break-inside-avoid"
              >
                <Link href={`/services/${s.slug}`} className="group block">
                  <div className={`media-frame media-zoom vignette ${i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                    <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                    <span className="absolute left-5 top-5 font-display text-sm italic text-cream/85">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute right-4 top-4 border border-cream/25 bg-espresso/55 px-2.5 py-1 text-[0.52rem] font-medium tracking-[0.28em] uppercase text-cream backdrop-blur-sm">
                      {s.group}
                    </span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-5">
                    <div>
                      <h3 className="font-display text-[1.55rem] leading-tight text-ink transition-colors duration-300 group-hover:text-brass-deep">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[0.85rem] font-light leading-relaxed text-umber">
                        {s.excerpt}
                      </p>
                      <p className="mt-2.5 text-[0.62rem] font-medium tracking-[0.2em] uppercase text-fog">
                        {s.list.slice(0, 3).join(" · ")}
                      </p>
                    </div>
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:text-espresso">
                      <ArrowUpRight size={15} strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
