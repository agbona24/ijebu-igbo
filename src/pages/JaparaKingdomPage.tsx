import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Crown, MapPin, Target, Users, Sprout, HandHeart, Music, ScrollText, Hammer } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import Lightbox, { useLightbox, ZoomableImage } from "@/components/Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

// ── Data ──────────────────────────────────────────────────────────────────

const history = [
  "Japara is one of the five principal wards in Ijebu-Igbo Township. Japara shares its boundary in the North with Oru and Ibadan, in the South and West with Oke-Sopen, while in the East by Ojowo.",
  "History has it that Abijaparako was among those who followed Ogunelegi from Ijebu-Ode to Ijebu-Igbo on a hunting expedition. Ogunelegi Larinde, Ogundipe (Abijaparako) and Laporu were said to be brothers of the same mother from Ife-Owodaiye. The three of them, on arrival at Ijebu-Ode, sojourned there for some time before continuing their hunting expedition to the Northern part of Ijebu. Ogunelegi, Ogundipe and others en route continued their journey to Ododoroye, crossing River Ololo, before Abijaparako settled the land — meaning the present site of Japara is not the original location where Abijaparako first settled. He married Mode, who bore him three children (in order of seniority): Lawusi (1st), Owogbegi (2nd) and Kileyo (3rd). The names \"Japara\" and \"Abijaparako\" were coined from the Jampara trees.",
  "The relocation of the family to the present site was prompted by frequent attacks suffered by Ojowo settlers from Egba warriors, leaving them with heavy casualties. Abijaparako had a formidable local army of brave hunters that could face the battle, and each time his team intervened in the Egba/Ojowo clashes, they subdued and conquered the Egbas. The Ojowo Elders then conceded part of their land to Abijaparako for close proximity and timely intervention — and with a fee simple paid on the land, the warriors never returned to disturb their peace again.",
  "It was during the fierce battle with the Egbas that all Owogbegi children left Japara to settle at other parts of Ijebu-Igbo; the area where they lived before relocating is still known as \"Itun Magbon.\" History also records that Prince Adetoye Otufowole, son of Oba Onijasi of Ijebu-Ode, was persuaded by his sister Madam Gbetun (married to Lawusi) to settle in Japara. His in-law granted him a separate domain — \"ODO\" — at traditional price, and the Prince, a reputable shea-butter merchant, settled at what is today Odo-Kotolori (ODO: domain, KOTO: pit reservoir, LORI: owner of shea butter). He lived long and was buried at Odokotolori, at a site called Ojosi.",
  "The Prince's descendants were later forced out of the \"ODO\" to the present site of New Japara due to inter-tribal wars and the slave trade in 1910. Since then, four major families have lived together peacefully in Japara: Lawusi, Owogbegi, Kileyo and Odokotolori.",
];

const structure = [
  "The Japara Community was, from early history, divided into two for administrative convenience — Aleke Japara and Isale Japara — re-designated Lawusi Quarter and Kileyo Quarter by the Western Region Government in 1957. Lawusi Quarter comprises the Lawusi and Odokotolori families, while Kileyo Quarter comprises the Kileyo and Owogbegi families.",
  "Rulership or chieftaincy rotates between the families living in a quarter, as there is no hereditary ruling family in Japara — or anywhere in Ijebu-Igbo — except that of the Orimolusi. This is what obtains in the other four wards (Oke-Sopen, Ojowo, Atikori and Oke-Agbo) as contained in the Chiefs' Declaration of 1957.",
  "The Head of Japara was originally known as Baale, later upgraded to Olorilu, and has now metamorphosed to Oba/Alade — but the title remains Abijaparako. As with the other wards, Japara is governed in stages by Pampas, Osugbos, Oloritans, Baales, Traditional Otunbas (Sigboro and Odokotolori), the Abijaparako In-Council, and the Abijaparako.",
  "To enhance grass-root administration, the two Quarters — Lawusi (Lawusi and Odokotolori families) and Kileyo (Owogbegi and Kileyo families) — are further divided into twenty (20) Ituns, each headed by an Oloritun.",
];

