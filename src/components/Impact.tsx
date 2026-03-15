import { motion } from "framer-motion";
import { Globe, BookOpen, Heart, Users } from "lucide-react";

const impacts = [
  {
    title: "Community Development",
    desc: "Infrastructural projects targeting clean water, roads, and renewable energy in Ijebu Igbo.",
    icon: Globe,
  },
  {
    title: "Education Support",
    desc: "Scholarship funds and digital literacy programs empowering local youth for global opportunities.",
    icon: BookOpen,
  },
  {
    title: "Cultural Preservation",
    desc: "Documenting oral histories, supporting the annual Ojude Oba festival, and preserving Ijebu traditions.",
    icon: Heart,
  },
  {
    title: "Diaspora Networking",
    desc: "A professional bridge connecting experts abroad with local opportunities back home.",
    icon: Users,
  },
];

export default function Impact() {
  return (
    <section id="impact" className="section-padding bg-background">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="label-accent">Our Impact</h2>
            <h3 className="heading-section">
              Transforming heritage into sustainable progress.
            </h3>
          </div>
          <p className="text-body max-w-sm pb-2">
            We measure our success by the tangible growth of our community and
            the strength of our global bonds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-sm overflow-hidden">
          {impacts.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card p-10 flex flex-col h-full"
            >
              <item.icon className="w-10 h-10 text-accent mb-8" strokeWidth={1.5} />
              <h4 className="text-xl font-bold text-primary mb-4 font-display">
                {item.title}
              </h4>
              <p className="text-body">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
