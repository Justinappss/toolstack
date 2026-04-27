"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ALL_TOOLS = [
  {
    title: "AI Prompt Generator",
    desc: "Generate expert-level prompts for ChatGPT, Claude & Gemini using RISEN, STAR, and 5 other proven frameworks.",
    href: "/tools/ai-prompt-generator",
    category: "AI",
    accent: "#818cf8",
    accentRgb: "129,140,248",
    badge: "Popular",
    icon: "✦",
  },
  {
    title: "Word Counter",
    desc: "Count words, characters, and sentences in real time. Includes Flesch readability score and estimated reading time.",
    href: "/tools/word-counter",
    category: "Writing",
    accent: "#34d399",
    accentRgb: "52,211,153",
    badge: null,
    icon: "≡",
  },
  {
    title: "Meta Description Generator",
    desc: "Generate high-CTR meta descriptions with GPT-4o. Includes a live Google SERP preview of your snippet.",
    href: "/tools/meta-description-generator",
    category: "SEO",
    accent: "#60a5fa",
    accentRgb: "96,165,250",
    badge: null,
    icon: "⌖",
  },
  {
    title: "Email Subject Line Tester",
    desc: "Score your email subject lines for open rate potential, spam triggers, and length. Get AI-suggested alternatives.",
    href: "/tools/email-subject-line-tester",
    category: "Marketing",
    accent: "#f472b6",
    accentRgb: "244,114,182",
    badge: null,
    icon: "✉",
  },
  {
    title: "Hashtag Generator",
    desc: "AI-powered hashtag sets for Instagram, TikTok, and LinkedIn. Three-tier strategy for maximum reach.",
    href: "/tools/hashtag-generator",
    category: "Social",
    accent: "#a78bfa",
    accentRgb: "167,139,250",
    badge: null,
    icon: "#",
  },
  {
    title: "Blog Title Generator",
    desc: "Generate 10 click-worthy blog title variations with GPT-4o. SEO, curiosity, and contrarian frameworks.",
    href: "/tools/blog-title-generator",
    category: "Writing",
    accent: "#34d399",
    accentRgb: "52,211,153",
    badge: null,
    icon: "✍",
  },
  {
    title: "Password Generator",
    desc: "Generate strong, random passwords with custom length and character sets. Runs 100% in your browser, nothing stored.",
    href: "/tools/password-generator",
    category: "Security",
    accent: "#4ade80",
    accentRgb: "74,222,128",
    badge: null,
    icon: "⚿",
  },
  {
    title: "QR Code Generator",
    desc: "Generate high-resolution QR codes for URLs, WiFi, email, and more. No expiry, no watermark, no signup.",
    href: "/tools/qr-code-generator",
    category: "Utility",
    accent: "#22d3ee",
    accentRgb: "34,211,238",
    badge: null,
    icon: "⬛",
  },
  {
    title: "VAT Calculator",
    desc: "Calculate VAT and GST for 40+ countries. Standard and reduced rates, reverse VAT extraction, full breakdowns.",
    href: "/tools/vat-calculator",
    category: "Finance",
    accent: "#fbbf24",
    accentRgb: "251,191,36",
    badge: null,
    icon: "🧮",
  },
  {
    title: "JSON Formatter",
    desc: "Format, validate, and minify JSON online. Syntax error highlighting with exact line positions. Runs in your browser.",
    href: "/tools/json-formatter",
    category: "Dev",
    accent: "#10b981",
    accentRgb: "16,185,129",
    badge: null,
    icon: "{ }",
  },
  {
    title: "Invoice Generator",
    desc: "Create professional PDF invoices instantly. No watermarks, no signup, supports VAT/GST and multiple currencies.",
    href: "/tools/invoice-generator",
    category: "Finance",
    accent: "#fbbf24",
    accentRgb: "251,191,36",
    badge: null,
    icon: "🧾",
  },
  {
    title: "Paraphrasing Tool",
    desc: "Rewrite text in 6 modes — Standard, Fluency, Formal, Academic, Creative, and Shorten. Powered by GPT-4o.",
    href: "/tools/paraphrasing-tool",
    category: "Writing",
    accent: "#34d399",
    accentRgb: "52,211,153",
    badge: null,
    icon: "↔",
  },
  {
    title: "Grammar Checker",
    desc: "Check and fix grammar, spelling, and punctuation with GPT-4o. Clear explanations for every correction.",
    href: "/tools/grammar-checker",
    category: "Writing",
    accent: "#34d399",
    accentRgb: "52,211,153",
    badge: null,
    icon: "✓",
  },
  {
    title: "Text Summarizer",
    desc: "Summarise any text with GPT-4o. Four modes: Paragraph, Bullets, Key Takeaways, and Executive Brief.",
    href: "/tools/text-summarizer",
    category: "Writing",
    accent: "#34d399",
    accentRgb: "52,211,153",
    badge: null,
    icon: "¶",
  },
  {
    title: "Case Converter",
    desc: "Convert text between UPPERCASE, lowercase, camelCase, snake_case, kebab-case, PascalCase, and more. Instant.",
    href: "/tools/case-converter",
    category: "Utility",
    accent: "#22d3ee",
    accentRgb: "34,211,238",
    badge: null,
    icon: "Aa",
  },
  {
    title: "Lorem Ipsum Generator",
    desc: "Generate placeholder text in paragraphs, sentences, words, or HTML format. Classic Lorem Ipsum or randomised.",
    href: "/tools/lorem-ipsum-generator",
    category: "Utility",
    accent: "#22d3ee",
    accentRgb: "34,211,238",
    badge: null,
    icon: "¶",
  },
  {
    title: "Cover Letter Generator",
    desc: "Generate ATS-friendly cover letters with GPT-4o. Four tone modes: Professional, Confident, Creative, and Concise.",
    href: "/tools/cover-letter-generator",
    category: "Writing",
    accent: "#34d399",
    accentRgb: "52,211,153",
    badge: null,
    icon: "✉",
  },
  {
    title: "Character Counter",
    desc: "Count characters in real time. Platform-specific limits for Twitter, LinkedIn, Instagram, and SMS shown side by side.",
    href: "/tools/character-counter",
    category: "Writing",
    accent: "#34d399",
    accentRgb: "52,211,153",
    badge: null,
    icon: "Abc",
  },
  {
    title: "Business Name Generator",
    desc: "Generate creative business name ideas with GPT-4o. Filter by style — classic, modern, playful, or technical.",
    href: "/tools/business-name-generator",
    category: "Business",
    accent: "#fb923c",
    accentRgb: "251,146,60",
    badge: "Elite",
    icon: "❖",
  },
  {
    title: "YouTube Tag Generator",
    desc: "Generate relevant YouTube tags and description hooks with GPT-4o. Improve video search visibility.",
    href: "/tools/youtube-tag-generator",
    category: "SEO",
    accent: "#60a5fa",
    accentRgb: "96,165,250",
    badge: null,
    icon: "📹",
  },
  {
    title: "Email Signature Generator",
    desc: "Create professional HTML email signatures for Gmail, Outlook & Apple Mail. 4 templates, social links, free.",
    href: "/tools/email-signature-generator",
    category: "Utility",
    accent: "#22d3ee",
    accentRgb: "34,211,238",
    badge: null,
    icon: "✉",
  },
  {
    title: "CSS Gradient Generator",
    desc: "Visual CSS gradient editor — linear, radial & conic. 12+ presets, multi-stop colour control, real-time CSS output.",
    href: "/tools/css-gradient-generator",
    category: "Dev",
    accent: "#10b981",
    accentRgb: "16,185,129",
    badge: null,
    icon: "🎨",
  },
  {
    title: "Colour Contrast Checker",
    desc: "Check your colour combinations against WCAG 2.1 accessibility guidelines for AA and AAA compliance. Ensures readable, accessible web design.",
    href: "/tools/color-contrast-checker",
    category: "Design",
    accent: "#e879f9",
    accentRgb: "232,121,249",
    badge: null,
    icon: "👁️",
  },
  {
    title: "Favicon Generator",
    desc: "Generate perfectly sized standard favicons from text or emoji. Creates PNGs, Apple Touch Icons, and more in seconds.",
    href: "/tools/favicon-generator",
    category: "Dev",
    accent: "#10b981",
    accentRgb: "16,185,129",
    badge: null,
    icon: "🌟",
  },
  {
    title: "Base64 Encoder & Decoder",
    desc: "Instantly encode standard text or decode Base64 strings. Runs securely client-side for 100% data privacy.",
    href: "/tools/base64-encoder-decoder",
    category: "Dev",
    accent: "#10b981",
    accentRgb: "16,185,129",
    badge: null,
    icon: "🔐",
  },
  {
    title: "UTM Campaign Builder",
    desc: "Generate perfectly structured monitoring links with UTM parameters to attribute traffic flawlessly in Google Analytics.",
    href: "/tools/utm-builder",
    category: "Marketing",
    accent: "#f472b6",
    accentRgb: "244,114,182",
    badge: null,
    icon: "🎯",
  },
  {
    title: "Markdown Editor",
    desc: "Write Markdown with real-time visual previews and instantly export standard semantic HTML for any CMS.",
    href: "/tools/markdown-editor",
    category: "Writing",
    accent: "#34d399",
    accentRgb: "52,211,153",
    badge: null,
    icon: "📝",
  },
  {
    title: "Regex Tester",
    desc: "Visually debug Regular Expressions on the fly with syntax highlighting, live indexing, and loop protection.",
    href: "/tools/regex-tester",
    category: "Dev",
    accent: "#10b981",
    accentRgb: "16,185,129",
    badge: null,
    icon: "🔬",
  },
  {
    title: "SQL Formatter",
    desc: "Beautify raw, minified database queries into perfectly indented, readable syntax.",
    href: "/tools/sql-formatter",
    category: "Dev",
    accent: "#10b981",
    accentRgb: "16,185,129",
    badge: null,
    icon: "🗄️",
  },
  {
    title: "Epoch Converter",
    desc: "Instantly translate Unix epoch integers into formatted dates across timezones.",
    href: "/tools/unix-timestamp-converter",
    category: "Dev",
    accent: "#10b981",
    accentRgb: "16,185,129",
    badge: null,
    icon: "⏱️",
  },
  {
    title: "Tip Calculator",
    desc: "Calculate tips and split bills instantly. Tipping customs for 20+ countries, service presets, and per-person amounts.",
    href: "/tools/tip-calculator",
    category: "Finance",
    accent: "#fbbf24",
    accentRgb: "251,191,36",
    badge: null,
    icon: "🍽️",
  },
  {
    title: "Mortgage Calculator",
    desc: "Monthly payments, total interest, and full amortisation schedule. Repayment and interest-only mortgages. 15 currencies.",
    href: "/tools/mortgage-calculator",
    category: "Finance",
    accent: "#fbbf24",
    accentRgb: "251,191,36",
    badge: "New",
    icon: "🏠",
  },
  {
    title: "Percentage Calculator",
    desc: "Six calculators in one: find a percentage, calculate increase/decrease, percentage change, and percentage difference.",
    href: "/tools/percentage-calculator",
    category: "Math",
    accent: "#f97316",
    accentRgb: "249,115,22",
    badge: "New",
    icon: "%",
  },
  {
    title: "Salary Calculator",
    desc: "Calculate take-home pay after tax. Full UK PAYE 2024/25 and US Federal 2024 with complete deductions breakdown.",
    href: "/tools/salary-calculator",
    category: "Finance",
    accent: "#fbbf24",
    accentRgb: "251,191,36",
    badge: null,
    icon: "💷",
  },
  {
    title: "Code Diff Checker",
    desc: "Compare two code blocks or text files side-by-side with visual diff highlighting. Runs 100% in your browser — fully private.",
    href: "/tools/code-diff-checker",
    category: "Dev",
    accent: "#10b981",
    accentRgb: "16,185,129",
    badge: null,
    icon: "⇄",
  },
  {
    title: "JWT Decoder",
    desc: "Decode any JSON Web Token instantly. View header, payload, and all claims. Check expiry, issuer, and subject. 100% client-side.",
    href: "/tools/jwt-decoder",
    category: "Dev",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    badge: "New",
    icon: "🔑",
  },
  {
    title: "Website Down Checker",
    desc: "Check if any website is down or just you. See HTTP status code, response time, and server availability instantly.",
    href: "/tools/website-down-checker",
    category: "Dev",
    accent: "#34d399",
    accentRgb: "52,211,153",
    badge: "New",
    icon: "🌐",
  },
  {
    title: "AI Color Palette Generator",
    desc: "Describe your brand or project in plain words and get a perfect 5-color palette with hex codes, CSS variables, Tailwind config and usage guidance.",
    href: "/tools/color-palette-generator",
    category: "Design",
    accent: "#e879f9",
    accentRgb: "232,121,249",
    badge: null,
    icon: "🎨",
  },
  {
    title: "Age Calculator",
    desc: "Calculate your exact age in years, months, days, hours and minutes. Get your zodiac sign, generation, days until next birthday, and more. Free, instant.",
    href: "/tools/age-calculator",
    category: "Utility",
    accent: "#22d3ee",
    accentRgb: "34,211,238",
    badge: null,
    icon: "🎂",
  },
  {
    title: "PDF Generator",
    desc: "Type or paste your text, choose font and page size, and download a clean PDF instantly. No watermarks, no signup, 100% private.",
    href: "/tools/pdf-generator",
    category: "Utility",
    accent: "#ef4444",
    accentRgb: "239,68,68",
    badge: null,
    icon: "📄",
  },
  {
    title: "IP Address Lookup",
    desc: "Find your public IP address, location, ISP, timezone and hostname instantly. Also look up any IP address for geolocation data.",
    href: "/tools/ip-address-lookup",
    category: "Utility",
    accent: "#818cf8",
    accentRgb: "129,140,248",
    badge: "New",
    icon: "🌍",
  },
  {
    title: "SSL Certificate Checker",
    desc: "Check any website's SSL certificate. See validity, days until expiry, issuer and covered domains. Free, instant, no signup.",
    href: "/tools/ssl-checker",
    category: "Security",
    accent: "#34d399",
    accentRgb: "52,211,153",
    badge: null,
    icon: "🔒",
  },
  {
    title: "WHOIS Domain Lookup",
    desc: "Check domain registration date, expiry, registrar and nameservers. See who owns any domain — free, instant.",
    href: "/tools/whois-lookup",
    category: "Utility",
    accent: "#f97316",
    accentRgb: "249,115,22",
    badge: "New",
    icon: "🔎",
  },
  {
    title: "Compound Interest Calculator",
    desc: "Calculate how your investment grows with compounding. Add monthly contributions and see year-by-year balance breakdown.",
    href: "/tools/compound-interest-calculator",
    category: "Finance",
    accent: "#fbbf24",
    accentRgb: "251,191,36",
    badge: null,
    icon: "📈",
  },
  {
    title: "UUID Generator",
    desc: "Generate UUID v4, v1, v5, ULID and NanoID in bulk. Uppercase, no-hyphens and braces formatting. Copy all or download as .txt.",
    href: "/tools/uuid-generator",
    category: "Dev",
    accent: "#38bdf8",
    accentRgb: "56,189,248",
    badge: null,
    icon: "⟨/⟩",
  },
  {
    title: "YouTube Thumbnail Downloader",
    desc: "Download any YouTube video thumbnail in all available resolutions — HD, SD, and default. Paste a URL and get all sizes instantly.",
    href: "/tools/youtube-thumbnail-downloader",
    category: "Video",
    accent: "#ff0000",
    accentRgb: "255,0,0",
    badge: "New",
    icon: "▶",
  },
  {
    title: "Online Stopwatch",
    desc: "Free stopwatch with lap times and countdown timer. Accurate to the millisecond. Keyboard shortcuts, copy laps, runs in your browser.",
    href: "/tools/online-stopwatch",
    category: "Utility",
    accent: "#38bdf8",
    accentRgb: "56,189,248",
    badge: "New",
    icon: "⏱",
  },
  {
    title: "Card Grading Profit Calculator",
    desc: "Is grading your card worth it? Calculate profit and ROI across PSA, BGS, SGC and CSG. Includes eBay fee breakdown and grader comparison.",
    href: "/tools/card-grading-profit-calculator",
    category: "Collectibles",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    badge: "New",
    icon: "🏆",
  },
  {
    title: "Whatnot Seller Fee Calculator",
    desc: "Calculate your Whatnot commission, payment processing fees and net payout by category. Side-by-side eBay comparison included.",
    href: "/tools/whatnot-seller-fee-calculator",
    category: "Collectibles",
    accent: "#f97316",
    accentRgb: "249,115,22",
    badge: null,
    icon: "🔥",
  },
  {
    title: "Grading Company Comparison",
    desc: "PSA vs BGS vs SGC vs CGC — fees, turnaround times and resale value side-by-side. Personalised grader recommendation included.",
    href: "/tools/grading-company-comparison",
    category: "Collectibles",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    badge: "New",
    icon: "⚖️",
  },
  {
    title: "Card Flip ROI Calculator",
    desc: "Calculate exact profit after eBay fees, shipping and costs on any card flip. Multi-platform comparison and break-even calculator built in.",
    href: "/tools/card-flip-roi-calculator",
    category: "Collectibles",
    accent: "#10b981",
    accentRgb: "16,185,129",
    badge: "New",
    icon: "📈",
  },
  {
    title: "Card Box Break Calculator",
    desc: "Price your break spots to cover box cost, platform fees and shipping. See profit at 50%, 75% and 100% fill rates. Whatnot and eBay fees built in.",
    href: "/tools/card-box-break-calculator",
    category: "Collectibles",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    badge: "New",
    icon: "🎰",
  },
  {
    title: "eBay Best Offer Calculator",
    desc: "Calculate your break-even offer and get an Accept, Counter or Decline recommendation for any eBay Best Offer. Full profit breakdown at every price level.",
    href: "/tools/ebay-best-offer-calculator",
    category: "Collectibles",
    accent: "#3b82f6",
    accentRgb: "59,130,246",
    badge: "New",
    icon: "🏷️",
  },
];

