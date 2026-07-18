import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Woodex Interior collects, uses and protects your information.",
};

const SECTIONS = [
  {
    title: "Information we collect",
    body: "When you submit an enquiry through this website, we collect the details you provide — your name, phone number, email address, project type, location, approximate area, required services, budget range and message — solely to respond to your request.",
  },
  {
    title: "How we use it",
    body: "Your information is used only to contact you about your project, prepare consultations and quotations, and coordinate agreed services. We do not sell, rent or share your personal information with third parties for marketing.",
  },
  {
    title: "Storage & security",
    body: "Enquiry details are stored securely in our systems and retained only as long as needed to manage your project and any follow-up communication. Access is limited to the Woodex team handling your enquiry.",
  },
  {
    title: "Your choices",
    body: "You may ask us at any time to correct or delete the information you have shared by contacting us by phone, WhatsApp or email.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        copy="How Woodex Interior handles your information."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
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
