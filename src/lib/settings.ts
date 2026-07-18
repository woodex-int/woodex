import { cache } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { settings } from "@/db/schema";

/* ── Types ─────────────────────────────────────────────── */

export type HomeSection = { id: string; label: string; enabled: boolean };

export type ThemeSettings = {
  colors: { primary: string; dark: string; light: string };
  fonts: {
    display: string;
    body: string;
    displayScale: number;
    bodyScale: number;
  };
  buttons: { radius: number };
  header: {
    ctaLabel: string;
    style: "transparent" | "solid" | "glass";
  };
  footer: {
    tagline: string;
    style: "signature" | "minimal";
  };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    subline: string;
  };
  homeSections: HomeSection[];
  visiblePages: Record<string, boolean>;
  integrations: {
    whatsappNumber: string;
    whatsappProvider: "wame" | "cloud";
    whatsappPhoneId: string;
    whatsappToken: string;
    notifyOnAppointment: boolean;
  };
};

/* ── Defaults ──────────────────────────────────────────── */

export const DEFAULT_SETTINGS: ThemeSettings = {
  colors: { primary: "#c9a84c", dark: "#0a0a0a", light: "#f8f5ef" },
  fonts: {
    display: "cormorant",
    body: "montserrat",
    displayScale: 100,
    bodyScale: 100,
  },
  buttons: { radius: 0 },
  header: { ctaLabel: "Book Consultation", style: "transparent" },
  footer: {
    tagline:
      "Interior design, workspace planning and custom furniture — under one roof.",
    style: "signature",
  },
  hero: {
    eyebrow: "Interior Design · Custom Furniture · Lahore",
    line1: "Interior design company",
    line2: "in Lahore for homes,",
    line3: "offices & retail spaces",
    subline:
      "Woodex Interior creates thoughtfully planned spaces that look distinctive, function efficiently and support the people who use them — with design and custom furniture under one coordinated service.",
  },
  homeSections: [
    { id: "hero", label: "Hero", enabled: true },
    { id: "marquee", label: "Gold Marquee", enabled: true },
    { id: "intro", label: "Brand Introduction", enabled: true },
    { id: "services", label: "Services Index", enabled: true },
    { id: "office", label: "Office Feature", enabled: true },
    { id: "furniture", label: "Furniture Feature", enabled: true },
    { id: "process", label: "Process", enabled: true },
    { id: "projects", label: "Selected Projects", enabled: true },
    { id: "why", label: "Why Woodex", enabled: true },
    { id: "insights", label: "Insights Preview", enabled: true },
    { id: "faq", label: "FAQ", enabled: true },
    { id: "cta", label: "CTA Band", enabled: true },
  ],
  visiblePages: {
    about: true,
    services: true,
    projects: true,
    insights: true,
    contact: true,
    "3d-designing": true,
  },
  integrations: {
    whatsappNumber: "92322400768",
    whatsappProvider: "wame",
    whatsappPhoneId: "",
    whatsappToken: "",
    notifyOnAppointment: true,
  },
};

/* ── Font stacks for the theme studio ──────────────────── */

export const FONT_STACKS: Record<string, Record<string, string>> = {
  display: {
    cormorant: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    playfair: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
    classic: "Georgia, 'Times New Roman', serif",
  },
  body: {
    montserrat: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
    helvetica: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    georgia: "Georgia, 'Times New Roman', serif",
  },
};

/* ── Hex shade helpers ─────────────────────────────────── */

const clamp = (n: number) => Math.max(0, Math.min(255, n));

export function shadeHex(hex: string, amt: number): string {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return hex;
  const n = parseInt(clean, 16);
  const r = clamp((n >> 16) + amt);
  const g = clamp(((n >> 8) & 0xff) + amt);
  const b = clamp((n & 0xff) + amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/** Build the live CSS variable override block from settings. */
export function buildThemeCss(s: ThemeSettings): string {
  const displayStack = FONT_STACKS.display[s.fonts.display] ?? FONT_STACKS.display.cormorant;
  const bodyStack = FONT_STACKS.body[s.fonts.body] ?? FONT_STACKS.body.montserrat;
  const displayScale = (s.fonts.displayScale ?? 100) / 100;
  const bodyScale = (s.fonts.bodyScale ?? 100) / 100;
  const d = (base: number) => (base * displayScale).toFixed(3);
  const b = (base: number) => (base * bodyScale).toFixed(3);
  return `:root{
  --color-brass:${s.colors.primary}!important;
  --color-brass-soft:${shadeHex(s.colors.primary, 32)}!important;
  --color-brass-deep:${shadeHex(s.colors.primary, -34)}!important;
  --color-gold-shimmer:${shadeHex(s.colors.primary, 44)}!important;
  --color-espresso:${s.colors.dark}!important;
  --color-coal:${shadeHex(s.colors.dark, 8)}!important;
  --color-ivory:${s.colors.light}!important;
  --color-cream:${shadeHex(s.colors.light, 3)}!important;
  --font-display:${displayStack}!important;
  --font-body:${bodyStack}!important;
  --text-display-2xl:clamp(${d(4)}rem, ${d(8)}vw, ${d(9)}rem)!important;
  --text-display-xl:clamp(${d(3)}rem, ${d(6)}vw, ${d(7)}rem)!important;
  --text-display-lg:clamp(${d(2.5)}rem, ${d(5)}vw, ${d(5.5)}rem)!important;
  --text-display-md:clamp(${d(2)}rem, ${d(4)}vw, ${d(4)}rem)!important;
  --text-display-sm:clamp(${d(1.75)}rem, ${d(3)}vw, ${d(3)}rem)!important;
  --text-xl:${b(1.25)}rem!important;
  --text-lg:${b(1.125)}rem!important;
  --text-md:${b(1)}rem!important;
  --text-sm:${b(0.875)}rem!important;
  --text-xs:${b(0.75)}rem!important;
  --text-2xs:${b(0.625)}rem!important;
}
.btn{border-radius:${s.buttons.radius}px!important;}`;
}

/* ── Persistence ───────────────────────────────────────── */

const ROW_ID = "global";

export const getSettings = cache(async (): Promise<ThemeSettings> => {
  try {
    const rows = await db
      .select()
      .from(settings)
      .where(eq(settings.id, ROW_ID))
      .limit(1);
    if (rows.length === 0) return DEFAULT_SETTINGS;
    return {
      ...DEFAULT_SETTINGS,
      ...(rows[0].data as Partial<ThemeSettings>),
    } as ThemeSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
});

export async function saveSettings(data: ThemeSettings): Promise<void> {
  const merged = { ...DEFAULT_SETTINGS, ...data };
  await db
    .insert(settings)
    .values({ id: ROW_ID, data: merged, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: settings.id,
      set: { data: merged, updatedAt: new Date() },
    });
}
