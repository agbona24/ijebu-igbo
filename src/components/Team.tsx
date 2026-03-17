import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";

// Current Executives
const currentExecutives = [
  { name: "Otunba Ola Busari", role: "PRO" },
];

// Past Executives (September 2017 - August 2019)
const pastExecutives = [
  { name: "Otunba Ola Busari", role: "President (2017-2019)" },
  { name: "Mrs. Funke Adenuga", role: "Gen. Secretary" },
  { name: "Princess Toun Adebanjo", role: "Asst. Gen. Secretary" },
  { name: "Otunba Titi Bashorun", role: "Treasurer" },
  { name: "Alhaji Wasiu Agbona", role: "Chief Whip" },
  { name: "Mrs. Funleyi Oluyemisi Amudipe", role: "Internal Auditor" },
  { name: "Alhaji Fatai Olaide", role: "Legal Affairs Officer" },
  { name: "Deaconess Mrs. Roselyn Sojirin (JP)", role: "Women Affair Officer" },
  { name: "Alhaji Bola Gafar", role: "PRO" },
  { name: "Chief (Mrs). Bisi Kazeem", role: "Cultural Secretary" },
  { name: "Mr. Rafiu Adejobi", role: "Welfare Officer" },
  { name: "Alhaji Kunle Hamzat", role: "Fin. Secretary" },
  { name: "Bisi Daramola Odubanjo", role: "Social Secretary" },
  { name: "Prince Stephen Ademola Gbadebo", role: "Chairman, Dispute & Resolution Committee" },
  { name: "Lawyer Michael Popoola Aojirin", role: "President Emeritus" },
  { name: "Dr. Dayo Amudipe", role: "Former Vice President" },
  { name: "Alhaja Ikeoluwa Oguntayo", role: "Vice President" },
  { name: "Toyin Odueyungbo", role: "Former Gen. Secretary" },
  { name: "Dapo Nadi", role: "Past Executive" },
  { name: "Abi Okuyemi", role: "Past Executive" },
  { name: "Kaz Haruna Ishola", role: "Past Executive" },
];

function ExecutiveCard({ member, index }: { member: { name: string; role: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-card border border-border rounded-xl p-4 sm:p-6 hover:border-accent/50 hover:shadow-lg active:scale-[0.98] transition-all duration-300 touch-manipulation"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-active:bg-accent/30 transition-colors duration-300">
          <User className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-accent transition-colors duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-bold text-foreground text-sm sm:text-base leading-tight">
            {member.name}
          </h4>
          <p className="text-accent font-semibold text-xs sm:text-sm mt-1">{member.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <h2 className="label-accent">Leadership</h2>
          <h3 className="heading-section">Our Executive Committee</h3>
          <p className="text-body mt-2 sm:mt-3">
            Dedicated individuals driving the mission of unity, development, and cultural pride for Ijebu Igbo descendants worldwide.
          </p>
        </motion.div>

        <Tabs defaultValue="past" className="w-full">
          <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="bg-muted/50 p-1 sm:p-1.5 rounded-full flex-shrink-0">
              <TabsTrigger 
                value="current" 
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold data-[state=active]:bg-accent data-[state=active]:text-charcoal transition-all touch-manipulation whitespace-nowrap"
              >
                Current Executives
              </TabsTrigger>
              <TabsTrigger 
                value="past" 
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold data-[state=active]:bg-accent data-[state=active]:text-charcoal transition-all touch-manipulation whitespace-nowrap"
              >
                Past Executives
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="current" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center text-muted-foreground mb-8 text-sm">
                Present Executive Committee
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-md mx-auto lg:max-w-none">
                {currentExecutives.map((member, i) => (
                  <ExecutiveCard key={member.name} member={member} index={i} />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center text-muted-foreground mb-8 text-sm">
                Former Executive Members (including September 2017 - August 2019 tenure)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pastExecutives.map((member, i) => (
                  <ExecutiveCard key={member.name} member={member} index={i} />
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
