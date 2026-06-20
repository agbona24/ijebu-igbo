import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export const faqs = [
  {
    category: "Membership & Contributions",
    question: "What is Project 500, and is it a replacement for the Monthly Contribution?",
    answer: [
      "Project 500 (Please Count Me In) is NOT a replacement for the monthly contribution of £10. It is a separate initiative designed to generate funds for our community cause — and importantly, you do not have to be a Member of IID to participate. Anyone who wants to support our people is welcome.",
      "The idea is simple: if we can find 500 Ijebu Igbo sons and daughters in Diaspora who each commit to donating just £2 a month to their hometown, we would raise £12,000 a year — enough to fund the projects we have been working hard to deliver.",
      "Members are also encouraged to participate voluntarily if they can afford it. Our children, friends, and others who may not wish to attend meetings but still want to help are especially welcome to be part of this initiative.",
      "It was envisioned that if we reach the 500-person target, the monthly contribution may be scrapped entirely. To join Project 500, please contact Alhaji Kazeem Haruna Ishola. Feel free to share this with friends who may not want to be members but simply want to help.",
    ],
  },
  {
    category: "Culture & Meetings",
    question: "What does it mean when someone 'Hosts' an IID event or meeting?",
    answer: [
      "One of the core aims and objectives of IID is to preserve and promote our culture — supported by Section 2, Subsections 2.2, 2.7 and 2.10 of our Constitution. Hosting is a beautiful expression of that culture.",
      "In the tradition of our parents, a member would host the venue or prepare food for people attending the meeting. This is done in turns. It is a way of saying: I belong, I care, I love our meeting and our people, and I am a cheerful giver.",
      "Our meetings are spiced with food and light music so members can relax, socialise and look forward to the next gathering. Many members come straight from work, church, or other commitments — hosting ensures they are taken care of.",
      "With our number, if we all get involved and host in turns, it may come around once every three years. Some members link their hosting to a birthday, wedding anniversary, or another special occasion — though this is not required. Hosting is not compulsory, but if you can afford it, why not participate?",
      "Hosting is supervised by the Social Secretary and the Cultural Secretary.",
    ],
  },
  {
    category: "Dignitaries & International Relations",
    question: "How does IID organise meetings with dignitaries who visit London?",
    answer: [
      "When we receive distinguished visitors — such as royals or people in government — we use a special hosting initiative: we invite all attendees to a restaurant or private venue. This creates a conducive atmosphere for our guest while allowing members to socialise in a relaxed setting.",
      "This type of hosting is sponsored by those who attend and does not come from the organisation's funds.",
      "The benefit is clear: it gives us the opportunity to be identified with the guest, make them feel honoured, dialogue in a comfortable environment, and promote our community — which in turn may open doors of support and goodwill.",
      "We have done this in the past and believe we need more of such occasions as part of the ways we move forward together.",
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
            Answers to the most common questions about IID Omo Orimolusi in Diaspora — our initiatives, culture, and how you can get involved.
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
