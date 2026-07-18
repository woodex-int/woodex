import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Woodex Interior Lahore — Request a Consultation",
  description:
    "Discuss your home, office, shop, commercial interior or custom furniture project with Woodex Interior, Model Town Link Road, Lahore. Call or WhatsApp 0322 4000768.",
};

const NEXT_STEPS = [
  {
    n: "01",
    title: "We review your brief",
    text: "Your project type, location, area and requirements are reviewed by our design team.",
  },
  {
    n: "02",
    title: "Consultation call",
    text: "We contact you within one business day to discuss scope, style direction and schedule.",
  },
  {
    n: "03",
    title: "Site review & proposal",
    text: "A site review follows where needed, then a written scope and quotation for approval.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Woodex Interior"
        title="Discuss your project with Woodex Interior"
        copy="Tell us about your home, office, shop, commercial interior or custom furniture requirements."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1500px] gap-16 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          {/* Info column */}
          <div>
            <Reveal>
              <p className="eyebrow">The Studio</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(1.9rem,3.4vw,2.8rem)] text-ink">
                Zainab Tower, <span className="italic text-brass-deep">Model Town</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-7">
                <li className="flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink/15 text-brass-deep">
                    <MapPin size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[0.58rem] font-medium tracking-[0.32em] uppercase text-umber">Address</p>
                    <p className="font-display mt-1.5 text-lg leading-snug text-ink">
                      {BUSINESS.addressLines.join(", ")}
                    </p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink/15 text-brass-deep">
                    <Phone size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[0.58rem] font-medium tracking-[0.32em] uppercase text-umber">
                      Mobile / WhatsApp
                    </p>
                    <a href={BUSINESS.phoneHref} className="font-display mt-1.5 block text-lg text-ink transition-colors hover:text-brass-deep">
                      {BUSINESS.phone}
                    </a>
                    <a href={BUSINESS.landlineHref} className="mt-0.5 block text-sm font-light text-umber transition-colors hover:text-brass-deep">
                      {BUSINESS.landline} · Landline
                    </a>
                  </div>
                </li>
                <li className="flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink/15 text-brass-deep">
                    <Mail size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[0.58rem] font-medium tracking-[0.32em] uppercase text-umber">Email</p>
                    <a href={`mailto:${BUSINESS.email}`} className="font-display mt-1.5 block text-lg text-ink transition-colors hover:text-brass-deep">
                      {BUSINESS.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink/15 text-brass-deep">
                    <Clock size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[0.58rem] font-medium tracking-[0.32em] uppercase text-umber">Hours</p>
                    <p className="mt-1.5 text-sm font-light leading-relaxed text-umber">
                      Studio visits by appointment — call or WhatsApp to schedule.
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group mt-10 flex items-center justify-between border border-brass/40 bg-brass/10 p-6 transition-colors duration-500 hover:bg-brass/15"
              >
                <div className="flex items-center gap-4">
                  <MessageCircle size={20} className="text-brass-deep" strokeWidth={1.5} />
                  <div>
                    <p className="font-display text-lg text-ink">Chat on WhatsApp</p>
                    <p className="text-xs font-light text-umber">Share floor plans & reference photos instantly</p>
                  </div>
                </div>
                <span className="text-[0.6rem] font-medium tracking-[0.3em] uppercase text-brass-deep">
                  {BUSINESS.phone}
                </span>
              </a>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={0.15}>
            <div className="border border-ink/12 bg-cream p-8 md:p-12">
              <h2 className="font-display text-2xl text-ink md:text-3xl">
                Request a consultation
              </h2>
              <p className="mb-10 mt-3 text-sm font-light leading-relaxed text-umber">
                Complete the form and our design team will reach out within one
                business day. Fields marked * are required.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-espresso">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow">Find the Studio</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="headline mt-6 text-[clamp(1.9rem,3.6vw,3rem)] text-cream">
                  Zainab Tower, <span className="italic gold-shimmer-text">Model Town</span>, Lahore
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <a
                href="https://maps.google.com/?q=Zainab+Tower,+Model+Town+Link+Road,+Lahore"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light"
              >
                Open in Google Maps
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="overflow-hidden border border-cream/15">
              <iframe
                title="Woodex Interior — Zainab Tower, Model Town Link Road, Lahore"
                src="https://maps.google.com/maps?q=Zainab%20Tower%2C%20Model%20Town%20Link%20Road%2C%20Lahore%2C%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-[400px] w-full grayscale-[35%] invert-[0.9] hue-rotate-180 contrast-[0.9] md:h-[500px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-gradient-marble">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-28">
          <Reveal>
            <p className="eyebrow">After You Submit</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="headline mt-6 text-[clamp(1.9rem,3.6vw,3rem)] text-ink">
              What happens <span className="italic text-brass-deep">next</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-ink/12 bg-ink/12 md:grid-cols-3">
            {NEXT_STEPS.map((step, i) => (
              <Reveal key={step.n} delay={0.08 * i} className="bg-parchment">
                <div className="p-9 md:p-11">
                  <span className="font-display text-3xl font-light italic text-brass">
                    {step.n}
                  </span>
                  <h3 className="font-display mt-5 text-xl text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-umber">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
