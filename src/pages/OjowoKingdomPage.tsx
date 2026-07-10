import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Crown, Calendar, MapPin, Target, Eye, Music } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import Lightbox, { useLightbox, ZoomableImage } from "@/components/Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

const galleryImages = [
  { src: "/images/ojowo/oba-olokine-abdulrasheed-banjo.webp", alt: "His Royal Highness Oba Abdulrasheed Abayomi Banjo, PhD — The Olokine of Ojowo" },
  { src: "/images/ojowo/olori-olokine-ojowo.webp", alt: "Olori Oluyinka Banjo, FISLT — The Olori Olokine of Ojowo" },
];

// ── Data ──────────────────────────────────────────────────────────────────

const rulers = [
  { no: 1,  title: "Baale",   name: "Mootubo Lofi",                     years: "1896 – 1924" },
  { no: 2,  title: "Baale",   name: "Oyebola Otegbade (Alajiga)",        years: "1924 – 1935" },
  { no: 3,  title: "Baale",   name: "Daniel Osigbesan",                  years: "1935 – 1937" },
  { no: 4,  title: "Baale",   name: "Abraham Okubanjo",                  years: "1935 – 1950" },
  { no: 5,  title: "Olorilu", name: "Samuel Odukomaiya",                 years: "1951 – 1967" },
  { no: 6,  title: "Olorilu", name: "Samuel Oguntayo",                   years: "1967 – 1970" },
  { no: 7,  title: "Olorilu", name: "S.S Banjo",                         years: "1970 – 1987" },
  { no: 8,  title: "Oba",     name: "Adebayo Kuyeba",                    years: "1987 – 2002", note: "Appointment nullified by appeal court judgement" },
  { no: 9,  title: "Oba",     name: "David Adetola Odusole",             years: "2002 – 2017" },
  { no: 10, title: "Oba",     name: "Abdulrasheed Abayomi Banjo, Ph.D",  years: "May 24, 2019 – present", current: true },
];

const palaceChiefs = [
  { name: "Otunba Laide Fowosire",            title: "Asiwaju" },
  { name: "Asiwaju Alex Onabanjo",            title: "Odole" },
  { name: "Late Chief Leke Ogunwa",           title: "Otun Baba Oba" },
  { name: "Chief Mrs. Ibilola Solaja",        title: "Yeye Oba" },
  { name: "Otunba Mojibade Yisa Odulaja",     title: "Otun Yeye Oba" },
  { name: "Chief Mrs Chinenye Odonowo",       title: "Yeye Oyinloye" },
  { name: "High Chief Adebisi Ogundero",      title: "Majeobaje" },
  { name: "High Chief Emmanuel O. Odueyungbo", title: "Bobagbimo" },
  { name: "Chief Ademuyiwa Onabanjo",         title: "Otunba Olutoyes (Elect)" },
  { name: "High Chief Ogunlari Olufemi",      title: "Baameto" },
  { name: "High Chief Jeriyi Osinowo",        title: "Bobajiroro (Elect)" },
  { name: "Chief Obey Akinjala",              title: "Ore Oba of Ojowo" },
  { name: "Chief Mrs. Adebukonla Adesanya",   title: "Yeyemeso" },
  { name: "Chief Miss Alice Opeoluwa Adebisi", title: "Yeye Majeobaje" },
  { name: "Chief Barr. Lawal O. Uthman",      title: "Baamofin" },
  { name: "Chief (Dr.) Gbolade Kazeem",       title: "Kakanfo" },
  { name: "Chief Tolu Ogunyemi",              title: "Akogun" },
  { name: "Chief Babatunde Odutayo",          title: "Otun Akogun (Elect)" },
  { name: "Chief Segun Oketola",              title: "Otun Bobagbimo" },
  { name: "Chief Abiodun Ogundero",           title: "Baba Oloja" },
  { name: "Chief Odukunle Babajide Kuti",     title: "Oluomo of Ojowo" },
  { name: "Chief Princess Abosede Omolara Kuti", title: "Yeye Oluomo of Ojowo" },
  { name: "Chief Abeje Gbebolaja",            title: "Otun Iyalode" },
  { name: "Chief Olaniyi Adegbesan",          title: "Fiwajoye" },
  { name: "Chief Adesina Samuel",             title: "Otun Mayegun" },
  { name: "Chief Alaba Isamo",                title: "Olori Odo" },
  { name: "Chief Mufutau Adetola",            title: "Otun Fesojoye" },
  { name: "Chief Adekunle Adenuga",           title: "Osi Fesojoye" },
  { name: "Chief Abike Agunloye",             title: "Otun Iya Ioja Sarepowo" },
  { name: "Chief Abiodun Mohammed",           title: "Special Adviser / Sobaloju Ojowo" },
  { name: "Prince Wale Banjo",                title: "Special Adviser" },
  { name: "Chief Idowu Salisu",               title: "Otun Apesin" },
  { name: "Chief Mrs. Bernice Adeleye",       title: "Iya Oloja" },
  { name: "Chief Somorin Olusola",            title: "Otun Bobajiro" },
  { name: "Chief Ibrahim Kehinde",            title: "Otun Baba Oloja" },
  { name: "Chief Ademola Okubanjo",           title: "Otun Apase" },
  { name: "Chief Clement Ebeze",              title: "Asiwaju Ogoja Ojowo" },
  { name: "Chief Bisiriyu Ajobiewe",          title: "Abore of Ojowo & Akanoro of Iledi Ojowo" },
  { name: "Chief Sunday Okunfuwa",            title: "Apema Ojowo" },
  { name: "Chief Owoduni Sabitu",             title: "Liwo Ojowo" },
  { name: "Chief Samuel Alli",                title: "Olurin Iledi Ojowo" },
  { name: "Chief Odunayo Olabode Sulaimon",   title: "Folajoye" },
  { name: "Chief Ajisafe Rafiu",              title: "Oluode" },
  { name: "Chief Mrs Iyabosola Adebajo",      title: "Yeyemeto" },
];

