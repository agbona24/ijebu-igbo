import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, ArrowUpRight } from "lucide-react";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

const ease = [0.16, 1, 0.3, 1] as const;

interface Town {
  slug: string;
  name: string;
  oba: string;
  obaName: string;
  image: string;
  big?: boolean;
  wide?: boolean;
}

const towns: Town[] = [
  {
    slug: "/oke-sopen",
    name: "Oke-Sopen",
    oba: "Seat of the Orimolusi",
    obaName: "Sopenlukale",
    image: "/images/oke-sopen/oba-sopenlukale-mufutau-adesesan-yusuf.webp",
    big: true,
  },
  {
    slug: "/atikori",
    name: "Atikori",
    oba: "Town Oba",
    obaName: "Keegbo",
    image: "/images/atikori/oba-keegbo-ibitoye-solaja.webp",
  },
  {
    slug: "/japara",
    name: "Japara",
    oba: "Town Oba",
    obaName: "Abijaparako",
    image: "/images/japara/oba-abijaparako-aderemi-adewale-ogunye.webp",
  },
  {
    slug: "/ojowo",
    name: "Ojowo",
    oba: "Town Oba",
    obaName: "Olokine",
    image: "/images/ojowo/oba-olokine-abdulrasheed-banjo.webp",
  },
  {
    slug: "/oke-agbo",
    name: "Oke-Agbo",
    oba: "Town Oba",
    obaName: "Bejeroku",
    image: "/images/oke-agbo/oba-bejeroku-stephen-adekoya.webp",
  },
  {
    slug: "/imope-ijebu",
    name: "Imope-Ijebu",
    oba: "Town Oba",
    obaName: "Onimope",
    image: "/images/imope-ijebu/oba-onimope-tajudeen-omotayo.webp",
  },
  {
    slug: "/aparaki",
    name: "Aparaki",
    oba: "Town Oba",
    obaName: "Alaparaki",
    image: "/images/aparaki/oba-alaparaki-julius-benedict-ogunfowora.webp",
    wide: true,
  },
];

/** Small animated adire-inspired corner motif */
function CornerMotif({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      className="absolute top-3 right-3 w-8 h-8 opacity-0 group-hover:opacity-70 transition-opacity duration-500"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
      <motion.circle
        cx="20" cy="20" r="12"
        stroke="currentColor" strokeWidth="1"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{ pathLength: 1, rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay }}
      />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}

function TownTile({ town, index }: { town: Town; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease }}
      className={`${town.big ? "col-span-2 row-span-2" : town.wide ? "col-span-2" : "col-span-1"} row-span-1`}
    >
      <Link
        to={town.slug}
        className="group relative block w-full h-full overflow-hidden rounded-2xl bg-charcoal"
      >
        <ImageWithSkeleton
          src={town.image}
          alt={`${town.obaName} of ${town.name}`}
          className="absolute inset-0 w-full h-full"
          imgClassName={`object-cover object-top transition-transform duration-700 group-hover:scale-110 ${town.big ? "object-center" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 group-hover:from-primary/90 transition-colors duration-500" />

        <CornerMotif delay={index * 0.3} />

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
          <span className="inline-flex items-center gap-1 text-accent text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
            <Crown size={11} /> {town.oba}
          </span>
          <h3 className={`font-display font-bold text-white leading-tight ${town.big ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl"}`}>
            {town.name}
          </h3>
          <p className={`text-white/60 ${town.big ? "text-sm sm:text-base mt-1" : "text-xs mt-0.5"}`}>
            {town.obaName}
          </p>

          <span className="inline-flex items-center gap-1 text-white text-xs font-semibold mt-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            Explore {town.name} <ArrowUpRight size={13} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TownsShowcase() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12"
        >
          <div>
            <h2 className="label-accent">The Kingdom</h2>
            <h3 className="heading-section">Seven Towns, Seven Obas</h3>
          </div>
          <p className="text-body max-w-sm">
            Each town governs its own quarters under its own Oba, all within
            the Orimolusi's Ijebu-Igbo. Tap a town to open its full record.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense auto-rows-[170px] sm:auto-rows-[200px] md:auto-rows-[230px] gap-3 md:gap-4">
          {towns.map((town, i) => (
            <TownTile key={town.slug} town={town} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
