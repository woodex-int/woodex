"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X, ChevronDown } from "lucide-react";
import { BUSINESS, NAV_LINKS, SERVICE_GROUPS, serviceBySlug } from "@/lib/data";

function Wordmark({ tone }: { tone: "light" | "dark" }) {
  return (
    <Link href="/" className="group flex flex-col leading-none">
      <span
        className={`font-display text-[1.55rem] font-medium tracking-[0.32em] transition-colors duration-500 ${
          tone === "light" ? "text-cream" : "text-ink"
        }`}
      >
        WOODEX
      </span>
      <span
        className={`mt-1 text-[0.55rem] font-medium tracking-[0.5em] uppercase ${
          tone === "light" ? "text-brass-soft" : "text-brass"
        }`}
      >
        Interior · Lahore
      </span>
    </Link>
  );
}

export function SiteHeader({
  ctaLabel = "Book Consultation",
  headerStyle = "transparent",
  visiblePages,
}: {
  ctaLabel?: string;
  headerStyle?: "transparent" | "solid" | "glass";
  visiblePages?: Record<string, boolean>;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  const links = NAV_LINKS.filter((l) => {
    if (l.href === "/" || !visiblePages) return true;
    return visiblePages[l.href.replace(/^\//, "")] !== false;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const baseSolid = headerStyle !== "transparent";
  const solid = baseSolid || scrolled || megaOpen;
  const tone: "light" | "dark" = solid ? "dark" : "light";
  const headerBg =
    headerStyle === "solid"
      ? "border-b border-ink/10 bg-ivory"
      : solid
        ? "border-b border-ink/10 bg-ivory/90 backdrop-blur-xl"
        : "border-b border-transparent bg-transparent";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${headerBg}`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="mx-auto flex h-[5.25rem] max-w-[1500px] items-center justify-between px-5 md:px-10">
          <Wordmark tone={tone} />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((link) =>
              link.mega ? (
                <button
                  key={link.href}
                  onMouseEnter={() => setMegaOpen(true)}
                  onClick={() => setMegaOpen((v) => !v)}
                  className={`flex items-center gap-1.5 text-[0.68rem] font-medium tracking-[0.3em] uppercase transition-colors duration-500 ${
                    tone === "light"
                      ? "text-cream/85 hover:text-cream"
                      : "text-ink/80 hover:text-ink"
                  } ${pathname.startsWith("/services") ? "!text-brass" : ""}`}
                >
                  {link.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setMegaOpen(false)}
                  className={`text-[0.68rem] font-medium tracking-[0.3em] uppercase transition-colors duration-500 ${
                    tone === "light"
                      ? "text-cream/85 hover:text-cream"
                      : "text-ink/80 hover:text-ink"
                  } ${
                    (link.href === "/" && pathname === "/") ||
                    (link.href !== "/" && pathname.startsWith(link.href))
                      ? "!text-brass"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-7 lg:flex">
            <a
              href={BUSINESS.phoneHref}
              className={`flex items-center gap-2.5 text-[0.72rem] tracking-[0.14em] transition-colors duration-500 ${
                tone === "light" ? "text-cream/90" : "text-ink/85"
              }`}
            >
              <Phone size={13} className="text-brass" />
              {BUSINESS.phone}
            </a>
            <Link
              href="/contact"
              className={`btn ${tone === "light" ? "btn-outline-light" : "btn-brass"} !px-6 !py-3`}
            >
              {ctaLabel}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={`lg:hidden ${tone === "light" ? "text-cream" : "text-ink"}`}
          >
            <Menu size={26} strokeWidth={1.25} />
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden border-t border-ink/10 bg-ivory/95 backdrop-blur-xl lg:block"
              onMouseEnter={() => setMegaOpen(true)}
            >
              <div className="mx-auto grid max-w-[1500px] grid-cols-4 gap-10 px-10 py-12">
                {SERVICE_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="mb-5 text-[0.62rem] font-medium tracking-[0.4em] uppercase text-brass">
                      {group.label}
                    </p>
                    <ul className="space-y-3.5">
                      {group.slugs.map((slug) => {
                        const s = serviceBySlug(slug)!;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              className="group/link flex items-center justify-between text-[0.95rem] font-light text-ink/75 transition-colors hover:text-brass"
                            >
                              {s.nav}
                              <ArrowUpRight
                                size={13}
                                className="opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
                <Link
                  href="/3d-designing"
                  className="group relative block overflow-hidden bg-coal"
                >
                  <img
                    src="/img/service-planning.jpg"
                    alt="Woodex 3D Studio — walk through your space before it's built"
                    className="h-full min-h-[280px] w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-espresso/85 to-transparent" />
                  <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <span>
                      <span className="block text-[0.55rem] font-medium tracking-[0.3em] uppercase text-brass-soft">
                        Interactive
                      </span>
                      <span className="font-display mt-1 block text-xl text-cream">The 3D Studio</span>
                    </span>
                    <ArrowUpRight size={18} className="text-brass-soft" />
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex flex-col bg-espresso text-cream lg:hidden"
          >
            <div className="flex h-[5.25rem] items-center justify-between px-5">
              <Wordmark tone="light" />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={26} strokeWidth={1.25} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-8 pb-8 pt-6">
              <ul className="space-y-1">
                {links.map((link, i) =>
                  link.mega ? (
                    <li key={link.href}>
                      <button
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="flex w-full items-center justify-between py-3 font-display text-3xl font-light"
                      >
                        Services
                        <ChevronDown
                          size={20}
                          className={`text-brass transition-transform duration-300 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-6 pb-6 pl-1 pt-2">
                              {SERVICE_GROUPS.map((group) => (
                                <div key={group.label}>
                                  <p className="mb-3 text-[0.6rem] tracking-[0.4em] uppercase text-brass-soft">
                                    {group.label}
                                  </p>
                                  <ul className="space-y-2.5">
                                    {group.slugs.map((slug) => (
                                      <li key={slug}>
                                        <Link
                                          href={`/services/${slug}`}
                                          className="text-[0.95rem] font-light text-cream/75"
                                        >
                                          {serviceBySlug(slug)!.nav}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.5 }}
                    >
                      <Link
                        href={link.href}
                        className="block py-3 font-display text-3xl font-light"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </nav>
            <div className="border-t border-cream/10 px-8 py-6">
              <a href={BUSINESS.phoneHref} className="flex items-center gap-3 text-sm text-cream/80">
                <Phone size={14} className="text-brass-soft" /> {BUSINESS.phone}
              </a>
              <p className="mt-3 text-xs font-light text-cream/50">
                {BUSINESS.addressLines.join(", ")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
