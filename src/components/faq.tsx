"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export function FaqAccordion({
  items,
  tone = "light",
}: {
  items: { q: string; a: string }[];
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === "dark";

  return (
    <div className={`divide-y ${dark ? "divide-cream/12" : "divide-ink/12"}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-8 py-6 text-left"
            >
              <div className="flex items-baseline gap-5">
                <span
                  className={`font-display text-sm italic ${
                    dark ? "text-brass-soft" : "text-brass"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-xl font-normal transition-colors duration-300 md:text-2xl ${
                    dark
                      ? "text-cream group-hover:text-brass-soft"
                      : "text-ink group-hover:text-brass-deep"
                  }`}
                >
                  {item.q}
                </span>
              </div>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
                  isOpen
                    ? "rotate-45 border-brass bg-brass text-espresso"
                    : dark
                      ? "border-cream/25 text-cream/70"
                      : "border-ink/25 text-ink/70"
                }`}
              >
                <Plus size={15} strokeWidth={1.5} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={`max-w-2xl pb-7 pl-10 text-[0.95rem] font-light leading-relaxed md:pl-12 ${
                      dark ? "text-cream/65" : "text-umber"
                    }`}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
