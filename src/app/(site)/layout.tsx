import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Playfair_Display } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatWidget } from "@/components/chat-widget";
import { BUSINESS } from "@/lib/data";
import { getSettings, buildThemeCss } from "@/lib/settings";

// Theme settings are database-backed — render each request so the
// Theme Studio / Page Builder apply live without a rebuild.
export const dynamic = "force-dynamic";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "Interior Design Company in Lahore | Woodex Interior",
    template: "%s | Woodex Interior",
  },
  description:
    "Woodex Interior creates residential, office, retail and commercial interiors in Lahore, supported by space planning and custom furniture manufacturing.",
  keywords: [
    "interior design company Lahore",
    "interior designer in Lahore",
    "office interior design Lahore",
    "custom furniture Lahore",
    "Woodex Interior",
  ],
  openGraph: {
    type: "website",
    siteName: "Woodex Interior",
    title: "Interior Design Company in Lahore | Woodex Interior",
    description:
      "Residential, office, retail and commercial interiors in Lahore — supported by space planning and custom furniture.",
    images: [{ url: "/img/hero.jpg", width: 1600, height: 900, alt: "Woodex Interior" }],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
  name: BUSINESS.name,
  alternateName: BUSINESS.division,
  description:
    "Lahore-based interior design firm creating residential, office, retail and commercial spaces with custom furniture solutions.",
  url: BUSINESS.url,
  telephone: BUSINESS.phoneIntl,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zainab Tower, Model Town Link Road",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: "Lahore, Pakistan",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BUSINESS.name,
  url: BUSINESS.url,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getSettings();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${montserrat.variable}`}
    >
      <body>
        {/* Live theme injection from the master dashboard */}
        <style dangerouslySetInnerHTML={{ __html: buildThemeCss(site) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <div className="grain-overlay" aria-hidden="true" />
        <SiteHeader
          ctaLabel={site.header.ctaLabel}
          headerStyle={site.header.style}
          visiblePages={site.visiblePages}
        />
        <main>{children}</main>
        <SiteFooter tagline={site.footer.tagline} stylePreset={site.footer.style} />
        <ChatWidget />
      </body>
    </html>
  );
}
