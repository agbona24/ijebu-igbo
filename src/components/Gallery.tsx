import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import festivalImg from "@/assets/gallery-festival.jpg";
import diasporaImg from "@/assets/gallery-diaspora.jpg";
import communityImg from "@/assets/gallery-community.jpg";

// Police Area Command images
const policeImages = Array.from({ length: 23 }, (_, i) => ({
  src: `/images/police_area_command/review${i + 1}.jpg`,
  alt: `Police Area Command Commissioning - ${i + 1}`
}));

// Combine all images
const images = [
  { src: heroBg, alt: "Ijebu Igbo town aerial" },
  { src: festivalImg, alt: "Cultural festival celebration" },
  { src: diasporaImg, alt: "Diaspora networking event" },
  { src: communityImg, alt: "Community development project" },
  ...policeImages
];

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="label-accent">Gallery</h2>
          <h3 className="heading-section">Moments That Matter</h3>
          <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Explore our community in action - from cultural celebrations to landmark developments
          </p>
        </div>

        {/* Mobile: Horizontal scroll gallery */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-xl group flex-shrink-0 w-[280px] h-[200px] snap-center shadow-lg"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-white text-xs sm:text-sm font-medium line-clamp-2">
                  {img.alt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Masonry Gallery */}
        <div className="hidden md:block">
          <div className="columns-2 lg:columns-3 xl:columns-4 gap-3 lg:gap-4 space-y-3 lg:space-y-4">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className="break-inside-avoid relative overflow-hidden rounded-lg group shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm lg:text-base font-medium line-clamp-2">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {images.length} photos from our community
          </p>
        </motion.div>
      </div>
    </section>
  );
}
