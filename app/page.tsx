import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolSearch } from "@/components/ToolSearch";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ToolStack — Free AI & Utility Tools for Writers, Marketers & Developers",
    description: "Free online tools for writers, marketers and developers. AI prompt generator, word counter, SEO tools and more. Instant results, no signup ever required.",
    alternates: { canonical: "https://toolstack.tech" },
    openGraph: {
        title: "ToolStack — Free AI & Utility Tools",
        description: "Free online tools for writers, marketers and developers. Instant results, no signup.",
        url: "https://toolstack.tech",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: { card: "summary_large_image" },
};

const LIVE_TOOLS = [
    {
        title: "AI Prompt Generator",
        desc: "Expert prompts using RISEN, STAR & Chain-of-Thought frameworks.",
        href: "/tools/ai-prompt-generator",
        category: "AI",
        accent: "#818cf8",
        accentRgb: "129,140,248",
        badge: "Popular",
        image: "/tools/ai-prompt-generator-preview.png",
    },
    {
        title: "Word Counter & Readability",
        desc: "Real-time word count, readability score and AI grammar fixer.",
        href: "/tools/word-counter",
        category: "Writing",
        accent: "#34d399",
        accentRgb: "52,211,153",
        badge: null,
        image: "/tools/word-counter-preview.png",
    },
    {
        title: "Meta Description Generator",
        desc: "5 meta descriptions with live SERP preview and CTR scoring.",
        href: "/tools/meta-description-generator",
        category: "SEO",
        accent: "#60a5fa",
        accentRgb: "96,165,250",
        badge: null,
        image: "/tools/meta-description-generator-preview.png",
    },
    {
        title: "Email Subject Tester",
        desc: "Score subject lines live with spam detection and AI alternatives.",
        href: "/tools/email-subject-line-tester",
        category: "Marketing",
        accent: "#f472b6",
        accentRgb: "244,114,182",
        badge: null,
        image: "/tools/email-subject-line-tester-preview.png",
    },
    {
        title: "Hashtag Generator",
        desc: "AI hashtags for Instagram, TikTok, LinkedIn & X in seconds.",
        href: "/tools/hashtag-generator",
        category: "Social",
        accent: "#a78bfa",
        accentRgb: "167,139,250",
        badge: null,
        image: "/tools/hashtag-generator-preview.png",
    },
    {
        title: "Blog Title Generator",
        desc: "10 click-worthy title variations — SEO, listicle, how-to & story angles.",
        href: "/tools/blog-title-generator",
        category: "Writing",
        accent: "#34d399",
        accentRgb: "52,211,153",
        badge: null,
        image: "/tools/blog-title-generator-preview.png",
    },
    {
        title: "Password Generator",
        desc: "Cryptographically secure passwords with custom length & options.",
        href: "/tools/password-generator",
        category: "Security",
        accent: "#4ade80",
        accentRgb: "74,222,128",
        badge: null,
        image: "/tools/password-generator-preview.png",
    },
    {
        title: "QR Code Generator",
        desc: "QR codes for URLs, WiFi, email & more. PNG & SVG download.",
        href: "/tools/qr-code-generator",
        category: "Utility",
        accent: "#22d3ee",
        accentRgb: "34,211,238",
        badge: null,
        image: "/tools/qr-code-generator-preview.png",
    },
    {
        title: "VAT Calculator",
        desc: "Add or remove VAT for 40+ countries with standard & reduced rates.",
        href: "/tools/vat-calculator",
        category: "Finance",
        accent: "#fbbf24",
        accentRgb: "251,191,36",
        badge: null,
        image: "/tools/vat-calculator-preview.png",
    },
    {
        title: "JSON Formatter",
        desc: "Format, validate & beautify JSON with syntax highlighting.",
        href: "/tools/json-formatter",
        category: "Dev",
        accent: "#10b981",
        accentRgb: "16,185,129",
        badge: null,
        image: "/tools/json-formatter-preview.png",
    },
    {
        title: "Invoice Generator",
        desc: "Professional invoices with VAT, discounts & PDF download. No watermark.",
        href: "/tools/invoice-generator",
        category: "Finance",
        accent: "#fbbf24",
        accentRgb: "251,191,36",
        badge: null,
        image: "/tools/invoice-generator-preview.png",
    },
    {
        title: "Paraphrasing Tool",
        desc: "Rewrite text with AI in 6 modes — Formal, Academic, Creative & more.",
        href: "/tools/paraphrasing-tool",
        category: "Writing",
        accent: "#34d399",
        accentRgb: "52,211,153",
        badge: null,
        image: "/tools/paraphrasing-tool-preview.png",
    },
    {
        title: "Grammar Checker",
        desc: "Fix grammar, spelling & punctuation. Every correction explained.",
        href: "/tools/grammar-checker",
        category: "Writing",
        accent: "#34d399",
        accentRgb: "52,211,153",
        badge: null,
        image: "/tools/grammar-checker-preview.png",
    },
    {
        title: "Text Summarizer",
        desc: "Summarize any text in 4 modes — paragraph, bullets, takeaways & executive.",
        href: "/tools/text-summarizer",
        category: "Writing",
        accent: "#34d399",
        accentRgb: "52,211,153",
        badge: null,
        image: "/tools/text-summarizer-preview.png",
    },
    {
        title: "Case Converter",
        desc: "10 modes: UPPER, lower, Title, camelCase, PascalCase, snake_case & more.",
        href: "/tools/case-converter",
        category: "Utility",
        accent: "#22d3ee",
        accentRgb: "34,211,238",
        badge: null,
        image: "/tools/case-converter-preview.png",
    },
    {
        title: "Lorem Ipsum Generator",
        desc: "Placeholder text — paragraphs, sentences, words or list items with HTML.",
        href: "/tools/lorem-ipsum-generator",
        category: "Utility",
        accent: "#22d3ee",
        accentRgb: "34,211,238",
        badge: null,
        image: "/tools/lorem-ipsum-generator-preview.png",
    },
    {
        title: "Cover Letter Generator",
        desc: "AI cover letters in 4 tones — Professional, Enthusiastic, Concise & Creative.",
        href: "/tools/cover-letter-generator",
        category: "Writing",
        accent: "#34d399",
        accentRgb: "52,211,153",
        badge: null,
        image: "/tools/cover-letter-generator-preview.png",
    },
    {
        title: "Character Counter",
        desc: "Live character count with progress bars for Twitter, Instagram & LinkedIn.",
        href: "/tools/character-counter",
        category: "Writing",
        accent: "#34d399",
        accentRgb: "52,211,153",
        badge: null,
        image: "/tools/character-counter-preview.png",
    },
    {
        title: "Brand Forge AI",
        desc: "AI-powered naming logic for startups. generate premium names with domain & TM authority signals.",
        href: "/tools/business-name-generator",
        category: "Business",
        accent: "#fb923c",
        accentRgb: "251,146,60",
        badge: "Elite",
        image: "/tools/business-name-generator-preview.png",
    },
    {
        title: "VibeSEO YouTube Engine",
        desc: "AI SEO engine — generate high-ranking tags & description hooks with GPT-4o analytics.",
        href: "/tools/youtube-tag-generator",
        category: "SEO",
        accent: "#60a5fa",
        accentRgb: "96,165,250",
        badge: null,
        image: "/tools/youtube-tag-generator-preview.png",
    },
    {
        title: "SignatureCraft Pro",
        desc: "Create professional HTML email signatures for Gmail, Outlook & Apple Mail. 4 templates, custom colours, instant copy.",
        href: "/tools/email-signature-generator",
        category: "Utility",
        accent: "#22d3ee",
        accentRgb: "34,211,238",
        badge: null,
        image: "/tools/email-signature-generator-preview.png",
    },
    {
        title: "CSS Gradient Builder",
        desc: "Visual CSS gradient editor — linear, radial & conic. 12+ curated presets. Copy production-ready CSS in one click.",
        href: "/tools/css-gradient-generator",
        category: "Dev",
        accent: "#10b981",
        accentRgb: "16,185,129",
        badge: null,
        image: "/tools/css-gradient-generator-preview.png",
    },
    {
        title: "Colour Contrast",
        desc: "Check your colour combinations against WCAG 2.1 accessibility guidelines for AA and AAA compliance.",
        href: "/tools/color-contrast-checker",
        category: "Design",
        accent: "#e879f9",
        accentRgb: "232,121,249",
        badge: null,
        image: "/tools/color-contrast-checker-preview.png",
    },
    {
        title: "Favicon Generator",
        desc: "Generate perfectly sized standard favicons from text or emoji. Creates PNGs, Apple Touch Icons, and more in seconds.",
        href: "/tools/favicon-generator",
        category: "Dev",
        accent: "#10b981",
        accentRgb: "16,185,129",
        badge: null,
        image: "/tools/favicon-generator-preview.png",
    },
    {
        title: "Base64 Converter",
        desc: "Instantly encode or decode Base64 strings. Runs completely client-side for absolute data privacy and security.",
        href: "/tools/base64-encoder-decoder",
        category: "Dev",
        accent: "#10b981",
        accentRgb: "16,185,129",
        badge: null,
        image: "/tools/base64-encoder-decoder-preview.png",
    },
    {
        title: "UTM Builder",
        desc: "Generate perfectly structured monitoring links with UTM parameters to attribute traffic flawlessly in Google Analytics.",
        href: "/tools/utm-builder",
        category: "Marketing",
        accent: "#f472b6",
        accentRgb: "244,114,182",
        badge: null,
        image: "/tools/utm-builder-preview.png",
    },
    {
        title: "Markdown Editor",
        desc: "Write Markdown with real-time visual previews and instantly export standard semantic HTML for any CMS.",
        href: "/tools/markdown-editor",
        category: "Writing",
        accent: "#34d399",
        accentRgb: "52,211,153",
        badge: null,
        image: "/tools/markdown-editor-preview.png",
    },
    {
        title: "Regex Tester",
        desc: "Visually debug Regular Expressions on the fly with syntax highlighting, live indexing, and infinite loop protection.",
        href: "/tools/regex-tester",
        category: "Dev",
        accent: "#10b981",
        accentRgb: "16,185,129",
        badge: null,
        image: "/tools/regex-tester-preview.png",
    },
    {
        title: "SQL Formatter",
        desc: "Beautify raw, minified database queries into perfectly indented, readable syntax with multi-dialect support.",
        href: "/tools/sql-formatter",
        category: "Dev",
        accent: "#10b981",
        accentRgb: "16,185,129",
        badge: null,
        image: "/tools/sql-formatter-preview.png",
    },
    {
        title: "Epoch Converter",
        desc: "Instantly translate Unix epoch integers into formatted dates across timezones.",
        href: "/tools/unix-timestamp-converter",
        category: "Dev",
        accent: "#10b981",
        accentRgb: "16,185,129",
        badge: null,
        image: "/tools/unix-timestamp-preview.png",
    },
    {
        title: "Tip Calculator",
        desc: "Calculate tips and split bills with tipping customs for 20+ countries, service presets and rounding.",
        href: "/tools/tip-calculator",
        category: "Finance",
        accent: "#fbbf24",
        accentRgb: "251,191,36",
        badge: null,
        image: "/tools/tip-calculator-preview.png",
    },
    {
        title: "Mortgage Calculator",
        desc: "Monthly payments, total interest, and full amortisation schedule. Repayment and interest-only. 15 currencies.",
        href: "/tools/mortgage-calculator",
        category: "Finance",
        accent: "#fbbf24",
        accentRgb: "251,191,36",
        badge: "New",
        image: "/tools/mortgage-calculator-preview.png",
    },
    {
        title: "Percentage Calculator",
        desc: "Six calculators in one: find a percentage, calculate increase/decrease, percentage change, and percentage difference.",
        href: "/tools/percentage-calculator",
        category: "Math",
        accent: "#f97316",
        accentRgb: "249,115,22",
        badge: "New",
        image: "/tools/percentage-calculator-preview.png",
    },
    {
        title: "Salary Calculator",
        desc: "Calculate take-home pay after tax. Full UK PAYE 2024/25 and US Federal 2024 calculations with complete deductions breakdown.",
        href: "/tools/salary-calculator",
        category: "Finance",
        accent: "#fbbf24",
        accentRgb: "251,191,36",
        badge: null,
        image: "/tools/salary-calculator-preview.png",
    },
    {
        title: "AI Color Palette Generator",
        desc: "Describe your brand or project in words and get a perfect 5-color palette with hex codes, CSS variables and Tailwind config.",
        href: "/tools/color-palette-generator",
        category: "Design",
        accent: "#e879f9",
        accentRgb: "232,121,249",
        badge: null,
        image: "/tools/color-palette-generator-preview.png",
    },
    {
        title: "Age Calculator",
        desc: "Find your exact age in years, months, days and hours. Zodiac sign, generation, days to next birthday, and life progress.",
        href: "/tools/age-calculator",
        category: "Utility",
        accent: "#22d3ee",
        accentRgb: "34,211,238",
        badge: null,
        image: "/tools/age-calculator-preview.png",
    },
    {
        title: "Code Diff Checker",
        desc: "Paste two blocks of code and instantly see what changed. Line-by-line diff with added, removed and unchanged highlighting.",
        href: "/tools/code-diff-checker",
        category: "Dev",
        accent: "#f472b6",
        accentRgb: "244,114,182",
        badge: "New",
        image: "/tools/code-diff-checker-preview.png",
    },
    {
        title: "JWT Decoder",
        desc: "Decode any JSON Web Token instantly. View header, payload and signature, check expiry, and inspect all standard claims.",
        href: "/tools/jwt-decoder",
        category: "Dev",
        accent: "#fb923c",
        accentRgb: "251,146,60",
        badge: "New",
        image: "/tools/jwt-decoder-preview.png",
    },
    {
        title: "Website Down Checker",
        desc: "Check if a website is down for everyone or just you. See HTTP status, response time, and keep a history of your last 5 checks.",
        href: "/tools/website-down-checker",
        category: "Utility",
        accent: "#4ade80",
        accentRgb: "74,222,128",
        badge: null,
        image: "/tools/website-down-checker-preview.png",
    },
    {
        title: "PDF Generator",
        desc: "Type or paste your text, choose font and page size, and download a clean PDF instantly. No watermarks, no signup, 100% private.",
        href: "/tools/pdf-generator",
        category: "Utility",
        accent: "#ef4444",
        accentRgb: "239,68,68",
        badge: null,
        image: "/tools/pdf-generator-preview.png",
    },
    {
        title: "IP Address Lookup",
        desc: "Find your public IP address, location, ISP and timezone instantly. Also look up any IP address for geolocation data. Free, no signup.",
        href: "/tools/ip-address-lookup",
        category: "Utility",
        accent: "#818cf8",
        accentRgb: "129,140,248",
        badge: "New",
        image: "/tools/ip-address-lookup-preview.png",
    },
    {
        title: "SSL Certificate Checker",
        desc: "Check any website's SSL certificate. See validity, days until expiry, issuer and covered domains. Free, instant, no signup.",
        href: "/tools/ssl-checker",
        category: "Security",
        accent: "#34d399",
        accentRgb: "52,211,153",
        badge: null,
        image: "/tools/ssl-checker-preview.png",
    },
    {
        title: "WHOIS Domain Lookup",
        desc: "Check domain registration date, expiry, registrar and nameservers instantly. See who owns any domain.",
        href: "/tools/whois-lookup",
        category: "Domain",
        accent: "#f97316",
        accentRgb: "249,115,22",
        badge: "New",
        image: "/tools/whois-lookup-preview.png",
    },
    {
        title: "Compound Interest Calculator",
        desc: "See how your investment grows with compounding. Add monthly contributions, choose frequency, view year-by-year breakdown.",
        href: "/tools/compound-interest-calculator",
        category: "Finance",
        accent: "#fbbf24",
        accentRgb: "251,191,36",
        badge: null,
        image: "/tools/compound-interest-preview.png",
    },
    {
        title: "UUID Generator",
        desc: "Generate UUID v4, v1, v5, ULID and NanoID in bulk. Copy all or download as .txt. 100% client-side.",
        href: "/tools/uuid-generator",
        category: "Dev",
        accent: "#38bdf8",
        accentRgb: "56,189,248",
        badge: "",
        image: "/tools/uuid-generator-preview.png",
    },
    {
        title: "YouTube Thumbnail Downloader",
        desc: "Download any YouTube video thumbnail in all 5 resolutions. Max, SD, HQ, MQ and Default. Free, no signup.",
        href: "/tools/youtube-thumbnail-downloader",
        category: "Video",
        accent: "#ff0000",
        accentRgb: "255,0,0",
        badge: "New",
        image: "/tools/youtube-thumbnail-downloader-preview.png",
    },
    {
        title: "Online Stopwatch",
        desc: "Stopwatch with lap times and countdown timer. Centisecond accurate. Keyboard shortcuts: Space, L, R.",
        href: "/tools/online-stopwatch",
        category: "Utility",
        accent: "#38bdf8",
        accentRgb: "56,189,248",
        badge: "New",
        image: "/tools/online-stopwatch-preview.png",
    },
    {
        title: "Card Grading Profit Calculator",
        desc: "Is grading your card worth it? Calculate profit and ROI across PSA, BGS, SGC and CSG with eBay fee breakdown.",
        href: "/tools/card-grading-profit-calculator",
        category: "Collectibles",
        accent: "#f59e0b",
        accentRgb: "245,158,11",
        badge: "New",
        image: "/tools/card-grading-profit-calculator-preview.png",
    },
    {
        title: "Whatnot Seller Fee Calculator",
        desc: "Calculate Whatnot commission and payment processing fees by category. Net payout and eBay comparison.",
        href: "/tools/whatnot-seller-fee-calculator",
        category: "Collectibles",
        accent: "#f97316",
        accentRgb: "249,115,22",
        badge: "New",
        image: "/tools/whatnot-seller-fee-calculator-preview.png",
    },
];

