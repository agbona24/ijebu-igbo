import { Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

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
    <footer id="footer" className="bg-charcoal text-primary-foreground">
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-xl mb-4">
              Ijebu Igbo Descendants in Diaspora
            </h3>
            <p className="text-primary-foreground/60 leading-relaxed max-w-md mb-6">
              A global community promoting culture, unity, and sustainable
              development for Ijebu Igbo town in Nigeria.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-sm bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-charcoal transition-colors duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/60">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 shrink-0" />
                <span>info@ijidd.org</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>Ijebu Igbo, Ogun State, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-main py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/40">
          <p>&copy; {new Date().getFullYear()} Ijebu Igbo Descendants in Diaspora. All rights reserved.</p>
          <p>Built with pride by the diaspora community.</p>
        </div>
      </div>
    </footer>
  );
}
