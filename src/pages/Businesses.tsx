import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Store, X, ArrowUpDown, ArrowRight, Building2,
  CheckCircle2, Globe, MessageCircle, MapPin, SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import {
  BUSINESSES,
  CATEGORY_GRADIENTS,
  CATEGORY_COLORS,
  type Business,
} from "@/data/businesses";

// Category list without "All" (handled by clear-selection logic)
const CATEGORY_PILLS = [
  "Food & Catering",
  "Fashion & Beauty",
  "Real Estate",
  "Professional Services",
  "Technology",
  "Health & Wellness",
  "Retail & Trade",
] as const;

const REGIONS = ["All", "UK", "Nigeria", "Diaspora"] as const;
type Region = typeof REGIONS[number];

const SORT_OPTIONS = [
  { value: "default",  label: "Default" },
  { value: "featured", label: "Featured First" },
  { value: "newest",   label: "Newest" },
  { value: "az",       label: "A → Z" },
  { value: "za",       label: "Z → A" },
] as const;
type Sort = typeof SORT_OPTIONS[number]["value"];

// ── Initials helper ─────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// ── Business card ───────────────────────────────────────────────────────────
function BusinessCard({ business }: { business: Business }) {
  const navigate = useNavigate();
  const gradient = CATEGORY_GRADIENTS[business.category] ?? "from-primary to-primary/70";
  const waNumber = (business.whatsapp ?? business.phone ?? "").replace(/\D/g, "");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col
                 active:scale-[0.98] touch-manipulation"
    >
      {/* Visual header */}
      <div
        className="relative h-28 sm:h-44 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/businesses/${business.slug}`)}
      >
        {business.flyer ? (
          <img
            src={business.flyer}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-1 sm:gap-2`}>
            <span className="text-2xl sm:text-4xl font-display font-black text-white/90 tracking-tight select-none">
              {getInitials(business.name)}
            </span>
            <span className="text-white/60 text-[10px] sm:text-xs font-medium tracking-widest uppercase hidden sm:block">
              {business.category}
            </span>
          </div>
        )}

        {business.featured && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-accent text-accent-foreground
                          text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-full shadow-md">
            ★ Featured
          </div>
        )}

        <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 text-[10px] sm:text-xs font-semibold
                         px-2 py-0.5 sm:py-1 rounded-full border backdrop-blur-sm bg-white/85 hidden sm:block
                         ${CATEGORY_COLORS[business.category] ?? "text-gray-700 border-gray-200"}`}>
          {business.category}
        </div>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3
          className="font-display font-bold text-foreground text-sm sm:text-base leading-tight
                     group-hover:text-primary transition-colors cursor-pointer"
          onClick={() => navigate(`/businesses/${business.slug}`)}
        >
          {business.name}
        </h3>
        {business.tagline && (
          <p className="text-[10px] sm:text-xs text-accent font-medium mt-0.5 line-clamp-1">{business.tagline}</p>
        )}
        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 line-clamp-2 flex-1 hidden sm:block">
          {business.description}
        </p>

        {/* Footer */}
        <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-border flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1 min-w-0">
            {business.location && (
              <span className="text-[10px] sm:text-xs text-muted-foreground truncate flex items-center gap-1">
                <MapPin size={9} className="shrink-0 sm:hidden" />
                <MapPin size={10} className="shrink-0 hidden sm:block" />
                <span className="truncate max-w-[70px] sm:max-w-none">
                  {business.location.split(",").slice(-1)[0].trim()}
                </span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 bg-[#25D366] hover:bg-[#1fba58] rounded-lg flex items-center
                           justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-3.5 h-3.5" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            )}
            {business.website && (
              <a
                href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 bg-primary/10 hover:bg-primary/20 rounded-lg items-center
                           justify-center transition-colors hidden sm:flex"
                aria-label="Website"
              >
                <Globe size={13} className="text-primary" />
              </a>
            )}
            <button
              onClick={() => navigate(`/businesses/${business.slug}`)}
              className="text-[10px] sm:text-xs font-semibold text-primary flex items-center gap-0.5 sm:gap-1
                         group-hover:gap-1.5 transition-all whitespace-nowrap min-h-[32px] px-1"
            >
              View <ArrowRight size={10} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function Businesses() {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [region, setRegion] = useState<Region>("All");
  const [hasWhatsApp, setHasWhatsApp] = useState(false);
  const [hasWebsite, setHasWebsite] = useState(false);
  const [sort, setSort] = useState<Sort>("default");
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length < 2) return [];
    return BUSINESSES.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.tagline ?? "").toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [search]);

  // Toggle category in/out of selection
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const clearAll = () => {
    setSearch("");
    setSelectedCategories(new Set());
    setRegion("All");
    setHasWhatsApp(false);
    setHasWebsite(false);
    setSort("default");
  };

  const activeFilterCount =
    selectedCategories.size +
    (region !== "All" ? 1 : 0) +
    (hasWhatsApp ? 1 : 0) +
    (hasWebsite ? 1 : 0);

  // Filtered + sorted list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = BUSINESSES.filter((b) => {
      const matchesCat =
        selectedCategories.size === 0 || selectedCategories.has(b.category);

      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        (b.location ?? "").toLowerCase().includes(q) ||
        (b.tagline ?? "").toLowerCase().includes(q) ||
        (b.ownerName ?? "").toLowerCase().includes(q);

      const matchesRegion = region === "All" || b.region === region;
      const matchesWA = !hasWhatsApp || !!(b.whatsapp ?? b.phone);
      const matchesWeb = !hasWebsite || !!b.website;

      return matchesCat && matchesSearch && matchesRegion && matchesWA && matchesWeb;
    });

    if (sort === "featured") list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (sort === "newest")   list = [...list].sort((a, b) => b.id - a.id);
    if (sort === "az")       list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za")       list = [...list].sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [search, selectedCategories, region, hasWhatsApp, hasWebsite, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative min-h-[400px] md:min-h-[460px] flex flex-col items-center justify-center px-4 py-14">
          <AnimatedHeroBg gradientClass="bg-gradient-to-br from-primary via-primary to-primary/80" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center max-w-3xl mx-auto w-full"
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30
                            text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Store size={14} />
              Community Business Directory
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
              Support Ijebu Igbo{" "}
              <span className="text-accent">Businesses</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Discover and support businesses owned by members of our community. Buy local, build together.
            </p>

            {/* Search with autocomplete */}
            <div className="relative max-w-lg mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search by name, service, location…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={(e) => e.key === "Escape" && setShowSuggestions(false)}
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white text-foreground
                           placeholder-muted-foreground text-sm focus:outline-none
                           focus:ring-2 focus:ring-accent shadow-lg"
              />
              {search && (
                <button
                  onClick={() => { setSearch(""); setShowSuggestions(false); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}

              {/* Autocomplete dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl
                               border border-border shadow-xl z-20 overflow-hidden"
                  >
                    {suggestions.map((b) => {
                      const gradient = CATEGORY_GRADIENTS[b.category] ?? "from-primary to-primary/70";
                      return (
                        <li key={b.id}>
                          <button
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50
                                       transition-colors text-left"
                            onMouseDown={() => {
                              setSearch(b.name);
                              setShowSuggestions(false);
                            }}
                          >
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient}
                                            flex items-center justify-center shrink-0`}>
                              <span className="text-white text-[10px] font-bold">
                                {getInitials(b.name)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">{b.name}</p>
                              <p className="text-xs text-muted-foreground">{b.category}</p>
                            </div>
                            <CheckCircle2 size={14} className="text-accent ml-auto shrink-0" />
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STICKY CATEGORY BAR (multi-select) ────────────────────────────── */}
      <div className="sticky top-14 md:top-20 z-30 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {/* All — clears selection */}
            <button
              onClick={() => setSelectedCategories(new Set())}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all
                          duration-200 border ${
                            selectedCategories.size === 0
                              ? "bg-primary text-primary-foreground border-primary shadow-sm"
                              : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                          }`}
            >
              All
            </button>

            {CATEGORY_PILLS.map((cat) => {
              const selected = selectedCategories.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm
                              font-medium transition-all duration-200 border ${
                                selected
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                              }`}
                >
                  {selected && <CheckCircle2 size={12} />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── ADVANCED FILTER ROW ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-border">
        {/* Mobile: toggle button row */}
        <div className="md:hidden max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full
                        border transition-colors min-h-[40px] ${
                          showFilters || activeFilterCount > 0
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-transparent text-muted-foreground border-border"
                        }`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-accent text-charcoal text-xs font-bold w-5 h-5 rounded-full
                               flex items-center justify-center ml-0.5">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
          {activeFilterCount > 0 && (
            <button onClick={clearAll} className="text-xs font-semibold text-destructive flex items-center gap-1">
              <X size={12} /> Clear all
            </button>
          )}
        </div>

        {/* Mobile: expandable filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="px-4 py-3 space-y-3">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Region</p>
                  <div className="flex flex-wrap gap-2">
                    {REGIONS.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRegion(r)}
                        className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors min-h-[40px] ${
                          region === r
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-transparent text-muted-foreground border-border"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setHasWhatsApp((v) => !v)}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold
                                py-2.5 rounded-full border transition-colors min-h-[44px] ${
                                  hasWhatsApp
                                    ? "bg-[#25D366] text-white border-[#25D366]"
                                    : "bg-transparent text-muted-foreground border-border"
                                }`}
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </button>
                  <button
                    onClick={() => setHasWebsite((v) => !v)}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold
                                py-2.5 rounded-full border transition-colors min-h-[44px] ${
                                  hasWebsite
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-transparent text-muted-foreground border-border"
                                }`}
                  >
                    <Globe size={14} /> Has Website
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop: always-visible filter row */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 py-2.5 flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <MapPin size={13} className="text-muted-foreground shrink-0" />
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  region === r
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-transparent text-muted-foreground border-border hover:border-accent hover:text-accent"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="w-px h-5 bg-border mx-1" />
          <button
            onClick={() => setHasWhatsApp((v) => !v)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full
                        border transition-colors ${
                          hasWhatsApp
                            ? "bg-[#25D366] text-white border-[#25D366]"
                            : "bg-transparent text-muted-foreground border-border hover:border-[#25D366] hover:text-[#25D366]"
                        }`}
          >
            <MessageCircle size={12} /> Has WhatsApp
          </button>
          <button
            onClick={() => setHasWebsite((v) => !v)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full
                        border transition-colors ${
                          hasWebsite
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                        }`}
          >
            <Globe size={12} /> Has Website
          </button>
          {activeFilterCount > 0 && (
            <button onClick={clearAll} className="flex items-center gap-1.5 text-xs font-semibold text-destructive hover:underline ml-auto">
              <X size={12} /> Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
            </button>
          )}
        </div>
      </div>

      {/* ── LISTINGS ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-8">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "business" : "businesses"}
            {selectedCategories.size > 0 && ` in ${[...selectedCategories].join(", ")}`}
            {region !== "All" && ` · ${region}`}
          </p>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <div className="flex items-center gap-1.5 border border-border rounded-lg
                            px-3 py-2 text-sm text-muted-foreground flex-1 sm:flex-none">
              <ArrowUpDown size={13} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="bg-transparent text-sm text-foreground focus:outline-none cursor-pointer w-full"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <a
              href="mailto:info@ijebuigbodescendants.org?subject=Business%20Directory%20Listing%20Request&body=Business%20Name%3A%0ACategory%3A%0ADescription%3A%0ALocation%3A%0APhone%3A%0AWebsite%3A%0AOwner%20Name%3A"
              className="btn-primary text-sm !py-2 !px-3 sm:!px-4 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Building2 size={14} />
              <span className="hidden xs:inline">List Your Business</span>
              <span className="xs:hidden">List</span>
            </a>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <SlidersHorizontal size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-semibold text-foreground">No businesses match these filters</p>
            <p className="text-sm mt-1">Try adjusting your search or clearing some filters</p>
            <button
              onClick={clearAll}
              className="mt-4 text-sm text-primary underline underline-offset-2"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-primary/5 border-t border-border py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
            Own a Business? Get Listed Free.
          </h2>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Reach thousands of Ijebu Igbo community members in the diaspora and back home.
            Send us your details and we'll publish your profile within 48 hours.
          </p>
          <a
            href="mailto:softlineazeez123@gmail.com?subject=Business%20Directory%20Listing%20Request&body=Business%20Name%3A%0ACategory%3A%0ATagline%3A%0ADescription%3A%0ALocation%3A%0APhone%3A%0AWhatsApp%3A%0AEmail%3A%0AWebsite%3A%0AOwner%20Name%3A%0AYear%20Established%3A%0ARegion%20(UK%2FNigeria%2FDiaspora)%3A"
            className="btn-primary inline-flex items-center gap-2"
          >
            Submit Your Business
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Free for all community members. Reviewed within 48 hours.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
