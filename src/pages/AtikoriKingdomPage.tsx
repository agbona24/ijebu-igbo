import { motion } from "framer-motion";
import { Crown, MapPin, Target, Users, Music } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import Lightbox, { useLightbox, ZoomableImage } from "@/components/Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

// ── Data ──────────────────────────────────────────────────────────────────

const ituns = ["Bogije", "Oriwu", "Igodo", "Oke Moje", "Etitale", "Oridan", "Aboyin", "Itun Tapa"];

const royalCouple = [
  { photo: "/images/atikori/oba-keegbo-ibitoye-solaja.webp", name: "Alayeluwa Kabiyesi Oba Ibitoye Solaja, JP", title: "The Keegbo of Atikori, Ijebu Igbo" },
  { photo: "/images/atikori/olori-yemisi-solaja.webp", name: "Olori Yemisi Solaja", title: "The Olori Keegbo of Atikori" },
];

const oloriwuns = [
  { photo: "/images/atikori/chief-adebola-adenubi-oloritun-bogije.webp", name: "Chief Adebola Adenubi", title: "Oloritun of Bogije" },
  { photo: "/images/atikori/chief-michael-folorunso-agbogunloko-oloritun-oriwu.webp", name: "Chief Michael Folorunso Agbogunloko", title: "Oloritun of Oriwu" },
  { photo: "/images/atikori/chief-abolanle-ajadi-yekini-oloritun-oke-moje.webp", name: "Chief (Hon.) Abolanle Ajadi Yekini", title: "Oloritun of Oke Moje" },
  { photo: "/images/atikori/chief-abiodun-olayinka-olomitutu-oloritun-oridan.webp", name: "Chief Abiodun Olayinka (Olomitutu)", title: "Oloritun of Oridan" },
  { photo: "/images/atikori/chief-adesanya-tunde-sawyer-oloritun-itun-tapa.webp", name: "Chief Adesanya Tunde Sawyer, JP", title: "Oloritun of Itun Tapa" },
];

const places = [
  {
    image: "/images/atikori/st-james-church-atikori.webp",
    name: "St James Anglican Church",
    description: "The first and oldest church in Ijebu-Igbo, standing as a living monument to the earliest introduction of Christianity into the region.",
  },
  {
    image: "/images/atikori/abraham-adesanya-polytechnic-atikori.webp",
    name: "Abraham Adesanya Polytechnic",
    description: "A key tertiary educational institution named in honour of the late Chief Abraham Adesanya, a towering figure in Yoruba and Nigerian politics.",
  },
  {
    image: "/images/atikori/atikori-football-team.webp",
    name: "Atikori Football Team",
    description: "A vehicle for community pride and youth development, bringing together young men who carry the name of Atikori forward with discipline and passion.",
  },
  {
    image: "/images/atikori/oke-oyinbo-colonial-office.webp",
    name: "Oke-Oyinbo Colonial Office",
    description: "The former office of the colonial masters, a heritage site marking Atikori's place in the colonial-era administration of the region.",
  },
  {
    image: "/images/atikori/muslim-praying-ground-oke-alafia-atikori.webp",
    name: "Muslim Praying Ground, Oke Alafia",
    description: "A long-standing open-air praying ground serving the Muslim community of Atikori during Eid and other communal prayers.",
  },
  {
    image: "/images/atikori/leper-colony-atikori-building.webp",
    name: "Leper Colony, Atikori",
    description: "A historic settlement built to house and care for people affected by leprosy, standing today as part of Atikori's social history.",
  },
  {
    image: "/images/atikori/palm-oil-production-atikori.webp",
    name: "Palm-Oil Production Centre",
    description: "A local palm-oil production site reflecting Atikori's agrarian roots, where freshly harvested palm fruit is gathered for processing.",
  },
];

const galleryImages = [
  ...royalCouple.map((p) => ({ src: p.photo, alt: `${p.name} — ${p.title}` })),
  ...oloriwuns.map((c) => ({ src: c.photo, alt: `${c.name} — ${c.title}` })),
  ...places.map((p) => ({ src: p.image, alt: p.name })),
];

const anthemVerse1 = `Atikori ilu mi
Ilu Olola Olokiki
Ng o gbe o leke okan mi
Ng o ma wa ilosiwaju re
Keegbo eni gba
Keegba eni juse
Olorun Oba ranmi lowo
Lati gbe Atikori soke
Konibaje lowo mi`;

