import { motion } from "framer-motion";

const culturalPhrases = [
  "KÁÀBỌ̀ ỌMỌ ORÍMÓLÚSÍ",
  "Ẹ̀ WẸ̀ SỌ̀Ọ́ ỌMỌ ALÁRÈ",
  "IJEBU IGBO KÌ Í ṢOFO",
  "ILU WA, IGBERAGA WA",
  "ỌMỌ ALÁRÈ KÁ GBÉ IJEBU IGBO GA",
];

export default function Marquee() {
  // Duplicate phrases for seamless infinite scroll
  const duplicatedPhrases = [...culturalPhrases, ...culturalPhrases, ...culturalPhrases];

  return (
    <section className="relative bg-primary py-4 sm:py-5 overflow-hidden border-y border-accent/20">
      {/* Label */}
      <div className="container-main text-center mb-2 sm:mb-3">
        <p className="text-accent/80 text-xs sm:text-sm font-semibold tracking-wider uppercase">
          Cultural Greetings from Ijebu Igbo
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden group">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        {/* Scrolling content */}
        <motion.div
          className="flex gap-6 sm:gap-8 md:gap-12 whitespace-nowrap"
          animate={{
            x: [0, -1920], // Adjust based on content width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          style={{ willChange: "transform" }}
        >
          {duplicatedPhrases.map((phrase, index) => (
            <div
              key={index}
              className="flex items-center gap-6 sm:gap-8 md:gap-12"
            >
              <span className="text-accent font-display font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">
                {phrase}
              </span>
              <span className="text-accent/60 text-xl sm:text-2xl">✦</span>
            </div>
          ))}
        </motion.div>

        {/* Duplicate for seamless loop */}
        <motion.div
          className="flex gap-6 sm:gap-8 md:gap-12 whitespace-nowrap"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          style={{ willChange: "transform" }}
        >
          {duplicatedPhrases.map((phrase, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex items-center gap-6 sm:gap-8 md:gap-12"
            >
              <span className="text-accent font-display font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">
                {phrase}
              </span>
              <span className="text-accent/60 text-xl sm:text-2xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative top and bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </section>
  );
}
