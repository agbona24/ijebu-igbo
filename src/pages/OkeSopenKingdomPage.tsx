import { motion } from "framer-motion";
import { Crown, MapPin, Target, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import Lightbox, { useLightbox, ZoomableImage } from "@/components/Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

const galleryImages = [
  { src: "/images/oba-sopenlukale-mufutau-adesesan-yusuf.webp", alt: "HRM Oba (Dr.) Mufutau Adesesan Yusuf, The Sopenlukale of Oke-Sopen" },
];

// ── Data ──────────────────────────────────────────────────────────────────

const pastRulers = [
  { no: 1, title: "Baale", name: "Seriki Ogunsegun", years: "1886 – 1899" },
  { no: 2, title: "Baale", name: "Okusote", years: "1899" },
  { no: 3, title: "Baale", name: "Osofisan Alewenla", years: "1907 – 1912" },
  { no: 4, title: "Baale", name: "Fowora Ogiridigbamu", years: "1912 – 1924" },
  { no: 5, title: "Baale", name: "Shittu Ologben", years: "1924 – 1929" },
  { no: 6, title: "Baale", name: "Akinbanbo", years: "Feb – Dec 1929" },
  { no: 7, title: "Baale", name: "Gbadamosi Kone Alaga", years: "1930 – 1953" },
  { no: 8, title: "Olori-Ilu", name: "D. Olubajo", years: "1961 – 1964" },
  { no: 9, title: "Olori-Ilu", name: "S. Senjobi", years: "1967 – 1980" },
  { no: 10, title: "Olori-Ilu", name: "Amos Ogunbanjo", years: "1980 – 1987" },
  { no: 11, title: "HRH Oba", name: "S. O. Adeleye, MON", years: "1991 – 1998" },
  { no: 12, title: "HRM Oba (Dr.)", name: "M. A. Yusuf", years: "2003 – Present", current: true },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function OkeSopenKingdomPage() {
  const { index, direction, open, close, prev, next } = useLightbox(galleryImages);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/oke-sopen" />

      {/* Hero */}
      <section className="relative min-h-[48vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label-accent mb-2">
            Ijebu-Igbo · Oke-Sopen Quarter
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight">
            Oke-Sopen Kingdom
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed">
            Home of the Sopenlukale, one of the five founding quarters of Ijebu-Igbo.
          </motion.p>
        </div>
      </section>

      {/* Royal Portrait */}
      <section className="bg-[#fff8ec] py-10 sm:py-14">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }} className="text-center max-w-[280px] mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] mb-4">
              <ZoomableImage src={galleryImages[0].src} alt={galleryImages[0].alt} onClick={() => open(0)} />
            </div>
            <h3 className="font-display font-black text-foreground text-lg leading-tight">
              His Royal Majesty Oba (Dr.) Mufutau Adesesan Yusuf
            </h3>
            <p className="text-accent font-semibold text-sm mt-1">The Sopenlukale of Oke-Sopen</p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <h2 className="label-accent mb-2">About</h2>
            <h3 className="heading-section mb-6">About Oke-Sopen</h3>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: MapPin, label: "Neighbours", value: "Ojowo, Atikori, Japara" },
              { icon: Crown, label: "Ruler", value: "Sopenlukale" },
              { icon: Users, label: "Bales", value: "31 Bales" },
              { icon: Target, label: "Recorded Rulers", value: "12 since 1886" },
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
            Oke-Sopen is one of the five quarters of Ijebu-Igbo, governed under the title Sopenlukale. As with the other quarters, the headship of Oke-Sopen has evolved over time — the earliest recorded heads held the title Baale, later upgraded to Olori-Ilu, and finally to Oba, the title held by the reigning Sopenlukale today.
          </motion.p>
        </div>
      </section>

      {/* Past Rulers */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">History</h2>
            <h3 className="heading-section">Past &amp; Present Rulers of Oke-Sopen</h3>
          </motion.div>
          <div className="space-y-2">
            {pastRulers.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease }}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${r.current ? "bg-accent/10 border-accent/40 shadow-md" : "bg-card border-border"}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${r.current ? "bg-accent text-white" : "bg-primary/10 text-primary"}`}>
                  {r.no}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm leading-tight ${r.current ? "text-accent" : "text-foreground"}`}>
                    {r.title} {r.name}
                    {r.current && <span className="ml-2 text-xs bg-accent text-white px-2 py-0.5 rounded-full font-semibold">Current</span>}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.years}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={galleryImages} index={index} direction={direction} onClose={close} onPrev={prev} onNext={next} />

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
