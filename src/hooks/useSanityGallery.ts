import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { GALLERY_QUERY } from "@/lib/sanityQueries";

export interface GalleryImage {
  src: string;
  alt: string;
}

const policeImages: GalleryImage[] = Array.from({ length: 23 }, (_, i) => ({
  src: `/images/police_area_command/review${i + 1}.jpg`,
  alt: `Police Area Command Commissioning - ${i + 1}`,
}));

const FALLBACK_GALLERY: GalleryImage[] = [
  { src: "/images/courtesy-call-orimolusi.jpeg", alt: "Courtesy Call to the Orimolusi of Ijebu Igbo" },
  { src: "/images/iid-carnival1.jpeg", alt: "IID Carnival 2025" },
  { src: "/images/iid-carnival2.jpeg", alt: "IID Carnival 2025" },
  { src: "/images/iid-carnival3.jpeg", alt: "IID Carnival 2025" },
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
