import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealImage } from "@/components/reveal";
import { SERVICES, PROJECTS, serviceBySlug, BUSINESS } from "@/lib/data";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return { title: s.metaTitle, description: s.metaDescription };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const relatedProjects = PROJECTS.filter((p) =>
    p.serviceSlugs.includes(service.slug)
  ).slice(0, 2);
  const others = SERVICES.filter(
    (s) => s.group === service.group && s.slug !== service.slug
  ).slice(0, 4);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.phoneIntl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Zainab Tower, Model Town Link Road",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
    },
    areaServed: "Lahore, Pakistan",
    description: service.metaDescription,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BUSINESS.url}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BUSINESS.url}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${BUSINESS.url}/services/${service.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHero
        eyebrow={`Services — ${service.group}`}
        title={service.headline}
        copy={service.excerpt}
        image={service.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.nav },
        ]}
      />

      {/* Intro + list */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1500px] gap-16 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow">The Service</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(2rem,4vw,3.2rem)] text-ink">
                Planned around <span className="italic text-brass-deep">your space</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="prose-lux mt-8">
                {service.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
            {service.deliverables && (
              <Reveal delay={0.3}>
                <p className="mt-10 text-[0.62rem] font-medium tracking-[0.35em] uppercase text-brass">
                  {service.slug === "custom-furniture-lahore" ? "The process" : "What clients receive"}
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {service.deliverables.map((d) => (
                    <span
                      key={d}
                      className="border border-ink/15 bg-cream px-4 py-2 text-[0.72rem] font-light tracking-wide text-ink/75"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <div>
            <Reveal delay={0.15}>
              <div className="border border-ink/12 bg-cream p-8 md:p-11">
                <h3 className="font-display text-2xl text-ink">{service.listTitle}</h3>
                <ul className="mt-7 space-y-0">
                  {service.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 border-t border-ink/10 py-3.5 text-[0.95rem] font-light text-ink/80"
                    >
                      <Check size={14} className="shrink-0 text-brass" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-gradient-marble">
          <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-28">
            <Reveal>
              <p className="eyebrow">Related Work</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-[clamp(1.9rem,3.6vw,3rem)] text-ink">
                Projects using <span className="italic text-brass-deep">this service</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {relatedProjects.map((p, i) => (
                <Reveal key={p.slug} delay={0.08 * i}>
                  <Link href={`/projects/${p.slug}`} className="group relative block overflow-hidden bg-coal">
                    <div className="media-frame aspect-[16/10]">
                      <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7">
                      <div>
                        <p className="text-[0.58rem] font-medium tracking-[0.35em] uppercase text-brass-soft">
                          {p.type} · {p.location}
                        </p>
                        <h3 className="font-display mt-2 text-2xl text-cream">{p.title}</h3>
                      </div>
                      <ArrowUpRight size={18} className="text-brass-soft transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image + other services */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-24">
          <div className="media-zoom">
            <RevealImage
              src={service.image}
              alt={service.title}
              className="aspect-[4/3]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="eyebrow">Continue Exploring</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="headline mt-6 text-[clamp(1.8rem,3.2vw,2.6rem)] text-ink">
                More in <span className="italic text-brass-deep">{service.group.toLowerCase()}</span>
              </h3>
            </Reveal>
            <div className="mt-8">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between border-t border-ink/12 py-4.5 last:border-b"
                >
                  <span className="font-display py-2 text-xl text-ink/80 transition-colors group-hover:text-brass-deep">
                    {s.title}
                  </span>
                  <ArrowUpRight size={15} className="text-brass transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title={service.cta} />
    </>
  );
}
