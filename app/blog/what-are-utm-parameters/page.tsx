import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "What Are UTM Parameters? A Plain-English Guide with Examples",
    description: "UTM parameters tell you exactly where your traffic comes from. This plain-English guide explains all five UTM tags, when to use each, and how to build UTM.",
    alternates: { canonical: "https://toolstack.tech/blog/what-are-utm-parameters" },
    openGraph: {
        title: "What Are UTM Parameters? A Plain-English Guide with Examples",
        description: "UTM parameters tell you exactly where your traffic comes from. This guide explains all five UTM tags, when to use each, and how to build clean links fast.",
        url: "https://toolstack.tech/blog/what-are-utm-parameters",
        siteName: "ToolStack",
        type: "article",
    },
};

const FAQS = [
    {
        question: "Do UTM parameters affect SEO?",
        answer: "No — UTM parameters are stripped by Google Analytics before processing and are not used by Google for ranking purposes. They are invisible to search engines from an SEO standpoint. However, if you share UTM-tagged URLs publicly (e.g., in a social bio), you should use canonical tags to tell search engines which version of the URL is authoritative."
    },
    {
        question: "Are UTM parameters case-sensitive?",
        answer: "Yes. Google Analytics treats 'Facebook' and 'facebook' as two different sources, which splits your data. The standard practice is to use lowercase for all UTM values and hyphens instead of spaces (e.g., utm_source=facebook, utm_campaign=spring-sale). Be consistent across your team."
    },
    {
        question: "What is the difference between utm_source and utm_medium?",
        answer: "utm_source identifies the specific origin (e.g., 'newsletter', 'google', 'twitter'). utm_medium identifies the marketing channel type (e.g., 'email', 'cpc', 'social'). Think of source as the who and medium as the how. Together they answer: which platform (source) and what type of traffic (medium)."
    },
    {
        question: "Do I need all five UTM parameters on every link?",
        answer: "No. Only utm_source is technically required for GA4 to process the traffic source. utm_medium and utm_campaign are strongly recommended for useful reporting. utm_term (for paid search keywords) and utm_content (for A/B test variants) are optional and only relevant when you need that level of detail."
    },
];

const accent = "#22d3ee";
const accentBg = "rgba(34,211,238,0.06)";
const accentBorder = "rgba(34,211,238,0.18)";

