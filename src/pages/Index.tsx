import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Impact from "@/components/Impact";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <VideoSection />
      <Impact />
      <Story />
      <Gallery />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
