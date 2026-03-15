import { motion } from "framer-motion";
import aboutImg from "@/assets/about-culture.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="label-accent">About Us</h2>
            <h3 className="heading-section mb-6">
              Ijebu Igbo Descendants in Diaspora
            </h3>
            <p className="text-body mb-6">
              We are a global community of Ijebu Igbo sons and daughters united by
              heritage and a shared vision for the development of our beloved
              hometown. From Lagos to London, New York to Nairobi, we stand
              together to preserve our culture and invest in the future of Ijebu
              Igbo.
            </p>
            <p className="text-body">
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
            className="relative"
          >
            <div className="overflow-hidden rounded-sm shadow-elevated">
              <img
                src={aboutImg}
                alt="Ijebu Igbo community elders gathering"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-sm -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
