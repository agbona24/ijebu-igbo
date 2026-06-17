import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Store, X, Mail, ArrowUpDown, ArrowRight, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import {
  BUSINESSES,
  CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_GRADIENTS,
  type Business,
  type Category,
} from "@/data/businesses";

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function BusinessCard({ business }: { business: Business }) {
  const navigate = useNavigate();
  const gradient = CATEGORY_GRADIENTS[business.category] ?? "from-primary to-primary/70";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/businesses/${business.slug}`)}
      className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Flyer / visual */}
      <div className="relative h-44 overflow-hidden">
        {business.flyer ? (
          <img
            src={business.flyer}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-2`}>
            <span className="text-4xl font-display font-black text-white/90 tracking-tight select-none">
              {getInitials(business.name)}
            </span>
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase">
              {business.category}
            </span>
          </div>
        )}

        {business.featured && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            ★ Featured
          </div>
        )}

        <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm bg-white/80 ${CATEGORY_COLORS[business.category] ?? "text-gray-700 border-gray-200"}`}>
          {business.category}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-foreground text-base leading-tight group-hover:text-primary transition-colors">
          {business.name}
        </h3>
        {business.tagline && (
          <p className="text-xs text-accent font-medium mt-0.5">{business.tagline}</p>
        )}
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 flex-1">
          {business.description}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          {business.location ? (
            <span className="text-xs text-muted-foreground truncate max-w-[60%]">
              📍 {business.location}
            </span>
          ) : (
            <span />
          )}
          <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            View Profile
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Businesses() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sort, setSort] = useState<"default" | "az" | "za">("default");

  const filtered = useMemo(() => {
    let list = BUSINESSES.filter((b) => {
      const matchesCategory = activeCategory === "All" || b.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        (b.location ?? "").toLowerCase().includes(q) ||
        (b.tagline ?? "").toLowerCase().includes(q) ||
        (b.ownerName ?? "").toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") list = [...list].sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [search, activeCategory, sort]);

  const categoryCount = useMemo(() => {
    const cats = new Set(BUSINESSES.map((b) => b.category));
    return cats.size;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative min-h-[420px] md:min-h-[480px] flex flex-col items-center justify-center px-4 py-16">
          <AnimatedHeroBg gradientClass="bg-gradient-to-br from-primary via-primary to-primary/80" />

          {/* Stronger bottom fade so filter bar feels connected */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
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

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, service, location…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </div>

      </section>

      {/* Category filters */}
      <div className="sticky top-14 md:top-20 z-30 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "business" : "businesses"}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-sm text-muted-foreground">
              <ArrowUpDown size={13} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="bg-transparent text-sm text-foreground focus:outline-none cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>

            <a
              href="mailto:softlineazeez123@gmail.com?subject=Business%20Directory%20Listing%20Request&body=Business%20Name%3A%0ACategory%3A%0ADescription%3A%0ALocation%3A%0APhone%3A%0AWebsite%3A%0AOwner%20Name%3A"
              className="btn-primary text-sm !py-2 !px-4 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Building2 size={14} />
              List Your Business
            </a>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <Store size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-semibold text-foreground">No businesses found</p>
            <p className="text-sm mt-1">Try a different search term or category</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 text-sm text-primary underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* CTA */}
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
            href="mailto:softlineazeez123@gmail.com?subject=Business%20Directory%20Listing%20Request&body=Business%20Name%3A%0ACategory%3A%0ATagline%3A%0ADescription%3A%0ALocation%3A%0APhone%3A%0AWhatsApp%3A%0AEmail%3A%0AWebsite%3A%0AOwner%20Name%3A%0AYear%20Established%3A%0AServices%20Offered%3A%0AOpening%20Hours%3A%0AInstagram%3A%0AFacebook%3A"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Mail size={16} />
            Submit Your Business
          </a>
          <p className="text-xs text-muted-foreground mt-3">Free for all community members. Reviewed within 48 hours.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
