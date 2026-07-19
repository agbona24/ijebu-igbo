import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SmoothScroll, { useLenis } from "./components/SmoothScroll";

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);
  return null;
}
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import HeritagePage from "./pages/HeritagePage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import KingProfile from "./pages/KingProfile.tsx";
import TourismPage from "./pages/TourismPage.tsx";
import OjowoKingdomPage from "./pages/OjowoKingdomPage.tsx";
import JaparaKingdomPage from "./pages/JaparaKingdomPage.tsx";
import AtikoriKingdomPage from "./pages/AtikoriKingdomPage.tsx";
import OkeSopenKingdomPage from "./pages/OkeSopenKingdomPage.tsx";
import OkeAgboKingdomPage from "./pages/OkeAgboKingdomPage.tsx";
import ImopeIjebuPage from "./pages/ImopeIjebuPage.tsx";
import AparakiPage from "./pages/AparakiPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import BlogPost from "./pages/BlogPost.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScroll>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/"            element={<Index />} />
          <Route path="/about"       element={<AboutPage />} />
          <Route path="/heritage"    element={<HeritagePage />} />
          <Route path="/gallery"     element={<GalleryPage />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="/tourism"       element={<TourismPage />} />
          <Route path="/ojowo"         element={<OjowoKingdomPage />} />
          <Route path="/japara"        element={<JaparaKingdomPage />} />
          <Route path="/atikori"       element={<AtikoriKingdomPage />} />
          <Route path="/oke-sopen"     element={<OkeSopenKingdomPage />} />
          <Route path="/oke-agbo"      element={<OkeAgboKingdomPage />} />
          <Route path="/imope-ijebu"   element={<ImopeIjebuPage />} />
          <Route path="/aparaki"       element={<AparakiPage />} />
          <Route path="/blog"        element={<BlogPage />} />
          <Route path="/blog/:slug"  element={<BlogPost />} />
          <Route path="/heritage/orimolusi/:slug" element={<KingProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </SmoothScroll>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