const ituns = [
  "Itun Lawusi I", "Itun Lawusi II", "Itun Owogbegi", "Itun Kileyo I", "Itun Kileyo II",
  "Itun Aarin Kileyo", "Itun Magbon", "Itun Moborode", "Itun Odokoto 1", "Itun Odokoto 2",
  "Itun Olorunsogo", "Itun Oke Aje", "Itun Akorede", "Itun Surulere", "Itun Temidire",
  "Itun Isokan", "Itun Alaafia Tayo", "Itun Araromi", "Itun Ayegbami", "Itun Ayeloja",
];

const pastRulers = [
  { no: 1, title: "Chief", name: "Otesile", note: "Lawusi Family, Lawusi Quarters", years: "1909" },
  { no: 2, title: "Chief", name: "E. O. Oduyemi", note: "Kileyo Quarters — brought Christianity to Japara via St. Luke's (Ang) Church", years: "1929" },
  { no: 3, title: "Chief", name: "A. Onateluwo", note: "Lawusi Quarters", years: "1954" },
  { no: 4, title: "Chief", name: "M. K. Odujobi", note: "Kileyo Quarters — crowned Oba on 15 February 1997 by the Awujale, His Royal Majesty Oba (Dr.) Sikiru Kayode Adetona (Ogbagba II)", years: "1983 – Aug. 2003" },
  { no: 5, title: "HRH Oba", name: "Aderemi Adewale Ogunye", note: "Ilufemiloye, Kotolori-Ojuule I — installed after the stool remained vacant from 2003; celebrating his 10th coronation anniversary", years: "Present", current: true },
];

const oriki = [
  "A K'obi b'ose,",
  "A k'orogbo bo ojugun,",
  "Akilele Ak'orogbo Oyo dele,",
  "olobi woroko eba ona,",
  "Eyi to saanu eni a wo seru eni,",
  "Eyi ti ko saanu eni a wo si eba oko.",
  "Eranko a fi je.",
  "Oluwa Tapa, oluwa Ibariba,",
  "Oluwa eru ekunle bebere lojo ebi.",
];

const palaceChiefs = [
  { photo: "/images/japara/chief-ayodele-francis-ogunye-baba-oba-japara.webp", name: "Engr. Prof. Ayodele Francis Ogunye, D.Sc, FAEng", title: "Baba Oba of Japara" },
  { photo: "/images/japara/chief-babatunde-babatomiwa-rowaiye-mayegun-ijebu-igbo.webp", name: "Dr. Babatunde Babatomiwa Rowaiye", title: "Otunba Odosigboro Japara & Mayegun of Ijebu-Igbo" },
];

const currentChiefs = [
  { name: "Engr. Prof. Ayodele Francis Ogunye", title: "Baba Oba of Japara" },
  { name: "Chief Mrs. Bilola Solaja", title: "Yeye Oba of Japara" },
  { name: "Chief Engr. Bayo Dayo", title: "Akogun of Japara" },
  { name: "Chief Amos A. Ogunye", title: "Otunba Mejekobaje of Japara" },
  { name: "Otunba Dr. Babatunde Babatomiwa Rowaiye", title: "Otunba Odosigboro Japara & Mayegun of Ijebu-Igbo" },
  { name: "Otunba Adedotun Olukorede Fasanya", title: "Otunba Odokotolori" },
  { name: "Aare Olayinka Oni Olanrewaju", title: "Asiwaju of Japara" },
  { name: "Chief Ademola Adewunmi Dayo", title: "Otori Omoba Japara" },
];

const oloriEbis = [
  { name: "Chief Engr. Samuel Adebayo Dayo", title: "Olori Ebi Lawusi" },
  { name: "Chief Olusola Rowaiye", title: "Olori Ebi Owogbegi" },
  { name: "Chief Tokunbo Adeleke Talabi", title: "Olori Ebi Kileyo" },
  { name: "Otunba Adedotun Olukorede Fasanya", title: "Olori Ebi Odokotolori" },
];

const galleries = [
  { src: "/images/japara/japara-immediate-past-obas.webp", caption: "Immediate Past Obas of Japara — Oba Moses Kolawole Odujobi, Chief Emmanuel Oduyemi (Baale of Japara), Chief Albert Onateluwo (Olori Ilu of Japara)" },
  { src: "/images/japara/japara-current-baales-oloriwuns.webp", caption: "Current Baales and Oloritun of Japara" },
  { src: "/images/japara/japara-current-pampa-osugbos.webp", caption: "Current Pampa (Lawusi, Owogbegi, Kileyo, Odokotolori) and Osugbos of Japara" },
];

