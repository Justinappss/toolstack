import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    robots: { index: false, follow: false },
    title: "10015.io Alternative — 65+ Free Tools, No Login, No Ads | ToolStack",
    description: "Looking for a 10015.io alternative? ToolStack gives you 65+ free online tools with no login, no sign-up, and no paywalls. AI-powered tools included. Use any tool instantly.",
    alternates: { canonical: "https://toolstack.tech/10015-alternative" },
    openGraph: {
        title: "10015.io Alternative — 65+ Free Tools, No Login | ToolStack",
        description: "ToolStack is the best 10015.io alternative. 65+ free tools — text, SEO, developer, finance, AI — no account required, no ads, no paywalls.",
        url: "https://toolstack.tech/10015-alternative",
        siteName: "ToolStack",
        type: "website",
        images: [{ url: "https://toolstack.tech/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "10015.io Alternative — 65+ Free Tools, No Login | ToolStack",
        description: "ToolStack is the best 10015.io alternative. 65+ free tools, no account, no ads.",
        images: ["https://toolstack.tech/og-image.png"],
    },
};

const accent = "#4f46e5";
const accentBg = "rgba(99,102,241,0.06)";
const accentBorder = "rgba(99,102,241,0.18)";
const green = "#22c55e";
const red = "#ef4444";

const FAQS = [
    {
        question: "What is the best free alternative to 10015.io?",
        answer: "ToolStack (toolstack.tech) is the best free alternative to 10015.io. It offers 65+ hand-crafted tools across text, SEO, developer, finance, and AI categories — all completely free with no login, no sign-up, and no paywalls. Unlike 10015.io's 10,000+ auto-generated tools, every ToolStack tool is purpose-built and optimised for real-world use.",
    },
    {
        question: "Does ToolStack require a login like 10015.io?",
        answer: "No. ToolStack requires zero sign-up, zero account creation, and zero email address. You land on any tool page and use it immediately. This is identical to 10015.io's no-login approach, but ToolStack goes further by also removing ads from individual tool pages.",
    },
    {
        question: "Does ToolStack have AI tools that 10015.io doesn't?",
        answer: "Yes. ToolStack includes GPT-4o-powered tools including an AI Prompt Generator, Meta Description Generator, Blog Title Generator, Grammar Checker, Paraphrasing Tool, Text Summariser, Hashtag Generator, and more — all free with no API key required. 10015.io does not currently offer AI-powered tools.",
    },
    {
        question: "Is ToolStack completely free?",
        answer: "Yes. Every tool on ToolStack is free with no account, no credit card, and no usage limits. There is no freemium tier and no pro upgrade. The site is funded by Google AdSense.",
    },
    {
        question: "Why choose ToolStack over 10015.io?",
        answer: "ToolStack focuses on quality over quantity. While 10015.io lists 10,000+ tools (many auto-generated and shallow), ToolStack's 65+ tools are each built to a high standard with clean UIs, fast load times, and no privacy concerns around file uploads. ToolStack also includes AI-powered tools and specialist calculators not available on 10015.io.",
    },
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://toolstack.tech/10015-alternative",
            "url": "https://toolstack.tech/10015-alternative",
            "name": "10015.io Alternative — Free Online Tools | ToolStack",
            "description": "ToolStack is the best free alternative to 10015.io. 65+ tools, no login, no ads, AI-powered.",
            "isPartOf": { "@id": "https://toolstack.tech" },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "10015.io Alternative", "item": "https://toolstack.tech/10015-alternative" },
                ],
            },
        },
        {
            "@type": "FAQPage",
            "mainEntity": FAQS.map(f => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": { "@type": "Answer", "text": f.answer },
            })),
        },
    ],
};

const COMPARISON = [
    { feature: "Free to use", toolstack: true, ten015: true },
    { feature: "No login / sign-up required", toolstack: true, ten015: true },
    { feature: "AI-powered tools (GPT-4o)", toolstack: true, ten015: false },
    { feature: "No file upload privacy concerns", toolstack: true, ten015: false },
    { feature: "Purpose-built, specialist tools", toolstack: true, ten015: false },
    { feature: "SEO & GEO-optimised tool pages", toolstack: true, ten015: false },
    { feature: "Mobile-optimised UI", toolstack: true, ten015: "Partial" },
    { feature: "Specialist finance calculators", toolstack: true, ten015: false },
    { feature: "Developer tools (JSON, JWT, SQL, Regex)", toolstack: true, ten015: true },
    { feature: "Total tools", toolstack: "65+ quality tools", ten015: "10,000+ (auto-generated)" },
];

