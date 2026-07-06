import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    robots: { index: false, follow: false },
    title: "FreeFormatter Alternative — 65+ Free Tools, No Ads, AI-Powered | ToolStack",
    description: "Looking for a FreeFormatter alternative? ToolStack has JSON formatter, SQL formatter (4 dialects), Base64, Regex tester, and 60+ more free tools. No ads, no login, browser-based.",
    alternates: { canonical: "https://toolstack.tech/freeformatter-alternative" },
    openGraph: {
        title: "FreeFormatter Alternative — 65+ Free Tools, No Ads | ToolStack",
        description: "ToolStack is the best FreeFormatter alternative. More tools, better JSON/SQL formatting, AI tools, no ads, no login.",
        url: "https://toolstack.tech/freeformatter-alternative",
        siteName: "ToolStack",
        type: "website",
        images: [{ url: "https://toolstack.tech/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "FreeFormatter Alternative — 65+ Free Tools, No Ads | ToolStack",
        description: "ToolStack is the best FreeFormatter alternative. More tools, AI-powered, no ads, no login.",
        images: ["https://toolstack.tech/og-image.png"],
    },
};

const accentBg = "rgba(99,102,241,0.06)";
const accentBorder = "rgba(99,102,241,0.18)";
const green = "#22c55e";
const red = "#ef4444";

const FAQS = [
    {
        question: "How does ToolStack compare to FreeFormatter for JSON formatting?",
        answer: "ToolStack's JSON formatter adds features that FreeFormatter lacks: a collapsible tree view, multi-tab support for comparing multiple JSON files simultaneously, real-time syntax highlighting with colour-coded types, a JSON stats panel showing depth and key counts, and detailed error messages with exact line and character positions. Everything runs in your browser — nothing is sent to a server.",
    },
    {
        question: "Does ToolStack support more SQL dialects than FreeFormatter?",
        answer: "Yes. ToolStack supports PostgreSQL, MySQL, SQLite, and T-SQL (SQL Server) with dialect-specific formatting rules. FreeFormatter supports MySQL and a generic dialect. ToolStack also has dedicated sub-pages for each dialect with syntax-specific examples.",
    },
    {
        question: "Does ToolStack have ads like FreeFormatter?",
        answer: "No. ToolStack has no display ads on any tool page. You can use any tool without interruptions.",
    },
    {
        question: "What tools does ToolStack have that FreeFormatter doesn't?",
        answer: "ToolStack has AI-powered writing tools (grammar checker, paraphrasing tool, text summarizer, blog title generator, AI prompt generator), finance calculators (mortgage, salary, VAT, compound interest, tip), a QR code generator with custom colors and logos, collectibles calculators, invoice generator, and social tools (hashtag generator, email subject line tester). FreeFormatter is focused almost entirely on code formatting and encoding tools.",
    },
    {
        question: "Is ToolStack's data processing private?",
        answer: "Yes. ToolStack processes tools like JSON formatting, SQL formatting, Base64 encoding, regex testing, and password generation entirely in your browser. No data is sent to a server. This is critical when working with API responses, database queries, credentials, or any sensitive content.",
    },
];

const COMPARISON = [
    { feature: "JSON formatter", toolstack: "✓ Multi-tab, tree view, syntax highlight", competitor: "✓ Basic format only" },
    { feature: "SQL formatter", toolstack: "✓ 4 dialects (PostgreSQL, MySQL, SQLite, T-SQL)", competitor: "✓ MySQL + generic" },
    { feature: "AI-powered tools", toolstack: "✓ Grammar, summarizer, paraphrase, prompts", competitor: "✗" },
    { feature: "Ads on tool pages", toolstack: "✗ None", competitor: "✓ Display ads" },
    { feature: "Data privacy", toolstack: "100% browser-based", competitor: "Server-side processing" },
    { feature: "Total free tools", toolstack: "65+", competitor: "~30" },
    { feature: "QR code generator", toolstack: "✓ Custom colors + logo", competitor: "✗" },
    { feature: "Finance calculators", toolstack: "✓ Mortgage, VAT, salary, tip", competitor: "✗" },
    { feature: "Login required", toolstack: "Never", competitor: "Never ✓" },
    { feature: "UI design", toolstack: "Modern dark theme", competitor: "Basic/dated" },
];

const TOOLS = [
    { name: "JSON Formatter", href: "/tools/json-formatter" },
    { name: "SQL Formatter", href: "/tools/sql-formatter" },
    { name: "Base64 Encoder / Decoder", href: "/tools/base64-encoder-decoder" },
    { name: "Regex Tester", href: "/tools/regex-tester" },
    { name: "UUID Generator", href: "/tools/uuid-generator" },
    { name: "Unix Timestamp Converter", href: "/tools/unix-timestamp-converter" },
    { name: "URL / UTM Builder", href: "/tools/utm-builder" },
    { name: "QR Code Generator", href: "/tools/qr-code-generator" },
    { name: "Password Generator", href: "/tools/password-generator" },
    { name: "Lorem Ipsum Generator", href: "/tools/lorem-ipsum-generator" },
    { name: "Markdown Editor", href: "/tools/markdown-editor" },
    { name: "Color Contrast Checker", href: "/tools/color-contrast-checker" },
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://toolstack.tech/freeformatter-alternative",
            "url": "https://toolstack.tech/freeformatter-alternative",
            "name": "FreeFormatter Alternative — 65+ Free Tools, No Ads | ToolStack",
            "description": "The best FreeFormatter alternative with more tools, better JSON/SQL formatting, AI-powered features, no ads, and 100% browser-based processing.",
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "FreeFormatter Alternative", "item": "https://toolstack.tech/freeformatter-alternative" },
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

export default function FreeFormatterAlternativePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
                <div style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px 80px" }}>

                    {/* Badge */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 100, padding: "6px 16px", fontSize: 13, color: "#818cf8", fontWeight: 600, marginBottom: 28 }}>
                        {"{ }"} FreeFormatter Alternative
                    </div>

                    {/* Hero */}
                    <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
                        The Best Free{" "}
                        <span style={{ background: "linear-gradient(135deg, #818cf8, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            FreeFormatter<br />Alternative
                        </span>
                    </h1>
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 40, maxWidth: 580 }}>
                        ToolStack gives you a better JSON formatter, SQL formatter with 4 dialects, and 60+ more free tools including AI writing tools and finance calculators. No ads, no login, everything runs in your browser.
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
                        <Link href="/tools/json-formatter" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            background: "rgba(255,255,255,0.06)", color: "white", fontWeight: 600,
                            fontSize: 16, padding: "14px 28px", borderRadius: 10, textDecoration: "none",
                            border: "1px solid rgba(255,255,255,0.12)",
                        }}>
                            Try JSON Formatter
                        </Link>
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 12 }}>
                        No account. No email. No credit card. Ever.
                    </p>

                    {/* Comparison Table */}
                    <section style={{ marginTop: 72, marginBottom: 72 }}>
                        <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                            FreeFormatter vs ToolStack: Comparison
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: 32, fontSize: 16 }}>
                            How ToolStack compares to FreeFormatter across the tools developers use most.
                        </p>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "left", padding: "12px 16px", color: "rgba(255,255,255,0.5)", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.08)", width: "40%" }}>Feature</th>
                                        <th style={{ textAlign: "center", padding: "12px 16px", color: "#818cf8", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.08)", background: accentBg }}>ToolStack</th>
                                        <th style={{ textAlign: "center", padding: "12px 16px", color: "rgba(255,255,255,0.5)", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>FreeFormatter</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON.map(({ feature, toolstack, competitor }, i) => (
                                        <tr key={feature} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                                            <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{feature}</td>
                                            <td style={{ padding: "14px 16px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", background: accentBg }}>
                                                <span style={{ color: toolstack.startsWith("✓") || toolstack === "Never" || toolstack === "✗ None" || toolstack === "100% browser-based" || toolstack === "Modern dark theme" ? green : toolstack.startsWith("✗") ? red : "#818cf8", fontWeight: 600 }}>{toolstack}</span>
                                            </td>
                                            <td style={{ padding: "14px 16px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                                <span style={{ color: competitor.startsWith("✗") || competitor.includes("ads") || competitor.includes("Server-side") || competitor.includes("dated") || competitor.includes("Basic") ? red : competitor.startsWith("✓") ? green : "rgba(255,255,255,0.55)" }}>{competitor}</span>
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
