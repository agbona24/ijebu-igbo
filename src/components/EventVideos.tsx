import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Film, ChevronRight } from "lucide-react";

type VideoTag = "Royal Visit" | "Ojude Oba" | "Carnival" | "Community" | "Live Stream" | "Performance";

interface EventVideo {
  id: number;
  title: string;
  description: string;
  src?: string;
  youtubeId?: string;
  date: string;
  credit?: string;
  tag: VideoTag;
  featured?: boolean;
}

const TAG_COLORS: Record<VideoTag, string> = {
  "Royal Visit":   "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Ojude Oba":     "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Carnival":      "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Community":     "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Live Stream":   "bg-red-500/20 text-red-300 border-red-500/30",
  "Performance":   "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

const ALL_TAGS: VideoTag[] = ["Royal Visit", "Ojude Oba", "Carnival", "Community", "Live Stream", "Performance"];

const EVENT_VIDEOS: EventVideo[] = [
  {
    id: 9,
    title: "Full Live Stream — Ojude Oba 2026, Ijebu Igbo",
    description:
      "The full live stream of Ojude Oba 2026, Ijebu Igbo — capturing every moment of the grand cultural celebration in its entirety.",
    youtubeId: "KbInaslfyrk",
    date: "Ojude Oba Orimolusi 2026",
    credit: "Raw Radio",
    tag: "Live Stream",
    featured: true,
  },
  {
    id: 1,
    title: "Royal Welcome — Alayeluwa Oba Aderemi Adewale Ogunye (Part 1)",
    description:
      "Alayeluwa Oba Aderemi Adewale Ogunye, The Kotolori-Ojuule I, Abijaparako of Japara, receives a royal welcome by IID Omo Orimolusi in Diaspora members in London.",
    src: "/videos/events/oba-royal-welcome-london1.mp4",
    date: "London, United Kingdom",
    tag: "Royal Visit",
  },
  {
    id: 2,
    title: "Royal Welcome — Alayeluwa Oba Aderemi Adewale Ogunye (Part 2)",
    description:
      "Continuation of the royal welcome ceremony for Alayeluwa Oba Aderemi Adewale Ogunye, The Kotolori-Ojuule I, Abijaparako of Japara, hosted by IID Omo Orimolusi in Diaspora in London.",
    src: "/videos/events/oba-royal-welcome-london2.mp4",
    date: "London, United Kingdom",
    tag: "Royal Visit",
  },
  {
    id: 4,
    title: "A Royal Gift for Ojude Oba Orimolusi 2026",
    description:
      "Kabiyesi HRM Oba Jaiyeoba Adebajo is presented with a magnificent new horse as a special gift for Ojude Oba Orimolusi 2026 — a powerful symbol of royalty, honour, and cultural heritage.",
    src: "/videos/events/kabiyesi-horse-gift-ojude-oba-2026.mp4",
    date: "Ojude Oba Orimolusi 2026",
    tag: "Ojude Oba",
  },
  {
    id: 5,
    title: "Otunba Atunlunto of Ilugun Graces Ojude Oba Orimolusi 2026",
    description:
      "Otunba Atunlunto of Ilugun — alongside his beautiful Brazilian wife, friends from Brazil, and family — graces Ojude Oba Orimolusi 2026 in a magnificent display of royalty, elegance, and cultural heritage.",
    src: "/videos/events/ojude-oba-2026-otunba-atunlunto.mp4",
    date: "Ojude Oba Orimolusi 2026",
    tag: "Ojude Oba",
  },
  {
    id: 6,
    title: "Nollywood Stars Grace Ojude Oba Orimolusi 2026",
    description:
      "Nollywood stars grace Ojude Oba Orimolusi 2026 in magnificent grand style, adding glamour, culture, and prestige to the historic celebration.",
    src: "/videos/events/ojude-oba-2026-nollywood-stars.mp4",
    date: "Ojude Oba Orimolusi 2026",
    tag: "Performance",
  },
  {
    id: 10,
    title: "Saheed Osupa Thrills at Ojude Oba Orimolusi 2026",
    description:
      "Fuji music star Saheed Osupa thrills the people of Ijebu Igbo with melodious music, energetic performances, and unforgettable moments of dance and celebration.",
    src: "/videos/events/ojude-oba-2026-saheed-osupa.mp4",
    date: "Ojude Oba Orimolusi 2026",
    credit: "MarvelTvUpdates",
    tag: "Performance",
  },
  {
    id: 7,
    title: "IID Carnival 2025",
    description:
      "Members of IID Omo Orimolusi in Diaspora come alive at IID Carnival 2025 — a vibrant celebration of culture, colour, music, and community spirit.",
    src: "/videos/events/iid-carnival-2025.mp4",
    date: "IID Omo Orimolusi in Diaspora, 2025",
    tag: "Carnival",
  },
  {
    id: 11,
    title: "IID Carnival 2025 (Part 2)",
    description:
      "More highlights from IID Carnival 2025 — continuing the vibrant celebration of culture, colour, music, and community spirit.",
    src: "/videos/events/iid-carnival-2025-2.mp4",
    date: "IID Omo Orimolusi in Diaspora, 2025",
    tag: "Carnival",
  },
  {
    id: 8,
    title: "IID Carnival 2025 (Part 3)",
    description:
      "Further highlights from IID Carnival 2025 — more moments of culture, colour, music, and community celebration.",
    src: "/videos/events/iid-carnival-3.mp4",
    date: "IID Omo Orimolusi in Diaspora, 2025",
    tag: "Carnival",
  },
  {
    id: 3,
    title: "IID New Year Party",
    description:
      "Members of IID Omo Orimolusi in Diaspora come together to celebrate the new year in style — a joyful evening of music, culture, and community.",
    src: "/videos/events/iid-new-year-party.mp4",
    date: "IID Omo Orimolusi in Diaspora",
    tag: "Community",
  },
];

// ── Video Player Card ─────────────────────────────────────────────────────────
function VideoCard({ video, index, large = false }: { video: EventVideo; index: number; large?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded]   = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted]     = useState(false);

  const handleFirstPlay = () => setLoaded(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying((v) => !v);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((v) => !v);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl overflow-hidden border border-white/10
                  bg-white/5 backdrop-blur-sm shadow-xl hover:shadow-2xl
                  hover:border-accent/40 transition-all duration-300 flex flex-col`}
    >
      {/* Video area */}
      <div className={`relative bg-black ${large ? "aspect-video" : "aspect-video"} overflow-hidden`}>

        {/* Glow ring on hover */}
        <div className="absolute inset-0 rounded-t-2xl ring-0 group-hover:ring-2 ring-accent/30 transition-all duration-300 z-10 pointer-events-none" />

        {/* ── YouTube ── */}
        {video.youtubeId && !loaded && (
          <button onClick={handleFirstPlay} className="absolute inset-0 w-full h-full" aria-label="Play video">
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent flex items-center justify-center shadow-[0_0_30px_rgba(180,140,60,0.5)]"
              >
                <Play className="text-black ml-1" size={large ? 32 : 26} fill="currentColor" />
              </motion.div>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="text-xs font-bold text-white/70 bg-black/50 px-2 py-1 rounded-full">▶ Click to play</span>
            </div>
          </button>
        )}
        {video.youtubeId && loaded && (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}

        {/* ── Local MP4 ── */}
        {video.src && !loaded && (
          <button onClick={handleFirstPlay} className="absolute inset-0 w-full h-full group/play" aria-label="Play video">
            {/* Gradient placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-black/80" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent flex items-center justify-center shadow-[0_0_30px_rgba(180,140,60,0.5)] group-hover/play:shadow-[0_0_50px_rgba(180,140,60,0.7)] transition-shadow duration-300"
              >
                <Play className="text-black ml-1" size={large ? 32 : 26} fill="currentColor" />
              </motion.div>
              <p className="text-white/60 text-xs font-medium px-6 text-center line-clamp-1">{video.title}</p>
            </div>
          </button>
        )}
        {video.src && loaded && (
          <>
            <video
              ref={videoRef}
              src={video.src}
              className="w-full h-full object-cover"
              onEnded={() => setPlaying(false)}
              onCanPlay={() => { videoRef.current?.play(); setPlaying(true); }}
              preload="none"
              playsInline
            />
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-[0_0_30px_rgba(180,140,60,0.5)]"
                >
                  <Play className="text-black ml-1" size={26} fill="currentColor" />
                </motion.button>
              </div>
            )}
            {/* Controls bar */}
            <div className="absolute bottom-0 inset-x-0 flex items-center gap-2 px-3 py-2.5
                            bg-gradient-to-t from-black/80 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button onClick={togglePlay} className="text-white hover:text-accent transition-colors">
                {playing ? <Pause size={17} /> : <Play size={17} />}
              </button>
              <button onClick={toggleMute} className="text-white hover:text-accent transition-colors">
                {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <div className="flex-1" />
              <button onClick={() => videoRef.current?.requestFullscreen()} className="text-white hover:text-accent transition-colors">
                <Maximize size={15} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${TAG_COLORS[video.tag]}`}>
            {video.tag}
          </span>
          <span className="text-[10px] text-white/40 ml-auto">{video.date}</span>
        </div>
        <h3 className={`font-display font-bold text-white leading-snug
                        ${large ? "text-lg sm:text-xl" : "text-sm sm:text-base"}`}>
          {video.title}
        </h3>
        <p className={`text-white/55 leading-relaxed flex-1 ${large ? "text-sm" : "text-xs"} line-clamp-2`}>
          {video.description}
        </p>
        {video.credit && (
          <p className="text-[10px] text-white/30 mt-1">Courtesy of {video.credit}</p>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function EventVideos() {
  const [activeTag, setActiveTag] = useState<VideoTag | "All">("All");

  const featured = EVENT_VIDEOS.find((v) => v.featured);
  const rest = EVENT_VIDEOS.filter((v) => !v.featured);

  const filtered = activeTag === "All"
    ? rest
    : rest.filter((v) => v.tag === activeTag);

  return (
    <section className="bg-[#0d0d0d] border-t border-white/10 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25
                            text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              <Film size={12} />
              Video Archive
            </div>
            <h2 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
              Relive the <span className="text-accent">Moments</span>
            </h2>
            <p className="text-white/50 text-sm mt-2 max-w-lg">
              Royal visits, cultural festivals, carnival celebrations, and community milestones —
              all captured and preserved for generations to come.
            </p>
          </div>
          <div className="text-white/30 text-sm font-semibold shrink-0">
            {EVENT_VIDEOS.length} videos
          </div>
        </motion.div>

        {/* ── Featured video ── */}
        {featured && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Featured</span>
            </div>
            <VideoCard video={featured} index={0} large />
          </div>
        )}

        {/* ── Filter tabs ── */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <button
            onClick={() => setActiveTag("All")}
            className={`text-xs font-bold px-4 py-1.5 rounded-full border transition-all duration-200 ${
              activeTag === "All"
                ? "bg-accent text-black border-accent"
                : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
            }`}
          >
            All
          </button>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? "All" : tag)}
              className={`text-xs font-bold px-4 py-1.5 rounded-full border transition-all duration-200 ${
                activeTag === tag
                  ? "bg-accent text-black border-accent"
                  : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Video grid ── */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 text-center text-white/30"
              >
                <Film size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-semibold">No videos in this category yet</p>
                <button onClick={() => setActiveTag("All")} className="mt-2 text-sm text-accent hover:underline flex items-center gap-1 mx-auto">
                  View all videos <ChevronRight size={14} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