export default function Alternative10015() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            {/* Hero */}
            <div style={{
                position: "relative", overflow: "hidden",
                paddingTop: 120, paddingBottom: 72,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                textAlign: "center",
            }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                    {/* Badge */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 100, padding: "6px 16px", fontSize: 13, color: accent, fontWeight: 600, marginBottom: 28 }}>
                        🔄 10015.io Alternative
                    </div>

                    <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em" }}>
                        The Best Free Alternative<br />to <span style={{ color: accent }}>10015.io</span>
                    </h1>

                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 40, maxWidth: 580, margin: "0 auto 40px" }}>
                        ToolStack gives you <strong style={{ color: "white" }}>65+ free online tools</strong> — text, SEO, developer, finance, and AI — with no login, no sign-up, and no paywalls. Open any tool and use it in seconds.
                    </p>

                    {/* CTA — above the fold */}
                    <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
                        <Link href="/" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            background: "#4f46e5", color: "white", fontWeight: 700,
                            fontSize: 16, padding: "14px 32px", borderRadius: 10,
                            textDecoration: "none", letterSpacing: "-0.01em",
                        }}>
                            Browse All 65+ Free Tools →
                        </Link>
                        <Link href="/tools/json-formatter" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            background: "rgba(255,255,255,0.06)", color: "white", fontWeight: 600,
                            fontSize: 16, padding: "14px 28px", borderRadius: 10,
                            textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)",
                        }}>
                            Try a Tool Now
                        </Link>
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 12 }}>
                        No account. No email. No credit card. Ever.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 820, margin: "0 auto", padding: "64px 24px" }}>

                {/* Why ToolStack */}
                <section style={{ marginBottom: 72 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Why ToolStack is the Better Choice</h2>
                    <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 32, fontSize: 16 }}>
                        10015.io lists 10,000+ tools — but quantity isn't the same as quality. Most are auto-generated and shallow. ToolStack takes the opposite approach: 65+ tools built to a high standard, each purpose-built for a real workflow. Plus AI-powered tools that 10015.io doesn't offer.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                        {[
                            { icon: "⚡", title: "Instant access", desc: "No login, no sign-up, no email — open a tool and use it" },
                            { icon: "🤖", title: "AI-powered tools", desc: "GPT-4o tools for writing, SEO, and content — free" },
                            { icon: "🔒", title: "No file privacy risk", desc: "No file uploads = no privacy concerns about your data" },
                            { icon: "🎯", title: "Quality over quantity", desc: "65+ specialist tools, not 10,000+ thin auto-generated pages" },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 14, padding: "20px 22px" }}>
                                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
                                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Comparison table */}
                <section style={{ marginBottom: 72 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>10015.io vs ToolStack: Comparison</h2>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, marginBottom: 28 }}>A direct feature comparison to help you choose the right free tool suite.</p>
                    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {/* Header */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "rgba(255,255,255,0.04)", padding: "14px 20px", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            <span>Feature</span>
                            <span style={{ textAlign: "center", color: "#818cf8" }}>ToolStack</span>
                            <span style={{ textAlign: "center" }}>10015.io</span>
                        </div>
                        {COMPARISON.map(({ feature, toolstack, ten015 }, i) => (
                            <div key={feature} style={{
                                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                                padding: "14px 20px", alignItems: "center",
                                borderTop: "1px solid rgba(255,255,255,0.05)",
                                background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                            }}>
                                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{feature}</span>
                                <span style={{ textAlign: "center", fontSize: 14, fontWeight: 600, color: typeof toolstack === "string" ? "#818cf8" : toolstack ? green : red }}>
                                    {typeof toolstack === "string" ? toolstack : toolstack ? "✓ Yes" : "✗ No"}
                                </span>
                                <span style={{ textAlign: "center", fontSize: 14, fontWeight: 600, color: typeof ten015 === "string" ? "rgba(255,255,255,0.5)" : ten015 === true ? green : ten015 === "Partial" ? "#f59e0b" : red }}>
                                    {typeof ten015 === "string" ? ten015 : ten015 === true ? "✓ Yes" : ten015 === "Partial" ? "~ Partial" : "✗ No"}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular tools */}
                <section style={{ marginBottom: 72 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Popular Tools on ToolStack</h2>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, marginBottom: 28 }}>Start with any of these — no account needed.</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                        {[
                            { name: "JSON Formatter", href: "/tools/json-formatter", emoji: "📋" },
                            { name: "Password Generator", href: "/tools/password-generator", emoji: "🔐" },
                            { name: "Meta Description Generator", href: "/tools/meta-description-generator", emoji: "🔍" },
                            { name: "Word Counter", href: "/tools/word-counter", emoji: "📝" },
                            { name: "UTM Builder", href: "/tools/utm-builder", emoji: "🔗" },
                            { name: "QR Code Generator", href: "/tools/qr-code-generator", emoji: "📱" },
                            { name: "Base64 Encoder", href: "/tools/base64-encoder-decoder", emoji: "💻" },
                            { name: "UUID Generator", href: "/tools/uuid-generator", emoji: "🔑" },
                            { name: "IP Address Lookup", href: "/tools/ip-address-lookup", emoji: "🌐" },
                            { name: "Case Converter", href: "/tools/case-converter", emoji: "Aa" },
                            { name: "SQL Formatter", href: "/tools/sql-formatter", emoji: "🗄️" },
                            { name: "Regex Tester", href: "/tools/regex-tester", emoji: "⚙️" },
                        ].map(({ name, href, emoji }) => (
                            <Link key={href} href={href} style={{
                                display: "flex", alignItems: "center", gap: 10,
                                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 10, padding: "12px 14px", textDecoration: "none",
                                color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500,
                                transition: "border-color 0.2s",
                            }}>
                                <span style={{ fontSize: 16 }}>{emoji}</span>
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
                                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{answer}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section style={{ textAlign: "center", padding: "48px 32px", background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 20 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Ready to try ToolStack?</h2>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
                        65+ free tools. No login. No ads on tool pages. No paywalls. Ever.
                    </p>
                    <Link href="/" style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        background: "#4f46e5", color: "white", fontWeight: 700,
                        fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none",
                    }}>
                        Browse All Free Tools →
                    </Link>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 14 }}>
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
    );
}
