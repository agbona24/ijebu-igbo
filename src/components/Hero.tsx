import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent z-10" />
        <img
          src={heroBg}
          alt="Ijebu Igbo aerial view at golden hour"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container-main relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="max-w-3xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-accent/30 text-accent text-sm font-medium mb-6 backdrop-blur-md">
            ESTABLISHED 2024 • GLOBAL NETWORK
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-8 tracking-tight">
            Connecting Ijebu Igbo{" "}
            <span className="text-accent">Descendants</span>{" "}
            Across the World
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-sans max-w-xl mb-10 leading-relaxed">
            Promoting culture, unity, and sustainable development for Ijebu Igbo
            both at home and in the diaspora.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cta" className="btn-primary text-center">
              Join the Community
            </a>
            <a href="#impact" className="btn-outline-light text-center">
              Support Development
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
