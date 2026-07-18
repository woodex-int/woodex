import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
  Upload,
  Eye,
  PencilRuler,
  Check,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PanoramaViewer } from "@/components/panorama";
import { WalkthroughVideo } from "@/components/walkthrough";
import { FaqAccordion } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealImage } from "@/components/reveal";
import { BUSINESS, PANORAMAS, WALKTHROUGHS, RENDERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "3D Interior Design & Visualization Studio in Lahore",
  description:
    "See your space before it's built — interactive 360° panoramas, 3D walkthroughs and photorealistic renders by the Woodex 3D Studio in Lahore.",
};

const STUDIO_FAQS = [
  {
    q: "What do I need to send to start a 3D design?",
    a: "Your floor plan (or rough room measurements), a few photographs of the space if it exists, and any reference styles you like. We can also measure the site ourselves in Lahore.",
  },
  {
    q: "How long does visualization take?",
    a: "A typical room set takes about one to two weeks depending on the number of views and revision rounds agreed in your package.",
  },
  {
    q: "Is 3D visualization included in every design package?",
    a: "It depends on the agreed scope. Mention it during your consultation and we will build the views you need into the proposal.",
  },
  {
    q: "Can you make walkthrough animations?",
    a: "Yes — animated flythroughs can be added for larger residential, office and commercial projects where you want to present the space to family, partners or investors.",
  },
];

const YOU_SEND = [
  "Floor plan or rough room measurements",
  "Photographs of the existing space",
  "Style references you love — links or screenshots",
  "Functional requirements per room",
];

const YOU_RECEIVE = [
  "Photorealistic still renders of every key angle",
  "360° panoramic views you can drag to explore",
  "Walkthrough animation (in applicable packages)",
  "Coordinated color, material and furniture selections",
];

export default function ThreeDStudioPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <PageHero
        eyebrow="The Woodex 3D Studio"
        title="See Your Space Before It's Built"
        copy="Walk through your future home, office or restaurant in photorealistic 3D — approve every color, material and piece of furniture before execution begins."
        image={PANORAMAS[0].src}
        crumbs={[{ label: "Home", href: "/" }, { label: "3D Studio" }]}
      />

      {/* ── Interactive panoramas ──────────────────────── */}
      <section className="bg-espresso pb-24 md:pb-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
            <div>
              <Reveal>
                <p className="eyebrow">Interactive Panoramas</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="headline mt-6 text-[clamp(2rem,4.4vw,3.8rem)] text-cream">
                  Walk Through Your <span className="italic gold-shimmer-text">Future Home</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sm font-light leading-relaxed text-cream/60">
                Drag left and right to look around each space — exactly as you will
                review your own design with our team.
              </p>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal>
              <PanoramaViewer
                src={PANORAMAS[0].src}
                title={PANORAMAS[0].title}
                meta={PANORAMAS[0].meta}
                className="h-[380px] w-full md:h-[540px]"
              />
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <PanoramaViewer
                  src={PANORAMAS[1].src}
                  title={PANORAMAS[1].title}
                  meta={PANORAMAS[1].meta}
                  className="h-[300px] w-full md:h-[400px]"
                />
              </Reveal>
              <Reveal delay={0.12}>
                <PanoramaViewer
                  src={PANORAMAS[2].src}
                  title={PANORAMAS[2].title}
                  meta={PANORAMAS[2].meta}
                  className="h-[300px] w-full md:h-[400px]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured walkthroughs ──────────────────────── */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
          <div className="mb-12 max-w-2xl md:mb-16">
            <Reveal>
              <p className="eyebrow">Featured 3D Walkthroughs</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(2rem,4.4vw,3.8rem)] text-ink">
                Press play. <span className="italic text-brass-deep">Step inside.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-[0.95rem] font-light leading-relaxed text-umber">
                Click play to experience our projects in 3D before they were built —
                the same walkthroughs our clients reviewed and approved before a
                single wall was touched.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {WALKTHROUGHS.map((w, i) => (
              <Reveal key={w.title} delay={0.07 * i}>
                <WalkthroughVideo {...w} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected renders ───────────────────────────── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <div>
              <Reveal>
                <p className="eyebrow">Selected Renders</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="headline mt-6 text-[clamp(2rem,4.4vw,3.8rem)] text-ink">
                  Concepts our clients <span className="italic text-brass-deep">approved on screen</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link href="/services/3d-interior-design-space-planning-lahore" className="link-arrow">
                3D Design Service Details <ArrowUpRight size={13} />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RENDERS.map((r, i) => (
              <Reveal key={r.title} delay={0.05 * (i % 3)} className="media-zoom group">
                <div className="media-frame vignette aspect-[4/3]">
                  <img src={r.src} alt={r.title} className="h-full w-full object-cover" />
                  <span className="absolute bottom-4 left-5 font-display text-lg italic text-cream/90">
                    {r.title}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Send / Receive ─────────────────────────────── */}
      <section className="bg-gradient-section-dark text-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
          <div className="mb-14 max-w-2xl md:mb-20">
            <Reveal>
              <p className="eyebrow">How Visualization Works</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(2rem,4.4vw,3.8rem)]">
                From your floor plan to a <span className="italic text-brass-soft">photoreal space</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden border border-brass/20 bg-brass/15 lg:grid-cols-2">
            {[
              { icon: Upload, k: "You Send", items: YOU_SEND },
              { icon: Eye, k: "You Receive", items: YOU_RECEIVE },
            ].map((col, ci) => (
              <Reveal key={col.k} delay={0.1 * ci} className="bg-espresso">
                <div className="h-full p-9 md:p-14">
                  <span className="flex h-12 w-12 items-center justify-center border border-brass/40 text-brass-soft">
                    <col.icon size={18} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display mt-7 text-3xl">{col.k}</h3>
                  <ul className="mt-7 space-y-0">
                    {col.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-4 border-t border-cream/10 py-4 text-[0.95rem] font-light leading-relaxed text-cream/70"
                      >
                        <Check size={15} className="mt-1 shrink-0 text-brass" strokeWidth={2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Need a visualization? ──────────────────────── */}
      <section className="bg-gradient-marble">
        <div className="mx-auto grid max-w-[1500px] items-center gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-20">
          <div className="media-zoom order-2 lg:order-1">
            <RevealImage
              src="/img/service-planning.jpg"
              alt="Woodex 3D visualization workspace with drawings and material palette"
              className="aspect-[4/3]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow">Need a Visualization?</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(2rem,4vw,3.4rem)] text-ink">
                Your space, designed <span className="italic text-brass-deep">on screen first</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-lg text-[0.95rem] font-light leading-relaxed text-umber">
                Send us your floor plan and requirements — our studio will prepare a
                visualization package tailored to your rooms, with stills, panoramas
                and walkthrough options priced before we begin.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/contact" className="btn btn-brass">
                  <PencilRuler size={13} /> Request 3D Design
                </Link>
                <a
                  href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(
                    "Hello Woodex! I want a 3D design / visualization for my space. What do I need to send?"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark"
                >
                  <MessageCircle size={13} /> WhatsApp Your Plan
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">3D Studio Questions</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(1.9rem,3.6vw,3rem)] text-ink">
                Before you <span className="italic text-brass-deep">ask</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <FaqAccordion items={STUDIO_FAQS} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Ready to See It?"
        title="Let's design your space in 3D — before it exists"
        copy="Share your floor plan today and walk through your future space this month."
      />
    </>
  );
}
