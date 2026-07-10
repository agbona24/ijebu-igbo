import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import Lightbox, { useLightbox, ZoomableImage } from "@/components/Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

const galleryImages = [
  { src: "/images/imope-ijebu/oba-onimope-tajudeen-omotayo.webp", alt: "HRH Alaiyeluwa Oba Tajudeen Kolawole Ibirogbo Adesujibomi Omotayo — The Onimope of Imope-Ijebu" },
];

export default function ImopeIjebuPage() {
  const { index, direction, open, close, prev, next } = useLightbox(galleryImages);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/imope-ijebu" />

      {/* Hero */}
      <section className="relative min-h-[48vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label-accent mb-2">
            Ijebu-Igbo · Imope-Ijebu Town
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight">
            Imope-Ijebu
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed">
            Home of the Onimope, one of the towns under the Orimolusi of Ijebu-Igbo.
          </motion.p>
        </div>
      </section>

      {/* Royal Portrait */}
      <section className="bg-[#eefcff] py-10 sm:py-14">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }} className="text-center max-w-[280px] mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square mb-4">
              <ZoomableImage src={galleryImages[0].src} alt={galleryImages[0].alt} onClick={() => open(0)} />
            </div>
            <h3 className="font-display font-black text-foreground text-lg leading-tight">
              His Royal Highness Oba Tajudeen Kolawole Ibirogbo Adesujibomi Omotayo
            </h3>
            <p className="text-accent font-semibold text-sm mt-1">The Onimope of Imope-Ijebu</p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <h2 className="label-accent mb-2">About</h2>
            <h3 className="heading-section mb-6">About Imope-Ijebu</h3>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
              <Crown size={20} className="text-accent mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Ruler</p>
              <p className="font-bold text-foreground text-sm">Onimope</p>
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }} className="text-muted-foreground leading-relaxed mb-8">
            Imope-Ijebu is one of the towns under the traditional authority of the Orimolusi of Ijebu-Igbo. It was formerly led by an Olori-Ilu before being elevated to Obaship, now held by His Royal Highness Oba Tajudeen Kolawole Ibirogbo Adesujibomi Omotayo, the Onimope of Imope-Ijebu.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="bg-accent/10 border border-accent/30 rounded-2xl p-5 text-center">
            <p className="text-sm text-foreground/80 leading-relaxed">
              We're still gathering history, chiefs and heritage places for Imope-Ijebu. If you have content to share, reach out via the Contact page.
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
