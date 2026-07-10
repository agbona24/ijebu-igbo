import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Crown, MapPin, Target, Users, BookOpen, Landmark, ScrollText } from "lucide-react";
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
  "Oke-Sopen sits in the Ijebu-North area of Ogun State, about a 15-minute drive from Ijebu-Ode. It is the political headquarters and commercial nerve centre of Ijebu-North Local Government, with many of its indigenes playing an active role in state and national politics.",
  "Oke-Sopen was founded around the 15th century by Princess Sopenlukale and Ogunelegi. Sopen Lukale was a princess of the Ijasi ruling lineage of Ijebu-Ode, a descendant of Olu-Iwa who came from Ife-Owodaiye to join her cousin, Oba Osimore Olijasi. She was a powerful and prominent trader who sold her locally woven cloths (ikale) to hunters around Ijebu-Igbo, exchanging them for meat and other goods — and grew rich and famous, with her own retinue of servants and followers. She settled at a place known as Itale/Aleke, Oke-Sopen. A prince from Owu, Olowu, later met and married her, settling nearby at Ese-Odi in present-day Agbole-Olowu.",
  "Ogunelegi was a great hunter who migrated from Ile-Ife to Ita-Ajana, Ijebu-Ode, where he met Oba Obaruwa Osimore (Olijasi) Ekewa Olu, the 10th Awujale of Ijebu-Ode, and became friends with the Oba's son, Onayelu. With the Awujale's blessing, Ogunelegi, Sopen Lukale and their followers continued their hunting expedition to Ijebu-Igbo, killing an elephant at a place still known today as Iperin. They settled first at Itamolikere (Ibudo-Ode, the Hunters' Camp), known today as Idode. Among their entourage were Olokine, Laporu, Abijaparako, Tanrin-Larinkoye (Keegbo), Adefarigana, Laso, Olumoko and Legun — Legun later killed an elephant and found plenty of melon (egusi atowo) inside it, settling at what is today Itowo.",
  "Ogunelegi and Sopen Lukale, as leaders of the team, advised the others to disperse to their various hunting camps (Asunde) to ease congestion at Idode. These camps grew into \"Ugbo Marun-un\" — five settlements that metamorphosed into the founding towns of Ijebu-Igbo, each with its own Oba: Oke-Sopen; Okuromade (Olokineide), who settled at the sunset and planted his staff beside an Okan tree at what is now Idokan, Ojowo; Tarin Larinkoye (Keegbo), who settled where they killed a Tree Hyrax (Awawa) at what is now Bogije, Atikori; Princess Bejeroku, who joined them later and settled where the Arigbo (Agbigbo) birds served as timekeepers, at what is now Oke-Agbo; and Abijaparako, a brother of Ogunelegi and Laporu from Ife-Owodaiye, who first settled at Abata among the Jampara trees before moving to present-day Japara after the Egba war.",
  "Prince Onayelu — son of the Awujale whose bid to succeed his father had failed to his younger brother, Oba Ofiran — returned to Ijebu-Igbo, pleaded his case to Ogunelegi and his niece Sopenlukale, and was settled at a place where Otako trees flourished: Oke-Tako, in Oke-Sopen, which remains the only seat of the Oba Orimolusi to this day. There, with the help of the Agemo priest (Moki), Ogunelegi, Sopenlukale and the others installed Onayelu as the first Oloja Ugbo of Ijebu-Igbo, nicknaming him Ori Lomo Olusi (\"only God knows who will prosper\") — a name later shortened to Orimolusi. A second telling of the name's origin recalls a Small Pox epidemic during Onayelu's reign: Ifa counselled a sacrifice with a live elephant, and Ogunelegi's son, Olusi, was lost in the process. When asked of his son, Ogunelegi replied, \"Erin ti mu Lusi lo\" (\"the elephant has taken Lusi away\") — later modified to Orimolusi in his memory.",
  "Oke-Sopen produced powerful warriors and warlords — Seriki Ogunsegun of Odobotun, Balogun Alase of Agbole-Olowu, Akogun Elegeje of Itunlayi and Akogun Abenwo of Agbowa among them — who fought alongside Ile-Ife in the Modakeke War. During the Ipara War, Seriki Ogunsegun's Oke-Sopen army was the only one able to lift the ceremonial left thigh of the war spoils from the ground, a feat that cemented Oke-Sopen's leadership role in Ijebu-Igbo's sharing formula ever since: Oke-Sopen takes the right thigh, head and intestine; Ojowo the left thigh; Atikori the right arm; Oke-Agbo the left arm; and Japara the back — 3-2-2-2-1, observed to this day.",
  "Oke-Sopen is the only town in Ijebu-Igbo with two Iledi Osugbo Ibile — at Ibido and Odosentalu. Every other Iledi Osugbo converges at Iledi Ibido for their meetings (Itadogun), and any newly appointed Liwo or Apena must still be presented at Oke-Sopen for Itagbe before assuming full office — a practice observed as recently as 2005. The Iledi Osugbo at Sentalu served as a supreme court of sorts: whatever was agreed there was final (\"Umupon la n ba elejo\"). As the people say: Oke-Sopen is Ijebu-Igbo, Ijebu-Igbo is Oke-Sopen — traditionally, socially and economically. And while the reigning Oba Orimolusi presides, it is the Sopenlukale who is next in line, serving as Head of the Ruling Council and Regent of Ijebu-Igbo whenever the Orimolusi's throne falls vacant.",
];

