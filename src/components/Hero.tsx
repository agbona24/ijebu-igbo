import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import ClanNetwork from "@/components/ClanNetwork";

const ease = [0.16, 1, 0.3, 1] as const;

const quickTowns = [
  { name: "Oke-Sopen", href: "/oke-sopen" },
  { name: "Atikori", href: "/atikori" },
  { name: "Japara", href: "/japara" },
  { name: "Ojowo", href: "/ojowo" },
  { name: "Oke-Agbo", href: "/oke-agbo" },
  { name: "Imope-Ijebu", href: "/imope-ijebu" },
  { name: "Aparaki", href: "/aparaki" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] lg:h-screen flex flex-col overflow-hidden bg-charcoal">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          poster={heroBg}
        >
          <source src="/videos/ojude-oba.mp4" type="video/mp4" />
          <source src="/videos/ojude-oba.webm" type="video/webm" />
        </video>
        <img
          src={heroBg}
          alt="Ijebu Igbo aerial view at golden hour"
          className="w-full h-full object-cover absolute inset-0 -z-10"
        />
        {/* Bottom-weighted gradient so text sits on solid ground */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-primary/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-transparent z-10" />
      </div>

      {/* Vector network animation connecting all seven towns */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease }}
        className="hidden lg:block absolute right-[-60px] top-1/2 -translate-y-[54%] w-[560px] h-[560px] xl:w-[640px] xl:h-[640px] pointer-events-none"
      >
        <ClanNetwork />
      </motion.div>

      {/* Top-left mark */}
      <div className="relative z-20 pt-20 sm:pt-24 lg:pt-28 container-main">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-block text-accent text-xs sm:text-sm font-bold uppercase tracking-[0.25em]"
        >
          Ẹ̀ wẹ̀ sọ̀ọ́ Ọmọ Alárè — a living archive
        </motion.span>
      </div>

      {/* Bottom-anchored headline block */}
      <div className="relative z-20 mt-auto container-main pb-8 sm:pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="font-display font-bold text-white leading-[0.98] tracking-tight
                     text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl"
        >
          Seven Towns.
          <br />
          One <span className="text-accent italic">Crown.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="text-white/75 text-sm sm:text-base md:text-lg max-w-lg mt-4 sm:mt-6 leading-relaxed"
        >
          The living archive of Ijebu-Igbo — its Obas, its towns, and the
          history that has shaped a Yoruba kingdom for generations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8"
        >
          <Link to="/heritage" className="btn-primary text-center min-h-[48px] font-semibold">
            Explore the Obas
          </Link>
          <Link to="/tourism" className="btn-outline-light text-center min-h-[48px] flex items-center justify-center font-semibold">
            Discover the Towns
          </Link>
        </motion.div>
      </div>

      {/* Seven-towns quick-nav strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-30 border-t border-white/10 bg-black/30 backdrop-blur-sm"
      >
        <div className="container-main flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide py-3 sm:py-4">
          <span className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest shrink-0 mr-2">
            Towns
          </span>
          {quickTowns.map((t, i) => (
            <Link
              key={t.href}
              to={t.href}
              className="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <span className="w-1 h-1 rounded-full bg-accent group-hover:scale-150 transition-transform" />
              {t.name}
              {i < quickTowns.length - 1 && <span className="text-white/20 ml-1 sm:ml-2">/</span>}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
