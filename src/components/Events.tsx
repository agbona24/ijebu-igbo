import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useSanityEvents } from "@/hooks/useSanityEvents";

export default function Events() {
  const { data: events = [] } = useSanityEvents();

  return (
    <section id="events" className="section-padding bg-surface">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="label-accent">Events</h2>
          <h3 className="heading-section">Upcoming Events</h3>
          <p className="text-body mt-2 sm:mt-3">
            Stay connected with our community through cultural events, meetings, and development initiatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 max-w-5xl mx-auto">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card rounded-xl sm:rounded-sm p-5 sm:p-7 border border-border hover:shadow-elevated transition-all duration-500 touch-card"
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                {event.upcoming ? (
                  <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 bg-accent/10 text-accent text-xs font-bold rounded-full uppercase tracking-wider">
                    Upcoming
                  </span>
                ) : (
                  <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 bg-muted text-muted-foreground text-xs font-bold rounded-full uppercase tracking-wider border border-border">
                    Past
                  </span>
                )}
              </div>
              <h4 className="font-display font-bold text-foreground text-lg sm:text-xl mb-3 sm:mb-4">{event.title}</h4>
              <p className="text-body mb-4 sm:mb-5">{event.description}</p>
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
