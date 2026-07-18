import { BUSINESS, SERVICES, PROJECTS, PROCESS, HOME_FAQS } from "@/lib/data";

export type ChatSuggestion = { label: string; href: string };
export type ChatReply = {
  reply: string;
  suggestions: ChatSuggestion[];
  action?: "book-appointment";
};

const has = (t: string, ...words: string[]) =>
  words.some((w) => t.includes(w));

const wa = `${BUSINESS.whatsapp}?text=${encodeURIComponent(
  "Hello Woodex! I'd like to discuss my project."
)}`;

const contact: ChatSuggestion[] = [
  { label: "Book a consultation", href: wa },
  { label: "Contact page", href: "/contact" },
  { label: `Call ${BUSINESS.phone}`, href: BUSINESS.phoneHref },
];

function serviceReply(t: string): ChatReply | null {
  const match = SERVICES.find((s) => {
    const n = `${s.nav} ${s.title} ${s.slug}`.toLowerCase();
    return (
      has(t, ...n.split(/[\s&-]+/).filter((w) => w.length > 3)) &&
      (has(t, ...s.nav.toLowerCase().split(" ")) || has(t, s.slug.split("-")[0]))
    );
  });
  // Prioritized keyword → service matching
  const rules: [string[], string][] = [
    [["office", "workspace", "corporate", "workstation"], "office-interior-design-lahore"],
    [["restaurant", "dining", "food"], "restaurant-interior-design-lahore"],
    [["cafe", "café", "coffee"], "cafe-interior-design-lahore"],
    [["3d", "visual", "render", "walkthrough", "panorama", "virtual"], "3d-interior-design-space-planning-lahore"],
    [["renov", "remodel", "refurbish"], "interior-renovation-lahore"],
    [["retail", "shop", "store", "boutique", "showroom"], "retail-shop-interior-design-lahore"],
    [["resident", "home", "house", "apartment", "bedroom", "kitchen", "living"], "residential-interior-design-lahore"],
    [["commerc", "clinic", "salon"], "commercial-interior-design-lahore"],
    [["turnkey", "fit-out", "fitout", "execution"], "turnkey-interior-solutions-lahore"],
    [["office furniture", "workstation", "desk", "conference"], "office-furniture-lahore"],
    [["furniture", "wardrobe", "bed", "table", "cabinet"], "custom-furniture-lahore"],
    [["carpenter", "woodwork", "joinery", "paneling"], "carpenter-services-lahore"],
    [["exterior", "elevation", "facade", "façade"], "exterior-design-lahore"],
    [["interior"], "interior-design-lahore"],
  ];
  const slug = match?.slug ?? rules.find(([k]) => has(t, ...k))?.[1];
  if (!slug) return null;
  const s = SERVICES.find((x) => x.slug === slug)!;
  return {
    reply: `${s.title} — ${s.excerpt}\n\nScope typically includes: ${s.list.slice(0, 5).join(", ").toLowerCase()} and more. ${s.cta}`,
    suggestions: [
      { label: `View ${s.nav}`, href: `/services/${s.slug}` },
      { label: "Get a quotation", href: wa },
      ...contact.slice(1, 2),
    ],
  };
}

