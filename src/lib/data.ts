/* ─────────────────────────────────────────────────────────────
   WOODEX INTERIOR — Master content model
   Single source of truth for navigation, services, projects,
   insights and business information used across the theme.
   ───────────────────────────────────────────────────────────── */

export const BUSINESS = {
  name: "Woodex Interior",
  division: "Woodex Furniture",
  tagline: "Interior design, workspace planning and custom furniture — under one roof.",
  phone: "0322 4000768",
  phoneIntl: "+92 322 4000768",
  phoneHref: "tel:+92322400768",
  landline: "042 35942471",
  landlineHref: "tel:+924235942471",
  whatsapp: "https://wa.me/92322400768",
  email: "info@woodex.com.pk",
  addressLines: ["Zainab Tower", "Model Town Link Road", "Lahore, Punjab, Pakistan"],
  addressShort: "Model Town, Lahore",
  city: "Lahore",
  country: "Pakistan",
  url: "https://woodex.com.pk",
};

export type Service = {
  slug: string;
  nav: string;
  title: string;
  group: "Interiors" | "Planning & Execution" | "Furniture & Woodwork";
  image: string;
  excerpt: string;
  headline: string;
  intro: string[];
  listTitle: string;
  list: string[];
  deliverables?: string[];
  cta: string;
  metaTitle: string;
  metaDescription: string;
};

