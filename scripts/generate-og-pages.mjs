/**
 * Post-build pre-rendering: writes a static index.html for every route with the
 * correct <title>, meta description, canonical, Open Graph and Twitter tags, so
 * social crawlers (WhatsApp, Facebook, Twitter) and search engines see the right
 * metadata WITHOUT running JavaScript. Also generates sitemap.xml.
 *
 * Runs automatically via: "build": "vite build && node scripts/generate-og-pages.mjs"
 *
 * Route metadata comes from src/config/seo.json (single source of truth shared
 * with the in-app <Seo> component). Business pages pull title/desc/image from
 * src/data/businesses.ts.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const seo = JSON.parse(fs.readFileSync(path.join(ROOT, "src/config/seo.json"), "utf-8"));
const { siteName, siteUrl, defaultImage, routes } = seo;

// ── Base HTML shell ───────────────────────────────────────────────────────────
const indexHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

function escape(str) {
  return (str ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function setMeta(html, property, content) {
  const escaped = escape(content);
  const attrRe = new RegExp(
    `(<meta\\s+(?:name|property)="${property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*content=")[^"]*(")`
  );
  if (attrRe.test(html)) return html.replace(attrRe, `$1${escaped}$2`);
  return html.replace("</head>", `  <meta property="${property}" content="${escaped}" />\n</head>`);
}

function setTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
}

function setCanonical(html, url) {
  const linkRe = /(<link\s+rel="canonical"\s+href=")[^"]*(")/;
  if (linkRe.test(html)) return html.replace(linkRe, `$1${escape(url)}$2`);
  return html.replace("</head>", `  <link rel="canonical" href="${escape(url)}" />\n</head>`);
}

function toAbsolute(image) {
  if (!image) return `${siteUrl}${defaultImage}`;
  return image.startsWith("http") ? image : `${siteUrl}${image}`;
}

function buildHtml({ title, description, image, url, type = "website" }) {
  let html = indexHtml;
  const img = toAbsolute(image);
  html = setTitle(html, title);
  html = setCanonical(html, url);
  html = setMeta(html, "description", description);
  html = setMeta(html, "og:title", title);
  html = setMeta(html, "og:description", description);
  html = setMeta(html, "og:image", img);
  html = setMeta(html, "og:url", url);
  html = setMeta(html, "og:type", type);
  html = setMeta(html, "og:site_name", siteName);
  html = setMeta(html, "twitter:card", "summary_large_image");
  html = setMeta(html, "twitter:title", title);
  html = setMeta(html, "twitter:description", description);
  html = setMeta(html, "twitter:image", img);
  return html;
}

function writeRoute(routePath, html) {
  if (routePath === "/") {
    fs.writeFileSync(path.join(DIST, "index.html"), html);
  } else {
    const dir = path.join(DIST, routePath.replace(/^\//, ""));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
  }
}

const sitemapUrls = [];
function addSitemap(routePath, priority = "0.7") {
  sitemapUrls.push({ loc: `${siteUrl}${routePath === "/" ? "" : routePath}`, priority });
}

// ── 1. Static routes from seo.json ────────────────────────────────────────────
let staticCount = 0;
for (const [routePath, meta] of Object.entries(routes)) {
  const url = `${siteUrl}${routePath === "/" ? "" : routePath}`;
  const html = buildHtml({ title: meta.title, description: meta.description, url });
  writeRoute(routePath, html);
  addSitemap(routePath, routePath === "/" ? "1.0" : "0.7");
  staticCount++;
  console.log(`  ✓  ${routePath}`);
}

// ── 2. Business profile pages ─────────────────────────────────────────────────
const businessSrc = fs.readFileSync(path.join(ROOT, "src/data/businesses.ts"), "utf-8");

function extractBusinesses(src) {
  const businesses = [];
  const blockRe = /\{\s*id:\s*(\d+),[\s\S]*?(?=\n  \{|\n\];)/g;
  let match;
  while ((match = blockRe.exec(src)) !== null) {
    const block = match[0];
    const get = (key) => {
      const m = block.match(new RegExp(`${key}:\\s*["'\`]([^"'\`]+)["'\`]`));
      return m ? m[1] : null;
    };
    const getMultiline = (key) => {
      const m = block.match(new RegExp(`${key}:\\s*\\n?\\s*["'\`]([\\s\\S]*?)["'\`],`));
      return m ? m[1].replace(/\s+/g, " ").trim() : null;
    };
    const slug = get("slug");
    const name = get("name");
    if (slug && name) {
      businesses.push({
        slug, name,
        tagline: get("tagline"),
        description: getMultiline("description") ?? get("description"),
        flyer: get("flyer"),
        banner: get("banner"),
      });
    }
  }
  return businesses;
}

let bizCount = 0;
for (const biz of extractBusinesses(businessSrc)) {
  const title = `${biz.name} | Ijebu Igbo Business Directory — Connect Ijebu Roots`;
  const desc = biz.tagline
    ? `${biz.tagline} — ${(biz.description ?? "").slice(0, 130)}...`
    : (biz.description ?? "").slice(0, 160);
  const routePath = `/businesses/${biz.slug}`;
  const html = buildHtml({
    title, description: desc,
    image: biz.flyer ?? biz.banner ?? defaultImage,
    url: `${siteUrl}${routePath}`,
  });
  writeRoute(routePath, html);
  addSitemap(routePath, "0.6");
  bizCount++;
  console.log(`  ✓  ${routePath}`);
}

// ── 3. Blog post pages ─────────────────────────────────────────────────────────
const blogSrc = fs.readFileSync(path.join(ROOT, "src/data/blogPosts.ts"), "utf-8");

function extractBlogPosts(src) {
  const posts = [];
  const blockRe = /\{\s*slug:\s*"([^"]+)"[\s\S]*?(?=\n  \{|\n\];)/g;
  let match;
  while ((match = blockRe.exec(src)) !== null) {
    const block = match[0];
    const get = (key) => {
      const m = block.match(new RegExp(`${key}:\\s*"([^"]*)"`));
      return m ? m[1] : null;
    };
    posts.push({
      slug: match[1],
      title: get("title"),
      excerpt: get("excerpt"),
      image: get("image"),
    });
  }
  return posts;
}

let blogCount = 0;
for (const post of extractBlogPosts(blogSrc)) {
  if (!post.slug || !post.title) continue;
  const title = `${post.title} | Ijebu Igbo Blog — IID`;
  const routePath = `/blog/${post.slug}`;
  const html = buildHtml({
    title,
    description: post.excerpt ?? "",
    image: post.image ?? defaultImage,
    url: `${siteUrl}${routePath}`,
    type: "article",
  });
  writeRoute(routePath, html);
  addSitemap(routePath, "0.6");
  blogCount++;
}
console.log(`  ✓  /blog (${blogCount} posts pre-rendered)`);

// ── 4. sitemap.xml ────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapUrls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);

console.log(`\nPre-rendered ${staticCount} static routes + ${bizCount} business pages.`);
console.log(`sitemap.xml: ${sitemapUrls.length} URLs.`);
