import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { KINGS_QUERY } from "@/lib/sanityQueries";
import { kings, type King } from "@/data/kings";

export function useSanityKings() {
  return useQuery<King[]>({
    queryKey: ["kings"],
    queryFn: async () => {
      if (!isSanityConfigured) return kings;
      try {
        const results = await sanityClient.fetch<King[]>(KINGS_QUERY);
        return results?.length ? results : kings;
      } catch {
        return kings;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: kings,
  });
}
