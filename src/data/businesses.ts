export type Category =
  | "All"
  | "Food & Catering"
  | "Fashion & Beauty"
  | "Real Estate"
  | "Professional Services"
  | "Technology"
  | "Health & Wellness"
  | "Retail & Trade";

export interface BusinessHours {
  day: string;
  time: string;
}

export interface ServiceCategory {
  name: string;
  items: string[];
}

export interface WhatWeDoItem {
  title: string;
  description?: string;
  items: string[];
}

export interface CompanyValue {
  title: string;
  description: string;
  items?: string[];
}

export interface Business {
  id: number;
  slug: string;
  name: string;
  category: Exclude<Category, "All">;
  tagline?: string;
  description: string;
  location?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  flyer?: string;
  banner?: string;
  gallery?: string[];
  /** Flat list for simple businesses */
  services?: string[];
  /** Rich categorised services for detailed profiles */
  serviceCategories?: ServiceCategory[];
  whatWeDo?: WhatWeDoItem[];
  values?: CompanyValue[];
  focusAreas?: string[];
  partners?: string[];
  hours?: BusinessHours[];
  social?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
  };
  ownerName?: string;
  established?: string;
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  "All",
  "Food & Catering",
  "Fashion & Beauty",
  "Real Estate",
  "Professional Services",
  "Technology",
  "Health & Wellness",
  "Retail & Trade",
];

export const CATEGORY_COLORS: Record<string, string> = {
  "Food & Catering": "bg-orange-100 text-orange-800 border-orange-200",
  "Fashion & Beauty": "bg-pink-100 text-pink-800 border-pink-200",
  "Real Estate": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Professional Services": "bg-blue-100 text-blue-800 border-blue-200",
  "Technology": "bg-purple-100 text-purple-800 border-purple-200",
  "Health & Wellness": "bg-green-100 text-green-800 border-green-200",
  "Retail & Trade": "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export const CATEGORY_GRADIENTS: Record<string, string> = {
  "Food & Catering": "from-orange-400 to-amber-500",
  "Fashion & Beauty": "from-pink-400 to-rose-500",
  "Real Estate": "from-emerald-400 to-green-600",
  "Professional Services": "from-blue-400 to-indigo-500",
  "Technology": "from-purple-400 to-violet-600",
  "Health & Wellness": "from-teal-400 to-green-500",
  "Retail & Trade": "from-yellow-400 to-amber-500",
};

