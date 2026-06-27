export type Clan =
  | "Oke-Agbo" | "Oke-Sopen" | "Itamarun" | "Irolu" | "Oke-Odode"
  | "Parakoyi" | "Oke-Lowo" | "Ita-Ntebo" | "Oke-Eri" | "Ijasi"
  | "Imope" | "Ago" | "Ogbe" | "Ojowo" | "Atikori" | "Other";

export interface Member {
  id: string;
  name: string;
  clan: Clan;
  location: string; // UK city or "Other Diaspora"
  role?: string; // e.g. "Executive Member", "General Member"
  photo?: string;
  joinedYear?: number;
}

// Add members here manually as the list grows
export const MEMBERS: Member[] = [];
