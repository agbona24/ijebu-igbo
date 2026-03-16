import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import JoinModal from "@/components/JoinModal";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Team", href: "#team" },
  { label: "Heritage", href: "#story" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Prevent body scroll when menu is open
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
          <a href="#" className="flex items-center gap-2 sm:gap-3 group">
            <img 
              src="/favicon.svg" 
              alt="IID Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110 duration-300"
            />
            <span className="font-display font-bold text-primary-foreground text-base sm:text-lg tracking-tight">
              IJIDD
            </span>
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
              <button className="btn-primary text-sm !py-2 !px-5">
                Join Us
              </button>
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
                </div>

                {/* CTA button */}
                <div className="p-6 border-t border-primary-foreground/10">
                  <JoinModal>
                    <button 
                      className="btn-primary w-full text-center text-lg" 
                      onClick={() => setOpen(false)}
                    >
                      Join Us
                    </button>
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