const pastRulers = [
  { no: 1, title: "Bale", name: "Seriki Ogunsegun", house: "Igbaire / Odobotu", years: "1886 – 1899" },
  { no: 2, title: "Bale", name: "Okusote", house: "Igbaire / Odobotu", years: "1899 – 1907" },
  { no: 3, title: "Bale", name: "Osofisan Alewenla", house: "Agbole-Olowu / Ibido", years: "1907 – 1912" },
  { no: 4, title: "Bale", name: "Fowora Ogiridigbamu", house: "Agbole-Olowu", years: "1912 – 1924" },
  { no: 5, title: "Bale", name: "Shitu Ologben", house: "Agbole-Olowu / Aleke", years: "1924 – 1929" },
  { no: 6, title: "Bale", name: "Akinbambo", house: "Igbaire / Odobotu", years: "Feb – Dec 1929" },
  { no: 7, title: "Bale", name: "Gbadamosi Kone", house: "Odorasonyin", years: "1930 – 1954" },
  { no: 8, title: "Olori-Ilu", name: "Olubajo", house: "Itowo / Idode", years: "1961 – 1964" },
  { no: 9, title: "Olori-Ilu", name: "Senjobi", house: "Agbole-Olowu", years: "1967 – 1980" },
  { no: 10, title: "Olori-Ilu", name: "Amos Ogunbanjo", house: "Igbaire / Odobotu", years: "1980 – 1987" },
  { no: 11, title: "H.R.H Oba", name: "S. O. Adeleye, MON", house: "Odorasonyin", years: "1991 – 1998" },
  { no: 12, title: "H.R.H Oba (Dr.)", name: "Alhaji M. A. Yusuf", house: "Itowo / Idode", years: "2003 – Present", current: true },
];

const obaBio = [
  "Kabiyesi Oba (Dr.) M. A. Yusuf, Erinkitola I, the Sopenlukale of Oke-Sopen, Ijebu-Igbo, was born in 1960 into the family of the late Prince Abeeb Tiriba Yusuf Erinki of the Ikupakude royal dynasty, through his paternal lineage of Osifunren/Osilamade of Itowo, Oke-Sopen, and a famous Onipo family of Agbole-Olowu, a descendant of the Awoyelu ruling class in Oke-Tako. His mother was Hajia Falilat Yusuf (née Koleti Sanni) of Oriwu Quarter, Atikori, Ijebu-Igbo.",
  "He attended St. James Anglican Primary School, Atikori, and St. Peter's Anglican Primary School, Iwopin, Ijebu Waterside (1968–1974), before proceeding to Local Authority Modern School, Oke-Agbo, where he obtained his Modern School Certificate in 1978. He went on to Ago-Iwoye Secondary School for his West African School Certificate in 1981, then Ramat Polytechnic, Maiduguri, for a National Diploma in Business Administration, and the Institute of Secretarial Studies for an RSA Stage 2 Certificate in Typing and Shorthand. He holds a Bachelor's degree in Human Resource Management from ESTAM University, Cotonou, Republic of Benin, and an honorary doctorate from Pilgrims Theological Seminary, Abia State — an affiliate of Emmanuel University, North Carolina, USA — awarded in 2005 for his religious and humanitarian service.",
  "In recognition of his work preserving Ijebu-Igbo's traditions and culture, he was made a Fellow of the Nigeria Academy for Arts and Culture (FAAC) in January 2016, and received a second honorary doctorate from ESEP-LE Berger University, Cotonou, in March 2021. He also holds fellowships from the Institute of Criminology and Penology (FICP), the Chartered Institute of Management and Leadership USA (FCIML), and the International Professional Managers Association UK (FCIPM), alongside professional certificates from the London School of Business Administration and Alison CPD Certification Service, USA.",
  "A businessman from his earliest years, Oba Yusuf started out as a butcher and cow dealer at Obada Market before moving into fish trading alongside his mother, a Globe Fish distributor for the whole of Ijebuland — a trade that earned him the nickname \"Mufu Eja\" (Eja City). He later worked at Keegbo High School, Atikori (1982–83), and as a typist and confidential secretary at M. A. Adeoti & Associates, Ibadan (1984–85). Today he is a timber contractor and Director of Iderade Sawmill, Gberigbe, Ikorodu; Chairman of Ababa Tiriba Nig. Enterprises and Mufty Farms; CEO of Mufty Autos, a subsidiary of Mufty Royal Company Ltd, Newark, New Jersey, USA; and Chairman of M'Royale Events Centre and CEO of De-Royale Hall, Ijebu-Igbo.",
  "Kabiyesi Oba (Dr.) M. A. Yusuf was enthroned as the Sopenlukale of Oke-Sopen on 19 May 2003 as a Third Class Oba, was promoted to Second Class in 2006, and attained First Class Oba status in 2019 by Ogun State Government gazette. In 2019 he was a special guest of King Salman bin Abdulaziz Al Saud, custodian of the two Holy Mosques, for his third Hajj — a rare honour in Ogun State shared only with the Awujale of Ijebu-Ode, Oba (Dr.) S. K. Adetona, since 1976. He served as acting Chairman of the Ijebu-Igbo Council of Obas from 2003 to February 2022, and has been Secretary of the Ijebu North Council of Obas for twenty years. He is a member of the Ijebu Traditional Council and the Ogun State Council of Obas, Vice-Chairman of the H.R.M Heritage Forum (Ogun State) and the Yoruba Obas Forum (Ogun State Chapter), and Chairman of Ijebu Obas for Good Governance.",
  "Kabiyesi Sopenlukale resuscitated and re-established the Regberegbes of Ojude Oba Ijebu-Igbo in 2006, founding three — Egbe Bobagunte, Egbe Gbobanniyi and Egbe Jagunmolu. A lover of peace and a keen footballer and goalkeeper in his younger years, he is happily married and blessed with children and grandchildren at home and abroad.",
];