const pampas = [
  { name: "Chief (Dr.) Gbolade Kazeem",  title: "Olootu Pampa" },
  { name: "Chief Bisiriyu Ajobiewe",     title: "Molusewu" },
  { name: "Chief Ganiu Okeowo",          title: "Ituneyinle" },
  { name: "Chief Rasheed Lawal",         title: "Etitale Epewu" },
  { name: "Chief Oladimeji Sokoya",      title: "Asiwaju Pampa Amutebu" },
  { name: "Chief Soga Taiwo",            title: "Aledo" },
  { name: "Chief Segun Oketola",         title: "Odosenbadejo" },
  { name: "Chief Banjo Olayinka",        title: "Pampa Idokan Ojowo" },
];

const olorituns = [
  { name: "Late Chief Tolu Ogunyemi",    title: "Oloritun Agba Etitale (Chairman)" },
  { name: "Chief Tayo Oshikoya",         title: "Oloritun Agba Aledo" },
  { name: "Chief Lasisi Odugbesan",      title: "Oloritun Agba Amutebu" },
  { name: "Chief Oladipupo Sefiu",       title: "Oke-Ola / Oloritun Agba Odosenbadejo" },
  { name: "Chief Akinyele S. T.",        title: "Surulere" },
  { name: "Chief Kuti Oduneye",          title: "Sisu Lane" },
  { name: "Chief Okoso Wasiu Ramoni",    title: "Odomolusewu" },
  { name: "Chief Okufuwa Sunday",        title: "Alayo" },
  { name: "Chief Bakare Nureni",         title: "Olorunsogo Oduneye" },
  { name: "Chief Gboteso Oluwatoyim",    title: "Epewu" },
  { name: "Chief Odumosu Michael",       title: "Ore-Ofe" },
  { name: "Chief Awogi Oladayo",         title: "Adewonuayan" },
  { name: "Chief Temitayo Quadri",       title: "Depolu-Lepete" },
  { name: "Chief Isamo Mufutau",         title: "Kubayan" },
  { name: "Chief Ogunyemi Kayode",       title: "Amutebu 3" },
  { name: "Chief Adesanya Adebayo",      title: "Ajebo-Irewolede" },
  { name: "Chief Satide Ilori",          title: "Odoraboyejo" },
  { name: "Chief Asiwaju Salam",         title: "Moro Aledo" },
  { name: "Chief Adewale Aderomu",       title: "Oke Ayo" },
];