const CATEGORIES = ["All", "AI", "Writing", "SEO", "Marketing", "Social", "Business", "Security", "Utility", "Finance", "Math", "Dev", "Design", "Video", "Collectibles"];

const CATEGORY_MAP: Record<string, string> = {
  ai: "AI",
  writing: "Writing",
  seo: "SEO",
  marketing: "Marketing",
  social: "Social",
  security: "Security",
  utility: "Utility",
  finance: "Finance",
  dev: "Dev",
  business: "Business",
  math: "Math",
  design: "Design",
  video: "Video",
  collectibles: "Collectibles",
};

function ToolsGrid() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam ? (CATEGORY_MAP[categoryParam.toLowerCase()] ?? "All") : "All";

  const filtered = activeCategory === "All"
    ? ALL_TOOLS
    : ALL_TOOLS.filter(t => t.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#06060c" }}>
      {/* Glow bg */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-10%", left: "-10%",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "120px 24px 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 40, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>All Tools</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            All Free Tools
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: 560, lineHeight: 1.6 }}>
            {ALL_TOOLS.length} tools live. No signup, no ads, instant results. More added every week.
          </p>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {CATEGORIES.map(cat => {
            const isActive = cat === activeCategory;
            const href = cat === "All" ? "/tools" : `/tools?category=${cat.toLowerCase()}`;
            return (
              <Link key={cat} href={href} style={{
                padding: "8px 18px", borderRadius: 999,
                border: `1px solid ${isActive ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`,
                background: isActive ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                fontSize: 13, fontWeight: isActive ? 700 : 600,
                color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                transition: "all 0.15s",
              }}>
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Tools grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {filtered.map(tool => (
            <Link key={tool.href} href={tool.href} style={{ textDecoration: "none" }}>
              <div style={{
                padding: "24px 26px",
                borderRadius: 20,
                background: `rgba(${tool.accentRgb},0.06)`,
                border: `1px solid rgba(${tool.accentRgb},0.18)`,
                height: "100%",
                transition: "transform 0.15s, box-shadow 0.15s",
                cursor: "pointer",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px rgba(${tool.accentRgb},0.15)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 13,
                      background: `rgba(${tool.accentRgb},0.15)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, color: tool.accent, fontWeight: 700,
                      flexShrink: 0,
                    }}>{tool.icon}</div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
                      padding: "3px 10px", borderRadius: 999,
                      background: `rgba(${tool.accentRgb},0.12)`,
                      border: `1px solid rgba(${tool.accentRgb},0.25)`,
                      color: tool.accent,
                    }}>{tool.category}</span>
                  </div>
                  {tool.badge && (
                    <span style={{
                      fontSize: 10, fontWeight: 800, letterSpacing: "0.08em",
                      padding: "3px 9px", borderRadius: 999,
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      color: "#a5b4fc",
                    }}>{tool.badge}</span>
                  )}
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 8px", lineHeight: 1.3 }}>{tool.title}</h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 16px", lineHeight: 1.6 }}>{tool.desc}</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: tool.accent }}>Use free →</div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 72, padding: "40px 32px", borderRadius: 24,
          background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#818cf8", letterSpacing: "0.06em", margin: "0 0 12px" }}>COMING SOON</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            More tools on the way
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", margin: 0, maxWidth: 480, marginInline: "auto" }}>
            PDF tools, image converters, unit converter, readability checker, and many more — all free, no signup.
          </p>
        </div>

      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense>
      <ToolsGrid />
    </Suspense>
  );
}
