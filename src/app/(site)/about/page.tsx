import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealImage } from "@/components/reveal";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Woodex Interior — Interior Design Firm in Lahore",
  description:
    "Learn about Woodex Interior, a Lahore interior design firm specializing in residential, office, commercial, retail and custom furniture solutions.",
};

const WHAT_WE_DESIGN = [
  "Residential interiors",
  "Office and workplace interiors",
  "Retail stores",
  "Commercial spaces",
  "Customized office furniture",
  "Customized home furniture",
  "Space planning and visual concepts",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Woodex"
        title="A Lahore interior design & custom furniture studio"
        copy="Woodex Interior is an interior design firm based in Lahore, creating residential and commercial spaces supported by customized furniture solutions."
        image="/img/about.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1500px] gap-16 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-24">
          <div className="media-zoom">
            <RevealImage
              src="/img/about.jpg"
              alt="Woodex studio — materials, drawings and finish palettes"
              className="aspect-[4/5]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="eyebrow">Our Approach</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(2rem,4vw,3.4rem)] text-ink">
                Appearance, purpose &amp; <span className="italic text-brass-deep">practical use</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="prose-lux mt-8">
                <p>
                  We believe interior design should bring together appearance, purpose
                  and practical use. A visually impressive environment is only
                  successful when it also supports comfort, movement, storage and
                  everyday activities.
                </p>
                <p>
                  Our process begins with understanding the client's priorities. We
                  then develop the layout, visual direction, materials and furniture
                  requirements around the space.
                </p>
                <p>
                  Our work includes home interiors, office environments, workplace
                  planning, retail spaces and furniture designed around the dimensions
                  and requirements of each project.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we design */}
      <section className="bg-gradient-marble">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow">What We Design</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(2rem,4vw,3.4rem)] text-ink">
                Every space, <span className="italic text-brass-deep">considered</span>
              </h2>
            </Reveal>
          </div>
          <div>
            {WHAT_WE_DESIGN.map((item, i) => (
              <Reveal key={item} delay={0.05 * i}>
                <div className="group flex items-baseline gap-6 border-b border-ink/12 py-6 first:border-t">
                  <span className="font-display text-sm italic text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-2xl font-normal text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Woodex Furniture division */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-24">
          <div className="lg:order-2">
            <div className="media-zoom">
              <RevealImage
                src="/img/service-furniture.jpg"
                alt="Custom furniture crafted by Woodex Furniture"
                className="aspect-[4/3]"
              />
            </div>
          </div>
          <div className="lg:order-1">
            <Reveal>
              <p className="eyebrow">One Roof, Two Crafts</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(2rem,4vw,3.4rem)] text-ink">
                Woodex Furniture — <span className="italic text-brass-deep">our manufacturing division</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="prose-lux mt-8">
                <p>
                  Furniture has a major influence on how a space looks and functions.
                  Through Woodex Furniture — the custom furniture division of Woodex
                  Interior — we design and manufacture pieces around the measurements,
                  function and visual language of each interior.
                </p>
                <p>
                  Office tables, workstations, reception counters, wardrobes, cabinets,
                  beds, side tables and display units — built to fit the space they
                  belong to.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <Link href="/services/custom-furniture-lahore" className="link-arrow mt-9">
                Explore Custom Furniture <ArrowUpRight size={13} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Studio / team honesty panel */}
      <section className="bg-espresso text-cream">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow">The Studio</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(2rem,4vw,3.4rem)]">
                Designers, planners &amp; <span className="italic text-brass-soft">craftsmen</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-cream/65">
                Our team brings together interior designers, space planners and
                furniture craftsmen working from our Lahore studio at Zainab Tower.
                Individual team profiles are being documented and will be published
                here shortly.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="grid gap-px overflow-hidden border border-cream/10 bg-cream/10 sm:grid-cols-2">
              <div className="bg-espresso p-9">
                <MapPin size={18} className="text-brass-soft" />
                <p className="mt-5 text-[0.58rem] font-medium tracking-[0.35em] uppercase text-cream/50">
                  Studio
                </p>
                <p className="font-display mt-2 text-xl leading-snug">
                  {BUSINESS.addressLines.join(", ")}
                </p>
              </div>
              <div className="bg-espresso p-9">
                <Phone size={18} className="text-brass-soft" />
                <p className="mt-5 text-[0.58rem] font-medium tracking-[0.35em] uppercase text-cream/50">
                  Contact
                </p>
                <p className="font-display mt-2 text-xl leading-snug">
                  {BUSINESS.phone}
                  <span className="mt-1 block text-sm text-cream/50">{BUSINESS.landline}</span>
                </p>
              </div>
              <div className="bg-espresso p-9 sm:col-span-2">
                <Mail size={18} className="text-brass-soft" />
                <p className="mt-5 text-[0.58rem] font-medium tracking-[0.35em] uppercase text-cream/50">
                  Write to us
                </p>
                <p className="font-display mt-2 text-xl">{BUSINESS.email}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Have a project in mind?"
        title="Discuss your space with Woodex Interior"
        copy="From a single room to a complete workplace — tell us what you are planning and we will shape the next steps together."
      />
    </>
  );
}
