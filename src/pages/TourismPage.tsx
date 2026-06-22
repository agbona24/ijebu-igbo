import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";

const ease = [0.16, 1, 0.3, 1] as const;

interface Place {
  id: string;
  name: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  location: string;
  image: string | null;
  description: string[];
  quote?: string;
  mapLink?: string;
}

const PLACES: Place[] = [
  {
    id: "aafin-orimolusi-palace",
    name: "Aafin Orimolusi Palace",
    subtitle: "Ijebu-Igbo Kingdom",
    badge: "Royal Heritage",
    badgeColor: "bg-accent text-white",
    location: "Ijebu-Igbo, Ogun State, Nigeria",
    image: "/images/aafin-orimolusi-palace.png",
    description: [
      "Standing majestically at the heart of Ijebu-Igbo, the Aafin Orimolusi Palace represents the rich cultural heritage, history, and traditional leadership of the Ijebu-Igbo Kingdom. As the official residence of the Orimolusi of Ijebu-Igbo, the palace serves as a symbol of unity, peace, progress, and the enduring traditions of the Yoruba people.",
      "The iconic entrance, adorned with royal insignia and distinguished architectural features, welcomes visitors into a kingdom deeply rooted in honour, wisdom, and community development. Beyond its gates lies a legacy that has guided generations, preserved cultural values, and fostered growth within the kingdom.",
      "Aafin Orimolusi remains not only a seat of traditional authority but also a beacon of cultural identity, where history meets modern aspirations for the prosperity of the people of Ijebu-Igbo.",
    ],
    quote: "Preserving Our Heritage, Inspiring Future Generations.",
    mapLink: "https://maps.google.com/?q=Aafin+Orimolusi+Palace,+Ijebu-Igbo,+Ogun+State,+Nigeria",
  },
  {
    id: "unity-house",
    name: "Unity House",
    subtitle: "Multipurpose Learning Resource Centre",
    badge: "Proposed Site",
    badgeColor: "bg-primary text-white",
    location: "Ijebu-Igbo, Ogun State, Nigeria",
    image: "/images/unity-house.png",
    description: [
      "Unity House is the proposed site for the Ijebu-Igbo Descendants Omo Orimolusi in Diaspora Multipurpose Learning Resource Centre — a landmark project that represents the community's commitment to education, development, and collective progress.",
      "Once completed, the centre will serve as a hub for learning, skills development, community gatherings, and cultural exchange, benefiting the people of Ijebu-Igbo both at home and in the diaspora. The facility is envisioned as a lasting physical legacy of the IID's investment in the homeland.",
      "The proposed site stands as a testament to what the diaspora community can achieve together — turning shared vision into brick-and-mortar reality for the next generation.",
    ],
    quote: "Building bridges between the diaspora and the homeland.",
  },
];

function PlaceCard({ place, index }: { place: Place; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={place.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease }}
      className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
        {/* Image */}
        <div className="relative lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-[280px] overflow-hidden bg-primary/10">
          {place.image ? (
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MapPin className="w-16 h-16 text-primary/20" />
            </div>
          )}
          {/* Gradient overlay on image */}
          <div
            className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent to-card/20`}
          />
          {/* Badge */}
          {place.badge && (
            <span
              className={`absolute top-4 ${isEven ? "left-4" : "right-4"} px-3 py-1 text-xs font-bold rounded-full shadow ${place.badgeColor}`}
            >
              {place.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          {place.subtitle && (
            <p className="label-accent mb-2">{place.subtitle}</p>
          )}
          <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground mb-1">
            {place.name}
          </h2>

          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-5">
            <MapPin size={13} className="shrink-0" />
            <span>{place.location}</span>
          </div>

          <div className="space-y-3">
            {place.description.map((para, i) => (
              <p key={i} className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {place.quote && (
            <blockquote className="mt-5 border-l-4 border-accent pl-4 text-foreground font-semibold italic text-sm sm:text-base">
              "{place.quote}"
            </blockquote>
          )}

          {place.mapLink && (
            <a
              href={place.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm transition-colors"
            >
              <MapPin size={15} />
              View on Google Maps
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TourismPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[42vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-accent mb-2"
          >
            Ijebu-Igbo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            Notable Places of Interest
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Discover the landmarks, heritage sites, and community projects that define
            the spirit and identity of Ijebu-Igbo — past, present, and future.
          </motion.p>
        </div>
      </section>

      {/* Places */}
      <section className="section-padding">
        <div className="container-main space-y-8 sm:space-y-12">
          {PLACES.map((place, index) => (
            <PlaceCard key={place.id} place={place} index={index} />
          ))}
        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
