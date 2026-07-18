"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Sparkles,
  ArrowUpRight,
  Loader2,
  CalendarCheck,
} from "lucide-react";
import { BUSINESS } from "@/lib/data";
import { AppointmentForm } from "@/components/appointment-form";

type Msg = { role: "user" | "assistant"; content: string };
type Suggestion = { label: string; href: string };

const WA_TEMPLATES = [
  { label: "Book a consultation", msg: "Hello Woodex! I would like to book an interior design consultation." },
  { label: "Office interior quote", msg: "Hello Woodex! I need a quotation for office interior design." },
  { label: "Custom furniture quote", msg: "Hello Woodex! I'm interested in custom furniture — please share details." },
  { label: "Schedule a site visit", msg: "Hello Woodex! I would like to schedule a site visit at my property." },
  { label: "3D visualization", msg: "Hello Woodex! I want a 3D design for my space. What do I need to send?" },
];

const STARTERS = ["What services do you offer?", "How much does interior design cost?", "Where are you located?"];

const OPENING: Msg = {
  role: "assistant",
  content:
    "Assalam-o-Alaikum! I'm the Woodex AI assistant. Ask me about our services, pricing, process, portfolio — or book a consultation.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"ai" | "wa" | "book">("ai");
  const [ping, setPing] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([OPENING]);
  const [input, setInput] = useState("");
  const [waInput, setWaInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [sessionId, setSessionId] = useState("anon");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionId(
      localStorage.getItem("woodex_chat_sid") ??
        (() => {
          const id = `s_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
          localStorage.setItem("woodex_chat_sid", id);
          return id;
        })()
    );
    const t = setTimeout(() => setPing(false), 9000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking, open]);

  async function ask(text: string) {
    const msg = text.trim();
    if (!msg || thinking) return;
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setInput("");
    setSuggestions([]);
    setThinking(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, sessionId }),
      });
      const json = await res.json();
      // human pacing: reveal beats with slight delay
      await new Promise((r) => setTimeout(r, 650));
      setMessages((m) => [...m, { role: "assistant", content: json.reply ?? "…" }]);
      setSuggestions(json.suggestions ?? []);
      if (json.action === "book-appointment") {
        await new Promise((r) => setTimeout(r, 400));
        setTab("book");
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `I'm having trouble connecting — please WhatsApp us at ${BUSINESS.phone}.` },
      ]);
    } finally {
      setThinking(false);
    }
  }

  const waSend = (text: string) => {
    if (!text.trim()) return;
    window.open(`${BUSINESS.whatsapp}?text=${encodeURIComponent(text.trim())}`, "_blank", "noopener");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-4 md:bottom-7 md:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-cream/10 bg-espresso shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3.5 border-b border-cream/10 bg-coal px-5 py-4">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass text-espresso">
                {tab === "ai" ? <Sparkles size={16} /> : tab === "wa" ? <MessageCircle size={16} /> : <CalendarCheck size={16} />}
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-coal bg-[#4a7c59]" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-cream">
                  {tab === "ai" ? "Woodex AI Assistant" : tab === "wa" ? "WhatsApp the Studio" : "Book an Appointment"}
                </p>
                <p className="text-[0.63rem] font-light text-cream/50">
                  {tab === "ai"
                    ? "Trained on everything Woodex · Instant answers"
                    : tab === "wa"
                      ? "Live team · Replies within the hour"
                      : "30-second booking · Confirmed on WhatsApp"}
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-cream/50 transition-colors hover:text-cream">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-3 gap-px border-b border-cream/10 bg-cream/10">
              {(["ai", "book", "wa"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`py-2.5 text-[0.56rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                    tab === k ? "bg-espresso text-brass-soft" : "bg-coal text-cream/45 hover:text-cream/70"
                  }`}
                >
                  {k === "ai" ? "AI Chat" : k === "book" ? "Book" : "WhatsApp"}
                </button>
              ))}
            </div>

            {tab === "book" ? (
              <div className="h-[320px] overflow-y-auto px-4 py-4 md:h-[340px]">
                <p className="mb-3 text-[0.72rem] font-light leading-relaxed text-cream/60">
                  Share your details once — this booking goes straight to our design
                  team's WhatsApp, and they'll confirm your slot shortly.
                </p>
                <AppointmentForm
                  onBooked={(msg, link) => {
                    setTab("ai");
                    setMessages((m) => [
                      ...m,
                      { role: "assistant", content: `All set! ${msg}` },
                    ]);
                    if (link) {
                      setSuggestions([{ label: "Chat confirmation on WhatsApp", href: link }]);
                    }
                  }}
                />
              </div>
            ) : tab === "ai" ? (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="h-[320px] space-y-3.5 overflow-y-auto px-4 py-4 md:h-[340px]">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[86%] whitespace-pre-line rounded-xl px-4 py-3 text-[0.82rem] font-light leading-relaxed ${
                          m.role === "user"
                            ? "rounded-br-sm bg-brass text-espresso"
                            : "rounded-tl-sm border border-cream/10 bg-carbon text-cream/85"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {thinking && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-1.5 rounded-xl rounded-tl-sm border border-cream/10 bg-carbon px-4 py-3.5">
                        {[0, 1, 2].map((d) => (
                          <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-brass-soft" style={{ animationDelay: `${d * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  )}
                  {suggestions.length > 0 && !thinking && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {suggestions.map((s) =>
                        s.href === "action:book-appointment" ? (
                          <button
                            key={s.label}
                            onClick={() => setTab("book")}
                            className="flex items-center gap-1.5 rounded-full border border-brass/30 bg-brass/10 px-3 py-1.5 text-[0.68rem] font-light text-brass-soft transition-all duration-300 hover:border-brass hover:bg-brass hover:text-espresso"
                          >
                            {s.label} <CalendarCheck size={10} />
                          </button>
                        ) : (
                          <a
                            key={s.label}
                            href={s.href}
                            target={s.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="flex items-center gap-1.5 rounded-full border border-brass/30 bg-brass/10 px-3 py-1.5 text-[0.68rem] font-light text-brass-soft transition-all duration-300 hover:border-brass hover:bg-brass hover:text-espresso"
                          >
                            {s.label} <ArrowUpRight size={10} />
                          </a>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Starters (only at start) */}
                {messages.length === 1 && (
                  <div className="flex flex-wrap items-center gap-2 px-4 pb-3">
                    {STARTERS.map((s) => (
                      <button key={s} onClick={() => ask(s)} className="rounded-full border border-cream/15 px-3 py-1.5 text-[0.68rem] font-light text-cream/60 transition-colors hover:border-brass hover:text-brass-soft">
                        {s}
                      </button>
                    ))}
                    <button
                      onClick={() => setTab("book")}
                      className="flex items-center gap-1.5 rounded-full border border-brass/40 bg-brass/10 px-3 py-1.5 text-[0.68rem] font-light text-brass-soft transition-colors hover:bg-brass hover:text-espresso"
                    >
                      <CalendarCheck size={11} /> Book an appointment
                    </button>
                  </div>
                )}

                {/* Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    ask(input);
                  }}
                  className="flex items-center gap-2 border-t border-cream/10 bg-coal px-4 py-3"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about Woodex…"
                    className="flex-1 bg-transparent text-[0.85rem] font-light text-cream placeholder:text-cream/35 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={thinking}
                    aria-label="Send message"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brass text-espresso transition-transform duration-300 hover:scale-105 disabled:opacity-60"
                  >
                    {thinking ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="h-[320px] space-y-4 overflow-y-auto px-4 py-4 md:h-[340px]">
                  <div className="max-w-[86%] rounded-xl rounded-tl-sm border border-cream/10 bg-carbon px-4 py-3">
                    <p className="text-[0.82rem] font-light leading-relaxed text-cream/85">
                      Pick a template or type your own message — it opens straight into WhatsApp with our team.
                    </p>
                    <p className="mt-1.5 text-[0.58rem] tracking-wider text-cream/35">
                      Design Team · {BUSINESS.phone}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {WA_TEMPLATES.map((t) => (
                      <button
                        key={t.label}
                        onClick={() => waSend(t.msg)}
                        className="rounded-full border border-brass/30 bg-brass/10 px-3.5 py-2 text-[0.7rem] font-light text-brass-soft transition-all duration-300 hover:border-brass hover:bg-brass hover:text-espresso"
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    waSend(waInput);
                    setWaInput("");
                  }}
                  className="flex items-center gap-2 border-t border-cream/10 bg-coal px-4 py-3"
                >
                  <input
                    value={waInput}
                    onChange={(e) => setWaInput(e.target.value)}
                    placeholder="Type your message…"
                    className="flex-1 bg-transparent text-[0.85rem] font-light text-cream placeholder:text-cream/35 focus:outline-none"
                  />
                  <button type="submit" aria-label="Send on WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-brass text-espresso transition-transform duration-300 hover:scale-105">
                    <Send size={14} />
                  </button>
                </form>
              </>
            )}

            <a
              href={BUSINESS.phoneHref}
              className="flex items-center justify-center gap-2 border-t border-cream/10 py-2.5 text-[0.58rem] font-medium tracking-[0.28em] uppercase text-cream/45 transition-colors hover:text-brass-soft"
            >
              <Phone size={11} /> Or call {BUSINESS.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open Woodex assistant"}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-brass text-espresso shadow-[0_14px_40px_-8px_rgba(201,168,76,0.65)] transition-all duration-300 hover:scale-105 hover:bg-brass-soft"
      >
        {ping && !open && <span className="absolute inset-0 animate-ping rounded-full bg-brass/50" />}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
              <X size={22} strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
              <Sparkles size={22} strokeWidth={1.75} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
