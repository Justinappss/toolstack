import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blog | ToolStack — Guides for Developers, Marketers & Creators",
    description: "Practical guides on email marketing, analytics, development, and productivity — with free tools embedded so you can act on what you learn immediately.",
    alternates: { canonical: "https://toolstack.tech/blog" },
    openGraph: {
        title: "Blog | ToolStack — Guides for Developers, Marketers & Creators",
        description: "Practical guides on email marketing, analytics, development, and productivity — with free tools embedded.",
        url: "https://toolstack.tech/blog",
        siteName: "ToolStack",
        type: "website",
    },
};

const posts = [
    {
        slug: "regex-cheat-sheet-beginners",
        title: "Regex Cheat Sheet for Beginners: The Patterns You Actually Use",
        description: "A practical regex reference covering the patterns developers reach for most — character classes, anchors, quantifiers, groups, and real-world examples with a free tester.",
        date: "April 25, 2026",
        readTime: "6 min read",
        tag: "Engineering",
        accent: "#10b981",
        accentBg: "rgba(16,185,129,0.08)",
        accentBorder: "rgba(16,185,129,0.2)",
        featured: true,
    },
    {
        slug: "how-to-generate-qr-code-wifi",
        title: "How to Generate a QR Code for Your WiFi (No App Needed)",
        description: "Let guests connect to your WiFi instantly by scanning a QR code — no typing passwords. Learn how to create one free in seconds, the format it uses, and where to display it.",
        date: "April 23, 2026",
        readTime: "4 min read",
        tag: "Utility",
        accent: "#22d3ee",
        accentBg: "rgba(34,211,238,0.08)",
        accentBorder: "rgba(34,211,238,0.2)",
        featured: false,
    },
    {
        slug: "what-is-a-jwt-token",
        title: "What Is a JWT Token? Structure, Claims & How to Decode One",
        description: "JWT tokens are used in almost every modern API for authentication. Learn how they're structured, what the three parts mean, common claims to know, and how to decode one instantly.",
        date: "April 22, 2026",
        readTime: "6 min read",
        tag: "Engineering",
        accent: "#f59e0b",
        accentBg: "rgba(245,158,11,0.08)",
        accentBorder: "rgba(245,158,11,0.2)",
        featured: false,
    },
    {
        slug: "what-is-my-ip-address",
        title: "What Is My IP Address? Everything You Need to Know",
        description: "Your IP address is your internet identifier. Learn what it reveals about your location, the difference between IPv4 and IPv6, and how to protect your privacy online.",
        date: "April 18, 2026",
        readTime: "5 min read",
        tag: "Privacy",
        accent: "#818cf8",
        accentBg: "rgba(129,140,248,0.08)",
        accentBorder: "rgba(129,140,248,0.2)",
        featured: false,
    },
    {
        slug: "ssl-certificate-checker-guide",
        title: "How to Check an SSL Certificate: Validity, Expiry & What It All Means",
        description: "An expired SSL certificate breaks your site and destroys visitor trust. Learn how to read an SSL cert, what DV/OV/EV certificates mean, and how to check expiry in seconds.",
        date: "April 19, 2026",
        readTime: "5 min read",
        tag: "Security",
        accent: "#34d399",
        accentBg: "rgba(52,211,153,0.08)",
        accentBorder: "rgba(52,211,153,0.2)",
        featured: false,
    },
    {
        slug: "is-it-down-or-just-me",
        title: "Is It Down or Just Me? How to Check if a Website Is Down",
        description: "Can't access a website? Learn how to tell if it's down for everyone or just you, what HTTP status codes mean, and how to diagnose connection problems in under a minute.",
        date: "April 20, 2026",
        readTime: "5 min read",
        tag: "Dev",
        accent: "#22d3ee",
        accentBg: "rgba(34,211,238,0.08)",
        accentBorder: "rgba(34,211,238,0.2)",
        featured: false,
    },
    {
        slug: "how-to-create-pdf-free",
        title: "How to Create a PDF for Free — No Word, No Adobe Required",
        description: "Need to create a PDF without Microsoft Word or Adobe Acrobat? Five free methods that work in any browser, including a completely free online PDF generator with no watermarks.",
        date: "April 21, 2026",
        readTime: "5 min read",
        tag: "Productivity",
        accent: "#ef4444",
        accentBg: "rgba(239,68,68,0.08)",
        accentBorder: "rgba(239,68,68,0.2)",
        featured: false,
    },
    {
        slug: "what-are-utm-parameters",
        title: "What Are UTM Parameters? A Plain-English Guide with Examples",
        description: "UTM parameters tell you exactly where your traffic comes from. This guide explains all five UTM tags, when to use each, and how to build clean UTM links without breaking them.",
        date: "April 18, 2026",
        readTime: "5 min read",
        tag: "Analytics",
        accent: "#22d3ee",
        accentBg: "rgba(34,211,238,0.08)",
        accentBorder: "rgba(34,211,238,0.2)",
        featured: false,
    },
    {
        slug: "perfect-meta-description-anatomy",
        title: "The Anatomy of a Perfect Meta Description (With Examples)",
        description: "A meta description is the single most controllable factor in your click-through rate. Learn the exact formula: length, keywords, CTA, and the 7 mistakes killing your CTR.",
        date: "April 17, 2026",
        readTime: "6 min read",
        tag: "SEO",
        accent: "#60a5fa",
        accentBg: "rgba(96,165,250,0.08)",
        accentBorder: "rgba(96,165,250,0.2)",
        featured: false,
    },
    {
        slug: "mastering-json-visual-guide",
        title: "JSON for Beginners: A Visual Guide to Formatting & Validation",
        description: "JSON powers every modern API and config file. This visual guide covers syntax rules, the 5 most common errors, and how to validate JSON instantly in your browser.",
        date: "April 15, 2026",
        readTime: "7 min read",
        tag: "Engineering",
        accent: "#34d399",
        accentBg: "rgba(52,211,153,0.08)",
        accentBorder: "rgba(52,211,153,0.2)",
        featured: false,
    },
    {
        slug: "json-formatting-guide-for-developers",
        title: "JSON Formatting Guide for Developers: Syntax, Validation & Common Errors",
        description: "JSON is everywhere — APIs, config files, databases. This guide covers the syntax rules that catch developers out most often, and how to validate JSON instantly in your browser.",
        date: "April 16, 2026",
        readTime: "7 min read",
        tag: "Engineering",
        accent: "#34d399",
        accentBg: "rgba(52,211,153,0.08)",
        accentBorder: "rgba(52,211,153,0.2)",
        featured: false,
    },
    {
        slug: "how-to-write-cold-email-subject-lines",
        title: "How to Write Cold Email Subject Lines That Actually Get Opened",
        description: "Most cold emails die in the inbox — not because the body is bad, but because the subject line failed. Here are the proven frameworks that drive open rates.",
        date: "April 14, 2026",
        readTime: "6 min read",
        tag: "Email Marketing",
        accent: "#f472b6",
        accentBg: "rgba(244,114,182,0.08)",
        accentBorder: "rgba(244,114,182,0.2)",
        featured: false,
    },
    {
        slug: "understanding-case-sensitivity",
        title: "camelCase vs snake_case vs PascalCase: When to Use Each",
        description: "The wrong naming convention creates friction and bugs. This guide covers camelCase, snake_case, PascalCase, kebab-case, and SCREAMING_SNAKE_CASE with rules for every language.",
        date: "April 13, 2026",
        readTime: "5 min read",
        tag: "Engineering",
        accent: "#22d3ee",
        accentBg: "rgba(34,211,238,0.08)",
        accentBorder: "rgba(34,211,238,0.2)",
        featured: false,
    },
];

