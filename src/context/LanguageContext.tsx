import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "yo";

// Key UI strings translated to Yoruba (Ijebu dialect where appropriate)
const TRANSLATIONS = {
  en: {
    // Nav
    home:       "Home",
    about:      "About",
    heritage:   "Heritage",
    tourism:    "Tourism",
    gallery:    "Gallery",
    blog:       "Blog",
    contact:    "Contact",
    // Common headings
    ourHeritage:      "Our Heritage",
    ourPeople:        "Our People",
    gallery_label:    "Gallery",
    contactUs:        "Contact Us",
    // CTA
    learnMore:  "Learn More",
    readMore:   "Read More",
    viewAll:    "View All",
    // Home hero
    heroTitle:  "Seven Towns, One Crown, One Story",
    heroSub:    "The living archive of Ijebu-Igbo — its Obas, its towns, and its history.",
  },
  yo: {
    // Nav
    home:       "Ilé",
    about:      "Nípa Wa",
    heritage:   "Ìtàn Wa",
    tourism:    "Àwọn Ibi Pàtàkì",
    gallery:    "Àwọn Àwòrán",
    blog:       "Bùlọ́ọ̀gì",
    contact:    "Kan Sí Wa",
    // Common headings
    ourHeritage:      "Ìtàn Wa",
    ourPeople:        "Àwọn Ènìyàn Wa",
    gallery_label:    "Àwọn Àwòrán",
    contactUs:        "Kan Sí Wa",
    // CTA
    learnMore:  "Kọ́ Síi",
    readMore:   "Ka Síi",
    viewAll:    "Wo Gbogbo",
    // Home hero
    heroTitle:  "Ìlú Méje, Adé Kan, Ìtàn Kan",
    heroSub:    "Àkójọ ìtàn Ijebu-Igbo tí ń bá a lọ — àwọn Oba rẹ̀, àwọn ìlú rẹ̀, àti ìtàn rẹ̀.",
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