const obaOriki = [
  "Omo Ababa Tiriba, elete kan ko pa loju eni, eyin eni la ngba imoran ika, boju ba koju enu ari dere-dere. Omo onile owo otun ko ro teni sire, imoran ika nit'osi ngba, kale ni jade ni ti okankan ile nwi. Omo Erinkitola pa bi ekun, o pabi ekun lojude. Omo Onipo bi agba imale, omo Abesin bi oke, bi oke bi apata. Omo agun esin ja ewe odan, omo o gun esin losan gun omo eniyan loru. Omo Olowu oduru, omo ajifepe sere, Omo Owu ajumuda. Omo Itowo alegun madehin, oo alegun de budo. Omo Osifuren Osilamade/Ikupakude, Omo Tako Awoye, Omo Orimolusi, omo Adore oke. Omo Olufowo re se teje, Omo Sopenlukale.",
  "Omo Oriwu asale gege, asale gege bi eniti ko lobinrin ri. Abaya kunle titit, a baya niwon niwon, abaya rebe rebe. Omo Akole ti, Oyinbo Oriwu, Omo Aroyewun a po bi iru esin, Omo Akeso faratile, faratile. Omo Tarin larin koye.",
];

const okeSopenOriki = [
  "Omo Orimolusi, Omo Adoro Oke, Omo Olufoworeseteje, Omo Tako Awoye, Omo Sopenlukale, Omo Ebedi are Iseyin, To fi oju soro ju enu lo, Omo Ada eru bi eni da eran, To sa were Eru dele, To sa eyitogodo sona oja.",
  "Omo Oba Ijebu Mure, Omo Awure la, Awure fase bonu, Omo Onile Ajeji kowo, Ajeji to wo laro, O deni A fi rubo lale, Omo Alagemo abidi wenewene, Omo Alagemo otuu yowoyowo, Omo Moki Ajaye, Omo Agemo ti ku ni Maje sin, O digba to ba fi opa tile dandan. Omo Ijasi Elemele, Omo Ijasi Gbole Ogba Olowu.",
  "Omo Olowu Oduru, Ajifepe sere, Omo Idode Kibo, Omo Igbaire Laso modu, Omo Rasonyin, Lapaoku, Omo Itowo Alegun Madehin, Omo Aleke Ologben, Omo Jagun, Omo Ilesa ko lejo, Omo Ramunsegun Ogbonko, Omo Odoyingbo, Okejaga, Omo Lubadejo Akanti Oke, Omo Agbowa Ile Agbowa Oko, Omo Botu, Ogaji, Omo Iyalode Oba Obinren, Omo Erelu Ebiye Omo Sopenlukale.",
];

const quarters28 = [
  "Agbole Olowu", "Aleke", "Ilesa", "Agbowa", "Ibido", "Odobalogun", "Odoyangunsen", "Oke-Jaga",
  "Oke-Liyan", "Odo-Ladegunsen", "Egbe Aransi", "Egbe Salako / Alagon", "Aleke Igbaire", "Aledo Igbaire",
  "Adaka", "Oke-Tako", "Odobotu", "Odoyanperuwa", "Odorasonyin", "Ododoroye", "Oke-Oba", "Topon",
  "Umayan", "Itowo", "Idode", "Odoramusengun", "Odofunmodara", "Odomosibi",
];

const odos = [
  "Odo Mosibi", "Odo Yanperuwa", "Odo Yangunse / Ehin Eri", "Odo Funmodara", "Odo Ramusegun", "Odo Botu",
  "Odo Ladegunsen", "Odo Balogun", "Odo Rasonyin", "Odo Sentalu", "Odo Do'do-roye", "Odo Aleso", "Odo Lupeji", "Odo Sijo",
];

