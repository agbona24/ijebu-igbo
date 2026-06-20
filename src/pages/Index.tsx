import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Impact from "@/components/Impact";
import Team from "@/components/Team";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import OrimolusiSection from "@/components/OrimolusiSection";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <VideoSection />
      <Impact />
      <OrimolusiSection />
      <Team />
      <Story />
      <Testimonials />
      <News />
      <Gallery />
      <FAQ limit={2} />
      <CTA />
      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
};

export default Index;