const pastBaales = [
  { name: "Chief Adebanjo Adekoya Adepitan", title: "Baale Ganrigan" },
  { name: "Chief Keyinde Ogunfowoke", title: "Baale Awoyaya" },
  { name: "Chief Sunday Obisanya", title: "Baale Lorin" },
  { name: "Chief Olusayo Onabanjo", title: "Baale Ajebandele Ogunye" },
  { name: "Chief Onikolu Akanni", title: "Baale Ajebo Opebi" },
  { name: "Chief Shina Sabiu", title: "Baale Agbede" },
  { name: "Chief Adebayo Adelagun", title: "Baale Araromi Kukoyi" },
  { name: "Chief Tajudeen Nosiru", title: "Baale Ajepodomati" },
  { name: "Chief Taju Saibu", title: "Baale Eruobodo" },
  { name: "Chief John Adekoya", title: "Baale Poroporo" },
  { name: "Chief Keji Bilesanmi", title: "Baale Okoniyan Mosimi" },
  { name: "Chief Sali Musari", title: "Baale Agbalasan" },
  { name: "Chief Noshiru Buraimo", title: "Baale Ologun" },
  { name: "Chief Korede Badejo", title: "Baale Ologun Olabanjo" },
  { name: "Chief Alphonso Seidu", title: "Baale Abajeri" },
  { name: "Chief Sunday Ajayi", title: "Baale Isamo" },
  { name: "Chief Jacob Odushina", title: "Baale Iseru" },
  { name: "Chief Jokotola Talabi", title: "Baale Idioparun" },
  { name: "Chief Amusa Badewa", title: "Baale Araromi Badewa" },
  { name: "Chief Adekafaru", title: "Baale Oposiga" },
  { name: "Chief Badewa Sekoni", title: "Baale Abarika Sekoni" },
  { name: "Chief Wahab Hassan", title: "Baale Okoliwo" },
  { name: "Chief Tade Alase", title: "Baale Okoneku" },
  { name: "Chief Makonjuola Okeowo Ogunye", title: "Baale Eyinojugbo" },
];

const projectAchievements = [
  "Renovation of a Classroom Block by Prof. A.F. Ogunye (An Alumnus).",
  "Street Solar Light stands on part of the community streets by Sen. Alhaji Lekan Mustapha.",
  "Rehabilitation of the Community streets but awaiting Asphalt surfacing by Sen. Alhaji Lekan Mustapha.",
  "Rehabilitation of Abijaparako Road with Asphalt surfacing plus Street Solar Light stands at 75% finishing by Hon. Adekoya.",
  "Rehabilitation of Abijaparako Rd. Junction to Agara River by grading Agric Investors.",
  "Upgrading the Old Primary Health Centre by the community while the new one by Hon. Joseph F. Adegbesan.",
  "Renovation of Ajebandele Ogunye Village Primary School by the Abijaparako In-Council.",
  "Construction and Commissioning of a Modern Temipelu Market.",
  "Construction and Commissioning of Japara Police Station by Japara Community.",
  "Building a place of worship — Otunba Samuel Adeoye Fasanya Memorial Anglican Church by the children.",
  "Town Hall built by Sen. Alhaji Lekan Mustapha.",
  "Commissioning a Radio Station — Row Radio by Otunba (Dr.) B. Rowaiye.",
  "Purchase, supply and installation of a Transformer to enhance quality Electricty supply from Abijaparako Rd. Junction to the Palace by Sen. Solomon Olamilekan Adeola (Yayi).",
  "The Palace All Round Lighting by Sen. Solomon O. Adeola (Yayi).",
  "Solar Street Lights: Both Poles & Lights supplied and erected from the Palace to Abijaparako Rd. Junction.",
];

const projectGalleries = [
  "/images/japara/japara-projects-achievements-1.webp",
  "/images/japara/japara-projects-achievements-2.webp",
  "/images/japara/japara-projects-achievements-3.webp",
];

