import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";

const ease = [0.16, 1, 0.3, 1] as const;

export default function BlogTeaser() {
  const [featured, ...rest] = BLOG_POSTS;
  const list = rest.slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 sm:mb-12"
        >
          <div>
            <h2 className="label-accent">From the Archive</h2>
            <h3 className="heading-section">History, Kingship & Culture</h3>
          </div>
          <Link to="/blog" className="text-sm font-semibold text-primary hover:text-accent transition-colors inline-flex items-center gap-1.5 shrink-0">
            All {BLOG_POSTS.length} articles <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-3"
          >
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-muted">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {featured.category}
                </span>
              </div>
              <h4 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-foreground leading-snug group-hover:text-primary transition-colors mb-2">
                {featured.title}
              </h4>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-2">
                {featured.excerpt}
              </p>
            </Link>
          </motion.div>

          {/* Recent posts list */}
          <div className="lg:col-span-2 flex flex-col gap-1 divide-y divide-border">
            {list.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <Link to={`/blog/${post.slug}`} className="group flex items-start gap-3 py-4 first:pt-0">
                  <BookOpen size={15} className="text-accent shrink-0 mt-1" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      {post.category}
                    </p>
                    <h5 className="font-display font-semibold text-sm sm:text-base text-foreground leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h5>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
