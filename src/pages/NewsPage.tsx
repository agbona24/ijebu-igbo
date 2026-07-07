import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { useSanityNews } from "@/hooks/useSanityNews";

export default function NewsPage() {
  const { data: NEWS_ARTICLES = [] } = useSanityNews();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/news" />

      {/* Hero */}
      <section className="relative min-h-[38vh] flex items-end pb-10 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-accent mb-2"
          >
            Latest Updates
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground"
          >
            News &amp; Announcements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-lg"
          >
            Stories and updates from Ijebu Igbo and our diaspora community.
          </motion.p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-main">
          {NEWS_ARTICLES.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No articles yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {NEWS_ARTICLES.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-400 border border-border"
                >
                  <Link to={`/news/${article.id}`} className="block">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                        {article.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <time>{article.date}</time>
                      </div>
                      <h2 className="font-bold text-foreground text-base leading-snug line-clamp-2 mb-2 group-hover:text-accent transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 text-accent text-sm font-semibold">
                        Read Full Story
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Back to home */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
