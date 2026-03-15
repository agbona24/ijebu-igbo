import { motion } from "framer-motion";

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight tracking-tight mb-6">
            Together We Can Build a Greater Ijebu Igbo
          </h2>
          <p className="text-primary-foreground/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Your expertise, your resources, and your passion can help transform
            our homeland. Join us in making a lasting difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-center">
              Become a Member
            </button>
            <button className="btn-outline-light text-center">
              Support Development
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
