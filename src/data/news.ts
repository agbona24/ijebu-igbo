export interface NewsImage {
  src: string;
  alt: string;
}

export interface NewsContentBlock {
  type: "paragraph" | "heading" | "quote";
  text: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  date: string;
  category: string;
  content: NewsContentBlock[];
  gallery?: NewsImage[];
}

const policeImages: NewsImage[] = Array.from({ length: 23 }, (_, i) => ({
  src: `/images/police_area_command/review${i + 1}.jpg`,
  alt: `Police Area Command Commissioning - Image ${i + 1}`,
}));

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "police-area-command-commissioning",
    title: "Commissioning of the New Police Area Command in Ijebu-Igbo",
    excerpt:
      "Ijebu-Igbo recently marked a significant milestone with the commissioning of the new Police Area Command, now officially the 14th Area Command in Ogun State.",
    featuredImage: "/images/police_area_command/review1.jpg",
    date: "March 2026",
    category: "Community Development",
    content: [
      {
        type: "paragraph",
        text: "Ijebu-Igbo recently marked a significant milestone with the commissioning of the new Police Area Command, now officially the 14th Area Command in Ogun State. The commissioning was performed by Her Excellency, Engr. Noimot Salako-Oyedele, the Deputy Governor of Ogun State.",
      },
      {
        type: "paragraph",
        text: "This historic event represents a major step forward in enhancing security infrastructure and ensuring the safety and well-being of the residents of Ijebu-Igbo and its surrounding communities.",
      },
      {
        type: "paragraph",
        text: "The new Police Area Command facility is equipped with modern amenities and resources, demonstrating the state government's commitment to providing effective policing and community safety. The presence of the Deputy Governor at the commissioning ceremony underscores the importance of this development to the region.",
      },
      {
        type: "paragraph",
        text: "Members of the Ijebu Igbo Descendants in Diaspora (IID), UK, join the entire community in celebrating this achievement, which will undoubtedly contribute to the continued growth and development of our beloved hometown.",
      },
    ],
    gallery: policeImages,
  },
];
