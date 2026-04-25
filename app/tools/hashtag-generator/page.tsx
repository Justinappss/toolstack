"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

// ─── SVG Brand Icons ──────────────────────────────────────────────────────────

const InstagramIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="3" />
  </svg>
);

const TikTokIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
  </svg>
);

const LinkedInIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="currentColor" d="M21.8 8s-.2-1.4-.8-2c-.76-.8-1.61-.8-2-.85C16.2 5 12 5 12 5s-4.2 0-7 .15c-.4.05-1.24.05-2 .85-.6.6-.8 2-.8 2S2 9.62 2 11.24v1.52C2 14.38 2.2 16 2.2 16s.2 1.4.8 2c.76.8 1.76.77 2.2.85C6.8 19 12 19 12 19s4.2 0 7-.18c.4-.05 1.24-.05 2-.85.6-.6.8-2 .8-2s.2-1.62.2-3.24v-1.52C22 9.62 21.8 8 21.8 8z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

// ─── Types ───────────────────────────────────────────────────────────────────

interface HashtagResult {
  popular: string[];
  medium: string[];
  niche: string[];
  pro_tip: string;
  platform: string;
  platformInfo: string;
  totalCount: number;
}

// ─── Config ──────────────────────────────────────────────────────────────────

const PLATFORMS = [
  {
    id: "instagram",
    label: "Instagram",
    Icon: InstagramIcon,
    iconBg: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #bc1888 100%)",
    color: "#e1306c",
    colorRgb: "225,48,108",
    count: 30,
    countLabel: "30 hashtags",
    tip: "Post hashtags in your first comment to keep the caption clean while still getting full reach.",
    formatHint: "Instagram supports up to 30 hashtags. Use a mix of all three tiers for best results.",
  },
  {
    id: "tiktok",
    label: "TikTok",
    Icon: TikTokIcon,
    iconBg: "linear-gradient(135deg, #010101 0%, #69c9d0 60%, #ee1d52 100%)",
    color: "#69c9d0",
    colorRgb: "105,201,208",
    count: 8,
    countLabel: "5–8 hashtags",
    tip: "TikTok prioritises content quality over hashtag volume. Use your niche hashtags in the first line.",
    formatHint: "TikTok's algorithm is topic-based — fewer, highly specific hashtags outperform 30 generic ones.",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    Icon: LinkedInIcon,
    iconBg: "linear-gradient(135deg, #0077b5 0%, #004d80 100%)",
    color: "#0a8dff",
    colorRgb: "10,141,255",
    count: 5,
    countLabel: "3–5 hashtags",
    tip: "Place hashtags at the very end of your LinkedIn post. Never interrupt the narrative mid-copy.",
    formatHint: "LinkedIn penalises posts that look 'spammy'. 3–5 targeted hashtags perform best.",
  },
  {
    id: "twitter",
    label: "X / Twitter",
    Icon: XIcon,
    iconBg: "linear-gradient(135deg, #14171a 0%, #1d9bf0 100%)",
    color: "#1d9bf0",
    colorRgb: "29,155,240",
    count: 3,
    countLabel: "1–3 hashtags",
    tip: "On X, hashtags consume character count. Keep to 1–2 max and place them at the end of the tweet.",
    formatHint: "X research shows posts with 1–2 hashtags outperform those with more — engagement drops sharply above 3.",
  },
  {
    id: "youtube",
    label: "YouTube",
    Icon: YouTubeIcon,
    iconBg: "linear-gradient(135deg, #ff0000 0%, #cc0000 100%)",
    color: "#ff4444",
    colorRgb: "255,68,68",
    count: 15,
    countLabel: "Up to 15 tags",
    tip: "First 3 hashtags in your description appear above the video title — make them count.",
    formatHint: "YouTube uses hashtags for discovery. Place them at the very end of your video description.",
  },
] as const;

const TONES = [
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual & Fun" },
  { id: "trendy", label: "Trendy / Viral" },
  { id: "expert", label: "Expert / Niche" },
];

