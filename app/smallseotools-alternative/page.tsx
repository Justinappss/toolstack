import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SmallSEOTools Alternative — 65+ Free Tools, No Ads, No Login | ToolStack",
    description: "Looking for a SmallSEOTools alternative? ToolStack gives you 65+ free online tools with no ads on tool pages, no login, and AI-powered tools included. Use any tool instantly.",
    alternates: { canonical: "https://toolstack.tech/smallseotools-alternative" },
    openGraph: {
        title: "SmallSEOTools Alternative — 65+ Free Tools, No Ads | ToolStack",
        description: "ToolStack is the best SmallSEOTools alternative. 65+ free tools — AI, SEO, developer, finance, writing — no account required, no ads, no paywalls.",
        url: "https://toolstack.tech/smallseotools-alternative",
        siteName: "ToolStack",
        type: "website",
        images: [{ url: "https://toolstack.tech/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "SmallSEOTools Alternative — 65+ Free Tools, No Ads | ToolStack",
        description: "ToolStack is the best SmallSEOTools alternative. 65+ free tools, no account, no ads on tool pages.",
        images: ["https://toolstack.tech/og-image.png"],
    },
};

const accentBg = "rgba(99,102,241,0.06)";
const accentBorder = "rgba(99,102,241,0.18)";
const green = "#22c55e";
const red = "#ef4444";

const FAQS = [
    {
        question: "Is ToolStack really free with no ads?",
        answer: "Yes. ToolStack's tool pages have no display ads. The site is supported by optional affiliate partnerships — you'll only see relevant recommendations, never pop-ups or banner ads interrupting your work.",
    },
    {
        question: "Does ToolStack have SEO tools like SmallSEOTools?",
        answer: "ToolStack covers the most-used SEO utilities: meta description generator, word counter, character counter, hashtag generator, YouTube tag generator, UTM builder, and more. Where ToolStack goes further is AI-powered tools — including an AI prompt generator, grammar checker, paraphrasing tool, and text summarizer.",
    },
    {
        question: "Do I need to create an account on ToolStack?",
        answer: "No. Every single tool on ToolStack works without an account, email address, or any sign-up. Open any tool and start using it immediately.",
    },
    {
        question: "Is my data safe on ToolStack?",
        answer: "Most ToolStack tools run entirely in your browser — your text, data, and files never leave your device. This is especially important for tools like the password generator, base64 encoder, JSON formatter, and regex tester, where sensitive data is often processed.",
    },
    {
        question: "What types of tools does ToolStack have that SmallSEOTools doesn't?",
        answer: "ToolStack includes AI-powered tools (grammar checker, text summarizer, paraphrasing tool, AI prompt generator), developer tools (JSON formatter with tree view, SQL formatter with 4 dialects, JWT decoder, regex tester), and finance tools (mortgage calculator, salary calculator, VAT calculator, compound interest calculator) — categories SmallSEOTools largely doesn't cover.",
    },
];

const COMPARISON = [
    { feature: "AI-powered tools", toolstack: "✓", competitor: "✗" },
    { feature: "Ads on tool pages", toolstack: "✗ None", competitor: "✓ Multiple per page" },
    { feature: "Login required", toolstack: "Never", competitor: "Required for some tools" },
    { feature: "Data privacy", toolstack: "Browser-only, nothing sent to servers", competitor: "Server-side processing" },
    { feature: "Developer tools", toolstack: "✓ JSON, SQL, Regex, JWT, Base64", competitor: "Very limited" },
    { feature: "Finance calculators", toolstack: "✓ Mortgage, salary, VAT, tip", competitor: "✗" },
    { feature: "Writing tools", toolstack: "✓ Paraphrase, grammar, summarize", competitor: "Basic" },
    { feature: "Page speed", toolstack: "Instant (runs in browser)", competitor: "Server round-trip delay" },
    { feature: "Total free tools", toolstack: "65+", competitor: "100+ but mostly SEO-only" },
    { feature: "Price", toolstack: "100% free, always", competitor: "Free with heavy ads" },
];

const TOOLS = [
    { name: "AI Prompt Generator", href: "/tools/ai-prompt-generator" },
    { name: "Grammar Checker", href: "/tools/grammar-checker" },
    { name: "Paraphrasing Tool", href: "/tools/paraphrasing-tool" },
    { name: "Meta Description Generator", href: "/tools/meta-description-generator" },
    { name: "Hashtag Generator", href: "/tools/hashtag-generator" },
    { name: "Word Counter", href: "/tools/word-counter" },
    { name: "UTM Builder", href: "/tools/utm-builder" },
    { name: "YouTube Tag Generator", href: "/tools/youtube-tag-generator" },
    { name: "JSON Formatter", href: "/tools/json-formatter" },
    { name: "Password Generator", href: "/tools/password-generator" },
    { name: "QR Code Generator", href: "/tools/qr-code-generator" },
    { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://toolstack.tech/smallseotools-alternative",
            "url": "https://toolstack.tech/smallseotools-alternative",
            "name": "SmallSEOTools Alternative — 65+ Free Tools, No Ads | ToolStack",
            "description": "The best SmallSEOTools alternative with 65+ free tools, no ads on tool pages, no login, and AI-powered tools.",
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "SmallSEOTools Alternative", "item": "https://toolstack.tech/smallseotools-alternative" },
                ],
            },
        },
        {
            "@type": "FAQPage",
            "mainEntity": FAQS.map(({ question, answer }) => ({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": { "@type": "Answer", "text": answer },
            })),
        },
    ],
};

export default function SmallSEOToolsAlternativePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
                <div style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px 80px" }}>

                    {/* Badge */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 100, padding: "6px 16px", fontSize: 13, color: "#818cf8", fontWeight: 600, marginBottom: 28 }}>
                        ⚡ SmallSEOTools Alternative
                    </div>

                    {/* Hero */}
                    <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
                        The Best Free{" "}
                        <span style={{ background: "linear-gradient(135deg, #818cf8, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            SmallSEOTools<br />Alternative
                        </span>
                    </h1>
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 40, maxWidth: 580 }}>
                        ToolStack gives you 65+ free online tools — AI-powered, no ads on tool pages, no login, no paywalls. Everything runs in your browser so your data stays private.
                    </p>

                    {/* CTAs */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                        <Link href="/" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            background: "#4f46e5", color: "white", fontWeight: 700,
                            fontSize: 16, padding: "14px 28px", borderRadius: 10, textDecoration: "none",
                        }}>
                            Browse All 65+ Free Tools →
                        </Link>
                        <Link href="/tools/meta-description-generator" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            background: "rgba(255,255,255,0.06)", color: "white", fontWeight: 600,
                            fontSize: 16, padding: "14px 28px", borderRadius: 10, textDecoration: "none",
                            border: "1px solid rgba(255,255,255,0.12)",
                        }}>
                            Try a Tool Now
                        </Link>
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 12 }}>
                        No account. No email. No credit card. Ever.
                    </p>

                    {/* Comparison Table */}
                    <section style={{ marginTop: 72, marginBottom: 72 }}>
                        <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                            SmallSEOTools vs ToolStack: Comparison
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: 32, fontSize: 16 }}>
                            How ToolStack stacks up against SmallSEOTools across the features that matter.
                        </p>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "left", padding: "12px 16px", color: "rgba(255,255,255,0.5)", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.08)", width: "40%" }}>Feature</th>
                                        <th style={{ textAlign: "center", padding: "12px 16px", color: "#818cf8", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.08)", background: accentBg }}>ToolStack</th>
                                        <th style={{ textAlign: "center", padding: "12px 16px", color: "rgba(255,255,255,0.5)", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>SmallSEOTools</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON.map(({ feature, toolstack, competitor }, i) => (
                                        <tr key={feature} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                                            <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{feature}</td>
                                            <td style={{ padding: "14px 16px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", background: accentBg }}>
                                                <span style={{ color: toolstack.startsWith("✓") || toolstack === "Never" || toolstack === "✗ None" || toolstack === "Instant (runs in browser)" || toolstack === "100% free, always" ? green : toolstack.startsWith("✗") ? red : "#818cf8", fontWeight: 600 }}>{toolstack}</span>
                                            </td>
                                            <td style={{ padding: "14px 16px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                                <span style={{ color: competitor.startsWith("✗") || competitor.includes("ads") || competitor.includes("delay") || competitor.includes("Required") || competitor.includes("heavy") ? red : competitor.startsWith("✓") ? green : "rgba(255,255,255,0.55)" }}>{competitor}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Popular tools */}
                    <section style={{ marginBottom: 72 }}>
                        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Popular Tools on ToolStack</h2>
                        <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: 28, fontSize: 15 }}>Start with any of these — no login, no setup.</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                            {TOOLS.map(({ name, href }) => (
                                <Link key={href} href={href} style={{
                                    display: "block", padding: "12px 16px",
                                    background: accentBg, border: `1px solid ${accentBorder}`,
                                    borderRadius: 10, color: "white", textDecoration: "none",
                                    fontSize: 14, fontWeight: 500,
                                }}>
                                    {name}
                                </Link>
                            ))}
                        </div>
                        <div style={{ marginTop: 20, textAlign: "center" }}>
                            <Link href="/" style={{ color: "#818cf8", fontWeight: 600, textDecoration: "underline", fontSize: 15 }}>
                                View all 65+ free tools →
                            </Link>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section style={{ marginBottom: 72 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28 }}>Frequently Asked Questions</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {FAQS.map(({ question, answer }) => (
                                <div key={question} style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 14, padding: "20px 24px" }}>
                                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{question}</div>
                                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{answer}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section style={{ textAlign: "center", padding: "48px 32px", background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 20 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Ready to try ToolStack?</h2>
                        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
                            65+ free tools. No login. No ads on tool pages. No paywalls. Ever.
                        </p>
                        <Link href="/" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            background: "#4f46e5", color: "white", fontWeight: 700,
                            fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none",
                        }}>
                            Browse All Free Tools →
                        </Link>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 14 }}>
                            No account required. Start using any tool in seconds.
                        </p>
                    </section>

                    {/* Back link */}
                    <div style={{ textAlign: "center", marginTop: 40 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, textDecoration: "underline" }}>
                            ← Back to ToolStack
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
