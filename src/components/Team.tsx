import { motion } from "framer-motion";
import teamPresident from "@/assets/team-president.jpg";
import teamVP from "@/assets/team-vp.jpg";
import teamSecretary from "@/assets/team-secretary.jpg";
import teamTreasurer from "@/assets/team-treasurer.jpg";
import teamPRO from "@/assets/team-pro.jpg";
import teamWelfare from "@/assets/team-welfare.jpg";

const leaders = [
  { name: "Chief Adebayo Ogunleye", role: "President", image: teamPresident, bio: "A visionary leader dedicated to uniting Ijebu Igbo descendants worldwide." },
  { name: "Mrs. Folashade Adeyemi", role: "Vice President", image: teamVP, bio: "Championing cultural preservation and women empowerment across the diaspora." },
  { name: "Mr. Oluwaseun Akinola", role: "General Secretary", image: teamSecretary, bio: "Driving operational excellence and strategic community initiatives." },
  { name: "Mrs. Bukola Fashola", role: "Treasurer", image: teamTreasurer, bio: "Ensuring transparent financial stewardship for all development projects." },
  { name: "Chief Rotimi Odunsi", role: "Public Relations Officer", image: teamPRO, bio: "Amplifying the voice of Ijebu Igbo descendants on the global stage." },
  { name: "Ms. Titilayo Balogun", role: "Welfare Officer", image: teamWelfare, bio: "Building support systems for community members at home and abroad." },
];

export default function Team() {
  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="label-accent">Leadership</h2>
          <h3 className="heading-section">Meet Our Leaders</h3>
          <p className="text-body mt-4">
            Dedicated individuals driving the mission of unity, development, and cultural pride for Ijebu Igbo descendants worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-border group-hover:ring-accent transition-all duration-500">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-display font-bold text-foreground text-lg">{leader.name}</h4>
              <p className="text-accent font-semibold text-sm mt-1">{leader.role}</p>
              <p className="text-body text-sm mt-2 max-w-xs mx-auto">{leader.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
