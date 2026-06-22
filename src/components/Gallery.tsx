import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Images, X, ChevronLeft, ChevronRight, ZoomIn, Expand } from "lucide-react";
import { useSanityGallery, type GalleryImage } from "@/hooks/useSanityGallery";

const PAGE_SIZE = 8;

/* ── Lightbox with directional slide ─────────────────────────── */
function Lightbox({
  images, index, direction, onClose, onPrev, onNext,
}: {
  images: GalleryImage[]; index: number; direction: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const img = images[index];

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose, onPrev, onNext]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir >= 0 ? 260 : -260, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir >= 0 ? -260 : 260, opacity: 0, scale: 0.97 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white/60 text-sm font-semibold bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-accent hover:text-primary border border-white/20 flex items-center justify-center text-white transition-all duration-200"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Sliding image */}
      <div className="relative max-w-5xl w-full flex items-center justify-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full flex items-center justify-center"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl px-6 py-5">
              <p className="text-white text-sm sm:text-base font-medium text-center">{img.alt}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-accent hover:text-primary border border-white/20 flex items-center justify-center text-white transition-all duration-200"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[200px] overflow-hidden">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${i === index ? "bg-accent w-5" : "bg-white/30 w-1.5"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── 3D tilt card ─────────────────────────────────────────────── */
function GalleryCard({
  img, index, isNew, onClick,
}: {
  img: { src: string; alt: string };
  index: number;
  isNew: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-8, 8]), springConfig);
  const glareOpacity = useSpring(useTransform(rawX, [-1, 1], [0, 0.15]), springConfig);
  const glareBackground = useTransform(
    glareOpacity,
    (v) => `linear-gradient(135deg, rgba(255,255,255,${v}) 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    rawY.set((e.clientY - rect.top) / rect.height * 2 - 1);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const col = index % 4;
  const row = Math.floor(index / 4);

  return (
    <motion.button
      ref={cardRef}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={isNew ? { opacity: 0, y: 48, scale: 0.92 } : { opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: isNew ? (index % PAGE_SIZE) * 0.06 : col * 0.07 + row * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl group shadow-md aspect-square w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      {/* Glare layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ background: glareBackground }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Expand icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <motion.div
          initial={{ scale: 0.6 }}
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center shadow-lg"
        >
          <Expand size={20} className="text-primary" />
        </motion.div>
      </div>

      {/* Caption */}
      <p className="absolute bottom-0 inset-x-0 px-3 pb-3 text-white text-xs sm:text-sm font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
        {img.alt}
      </p>
    </motion.button>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export default function Gallery() {
  const { data: images = [] } = useSanityGallery();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [prevVisible, setPrevVisible] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const shown = images.slice(0, visible);
  const hasMore = visible < images.length;

  const open = (i: number) => { setDirection(0); setLightboxIndex(i); };
  const close = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((i) => i === null ? null : (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setLightboxIndex((i) => i === null ? null : (i + 1) % images.length);
  }, [images.length]);

  const handleShowMore = () => {
    setPrevVisible(visible);
    setVisible((v) => v + PAGE_SIZE);
  };

  const handleShowLess = () => {
    setPrevVisible(0);
    setVisible(PAGE_SIZE);
  };

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="label-accent">Gallery</h2>
          <h3 className="heading-section">Moments That Matter</h3>
          <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Explore our community in action — from cultural celebrations to landmark developments
          </p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
            {shown.map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => open(i)}
                className="relative overflow-hidden rounded-2xl flex-shrink-0 w-[260px] h-[190px] snap-center shadow-lg group focus:outline-none"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center">
                  <ZoomIn size={14} className="text-primary" />
                </div>
                <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium line-clamp-2">{img.alt}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Desktop: grid with 3D tilt cards */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4" style={{ perspective: "1200px" }}>
            {shown.map((img, i) => (
              <GalleryCard
                key={img.src + i}
                img={img}
                index={i}
                isNew={i >= prevVisible}
                onClick={() => open(i)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-8 sm:mt-10 space-y-4"
        >
          <p className="text-gray-500 text-sm">
            Showing <span className="font-semibold text-foreground">{shown.length}</span> of{" "}
            <span className="font-semibold text-foreground">{images.length}</span> photos
          </p>

          {hasMore && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShowMore}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
            >
              <Images size={16} />
              Show More Photos
            </motion.button>
          )}

          {!hasMore && images.length > PAGE_SIZE && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShowLess}
              className="inline-flex items-center gap-2 border border-border text-muted-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-all"
            >
              Show Less
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            direction={direction}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
