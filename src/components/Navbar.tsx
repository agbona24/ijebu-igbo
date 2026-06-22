import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, ChevronRight, Sparkles, Search } from "lucide-react";
import JoinModal from "@/components/JoinModal";
import SearchModal from "@/components/SearchModal";
import JoinCommunityModal from "@/components/JoinCommunityModal";

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Impact",    href: "/impact" },
  { label: "Team",      href: "/team" },
  { label: "Heritage",  href: "/heritage" },
  { label: "Events",    href: "/events" },
  { label: "Directory", href: "/businesses" },
  { label: "Tourism",   href: "/tourism" },
  { label: "Gallery",   href: "/gallery" },
  { label: "Contact",   href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-top ${
          scrolled
            ? "bg-primary/95 backdrop-blur-lg shadow-lg"
            : "bg-primary/90 backdrop-blur-md"
        } border-b border-primary-foreground/10`}
      >
        <div className="container-main flex items-center justify-between h-14 md:h-20">
          <Link to="/" className="group relative">
            <motion.img
              src="/logo-tp.png"
              alt="IID Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative z-10"
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                rotate: { duration: 1, ease: "easeOut" }
              }}
              whileHover={{
                scale: 1.15,
                rotate: [0, -5, 5, 0],
                transition: {
                  scale: { duration: 0.3 },
                  rotate: { duration: 0.5, ease: "easeInOut" }
                }
              }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <JoinModal>
              <motion.button
                className="btn-primary relative overflow-hidden text-sm !py-2.5 !px-6"
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(191,154,45,0.55)",
                    "0 0 0 14px rgba(191,154,45,0)",
                  ],
                }}
                transition={{
                  scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 1.4, repeat: Infinity, ease: "easeOut" },
                  whileHover: { duration: 0.2 },
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2 font-semibold tracking-wide">
                  <motion.span
                    aria-hidden
                    animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
                  >
                    <Sparkles size={14} />
                  </motion.span>
                  Join Us
                  <motion.span
                    aria-hidden
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-primary-foreground/10"
                  initial={{ x: "-120%" }}
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.7 }}
                />
                <motion.span
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary-foreground"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.3, 0.9] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.button>
            </JoinModal>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors tap-target touch-manipulation"
              aria-label="Search"
            >
              <Search size={22} />
            </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-primary-foreground tap-target touch-manipulation"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </motion.div>
          </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Slide-in drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-primary z-50 md:hidden safe-area-top safe-area-bottom"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between px-6 h-14 border-b border-primary-foreground/10">
                  <span className="font-display font-bold text-primary-foreground">Menu</span>
                  <button
                    onClick={() => setOpen(false)}
                    className="tap-target text-primary-foreground/80 touch-manipulation"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Nav links */}
                <div className="flex-1 overflow-y-auto py-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between px-6 py-4 text-primary-foreground/90 hover:bg-primary-foreground/5 active:bg-primary-foreground/10 font-medium text-lg transition-colors touch-manipulation"
                      >
                        {link.label}
                        <ChevronRight size={20} className="text-primary-foreground/40" />
                      </Link>
                    </motion.div>
                  ))}

                </div>

                {/* Bottom branding */}
                <div className="p-6 border-t border-primary-foreground/10">
                  <JoinModal>
                    <motion.button
                      className="btn-primary w-full text-center text-lg relative overflow-hidden"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        scale: [1, 1.02, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(191,154,45,0.55)",
                          "0 0 0 14px rgba(191,154,45,0)",
                        ],
                      }}
                      transition={{
                        scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                        boxShadow: { duration: 1.4, repeat: Infinity, ease: "easeOut" },
                      }}
                      onClick={() => setOpen(false)}
                    >
                      <span className="relative z-10 inline-flex items-center gap-2 justify-center font-semibold tracking-wide">
                        <motion.span
                          aria-hidden
                          animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
                        >
                          <Sparkles size={16} />
                        </motion.span>
                        Join Us
                        <motion.span
                          aria-hidden
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-primary-foreground/10"
                        initial={{ x: "-120%" }}
                        animate={{ x: ["-120%", "120%"] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.7 }}
                      />
                      <motion.span
                        className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary-foreground"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.3, 0.9] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.button>
                  </JoinModal>

                  {/* WhatsApp Community join */}
                  <button
                    onClick={() => { setOpen(false); setCommunityOpen(true); }}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-xl transition-colors touch-manipulation"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Join WhatsApp Community
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <JoinCommunityModal open={communityOpen} onOpenChange={setCommunityOpen} />
    </>
  );
}
