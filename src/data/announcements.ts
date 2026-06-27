export type AnnouncementCategory = "Birth" | "Obituary" | "Congratulations" | "Notice" | "Achievement";

export interface Announcement {
  id: string;
  category: AnnouncementCategory;
  title: string;
  body: string;
  date: string; // ISO date string
  postedBy?: string;
  imageUrl?: string;
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "notice-agm-2026",
    category: "Notice",
    title: "Annual General Meeting 2026 — Minutes Now Available",
    body: "The minutes from the 2026 Annual General Meeting are now available to all members. Please contact the General Secretary to receive a copy. Key resolutions included the approval of the Unity House construction budget and the election of the new welfare officer.",
    date: "2026-04-20",
    postedBy: "Ms. Adetutu Ogunsanwo, General Secretary",
  },
  {
    id: "congrats-scholarship-2025",
    category: "Congratulations",
    title: "Congratulations to Our 2025 Scholarship Recipients",
    body: "IID Omo Orimolusi in Diaspora congratulates all students who received the 2025 community scholarship. Your dedication to education makes us proud. We wish you continued success in your academic pursuits.",
    date: "2025-10-05",
    postedBy: "Chief Toyin Odueyungbo, President",
  },
];

export const CATEGORY_STYLES: Record<AnnouncementCategory, { color: string; bg: string; border: string }> = {
  Birth:           { color: "text-pink-700",   bg: "bg-pink-50",   border: "border-pink-200" },
  Obituary:        { color: "text-slate-700",  bg: "bg-slate-100", border: "border-slate-300" },
  Congratulations: { color: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-200" },
  Notice:          { color: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200" },
  Achievement:     { color: "text-emerald-700",bg: "bg-emerald-50",border: "border-emerald-200" },
};
