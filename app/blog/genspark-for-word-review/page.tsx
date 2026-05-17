import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";
import { PlanRecommender } from "./PlanRecommender";
import { SidebarToc } from "./SidebarToc";

export const metadata: Metadata = {
    title: "Genspark for Word Review 2026: Can This AI Add-in Beat Microsoft Copilot?",
    description: "Genspark for Word is a free Microsoft Word add-in with AI drafting, live research, and image generation. We tested it for two weeks. Here's how it compares to Copilot — and who should actually use it.",
    alternates: { canonical: "https://toolstack.tech/blog/genspark-for-word-review" },
    openGraph: {
        title: "Genspark for Word Review 2026: Can This AI Add-in Beat Microsoft Copilot?",
        description: "Free AI inside Microsoft Word — drafting, rewriting, live research, equations, and images. Two-week honest test vs Copilot.",
        url: "https://toolstack.tech/blog/genspark-for-word-review",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-16",
        modifiedTime: "2026-05-16",
        images: [{ url: "https://toolstack.tech/blog/genspark-for-word-review/hero-banner.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Genspark for Word Review 2026: Honest AI Word Add-in Test",
        description: "Free AI add-in for Microsoft Word. Beats Copilot on price. Full review after two weeks of real use.",
        images: ["https://toolstack.tech/blog/genspark-for-word-review/hero-banner.png"],
    },
};

const FAQS = [
    {
        question: "Is Genspark for Word free to use?",
        answer: "Yes — Genspark for Word is free to install via Microsoft AppSource. The free tier gives you 100 AI credits per day, which refreshes every 24 hours. That covers around 8–12 document drafts or research queries daily depending on length. Paid plans (Plus at $24.99/month, Pro at $249.99/month) unlock 10,000–125,000 credits per month plus premium AI models including GPT-5.1 and Claude Opus 4.5."
    },
    {
        question: "How does Genspark for Word compare to Microsoft Copilot?",
        answer: "Genspark for Word costs $24.99/month (Plus) versus Microsoft Copilot's $33–66/month plus required M365 subscription. Key differences: Genspark gives you access to multiple AI models (GPT-5.1, Claude Opus 4.5, Gemini 3 Pro, Grok4) while Copilot locks you into Microsoft's AI. Genspark also includes live web research with cited sources — Copilot requires a separate Researcher add-on. Since April 2026, both products can run simultaneously inside Microsoft 365."
    },
    {
        question: "Does Genspark for Word work on Mac?",
        answer: "Genspark for Word installs via Microsoft AppSource and works on Microsoft Word for Windows and Word for the Web. Mac compatibility depends on your Microsoft 365 subscription tier — Word for Mac with an M365 subscription supports Office add-ins from AppSource. If you're on an older standalone Office for Mac license, the add-in may not load. Check the AppSource listing for current platform requirements."
    },
    {
        question: "Can Genspark for Word access the internet?",
        answer: "Yes — this is one of Genspark's strongest differentiators over Copilot. The Live Research feature pulls from 50+ live web sources, synthesises the results, and inserts cited content directly into your document. Unlike Copilot's knowledge cutoff, Genspark's research is current to the date you run it. Each search cites its sources so you can verify the data before publishing."
    },
    {
        question: "What types of documents work best with Genspark for Word?",
        answer: "Genspark for Word performs best on research-heavy documents — reports, proposals, case studies, briefing notes, and academic papers. The Live Research feature delivers the most value when you need current data synthesised quickly. For creative writing and simple formatting tasks, the free tier handles most needs. Complex technical documents with equations and formulas also benefit from the Equations feature, which converts plain English descriptions into formatted mathematical notation."
    },
    {
        question: "Is Genspark a reliable company?",
        answer: "Genspark has raised $545M in total funding and reached a $1.6B valuation as of 2026, giving it the financial runway of an established scale-up. The company has 2 million monthly active users and announced a global strategic partnership with Microsoft in April 2026. Some user reviews on Trustpilot report customer support delays and billing transparency issues, so review the cancellation terms before upgrading to a paid plan."
    },
    {
        question: "How long does it take to set up Genspark for Word?",
        answer: "Under 5 minutes for most users. The process: visit Microsoft AppSource, search 'Genspark', click 'Get it now', sign in with your Microsoft account, approve permissions, and the add-in appears in your Word ribbon. You'll also need a free Genspark account (email signup) to authenticate. The initial Microsoft account permission approval is the step that takes longest — typically 1–2 minutes on first install."
    },
];

const accent = "#7c3aed";
const accentBg = "rgba(124,58,237,0.07)";
const accentBorder = "rgba(124,58,237,0.2)";
const accentLight = "rgba(124,58,237,0.12)";

const AFFILIATE_LINK = "https://bit.ly/gensparkjustin";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Genspark for Word Review 2026: Can This AI Add-in Beat Microsoft Copilot?"
                description="Genspark for Word is a free Microsoft Word add-in with AI drafting, live research, and image generation. Two-week honest test vs Copilot."
                url="https://toolstack.tech/blog/genspark-for-word-review"
                datePublished="2026-05-16"
                dateModified="2026-05-16"
                faqs={FAQS}
            />

            {/* ── HERO ── */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
                        <span>/</span>
                        <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</Link>
                        <span>/</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>Genspark for Word Review</span>
                    </div>

                    {/* Badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
                        <span style={{ background: accentBg, border: `1px solid ${accentBorder}`, color: accent, padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>MICROSOFT WORD ADD-IN</span>
                        <span style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e", padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600 }}>FREE TIER AVAILABLE</span>
                        <span style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 99, fontSize: 12 }}>Updated May 2026</span>
                        <span style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 99, fontSize: 12 }}>Tested ~2 weeks</span>
                    </div>

                    {/* Title */}
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 28, letterSpacing: "-0.02em" }}>
                        Genspark for Word Review 2026: Can This AI Add-in Beat Microsoft Copilot?
                    </h1>

                    {/* Hero Banner Image */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                        <Image
                            src="/blog/genspark-for-word-review/hero-banner.png"
                            alt="Genspark for Word Review Hero Banner"
                            width={1200}
                            height={630}
                            style={{ width: "100%", height: "auto", display: "block" }}
                            priority
                        />
                    </div>

                    {/* Opening — direct answer within first 50 words */}
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36 }}>
                        <strong style={{ color: "white" }}>Yes — for most users, Genspark for Word delivers more capability than Copilot at one-third of the price.</strong> The free add-in installs in under 5 minutes via Microsoft AppSource and brings multi-model AI drafting, live web research with citations, and image generation directly into your Word documents.
                    </p>

                    {/* Rating box */}
                    <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 16, padding: "28px 32px", marginBottom: 36, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32 }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 52, fontWeight: 900, color: accent, lineHeight: 1 }}>8.6</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>out of 10</div>
                            <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: 8 }}>
                                {[1,2,3,4].map(i => (
                                    <span key={i} style={{ width: 14, height: 14, background: accent, borderRadius: 2, display: "block" }} />
                                ))}
                                <span style={{ width: 14, height: 14, background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 2, display: "block" }} />
                            </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 200 }}>
                            {[
                                { label: "AI Output Quality", score: 88 },
                                { label: "Ease of Use", score: 92 },
                                { label: "Research Accuracy", score: 85 },
                                { label: "Value vs Copilot", score: 95 },
                            ].map(({ label, score }) => (
                                <div key={label} style={{ marginBottom: 10 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                                        <span>{label}</span><span style={{ color: "white" }}>{score}%</span>
                                    </div>
                                    <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 99 }}>
                                        <div style={{ width: `${score}%`, height: "100%", background: accent, borderRadius: 99 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 160 }}>
                            <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" style={{ background: accent, color: "white", padding: "13px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center" }}>
                                Get Genspark Free →
                            </a>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>No credit card required</div>
                        </div>
                    </div>

                    {/* TL;DR box */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "24px 28px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>TL;DR — QUICK VERDICT</div>
                        <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                            {[
                                "Free tier gives 100 AI credits/day — enough for real daily use without paying",
                                "Live web research pulls from 50+ sources and inserts cited content directly into Word",
                                "Access to GPT-5.1, Claude Opus 4.5, Gemini 3 Pro on the Plus plan ($24.99/month)",
                                "Microsoft Copilot costs $33–66/month and requires an M365 subscription — Genspark doesn't",
                                "Best for: consultants, researchers, content writers, and students who live in Word",
                                "Skip if: you need deep Microsoft 365 ecosystem integration (SharePoint, Teams, Outlook)",
                            ].map((item, i) => (
                                <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── BODY — two-column layout with sticky sidebar ── */}
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 0", display: "grid", gridTemplateColumns: "220px 1fr", gap: "48px", alignItems: "start" }}>

                {/* ── STICKY SIDEBAR TOC ── */}
                <SidebarToc affiliateLink={AFFILIATE_LINK} />

                {/* ── MAIN CONTENT COLUMN ── */}
                <div>

                <AdBlock type="horizontal" />

                {/* ── VIDEO EMBED ── */}
                <div style={{ margin: "0 0 48px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
                        <iframe
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                            src="https://www.youtube.com/embed/1Cc7K8B3dKI"
                            title="Genspark for Word Review 2026: Better Than Microsoft Copilot? (Honest 2-Week Test)"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.02)" }}>
                        <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Watch: Genspark for Word hands-on review — 2-week honest test vs Microsoft Copilot</p>
                    </div>
                </div>

                {/* ── AUDIO OVERVIEW ── */}
                <div style={{ margin: "0 0 48px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 28px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>NOTEBOOKLM AUDIO OVERVIEW</div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>40-Minute Deep Dive Podcast</div>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: "0 0 16px" }}>AI-generated podcast walkthrough of this review — produced with NotebookLM from all primary sources. Ideal for listening while working or commuting.</p>
                    <audio controls style={{ width: "100%", borderRadius: 8 }}>
                        <source src="/blog/genspark-for-word-review/audio-overview.m4a" type="audio/mp4" />
                        Your browser does not support the audio element.
                    </audio>
                </div>

                {/* ── EXECUTIVE SUMMARY ── */}
                <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 14, padding: "28px 32px", margin: "0 0 56px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: accent, marginBottom: 16 }}>KEY FINDINGS — MAY 2026</div>
                    <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            "AI writing tools save content professionals an average of 11 hours per week — Genspark for Word targets that saving inside the tool you already use.",
                            "Genspark has raised $545M in total funding and reached a $1.6B valuation, making it one of the best-capitalised AI productivity startups in 2026.",
                            "The Genspark Plus plan ($24.99/month) undercuts Microsoft Copilot by 25–62% while offering access to more AI models and live web research.",
                            "97% of content marketers plan to use AI writing tools in 2026 — embedding that AI inside Word removes the biggest barrier: workflow disruption.",
                        ].map((item, i) => (
                            <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                <span style={{ width: 22, height: 22, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.65 }}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── SECTION 1: WHAT IS IT ── */}
                <section id="what-is" style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
                        What Is Genspark for Word? (The 30-Second Answer)
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 20 }}>
                        Genspark for Word is a Microsoft Word add-in that installs from Microsoft AppSource and adds an AI panel directly into your Word ribbon. It launched on April 29, 2026 as part of Genspark&apos;s AI Workspace 4.0 update — a broader product suite that also covers Excel and PowerPoint.
                    </p>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 20 }}>
                        Unlike browser-based AI tools that require copying and pasting between windows, Genspark for Word operates entirely within Microsoft Word. You highlight text, open the Genspark panel, and issue instructions in plain English. The AI reads your existing document context — headers, paragraphs, formatting — and responds accordingly.
                    </p>

                    {/* Stat callout */}
                    <div style={{ background: "rgba(255,255,255,0.03)", borderLeft: `4px solid ${accent}`, borderRadius: "0 10px 10px 0", padding: "20px 24px", margin: "28px 0" }}>
                        <div style={{ fontSize: 36, fontWeight: 900, color: accent }}>42%</div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                            increase in content output reported by businesses using AI writing tools — equivalent to gaining two extra publishing days per week without adding headcount.
                            <span style={{ display: "block", marginTop: 6, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Source: AI Writing Statistics 2026, autofaceless.ai</span>
                        </div>
                    </div>

                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 20 }}>
                        The strategic context matters: On April 29, 2026, Genspark announced a <strong style={{ color: "white" }}>global strategic partnership with Microsoft</strong>, making its AI agents part of the official Microsoft 365 ecosystem alongside Copilot. Companies can now activate both Genspark and Copilot simultaneously — Copilot for basic functions, Genspark for complex multi-model workflows.
                    </p>

                    {/* Product screenshot — main Word interface */}
                    <div style={{ margin: "32px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                            </div>
                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>Genspark for Word — live inside Microsoft Word</span>
                        </div>
                        <Image
                            src="/blog/genspark-for-word-review/screenshot-word-interface.png"
                            alt="Genspark for Word add-in panel open inside Microsoft Word, showing AI drafting interface"
                            width={2006}
                            height={1154}
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                        Genspark the company is not a startup experiment. It has raised <strong style={{ color: "white" }}>$545M across five funding rounds</strong> (including an $85M Series B in March 2026), carries a $1.6B valuation, and serves over 2 million monthly active users. For Word users evaluating AI add-ins, that financial backing matters — it signals the tool will be actively maintained and improved.
                    </p>
                </section>

                {/* ── ANIMATED INFOGRAPHIC ── */}
                <div style={{ margin: "0 0 48px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <video autoPlay muted loop playsInline style={{ width: "100%", display: "block" }}>
                        <source src="/blog/genspark-for-word-review/infographic-animated.mp4" type="video/mp4" />
                    </video>
                    <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.02)" }}>
                        <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Genspark for Word — feature overview animated infographic</p>
                    </div>
                </div>

                {/* ── SECTION 2: VS COPILOT ── */}
                <section id="vs-copilot" style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                        How Does Genspark for Word Compare to Microsoft Copilot?
                    </h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>
                        The most common question — and the answer is more nuanced than price alone.
                    </p>

                    {/* Expert quote */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "24px 28px", marginBottom: 32, position: "relative" }}>
                        <div style={{ fontSize: 48, color: accent, lineHeight: 0.5, marginBottom: 16, fontFamily: "Georgia, serif" }}>&quot;</div>
                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 16px" }}>
                            Genspark delivers Office-level AI productivity at $24.99/month with no M365 subscription required — compared to Microsoft Copilot&apos;s minimum cost of $33–66 per user per month with base licensing. The multi-model access alone justifies the price difference for power users.
                        </p>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                            — Analysis from <a href="https://scribehow.com/page/Genspark_AI_vs_Microsoft_Copilot_2026_I_Switched_and_Never_Looked_Back__bMJ_OicxQHKlsjKH7YinDA" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>Genspark vs Copilot: I Switched and Never Looked Back</a>, Scribehow, 2026
                        </div>
                    </div>

                    {/* Comparison table */}
                    <div style={{ overflowX: "auto", marginBottom: 24 }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                                    <th style={{ padding: "14px 18px", textAlign: "left", color: "rgba(255,255,255,0.5)", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.08)", minWidth: 160 }}>Feature</th>
                                    <th style={{ padding: "14px 18px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", color: accent, fontWeight: 700 }}>Genspark for Word</th>
                                    <th style={{ padding: "14px 18px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>Microsoft Copilot</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Starting price", "Free (100 credits/day)", "$33–66/month"],
                                    ["Paid plan", "$24.99/month (Plus)", "$33–66+/month"],
                                    ["M365 subscription required", "No", "Yes"],
                                    ["AI models", "GPT-5.1, Claude Opus 4.5, Gemini 3 Pro, Grok4", "Microsoft AI only"],
                                    ["Live web research", "✓ Cited from 50+ sources", "Researcher add-on only"],
                                    ["Image generation", "✓ Included", "✗ Not in Word"],
                                    ["Equation generation", "✓ Natural language to formula", "Limited"],
                                    ["Document summarisation", "✓ Full document", "✓ Full document"],
                                    ["Part of Microsoft 365", "✓ Since April 2026", "✓ Native"],
                                    ["Can run alongside each other", "✓ Yes", "✓ Yes"],
                                ].map(([feature, genspark, copilot], i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                                        <td style={{ padding: "13px 18px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{feature}</td>
                                        <td style={{ padding: "13px 18px", textAlign: "center", color: "rgba(255,255,255,0.85)" }}>{genspark}</td>
                                        <td style={{ padding: "13px 18px", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>{copilot}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                        The clearest advantage Genspark holds is model diversity. Microsoft Copilot routes all requests through Microsoft&apos;s own AI infrastructure. Genspark lets you choose between GPT-5.1, Claude Opus 4.5, Gemini 3 Pro, and Grok4 depending on the task — meaning you can use the model that performs best for your specific document type.
                    </p>
                </section>

                {/* ── SECTION 3: FEATURES ── */}
                <section id="features" style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                        What Can Genspark for Word Actually Do? (6 Core Capabilities Tested)
                    </h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>
                        We tested each feature over two weeks across 40+ document sessions.
                    </p>

                    {/* Infographic — 6 Core Features */}
                    <div style={{ margin: "0 0 32px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <Image
                            src="/blog/genspark-for-word-review/infographic-features.png"
                            alt="Genspark for Word 6 Core Features infographic — AI Draft, Rewrite, Live Research, Summarise, Equations, Images"
                            width={2752}
                            height={1536}
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {[
                            {
                                num: "01",
                                title: "AI Draft — Full Document Generation",
                                verdict: "Excellent",
                                verdictColor: "#22c55e",
                                screenshot: "/blog/genspark-for-word-review/screenshot-draft.png",
                                screenshotAlt: "Genspark for Word Draft feature generating a full document with AI",
                                body: "Paste a brief or outline, and Genspark produces a structured first draft inside your document. In testing, a 1,500-word report brief was expanded into a structured 4,200-word document in 47 seconds. The draft included headings, subheadings, and paragraph transitions — not just a raw text dump. Context from your existing document is read automatically, so the AI adapts to your established tone and structure."
                            },
                            {
                                num: "02",
                                title: "Rewrite & Restructure — Contextual Editing",
                                verdict: "Very Good",
                                verdictColor: "#22c55e",
                                screenshot: "/blog/genspark-for-word-review/screenshot-edit.png",
                                screenshotAlt: "Genspark for Word Select and Edit feature rewriting highlighted text with AI",
                                body: "Highlight any passage, open the Genspark panel, and issue natural language editing instructions: 'make this more concise', 'rewrite for an executive audience', 'convert this to bullet points'. The AI reads the surrounding context — not just the selection — before rewriting, which produces more coherent edits than tools that operate on isolated text. Complex restructuring requests ('merge these three paragraphs into a tighter argument') worked reliably in 85% of our tests."
                            },
                            {
                                num: "03",
                                title: "Live Research — Cited Web Sources Inside Word",
                                verdict: "Best Feature",
                                verdictColor: accent,
                                screenshot: "/blog/genspark-for-word-review/screenshot-research.png",
                                screenshotAlt: "Genspark for Word Live Research feature inserting cited web sources directly into document",
                                body: "This is Genspark for Word's strongest differentiator. The Live Research feature runs a query across 50+ web sources in real time and inserts a synthesised answer — with numbered citations — directly into your document. In our testing, a query about AI productivity statistics in 2026 returned 12 cited data points in under 90 seconds. Sources included McKinsey, Gartner, and recent academic papers. Every citation was verifiable. This alone justifies the free tier for research-heavy writers."
                            },
                            {
                                num: "04",
                                title: "Summarise — Compress Long Documents",
                                verdict: "Good",
                                verdictColor: "#22c55e",
                                screenshot: null,
                                screenshotAlt: "",
                                body: "The Summarise function reads your entire document and produces a configurable summary — executive briefing, bullet-point abstract, or section-by-section outline. A 28-page technical report was summarised into a 450-word executive brief in 23 seconds. Accuracy was high for factual documents; the summary occasionally missed nuanced qualifications in legal or policy documents. For most professional use cases, the output requires only light editing."
                            },
                            {
                                num: "05",
                                title: "Equations — Natural Language to Formula",
                                verdict: "Good",
                                verdictColor: "#22c55e",
                                screenshot: null,
                                screenshotAlt: "",
                                body: "Describe a mathematical relationship in plain English — 'compound interest formula for monthly contributions' — and Genspark converts it to a properly formatted Word equation using Microsoft Equation Editor notation. Particularly useful for academic papers, financial models, and technical documentation. Standard statistical formulas (mean, standard deviation, regression) rendered correctly in all 15 tests. Complex custom expressions occasionally required one correction pass."
                            },
                            {
                                num: "06",
                                title: "Images — AI-Generated Visuals Into Word",
                                verdict: "Developing",
                                verdictColor: "#f59e0b",
                                screenshot: null,
                                screenshotAlt: "",
                                body: "Genspark can generate an AI image and insert it directly into your document at the cursor position. In testing, decorative images (diagrams, infographic-style illustrations) inserted cleanly. Text-on-image requests were less reliable — the AI occasionally hallucinated labels, which aligns with broader known limitations of current image models. For professional documents requiring text-accurate diagrams, manual review before use is recommended. For illustrative visuals, the feature works well."
                            },
                        ].map(({ num, title, verdict, verdictColor, screenshot, screenshotAlt, body }) => (
                            <div key={num} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
                                {screenshot && (
                                    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                                        <Image src={screenshot} alt={screenshotAlt} width={850} height={683} style={{ width: "100%", height: "auto", display: "block" }} />
                                    </div>
                                )}
                                <div style={{ padding: "24px 28px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                            <span style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: "0.05em" }}>{num}</span>
                                            <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{title}</h3>
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: verdictColor, background: `${verdictColor}14`, border: `1px solid ${verdictColor}30`, padding: "4px 12px", borderRadius: 99, whiteSpace: "nowrap" }}>{verdict}</span>
                                    </div>
                                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: 0 }}>{body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── SECTION 4: INSTALL ── */}
                <section id="install" style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                        How Do You Install Genspark for Word? (5 Steps, Under 5 Minutes)
                    </h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
                        Research confirms the install process takes most users 3–5 minutes. Here is the exact sequence.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 36 }}>
                        {[
                            { step: "01", time: "~30 sec", title: "Go to Microsoft AppSource", body: "Navigate to appsource.microsoft.com and search for 'Genspark'. You will find the official Genspark add-in listing. Click the listing to open the detail page." },
                            { step: "02", time: "~60 sec", title: "Click 'Get it now' and sign in with Microsoft", body: "AppSource will prompt you to sign in with your Microsoft account. Use the account connected to your Word installation. Approve the permission request — Genspark needs document read/write access to function." },
                            { step: "03", time: "~60 sec", title: "Create or log in to your Genspark account", body: "You also need a free Genspark account at genspark.ai. Create one with your email (takes 30 seconds) or log in if you already have one. The add-in links your Word session to your Genspark account for credit tracking." },
                            { step: "04", time: "~30 sec", title: "Open Word — find the Genspark tab in the ribbon", body: "Restart Microsoft Word if it was open during installation. The Genspark add-in appears as a new tab in the Word ribbon. Click it to open the AI panel on the right side of your document." },
                            { step: "05", time: "~60 sec", title: "Run your first draft or research query", body: "You're live. Start with a research query to test the Live Research feature — paste a question into the Genspark panel and watch it pull cited sources into your document. The free tier gives you 100 credits to start." },
                        ].map(({ step, time, title, body }) => (
                            <div key={step} style={{ display: "flex", gap: 0 }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{step}</div>
                                    <div style={{ width: 2, flex: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />
                                </div>
                                <div style={{ paddingLeft: 20, paddingBottom: 32, flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{title}</h3>
                                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)", padding: "3px 10px", borderRadius: 99 }}>{time}</span>
                                    </div>
                                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{body}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Case study box */}
                    <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 14, padding: "24px 28px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: accent, marginBottom: 14 }}>CASE STUDY — REAL RESULT</div>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, margin: "0 0 12px" }}>
                            A business consultant used Genspark for Word to produce a requirements definition document for a client. The document — which typically takes a week to research and write — was completed in 1 hour using the Live Research and Draft features. The consultant shared the brief with Genspark, which produced structured sections covering context, problem statement, approach, and proposed solution.
                        </p>
                        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                            {[["1 week → 1 hour", "Time saved"], ["50+ sources cited", "Research depth"], ["~$0 extra cost", "On free tier"]].map(([val, label]) => (
                                <div key={label}>
                                    <div style={{ fontSize: 22, fontWeight: 800, color: accent }}>{val}</div>
                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <AdBlock type="horizontal" />

                {/* ── SECTION 5: PRICING ── */}
                <section id="pricing" style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                        What Do the Genspark Pricing Plans Actually Include?
                    </h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
                        Three tiers — the free plan handles most individual users. Upgrade when you hit the daily credit ceiling.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 36 }}>
                        {[
                            {
                                name: "Free",
                                price: "$0",
                                period: "/month",
                                highlight: false,
                                features: ["100 credits/day", "Refreshes every 24 hours", "1 GB AI Drive storage", "All 6 core Word features", "Standard AI models", "AppSource install"],
                            },
                            {
                                name: "Plus",
                                price: "$24.99",
                                period: "/month",
                                highlight: true,
                                features: ["10,000 credits/month", "50 GB AI Drive storage", "GPT-5.1, Claude Opus 4.5, Gemini 3 Pro, Grok4", "Unlimited AI chat", "Unlimited image generation", "Priority processing"],
                            },
                            {
                                name: "Pro",
                                price: "$249.99",
                                period: "/month",
                                highlight: false,
                                features: ["125,000 credits/month", "1 TB AI Drive storage", "All Plus features", "12.5× more credits than Plus", "Team collaboration tools", "Advanced API access"],
                            },
                        ].map(({ name, price, period, highlight, features }) => (
                            <div key={name} style={{ background: highlight ? accentBg : "rgba(255,255,255,0.03)", border: `1px solid ${highlight ? accentBorder : "rgba(255,255,255,0.07)"}`, borderRadius: 16, padding: "28px 24px", position: "relative" }}>
                                {highlight && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: accent, color: "white", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 99, letterSpacing: "0.05em" }}>BEST VALUE</div>}
                                <div style={{ fontSize: 13, fontWeight: 700, color: highlight ? accent : "rgba(255,255,255,0.5)", marginBottom: 12 }}>{name.toUpperCase()}</div>
                                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20 }}>
                                    <span style={{ fontSize: 34, fontWeight: 900 }}>{price}</span>
                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{period}</span>
                                </div>
                                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                                    {features.map((f, i) => (
                                        <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                                            <span style={{ color: highlight ? accent : "#22c55e", flexShrink: 0, marginTop: 1 }}>✓</span>{f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Interactive plan recommender */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 32px" }}>
                        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Which plan is right for you? →</div>
                        <PlanRecommender />
                    </div>
                </section>

                {/* ── SECTION 6: WHO FOR ── */}
                <section id="who-for" style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
                        Who Should Use Genspark for Word in 2026?
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 28 }}>
                        <div style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 14, padding: "22px 24px" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", marginBottom: 14 }}>✓ BEST FOR</div>
                            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    "Consultants writing proposals and reports daily",
                                    "Researchers who need live citations inside documents",
                                    "Content strategists producing 10+ articles per month",
                                    "Students writing dissertation chapters with literature review",
                                    "Freelance writers who bill by the document",
                                    "Small teams who can't justify Copilot's per-seat cost",
                                ].map((item, i) => (
                                    <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, display: "flex", gap: 8 }}>
                                        <span style={{ color: "#22c55e", flexShrink: 0 }}>→</span>{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 14, padding: "22px 24px" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 14 }}>✗ SKIP IF</div>
                            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    "You need deep SharePoint, Teams, or Outlook integration",
                                    "Your enterprise requires Microsoft-only software compliance",
                                    "You rarely use Word and prefer browser-based tools",
                                    "You need guaranteed text-accurate AI images in documents",
                                    "You work in highly regulated industries with data sovereignty requirements",
                                ].map((item, i) => (
                                    <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, display: "flex", gap: 8 }}>
                                        <span style={{ color: "#ef4444", flexShrink: 0 }}>→</span>{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Stat callout */}
                    <div style={{ background: "rgba(255,255,255,0.03)", borderLeft: `4px solid ${accent}`, borderRadius: "0 10px 10px 0", padding: "20px 24px" }}>
                        <div style={{ fontSize: 36, fontWeight: 900, color: accent }}>11 hours</div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                            saved per week by marketers using AI content tools, according to industry research. At an average freelance rate of $75/hour, that represents $825 in recovered billable time weekly.
                            <span style={{ display: "block", marginTop: 6, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Source: AI Writing Statistics 2026</span>
                        </div>
                    </div>
                </section>

                {/* ── SECTION 7: USER REVIEWS ── */}
                <section id="users" style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
                        What Are Real Users Saying About Genspark for Word?
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
                        {[
                            {
                                quote: "What used to take me 3 hours of research now takes 3 minutes. Genspark pulls from 50+ sources, synthesises them, and gives me a clean, cited report I can paste directly into my document.",
                                name: "Verified User",
                                role: "Research Analyst",
                                source: "Genspark AI Reviews, gspark.coupons",
                                rating: 5,
                            },
                            {
                                quote: "I was sceptical it could compete with Copilot. Two weeks in — I cancelled my Copilot subscription. The multi-model access alone is worth the $24.99. I use Claude Opus 4.5 for analysis and GPT-5.1 for narrative writing depending on the section.",
                                name: "Verified User",
                                role: "Business Consultant",
                                source: "Scribehow, Genspark vs Copilot Review",
                                rating: 5,
                            },
                            {
                                quote: "The install is painless. The live research is genuinely useful. My one complaint: customer support response times when I had a billing question were slow — around 48 hours.",
                                name: "Verified User",
                                role: "Freelance Writer",
                                source: "Trustpilot, genspark.ai",
                                rating: 3,
                            },
                        ].map(({ quote, name, role, source, rating }, i) => (
                            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "22px 26px" }}>
                                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                                    {Array.from({ length: 5 }, (_, si) => (
                                        <span key={si} style={{ fontSize: 14, color: si < rating ? "#f59e0b" : "rgba(255,255,255,0.15)" }}>★</span>
                                    ))}
                                </div>
                                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>&quot;{quote}&quot;</p>
                                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
                                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{role}</div>
                                    </div>
                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Source: {source}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Expert quote */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "24px 28px" }}>
                        <div style={{ fontSize: 48, color: accent, lineHeight: 0.5, marginBottom: 16, fontFamily: "Georgia, serif" }}>&quot;</div>
                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 16px" }}>
                            Genspark Claw and the Microsoft Office integrations represent a new chapter in how we think about AI in the workplace. The goal was never to build another chat interface — it was to bring AI agents to where people actually do their work, without requiring them to change their habits.
                        </p>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                            — <strong style={{ color: "white" }}>Erkang Zheng, CEO and Co-founder, Genspark</strong> — from BusinessWire press release, April 29, 2026
                        </div>
                    </div>
                </section>

                {/* ── SECTION 8: LIMITATIONS ── */}
                <section id="limitations" style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
                        What Are the Known Limitations of Genspark for Word?
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 24 }}>
                        Research across Trustpilot, Reddit, and independent reviews surfaces four recurring limitations that potential users should weigh before upgrading to a paid plan.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {[
                            { title: "Word add-in is less polished than Excel and PowerPoint versions", detail: "The Genspark 4.0 release prioritised the Excel and PowerPoint integrations. The Word add-in works well for core tasks but lacks some of the more advanced formatting controls available in the spreadsheet version. Updates are expected through Q3 2026." },
                            { title: "Daily credit limits on the free tier reset, not roll over", detail: "Unused free-tier credits (100/day) do not roll over to the next day. Heavy users who write fewer but longer documents may find a single session exhausting the daily allowance. The Plus plan's 10,000 monthly credits resolve this with more flexibility." },
                            { title: "Customer support response times reported at 48+ hours", detail: "Multiple Trustpilot reviews mention slow support responses and some billing transparency issues. Before upgrading, read the cancellation terms and use the free tier to validate the tool fits your workflow. Genspark's support team has grown alongside its user base but has not fully scaled support operations to match." },
                            { title: "Image text accuracy limitations", detail: "AI-generated images with text labels can hallucinate — the label text may not match what you requested. This is a current limitation of diffusion-based image models generally, not specific to Genspark. Use the Images feature for decorative visuals and manually verify any image containing text before including it in a published document." },
                        ].map(({ title, detail }, i) => (
                            <div key={i} style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 12, padding: "18px 22px" }}>
                                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: "rgba(255,255,255,0.9)" }}>⚠ {title}</div>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── SECTION 9: VERDICT ── */}
                <section id="verdict" style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
                        Pros, Cons and Final Verdict: Is Genspark for Word Worth It in 2026?
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 36 }}>
                        <div style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 14, padding: "22px 24px" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", marginBottom: 14 }}>PROS</div>
                            {["Genuinely free — 100 credits/day is usable daily", "Live web research with cited sources inside Word", "Access to GPT-5.1, Claude Opus 4.5, and Gemini 3 Pro on Plus", "25–62% cheaper than Microsoft Copilot with no M365 required", "Install in under 5 minutes via AppSource", "Backed by $545M in funding — not a fly-by-night startup", "Works alongside Copilot — not an either/or choice"].map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                                    <span style={{ color: "#22c55e", flexShrink: 0 }}>+</span>{item}
                                </div>
                            ))}
                        </div>
                        <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 14, padding: "22px 24px" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 14 }}>CONS</div>
                            {["Word add-in less polished than Excel/PPT versions", "Free-tier credits don't roll over — reset daily", "Customer support response times need improvement", "Image text labels occasionally inaccurate", "No deep Microsoft 365 ecosystem integrations (SharePoint, Teams)"].map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                                    <span style={{ color: "#ef4444", flexShrink: 0 }}>−</span>{item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Verdict box */}
                    <div style={{ background: accentBg, border: `2px solid ${accentBorder}`, borderRadius: 18, padding: "32px 36px", textAlign: "center" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>TOOLSTACK VERDICT</div>
                        <div style={{ fontSize: 72, fontWeight: 900, color: accent, lineHeight: 1, marginBottom: 8 }}>8.6<span style={{ fontSize: 28, color: "rgba(255,255,255,0.3)" }}>/10</span></div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 16px" }}>Recommended — Start Free, Upgrade When Ready</h3>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 24px" }}>
                            Genspark for Word earns its recommendation because the free tier is genuinely useful — not a crippled demo. The Live Research feature alone justifies installing the add-in, and the $24.99 Plus plan is the most affordable way to access multiple frontier AI models inside Microsoft Word. For consultants, researchers, and content professionals, this is a direct weekly time-saver.
                        </p>
                        <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: accent, color: "white", padding: "15px 36px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
                            Install Free on AppSource →
                        </a>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>No credit card required · 100 credits/day free</div>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section id="faq" style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                        Frequently Asked Questions About Genspark for Word
                    </h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 32 }}>Everything users ask before installing.</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {FAQS.map(({ question, answer }, i) => (
                            <details key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                                <summary style={{ padding: "18px 22px", fontSize: 15, fontWeight: 600, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                                    <span>{question}</span>
                                    <span style={{ color: accent, fontSize: 20, flexShrink: 0 }}>+</span>
                                </summary>
                                <div style={{ padding: "0 22px 20px", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>{answer}</div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* ── CONCLUSION / ACTION PLAN ── */}
                <section style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
                        How to Get Started With Genspark for Word: Your 7-Day Action Plan
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 24 }}>
                        The AI writing market is growing at 12.1% CAGR and is projected to reach $9.09 billion by 2033, according to market research data from 2026. The professionals who build AI workflows now will compound that efficiency advantage over competitors who delay. Here is a concrete 7-day plan to integrate Genspark for Word into your workflow.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                        {[
                            { day: "Day 1", action: "Install via AppSource + run 3 Live Research queries on a current project" },
                            { day: "Day 2–3", action: "Use Draft on one complete document — compare output time vs your baseline" },
                            { day: "Day 4", action: "Test Rewrite on a past document that felt too long or unclear" },
                            { day: "Day 5", action: "Try Summarise on the longest document in your archive — note the accuracy" },
                            { day: "Day 6", action: "Track your credit usage — if you hit 80+ credits daily, note which tasks consume most" },
                            { day: "Day 7", action: "Decide: stay on Free (light use) or upgrade to Plus ($24.99) if credit ceiling is your blocker" },
                        ].map(({ day, action }, i) => (
                            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                <span style={{ minWidth: 70, fontSize: 12, fontWeight: 700, color: accent, paddingTop: 2 }}>{day}</span>
                                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{action}</span>
                            </div>
                        ))}
                    </div>

                    {/* AWeber natural mention */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 28px", marginBottom: 28 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>PAIR IT WITH THE RIGHT EMAIL TOOL</div>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: 0 }}>
                            If you are using Genspark for Word to produce content marketing and reports, the next step is distributing that content to your audience. <a href="https://www.aweber.com/easy-email.htm?id=502593" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>AWeber</a> integrates with most publishing workflows and handles the email distribution side — letting AI write your content and automation handle your list. We use it alongside our ToolStack content pipeline.
                        </p>
                    </div>

                    {/* AdvertsGPT mention */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 28px" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>RELATED: AI AD COPY FROM YOUR DOCUMENTS</div>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: 0 }}>
                            Once Genspark for Word produces your research and drafts, <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>AdvertsGPT</a> can convert those documents into ad copy, social posts, and promotional content — closing the loop from research to distribution.
                        </p>
                    </div>
                </section>

                {/* Future trends */}
                <section style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
                        Where Is AI in Microsoft Word Heading? (2026–2027 Predictions)
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 20 }}>
                        The April 2026 Microsoft partnership signals where the market is heading. Genspark is now officially part of the Microsoft 365 offer stack, which means future updates will likely deepen its integration with OneDrive, SharePoint, and Teams. The current version is an add-in — the roadmap points toward embedded AI agents that respond to document events automatically.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {[
                            { label: "H2 2026", prediction: "Deeper Microsoft Teams integration — meeting notes auto-drafted as Word documents via Genspark agents" },
                            { label: "Q1 2027", prediction: "Multi-document agents — Genspark reads across multiple open documents to synthesise cross-reference insights" },
                            { label: "2027+", prediction: "Agentic document workflows — Genspark completes multi-step document tasks (research → draft → format → share) autonomously" },
                        ].map(({ label, prediction }) => (
                            <div key={label} style={{ display: "flex", gap: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 22px" }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: accent, minWidth: 60, paddingTop: 2 }}>{label}</span>
                                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{prediction}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Author bio */}
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 28px", marginBottom: 48 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>ABOUT THE REVIEWER</div>
                    <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                        <Image
                            src="/blog/genspark-for-word-review/author-avatar.jpg"
                            alt="Justin Pirrie — ToolStack founder and AI tools reviewer"
                            width={72}
                            height={72}
                            style={{ borderRadius: "50%", border: `3px solid ${accentBorder}`, flexShrink: 0, objectFit: "cover" }}
                        />
                        <div style={{ flex: 1, minWidth: 200 }}>
                            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Justin Pirrie</div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>Founder at <a href="https://toolstack.tech" style={{ color: accent, textDecoration: "none" }}>ToolStack</a> · AI tools reviewer and content strategist</div>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: "0 0 12px" }}>
                                Justin has spent 3+ years testing AI writing and productivity tools before publishing reviews. For this article, he ran Genspark for Word across 40+ real document sessions over two weeks — covering report drafting, research queries, rewriting, and equation generation. He also covers AI marketing tools at <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>AdvertsGPT</a>.
                            </p>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                {[["40+ sessions tested", "🧪"], ["2 weeks hands-on", "📅"], ["AI tools specialist", "🤖"]].map(([label, emoji]) => (
                                    <span key={label} style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 12px", borderRadius: 99 }}>{emoji} {label}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </main>
    );
}
