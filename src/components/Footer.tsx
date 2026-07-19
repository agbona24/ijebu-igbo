import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Globe, ArrowRight, MapPinned, Crown, BookOpen, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Heritage", href: "/heritage" },
  { label: "Tourism", href: "/tourism" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const townLinks = [
  { label: "Oke-Sopen", href: "/oke-sopen" },
  { label: "Atikori", href: "/atikori" },
  { label: "Japara", href: "/japara" },
  { label: "Ojowo", href: "/ojowo" },
  { label: "Oke-Agbo", href: "/oke-agbo" },
  { label: "Imope-Ijebu", href: "/imope-ijebu" },
  { label: "Aparaki", href: "/aparaki" },
];

const stats = [
  { icon: MapPinned, value: "7",   label: "Towns"    },
  { icon: Crown,     value: "8",   label: "Obas"     },
  { icon: BookOpen,  value: "70+", label: "Articles" },
  { icon: Landmark,  value: "1",   label: "Kingdom"  },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-charcoal text-primary-foreground safe-area-bottom">
      <div className="container-main py-8 md:py-16 lg:py-20">
        {/* Mobile: native app-style footer */}
        <div className="lg:hidden">
          {/* Brand header */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo-tp.webp" alt="Ijebu-Igbo Heritage" className="w-12 h-12" />
            <div>
              <h3 className="font-display font-bold text-sm leading-tight">
                Ijebu-Igbo Heritage
              </h3>
              <p className="text-primary-foreground/50 text-xs">The Archive of a Yoruba Kingdom</p>
            </div>
          </div>

          {/* Action buttons — large tap targets */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <a
              href="tel:+2340000000000"
              className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-green-600/15 active:bg-green-600/30 transition-colors touch-manipulation"
            >
              <Phone size={22} className="text-green-400" />
              <span className="text-[11px] font-semibold text-primary-foreground/80">Call</span>
            </a>
            <a
              href="mailto:hello@ijebu-igbo-heritage.example"
              className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-blue-600/15 active:bg-blue-600/30 transition-colors touch-manipulation"
            >
              <Mail size={22} className="text-blue-400" />
              <span className="text-[11px] font-semibold text-primary-foreground/80">Email</span>
            </a>
          </div>

          {/* Nav grid */}
          <div className="grid grid-cols-4 gap-1.5 mb-6">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="py-3 px-1 rounded-xl bg-primary-foreground/5 active:bg-primary-foreground/10
                           text-[11px] font-medium text-primary-foreground/70 active:text-accent
                           text-center transition-colors touch-manipulation"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Website link */}
          <a
            href="https://ijebu-igbo-heritage.example/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-accent/10 border border-accent/20 touch-manipulation active:bg-accent/20 transition-colors"
          >
            <Globe size={15} className="text-accent" />
            <span className="text-sm font-medium text-accent">ijebu-igbo-heritage.example</span>
          </a>
        </div>

        {/* Desktop: Premium grid layout */}
        <div className="hidden lg:block">

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-4 gap-4 mb-14 border border-primary-foreground/10 rounded-2xl p-6 bg-primary-foreground/5"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                  <s.icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-display font-black text-2xl text-white leading-none">{s.value}</p>
                  <p className="text-primary-foreground/50 text-xs mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-12 gap-10 mb-14">

            {/* Brand — 4 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="col-span-4"
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.img
                  src="/logo-tp.webp"
                  alt="Ijebu-Igbo Heritage"
                  className="w-14 h-14"
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                />
                <div>
                  <h3 className="font-display font-bold text-base leading-tight">
                    Ijebu-Igbo Heritage
                  </h3>
                  <p className="text-primary-foreground/50 text-xs">The Archive of a Yoruba Kingdom</p>
                </div>
              </div>
              <p className="text-primary-foreground/55 leading-relaxed text-sm mb-6">
                A living record of Ijebu-Igbo's Orimolusi, its seven Town Obas,
                and the history, places and people that make up the kingdom.
              </p>

              <Link
                to="/heritage"
                className="inline-flex items-center gap-2 bg-accent text-charcoal text-sm font-bold
                           px-5 py-2.5 rounded-xl hover:bg-accent/90 transition-colors duration-300 group"
              >
                Explore the Archive
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Quick Links — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-2"
            >
              <h4 className="font-display font-bold text-sm text-white mb-5 uppercase tracking-widest">
                Navigate
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/55 hover:text-accent transition-colors duration-200
                                 text-sm flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-200 rounded" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Towns — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="col-span-2"
            >
              <h4 className="font-display font-bold text-sm text-white mb-5 uppercase tracking-widest">
                The Seven Towns
              </h4>
              <ul className="space-y-2.5">
                {townLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/55 hover:text-accent transition-colors duration-200
                                 text-sm flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-200 rounded" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact — 4 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-4"
            >
              <h4 className="font-display font-bold text-sm text-white mb-5 uppercase tracking-widest">
                Get In Touch
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+2340000000000"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0 group-hover:bg-green-500/30 transition-colors">
                      <Phone size={15} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-primary-foreground/40 uppercase tracking-widest">Phone</p>
                      <p className="text-sm text-primary-foreground/75 group-hover:text-accent transition-colors">+234 000 000 0000</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@ijebu-igbo-heritage.example"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0 group-hover:bg-blue-500/30 transition-colors">
                      <Mail size={15} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-primary-foreground/40 uppercase tracking-widest">Email</p>
                      <p className="text-sm text-primary-foreground/75 group-hover:text-accent transition-colors break-all">
                        hello@ijebu-igbo-heritage.example
                      </p>
                    </div>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <MapPin size={15} className="text-primary-foreground/50" />
                  </div>
                  <div>
                    <p className="text-[10px] text-primary-foreground/40 uppercase tracking-widest">Location</p>
                    <p className="text-sm text-primary-foreground/75">Ijebu-Igbo, Ogun State, Nigeria</p>
                  </div>
                </li>
                <li>
                  <a
                    href="https://ijebu-igbo-heritage.example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 group-hover:bg-accent/30 transition-colors">
                      <Globe size={15} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] text-primary-foreground/40 uppercase tracking-widest">Website</p>
                      <p className="text-sm text-accent group-hover:underline">ijebu-igbo-heritage.example</p>
                    </div>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cultural Signature */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-main py-6 sm:py-8 text-center">
          <p className="text-lg sm:text-xl md:text-2xl font-display font-bold text-accent italic mb-2">
            Ọmọ Alárè, ká gbé Ijebu Igbo ga
          </p>
          <p className="text-sm sm:text-base text-primary-foreground/70">
            Together, we lift Ijebu Igbo higher
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-main py-5 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs md:text-sm text-primary-foreground/40 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Ijebu-Igbo Heritage. All rights reserved.</p>
          <motion.p
            className="text-primary-foreground/80 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Site by{" "}
            <a
              href="https://harzotech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white underline underline-offset-2 decoration-accent/60 hover:text-accent transition-colors"
            >
              Harzo Tech
            </a>
            {" — "}
            <a
              href="https://azeezagbona.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white underline underline-offset-2 decoration-accent/60 hover:text-accent transition-colors"
            >
              Azeez Agbona
            </a>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
