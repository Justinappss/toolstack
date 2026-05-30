#!/usr/bin/env node
// Pre-deploy SOP compliance checker
// Run: node scripts/sop-check.js tool <slug>
//      node scripts/sop-check.js blog <slug>

const fs = require("fs");
const path = require("path");

const [,, type, slug] = process.argv;

if (!type || !slug) {
  console.error("Usage: node scripts/sop-check.js [tool|blog] <slug>");
  process.exit(1);
}

const root = path.join(__dirname, "..");
let failures = [];
let passes = [];

function check(label, condition) {
  if (condition) passes.push(`  ✅  ${label}`);
  else failures.push(`  ❌  ${label}`);
}

function fileContains(filePath, ...strings) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return strings.every(s => content.includes(s));
  } catch { return false; }
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// ─── TOOL CHECKS ─────────────────────────────────────────────────────────────
if (type === "tool") {
  const dir = path.join(root, "app/tools", slug);
  const page = path.join(dir, "page.tsx");
  const layout = path.join(dir, "layout.tsx");
  const toolData = path.join(root, "app/tools/tool-data.ts");
  const homePage = path.join(root, "app/page.tsx");
  const footer = path.join(root, "components/Footer.tsx");
  const moreTools = path.join(root, "components/MoreTools.tsx");
  const sitemap = path.join(root, "app/sitemap.ts");
  const llms = path.join(root, "public/llms.txt");

  check("page.tsx exists", fileExists(page));
  check("layout.tsx exists", fileExists(layout));
  check("layout.tsx has metadata export", fileContains(layout, "export const metadata"));
  check("layout.tsx has canonical URL", fileContains(layout, "canonical"));
  check("layout.tsx has openGraph", fileContains(layout, "openGraph"));
  check("page.tsx has AdvertiseGPTBanner", fileContains(page, "AdvertiseGPTBanner"));
  check("page.tsx has MoreTools", fileContains(page, "MoreTools"));
  check("page.tsx has JSON-LD WebApplication schema", fileContains(page, "WebApplication"));
  check("page.tsx has JSON-LD BreadcrumbList schema", fileContains(page, "BreadcrumbList"));
  check("page.tsx has JSON-LD FAQPage schema", fileContains(page, "FAQPage"));
  check("page.tsx has 'use client'", fileContains(page, '"use client"'));
  check("page.tsx has breadcrumb nav", fileContains(page, "breadcrumb", "Breadcrumb") || fileContains(page, "ToolStack"));
  check("tool-data.ts has slug", fileContains(toolData, slug));
  check("app/page.tsx LIVE_TOOLS has slug", fileContains(homePage, slug));
  check("Footer.tsx has slug", fileContains(footer, slug));
  check("MoreTools.tsx has slug", fileContains(moreTools, slug));
  check("sitemap.ts has slug", fileContains(sitemap, slug));
  check("llms.txt has slug", fileContains(llms, slug));

  const toolSearch = path.join(root, "components/ToolSearch.tsx");
  const componentsDir = path.join(root, "components");
  const slugWords = slug.replace(/-\d+$/, "").split("-").filter(w => w.length > 2);
  const hasThumbnailFile = fs.readdirSync(componentsDir).some(f =>
    f.endsWith("Thumbnail.tsx") && slugWords.every(w => f.toLowerCase().includes(w.toLowerCase()))
  );
  const toolSearchContent = fs.existsSync(toolSearch) ? fs.readFileSync(toolSearch, "utf8") : "";
  const hasThumbnailRegistered = slugWords.every(w => toolSearchContent.toLowerCase().includes(w.toLowerCase()));
  check("Thumbnail component exists in components/", hasThumbnailFile);
  check("ToolSearch.tsx registers thumbnail", hasThumbnailRegistered);
}

// ─── BLOG CHECKS ─────────────────────────────────────────────────────────────
if (type === "blog") {
  const dir = path.join(root, "app/blog", slug);
  const page = path.join(dir, "page.tsx");
  const blogList = path.join(root, "app/blog/page.tsx");
  const sitemap = path.join(root, "app/sitemap.ts");
  const llms = path.join(root, "public/llms.txt");
  const authorAvatar = path.join(root, "public/blog", slug, "author-avatar.jpg");
  const heroBanner = path.join(root, "public/blog", slug);

  check("page.tsx exists", fileExists(page));
  check("author-avatar.jpg exists", fileExists(authorAvatar));
  check("page.tsx has ArticleSchema or JSON-LD", fileContains(page, "Article") || fileContains(page, "application/ld+json"));
  check("page.tsx has AdvertsGPT link", fileContains(page, "advertsgpt.com"));
  check("page.tsx has ToolStack inline CTA (green card)", fileContains(page, "10b981") || fileContains(page, "toolstack.tech/tools"));
  check("page.tsx has author avatar Image (not initials fallback)", fileContains(page, "author-avatar"));
  check("page.tsx has FAQPage or FAQ section", fileContains(page, "FAQ") || fileContains(page, "faq"));
  check("blog/page.tsx listing includes slug", fileContains(blogList, slug));
  check("sitemap.ts has slug", fileContains(sitemap, slug));
  check("llms.txt has slug", fileContains(llms, slug));
  check("Affiliate link present", fileContains(page, "bit.ly") || fileContains(page, "beehiiv") || fileContains(page, "aweber") || fileContains(page, "via="));

  // Check hero banner image exists
  const bannerFiles = fileExists(heroBanner) ? fs.readdirSync(heroBanner) : [];
  check("Hero banner image exists in public/blog/slug/", bannerFiles.some(f => f.includes("hero") || f.includes("banner") || f.includes("og")));
}

// ─── REPORT ──────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(52)}`);
console.log(` SOP CHECK — ${type.toUpperCase()}: ${slug}`);
console.log(`${"─".repeat(52)}`);

if (passes.length) {
  console.log(`\nPASSED (${passes.length}):`);
  passes.forEach(p => console.log(p));
}

if (failures.length) {
  console.log(`\nFAILED (${failures.length}):`);
  failures.forEach(f => console.log(f));
  console.log(`\n🚫  DO NOT DEPLOY — fix the ${failures.length} failure(s) above first.\n`);
  process.exit(1);
} else {
  console.log(`\n✅  ALL CHECKS PASSED — safe to deploy.\n`);
  process.exit(0);
}
