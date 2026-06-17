import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";
import JoinModal from "@/components/JoinModal";
import { useSoundManager } from "@/hooks/use-sound";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Impact", href: "/#impact" },
  { label: "Team", href: "/#team" },
  { label: "Heritage", href: "/#story" },
  { label: "Events", href: "/#events" },
  { label: "Directory", href: "/businesses" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { playSound } = useSoundManager();

  // Play sound when menu toggles
  useEffect(() => {
    if (open) {
      playSound("/sounds/menu-open.mp3", 0.3);
      document.body.style.overflow = "hidden";
    } else {
      if (document.body.style.overflow === "hidden") {
        // Only play close sound if menu was actually open
        playSound("/sounds/menu-close.mp3", 0.3);
      }
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, playSound]);

  // Track scroll position
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
          <a href="#" className="group relative">
            <motion.img 
              src="/favicon.svg" 
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
            {/* Animated glow effect on hover */}
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
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
            <JoinModal>
              <motion.button
                onClick={() => playSound("/sounds/talking-drum-press.mp3", 0.25)}
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

          {/* Mobile toggle - larger tap target */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-primary-foreground tap-target touch-manipulation"
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
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="flex items-center justify-between px-6 py-4 text-primary-foreground/90 hover:bg-primary-foreground/5 active:bg-primary-foreground/10 font-medium text-lg transition-colors touch-manipulation"
                    >
                      {link.label}
                      <ChevronRight size={20} className="text-primary-foreground/40" />
                    </motion.a>
                  ))}
                  
                  {/* Action items separator */}
                  <div className="px-6 py-3 mt-2">
                    <div className="h-px bg-primary-foreground/10"></div>
                  </div>
                  
                  {/* Join Us */}
                  <JoinModal>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.3 }}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-6 py-4 text-accent hover:bg-primary-foreground/5 active:bg-primary-foreground/10 font-semibold text-lg transition-colors touch-manipulation w-full text-left"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles size={20} className="text-accent" />
                        Join Us
                      </span>
                      <ChevronRight size={20} className="text-accent/60" />
                    </motion.button>
                  </JoinModal>
                  
                  {/* Support Development */}
                  <motion.a
                    href="#impact"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3 }}
                    className="flex items-center justify-between px-6 py-4 text-accent hover:bg-primary-foreground/5 active:bg-primary-foreground/10 font-semibold text-lg transition-colors touch-manipulation"
                  >
                    Support Development
                    <ChevronRight size={20} className="text-accent/60" />
                  </motion.a>
                  
                  {/* Seek Help */}
                  <motion.a
                    href="#footer"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 + 0.15, duration: 0.3 }}
                    className="flex items-center justify-between px-6 py-4 text-accent hover:bg-primary-foreground/5 active:bg-primary-foreground/10 font-semibold text-lg transition-colors touch-manipulation"
                  >
                    Seek Help
                    <ChevronRight size={20} className="text-accent/60" />
                  </motion.a>
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
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