export default function BlogIndex() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "ToolStack Blog — Guides for Developers, Marketers & Creators",
        "description": "Practical guides on email marketing, analytics, development, and productivity.",
        "url": "https://toolstack.tech/blog",
        "hasPart": posts.map(post => ({
            "@type": "Article",
            "headline": post.title,
            "url": `https://toolstack.tech/blog/${post.slug}`,
            "author": { "@type": "Person", "name": "Justin Pirrie" }
        }))
    };

    const featured = posts.find(p => p.featured)!;
    const rest = posts.filter(p => !p.featured);

    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <style>{`
                .blog-featured-card { transition: transform 0.25s ease, border-color 0.25s ease; }
                .blog-featured-card:hover { transform: translateY(-2px); border-color: rgba(34,211,238,0.35) !important; }
                .blog-list-card { transition: background 0.2s ease, border-color 0.2s ease; }
                .blog-list-card:hover { background: rgba(255,255,255,0.03) !important; border-color: rgba(255,255,255,0.08) !important; }
            `}</style>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 160, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(129,140,248,0.2)", background: "rgba(129,140,248,0.06)" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8" }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", letterSpacing: "0.1em", textTransform: "uppercase" }}>From the ToolStack Team</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 20, color: "white" }}>
                        The Blog.
                    </h1>
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 520 }}>
                        Practical guides for developers, marketers, and creators — with free tools you can use immediately.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 120px" }}>

                {/* Featured post */}
                <div style={{ marginTop: 64, marginBottom: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Latest</span>
                </div>
                <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
                    <div className="blog-featured-card" style={{
                        padding: "40px 40px 36px",
                        borderRadius: 24,
                        border: `1px solid ${featured.accentBorder}`,
                        background: featured.accentBg,
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                    }}>
                        <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${featured.accent}08 0%, transparent 70%)`, filter: "blur(40px)", pointerEvents: "none" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: featured.accent, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, border: `1px solid ${featured.accentBorder}`, background: featured.accentBg }}>{featured.tag}</span>
                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>{featured.date}</span>
                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>·</span>
                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>{featured.readTime}</span>
                        </div>
                        <h2 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, color: "white", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 14 }}>{featured.title}</h2>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 28 }}>{featured.description}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: featured.accent }}>
                            Read article
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </div>
                    </div>
                </Link>

                {/* Rest of posts */}
                <div style={{ marginTop: 48, marginBottom: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase" }}>More Articles</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {rest.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                            <div className="blog-list-card" style={{
                                padding: "28px 32px",
                                borderRadius: 16,
                                border: "1px solid rgba(255,255,255,0.04)",
                                background: "rgba(255,255,255,0.01)",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 24,
                            }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: post.accent, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 999, border: `1px solid ${post.accentBorder}`, background: post.accentBg }}>{post.tag}</span>
                                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>{post.date} · {post.readTime}</span>
                                    </div>
                                    <h2 style={{ fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.9)", lineHeight: 1.4, letterSpacing: "-0.01em", marginBottom: 8 }}>{post.title}</h2>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{post.description}</p>
                                </div>
                                <div style={{ flexShrink: 0, marginTop: 4, color: "rgba(255,255,255,0.2)" }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
