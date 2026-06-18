import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, X } from "lucide-react";

type Member = { name: string; role: string; photo?: string | null };

// Current Executives
const currentExecutives: Member[] = [
  { name: "Chief Toyin Odueyungbo", role: "President", photo: "/team/chief-toyin-odueyungbo.jpeg" },
  { name: "Revd Franklin Babaranti Okunowo", role: "Vice President (2022 – Present)", photo: "/team/evd-franklin-okunowo.jpeg" },
  { name: "Ms. Adetutu Ogunsanwo", role: "General Secretary (2021 – Present)", photo: "/team/ms-adetutu-ogunsanwo.jpeg" },
  { name: "Pa (Barr.) Popoola Sojirin", role: "Legal Adviser 2 | Member, Council of Elders", photo: "/team/barr-popoola-sojirin.jpeg" },
  { name: "Alh Sadekunle Hamzat-Maja", role: "Auditor", photo: "/team/alh-sadekunle-hamzat-maja.jpeg" },
  { name: "Otunba Ola Busari", role: "PRO", photo: null },
];

// Council of Elders
const councilOfElders: Member[] = [
  {
    name: "Pa (Barr.) Popoola Sojirin",
    role: "Emeritus President | Legal Adviser 2 | Member, Council of Elders",
    photo: "/team/barr-popoola-sojirin.jpeg",
  },
];

// General Members
const generalMembers: Member[] = [];

// Past Executives (September 2017 - August 2019)
const pastExecutives: Member[] = [
  { name: "Otunba Ola Busari", role: "President (2017-2019)" },
  { name: "Mrs. Funke Adenuga", role: "Gen. Secretary" },
  { name: "Princess Toun Adebanjo", role: "Asst. Gen. Secretary" },
  { name: "Otunba Titi Bashorun", role: "Treasurer" },
  { name: "Alhaji Wasiu Agbona", role: "Chief Whip" },
  { name: "Mrs. Funleyi Oluyemisi Amudipe", role: "Internal Auditor" },
  { name: "Alhaji Fatai Olaide", role: "Legal Affairs Officer" },
  { name: "Deaconess Mrs. Roselyn Sojirin (JP)", role: "Women Affair Officer" },
  { name: "Alhaji Bola Gafar", role: "PRO" },
  { name: "Chief Mrs. Bisi Kazeem, Yeyeluwa of Atikori", role: "Social Secretary (4 Years)", photo: "/team/chief-mrs-bisi-kazeem.jpeg" },
  { name: "Mr. Rafiu Adejobi", role: "Welfare Officer" },
  { name: "Alh Sadekunle Hamzat-Maja", role: "Former Financial Secretary & Former Treasurer" },
  { name: "Bisi Daramola Odubanjo", role: "Social Secretary" },
  { name: "Prince Stephen Ademola Gbadebo", role: "Chairman, Dispute & Resolution Committee" },
  { name: "Pa (Barr.) Popoola Sojirin", role: "President Emeritus | Former President | Former Secretary General", photo: "/team/barr-popoola-sojirin.jpeg" },
  { name: "Dr. Dayo Amudipe", role: "Former Vice President" },
  { name: "Alhaja Ikeoluwa Oguntayo", role: "Vice President" },
  { name: "Chief Toyin Odueyungbo", role: "Past Secretary" },
  { name: "Dapo Nadi", role: "Past Executive" },
  { name: "Abi Okuyemi", role: "Past Executive" },
  { name: "Kaz Haruna Ishola", role: "Past Executive" },
];

function PhotoLightbox({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-sm w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X size={16} />
          </button>
          <img
            src={member.photo!}
            alt={member.name}
            className="w-full object-cover max-h-[70vh]"
          />
          <div className="p-4">
            <h4 className="font-display font-bold text-foreground text-base">{member.name}</h4>
            <p className="text-accent font-semibold text-sm mt-1">{member.role}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ExecutiveCard({ member, index, onPhotoClick }: { member: Member; index: number; onPhotoClick?: (m: Member) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
    >
      {/* Photo area */}
      <div
        className={`relative w-full aspect-[4/3] bg-primary/10 flex items-center justify-center overflow-hidden ${member.photo ? "cursor-pointer" : ""}`}
        onClick={() => member.photo && onPhotoClick?.(member)}
      >
        {member.photo ? (
          <>
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold bg-black/50 px-3 py-1.5 rounded-full">
                View Photo
              </span>
            </div>
          </>
        ) : (
          <User className="w-16 h-16 text-primary/30" />
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-display font-bold text-foreground text-sm sm:text-base leading-tight">
          {member.name}
        </h4>
        <p className="text-accent font-semibold text-xs sm:text-sm mt-1">{member.role}</p>
      </div>
    </motion.div>
  );
}

function MemberGrid({ members }: { members: Member[] }) {
  const [lightbox, setLightbox] = useState<Member | null>(null);

  return (
    <>
      {/* Mobile: horizontal swipe */}
      <div className="md:hidden -mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
          {members.map((member, i) => (
            <div key={member.name + i} className="flex-shrink-0 w-[240px] snap-center">
              <ExecutiveCard member={member} index={i} onPhotoClick={setLightbox} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
        {members.map((member, i) => (
          <ExecutiveCard
            key={member.name + i}
            member={member}
            index={i}
            onPhotoClick={setLightbox}
          />
        ))}
      </div>

      {lightbox && (
        <PhotoLightbox member={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
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

        <Tabs defaultValue="current" className="w-full">
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
              <TabsTrigger
                value="elders"
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold data-[state=active]:bg-accent data-[state=active]:text-charcoal transition-all touch-manipulation whitespace-nowrap"
              >
                Council of Elders
              </TabsTrigger>
              <TabsTrigger
                value="members"
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold data-[state=active]:bg-accent data-[state=active]:text-charcoal transition-all touch-manipulation whitespace-nowrap"
              >
                Members
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="current" className="mt-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className="text-center text-muted-foreground mb-8 text-sm">Present Executive Committee</p>
              <MemberGrid members={currentExecutives} />
            </motion.div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className="text-center text-muted-foreground mb-8 text-sm">
                Former Executive Members (including September 2017 – August 2019 tenure)
              </p>
              <MemberGrid members={pastExecutives} />
            </motion.div>
          </TabsContent>

          <TabsContent value="elders" className="mt-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className="text-center text-muted-foreground mb-8 text-sm">
                Revered elders who guide, advise, and preserve the values of our community
              </p>
              <MemberGrid members={councilOfElders} />
            </motion.div>
          </TabsContent>

          <TabsContent value="members" className="mt-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className="text-center text-muted-foreground mb-8 text-sm">
                IID Omo Orimolusi in Diaspora — General Members
              </p>
              {generalMembers.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-12">Members coming soon.</p>
              ) : (
                <MemberGrid members={generalMembers} />
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
