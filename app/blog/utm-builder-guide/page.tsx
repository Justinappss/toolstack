import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

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
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 0, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {/* Hero banner image with overlay */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "1200/630", maxHeight: 500 }}>
                    <img
                        src="/blog/utm-builder-guide/hero-banner.png"
                        alt="UTM Builder for GA4 — campaign URL builder tool interface with tracking link generation"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.35) 60%, transparent 100%)" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 48px", maxWidth: 720 }}>
                        {/* Breadcrumb */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 13 }}>
                            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
                            <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                            <Link href="/blog" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Blog</Link>
                            <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                            <span style={{ color: "rgba(255,255,255,0.5)" }}>Free UTM Builder Guide</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Marketing</span>
                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>May 19, 2026 · 6 min read</span>
                        </div>
                        <h1 style={{ fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 24, color: "white", maxWidth: 600 }}>
                            Free UTM Builder for GA4: Build Campaign URLs in 10 Seconds
                        </h1>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                            <div>
                                <p style={{ fontSize: 13, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", margin: 0 }}>Founder, ToolStack · May 19, 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* TL;DR */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Google's own Campaign URL Builder is clunky and requires a Google account. There's a better way.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ ToolStack's <Link href="/tools/utm-builder" style={{ color: accent, textDecoration: "underline" }}>free UTM builder</Link> generates GA4-ready tracking URLs as you type — no signup, no limits.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Below: ready-to-copy UTM templates for email, Google Ads, Facebook, and LinkedIn.</li>
                    </ul>
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
                            src="https://www.youtube.com/embed/XeoMgiSZymM"
                            title="The Attribution Black Hole: Why GA4 Shows Your Traffic as Direct"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                        />
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center", margin: "-20px 0 32px" }}>The Attribution Black Hole — why untagged campaigns vanish in GA4</p>

                    {/* CTA block */}
                    <div style={{ margin: "32px 0", padding: "24px 28px", borderRadius: 16, background: "rgba(56,189,248,0.06)", border: `1px solid ${accentBorder}`, display: "flex", flexDirection: "column", gap: 12 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>Build your UTM links now — free, no signup</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: 0 }}>Paste your URL, fill in the fields, copy your tracking link. GA4-compatible, works for email, ads, and social.</p>
                        <Link href="/tools/utm-builder" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: accent, color: "#050505", fontSize: 14, fontWeight: 800, textDecoration: "none", width: "fit-content" }}>
                            Open Free UTM Builder →
                        </Link>
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
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" }}>Required?</th>
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

                    {/* Infographic 2 — naming convention */}
                    <div style={{ margin: "8px 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <img src="/blog/utm-builder-guide/utm-naming-convention-guide.png" alt="UTM naming convention guide — best practices for all five parameters across every channel" style={{ width: "100%", display: "block" }} loading="lazy" />
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>UTM naming conventions at a glance — save this for your team</p>
                    </div>

                    {/* Animated infographic */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <video autoPlay loop muted playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/utm-builder-guide/utm-parameters-animated.mp4" type="video/mp4" />
                        </video>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>UTM parameters in action</p>
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
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>{caption}</p>
                            </div>
                        ))}
                    </div>
                    <p style={pStyle}>
                        If you're running AI-powered ad campaigns, <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: accent, textDecoration: "underline" }}>AdvertsGPT</a> pairs well with this workflow — generate your ad copy there, then tag every destination URL here before publishing.
                    </p>

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
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0 }}>{faq.answer}</p>
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
