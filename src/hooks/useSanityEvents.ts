import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { EVENTS_QUERY } from "@/lib/sanityQueries";

export interface SanityEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  upcoming: boolean;
}

const FALLBACK_EVENTS: SanityEvent[] = [
  {
    title: "Annual General Meeting 2026",
    date: "April 15, 2026",
    time: "10:00 AM GMT",
    location: "Virtual (Zoom)",
    description: "Join us for the annual review of achievements, financial reporting, and strategic plans for the coming year. All members are strongly encouraged to attend.",
    upcoming: false,
  },
  {
    title: "Ojude Oba Cultural Festival",
    date: "June 20, 2026",
    time: "All Day",
    location: "Ijebu Igbo, Nigeria",
    description: "Experience the grandeur of Ojude Oba — a celebration of Yoruba royalty, culture, equestrian displays, and the living heritage of Ijebu Igbo.",
    upcoming: false,
  },
  {
    title: "Diaspora Networking Gala",
    date: "August 10, 2026",
    time: "6:00 PM EST",
    location: "London, United Kingdom",
    description: "An evening of networking, cultural performances, and fundraising for community projects.",
    upcoming: true,
  },
  {
    title: "Education Scholarship Drive",
    date: "October 5, 2026",
    time: "2:00 PM WAT",
    location: "Lagos, Nigeria",
    description: "Supporting the next generation of Ijebu Igbo scholars through merit-based scholarships.",
    upcoming: true,
  },
];

export function useSanityEvents() {
  return useQuery<SanityEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      if (!isSanityConfigured) return FALLBACK_EVENTS;
      try {
        const results = await sanityClient.fetch<SanityEvent[]>(EVENTS_QUERY);
        return results?.length ? results : FALLBACK_EVENTS;
      } catch {
        return FALLBACK_EVENTS;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: FALLBACK_EVENTS,
  });
}
