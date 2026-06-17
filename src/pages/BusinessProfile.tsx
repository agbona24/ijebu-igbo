import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Store,
  CheckCircle2,
  Share2,
  CalendarDays,
  User,
  Layers,
  Sparkles,
  Zap,
  Target,
  RefreshCw,
  Server,
  Cloud,
  Code2,
  Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { BUSINESSES, CATEGORY_COLORS, CATEGORY_GRADIENTS, type ServiceCategory } from "@/data/businesses";

const SERVICE_CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Managed IT Support & Outsourcing": <Server size={18} className="text-blue-500" />,
  "Domains, Hosting & Email Solutions": <Globe size={18} className="text-emerald-500" />,
  "Cloud, DevOps & Automation": <Cloud size={18} className="text-purple-500" />,
  "Software & Application Development": <Code2 size={18} className="text-orange-500" />,
};

const VALUE_ICONS: React.ReactNode[] = [
  <Sparkles size={20} className="text-accent" />,
  <RefreshCw size={20} className="text-accent" />,
  <Zap size={20} className="text-accent" />,
  <Target size={20} className="text-accent" />,
];

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.18 8.18 0 004.77 1.52V6.95a4.85 4.85 0 01-1-.26z" />
  </svg>
);

export default function BusinessProfile() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const business = BUSINESSES.find((b) => b.slug === slug);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: business?.name ?? "", url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <Store size={56} className="text-muted-foreground/20" />
          <h1 className="font-display font-bold text-2xl">Business not found</h1>
          <p className="text-muted-foreground text-sm">This listing may have moved or been removed.</p>
          <button onClick={() => navigate("/businesses")} className="btn-primary mt-2">
            Back to Directory
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const gradient = CATEGORY_GRADIENTS[business.category] ?? "from-primary to-primary/70";
  const whatsappNumber = (business.whatsapp ?? business.phone ?? "").replace(/\D/g, "");
  const hasContactInfo = business.phone || business.email || business.website || business.location;
  const hasServices = business.services && business.services.length > 0;
  const hasGallery = business.gallery && business.gallery.length > 0;
  const hasSocial = business.social && Object.values(business.social).some(Boolean);
  const hasHours = business.hours && business.hours.length > 0;

  // Get first two initials for watermark
  const initials = business.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative min-h-[560px] md:min-h-[640px] flex flex-col">

          {/* Background */}
          {business.banner || business.flyer ? (
            <>
              <img
                src={business.banner ?? business.flyer}
                alt={business.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
            </>
          ) : (
            <AnimatedHeroBg gradientClass={`bg-gradient-to-br ${gradient}`} />
          )}

          {/* Stronger dark overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10" />

          {/* Smooth fade to page bg at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f8f9fb] to-transparent z-20" />

          {/* Nav row */}
          <div className="relative z-30 flex items-center justify-between px-5 md:px-10 pt-5">
            <button
              onClick={() => navigate("/businesses")}
              className="flex items-center gap-1.5 bg-black/30 hover:bg-black/50 text-white text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm transition-colors border border-white/10"
            >
              <ArrowLeft size={14} />
              Directory
            </button>
            <button
              onClick={handleShare}
              className="bg-black/30 hover:bg-black/50 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors border border-white/10"
              aria-label="Share"
            >
              <Share2 size={15} />
            </button>
          </div>

          {/* ── CENTRED name block ── */}
          <div className="relative z-30 flex-1 flex flex-col items-center justify-center text-center px-6 pb-16 md:pb-20">

            {/* Giant initials watermark */}
            <span
              aria-hidden
              className="absolute select-none pointer-events-none font-display font-black text-white/[0.04] leading-none"
              style={{ fontSize: "clamp(200px, 30vw, 380px)" }}
            >
              {initials}
            </span>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Category chip */}
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/25 mb-6">
                {business.category}
              </span>

              {/* Business name — the hero */}
              <h1
                className="font-display font-black text-white leading-[1.05] mb-4 drop-shadow-lg"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
              >
                {business.name}
              </h1>

              {business.tagline && (
                <p className="text-white/75 text-lg sm:text-xl font-medium mb-8 max-w-xl">
                  {business.tagline}
                </p>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {whatsappNumber && (
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20c05c] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-black/20"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                )}
                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="inline-flex items-center gap-2 bg-white text-foreground hover:bg-white/90 font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-black/20"
                  >
                    <Phone size={15} className="text-primary" />
                    Call
                  </a>
                )}
                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    className="inline-flex items-center gap-2 bg-white text-foreground hover:bg-white/90 font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-black/20"
                  >
                    <Mail size={15} className="text-primary" />
                    Email
                  </a>
                )}
                {business.website && (
                  <a
                    href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-foreground hover:bg-white/90 font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-black/20"
                  >
                    <Globe size={15} className="text-primary" />
                    Website
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-24">

        {/* Quick-facts strip */}
        {(business.location || business.ownerName || business.established) && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 mb-6 border-b border-border text-sm text-muted-foreground">
            {business.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-accent shrink-0" />
                {business.location}
              </span>
            )}
            {business.ownerName && (
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-accent shrink-0" />
                {business.ownerName}
              </span>
            )}
            {business.established && (
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} className="text-accent shrink-0" />
                Est. {business.established}
              </span>
            )}
          </div>
        )}

        {/* ── TWO-COLUMN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT — main content */}
          <div className="md:col-span-2 space-y-6">

            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-border p-6"
            >
              <h2 className="font-display font-bold text-lg text-foreground mb-3">About</h2>
              <p className="text-foreground/75 leading-relaxed text-sm sm:text-base">{business.description}</p>
            </motion.section>

            {/* What We Do */}
            {business.whatWeDo && business.whatWeDo.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h2 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
                  <Layers size={18} className="text-accent" />
                  What We Do
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {business.whatWeDo.map((section, i) => (
                    <div key={i} className="bg-[#f8f9fb] rounded-xl p-4">
                      <h3 className="font-semibold text-sm text-foreground mb-2">{section.title}</h3>
                      {section.description && (
                        <p className="text-xs text-muted-foreground mb-3">{section.description}</p>
                      )}
                      <ul className="space-y-1.5">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-xs text-foreground/75">
                            <CheckCircle2 size={12} className="text-accent shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Services — categorised */}
            {business.serviceCategories && business.serviceCategories.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h2 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
                  <Building2 size={18} className="text-accent" />
                  Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {business.serviceCategories.map((cat: ServiceCategory, i) => (
                    <div key={i} className="rounded-xl border border-border bg-[#f8f9fb] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {SERVICE_CATEGORY_ICONS[cat.name] ?? <Server size={18} className="text-primary" />}
                        <h3 className="font-semibold text-sm text-foreground">{cat.name}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {cat.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-xs text-foreground/75">
                            <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-1.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Flat services fallback */}
            {hasServices && !business.serviceCategories && (
              <motion.section
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h2 className="font-display font-bold text-lg text-foreground mb-4">Services</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {business.services!.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Company Values */}
            {business.values && business.values.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h2 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
                  <Sparkles size={18} className="text-accent" />
                  Our Values
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {business.values.map((val, i) => (
                    <div key={i} className="rounded-xl border border-border bg-[#f8f9fb] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {VALUE_ICONS[i % VALUE_ICONS.length]}
                        <h3 className="font-semibold text-sm text-foreground">{val.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{val.description}</p>
                      {val.items && (
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {val.items.map((item, j) => (
                            <span key={j} className="text-xs bg-accent/10 text-accent font-medium px-2 py-0.5 rounded-full">
                              {item}
                            </span>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Technology Focus */}
            {business.focusAreas && business.focusAreas.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Zap size={18} className="text-accent" />
                  Technology Focus
                </h2>
                <div className="flex flex-wrap gap-2">
                  {business.focusAreas.map((area, i) => (
                    <span
                      key={i}
                      className="text-sm bg-primary/5 text-primary border border-primary/15 font-medium px-3 py-1.5 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Technology Partners */}
            {business.partners && business.partners.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h2 className="font-display font-bold text-lg text-foreground mb-1 flex items-center gap-2">
                  <Target size={18} className="text-accent" />
                  Technology Partners
                </h2>
                <p className="text-xs text-muted-foreground mb-4">Strategic partnerships powering our solutions</p>
                <div className="flex flex-wrap gap-2">
                  {business.partners.map((partner, i) => (
                    <span
                      key={i}
                      className="text-sm bg-[#f8f9fb] text-foreground/80 border border-border font-semibold px-3 py-1.5 rounded-lg"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Flyer */}
            {business.flyer && business.banner && (
              <motion.section
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-border overflow-hidden"
              >
                <h2 className="font-display font-bold text-lg text-foreground p-6 pb-3">Flyer</h2>
                <img src={business.flyer} alt="Business flyer" className="w-full object-contain max-h-[500px]" />
              </motion.section>
            )}

            {/* Gallery */}
            {hasGallery && (
              <motion.section
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h2 className="font-display font-bold text-lg text-foreground mb-4">Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {business.gallery!.map((img, i) => (
                    <img key={i} src={img} alt={`${business.name} ${i + 1}`}
                      className="rounded-xl object-cover aspect-square w-full" />
                  ))}
                </div>
              </motion.section>
            )}

            {/* Empty state */}
            {!hasServices && !business.serviceCategories && !hasGallery && !business.whatWeDo && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-10 text-center"
              >
                <Store size={32} className="mx-auto mb-3 text-primary/30" />
                <p className="font-semibold text-foreground text-sm">Full profile coming soon</p>
                <p className="text-xs text-muted-foreground mt-1">Services and details will appear here.</p>
              </motion.div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5">

            {/* Contact */}
            {hasContactInfo && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl border border-border p-5"
              >
                <h2 className="font-display font-bold text-base text-foreground mb-4">Contact</h2>
                <div className="space-y-3">
                  {business.location && (
                    <div className="flex items-start gap-2.5 text-sm">
                      <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-xs leading-relaxed">{business.location}</span>
                    </div>
                  )}
                  {business.phone && (
                    <a href={`tel:${business.phone}`} className="flex items-center gap-2.5 text-sm text-primary hover:underline">
                      <Phone size={14} className="shrink-0" />
                      {business.phone}
                    </a>
                  )}
                  {business.email && (
                    <a href={`mailto:${business.email}`} className="flex items-center gap-2.5 text-sm text-primary hover:underline break-all">
                      <Mail size={14} className="shrink-0" />
                      {business.email}
                    </a>
                  )}
                  {business.website && (
                    <a
                      href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-sm text-primary hover:underline break-all"
                    >
                      <Globe size={14} className="shrink-0" />
                      {business.website}
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            {/* Opening hours */}
            {hasHours && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-border p-5"
              >
                <h2 className="font-display font-bold text-base text-foreground mb-4 flex items-center gap-2">
                  <Clock size={14} className="text-accent" />
                  Opening Hours
                </h2>
                <div className="space-y-2">
                  {business.hours!.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="font-semibold text-foreground">{h.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Social */}
            {hasSocial && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl border border-border p-5"
              >
                <h2 className="font-display font-bold text-base text-foreground mb-4">Follow Us</h2>
                <div className="flex flex-col gap-2">
                  {business.social?.instagram && (
                    <a href={`https://instagram.com/${business.social.instagram.replace("@","")}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground">
                      <Instagram size={15} className="text-pink-500" />
                      @{business.social.instagram.replace("@","")}
                    </a>
                  )}
                  {business.social?.facebook && (
                    <a href={`https://facebook.com/${business.social.facebook}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground">
                      <Facebook size={15} className="text-[#1877F2]" />
                      {business.social.facebook}
                    </a>
                  )}
                  {business.social?.twitter && (
                    <a href={`https://twitter.com/${business.social.twitter.replace("@","")}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground">
                      <Twitter size={15} />
                      @{business.social.twitter.replace("@","")}
                    </a>
                  )}
                  {business.social?.tiktok && (
                    <a href={`https://tiktok.com/@${business.social.tiktok.replace("@","")}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground">
                      <TikTokIcon />
                      @{business.social.tiktok.replace("@","")}
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            <button
              onClick={() => navigate("/businesses")}
              className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary py-3 rounded-xl transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Directory
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
