import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, ChevronDown } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type Member = { name: string; role: string; photo?: string | null };

/* ── Data ─────────────────────────────────────────────────────── */

const patronMatron: Member[] = [
  { name: "Chief Emmanuel Folorunso Ogunnaike, JP, MFR", role: "Patron", photo: "/team/chief-emmanuel-ogunnaike.jpeg" },
  { name: "Chief Mrs Ibilola Solaja", role: "Matron", photo: "/team/chief-mrs-ibilola-solaja.png" },
];

const advisers: Member[] = [
  { name: "Mrs Silifat Haruna Ishola Bello", role: "Special Adviser", photo: "/team/mrs-silifat-haruna-ishola-bello.jpeg" },
  { name: "Architect Pa Sunday Kukoyi", role: "Special Adviser", photo: "/team/architect-pa-sunday-kukoyi.jpeg" },
];

const pastPresidents: Member[] = [
  { name: "Pa (Barr.) Popoola Sojirin", role: "Emeritus President", photo: "/team/barr-popoola-sojirin.jpeg" },
  { name: "Otunba Ola Busari", role: "Past President (2017–2019)", photo: null },
];

const currentExecutives: Member[] = [
  { name: "Chief Toyin Odueyungbo", role: "President", photo: "/team/chief-toyin-odueyungbo.jpeg" },
  { name: "Revd Franklin Babaranti Okunowo", role: "Vice President (2022 – Present)", photo: "/team/evd-franklin-okunowo.jpeg" },
  { name: "Ms. Adetutu Ogunsanwo", role: "General Secretary (2021 – Present)", photo: "/team/ms-adetutu-ogunsanwo.jpeg" },
  { name: "Pa (Barr.) Popoola Sojirin", role: "Legal Adviser 2 | Member, Council of Elders", photo: "/team/barr-popoola-sojirin.jpeg" },
  { name: "Alh Sadekunle Hamzat-Maja", role: "Auditor", photo: "/team/alh-sadekunle-hamzat-maja.jpeg" },
  { name: "Otunba Ola Busari", role: "PRO", photo: null },
];

const pastExecutiveTeam: Member[] = [
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
  { name: "Dr. Dayo Amudipe", role: "Former Vice President" },
  { name: "Alhaja Ikeoluwa Oguntayo", role: "Vice President" },
  { name: "Chief Toyin Odueyungbo", role: "Past Secretary" },
  { name: "Dapo Nadi", role: "Past Executive" },
  { name: "Abi Okuyemi", role: "Past Executive" },
  { name: "Kaz Haruna Ishola", role: "Past Executive" },
];

const generalMembers: Member[] = [];

/* ── Lightbox ─────────────────────────────────────────────────── */
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
          <img src={member.photo!} alt={member.name} className="w-full object-cover max-h-[70vh]" />
          <div className="p-4">
            <h4 className="font-display font-bold text-foreground text-base">{member.name}</h4>
            <p className="text-accent font-semibold text-sm mt-1">{member.role}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Member card ──────────────────────────────────────────────── */
function MemberCard({ member, index, onPhotoClick }: { member: Member; index: number; onPhotoClick?: (m: Member) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
    >
      <div
        className={`relative w-full aspect-[3/4] bg-primary/10 flex items-center justify-center overflow-hidden ${member.photo ? "cursor-pointer" : ""}`}
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
      <div className="p-4">
        <h4 className="font-display font-bold text-foreground text-sm sm:text-base leading-tight">{member.name}</h4>
        <p className="text-accent font-semibold text-xs sm:text-sm mt-1">{member.role}</p>
      </div>
    </motion.div>
  );
}

