import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="section-padding bg-primary relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              currentColor 40px,
              currentColor 41px
            )`,
          }}
        />
      </div>

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground leading-tight tracking-tight mb-4 sm:mb-6">
            Help Preserve Ijebu-Igbo's Story
          </h2>
          <p className="text-primary-foreground/70 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            This archive grows through the community — old photographs, family
            histories, and corrections from those who know the towns best.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/heritage" className="btn-primary text-center inline-flex items-center justify-center gap-2">
              Explore the Archive
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 active:bg-primary-foreground/25 text-primary-foreground font-semibold rounded-xl transition-colors duration-200 touch-manipulation border border-primary-foreground/20"
            >
              Contribute a Record
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
