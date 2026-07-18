import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  image?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-espresso text-cream">
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/85 via-espresso/55 to-espresso" />
        </>
      )}
      {!image && (
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "radial-gradient(60% 80% at 80% 10%, rgba(201,168,76,0.17), transparent 60%)",
          }}
        />
      )}
      <p className="side-label absolute bottom-10 right-6 hidden text-cream/35 lg:block">
        Woodex Interior — Lahore
      </p>

      <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-40 md:px-10 md:pb-24 md:pt-52">
        {crumbs && (
          <Reveal y={12}>
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-[0.62rem] font-medium tracking-[0.3em] uppercase text-cream/50">
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-brass-soft">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-brass-soft">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span className="text-cream/25">/</span>}
                </span>
              ))}
            </nav>
          </Reveal>
        )}
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="headline mt-6 max-w-4xl text-[clamp(2.4rem,5.4vw,4.6rem)] text-cream">
            {title}
          </h1>
        </Reveal>
        {copy && (
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-cream/70 md:text-lg">
              {copy}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