const notableProfiles = [
  {
    photo: "/images/japara/oba-abijaparako-aderemi-adewale-ogunye-2.webp",
    name: "HRH Oba Aderemi Adewale Ogunye",
    title: "Ilufemiloye (Kotolori-Ojuule I) — The Abijaparako of Japara",
    bio: [
      "HRH Oba Aderemi Adewale Ogunye, Ilufemiloye (Kotolori-Ojuule I), was born on Monday, 17th May 1963, to the family of Late Pa Joseph Ogunsami Ogunye (Ojuule Family, Odokotolori Dynasty) of Japara and Late Madam Bernice Ajibike Ogunye (nee Onabanjo).",
      "Education: Kabiyesi had his elementary education at St. Luke's Anglican Primary School, Japara (1969–1975). Having lost his mother in July 1976, he proceeded to Abeokuta with his uncle, Late Mr. Muili Osisanwo, to learn auto-panel beating, graduating in 1980 and returning to Japara to set up his own auto-body business alongside Late P. J. Ola Oduyemi, then Chairman of the National Automobile Technician Association (NATA), Ijebu-Igbo. Years later, undeterred by his age, he enrolled at Ladugbo Community High School, Oke-Agbo, obtaining his WASSCE in 2010, and went on to earn a National Certificate in Education (Political Science / Social Studies) from Yewa Central College of Education, Ijebu-Igbo Centre, in 2014.",
      "Passions: Kabiyesi had a passion for entertainment and transport, inaugurating the Arikuyeri Travelling Theatre Group, and later building a transport business that took him to towns across South-West Nigeria — earning him the nickname \"Omo to mo ilu\" (a traveller who knows many towns), from which his praise-name MULU was coined. This same transport background led him to help establish the Japara Zone of Okada Riders in 1990, as its pioneer Chairman.",
      "Religion: Kabiyesi is a Christian, baptized and confirmed Anglican, and a licensed Lay-Reader in the Anglican Communion, worshipping at St. Luke's Anglican Church, Japara.",
      "Present Occupation: A keen businessman, he set up a borehole water supply and car-wash business to meet a community-wide water scarcity, and serves as Chief Executive Officer of MULU Unique Enterprises.",
      "Leadership & Social Life: Guided by the conviction that we should be our brother's keeper, Kabiyesi held several community leadership roles — including P.T.A. Chairman of Japara Comprehensive (Senior) High School and a strong member of the Ijebu-Igbo Council of Oloritun — before ascending the throne on 11th May 2016.",
      "Marital Life: Kabiyesi is happily married with children and grandchildren, and has undertaken a pilgrimage to Jerusalem since ascending the throne.",
      "Security Obligations: In the face of the insecurity affecting the region, Kabiyesi has volunteered to head the security architecture of not only Japara but Ijebu-Igbo as a whole.",
      "Dreams: Kabiyesi is committed to seeing projects through from foundation to completion — Temipelu Market, Japara Police Station and the new Palace edifice among the visions he has helped bring to life despite funding challenges.",
      "Performance in Obas-in-Council: Kabiyesi is well regarded by his brother Obas, especially His Royal Majesty Alayeluwa Oba Lawrence Jaiyeoba Adebajo, The Orimolusi of Ijebu-Igbo.",
    ],
  },
  {
    photo: "/images/japara/chief-adedotun-olukorede-fasanya-otunba-odokotolori-japara.webp",
    name: "Otunba Adedotun Olukorede Fasanya",
    title: "Otunba Odokotolori IV of Japara, Ijebu-Igbo",
    bio: [
      "Otunba Adedotun Olukorede Fasanya was born into a life shaped by heritage, purpose and quiet strength. He is a son of the late Otunba Samuel Adeoye Fasanya, the respected Otunba Odokotolori II, and Olori Victoria Oladepo Fasanya of the distinguished Akasoro-Ogunwa family of Atikori, Ijebu-Igbo.",
      "Raised between Apapa GRA, Lagos and Ijebu-Ode, he was nurtured with values rooted in Yoruba culture and tradition, showing an early sense of leadership and discipline. He began his education at Yaba Model Primary School, Surulere, and completed it at Adeola Odutola Elementary School, Ijebu-Ode, where he served as Senior Prefect. At Adeola Odutola College, Ijebu-Ode, he was appointed Head Prefect of Owojona Section, and though later selected as Head Boy, he chose the role of Deputy Head Boy instead to focus more fully on his academics.",
      "He earned a B.Sc. in Computer Science with Accounting from Ogun State University, Ago-Iwoye, and, after NYSC in Akure, married his wife Mojisola in 1995. He relocated to the United Kingdom, founded an IT consultancy and invested in real estate in Nigeria and abroad, later returning to academia in 2011 for a Master's in Information Technology Management at Anglia Ruskin University, graduating with distinction as the best student in his set.",
      "Ancestrally, he descends from Oba Ijasi of Ijebu-Ode and the Ajana dynasty, tracing his roots to Otunba Odokotolori I, Prince Adetoye Otufowole — and, on his maternal side, to Pa Akasoro-Ogunwa of Atikori and the late Chief Benjamin Olurombi Ogunwa, Majeobaje of Ijebu-Igbo.",
      "A devoted Christian widely regarded as a unifying figure in his family and community, he was formally pronounced Otunba Odokotolori-Elect by HRH Oba Aderemi Adewale Ogunye, the Abijaparako of Japara, on 28th February 2026 — stepping into the role as custodian of the Odokotolori lineage, carrying the responsibility of uniting families, preserving tradition and guiding future generations.",
    ],
  },
  {
    photo: "/images/japara/chief-ademola-adewumi-dayo-olori-omoba-japara.webp",
    name: "Chief Ademola Adewumi Dayo",
    title: "Olori Omoba Japara, Ijebu-Igbo",
    bio: [
      "Ademola Adewumi Dayo is an accomplished information technologist with decades of experience in technology, strategic planning, governance, enterprise transformation and organisational leadership. He was born in October 1975 to Chief (Engr.) Adebayo Dayo and Mrs. Olajumoke Dayo, from a family with a rich Christian heritage dating to 1895.",
      "He had his early education at Adeko Memorial Nursery School and Ago-Iwoye Secondary School, before going abroad in 1995, obtaining his A-Levels in England and a Finance degree from the University of the West of England.",
      "His career began with the NHS as a Financial Reporting Analyst, progressing into Financial Modeller and Systems Accountant roles, before moving into telecommunications with British Telecom and Vodafone. In 2008 he became a Certified Finance Systems Consultant, working with the Financial Conduct Authority, the Royal Bank of Scotland and Lloyds Banking Group on major divestment programmes, and later took on headhunted transformation roles across Europe's banking and telecom sectors.",
      "In 2010 he became a Certified IT Architect, consulting for organisations including Tesco, ACCA and Network Rail, and in 2018 a Certified Cloud Architect, expanding into cloud transformation and enterprise architecture. In recent years he has consulted with the UK central government on governance, security and digital transformation. He is happily married to Rahma Dayo and blessed with many children.",
    ],
  },
  {
    photo: "/images/japara/chief-olayinka-olanrewaju-oni-asiwaju-japara.webp",
    name: "Otunba Olayinka Olanrewaju Oni",
    title: "Asiwaju of Japara, Ijebu-Igbo",
    bio: [
      "Born in the early 1970s to Mr. and Mrs. Olanrewaju Oni of Ojowo Quarters, Ijebu-Igbo, with a paternal grandmother from Japara Ojuule (Odokotolori), he attended Saint Luke Primary School and Japara High School in Japara before relocating to Lagos in the early 1990s for personal and professional growth.",
      "He built a career first in the motor spare parts industry and later in automobile and bus dealership, founding Yinksolange Global Synergy Limited, where he serves as CEO. He served as Immediate Past President of the Elite Club of Ijebu-Igbo for eight years.",
      "His community contributions have earned him several chieftaincy titles: Otunba Atanbase of Oke-Sopen (by Kabiyesi Sopenlukale of Oke-Sopen), Asiwaju of Japara (by the Abijaparako of Japara), Aare Bobaselu of Ago-Iwoye (by the Ebumawe of Ago-Iwoye), and Akeweje Egbe Bobamayegun Obinrin Akile Ijebu, among others. He is also a distinguished executive member of the White House Gent Club of Nigeria, serving as Special Duty Officer, and is happily married.",
    ],
  },
];