const code: React.CSSProperties = {
    fontFamily: "monospace",
    background: "rgba(255,255,255,0.07)",
    padding: "2px 7px",
    borderRadius: 4,
    fontSize: "0.88em",
    color: "rgba(255,255,255,0.85)",
};

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="What Are UTM Parameters? A Plain-English Guide with Examples"
                description="UTM parameters tell you exactly where your traffic comes from. This plain-English guide explains all five UTM tags, when to use each, and how to build UTM links without breaking them."
                url="https://toolstack.tech/blog/what-are-utm-parameters"
                datePublished="2026-04-18"
                dateModified="2026-04-18"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>What Are UTM Parameters</span>
                    </div>

                    {/* Tag + meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Analytics</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 18, 2026 · 5 min read</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        What Are UTM Parameters? A Plain-English Guide with Examples
                    </h1>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · April 18, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* TL;DR */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ UTM parameters are tags appended to URLs that tell analytics tools where traffic came from.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ There are five tags: source, medium, campaign, term, and content.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Build clean UTM links in seconds with the free <Link href="/tools/utm-builder" style={{ color: "#818cf8" }}>UTM Campaign Builder</Link>.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                {/* Body */}
                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <p style={{ margin: "0 0 22px" }}>
                        Without UTM parameters, Google Analytics will show you that traffic arrived from &quot;direct&quot; or &quot;referral&quot; — but not which email campaign, which social post, or which ad creative drove it. UTM parameters solve this by embedding tracking information directly in the URL.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        A UTM-tagged URL looks like this:
                    </p>

                    {/* Code block */}
                    <div style={{ padding: "20px 24px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", margin: "0 0 24px", overflowX: "auto" as const }}>
                        <pre style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "monospace", whiteSpace: "pre-wrap" as const, wordBreak: "break-all" as const }}>{`https://toolstack.tech/tools/utm-builder
?utm_source=newsletter
&utm_medium=email
&utm_campaign=april-launch
&utm_content=header-cta`}</pre>
                    </div>

                    <p style={{ margin: "0 0 22px" }}>
                        When someone clicks this link, GA4 reads the parameters and categorises the session accordingly — no server-side configuration needed.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The Five UTM Parameters Explained</h2>

                    {/* Table */}
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Parameter</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>What It Tracks</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>Example Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["utm_source", "Where the traffic originates", "google, newsletter, twitter"],
                                    ["utm_medium", "The marketing channel type", "cpc, email, social, organic"],
                                    ["utm_campaign", "The specific campaign name", "spring-sale, product-launch"],
                                    ["utm_term", "Paid keyword (paid search only)", "free+json+formatter"],
                                    ["utm_content", "Ad variant or link differentiation", "header-cta, sidebar-link"],
                                ].map(([param, desc, example], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", color: "rgba(255,255,255,0.85)", fontSize: 13 }}>{param}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>{desc}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{example}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>When to Use Each Parameter</h2>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 12px", lineHeight: 1.3 }}>Email Campaigns</h3>
                    <p style={{ margin: "0 0 22px" }}>
                        Use <span style={code}>utm_source=newsletter</span>, <span style={code}>utm_medium=email</span>, and a campaign name. If you have multiple CTAs in one email (header button, footer link, image), use <span style={code}>utm_content</span> to tell them apart. Otherwise your click data will be aggregated and you won&apos;t know which placement drove the action.
                    </p>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 12px", lineHeight: 1.3 }}>Paid Ads</h3>
                    <p style={{ margin: "0 0 22px" }}>
                        Google Ads auto-tags with <span style={code}>gclid</span>, but UTM parameters give you cleaner reports in GA4 and work across all ad platforms. Use <span style={code}>utm_medium=cpc</span> for paid search and <span style={code}>utm_medium=paid-social</span> for Meta/TikTok. Use <span style={code}>utm_term</span> to track which keywords convert.
                    </p>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 12px", lineHeight: 1.3 }}>Social and Content</h3>
                    <p style={{ margin: "0 0 22px" }}>
                        For organic social posts, use <span style={code}>utm_medium=social</span> and the platform name as the source. This separates organic social from paid social in your reports and lets you see which platform actually drives engaged sessions versus bounces.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The Most Common UTM Mistakes</h2>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 14 }}>
                        <li style={{ paddingLeft: 20, position: "relative" as const }}>
                            <span style={{ position: "absolute" as const, left: 0, color: accent }}>→</span>
                            <strong style={{ color: "rgba(255,255,255,0.9)" }}>Inconsistent casing</strong> — &quot;Facebook&quot; and &quot;facebook&quot; appear as separate sources. Always lowercase.
                        </li>
                        <li style={{ paddingLeft: 20, position: "relative" as const }}>
                            <span style={{ position: "absolute" as const, left: 0, color: accent }}>→</span>
                            <strong style={{ color: "rgba(255,255,255,0.9)" }}>Spaces in values</strong> — spaces break URLs. Use hyphens: <span style={code}>spring-sale</span>, not <span style={code}>spring sale</span>.
                        </li>
                        <li style={{ paddingLeft: 20, position: "relative" as const }}>
                            <span style={{ position: "absolute" as const, left: 0, color: accent }}>→</span>
                            <strong style={{ color: "rgba(255,255,255,0.9)" }}>Tagging internal links</strong> — UTM parameters on internal links overwrite the original source, making your attribution data wrong. Only tag external links pointing to your site.
                        </li>
                        <li style={{ paddingLeft: 20, position: "relative" as const }}>
                            <span style={{ position: "absolute" as const, left: 0, color: accent }}>→</span>
                            <strong style={{ color: "rgba(255,255,255,0.9)" }}>Skipping utm_medium</strong> — Without it, GA4 can&apos;t categorise traffic into channels properly. Always include it.
                        </li>
                    </ul>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Build UTM Links Without Errors</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Manually appending UTM strings is error-prone — a misplaced <span style={code}>&amp;</span> or an unencoded space breaks the URL silently. Use ToolStack&apos;s free <Link href="/tools/utm-builder" style={{ color: "#818cf8" }}>UTM Campaign Builder</Link> to construct clean, properly encoded UTM links in seconds. Fill in the fields, copy the output, and paste it wherever you need it. No signup, no install.
                    </p>
                </div>

                {/* FAQs */}
                <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                        {FAQS.map((faq, i) => (
                            <div key={i} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}>
                                <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 10, fontSize: 15, lineHeight: 1.4 }}>{faq.question}</p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0 }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>


                {/* ─── Related Articles ── */}
                <div style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 20 }}>
                        Related Articles
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                                                <Link href="utm-builder" style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "14px 18px", borderRadius: 12,
                            background: "rgba(255,255,255,0.025)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            textDecoration: "none", color: "rgba(255,255,255,0.7)",
                            fontSize: 14, fontWeight: 600,
                            transition: "background 0.15s, border-color 0.15s",
                        }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            UTM Builder
                        </Link>
                        <Link href="/blog/perfect-meta-description-anatomy" style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "14px 18px", borderRadius: 12,
                            background: "rgba(255,255,255,0.025)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            textDecoration: "none", color: "rgba(255,255,255,0.7)",
                            fontSize: 14, fontWeight: 600,
                            transition: "background 0.15s, border-color 0.15s",
                        }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            Perfect Meta Description
                        </Link>
                    </div>
                </div>
                {/* Back to blog */}
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
