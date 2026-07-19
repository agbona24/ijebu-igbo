import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, Crown, Landmark, Users, Heart, BookOpen } from "lucide-react";

const timelineEvents = [
  {
    era: "Founding",
    year: "Pre-1500s",
    title: "The Hunting Camps Unite",
    description: "Onayelu, Ogunelegi, Princess Sopenlukale and the Agemo priest Moki establish Ijebu-Igbo from five hunting camps, with Onayelu installed as the first Oloja Ugbo — the first Orimolusi.",
    icon: Crown,
    color: "from-yellow-600 to-amber-700",
  },
  {
    era: "Kingdom Era",
    year: "1500s-1800s",
    title: "Flourishing Kingdom",
    description: "Ijebu-Igbo becomes a prosperous trading centre, known for its rich culture, craftsmanship, and the legendary Ojude Oba festival.",
    icon: Users,
    color: "from-blue-600 to-indigo-700",
  },
  {
    era: "Colonial Period",
    year: "1800s-1960",
    title: "Resilience Through Change",
    description: "The town preserves its cultural identity and chieftaincy structures despite colonial influence, maintaining the spirit of 'Ijebu Igbo kì í ṣofo.'",
    icon: Heart,
    color: "from-red-600 to-rose-700",
  },
  {
    era: "Independence",
    year: "1960-1994",
    title: "Nigerian Independence",
    description: "Ijebu-Igbo becomes headquarters of Ijebu-North Local Government Area, its seven towns and Council of Obas taking shape as the kingdom grows.",
    icon: Calendar,
    color: "from-green-600 to-emerald-700",
  },
  {
    era: "Vacant Throne",
    year: "1994-2022",
    title: "Twenty-Eight Years Without an Orimolusi",
    description: "The paramount stool at Oke-Tako stands vacant for nearly three decades, even as the seven Town Obas continue to govern their own towns.",
    icon: Landmark,
    color: "from-purple-600 to-violet-700",
  },
  {
    era: "Present Day",
    year: "2022-Present",
    title: "Oba Lawrence Jaiyeoba Adebajo, Ojuromi VI",
    description: "The Orimolusi throne is filled once more, and in the years since, Imope-Ijebu and Aparaki are recognised as Ijebu-Igbo's newest Town Obaships — bringing the town Obas to seven.",
    icon: BookOpen,
    color: "from-accent to-primary",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="section-padding bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-main relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="label-accent">Our Journey</span>
          <h2 className="heading-section mt-3">
            From Hunting Camps to a{" "}
            <span className="text-primary">Kingdom of Seven Towns</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            Trace the history of Ijebu-Igbo from its founding to the present-day Orimolusi
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center line with progress indicator */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden lg:block">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              style={{ height: progressBarHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary to-accent"
            />
          </div>

          {/* Mobile/Tablet line */}
          <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-0.5 lg:hidden">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              style={{ height: progressBarHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary to-accent"
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`relative flex items-center ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Content Card */}
                  <div
                    className={`flex-1 ${
                      isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"
                    } pl-16 sm:pl-20 lg:pl-0 text-left`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className={`relative bg-card border-2 border-border hover:border-accent/50 rounded-xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
                    >
                      {/* Gradient overlay */}
                      <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full bg-gradient-to-b ${event.color} opacity-80`} />
                      
                      <div className="space-y-2 sm:space-y-3">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {event.era}
                        </span>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-accent font-medium">
                          {event.year}
                        </p>
                        <p className="text-body leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Decorative corner accent */}
                      <div className={`absolute ${isLeft ? 'bottom-0 right-0' : 'bottom-0 left-0'} w-20 h-20 bg-gradient-to-br ${event.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                    </motion.div>
                  </div>

                  {/* Center Icon - Desktop */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg items-center justify-center z-10 border-4 border-background"
                  >
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </motion.div>

                  {/* Left Icon - Mobile/Tablet */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="lg:hidden absolute left-8 sm:left-12 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center z-10 border-4 border-background"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* End marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mt-12 sm:mt-16 lg:mt-24"
          >
            <div className="absolute left-8 sm:left-12 lg:left-1/2 lg:-translate-x-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent border-4 border-background shadow-lg" />
            <motion.p
              className="pl-16 sm:pl-20 lg:pl-0 lg:text-center text-body font-medium italic"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              The record continues...
            </motion.p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-16 sm:mt-20"
        >
          <p className="text-lg sm:text-xl text-foreground/80 mb-6 font-display">
            Explore the towns that make up this history
          </p>
          <a
            href="/heritage"
            className="btn-primary inline-flex items-center gap-2"
          >
            View the Council of Obas
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
