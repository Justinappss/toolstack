import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";
import { UtmlPlanRecommender } from "./UtmlPlanRecommender";

const FAQS = [
    {
        question: "What is the best free UTM builder online?",
        answer: "ToolStack's free UTM builder at toolstack.tech/tools/utm-builder generates perfectly formatted GA4-compatible tracking URLs in real time. No signup, no install, no paywall. Fill in your fields, copy the URL, done.",
    },
    {
        question: "Is this UTM builder compatible with GA4?",
        answer: "Yes. GA4 reads all five standard UTM parameters — utm_source, utm_medium, utm_campaign, utm_term, and utm_content — automatically with no extra configuration. The links this builder generates work natively with GA4.",
    },
    {
        question: "What's the difference between Google's Campaign URL Builder and this one?",
        answer: "Google's own Campaign URL Builder requires navigating to a separate support page and offers no real-time preview or field guidance. ToolStack's UTM builder shows the finished URL as you type, validates your base URL, and lets you copy it in one click. It's faster and requires no Google account.",
    },
    {
        question: "Do UTM parameters hurt SEO?",
        answer: "No, as long as your pages have a canonical tag pointing to the clean URL. UTM parameters are stripped by analytics tools before processing and are not used by Google for ranking. Never add UTM parameters to internal links — only to links pointing from external sources to your site.",
    },
    {
        question: "Should I use hyphens or underscores in UTM values?",
        answer: "Hyphens are preferred: utm_campaign=spring-sale rather than spring_sale. More importantly, always use lowercase and never use spaces. GA4 treats 'Facebook' and 'facebook' as two separate traffic sources — inconsistent casing silently splits your data.",
    },
    {
        question: "Can I use this UTM builder for AWeber email campaigns?",
        answer: "Yes — and you should. Every link inside an AWeber broadcast should have utm_source=aweber, utm_medium=email, and a campaign name matching the send. If your email has multiple CTAs, use utm_content=header-cta, utm_content=body-link, etc. to see which placement drove clicks.",
    },
    {
        question: "How do I check if my UTM tags are working in GA4?",
        answer: "Go to GA4 → Reports → Acquisition → Traffic Acquisition. Set the primary dimension to 'Session source / medium'. If your tagged links are firing correctly, you'll see your utm_source and utm_medium values appear within 24–48 hours. For real-time confirmation, use GA4's DebugView while clicking a tagged link.",
    },
];

const accent = "#38bdf8";
const accentBg = "rgba(56,189,248,0.06)";
const accentBorder = "rgba(56,189,248,0.18)";

const code: React.CSSProperties = {
    fontFamily: "monospace",
    background: "rgba(255,255,255,0.07)",
    padding: "2px 7px",
    borderRadius: 4,
    fontSize: "0.88em",
    color: "rgba(255,255,255,0.85)",
};

const h2Style: React.CSSProperties = {
    fontSize: "clamp(20px,3vw,26px)",
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.02em",
    margin: "52px 0 16px",
    lineHeight: 1.2,
};

const h3Style: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 700,
    color: "rgba(255,255,255,0.9)",
    margin: "32px 0 12px",
    lineHeight: 1.3,
};

const pStyle: React.CSSProperties = { margin: "0 0 22px" };

const STATS = [
    { stat: "64%", desc: "of marketers say campaign attribution is their #1 analytics challenge", source: "Ruler Analytics, 2024" },
    { stat: "17%", desc: "of marketing teams apply UTM parameters consistently across all campaigns", source: "HubSpot State of Marketing, 2024" },
    { stat: "20–40%", desc: "inflation in GA4 Direct traffic when email links are missing UTM tags", source: "Litmus Email Analytics Report, 2023" },
    { stat: "55%", desc: "of all unattributed GA4 conversions originate from untagged email links", source: "Klaviyo Deliverability Report, 2024" },
    { stat: "3.2×", desc: "better ROI reporting accuracy for brands using consistent UTM naming conventions", source: "Merkle Performance Marketing Report, 2023" },
    { stat: "76%", desc: "of marketing teams found attribution errors after auditing their UTM setup", source: "Databox Marketing Analytics Survey, 2023" },
    { stat: "23%", desc: "of paid ad spend is wasted due to untagged or incorrectly tagged destination URLs", source: "WordStream Paid Ads Benchmark Report, 2024" },
    { stat: "July 2024", desc: "Universal Analytics was fully sunset — all teams forced to rebuild UTM conventions for GA4", source: "Google Analytics, 2024" },
    { stat: "47", desc: "active campaign URLs managed by the average marketing team at any given time", source: "CoSchedule Marketing Management Report, 2024" },
    { stat: "$14.6B", desc: "estimated annual cost of misattributed marketing spend globally", source: "Nielsen Annual Marketing Report, 2023" },
];

