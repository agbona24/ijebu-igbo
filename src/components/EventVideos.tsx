import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface EventVideo {
  id: number;
  title: string;
  description: string;
  src?: string;
  youtubeId?: string;
  date: string;
  credit?: string;
}

const EVENT_VIDEOS: EventVideo[] = [
  {
    id: 1,
    title: "Royal Welcome — Alayeluwa Oba Aderemi Adewale Ogunye (Part 1)",
    description:
      "Alayeluwa Oba Aderemi Adewale Ogunye, The Kotolori-Ojuule I, Abijaparako of Japara, receives a royal welcome by IID Omo Orimolusi in Diaspora members in London.",
    src: "/videos/events/oba-royal-welcome-london1.mp4",
    date: "London, United Kingdom",
  },
  {
    id: 2,
    title: "Royal Welcome — Alayeluwa Oba Aderemi Adewale Ogunye (Part 2)",
    description:
      "Continuation of the royal welcome ceremony for Alayeluwa Oba Aderemi Adewale Ogunye, The Kotolori-Ojuule I, Abijaparako of Japara, hosted by IID Omo Orimolusi in Diaspora in London.",
    src: "/videos/events/oba-royal-welcome-london2.mp4",
    date: "London, United Kingdom",
  },
  {
    id: 3,
    title: "IID New Year Party",
    description:
      "Members of IID Omo Orimolusi in Diaspora come together to celebrate the new year in style — a joyful evening of music, culture, and community.",
    src: "/videos/events/iid-new-year-party.mp4",
    date: "IID Omo Orimolusi in Diaspora",
  },
  {
    id: 4,
    title: "A Royal Gift for Ojude Oba Orimolusi 2026",
    description:
      "Kabiyesi HRM Oba Jaiyeoba Adebajo is presented with a magnificent new horse as a special gift for Ojude Oba Orimolusi 2026 by Egbe Bobagunwa Asiwaju Orimolu — a powerful symbol of royalty, honour, unity, and the rich cultural heritage of Ijebu Igbo.",
    src: "/videos/events/kabiyesi-horse-gift-ojude-oba-2026.mp4",
    date: "Ojude Oba Orimolusi 2026",
  },
  {
    id: 5,
    title: "Otunba Atunlunto of Ilugun Graces Ojude Oba Orimolusi 2026",
    description:
      "Otunba Atunlunto of Ilugun, Otunba Simon Olalekan Oluwole — distinguished CEO of Fecund Empire — alongside his beautiful Brazilian wife, friends from Brazil, and family members, graces Ojude Oba Orimolusi 2026 in a magnificent display of royalty, elegance, dignity, and the rich beauty of Ijebu cultural heritage.",
    src: "/videos/events/ojude-oba-2026-otunba-atunlunto.mp4",
    date: "Ojude Oba Orimolusi 2026",
  },
  {
    id: 6,
    title: "Nollywood Stars Grace Ojude Oba Orimolusi 2026",
    description:
      "Nollywood stars grace Ojude Oba Orimolusi 2026 in magnificent grand style, adding glamour, culture, and prestige to the historic celebration.",
    src: "/videos/events/ojude-oba-2026-nollywood-stars.mp4",
    date: "Ojude Oba Orimolusi 2026",
  },
  {
    id: 7,
    title: "IID Carnival 2025",
    description:
      "Members of IID Omo Orimolusi in Diaspora come alive at the IID Carnival 2025 — a vibrant celebration of culture, colour, music, and community spirit.",
    src: "/videos/events/iid-carnival-2025.mp4",
    date: "IID Omo Orimolusi in Diaspora, 2025",
  },
  {
    id: 8,
    title: "IID Carnival 2025 (Part 3)",
    description:
      "Further highlights from IID Carnival 2025 — more moments of culture, colour, music, and community celebration.",
    src: "/videos/events/iid-carnival-3.mp4",
    date: "IID Omo Orimolusi in Diaspora, 2025",
  },
  {
    id: 11,
    title: "IID Carnival 2025 (Part 2)",
    description:
      "More highlights from IID Carnival 2025 — continuing the vibrant celebration of culture, colour, music, and community spirit.",
    src: "/videos/events/iid-carnival-2025-2.mp4",
    date: "IID Omo Orimolusi in Diaspora, 2025",
  },
  {
    id: 9,
    title: "Full Live Stream — Ojude Oba 2026, Ijebu Igbo",
    description:
      "The full live stream of Ojude Oba 2026, Ijebu Igbo — capturing every moment of the grand cultural celebration in its entirety.",
    youtubeId: "KbInaslfyrk",
    date: "Ojude Oba Orimolusi 2026",
    credit: "Raw Radio",
  },
  {
    id: 10,
    title: "Saheed Osupa Thrills at Ojude Oba Orimolusi 2026",
    description:
      "Ojude Oba Orimolusi 2026 ends on a glorious and successful note as popular Fuji music star Saheed Osupa thrills the people of Ijebu Igbo with melodious music, energetic performances, and unforgettable moments of dance and celebration.",
    src: "/videos/events/ojude-oba-2026-saheed-osupa.mp4",
    date: "Ojude Oba Orimolusi 2026",
    credit: "MarvelTvUpdates",
  },
];

function VideoCard({ video, index }: { video: EventVideo; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleFirstPlay = () => {
    setLoaded(true);
    // play starts after the video element mounts via the autoPlay on the element
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying((v) => !v);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((v) => !v);
  };

  const openFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Video player */}
      <div className="relative aspect-video bg-charcoal group">

        {/* ── YouTube embed ── */}
        {video.youtubeId && !loaded && (
          <button
            onClick={handleFirstPlay}
            className="absolute inset-0 w-full h-full"
            aria-label="Play video"
          >
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Play className="text-charcoal ml-1" size={28} fill="currentColor" />
              </div>
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

        {/* ── Local mp4 ── */}
        {video.src && !loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
            <div className="text-center px-4">
              <button
                onClick={handleFirstPlay}
                className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-110 transition-transform mx-auto mb-3"
                aria-label="Play video"
              >
                <Play className="text-charcoal ml-1" size={28} fill="currentColor" />
              </button>
              <p className="text-white/50 text-xs">{video.title}</p>
            </div>
          </div>
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  aria-label="Play video"
                >
                  <Play className="text-charcoal ml-1" size={28} fill="currentColor" />
                </button>
              </div>
            )}

            <div className="absolute bottom-0 inset-x-0 flex items-center gap-2 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={togglePlay} className="text-white hover:text-accent transition-colors" aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button onClick={toggleMute} className="text-white hover:text-accent transition-colors" aria-label={muted ? "Unmute" : "Mute"}>
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <div className="flex-1" />
              <button onClick={openFullscreen} className="text-white hover:text-accent transition-colors" aria-label="Fullscreen">
                <Maximize size={16} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{video.date}</p>
        <h3 className="font-display font-bold text-foreground text-base sm:text-lg leading-snug mb-2">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{video.description}</p>
        {video.credit && (
          <p className="text-xs text-muted-foreground/60 mt-3">Courtesy of {video.credit}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function EventVideos() {
  return (
    <section className="bg-white border-t border-border py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="label-accent">Event Highlights</h2>
          <h3 className="heading-section">Video Archive</h3>
          <p className="text-body mt-2 max-w-xl">
            Relive key moments from our community events, royal visits, and cultural gatherings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENT_VIDEOS.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