/* ── Member grid ─────────────────────────────────────────────── */
function MemberGrid({ members }: { members: Member[] }) {
  const [lightbox, setLightbox] = useState<Member | null>(null);
  return (
    <>
      {/* Mobile: horizontal swipe */}
      <div className="md:hidden -mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
          {members.map((m, i) => (
            <div key={m.name + i} className="flex-shrink-0 w-[220px] snap-center">
              <MemberCard member={m} index={i} onPhotoClick={setLightbox} />
            </div>
          ))}
        </div>
      </div>
      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {members.map((m, i) => (
          <MemberCard key={m.name + i} member={m} index={i} onPhotoClick={setLightbox} />
        ))}
      </div>
      {lightbox && <PhotoLightbox member={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}

/* ── Collapsible level ───────────────────────────────────────── */
function Level({
  label, sublabel, index, defaultOpen = true, children,
}: {
  label: string; sublabel?: string; index: number; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 * index, ease }}
    >
      {/* Header — click to toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-primary rounded-2xl px-6 py-4 flex items-center gap-4 shadow-md mb-0 hover:brightness-110 transition-all duration-200 touch-manipulation text-left"
      >
        <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
          <span className="font-display font-black text-accent text-sm">{index}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-black text-accent text-lg sm:text-xl leading-tight">{label}</h3>
          {sublabel && <p className="text-white/60 text-xs mt-0.5">{sublabel}</p>}
        </div>
        <ChevronDown
          size={20}
          className={`text-accent/70 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Connector arrow ─────────────────────────────────────────── */
function Arrow() {
  return (
    <div className="flex flex-col items-center my-4">
      <div className="w-0.5 h-8 bg-accent/30" />
      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-accent/40" />
    </div>
  );
}

/* ── Collapsible past team ───────────────────────────────────── */
function CollapsibleSection({ members }: { members: Member[] }) {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<Member | null>(null);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 bg-muted/50 border border-border rounded-xl hover:bg-muted transition-colors mb-4"
      >
        <span className="text-sm font-semibold text-foreground">
          Past Executive Team ({members.length} members)
        </span>
        <ChevronDown
          size={18}
          className={`text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Mobile */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
                {members.map((m, i) => (
                  <div key={m.name + i} className="flex-shrink-0 w-[220px] snap-center">
                    <MemberCard member={m} index={i} onPhotoClick={setLightbox} />
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {members.map((m, i) => (
                <MemberCard key={m.name + i} member={m} index={i} onPhotoClick={setLightbox} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {lightbox && <PhotoLightbox member={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────── */
export default function Team() {
  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-main">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="label-accent">Leadership</h2>
          <h3 className="heading-section">Our People</h3>
          <p className="text-body mt-2 sm:mt-3">
            Dedicated individuals driving the mission of unity, development, and cultural pride
            for Ijebu Igbo descendants worldwide.
          </p>
        </motion.div>

        {/* ── Level 1: Patron & Matron ── */}
        <Level label="Patron & Matron" sublabel="Honorary Leadership" index={1}>
          <MemberGrid members={patronMatron} />
        </Level>

        <Arrow />

        {/* ── Level 2: Advisers ── */}
        <Level label="Advisers" sublabel="Strategic Guidance" index={2}>
          <MemberGrid members={advisers} />
        </Level>

        <Arrow />

        {/* ── Level 3: Current Executive ── */}
        <Level label="Current Executive" sublabel="Active Leadership" index={3}>
          <MemberGrid members={currentExecutives} />
        </Level>

        <Arrow />

        {/* ── Level 4: Past & Emeritus Presidents ── */}
        <Level label="Past & Emeritus Presidents" sublabel="Former Presidency" index={4}>
          <MemberGrid members={pastPresidents} />
          <div className="mt-6">
            <CollapsibleSection members={pastExecutiveTeam} />
          </div>
        </Level>

        <Arrow />

        {/* ── Level 5: Members ── */}
        <Level label="Members" sublabel="IID Omo Orimolusi in Diaspora" index={5}>
          {generalMembers.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-12 border border-dashed border-border rounded-2xl">
              Members coming soon.
            </p>
          ) : (
            <MemberGrid members={generalMembers} />
          )}
        </Level>

      </div>
    </section>
  );
}