const traditionalChiefs = [
  { name: "Chief Adewale Jaiyesimi", title: "Oluwo" },
  { name: "Vacant", title: "Adele Olurin" },
  { name: "Chief Adekite Adeoye Olowoodo", title: "Jewo" },
  { name: "Chief Abeje Oriyomi", title: "Erelu Abiye" },
  { name: "Chief Saibu Balogun", title: "Apena" },
  { name: "Chief Mufutau Lawal", title: "Akoni Oran" },
  { name: "Vacant", title: "Pampa Agbole Olowu" },
  { name: "Vacant", title: "Pampa Igbaire" },
  { name: "Chief Taiwo Okeowo", title: "Pampa Odorasanyin" },
  { name: "Chief Rasidi Digbamu", title: "Pampa Itowo / Odoramusengun" },
  { name: "Chief Mufutau Mustapha", title: "Olu-Ode" },
  { name: "Chief Kazeem Sikiru", title: "Laagba Oke 1" },
  { name: "Chief Mufutau Adaran", title: "Laagba Oke 2" },
  { name: "Chief Rafiu Asore", title: "Laagba Ododoroye" },
  { name: "Chief Kikelomo Ogunkoya", title: "Iya Agan Oke 1" },
  { name: "Chief Kemi Kajifa", title: "Iya Agan Oke 2" },
  { name: "Chief Nojimu Bakare", title: "Abore 1" },
  { name: "Chief Rasidi Digbamu", title: "Abore 2" },
  { name: "Chief Adejoke Lawal", title: "Iyamode Oke 1" },
  { name: "Chief Osokoya Afolashade", title: "Iyamode Oke 2" },
  { name: "Vacant", title: "Iyamode Ododoroye" },
];

const councilOloriturns = [
  { name: "Chief Mafoya Razak Idris", note: "Chairman", quarter: "Aleke" },
  { name: "Chief Ogunyale Ariyo Ademola", note: "Gen. Secretary", quarter: "Itowo" },
  { name: "Chief Sonubi Kayode Idowu", quarter: "Aleke Igbaire" },
  { name: "Chief Asekun Olaitan Mushafau", quarter: "Odobalogun" },
  { name: "Chief Lasisi Rasai Adegbuyi", note: "Seriki", quarter: "Odoyangunsen" },
  { name: "Chief Ogunjoke Morufu Gbelegboye", quarter: "Itunarin Idode" },
  { name: "Chief Mufutau Adekoya", quarter: "Aleke Odorasonyin" },
  { name: "Chief Yisau Rotimi Adeniyi", quarter: "Agboole Olowu" },
  { name: "Chief Adeneye Afisu Akanni", quarter: "Aledo Idode" },
  { name: "Chief Balogun Ganiyu Paramole", quarter: "Oke-Liyan Paroba" },
  { name: "Chief Ogunbanjo Francis Olatunbosun", quarter: "Aledo Odoramusegun" },
  { name: "Chief Ogunbajo Olusola Marcus", quarter: "Odoyanperuwa Igbaire" },
  { name: "Chief Osokoya Tajudeen Ayinde", quarter: "Oke Saaro Igbaire" },
  { name: "Chief Moshood Babatunde Kabiu", quarter: "Aleke Itowo" },
  { name: "Chief Banjo Sikirulah Olaide", quarter: "Aledo Odorasoyin" },
  { name: "Chief Onasile Alowonle Abayomi", quarter: "Ibido" },
  { name: "Chief Sanni Sulaimon Babtunde", quarter: "Aleke Oke-Jaga" },
  { name: "Chief Daropale Ramoni Raimi", note: "Erelu Ogbeni", quarter: "Odobotu" },
  { name: "Chief Bakare Kamaru Olatoye", quarter: "Ilesa" },
  { name: "Chief Salau Mufutau Ayinde", quarter: "Oke Oba I" },
  { name: "Chief Asenowo Adegbemiga Anthony", quarter: "Obada" },
  { name: "Chief Osikoya Kehinde Oluwayomi", quarter: "Iberukodo" },
  { name: "Chief Oladunjoye Amsat Fatai", quarter: "Olorun Akoku Odobotu" },
  { name: "Chief Raji Babatunde Olaitan", quarter: "Odoladgunsen" },
  { name: "Chief Adegbesan Oyewole", quarter: "Aleke Okeliyun" },
  { name: "Chief Oyewole Olugbenga Anthony", quarter: "Aledo Igbaire" },
  { name: "Chief Adeoye Adekite Olowoodo", quarter: "Odesentalu" },
  { name: "Chief Bello Adiamo Olayinka", quarter: "Agbole Olowu II" },
  { name: "Chief Jonathan Adeniyi Aderibigbe", quarter: "Aleke Idode" },
  { name: "Chief Ogundipe Adekunle Adesina", quarter: "Agbowa" },
  { name: "Chief Adeyemi Tomiwa Sarafadeen", quarter: "Ogodo Olowu" },
  { name: "Chief Oludegun Waheed Korede", quarter: "Aledo Odo-Opon" },
  { name: "Chief Ologbon Wasiu Lekan", quarter: "Aleke Odo-Opon" },
  { name: "Chief Muraina Kalejaye Ganiyu", quarter: "Isale Itowo" },
  { name: "Chief Philips Oladunni Olatunbosun", quarter: "Odo Funmodara" },
  { name: "Chief Adeleke Adewale Okufuwa", quarter: "Aleke Odo-Opon II" },
  { name: "Chief Gbadebo Adebisi Anthony", quarter: "Oke-Tako" },
  { name: "Chief Amos James Olukoya", quarter: "Oke-Oba III" },
  { name: "Chief Adenuga Abayomi", quarter: "Okumade Ojolo" },
  { name: "Chief Adegbesan Oluwasesan", quarter: "Agbeluja Ojolo" },
  { name: "Chief Abideen Usman Ajiboye", quarter: "Ayegbami Ojolo" },
  { name: "Chief Azeez Jimoh", quarter: "Eredo Ojolo" },
  { name: "Chief Olubanwo Ogunbanjo", quarter: "Moborode" },
  { name: "Chief Mudasiru Hassan", quarter: "Oke-Jaga 1" },
  { name: "Chief Olusegun J. Olusada", quarter: "Itun Arin Odorasonyin" },
  { name: "Chief Yisau Moibi", quarter: "Odo Mosibi" },
  { name: "Chief Ismail Adekunle Lawal", quarter: "Aleke, Egbe Alagun" },
  { name: "Chief Yekinni Tijani", quarter: "Mogba, Egbe Alagun" },
  { name: "Chief Sunday Damilola Yekinni", quarter: "Hajatu, Egbe Alagun" },
  { name: "Vacant", quarter: "Adaka" },
  { name: "Vacant", quarter: "Aleke Odoramusegun" },
  { name: "Vacant", quarter: "Odobotu I" },
  { name: "Vacant", quarter: "Seriki Odobotu" },
  { name: "Vacant", quarter: "Ododoroye" },
  { name: "Vacant", quarter: "Egbe Alagun" },
  { name: "Vacant", quarter: "Egbe Arosi" },
  { name: "Vacant", quarter: "Egbe Subaru" },
  { name: "Vacant", quarter: "Egbe Sonnumaiye Igbaire" },
  { name: "Vacant", quarter: "Itun-Arin Odoramusegun" },
  { name: "Vacant", quarter: "Oke-Oba II" },
];

