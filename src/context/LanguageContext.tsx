import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "yo";

// Key UI strings translated to Yoruba (Ijebu dialect where appropriate)
const TRANSLATIONS = {
  en: {
    // Nav
    home:       "Home",
    about:      "About",
    impact:     "Impact",
    team:       "Team",
    heritage:   "Heritage",
    events:     "Events",
    news:       "News",
    gallery:    "Gallery",
    directory:  "Directory",
    tourism:    "Tourism",
    members:    "Members",
    donate:     "Donate",
    contact:    "Contact",
    joinUs:     "Join Us",
    // Common headings
    ourHeritage:      "Our Heritage",
    ourPeople:        "Our People",
    latestNews:       "Latest News",
    upcomingEvents:   "Upcoming Events",
    communityCalendar:"Community Calendar",
    gallery_label:    "Gallery",
    businessDirectory:"Business Directory",
    joinCommunity:    "Join the Community",
    contactUs:        "Contact Us",
    // CTA
    learnMore:  "Learn More",
    readMore:   "Read More",
    viewAll:    "View All",
    submitEvent:"Submit an Event",
    // Home hero
    heroTitle:  "Connecting Ijebu Roots Across the Diaspora",
    heroSub:    "Uniting descendants of Ijebu-Igbo worldwide through culture, community, and development.",
  },
  yo: {
    // Nav
    home:       "Ilé",
    about:      "Nípa Wa",
    impact:     "Ipa Wa",
    team:       "Ẹgbẹ́ Wa",
    heritage:   "Ìtàn Wa",
    events:     "Àwọn Ètò",
    news:       "Ìròyìn",
    gallery:    "Àwọn Àwòrán",
    directory:  "Àkójọ Iṣẹ́",
    tourism:    "Àwọn Ibi Pàtàkì",
    members:    "Àwọn Ọmọ Ẹgbẹ́",
    donate:     "Ṣe Àtìlẹyìn",
    contact:    "Kan Sí Wa",
    joinUs:     "Darapọ̀ Mọ́ Wa",
    // Common headings
    ourHeritage:      "Ìtàn Wa",
    ourPeople:        "Àwọn Ènìyàn Wa",
    latestNews:       "Ìròyìn Tuntun",
    upcomingEvents:   "Àwọn Ètò Tó Ń Bọ̀",
    communityCalendar:"Kalẹ́ndà Àwùjọ",
    gallery_label:    "Àwọn Àwòrán",
    businessDirectory:"Àkójọ Iṣẹ́ Ìdílé",
    joinCommunity:    "Darapọ̀ Mọ́ Àwùjọ",
    contactUs:        "Kan Sí Wa",
    // CTA
    learnMore:  "Kọ́ Síi",
    readMore:   "Ka Síi",
    viewAll:    "Wo Gbogbo",
    submitEvent:"Fi Ètò Rẹ Sílẹ̀",
    // Home hero
    heroTitle:  "Àsopọ̀ Ìtàn Ijebu Káàkiri Agbáyé",
    heroSub:    "Ìsopọ̀ àwọn ọmọ Ijebu-Igbo ní gbogbo àgbáyé nípasẹ̀ àṣà, àwùjọ, àti ìdàgbàsókè.",
  },
} as const;

type TranslationKey = keyof typeof TRANSLATIONS.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => TRANSLATIONS.en[key],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: TranslationKey) => TRANSLATIONS[lang][key];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
