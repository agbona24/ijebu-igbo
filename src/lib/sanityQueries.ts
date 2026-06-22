export const NEWS_QUERY = `
  *[_type == "newsArticle"] | order(_createdAt desc) {
    id,
    title,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    date,
    category,
    content,
    "gallery": gallery[]{
      "src": asset->url,
      alt
    }
  }
`;

export const BUSINESSES_QUERY = `
  *[_type == "business"] | order(id asc) {
    id,
    slug,
    name,
    category,
    tagline,
    description,
    location,
    phone,
    whatsapp,
    email,
    website,
    "flyer": flyer.asset->url,
    "banner": banner.asset->url,
    "promoVideo": promoVideo.asset->url,
    "gallery": gallery[].asset->url,
    services,
    serviceCategories,
    whatWeDo,
    "values": values[]{title, description, items},
    focusAreas,
    partners,
    hours,
    social,
    ownerName,
    established,
    featured,
    benefits,
    testimonials,
    region
  }
`;

export const KINGS_QUERY = `
  *[_type == "king"] | order(_createdAt asc) {
    slug,
    name,
    fullTitle,
    subtitle,
    author,
    reign,
    status,
    "photo": photo.asset->url,
    "photos": photos[].asset->url,
    hometown,
    born,
    died,
    quote,
    quoteAuthor,
    biography,
    achievements,
    titles
  }
`;

export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(order asc) {
    name,
    role,
    "photo": photo.asset->url,
    group
  }
`;

export const EVENTS_QUERY = `
  *[_type == "event"] | order(order asc) {
    title,
    date,
    time,
    location,
    description,
    upcoming
  }
`;

export const GALLERY_QUERY = `
  *[_type == "galleryImage"] | order(order asc) {
    "src": image.asset->url,
    alt
  }
`;

export const EVENT_VIDEOS_QUERY = `
  *[_type == "eventVideo"] | order(order asc) {
    id,
    title,
    description,
    "src": videoFile.asset->url,
    youtubeId,
    date,
    credit,
    tag,
    featured
  }
`;