const otunbas = [
  { name: "Otunba Johnson Oniowo",             title: "Otunba Tobalase" },
  { name: "Otunba Joseph Ogunsawo",            title: "Otunba Laso" },
  { name: "Otunba Olalekan Akinyemi",          title: "Otunba Senbadejo" },
  { name: "Otunba Bayo Odunowo",               title: "Otunba Oyinloye" },
  { name: "Otunba (Barr.) Bola Kalejaiye",     title: "Otunba Tayese" },
  { name: "Otunba (Dr.) Olugbenga Okusamya",   title: "Otunba Odoraboyejo" },
  { name: "Otunba Louis Ibe",                  title: "Gbadero" },
  { name: "Otunba Sunday Ogunfowoke",          title: "Bobadega" },
  { name: "Otunba Prof. A. Odukoya",           title: "Fimogboye" },
  { name: "Otunba Dr. Ofan Abayomi",           title: "Bobaseke Ojowo" },
  { name: "Otunba Barr. Oluwaseun Oke-Lawal",  title: "Bobaseto Ojowo" },
  { name: "Otunba Dr. Bolaji Gbadamosi",       title: "Fesogboye Ojowo" },
  { name: "Otunba Comrade Fesojaiye",          title: "Oredebi Ojowo" },
];

const baales = [
  { name: "Chief Awogi Oladayo Eridu",      title: "Chairman" },
  { name: "Chief Saibu Akeem Olowa-Oke",   title: "Vice Chairman" },
  { name: "Chief Okunubi Titus Erape-Asekun 1", title: "Secretary / Erape 1" },
  { name: "Chief Sanni Abdulfatai",         title: "Olugbaigbin 1" },
  { name: "Chief Ogundero Olasunkanmi",     title: "Olowa-Oke" },
  { name: "Chief Ajayi Asimiyu Aseto",      title: "Moroun-Ajayi" },
  { name: "Chief Aromolate Afolabi",        title: "Olopa" },
  { name: "Chief Lasis Odugbesan",          title: "Baale Lumuogede" },
  { name: "Chief Adiamoh Yusufu",           title: "Erikorodo" },
  { name: "Chief Yekinni Owonla",           title: "Eseke" },
  { name: "Chief Odesanya Mufutau",         title: "Eri ape Asekun 2" },
  { name: "Chief Safiyu Bolode Oku",        title: "Olanle" },
  { name: "Chief Koledefe Kasali",          title: "Arowoiken" },
  { name: "Chief Jelili Lawal",             title: "Mosafejo / Akeran" },
  { name: "Chief Shittu Jimoh",             title: "Baale Amula" },
  { name: "Chief Agbona Oriyomi",           title: "Baale Erifu" },
  { name: "Chief Fatai Mustapha",           title: "Baale Lokuta Fodamo" },
];

const annualActivities = [
  { period: "Second Saturday in January",  activity: "Olokine Interreligious / Interdenomination Annual Prayers" },
  { period: "First week in February",      activity: "Olokine Scholarship Awards" },
  { period: "Last week in May",            activity: "Olokine Coronation Anniversary" },
  { period: "Last week in May",            activity: "Olokine Quiz Competition for all Secondary School Students" },
  { period: "December 27th",              activity: "Olokine Day" },
  { period: "2nd week in December",        activity: "Olokine Annual Interdenomination Christmas Carol" },
];

const anthem = [
  "Ojowo ilu tabi wa",
  "Ilu baba wa Olokine",
  "Itun Merin, Lojowooo wa",
  "Etitale, Aledooo, Amutebu ati",
  "Odorasenbadejo eyokan ni gbogbo wa.",
  "",
  "Ni gbogbo Ijebu Igbo",
  "Ipo Keji lojowo wa",
  "Je kaa mura, gbe'lu wa ga",
  "Ojowo kansoso tani",
  "Nii gbeyin kalelayo",
  "Gbe oruko Ojowo ga.",
];

// ── Sub-components ─────────────────────────────────────────────────────────

