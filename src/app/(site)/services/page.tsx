import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { ServicesBrowser } from "@/components/services-browser";
import { FaqAccordion } from "@/components/faq";
import { SERVICES, BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Interior Design Services in Lahore — 14 Services, One Studio",
  description:
    "Search and explore all Woodex Interior services in Lahore — residential, office, commercial, retail, restaurant & café interiors, 3D design, turnkey execution and custom furniture.",
  alternates: { canonical: `${BUSINESS.url}/services` },
};

const SERVICES_FAQ = [
  {
    q: "Which service should I choose for my space?",
    a: "Start with the space type — residential, office, retail, restaurant or commercial — then decide if you need design-only, design + 3D visualization, or turnkey execution. A short consultation maps the right scope in minutes.",
  },
  {
    q: "Do you provide furniture with interior design?",
    a: "Yes — Woodex Furniture, our manufacturing division, builds custom pieces to the measurements and design language of your interior: workstations, counters, wardrobes, cabinets and more.",
  },
  {
    q: "Can I see my design before execution?",
    a: "Yes. Our 3D Design & Space Planning service produces photorealistic renders, drag-around panoramas and walkthrough animations so you approve everything on screen first.",
  },
  {
    q: "Which areas do you serve?",
    a: "Our studio is at Zainab Tower, Model Town Link Road, Lahore. We consult across Lahore and coordinate projects in other cities case-by-case — reach us on WhatsApp to discuss.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SERVICES_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="Our Services"
        title="Every space, from first sketch to final cushion"
        copy="Fourteen coordinated services across interiors, planning and furniture — search, filter, and find the exact scope your project needs."
        image="/img/service-planning.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Interactive browser */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
          <ServicesBrowser services={SERVICES} />
        </div>
      </section>

      {/* SEO copy */}
      <section className="bg-gradient-marble">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Reveal><p className="eyebrow">Interior Design Company in Lahore</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(1.9rem,3.8vw,3.2rem)] text-ink">
                One accountable studio for <span className="italic text-brass-deep">design, planning & furniture</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="prose-lux">
              <p>
                Woodex Interior is a Lahore-based interior design company serving
                homeowners and businesses across the city — from DHA, Gulberg and
                Model Town to Johar Town, Bahria Town and emerging commercial hubs.
                Unlike firms that stop at drawings, Woodex pairs interior design with
                space planning, photorealistic 3D visualization and an in-house custom
                furniture division, so what you approve on screen is exactly what gets
                built.
              </p>
              <p>
                Our fourteen services cover the complete lifecycle of a space:
                residential and office interiors, commercial and retail environments,
                restaurant and café design, renovation and turnaround projects,
                exterior elevations, turnkey fit-out coordination, and bespoke
                furniture manufacturing — executive desks, workstations, reception
                counters, wardrobes and joinery built to your measurements.
              </p>
              <p>
                Every engagement begins with understanding how the space will actually
                be used. That single discipline — use before style — is what makes a
                Woodex interior work as beautifully as it looks.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/insights/interior-design-cost-lahore" className="link-arrow">
                Interior design cost guide <ArrowUpRight size={12} />
              </Link>
              <Link href="/3d-designing" className="link-arrow">
                Visit the 3D Studio <ArrowUpRight size={12} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <Reveal><p className="eyebrow">Service Questions</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(1.8rem,3.4vw,2.8rem)] text-ink">
                Choosing the <span className="italic text-brass-deep">right scope</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <FaqAccordion items={SERVICES_FAQ} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Not sure where to start?"
        title="Tell us about your space — we'll recommend the right scope"
        copy="A short conversation is usually enough to identify which services your project actually needs."
      />
    </>
  );
}