const galleryImages = [
  { src: "/images/japara/oba-abijaparako-aderemi-adewale-ogunye.webp", alt: "His Royal Highness Oba Aderemi Adewale Ogunye (JP) — The Abijaparako of Japara" },
  ...palaceChiefs.map((c) => ({ src: c.photo, alt: `${c.name} — ${c.title}` })),
  ...notableProfiles.map((p) => ({ src: p.photo, alt: `${p.name} — ${p.title}` })),
  { src: galleries[0].src, alt: galleries[0].caption },
  { src: "/images/japara/japara-current-chiefs.webp", alt: "Current Chiefs of Japara" },
  { src: "/images/japara/japara-current-olori-ebis.webp", alt: "Current Olori Ebi of Japara" },
  { src: galleries[1].src, alt: galleries[1].caption },
  { src: galleries[2].src, alt: galleries[2].caption },
  ...projectGalleries.map((src, i) => ({ src, alt: `Japara community projects, page ${i + 1}` })),
];

// ── Sub-components ─────────────────────────────────────────────────────────

function Section({ title, label, children, className = "" }: { title: string; label: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`section-padding ${className}`}>
      <div className="container-main max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
          className="text-center mb-10">
          <h2 className="label-accent mb-2">{label}</h2>
          <h3 className="heading-section">{title}</h3>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function BioCard({ photo, name, title, bio, onPhotoClick }: { photo: string; name: string; title: string; bio: string[]; onPhotoClick: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      <div className="p-5 flex flex-col sm:flex-row gap-5">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-white shadow-md shrink-0 mx-auto sm:mx-0">
          <ZoomableImage src={photo} alt={name} onClick={onPhotoClick} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-bold text-foreground text-base sm:text-lg leading-tight">{name}</h4>
          <p className="text-accent font-semibold text-sm mt-1">{title}</p>
          <button
            onClick={() => setOpen(v => !v)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors"
          >
            {open ? "Hide full biography" : "Read full biography"}
            <ChevronDown size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }} className="overflow-hidden">
            <div className="px-5 pb-5 pt-1 space-y-3 text-sm text-muted-foreground leading-relaxed border-t border-border">
              {bio.map((para, i) => (
                <p key={i} className="pt-3 first:pt-3">{para}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PersonCard({ photo, name, title, onPhotoClick }: { photo?: string; name: string; title: string; onPhotoClick?: () => void }) {
  return (
    <div className="text-center">
      {photo && (
        <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white aspect-[3/4] mb-3 max-w-[220px] mx-auto">
          {onPhotoClick ? (
            <ZoomableImage src={photo} alt={name} onClick={onPhotoClick} />
          ) : (
            <img src={photo} alt={name} className="w-full h-full object-cover" />
          )}
        </div>
      )}
      <h4 className="font-display font-bold text-foreground text-sm leading-tight">{name}</h4>
      <p className="text-accent font-semibold text-xs mt-1">{title}</p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function JaparaKingdomPage() {
  const [ituneOpen, setItuneOpen] = useState(false);
  const [baalesOpen, setBaalesOpen] = useState(false);
  const { index, direction, open, close, prev, next } = useLightbox(galleryImages);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/japara" />

      {/* Hero */}
      <section className="relative min-h-[48vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label-accent mb-2">
            Ijebu-Igbo · Japara Quarter
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight">
            Japara
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed">
            Named for the Jampara trees where Abijaparako first settled — home of the Lawusi, Owogbegi, Kileyo and Odokotolori families.
          </motion.p>
        </div>
      </section>

      {/* Royal Portrait */}
      <section className="bg-[#fdf1f3] py-10 sm:py-14">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }} className="text-center max-w-[280px] mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] mb-4">
              <ZoomableImage src={galleryImages[0].src} alt={galleryImages[0].alt} onClick={() => open(0)} />
            </div>
            <h3 className="font-display font-black text-foreground text-lg leading-tight">
              His Royal Highness Oba Aderemi Adewale Ogunye (JP)
            </h3>
            <p className="text-accent font-semibold text-sm mt-1">Ilufemiloye (Kotolori-Ojuule I) — The Abijaparako of Japara, Ijebu Igbo</p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <h2 className="label-accent mb-2">About</h2>
            <h3 className="heading-section mb-6">About Japara</h3>
          </motion.div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: MapPin, label: "Borders", value: "Oru, Ibadan, Oke-Sopen, Ojowo" },
              { icon: Crown, label: "Ruler", value: "Abijaparako" },
              { icon: Users, label: "Quarters", value: "Lawusi & Kileyo (20 Itun)" },
              { icon: Target, label: "Families", value: "Lawusi, Owogbegi, Kileyo, Odokotolori" },
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
            {history.map((para, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}>
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Palace Chiefs (portraits) */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Leadership</h2>
            <h3 className="heading-section">Palace Chiefs</h3>
          </motion.div>
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            {palaceChiefs.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}>
                <PersonCard {...c} onPhotoClick={() => open(1 + i)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Profiles */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Leadership</h2>
            <h3 className="heading-section">Notable Profiles</h3>
          </motion.div>
          <div className="space-y-5">
            {notableProfiles.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}>
                <BioCard {...p} onPhotoClick={() => open(3 + i)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Ruling Structure */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Governance</h2>
            <h3 className="heading-section">Traditional Ruling Structure</h3>
          </motion.div>
          <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
            {structure.map((para, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}>
                {para}
              </motion.p>
            ))}
          </div>

          {/* Ituns */}
          <div className="rounded-2xl border border-border overflow-hidden">
            <button onClick={() => setItuneOpen(v => !v)}
              className="w-full flex items-center justify-between px-5 py-4 bg-primary hover:brightness-110 transition-all text-left">
              <div>
                <h4 className="font-display font-black text-accent text-base sm:text-lg">The 20 Ituns of Japara</h4>
                <p className="text-white/60 text-xs mt-0.5">{ituns.length} Itun, each headed by an Oloritun</p>
              </div>
              <ChevronDown size={20} className={`text-accent shrink-0 transition-transform duration-300 ${ituneOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {ituneOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }} className="overflow-hidden">
                  <div className="p-5 bg-muted/30 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ituns.map((itun, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />{itun}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Schools, Occupation, Religion */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Community Life</h2>
            <h3 className="heading-section">Schools, Occupation &amp; Religion</h3>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease }} className="bg-card border border-border rounded-2xl p-5">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <ScrollText size={15} className="text-accent" /> Schools
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Japara is home to St. Luke's (Ang) Primary School, founded by missionaries in 1947, and Japara High School, established by the Ogun State Government in September 1980, alongside several private schools. Professor A. F. Ogunye was the 2nd person from the whole of Ijebu-Igbo to obtain a Ph.D., and the 2nd Professor produced by the town — Engr. Bayo Dayo also became Chairman of the Ogun State Peoples Democratic Party.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08, ease }} className="bg-card border border-border rounded-2xl p-5">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Sprout size={15} className="text-accent" /> Occupation
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Majority of Japara people are hardworking farmers, and it is through farming that most parents sent their children to school for a better tomorrow — Professor A. F. Ogunye being a notable product of this. Others engage in commercial businesses.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16, ease }} className="bg-card border border-border rounded-2xl p-5">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <HandHeart size={15} className="text-accent" /> Religion
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Christians, Muslims and Traditional worshippers co-exist peacefully in Japara without rancor, observing their festivals without encroaching on one another's interests. Japara people are widely regarded as very hospitable and accommodating to non-indigenes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Immediate Past Rulers */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">History</h2>
            <h3 className="heading-section">Immediate Past Rulers</h3>
          </motion.div>
          <div className="space-y-2 mb-10">
            {pastRulers.map((r, i) => (
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
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{r.note}</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{r.years}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }} className="rounded-2xl overflow-hidden border border-border shadow-sm mb-8">
            <ZoomableImage src="/images/japara/japara-immediate-past-obas.webp" alt="Immediate Past Obas of Japara" className="w-full" imgClassName="w-full h-auto" onClick={() => open(7)} />
          </motion.div>

          {/* Full list of Past Baales */}
          <div className="rounded-2xl border border-border overflow-hidden">
            <button onClick={() => setBaalesOpen(v => !v)}
              className="w-full flex items-center justify-between px-5 py-4 bg-primary hover:brightness-110 transition-all text-left">
              <div>
                <h4 className="font-display font-black text-accent text-base sm:text-lg">Full List of Past Baales</h4>
                <p className="text-white/60 text-xs mt-0.5">{pastBaales.length} recorded Baales of Japara</p>
              </div>
              <ChevronDown size={20} className={`text-accent shrink-0 transition-transform duration-300 ${baalesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {baalesOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }} className="overflow-hidden">
                  <div className="p-5 bg-muted/30 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pastBaales.map((b, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-background rounded-xl border border-border">
                        <span className="text-xs font-black text-accent/60 w-5 shrink-0 mt-0.5">{i + 1}.</span>
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-tight">{b.name}</p>
                          <p className="text-xs text-accent font-medium mt-0.5">{b.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Current Chiefs */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Leadership</h2>
            <h3 className="heading-section">Current Chiefs of Japara</h3>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto mb-8">
            {currentChiefs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease }}
                className="flex items-start gap-3 p-3 bg-card rounded-xl border border-border">
                <span className="text-xs font-black text-accent/60 w-5 shrink-0 mt-0.5">{i + 1}.</span>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{m.name}</p>
                  <p className="text-xs text-accent font-medium mt-0.5">{m.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }} className="rounded-2xl overflow-hidden border border-border shadow-sm max-w-2xl mx-auto">
            <ZoomableImage src="/images/japara/japara-current-chiefs.webp" alt="Current Chiefs of Japara" className="w-full" imgClassName="w-full h-auto" onClick={() => open(8)} />
          </motion.div>
        </div>
      </section>

      {/* Olori Ebis */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Family Heads</h2>
            <h3 className="heading-section">Olori Ebi of Japara</h3>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {oloriEbis.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
                className="bg-card rounded-xl border border-border p-3 text-center">
                <p className="text-sm font-semibold text-foreground leading-tight">{m.name}</p>
                <p className="text-xs text-accent font-medium mt-1">{m.title}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }} className="rounded-2xl overflow-hidden border border-border shadow-sm max-w-2xl mx-auto">
            <ZoomableImage src="/images/japara/japara-current-olori-ebis.webp" alt="Current Olori Ebi of Japara" className="w-full" imgClassName="w-full h-auto" onClick={() => open(9)} />
          </motion.div>
        </div>
      </section>

      {/* Grass-root galleries */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Grass-root Administration</h2>
            <h3 className="heading-section">Pampa, Osugbo &amp; Baales</h3>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {galleries.slice(1).map((g, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                <ZoomableImage src={g.src} alt={g.caption} className="w-full" imgClassName="w-full h-auto" onClick={() => open(10 + i)} />
                <p className="text-xs text-muted-foreground p-3 leading-snug">{g.caption}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Projects */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Development</h2>
            <h3 className="heading-section">Community Projects — Last 10 Years</h3>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-2 mb-8">
            {projectAchievements.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease }}
                className="flex items-start gap-3 p-3 bg-card rounded-xl border border-border">
                <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Hammer size={12} className="text-accent" />
                </div>
                <p className="text-sm text-foreground/80 leading-snug">{a}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {projectGalleries.map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="rounded-2xl overflow-hidden border border-border shadow-sm">
                <ZoomableImage src={src} alt={`Japara community projects, page ${i + 1}`} className="w-full" imgClassName="w-full h-auto" onClick={() => open(12 + i)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Oriki Abijaparako */}
      <section className="section-padding bg-primary">
        <div className="container-main max-w-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Music size={22} className="text-accent" />
              <h3 className="font-display font-black text-accent text-2xl sm:text-3xl">Oriki Abijaparako</h3>
              <Music size={22} className="text-accent" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }} className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
            {oriki.map((line, i) => (
              <p key={i} className="text-primary-foreground font-display font-semibold text-lg sm:text-xl leading-relaxed">
                {line}
              </p>
            ))}
          </motion.div>
          <p className="text-primary-foreground/50 text-xs text-center mt-6 max-w-md mx-auto leading-relaxed">
            Source: Iwe Itan Ilu Japara (1960) by Chief Albert Adeyemi Onateluwo, Isaac Ayodele Asebowale, Isaiah Orekoya Onabaki &amp; Adeeko Agun; Coronation Brochure of HRH Alayeluwa Oba Aderemi Adewale Ogunye (2006); Minutes of Abijaparako In-Council Meeting, 30/03/2024.
          </p>
        </div>
      </section>

      <Lightbox images={galleryImages} index={index} direction={direction} onClose={close} onPrev={prev} onNext={next} />

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