const councilBaales = [
  { name: "Chief Sikiru Kareem", note: "Chairman", village: "Idiomo" },
  { name: "Chief Ramoni Rufai", village: "Erigboro" },
  { name: "Chief Sunmola Lawal", village: "Olorunmodi Ademowo" },
  { name: "Chief Adetunji Adekanbi", village: "Araromi Adekanbi" },
  { name: "Chief Mufutau Saliu", village: "Oluwo Olotun" },
  { name: "Chief Mufutau Adeleke Olupeji", village: "Umaren" },
  { name: "Chief Tafa Afolabi Akinlade", village: "Akinlade" },
  { name: "Chief Abiodun Obisesan", village: "Obisesan" },
  { name: "Chief Tajudeen Balogun", village: "Balogun Omini" },
  { name: "Chief Samson Olawale", village: "Ojo Mojor" },
  { name: "Chief Fatai Ogundele", village: "Gbokutaru Ogundele" },
  { name: "Chief Ganiyu Coker", village: "Abidepe" },
  { name: "Chief J. Awogbesan", village: "Ilesa" },
  { name: "Chief Yisau Sanni", village: "Lukanran" },
  { name: "Chief Abayomi Olokun Alade", village: "Oluwo Ona" },
  { name: "Chief Joseph Ipadeola", village: "Arije" },
  { name: "Chief Aliu Akanji Sikiru", village: "Gbokutaru Tishehu" },
  { name: "Chief Jaiyeola Adenugba", village: "Ajebamidele Nugba" },
  { name: "Chief Kamula Kajola", village: "Kamula Temidire" },
  { name: "Chief Tajudeen Osiyele", village: "Alase" },
  { name: "Chief Patrick Saliu", village: "Tibabarisi" },
  { name: "Chief Akanji Musa", village: "Iya Ofa" },
  { name: "Chief Wosilat Mustapha", village: "Idi-Oriko" },
  { name: "Chief Olumahun Kehinde Muriana", village: "Agbowa Olumahun" },
  { name: "Chief Samson Sonubi", village: "Eseeyin Semugere" },
  { name: "Chief Amos Ogunaike", village: "Agbowa Pensen" },
  { name: "Chief Olupitan Olusegun", village: "Asegere" },
  { name: "Chief Mufutau Oladejo", village: "Adara" },
  { name: "Chief Adesegun Kabiru", village: "Aba Kabiru" },
  { name: "Chief Ishola Olorunfunmi", village: "Temulubo" },
  { name: "Chief Ramoni Saibu Afosi", village: "Tafosi" },
  { name: "Chief AsiriEko Shittu", village: "Kobape Eriloro" },
  { name: "Chief Oladunjoye Obagun", village: "Takowe" },
  { name: "Chief Mufutau Tajudeen", village: "Apadaba" },
  { name: "Chief Oladele Akeran", village: "Akata Mesan" },
  { name: "Chief Sarairu Adegbiyi", village: "Erigboro Oke-Eri" },
  { name: "Chief Mubasiru Seriki", village: "Erigboro Sunbare" },
  { name: "Chief Rasaki Olabamiji", village: "Popo Odeyale" },
  { name: "Chief Moses Jinren", village: "Ssam Jinren" },
  { name: "Chief Saula Apola", village: "Baoku 1" },
  { name: "Chief Samuel Taiwo Oyekanmi", village: "Iho / Ajegbemi" },
  { name: "Chief Alhaji Jimoh Ayodele", village: "Owode Salami" },
  { name: "Chief Fatai Olaide", village: "Shasha" },
  { name: "Chief Muniru Kazeem", village: "Baoku 2" },
  { name: "Chief Nurudeen Basorun", village: "Erimogun" },
  { name: "Chief Ojonala Inakoju", village: "Alalupon" },
  { name: "Chief M. Yusuf", village: "Erija Alasodudu" },
  { name: "Chief Adetayo Sunday", village: "Obatedo / Abameta" },
  { name: "Chief Clement Bafunmilayo", village: "Okudu" },
  { name: "Chief Bode Ogundele", village: "Olumunaki" },
  { name: "Chief Mufutau Ogundele", village: "Ajegunle Ogundele" },
  { name: "Chief Nojimu Bakere", village: "Ajegunle Abore" },
  { name: "Chief Raifu Murital", village: "Tangya" },
  { name: "Chief Nureni Abass", village: "Motanla Adebare" },
  { name: "Chief Adeniyi Adcolu Sunday", village: "Tanimola" },
  { name: "Chief Adekunle Kalejaiye", village: "Montola Adabare" },
  { name: "Chief Abayomi Babatunde Solaja", village: "Temidire" },
  { name: "Chief Sikiratu M. Moshood", village: "Korede" },
  { name: "Chief Babajide Olaniun Koladafe", village: "Timope" },
  { name: "Chief Olapade Taofeek Olayemi", village: "Orisunmibare Dagbolu" },
  { name: "Chief Rafiu Shittu", village: "Ogo Oluwa" },
  { name: "Chief Kabiru Adegbora", village: "Adegbora" },
  { name: "Chief Clement Titus", village: "Baba Rafa" },
  { name: "Alfa Muniru Sansa", village: "Ayesan" },
  { name: "Chief Michael Osinubi", village: "Taseyin" },
  { name: "Chief Gbenga Ogunbanjo", village: "Eyineregun" },
  { name: "Chief Ladapo Muriamo", village: "Tolobaloke" },
  { name: "Chief Adiamo Bello", village: "Togunberu" },
  { name: "Chief Wasiu Gbelepawo", village: "Agbowa Ipakodo" },
  { name: "Alfa Imam Sikiru Arowasu", village: "Arowasu" },
  { name: "Chief Raimi Akeula", village: "Papa Baale" },
  { name: "Chief Adeite Olowoodo", village: "Olowoodo" },
  { name: "Chief Sikiru Sanmi", village: "Nusi / Iya Egbe" },
  { name: "Chief Kazeem Ayodele", village: "Oyekunle" },
  { name: "Chief Sunday Otunaiya", village: "Tiliwo" },
  { name: "Chief Arowolo Adesanya", village: "Papa Adeogbin" },
  { name: "Chief Basiru Saibu", village: "Todubaku" },
  { name: "Chief Mudasiru Onanubi", village: "Ayesan Lamina" },
  { name: "Chief Adesegun Bakare", village: "Aseyori" },
  { name: "Chief Alaba Kazeem", village: "Tepamose Onikakan" },
];

