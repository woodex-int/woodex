import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Interior Design Projects in Lahore — Woodex Portfolio",
  description:
    "Explore selected residential, office, retail and commercial interior projects by Woodex Interior in Lahore — with briefs, challenges, solutions and materials.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Woodex Portfolio"
        title="Interior design projects in Lahore"
        copy="Selected residential, office, retail and commercial work — each with its brief, design challenge, Woodex solution and materials."
        image="/img/project-1.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1500px] space-y-24 px-5 py-24 md:px-10 md:py-32 md:space-y-32">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                  i % 2 === 1 ? "" : ""
                }`}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className={`group media-zoom block lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="media-frame aspect-[16/10]">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                </Link>
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="flex items-center gap-4 text-[0.6rem] font-medium tracking-[0.35em] uppercase text-brass">
                    <span className="font-display text-base italic">{String(i + 1).padStart(2, "0")}</span>
                    {p.type}
                  </p>
                  <h2 className="font-display mt-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-tight text-ink">
                    {p.title}
                  </h2>
                  <p className="mt-4 text-[0.95rem] font-light leading-relaxed text-umber">
                    {p.summary}
                  </p>
                  <dl className="mt-7 grid grid-cols-3 gap-4 border-y border-ink/12 py-5">
                    <div>
                      <dt className="text-[0.55rem] font-medium tracking-[0.3em] uppercase text-umber">Location</dt>
                      <dd className="font-display mt-1.5 text-[0.95rem] text-ink">{p.location}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.55rem] font-medium tracking-[0.3em] uppercase text-umber">Area</dt>
                      <dd className="font-display mt-1.5 text-[0.95rem] text-ink">{p.area}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.55rem] font-medium tracking-[0.3em] uppercase text-umber">Year</dt>
                      <dd className="font-display mt-1.5 text-[0.95rem] text-ink">{p.year}</dd>
                    </div>
                  </dl>
                  <Link href={`/projects/${p.slug}`} className="link-arrow mt-7">
                    View Case Study <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Your project could be next"
        title="Have a space that deserves a case study?"
        copy="Share your location, area and requirements — we will respond with the right design approach."
      />
    </>
  );
}
