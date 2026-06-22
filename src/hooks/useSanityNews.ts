import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { NEWS_QUERY } from "@/lib/sanityQueries";
import { NEWS_ARTICLES, type NewsArticle } from "@/data/news";

export function useSanityNews() {
  return useQuery<NewsArticle[]>({
    queryKey: ["news"],
    queryFn: async () => {
      if (!isSanityConfigured) return NEWS_ARTICLES;
      try {
        const results = await sanityClient.fetch<NewsArticle[]>(NEWS_QUERY);
        return results?.length ? results : NEWS_ARTICLES;
      } catch {
        return NEWS_ARTICLES;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: NEWS_ARTICLES,
  });
}