export const SERVICES: Service[] = [
  {
    slug: "interior-design-lahore",
    nav: "Interior Design",
    title: "Interior Design in Lahore",
    group: "Interiors",
    image: "/img/hero.jpg",
    excerpt:
      "Complete interior design for homes and businesses — layout, materials, lighting, furniture and styling planned as one vision.",
    headline: "Interior Designer in Lahore for Functional, Personalized Spaces",
    intro: [
      "Woodex Interior provides interior design services for homeowners and businesses across Lahore. We plan spaces around their purpose, available area, preferred style and functional requirements.",
      "Our design scope can include layout planning, color and material selection, lighting direction, furniture planning, storage solutions, decorative elements and project coordination.",
    ],
    listTitle: "Interior design services",
    list: [
      "Concept development",
      "Space planning",
      "Furniture layouts",
      "Color and material selection",
      "Lighting planning",
      "Ceiling and feature-wall concepts",
      "Custom furniture design",
      "3D interior visualization",
      "Residential interiors",
      "Commercial interiors",
    ],
    deliverables: [
      "Site survey",
      "Concept or mood board",
      "Furniture layout",
      "2D drawings",
      "3D views",
      "Material schedule",
      "Furniture specifications",
      "Project estimate",
      "Execution supervision",
    ],
    cta: "Tell us about your space and request an interior design consultation.",
    metaTitle: "Interior Designer in Lahore | Woodex Interior",
    metaDescription:
      "Looking for an interior designer in Lahore? Woodex creates residential, office, retail and commercial interiors with custom furniture solutions.",
  },
  {
    slug: "residential-interior-design-lahore",
    nav: "Residential Interiors",
    title: "Residential Interior Design",
    group: "Interiors",
    image: "/img/service-residential.jpg",
    excerpt:
      "Personalized interiors for living rooms, bedrooms, kitchens and complete residences — designed around how your family lives.",
    headline: "Home and Residential Interior Design in Lahore",
    intro: [
      "Your home should reflect how you live, not simply follow a design template.",
      "Woodex Interior creates personalized residential environments by considering family requirements, room dimensions, circulation, storage, lighting, furniture and preferred visual style.",
      "Good home design improves everyday activities. Furniture should fit the available area, storage should be accessible, lighting should support different uses and materials should be suitable for long-term maintenance.",
    ],
    listTitle: "Residential spaces we design",
    list: [
      "Living rooms",
      "Drawing rooms",
      "Bedrooms",
      "Dining spaces",
      "Kitchens",
      "Home offices",
      "Children's rooms",
      "TV lounges",
      "Entrance areas",
      "Complete homes and apartments",
    ],
    cta: "Share your house plan, room photographs or site location to begin your residential interior project.",
    metaTitle: "Home Interior Design in Lahore | Woodex Interior",
    metaDescription:
      "Personalized home interior design in Lahore for living rooms, bedrooms, kitchens and complete residences. Plan your space with Woodex Interior.",
  },
  {
    slug: "office-interior-design-lahore",
    nav: "Office Interiors",
    title: "Office Interior Design",
    group: "Interiors",
    image: "/img/service-office.jpg",
    excerpt:
      "Workplaces planned around workflow, privacy and brand identity — from reception to workstations and executive suites.",
    headline: "Office Interior Design in Lahore",
    intro: [
      "An office should support productivity, communication and employee comfort while presenting a professional image to clients.",
      "Woodex Interior plans office environments around team size, workflow, privacy, storage, technology requirements and future growth.",
      "Because we also manufacture furniture, workstation and storage dimensions are planned for your actual office — not selected as unrelated standard pieces later.",
    ],
    listTitle: "Office spaces we design",
    list: [
      "Reception and waiting areas",
      "Open workstations",
      "Executive offices",
      "Manager rooms",
      "Meeting and conference rooms",
      "Breakout spaces",
      "Storage areas",
      "Training rooms",
      "Collaborative work areas",
      "Home offices",
    ],
    deliverables: [
      "Office location review",
      "Space and furniture plan",
      "Custom workstation design",
      "Reception and conference furniture",
      "Storage planning",
      "Lighting direction",
    ],
    cta: "Request an office site review and workplace planning discussion.",
    metaTitle: "Office Interior Design in Lahore | Woodex Interior",
    metaDescription:
      "Plan a productive workplace with Woodex office interior design in Lahore. Workstations, meeting rooms, receptions and custom office furniture.",
  },
  {
    slug: "commercial-interior-design-lahore",
    nav: "Commercial Interiors",
    title: "Commercial Interior Design",
    group: "Interiors",
    image: "/img/project-1.jpg",
    excerpt:
      "Customer-facing and operational commercial environments designed around circulation, brand presentation and efficiency.",
    headline: "Commercial Interior Design in Lahore",
    intro: [
      "Commercial interiors must support business operations while creating the right experience for employees, customers and visitors.",
      "Woodex Interior develops commercial environments around circulation, brand presentation, customer requirements, storage, lighting, furniture and operational efficiency.",
    ],
    listTitle: "Commercial project types",
    list: [
      "Corporate offices",
      "Retail outlets",
      "Showrooms",
      "Service centers",
      "Clinics",
      "Salons",
      "Restaurants and cafés",
      "Educational environments",
      "Reception areas",
    ],
    cta: "Contact Woodex with your property type, location, area and required opening date.",
    metaTitle: "Commercial Interior Design in Lahore | Woodex",
    metaDescription:
      "Commercial interior design in Lahore for offices, stores, showrooms and customer-facing spaces. Discuss your project with Woodex Interior.",
  },
  {
    slug: "retail-shop-interior-design-lahore",
    nav: "Retail & Shop Interiors",
    title: "Retail & Shop Interior Design",
    group: "Interiors",
    image: "/img/service-retail.jpg",
    excerpt:
      "Store layouts, display systems, counters and lighting that make products easy to discover and brands hard to forget.",
    headline: "Shop and Retail Interior Design in Lahore",
    intro: [
      "A retail interior should make products easy to discover while creating a clear, memorable expression of the brand.",
      "Woodex plans shop and retail environments around customer movement, product visibility, display capacity, lighting, counter placement, storage and brand communication.",
    ],
    listTitle: "Retail design services",
    list: [
      "Store layout planning",
      "Display-unit design",
      "Cash and reception counters",
      "Product shelving",
      "Feature displays",
      "Lighting concepts",
      "Storage integration",
      "Signage coordination",
      "Custom retail furniture",
      "Shopfront concepts",
    ],
    cta: "Planning a new shop or redesigning an existing outlet? Send Woodex your floor plan and product requirements.",
    metaTitle: "Shop & Retail Interior Design Lahore | Woodex",
    metaDescription:
      "Retail and shop interior design in Lahore, including layouts, counters, display units, lighting, branding and custom furniture.",
  },
  {
    slug: "restaurant-interior-design-lahore",
    nav: "Restaurant Interiors",
    title: "Restaurant Interior Design",
    group: "Interiors",
    image:
      "https://images.pexels.com/photos/26729398/pexels-photo-26729398.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1000",
    excerpt:
      "Dining environments designed around ambiance, service flow and brand story — from seating plans to feature lighting.",
    headline: "Restaurant Interior Design in Lahore",
    intro: [
      "A restaurant succeeds twice: once in the kitchen and once in the room. The interior decides how long guests stay, how they feel and whether they return — and whether they photograph it.",
      "Woodex designs restaurant interiors around capacity targets, circulation between kitchen and tables, acoustic comfort, layered lighting and a visual identity guests remember. Custom counters, tables and seating are manufactured by our own furniture division.",
    ],
    listTitle: "Restaurant design services",
    list: [
      "Dining layout and capacity planning",
      "Ambience and layered lighting design",
      "Custom tables, chairs and banquettes",
      "Bar, service and cash counters",
      "Private dining and family zones",
      "Waiting lounge design",
      "Facade and signage coordination",
      "Acoustic comfort planning",
      "Material and finish selection",
      "Feature walls and photo spots",
    ],
    cta: "Planning a new restaurant or renovating one? Send us your floor plan and seating target.",
    metaTitle: "Restaurant Interior Design in Lahore | Woodex Interior",
    metaDescription:
      "Restaurant interior design in Lahore — dining layouts, ambiance, custom furniture, lighting and counters designed and built by Woodex Interior.",
  },
  {
    slug: "cafe-interior-design-lahore",
    nav: "Café Interiors",
    title: "Café Interior Design",
    group: "Interiors",
    image:
      "https://images.pexels.com/photos/36484101/pexels-photo-36484101.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1000",
    excerpt:
      "Warm, photogenic café interiors — counters, seating zones and lighting planned for comfort, dwell time and social sharing.",
    headline: "Café Interior Design in Lahore",
    intro: [
      "Cafés live on atmosphere. Guests choose where to sit for an hour based on warmth, comfort and how the space photographs — and they return for how easy it is to order, work and meet.",
      "Woodex plans café interiors around counter workflow, seating mix, warm lighting and durable finishes, with custom counters, shelving and furniture built to suit compact footprints.",
    ],
    listTitle: "Café design services",
    list: [
      "Service counter and display design",
      "Seating zoning — solo, pairs, groups",
      "Warm layered lighting schemes",
      "Self-serve and pickup stations",
      "Window and feature seating",
      "Brand-integrated décor and shelving",
      "Compact storage integration",
      "Outdoor seating concepts",
      "Durable café-grade finishes",
      "Photo-friendly design corners",
    ],
    cta: "Opening a café? Share your space size and concept — we'll shape the interior around it.",
    metaTitle: "Café Interior Design in Lahore | Woodex Interior",
    metaDescription:
      "Café interior design in Lahore — counters, seating zones, warm lighting and custom furniture by Woodex Interior. Plan your café with us.",
  },
  {
    slug: "3d-interior-design-space-planning-lahore",
    nav: "3D Design & Space Planning",
    title: "3D Design & Space Planning",
    group: "Planning & Execution",
    image: "/img/service-planning.jpg",
    excerpt:
      "Layouts and photorealistic 3D views that let you walk through the proposed space before execution begins.",
    headline: "3D Interior Design and Space Planning in Lahore",
    intro: [
      "Space planning determines how people, furniture and activities fit within the available area.",
      "Woodex develops layouts that consider circulation, room functions, furniture dimensions, storage and visual balance. Where included in the agreed package, 3D visualization helps clients understand proposed colors, materials, furniture and lighting before execution.",
    ],
    listTitle: "Planning deliverables",
    list: [
      "Measured site plan",
      "Furniture layout",
      "Floor plan",
      "Ceiling concept",
      "Lighting layout",
      "Wall elevations",
      "3D interior views",
      "Material schedule",
      "Furniture specifications",
    ],
    cta: "Send us your floor plan to discuss a space-planning or visualization package.",
    metaTitle: "3D Interior Design & Space Planning Lahore | Woodex",
    metaDescription:
      "Understand your proposed interior through space planning, furniture layouts and 3D interior design services in Lahore.",
  },
  {
    slug: "turnkey-interior-solutions-lahore",
    nav: "Turnkey Interiors",
    title: "Turnkey Interior Solutions",
    group: "Planning & Execution",
    image: "/img/project-1.jpg",
    excerpt:
      "From planning and materials to furniture and final installation — one coordinated project process, start to finish.",
    headline: "Turnkey Interior Design and Execution in Lahore",
    intro: [
      "From planning and materials to furniture and final installation, Woodex coordinates the agreed project scope through a single project process.",
      "One team means nothing is lost between contractors: drawings, materials, custom furniture and site work move together under one responsibility.",
    ],
    listTitle: "What turnkey can include",
    list: [
      "Design and space planning",
      "Material selection and scheduling",
      "Ceiling, flooring and wall works",
      "Electrical and lighting coordination",
      "Custom furniture manufacturing",
      "On-site installation",
      "Finishing and styling",
      "Final review and handover",
    ],
    cta: "Discuss a turnkey scope for your home, office or commercial space.",
    metaTitle: "Turnkey Interior Solutions in Lahore | Woodex Interior",
    metaDescription:
      "Turnkey interior solutions in Lahore — design, materials, custom furniture and execution coordinated through one Woodex project team.",
  },
  {
    slug: "interior-renovation-lahore",
    nav: "Interior Renovation",
    title: "Interior Renovation",
    group: "Planning & Execution",
    image: "/img/project-2.jpg",
    excerpt:
      "Planned upgrades for existing homes and workplaces — assessment, scope, schedule and carefully sequenced work.",
    headline: "Interior Renovation Services in Lahore",
    intro: [
      "Renovation succeeds on planning. We begin by assessing existing conditions, then define a clear scope and sequence before work starts.",
      "Woodex coordinates the renovation scope you approve — from ceilings, flooring and paint to woodwork, furniture and final finishing.",
    ],
    listTitle: "Renovation scope",
    list: [
      "Existing-condition assessment",
      "Demolition scope",
      "Electrical work",
      "Ceiling changes",
      "Flooring",
      "Painting",
      "Furniture and woodwork",
      "Project schedule",
    ],
    cta: "Share photographs of your existing space to begin a renovation assessment.",
    metaTitle: "Interior Renovation in Lahore | Woodex Interior",
    metaDescription:
      "Interior renovation in Lahore for homes and offices — assessment, planning, ceilings, flooring, woodwork and finishing by Woodex.",
  },
  {
    slug: "exterior-design-lahore",
    nav: "Exterior Design",
    title: "Exterior & Elevation Design",
    group: "Planning & Execution",
    image: "/img/cta.jpg",
    excerpt:
      "Front elevation concepts and exterior material palettes that extend your interior language to the street.",
    headline: "Exterior and Front Elevation Design in Lahore",
    intro: [
      "The exterior is the first chapter of your space. Woodex develops front elevation concepts, material palettes, lighting direction and entrance detailing that connect with the interior design.",
      "For structural or architectural work, we coordinate with qualified professionals while leading the visual and material direction.",
    ],
    listTitle: "Exterior design scope",
    list: [
      "Front elevation concepts",
      "Material and finish palettes",
      "Entrance and gate detailing",
      "Exterior lighting direction",
      "Boundary wall cladding concepts",
      "Color coordination",
    ],
    cta: "Send your plot dimensions or existing façade photographs for an elevation consultation.",
    metaTitle: "Exterior Design in Lahore | Woodex Interior",
    metaDescription:
      "Exterior and front elevation design in Lahore — façade concepts, materials, lighting and entrance detailing by Woodex Interior.",
  },
  {
    slug: "custom-furniture-lahore",
    nav: "Custom Furniture",
    title: "Custom Furniture",
    group: "Furniture & Woodwork",
    image: "/img/service-furniture.jpg",
    excerpt:
      "Purpose-built furniture designed to your measurements, storage needs and finish — manufactured by Woodex Furniture.",
    headline: "Custom Furniture Designed for Your Space",
    intro: [
      "Woodex creates customized furniture for residential and commercial environments. Each item is planned according to its required function, dimensions, storage capacity, material and design direction.",
      "Designing the furniture alongside the interior creates better proportions, stronger visual consistency and more effective use of space.",
    ],
    listTitle: "Custom furniture categories",
    list: [
      "Executive tables",
      "Workstations",
      "Conference tables",
      "Reception counters",
      "Storage cabinets",
      "Shelving and display units",
      "Wardrobes",
      "Beds and side tables",
      "TV and media units",
      "Dining tables",
      "Home-office furniture",
    ],
    deliverables: [
      "Requirement discussion",
      "Site measurement",
      "Design development",
      "Material and finish selection",
      "Quotation approval",
      "Manufacturing",
      "Delivery and installation",
    ],
    cta: "Send your reference design, measurements or furniture requirements for a customized quotation.",
    metaTitle: "Custom Furniture in Lahore | Woodex Interior",
    metaDescription:
      "Custom home and office furniture in Lahore, designed around your space, function and preferred finish. Request a quotation from Woodex.",
  },
  {
    slug: "office-furniture-lahore",
    nav: "Office Furniture",
    title: "Office Furniture",
    group: "Furniture & Woodwork",
    image: "/img/service-office.jpg",
    excerpt:
      "Executive desks, workstations, conference tables and storage — manufactured to fit your office plan precisely.",
    headline: "Custom Office Furniture in Lahore",
    intro: [
      "Well-planned furniture improves how an office uses its available area.",
      "Woodex supplies customized office furniture designed around employee requirements, room dimensions, storage, cable management, working styles and the overall office interior.",
      "Woodex Furniture — the custom furniture division of Woodex Interior — is a listed furniture manufacturer and supplier reachable on the same Woodex number.",
    ],
    listTitle: "Office furniture products",
    list: [
      "Executive office tables",
      "Manager desks",
      "Staff workstations",
      "Conference tables",
      "Reception desks",
      "Office storage",
      "Filing units",
      "Shelving",
      "Waiting-area furniture",
      "Custom office sofas",
    ],
    cta: "Request an office furniture layout and quotation.",
    metaTitle: "Custom Office Furniture in Lahore | Woodex",
    metaDescription:
      "Custom office furniture in Lahore, including workstations, executive desks, conference tables, reception counters and office storage.",
  },
  {
    slug: "carpenter-services-lahore",
    nav: "Carpenter & Woodwork",
    title: "Carpenter & Woodwork",
    group: "Furniture & Woodwork",
    image: "/img/service-furniture.jpg",
    excerpt:
      "Custom interior woodwork — cabinets, wardrobes, doors, shelving, counters and detailed joinery, built to measure.",
    headline: "Custom Carpenter and Interior Woodwork Services in Lahore",
    intro: [
      "Detailed woodwork is where an interior earns its finish. Our carpentry team builds and installs custom joinery that fits your space exactly.",
      "From wardrobes and cabinets to reception counters and wall paneling, every piece is measured, manufactured and finished under Woodex supervision.",
    ],
    listTitle: "Woodwork capabilities",
    list: [
      "Cabinets and kitchen woodwork",
      "Wardrobes",
      "Doors and frames",
      "Shelving and display units",
      "Reception and cash counters",
      "Wall paneling",
      "Furniture repair",
    ],
    cta: "Share your woodwork requirements or site measurements for a quotation.",
    metaTitle: "Carpenter Services in Lahore | Woodex Interior",
    metaDescription:
      "Custom carpenter and interior woodwork services in Lahore — cabinets, wardrobes, counters, paneling and joinery by Woodex.",
  },
];

