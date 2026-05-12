import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "The Anatomy of a Perfect Meta Description (With Examples)",
    description: "A meta description is the single most controllable factor in your click-through rate. Learn the exact formula: length, keywords, CTA, and the 7 mistakes.",
    alternates: { canonical: "https://toolstack.tech/blog/perfect-meta-description-anatomy" },
    openGraph: {
        title: "The Anatomy of a Perfect Meta Description (With Examples)",
        description: "Learn the exact formula for writing meta descriptions that rank and get clicked. Length, keywords, CTA, and the 7 mistakes killing your CTR.",
        url: "https://toolstack.tech/blog/perfect-meta-description-anatomy",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-04-17",
        modifiedTime: "2026-04-17",
        images: [
            {
                url: "https://toolstack.tech/og-image.png",
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "The Anatomy of a Perfect Meta Description (With Examples)",
        description: "Learn the exact formula for writing meta descriptions that rank and get clicked. Length, keywords, CTA, and the 7 mistakes killing your CTR.",
        images: ["https://toolstack.tech/og-image.png"],
    },
};

const FAQS = [
    {
        question: "How long should a meta description be?",
        answer: "Google typically displays 150–160 characters on desktop and 120 characters on mobile before truncating. Aim for 145–155 characters to stay safe on both. Tools like the ToolStack Meta Description Generator show you a live character count and SERP preview so you can see exactly how it will appear."
    },
    {
        question: "Does the meta description affect SEO rankings?",
        answer: "Not directly — Google has confirmed meta descriptions are not a ranking factor. However, they significantly affect click-through rate (CTR), which does send a positive signal to Google. A higher CTR for a given position can compound over time into improved rankings."
    },
    {
        question: "What happens if I don't write a meta description?",
        answer: "Google will auto-generate one by pulling text from your page — usually the first paragraph. Auto-generated descriptions often lack a CTA, may be cut off awkwardly, and rarely include your target keyword naturally. Writing your own is always better."
    },
    {
        question: "Should every page have a unique meta description?",
        answer: "Yes. Duplicate meta descriptions across multiple pages are a soft negative signal. More importantly, each page has a different primary keyword and audience intent — your description should reflect that. Use a generator to produce page-specific descriptions quickly at scale."
    },
    {
        question: "Can I use emojis in meta descriptions?",
        answer: "Yes, and they can boost CTR in competitive SERPs. Common choices: ✅ for trust signals, ⚡ for speed, 🆓 for free tools. Use them sparingly — one or two maximum. Google sometimes strips them, so don't rely on emojis as the only differentiator."
    },
];

const accent = "#60a5fa";
const accentBg = "rgba(96,165,250,0.06)";
const accentBorder = "rgba(96,165,250,0.18)";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="The Anatomy of a Perfect Meta Description (With Examples)"
                description="A meta description is the single most controllable factor in your click-through rate. Learn the exact formula: length, keywords, CTA, and the 7 mistakes killing your CTR."
                url="https://toolstack.tech/blog/perfect-meta-description-anatomy"
                datePublished="2026-04-17"
                dateModified="2026-04-17"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Meta Description Anatomy</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>SEO</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 17, 2026 · 6 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        The Anatomy of a Perfect Meta Description (With Examples)
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · April 17, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* TL;DR */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Keep meta descriptions 145–155 characters to avoid truncation on desktop and mobile.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Include your primary keyword naturally, lead with the benefit, end with a CTA.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Generate and preview descriptions instantly with the free <Link href="/tools/meta-description-generator" style={{ color: "#818cf8" }}>Meta Description Generator</Link>.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <p style={{ margin: "0 0 22px" }}>
                        Most SEO guides focus on rankings. But ranking in position 5 with a 12% CTR beats ranking in position 3 with a 4% CTR every single time. The meta description is the one SEO element you can rewrite today and see results in your Search Console data within 48 hours.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Here is the exact anatomy of a description that earns clicks.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The Formula</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Every high-performing meta description follows this structure:
                    </p>
                    <div style={{ padding: "20px 24px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", margin: "0 0 24px" }}>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontFamily: "monospace" }}>
                            [Primary keyword] + [specific benefit or outcome] + [trust signal or differentiator] + [soft CTA]
                        </p>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        Example for a free invoice tool:
                    </p>
                    <div style={{ padding: "20px 24px", borderRadius: 14, border: `1px solid ${accentBorder}`, background: accentBg, margin: "0 0 24px" }}>
                        <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
                            &ldquo;Create professional PDF invoices in seconds. No watermarks, no signup, supports VAT and 12 currencies. Free forever — try it now.&rdquo;
                        </p>
                        <p style={{ margin: "12px 0 0", fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>153 characters ✓</p>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The 5 Components Broken Down</h2>

                    {[
                        { num: "01", title: "Lead with the primary keyword", body: "Google bolds your target keyword in the SERP snippet when it matches the search query. Place your primary keyword as close to the start as possible — ideally within the first 20 characters. This visual cue confirms relevance instantly." },
                        { num: "02", title: "State a specific benefit", body: "Vague descriptions kill CTR. 'Generate professional invoices' is weaker than 'Create PDF invoices with VAT, line items, and multi-currency in 30 seconds.' Specificity signals competence and sets accurate expectations." },
                        { num: "03", title: "Include a trust signal", body: "Add a proof point that removes friction: 'No signup', 'Free forever', '10,000+ users', 'WCAG compliant', 'Runs in your browser'. One well-chosen trust signal can lift CTR by 15–30% on competitive queries." },
                        { num: "04", title: "End with a soft CTA", body: "A call to action doesn't have to be aggressive. 'Try it free', 'Generate yours now', or even 'Instant results' creates forward motion. The best CTAs mirror what the user is already about to do." },
                        { num: "05", title: "Stay within 155 characters", body: "Google truncates at roughly 160 characters on desktop and 120 on mobile. Write for mobile-first. Aim for 145–155 characters to ensure the full description — including your CTA — is always visible." },
                    ].map(({ num, title, body }) => (
                        <div key={num} style={{ display: "flex", gap: 20, margin: "0 0 32px", padding: "24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: accent, fontFamily: "monospace", flexShrink: 0, paddingTop: 2 }}>{num}</div>
                            <div>
                                <h3 style={{ fontSize: 17, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{title}</h3>
                                <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{body}</p>
                            </div>
                        </div>
                    ))}

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>7 Mistakes That Kill CTR</h2>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column" as const, gap: 14 }}>
                        {[
                            "Repeating the page title word-for-word — wasted impression space",
                            "Stuffing keywords unnaturally — reads as spam, loses trust",
                            "Writing in third person ('This page explains...') — cold and corporate",
                            "No CTA — users have no reason to click over identical results",
                            "Exceeding 160 characters — your CTA gets cut off",
                            "Being generic ('Learn more about our services') — tells Google nothing",
                            "Not updating after a page redesign — stale descriptions mislead searchers",
                        ].map((mistake, i) => (
                            <li key={i} style={{ display: "flex", gap: 12, fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                <span style={{ color: "#f87171", flexShrink: 0, fontWeight: 700 }}>✗</span>
                                {mistake}
                            </li>
                        ))}
                    </ul>

                    <AdBlock type="horizontal" />

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Good vs Bad: Side-by-Side Examples</h2>

                    {[
                        {
                            bad: "Our word counter tool counts words and characters on any text.",
                            good: "Count words, characters, and sentences in real time. Includes Flesch readability score and estimated reading time. Free, instant, no signup.",
                            label: "Word Counter",
                        },
                        {
                            bad: "Generate hashtags for your social media posts with our AI tool.",
                            good: "AI-powered hashtag sets for Instagram, TikTok, and LinkedIn. Three-tier strategy (popular, growing, niche) for maximum reach. Free, instant.",
                            label: "Hashtag Generator",
                        },
                    ].map(({ bad, good, label }) => (
                        <div key={label} style={{ margin: "0 0 28px" }}>
                            <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 12px" }}>{label}</p>
                            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                                <div style={{ padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.04)", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: "#f87171", marginRight: 8 }}>BAD</span>{bad}
                                </div>
                                <div style={{ padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(52,211,153,0.2)", background: "rgba(52,211,153,0.04)", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: "#34d399", marginRight: 8 }}>GOOD</span>{good}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* CTA */}
                    <div style={{ margin: "52px 0 0", padding: "32px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, textAlign: "center" as const }}>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 8px" }}>Write your meta descriptions in seconds</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 20px" }}>The free Meta Description Generator produces 5 high-CTR descriptions with a live SERP preview. No signup.</p>
                        <Link href="/tools/meta-description-generator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                            Try the Generator Free →
                        </Link>
                    </div>
                </div>

                {/* FAQs */}
                <div style={{ marginTop: 64 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "0 0 28px" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {FAQS.map(({ question, answer }) => (
                            <div key={question} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", margin: "0 0 10px" }}>{question}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <Link href="/blog" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← Back to Blog</Link>
                    <Link href="/tools/meta-description-generator" style={{ fontSize: 14, fontWeight: 700, color: accent, textDecoration: "none" }}>Try the Meta Description Generator →</Link>
                </div>
            </div>
        </main>
    );
}