function ChiefTable({ members }: { members: { name: string; title: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {members.map((m, i) => (
        <div key={i} className="flex items-start gap-3 p-3 bg-background rounded-xl border border-border">
          <span className="text-xs font-black text-accent/60 w-5 shrink-0 mt-0.5">{i + 1}.</span>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">{m.name}</p>
            <p className="text-xs text-accent font-medium mt-0.5">{m.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Council({ title, count, members, defaultOpen = false }: {
  title: string; count: number; members: { name: string; title: string }[]; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-primary hover:brightness-110 transition-all text-left"
      >
        <div>
          <h4 className="font-display font-black text-accent text-base sm:text-lg">{title}</h4>
          <p className="text-white/60 text-xs mt-0.5">{count} member{count !== 1 ? "s" : ""}</p>
        </div>
        <ChevronDown size={20} className={`text-accent shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-muted/30">
              <ChiefTable members={members} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function OjowoKingdomPage() {
  const { index, direction, open, close, prev, next } = useLightbox(galleryImages);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/ojowo" />

      {/* Hero */}
      <section className="relative min-h-[48vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label-accent mb-2">
            Ijebu-Igbo · Ojowo Quarter
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight">
            Ojowo
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed">
            The most westerly of Ijebu-Igbo's five urban settlements — the place where the sun sets.
          </motion.p>
        </div>
      </section>

      {/* Royal Couple */}
      <section className="bg-[#f0f4ff] py-10 sm:py-14">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center items-center">
            {[
              { photo: "/images/ojowo/oba-olokine-abdulrasheed-banjo.webp", name: "His Royal Highness Oba Abdulrasheed Abayomi Banjo, PhD", title: "Akereburu, Orilonise I — The Olokine of Ojowo, Ijebu Igbo" },
              { photo: "/images/ojowo/olori-olokine-ojowo.webp", name: "Olori Oluyinka Banjo, FISLT", title: "The Olori Olokine of Ojowo" },
            ].map((person, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }} className="text-center max-w-[260px]">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] mb-4">
                  <ZoomableImage src={person.photo} alt={person.name} onClick={() => open(i)} />
                </div>
                <h3 className="font-display font-black text-foreground text-base leading-tight">{person.name}</h3>
                <p className="text-accent font-semibold text-sm mt-1">{person.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <h2 className="label-accent mb-2">About</h2>
            <h3 className="heading-section mb-6">About Ojowo</h3>
          </motion.div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: MapPin,    label: "Location",    value: "North-West Ogun State" },
              { icon: Crown,     label: "Ruler",       value: "Olokine" },
              { icon: Target,    label: "Population",  value: "~300,000" },
              { icon: Calendar,  label: "Quarters",    value: "42 Itun" },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
                <Icon size={20} className="text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{label}</p>
                <p className="font-bold text-foreground text-sm">{value}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {[
              "Ojowo is the most westerly of the five urban settlements (Ugbo Maarun) that constitute Ijebu-Igbo, the headquarters of Ijebu North Local Government in Ogun State. In fact the name Ojowo means \"West — the place at which the sun sets.\"",
              "Ojowo land extends some thirty kilometres North-West of Ogun State with farm settlements that have boundaries with farms in Oyo State. The closest neighbours in Ijebu-Igbo are Atikori, Japara and Oke Sopen. The population census put the population at approximately three hundred thousand (300,000).",
              "Ojowo comprises forty-two (42) quarters (itun) which are grouped into four namely: Etitale, Aledo, Emutebu and Eyenbu. According to traditional history, Ojowo was first settled by hunters from Ile Ife and later Ijebu-Ode led by the renowned royal hunters and Princess Ogunelegi and Onayelu respectively. Later from the middle to the end of the nineteenth century, groups of migrants from Ikorodu and Abeokuta made their home in Ojowo. Over time, the head of Ojowo evolved from Baale to Oloritun, Olojowo and presently, OLOKINE.",
              "Ojowo remains a notable centre of cultural, social and economic development. The people continue to play significant roles in the political, social and business affairs of the State, the nation and the world at large.",
            ].map((para, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}>
                {para}
              </motion.p>
            ))}
          </div>

          {/* Landmarks & Religion */}
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="bg-card border border-border rounded-2xl p-5">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <MapPin size={15} className="text-accent" /> Notable Landmarks
              </h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {["Cathedral of the Anglican Communion", "Ijebu Igbo Girls' Grammar School", "Ojowo / Atikori Market", "General Hospital", "Ojowo Central Mosque", "St Matthew School 1 & Cathedral", "Olokine Grammar School", "Sarepowo Market"].map((l, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />{l}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="bg-card border border-border rounded-2xl p-5">
              <h4 className="font-bold text-foreground mb-3">Faith & Religion</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Adherents of Islam, Christianity and various traditional forms of worship live peacefully in Ojowo. Ojowo is the cradle of Christianity in Ijebu Igbo and the seat of the Diocesan Bishop of the Anglican Communion.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Since its introduction around 1840, Islam has flourished with approximately 20 Mosques. Plans are at an advanced stage to build an ultramodern central mosque, Eid praying ground and a tertiary educational institution in Ojowo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-primary">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Direction</h2>
            <h3 className="font-display text-3xl sm:text-4xl font-black text-primary-foreground">Vision &amp; Mission</h3>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Eye, label: "Vision Statement",
                text: "To place Ojowo on the world map for its transformation efforts in being the most peaceful, friendly, merit and disciplined driven for people to live, work and play as a result of her safety, business, educational and cultural opportunities consistently advertised to the world.",
              },
              {
                icon: Target, label: "Mission Statement",
                text: "To build a kingdom that is most peaceful, friendly, integrity and merit driven and the best investment destination in Ogun State.",
              },
            ].map(({ icon: Icon, label, text }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }}
                className="bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h4 className="font-display font-black text-accent text-lg">{label}</h4>
                </div>
                <p className="text-primary-foreground/80 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Rulers */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">History</h2>
            <h3 className="heading-section">Previous &amp; Present Rulers</h3>
          </motion.div>
          <div className="space-y-2">
            {rulers.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease }}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${r.current ? "bg-accent/10 border-accent/40 shadow-md" : "bg-card border-border"}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${r.current ? "bg-accent text-white" : "bg-primary/10 text-primary"}`}>
                  {r.no}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm leading-tight ${r.current ? "text-accent" : "text-foreground"}`}>
                    {r.title} {r.name}
                    {r.current && <span className="ml-2 text-xs bg-accent text-white px-2 py-0.5 rounded-full font-semibold">Current</span>}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.years}</p>
                  {r.note && <p className="text-xs text-muted-foreground/70 italic mt-1">{r.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiefs Councils */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Leadership</h2>
            <h3 className="heading-section">Ojowo Chiefs</h3>
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-4">
            <Council title="Council of Palace Chiefs & Special Advisers" count={palaceChiefs.length} members={palaceChiefs} defaultOpen={true} />
            <Council title="Council of Pampas" count={pampas.length} members={pampas} />
            <Council title="Council of Olorituns" count={olorituns.length} members={olorituns} />
            <Council title="Council of Otunbas" count={otunbas.length} members={otunbas} />
            <Council title="Council of Baales" count={baales.length} members={baales} />
          </div>
        </div>
      </section>

      {/* Annual Activities */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Calendar</h2>
            <h3 className="heading-section">Annual Activities &amp; Days</h3>
          </motion.div>
          <div className="space-y-3">
            {annualActivities.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease }}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-card border border-border rounded-2xl">
                <div className="flex items-center gap-3 sm:w-56 shrink-0">
                  <div className="w-9 h-9 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                    <Calendar size={15} className="text-accent" />
                  </div>
                  <p className="text-xs font-bold text-accent uppercase tracking-wide leading-tight">{a.period}</p>
                </div>
                <div className="sm:border-l sm:border-border sm:pl-4">
                  <p className="text-sm font-semibold text-foreground">{a.activity}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ojowo Anthem */}
      <section className="section-padding bg-primary">
        <div className="container-main max-w-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Music size={22} className="text-accent" />
              <h3 className="font-display font-black text-accent text-2xl sm:text-3xl">Ojowo Anthem</h3>
              <Music size={22} className="text-accent" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
            {anthem.map((line, i) =>
              line === "" ? (
                <div key={i} className="h-4" />
              ) : (
                <p key={i} className="text-primary-foreground font-display font-semibold text-lg sm:text-xl leading-relaxed">
                  {line}
                </p>
              )
            )}
          </motion.div>
        </div>
      </section>

      <Lightbox images={galleryImages} index={index} direction={direction} onClose={close} onPrev={prev} onNext={next} />

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
