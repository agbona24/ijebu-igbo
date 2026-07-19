import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Hero from "@/components/Hero";
import KingdomStats from "@/components/KingdomStats";
import TownsShowcase from "@/components/TownsShowcase";
import OrimolusiSection from "@/components/OrimolusiSection";
import TimelineTeaser from "@/components/TimelineTeaser";
import Gallery from "@/components/Gallery";
import BlogTeaser from "@/components/BlogTeaser";
import FAQ, { faqs } from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ijebu-Igbo Heritage",
  alternateName: "Ijebu-Igbo Heritage Archive",
  url: "https://ijebu-igbo-heritage.example",
  description:
    "A living archive of Ijebu-Igbo, a Yoruba town of seven towns in Ijebu-North, Ogun State, Nigeria — its Orimolusi, its Town Obas, its history and its heritage.",
  about: {
    "@type": "Place",
    name: "Ijebu-Igbo",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ijebu-Igbo",
      addressRegion: "Ogun State",
      addressCountry: "NG",
    },
  },
};

const HOME_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.slice(0, 2).map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
  })),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/" jsonLd={[SITE_JSONLD, HOME_FAQ_JSONLD]} />
      <Hero />
      <KingdomStats />
      <TownsShowcase />
      <OrimolusiSection />
      <TimelineTeaser />
      <Gallery />
      <BlogTeaser />
      <FAQ limit={2} />
      <CTA />
      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
};

export default Index;
