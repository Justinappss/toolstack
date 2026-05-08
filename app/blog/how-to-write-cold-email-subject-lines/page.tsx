import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "How to Write Cold Email Subject Lines That Actually Get Opened",
    description: "Most cold emails die in the inbox — not because the body is bad, but because the subject line failed. Here are the proven frameworks that drive open rates.",
    alternates: { canonical: "https://toolstack.tech/blog/how-to-write-cold-email-subject-lines" },
    openGraph: {
        title: "How to Write Cold Email Subject Lines That Actually Get Opened",
        description: "Proven subject line frameworks that drive open rates — with real examples for sales, outreach, and marketing emails.",
        url: "https://toolstack.tech/blog/how-to-write-cold-email-subject-lines",
        siteName: "ToolStack",
        type: "article",
    },
};

const FAQS = [
    {
        question: "How long should a cold email subject line be?",
        answer: "Keep it under 50 characters (ideally 30–40). Most email clients truncate subject lines beyond 60 characters on mobile, which is now the majority of email opens. Shorter lines also read faster and feel less like bulk mail."
    },
    {
        question: "Should I personalise cold email subject lines?",
        answer: "Yes — even a single personalisation token (first name, company name, or a specific reference) meaningfully increases open rates. Generic broadcast subject lines are easy to ignore. A line like 'Quick question, [Name]' outperforms 'Introducing Our Services' consistently."
    },
    {
        question: "Are emoji in subject lines effective?",
        answer: "Occasionally, and only for the right audience. A single emoji at the start can increase visibility in a crowded inbox, but they look out of place for B2B outreach to senior professionals. Test before defaulting to them."
    },
    {
        question: "What words should I avoid in email subject lines?",
        answer: "Spam-trigger words include: Free, Winner, Guaranteed, No risk, Act now, Click here, Limited time (without context), and excessive punctuation like '!!!' or ALL CAPS. These trigger spam filters and lower deliverability."
    },
];

const accent = "#f472b6";
const accentBg = "rgba(244,114,182,0.06)";
const accentBorder = "rgba(244,114,182,0.18)";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="How to Write Cold Email Subject Lines That Actually Get Opened"
                description="Most cold emails die in the inbox — not because the body is bad, but because the subject line failed. Here are the proven frameworks that drive open rates."
                url="https://toolstack.tech/blog/how-to-write-cold-email-subject-lines"
                datePublished="2026-04-14"
                dateModified="2026-04-14"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Email Subject Lines</span>
                    </div>

                    {/* Tag + meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Email Marketing</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 14, 2026 · 6 min read</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        How to Write Cold Email Subject Lines That Actually Get Opened
                    </h1>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · April 14, 2026</p>
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
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Subject lines under 50 characters perform best on mobile.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Curiosity, specificity, and personalisation outperform generic pitches.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Test your subject line before sending — use the free <Link href="/tools/email-subject-line-tester" style={{ color: "#818cf8" }}>Email Subject Line Tester</Link>.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                {/* Body */}
                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <p style={{ margin: "0 0 22px" }}>
                        The body of your email doesn&apos;t matter if nobody opens it. Subject lines are a binary gate: they either earn the click or they don&apos;t. Yet most people treat them as an afterthought, writing whatever comes to mind after spending 30 minutes on the copy below.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Here are the frameworks that consistently produce opens — with real examples you can adapt immediately.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>1. The Specific Question</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        Questions create an open loop in the reader&apos;s mind. The brain wants resolution. A vague question like &quot;Can I ask you something?&quot; works less well than a specific one because specificity signals relevance.
                    </p>
                    <div style={{ padding: "18px 22px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", margin: "0 0 24px" }}>
                        <p style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>Examples</p>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>→ &quot;Are you still managing your leads manually, [Name]?&quot;</li>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>→ &quot;Quick question about [Company]&apos;s onboarding flow&quot;</li>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>→ &quot;Is your checkout the reason people are leaving?&quot;</li>
                        </ul>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>2. The Direct Benefit</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        Skip the mystery and lead with the outcome. Busy people scan inboxes fast. If the value is immediately visible, the open becomes a rational decision rather than a gamble.
                    </p>
                    <div style={{ padding: "18px 22px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", margin: "0 0 24px" }}>
                        <p style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>Examples</p>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>→ &quot;3 ways to cut your reporting time in half&quot;</li>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>→ &quot;How [Competitor] grew from 0 to 10k users — breakdown inside&quot;</li>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>→ &quot;The one change that reduced churn for SaaS founders&quot;</li>
                        </ul>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>3. The Personalised Reference</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        Referencing something specific about the recipient — their company, a recent post, a product launch, or a mutual connection — signals that this isn&apos;t a broadcast. It takes 30 seconds of research per email but the lift in opens is substantial.
                    </p>
                    <div style={{ padding: "18px 22px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", margin: "0 0 24px" }}>
                        <p style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>Examples</p>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>→ &quot;Saw your post on LinkedIn about churn — had an idea&quot;</li>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>→ &quot;Congrats on the Series A, [Name] — quick thought on distribution&quot;</li>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>→ &quot;[Mutual contact] suggested I reach out&quot;</li>
                        </ul>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>4. Subject Line Length: The Data</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Email clients render subject lines differently. Gmail on mobile truncates at roughly 40 characters. Apple Mail desktop shows more. Since the majority of email opens now happen on mobile, shorter is structurally safer.
                    </p>

                    {/* Length table */}
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "#818cf8", fontWeight: 700, textAlign: "left" as const }}>Length</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Risk</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "#34d399", fontWeight: 700, textAlign: "left" as const }}>Best For</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Under 30 chars", "May lack context", "High-familiarity lists, warm leads"],
                                    ["30–50 chars", "Low", "Cold outreach, newsletters — safe zone"],
                                    ["50–70 chars", "Truncates on mobile", "Desktop-heavy audiences only"],
                                    ["70+ chars", "Almost always cut off", "Avoid for cold email"],
                                ].map(([length, risk, bestFor], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{length}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>{risk}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>{bestFor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>5. What to Avoid</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Beyond spam trigger words, avoid subject lines that over-promise or sound like a press release. &quot;Exciting opportunity you can&apos;t miss&quot; feels like noise. So does &quot;Following up on my last email&quot; as a first message — it creates false continuity and erodes trust before you&apos;ve earned it.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Also avoid full caps, multiple exclamation marks, and the word &quot;FREE&quot; in all caps — these reliably trigger spam filters across major providers.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Test Before You Send</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Writing subject lines is partly craft, partly testing. Use ToolStack&apos;s free <Link href="/tools/email-subject-line-tester" style={{ color: "#818cf8" }}>Email Subject Line Tester</Link> to score your line before it goes out. It checks length, spam signals, sentiment, and readability — no signup needed.
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
