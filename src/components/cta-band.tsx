import Link from "next/link";
import { Phone } from "lucide-react";
import { Parallax, Reveal } from "@/components/reveal";
import { BUSINESS } from "@/lib/data";

export function CtaBand({
  eyebrow = "Start Your Interior Project",
  title = "Planning a new interior, workplace or retail space?",
  copy = "Speak with Woodex Interior about your requirements, preferred design direction and project scope.",
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-espresso text-cream">
      <Parallax className="absolute inset-0" speed={0.14}>
        <img
          src="/img/cta.jpg"
          alt="Moody Woodex interior with warm brass light"
          className="h-full w-full object-cover opacity-55"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/40 to-espresso/85" />

      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center md:px-10 md:py-40">
        <Reveal>
          <p className="eyebrow eyebrow--plain justify-center">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="headline mt-7 text-[clamp(2.2rem,5vw,4.2rem)] text-cream">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-cream/70">
            {copy}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn btn-brass">
              Request a Consultation
            </Link>
            <a href={BUSINESS.phoneHref} className="btn btn-outline-light">
              <Phone size={13} /> {BUSINESS.phone}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-9 text-[0.62rem] font-medium tracking-[0.35em] uppercase text-cream/45">
            {BUSINESS.addressLines.join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
