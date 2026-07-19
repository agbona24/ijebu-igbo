import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, Search } from "lucide-react";
import SearchModal from "@/components/SearchModal";
import { useLang } from "@/context/LanguageContext";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Heritage",  href: "/heritage" },
  { label: "Tourism",  href: "/tourism" },
  { label: "Gallery",  href: "/gallery" },
  { label: "Blog",     href: "/blog" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { lang, setLang } = useLang();
  const location = useLocation();

  // Close mobile menu on every route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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
          <Link to="/" className="group relative flex items-center gap-2">
            <motion.img
              src="/logo-tp.webp"
              alt="Ijebu-Igbo Heritage"
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
            <span className="hidden lg:block font-display font-bold text-primary-foreground text-sm tracking-wide">
              Ijebu-Igbo Heritage
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 font-medium whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "yo" : "en")}
              className="flex items-center gap-0.5 text-xs font-semibold bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground rounded-full px-2.5 py-1 transition-colors"
              title={lang === "en" ? "Switch to Yoruba" : "Switch to English"}
            >
              <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
              <span className="opacity-30 mx-0.5">|</span>
              <span className={lang === "yo" ? "opacity-100" : "opacity-40"}>YO</span>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
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
                  <div className="flex items-center gap-3">
                    {/* Language toggle */}
                    <button
                      onClick={() => setLang(lang === "en" ? "yo" : "en")}
                      className="flex items-center gap-0.5 text-xs font-bold bg-primary-foreground/10 text-primary-foreground rounded-full px-2.5 py-1"
                    >
                      <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
                      <span className="opacity-30 mx-0.5">|</span>
                      <span className={lang === "yo" ? "opacity-100" : "opacity-40"}>YO</span>
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="tap-target text-primary-foreground/80 touch-manipulation"
                      aria-label="Close menu"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Nav links */}
                <div className="flex-1 overflow-y-auto py-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between px-6 py-3.5 text-primary-foreground/90 hover:bg-primary-foreground/5 active:bg-primary-foreground/10 font-medium text-base transition-colors touch-manipulation"
                      >
                        {link.label}
                        <ChevronRight size={18} className="text-primary-foreground/40" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
