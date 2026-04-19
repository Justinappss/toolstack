import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Sparkles, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "About ToolStack — Free Tools for Writers, Marketers & Developers",
    description: "ToolStack is a free collection of 36+ AI and utility tools for writers, marketers, and developers. No signup, no paywalls, instant results.",
    alternates: { canonical: "https://toolstack.tech/about" },
    openGraph: {
        title: "About ToolStack",
        description: "Free AI and utility tools for everyone. No signup, no paywalls.",
        url: "https://toolstack.tech/about",
        siteName: "ToolStack",
        type: "website",
    },
};

export default function AboutPage() {
    return (
        <div style={{ minHeight: "100vh", background: "#080810" }}>
            {/* Background blobs */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "-10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
            </div>            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "AboutPage",
                  "mainEntity": {
                    "@type": "Organization",
                    "name": "ToolStack",
                    "description": "ToolStack is the professional ecosystem for free AI & utility tools.",
                    "url": "https://toolstack.tech"
                  }
                }),
              }}
            />

            <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "80px 24px 100px" }}>
                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48, fontSize: 14, color: "rgba(255,255,255,0.35)" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>ToolStack</Link>
                    <span>/</span>
                    <span style={{ color: "rgba(255,255,255,0.65)" }}>About</span>
                </nav>

                {/* Header */}
                <div style={{ marginBottom: 56 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5b4fc", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
                        <Zap style={{ width: 14, height: 14 }} />
                        The Utility Authority
                    </div>
                    <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.02em" }}>
                        Defining the{" "}
                        <span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Utility Era
                        </span>
                    </h1>
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 620 }}>
                        ToolStack is a professional ecosystem of 36+ free online tools engineered for writers, marketers, and developers who demand speed over friction.
                    </p>
                </div>

                {/* Pillars */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 56 }}>
                    {[
                        { icon: Sparkles, title: "GPT-4o Native", body: "Every AI tool in our suite is powered by GPT-4o, ensuring production-grade accuracy for every output.", color: "#6366f1" },
                        { icon: Shield, title: "Zero Data Logging", body: "Our privacy-first architecture executes logic in the browser. We never see your data, and we never store it.", color: "#34d399" },
                        { icon: Clock, title: "High-Frequency Utility", body: "ToolStack is built on the 'Prism Strategy'—multiplying professional output through specialized micro-utilities.", color: "#fbbf24" },
                    ].map(({ icon: Icon, title, body, color }) => (
                        <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                                <Icon style={{ width: 18, height: 18, color }} />
                            </div>
                            <div style={{ fontWeight: 700, color: "white", marginBottom: 8 }}>{title}</div>
                            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{body}</div>
                        </div>
                    ))}
                </div>

                {/* Mission & Vision */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 56 }}>
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 32 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 12 }}>Our Mission</h2>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                            To unbundle the complexity of modern AI into simple, accessible, and high-utility tools that anyone can use to work faster. 
                        </p>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 32 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 12 }}>Our Vision</h2>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                            To become the world's most trusted repository for specialized software—where quality and speed are the only things that matter.
                        </p>
                    </div>
                </div>

                {/* Story */}
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 40, marginBottom: 56 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", marginBottom: 32 }}>
                        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: "white", flexShrink: 0 }}>
                            JP
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", marginBottom: 4 }}>The Story Behind ToolStack</h2>
                            <p style={{ fontSize: 14, color: "#818cf8", fontWeight: 700, margin: 0 }}>Founded by Justin Pirrie</p>
                        </div>
                    </div>
                    <div style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 16 }}>
                        <p>
                            ToolStack was born out of a simple frustration: <strong style={{ color: "white" }}>Why does everything require a subscription?</strong>
                        </p>
                        <p>
                            As a professional developer and digital marketer, I found myself constantly needing small tasks done—counting words, reformatting code, or generating a quick prompt. But the internet had become cluttered with "freemium" tools that force you to create an account or dodge a dozen ads just to get a single result.
                        </p>
                        <p>
                            I decided to build the antidote. ToolStack is engineered on a single principle: <strong style={{ color: "white" }}>Utility shouldn't have friction.</strong> Every tool we build is optimized for speed, utilizes the latest GPT-4o models, and is maintained with a standard of design that aligns with the premium **AdvertiseGPT** ecosystem.
                        </p>
                        <p>
                            Today, ToolStack serves thousands of professionals daily. We are an independent team committed to keeping high-utility software free and high-quality for everyone.
                        </p>
                    </div>
                </div>

                {/* Contact */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 40 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Global Authority</h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0 }}>
                        ToolStack is part of a global network of AI utilities. For business inquiries, tool requests, or partnership opportunities, reach us at{" "}
                        <a href="mailto:justinmakemoneyonline@gmail.com" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>justinmakemoneyonline@gmail.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
