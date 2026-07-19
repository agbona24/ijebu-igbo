import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { GALLERY_QUERY } from "@/lib/sanityQueries";

export interface GalleryImage {
  src: string;
  alt: string;
}

const policeImages: GalleryImage[] = Array.from({ length: 23 }, (_, i) => ({
  src: `/images/police_area_command/review${i + 1}.webp`,
  alt: `Police Area Command Commissioning - ${i + 1}`,
}));

const FALLBACK_GALLERY: GalleryImage[] = [
  { src: "/images/aafin-orimolusi-palace.webp", alt: "Aafin Orimolusi, the palace of the Orimolusi of Ijebu Igbo" },
  { src: "/images/ijebu-igbo-council-of-obas.webp", alt: "The Ijebu Igbo Council of Obas" },
  { src: "/images/oba-jaiyeoba-portrait.webp", alt: "Oba Lawrence Jaiyeoba Adebajo, the reigning Orimolusi" },
  { src: "/images/atikori/atikori-market.webp", alt: "Atikori Market" },
  { src: "/images/atikori/atikori-football-team.webp", alt: "Atikori Football Team" },
  { src: "/images/oke-sopen/customary-court.webp", alt: "Oke-Sopen Customary Court" },
  { src: "/images/japara/japara-current-chiefs.webp", alt: "Japara Quarter Chiefs" },
  { src: "/images/ojowo/ojowo-important-places.webp", alt: "Important places in Ojowo" },
  ...policeImages,
];

export function useSanityGallery() {
  return useQuery<GalleryImage[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!isSanityConfigured) return FALLBACK_GALLERY;
      try {
        const results = await sanityClient.fetch<GalleryImage[]>(GALLERY_QUERY);
        return results?.length ? results : FALLBACK_GALLERY;
      } catch {
        return FALLBACK_GALLERY;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_GALLERY,
  });
}
