import { Helmet } from "react-helmet-async";
import seoConfig from "@/config/seo.json";

type RouteMeta = { title: string; description: string };
const routes = seoConfig.routes as Record<string, RouteMeta>;

interface Props {
  /** Route path to pull title/description from src/config/seo.json (e.g. "/heritage"). */
  path?: string;
  /** Explicit overrides — used for dynamic pages (news posts, business profiles). */
  title?: string;
  description?: string;
  /** Absolute or root-relative image for Open Graph / Twitter cards. */
  image?: string;
  /** Open Graph type (default "website"; use "article" for news posts). */
  type?: string;
  /** Canonical URL path (defaults to `path`). */
  canonicalPath?: string;
  /** Optional JSON-LD structured data object. */
  jsonLd?: Record<string, unknown>;
}

export default function Seo({ path, title, description, image, type = "website", canonicalPath, jsonLd }: Props) {
  const cfg = path ? routes[path] : undefined;
  const resolvedTitle = title ?? cfg?.title ?? seoConfig.siteName;
  const resolvedDesc = description ?? cfg?.description ?? "";
  const resolvedImage = (image ?? seoConfig.defaultImage).startsWith("http")
    ? (image ?? seoConfig.defaultImage)
    : `${seoConfig.siteUrl}${image ?? seoConfig.defaultImage}`;
  const urlPath = canonicalPath ?? path ?? "/";
  const canonical = `${seoConfig.siteUrl}${urlPath}`;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:site_name" content={seoConfig.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={seoConfig.twitterCard} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={resolvedImage} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
