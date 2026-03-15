import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import JoinModal from "@/components/JoinModal";

const ease = [0.16, 1, 0.3, 1] as const;

// Clan data with positions for the network visualization
const clans = [
  { name: "Oke-Sopen", angle: 0 },
  { name: "Oke-Agbo", angle: 72 },
  { name: "Ojowo", angle: 144 },
  { name: "Atikori", angle: 216 },
  { name: "Japara", angle: 288 },
];

// SVG animated clan network component
function ClanNetwork() {
  const centerX = 200;
  const centerY = 200;
  const radius = 130;

  // Calculate clan positions
  const clanPositions = clans.map((clan) => {
    const angleRad = (clan.angle - 90) * (Math.PI / 180);
    return {
      ...clan,
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    };
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[500px] max-h-[500px]"
      >
        <defs>
          {/* Intense golden gradient */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Animated gradient for energy flow */}
          <linearGradient id="energyFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0">
              <animate attributeName="offset" values="0;1" dur="1.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="20%" stopColor="#FFD700" stopOpacity="1">
              <animate attributeName="offset" values="0.2;1.2" dur="1.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="40%" stopColor="#FFD700" stopOpacity="0">
              <animate attributeName="offset" values="0.4;1.4" dur="1.5s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          {/* Radial glow for center */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
          
          {/* Strong glow filter */}
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feFlood floodColor="#FFD700" floodOpacity="0.5" result="glowColor" />
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense pulse glow */}
          <filter id="intenseGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="4" result="blur2" />
            <feFlood floodColor="#FFD700" floodOpacity="0.8" />
            <feComposite in2="blur1" operator="in" result="glow1" />
            <feMerge>
              <feMergeNode in="glow1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Spark filter */}
          <filter id="spark" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#FFFFFF" floodOpacity="1" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer rotating ring */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="185"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="10 20"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />
        
        {/* Second rotating ring - opposite direction */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="175"
          fill="none"
          stroke="#FFD700"
          strokeWidth="0.5"
          strokeOpacity="0.3"
          strokeDasharray="5 15"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />

        {/* Background glow pulse */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="100"
          fill="url(#centerGlow)"
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Connection lines from center to each clan - with energy flow */}
        {clanPositions.map((clan, index) => (
          <g key={`connection-group-${clan.name}`}>
            {/* Base connection line */}
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={clan.x}
              y2={clan.y}
              stroke="#D4AF37"
              strokeWidth="2"
              strokeOpacity="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: "easeOut",
              }}
            />
            {/* Glowing overlay line */}
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={clan.x}
              y2={clan.y}
              stroke="#FFD700"
              strokeWidth="3"
              filter="url(#strongGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 1, 0.5, 1, 0.5],
              }}
              transition={{
                pathLength: { duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" },
                opacity: { duration: 2, delay: 1, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </g>
        ))}

        {/* Pentagon connection lines between clans */}
        {clanPositions.map((clan, index) => {
          const nextClan = clanPositions[(index + 1) % clanPositions.length];
          return (
            <g key={`pentagon-${clan.name}`}>
              <motion.line
                x1={clan.x}
                y1={clan.y}
                x2={nextClan.x}
                y2={nextClan.y}
                stroke="#FFD700"
                strokeWidth="1.5"
                strokeOpacity="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1 + index * 0.08,
                  ease: "easeOut",
                }}
              />
            </g>
          );
        })}

        {/* Fast energy particles shooting from center to clans */}
        {clanPositions.map((clan, index) => (
          <g key={`particles-${clan.name}`}>
            {/* Primary particle */}
            <motion.circle
              r="5"
              fill="#FFD700"
              filter="url(#intenseGlow)"
              initial={{ opacity: 0 }}
              animate={{
                cx: [centerX, clan.x],
                cy: [centerY, clan.y],
                opacity: [0, 1, 1, 0],
                r: [3, 5, 3],
              }}
              transition={{
                duration: 1,
                delay: 1.5 + index * 0.2,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut",
              }}
            />
            {/* Secondary trailing particle */}
            <motion.circle
              r="3"
              fill="#FFFFFF"
              filter="url(#spark)"
              initial={{ opacity: 0 }}
              animate={{
                cx: [centerX, clan.x],
                cy: [centerY, clan.y],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 1,
                delay: 1.6 + index * 0.2,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut",
              }}
            />
          </g>
        ))}

        {/* Particles traveling around the pentagon */}
        {clanPositions.map((clan, index) => {
          const nextClan = clanPositions[(index + 1) % clanPositions.length];
          return (
            <motion.circle
              key={`ring-particle-${index}`}
              r="4"
              fill="#FFD700"
              filter="url(#strongGlow)"
              animate={{
                cx: [clan.x, nextClan.x],
                cy: [clan.y, nextClan.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 2.5 + index * 0.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "linear",
              }}
            />
          );
        })}

        {/* Center node - Omo Orimolusi with dramatic entrance */}
        <motion.g>
          {/* Multiple pulse rings */}
          {[50, 55, 60].map((r, i) => (
            <motion.circle
              key={`pulse-ring-${i}`}
              cx={centerX}
              cy={centerY}
              r={r}
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.5, 1], 
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                delay: 0.3 + i * 0.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Main center circle */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="40"
            fill="#1A3A2F"
            stroke="#FFD700"
            strokeWidth="4"
            filter="url(#intenseGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease }}
          />
          
          {/* Inner decorative ring */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="32"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          
          <motion.text
            x={centerX}
            y={centerY - 6}
            textAnchor="middle"
            fill="#FFD700"
            fontSize="10"
            fontWeight="bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            OMO
          </motion.text>
          <motion.text
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            fill="#FFD700"
            fontSize="8"
            fontWeight="bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            ORIMOLUSI
          </motion.text>
        </motion.g>

        {/* Clan nodes with enhanced animations */}
        {clanPositions.map((clan, index) => (
          <motion.g key={clan.name}>
            {/* Outer pulsing glow ring */}
            <motion.circle
              cx={clan.x}
              cy={clan.y}
              r="35"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.5, 1], 
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 1.8,
                delay: 1.2 + index * 0.15,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            
            {/* Secondary pulse ring */}
            <motion.circle
              cx={clan.x}
              cy={clan.y}
              r="32"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.8, 1], 
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2.2,
                delay: 1.5 + index * 0.15,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            
            {/* Main node circle */}
            <motion.circle
              cx={clan.x}
              cy={clan.y}
              r="28"
              fill="#1A3A2F"
              stroke="#FFD700"
              strokeWidth="3"
              filter="url(#strongGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.6 + index * 0.08,
                ease,
              }}
            />
            
            {/* Inner rotating decoration */}
            <motion.circle
              cx={clan.x}
              cy={clan.y}
              r="22"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.5"
              strokeDasharray="3 3"
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${clan.x}px ${clan.y}px` }}
            />
            
            {/* Clan name with glow */}
            <motion.text
              x={clan.x}
              y={clan.y + 4}
              textAnchor="middle"
              fill="#FFFAF0"
              fontSize="9"
              fontWeight="700"
              filter="url(#strongGlow)"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
            >
              {clan.name}
            </motion.text>
          </motion.g>
        ))}

        {/* Sparkling stars effect */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const r = 160 + (i % 3) * 15;
          const x = centerX + r * Math.cos(angle);
          const y = centerY + r * Math.sin(angle);
          return (
            <motion.circle
              key={`star-${i}`}
              cx={x}
              cy={y}
              r="2"
              fill="#FFFFFF"
              filter="url(#spark)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 2 + i * 0.25,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Energy burst from center - periodic */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="30"
          fill="none"
          stroke="#FFD700"
          strokeWidth="3"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ 
            scale: [1, 6], 
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 2,
            delay: 3,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeOut",
          }}
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen lg:min-h-[700px] flex items-center overflow-hidden bg-charcoal pt-14 md:pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70 z-10" />
        <img
          src={heroBg}
          alt="Ijebu Igbo aerial view at golden hour"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container-main relative z-20 py-8 sm:py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Yoruba welcome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mb-4 sm:mb-6"
            >
              <span className="text-accent text-lg sm:text-xl md:text-2xl font-display italic">
                Ẹ̀ wẹ̀ sọ̀ọ́ Ọmọ Alárè
              </span>
              <p className="text-primary-foreground/70 text-xs sm:text-sm md:text-base mt-1">
                Welcome, proud sons and daughters of Ijebu Igbo.
              </p>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primary-foreground leading-[1.15] mb-4 sm:mb-6 tracking-tight">
              Connecting Ijebu Igbo{" "}
              <span className="text-accent">Descendants</span>{" "}
              Across the World
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 font-sans max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
              Promoting culture, unity, and development for the progress of Ijebu Igbo at home and in the diaspora.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <JoinModal>
                <button className="btn-primary text-center w-full sm:w-auto">
                  Join the Community
                </button>
              </JoinModal>
              <a href="#impact" className="btn-outline-light text-center">
                Support Development
              </a>
            </div>
          </motion.div>

          {/* Right side - Clan Network Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[500px] aspect-square">
              <ClanNetwork />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
