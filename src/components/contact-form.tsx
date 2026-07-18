"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, MessageCircle, Send } from "lucide-react";
import { BUSINESS, SERVICES } from "@/lib/data";

const inputCls =
  "w-full border-b border-ink/20 bg-transparent py-3 text-[0.95rem] font-light text-ink placeholder:text-ink/35 outline-none transition-colors duration-300 focus:border-brass";
const labelCls =
  "mb-1 block text-[0.58rem] font-medium tracking-[0.32em] uppercase text-umber";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center border border-brass/30 bg-cream px-8 py-16 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brass text-espresso">
              <Check size={26} strokeWidth={1.5} />
            </span>
            <h3 className="font-display mt-8 text-3xl text-ink">Thank you!</h3>
            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-umber">
              Your request has been received. Our design team will contact you
              within one business day.
            </p>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-brass mt-8"
            >
              <MessageCircle size={13} /> Continue on WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2"
          >
            <div>
              <label className={labelCls} htmlFor="name">Full name *</label>
              <input id="name" name="name" required className={inputCls} placeholder="Your name" />
            </div>
            <div>
              <label className={labelCls} htmlFor="phone">Phone / WhatsApp *</label>
              <input id="phone" name="phone" required className={inputCls} placeholder="03XX XXXXXXX" />
            </div>
            <div>
              <label className={labelCls} htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className={inputCls} placeholder="you@email.com" />
            </div>
            <div>
              <label className={labelCls} htmlFor="projectType">Project type</label>
              <select id="projectType" name="projectType" className={inputCls} defaultValue="">
                <option value="" disabled>Select type</option>
                {["Home / Residential", "Office / Workspace", "Retail / Shop", "Commercial", "Custom furniture only", "Renovation", "Other"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="location">Project location</label>
              <input id="location" name="location" className={inputCls} placeholder="e.g. DHA Phase 5, Lahore" />
            </div>
            <div>
              <label className={labelCls} htmlFor="area">Approximate area</label>
              <input id="area" name="area" className={inputCls} placeholder="e.g. 2,000 sq ft" />
            </div>
            <div>
              <label className={labelCls} htmlFor="services">Required services</label>
              <select id="services" name="services" className={inputCls} defaultValue="">
                <option value="" disabled>Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="budget">Budget range</label>
              <select id="budget" name="budget" className={inputCls} defaultValue="">
                <option value="" disabled>Select range</option>
                {["Under PKR 1M", "PKR 1M – 3M", "PKR 3M – 7M", "PKR 7M – 15M", "Above PKR 15M", "Prefer to discuss"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelCls} htmlFor="startDate">Expected start date</label>
              <input id="startDate" name="startDate" className={inputCls} placeholder="e.g. March 2026" />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`${inputCls} resize-none`}
                placeholder="Tell us about your space, style preferences and requirements. You can share floor plans via WhatsApp after submitting."
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-800/85 md:col-span-2">{error}</p>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-brass disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={13} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Request a Consultation <Send size={12} />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
