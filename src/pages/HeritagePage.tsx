import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import Story from "@/components/Story";
import Timeline from "@/components/Timeline";
import RulingHierarchy from "@/components/RulingHierarchy";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Crown, MapPin } from "lucide-react";

export default function HeritagePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/heritage" />

      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative h-52 md:h-64 flex flex-col items-center justify-center">
          <AnimatedHeroBg gradientClass="bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center px-4"
          >
            <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase block mb-2">
              Ijebu-Igbo Heritage
            </span>
            <h1 className="font-display font-black text-white text-4xl sm:text-5xl">
              Our Heritage
            </h1>
            <p className="text-white/70 text-sm sm:text-base mt-2 max-w-lg mx-auto">
              The roots, the history, and the living culture of Ijebu Igbo.
            </p>
          </motion.div>
        </div>
      </section>

      <RulingHierarchy />

      {/* Town Profiles */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="label-accent mb-2">Explore</h2>
            <h3 className="heading-section">Town Profiles</h3>
            <p className="text-body mt-2">Dive deeper into the history, leadership and culture of each town.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/ojowo"
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-36 bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/ojowo/oba-olokine-abdulrasheed-banjo.webp"
                    alt="Olokine of Ojowo"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="relative z-10 text-center px-4">
                    <Crown size={28} className="text-white mx-auto mb-1" />
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Town Oba</p>
                    <h4 className="text-white font-display font-black text-xl">Ojowo</h4>
                    <p className="text-white/70 text-xs mt-1">Olokine of Ojowo</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={11} /> Ojowo Quarter, Ijebu-Igbo
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">
                      History · Chiefs · Anthem · Calendar
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-accent shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <Link
                to="/japara"
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-36 bg-gradient-to-br from-rose-700 to-rose-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/japara/oba-abijaparako-aderemi-adewale-ogunye.webp"
                    alt="Abijaparako of Japara"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="relative z-10 text-center px-4">
                    <Crown size={28} className="text-white mx-auto mb-1" />
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Town Oba</p>
                    <h4 className="text-white font-display font-black text-xl">Japara</h4>
                    <p className="text-white/70 text-xs mt-1">Abijaparako of Japara</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={11} /> Japara Quarter, Ijebu-Igbo
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">
                      History · Chiefs · Oriki · Past Rulers
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-accent shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              <Link
                to="/atikori"
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-36 bg-gradient-to-br from-purple-700 to-purple-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/atikori/oba-keegbo-ibitoye-solaja.webp"
                    alt="Keegbo of Atikori"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="relative z-10 text-center px-4">
                    <Crown size={28} className="text-white mx-auto mb-1" />
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Town Oba</p>
                    <h4 className="text-white font-display font-black text-xl">Atikori</h4>
                    <p className="text-white/70 text-xs mt-1">Keegbo of Atikori</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={11} /> Atikori Quarter, Ijebu-Igbo
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">
                      Oloritun · Heritage Places · Anthem
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-accent shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              <Link
                to="/oke-sopen"
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-36 bg-gradient-to-br from-amber-700 to-amber-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/oke-sopen/oba-sopenlukale-mufutau-adesesan-yusuf.webp"
                    alt="Sopenlukale of Oke-Sopen"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="relative z-10 text-center px-4">
                    <Crown size={28} className="text-white mx-auto mb-1" />
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Town Oba</p>
                    <h4 className="text-white font-display font-black text-xl">Oke-Sopen</h4>
                    <p className="text-white/70 text-xs mt-1">Sopenlukale of Oke-Sopen</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={11} /> Oke-Sopen Quarter, Ijebu-Igbo
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">
                      Past Rulers Since 1886
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-accent shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.32 }}
            >
              <Link
                to="/oke-agbo"
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-36 bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/oke-agbo/oba-bejeroku-stephen-adekoya.webp"
                    alt="Bejeroku of Oke-Agbo"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="relative z-10 text-center px-4">
                    <Crown size={28} className="text-white mx-auto mb-1" />
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Town Oba</p>
                    <h4 className="text-white font-display font-black text-xl">Oke-Agbo</h4>
                    <p className="text-white/70 text-xs mt-1">Bejeroku of Oke-Agbo</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={11} /> Oke-Agbo Quarter, Ijebu-Igbo
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">
                      Baales of Oke-Agbo
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-accent shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                to="/imope-ijebu"
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-36 bg-gradient-to-br from-cyan-700 to-cyan-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/imope-ijebu/oba-onimope-tajudeen-omotayo.webp"
                    alt="Onimope of Imope-Ijebu"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="relative z-10 text-center px-4">
                    <Crown size={28} className="text-white mx-auto mb-1" />
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Town Oba</p>
                    <h4 className="text-white font-display font-black text-xl">Imope-Ijebu</h4>
                    <p className="text-white/70 text-xs mt-1">Onimope of Imope-Ijebu</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={11} /> Imope-Ijebu Town, Ijebu-Igbo
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">
                      Royal Profile
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-accent shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.48 }}
            >
              <Link
                to="/aparaki"
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-36 bg-gradient-to-br from-orange-700 to-orange-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/aparaki/oba-alaparaki-julius-benedict-ogunfowora.webp"
                    alt="Alaparaki of Aparaki"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="relative z-10 text-center px-4">
                    <Crown size={28} className="text-white mx-auto mb-1" />
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Town Oba</p>
                    <h4 className="text-white font-display font-black text-xl">Aparaki</h4>
                    <p className="text-white/70 text-xs mt-1">Alaparaki of Aparaki</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={11} /> Aparaki Town, Ijebu-Igbo
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">
                      Royal Profile
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-accent shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Story />
      <Timeline />
      <Footer />
    </div>
  );
}
