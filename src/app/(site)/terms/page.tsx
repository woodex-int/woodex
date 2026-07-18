import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing the use of the Woodex Interior website.",
};

const SECTIONS = [
  {
    title: "Website content",
    body: "Content on this website is provided for general information about Woodex Interior's services. Service scopes, timelines and pricing are confirmed individually for each project through a written proposal and agreement.",
  },
  {
    title: "Enquiries & consultations",
    body: "Submitting an enquiry does not create a contract. A project begins only when scope, deliverables, schedule and payment terms are agreed in writing by both parties.",
  },
  {
    title: "Intellectual property",
    body: "Design concepts, drawings, visualizations and text on this website belong to Woodex Interior and may not be reproduced without written permission.",
  },
  {
    title: "Accuracy",
    body: "We keep website information current, but project-specific details — including availability, service scope and delivered work — are confirmed during consultation.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        copy="Terms governing the use of this website and Woodex Interior's services."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-5 py-24 md:py-32">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={0.04 * i}>
              <div className="border-b border-ink/12 py-10 first:pt-0">
                <h2 className="font-display flex items-baseline gap-4 text-2xl text-ink">
                  <span className="text-sm italic text-brass">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <p className="mt-4 text-[0.95rem] font-light leading-relaxed text-umber">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
