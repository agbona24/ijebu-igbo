import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, ChevronDown, MapPin, User, Briefcase, Phone } from "lucide-react";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

interface ChiefRecord {
  name: string;
  title: string;
  occupation: string;
  phone?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

const gradeTwo = [
  {
    title: "Sopenlukale",
    area: "Oke-Sopen",
    name: "His Royal Highness, Alayeluwa Oba Mufutau Adesesan Yusuf",
    photo: "/images/oba-sopenlukale-mufutau-adesesan-yusuf.webp",
    color: "from-amber-700 to-amber-500",
    accent: "border-amber-500/40 bg-amber-50",
    badge: "bg-amber-100 text-amber-800",
    bales: [
      "Tirojaiye","Atake","Papanla","Oshunbudepo","Togunberu","Gbokutaru",
      "Lakadi","Aiyetoro","Tolorunmodi","Aiyesan","Ajebandele Nugba",
      "Araromi Adekanbi","Sanni Jiren","Dandola","Tolobaloke","Togedengbe",
      "Arowasi","Aba Titun","Balogun Mini","Alabameta","Aba Tonger",
      "Aba Ogundele","Aba Fowosire","Aba Kehinde","Akinlade/Obisesan",
      "Umaren","Sunbare","Oyekunle","Erigboro","Temidire","Aba Arije",
    ],
  },
  {
    title: "Bejeroku",
    area: "Okeagbo",
    name: "His Royal Highness Oba Stephen Adekoya, The Bejeroku of Oke-Agbo",
    photo: "/images/oba-bejeroku-stephen-adekoya.webp",
    color: "from-emerald-700 to-emerald-500",
    accent: "border-emerald-500/40 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-800",
    bales: [
      "Imoogbo","Torimoguje","Etemi","Oshoko","Etemi Jarad","Dandola",
      "Fowoseje","Iyaniwura","Talaga Akinbambo","Erilope","Idagolu",
      "Tiyanbaki","Talakila","Titilodo","Telubomi","Bolorunduro","Owolubo",
      "Liwo","Abude","Tiluba","Umupegba Tijeje","Eganmoro","Erikekere",
      "Tisaba","Basorun","Oke-Owa Talaga","Temidire","Obalufon","Ogunsegun",
      "Lewuodo","Imepe","Adekanbi Adeku","Tabaoku","Ajebo","Talokolatan",
      "Ayegbami","Korede Eseke","Tamitami","Temidire Adeku","Odo Oshun",
      "Apata","Tilemomu","Etikeji Daso","Akitiji Tatewo","Olorunsogo","Tilapeni",
    ],
  },
  {
    title: "Olokine",
    area: "Ojowo",
    color: "from-blue-700 to-blue-500",
    accent: "border-blue-500/40 bg-blue-50",
    badge: "bg-blue-100 text-blue-800",
    name: "His Royal Highness Oba Abdulrasheed Abayomi Banjo, PhD — Akereburu, Orilonise I",
    photo: "/images/oba-olokine-abdulrasheed-banjo.webp",
    queenName: "Her Royal Highness Olori Oluyinka Banjo, FISLT — The Olori Olokine of Ojowo",
    queenPhoto: "/images/olori-olokine-ojowo.webp",
    administrationImage: "/images/ojowo-administration.webp",
    administration: [
      { name: "Chief Bisiriyu Ajobiewe",       title: "Pampa Molusewu",                occupation: "Native Doctor" },
      { name: "Chief (Dr.) Gbolade Kazeem",    title: "Olootu Pampa",                  occupation: "Native Doctor" },
      { name: "Chief Mufutau Isamo",           title: "Oloritun Agba",                 occupation: "Welder" },
      { name: "Chief Abiodun Ogundero",        title: "Ojowo Babaloja",                occupation: "Estate Agent",        phone: "08076416098" },
      { name: "Chief Akeem Saibu",             title: "Baale Olowa",                   occupation: "Farmer" },
      { name: "Chief Pst. Adebisi Ogundero",   title: "Majebolije of Ojowo / Chief of Staff", occupation: "School Proprietor", phone: "08050662897" },
      { name: "Chief Alaba Isamo",             title: "Olori Odo",                     occupation: "Estate Management",   phone: "08140387798" },
    ] as ChiefRecord[],
    bales: [
      "Ita-Egba","Timode","Alege","Sonokiki","Oligbo","Sojinrin","Kujore",
      "Orita Agbede","Owonowen","Digbolu","Oluwa","Ajegunle","Lumogede",
      "Tidepolu","Ogunmade","Oligbo","Agbo","Olugbabogin","Erape","Eri Lidan",
      "Olokuta","Aba Titun","Aba Makoli","Aba Olojowo","Eri Korodo",
      "Eridu Sobanjo","Aiyesan Gboro","Aba Lawal Ajibola","Aba Olopa","Aiyesan Bale",
    ],
  },
  {
    title: "Keegbo",
    area: "Atikori",
    name: "His Royal Highness, Alayeluwa Kabiyesi Oba Ibitoye Solaja, JP — The Keegbo of Atikori",
    photo: "/images/oba-keegbo-ibitoye-solaja.webp",
    queenName: "Her Royal Highness Olori Yemisi Solaja — The Olori Keegbo of Atikori",
    queenPhoto: "/images/olori-yemisi-solaja.webp",
    color: "from-purple-700 to-purple-500",
    accent: "border-purple-500/40 bg-purple-50",
    badge: "bg-purple-100 text-purple-800",
    bales: [
      "Ogbirigbiri","Omitu","Legbata","Ilero","Lokuta","Lagada","Lajao",
      "Amula","Tolore","Papa Ologboni","Ipakodo","Oduja","Dagbolu",
      "Ajebandele","Aiyesan","Jegede","Mosinmi","Pensen","Tomolorun",
      "Lapini","Ajede-Soosi","Moloju","Tilina",
    ],
  },
  {
    title: "Abijaparako",
    area: "Japara",
    name: "His Royal Highness, Alayeluwa Oba Aderemi Adewale Ogunye (JP), Ilufemiloye — The Abijaparako of Japara (Kotolori-Ojuule I)",
    photo: "/images/oba-abijaparako-aderemi-adewale-ogunye.webp",
    color: "from-rose-700 to-rose-500",
    accent: "border-rose-500/40 bg-rose-50",
    badge: "bg-rose-100 text-rose-800",
    bales: [
      "Loni","Okoliwo","Okoneki","Agbalashan","Araromi Badewa","Idagolu",
      "Okoliyan","Aba Meshu","Aba Lago","Idiegun","Abarika Agbena",
      "Abarika Omoba","Idi-Orogbo","Idi-Oparun","Isheru","Ganringan",
      "Poroporo","Aba Olugun","Aba Logun","Awo Yaya","Ajebandele Ogunye",
      "Opo Ogun","Ori-Apata","Aye-Nerin","Ogidi-Olu","Araromi Kukoyi",
      "Aba Koko","Aba Agbede","Eru-Obodo","Aba Ajomale","Aba-Mati","Ajebo Obepi",
    ],
  },
];

const satelliteTowns = ["Agunboye","Odo-Alamo","Asigidi","Aparaki","Imope"];

const summary = [
  { title: "Grade One Oba", count: 1 },
  { title: "Grade Two Obas", count: 5 },
  { title: "Bales under Sopenlukale", count: 31 },
  { title: "Bales under Bejeroku", count: 46 },
  { title: "Bales under Olokine", count: 30 },
  { title: "Bales under Keegbo", count: 23 },
  { title: "Bales under Abijaparako", count: 32 },
  { title: "Satellite Towns (Olorilus)", count: 5 },
];

function ObaCard({ oba, index }: { oba: typeof gradeTwo[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className={`rounded-2xl border-2 ${oba.accent} overflow-hidden`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left"
      >
        <div className={`bg-gradient-to-r ${oba.color} px-5 py-4 flex items-center justify-between gap-4`}>
          <div className="flex items-center gap-4 min-w-0">
            {/* Oba photo (+ Olori if present) */}
            <div className="flex items-center shrink-0">
              <ImageWithSkeleton
                src={"photo" in oba ? (oba.photo as string | null) : null}
                alt={"name" in oba ? String(oba.name) : oba.title}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 shadow-md"
                imgClassName="object-cover rounded-full"
                fallback={<User className="w-6 h-6 text-white/50" />}
              />
              {"queenPhoto" in oba && oba.queenPhoto && (
                <ImageWithSkeleton
                  src={oba.queenPhoto as string}
                  alt={"queenName" in oba ? String(oba.queenName) : "Olori"}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 shadow-md -ml-4"
                  imgClassName="object-cover rounded-full"
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-0.5">Grade Two Oba</p>
              <h3 className="text-white font-display font-black text-lg sm:text-xl leading-tight">
                {oba.title} of {oba.area}
              </h3>
              {"name" in oba && oba.name && (
                <p className="text-white/80 text-xs sm:text-sm mt-1 leading-snug">{String(oba.name)}</p>
              )}
              {"queenName" in oba && oba.queenName && (
                <p className="text-white/60 text-xs mt-0.5 leading-snug">{String(oba.queenName)}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${oba.badge} hidden sm:inline-flex`}>
              {oba.bales.length} Bales
            </span>
            <ChevronDown
              size={20}
              className={`text-white transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </button>

      {/* Bales list */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 space-y-6">

              {/* Administration section (only for entries that have it) */}
              {"administration" in oba && Array.isArray(oba.administration) && (
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                    Head of Departments
                  </p>

                  {/* Royal couple portraits */}
                  {"photo" in oba && (oba.photo || ("queenPhoto" in oba && oba.queenPhoto)) && (
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      {"photo" in oba && oba.photo && (
                        <div className="text-center">
                          <ImageWithSkeleton
                            src={oba.photo as string}
                            alt={"name" in oba ? String(oba.name) : oba.title}
                            className="w-full max-w-[200px] mx-auto rounded-2xl shadow-md border border-border aspect-[3/4]"
                            imgClassName="object-cover rounded-2xl"
                          />
                          <p className="text-xs font-semibold text-foreground mt-2 leading-snug">
                            {"name" in oba ? String(oba.name) : `${oba.title} of ${oba.area}`}
                          </p>
                        </div>
                      )}
                      {"queenPhoto" in oba && oba.queenPhoto && (
                        <div className="text-center">
                          <ImageWithSkeleton
                            src={oba.queenPhoto as string}
                            alt={"queenName" in oba ? String(oba.queenName) : "Olori"}
                            className="w-full max-w-[200px] mx-auto rounded-2xl shadow-md border border-border aspect-[3/4]"
                            imgClassName="object-cover rounded-2xl"
                          />
                          <p className="text-xs font-semibold text-foreground mt-2 leading-snug">
                            {"queenName" in oba ? String(oba.queenName) : "Olori"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {"administrationImage" in oba && oba.administrationImage && (
                    <div className="rounded-xl overflow-hidden border border-border mb-4 shadow-sm">
                      <ImageWithSkeleton
                        src={oba.administrationImage as string}
                        alt={`${oba.title} Administration`}
                        className="w-full"
                        imgClassName="h-auto"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(oba.administration as ChiefRecord[]).map((chief, i) => (
                      <div
                        key={i}
                        className="bg-background rounded-xl border border-border p-3.5 space-y-1"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            <User size={14} className="text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-bold text-foreground text-sm leading-tight">{chief.name}</h5>
                            <p className="text-accent text-xs font-semibold mt-0.5">{chief.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs pl-10">
                          <Briefcase size={11} className="shrink-0" />
                          {chief.occupation}
                        </div>
                        {chief.phone && (
                          <div className="flex items-center gap-1.5 text-muted-foreground text-xs pl-10">
                            <Phone size={11} className="shrink-0" />
                            {chief.phone}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Royal couple portraits — for entries with photos but no administration block */}
              {!("administration" in oba && Array.isArray(oba.administration)) &&
                "photo" in oba && (oba.photo || ("queenPhoto" in oba && oba.queenPhoto)) && (
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {"photo" in oba && oba.photo && (
                    <div className="text-center">
                      <ImageWithSkeleton
                        src={oba.photo as string}
                        alt={"name" in oba ? String(oba.name) : oba.title}
                        className="w-full max-w-[200px] mx-auto rounded-2xl shadow-md border border-border aspect-[3/4]"
                        imgClassName="object-cover rounded-2xl"
                      />
                      <p className="text-xs font-semibold text-foreground mt-2 leading-snug">
                        {"name" in oba ? String(oba.name) : `${oba.title} of ${oba.area}`}
                      </p>
                    </div>
                  )}
                  {"queenPhoto" in oba && oba.queenPhoto && (
                    <div className="text-center">
                      <ImageWithSkeleton
                        src={oba.queenPhoto as string}
                        alt={"queenName" in oba ? String(oba.queenName) : "Olori"}
                        className="w-full max-w-[200px] mx-auto rounded-2xl shadow-md border border-border aspect-[3/4]"
                        imgClassName="object-cover rounded-2xl"
                      />
                      <p className="text-xs font-semibold text-foreground mt-2 leading-snug">
                        {"queenName" in oba ? String(oba.queenName) : "Olori"}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Bales list */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                  Bales under {oba.title}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {oba.bales.map((bale, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-xs text-foreground/80 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0" />
                      {bale}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RulingHierarchy() {
  return (
    <section className="section-padding bg-[#f8f6f1]">
      <div className="container-main">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="label-accent">Royal Structure</h2>
          <h3 className="heading-section">The Ijebu-Igbo Ruling Hierarchy</h3>
          <p className="text-body mt-3">
            The traditional governance of Ijebu-Igbo is structured under one paramount Oba,
            five Grade Two Obas each presiding over their quarter, and 162 Bales across all communities.
          </p>
        </motion.div>

        {/* Org Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-12"
        >
          <h3 className="font-display font-bold text-foreground text-xl sm:text-2xl mb-4 text-center">
            Ijebu-Igbo Traditional Council — Organisational Chart
          </h3>
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
            <ImageWithSkeleton
              src="/images/ijebu-traditional-council-chart.webp"
              alt="Ijebu-Igbo Traditional Council Organisational Chart"
              className="w-full"
              imgClassName="h-auto"
            />
          </div>
        </motion.div>

        {/* Royal Portraits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
        >
          {[
            { label: "Previous Orimolusi", src: "/images/oba-adeboye.webp", name: "Late Oba Joel Adeboye", slug: "adeboye" },
            { label: "Present Orimolusi", src: "/images/oba-jaiyeoba.webp", name: "Oba Lawrence Jaiyeoba Adebajo", slug: "jaiyeoba-adebajo" },
          ].map((king, i) => (
            <Link
              key={i}
              to={`/heritage/orimolusi/${king.slug}`}
              className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <ImageWithSkeleton
                  src={king.src}
                  alt={king.label}
                  className="w-full h-full"
                  imgClassName="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center pointer-events-none">
                  <span className="text-xs font-bold bg-accent text-charcoal px-3 py-1.5 rounded-full">
                    View Profile →
                  </span>
                </div>
              </div>
              <div className="p-4 text-center border-t border-border">
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{king.label}</p>
                <h4 className="font-display font-bold text-foreground text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">
                  {king.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">The Orimolusi of Ijebu-Igbo</p>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Grade One Oba */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="relative mb-10"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 sm:p-10 text-center shadow-elevated relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
            />
            <div className="relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center mx-auto mb-4">
                <Crown className="text-accent w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <p className="text-accent font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">Grade One Oba — Paramount Ruler</p>
              <h3 className="font-display font-black text-white text-2xl sm:text-4xl md:text-5xl leading-tight">
                The Orimolusi of Ijebu-Igbo
              </h3>
              <p className="text-white/60 text-sm mt-3 max-w-md mx-auto">
                The supreme traditional ruler of Ijebu-Igbo, presiding over all five quarters and their communities.
              </p>
            </div>
          </div>

          {/* Council of Obas */}
          <div className="mt-6 max-w-md mx-auto rounded-2xl overflow-hidden border border-border shadow-sm bg-white">
            <ImageWithSkeleton
              src="/images/ijebu-igbo-council-of-obas.webp"
              alt="Ijebu-Igbo Council of Obas, chaired by the Orimolusi"
              className="w-full"
              imgClassName="h-auto"
            />
            <p className="text-xs text-muted-foreground text-center p-3">Ijebu-Igbo Council of Obas, chaired by the Orimolusi</p>
          </div>

          {/* Connector line */}
          <div className="flex justify-center mt-0">
            <div className="w-0.5 h-8 bg-primary/30" />
          </div>
        </motion.div>

        {/* Grade Two Obas label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
            Grade Two Obas — Click to expand bales
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Grade Two Oba cards */}
        <div className="grid grid-cols-1 gap-4 mb-14">
          {gradeTwo.map((oba, i) => (
            <ObaCard key={oba.title} oba={oba} index={i} />
          ))}
        </div>

        {/* Satellite Towns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <h4 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-accent" />
            Olorilus / Satellite Towns
          </h4>
          <div className="flex flex-wrap gap-3">
            {satelliteTowns.map((town) => (
              <span
                key={town}
                className="bg-white border border-border rounded-full px-4 py-2 text-sm font-semibold text-foreground shadow-sm"
              >
                {town}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Summary table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
        >
          <div className="bg-primary px-6 py-4">
            <h4 className="font-display font-bold text-white text-lg">Summary</h4>
          </div>
          <div className="divide-y divide-border">
            {summary.map(({ title, count }, i) => (
              <div key={i} className={`flex items-center justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-muted/30"}`}>
                <span className="text-sm font-medium text-foreground">{title}</span>
                <span className="text-sm font-bold text-accent">{count}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-6 py-4 bg-primary/5 border-t-2 border-primary/20">
              <span className="font-display font-bold text-foreground">Total Bales Listed</span>
              <span className="font-display font-black text-primary text-xl">162</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
