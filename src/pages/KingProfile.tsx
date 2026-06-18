import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, MapPin, Quote, ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { kings } from "@/data/kings";

const ease = [0.16, 1, 0.3, 1] as const;

export default function KingProfile() {
  const { slug } = useParams();
  const king = kings.find((k) => k.slug === slug);

  if (!king) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Profile not found.</p>
          <Link to="/heritage" className="text-primary underline text-sm">← Back to Heritage</Link>
        </div>
      </div>
    );
  }

  const isPresent = king.status === "Present";
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = king.photos ?? [king.photo];
  const prevPhoto = () => setActivePhoto((i) => (i - 1 + photos.length) % photos.length);
  const nextPhoto = () => setActivePhoto((i) => (i + 1) % photos.length);

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-14 md:pt-20 overflow-hidden bg-primary">
        <div className="container-main py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Portrait gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease }}
              className="relative mx-auto max-w-xs lg:max-w-sm w-full"
            >
              {/* Gold border frame */}
              <div className="absolute inset-0 rounded-2xl border-4 border-accent/60 scale-[1.04] z-0" />
              <div className="absolute inset-0 rounded-2xl border border-accent/20 scale-[1.08] z-0" />
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto}
                    src={photos[activePhoto]}
                    alt={`${king.name} portrait ${activePhoto + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

                {/* Arrow controls */}
                {photos.length > 1 && (
                  <>
                    <button onClick={prevPhoto} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={nextPhoto} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors">
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                    isPresent ? "bg-accent text-charcoal" : "bg-white/20 text-white"
                  }`}>
                    <Crown size={11} />
                    {king.reign}
                  </span>
                  {/* Dot indicators */}
                  {photos.length > 1 && (
                    <div className="flex gap-1.5">
                      {photos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActivePhoto(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${i === activePhoto ? "bg-accent w-3" : "bg-white/40"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail strip */}
              {photos.length > 1 && (
                <div className="flex gap-2 justify-center mt-3">
                  {photos.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhoto(i)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activePhoto ? "border-accent" : "border-white/20 opacity-60"}`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="text-white"
            >
              <Link
                to="/heritage"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-accent text-xs font-semibold mb-6 transition-colors"
              >
                <ArrowLeft size={13} /> Back to Heritage
              </Link>

              <p className="text-accent text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3">
                The Orimolusi of Ijebu-Igbo
              </p>

              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-2">
                {king.name}
              </h1>

              {king.subtitle && (
                <p className="text-accent/80 text-sm sm:text-base italic mb-4">{king.subtitle}</p>
              )}

              <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                <MapPin size={13} />
                {king.hometown}
              </div>

              {/* Born / Died */}
              {(king.born || king.died) && (
                <div className="flex flex-col gap-1 mb-5 text-sm">
                  {king.born && <span className="text-white/70"><span className="text-white/40 mr-1">Born:</span>{king.born}</span>}
                  {king.died && <span className="text-white/70"><span className="text-white/40 mr-1">Died:</span>{king.died}</span>}
                </div>
              )}

              {/* Titles */}
              <div className="flex flex-wrap gap-2 mb-8">
                {king.titles.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold bg-white/10 border border-white/20 text-white/80 px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Quote */}
              {king.quote && (
                <div className="border-l-4 border-accent pl-4">
                  <Quote size={20} className="text-accent mb-2 opacity-60" />
                  <p className="text-white/80 italic text-sm sm:text-base leading-relaxed">
                    "{king.quote}"
                  </p>
                  {king.quoteAuthor && (
                    <p className="text-white/40 text-xs mt-2">— {king.quoteAuthor}</p>
                  )}
                </div>
              )}

              {king.author && (
                <p className="text-white/30 text-xs mt-6 italic">{king.author}</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BIOGRAPHY ── */}
      <div className="container-main py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Main biography */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display font-bold text-foreground text-xl sm:text-2xl mb-5 flex items-center gap-2">
              <Crown size={20} className="text-accent" />
              Biography
            </h2>
            <div className="space-y-4">
              {king.biography.map((para, i) => (
                <p key={i} className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Achievements / Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display font-bold text-foreground text-xl sm:text-2xl mb-6">
              Key Milestones
            </h2>
            <div className="space-y-4">
              {king.achievements.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <CheckCircle2 size={18} className="text-accent" />
                    {i < king.achievements.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-1 min-h-[28px]" />
                    )}
                  </div>
                  <div className="pb-4">
                    {item.year !== "—" && (
                      <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-1 inline-block">
                        {item.year}
                      </span>
                    )}
                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Reign info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="bg-primary rounded-2xl p-6 text-white shadow-sm"
          >
            <h3 className="font-display font-bold text-accent text-sm uppercase tracking-widest mb-4">
              Royal Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-0.5">Title</p>
                <p className="text-white font-semibold">Orimolusi of Ijebu-Igbo</p>
              </div>
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-0.5">Reign</p>
                <p className={`font-bold ${isPresent ? "text-accent" : "text-white/70"}`}>{king.reign}</p>
              </div>
              {king.born && (
                <div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-0.5">Born</p>
                  <p className="text-white/80">{king.born}</p>
                </div>
              )}
              {king.died && (
                <div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-0.5">Died</p>
                  <p className="text-white/80">{king.died}</p>
                </div>
              )}
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-0.5">Hometown</p>
                <p className="text-white/80">{king.hometown}</p>
              </div>
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-0.5">Grade</p>
                <p className="text-white/80">Grade One Oba (Paramount Ruler)</p>
              </div>
            </div>
          </motion.div>

          {/* Other king */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-5 pt-5 pb-3">
              Also See
            </p>
            {kings
              .filter((k) => k.slug !== king.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  to={`/heritage/orimolusi/${other.slug}`}
                  className="flex items-center gap-3 px-5 pb-5 group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-border">
                    <img src={other.photo} alt={other.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-xs text-accent font-bold">{other.reign}</p>
                    <p className="text-sm font-display font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {other.name}
                    </p>
                  </div>
                </Link>
              ))}
          </motion.div>

          {/* Back to heritage */}
          <Link
            to="/heritage"
            className="flex items-center justify-center gap-2 w-full border border-border bg-white rounded-xl py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm"
          >
            <ArrowLeft size={14} /> Back to Heritage
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
