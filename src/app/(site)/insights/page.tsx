import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { ARTICLES, dateFmt } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insights — Interior Design Guides & Journal",
  description:
    "Interior design cost guides, office planning checklists and furniture advice from the Woodex Interior studio in Lahore.",
};

export default function InsightsPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <>
      <PageHero
        eyebrow="Woodex Journal"
        title="Guides, costs & design thinking"
        copy="Practical planning knowledge from our studio — written for homeowners and businesses preparing an interior project in Lahore."
        image="/img/about.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
          {/* Featured */}
          <Reveal>
            <Link
              href={`/insights/${featured.slug}`}
              className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className="media-frame media-zoom aspect-[16/10]">
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="flex items-center gap-3 text-[0.6rem] font-medium tracking-[0.35em] uppercase text-brass">
                  Featured <span className="h-px w-8 bg-brass/50" /> {featured.category}
                </p>
                <h2 className="font-display mt-5 text-[clamp(1.9rem,3.4vw,3rem)] leading-tight text-ink transition-colors duration-300 group-hover:text-brass-deep">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-lg text-[0.95rem] font-light leading-relaxed text-umber">
                  {featured.excerpt}
                </p>
                <p className="mt-5 text-[0.62rem] font-medium tracking-[0.3em] uppercase text-umber">
                  {dateFmt(featured.date)} · {featured.readTime}
                </p>
                <span className="link-arrow mt-7">
                  Read the Guide <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="my-16 h-px bg-ink/12 md:my-24" />

          {/* Grid */}
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={0.05 * i}>
                <Link href={`/insights/${a.slug}`} className="group block">
                  <div className="media-frame media-zoom aspect-[16/11]">
                    <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-6 flex items-center gap-3 text-[0.58rem] font-medium tracking-[0.32em] uppercase text-brass">
                    {a.category}
                    <span className="h-px w-6 bg-brass/50" />
                    <span className="text-umber">{a.readTime}</span>
                  </p>
                  <h3 className="font-display mt-3 text-[1.5rem] leading-snug text-ink transition-colors duration-300 group-hover:text-brass-deep">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-umber">
                    {a.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Ready when you are"
        title="Turn reading into a plan for your space"
        copy="Bring your questions to a consultation — we'll answer them around your actual floor plan."
      />
    </>
  );
}
