export type Category =
  | "All"
  | "Food & Catering"
  | "Fashion & Beauty"
  | "Real Estate"
  | "Professional Services"
  | "Technology"
  | "Health & Wellness"
  | "Retail & Trade"
  | "Education";

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

export interface Testimonial {
  id: number;
  author: string;
  role?: string;
  company?: string;
  text: string;
  rating: number;
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
  promoVideo?: string;
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
  benefits?: string[];
  testimonials?: Testimonial[];
  region?: "UK" | "Nigeria" | "Diaspora";
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
  "Education",
];

export const CATEGORY_COLORS: Record<string, string> = {
  "Food & Catering": "bg-orange-100 text-orange-800 border-orange-200",
  "Fashion & Beauty": "bg-pink-100 text-pink-800 border-pink-200",
  "Real Estate": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Professional Services": "bg-blue-100 text-blue-800 border-blue-200",
  "Technology": "bg-purple-100 text-purple-800 border-purple-200",
  "Health & Wellness": "bg-green-100 text-green-800 border-green-200",
  "Retail & Trade": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Education": "bg-indigo-100 text-indigo-800 border-indigo-200",
};

export const CATEGORY_GRADIENTS: Record<string, string> = {
  "Food & Catering": "from-orange-400 to-amber-500",
  "Fashion & Beauty": "from-pink-400 to-rose-500",
  "Real Estate": "from-emerald-400 to-green-600",
  "Professional Services": "from-blue-400 to-indigo-500",
  "Technology": "from-purple-400 to-violet-600",
  "Health & Wellness": "from-teal-400 to-green-500",
  "Retail & Trade": "from-yellow-400 to-amber-500",
  "Education": "from-indigo-500 to-blue-700",
};

