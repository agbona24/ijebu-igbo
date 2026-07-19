import { motion } from "framer-motion";
import storyImg from "@/assets/story-history.jpg";
import festivalImg from "@/assets/gallery-festival.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Story() {
  return (
    <section id="story" className="section-padding bg-surface">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="label-accent">Our Heritage</h2>
          <h3 className="heading-section">Our Roots, Our Responsibility</h3>
          <p className="text-body mt-4 sm:mt-6">
            Ijebu-Igbo is a land rich in culture, tradition, and history. This archive exists
            to preserve that legacy accurately — for the town's people today, and for
            generations to come.
          </p>
        </div>

        {/* Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="overflow-hidden rounded-sm shadow-ceramic"
          >
            <img
              src={storyImg}
              alt="Historic Ijebu Igbo architecture"
              className="w-full h-[360px] lg:h-[440px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h4 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
              A Rich History of Enterprise
            </h4>
            <p className="text-body mb-4">
              Ijebu Igbo, a historic town in Ogun State, Nigeria, has long been
              known for its enterprising spirit. The Ijebu people are among the
              most commercially astute communities in West Africa, with trade
              networks that predate European contact.
            </p>
            <p className="text-body">
              From the ancient kingdom's sophisticated political structure to
              modern-day business empires, Ijebu Igbo's sons and daughters
              continue to shape industries across Nigeria and the world.
            </p>
          </motion.div>
        </div>

        {/* Block 2 — reversed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="order-2 lg:order-1"
          >
            <h4 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
              Ojude Oba & Cultural Festivals
            </h4>
            <p className="text-body mb-4">
              The Ojude Oba festival is a spectacular annual celebration where
              Ijebu people gather to pay homage to the Awujale — the traditional
              ruler of Ijebuland. Colourful horse parades, traditional music,
              and vibrant displays of Yoruba culture make it one of Nigeria's
              most iconic festivals.
            </p>
            <p className="text-body">
              For Ijebu-Igbo's people — at home and abroad — these cultural touchstones
              remain a vital link to identity, marking the calendar and the values
              that bind the community across generations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="overflow-hidden rounded-sm shadow-ceramic order-1 lg:order-2"
          >
            <img
              src={festivalImg}
              alt="Ojude Oba festival celebration"
              className="w-full h-[360px] lg:h-[440px] object-cover"
            />
          </motion.div>
        </div>

        {/* Cultural Saying */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mt-16 sm:mt-20 lg:mt-24 text-center max-w-3xl mx-auto"
        >
          <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6 sm:p-8 lg:p-10">
            <p className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-primary italic mb-3 sm:mb-4">
              "Ijebu Igbo kì í ṣofo"
            </p>
            <p className="text-base sm:text-lg text-body">
              Our town never stands empty.
            </p>
            <p className="text-sm sm:text-base text-body/70 mt-3 sm:mt-4">
              Wherever an Ọmọ Alárè lives in the world, the spirit of Ijebu Igbo lives there too.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
