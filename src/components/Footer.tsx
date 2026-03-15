import { Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Phone, Globe } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Our Impact", href: "#impact" },
  { label: "Heritage", href: "#story" },
  { label: "Gallery", href: "#gallery" },
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
        {/* Mobile: Card-style sections */}
        <div className="lg:hidden space-y-4">
          {/* Brand Section - Mobile */}
          <div className="bg-primary-foreground/5 rounded-2xl p-5 border border-primary-foreground/10">
            <h3 className="font-display font-bold text-base mb-2">
              Ijebu Igbo Descendants in Diaspora
            </h3>
            <p className="text-primary-foreground/60 leading-relaxed text-sm mb-4">
              A global community promoting culture, unity, and sustainable
              development for Ijebu Igbo town in Nigeria.
            </p>
            {/* Social links */}
            <div className="flex gap-2 justify-center pt-3 border-t border-primary-foreground/10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center active:bg-accent active:text-charcoal active:scale-95 transition-all duration-200 touch-manipulation"
                >
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Mobile */}
          <div className="bg-primary-foreground/5 rounded-2xl p-5 border border-primary-foreground/10">
            <h4 className="font-display font-bold mb-3 text-sm">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-primary-foreground/70 active:text-accent transition-colors py-2.5 px-3 rounded-lg bg-primary-foreground/5 active:bg-primary-foreground/10 text-sm font-medium touch-manipulation text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact - Mobile */}
          <div className="bg-primary-foreground/5 rounded-2xl p-5 border border-primary-foreground/10">
            <h4 className="font-display font-bold mb-4 text-sm">Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="tel:+4407723953174" 
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/5 active:bg-primary-foreground/10 transition-all touch-manipulation group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-primary-foreground/50 mb-0.5">Phone</p>
                  <p className="text-sm font-medium text-primary-foreground/90 group-active:text-accent">
                    +44 07723953174
                  </p>
                </div>
              </a>

              <a 
                href="mailto:info@ijebuigbodescendants.org" 
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/5 active:bg-primary-foreground/10 transition-all touch-manipulation group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-primary-foreground/50 mb-0.5">Email</p>
                  <p className="text-xs font-medium text-primary-foreground/90 group-active:text-accent truncate">
                    info@ijebuigbodescendants.org
                  </p>
                </div>
              </a>

              <a 
                href="https://ijebuigbodescendants.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/5 active:bg-primary-foreground/10 transition-all touch-manipulation group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Globe size={18} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-primary-foreground/50 mb-0.5">Website</p>
                  <p className="text-sm font-medium text-primary-foreground/90 group-active:text-accent">
                    ijebuigbodescendants.org
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/5">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-primary-foreground/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-primary-foreground/50 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-primary-foreground/90">
                    United Kingdom
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Original grid layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-xl mb-4">
              Ijebu Igbo Descendants in Diaspora
            </h3>
            <p className="text-primary-foreground/60 leading-relaxed max-w-md mb-6 text-base">
              A global community promoting culture, unity, and sustainable
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
                  <a
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-accent active:text-accent/80 transition-colors duration-300 py-1 inline-block touch-manipulation text-base"
                  >
                    {link.label}
                  </a>
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
                <a href="tel:+4407723953174" className="hover:text-accent active:text-accent/80 transition-colors touch-manipulation">
                  +44 07723953174
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

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-main py-5 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs md:text-sm text-primary-foreground/40 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Ijebu Igbo Descendants in Diaspora. All rights reserved.</p>
          <p className="hidden md:block">Built with pride by the diaspora community.</p>
        </div>
      </div>
    </footer>
  );
}
