"use client";

import { useState } from "react";
import { CalendarCheck, Loader2, Send, Check } from "lucide-react";
import { SERVICES } from "@/lib/data";

const input =
  "w-full border-b border-cream/15 bg-transparent py-2.5 text-[0.82rem] font-light text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-brass";
const lbl = "mb-1 block text-[0.54rem] font-medium tracking-[0.28em] uppercase text-brass-soft/80";

function smartDate(v: string) {
  // let the server humanize; pass through here untouched
  return v.trim();
}

export function AppointmentForm({
  onBooked,
}: {
  onBooked?: (msg: string, followUpLink?: string) => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const body = {
      name: String(raw.name ?? ""),
      whatsapp: String(raw.whatsapp ?? ""),
      companyName: String(raw.companyName ?? ""),
      location: String(raw.location ?? ""),
      service: String(raw.service ?? ""),
      preferredDate: smartDate(String(raw.preferredDate ?? "")),
      preferredTime: String(raw.preferredTime ?? ""),
      notes: String(raw.notes ?? ""),
      source: "ai-assistant",
    };
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Booking failed.");
      setStatus("sent");
      setSuccMsg(json.message);
      setFollowUp(json.whatsapp?.followUpLink ?? "");
      form.reset();
      onBooked?.(json.message, json.whatsapp?.followUpLink);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Booking failed.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-brass/30 bg-brass/10 px-4 py-5 text-center">
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brass text-espresso">
          <Check size={18} />
        </span>
        <p className="font-display mt-3 text-lg text-cream">Appointment booked</p>
        <p className="mx-auto mt-2 max-w-[240px] text-[0.72rem] font-light leading-relaxed text-cream/60">
          {succMsg}
        </p>
        {followUp && (
          <a
            href={followUp}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brass px-4 py-2 text-[0.68rem] font-medium tracking-widest uppercase text-espresso transition-transform hover:scale-105"
          >
            <Send size={11} /> Confirm on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-cream/15 bg-carbon p-4">
      <p className="mb-4 flex items-center gap-2 text-[0.6rem] font-medium tracking-[0.3em] uppercase text-brass-soft">
        <CalendarCheck size={13} /> Book Appointment
      </p>
      <div className="space-y-4">
        <div>
          <label className={lbl}>Full name *</label>
          <input name="name" required className={input} placeholder="Your name" />
        </div>
        <div>
          <label className={lbl}>WhatsApp number *</label>
          <input name="whatsapp" required className={input} placeholder="03XX XXXXXXX" />
        </div>
        <div>
          <label className={lbl}>Company name</label>
          <input name="companyName" className={input} placeholder="Optional" />
        </div>
        <div>
          <label className={lbl}>Location</label>
          <input name="location" className={input} placeholder="e.g. DHA Phase 5, Lahore" />
        </div>
        <div>
          <label className={lbl}>Service</label>
          <select name="service" className={input} defaultValue="">
            <option value="" disabled>Select a service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Preferred date</label>
            <input
              name="preferredDate"
              className={input}
              placeholder='"Tomorrow" or 28 Oct'
            />
          </div>
          <div>
            <label className={lbl}>Time</label>
            <input name="preferredTime" className={input} placeholder="e.g. 4:00 PM" />
          </div>
        </div>
        <div>
          <label className={lbl}>Notes</label>
          <textarea name="notes" rows={2} className={`${input} resize-none`} placeholder="Anything we should know?" />
        </div>
      </div>
      {status === "error" && (
        <p className="mt-3 text-[0.7rem] text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brass py-3 text-[0.66rem] font-medium tracking-[0.26em] uppercase text-espresso transition-all hover:bg-brass-soft disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={12} className="animate-spin" /> Booking…
          </>
        ) : (
          <>Confirm Booking <Send size={11} /></>
        )}
      </button>
    </form>
  );
}
