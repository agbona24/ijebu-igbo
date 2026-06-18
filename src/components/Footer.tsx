import { motion } from "framer-motion";
import { Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Phone, Globe, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Heritage", href: "/heritage" },
  { label: "Directory", href: "/businesses" },
  { label: "Gallery", href: "/gallery" },
  { label: "Join Us", href: "/join" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-charcoal text-primary-foreground safe-area-bottom">
      <div className="container-main py-8 md:py-16 lg:py-20">
        {/* Mobile: native app-style footer */}
        <div className="lg:hidden">
          {/* Brand header */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo-tp.png" alt="IID Logo" className="w-12 h-12" />
            <div>
              <h3 className="font-display font-bold text-sm leading-tight">
                Ijebu Igbo Descendants
              </h3>
              <p className="text-primary-foreground/50 text-xs">in Diaspora, UK</p>
            </div>
          </div>

          {/* Action buttons — large tap targets */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <a
              href="tel:+447496933887"
              className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-green-600/15 active:bg-green-600/30 transition-colors touch-manipulation"
            >
              <Phone size={22} className="text-green-400" />
              <span className="text-[11px] font-semibold text-primary-foreground/80">Call</span>
            </a>
            <a
              href="https://wa.me/447496933887"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-[#25D366]/15 active:bg-[#25D366]/30 transition-colors touch-manipulation"
            >
              <MessageCircle size={22} className="text-[#25D366]" />
              <span className="text-[11px] font-semibold text-primary-foreground/80">WhatsApp</span>
            </a>
            <a
              href="mailto:info@ijebuigbodescendants.org"
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

          {/* Social row */}
          <div className="flex justify-center gap-3 mb-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-12 h-12 rounded-2xl bg-primary-foreground/10 flex items-center justify-center
                           active:bg-accent active:text-charcoal transition-all touch-manipulation"
              >
                <s.icon size={20} />
              </a>
            ))}
          </div>

          {/* Website link */}
          <a
            href="https://www.ijebuigbodescendants.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-accent/10 border border-accent/20 touch-manipulation active:bg-accent/20 transition-colors"
          >
            <Globe size={15} className="text-accent" />
            <span className="text-sm font-medium text-accent">ijebuigbodescendants.org</span>
          </a>
        </div>

        {/* Desktop: Original grid layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <motion.img 
                src="/logo-tp.png" 
                alt="IID Logo" 
                className="w-14 h-14"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              />
              <h3 className="font-display font-bold text-xl">
                Ijebu Igbo Descendants in Diaspora, UK
              </h3>
            </div>
            <p className="text-primary-foreground/60 leading-relaxed max-w-md mb-6 text-base">
              The UK chapter promoting culture, unity, and sustainable
              development for Ijebu Igbo town in Nigeria.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-sm bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-charcoal active:scale-95 transition-all duration-300 touch-manipulation"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-4 text-base">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/60 hover:text-accent active:text-accent/80 transition-colors duration-300 py-1 inline-block touch-manipulation text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-4 text-base">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/60 text-base">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-1 shrink-0" />
                <a href="tel:+447496933887" className="hover:text-accent active:text-accent/80 transition-colors touch-manipulation">
                  +44 7496 933887
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 shrink-0" />
                <a href="mailto:info@ijebuigbodescendants.org" className="hover:text-accent active:text-accent/80 transition-colors touch-manipulation break-all">
                  info@ijebuigbodescendants.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>United Kingdom</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe size={16} className="mt-1 shrink-0" />
                <a href="https://ijebuigbodescendants.org" target="_blank" rel="noopener noreferrer" className="hover:text-accent active:text-accent/80 transition-colors touch-manipulation">
                  ijebuigbodescendants.org
                </a>
              </li>
            </ul>
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
          <p>&copy; {new Date().getFullYear()} Ijebu Igbo Descendants in Diaspora, UK. All rights reserved.</p>
          <motion.a
            href="https://azeezagbona.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-white transition-colors duration-300 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            Crafted by the son of the soil,{" "}
            <span className="font-bold text-white underline underline-offset-2 decoration-accent/60">
              Azeez omo Agbona
            </span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