export const SERVICE_GROUPS: { label: Service["group"]; slugs: string[] }[] = [
  {
    label: "Interiors",
    slugs: [
      "interior-design-lahore",
      "residential-interior-design-lahore",
      "office-interior-design-lahore",
      "commercial-interior-design-lahore",
      "retail-shop-interior-design-lahore",
      "restaurant-interior-design-lahore",
      "cafe-interior-design-lahore",
    ],
  },
  {
    label: "Planning & Execution",
    slugs: [
      "3d-interior-design-space-planning-lahore",
      "turnkey-interior-solutions-lahore",
      "interior-renovation-lahore",
      "exterior-design-lahore",
    ],
  },
  {
    label: "Furniture & Woodwork",
    slugs: [
      "custom-furniture-lahore",
      "office-furniture-lahore",
      "carpenter-services-lahore",
    ],
  },
];

export const CORE_SERVICE_SLUGS = [
  "residential-interior-design-lahore",
  "office-interior-design-lahore",
  "commercial-interior-design-lahore",
  "retail-shop-interior-design-lahore",
  "3d-interior-design-space-planning-lahore",
  "custom-furniture-lahore",
];

export const serviceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);

/* ── Projects / case studies ─────────────────────────── */

export type Project = {
  slug: string;
  title: string;
  type: string;
  location: string;
  area: string;
  year: string;
  image: string;
  summary: string;
  brief: string;
  challenge: string;
  solution: string;
  materials: string[];
  services: string[];
  serviceSlugs: string[];
  gallery: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "executive-office-reception-gulberg",
    title: "Executive Office Reception",
    type: "Office Interior",
    location: "Gulberg, Lahore",
    area: "1,850 sq ft",
    year: "2025",
    image: "/img/project-1.jpg",
    summary:
      "A corporate reception and workspace planned around client arrival experience, workflow and custom walnut-and-marble furniture.",
    brief:
      "A growing professional-services firm needed a reception and office environment that would present a confident, established image to visiting clients while supporting a team that had outgrown its previous layout.",
    challenge:
      "The existing floorplate was deep and narrow, with limited natural light at the center. Standard furniture could not use the wall lengths efficiently, and storage had consumed the perimeter.",
    solution:
      "We re-planned circulation around a curved marble reception desk as the focal point, moved storage into custom full-height walnut cabinetry along the blind wall, and layered warm cove lighting with brass accents to replace the flat general lighting.",
    materials: ["Walnut veneer", "Volakas marble", "Brass trim", "Fluted panels", "Warm-cove LED"],
    services: ["Space planning", "Interior design", "Custom office furniture", "Lighting design", "Execution"],
    serviceSlugs: ["office-interior-design-lahore", "office-furniture-lahore", "3d-interior-design-space-planning-lahore"],
    gallery: ["/img/project-1.jpg", "/img/service-office.jpg", "/img/service-planning.jpg"],
  },
  {
    slug: "boutique-retail-store-model-town",
    title: "Boutique Retail Store",
    type: "Retail Interior",
    location: "Model Town, Lahore",
    area: "960 sq ft",
    year: "2025",
    image: "/img/service-retail.jpg",
    summary:
      "A boutique retail interior with arched illuminated display niches, brass rails and a compact custom cash counter.",
    brief:
      "A fashion retailer wanted a store that felt intimate and premium within a compact footprint, with product clearly visible from the entrance.",
    challenge:
      "The shop was small with a single storefront, so density of display risked overwhelming customers, and the back-of-store storage was almost nonexistent.",
    solution:
      "We composed a rhythm of arched, individually lit display niches to give each product a stage, designed a compact marble-top cash counter with concealed storage, and used a light plaster-and-brass palette to keep the space feeling open.",
    materials: ["Micro-plaster", "Brass rails", "Marble counter", "Oak shelving", "Niche spotlights"],
    services: ["Retail layout", "Display design", "Custom counters", "Lighting concepts", "Shopfront concept"],
    serviceSlugs: ["retail-shop-interior-design-lahore", "custom-furniture-lahore"],
    gallery: ["/img/service-retail.jpg", "/img/cta.jpg", "/img/project-2.jpg"],
  },
  {
    slug: "family-residence-dha",
    title: "Family Residence Interior",
    type: "Residential Interior",
    location: "DHA, Lahore",
    area: "4,200 sq ft",
    year: "2024",
    image: "/img/hero.jpg",
    summary:
      "A complete residence interior — double-height lounge, bedrooms and custom furniture — planned around family life and entertaining.",
    brief:
      "A family building their home in DHA wanted an interior that felt calm and coherent across formal and family zones, with furniture proportioned to a double-height drawing room.",
    challenge:
      "The double-height volume overwhelmed standard furniture, and the family needed generous concealed storage without losing the openness of the plan.",
    solution:
      "We designed the furniture suite with the architecture — scaled seating for the tall volume, a layered lighting scheme for day and evening use, and full-height storage walls that read as paneling rather than cupboards.",
    materials: ["Walnut paneling", "Travertine", "Silk upholstery", "Brass details", "Layered lighting"],
    services: ["Residential interior design", "Custom furniture", "Space planning", "Lighting direction"],
    serviceSlugs: ["residential-interior-design-lahore", "custom-furniture-lahore"],
    gallery: ["/img/hero.jpg", "/img/service-residential.jpg", "/img/service-furniture.jpg"],
  },
  {
    slug: "cafe-interior-johar-town",
    title: "Café Interior",
    type: "Hospitality Interior",
    location: "Johar Town, Lahore",
    area: "1,400 sq ft",
    year: "2024",
    image: "/img/project-2.jpg",
    summary:
      "A warm café environment of arched niches, marble tables and brass pendants, planned for dwell time and evening ambiance.",
    brief:
      "A café operator opening in Johar Town wanted a distinctive interior that would photograph well, feel comfortable for long sittings and operate efficiently at peak hours.",
    challenge:
      "The plan had to balance table density against comfort, hide service clutter, and survive heavy daily use without constant maintenance.",
    solution:
      "We organized seating around arched wall niches that absorb display and lighting, specified durable marble and sealed wood finishes, and designed a custom service counter that keeps preparation out of the guest's sightline.",
    materials: ["Lime plaster", "Sealed oak", "Marble tables", "Brass pendants", "Cane seating"],
    services: ["Commercial interior design", "Custom counters and furniture", "Lighting concepts"],
    serviceSlugs: ["commercial-interior-design-lahore", "custom-furniture-lahore"],
    gallery: ["/img/project-2.jpg", "/img/service-retail.jpg", "/img/cta.jpg"],
  },
];

