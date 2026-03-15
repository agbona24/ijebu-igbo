import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import festivalImg from "@/assets/gallery-festival.jpg";
import diasporaImg from "@/assets/gallery-diaspora.jpg";
import communityImg from "@/assets/gallery-community.jpg";

const images = [
  { src: heroBg, alt: "Ijebu Igbo town aerial", span: "md:col-span-2 md:row-span-2" },
  { src: festivalImg, alt: "Cultural festival celebration", span: "" },
  { src: diasporaImg, alt: "Diaspora networking event", span: "" },
  { src: communityImg, alt: "Community development project", span: "md:col-span-2" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-16">
          <h2 className="label-accent">Gallery</h2>
          <h3 className="heading-section">A Glimpse of Home</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden rounded-sm group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
