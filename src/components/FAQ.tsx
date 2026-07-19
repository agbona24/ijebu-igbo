import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export const faqs = [
  {
    category: "About Ijebu-Igbo",
    question: "Is Ijebu-Igbo related to the Igbo ethnic group?",
    answer: [
      "No. Ijebu-Igbo is a Yoruba town in Ijebu-North Local Government Area of Ogun State, South-West Nigeria. The \"Igbo\" in its name is a Yoruba word for forest or bush, referring to the wooded terrain its hunter-founders settled — not the Igbo ethnic group of South-East Nigeria.",
      "Ijebu-Igbo's language, chieftaincy system, festivals and oriki are all Yoruba, closely related to neighbouring Ijebu-Ode but with its own distinct royal houses, quarters and traditions.",
    ],
  },
  {
    category: "About Ijebu-Igbo",
    question: "How many towns make up Ijebu-Igbo, and who leads them?",
    answer: [
      "Ijebu-Igbo is made up of seven towns, each with its own Town Oba, all under the paramount authority of the Orimolusi: Oke-Sopen (seat of the Orimolusi), Atikori, Japara, Ojowo, Oke-Agbo, Imope-Ijebu and Aparaki.",
      "Imope-Ijebu and Aparaki are the most recently recognised Town Obaships, joining the original five to bring the number of town Obas to seven.",
    ],
  },
  {
    category: "About This Archive",
    question: "Where does the information on this site come from?",
    answer: [
      "This archive draws on documented royal genealogies, chieftaincy records, published histories and the oral traditions of Ijebu-Igbo's own towns and royal houses.",
      "It is a living project — corrections, missing details, and better sources are always welcome. See 'Contribute a Record' below to get in touch.",
    ],
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07, ease }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? "border-accent/50 shadow-md" : "border-border bg-white hover:border-primary/30"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start gap-3 sm:gap-4"
      >
        <div className={`mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          isOpen ? "bg-accent text-charcoal" : "bg-primary/10 text-primary"
        }`}>
          <HelpCircle size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{faq.category}</p>
          <h4 className="font-display font-bold text-foreground text-sm sm:text-base leading-snug pr-6">
            {faq.question}
          </h4>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 mt-1 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-14 sm:pl-[4.25rem] space-y-3 border-t border-border pt-4">
              {faq.answer.map((para, i) => (
                <p key={i} className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ({ limit }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="section-padding bg-background">
      <div className="container-main max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="label-accent">Got Questions?</h2>
          <h3 className="heading-section">Frequently Asked Questions</h3>
          <p className="text-body mt-3">
            Answers to common questions about Ijebu-Igbo, its towns and Obas, and this archive.
          </p>
        </motion.div>

        <div className="space-y-3">
          {visible.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