const anthemVerse2 = `Parapo dokan soso
Eje ka jose koda
Awa larole Kegbo
Tanrin Larinkoye
Kajose kodara.`;

// ── Page ───────────────────────────────────────────────────────────────────

export default function AtikoriKingdomPage() {
  const { index, direction, open, close, prev, next } = useLightbox(galleryImages);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/atikori" />

      {/* Hero */}
      <section className="relative min-h-[48vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label-accent mb-2">
            Ijebu-Igbo · Atikori Quarter
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight">
            Atikori
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed">
            Home of the Keegbo, eight Itun agba, and the oldest church in Ijebu-Igbo.
          </motion.p>
        </div>
      </section>

      {/* Royal Couple */}
      <section className="bg-[#f5f0ff] py-10 sm:py-14">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center items-center">
            {royalCouple.map((person, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }} className="text-center max-w-[260px]">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] mb-4">
                  <ZoomableImage src={person.photo} alt={person.name} onClick={() => open(i)} />
                </div>
                <h3 className="font-display font-black text-foreground text-base leading-tight">{person.name}</h3>
                <p className="text-accent font-semibold text-sm mt-1">{person.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <h2 className="label-accent mb-2">About</h2>
            <h3 className="heading-section mb-6">About Atikori</h3>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: MapPin, label: "Neighbours", value: "Ojowo, Japara, Oke-Sopen" },
              { icon: Crown, label: "Ruler", value: "Keegbo" },
              { icon: Users, label: "Structure", value: "8 Itun Agba" },
              { icon: Target, label: "Baales", value: "23 Baales" },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
                <Icon size={20} className="text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{label}</p>
                <p className="font-bold text-foreground text-sm">{value}</p>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }} className="text-muted-foreground leading-relaxed">
            Atikori is one of the five quarters of Ijebu-Igbo, bordering Ojowo, Japara and Oke-Sopen. It was originally made up of eight Itun referred to as <em>Itun agba</em>, whose heads are titled <em>Oloritun agba</em>. It is these eight Itun agba that produce the Keegbo — the ruling Oba of Atikori — in rotation.
          </motion.p>

          <div className="mt-8">
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Users size={15} className="text-accent" /> The Eight Itun Agba
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ituns.map((itun, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease }}
                  className="bg-card border border-border rounded-xl py-3 px-2 text-center">
                  <span className="font-display font-bold text-foreground text-sm">{itun}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Oloritun Agba */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Leadership</h2>
            <h3 className="heading-section">Oloritun Agba of Atikori</h3>
            <p className="text-body mt-2">Heads of the Itun agba, each presiding over their quarter's affairs.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {oloriwuns.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }} className="text-center">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white aspect-[3/4] mb-3">
                  <ZoomableImage src={c.photo} alt={c.name} onClick={() => open(royalCouple.length + i)} />
                </div>
                <h4 className="font-display font-bold text-foreground text-xs sm:text-sm leading-tight">{c.name}</h4>
                <p className="text-accent font-semibold text-xs mt-1">{c.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Places */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Heritage</h2>
            <h3 className="heading-section">Places of Atikori</h3>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {places.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <ZoomableImage src={p.image} alt={p.name} onClick={() => open(royalCouple.length + oloriwuns.length + i)} />
                </div>
                <div className="p-4">
                  <h4 className="font-display font-bold text-foreground text-sm">{p.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Atikori Anthem */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Music size={22} className="text-accent" />
              <h3 className="font-display font-black text-accent text-2xl sm:text-3xl">Atikori Anthem</h3>
              <Music size={22} className="text-accent" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-2xl p-6 sm:p-10 backdrop-blur-sm">
            <p className="font-display text-base sm:text-lg text-primary-foreground/90 leading-loose text-center whitespace-pre-line italic">
              {anthemVerse1}
            </p>
            <div className="my-7 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-accent/50" />
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">The Quarters</span>
              <span className="h-px w-12 bg-accent/50" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
              {ituns.map((q) => (
                <div key={q} className="bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl py-2.5 px-2 text-center">
                  <span className="font-display font-bold text-primary-foreground text-sm uppercase tracking-wide">{q}</span>
                </div>
              ))}
            </div>
            <p className="font-display text-base sm:text-lg text-primary-foreground/90 leading-loose text-center whitespace-pre-line italic">
              {anthemVerse2}
            </p>
          </motion.div>
        </div>
      </section>

      <Lightbox images={galleryImages} index={index} direction={direction} onClose={close} onPrev={prev} onNext={next} />

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
