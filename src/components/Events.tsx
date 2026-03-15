import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

const events = [
  {
    title: "Annual General Meeting 2026",
    date: "April 15, 2026",
    time: "10:00 AM GMT",
    location: "Virtual (Zoom)",
    description: "Join us for the annual review of achievements and plans for the coming year.",
    upcoming: true,
  },
  {
    title: "Ojude Oba Cultural Festival",
    date: "June 20, 2026",
    time: "All Day",
    location: "Ijebu Igbo, Nigeria",
    description: "Experience the grandeur of Ojude Oba — a celebration of Yoruba royalty, culture, and heritage.",
    upcoming: true,
  },
  {
    title: "Diaspora Networking Gala",
    date: "August 10, 2026",
    time: "6:00 PM EST",
    location: "London, United Kingdom",
    description: "An evening of networking, cultural performances, and fundraising for community projects.",
    upcoming: true,
  },
  {
    title: "Education Scholarship Drive",
    date: "October 5, 2026",
    time: "2:00 PM WAT",
    location: "Lagos, Nigeria",
    description: "Supporting the next generation of Ijebu Igbo scholars through merit-based scholarships.",
    upcoming: true,
  },
];

export default function Events() {
  return (
    <section id="events" className="section-padding bg-surface">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="label-accent">Events</h2>
          <h3 className="heading-section">Upcoming Events</h3>
          <p className="text-body mt-4">
            Stay connected with our community through cultural events, meetings, and development initiatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card rounded-sm p-8 border border-border hover:shadow-elevated transition-all duration-500"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full uppercase tracking-wider">
                  Upcoming
                </span>
              </div>
              <h4 className="font-display font-bold text-foreground text-xl mb-4">{event.title}</h4>
              <p className="text-body text-sm mb-5">{event.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={16} className="text-accent" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} className="text-accent" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} className="text-accent" />
                  <span>{event.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
