import { useEffect } from "react";
import { useSound, useSoundManager } from "@/hooks/use-sound";

export default function AmbiencePlayer() {
  const { ambienceEnabled } = useSoundManager();
  const { play, pause, isPlaying } = useSound("/sounds/gangan-ambience.mp3", {
    loop: true,
    volume: 0.15,
    autoplay: false,
  });

  useEffect(() => {
    if (ambienceEnabled && !isPlaying) {
      // Small delay to avoid autoplay restrictions
      const timer = setTimeout(() => {
        play();
      }, 300);
      return () => clearTimeout(timer);
    } else if (!ambienceEnabled && isPlaying) {
      pause();
    }
  }, [ambienceEnabled, isPlaying, play, pause]);

  return null; // This component doesn't render anything
}