const TIERS = [
  {
    key: "popular" as const,
    label: "High Reach",
    sublabel: ">1M posts — broad & competitive",
    emoji: "🔥",
    color: "#fbbf24",
    colorRgb: "251,191,36",
    bg: "rgba(251,191,36,0.10)",
    border: "rgba(251,191,36,0.25)",
    headerBg: "linear-gradient(135deg, rgba(251,191,36,0.14), rgba(245,158,11,0.06))",
    selectedBg: "rgba(251,191,36,0.18)",
    dimColor: "rgba(251,191,36,0.35)",
  },
  {
    key: "medium" as const,
    label: "Growing",
    sublabel: "100k–1M posts — best reach-to-competition ratio",
    emoji: "📈",
    color: "#38bdf8",
    colorRgb: "56,189,248",
    bg: "rgba(56,189,248,0.10)",
    border: "rgba(56,189,248,0.25)",
    headerBg: "linear-gradient(135deg, rgba(56,189,248,0.14), rgba(14,165,233,0.06))",
    selectedBg: "rgba(56,189,248,0.18)",
    dimColor: "rgba(56,189,248,0.35)",
  },
  {
    key: "niche" as const,
    label: "Targeted",
    sublabel: "<100k posts — converts best",
    emoji: "🎯",
    color: "#34d399",
    colorRgb: "52,211,153",
    bg: "rgba(52,211,153,0.10)",
    border: "rgba(52,211,153,0.25)",
    headerBg: "linear-gradient(135deg, rgba(52,211,153,0.14), rgba(16,185,129,0.06))",
    selectedBg: "rgba(52,211,153,0.18)",
    dimColor: "rgba(52,211,153,0.35)",
  },
];

const COPY_FORMATS = [
  { id: "space", label: "Space-separated" },
  { id: "newline", label: "One per line" },
  { id: "comment", label: "First comment" },
] as const;

const HOW_IT_WORKS = [
  { step: "01", title: "Describe Your Content", body: "Enter your topic, post idea, or caption. The more specific, the better.", color: "#6366f1", bg: "rgba(99,102,241,0.10)", border: "rgba(99,102,241,0.25)" },
  { step: "02", title: "Choose Platform", body: "Each platform has a different optimal count and audience behaviour. We tailor accordingly.", color: "#e1306c", bg: "rgba(225,48,108,0.10)", border: "rgba(225,48,108,0.25)" },
  { step: "03", title: "AI Builds Your Set", body: "GPT-4o analyses your niche and generates a three-tier mix: high-reach, growing, and targeted.", color: "#8b5cf6", bg: "rgba(139,92,246,0.10)", border: "rgba(139,92,246,0.25)" },
  { step: "04", title: "Curate & Copy", body: "Deselect any tags you don't want, pick your copy format, then copy your perfect set in one click.", color: "#34d399", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.25)" },
];

const FAQS = [
  { q: "How many hashtags should I use on Instagram?", a: "Instagram allows up to 30 hashtags per post. Research shows 20–30 hashtags typically generate the most reach for growth-stage accounts. Our generator gives you a balanced mix of popular, mid-tier and niche tags to maximise visibility without looking spammy." },
  { q: "Do hashtags still work on TikTok in 2026?", a: "Yes — but quality beats quantity on TikTok. 5–8 relevant hashtags perform better than 30 generic ones. TikTok's algorithm uses hashtags to categorise content and surface it to interested viewers, so niche-specific hashtags are especially powerful." },
  { q: "What is the difference between popular and niche hashtags?", a: "Popular hashtags (1M+ posts) have huge audiences but your post competes with millions of others and gets buried fast. Niche hashtags (<100k posts) have smaller but more engaged audiences — your post stays visible longer and reaches people actively searching that specific topic." },
  { q: "Can I use the same hashtags on every post?", a: "Instagram has historically penalised 'copy-paste' hashtag sets. Rotating your hashtags keeps your content fresh and lets you discover which tags drive the most reach for your account. Use this tool to generate a fresh set for each post." },
  { q: "What is the best free hashtag generator?", a: "ToolStack's Hashtag Generator is the only free tool that gives you AI-powered, platform-specific hashtag sets split by popularity tier — with individual tag selection, copy-format options, and a live character counter. Competitors either limit output to 10–15 tags, require signup, or charge for niche hashtag suggestions." },
  { q: "How often should I change my hashtags?", a: "Change them every post, or at minimum every 3–5 posts. Fresh hashtag sets help the algorithm re-evaluate your reach, expose you to new audiences, and avoid triggering spam filters on platforms like Instagram that flag repeated identical tag blocks." },
];

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

