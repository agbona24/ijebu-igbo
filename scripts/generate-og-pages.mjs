/**
 * Post-build script: generates a pre-rendered index.html for every business
 * profile page so that social crawlers (WhatsApp, Facebook, Twitter, Google)
 * see the correct title, description, and image meta tags.
 *
 * Run automatically via: "build": "vite build && node scripts/generate-og-pages.mjs"
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SITE_URL = "https://ijebu-igbo-descendants-in-diaspora.vercel.app";

// ── Read business data from the built JS bundle ───────────────────────────────
// We extract the data directly from the source so we don't need to re-bundle.
// The source is plain TS with no browser APIs, so we read it as text and eval
// the JSON-serialisable fields via a tiny regex extractor.

const businessSrc = fs.readFileSync(
  path.join(ROOT, "src/data/businesses.ts"),
  "utf-8"
);

// Extract each business block as a JS object using a lightweight approach:
// we parse only the fields we need for OG tags.
function extractBusinesses(src) {
  const businesses = [];
  // Match each { id: N, slug: "...", name: "...", ... } block
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
    const slug    = get("slug");
    const name    = get("name");
    const tagline = get("tagline");
    const desc    = getMultiline("description") ?? get("description");
    const flyer   = get("flyer");
    const banner  = get("banner");
    if (slug && name) {
      businesses.push({ slug, name, tagline, description: desc, flyer, banner });
    }
  }
  return businesses;
}

const businesses = extractBusinesses(businessSrc);

// ── Load the base index.html ──────────────────────────────────────────────────
const indexHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

function escape(str) {
  return (str ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function setMeta(html, property, content) {
  const escaped = escape(content);
  // Try to replace existing tag
  const attrRe = new RegExp(
    `(<meta\\s+(?:name|property)="${property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*content=")[^"]*(")`
  );
  const attrRe2 = new RegExp(
    `(<meta\\s+content="[^"]*"\\s+(?:name|property)="${property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>)`
  );
  if (attrRe.test(html))  return html.replace(attrRe,  `$1${escaped}$2`);
  // Insert before </head> if not found
  return html.replace("</head>", `  <meta property="${property}" content="${escaped}" />\n</head>`);
}

function setTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
}

let generated = 0;

for (const biz of businesses) {
  const title = `${biz.name} | Ijebu Igbo Business Directory — Connect Ijebu Roots`;
  const desc  = biz.tagline
    ? `${biz.tagline} — ${(biz.description ?? "").slice(0, 130)}...`
    : (biz.description ?? "").slice(0, 160);
  const image = biz.flyer ?? biz.banner ?? "/logo.png";
  const url   = `${SITE_URL}/businesses/${biz.slug}`;

  let html = indexHtml;
  html = setTitle(html, title);
  html = setMeta(html, "description",         desc);
  html = setMeta(html, "og:title",            title);
  html = setMeta(html, "og:description",      desc);
  html = setMeta(html, "og:image",            image);
  html = setMeta(html, "og:url",              url);
  html = setMeta(html, "og:type",             "website");
  html = setMeta(html, "twitter:title",       title);
  html = setMeta(html, "twitter:description", desc);
  html = setMeta(html, "twitter:image",       image);
  html = setMeta(html, "twitter:card",        "summary_large_image");

  const dir = path.join(DIST, "businesses", biz.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log(`  ✓  /businesses/${biz.slug}`);
  generated++;
}

console.log(`\nOG pages generated: ${generated}`);
