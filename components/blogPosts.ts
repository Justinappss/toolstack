// Blog registry — powers <RelatedPosts/> (topic-clustered internal linking
// rendered under every article via app/blog/layout.tsx). Keeps articles on the
// same topic linked together so Google sees real topical clusters.
export type BlogTopic = "dev" | "seo" | "writing" | "marketing" | "security" | "finance" | "reviews" | "general";
export type BlogPost = { slug: string; title: string; topic: BlogTopic };

export const BLOG_POSTS: BlogPost[] = [
  { slug: "ai-prompt-generator-guide", title: "Prompt Engineering: A Complete Guide to Writing Better AI Prompts", topic: "writing" },
  { slug: "ai-writing-tools-ultimate-guide", title: "AI Writing Tools Ultimate Guide: How to Write Better, Faster in 2026", topic: "writing" },
  { slug: "blog-title-generator", title: "SEO Blog Title Generator: Write Titles That Rank and Get Clicked", topic: "writing" },
  { slug: "cover-letter-generator-guide", title: "How to Write a Cover Letter That Gets Interviews", topic: "writing" },
  { slug: "how-to-tailor-cover-letter-to-job-description", title: "How to Tailor Your Cover Letter to the Job Description", topic: "writing" },
  { slug: "word-count-checker-guide", title: "Word Count Checker Guide: Limits, Readability & Reading Time", topic: "writing" },

  { slug: "essential-free-developer-tools", title: "Essential Free Developer Tools: The Complete Developer Toolbox for 2026", topic: "dev" },
  { slug: "how-to-improve-developer-productivity", title: "How to Improve Developer Productivity: 9 Free Browser Tools", topic: "dev" },
  { slug: "json-formatting-guide-for-developers", title: "JSON Formatting Guide for Developers: Syntax, Validation & Common Errors", topic: "dev" },
  { slug: "mastering-json-visual-guide", title: "JSON for Beginners: A Visual Guide to Formatting & Validation", topic: "dev" },
  { slug: "regex-cheat-sheet-beginners", title: "Regex Cheat Sheet for Beginners: The Patterns You Actually Use", topic: "dev" },
  { slug: "understanding-case-sensitivity", title: "camelCase vs snake_case vs PascalCase: When to Use Each", topic: "dev" },
  { slug: "what-is-a-jwt-token", title: "What Is a JWT Token? Structure, Claims & How to Decode One", topic: "dev" },
  { slug: "what-is-a-uuid", title: "What Is a UUID? Format, Versions & When to Use One", topic: "dev" },
  { slug: "what-is-base64-encoding", title: "What Is Base64 Encoding and When Should You Use It?", topic: "dev" },

  { slug: "best-ai-tools-for-optimizing-product-visibility", title: "Best AI Tools for Optimizing Product Visibility in 2026", topic: "seo" },
  { slug: "complete-guide-to-free-seo-tools", title: "What Is an SEO Tool? DIY SEO Tools Guide: Boost Your Rankings in 2026", topic: "seo" },
  { slug: "free-meta-description-generator", title: "Free Meta Description Generator: Stop Google Rewriting Your Snippets", topic: "seo" },
  { slug: "google-ai-search-redesign-2026", title: "Google's AI Search Redesign 2026: What It Means for Your Traffic", topic: "seo" },
  { slug: "how-to-rank-in-google-ai-overviews-2026", title: "How to Rank in Google AI Overviews (2026)", topic: "seo" },
  { slug: "perfect-meta-description-anatomy", title: "The Anatomy of a Perfect Meta Description (With Examples)", topic: "seo" },

  { slug: "email-subject-line-tester-guide", title: "Email Subject Lines That Get Opened: The Complete Guide", topic: "marketing" },
  { slug: "email-subject-line-tester", title: "Email Subject Line Tester: Score Your Subject Lines", topic: "marketing" },
  { slug: "hashtag-generator-guide", title: "How to Use Hashtags for Reach: The Complete Guide", topic: "marketing" },
  { slug: "how-to-write-cold-email-subject-lines", title: "How to Write Cold Email Subject Lines That Actually Get Opened", topic: "marketing" },
  { slug: "utm-builder-guide", title: "The Complete UTM Builder Guide (With Examples)", topic: "marketing" },
  { slug: "what-are-utm-parameters", title: "What Are UTM Parameters? A Plain-English Guide with Examples", topic: "marketing" },

  { slug: "password-generator-guide", title: "Best Free Password Generator 2026: Create Strong Passwords Instantly", topic: "security" },
  { slug: "ssl-certificate-checker-guide", title: "SSL Certificate Explained: What It Is, How to Check It & When It Expires", topic: "security" },
  { slug: "is-it-down-or-just-me", title: "Is It Down or Just Me? How to Check if a Website Is Down", topic: "security" },
  { slug: "website-down-checker", title: "Website Down Checker: Check, Alert & Fix Downtime (2026)", topic: "security" },
  { slug: "what-is-my-ip-address", title: "What Is My IP Address and What Can It Reveal?", topic: "security" },
  { slug: "how-to-use-ip-address-lookup", title: "How to Use an IP Address Lookup Tool", topic: "security" },

  { slug: "how-a-compound-interest-calculator-works-plain-english", title: "How Does a Compound Interest Calculator Work? (Plain English)", topic: "finance" },
  { slug: "salary-after-tax-uk-us-2025", title: "Salary After Tax 2025: UK vs US — What You Actually Take Home", topic: "finance" },
  { slug: "vat-calculator-guide", title: "How to Calculate VAT: Adding & Removing VAT Explained", topic: "finance" },

  { slug: "aweber-review", title: "AWeber Review 2026: Still the Best Email Marketing Tool for Creators?", topic: "reviews" },
  { slug: "aweber-vs-beehiiv", title: "AWeber vs Beehiiv: Why Creators Are Switching After the Price Hike (2026)", topic: "reviews" },
  { slug: "genspark-for-word-review", title: "Genspark for Word Review 2026: Can This AI Add-in Beat Microsoft Copilot?", topic: "reviews" },
  { slug: "opus-clip-alternatives", title: "Is Opus Clip Still King? We Tested 3 New AI Rivals (2026)", topic: "reviews" },
  { slug: "opus-clip-review", title: "Opus Clip Review 2026: Does AI Video Repurposing Actually Save You Time?", topic: "reviews" },
  { slug: "postiz-review", title: "Postiz Review (2026): The Open-Source Agentic Social Media Scheduler", topic: "reviews" },
  { slug: "rankspot-review", title: "RankSpot Review 2026: Does This AI SEO Autopilot Actually Rank Your Blog?", topic: "reviews" },

  { slug: "best-free-online-tools-2026", title: "The Best Free Online Tools for 2026", topic: "general" },
  { slug: "free-youtube-transcript-extractor-no-signup-no-limits", title: "Free YouTube Transcript Extractor — No Signup, No Limits, No Paywall", topic: "general" },
  { slug: "how-to-create-pdf-free", title: "How to Create a PDF for Free — No Word, No Adobe Required", topic: "general" },
  { slug: "how-to-generate-qr-code-wifi", title: "How to Generate a QR Code for Your WiFi (No App Needed)", topic: "general" },
  { slug: "what-are-productivity-tools", title: "What Are Productivity Tools? A Complete Guide for 2026", topic: "general" },
  { slug: "why-every-ai-tool-has-a-paywall-problem", title: "Why Every AI Tool Has a Paywall Problem (And How to Fix It)", topic: "general" },
  { slug: "pokemon-tcg-pocket-pull-rates", title: "Pokémon TCG Pocket Pull Rates Explained", topic: "general" },
];

// Up to `limit` other posts sharing the current post's topic.
export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = BLOG_POSTS.find((p) => p.slug === slug);
  if (!current) return [];
  return BLOG_POSTS.filter((p) => p.topic === current.topic && p.slug !== slug).slice(0, limit);
}
