import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPinned, Crown, BookOpen, Landmark } from "lucide-react";

const stats = [
  { icon: MapPinned, value: 7,   suffix: "",  label: "Towns Under the Orimolusi" },
  { icon: Crown,     value: 8,   suffix: "",  label: "Obas — Paramount & Town" },
  { icon: Landmark,  value: 1886, suffix: "", label: "Earliest Documented Ruler at Oke-Tako", plain: true },
  { icon: BookOpen,  value: 70,  suffix: "+", label: "Archive Articles & Growing" },
];

function CountUp({ target, suffix = "", plain = false }: { target: number; suffix?: string; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {plain ? value : value.toLocaleString()}
      {suffix}
    </span>
  );
}

/** Subtle drifting line pattern, purely decorative */
function DriftPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.07]" preserveAspectRatio="none" aria-hidden>
      <defs>
        <pattern id="kingdom-lines" width="64" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <line x1="0" y1="0" x2="0" y2="64" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <motion.rect
        width="100%" height="100%" fill="url(#kingdom-lines)"
        initial={{ x: 0 }}
        animate={{ x: [-64, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

export default function KingdomStats() {
  return (
    <section className="relative bg-charcoal py-10 sm:py-14 overflow-hidden">
      <DriftPattern />
      <div className="container-main relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center sm:text-left"
            >
              <s.icon className="mx-auto sm:mx-0 mb-2 text-accent" size={20} />
              <p className="font-display font-black text-3xl sm:text-4xl text-white tabular-nums">
                <CountUp target={s.value} suffix={s.suffix} plain={s.plain} />
              </p>
              <p className="text-white/50 text-xs sm:text-sm mt-1 leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
