import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Crown, BookOpen, LayoutGrid, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSanityKings } from "@/hooks/useSanityKings";
import { BLOG_POSTS } from "@/data/blogPosts";

interface SearchResult {
  type: "oba" | "town" | "post" | "page";
  title: string;
  subtitle: string;
  href: string;
}

const PAGES: SearchResult[] = [
  { type: "page", title: "Home", subtitle: "Ijebu-Igbo Heritage Archive", href: "/" },
  { type: "page", title: "About This Archive", subtitle: "Our story, mission and vision", href: "/about" },
  { type: "page", title: "Heritage", subtitle: "The Orimolusi, the Council of Obas and the seven towns", href: "/heritage" },
  { type: "page", title: "Tourism", subtitle: "Landmarks and heritage sites in Ijebu-Igbo", href: "/tourism" },
  { type: "page", title: "Gallery", subtitle: "Photos of Ijebu-Igbo's towns and festivals", href: "/gallery" },
  { type: "page", title: "Blog", subtitle: "History, culture and kingship articles", href: "/blog" },
  { type: "page", title: "Contact", subtitle: "Get in touch", href: "/contact" },
];

const TOWNS: SearchResult[] = [
  { type: "town", title: "Oke-Sopen", subtitle: "Seat of the Orimolusi", href: "/oke-sopen" },
  { type: "town", title: "Atikori", subtitle: "Town Oba: Keegbo", href: "/atikori" },
  { type: "town", title: "Japara", subtitle: "Town Oba: Abijaparako", href: "/japara" },
  { type: "town", title: "Ojowo", subtitle: "Town Oba: Olokine", href: "/ojowo" },
  { type: "town", title: "Oke-Agbo", subtitle: "Town Oba: Bejeroku", href: "/oke-agbo" },
  { type: "town", title: "Imope-Ijebu", subtitle: "Town Oba: Onimope", href: "/imope-ijebu" },
  { type: "town", title: "Aparaki", subtitle: "Town Oba: Alaparaki", href: "/aparaki" },
];

const TYPE_META: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  oba:  { label: "Oba",  icon: Crown,      color: "text-amber-500" },
  town: { label: "Town", icon: MapPin,     color: "text-emerald-500" },
  post: { label: "Blog", icon: BookOpen,   color: "text-blue-500" },
  page: { label: "Page", icon: LayoutGrid, color: "text-purple-500" },
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function match(query: string, ...fields: string[]): boolean {
  const q = query.toLowerCase();
  return fields.some((f) => f?.toLowerCase().includes(q));
}

export default function SearchModal({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const { data: KINGS = [] } = useSanityKings();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
      setActiveIndex(-1);
    }
  }, [open]);

  // Reset active index when results change
  useEffect(() => { setActiveIndex(-1); }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenChange]);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];

    const q = query.trim();
    const found: SearchResult[] = [];

    KINGS.forEach((k) => {
      if (match(q, k.name, k.fullTitle ?? "", k.hometown ?? "")) {
        found.push({
          type: "oba",
          title: k.name,
          subtitle: k.fullTitle ?? k.hometown ?? "",
          href: `/heritage/orimolusi/${k.slug}`,
        });
      }
    });

    TOWNS.forEach((t) => {
      if (match(q, t.title, t.subtitle)) found.push(t);
    });

    BLOG_POSTS.forEach((p) => {
      if (match(q, p.title, p.excerpt, p.category)) {
        found.push({
          type: "post",
          title: p.title,
          subtitle: p.category,
          href: `/blog/${p.slug}`,
        });
      }
    });

    PAGES.forEach((pg) => {
      if (match(q, pg.title, pg.subtitle)) found.push(pg);
    });

    return found.slice(0, 12);
  }, [query, KINGS]);

  const handleSelect = (href: string) => {
    navigate(href);
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(activeIndex + 1, results.length - 1);
      setActiveIndex(next);
      listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(activeIndex - 1, 0);
      setActiveIndex(prev);
      listRef.current?.children[prev]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex].href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />

          <div className="fixed inset-0 z-[61] flex items-start justify-center pt-[12vh] px-4 pointer-events-none">
            <motion.div
              className="w-full max-w-xl pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {/* Search input */}
              <div className="bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
                  <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search Obas, towns, articles, pages…"
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
                    role="combobox"
                    aria-expanded={results.length > 0}
                    aria-autocomplete="list"
                    aria-controls="search-results"
                    aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs text-muted-foreground font-mono">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {!query.trim() && (
                    <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                      Start typing to search across the whole archive
                    </div>
                  )}

                  {query.trim() && results.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                      No results for <strong className="text-foreground">"{query}"</strong>
                    </div>
                  )}

                  {results.length > 0 && (
                    <ul id="search-results" ref={listRef} className="py-2" role="listbox">
                      {results.map((r, i) => {
                        const meta = TYPE_META[r.type];
                        const Icon = meta.icon;
                        const isActive = i === activeIndex;
                        return (
                          <li key={i} id={`search-result-${i}`} role="option" aria-selected={isActive}>
                            <button
                              onClick={() => handleSelect(r.href)}
                              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left group ${isActive ? "bg-muted" : "hover:bg-muted/60 active:bg-muted"}`}
                            >
                              <span className={`flex-shrink-0 ${meta.color}`}>
                                <Icon size={16} />
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block text-sm font-medium text-foreground truncate">
                                  {r.title}
                                </span>
                                <span className="block text-xs text-muted-foreground truncate">
                                  {r.subtitle}
                                </span>
                              </span>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex-shrink-0">
                                {meta.label}
                              </span>
                              <ArrowRight
                                size={14}
                                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {/* Footer hint */}
                <div className="px-4 py-2.5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>Press <kbd className="px-1 py-0.5 bg-muted rounded font-mono">⌘K</kbd> anytime to search</span>
                  <span>{results.length > 0 ? `${results.length} result${results.length !== 1 ? "s" : ""}` : ""}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
