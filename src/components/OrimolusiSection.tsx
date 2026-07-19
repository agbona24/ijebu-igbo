import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, ArrowRight, Quote } from "lucide-react";
import { useSanityKings } from "@/hooks/useSanityKings";

const ease = [0.16, 1, 0.3, 1] as const;

export default function OrimolusiSection() {
  const { data: kings = [] } = useSanityKings();
  const reigning = kings.find((k) => k.status === "Present") ?? kings[0];
  const previous = kings.filter((k) => k.slug !== reigning?.slug);

  if (!reigning) return null;

  return (
    <section className="section-padding bg-[#f8f6f1] relative overflow-hidden">
      {/* decorative vector crown outline */}
      <svg className="absolute -left-16 -bottom-16 w-72 h-72 opacity-[0.05] pointer-events-none" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M2 18h20l-2-9-5 4-3-7-3 7-5-4-2 9Z" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="label-accent">Royal Heritage</h2>
          <h3 className="heading-section">The Orimolusi of Ijebu-Igbo</h3>
        </motion.div>

        {/* Featured reigning Oba — large editorial split */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-elevated bg-primary"
        >
          <div className="lg:col-span-2 relative aspect-[4/5] lg:aspect-auto">
            <img
              src={reigning.photos?.[0] ?? reigning.photo}
              alt={reigning.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-primary" />
          </div>

          <div className="lg:col-span-3 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-4">
              <Crown size={13} /> Reigning Orimolusi
            </span>
            <h4 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-3">
              {reigning.name}
            </h4>
            {reigning.subtitle && (
              <p className="text-accent/80 text-sm sm:text-base italic mb-5">{reigning.subtitle}</p>
            )}

            {reigning.quote && (
              <div className="flex gap-3 mb-6">
                <Quote size={22} className="text-accent shrink-0 mt-1" />
                <p className="text-white/80 text-sm sm:text-base leading-relaxed italic">
                  "{reigning.quote}"
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs sm:text-sm text-white/60 mb-7">
              {reigning.reign && <span><span className="text-white/40">Reign:</span> {reigning.reign}</span>}
              {reigning.hometown && <span><span className="text-white/40">From:</span> {reigning.hometown}</span>}
            </div>

            <Link
              to={`/heritage/orimolusi/${reigning.slug}`}
              className="inline-flex items-center gap-2 self-start bg-accent text-white font-bold text-sm px-6 py-3 rounded-xl hover:brightness-110 transition-all"
            >
              Read Full Profile <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Previous Obas — secondary row */}
        {previous.length > 0 && (
          <div className="mt-8 sm:mt-10">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Previous Obas
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {previous.map((king, i) => (
                <motion.div
                  key={king.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                >
                  <Link
                    to={`/heritage/orimolusi/${king.slug}`}
                    className="group flex items-center gap-4 bg-white rounded-2xl border border-border p-4 hover:border-accent/40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-muted">
                      <img
                        src={king.photos?.[0] ?? king.photo}
                        alt={king.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-bold text-foreground text-sm sm:text-base truncate">{king.name}</p>
                      <p className="text-xs text-muted-foreground">{king.reign}</p>
                    </div>
                    <ArrowRight size={15} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/heritage"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            Explore the full Ijebu-Igbo Ruling Hierarchy <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