const places = [
  { image: "royal-archway-oba-sopenlukale", name: "Royal Archway — Palace of the Sopenlukale" },
  { image: "iledi-osugbo-ibile", name: "Iledi Osugbo Ibile" },
  { image: "ijebu-igbo-town-hall", name: "Ijebu-Igbo Town Hall" },
  { image: "ijebu-north-secretariat", name: "Ijebu-North LG Secretariat" },
  { image: "customary-court", name: "Customary Court, Ijebu-Igbo" },
  { image: "topon-police-station", name: "Topon Police Divisional Headquarters" },
  { image: "fire-station", name: "Fire Station" },
  { image: "post-office", name: "Post Office" },
  { image: "water-corporation", name: "Water Corporation Office" },
  { image: "obada-market", name: "Obada Market" },
  { image: "obada-motor-park", name: "Obada Motor Park" },
  { image: "arobieke-house", name: "Arobieke House" },
  { image: "wema-bank", name: "Wema Bank" },
  { image: "polaris-bank", name: "Polaris Bank" },
  { image: "fcmb-bank", name: "FCMB Bank" },
  { image: "molusi-college", name: "Molusi College" },
  { image: "sopen-comprehensive-high-school", name: "Sopen Comprehensive High School" },
  { image: "moslem-primary-school", name: "Moslem Primary School" },
  { image: "abusi-odumare-academy", name: "Abusi Odumare Academy" },
  { image: "oou-annex", name: "OOU Teaching Hospital Annex, Obada" },
  { image: "maternity-obada", name: "Maternity, Obada" },
  { image: "st-thomas-church", name: "St. Thomas Church" },
  { image: "st-john-church-olokuta", name: "St. John's Church, Olokuta" },
  { image: "michael-adenuga-memorial-church", name: "Michael Adenuga Memorial Anglican Church" },
  { image: "ijebu-igbo-central-mosque", name: "Ijebu-Igbo Central Mosque" },
  { image: "ansar-ud-deen-central-mosque", name: "Ansar-Ud-Deen Central Mosque" },
  { image: "abinugbola-suites-apartments", name: "Abinugbola Suites & Apartments" },
  { image: "abidap-hotel", name: "Abidap Hotel & Suites" },
  { image: "rolatex-hotel", name: "Rolatex Hotel" },
  { image: "de-royale-classic-hall", name: "De Royale Classic Hall" },
  { image: "omoilu-event-centre", name: "Omoilu Foundation Event Centre" },
  { image: "yucateco-arena", name: "Yucateco Arena" },
  { image: "chicken-and-co", name: "Chicken & Co" },
  { image: "sweet-word-food", name: "Sweet World Foods Lounge & Restaurant" },
  { image: "aroso-food-empire", name: "Aroso Food Empire" },
  { image: "park-and-shop-store", name: "Park & Shop Supermart" },
].map((p) => ({ ...p, src: `/images/oke-sopen/${p.image}.webp` }));

