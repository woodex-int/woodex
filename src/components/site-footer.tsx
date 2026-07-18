import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { BUSINESS, SERVICES, NAV_LINKS } from "@/lib/data";

export function SiteFooter({
  tagline = BUSINESS.tagline,
  stylePreset = "signature",
}: {
  tagline?: string;
  stylePreset?: "signature" | "minimal";
}) {
  /* ── Minimal preset — compact single-line footer ── */
  if (stylePreset === "minimal") {
    return (
      <footer className="bg-gradient-section-dark relative overflow-hidden border-t border-brass/25 text-cream">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-6 px-5 py-10 text-center md:flex-row md:px-10 md:text-left">
          <div>
            <p className="font-display text-xl tracking-[0.28em]">WOODEX</p>
            <p className="mt-1 max-w-xs text-[0.72rem] font-light text-cream/50">{tagline}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.62rem] font-medium tracking-[0.24em] uppercase text-cream/45">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-brass-soft">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="text-[0.62rem] tracking-[0.2em] uppercase text-cream/40">
            {BUSINESS.phone} · © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    );
  }

  /* ── Signature preset ── */
  return (
    <footer className="bg-gradient-section-dark relative overflow-hidden text-cream">
      <div className="h-px bg-gradient-gold opacity-60" />
      <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-3xl font-medium tracking-[0.28em]">WOODEX</p>
            <p className="mt-1.5 text-[0.6rem] font-medium tracking-[0.5em] uppercase text-brass-soft">
              Interior · Lahore
            </p>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-cream/60">
              {tagline}
            </p>
            <p className="mt-4 text-sm font-light leading-relaxed text-cream/60">
              <span className="text-brass-soft">Woodex Furniture</span> — the custom
              furniture division of Woodex Interior.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center border border-cream/20 text-cream/70 transition-all duration-300 hover:border-brass hover:text-brass-soft"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
              </a>
              <a
                href={BUSINESS.phoneHref}
                aria-label="Call Woodex"
                className="flex h-10 w-10 items-center justify-center border border-cream/20 text-cream/70 transition-all duration-300 hover:border-brass hover:text-brass-soft"
              >
                <Phone size={16} strokeWidth={1.5} />
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                aria-label="Email Woodex"
                className="flex h-10 w-10 items-center justify-center border border-cream/20 text-cream/70 transition-all duration-300 hover:border-brass hover:text-brass-soft"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="mb-6 text-[0.62rem] font-medium tracking-[0.42em] uppercase text-brass-soft">
              Explore
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-light text-cream/65 transition-colors hover:text-brass-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/3d-designing"
                  className="text-sm font-light text-brass-soft transition-colors hover:text-cream"
                >
                  3D Studio — Walk Throughs
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm font-light text-cream/65 transition-colors hover:text-brass-soft"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm font-light text-cream/65 transition-colors hover:text-brass-soft"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="mb-6 text-[0.62rem] font-medium tracking-[0.42em] uppercase text-brass-soft">
              Services
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm font-light text-cream/65 transition-colors hover:text-brass-soft"
                  >
                    {s.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-6 text-[0.62rem] font-medium tracking-[0.42em] uppercase text-brass-soft">
              Contact
            </p>
            <ul className="space-y-5 text-sm font-light text-cream/65">
              <li className="flex gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brass-soft" />
                <span>{BUSINESS.addressLines.join(", ")}</span>
              </li>
              <li>
                <a href={BUSINESS.phoneHref} className="flex gap-3 transition-colors hover:text-brass-soft">
                  <Phone size={15} className="mt-0.5 shrink-0 text-brass-soft" />
                  <span>
                    {BUSINESS.phone} <span className="text-cream/40">· Mobile / WhatsApp</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={BUSINESS.landlineHref} className="flex gap-3 transition-colors hover:text-brass-soft">
                  <Phone size={15} className="mt-0.5 shrink-0 text-brass-soft" />
                  <span>
                    {BUSINESS.landline} <span className="text-cream/40">· Landline</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex gap-3 transition-colors hover:text-brass-soft">
                  <Mail size={15} className="mt-0.5 shrink-0 text-brass-soft" />
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.3em] uppercase text-brass-soft transition-colors hover:text-cream"
            >
              Request a Consultation
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Giant watermark */}
        <div className="pointer-events-none mt-20 select-none overflow-hidden border-t border-cream/10 pt-10">
          <p className="outline-word gold-shimmer-text whitespace-nowrap text-center font-display text-[clamp(4rem,14vw,13rem)] font-semibold leading-none tracking-[0.12em] opacity-70">
            WOODEX
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-[0.62rem] tracking-[0.24em] uppercase text-cream/40 md:flex-row">
          <p>© {new Date().getFullYear()} Woodex Interior · Lahore, Pakistan</p>
          <p>Interior Design · Custom Furniture · Space Planning</p>
          <Link href="/admin" className="transition-colors hover:text-brass-soft">
            Studio Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
