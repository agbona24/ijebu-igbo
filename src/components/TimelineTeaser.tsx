import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, Users, Heart, Landmark, BookOpen, ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const milestones = [
  { year: "Pre-1500s", title: "Founding", icon: Crown, text: "Five hunting camps unite under the first Orimolusi at Oke-Tako." },
  { year: "1500s–1800s", title: "Kingdom Era", icon: Users, text: "Ijebu-Igbo flourishes as a trading centre and cultural capital." },
  { year: "1800s–1960", title: "Colonial Period", icon: Heart, text: "Chieftaincy and tradition endure through colonial rule." },
  { year: "1994–2022", title: "Vacant Throne", icon: Landmark, text: "The Orimolusi stool stands empty for 28 years." },
  { year: "2022–Now", title: "Present Day", icon: BookOpen, text: "Oba Jaiyeoba Adebajo reigns; seven Town Obas now stand." },
];

export default function TimelineTeaser() {
  return (
    <section className="section-padding bg-surface overflow-hidden">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10 sm:mb-14"
        >
          <div>
            <h2 className="label-accent">Our Journey</h2>
            <h3 className="heading-section">From Hunting Camps to a Kingdom</h3>
          </div>
          <Link to="/heritage" className="text-sm font-semibold text-primary hover:text-accent transition-colors inline-flex items-center gap-1.5 shrink-0">
            Full timeline <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Horizontal scroll-snap strip */}
      <div className="container-main">
        <div className="relative">
          <div className="absolute left-0 right-0 top-6 h-px bg-border hidden sm:block" />
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                className="relative shrink-0 w-[260px] sm:w-[280px] snap-start"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 shadow-md">
                  <m.icon size={18} className="text-white" />
                </div>
                <div className="bg-card border border-border rounded-2xl p-5 h-[170px] flex flex-col">
                  <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">{m.year}</p>
                  <h4 className="font-display font-bold text-foreground text-base mb-2">{m.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
