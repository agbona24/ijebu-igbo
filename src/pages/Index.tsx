import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Impact from "@/components/Impact";
import Team from "@/components/Team";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Registration from "@/components/Registration";
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
      <Team />
      <Story />
      <Gallery />
      <Events />
      <Registration />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