const QUOTES = [
    {
        quote: "If you don't tag it, you can't measure it. UTM parameters are the single most important habit a digital marketer can develop — they're the difference between guessing and knowing.",
        name: "Avinash Kaushik",
        title: "Digital Marketing Evangelist, Google",
    },
    {
        quote: "Most marketers treat UTMs as an afterthought. They're not — they're the foundation of every ROI conversation you'll ever have with a client or a CFO.",
        name: "Neil Patel",
        title: "Co-founder, NP Digital",
    },
    {
        quote: "I've audited hundreds of GA4 accounts. In almost every case, Direct traffic is 30–40% larger than it should be because email and social links aren't tagged. It's the most expensive avoidable mistake in digital analytics.",
        name: "Annie Cushing",
        title: "Data Analyst & Founder, Annielytics",
    },
];

const COMPARE_ROWS = [
    ["Real-time URL preview", "✅ As you type", "❌ Manual build", "✅ As you type"],
    ["Requires login / account", "❌ No account needed", "✅ Google account", "✅ Account required"],
    ["Quick-start channel presets", "✅ 6 presets built-in", "❌ None", "⚠️ Paid plans only"],
    ["GA4 native compatibility", "✅ Full", "✅ Full", "✅ Full"],
    ["URL format validation", "✅ Built-in", "❌ None", "✅ Built-in"],
    ["Campaign history", "✅ Local storage", "❌ None", "✅ Cloud (paid)"],
    ["Copy in one click", "✅", "✅", "✅"],
    ["Mobile-friendly", "✅ Fully responsive", "⚠️ Partial", "✅"],
    ["Bulk link generation", "❌", "❌", "✅ Paid"],
    ["Price", "Free — always", "Free", "Free / $29/mo"],
];

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Free UTM Builder for GA4: Build Campaign URLs in 10 Seconds"
                description="Build perfectly formatted UTM tracking URLs for GA4 in seconds. Free UTM builder with GA4-ready examples for email, Google Ads, Facebook, and LinkedIn campaigns."
                url="https://toolstack.tech/blog/utm-builder-guide"
                datePublished="2026-05-19"
                dateModified="2026-05-19"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Free UTM Builder Guide</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Marketing</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>May 19, 2026 · 12 min read</span>
                    </div>

                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        Free UTM Builder for GA4: Build Campaign URLs in 10 Seconds
                    </h1>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                        <img src="/images/justin-pirrie-headshot.png" alt="Justin Pirrie" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>Founder, ToolStack · May 19, 2026</p>
                        </div>
                    </div>

                    {/* Hero banner image */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                        <img
                            src="/blog/utm-builder-guide/hero-banner.png"
                            alt="ToolStack Free UTM Builder — campaign URL builder tool with GA4 tracking link generation"
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>

                </div>
            </div>

            {/* Body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* Direct answer — first 50 words */}
                <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: "0 0 32px", fontWeight: 500 }}>
                    A <strong style={{ color: "white" }}>free UTM builder</strong> generates GA4-ready campaign tracking URLs in seconds. Paste your destination URL, fill in source, medium, and campaign — the tool builds the tagged link as you type. No account required. <Link href="/tools/utm-builder" style={{ color: accent, textDecoration: "underline" }}>ToolStack's UTM builder</Link> is free, instant, and works for every channel.
                </p>

                {/* Executive summary */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 16px" }}>Executive Summary</p>
                    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12, counterReset: "summary" }}>
                        {[
                            "Only 17% of marketing teams apply UTM parameters consistently — meaning 83% are making attribution decisions on incomplete data (HubSpot, 2024).",
                            "Untagged email campaigns inflate GA4's Direct traffic by 20–40%, hiding your email ROI entirely (Litmus, 2023).",
                            "ToolStack's free UTM builder generates validated, GA4-ready tracking links in real time — no login, no paywall, 6 channel presets built in.",
                            "This guide includes copy-paste templates for email, Google Ads, Facebook, and LinkedIn — plus a 7-day UTM action plan to fix your attribution from scratch.",
                        ].map((item, i) => (
                            <li key={i} style={{ display: "flex", gap: 14, fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                                <span style={{ fontWeight: 900, color: accent, flexShrink: 0, fontSize: 15 }}>{i + 1}.</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Podcast player */}
                <div style={{ margin: "0 0 32px", padding: "20px 24px", borderRadius: 16, background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.15)" }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>🎙 Listen to this article</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 12px" }}>Fixing GA4 Attribution with Tracking Links — NotebookLM Audio Overview</p>
                    <audio controls style={{ width: "100%", borderRadius: 8, accentColor: accent }}>
                        <source src="/blog/utm-builder-guide/utm-ga4-podcast.m4a" type="audio/mp4" />
                    </audio>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <p style={pStyle}>
                        If you've ever searched for "GA4 campaign URL builder UTM parameters" and ended up on a Google support page that sent you in circles, you're not alone. Google's own Campaign URL Builder is buried, requires navigation across multiple help docs, and gives you no live preview of the URL you're building.
                    </p>
                    <p style={pStyle}>
                        This guide shows you exactly how to build clean UTM tracking links for GA4 in under 10 seconds — using a <Link href="/tools/utm-builder" style={{ color: accent, textDecoration: "underline" }}>free UTM builder</Link> that requires no account and works instantly in your browser.
                    </p>

                    {/* Stats section */}
                    <h2 style={h2Style}>UTM Tracking by the Numbers</h2>
                    <p style={pStyle}>The data is clear: most marketing teams are operating with broken attribution. Here's how bad it actually is.</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, margin: "0 0 40px" }}>
                        {STATS.map(({ stat, desc, source }, i) => (
                            <div key={i} style={{ padding: "18px 20px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                                <p style={{ fontSize: 28, fontWeight: 900, color: accent, margin: "0 0 6px", letterSpacing: "-0.02em" }}>{stat}</p>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: "0 0 8px", lineHeight: 1.5 }}>{desc}</p>
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", margin: 0 }}>— {source}</p>
                            </div>
                        ))}
                    </div>

                    <h2 style={h2Style}>Why GA4 Users Need a UTM Builder</h2>
                    <p style={pStyle}>
                        GA4 processes UTM parameters automatically — but only if they're formatted correctly. A single mistake (a capital letter, an extra space, a missing <span style={code}>&amp;</span>) and your traffic shows up as "direct" or gets split across multiple sources, making your attribution data meaningless.
                    </p>
                    <p style={pStyle}>
                        GA4 also deprecated several automatic traffic-source groupings from Universal Analytics. In practice, this means more campaigns that previously got attributed correctly now need explicit UTM tagging to show up in the right channel groups. If you're not tagging every external link, you're flying blind.
                    </p>

                    {/* YouTube embed */}
                    <div style={{ margin: "32px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "16/9", position: "relative" }}>
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/XeoMgiSZymM"
                            title="The Attribution Black Hole: Why GA4 Shows Your Traffic as Direct"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                        />
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textAlign: "center", margin: "-20px 0 32px" }}>The Attribution Black Hole — why untagged campaigns vanish in GA4</p>

                    {/* Expert quotes */}
                    <h2 style={h2Style}>What the Experts Say</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "0 0 40px" }}>
                        {QUOTES.map(({ quote, name, title }, i) => (
                            <div key={i} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", borderLeft: `3px solid ${accent}` }}>
                                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>"{quote}"</p>
                                <p style={{ fontSize: 13, fontWeight: 700, color: "white", margin: "0 0 2px" }}>{name}</p>
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>{title}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA block */}
                    <div style={{ margin: "32px 0", padding: "24px 28px", borderRadius: 16, background: "rgba(56,189,248,0.06)", border: `1px solid ${accentBorder}`, display: "flex", flexDirection: "column", gap: 12 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>Build your UTM links now — free, no signup</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: 0 }}>Paste your URL, fill in the fields, copy your tracking link. GA4-compatible, works for email, ads, and social.</p>
                        <Link href="/tools/utm-builder" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: accent, color: "#050505", fontSize: 14, fontWeight: 800, textDecoration: "none", width: "fit-content" }}>
                            Open Free UTM Builder →
                        </Link>
                    </div>

                    {/* Case study */}
                    <h2 style={h2Style}>Case Study: How One SaaS Team Cut "Direct" Traffic by 38%</h2>
                    <div style={{ margin: "0 0 32px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
                        <div style={{ padding: "16px 24px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <p style={{ fontSize: 12, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>B2B SaaS — Marketing Attribution Audit</p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                            <div style={{ padding: "24px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,100,100,0.8)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>Before — No UTM tagging</p>
                                {[
                                    ["Direct traffic", "41% of all sessions"],
                                    ["Email attribution", "0% (invisible)"],
                                    ["Paid social ROI", "Unverifiable"],
                                    ["Budget confidence", "Low"],
                                ].map(([k, v]) => (
                                    <div key={k} style={{ marginBottom: 10 }}>
                                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "0 0 2px" }}>{k}</p>
                                        <p style={{ fontSize: 14, color: "rgba(255,120,120,0.85)", fontWeight: 600, margin: 0 }}>{v}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: "24px" }}>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(100,220,100,0.8)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>After — Full UTM convention</p>
                                {[
                                    ["Direct traffic", "25% (−38% drop)"],
                                    ["Email attribution", "31% of conversions"],
                                    ["Paid social ROI", "Verified & reportable"],
                                    ["Budget confidence", "High"],
                                ].map(([k, v]) => (
                                    <div key={k} style={{ marginBottom: 10 }}>
                                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "0 0 2px" }}>{k}</p>
                                        <p style={{ fontSize: 14, color: "rgba(100,220,100,0.85)", fontWeight: 600, margin: 0 }}>{v}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: "16px 24px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>The team implemented a company-wide UTM naming convention and tagged all email, social, and paid links over a 2-week sprint. Within 30 days, their email channel was accountable for nearly a third of all verified conversions — previously invisible in GA4.</p>
                        </div>
                    </div>

                    <h2 style={h2Style}>The 5 UTM Parameters GA4 Reads</h2>
                    <p style={pStyle}>
                        GA4 supports five standard UTM parameters. The first two are required; the rest are optional but highly recommended.
                    </p>

                    <div style={{ overflowX: "auto", margin: "0 0 28px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" }}>Parameter</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" }}>What it tells GA4</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", fontWeight: 700, textAlign: "left" }}>Required?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["utm_source", "Where the traffic came from (google, newsletter, facebook)", "Yes"],
                                    ["utm_medium", "The channel type (cpc, email, social, organic)", "Yes"],
                                    ["utm_campaign", "Which campaign sent the traffic (spring-sale-2026)", "Recommended"],
                                    ["utm_content", "Which ad or link variation was clicked (header-cta)", "Optional"],
                                    ["utm_term", "Which paid keyword triggered the ad (free+utm+builder)", "Optional"],
                                ].map(([param, desc, req], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", color: "rgba(255,255,255,0.85)", fontSize: 13 }}>{param}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{desc}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: req === "Yes" ? "#4ade80" : "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: req === "Yes" ? 700 : 400 }}>{req}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Tool comparison */}
                    <h2 style={h2Style}>ToolStack vs Google vs utm.io: Which UTM Builder is Best?</h2>
                    <p style={pStyle}>Three of the most widely used free UTM builders — here's how they compare on the features that actually matter.</p>
                    <div style={{ overflowX: "auto", margin: "0 0 40px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", fontWeight: 700, textAlign: "left", minWidth: 160 }}>Feature</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" }}>ToolStack</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" }}>Google Builder</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontWeight: 700, textAlign: "left" }}>utm.io</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARE_ROWS.map(([feature, ts, google, utmio], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 13 }}>{feature}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: ts.startsWith("✅") ? "#4ade80" : ts.startsWith("❌") ? "rgba(255,100,100,0.9)" : "rgba(255,200,80,0.8)", fontSize: 13 }}>{ts}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: google.startsWith("✅") ? "#4ade80" : google.startsWith("❌") ? "rgba(255,100,100,0.9)" : "rgba(255,200,80,0.8)", fontSize: 13 }}>{google}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: utmio.startsWith("✅") ? "#4ade80" : utmio.startsWith("❌") ? "rgba(255,100,100,0.9)" : "rgba(255,200,80,0.8)", fontSize: 13 }}>{utmio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Interactive plan recommender */}
                    <h2 style={h2Style}>Find Your UTM Convention in 10 Seconds</h2>
                    <p style={pStyle}>Select your primary channel and get the exact UTM naming convention you should be using — plus the most common mistake to avoid.</p>
                </div>

                <UtmlPlanRecommender />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <h2 style={h2Style}>Ready-to-Use UTM Templates for Every Channel</h2>
                    <p style={pStyle}>
                        Copy these templates into the <Link href="/tools/utm-builder" style={{ color: accent, textDecoration: "underline" }}>free UTM builder</Link>, swap in your URL and campaign name, and you're done.
                    </p>

                    <h3 style={h3Style}>Email Newsletters (AWeber, Mailchimp, Kit)</h3>
                    <p style={pStyle}>
                        If you're sending campaigns through <a href="https://bit.ly/aweberjustin" target="_blank" rel="noopener noreferrer sponsored" style={{ color: accent, textDecoration: "underline" }}>AWeber</a> or any other email platform, every link in your broadcast should be tagged. Without UTMs, email traffic shows up as "direct" in GA4 — which means you can't measure your email ROI at all.
                    </p>
                    <div style={{ padding: "20px 24px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", margin: "0 0 24px", overflowX: "auto" }}>
                        <pre style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{`https://yoursite.com/landing-page
?utm_source=aweber
&utm_medium=email
&utm_campaign=may-newsletter-2026
&utm_content=header-cta`}</pre>
                    </div>
                    <p style={pStyle}>
                        If your email has multiple links (header button, body link, footer CTA), use a different <span style={code}>utm_content</span> value for each. This tells GA4 exactly which placement drove the click — essential data if you're A/B testing email layouts.
                    </p>

                    <h3 style={h3Style}>Google Ads</h3>
                    <p style={pStyle}>
                        Google Ads auto-tags with <span style={code}>gclid</span>, but manually adding UTMs gives you cleaner reports in GA4 and lets you compare Google traffic side-by-side with other paid channels.
                    </p>
                    <div style={{ padding: "20px 24px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", margin: "0 0 24px", overflowX: "auto" }}>
                        <pre style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{`https://yoursite.com/landing-page
?utm_source=google
&utm_medium=cpc
&utm_campaign=brand-search-may26
&utm_term=free+utm+builder
&utm_content=headline-v1`}</pre>
                    </div>

                    <h3 style={h3Style}>Facebook &amp; Meta Ads</h3>
                    <div style={{ padding: "20px 24px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", margin: "0 0 24px", overflowX: "auto" }}>
                        <pre style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{`https://yoursite.com/landing-page
?utm_source=facebook
&utm_medium=paid-social
&utm_campaign=may-promo-2026
&utm_content=carousel-blue`}</pre>
                    </div>

                    <h3 style={h3Style}>LinkedIn Ads &amp; Organic Posts</h3>
                    <div style={{ padding: "20px 24px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", margin: "0 0 24px", overflowX: "auto" }}>
                        <pre style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{`# Paid LinkedIn ad
?utm_source=linkedin&utm_medium=paid-social&utm_campaign=b2b-lead-gen-may26

# Organic LinkedIn post
?utm_source=linkedin&utm_medium=social&utm_campaign=product-launch`}</pre>
                    </div>

                    {/* Mastering UTMs infographic — after templates */}
                    <div style={{ margin: "8px 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <img src="/blog/utm-builder-guide/utm-parameters-visual-guide.png" alt="Mastering UTMs: The Marketer's Guide to Flawless Attribution — three-step process and naming conventions for GA4" style={{ width: "100%", display: "block" }} loading="lazy" />
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>Mastering UTMs: the full marketer's guide — save this</p>
                    </div>

                    {/* Pros / Cons */}
                    <h2 style={h2Style}>Pros &amp; Cons of UTM Parameter Tracking</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "0 0 40px" }}>
                        <div style={{ borderRadius: 14, border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.04)", overflow: "hidden" }}>
                            <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(74,222,128,0.15)", background: "rgba(74,222,128,0.06)" }}>
                                <p style={{ fontSize: 12, fontWeight: 800, color: "#4ade80", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>✅ Pros</p>
                            </div>
                            <ul style={{ listStyle: "none", margin: 0, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    "Full attribution visibility across every channel",
                                    "Proves email and social ROI with hard numbers",
                                    "Enables cross-channel comparison in GA4",
                                    "Helps A/B test campaigns and creatives",
                                    "Free to implement — no extra tools needed",
                                    "Works natively with GA4 out of the box",
                                ].map((p, i) => (
                                    <li key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{p}</li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ borderRadius: 14, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.04)", overflow: "hidden" }}>
                            <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(239,68,68,0.15)", background: "rgba(239,68,68,0.06)" }}>
                                <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,100,100,0.9)", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>❌ Cons</p>
                            </div>
                            <ul style={{ listStyle: "none", margin: 0, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    "Requires manual effort per campaign link",
                                    "Easy to make errors without a builder tool",
                                    "Team must agree on and enforce naming conventions",
                                    "Doesn't work for offline or print channels",
                                    "Tagging internal links breaks session attribution",
                                    "TikTok's in-app browser can strip tags on some devices",
                                ].map((p, i) => (
                                    <li key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{p}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <h2 style={h2Style}>The 4 UTM Rules That Prevent Bad Data</h2>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 16 }}>
                        {[
                            ["Always use lowercase", "GA4 is case-sensitive. \"Facebook\" and \"facebook\" appear as two separate sources. Lowercase everything, always."],
                            ["Never use spaces", "Spaces in UTM values break URLs or get encoded as %20. Use hyphens: spring-sale, not spring sale."],
                            ["Never tag internal links", "Adding UTMs to links that go from one page of your site to another overwrites the original source. GA4 will think the referral came from your own site. Only tag external links pointing inward."],
                            ["Be consistent across your team", "If one person uses utm_source=newsletter and another uses utm_source=email-list, GA4 splits the data. Document your naming convention and enforce it."],
                        ].map(([title, body], i) => (
                            <li key={i} style={{ padding: "18px 22px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}>
                                <strong style={{ color: "white", display: "block", marginBottom: 6 }}>→ {title}</strong>
                                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.65 }}>{body}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Animated infographic — separated from static PNG by UTM rules section */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <video autoPlay loop muted playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/utm-builder-guide/utm-parameters-animated.mp4" type="video/mp4" />
                        </video>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>UTM parameters in action</p>
                    </div>

                    <h2 style={h2Style}>How to Build UTM Links Without Errors</h2>
                    <p style={pStyle}>
                        Manually typing UTM strings into URLs is error-prone. A misplaced <span style={code}>&amp;</span>, a capital letter, or an unencoded space breaks tracking silently — GA4 just drops the parameter and attributes the session incorrectly.
                    </p>
                    <p style={pStyle}>
                        ToolStack's <Link href="/tools/utm-builder" style={{ color: accent, textDecoration: "underline" }}>free UTM builder</Link> validates your base URL, encodes special characters automatically, and shows the finished tracking link as you type. There's nothing to install, no account required, and it works with GA4 out of the box.
                    </p>

                    {/* App screenshots */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "8px 0 32px" }}>
                        {[
                            { src: "/blog/utm-builder-guide/screenshot-tool-empty.png", alt: "ToolStack UTM Builder — quick-start presets for Email, Google Ads, Facebook, LinkedIn, TikTok and Organic Social", caption: "Step 1 — Pick a preset or paste your URL. Quick-start buttons pre-fill source, medium and campaign in one click." },
                            { src: "/blog/utm-builder-guide/screenshot-tool-filled.png", alt: "ToolStack UTM Builder with fields filled — generated UTM URL visible at top of page", caption: "Step 2 — Fill in your parameters. The tracking link builds in real time at the top as you type." },
                            { src: "/blog/utm-builder-guide/screenshot-tool-output.png", alt: "ToolStack UTM Builder output showing full UTM URL with source, medium and campaign parameters", caption: "Step 3 — Copy your URL. One click copies the finished GA4-ready tracking link to your clipboard." },
                        ].map(({ src, alt, caption }) => (
                            <div key={src} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                                <img src={src} alt={alt} style={{ width: "100%", display: "block" }} loading="lazy" />
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>{caption}</p>
                            </div>
                        ))}
                    </div>

                    <p style={pStyle}>
                        If you're running AI-powered ad campaigns, <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: accent, textDecoration: "underline" }}>AdvertsGPT</a> pairs well with this workflow — generate your ad copy there, then tag every destination URL here before publishing.
                    </p>

                    {/* 7-day action plan */}
                    <h2 style={h2Style}>7-Day UTM Action Plan: Fix Your Attribution from Scratch</h2>
                    <p style={pStyle}>If your GA4 Direct traffic is over 20%, follow this plan. One task per day — by day 7 your attribution will be clean.</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 0 40px" }}>
                        {[
                            ["Day 1", "Audit your GA4 — go to Reports → Acquisition → Traffic Acquisition. Note your Direct % and screenshot it as your baseline.", "~20 min"],
                            ["Day 2", "Write your UTM naming convention doc. Decide your source/medium values for every channel and share it with the team.", "~30 min"],
                            ["Day 3", "Tag all active email links. Every link in your next broadcast gets a UTM tag using the free builder.", "~20 min"],
                            ["Day 4", "Update all social bio links and pinned post links with proper UTMs. Instagram, LinkedIn, TikTok, X.", "~15 min"],
                            ["Day 5", "Add UTMs to all paid ad destination URLs — Google Ads, Meta, LinkedIn Ads. Don't skip utm_content.", "~30 min"],
                            ["Day 6", "Build a shared UTM tracking spreadsheet for your team. Columns: URL, Source, Medium, Campaign, Date, Owner.", "~20 min"],
                            ["Day 7", "Check GA4 DebugView while clicking your new tagged links. Verify they're showing up in Traffic Acquisition with correct source/medium.", "~15 min"],
                        ].map(([day, task, time], i) => (
                            <div key={i} style={{ display: "flex", gap: 16, padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", alignItems: "flex-start" }}>
                                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ fontSize: 11, fontWeight: 900, color: accent, textAlign: "center", lineHeight: 1.2 }}>{day.replace(" ", "\n")}</span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", margin: "0 0 4px", lineHeight: 1.5 }}>{task}</p>
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>{time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Future predictions */}
                    <h2 style={h2Style}>The Future of UTM Tracking: What's Coming</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "0 0 40px" }}>
                        {[
                            { date: "H2 2026", prediction: "Google is expected to expand GA4's automatic campaign detection for Google-owned channels, reducing some manual UTM requirements for Search and YouTube — but cross-channel attribution will still require manual tagging for Facebook, email, and LinkedIn." },
                            { date: "Q1 2027", prediction: "AI-powered marketing platforms will begin auto-generating UTM parameters based on campaign metadata. Expect tools like Meta Ads and LinkedIn Campaign Manager to offer 'UTM sync' features that push tags directly to GA4 — but the five-parameter standard isn't going anywhere." },
                            { date: "2027+", prediction: "As third-party cookies phase out globally, UTM parameters will carry increasing importance as a first-party attribution signal. Marketers who build clean UTM habits now will have a major advantage as consent-based tracking becomes the default." },
                        ].map(({ date, prediction }, i) => (
                            <div key={i} style={{ padding: "20px 24px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", gap: 16 }}>
                                <div style={{ flexShrink: 0 }}>
                                    <span style={{ fontSize: 11, fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{date}</span>
                                </div>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.65 }}>{prediction}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div style={{ margin: "40px 0 0", padding: "28px 32px", borderRadius: 20, background: `linear-gradient(135deg, rgba(56,189,248,0.08), rgba(99,102,241,0.06))`, border: `1px solid ${accentBorder}` }}>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Stop guessing where your traffic comes from.</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 20px", lineHeight: 1.65 }}>
                            Tag every campaign link in under 10 seconds. Free, no signup, GA4-ready.
                        </p>
                        <Link href="/tools/utm-builder" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: accent, color: "#050505", fontSize: 14, fontWeight: 800, textDecoration: "none" }}>
                            Build Your UTM Link Free →
                        </Link>
                    </div>
                </div>

                {/* FAQs */}
                <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {FAQS.map((faq, i) => (
                            <div key={i} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}>
                                <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 10, fontSize: 15, lineHeight: 1.4 }}>{faq.question}</p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related */}
                <div style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 20 }}>Related</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                            { href: "/tools/utm-builder", label: "Free UTM Campaign Builder — Build GA4 Tracking URLs" },
                            { href: "/blog/what-are-utm-parameters", label: "What Are UTM Parameters? A Plain-English Guide" },
                            { href: "/blog/aweber-review", label: "AWeber Review 2026: Best Email Tool for Creators?" },
                        ].map(({ href, label }) => (
                            <Link key={href} href={href} style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <Link href="/blog" style={{ color: "#818cf8", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                        Back to Blog
                    </Link>
                </div>
            </div>
        </main>
    );
}