const MARQUEE_TOOLS = [
    "AI Prompt Generator", "Word Counter", "Meta Description Generator",
    "Email Subject Tester", "Hashtag Generator", "Password Generator",
    "Blog Title Generator", "VAT Calculator", "QR Code Generator",
    "Character Counter", "Lorem Ipsum Generator", "Base64 Encoder",
    "Color Picker", "JSON Formatter", "Readability Scorer", "Regex Tester",
    "Business Name Generator", "YouTube Tag Generator", "Email Signature Generator",
    "CSS Gradient Generator", "Colour Contrast Checker", "Favicon Generator",
    "Base64 Converter", "UTM Builder", "Markdown Editor", "Regex Tester",
    "SQL Formatter", "Unix Epoch Converter",
];

const COMING_SOON = [
    "Color Picker", "Unit Converter", "Timezone Converter",
    "Currency Converter", "Readability Checker",
    "Image Compressor", "Text to Speech",
];

const RECENT_POSTS = [
    {
        slug: "2026-seo-checklist",
        title: "The 2026 SEO Checklist for Content Marketers",
        desc: "Search has changed. This is the definitive 10-point checklist for ranking in the age of Generative Engine Optimization.",
        tag: "SEO Strategy",
        color: "#38bdf8",
    },
    {
        slug: "how-to-beat-ats-with-ai",
        title: "How to Beat the ATS Algorithms with AI",
        desc: "Job hunting in 2026 requires more than a simple PDF. Learn how to optimize your cover letter for AI hiring systems.",
        tag: "Career",
        color: "#f472b6",
    },
    {
        slug: "utility-keywords-passive-income",
        title: "Utility Keywords: The Secret to Passive Income",
        desc: "Informational content is hard to monetize. Utility content is a goldmine. Learn why building free tools is the ultimate SEO pivot.",
        tag: "Marketing",
        color: "#34d399",
    },
];

