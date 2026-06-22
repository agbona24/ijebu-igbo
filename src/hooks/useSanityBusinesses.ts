import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { BUSINESSES_QUERY } from "@/lib/sanityQueries";
import { BUSINESSES, type Business } from "@/data/businesses";

export function useSanityBusinesses() {
  return useQuery<Business[]>({
    queryKey: ["businesses"],
    queryFn: async () => {
      if (!isSanityConfigured) return BUSINESSES;
      try {
        const results = await sanityClient.fetch<Business[]>(BUSINESSES_QUERY);
        return results?.length ? results : BUSINESSES;
      } catch {
        return BUSINESSES;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: BUSINESSES,
  });
}
