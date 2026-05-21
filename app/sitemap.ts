import { MetadataRoute } from "next";

// Real last-modified dates per content group.
// Update these when you actually modify the pages.
const DATES = {
  home: "2026-05-17",
  tools_index: "2026-05-17",
  categories: "2026-05-17",
  core_tools: "2026-05-17",
  new_tools: "2026-05-17",
  niche_tools: "2026-05-17",
  blog_index: "2026-05-17",
  blog_older: "2026-03-15",
  blog_recent: "2026-04-28",
  static: "2026-01-15",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://toolstack.tech";

  return [
    {
      url: base,
      lastModified: DATES.home,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/tools`,
      lastModified: DATES.tools_index,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...["ai", "writing", "seo", "marketing", "social", "business", "security", "utility", "finance", "math", "dev", "design", "video", "collectibles", "sports"].map(category => ({
      url: `${base}/tools/category/${category}`,
      lastModified: DATES.categories,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    // === Core tools (earliest batch) ===
    ...[
      "ai-prompt-generator",
      "meta-description-generator",
      "word-counter",
      "email-subject-line-tester",
      "hashtag-generator",
      "blog-title-generator",
      "password-generator",
      "qr-code-generator",
      "vat-calculator",
      "json-formatter",
      "business-name-generator",
      "email-signature-generator",
      "css-gradient-generator",
      "color-contrast-checker",
      "favicon-generator",
      "base64-encoder-decoder",
      "utm-builder",
      "markdown-editor",
      "regex-tester",
      "sql-formatter",
      "unix-timestamp-converter",
      "lorem-ipsum-generator",
      "character-counter",
      "youtube-tag-generator",
    ].map(slug => ({
      url: `${base}/tools/${slug}`,
      lastModified: DATES.core_tools,
      changeFrequency: "monthly" as const,
      priority: 0.95,
    })),
    // SQL formatter sub-pages
    ...["postgresql", "mysql", "sqlite", "tsql"].map(dialect => ({
      url: `${base}/tools/sql-formatter/${dialect}`,
      lastModified: DATES.core_tools,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // === Newer tools ===
    ...[
      "invoice-generator",
      "paraphrasing-tool",
      "grammar-checker",
      "text-summarizer",
      "case-converter",
      "cover-letter-generator",
      "tip-calculator",
      "mortgage-calculator",
      "percentage-calculator",
      "salary-calculator",
      "color-palette-generator",
      "age-calculator",
      "code-diff-checker",
      "jwt-decoder",
      "website-down-checker",
      "pdf-generator",
      "ip-address-lookup",
      "ssl-checker",
      "whois-lookup",
      "uuid-generator",
      "online-stopwatch",
      "compound-interest-calculator",
    ].map(slug => ({
      url: `${base}/tools/${slug}`,
      lastModified: DATES.new_tools,
      changeFrequency: "monthly" as const,
      priority: 0.95,
    })),
    // === Niche tools (collectibles/sports) ===
    ...[
      "card-grading-profit-calculator",
      "whatnot-seller-fee-calculator",
      "grading-company-comparison",
      "card-flip-roi-calculator",
      "card-box-break-calculator",
      "ebay-best-offer-calculator",
      "panini-sticker-calculator",
      "pack-break-ev-calculator",
      "world-cup-accumulator-calculator",
    ].map(slug => ({
      url: `${base}/tools/${slug}`,
      lastModified: DATES.niche_tools,
      changeFrequency: "monthly" as const,
      priority: 0.95,
    })),
    // === Blog ===
    {
      url: `${base}/blog`,
      lastModified: DATES.blog_index,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...[
      "what-are-utm-parameters",
      "json-formatting-guide-for-developers",
      "how-to-write-cold-email-subject-lines",
      "perfect-meta-description-anatomy",
      "mastering-json-visual-guide",
      "understanding-case-sensitivity",
    ].map(slug => ({
      url: `${base}/blog/${slug}`,
      lastModified: DATES.blog_older,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...[
      "what-is-my-ip-address",
      "ssl-certificate-checker-guide",
      "is-it-down-or-just-me",
      "how-to-create-pdf-free",
      "what-is-a-jwt-token",
      "how-to-generate-qr-code-wifi",
      "regex-cheat-sheet-beginners",
      "best-ai-tools-for-optimizing-product-visibility",
      "what-are-productivity-tools",
      "what-is-base64-encoding",
    ].map(slug => ({
      url: `${base}/blog/${slug}`,
      lastModified: DATES.blog_recent,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // === New pillar blog posts (May 2026) ===
    ...[
      "complete-guide-to-free-seo-tools",
      "ai-writing-tools-ultimate-guide",
      "essential-free-developer-tools",
    ].map(slug => ({
      url: `${base}/blog/${slug}`,
      lastModified: "2026-05-08",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/blog/why-every-ai-tool-has-a-paywall-problem`,
      lastModified: "2026-05-09",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/blog/ai-prompt-generator-guide`,
      lastModified: "2026-05-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/blog/word-count-checker-guide`,
      lastModified: "2026-05-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/blog/email-subject-line-tester-guide`,
      lastModified: "2026-05-13",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/blog/best-free-online-tools-2026`,
      lastModified: "2026-05-14",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/blog/hashtag-generator-guide`,
      lastModified: "2026-05-14",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    // === New posts (May 2026 — ATP research) ===
    ...[
      "how-to-improve-developer-productivity",
      "what-is-a-uuid",
    ].map(slug => ({
      url: `${base}/blog/${slug}`,
      lastModified: "2026-05-10",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // === Review blogs (May 2026 — affiliate) ===
    {
      url: `${base}/blog/postiz-review`,
      lastModified: "2026-05-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/blog/genspark-for-word-review`,
      lastModified: "2026-05-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/blog/rankspot-review`,
      lastModified: "2026-05-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/blog/aweber-review`,
      lastModified: "2026-05-17",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/blog/password-generator-guide`,
      lastModified: "2026-05-18",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/tools/password-breach-checker`,
      lastModified: "2026-05-18",
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${base}/blog/utm-builder-guide`,
      lastModified: "2026-05-19",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/blog/cover-letter-generator-guide`,
      lastModified: "2026-05-21",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/tools/credit-card-rewards-optimizer`,
      lastModified: "2026-05-18",
      changeFrequency: "monthly",
      priority: 0.95,
    },
    // === Static pages ===
    {
      url: `${base}/about`,
      lastModified: DATES.static,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/privacy`,
      lastModified: DATES.static,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: DATES.static,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/contact`,
      lastModified: DATES.static,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
