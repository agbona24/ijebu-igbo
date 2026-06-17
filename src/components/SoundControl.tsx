import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, Music2 } from "lucide-react";
import { useSoundManager } from "@/hooks/use-sound";

export default function SoundControl() {
  const { soundEnabled, ambienceEnabled, toggleSound, toggleAmbience } = useSoundManager();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Sound Effects Toggle */}
      <motion.button
        onClick={toggleSound}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-accent/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
        title={soundEnabled ? "Sound Effects: ON" : "Sound Effects: OFF"}
      >
        <AnimatePresence mode="wait">
          {soundEnabled ? (
            <motion.div
              key="volume-on"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </motion.div>
          ) : (
            <motion.div
              key="volume-off"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground/50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring when enabled */}
        {soundEnabled && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>

      {/* Ambience Toggle */}
      <motion.button
        onClick={toggleAmbience}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-accent/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={ambienceEnabled ? "Disable background music" : "Enable background music"}
        title={ambienceEnabled ? "Ambience: ON" : "Ambience: OFF"}
      >
        <AnimatePresence mode="wait">
          {ambienceEnabled ? (
            <motion.div
              key="music-on"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Music className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </motion.div>
          ) : (
            <motion.div
              key="music-off"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Music2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground/50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated bars when playing */}
        {ambienceEnabled && (
          <motion.div className="absolute inset-0 rounded-full flex items-center justify-center gap-0.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 h-2 bg-accent/30 rounded-full"
                animate={{
                  height: ["8px", "12px", "8px"],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.button>

      {/* Info tooltip on first visit */}
      <AnimatePresence>
        {soundEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-2 w-48 px-3 py-2 bg-primary/95 backdrop-blur-sm rounded-lg shadow-lg border border-accent/30"
          >
            <p className="text-xs text-primary-foreground/80 text-center">
              Traditional Yoruba sounds enabled 🥁
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
