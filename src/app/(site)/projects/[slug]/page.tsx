import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealImage } from "@/components/reveal";
import { PanoramaViewer } from "@/components/panorama";
import { PROJECTS, projectBySlug, serviceBySlug, PANORAMAS } from "@/lib/data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.type} in ${p.location}`,
    description: p.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      <PageHero
        eyebrow={`${project.type} — ${project.year}`}
        title={project.title}
        copy={project.summary}
        image={project.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      {/* Meta + narrative */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { k: "01", label: "Client Brief", text: project.brief },
              { k: "02", label: "The Challenge", text: project.challenge },
              { k: "03", label: "Woodex Solution", text: project.solution },
            ].map((block, i) => (
              <Reveal key={block.k} delay={0.08 * i}>
                <div className="h-full border-t-2 border-brass/60 bg-cream p-8 md:p-10">
                  <span className="font-display text-sm italic text-brass">{block.k}</span>
                  <h2 className="font-display mt-3 text-2xl text-ink">{block.label}</h2>
                  <p className="mt-4 text-[0.95rem] font-light leading-relaxed text-umber">
                    {block.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-2 gap-y-6 border border-ink/12 bg-cream px-8 py-7 sm:grid-cols-4 md:px-11">
              {[
                ["Location", project.location],
                ["Type", project.type],
                ["Approx. Area", project.area],
                ["Completed", project.year],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.55rem] font-medium tracking-[0.32em] uppercase text-umber">{k}</dt>
                  <dd className="font-display mt-1.5 text-lg text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-28">
          <Reveal>
            <p className="eyebrow">The Space</p>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="media-zoom lg:row-span-2">
              <RevealImage
                src={project.gallery[0]}
                alt={`${project.title} — main view`}
                className="aspect-[3/4] lg:aspect-auto lg:h-full"
              />
            </div>
            <div className="media-zoom">
              <RevealImage
                src={project.gallery[1]}
                alt={`${project.title} — detail view`}
                className="aspect-[4/3]"
                delay={0.1}
              />
            </div>
            <div className="media-zoom">
              <RevealImage
                src={project.gallery[2]}
                alt={`${project.title} — material detail`}
                className="aspect-[4/3]"
                delay={0.2}
              />
            </div>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <Reveal>
              <p className="text-[0.62rem] font-medium tracking-[0.35em] uppercase text-brass">
                Materials & Finishes
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {project.materials.map((m) => (
                  <span key={m} className="border border-ink/15 bg-ivory px-4 py-2 text-[0.72rem] font-light text-ink/75">
                    {m}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[0.62rem] font-medium tracking-[0.35em] uppercase text-brass">
                Services Delivered
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {project.services.map((s) => (
                  <span key={s} className="border border-brass/40 bg-brass/10 px-4 py-2 text-[0.72rem] font-light text-brass-deep">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Related services */}
          <Reveal delay={0.15}>
            <div className="mt-16 border-t border-ink/12 pt-10">
              <p className="text-[0.62rem] font-medium tracking-[0.35em] uppercase text-umber">
                Related services
              </p>
              <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
                {project.serviceSlugs.map((s) => {
                  const sv = serviceBySlug(s);
                  if (!sv) return null;
                  return (
                    <Link key={s} href={`/services/${s}`} className="link-arrow">
                      {sv.title} <ArrowUpRight size={12} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Panoramic display */}
      <section className="bg-gradient-section-dark text-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow">Panoramic Project Display</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="headline mt-6 text-[clamp(1.9rem,3.8vw,3.2rem)]">
                  Stand inside <span className="italic gold-shimmer-text">the project</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-xs text-sm font-light leading-relaxed text-cream/60">
                Drag to explore the space in a full panoramic sweep.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <PanoramaViewer
              src={PANORAMAS[idx % PANORAMAS.length].src}
              title={project.title}
              meta="Project Panorama"
              className="h-[340px] w-full md:h-[520px]"
            />
          </Reveal>
        </div>
      </section>

      {/* Next project */}
      <Link href={`/projects/${next.slug}`} className="group relative block overflow-hidden bg-espresso">
        <img
          src={next.image}
          alt={next.title}
          className="absolute inset-0 h-full w-full object-cover opacity-30 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
        />
        <div className="relative mx-auto flex max-w-[1500px] flex-col items-center px-5 py-24 text-center md:py-32">
          <span className="flex items-center gap-3 text-[0.6rem] font-medium tracking-[0.4em] uppercase text-brass-soft">
            <ArrowLeft size={12} className="rotate-[135deg]" /> Next Project
          </span>
          <h2 className="font-display mt-5 text-[clamp(2rem,5vw,4rem)] text-cream transition-transform duration-500 group-hover:-translate-y-1">
            {next.title}
          </h2>
          <p className="mt-3 text-[0.62rem] font-medium tracking-[0.35em] uppercase text-cream/50">
            {next.type} · {next.location}
          </p>
        </div>
      </Link>

      <CtaBand
        eyebrow="Project Enquiry"
        title="Want a similar result for your space?"
        copy="Tell us your location, area and what you liked about this project — we will take it from there."
      />
    </>
  );
}
