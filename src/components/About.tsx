import { motion } from "framer-motion";
import aboutImg from "@/assets/about-culture.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="order-2 lg:order-1"
          >
            <h2 className="label-accent">About Us</h2>
            <h3 className="heading-section mb-4 sm:mb-6">
              Ijebu Igbo Descendants in Diaspora
            </h3>
            <p className="text-body mb-4 sm:mb-6 text-sm sm:text-base">
              We are a global community of Ijebu Igbo sons and daughters united by
              heritage and a shared vision for the development of our beloved
              hometown. From Lagos to London, New York to Nairobi, we stand
              together to preserve our culture and invest in the future of Ijebu
              Igbo.
            </p>
            <p className="text-body text-sm sm:text-base">
              Our mission is to mobilise the collective expertise, resources, and
              goodwill of Ijebu Igbo descendants around the world to drive
              transformative community development, educational advancement, and
              cultural preservation for generations to come.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative order-1 lg:order-2"
          >
            <div className="overflow-hidden rounded-xl sm:rounded-sm shadow-elevated">
              <img
                src={aboutImg}
                alt="Ijebu Igbo community elders gathering"
                className="w-full h-[280px] sm:h-[350px] lg:h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 bg-accent/10 rounded-xl sm:rounded-sm -z-10 hidden sm:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
