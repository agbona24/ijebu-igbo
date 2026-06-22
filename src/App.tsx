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
import NewsPost from "./pages/NewsPost.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ImpactPage from "./pages/ImpactPage.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import HeritagePage from "./pages/HeritagePage.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Businesses from "./pages/Businesses.tsx";
import BusinessProfile from "./pages/BusinessProfile.tsx";
import JoinPage from "./pages/JoinPage.tsx";
import KingProfile from "./pages/KingProfile.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import TourismPage from "./pages/TourismPage.tsx";

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
          <Route path="/impact"      element={<ImpactPage />} />
          <Route path="/team"        element={<TeamPage />} />
          <Route path="/heritage"    element={<HeritagePage />} />
          <Route path="/events"      element={<EventsPage />} />
          <Route path="/gallery"     element={<GalleryPage />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="/news"          element={<NewsPage />} />
          <Route path="/tourism"       element={<TourismPage />} />
          <Route path="/news/:id"    element={<NewsPost />} />
          <Route path="/businesses"          element={<Businesses />} />
          <Route path="/businesses/:slug"    element={<BusinessProfile />} />
          <Route path="/join"              element={<JoinPage />} />
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
