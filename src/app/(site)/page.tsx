import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Sparkles, Check, MapPin, Phone } from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { ServicesIndex } from "@/components/services-index";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq";
import { Reveal, RevealImage, Parallax } from "@/components/reveal";
import { BUSINESS, PROCESS, WHY_WOODEX, HOME_FAQS, PROJECTS, ARTICLES, dateFmt } from "@/lib/data";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Interior Design Company in Lahore | Woodex Interior",
  description:
    "Woodex Interior creates residential, office, retail and commercial interiors in Lahore, supported by space planning and custom furniture.",
};

const MARQUEE_ITEMS = [
  "Residential Interiors",
  "Office & Workspace",
  "Retail & Commercial",
  "Custom Furniture",
  "Space Planning",
  "3D Visualization",
  "Turnkey Fit-Out",
  "Woodwork & Joinery",
];

/* ── Section blocks (page-builder units) ───────────────── */

const Marquee = (
  <div className="overflow-hidden border-y border-brass/25 bg-espresso py-5">
    <div className="animate-marquee flex w-max items-center">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={`${dup}-${item}`}
              className="flex items-center gap-10 pr-10 text-[0.68rem] font-medium tracking-[0.42em] uppercase text-cream/65"
            >
              {item}
              <Sparkles size={12} className="text-brass" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const Intro = (
  <section className="relative overflow-hidden bg-ivory">
    <div className="mx-auto grid max-w-[1500px] gap-16 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-2 lg:gap-24">
      <div className="flex flex-col justify-center">
        <Reveal><p className="eyebrow">Interior Design Built Around Your Space</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="headline mt-7 text-[clamp(2rem,5.5vw,3.9rem)] text-ink">
            More than beautiful — <span className="italic text-brass-deep">designed to work</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="prose-lux mt-8 max-w-xl">
            <p>A successful interior should do more than look attractive. It should improve movement, comfort, storage, productivity and the overall experience of the space.</p>
            <p>Woodex Interior works with homeowners and businesses in Lahore to develop interior solutions based on their requirements, available area, preferred style and budget. Every project begins with understanding how the space will be used — before decisions are made about layouts, finishes, furniture, lighting and décor.</p>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <Link href="/about" className="link-arrow mt-10">About Woodex Interior <ArrowUpRight size={13} /></Link>
        </Reveal>
      </div>
      <div className="relative">
        <RevealImage src="/img/about.jpg" alt="Woodex design studio — material palettes and drawings" className="aspect-[4/5]" />
        <Reveal delay={0.25} className="absolute -bottom-10 -left-6 hidden w-64 md:block lg:-left-16">
          <div className="media-frame media-zoom aspect-square border-[10px] border-ivory">
            <img src="/img/service-furniture.jpg" alt="Custom walnut furniture craftsmanship" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="absolute right-5 top-5 flex items-center gap-2 border border-cream/30 bg-espresso/70 px-4 py-2.5 backdrop-blur-sm">
            <MapPin size={12} className="text-brass-soft" />
            <span className="text-[0.58rem] font-medium tracking-[0.3em] uppercase text-cream">{BUSINESS.addressShort}</span>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Services = (
  <section className="bg-cream">
    <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
        <div>
          <Reveal><p className="eyebrow">Our Turnkey Services</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="headline mt-6 max-w-2xl text-[clamp(2rem,5.5vw,3.9rem)] text-ink">
              One studio for <span className="italic text-brass-deep">every space</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link href="/services" className="btn btn-outline-dark">All Services <ArrowUpRight size={13} /></Link>
        </Reveal>
      </div>
      <ServicesIndex />
    </div>
  </section>
);

const OfficeFeature = (
  <section className="bg-parchment">
    <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-24">
      <div className="media-zoom">
        <RevealImage src="/img/service-office.jpg" alt="Executive office interior with walnut paneling" className="aspect-[4/3]" />
      </div>
      <div>
        <Reveal><p className="eyebrow">Office & Workspace Design</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="headline mt-6 text-[clamp(1.9rem,4.5vw,3.4rem)] text-ink">
            Workplaces planned around <span className="italic text-brass-deep">how teams work</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="prose-lux mt-7">
            <p>We plan workplaces around how teams communicate, concentrate, collaborate and move through the environment — reception areas, workstations, executive offices, meeting rooms, storage, breakout spaces and custom office furniture.</p>
            <p>Each element supports both daily operations and the organization's visual identity, so the workplace feels professional, organized and appropriate for the business using it.</p>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <Link href="/services/office-interior-design-lahore" className="link-arrow mt-9">Explore Office Interior Design <ArrowUpRight size={13} /></Link>
        </Reveal>
      </div>
    </div>
  </section>
);

const FurnitureFeature = (
  <section className="bg-ivory">
    <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-24">
      <div className="media-zoom lg:order-2">
        <RevealImage src="/img/service-furniture.jpg" alt="Bespoke walnut desk with brass inlay by Woodex Furniture" className="aspect-[4/3]" />
      </div>
      <div className="lg:order-1">
        <Reveal><p className="eyebrow">Woodex Furniture Division</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="headline mt-6 text-[clamp(1.9rem,4.5vw,3.4rem)] text-ink">
            Custom furniture, <span className="italic text-brass-deep">designed with the interior</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="prose-lux mt-7">
            <p>Standard furniture rarely provides the correct dimensions, storage capacity or design consistency. Woodex develops purpose-built furniture — office tables, workstations, reception counters, wardrobes, cabinets and display units — planned around the measurements and visual language of your interior.</p>
            <p>Designing the furniture alongside the interior creates better proportions, stronger visual consistency and more effective use of space.</p>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <Link href="/services/custom-furniture-lahore" className="link-arrow mt-9">Explore Custom Furniture <ArrowUpRight size={13} /></Link>
        </Reveal>
      </div>
    </div>
  </section>
);

const Process = (
  <section className="bg-gradient-section-dark relative overflow-hidden text-cream">
    <div className="absolute inset-0" style={{ background: "radial-gradient(50% 60% at 15% 0%, rgba(201,168,76,0.13), transparent 60%)" }} />
    <div className="relative mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
      <div className="mb-16 max-w-2xl md:mb-24">
        <Reveal><p className="eyebrow">The Woodex Process</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="headline mt-6 text-[clamp(2rem,5.5vw,3.9rem)]">
            Six steps from <span className="italic text-brass-soft">first conversation</span> to final review
          </h2>
        </Reveal>
      </div>
      <div className="grid gap-px overflow-hidden border border-brass/20 bg-brass/15 sm:grid-cols-2 lg:grid-cols-3">
        {PROCESS.map((step, i) => (
          <Reveal key={step.n} delay={0.08 * i} className="bg-espresso">
            <div className="group relative flex h-full flex-col p-9 transition-colors duration-500 hover:bg-coal md:p-11">
              <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-brass/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="font-display text-4xl font-light italic text-brass-soft/70 transition-colors duration-500 group-hover:text-gold-shimmer">{step.n}</span>
              <h3 className="font-display mt-7 text-2xl text-cream">{step.title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-cream/60">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Projects = (
  <section className="bg-ivory">
    <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
        <div>
          <Reveal><p className="eyebrow">Selected Work</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="headline mt-6 max-w-2xl text-[clamp(2rem,5.5vw,3.9rem)] text-ink">
              Projects across <span className="italic text-brass-deep">Lahore</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link href="/projects" className="btn btn-outline-dark">View the Portfolio <ArrowUpRight size={13} /></Link>
        </Reveal>
      </div>
      <div className="grid gap-6 md:grid-cols-12">
        {PROJECTS.map((p, i) => {
          const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
          return (
            <Reveal key={p.slug} delay={0.06 * i} className={spans[i % 4]}>
              <Link href={`/projects/${p.slug}`} className="group relative block overflow-hidden bg-coal">
                <div className="media-frame aspect-[4/3]">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 md:p-9">
                  <div>
                    <p className="text-[0.58rem] font-medium tracking-[0.35em] uppercase text-brass-soft">{p.type} · {p.location}</p>
                    <h3 className="font-display mt-2.5 text-2xl text-cream md:text-3xl">{p.title}</h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream transition-all duration-500 group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:text-espresso">
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const WhyWoodex = (
  <section className="bg-gradient-marble overflow-hidden">
    <div className="mx-auto grid max-w-[1500px] gap-16 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
      <div>
        <Reveal><p className="eyebrow">Why Work With Woodex</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="headline mt-6 text-[clamp(2rem,5vw,3.7rem)] text-ink">
            Design, workspace planning &amp; furniture — <span className="italic text-brass-deep">one coordinated team</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="media-zoom mt-12 hidden lg:block">
          <Parallax className="aspect-[16/10]">
            <img src="/img/cta.jpg" alt="Moody interior vignette with brass light" className="h-full w-full object-cover" />
          </Parallax>
        </Reveal>
      </div>
      <div className="flex flex-col justify-center">
        {WHY_WOODEX.map((point, i) => (
          <Reveal key={point} delay={0.06 * i}>
            <div className="flex items-start gap-5 border-b border-ink/12 py-6 first:border-t">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brass/50 text-brass-deep">
                <Check size={13} strokeWidth={2} />
              </span>
              <p className="font-display text-xl font-normal text-ink md:text-[1.35rem]">{point}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.4}>
          <a href={BUSINESS.phoneHref} className="link-arrow mt-10">
            <Phone size={13} /> {BUSINESS.phone} — Call or WhatsApp
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);

const Insights = (
  <section className="bg-cream">
    <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
        <div>
          <Reveal><p className="eyebrow">Insights</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="headline mt-6 text-[clamp(2rem,5.5vw,3.9rem)] text-ink">
              Planning <span className="italic text-brass-deep">guides</span> &amp; journal
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link href="/insights" className="btn btn-outline-dark">All Insights <ArrowUpRight size={13} /></Link>
        </Reveal>
      </div>
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {ARTICLES.slice(0, 3).map((a, i) => (
          <Reveal key={a.slug} delay={0.08 * i}>
            <Link href={`/insights/${a.slug}`} className="group block">
              <div className="media-frame media-zoom aspect-[16/11]">
                <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
              </div>
              <p className="mt-6 flex items-center gap-3 text-[0.58rem] font-medium tracking-[0.32em] uppercase text-brass">
                {a.category} <span className="h-px w-6 bg-brass/50" />
                <span className="text-umber">{dateFmt(a.date)}</span>
              </p>
              <h3 className="font-display mt-3 text-[1.55rem] leading-snug text-ink transition-colors duration-300 group-hover:text-brass-deep">{a.title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-umber">{a.excerpt}</p>
              <span className="link-arrow mt-5">Read Article <ArrowUpRight size={12} /></span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Faq = (
  <section className="bg-ivory">
    <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
      <div>
        <Reveal><p className="eyebrow">Common Questions</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="headline mt-6 text-[clamp(1.9rem,4.5vw,3.4rem)] text-ink">
            Everything, <span className="italic text-brass-deep">answered</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-umber">
            Still curious about something? Call or WhatsApp us directly — a real person from our studio will respond.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.15}><FaqAccordion items={HOME_FAQS} /></Reveal>
    </div>
  </section>
);

/* ── Homepage — assembled from dashboard section order ─── */

export default async function HomePage() {
  const site = await getSettings();

  const SECTIONS: Record<string, ReactNode> = {
    hero: <HomeHero content={site.hero} />,
    marquee: Marquee,
    intro: Intro,
    services: Services,
    office: OfficeFeature,
    furniture: FurnitureFeature,
    process: Process,
    projects: Projects,
    why: WhyWoodex,
    insights: Insights,
    faq: Faq,
    cta: <CtaBand />,
  };

  const knownIds = Object.keys(SECTIONS);
  const ordered = [
    ...site.homeSections.filter((s) => knownIds.includes(s.id)),
    // ensure any newly added defaults appear even if DB order is stale
    ...site.homeSections.length < knownIds.length
      ? knownIds
          .filter((id) => !site.homeSections.some((s) => s.id === id))
          .map((id) => ({ id, enabled: true, label: id }))
      : [],
  ];

  return (
    <>
      {ordered
        .filter((s) => s.enabled)
        .map((s) => (
          <div key={s.id}>{SECTIONS[s.id]}</div>
        ))}
    </>
  );
}
