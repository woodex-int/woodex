"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  LayoutDashboard, FileText, PanelTop, Palette, Blocks, FolderOpen,
  Sparkles, MessageCircle, Inbox, CalendarCheck, Database, Users,
  Eye, EyeOff, ArrowUp, ArrowDown, Save, Download, Upload, RefreshCw,
  Check, X, LogOut, ExternalLink, Loader2, Send, Plus, Pencil, Trash2,
  Copy, GripVertical, ChevronRight, Search, Clock,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

type HomeSection = { id: string; label: string; enabled: boolean };
type Settings = {
  colors: { primary: string; dark: string; light: string };
  fonts: { display: string; body: string; displayScale: number; bodyScale: number };
  buttons: { radius: number };
  header: { ctaLabel: string; style: "transparent" | "solid" | "glass" };
  footer: { tagline: string; style: "signature" | "minimal" };
  hero: { eyebrow: string; line1: string; line2: string; line3: string; subline: string };
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
type Inquiry = {
  id: string; name: string; phone: string; email: string | null;
  projectType: string | null; location: string | null; area: string | null;
  services: string | null; budget: string | null; message: string | null; createdAt: string;
};
type Appointment = {
  id: string; name: string; whatsapp: string; companyName: string | null;
  location: string | null; service: string | null; preferredDate: string | null;
  preferredTime: string | null; notes: string | null; source: string; status: string; createdAt: string;
};
type ServiceItem = { slug: string; nav: string; title: string; group: string; excerpt: string; image: string };
type ArticleItem = { slug: string; title: string; category: string; date: string; readTime: string; excerpt: string; image: string };
type ProjectItem = { slug: string; title: string; type: string; location: string; area: string; year: string; image: string; summary: string };
type Bundle = { settings: Settings; content: { services: ServiceItem[]; projects: ProjectItem[]; articles: ArticleItem[] } };

/* ═══════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════ */

const TABS = [
  { id: "dashboard", label: "Dashboard", sub: "Overview & analytics", icon: LayoutDashboard },
  { id: "pages", label: "Pages", sub: "Manage pages & section blocks", icon: FileText },
  { id: "header-footer", label: "Header & Footer", sub: "Nav links, dropdown, footer", icon: PanelTop },
  { id: "theme", label: "Theme Manager", sub: "Master theme controls", icon: Palette },
  { id: "builder", label: "Live Builder", sub: "Drag-and-drop editor", icon: Blocks },
  { id: "projects", label: "Projects", sub: "Portfolio & case studies", icon: FolderOpen },
  { id: "services", label: "Services", sub: "Service offerings", icon: Sparkles },
  { id: "blog", label: "Blog Posts", sub: "Articles & content", icon: FileText },
  { id: "whatsapp", label: "Live Support", sub: "WhatsApp, agents, templates", icon: MessageCircle },
  { id: "leads", label: "Contact Leads", sub: "Form submissions", icon: Inbox },
  { id: "appointments", label: "Appointments", sub: "Bookings & scheduling", icon: CalendarCheck },
  { id: "data", label: "Import / Export", sub: "Backup & restore", icon: Database },
] as const;
type TabId = (typeof TABS)[number]["id"];

const NAV_PAGES = ["about", "services", "projects", "insights", "contact", "3d-designing"] as const;

const DISPLAY_FONTS = [
  { id: "cormorant", label: "Cormorant Garamond" },
  { id: "playfair", label: "Playfair Display" },
  { id: "classic", label: "Classic Georgia" },
];
const BODY_FONTS = [
  { id: "montserrat", label: "Montserrat" },
  { id: "helvetica", label: "Helvetica Neue" },
  { id: "georgia", label: "Georgia Serif" },
];

/* ═══════════════════════════════════════════════════════
   STYLE TOKENS (warm cream/gold dashboard theme)
   ═══════════════════════════════════════════════════════ */

const S = {
  sidebar: "fixed inset-y-0 left-0 z-40 hidden w-[220px] flex-col border-r border-[#e8e0d0] bg-[#1a1410] lg:flex",
  sideItem: "flex items-center gap-3 px-5 py-3 text-[0.78rem] font-normal transition-all duration-200 cursor-pointer",
  sideActive: "bg-[#c9a84c] text-[#1a1410] font-medium",
  sideInactive: "text-[#d4c5a9] hover:bg-[#2a2118] hover:text-[#f5e6c8]",
  main: "min-h-screen bg-[#faf7f2] lg:ml-[220px]",
  card: "rounded-lg border border-[#e8e0d0] bg-white p-6 shadow-sm",
  cardFlat: "border border-[#e8e0d0] bg-white",
  badge: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider",
  badgeNew: "bg-[#e8f5e9] text-[#2e7d32]",
  badgeRead: "bg-[#f5f5f5] text-[#616161]",
  badgeReplied: "bg-[#e3f2fd] text-[#1565c0]",
  btn: "inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[0.75rem] font-medium tracking-wide transition-all duration-200",
  btnPrimary: "bg-[#c9a84c] text-[#1a1410] hover:bg-[#b8962f] shadow-sm",
  btnOutline: "border border-[#d4c5a9] text-[#5c5347] hover:bg-[#f5f0e8]",
  btnGhost: "text-[#c9a84c] hover:bg-[#faf5eb]",
  input: "w-full rounded-md border border-[#e0d8c8] bg-white px-3.5 py-2.5 text-[0.85rem] text-[#1a1410] placeholder:text-[#b5a992] outline-none transition-colors focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30",
  label: "mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-widest text-[#8a7e6e]",
  heading: "font-serif text-[1.7rem] font-normal text-[#1a1410]",
  subheading: "text-[0.82rem] text-[#8a7e6e]",
  avatar: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-semibold",
  topbar: "flex items-center justify-between border-b border-[#e8e0d0] bg-white px-6 py-4 lg:px-8",
  sectionTitle: "text-[0.68rem] font-semibold uppercase tracking-widest text-[#8a7e6e]",
};

const AVATAR_COLORS = ["bg-[#c9a84c]/20 text-[#a8842a]", "bg-[#e3f2fd] text-[#1565c0]", "bg-[#fce4ec] text-[#c62828]", "bg-[#e8f5e9] text-[#2e7d32]", "bg-[#fff3e0] text-[#e65100]"];
const initials = (name: string) => name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
const ago = (iso: string) => {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 3600000) return `${Math.floor(d / 60000)} min ago`;
  if (d < 86400000) return `${Math.floor(d / 3600000)} hours ago`;
  return `${Math.floor(d / 86400000)} days ago`;
};
const fmtDate = () => new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
const fmtTime = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [tab, setTab] = useState<TabId>("dashboard");
  const [settings, setSettings] = useState<Settings | null>(null);
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [waTest, setWaTest] = useState("");
  const [importMsg, setImportMsg] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [selectedPage, setSelectedPage] = useState("home");
  const fileRef = useRef<HTMLInputElement>(null);

  const authHeaders = { "x-admin-key": key, "Content-Type": "application/json" };

  async function loadAll(kOverride?: string) {
    const k = kOverride ?? (() => { try { return localStorage.getItem("woodex_admin_key") ?? ""; } catch { return ""; } })();
    const h: HeadersInit = k ? { "x-admin-key": k } : {};
    const [s, t, i, a] = await Promise.all([
      fetch("/api/admin/settings", { headers: h }).then((r) => r.json()),
      fetch("/api/admin/transfer", { headers: h }).then((r) => r.json()),
      fetch("/api/admin/inquiries", { headers: h }).then((r) => r.json()),
      fetch("/api/appointments", { headers: h }).then((r) => r.json()),
    ]);
    if (s.ok) setSettings(s.data);
    if (t) setBundle(t as Bundle);
    if (i.ok) setInquiries(i.data);
    if (a.ok) setAppointments(a.data);
  }

  useEffect(() => {
    let stored = "";
    try { stored = localStorage.getItem("woodex_admin_key") ?? ""; } catch { /* noop */ }

    console.log("[admin] token from localStorage:", stored ? `${stored.slice(0, 8)}…` : "(empty)");

    // No token → send to login
    if (!stored) {
      console.log("[admin] no token found, redirecting to /login");
      window.location.replace("/login");
      return;
    }

    setKey(stored);

    // Verify the token is still valid
    console.log("[admin] verifying token with API…");
    fetch("/api/admin/inquiries", {
      headers: { "x-admin-key": stored },
    })
      .then((r) => {
        console.log("[admin] API response status:", r.status);
        if (r.status === 401) {
          console.log("[admin] token rejected (401), clearing and redirecting");
          try { localStorage.removeItem("woodex_admin_key"); } catch { /* noop */ }
          window.location.replace("/login");
          return;
        }
        if (!r.ok) {
          console.log("[admin] API error:", r.status);
          setLoadError("Backend unreachable.");
          return;
        }
        console.log("[admin] token valid! Loading dashboard…");
        setAuthed(true);
        void loadAll(stored);
      })
      .catch((err) => {
        console.error("[admin] fetch failed:", err);
        setLoadError("Connection error.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true); setSaved(false);
    const res = await fetch("/api/admin/settings", { method: "PUT", headers: authHeaders, body: JSON.stringify(settings) });
    setSaving(false);
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
  }

  async function doExport() { window.open(`/api/admin/transfer?key=${encodeURIComponent(key)}`, "_blank"); }
  async function doImport(file: File) {
    setImportMsg("");
    try {
      const parsed = JSON.parse(await file.text());
      const res = await fetch("/api/admin/transfer", { method: "POST", headers: authHeaders, body: JSON.stringify(parsed) });
      if (res.ok) { setImportMsg("Import successful."); void loadAll(); } else { const j = await res.json(); setImportMsg(j.error || "Import failed."); }
    } catch { setImportMsg("Invalid JSON file."); }
  }

  async function testWhatsApp() {
    setWaTest("Testing…");
    const res = await fetch("/api/admin/whatsapp", { method: "POST", headers: authHeaders, body: JSON.stringify({ to: settings?.integrations.whatsappNumber ?? "" }) });
    const j = await res.json();
    setWaTest(j.provider === "cloud" && j.sent ? "Sent via Meta Cloud API ✔" : j.provider === "cloud" ? `Cloud API error (${j.error})` : `wa.me mode active — link ready`);
  }

  const moveSection = (i: number, dir: -1 | 1) => {
    if (!settings) return;
    const arr = [...settings.homeSections];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setSettings({ ...settings, homeSections: arr });
  };

  /* ── Auth gate ── */
  if (!authed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf7f2] px-5">
        {loadError ? (
          <div className="text-center">
            <p className="font-serif text-xl text-[#1a1410]">{loadError}</p>
            <button onClick={() => location.reload()} className={`${S.btn} ${S.btnPrimary} mt-4`}>Retry</button>
          </div>
        ) : (
          <div className="text-center">
            <Loader2 size={28} className="mx-auto animate-spin text-[#c9a84c]" />
            <p className="mt-5 font-serif text-xl text-[#1a1410]">Loading dashboard…</p>
            <p className="mt-2 text-xs text-[#b5a992]">Verifying your session</p>
            <p className="mt-6 text-[0.68rem] text-[#b5a992]">
              If this takes more than 5 seconds, open browser DevTools → Console
              <br />to see [admin] debug logs
            </p>
          </div>
        )}
      </div>
    );
  }

  const svc = bundle?.content.services ?? [];
  const prj = bundle?.content.projects ?? [];
  const art = bundle?.content.articles ?? [];
  const pages = [
    { slug: "home", label: "Home", badge: "HOME PAGE" },
    { slug: "about", label: "About" },
    { slug: "services", label: "Services" },
    { slug: "3d-designing", label: "3D Studio" },
    { slug: "projects", label: "Projects" },
    { slug: "insights", label: "Journal" },
    { slug: "contact", label: "Contact" },
    ...svc.map((s) => ({ slug: `service/${s.slug}`, label: s.title })),
  ];

  /* ── Sidebar nav item ── */
  const NavItem = ({ t }: { t: typeof TABS[number] }) => (
    <button
      onClick={() => { setTab(t.id); setMobileNav(false); }}
      className={`${S.sideItem} ${tab === t.id ? S.sideActive : S.sideInactive}`}
    >
      <t.icon size={16} />
      <span className="flex flex-col items-start">
        <span className="leading-tight">{t.label}</span>
        <span className={`text-[0.58rem] leading-tight ${tab === t.id ? "text-[#1a1410]/60" : "text-[#7a7063]"}`}>{t.sub}</span>
      </span>
    </button>
  );

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <div className="flex min-h-screen bg-[#faf7f2]">
      {/* ── SIDEBAR ── */}
      <aside className={S.sidebar}>
        <div className="flex items-center gap-3 border-b border-[#2a2118] px-5 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a84c] font-serif text-base font-bold text-[#1a1410]">W</span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold tracking-widest text-white">Woodex Interior</span>
            <span className="text-[0.6rem] font-medium uppercase tracking-widest text-[#c9a84c]">ADMIN</span>
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {TABS.map((t) => <NavItem key={t.id} t={t} />)}
        </nav>
        <div className="border-t border-[#2a2118] p-3">
          <a href="/" target="_blank" className={`${S.sideItem} ${S.sideInactive} text-[0.72rem]`}>
            <ExternalLink size={14} /> View Site
          </a>
          <button
            onClick={() => {
              try { localStorage.removeItem("woodex_admin_key"); } catch { /* noop */ }
              try { document.cookie = "woodex_admin=; path=/; max-age=0"; } catch { /* noop */ }
              window.location.href = "/login";
            }}
            className={`${S.sideItem} text-[#7a7063] hover:text-red-400`}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile nav ── */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-[260px] overflow-y-auto bg-[#1a1410] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2a2118] px-5 py-4">
              <span className="text-sm font-semibold tracking-widest text-white">Woodex Interior</span>
              <button onClick={() => setMobileNav(false)} className="text-[#7a7063]"><X size={18} /></button>
            </div>
            {TABS.map((t) => <NavItem key={t.id} t={t} />)}
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileNav(false)} />
        </div>
      )}

      {/* ── MAIN ── */}
      <main className={S.main}>
        {/* Top bar */}
        <div className={S.topbar}>
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileNav(true)} className="lg:hidden text-[#5c5347]"><GripVertical size={20} /></button>
            <div>
              <h1 className={S.heading}>{TABS.find((t) => t.id === tab)?.label}</h1>
              <p className={S.subheading}>{TABS.find((t) => t.id === tab)?.sub}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-[0.72rem] text-[#8a7e6e] sm:block">
              {fmtDate()}, {fmtTime()}
            </span>
            <a href="/" target="_blank" className={`${S.btn} ${S.btnOutline}`}>
              <ChevronRight size={13} /> View Site
            </a>
          </div>
        </div>

        <div className="px-6 py-8 lg:px-8">

          {/* ════════ DASHBOARD ════════ */}
          {tab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [prj.length, "Total Projects"], [inquiries.filter((q) => Date.now() - new Date(q.createdAt).getTime() < 604800000).length, "New Leads"],
                  [art.length, "Blog Posts"], [svc.length, "Services"],
                ].map(([v, k]) => (
                  <div key={k as string} className={S.card}>
                    <p className="font-serif text-3xl text-[#1a1410]">{v}</p>
                    <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-widest text-[#8a7e6e]">{k}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
                {/* Recent leads */}
                <div className={S.card}>
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-serif text-xl text-[#1a1410]">Recent Leads</h2>
                    <button onClick={() => setTab("leads")} className={`${S.btn} ${S.btnGhost} text-[0.72rem]`}>VIEW ALL →</button>
                  </div>
                  {inquiries.length === 0 ? (
                    <p className="py-10 text-center text-sm text-[#b5a992]">No leads yet — form submissions appear here.</p>
                  ) : inquiries.slice(0, 5).map((q, i) => (
                    <div key={q.id} className="flex items-start gap-4 border-t border-[#f0ebe2] py-4 first:border-t-0 first:pt-0">
                      <span className={`${S.avatar} ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>{initials(q.name)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#1a1410]">{q.name}</span>
                          <span className={`${S.badge} ${i < 2 ? S.badgeNew : S.badgeRead}`}>{i < 2 ? "NEW" : "READ"}</span>
                        </div>
                        <p className="mt-1 text-[0.82rem] text-[#5c5347]">{q.message?.slice(0, 100) || q.services || "General enquiry"}</p>
                        <p className="mt-1.5 text-[0.7rem] text-[#b5a992]">{q.projectType || q.services || ""} · {ago(q.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="space-y-5">
                  <div className={S.card}>
                    <h3 className="mb-4 font-serif text-lg text-[#1a1410]">Quick Actions</h3>
                    {[
                      { label: "Open Page Builder", icon: Blocks, to: "builder" },
                      { label: "Add Project", icon: FolderOpen, to: "projects" },
                      { label: "Write Blog Post", icon: FileText, to: "blog" },
                      { label: "View Inbox", icon: Inbox, to: "leads" },
                    ].map((a) => (
                      <button key={a.label} onClick={() => setTab(a.to as TabId)} className="flex w-full items-center justify-between border-t border-[#f0ebe2] py-3.5 text-left first:border-t-0 first:pt-0">
                        <span className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf5eb]"><a.icon size={15} className="text-[#c9a84c]" /></span>
                          <span className="text-[0.85rem] text-[#1a1410]">{a.label}</span>
                        </span>
                        <ChevronRight size={14} className="text-[#d4c5a9]" />
                      </button>
                    ))}
                  </div>

                  {/* Recent projects */}
                  {prj.length > 0 && (
                    <div className={S.card}>
                      <h3 className="mb-3 font-serif text-lg text-[#1a1410]">Recent Projects</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {prj.slice(0, 4).map((p) => (
                          <div key={p.slug} className="overflow-hidden rounded-md">
                            <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ════════ PAGES ════════ */}
          {tab === "pages" && settings && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl text-[#1a1410]">Pages & Sections</h2>
                  <p className={S.subheading}>Manage all pages and the section blocks within them. Click the eye to hide, click the gear to edit.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={doExport} className={`${S.btn} ${S.btnOutline}`}><Download size={14} /> Import / Export</button>
                  <button className={`${S.btn} ${S.btnPrimary}`}><Plus size={14} /> New Page</button>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
                {/* Page list */}
                <div className={S.cardFlat}>
                  <div className="flex items-center justify-between border-b border-[#f0ebe2] px-4 py-3">
                    <span className={S.sectionTitle}>PAGES</span>
                    <span className="text-[0.68rem] text-[#b5a992]">{pages.length}</span>
                  </div>
                  <div className="max-h-[65vh] overflow-y-auto">
                    {pages.map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => setSelectedPage(p.slug)}
                        className={`flex w-full items-center gap-2 border-b border-[#f8f4ed] px-4 py-3 text-left text-[0.85rem] transition-colors ${
                          selectedPage === p.slug ? "bg-[#c9a84c] font-medium text-[#1a1410]" : "text-[#1a1410] hover:bg-[#faf5eb]"
                        }`}
                      >
                        <span className="flex-1">
                          <span className="block font-medium">{p.label}</span>
                          <span className={`text-[0.7rem] ${selectedPage === p.slug ? "text-[#1a1410]/60" : "text-[#b5a992]"}`}>/{p.slug}</span>
                        </span>
                        {"badge" in p && p.badge && (
                          <span className="rounded bg-[#c9a84c]/20 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-widest text-[#a8842a]">{p.badge}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Page detail */}
                <div className={S.cardFlat}>
                  <div className="flex items-center justify-between border-b border-[#f0ebe2] px-6 py-5">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-xl text-[#1a1410]">{pages.find((p) => p.slug === selectedPage)?.label || "Home"}</h3>
                        {selectedPage === "home" && <span className="rounded bg-[#c9a84c]/20 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-widest text-[#a8842a]">HOME PAGE</span>}
                      </div>
                      <p className="mt-1 text-[0.78rem] text-[#b5a992]">/{selectedPage}</p>
                    </div>
                    <button onClick={() => setTab("builder")} className={`${S.btn} ${S.btnOutline}`}>Edit Page</button>
                  </div>

                  {selectedPage === "home" && (
                    <div className="border-b border-[#f0ebe2] px-6 py-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-[#8a7e6e]">SEO Title</p>
                          <p className="mt-1 text-[0.85rem] text-[#1a1410]">Interior Design Company in Lahore | Woodex Interior</p>
                        </div>
                        <div>
                          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-[#8a7e6e]">SEO Description</p>
                          <p className="mt-1 text-[0.85rem] text-[#5c5347]">Woodex Interior creates residential, office, retail and commercial interiors in Lahore…</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section blocks for home */}
                  {selectedPage === "home" ? (
                    <div className="px-6 py-5">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-serif text-lg text-[#1a1410]">Section Blocks ({settings.homeSections.length})</h4>
                        <button className={`${S.btn} ${S.btnPrimary} text-[0.72rem]`}><Plus size={13} /> Add Section</button>
                      </div>
                      <div className="space-y-2">
                        {settings.homeSections.map((s, i) => (
                          <div key={s.id} className={`flex items-center gap-3 rounded-md border px-4 py-3 transition-all ${s.enabled ? "border-[#e8e0d0] bg-white" : "border-dashed border-[#e8e0d0] bg-[#faf7f2] opacity-60"}`}>
                            <GripVertical size={14} className="cursor-grab text-[#d4c5a9]" />
                            <div className="flex gap-1">
                              <button onClick={() => moveSection(i, -1)} className="text-[#b5a992] hover:text-[#c9a84c]"><ArrowUp size={13} /></button>
                              <button onClick={() => moveSection(i, 1)} className="text-[#b5a992] hover:text-[#c9a84c]"><ArrowDown size={13} /></button>
                            </div>
                            <span className="font-serif text-[0.82rem] italic text-[#c9a84c]">{String(i + 1).padStart(2, "0")}</span>
                            <span className="flex-1 text-[0.85rem] text-[#1a1410]">{s.label}</span>
                            <button
                              onClick={() => setSettings({ ...settings, homeSections: settings.homeSections.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x) })}
                              className={`rounded p-1.5 transition-colors ${s.enabled ? "text-[#c9a84c] hover:bg-[#faf5eb]" : "text-[#d4c5a9]"}`}
                            >
                              {s.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                            <button className="rounded p-1.5 text-[#d4c5a9] hover:bg-[#faf5eb] hover:text-[#c9a84c]"><Pencil size={13} /></button>
                            <button className="rounded p-1.5 text-[#d4c5a9] hover:bg-red-50 hover:text-red-400"><Trash2 size={13} /></button>
                          </div>
                        ))}
                      </div>
                      <button onClick={save} disabled={saving} className={`${S.btn} ${S.btnPrimary} mt-5 w-full justify-center`}>
                        {saving ? "Saving…" : saved ? <><Check size={13} /> Published</> : <><Save size={13} /> Publish Changes</>}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                      <Blocks size={32} className="text-[#e0d8c8]" />
                      <p className="mt-4 font-serif text-lg text-[#8a7e6e]">No sections yet</p>
                      <p className="mt-1 text-[0.82rem] text-[#b5a992]">Add your first section block to start building this page.</p>
                      <button className={`${S.btn} ${S.btnOutline} mt-5`}><Plus size={13} /> Add Section</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ════════ HEADER & FOOTER ════════ */}
          {tab === "header-footer" && settings && (
            <div className="max-w-4xl space-y-8">
              <div className={S.card}>
                <h2 className="mb-6 font-serif text-xl text-[#1a1410]">Brand & CTA</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label className={S.label}>Header CTA Button Label</label><input value={settings.header.ctaLabel} onChange={(e) => setSettings({ ...settings, header: { ...settings.header, ctaLabel: e.target.value } })} className={S.input} /></div>
                  <div><label className={S.label}>CTA Button Destination</label><input value="/contact" className={S.input} readOnly /></div>
                  <div>
                    <label className={S.label}>Header Style</label>
                    <select value={settings.header.style} onChange={(e) => setSettings({ ...settings, header: { ...settings.header, style: e.target.value as Settings["header"]["style"] } })} className={S.input}>
                      <option value="transparent">Transparent</option><option value="solid">Solid Light</option><option value="glass">Glass Blur</option>
                    </select>
                  </div>
                  <div>
                    <label className={S.label}>Footer Style</label>
                    <select value={settings.footer.style} onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, style: e.target.value as Settings["footer"]["style"] } })} className={S.input}>
                      <option value="signature">Signature (Full)</option><option value="minimal">Minimal (Compact)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5"><label className={S.label}>Footer Tagline</label><textarea rows={2} value={settings.footer.tagline} onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, tagline: e.target.value } })} className={`${S.input} resize-none`} /></div>
              </div>

              <div className={S.card}>
                <h2 className="mb-5 font-serif text-xl text-[#1a1410]">Navigation Links</h2>
                <p className={S.subheading + " mb-4"}>Toggle page visibility in the site header and mega-menu.</p>
                <div className="space-y-2">
                  {NAV_PAGES.map((p) => {
                    const on = settings.visiblePages?.[p] !== false;
                    return (
                      <div key={p} className="flex items-center justify-between rounded-md border border-[#e8e0d0] bg-white px-4 py-3">
                        <span className="text-[0.85rem] text-[#1a1410] capitalize">/{p}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSettings({ ...settings, visiblePages: { ...settings.visiblePages, [p]: !on } })}
                            className={`rounded p-1.5 transition-colors ${on ? "text-[#c9a84c]" : "text-[#d4c5a9]"}`}
                          >{on ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                          <button className="rounded p-1.5 text-[#d4c5a9] hover:text-[#1a1410]"><Pencil size={13} /></button>
                          <button className="rounded p-1.5 text-[#d4c5a9] hover:text-[#1a1410]"><Copy size={13} /></button>
                          <button className="rounded p-1.5 text-[#d4c5a9] hover:text-red-400"><Trash2 size={13} /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button onClick={save} disabled={saving} className={`${S.btn} ${S.btnPrimary}`}>
                {saving ? "Saving…" : saved ? <><Check size={13} /> Published</> : <><Save size={13} /> Save Header & Footer</>}
              </button>
            </div>
          )}

          {/* ════════ THEME MANAGER ════════ */}
          {tab === "theme" && settings && (
            <div className="max-w-4xl space-y-6">
              <div className={S.card}>
                <h2 className="mb-5 font-serif text-xl text-[#1a1410]">Color System</h2>
                <div className="grid grid-cols-3 gap-5">
                  {([["Gold / Accent", "primary"], ["Dark BG", "dark"], ["Light BG", "light"]] as const).map(([lbl, k]) => (
                    <label key={k} className="rounded-lg border border-[#e8e0d0] bg-[#faf7f2] p-4">
                      <span className={S.label}>{lbl}</span>
                      <input type="color" value={settings.colors[k]} onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, [k]: e.target.value } })} className="mt-2 h-10 w-full cursor-pointer bg-transparent" />
                      <span className="mt-1 block text-[0.68rem] text-[#b5a992]">{settings.colors[k]}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={S.card}>
                <h2 className="mb-5 font-serif text-xl text-[#1a1410]">Typography</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label className={S.label}>Display Font</label><select value={settings.fonts.display} onChange={(e) => setSettings({ ...settings, fonts: { ...settings.fonts, display: e.target.value } })} className={S.input}>{DISPLAY_FONTS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}</select></div>
                  <div><label className={S.label}>Body Font</label><select value={settings.fonts.body} onChange={(e) => setSettings({ ...settings, fonts: { ...settings.fonts, body: e.target.value } })} className={S.input}>{BODY_FONTS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}</select></div>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div><label className={S.label}>Display Scale — {settings.fonts.displayScale ?? 100}%</label><input type="range" min={80} max={130} value={settings.fonts.displayScale ?? 100} onChange={(e) => setSettings({ ...settings, fonts: { ...settings.fonts, displayScale: Number(e.target.value) } })} className="w-full accent-[#c9a84c]" /></div>
                  <div><label className={S.label}>Body Scale — {settings.fonts.bodyScale ?? 100}%</label><input type="range" min={85} max={120} value={settings.fonts.bodyScale ?? 100} onChange={(e) => setSettings({ ...settings, fonts: { ...settings.fonts, bodyScale: Number(e.target.value) } })} className="w-full accent-[#c9a84c]" /></div>
                </div>
              </div>

              <div className={S.card}>
                <h2 className="mb-5 font-serif text-xl text-[#1a1410]">Buttons</h2>
                <label className={S.label}>Corner Radius — {settings.buttons.radius}px</label>
                <input type="range" min={0} max={30} value={settings.buttons.radius} onChange={(e) => setSettings({ ...settings, buttons: { radius: Number(e.target.value) } })} className="w-full accent-[#c9a84c]" />
                <div className="mt-4 flex gap-4">
                  <span className={`${S.btn} ${S.btnPrimary}`} style={{ borderRadius: settings.buttons.radius }}>Preview Button</span>
                  <span className={`${S.btn} ${S.btnOutline}`} style={{ borderRadius: settings.buttons.radius }}>Outline</span>
                </div>
              </div>

              <div className={S.card}>
                <h2 className="mb-5 font-serif text-xl text-[#1a1410]">Hero Content</h2>
                <div className="space-y-4">
                  {(["eyebrow", "line1", "line2", "line3", "subline"] as const).map((f) => (
                    <div key={f}><label className={S.label}>{f === "subline" ? "Description" : `Hero ${f}`}</label>
                      {f === "subline" ? <textarea rows={3} value={settings.hero[f]} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, [f]: e.target.value } })} className={`${S.input} resize-none`} />
                      : <input value={settings.hero[f]} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, [f]: e.target.value } })} className={S.input} />}
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={save} disabled={saving} className={`${S.btn} ${S.btnPrimary}`}>
                {saving ? "Saving…" : saved ? <><Check size={13} /> Theme Published</> : <><Save size={13} /> Publish Theme</>}
              </button>
            </div>
          )}

          {/* ════════ LIVE BUILDER ════════ */}
          {tab === "builder" && settings && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-serif text-xl text-[#1a1410]">Homepage Section Order</h2>
                <button onClick={save} disabled={saving} className={`${S.btn} ${S.btnPrimary}`}>
                  {saving ? "Saving…" : saved ? <><Check size={13} /> Published</> : <><Save size={13} /> Publish Layout</>}
                </button>
              </div>
              <div className="max-w-2xl space-y-2">
                {settings.homeSections.map((s, i) => (
                  <div key={s.id} className={`flex items-center gap-3 rounded-md border px-4 py-3 ${s.enabled ? "border-[#e8e0d0] bg-white" : "border-dashed border-[#e8e0d0] bg-[#faf7f2] opacity-50"}`}>
                    <GripVertical size={14} className="cursor-grab text-[#d4c5a9]" />
                    <div className="flex gap-1"><button onClick={() => moveSection(i, -1)} className="text-[#b5a992] hover:text-[#c9a84c]"><ArrowUp size={13} /></button><button onClick={() => moveSection(i, 1)} className="text-[#b5a992] hover:text-[#c9a84c]"><ArrowDown size={13} /></button></div>
                    <span className="font-serif text-[0.82rem] italic text-[#c9a84c]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-[0.85rem] text-[#1a1410]">{s.label}</span>
                    <button onClick={() => setSettings({ ...settings, homeSections: settings.homeSections.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x) })} className={s.enabled ? "text-[#c9a84c]" : "text-[#d4c5a9]"}>{s.enabled ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════ PROJECTS ════════ */}
          {tab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between"><h2 className="font-serif text-xl text-[#1a1410]">Projects ({prj.length})</h2><button className={`${S.btn} ${S.btnPrimary}`}><Plus size={14} /> New Project</button></div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {prj.map((p) => (
                  <div key={p.slug} className={`${S.cardFlat} overflow-hidden`}>
                    <img src={p.image} alt={p.title} className="aspect-[16/10] w-full object-cover" />
                    <div className="p-4">
                      <h3 className="font-serif text-[1.05rem] text-[#1a1410]">{p.title}</h3>
                      <p className="mt-1 text-[0.72rem] text-[#8a7e6e]">{p.type} · {p.location}</p>
                      <div className="mt-3 flex gap-2">
                        <button className={`${S.btn} ${S.btnOutline} !px-3 !py-1.5 text-[0.68rem]`}><Pencil size={12} /> Edit</button>
                        <button className={`${S.btn} !px-3 !py-1.5 text-[0.68rem] text-red-400 hover:bg-red-50`}><Trash2 size={12} /> Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════ SERVICES ════════ */}
          {tab === "services" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between"><h2 className="font-serif text-xl text-[#1a1410]">Services ({svc.length})</h2><button className={`${S.btn} ${S.btnPrimary}`}><Plus size={14} /> New Service</button></div>
              <div className="space-y-3">
                {svc.map((s, i) => (
                  <div key={s.slug} className={`flex items-center gap-4 rounded-md border border-[#e8e0d0] bg-white px-5 py-4`}>
                    <img src={s.image} alt={s.title} className="h-14 w-20 shrink-0 rounded object-cover" />
                    <div className="flex-1">
                      <h3 className="text-[0.92rem] font-medium text-[#1a1410]">{s.title}</h3>
                      <p className="mt-0.5 text-[0.72rem] text-[#8a7e6e]">{s.group} · /services/{s.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className={`${S.btn} ${S.btnOutline} !px-3 !py-1.5 text-[0.68rem]`}><Pencil size={12} /> Edit</button>
                      <button className={`${S.btn} !px-3 !py-1.5 text-[0.68rem] text-red-400 hover:bg-red-50`}><Trash2 size={12} /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════ BLOG POSTS ════════ */}
          {tab === "blog" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between"><h2 className="font-serif text-xl text-[#1a1410]">Blog Posts ({art.length})</h2><button className={`${S.btn} ${S.btnPrimary}`}><Plus size={14} /> New Post</button></div>
              <div className="space-y-3">
                {art.map((a) => (
                  <div key={a.slug} className="flex items-center gap-4 rounded-md border border-[#e8e0d0] bg-white px-5 py-4">
                    <img src={a.image} alt={a.title} className="h-14 w-20 shrink-0 rounded object-cover" />
                    <div className="flex-1">
                      <h3 className="text-[0.92rem] font-medium text-[#1a1410]">{a.title}</h3>
                      <p className="mt-0.5 text-[0.72rem] text-[#8a7e6e]">{a.category} · {a.readTime} · {a.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className={`${S.btn} ${S.btnOutline} !px-3 !py-1.5 text-[0.68rem]`}><Pencil size={12} /> Edit</button>
                      <button className={`${S.btn} !px-3 !py-1.5 text-[0.68rem] text-red-400 hover:bg-red-50`}><Trash2 size={12} /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════ WHATSAPP / LIVE SUPPORT ════════ */}
          {tab === "whatsapp" && settings && (
            <div className="max-w-2xl space-y-6">
              <div className={S.card}>
                <h2 className="mb-5 font-serif text-xl text-[#1a1410]">WhatsApp Configuration</h2>
                <div className="space-y-5">
                  <div><label className={S.label}>Studio WhatsApp Number</label><input value={settings.integrations.whatsappNumber} onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, whatsappNumber: e.target.value } })} className={S.input} placeholder="92322400768" /></div>
                  <div><label className={S.label}>Provider</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["wame", "cloud"] as const).map((p) => (
                        <button key={p} onClick={() => setSettings({ ...settings, integrations: { ...settings.integrations, whatsappProvider: p } })} className={`${S.btn} ${settings.integrations.whatsappProvider === p ? S.btnPrimary : S.btnOutline} w-full justify-center`}>{p === "wame" ? "wa.me Links" : "Meta Cloud API"}</button>
                      ))}
                    </div>
                  </div>
                  {settings.integrations.whatsappProvider === "cloud" && (
                    <>
                      <div><label className={S.label}>Phone Number ID</label><input value={settings.integrations.whatsappPhoneId} onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, whatsappPhoneId: e.target.value } })} className={S.input} /></div>
                      <div><label className={S.label}>Access Token</label><input type="password" value={settings.integrations.whatsappToken} onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, whatsappToken: e.target.value } })} className={S.input} /></div>
                    </>
                  )}
                  <div className="flex gap-3">
                    <button onClick={save} disabled={saving} className={`${S.btn} ${S.btnPrimary} flex-1`}>{saving ? "Saving…" : saved ? <><Check size={13} /> Saved</> : <><Save size={13} /> Save</>}</button>
                    <button onClick={testWhatsApp} className={`${S.btn} ${S.btnOutline} flex-1`}><Send size={12} /> Test Connection</button>
                  </div>
                  {waTest && <p className="rounded-md border border-[#e8e0d0] bg-[#faf7f2] px-4 py-3 text-[0.82rem] text-[#5c5347]">{waTest}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ════════ CONTACT LEADS ════════ */}
          {tab === "leads" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-[#1a1410]">Contact Leads ({inquiries.length})</h2>
                <button onClick={() => void loadAll()} className={`${S.btn} ${S.btnOutline}`}><RefreshCw size={13} /> Refresh</button>
              </div>
              {inquiries.length === 0 ? (
                <div className={`${S.card} py-14 text-center`}><Inbox size={32} className="mx-auto text-[#e0d8c8]" /><p className="mt-3 text-[#b5a992]">No leads yet.</p></div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((q, i) => (
                    <div key={q.id} className="flex items-start gap-4 rounded-md border border-[#e8e0d0] bg-white px-5 py-4">
                      <span className={`${S.avatar} ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>{initials(q.name)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2"><span className="font-medium text-[#1a1410]">{q.name}</span><span className="text-[0.78rem] text-[#c9a84c]">{q.phone}</span><span className={`${S.badge} ${i < 2 ? S.badgeNew : S.badgeRead}`}>{i < 2 ? "NEW" : "READ"}</span></div>
                        <p className="mt-1 text-[0.82rem] text-[#5c5347]">{q.message?.slice(0, 140) || "General enquiry"}</p>
                        <p className="mt-1 text-[0.7rem] text-[#b5a992]">{[q.projectType, q.location, q.area, q.budget].filter(Boolean).join(" · ")} · {ago(q.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════════ APPOINTMENTS ════════ */}
          {tab === "appointments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-[#1a1410]">Appointments ({appointments.length})</h2>
                <button onClick={() => void loadAll()} className={`${S.btn} ${S.btnOutline}`}><RefreshCw size={13} /> Refresh</button>
              </div>
              {appointments.length === 0 ? (
                <div className={`${S.card} py-14 text-center`}><CalendarCheck size={32} className="mx-auto text-[#e0d8c8]" /><p className="mt-3 text-[#b5a992]">No appointments yet — bookings from the AI assistant appear here.</p></div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((a, i) => (
                    <div key={a.id} className="flex items-start gap-4 rounded-md border border-[#e8e0d0] bg-white px-5 py-4">
                      <span className={`${S.avatar} ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>{initials(a.name)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2"><span className="font-medium text-[#1a1410]">{a.name}</span><span className="text-[0.78rem] text-[#c9a84c]">{a.whatsapp}</span>{a.companyName && <span className="text-[0.72rem] text-[#8a7e6e]">· {a.companyName}</span>}</div>
                        <p className="mt-1 text-[0.82rem] text-[#5c5347]">{[a.service, a.location, a.preferredDate ? `${a.preferredDate}${a.preferredTime ? ` · ${a.preferredTime}` : ""}` : null].filter(Boolean).join(" · ")}</p>
                        {a.notes && <p className="mt-1 text-[0.78rem] text-[#8a7e6e]">{a.notes}</p>}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`${S.badge} ${S.badgeNew}`}>{a.status}</span>
                        <a href={`https://wa.me/${a.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="text-[0.68rem] text-[#c9a84c] hover:underline">WhatsApp</a>
                        <span className="text-[0.62rem] text-[#b5a992]">{ago(a.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════════ IMPORT / EXPORT ════════ */}
          {tab === "data" && (
            <div className="max-w-2xl space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <button onClick={doExport} className={`${S.cardFlat} flex flex-col items-start gap-3 p-6 text-left transition-colors hover:bg-[#faf5eb]`}>
                  <Download size={20} className="text-[#c9a84c]" />
                  <span className="font-serif text-lg text-[#1a1410]">Export Site JSON</span>
                  <span className="text-[0.78rem] text-[#8a7e6e]">Theme + services, projects, articles</span>
                </button>
                <button onClick={() => fileRef.current?.click()} className={`${S.cardFlat} flex flex-col items-start gap-3 p-6 text-left transition-colors hover:bg-[#faf5eb]`}>
                  <Upload size={20} className="text-[#c9a84c]" />
                  <span className="font-serif text-lg text-[#1a1410]">Import Settings</span>
                  <span className="text-[0.78rem] text-[#8a7e6e]">Restore from a previous export</span>
                </button>
                <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void doImport(f); e.target.value = ""; }} />
              </div>
              {importMsg && <p className={`rounded-md border px-4 py-3 text-[0.82rem] ${importMsg.includes("successful") ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-600"}`}>{importMsg}</p>}
              <div className={S.cardFlat + " p-6"}>
                <p className={S.sectionTitle + " mb-3"}>API Reference</p>
                <ul className="space-y-1.5 font-mono text-[0.75rem] text-[#5c5347]">
                  <li>GET /api/admin/settings</li><li>PUT /api/admin/settings</li>
                  <li>GET /api/admin/inquiries</li><li>GET /api/appointments</li>
                  <li>POST /api/appointments</li><li>GET /api/admin/transfer (export)</li>
                  <li>POST /api/admin/transfer (import)</li><li>POST /api/chat (AI agent)</li>
                </ul>
                <p className="mt-4 text-[0.72rem] text-[#b5a992]">Admin endpoints accept the dashboard session cookie or x-admin-key token. Credentials are stored in the database (admin_users table).</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