export const BUSINESSES: Business[] = [
  {
    id: 1,
    slug: "topawo-enterprises",
    name: "Topawo Enterprises",
    category: "Food & Catering",
    tagline: "Authentic African Food Ingredients, Delivered Fresh",
    description:
      "Topawo Enterprises is a trusted supplier of premium-quality ponmo, dried fish, and panla, serving customers who value authentic African food ingredients. The business specialises in sourcing and supplying carefully selected smoked and dried food products suitable for homes, restaurants, caterers, food vendors, and African grocery stores. With a commitment to quality, freshness, and customer satisfaction, Topawo delivers traditional food ingredients that bring authentic Nigerian flavours to every meal.",
    ownerName: "Chief Mrs Bisi Kazeem — The Yeyeluwa of Atikori",
    phone: "+44 7464 940460",
    whatsapp: "+447464940460",
    flyer: "/images/businesses/topawo-enterprises/flyer.jpeg",
    region: "UK",

    serviceCategories: [
      {
        name: "Products",
        items: [
          "Ponmo — Premium Processed Cow Skin",
          "Dried Fish",
          "Panla — Stock Fish / Dried Fish",
        ],
      },
      {
        name: "We Supply To",
        items: [
          "Homes & Families",
          "Restaurants & Caterers",
          "Food Vendors",
          "African Grocery Stores",
          "Wholesale Buyers",
        ],
      },
    ],

    benefits: [
      "Premium quality ponmo, dried fish, and panla",
      "Carefully sourced and selected products",
      "Serving homes, restaurants, caterers, and food vendors",
      "Authentic Nigerian flavours in every order",
      "Trusted supplier in the UK diaspora community",
      "Call or WhatsApp to place your order",
    ],
  },
  {
    id: 2,
    slug: "odueyungbo-farms",
    name: "Odueyungbo Farms",
    category: "Food & Catering",
    tagline: "Quality Livestock. Healthy Food. Sustainable Future.",
    description:
      "Odueyungbo Farms is a livestock and agricultural enterprise dedicated to producing high-quality, naturally raised animal products. The farm specialises in cattle, pigs, rams, poultry, and fish farming, ensuring healthy livestock through proper nutrition, veterinary care, and sustainable farming practices. With a commitment to food safety, quality assurance, and affordability, Odueyungbo Farms delivers fresh farm products directly from the farm to consumers, businesses, and food vendors.",
    ownerName: "Chief Toyin Odueyungbo",
    email: "odueyungbofarms@gmail.com",
    flyer: "/images/businesses/odueyungbo-farms/flyer.jpeg",
    region: "Nigeria",

    serviceCategories: [
      {
        name: "Livestock & Products",
        items: [
          "Cow — Quality cattle raised under healthy and sustainable farming practices",
          "Pork — Healthy and naturally raised pigs",
          "Ram — Premium quality rams for meat production and livestock purposes",
          "Chicken — Fresh poultry products from healthy birds",
          "Fish — Fresh fish produced under quality-controlled farming conditions",
        ],
      },
    ],

    whatWeDo: [
      {
        title: "Our Commitment",
        items: [
          "Quality Animal Rearing",
          "Healthy & Natural Feeding",
          "Veterinary Care & Management",
          "Sustainable & Ethical Practices",
          "Fresh, Safe & Affordable Products",
        ],
      },
    ],

    values: [
      {
        title: "Premium Quality",
        description: "Every product meets the highest standards of quality and food safety.",
      },
      {
        title: "Naturally Raised",
        description: "Livestock raised on natural feed with proper veterinary care — no shortcuts.",
      },
      {
        title: "Sustainable Farming",
        description: "Ethical and sustainable practices that protect animals, people, and the environment.",
      },
      {
        title: "Farm to Table",
        description: "Fresh products delivered directly from the farm to consumers, businesses, and food vendors.",
      },
    ],

    benefits: [
      "Quality you can trust, from our farm to your table",
      "Five livestock categories — cattle, pork, ram, poultry, and fish",
      "Naturally raised with proper nutrition and veterinary care",
      "Fresh, safe, and affordable farm products",
      "Supplying consumers, businesses, and food vendors",
      "Sustainable and ethical farming practices",
    ],
  },
  {
    id: 3,
    slug: "bau-cars",
    name: "BAU Cars Limited",
    category: "Professional Services",
    tagline: "Safe. Reliable. Always On Time.",
    description:
      "BAU Cars Limited is a transportation and logistics company providing reliable mini cab, taxi, and logistics services. Driven by the motto 'Driving You Forward. Delivering Excellence.' — BAU Cars offers comfortable rides at affordable rates, easy trip bookings for local and outstation travel, and prompt logistics delivery through BAU Logistics. Book via call, WhatsApp, or the BAUCARS.COM web app.",
    flyer: "/images/businesses/bau-cars/flyer.png",
    promoVideo: "/videos/bau-cars-promo.mp4",
    phone: "+234 805 253 6443",
    whatsapp: "+2348052536606",
    email: "support@baucars.com",
    website: "www.baucars.com",
    social: {
      instagram: "https://www.instagram.com/BauCars_Limited",
      facebook: "https://www.facebook.com/BauCars-Limited",
    },
    serviceCategories: [
      {
        name: "Mini Cab / Taxi",
        items: [
          "Comfortable and safe rides at affordable rates",
          "Local and outstation travel",
          "Professional drivers",
        ],
      },
      {
        name: "Trip Bookings",
        items: [
          "Easy and fast trip bookings",
          "Book via Call, WhatsApp, or BAUCARS.COM web app",
          "Local and outstation routes",
        ],
      },
      {
        name: "BAU Logistics",
        items: [
          "Reliable delivery and logistics solutions",
          "Motorcycle dispatch service",
          "Prompt and dependable delivery",
        ],
      },
    ],
    benefits: [
      "Professional, vetted drivers",
      "Safe & comfortable rides",
      "Fast & reliable service",
      "Customer satisfaction — On Time, Every Time",
      "Book via Call, WhatsApp, or BAUCARS.COM web app",
      "Multiple phone lines for easy access — Nigeria & UK",
    ],
    region: "Nigeria",
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
    tagline: "Your Home Away From Home",
    description:
      "Lekki Kitchen is a Nigerian restaurant in Edgware, London, serving authentic African and Nigerian cuisine in a warm and welcoming environment. Known for its homely meals, great taste, and fast delivery service, Lekki Kitchen offers customers freshly prepared dishes made with quality ingredients. Whether dining in, ordering takeaway, or requesting delivery, customers enjoy the true taste of home with every meal.",
    flyer: "/images/businesses/lekki-kitchen/flyer.png",
    location: "86 Watling Avenue, Burnt Oak, Edgware, HA8 0LU, United Kingdom",
    phone: "020 8951 5488",
    website: "www.lekkikitchen.com",
    region: "UK",

    hours: [
      { day: "Monday – Thursday", time: "10:00 AM – 10:30 PM" },
      { day: "Friday – Saturday", time: "10:00 AM – 11:00 PM" },
      { day: "Sunday", time: "11:00 AM – 9:00 PM" },
    ],

    serviceCategories: [
      {
        name: "Services",
        items: [
          "Restaurant Dining",
          "Food Delivery Service",
          "Takeaway Meals",
          "Nigerian Cuisine",
        ],
      },
      {
        name: "Featured Dishes",
        items: [
          "Pounded Yam",
          "Jollof Rice",
          "Rice & Grilled Chicken",
          "Traditional Nigerian Meals",
        ],
      },
    ],

    values: [
      {
        title: "Homely Meals",
        description: "Delicious, freshly prepared meals just like home.",
      },
      {
        title: "Fast Delivery",
        description: "Quick and reliable delivery to your doorstep.",
      },
      {
        title: "Quality Assured",
        description: "Hygienic preparation with quality ingredients.",
      },
      {
        title: "Great Taste",
        description: "Authentic flavours you'll love every time.",
      },
    ],

    benefits: [
      "Dine in, takeaway, or get it delivered — your choice",
      "Authentic Nigerian cuisine made fresh daily",
      "Fast and reliable delivery service available",
      "Quality ingredients, hygienic preparation",
      "Open 7 days a week",
      "Based in Burnt Oak, Edgware — serving all of London",
    ],
  },
  {
    id: 6,
    slug: "bukola-herbal",
    name: "Bukola Herbal",
    category: "Health & Wellness",
    tagline: "Reconnecting Humans With Nature",
    description:
      "Bukola Herbal is a natural health and wellness practice dedicated to reconnecting people with nature through evidence-based herbal medicine, lifestyle guidance, and organic wellness products. Led by Bukola Adekoya Agbenle, a qualified Western Herbal Medicine practitioner trained in the United Kingdom, the practice offers personalised herbal consultations, training, natural remedies, and wellness solutions to support overall health and wellbeing. The business serves clients in both Nigeria and the United Kingdom.",
    ownerName: "Bukola Adekoya Fagbenle",
    flyer: "/images/businesses/bukola-herbal/flyer.png",
    phone: "+234 816 327 2756",
    whatsapp: "+2348163272756",
    email: "Bukitfagbenla@gmail.com",
    website: "www.bukola.uk",
    region: "Nigeria",

    serviceCategories: [
      {
        name: "Services",
        items: [
          "Consultancy",
          "Training",
          "Individualised Prescription",
          "Lifestyle Advice",
          "Organic Products",
        ],
      },
      {
        name: "Products",
        items: [
          "LibidoNat",
          "ProstaNat",
          "DetoxNat",
          "FibroidNat",
          "HyperNat",
          "Anti-Diabetic Soap",
          "Libido Powder",
          "Apple Cider Vinegar",
          "Natural Insect Repellant",
          "DianaT",
          "Natural Skin Care Soap",
          "ImmuneBoost",
          "Cancivab",
          "RheumArtHat",
          "Oyster Mushroom",
          "Ganoderma Mushroom",
          "Mukuro Skin Tag Remover",
        ],
      },
    ],

    whatWeDo: [
      {
        title: "About Herbal Medicine",
        description:
          "Herbal medicine (also known as phytotherapy or herbalism) is a therapeutic discipline that relies on the medicinal properties of specific plants. These plants, often referred to as medicinal herbs, have specific and often well-defined effects on human physiology.",
        items: [],
      },
      {
        title: "Why Most Herbal Remedies Fail",
        items: [
          "Using the wrong herb for your condition",
          "Incorrect dosage — too little or too much",
          "Mixing herbs that counteract each other",
          "Not identifying the root cause of symptoms",
        ],
      },
      {
        title: "Our Approach",
        description: "We diagnose your needs, understand your body, and match you with the RIGHT herbs:",
        items: [
          "Personalised consultation before any product recommendation",
          "Root-cause diagnosis of your symptoms",
          "Targeted herbal formulations for lasting results",
          "Guidance on correct dosage and herb combinations",
        ],
      },
    ],

    values: [
      {
        title: "About Bukola",
        description:
          "Bukola holds a BSc in Western Herbal Medicine from Middlesex University in London, an MSc in Development Economics from the University of South Bank, and a PGCE in Education (for Further Education) from the University of Greenwich — all in the UK. She is a member of the National Institute of Medical Herbalists in the UK, a Pax Herbal Health Practitioner, member of Oyo State Traditional Herbalists & Amalgamation of Herbalists, Oyo State chapter; and currently practices herbal medicine in the UK and Nigeria.",
        items: [
          "BSc in Western Herbal Medicine — Middlesex University, London",
          "MSc in Development Economics — University of South Bank",
          "PGCE (Further Education) — University of Greenwich",
          "Member, National Institute of Medical Herbalists (UK)",
          "Pax Herbal Health Practitioner",
          "Member, Oyo State Traditional Herbalists & Amalgamation of Herbalists",
        ],
      },
      {
        title: "Natural & Safe",
        description: "Products from nature, made for wellness.",
      },
      {
        title: "Scientifically Informed",
        description: "Rooted in research and traditional knowledge.",
      },
      {
        title: "Holistic Wellness",
        description: "Supporting mind, body & spirit.",
      },
      {
        title: "Trusted Expertise",
        description: "Qualified herbalist with global experience.",
      },
    ],

    benefits: [
      "Professionally qualified UK-trained herbal medicine practitioner",
      "Serving clients in both Nigeria and the United Kingdom",
      "Individualised prescriptions — not one-size-fits-all",
      "Expert guidance on correct herb combinations and dosage",
      "Wide range of organic products for various health conditions",
      "Training and lifestyle advice alongside treatment",
      "Nature has the answer. We help you heal naturally.",
    ],
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
    flyer: "/images/businesses/dg-tal-mind/flyer.png",
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

    established: "2018",
    region: "UK",

    benefits: [
      "UK Government approved supplier — independently vetted and trusted",
      "Every solution is custom-built around your goals, culture, and budget",
      "24/7 managed support with guaranteed response SLAs",
      "Strategic alliances with IBM, AWS, Microsoft Azure & 14 more partners",
      "Serving startups, SMEs, and multinational corporations at scale",
      "Free initial technology assessment and roadmap consultation",
    ],

    testimonials: [
      {
        id: 1,
        author: "James Richardson",
        role: "CTO",
        company: "MediCare Solutions UK",
        text: "DG-Tal Mind completely transformed our IT infrastructure. Their managed services team is responsive, deeply knowledgeable, and genuinely invested in our business outcomes. The best technology partner we've worked with.",
        rating: 5,
      },
      {
        id: 2,
        author: "Sarah Okonkwo",
        role: "Operations Director",
        company: "Sterling Logistics",
        text: "From cloud migration to day-to-day support, the team delivered beyond every expectation. Their tailored approach and proactive communication set them apart from every other IT firm we've used.",
        rating: 5,
      },
      {
        id: 3,
        author: "David Mensah",
        role: "Founder",
        company: "NovaTech Startup",
        text: "As a startup, we needed a technology partner who understood our constraints. DG-Tal Mind stepped up with the perfect solution — professional, scalable, and built for where we're going, not just where we are.",
        rating: 5,
      },
    ],
  },
  {
    id: 9,
    slug: "amsun-maja",
    name: "Amsun Maja Construction Company Limited",
    category: "Professional Services",
    tagline: "Building Today, Transforming Tomorrow",
    description:
      "Amsun Maja Construction Company Limited is a multidisciplinary construction, engineering, and agricultural enterprise committed to delivering quality projects and sustainable business solutions. The company provides architectural design, quantity surveying, civil and structural engineering, facility evaluation, project management, and construction consultancy services. Beyond construction, Amsun Maja is actively involved in agricultural investments including livestock farming, oil palm cultivation, and food production, contributing to economic growth and sustainable development.",
    phone: "08033558213 / 08054661204",
    whatsapp: "+2348033558213",
    email: "amsunmaja4real@gmail.com",
    flyer: "/images/businesses/amsun-maja/flyer.png",
    region: "Nigeria",

    serviceCategories: [
      {
        name: "Professional Services",
        items: [
          "Architectural Services",
          "Quantity Surveying",
          "Concrete Hollow Blocks Production",
          "Civil Engineering",
          "Structural Engineering",
          "Facility Evaluation",
        ],
      },
      {
        name: "Related Services",
        items: [
          "Construction Bidding",
          "Contract Negotiation",
          "Contract Administration",
          "Due Diligence & Site Analysis",
          "Site Selection",
          "Project Budgeting",
          "Farming",
        ],
      },
      {
        name: "Agriculture",
        items: [
          "Oil Palm Plantation",
          "Pig Farming",
          "Livestock Farming",
          "Goat Rearing",
          "Banana Farming",
        ],
      },
      {
        name: "Construction",
        items: [
          "Building Construction",
          "Project Management",
          "Site Supervision",
          "Engineering Services",
        ],
      },
    ],

    values: [
      {
        title: "Commitment",
        description: "We focus on our clients, ensuring their needs come first.",
      },
      {
        title: "Progress",
        description: "We embrace technological advancement and grow with our clients.",
      },
      {
        title: "Integrity",
        description: "We are honest in our dealings.",
      },
      {
        title: "Accountability",
        description: "We take responsibility for our actions and honor our commitments.",
      },
      {
        title: "Responsibility",
        description: "We comply with applicable laws and regulations in the conduct of our business.",
      },
    ],

    benefits: [
      "Quality • Integrity • Reliability • Excellence",
      "Multidisciplinary firm spanning construction, engineering & agriculture",
      "Full project lifecycle — from design and bidding to site supervision",
      "Agricultural investments supporting food security and economic growth",
      "Concrete hollow blocks production for construction projects",
      "Compliant, accountable, and client-focused at every stage",
    ],
  },
  {
    id: 10,
    slug: "havilah-gold-school",
    name: "Havilah Gold Secondary School",
    category: "Education",
    tagline: "Excellence Today, Leaders Tomorrow.",
    description:
      "Havilah Gold Secondary School is a government-approved secondary school located in Epe, Lagos, committed to raising the next generation of leaders through quality education. The school offers Junior Secondary School (JSS) and Senior Secondary School (SSS) programmes in a structured, disciplined, and nurturing environment. Admissions are conducted through a formal entrance examination, ensuring academic standards are upheld for every intake.",
    location: "Sekoni House, Beside Fowobi Petrol Station, Epe-Ijebu Ode Road, Odomola Epe, Lagos",
    phone: "08080030001 / 08107501847 / 08033564879 / 08020777088",
    whatsapp: "+2348020777088",
    email: "havilahgoldinternationalschool@gmail.com",
    flyer: "/images/businesses/havilah-gold-school/flyer.jpeg",
    region: "Nigeria",

    serviceCategories: [
      {
        name: "Programmes Offered",
        items: [
          "Junior Secondary School (JSS 1–3)",
          "Senior Secondary School (SSS 1–3)",
        ],
      },
      {
        name: "2026/2027 Entrance Examination",
        items: [
          "Entrance Exam into JSS & SSS",
          "Date: 27th June, 2026",
          "Time: 9:00 AM",
          "Enquiries: 08020777088",
        ],
      },
    ],

    values: [
      {
        title: "Government Approved",
        description: "Fully accredited and approved by the relevant government education authorities.",
      },
      {
        title: "Academic Excellence",
        description: "Rigorous academic programmes designed to develop well-rounded, high-achieving students.",
      },
      {
        title: "Discipline & Character",
        description: "Building strong character, discipline, and leadership values alongside academic achievement.",
      },
      {
        title: "Nurturing Environment",
        description: "A safe, structured, and supportive learning environment for every student.",
      },
    ],

    benefits: [
      "Government approved — fully accredited secondary school",
      "Offering both JSS and SSS programmes",
      "Entrance examination — structured and merit-based admissions",
      "Located in Epe, Lagos — serving the Ijebu and Epe communities",
      "Contact: 08080030001 / 08107501847 / 08033564879 / 08020777088",
      "Email: havilahgoldinternationalschool@gmail.com",
    ],
  },
];