export const BUSINESSES: Business[] = [
  {
    id: 1,
    slug: "topawo-enterprises",
    name: "Topawo Enterprises",
    category: "Retail & Trade",
    description: "A trusted community enterprise offering quality goods and services to the Ijebu Igbo diaspora and beyond.",
  },
  {
    id: 2,
    slug: "odueyungbo-farms",
    name: "Odueyungbo Farms",
    category: "Food & Catering",
    description: "Fresh farm produce and agricultural services rooted in Ijebu Igbo tradition. Supplying quality food from the source.",
  },
  {
    id: 3,
    slug: "bau-cars",
    name: "BAU Cars",
    category: "Professional Services",
    description: "Reliable car sales, leasing, and automotive services for the community. Quality vehicles at competitive prices.",
  },
  {
    id: 4,
    slug: "arinola-transport",
    name: "Arinola Transport",
    category: "Professional Services",
    description: "Dependable passenger and freight transport solutions. Moving people and goods safely across destinations.",
  },
  {
    id: 5,
    slug: "lekki-kitchen",
    name: "Lekki Kitchen",
    category: "Food & Catering",
    description: "Authentic Nigerian cuisine crafted with care. From everyday meals to catering for celebrations and special events.",
  },
  {
    id: 6,
    slug: "bukola-herbal",
    name: "Bukola Herbal",
    category: "Health & Wellness",
    description: "Natural herbal remedies and wellness products grounded in traditional Yoruba medicine. Health the natural way.",
  },
  {
    id: 7,
    slug: "row-radio",
    name: "Row Radio",
    category: "Technology",
    description: "Community broadcasting and media services connecting the Ijebu Igbo diaspora through music, news, and culture.",
  },
  {
    id: 8,
    slug: "dg-tal-mind",
    name: "DG-Tal Mind Ltd",
    category: "Technology",
    tagline: "Collaborative Technology Experience",
    description:
      "DG-Tal Mind Ltd is a UK-based IT services, digital transformation, and technology solutions company. Evolved from its original identity, DGtal-Mind Ltd, the company serves organisations ranging from SMEs to multinational corporations and is a specialist supplier to the UK Government. The core philosophy is simple: technology should make life easier, not harder. Every solution is customised around each client's business goals, culture, budget, and user experience needs — no off-the-shelf approaches, no unnecessary jargon.",
    location: "32 Freeman's Close, Hitchin, SG5 2SE, United Kingdom",
    phone: "+44 794 765 6327",
    whatsapp: "+447947656327",
    email: "admin@dgtalmind.com",
    website: "www.dgtalmind.com",

    whatWeDo: [
      {
        title: "Fully Managed Services",
        description: "Tailored managed IT services built around your business:",
        items: [
          "24/7 Support",
          "Continuous Optimisation",
          "Infrastructure Management",
          "Security Enhancement",
          "Process Automation",
          "Performance Improvement",
        ],
      },
      {
        title: "Comprehensive IT Services",
        description: "End-to-end technology support including:",
        items: [
          "IT Infrastructure",
          "Cloud Solutions",
          "Cybersecurity",
          "Software Development",
          "Digital Transformation",
          "Managed Services",
        ],
      },
      {
        title: "Bespoke Human-Centred Solutions",
        description: "Every solution is customised to:",
        items: [
          "Business goals",
          "Company culture",
          "Budget requirements",
          "User experience needs",
        ],
      },
    ],

    values: [
      {
        title: "Every Project Is Unique",
        description:
          "No two organisations are the same. Solutions are designed specifically around each client's needs rather than using off-the-shelf approaches.",
      },
      {
        title: "Always Be Evolving",
        description:
          "Staying ahead of change through agile methodologies and innovation-focused delivery.",
        items: [
          "Technology trend monitoring",
          "Agile methodologies",
          "Continuous improvement",
          "Innovation-focused delivery",
        ],
      },
      {
        title: "Keep It Simple",
        description:
          "Technology should be clear, understandable, and practical. No unnecessary jargon — just business outcomes.",
        items: ["Clear", "Understandable", "User-friendly", "Practical"],
      },
      {
        title: "Tailored Approach",
        description:
          "Supporting startups, SMEs, enterprises, and multinationals with scalable, interconnected technologies.",
        items: ["Infrastructure", "Security", "Efficiency", "Business performance"],
      },
    ],

    serviceCategories: [
      {
        name: "Managed IT Support & Outsourcing",
        items: [
          "24/7 Managed IT Support",
          "Remote & Onsite Troubleshooting",
          "Network Setup & Management",
          "Outsourced Help Desk (1st, 2nd & 3rd Line)",
          "Network Operations Centre (NOC)",
          "Security Operations Centre (SOC)",
          "White-Label IT Support for Agencies",
        ],
      },
      {
        name: "Domains, Hosting & Email Solutions",
        items: [
          "Domain Registration",
          "Shared Web Hosting",
          "Managed Cloud Hosting",
          "cPanel & WHM Hosting Management",
          "SSL Certificates",
          "Microsoft 365 Email & Collaboration",
        ],
      },
      {
        name: "Cloud, DevOps & Automation",
        items: [
          "Cloud Services & Migration",
          "Cloud Hosting & Backup",
          "Disaster Recovery",
          "DevOps 360",
          "CI/CD Pipelines",
          "Monitoring & Maintenance",
          "Infrastructure Management (Servers, VMs, Control Panels)",
          "Datacentre Partnerships",
          "Microsoft 365 Automation",
          "AI Chatbots",
          "Workflow Automation",
        ],
      },
      {
        name: "Software & Application Development",
        items: [
          "Custom Software Development",
          "WordPress Development",
          "CMS Development",
          "Mobile Applications",
          "Hybrid Applications",
          "MERN Stack Development",
          "API Development & Integrations",
          "Product Development",
        ],
      },
    ],

    focusAreas: [
      "Modernise Infrastructure",
      "Improve Cybersecurity",
      "Implement Threat Detection",
      "Deploy Cloud Solutions",
      "Introduce IT Automation",
      "Conduct Penetration Testing",
      "Build Collaborative Solutions",
      "Scale Applications",
      "Manage Enterprise Infrastructure",
    ],

    partners: [
      "IBM", "AWS", "Microsoft Azure", "Adobe", "Dell", "Samsung",
      "Logitech", "Sony", "DigitalOcean", "IONOS Cloud", "Nutanix",
      "SAP", "Darktrace", "AppCheck", "Alert Logic", "PrinterLogic", "Kelverion",
    ],
  },
];