export default function Home() {
    return (
        <div style={{ minHeight: "100vh", background: "#06060c" }}>

            {/* ─── HERO ─────────────────────────────────────────────────── */}
            <section style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                padding: "140px 24px 80px",
            }}>
                {/* Background glows */}
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                    <div style={{
                        position: "absolute", top: "0%", left: "-10%",
                        width: 900, height: 900, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 65%)",
                        filter: "blur(90px)",
                    }} />
                    <div style={{
                        position: "absolute", bottom: "-20%", right: "-5%",
                        width: 700, height: 700, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 65%)",
                        filter: "blur(90px)",
                    }} />
                    <div style={{
                        position: "absolute", top: "15%", right: "5%",
                        width: 500, height: 500, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 65%)",
                        filter: "blur(80px)",
                    }} />
                    {/* Dot grid */}
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                        WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
                        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
                    }} />
                </div>

                <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", width: "100%" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 64,
                        alignItems: "center",
                    }} className="hero-grid">

                        {/* Left: Text */}
                        <div>
                            {/* Badge */}
                            <div className="fade-up" style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                padding: "7px 16px", borderRadius: 999,
                                background: "rgba(99,102,241,0.12)",
                                border: "1px solid rgba(99,102,241,0.3)",
                                marginBottom: 32,
                            }}>
                                <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, flexShrink: 0 }}>
                                    <span className="ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#818cf8", opacity: 0.75 }} />
                                    <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "#818cf8", display: "inline-block" }} />
                                </span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#c7d2fe", letterSpacing: "0.02em" }}>
                                    49 top-tier tools live · Free forever · No account
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="fade-up-delay-1" style={{
                                fontSize: "clamp(44px, 5.5vw, 76px)",
                                fontWeight: 900,
                                letterSpacing: "-0.04em",
                                lineHeight: 0.95,
                                marginBottom: 28,
                                color: "white",
                            }}>
                                Every tool<br />
                                you need.<br />
                                <span style={{
                                    background: "linear-gradient(135deg, #818cf8 0%, #c084fc 35%, #f472b6 65%, #fb923c 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    display: "inline-block",
                                    backgroundSize: "300% 300%",
                                }} className="gradient-animate">
                                    Free forever.
                                </span>
                            </h1>

                            <p className="fade-up-delay-2" style={{
                                fontSize: "clamp(16px, 1.8vw, 19px)",
                                color: "rgba(255,255,255,0.5)",
                                maxWidth: 480,
                                lineHeight: 1.65,
                                fontWeight: 400,
                                marginBottom: 40,
                            }}>
                                AI prompts, SEO tools, writing utilities, calculators and more. Built for professionals who want results{" "}
                                <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>in seconds.</strong>
                            </p>

                            {/* CTAs */}
                            <div className="fade-up-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 52 }}>
                                <Link href="/tools" className="cta-primary" style={{
                                    display: "inline-flex", alignItems: "center", gap: 9,
                                    padding: "14px 28px", borderRadius: 12,
                                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                    color: "white", fontSize: 15, fontWeight: 800,
                                    textDecoration: "none",
                                    boxShadow: "0 8px 32px rgba(99,102,241,0.4), 0 0 0 1px rgba(99,102,241,0.25)",
                                }}>
                                    Browse All Tools <ArrowRight size={16} />
                                </Link>
                                <Link href="/tools/ai-prompt-generator" className="cta-secondary glow-border" style={{
                                    display: "inline-flex", alignItems: "center", gap: 9,
                                    padding: "14px 28px", borderRadius: 12,
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "rgba(255,255,255,0.85)", fontSize: 15, fontWeight: 700,
                                    textDecoration: "none",
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Try AI Prompt Generator
                                </Link>
                            </div>

                            {/* Product Hunt badge */}
                            <div className="fade-up-delay-4" style={{ marginTop: 4 }}>
                                <a href="https://www.producthunt.com/products/toolstack-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-toolstack-2" target="_blank" rel="noopener noreferrer">
                                    <img alt="ToolStack on Product Hunt" width="200" height="43" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1126961&theme=dark&t=1776719417942" style={{ display: "block" }} />
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="fade-up-delay-4" style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                                {[
                                    { value: "49", label: "Live tools" },
                                    { value: "20+", label: "Coming soon" },
                                    { value: "GPT-4o", label: "AI model" },
                                    { value: "Free", label: "No catch" },
                                ].map((s, i) => (
                                    <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                                        <span style={{ fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1 }}>{s.value}</span>
                                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 500, marginTop: 2 }}>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Floating product mockup */}
                        <div className="hero-mockup fade-up-delay-2" style={{ position: "relative" }}>
                            {/* Outer glow */}
                            <div style={{
                                position: "absolute", inset: -40,
                                background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.2) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }} />

                            {/* Main card */}
                            <div style={{
                                position: "relative",
                                background: "rgba(13,13,22,0.9)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 24,
                                overflow: "hidden",
                                boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
                                backdropFilter: "blur(20px)",
                            }}>
                                {/* Card top bar */}
                                <div style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    padding: "14px 20px",
                                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                                    background: "rgba(255,255,255,0.03)",
                                }}>
                                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                                    <div style={{ flex: 1, height: 22, borderRadius: 6, background: "rgba(255,255,255,0.05)", marginLeft: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>toolstack.tech/tools/ai-prompt-generator</span>
                                    </div>
                                </div>

                                {/* Tool UI mockup */}
                                <div style={{ padding: "24px 24px 8px" }}>
                                    {/* Tool header */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                                        <div style={{
                                            width: 38, height: 38, borderRadius: 10,
                                            background: "rgba(99,102,241,0.2)",
                                            border: "1px solid rgba(99,102,241,0.35)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 800, color: "white" }}>AI Prompt Generator</div>
                                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>GPT-4o · Free · No signup</div>
                                        </div>
                                        <div style={{ marginLeft: "auto", padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: "#34d399" }}>● Live</span>
                                        </div>
                                    </div>

                                    {/* Input field mock */}
                                    <div style={{ marginBottom: 14 }}>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Your Topic</div>
                                        <div style={{
                                            padding: "10px 14px", borderRadius: 10,
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            fontSize: 13, color: "rgba(255,255,255,0.7)",
                                            display: "flex", alignItems: "center", justifyContent: "space-between",
                                        }}>
                                            <span>Write a blog post about SEO in 2025</span>
                                            <span style={{ width: 2, height: 14, background: "#6366f1", borderRadius: 2, animation: "blink 1s step-end infinite" }} />
                                        </div>
                                    </div>

                                    {/* Framework + Tone row */}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Framework</div>
                                            <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", fontSize: 12, color: "#c7d2fe", fontWeight: 600 }}>RISEN ✓</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Tone</div>
                                            <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Professional</div>
                                        </div>
                                    </div>

                                    {/* Output mock */}
                                    <div style={{
                                        padding: "14px 16px", borderRadius: 12,
                                        background: "rgba(99,102,241,0.07)",
                                        border: "1px solid rgba(99,102,241,0.2)",
                                        marginBottom: 16,
                                    }}>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Generated Prompt</div>
                                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                                            <span style={{ color: "rgba(255,255,255,0.85)" }}>Role:</span> Act as a senior SEO content strategist...<br />
                                            <span style={{ color: "rgba(255,255,255,0.85)" }}>Task:</span> Write a comprehensive blog post covering the top ranking factors for 2025...<br />
                                            <span style={{ color: "rgba(255,255,255,0.85)" }}>Format:</span> 1,500 words, H2 subheadings, bullet points...
                                        </div>
                                    </div>

                                    {/* Copy button row */}
                                    <div style={{ display: "flex", gap: 8, paddingBottom: 24 }}>
                                        <div style={{
                                            flex: 1, padding: "9px 0", borderRadius: 9, textAlign: "center",
                                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                            fontSize: 12, fontWeight: 800, color: "white",
                                            boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                                        }}>Copy Prompt</div>
                                        <div style={{
                                            padding: "9px 14px", borderRadius: 9,
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)",
                                        }}>Regenerate</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating badge — bottom left */}
                            <div style={{
                                position: "absolute", bottom: -16, left: -16,
                                padding: "10px 16px", borderRadius: 14,
                                background: "rgba(13,13,22,0.95)",
                                border: "1px solid rgba(16,185,129,0.3)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                                backdropFilter: "blur(12px)",
                                display: "flex", alignItems: "center", gap: 10,
                            }}>
                                <div style={{
                                    width: 34, height: 34, borderRadius: 9,
                                    background: "rgba(16,185,129,0.15)",
                                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: "white" }}>No signup required</div>
                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Use any tool instantly, free</div>
                                </div>
                            </div>

                            {/* Floating badge — top right */}
                            <div style={{
                                position: "absolute", top: -16, right: -16,
                                padding: "10px 16px", borderRadius: 14,
                                background: "rgba(13,13,22,0.95)",
                                border: "1px solid rgba(99,102,241,0.3)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                                backdropFilter: "blur(12px)",
                                display: "flex", alignItems: "center", gap: 10,
                            }}>
                                <div style={{
                                    width: 34, height: 34, borderRadius: 9,
                                    background: "rgba(99,102,241,0.15)",
                                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: "white" }}>Instant results</div>
                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Powered by GPT-4o</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── MARQUEE ──────────────────────────────────────────────── */}
            <div style={{
                position: "relative",
                overflow: "hidden",
                padding: "18px 0",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                marginBottom: 110,
            }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 140, background: "linear-gradient(to right, #06060c, transparent)", zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 140, background: "linear-gradient(to left, #06060c, transparent)", zIndex: 2, pointerEvents: "none" }} />
                <div className="marquee-track">
                    {[...MARQUEE_TOOLS, ...MARQUEE_TOOLS].map((name, i) => (
                        <span key={i} style={{
                            display: "inline-flex", alignItems: "center", gap: 7,
                            padding: "6px 18px", borderRadius: 999,
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            fontSize: 12, fontWeight: 600,
                            color: "rgba(255,255,255,0.3)",
                            whiteSpace: "nowrap",
                        }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#6366f1", display: "inline-block", flexShrink: 0, opacity: 0.8 }} />
                            {name}
                        </span>
                    ))}
                </div>
            </div>

            {/* ─── LIVE TOOLS ───────────────────────────────────────────── */}
            <section style={{ padding: "0 24px 110px", maxWidth: 1280, margin: "0 auto" }}>
                {/* Section header */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 52 }}>
                    <div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
                            <div style={{ width: 28, height: 2, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 2 }} />
                            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8" }}>Live now</span>
                        </div>
                        <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 900, color: "white", letterSpacing: "-0.035em", lineHeight: 1.0 }}>
                            Free tools,<br />ready to use today
                        </h2>
                    </div>
                    <Link href="/tools" style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        padding: "11px 22px", borderRadius: 12,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        fontSize: 14, fontWeight: 700,
                        color: "rgba(255,255,255,0.55)", textDecoration: "none",
                        transition: "all 0.15s",
                    }}>
                        View all 49 tools <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Tool search + grid */}
                <ToolSearch tools={LIVE_TOOLS} />
                {/* Coming soon strip */}
                <div style={{
                    position: "relative",
                    padding: "28px 32px",
                    background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.04) 100%)",
                    border: "1px solid rgba(99,102,241,0.18)",
                    borderRadius: 20,
                    display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap",
                    overflow: "hidden",
                }}>
                    <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(30px)" }} />
                    <div style={{ flexShrink: 0, position: "relative" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#818cf8", display: "inline-block", boxShadow: "0 0 8px rgba(129,140,248,0.5)" }} />
                            <p style={{ fontSize: 15, fontWeight: 800, color: "white", margin: 0 }}>More tools dropping every week</p>
                        </div>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, paddingLeft: 18 }}>All free, no account needed. 30 live and counting.</p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
                        {COMING_SOON.map((name) => (
                            <span key={name} style={{
                                padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                                background: "rgba(99,102,241,0.08)",
                                border: "1px solid rgba(99,102,241,0.2)",
                                color: "rgba(255,255,255,0.5)",
                                letterSpacing: "0.01em",
                            }}>{name}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
            <section style={{ padding: "0 24px 110px", maxWidth: 1280, margin: "0 auto" }}>
                {/* Section header */}
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 16 }}>
                        <div style={{ width: 28, height: 2, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 2 }} />
                        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8" }}>How it works</span>
                        <div style={{ width: 28, height: 2, background: "linear-gradient(90deg, #8b5cf6, #6366f1)", borderRadius: 2 }} />
                    </div>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "white", letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                        Results in three steps
                    </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2, position: "relative" }}>
                    {[
                        {
                            step: "01",
                            title: "Pick a tool",
                            desc: "Choose from 5 live tools — AI prompts, SEO, writing, social media and more. No account, no paywall.",
                            color: "#6366f1",
                            rgb: "99,102,241",
                            icon: (
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7" rx="1" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" />
                                    <rect x="14" y="14" width="7" height="7" rx="1" />
                                </svg>
                            ),
                        },
                        {
                            step: "02",
                            title: "Enter your content",
                            desc: "Type your topic, paste your text, or fill in the fields. Every tool is designed to be used in under 30 seconds.",
                            color: "#8b5cf6",
                            rgb: "139,92,246",
                            icon: (
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            ),
                        },
                        {
                            step: "03",
                            title: "Get instant results",
                            desc: "GPT-4o generates your output in seconds. Copy it, tweak it, use it. No waiting, no friction, no cost.",
                            color: "#ec4899",
                            rgb: "236,72,153",
                            icon: (
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                            ),
                        },
                    ].map((item, i) => (
                        <div key={i} style={{ position: "relative" }}>
                            {/* Connector line */}
                            {i < 2 && (
                                <div style={{
                                    position: "absolute", top: 40, right: -1,
                                    width: 2, height: 40,
                                    background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
                                    display: "none",
                                }} />
                            )}
                            <div style={{
                                padding: "36px 32px",
                                background: "rgba(255,255,255,0.025)",
                                border: `1px solid rgba(${item.rgb},0.15)`,
                                borderRadius: 20,
                                position: "relative",
                                overflow: "hidden",
                                margin: "0 1px",
                            }}>
                                {/* Background glow */}
                                <div style={{
                                    position: "absolute", bottom: -40, right: -40,
                                    width: 180, height: 180, borderRadius: "50%",
                                    background: `radial-gradient(circle, rgba(${item.rgb},0.1) 0%, transparent 70%)`,
                                    pointerEvents: "none",
                                }} />

                                {/* Step number */}
                                <div style={{ fontSize: 11, fontWeight: 900, color: `rgba(${item.rgb},0.5)`, letterSpacing: "0.1em", marginBottom: 16 }}>STEP {item.step}</div>

                                {/* Icon */}
                                <div style={{
                                    width: 56, height: 56, borderRadius: 16,
                                    background: `rgba(${item.rgb},0.1)`,
                                    border: `1px solid rgba(${item.rgb},0.25)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: item.color, marginBottom: 20,
                                }}>
                                    {item.icon}
                                </div>

                                <h3 style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 10, letterSpacing: "-0.02em" }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.42)", lineHeight: 1.7 }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── WHY TOOLSTACK ────────────────────────────────────────── */}
            <section style={{ padding: "0 24px 110px", maxWidth: 1280, margin: "0 auto" }}>
                {/* Section header */}
                <div style={{ marginBottom: 52 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
                        <div style={{ width: 28, height: 2, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 2 }} />
                        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8" }}>Why ToolStack</span>
                    </div>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "white", letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                        Built{" "}
                        <span style={{ background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>different.</span>
                    </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                    {[
                        {
                            title: "Instant results",
                            desc: "No loading screens. Results appear as you type or generate — powered by the fastest AI models available.",
                            color: "#fbbf24", rgb: "251,191,36",
                            icon: (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                            ),
                        },
                        {
                            title: "No signup ever",
                            desc: "We will never ask for your email, credit card, or account. Use any tool, free, forever — no strings attached.",
                            color: "#34d399", rgb: "52,211,153",
                            icon: (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                            ),
                        },
                        {
                            title: "GPT-4o powered",
                            desc: "Every AI tool runs on GPT-4o — the same model professionals pay $20/month for. You pay absolutely nothing.",
                            color: "#818cf8", rgb: "129,140,248",
                            icon: (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
                                </svg>
                            ),
                        },
                        {
                            title: "New tools weekly",
                            desc: "60 tools in the pipeline. One or two drop every week. Bookmark ToolStack and come back — it keeps getting better.",
                            color: "#f472b6", rgb: "244,114,182",
                            icon: (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 4 23 10 17 10" />
                                    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                                </svg>
                            ),
                        },
                    ].map((item) => (
                        <div key={item.title} className="tool-card" style={{
                            "--accent-rgb": item.rgb,
                            padding: "32px 28px",
                            borderRadius: 20,
                            background: `linear-gradient(145deg, rgba(${item.rgb},0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                            border: `1px solid rgba(${item.rgb},0.15)`,
                            position: "relative",
                            overflow: "hidden",
                            cursor: "default",
                        } as React.CSSProperties}>
                            {/* Stronger corner glow */}
                            <div style={{
                                position: "absolute", top: -40, right: -40,
                                width: 160, height: 160, borderRadius: "50%",
                                background: `radial-gradient(circle, rgba(${item.rgb},0.18) 0%, transparent 70%)`,
                                pointerEvents: "none", filter: "blur(20px)",
                            }} />
                            <div style={{
                                position: "absolute", bottom: -30, left: -30,
                                width: 100, height: 100, borderRadius: "50%",
                                background: `radial-gradient(circle, rgba(${item.rgb},0.08) 0%, transparent 70%)`,
                                pointerEvents: "none",
                            }} />
                            <div style={{
                                width: 52, height: 52, borderRadius: 15,
                                background: `rgba(${item.rgb},0.12)`,
                                border: `1px solid rgba(${item.rgb},0.25)`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: item.color, marginBottom: 20,
                                boxShadow: `0 8px 24px rgba(${item.rgb},0.15)`,
                            }}>{item.icon}</div>
                            <h3 style={{ fontSize: 17, fontWeight: 800, color: "white", marginBottom: 10, letterSpacing: "-0.01em" }}>
                                {item.title}
                            </h3>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, position: "relative" }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── LATEST INSIGHTS ────────────────────────────────────────── */}
            <section style={{ padding: "0 24px 110px", maxWidth: 1280, margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 52 }}>
                    <div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
                            <div style={{ width: 28, height: 2, background: "linear-gradient(90deg, #38bdf8, #818cf8)", borderRadius: 2 }} />
                            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#38bdf8" }}>Editorial</span>
                        </div>
                        <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 900, color: "white", letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                            Latest Insights &<br />GEO Strategies
                        </h2>
                    </div>
                    <Link href="/blog" style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        padding: "11px 22px", borderRadius: 12,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        fontSize: 14, fontWeight: 700,
                        color: "rgba(255,255,255,0.55)", textDecoration: "none",
                        transition: "all 0.15s",
                    }}>
                        View all articles <ArrowRight size={14} />
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
                    {RECENT_POSTS.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                            <div style={{
                                padding: "32px",
                                borderRadius: 24,
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                transition: "all 0.3s ease",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }} className="tool-card">
                                <span style={{
                                    fontSize: 10, fontWeight: 900, color: post.color,
                                    letterSpacing: "0.1em", textTransform: "uppercase",
                                    marginBottom: 16, display: "block"
                                }}>{post.tag}</span>
                                <h3 style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 12, lineHeight: 1.3 }}>{post.title}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{post.desc}</p>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "#818cf8", display: "flex", alignItems: "center", gap: 6 }}>
                                    Read guide <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─── ADVERTSGPT BANNER ────────────────────────────────────── */}
            <section style={{ padding: "0 24px 110px", maxWidth: 1280, margin: "0 auto" }}>
                <div style={{
                    position: "relative",
                    borderRadius: 28, overflow: "hidden",
                    isolation: "isolate",
                }}>
                    {/* Animated gradient border */}
                    <div className="agpt-border-glow" style={{
                        position: "absolute", inset: 0, borderRadius: 28,
                        padding: 1,
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #6366f1)",
                        backgroundSize: "300% 300%",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "exclude" as "xor",
                        maskComposite: "exclude",
                        zIndex: 1,
                    }} />

                    <div style={{
                        position: "relative",
                        background: "linear-gradient(145deg, rgba(15,15,25,0.97) 0%, rgba(20,15,35,0.97) 100%)",
                        borderRadius: 28,
                        zIndex: 2,
                    }}>
                        {/* Glows */}
                        <div style={{ position: "absolute", top: "-30%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none" }} />
                        <div style={{ position: "absolute", bottom: "-30%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none" }} />

                        {/* Grid overlay */}
                        <div style={{
                            position: "absolute", inset: 0, borderRadius: 28,
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                            pointerEvents: "none",
                        }} />

                        <div style={{
                            position: "relative", zIndex: 1,
                            padding: "clamp(36px, 5vw, 64px)",
                        }}>
                            {/* Top row: badge + AI model pills */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.15))",
                                    border: "1px solid rgba(139,92,246,0.35)",
                                    borderRadius: 99, padding: "5px 16px",
                                }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,0.6)" }} />
                                    <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", color: "#c4b5fd" }}>FROM THE TOOLSTACK TEAM</span>
                                </div>
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                    {["ChatGPT", "Gemini", "Perplexity", "Claude", "Copilot", "Meta AI"].map(m => (
                                        <span key={m} style={{
                                            fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                                            padding: "4px 10px", borderRadius: 99,
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            color: "rgba(255,255,255,0.5)",
                                        }}>{m}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Main content */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
                                <div style={{ maxWidth: 520 }}>
                                    <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 900, color: "white", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 18 }}>
                                        Is your brand{" "}
                                        <span style={{ background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>invisible</span>
                                        <br />to AI search?
                                    </h2>
                                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.48)", lineHeight: 1.7, marginBottom: 24 }}>
                                        AdvertsGPT scans your website across <strong style={{ color: "rgba(255,255,255,0.8)" }}>10 AI models</strong> in 60 seconds — and shows you exactly how to rank in AI search before your competitors do.
                                    </p>
                                    {/* Trust signals */}
                                    <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                                        {[
                                            { value: "10+", label: "AI models scanned" },
                                            { value: "60s", label: "Full audit" },
                                            { value: "Free", label: "No credit card" },
                                        ].map(s => (
                                            <div key={s.label}>
                                                <p style={{ fontSize: 22, fontWeight: 900, color: "#a78bfa", margin: "0 0 1px" }}>{s.value}</p>
                                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0, fontWeight: 600 }}>{s.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA card */}
                                <div style={{
                                    display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                                    padding: "28px 32px",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: 18,
                                    minWidth: 220,
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                                        <div style={{
                                            width: 48, height: 48, borderRadius: 14,
                                            background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(245,158,11,0.15))",
                                            border: "1px solid rgba(239,68,68,0.3)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 16, fontWeight: 900, color: "#f87171",
                                        }}>32</div>
                                        <div>
                                            <p style={{ fontSize: 12, fontWeight: 800, color: "#f87171", margin: 0 }}>POOR</p>
                                            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>Average brand score</p>
                                        </div>
                                    </div>
                                    <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" className="cta-primary" style={{
                                        display: "inline-flex", alignItems: "center", gap: 10,
                                        width: "100%", justifyContent: "center",
                                        padding: "16px 36px", borderRadius: 14,
                                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                                        color: "white", fontSize: 15, fontWeight: 800,
                                        textDecoration: "none", whiteSpace: "nowrap",
                                        boxShadow: "0 10px 40px rgba(99,102,241,0.45)",
                                    }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                                        Check Your AI Score
                                    </a>
                                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>Free instant audit — takes 60 seconds</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

