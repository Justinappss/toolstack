import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Wrench, PenLine, Search } from "lucide-react";

export const metadata: Metadata = {
    title: "Justin Pirrie — Founder of ToolStack | Author & Tool Builder",
    description:
        "Justin Pirrie is the founder of ToolStack. He builds every tool on the site and writes every guide — free tools, SEO, AI search (GEO/AEO), and developer utilities.",
    alternates: { canonical: "https://toolstack.tech/about/justin" },
    openGraph: {
        title: "Justin Pirrie — Founder of ToolStack",
        description:
            "The builder behind ToolStack's 65+ free tools and the guides that go with them.",
        url: "https://toolstack.tech/about/justin",
        siteName: "ToolStack",
        type: "profile",
        images: [{ url: "https://toolstack.tech/images/justin-pirrie-headshot.png", width: 800, height: 800, alt: "Justin Pirrie" }],
    },
};

const CARD = "rgba(255,255,255,0.03)";
const LINE = "rgba(255,255,255,0.08)";

export default function JustinAuthorPage() {
    return (
        <div style={{ minHeight: "100vh", background: "#080810" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfilePage",
                        "mainEntity": {
                            "@type": "Person",
                            "name": "Justin Pirrie",
                            "url": "https://toolstack.tech/about/justin",
                            "image": "https://toolstack.tech/images/justin-pirrie-headshot.png",
                            "jobTitle": "Founder",
                            "worksFor": { "@type": "Organization", "name": "ToolStack", "url": "https://toolstack.tech" },
                            "description":
                                "Founder of ToolStack. Builds the tools and writes the guides — free web tools, SEO, AI search optimization (GEO/AEO), and developer utilities.",
                            "knowsAbout": [
                                "Free web tools", "Search engine optimization", "Generative engine optimization",
                                "AI search", "Digital marketing", "Developer utilities", "Web development",
                            ],
                            "sameAs": ["https://www.linkedin.com/in/justin-pirrie/"],
                        },
                    }),
                }}
            />

            <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "72px 24px 100px" }}>
                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 44, fontSize: 14, color: "rgba(255,255,255,0.35)" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>ToolStack</Link>
                    <span>/</span>
                    <Link href="/about" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>About</Link>
                    <span>/</span>
                    <span style={{ color: "rgba(255,255,255,0.65)" }}>Justin Pirrie</span>
                </nav>

                {/* Header */}
                <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 40, flexWrap: "wrap" }}>
                    <img
                        src="/images/justin-pirrie-headshot.png"
                        alt="Justin Pirrie, founder of ToolStack"
                        style={{ width: 112, height: 112, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.12)", flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 240, flex: 1 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 999, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.22)", color: "#a5b4fc", fontSize: 12.5, fontWeight: 600, marginBottom: 14 }}>
                            <BadgeCheck style={{ width: 14, height: 14 }} /> Author &amp; Founder
                        </div>
                        <h1 style={{ fontSize: 42, fontWeight: 900, color: "white", lineHeight: 1.08, margin: 0, letterSpacing: "-0.02em" }}>
                            Justin{" "}
                            <span style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Pirrie</span>
                        </h1>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: "8px 0 0" }}>
                            Founder of ToolStack · builds the tools, writes the guides
                        </p>
                    </div>
                </div>

                {/* Bio */}
                <div style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.82)", display: "flex", flexDirection: "column", gap: 20 }}>
                    <p style={{ margin: 0 }}>
                        I&rsquo;m Justin Pirrie, the founder of <Link href="/" style={{ color: "#a5b4fc" }}>ToolStack</Link>. I build every tool on this site and write every guide that goes with it.
                    </p>
                    <p style={{ margin: 0 }}>
                        ToolStack started from a simple frustration: the web is full of &ldquo;free&rdquo; tools that bury a calculator under three ads, gate the result behind a signup, or upsell you the second you get an answer. I wanted the opposite &mdash; tools that load instantly, do one job well, and never ask for your email. Today that&rsquo;s <strong style={{ color: "white" }}>65+ tools</strong> across writing, SEO, development, and everyday utilities, all free and account-free.
                    </p>
                    <p style={{ margin: 0 }}>
                        I&rsquo;m a builder first. Before I write about a tool, I build it and use it myself &mdash; which is why the guides here come from actually shipping these things, not from re-summarizing someone else&rsquo;s article. When I explain how a UTM builder works or why a JWT is structured the way it is, it&rsquo;s because I&rsquo;ve implemented it.
                    </p>
                    <p style={{ margin: 0 }}>
                        Alongside ToolStack I work on <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: "#a5b4fc" }}>AdvertsGPT</a>, helping businesses get found in AI search &mdash; the shift from classic SEO to how ChatGPT, Google&rsquo;s AI Overviews, and Perplexity decide what to cite. That work feeds straight back into ToolStack: a lot of these tools and guides exist because I needed them myself.
                    </p>
                </div>

                {/* Expertise */}
                <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "48px 0 16px" }}>What I write about</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
                    {[
                        { i: Wrench, t: "Free web tools", d: "Practical utilities that do one job, fast." },
                        { i: Search, t: "SEO & AI search (GEO/AEO)", d: "Ranking in Google and getting cited by AI." },
                        { i: PenLine, t: "Marketing workflows", d: "UTMs, email, content — the hands-on how-to." },
                        { i: BadgeCheck, t: "Developer utilities", d: "JSON, JWT, regex, encoding — explained clearly." },
                    ].map(({ i: Icon, t, d }) => (
                        <div key={t} style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 14, padding: "16px 18px" }}>
                            <Icon style={{ width: 18, height: 18, color: "#8b5cf6", marginBottom: 10 }} />
                            <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 4px" }}>{t}</p>
                            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.5 }}>{d}</p>
                        </div>
                    ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }}>
                    <a href="https://www.linkedin.com/in/justin-pirrie/" target="_blank" rel="noopener noreferrer" style={{ padding: "11px 20px", borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Connect on LinkedIn</a>
                    <Link href="/contact" style={{ padding: "11px 20px", borderRadius: 12, background: CARD, border: `1px solid ${LINE}`, color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Contact</Link>
                    <Link href="/blog" style={{ padding: "11px 20px", borderRadius: 12, background: CARD, border: `1px solid ${LINE}`, color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Read the guides</Link>
                </div>
            </div>
        </div>
    );
}
