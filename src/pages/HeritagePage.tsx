import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Story from "@/components/Story";
import Timeline from "@/components/Timeline";
import RulingHierarchy from "@/components/RulingHierarchy";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Crown, MapPin } from "lucide-react";

export default function HeritagePage() {
  useEffect(() => { document.title = "Heritage | Connect Ijebu Roots"; }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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
              Connect Ijebu Roots
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

      {/* Kingdom Profiles */}
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
            <h3 className="heading-section">Quarter Profiles</h3>
            <p className="text-body mt-2">Dive deeper into the history, leadership and culture of each quarter.</p>
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
                    src="/images/oba-olokine-abdulrasheed-banjo.webp"
                    alt="Olokine of Ojowo"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="relative z-10 text-center px-4">
                    <Crown size={28} className="text-white mx-auto mb-1" />
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Grade Two Oba</p>
                    <h4 className="text-white font-display font-black text-xl">Ojowo Kingdom</h4>
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
          </div>
        </div>
      </section>

      <Story />
      <Timeline />
      <Footer />
    </div>
  );
}
