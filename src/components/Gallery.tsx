import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import festivalImg from "@/assets/gallery-festival.jpg";
import diasporaImg from "@/assets/gallery-diaspora.jpg";
import communityImg from "@/assets/gallery-community.jpg";

const policeImages = Array.from({ length: 23 }, (_, i) => ({
  src: `/images/police_area_command/review${i + 1}.jpg`,
  alt: `Police Area Command Commissioning - ${i + 1}`,
}));

const images = [
  { src: heroBg, alt: "Ijebu Igbo town aerial" },
  { src: festivalImg, alt: "Cultural festival celebration" },
  { src: diasporaImg, alt: "Diaspora networking event" },
  { src: communityImg, alt: "Community development project" },
  { src: "/images/courtesy-call-orimolusi.jpeg", alt: "Courtesy Call to the Orimolusi of Ijebu Igbo" },
  { src: "/images/iid-carnival1.jpeg", alt: "IID Carnival 2025" },
  { src: "/images/iid-carnival2.jpeg", alt: "IID Carnival 2025" },
  { src: "/images/iid-carnival3.jpeg", alt: "IID Carnival 2025" },
  ...policeImages,
];

const PAGE_SIZE = 8;

export default function Gallery() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = images.slice(0, visible);
  const hasMore = visible < images.length;

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

        {/* Mobile: horizontal scroll (first 8 only) */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
            {shown.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="relative overflow-hidden rounded-xl flex-shrink-0 w-[260px] h-[190px] snap-center shadow-lg group"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium line-clamp-2">{img.alt}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: 4-column grid with lazy-load */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <AnimatePresence initial={false}>
              {shown.map((img, i) => (
                <motion.div
                  key={img.src + i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: (i % PAGE_SIZE) * 0.04 }}
                  className="relative overflow-hidden rounded-xl group shadow-md hover:shadow-2xl aspect-square transition-shadow duration-300"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="absolute bottom-0 inset-x-0 p-3 text-white text-sm font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.alt}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer — count + Show More */}
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
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all"
            >
              <Images size={16} />
              Show More Photos
            </button>
          )}

          {!hasMore && images.length > PAGE_SIZE && (
            <button
              onClick={() => setVisible(PAGE_SIZE)}
              className="inline-flex items-center gap-2 border border-border text-muted-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-all"
            >
              Show Less
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
