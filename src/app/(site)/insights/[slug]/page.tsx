import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq";
import { Reveal, RevealImage } from "@/components/reveal";
import { ARTICLES, articleBySlug, serviceBySlug, dateFmt, BUSINESS } from "@/lib/data";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return { title: a.metaTitle, description: a.metaDescription };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const idx = ARTICLES.findIndex((a) => a.slug === slug);
  const next = ARTICLES[(idx + 1) % ARTICLES.length];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    image: `${BUSINESS.url}${article.image}`,
    author: {
      "@type": "Organization",
      name: "Woodex Interior Design Team",
      url: BUSINESS.url,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PageHero
        eyebrow={`${article.category} — ${article.readTime}`}
        title={article.title}
        copy={`Published ${dateFmt(article.date)} · By the Woodex Interior Design Team`}
        image={article.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: article.category },
        ]}
      />

      <article className="bg-ivory">
        <div className="mx-auto grid max-w-[1200px] gap-16 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1.5fr_1fr]">
          {/* Body */}
          <div>
            {/* Direct answer */}
            <Reveal>
              <div className="border-l-2 border-brass bg-cream p-8 md:p-10">
                <p className="text-[0.62rem] font-medium tracking-[0.35em] uppercase text-brass">
                  In short
                </p>
                <p className="font-display mt-4 text-xl font-normal leading-relaxed text-ink md:text-[1.4rem]">
                  {article.answer}
                </p>
              </div>
            </Reveal>

            {article.sections.map((section, i) => (
              <Reveal key={section.heading} delay={0.05}>
                <div className="mt-14">
                  <h2 className="font-display flex items-baseline gap-4 text-[clamp(1.6rem,2.8vw,2.2rem)] text-ink">
                    <span className="text-sm italic text-brass">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="prose-lux mt-6">
                    {section.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}

            {article.faqs.length > 0 && (
              <div className="mt-16">
                <Reveal>
                  <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] text-ink">
                    Frequently asked
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-6 border-t border-ink/12">
                    <FaqAccordion items={article.faqs} />
                  </div>
                </Reveal>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:pl-6">
            <div className="sticky top-32 space-y-10">
              <Reveal>
                <RevealImage
                  src={article.image}
                  alt={article.title}
                  className="aspect-[4/3]"
                />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="border border-ink/12 bg-cream p-8">
                  <p className="text-[0.62rem] font-medium tracking-[0.35em] uppercase text-brass">
                    Related services
                  </p>
                  <div className="mt-5 space-y-1">
                    {article.relatedServiceSlugs.map((s) => {
                      const sv = serviceBySlug(s);
                      if (!sv) return null;
                      return (
                        <Link
                          key={s}
                          href={`/services/${s}`}
                          className="group flex items-center justify-between border-b border-ink/10 py-3.5 last:border-b-0"
                        >
                          <span className="font-display text-lg text-ink/85 transition-colors group-hover:text-brass-deep">
                            {sv.title}
                          </span>
                          <ArrowUpRight size={14} className="text-brass" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <Link
                  href="/contact"
                  className="group block bg-espresso p-8 text-cream transition-colors duration-500 hover:bg-coal"
                >
                  <p className="text-[0.62rem] font-medium tracking-[0.35em] uppercase text-brass-soft">
                    Free scope discussion
                  </p>
                  <p className="font-display mt-4 text-2xl leading-snug">
                    Discuss your project with Woodex
                  </p>
                  <span className="link-arrow mt-6 !text-brass-soft">
                    Request a Consultation <ArrowUpRight size={12} />
                  </span>
                </Link>
              </Reveal>
            </div>
          </aside>
        </div>
      </article>

      {/* Next article */}
      <Link href={`/insights/${next.slug}`} className="group block border-t border-ink/12 bg-cream">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-5 py-16 text-center md:py-20">
          <span className="flex items-center gap-3 text-[0.6rem] font-medium tracking-[0.4em] uppercase text-brass">
            <ArrowLeft size={12} className="rotate-[135deg]" /> Next Article
          </span>
          <h2 className="font-display mt-4 max-w-2xl text-[clamp(1.6rem,3.4vw,2.8rem)] text-ink transition-colors duration-300 group-hover:text-brass-deep">
            {next.title}
          </h2>
        </div>
      </Link>

      <CtaBand
        eyebrow="Still planning?"
        title="Get answers around your actual floor plan"
        copy="Send us your plan and requirements — a consultation turns general advice into a specific proposal."
      />
    </>
  );
}