const JSON_LD = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hashtag Generator",
    description: "Free AI hashtag generator by ToolStack. Generate platform-specific hashtag sets for Instagram, TikTok, LinkedIn, X and YouTube. Three-tier mix of high-reach, growing and niche hashtags. No signup.",
    url: "https://toolstack.tech/tools/hashtag-generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "AI-powered three-tier hashtag sets",
      "Platform-specific sets for 5 platforms",
      "Individual tag selection and deselection",
      "Multiple copy formats (space, newline, first comment)",
      "100% private browser processing",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ToolStack", item: "https://toolstack.tech" },
      { "@type": "ListItem", position: 2, name: "Social Media", item: "https://toolstack.tech/tools?category=social" },
      { "@type": "ListItem", position: 3, name: "Hashtag Generator", item: "https://toolstack.tech/tools/hashtag-generator" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
]);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HashtagResult | null>(null);
  const [error, setError] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [copyFormat, setCopyFormat] = useState<"space" | "newline" | "comment">("space");
  const [copiedLabel, setCopiedLabel] = useState("");
  const [revealed, setRevealed] = useState(false);

  const selectedPlatform = PLATFORMS.find((p) => p.id === platform)!;

  // When result arrives, pre-select all tags and trigger reveal animation
  useEffect(() => {
    if (result) {
      const all = new Set([...result.popular, ...result.medium, ...result.niche]);
      setSelectedTags(all);
      setRevealed(false);
      const t = setTimeout(() => setRevealed(true), 50);
      return () => clearTimeout(t);
    }
  }, [result]);

  const generate = useCallback(async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    setRevealed(false);
    try {
      const res = await fetch("/api/hashtag-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), platform, tone }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Generation failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [topic, platform, tone, loading]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const toggleTier = (tags: string[]) => {
    const allSelected = tags.every((t) => selectedTags.has(t));
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (allSelected) tags.forEach((t) => next.delete(t));
      else tags.forEach((t) => next.add(t));
      return next;
    });
  };

  const formatTags = (tags: string[]) => {
    if (copyFormat === "newline") return tags.join("\n");
    if (copyFormat === "comment") return ".\n.\n.\n" + tags.join(" ");
    return tags.join(" ");
  };

  const copySelected = (label: string, tags?: string[]) => {
    const toCopy = tags
      ? tags.filter((t) => selectedTags.has(t))
      : result
      ? [...result.popular, ...result.medium, ...result.niche].filter((t) => selectedTags.has(t))
      : [];
    if (toCopy.length === 0) return;
    navigator.clipboard.writeText(formatTags(toCopy)).catch(() => {});
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(""), 2000);
  };

  const allTags = result ? [...result.popular, ...result.medium, ...result.niche] : [];
  const selectedArray = allTags.filter((t) => selectedTags.has(t));
  const charCount = selectedArray.join(" ").length;
  const charColor = charCount > 500 ? "#f87171" : charCount > 300 ? "#fbbf24" : "#34d399";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />

      <div style={{ minHeight: "100vh", background: "#08080e", padding: "72px 20px 100px", position: "relative", overflow: "hidden" }}>

        {/* ── Background glows ── */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "rgba(225,48,108,0.07)", filter: "blur(120px)" }} />
          <div style={{ position: "absolute", top: "30%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "rgba(99,102,241,0.07)", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "30%", width: 400, height: 400, borderRadius: "50%", background: "rgba(52,211,153,0.05)", filter: "blur(100px)" }} />
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Breadcrumb ── */}
          <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 40, flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>ToolStack</Link>
            <span>/</span>
            <Link href="/tools" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>All Tools</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Hashtag Generator</span>
          </nav>

          {/* ── Hero ── */}
          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(225,48,108,0.12)", border: "1px solid rgba(225,48,108,0.3)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#f9a8d4" }}>✓ AI Hashtag Generator · No Signup · Free · 5 Platforms</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
              Hashtag<br />
              <span style={{ background: "linear-gradient(135deg, #E1306C 0%, #8b5cf6 60%, #6366f1 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Generator.
              </span>
            </h1>
            <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 580, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
              Generate AI-powered hashtag sets for Instagram, TikTok, LinkedIn, X and YouTube. Three-tier mix of high-reach, growing and niche hashtags — tailored to your topic and platform. Free, no signup.
            </p>
          </div>

          {/* ── Tool Card ── */}
          <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "clamp(24px, 4vw, 40px)", marginBottom: 32 }}>

            {/* Topic */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 10 }}>
                Your Topic or Post Idea
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generate(); } }}
                placeholder="e.g. morning yoga for beginners, sustainable fashion brand, B2B SaaS marketing tips..."
                rows={3}
                style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontSize: 15, lineHeight: 1.6, resize: "none", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.15s" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(225,48,108,0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
                <span style={{ fontSize: 12, color: topic.length > 260 ? "#f87171" : "rgba(255,255,255,0.25)" }}>{topic.length}/280</span>
              </div>
            </div>

            {/* Platform selector — card style */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
                Platform
              </label>
              <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
                {PLATFORMS.map((p) => {
                  const active = platform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                        padding: "16px 14px 14px",
                        borderRadius: 18,
                        border: active ? `2px solid ${p.color}` : "2px solid rgba(255,255,255,0.07)",
                        background: active ? `rgba(${p.colorRgb},0.12)` : "rgba(255,255,255,0.03)",
                        cursor: "pointer", transition: "all 0.18s", flexShrink: 0, minWidth: 96,
                        boxShadow: active ? `0 0 24px rgba(${p.colorRgb},0.25)` : "none",
                      }}
                    >
                      {/* Icon box */}
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: active ? p.iconBg : "rgba(255,255,255,0.07)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: active ? "white" : "rgba(255,255,255,0.3)",
                        transition: "all 0.18s",
                        flexShrink: 0,
                      }}>
                        <p.Icon size={20} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: active ? p.color : "rgba(255,255,255,0.4)", whiteSpace: "nowrap", transition: "color 0.15s" }}>
                        {p.label}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: active ? `rgba(${p.colorRgb},0.7)` : "rgba(255,255,255,0.2)", whiteSpace: "nowrap" }}>
                        {p.countLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tone */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 10 }}>
                Tone / Style
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {TONES.map((t) => {
                  const active = tone === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      style={{
                        padding: "8px 18px", borderRadius: 999,
                        border: active ? "1px solid rgba(99,102,241,0.6)" : "1px solid rgba(255,255,255,0.1)",
                        background: active ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                        color: active ? "#a5b4fc" : "rgba(255,255,255,0.45)",
                        fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={loading || !topic.trim()}
              style={{
                width: "100%", padding: "17px 24px", borderRadius: 14, border: "none",
                background: loading || !topic.trim()
                  ? "rgba(255,255,255,0.06)"
                  : `linear-gradient(135deg, #E1306C 0%, #8b5cf6 60%, #6366f1 100%)`,
                color: loading || !topic.trim() ? "rgba(255,255,255,0.25)" : "white",
                fontSize: 16, fontWeight: 800, cursor: loading || !topic.trim() ? "not-allowed" : "pointer",
                transition: "all 0.2s", letterSpacing: "0.01em",
                boxShadow: loading || !topic.trim() ? "none" : "0 8px 32px rgba(225,48,108,0.3)",
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Generating hashtags...
                </span>
              ) : result ? (
                `↻ Regenerate for ${selectedPlatform.label}`
              ) : (
                `Generate Hashtags for ${selectedPlatform.label} →`
              )}
            </button>
          </div>

          {/* ── Error ── */}
          {error && (
            <div style={{ padding: "16px 20px", borderRadius: 14, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#fca5a5", fontSize: 14, marginBottom: 32 }}>
              {error}
            </div>
          )}

          {/* ── Results ── */}
          {result && (
            <div style={{ marginBottom: 48, opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>

              {/* Platform info bar */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
                padding: "14px 20px", borderRadius: 14, marginBottom: 20,
                background: `rgba(${selectedPlatform.colorRgb},0.10)`,
                border: `1px solid rgba(${selectedPlatform.colorRgb},0.28)`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: selectedPlatform.iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
                    <selectedPlatform.Icon size={16} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: selectedPlatform.color }}>{result.platformInfo}</span>
                </div>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
                  {result.popular.length + result.medium.length + result.niche.length} hashtags generated
                </span>
              </div>

              {/* Platform strategy tip */}
              <div style={{
                display: "flex", gap: 12, padding: "14px 18px", borderRadius: 14, marginBottom: 20,
                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>{selectedPlatform.label} tip: </span>
                  {selectedPlatform.tip}
                </p>
              </div>

              {/* Selection summary + copy format */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
                padding: "14px 18px", borderRadius: 14, marginBottom: 20,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
                    {selectedArray.length} of {allTags.length} selected
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: charColor }}>
                    {charCount} chars
                  </span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {COPY_FORMATS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setCopyFormat(f.id)}
                      style={{
                        padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.12s",
                        border: copyFormat === f.id ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.08)",
                        background: copyFormat === f.id ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                        color: copyFormat === f.id ? "#a5b4fc" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Copy all selected button */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <button
                  onClick={() => copySelected("all")}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: copiedLabel === "all" ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)",
                    color: copiedLabel === "all" ? "#34d399" : "rgba(255,255,255,0.75)",
                    fontSize: 13, fontWeight: 800, cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {copiedLabel === "all" ? "✓ Copied!" : `Copy Selected (${selectedArray.length})`}
                </button>
              </div>

              {/* Three tiers */}
              {TIERS.map((tier) => {
                const tags = result[tier.key];
                if (!tags || tags.length === 0) return null;
                const tierSelected = tags.filter((t) => selectedTags.has(t));
                const allTierSelected = tierSelected.length === tags.length;
                return (
                  <div key={tier.key} style={{ borderRadius: 18, border: `1px solid ${tier.border}`, overflow: "hidden", marginBottom: 14 }}>
                    {/* Tier header */}
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
                      padding: "13px 18px", background: tier.headerBg, borderBottom: `1px solid ${tier.border}`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 17 }}>{tier.emoji}</span>
                        <div>
                          <span style={{ fontSize: 13, fontWeight: 800, color: tier.color }}>{tier.label}</span>
                          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>{tier.sublabel}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: tier.bg, border: `1px solid ${tier.border}`, color: tier.color }}>
                          {tierSelected.length}/{tags.length}
                        </span>
                        <button
                          onClick={() => toggleTier(tags)}
                          style={{
                            padding: "5px 12px", borderRadius: 8, border: `1px solid ${tier.border}`,
                            background: "rgba(255,255,255,0.04)", color: allTierSelected ? tier.color : "rgba(255,255,255,0.4)",
                            fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.12s",
                          }}
                        >
                          {allTierSelected ? "Deselect all" : "Select all"}
                        </button>
                        <button
                          onClick={() => copySelected(tier.key, tags)}
                          style={{
                            padding: "5px 12px", borderRadius: 8, border: `1px solid ${tier.border}`,
                            background: copiedLabel === tier.key ? tier.bg : "rgba(255,255,255,0.04)",
                            color: copiedLabel === tier.key ? tier.color : "rgba(255,255,255,0.5)",
                            fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.12s", whiteSpace: "nowrap",
                          }}
                        >
                          {copiedLabel === tier.key ? "✓ Copied" : "Copy tier"}
                        </button>
                      </div>
                    </div>

                    {/* Hashtag pills */}
                    <div style={{ padding: "16px 18px", display: "flex", flexWrap: "wrap", gap: 8, background: "rgba(255,255,255,0.015)" }}>
                      {tags.map((tag, idx) => {
                        const isSelected = selectedTags.has(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            title={isSelected ? "Click to deselect" : "Click to select"}
                            style={{
                              padding: "7px 14px", borderRadius: 999, cursor: "pointer", transition: "all 0.15s",
                              border: isSelected ? `1px solid ${tier.border}` : "1px solid rgba(255,255,255,0.07)",
                              background: isSelected ? tier.bg : "rgba(255,255,255,0.03)",
                              color: isSelected ? tier.color : "rgba(255,255,255,0.25)",
                              fontSize: 13, fontWeight: 600, letterSpacing: "0.01em",
                              opacity: 1,
                              animation: `tagIn 0.3s ease both`,
                              animationDelay: `${idx * 35}ms`,
                            }}
                          >
                            {isSelected ? tag : <span style={{ textDecoration: "line-through", opacity: 0.5 }}>{tag}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Pro tip */}
              {result.pro_tip && (
                <div style={{
                  display: "flex", gap: 14, padding: "16px 20px", borderRadius: 14, marginTop: 8,
                  background: "linear-gradient(135deg, rgba(99,102,241,0.10), rgba(139,92,246,0.06))",
                  border: "1px solid rgba(99,102,241,0.25)",
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>✦</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#a5b4fc", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 5 }}>AI Strategy Tip</div>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.65 }}>{result.pro_tip}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SEO CONTENT */}
          <section style={{ marginBottom: 64, padding: "36px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(225,48,108,0.2)" }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>How to choose the right hashtags — the three-tier strategy explained</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: "0 0 24px" }}>
              A <strong style={{ color: "white" }}>hashtag</strong> is a keyword or phrase prefixed with # that platforms use to categorise content and surface it to users searching or following that topic. Choosing the right hashtags is one of the most effective organic reach strategies on Instagram, TikTok, LinkedIn and YouTube — but using the wrong ones (too broad, too competitive) means your post gets buried immediately.
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: "0 0 24px" }}>
              The most effective approach — used by professional social media managers — is a <strong style={{ color: "white" }}>three-tier mix</strong>: a small number of high-reach tags for broad exposure, a core of mid-tier tags where competition is manageable, and a targeted set of niche tags where your post stays visible longest and reaches the most engaged audience.
            </p>

            <div style={{ overflowX: "auto", margin: "10px 0 32px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                    <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#E1306C" }}>Tier</th>
                    <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Post Volume</th>
                    <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#8b5cf6" }}>Best for</th>
                  </tr>
                </thead>
                <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                  <tr>
                    <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>High-Reach</td>
                    <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>1M+ posts</td>
                    <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Broad visibility signal — posts move fast</td>
                  </tr>
                  <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Growing</td>
                    <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>100k–1M posts</td>
                    <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#E1306C" }}>Best reach-to-competition ratio</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Niche</td>
                    <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Under 100k posts</td>
                    <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#E1306C" }}>Highly engaged audience, longer visibility window</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
               <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Platform differences matter</h3>
               <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
                 Each platform handles hashtags differently. Instagram supports up to 30 and rewards a full mix. TikTok&apos;s algorithm is topic-based — 5–8 specific tags outperform 30 generic ones. LinkedIn penalises posts that look spammy, so 3–5 targeted tags work best. X (Twitter) hashtags eat into your character count, so 1–2 maximum. YouTube hashtags appear above the video title when placed in the description — the first three are shown publicly. This generator tailors the set to whichever platform you select.
               </p>
            </div>
          </section>

          {/* ── How It Works ── */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How It Works</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Four steps from topic to ready-to-post hashtag set.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14 }}>
              {HOW_IT_WORKS.map((item) => (
                <div key={item.step} style={{ padding: "22px 20px", borderRadius: 18, background: item.bg, border: `1px solid ${item.border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: item.color, marginBottom: 12 }}>STEP {item.step}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3-Tier Strategy ── */}
          <section style={{
            marginBottom: 64, padding: "28px",
            borderRadius: 20,
            background: "linear-gradient(135deg, rgba(225,48,108,0.08), rgba(99,102,241,0.06))",
            border: "1px solid rgba(225,48,108,0.2)",
          }}>
            <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 14 }}>
              The 3-Tier Hashtag Strategy
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: "0 0 20px" }}>
              Top social media marketers don&apos;t use random hashtags — they use a deliberate mix across three tiers.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {TIERS.map((tier) => (
                <div key={tier.key} style={{ padding: "16px 18px", borderRadius: 14, background: tier.bg, border: `1px solid ${tier.border}` }}>
                  <div style={{ fontSize: 18, marginBottom: 8 }}>{tier.emoji}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: tier.color, margin: "0 0 6px" }}>{tier.label}</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.55 }}>
                    {tier.key === "popular"
                      ? "Maximises initial reach and signals relevance to the algorithm. Highly competitive — posts get buried fast, but volume exposure is worth it."
                      : tier.key === "medium"
                      ? "The sweet spot. Your post stays visible longer and reaches genuinely interested audiences. Most experts prioritise this tier."
                      : "Where real engagement happens. Fewer competitors, highly targeted audience, better conversion. Essential for community building."}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 24 }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {FAQS.map((faq) => (
                <div key={faq.q} style={{ padding: "20px 22px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 10px", lineHeight: 1.4 }}>{faq.q}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <MoreTools currentSlug="hashtag-generator" />
          
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes tagIn { from { opacity: 0; transform: scale(0.85) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        ::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>
    </>
  );
}