export const projectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

/* ── Insights / articles ─────────────────────────────── */

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  answer: string;
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
  relatedServiceSlugs: string[];
  metaTitle: string;
  metaDescription: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "interior-design-cost-lahore",
    title: "Interior Design Cost in Lahore: Complete Planning Guide",
    category: "Planning Guides",
    date: "2025-11-18",
    readTime: "7 min read",
    image: "/img/service-planning.jpg",
    excerpt:
      "What actually drives interior design cost in Lahore — scope, materials, furniture and execution — and how to budget with confidence.",
    answer:
      "Interior design cost in Lahore depends mainly on four things: the size of your space, the depth of design service you need (layout only, or full 3D design with supervision), your material choices, and how much custom furniture is involved. A design-only scope costs a fraction of a turnkey scope; the most reliable way to price either is a measured site review and a written scope.",
    sections: [
      {
        heading: "The four cost drivers",
        body: [
          "Area. Larger spaces need more design hours, more drawings and more material — cost scales with covered area.",
          "Scope. A furniture layout and color direction costs far less than full 3D visualization with a material schedule and execution supervision.",
          "Materials. Imported marble, natural veneer and brass detailing price very differently from local laminates and standard finishes. Good design allocates budget where it is seen and touched most.",
          "Custom furniture. Purpose-built furniture costs more than off-the-shelf pieces but uses space better and lasts longer — often reducing the total number of pieces you need.",
        ],
      },
      {
        heading: "Design fee structures you will encounter",
        body: [
          "Per-square-foot design fees, fixed package fees per room, and design-plus-execution contracts where the design fee is adjusted against execution. Ask every firm which deliverables are included — drawings, 3D views, site visits and revisions — because that is where quotations genuinely differ.",
        ],
      },
      {
        heading: "How to budget sensibly",
        body: [
          "Decide your total comfortable budget first, then reserve a contingency of roughly ten percent for site surprises. Share the real number with your designer — a good studio designs to a budget rather than around it.",
          "At Woodex, a proposal starts with your location, approximate area, property type and required services; we then confirm scope before any quotation is written.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is 3D design worth the cost?",
        a: "For most projects, yes — it prevents expensive mid-execution changes by letting you approve colors, materials and furniture before work begins.",
      },
      {
        q: "Can I phase the work to spread cost?",
        a: "Yes. Many clients design the whole space but execute in phases — structure and ceilings first, furniture and styling later.",
      },
    ],
    relatedServiceSlugs: ["interior-design-lahore", "3d-interior-design-space-planning-lahore"],
    metaTitle: "Interior Design Cost in Lahore: Complete Planning Guide | Woodex",
    metaDescription:
      "What interior design costs in Lahore and why — scope, materials, furniture and execution explained, with practical budgeting advice from Woodex.",
  },
  {
    slug: "office-interior-design-cost-lahore",
    title: "Office Interior Design Cost in Lahore",
    category: "Planning Guides",
    date: "2025-11-02",
    readTime: "6 min read",
    image: "/img/service-office.jpg",
    excerpt:
      "Office interior and fit-out budgeting in Lahore — per-seat planning, furniture strategy, and where businesses overspend.",
    answer:
      "Office interior cost in Lahore is driven by covered area, the number of workstations, meeting-room count and specification level. The smartest savings come from planning custom furniture and layout together — manufactured-to-measure workstations typically seat more people per square foot than catalogue furniture, directly reducing rent waste.",
    sections: [
      {
        heading: "Think in cost per seat, not just per square foot",
        body: [
          "An office exists to seat a team. When comparing quotations, divide the total by the number of comfortable seats achieved — a cheaper layout that seats fewer people is usually the more expensive design.",
        ],
      },
      {
        heading: "Where budgets leak",
        body: [
          "The common leaks are under-planned storage (fixed later with random cupboards), cable management added after desks arrive, and lighting specified without considering screen glare. Each is cheapest to solve on the drawing board.",
        ],
      },
      {
        heading: "A practical budgeting sequence",
        body: [
          "Start with headcount and growth for two to three years. Map required rooms — reception, open work area, executive offices, meeting and breakout. Decide which furniture will be custom-made. Only then compare material specifications across quotations.",
          "Woodex prepares office proposals from your location, total covered area, employee count and required rooms — the more of this you share, the tighter the quotation.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is custom office furniture more expensive?",
        a: "Per piece it can be, but per usable workstation it is usually cheaper because dimensions match your plan exactly and wasted area disappears.",
      },
      {
        q: "How long does an office interior take?",
        a: "Design typically takes two to four weeks; execution depends on area and scope. Share your target move-in date early so the program can be planned backward.",
      },
    ],
    relatedServiceSlugs: ["office-interior-design-lahore", "office-furniture-lahore"],
    metaTitle: "Office Interior Design Cost in Lahore | Woodex Interior",
    metaDescription:
      "Office interior design cost in Lahore explained — per-seat planning, custom furniture strategy and budgeting advice from Woodex Interior.",
  },
  {
    slug: "how-to-plan-office-interior",
    title: "How to Plan an Office Interior: A Step-by-Step Guide",
    category: "Workplace",
    date: "2025-10-14",
    readTime: "8 min read",
    image: "/img/project-1.jpg",
    excerpt:
      "From headcount and workflow to furniture and lighting — the exact sequence for planning an office that works on day one.",
    answer:
      "Plan an office interior in this order: define headcount and growth, map how teams work, list required rooms, measure the site, design the layout, plan custom furniture with the layout, then specify lighting and materials. Reversing this order — choosing furniture or finishes before the plan — is the most common and most expensive mistake.",
    sections: [
      {
        heading: "1. Start with people, not furniture",
        body: [
          "Count current staff and honest two-year growth. Note which teams collaborate daily, who needs acoustic privacy for calls, and who receives visitors. These three answers shape the plan more than any style preference.",
        ],
      },
      {
        heading: "2. List the rooms before the look",
        body: [
          "Reception and waiting, open workstations, executive and manager rooms, meeting and conference rooms, breakout, storage, training and server or utility needs. Assign each a capacity and adjacency — meeting rooms near visitors, storage near the teams that use it.",
        ],
      },
      {
        heading: "3. Design layout and furniture together",
        body: [
          "Furniture drawn after the layout rarely fits it. Designing custom workstations, reception and conference tables against the measured plan removes wasted centimeters, fixes cable routes inside the furniture, and lets full-height storage double as partition walls.",
        ],
      },
      {
        heading: "4. Light for screens first, mood second",
        body: [
          "Work areas need even, glare-free light; receptions and breakout zones carry the decorative lighting. Resolve ceiling, lighting and air-conditioning layouts in the same drawing set to avoid site conflicts.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much area does one workstation need?",
        a: "As a planning estimate, allow roughly 80–100 sq ft per person including circulation and shared spaces; precise layouts usually do better with custom furniture.",
      },
      {
        q: "Should I take a turnkey contract?",
        a: "If you lack a dedicated facilities team, yes — one accountable coordinator for design, furniture and site work prevents the gaps that appear between separate vendors.",
      },
    ],
    relatedServiceSlugs: ["office-interior-design-lahore", "3d-interior-design-space-planning-lahore"],
    metaTitle: "How to Plan an Office Interior | Woodex Interior Lahore",
    metaDescription:
      "Step-by-step office interior planning — headcount, workflow, rooms, layout, custom furniture and lighting — by Woodex Interior Lahore.",
  },
  {
    slug: "custom-vs-ready-made-office-furniture",
    title: "Custom vs Ready-Made Office Furniture",
    category: "Furniture",
    date: "2025-09-28",
    readTime: "5 min read",
    image: "/img/service-furniture.jpg",
    excerpt:
      "An honest comparison of custom and catalogue office furniture — cost, fit, durability and when each makes sense.",
    answer:
      "Ready-made furniture wins on speed and upfront price; custom furniture wins on space efficiency, durability and design consistency. If your office has unusual dimensions, specific storage needs or a brand image to project, custom manufacturing usually delivers more value per rupee over its life.",
    sections: [
      {
        heading: "Where ready-made works",
        body: [
          "Standard rooms, temporary offices, tight timelines and small quantities. Catalogue pieces arrive quickly and are easy to replace individually.",
        ],
      },
      {
        heading: "Where custom manufacturing wins",
        body: [
          "Fit. Workstations built to your plan reclaim the awkward gaps catalogue desks leave behind — often an entire extra row of seats.",
          "Function. Cable management, drawers, modesty panels and storage are designed for your equipment, not an average.",
          "Consistency. Reception desk, conference table and workstations share one material language, which is what clients actually notice.",
          "Durability. You choose the board, edging and hardware — the three things that decide whether furniture survives five years of daily use.",
        ],
      },
      {
        heading: "The cost question, honestly",
        body: [
          "Compare total cost per workstation including delivery, installation and the space each option wastes — not the sticker price of a single desk. Ask for material specifications in writing either way.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does custom office furniture take?",
        a: "Typically a few weeks after design approval, depending on quantity and finish. Manufacturing runs parallel with site work in a turnkey program.",
      },
      {
        q: "Can I match existing furniture later?",
        a: "Yes — one advantage of a manufacturer relationship is reordering matching pieces as your team grows.",
      },
    ],
    relatedServiceSlugs: ["office-furniture-lahore", "custom-furniture-lahore"],
    metaTitle: "Custom vs Ready-Made Office Furniture | Woodex Lahore",
    metaDescription:
      "Custom vs ready-made office furniture compared — fit, cost, durability and design consistency, from a Lahore manufacturer that builds both.",
  },
  {
    slug: "3d-visualization-benefits",
    title: "How 3D Visualization Helps Interior Projects",
    category: "Design Process",
    date: "2025-09-10",
    readTime: "5 min read",
    image: "/img/service-planning.jpg",
    excerpt:
      "Why approving your interior in 3D before execution saves money, shortens timelines and removes guesswork.",
    answer:
      "3D visualization lets you see and approve the actual colors, materials, lighting and furniture of your space before a single rupee is spent on site. It is the cheapest insurance in interior design: changes on screen cost almost nothing; changes during execution cost the most of anything in a project.",
    sections: [
      {
        heading: "Decisions move to the cheap phase",
        body: [
          "Moving a wall, changing a floor or rethinking a wardrobe is a mouse click in the design phase and a demolition order on site. 3D views force every major decision into the phase where it is nearly free.",
        ],
      },
      {
        heading: "Everyone approves the same picture",
        body: [
          "Families and business partners rarely read floor plans fluently, but everyone reads a photorealistic view. A shared visual reference eliminates the 'this is not what I imagined' conversation at handover.",
        ],
      },
      {
        heading: "Furniture and materials are coordinated earlier",
        body: [
          "When the visual is approved, the material schedule and custom furniture specifications are already resolved — which is why visualized projects execute faster and with fewer variations.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is 3D visualization included in every package?",
        a: "It depends on the agreed scope. Tell us at consultation stage if visualization matters to you so it is built into the proposal.",
      }
    ],
    relatedServiceSlugs: ["3d-interior-design-space-planning-lahore", "interior-design-lahore"],
    metaTitle: "How 3D Visualization Helps Interior Projects | Woodex",
    metaDescription:
      "How 3D interior visualization saves money and prevents on-site changes — by Woodex Interior, Lahore.",
  },
  {
    slug: "choose-interior-designer-lahore",
    title: "How to Choose an Interior Designer in Lahore",
    category: "Guides",
    date: "2025-08-22",
    readTime: "6 min read",
    image: "/img/about.jpg",
    excerpt:
      "Seven practical checks before you appoint an interior designer — portfolio depth, process, quotations and in-house capability.",
    answer:
      "Choose an interior designer in Lahore by checking: real project photographs (not only renders), a clear written process, itemized quotations, in-house furniture or execution capability, verifiable presence (office address, landline, registered profiles), and how specifically they discuss your space rather than design in general.",
    sections: [
      {
        heading: "Look at process before portfolio",
        body: [
          "Every studio can show five good photographs. What predicts your experience is the process: consultation, site review, concept, visualization, material coordination and execution review. Ask where you approve, where you pay, and where you can change your mind.",
        ],
      },
      {
        heading: "Compare quotations line by line",
        body: [
          "A lower total with unspecified materials is usually the most expensive offer. Compare board brands, veneer versus laminate, hardware, site supervision and the number of included revisions.",
        ],
      },
      {
        heading: "Value in-house capability",
        body: [
          "A studio that also manufactures furniture and coordinates execution closes the gaps where projects normally fail — between the drawing, the workshop and the site. Ask who actually builds what you approve.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I hire a designer or a contractor?",
        a: "A designer decides what should exist; a contractor builds what exists. For best results the design should lead — ideally with one coordinated team handling both.",
      }
    ],
    relatedServiceSlugs: ["interior-design-lahore", "turnkey-interior-solutions-lahore"],
    metaTitle: "How to Choose an Interior Designer in Lahore | Woodex",
    metaDescription:
      "Seven practical checks for choosing an interior designer in Lahore — process, quotations, portfolio and in-house capability.",
  },
];

export const articleBySlug = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);

/* ── Shared page content ─────────────────────────────── */

export const PROCESS = [
  {
    n: "01",
    title: "Consultation",
    text: "We discuss the project type, space, design preferences, functional needs and expected scope.",
  },
  {
    n: "02",
    title: "Site Review",
    text: "The available area, measurements and existing conditions are reviewed.",
  },
  {
    n: "03",
    title: "Planning & Concept",
    text: "Layouts, design direction, colors, materials and furniture requirements are developed.",
  },
  {
    n: "04",
    title: "Visualization",
    text: "Where included, drawings or 3D views communicate the proposed design before execution.",
  },
  {
    n: "05",
    title: "Material & Furniture Coordination",
    text: "Finishes, lighting, furniture and design elements are coordinated around the approved concept.",
  },
  {
    n: "06",
    title: "Execution & Review",
    text: "If execution is in scope, the design is implemented and reviewed before completion.",
  },
];

export const WHY_WOODEX = [
  "Residential and commercial design capability",
  "Specialized office, workspace and retail experience",
  "Customized furniture design and manufacturing",
  "Design solutions based on how the space is actually used",
  "Coordinated planning of layout, finishes and furniture",
  "Lahore-based project consultation",
];

export const HOME_FAQS = [
  {
    q: "What interior design services does Woodex offer?",
    a: "Woodex offers residential and commercial interior design, office and workspace planning, retail interiors, custom furniture and office furniture solutions.",
  },
  {
    q: "Does Woodex provide customized furniture?",
    a: "Yes. Customized home and office furniture design and manufacturing — through Woodex Furniture, our furniture division — is a core part of the business.",
  },
  {
    q: "Where is Woodex Interior located?",
    a: "Woodex Interior is located at Zainab Tower, Model Town Link Road, Lahore.",
  },
  {
    q: "Can Woodex design an office or retail shop?",
    a: "Yes. Office design, workspace planning and retail interiors are among Woodex's principal specializations.",
  },
  {
    q: "How can I request a quotation?",
    a: "Contact us by phone or WhatsApp and provide the project location, approximate area, property type, required services and expected schedule — we will respond with the next steps.",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", mega: true },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/* ── Interactive 3D studio media ─────────────────────── */

export const PANORAMAS = [
  {
    src: "https://images.pexels.com/photos/8092427/pexels-photo-8092427.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2560&h=1024",
    title: "Luxe Living & Dining",
    meta: "Residential Panorama",
  },
  {
    src: "https://images.pexels.com/photos/7587832/pexels-photo-7587832.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2560&h=1024",
    title: "Urban Loft Lounge",
    meta: "Residential Panorama",
  },
  {
    src: "https://images.pexels.com/photos/7166929/pexels-photo-7166929.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2560&h=1024",
    title: "Ambient Family Lounge",
    meta: "Residential Panorama",
  },
];

export const WALKTHROUGHS = [
  {
    video: "https://videos.pexels.com/video-files/7578552/7578552-uhd_3840_2160_30fps.mp4",
    poster: "https://images.pexels.com/videos/7578552/apartment-architecture-at-home-business-7578552.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    title: "Signature Residence Walkthrough",
    meta: "Full Home · 4K",
    duration: "0:12",
  },
  {
    video: "https://videos.pexels.com/video-files/29466021/12684208_1920_1080_60fps.mp4",
    poster: "https://images.pexels.com/videos/29466021/pexels-photo-29466021.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    title: "Dining Room Concept Flythrough",
    meta: "Dining Interior · HD",
    duration: "0:04",
  },
  {
    video: "https://videos.pexels.com/video-files/7578022/7578022-uhd_3840_2160_30fps.mp4",
    poster: "https://images.pexels.com/videos/7578022/adult-agent-apartment-at-home-7578022.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    title: "Staircase & Upper Level Tour",
    meta: "Duplex · 4K",
    duration: "0:20",
  },
];

export const RENDERS: { src: string; title: string }[] = [
  {
    src: "https://images.pexels.com/photos/26729398/pexels-photo-26729398.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=900",
    title: "Restaurant Dining Hall",
  },
  {
    src: "https://images.pexels.com/photos/36484101/pexels-photo-36484101.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=900",
    title: "Contemporary Café",
  },
  {
    src: "https://images.pexels.com/photos/19966811/pexels-photo-19966811.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=900",
    title: "Media Lounge Concept",
  },
  {
    src: "https://images.pexels.com/photos/14262704/pexels-photo-14262704.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=900",
    title: "Hotel Restaurant Suite",
  },
  {
    src: "https://images.pexels.com/photos/18721993/pexels-photo-18721993.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=900",
    title: "Botanical Dining Corner",
  },
  {
    src: "https://images.pexels.com/photos/17001731/pexels-photo-17001731.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=900",
    title: "Celebration Venue",
  },
];

export const dateFmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