const galleryImages = [
  { src: "/images/oke-sopen/oba-sopenlukale-mufutau-adesesan-yusuf.webp", alt: "HRH Oba (Dr.) Mufutau Adesesan Yusuf, Erinkitola I — The Sopenlukale of Oke-Sopen, Ijebu Igbo" },
  ...places.map((p) => ({ src: p.src, alt: p.name })),
];

// ── Small components ─────────────────────────────────────────────────────

function AccordionList({
  label, title, subtitle, children,
}: { label: string; title: string; subtitle: string; children: React.ReactNode }) {
  const [openState, setOpenState] = useState(false);
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <button onClick={() => setOpenState((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-primary hover:brightness-110 transition-all text-left">
        <div>
          <h4 className="font-display font-black text-accent text-base sm:text-lg">{title}</h4>
          <p className="text-white/60 text-xs mt-0.5">{subtitle}</p>
        </div>
        <ChevronDown size={20} className={`text-accent shrink-0 transition-transform duration-300 ${openState ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {openState && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }} className="overflow-hidden">
            <div className="p-5 bg-muted/30">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">{label}</span>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function OkeSopenKingdomPage() {
  const [bioOpen, setBioOpen] = useState(false);
  const { index, direction, open, close, prev, next } = useLightbox(galleryImages);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/oke-sopen" />

      {/* Hero */}
      <section className="relative min-h-[48vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label-accent mb-2">
            Ijebu-Igbo · Oke-Sopen Town
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight">
            Oke-Sopen
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed">
            Home of the Sopenlukale, political and commercial headquarters of Ijebu-North, and the only seat the Oba Orimolusi has ever held — at Oke-Tako.
          </motion.p>
        </div>
      </section>

      {/* Royal Portrait */}
      <section className="bg-[#fff8ec] py-10 sm:py-14">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }} className="text-center max-w-[280px] mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] mb-4">
              <ZoomableImage src={galleryImages[0].src} alt={galleryImages[0].alt} onClick={() => open(0)} />
            </div>
            <h3 className="font-display font-black text-foreground text-lg leading-tight">
              His Royal Highness Oba (Dr.) Mufutau Adesesan Yusuf
            </h3>
            <p className="text-accent font-semibold text-sm mt-1">Erinkitola I — The Sopenlukale of Oke-Sopen, Ijebu Igbo</p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <h2 className="label-accent mb-2">About</h2>
            <h3 className="heading-section mb-6">About Oke-Sopen</h3>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: MapPin, label: "Neighbours", value: "Ojowo, Atikori, Japara" },
              { icon: Crown, label: "Ruler", value: "Sopenlukale" },
              { icon: Users, label: "Baales", value: "80 recorded" },
              { icon: Target, label: "Oloriturns", value: "60 across 46 quarters" },
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
                transition={{ duration: 0.5, delay: i * 0.05, ease }}>
                {para}
              </motion.p>
            ))}
          </div>

          {/* Sharing formula callout */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }} className="mt-8 bg-accent/10 border border-accent/30 rounded-2xl p-5 sm:p-6">
            <p className="font-display font-bold text-foreground text-sm sm:text-base mb-3">
              "Oke-Sopen is Ijebu-Igbo, Ijebu-Igbo is Oke-Sopen" — the sharing formula (3-2-2-2-1)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              {[
                { town: "Oke-Sopen", share: "Right thigh, head & intestine" },
                { town: "Ojowo", share: "Left thigh" },
                { town: "Atikori", share: "Right arm" },
                { town: "Oke-Agbo", share: "Left arm" },
                { town: "Japara", share: "The back" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-3">
                  <p className="font-display font-bold text-foreground text-xs sm:text-sm">{s.town}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{s.share}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Oba's full biography */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Leadership</h2>
            <h3 className="heading-section">Profile of the Sopenlukale</h3>
          </motion.div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="p-5 sm:p-6">
              <h4 className="font-display font-bold text-foreground text-base sm:text-lg leading-tight">
                Kabiyesi Alayeluwa Oba (Dr.) Mufutau Adesesan Yusuf, FAAC, FPMA, FCIML
              </h4>
              <p className="text-accent font-semibold text-sm mt-1">The Sopenlukale of Oke-Sopen, Ijebu-Igbo — enthroned 19 May 2003</p>
              <button
                onClick={() => setBioOpen((v) => !v)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors"
              >
                {bioOpen ? "Hide full biography" : "Read full biography"}
                <ChevronDown size={14} className={`transition-transform duration-300 ${bioOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            <AnimatePresence initial={false}>
              {bioOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }} className="overflow-hidden">
                  <div className="px-5 sm:px-6 pb-6 pt-1 space-y-3 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    {obaBio.map((para, i) => (
                      <p key={i} className="pt-3 first:pt-3">{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Oriki of the Oba */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <BookOpen size={22} className="text-accent" />
              <h3 className="font-display font-black text-accent text-2xl sm:text-3xl">Oriki Oba (Dr.) M. A. Yusuf</h3>
              <BookOpen size={22} className="text-accent" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-2xl p-6 sm:p-10 backdrop-blur-sm space-y-6">
            <p className="font-display text-base sm:text-lg text-primary-foreground/90 leading-loose text-center italic">
              {obaOriki[0]}
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-accent/50" />
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">Oriki Idile Iya</span>
              <span className="h-px w-12 bg-accent/50" />
            </div>
            <p className="font-display text-base sm:text-lg text-primary-foreground/90 leading-loose text-center italic">
              {obaOriki[1]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Past & Present Rulers */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">History</h2>
            <h3 className="heading-section">Past &amp; Present Rulers of Oke-Sopen</h3>
          </motion.div>
          <div className="space-y-2">
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
                  <p className="text-xs text-muted-foreground mt-0.5">{r.house} · {r.years}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quarters & Odo */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-4xl space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-6">
            <h2 className="label-accent mb-2">Governance</h2>
            <h3 className="heading-section">Quarters &amp; Odos of Oke-Sopen</h3>
            <p className="text-body mt-2">Oke-Sopen started with 20 quarters (Ejidogbon ra da Oke), grew to 28, and has since expanded to 46 — the most of any town in Ijebu-Igbo, alongside 14 Odo, more than any other town.</p>
          </motion.div>

          <AccordionList label="Quarters" title="The 28 Base Quarters (Ejidogbon Oke)" subtitle="Now grown to 46 quarters across 4 zones — Agbole-Olowu, Igbaire, Odorasoyin, Itowo">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {quarters28.map((q, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />{q}
                </div>
              ))}
            </div>
          </AccordionList>

          <AccordionList label="Odos" title="The 14 Odos of Oke-Sopen" subtitle="Each Odo has its own Otunba">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {odos.map((o, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />{o}
                </div>
              ))}
            </div>
          </AccordionList>
        </div>
      </section>

      {/* Traditional Chiefs */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Leadership</h2>
            <h3 className="heading-section">Oke-Sopen Traditional Chiefs</h3>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {traditionalChiefs.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease }}
                className={`p-3.5 rounded-xl border ${c.name === "Vacant" ? "bg-muted/40 border-border/60" : "bg-card border-border"}`}>
                <p className={`text-sm font-semibold leading-tight ${c.name === "Vacant" ? "text-muted-foreground italic" : "text-foreground"}`}>{c.name}</p>
                <p className="text-xs text-accent font-medium mt-0.5">{c.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Council of Oloriturns & Baales */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-4xl space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-6">
            <h2 className="label-accent mb-2">Governance</h2>
            <h3 className="heading-section">Councils of Oke-Sopen</h3>
          </motion.div>

          <AccordionList label="Council of Oloriturns" title="Council of Oloriturns" subtitle={`${councilOloriturns.length} Oloriturns, one per quarter`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {councilOloriturns.map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-background rounded-xl border border-border">
                  <span className="text-xs font-black text-accent/60 w-5 shrink-0 mt-0.5">{i + 1}.</span>
                  <div>
                    <p className={`text-sm font-semibold leading-tight ${c.name === "Vacant" ? "text-muted-foreground italic" : "text-foreground"}`}>
                      {c.name}{c.note && <span className="text-accent font-normal"> ({c.note})</span>}
                    </p>
                    <p className="text-xs text-accent font-medium mt-0.5">{c.quarter}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionList>

          <AccordionList label="Council of Baales" title="Council of Baales" subtitle={`${councilBaales.length} Baales across Oke-Sopen's villages and hamlets`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {councilBaales.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-background rounded-xl border border-border">
                  <span className="text-xs font-black text-accent/60 w-5 shrink-0 mt-0.5">{i + 1}.</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {b.name}{b.note && <span className="text-accent font-normal"> ({b.note})</span>}
                    </p>
                    <p className="text-xs text-accent font-medium mt-0.5">{b.village}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionList>
        </div>
      </section>

      {/* Oriki Oke-Sopen */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <ScrollText size={22} className="text-accent" />
              <h3 className="font-display font-black text-accent text-2xl sm:text-3xl">Oriki Oke-Sopen</h3>
              <ScrollText size={22} className="text-accent" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-2xl p-6 sm:p-10 backdrop-blur-sm space-y-6">
            {okeSopenOriki.map((verse, i) => (
              <p key={i} className="font-display text-base sm:text-lg text-primary-foreground/90 leading-loose text-center italic">
                {verse}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Heritage Places */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Heritage</h2>
            <h3 className="heading-section flex items-center justify-center gap-2">
              <Landmark size={26} className="text-accent" /> Around Oke-Sopen
            </h3>
            <p className="text-body mt-2">Landmarks, palaces, schools, worship centres and businesses of the town.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {places.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05, ease }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <ZoomableImage src={p.src} alt={p.name} onClick={() => open(1 + i)} />
                </div>
                <div className="p-3">
                  <h4 className="font-display font-bold text-foreground text-xs sm:text-sm leading-tight">{p.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={galleryImages} index={index} direction={direction} onClose={close} onPrev={prev} onNext={next} />

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
