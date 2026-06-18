import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Registration from "@/components/Registration";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Globe } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "General Enquiries",
    value: "info@ijebuigbodescendants.org",
    href: "mailto:info@ijebuigbodescendants.org",
  },
  {
    icon: Mail,
    label: "Support",
    value: "support@ijebuigbodescendants.org",
    href: "mailto:support@ijebuigbodescendants.org",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+44 7496 933887",
    href: "tel:+447496933887",
  },
  {
    icon: Globe,
    label: "Website",
    value: "ijebuigbodescendants.org",
    href: "https://www.ijebuigbodescendants.org/",
  },
  {
    icon: MapPin,
    label: "Based In",
    value: "United Kingdom",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative h-52 md:h-64 flex flex-col items-center justify-center">
          <AnimatedHeroBg gradientClass="bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center px-4"
          >
            <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase block mb-2">
              Connect Ijebu Roots
            </span>
            <h1 className="font-display font-black text-white text-4xl sm:text-5xl">
              Get In Touch
            </h1>
            <p className="text-white/70 text-sm sm:text-base mt-2 max-w-lg mx-auto">
              Join the community, ask a question, or partner with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-border p-5 flex items-start gap-4 shadow-sm"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <c.icon size={18} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium mb-0.5">{c.label}</p>
                {c.href ? (
                  <a
                    href={c.href}
                    className="text-sm font-semibold text-foreground hover:text-primary
                               transition-colors break-all"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-foreground">{c.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Membership registration form */}
      <Registration />

      <Footer />
    </div>
  );
}