export function answer(userText: string): ChatReply {
  const t = userText.toLowerCase().trim();

  // Booking intent → trigger appointment form in the assistant
  if (
    /\b(book|booking|appoint|appointment|schedule|meeting|visit|consultation)\b/.test(t)
  ) {
    return {
      reply: `I'd love to arrange that for you! Please share a few details below and I'll send your booking straight to our design team on WhatsApp — they usually confirm within the hour.`,
      suggestions: [],
      action: "book-appointment",
    };
  }

  if (/^(hi|hello|hey|salam|assalam|aoa|good\s(morning|evening|afternoon))\b/.test(t)) {
    return {
      reply: `Assalam-o-Alaikum! Welcome to Woodex Interior — Lahore's studio for residential, office, retail and commercial interiors with custom furniture. What are you planning?`,
      suggestions: [
        { label: "Interior design services", href: "/services" },
        { label: "See projects", href: "/projects" },
        { label: "Book an appointment", href: "action:book-appointment" },
      ],
    };
  }

  if (has(t, "price", "cost", "rate", "charges", "fee", "budget", "quotation", "quote")) {
    return {
      reply: `Interior pricing depends on four things: covered area, design scope (layout-only or full 3D with supervision), material choices, and custom furniture. The most accurate path is a free scope discussion — share your location, area and requirements and we'll return a written quotation. Our planning guides explain the cost drivers in detail.`,
      suggestions: [
        { label: "Interior cost guide", href: "/insights/interior-design-cost-lahore" },
        { label: "Office cost guide", href: "/insights/office-interior-design-cost-lahore" },
        { label: "Request a quotation", href: wa },
      ],
    };
  }

  if (has(t, "where", "location", "address", "located", "direction", "map", "visit")) {
    return {
      reply: `We're at ${BUSINESS.addressLines.join(", ")}. Studio visits are by appointment — call or WhatsApp ${BUSINESS.phone} and we'll schedule you in.`,
      suggestions: [
        { label: "Contact & directions", href: "/contact" },
        { label: "WhatsApp us", href: wa },
      ],
    };
  }

  if (has(t, "phone", "number", "call", "whatsapp", "contact", "email", "talk", "human", "person")) {
    return {
      reply: `You can reach the Woodex team directly:\n· Mobile/WhatsApp: ${BUSINESS.phone}\n· Landline: ${BUSINESS.landline}\n· Email: ${BUSINESS.email}\nWe respond within one business day — usually much faster on WhatsApp.`,
      suggestions: contact,
    };
  }

  if (has(t, "3d", "visual", "render", "walkthrough", "panorama", "virtual", "see my")) {
    return {
      reply: `Our 3D Studio lets you see your space before it's built — photorealistic renders, 360° panoramas you can drag through, and walkthrough animations. Send your floor plan and room photos to start; a typical room set takes one to two weeks.`,
      suggestions: [
        { label: "Enter the 3D Studio", href: "/3d-designing" },
        { label: "3D design service", href: "/services/3d-interior-design-space-planning-lahore" },
        { label: "WhatsApp your plan", href: wa },
      ],
    };
  }

  if (has(t, "furniture") && has(t, "office", "work", "desk")) {
    return serviceReply("office furniture")!;
  }

  const service = serviceReply(t);
  if (service) return service;

  if (has(t, "service", "offer", "do you do", "what do you", "provide")) {
    return {
      reply: `Woodex offers ${SERVICES.length} coordinated services across three groups:\n· Interiors — residential, office, commercial, retail, restaurant & café\n· Planning & execution — 3D design, turnkey, renovation, exterior\n· Furniture & woodwork — custom furniture, office furniture, carpentry\nWhich space are you working on?`,
      suggestions: [
        { label: "All services", href: "/services" },
        { label: "Book a consultation", href: wa },
      ],
    };
  }

  if (has(t, "project", "portfolio", "work", "examples", "case stud")) {
    return {
      reply: `Take a look at our portfolio — ${PROJECTS.length} detailed case studies including an executive office reception in Gulberg, a boutique retail store in Model Town, a family residence in DHA and a café in Johar Town. Each includes the brief, challenge, solution and materials.`,
      suggestions: [
        { label: "View portfolio", href: "/projects" },
        { label: "Start your project", href: wa },
      ],
    };
  }

  if (has(t, "process", "how it work", "steps", "procedure", "timeline", "how long")) {
    return {
      reply: `Our process has ${PROCESS.length} steps: ${PROCESS.map((p) => p.title).join(" → ")}. Consultation is free — most proposals are ready within a few days of the site review.`,
      suggestions: [{ label: "Book step one", href: wa }, ...contact.slice(1)],
    };
  }

  if (has(t, "hour", "open", "timing", "when")) {
    return {
      reply: `The studio at Zainab Tower, Model Town works by appointment — call or WhatsApp ${BUSINESS.phone} any time and we'll schedule your visit or call.`,
      suggestions: contact,
    };
  }

  if (has(t, "thank", "shukria", "great", "nice", "awesome")) {
    return {
      reply: `You're most welcome! Whenever you're ready, the team is one message away at ${BUSINESS.phone}. Have a wonderful day.`,
      suggestions: [{ label: "Explore services", href: "/services" }],
    };
  }

  const faq = HOME_FAQS.find((f) =>
    f.q.toLowerCase().split(" ").some((w) => w.length > 4 && t.includes(w))
  );
  if (faq) {
    return { reply: faq.a, suggestions: contact.slice(0, 2) };
  }

  return {
    reply: `I can help with Woodex services, pricing guidance, our process, portfolio, location, or booking a consultation — just ask! For anything specific, the design team replies on WhatsApp within business hours.`,
    suggestions: [
      { label: "Our services", href: "/services" },
      { label: "Book an appointment", href: "action:book-appointment" },
      { label: "WhatsApp the team", href: wa },
    ],
  };
}
