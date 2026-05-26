"use client";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

const FAQS = [
    {
        question: "What is Google's new AI search bar announced at I/O 2026?",
        answer: "Google's redesigned search bar — announced at Google I/O 2026 — is an AI-powered conversational text field that replaces the classic keyword box. Instead of typing short keywords, you can ask multi-part questions in natural language, upload images, video files, audio, or documents directly into the search bar, and assign long-running autonomous tasks like tracking sneaker drops or monitoring apartment listings over time.",
    },
    {
        question: "Are Google's 10 blue links going away?",
        answer: "No — Google has confirmed that traditional blue web links are staying. Below the AI's summary (called AI Overviews), you will still find a list of standard search results with blue text links and source attributions. The era of 10 blue links as the primary interface is evolving, but the links themselves remain. Content that gets cited inside AI Overviews also gains a visible source link that drives traffic.",
    },
    {
        question: "What are AI Overviews and how do they affect my website traffic?",
        answer: "AI Overviews are the AI-generated answer summaries that now appear at the top of many Google search results. They synthesise information from multiple sources and display it directly in the SERP. Pages that are cited inside an AI Overview receive a source attribution link. Studies show AI Overviews reduce clicks on results below them by 25–35% for informational queries — but pages cited inside the overview itself see increased visibility. The goal is to be the source, not a result beneath the overview.",
    },
    {
        question: "How do I optimise my content for Google's new conversational search?",
        answer: "Four changes make the biggest difference: (1) Write FAQ sections using natural, conversational question phrasing that matches how people speak, not just how they type. (2) Make the first sentence of every answer a complete, standalone answer — AI systems extract the first sentence most often. (3) Use question-format H2 headings wherever possible. (4) Add structured data: FAQPage schema for Q&A sections and HowTo schema for step-by-step content — these are the formats Google's AI most reliably cites.",
    },
    {
        question: "What types of content get cited inside AI Overviews?",
        answer: "Content that is direct, factual, well-structured, and easy to extract performs best in AI Overviews. Specifically: FAQ pages with clear Q&A format, how-to guides with numbered steps, pages with statistics and cited sources, and tool pages that answer a specific task. Long-form opinion pieces, content behind paywalls, and pages with no clear structure are rarely cited. Short, complete answers — ideally under 80 words per FAQ answer — are extracted far more frequently than dense paragraphs.",
    },
    {
        question: "What is the multimodal upload feature in Google's new search bar?",
        answer: "Google's redesigned search bar allows you to drag and drop images, video files, audio files, or open browser tabs directly into the search field. The AI then analyses the uploaded content and answers questions about it. For example, you could upload a screenshot of an error message and ask 'what does this mean and how do I fix it?' or drag in a product photo and ask 'where can I buy this for less?'",
    },
    {
        question: "What are Google Search's autonomous agents?",
        answer: "Autonomous agents in Google Search are long-running tasks you can assign to the search AI. Instead of a one-time query, you set a persistent goal — for example, 'alert me when a 2-bedroom flat in Manchester drops below £1,200/month' or 'track new Nike Dunk releases and notify me when a size 10 becomes available.' The agent monitors the web over time and proactively surfaces results when conditions are met.",
    },
    {
        question: "How do dynamic mini-apps in Google Search work?",
        answer: "In response to certain prompts, Google's AI now builds custom interactive visualisations and micro-applications on the fly directly in the search results. For example, asking 'create a 12-week marathon training plan for a 4-hour finish' might generate an interactive fitness tracker you can use directly in the search interface, without visiting a third-party site. Google builds these mini-apps in real time from your query parameters.",
    },
];

const accent = "#6366f1";
const accentBg = "rgba(99,102,241,0.06)";
const accentBorder = "rgba(99,102,241,0.18)";

const h2Style: React.CSSProperties = { fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 };
const pStyle: React.CSSProperties = { margin: "0 0 20px" };

const featureCard: React.CSSProperties = {
    padding: "20px 24px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.025)",
    marginBottom: 12,
};

const sectionCard: React.CSSProperties = {
    padding: "24px 28px",
    borderRadius: 16,
    border: `1px solid ${accentBorder}`,
    background: accentBg,
    marginBottom: 24,
};

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Google's New AI Search Bar: What It Means for Your Website Traffic (2026)"
                description="Google redesigned its search bar for the first time in 25 years at I/O 2026. Here's exactly what changed, what happened to the blue links, and how to keep your traffic."
                url="https://toolstack.tech/blog/google-ai-search-redesign-2026"
                datePublished="2026-05-22"
                dateModified="2026-05-23"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Google AI Search 2026</span>
                    </div>

                    {/* Tag + meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>SEO</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>May 22, 2026 · 10 min read</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        Google&apos;s New AI Search Bar: What It Means for Your Website Traffic (2026)
                    </h1>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                        <img src="/images/justin-pirrie-headshot.png" alt="Justin Pirrie" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · May 22, 2026</p>
                        </div>
                    </div>

                    </div>
                </div>

                {/* Hero banner */}
                <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>
                    <div style={{ margin: "32px 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                        <img
                            src="/blog/google-ai-search-redesign-2026/hero-banner.png"
                            alt="Google AI Search Redesign 2026 — What It Means for Your Website Traffic"
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>
                </div>

                {/* YouTube embed */}
                <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 40px" }}>
                    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "16/9", position: "relative" }}>
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/x2WQWusAiAw"
                            title="Google Just Changed Search Forever — Here's What It Means For Your Website (2026)"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                        />
                    </div>
                </div>

                {/* Article body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* Direct answer */}
                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)", marginBottom: 32 }}>
                    <p style={{ margin: "0 0 20px" }}>
                        <strong style={{ color: "white" }}>Google just redesigned its search bar for the first time in over 25 years.</strong> Announced at Google I/O on 19 May 2026, the classic keyword box has been replaced with an AI-powered conversational field — powered by Gemini 3.5 Flash — that accepts natural language questions, file uploads, and long-running autonomous tasks.
                    </p>
                    <p style={{ margin: "0 0 20px" }}>
                        The timing is telling. Anthropic held 34.4% of paid AI business subscriptions in the US in April 2026; OpenAI held 32.3%. Google&apos;s share was just 4.5%. Google is staking its entire consumer and business future on this redesign. Gemini now has more than 900 million active users and Alphabet expects to spend $180–190 billion this year on AI infrastructure alone.
                    </p>
                    <p style={{ margin: "0 0 20px" }}>
                        If you run a website, publish content, or depend on organic search traffic — this matters. Not because the blue links are disappearing (they&apos;re not), but because <strong style={{ color: "white" }}>the way people interact with search is fundamentally changing</strong>, and the content that gets surfaced is increasingly the content that&apos;s structured for AI to read, not just humans.
                    </p>
                </div>

                {/* Inline CTA */}
                <div style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", marginBottom: 40, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" as const }}>
                    <div>
                        <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "white" }}>Free: Write AI-optimised meta descriptions</p>
                        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Generate 5 click-optimised variants with live Google SERP preview — no signup</p>
                    </div>
                    <Link href="/tools/meta-description-generator" style={{ flexShrink: 0, padding: "10px 20px", borderRadius: 10, background: "#22c55e", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" as const }}>
                        Try It Free →
                    </Link>
                </div>

                {/* Key Takeaways */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>Key Takeaways</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Google&apos;s new search bar accepts conversational questions, file uploads, and autonomous tasks — not just keywords.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ The 10 blue links are not disappearing — they still appear below AI Overviews and continue to drive traffic.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Pages cited inside AI Overviews gain a source link — being cited is the new page-one.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ FAQ schema, question-format H2s, and direct first-sentence answers are the fastest path to AI Overview citations.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Tool pages and calculators are well-positioned — they answer specific tasks that mini-apps can&apos;t easily replace.</li>
                    </ul>
                </div>

                {/* Audio player */}
                <div style={{ margin: "0 0 32px", padding: "20px 24px", borderRadius: 16, background: "rgba(99,102,241,0.05)", border: `1px solid ${accentBorder}` }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 10px" }}>🎙 Listen to this article</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 12px" }}>Why Google Wants You to Search Less — NotebookLM Audio Overview</p>
                    <audio controls style={{ width: "100%", borderRadius: 8, accentColor: accent }}>
                        <source src="/blog/google-ai-search-redesign-2026/audio-overview.m4a" type="audio/mp4" />
                    </audio>
                </div>

                <AdBlock type="horizontal" />

                {/* Body */}
                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <h2 style={h2Style}>What Google Changed at I/O 2026</h2>
                    <p style={pStyle}>
                        The classic Google search bar — a single white rectangle where you typed a few keywords — was the most-used interface on the internet for more than two decades. At Google I/O 2026, that changed. The new search bar is best understood as four distinct upgrades shipped together:
                    </p>

                    <div style={featureCard}>
                        <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: "white" }}>1. Conversational Prompts</p>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                            Instead of &quot;running shoes,&quot; you can now type or say &quot;What are the best running shoes for someone with wide feet who runs 5km three times a week and has a budget of £80?&quot; Queries are now longer, more specific, and treated as conversations rather than keyword lookups.
                        </p>
                    </div>

                    <div style={featureCard}>
                        <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: "white" }}>2. Multimodal Uploads</p>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                            You can now drag and drop images, video files, audio files, PDFs, or open browser tabs directly into the search bar. The AI analyses the content and answers questions about it — paste a screenshot of an error message, a photo of a product, or a document and ask anything about it.
                        </p>
                    </div>

                    <div style={featureCard}>
                        <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: "white" }}>3. Autonomous Agents</p>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                            You can now assign long-running tasks to Google&apos;s search AI. Set it to &quot;track sneaker drops in my size&quot; or &quot;monitor apartment listings under £1,200 in Manchester&quot; and it proactively surfaces results when conditions are met — without you searching again.
                        </p>
                    </div>

                    <div style={{ ...featureCard, marginBottom: 32 }}>
                        <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: "white" }}>4. Dynamic Mini-Apps</p>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                            In response to certain prompts, Google now builds custom interactive visualisations and micro-apps on the fly inside the search results. Ask for a 12-week marathon training plan and Google may generate an interactive tracker — directly in the SERP, without you visiting a third-party site.
                        </p>
                    </div>

                    {/* Infographic 1 */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: "100%", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 40, display: "block" }}
                        aria-label="AI Search Content Visibility Guide"
                    >
                        <source src="/blog/google-ai-search-redesign-2026/infographic-animated-1.mp4" type="video/mp4" />
                        <img src="/blog/google-ai-search-redesign-2026/ai-search-content-visibility.png" alt="AI Search Content Visibility Guide" style={{ width: "100%", borderRadius: 16 }} />
                    </video>

                    <h2 style={h2Style}>What Happened to the 10 Blue Links?</h2>
                    <p style={pStyle}>
                        They&apos;re still there. Google has been clear on this: traditional blue web links are not being removed. What&apos;s changing is their position in the page hierarchy.
                    </p>
                    <p style={pStyle}>
                        The new layout places an AI Overview — a synthesised answer pulling from multiple sources — at the top of many search results. Below the overview, you still find the familiar list of standard results. The difference is that the AI Overview is now the first thing most users see, and it often answers the question before a user clicks anything.
                    </p>
                    <div style={sectionCard}>
                        <p style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "white" }}>The two outcomes for your traffic:</p>
                        <p style={{ margin: "0 0 10px", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                            <strong style={{ color: "white" }}>Below the overview:</strong> Your result still exists and still drives clicks — but for informational queries, fewer users scroll past the AI answer. Click-through rates on informational content have declined.
                        </p>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                            <strong style={{ color: "white" }}>Cited inside the overview:</strong> If Google&apos;s AI uses your page as a source, you get a visible citation link at the top of the SERP. This is the new page one — and it drives a qualitatively different, higher-intent visitor than a standard organic click.
                        </p>
                    </div>
                    <p style={pStyle}>
                        The strategic goal has shifted: don&apos;t just rank in the top 10, <strong style={{ color: "white" }}>be the source the AI cites.</strong>
                    </p>

                    {/* Infographic 2 */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: "100%", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 40, display: "block" }}
                        aria-label="AI Evolution to Autonomous Agents"
                    >
                        <source src="/blog/google-ai-search-redesign-2026/infographic-animated-2.mp4" type="video/mp4" />
                        <img src="/blog/google-ai-search-redesign-2026/ai-evolution-autonomous-agents.png" alt="AI Evolution to Autonomous Agents" style={{ width: "100%", borderRadius: 16 }} />
                    </video>

                    <h2 style={h2Style}>How to Optimise Your Content for Conversational Search</h2>
                    <p style={pStyle}>
                        Conversational queries are longer, more specific, and structured as questions. The content that gets cited in AI Overviews shares four characteristics — and all four are things you can implement today:
                    </p>

                    <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "white" }}>1. Write FAQs in Natural Speech Patterns</p>
                    <p style={pStyle}>
                        &quot;What is the best free JSON formatter?&quot; outperforms &quot;JSON formatter features&quot; as a FAQ heading because it matches exactly how someone would ask Google&apos;s new conversational bar. Audit your FAQ sections and convert any keyword-style headings into full, natural questions with the same phrasing your audience would actually use.
                    </p>

                    <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "white" }}>2. Lead Every Answer with the Direct Answer</p>
                    <p style={pStyle}>
                        AI systems — including Google&apos;s — most frequently extract the first sentence of an answer. That first sentence needs to be a complete, standalone response to the question. Don&apos;t warm up, don&apos;t hedge, don&apos;t give context before the answer. State the answer first, then explain.
                    </p>

                    <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "white" }}>3. Use Question-Format H2 Headings</p>
                    <p style={pStyle}>
                        &quot;How does Base64 encoding work?&quot; is better than &quot;Base64 Encoding Explained.&quot; Question H2s signal to Google exactly what query the section answers, making it far easier to extract and cite in AI Overviews.
                    </p>

                    <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "white" }}>4. Add FAQPage and HowTo Structured Data</p>
                    <p style={pStyle}>
                        FAQPage schema explicitly marks your Q&A pairs as machine-readable, making it trivial for Google&apos;s AI to extract them verbatim. HowTo schema does the same for step-by-step instructions. These are the two schema types most reliably cited inside AI Overviews.
                    </p>

                    {/* Write for AI infographic */}
                    <img
                        src="/blog/google-ai-search-redesign-2026/write-for-ai-not-google.png"
                        alt="Write for AI, not Google — the new SEO paradigm"
                        style={{ width: "100%", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 40, display: "block" }}
                    />

                    <AdBlock type="horizontal" />

                    <h2 style={h2Style}>Which Content Types Win — and Which Are at Risk</h2>
                    <p style={pStyle}>
                        Not all content is equally affected by the conversational shift. Here&apos;s a clear breakdown:
                    </p>

                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 0, marginBottom: 32, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "rgba(255,255,255,0.04)" }}>
                            <div style={{ padding: "10px 16px", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Content Type</div>
                            <div style={{ padding: "10px 16px", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Outlook</div>
                            <div style={{ padding: "10px 16px", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Why</div>
                        </div>
                        {[
                            ["Tool pages & calculators", "Strong", "Answer specific tasks — hard to replace with a mini-app for niche use cases"],
                            ["FAQ-rich how-to guides", "Strong", "Directly matches AI Overview extraction format"],
                            ["Comparison pages", "Strong", "Conversational queries often ask 'X vs Y' — comparisons get cited"],
                            ["Generic informational content", "At risk", "AI Overviews answer these directly, reducing click incentive"],
                            ["Thin affiliate pages", "At risk", "Low substance = low citation probability = zero AI traffic"],
                            ["News and timely content", "Neutral", "AI Overviews favour established sources; real-time queries still drive clicks"],
                        ].map(([type, outlook, why], i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <div style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{type}</div>
                                <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: outlook === "Strong" ? "#4ade80" : outlook === "At risk" ? "#f87171" : "rgba(255,255,255,0.5)" }}>{outlook}</div>
                                <div style={{ padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{why}</div>
                            </div>
                        ))}
                    </div>

                    {/* Infographic 3 */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: "100%", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 40, display: "block" }}
                        aria-label="Autonomous Search Agent Evolution"
                    >
                        <source src="/blog/google-ai-search-redesign-2026/infographic-animated-3.mp4" type="video/mp4" />
                        <img src="/blog/google-ai-search-redesign-2026/autonomous-search-agent-evolution.png" alt="Autonomous Search Agent Evolution" style={{ width: "100%", borderRadius: 16 }} />
                    </video>

                    <h2 style={h2Style}>What About the Dynamic Mini-Apps — Are Tool Sites at Risk?</h2>
                    <p style={pStyle}>
                        This is the question most tool site owners are asking. Google&apos;s ability to generate a fitness tracker inside the SERP sounds threatening — but the reality is more nuanced.
                    </p>
                    <p style={pStyle}>
                        Google&apos;s mini-apps are generated on the fly from a prompt. They&apos;re generic by design. A <Link href="/tools/card-grading-profit-calculator" style={{ color: accent, fontWeight: 600, textDecoration: "none" }}>card grading profit calculator</Link> that accounts for PSA, BGS, and SGC fee tiers, eBay sell-through rates, and your specific purchase price is not something Google will spin up dynamically — it requires specific logic, real-time data awareness, and a domain-specific interface built for that use case.
                    </p>
                    <p style={pStyle}>
                        The tools at risk are genuinely generic ones: basic unit converters, simple timers, bare-bones word counters. Anything with real depth, niche specificity, or domain logic is not easily replaced by a Google mini-app.
                    </p>
                    <div style={sectionCard}>
                        <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "white" }}>The deeper protection: brand trust</p>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                            When someone uses a <Link href="/tools/password-generator" style={{ color: accent, fontWeight: 600, textDecoration: "none" }}>password generator</Link> or <Link href="/tools/jwt-decoder" style={{ color: accent, fontWeight: 600, textDecoration: "none" }}>JWT decoder</Link>, they care that the tool is private, reliable, and doesn&apos;t log their data. A Google-generated mini-app in the search results doesn&apos;t carry that trust. For security-adjacent tools especially, a dedicated tool site has an inherent advantage a SERP mini-app can&apos;t match.
                        </p>
                    </div>

                    <h2 style={h2Style}>The Autonomous Agents Feature: What It Means for Intent</h2>
                    <p style={pStyle}>
                        Google is shipping two distinct agent layers. The first is built into the search bar itself — you can assign it tasks like &quot;monitor apartment listings under £1,200 in Manchester.&quot; The second is <strong style={{ color: "white" }}>Spark</strong>, a new background mode within Gemini that monitors your email, Google Docs, Slides and connected third-party apps, compiling summaries and to-do lists without you prompting it.
                    </p>
                    <p style={pStyle}>
                        Google itself acknowledges the technology &quot;isn&apos;t yet good enough to fully trust.&quot; These features are a directional bet, not a finished product — which means the next 12–18 months will determine how much search behaviour actually changes.
                    </p>
                    <p style={pStyle}>
                        For content publishers, the practical implication is clear: structured data and machine-readable content becomes critical. Agents can only act on data they can reliably parse. If your listings, tools, or content aren&apos;t marked up for machines, autonomous agents won&apos;t surface them.
                    </p>

                    {/* Infographic 4 */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: "100%", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 40, display: "block" }}
                        aria-label="The Pivot and The Playbook — Surviving Google's Autonomous Era"
                    >
                        <source src="/blog/google-ai-search-redesign-2026/infographic-animated-4.mp4" type="video/mp4" />
                    </video>

                    <h2 style={h2Style}>Your 5-Step Action Plan for AI-First Search</h2>

                    {[
                        ["Audit your FAQ question phrasing", "Go through your top 10 pages and rewrite any FAQ headings that read like keywords. Convert them to the natural question a human would speak into Google's new search bar. This is the highest-leverage change you can make today."],
                        ["Lead every answer with the direct answer", "Check that the first sentence of every FAQ and every section opening is a standalone answer to the implied question. AI systems extract first sentences most reliably — don't bury your answer in context."],
                        ["Add or verify FAQPage schema", "If your pages have FAQ sections, make sure they're marked up with FAQPage structured data. This is how Google's AI explicitly knows which parts of your page to extract and cite in Overviews."],
                        ["Create comparison content", "Conversational queries frequently take the form of 'What is the best X for Y?' or 'X vs Y — which is better?' These formats are heavily cited in AI Overviews. Build at least 2–3 comparison pages in your niche."],
                        ["Build markdown mirrors for AI crawlers", "Serve a plain-text /index.md version of your key pages. AI agents including Perplexity, Claude, and ChatGPT with web access prefer plain text for extraction. Add these to your llms.txt so AI systems know they exist."],
                    ].map(([title, body], i) => (
                        <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
                            <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: accent }}>
                                {i + 1}
                            </div>
                            <div>
                                <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "white", lineHeight: 1.3 }}>{title}</p>
                                <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{body}</p>
                            </div>
                        </div>
                    ))}

                    {/* Conclusion CTA */}
                    <div style={{ marginTop: 56, padding: "32px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg }}>
                        <p style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, color: "white" }}>Ready to optimise for AI-first search?</p>
                        <p style={{ margin: "0 0 20px", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                            Every tool below is free, no signup required, and built to help you implement exactly what this guide covers.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, marginBottom: 24 }}>
                            <Link href="/tools/meta-description-generator" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600 }}>
                                → Meta Description Generator — write AI-optimised descriptions that match conversational intent
                            </Link>
                            <Link href="/tools/ai-prompt-generator" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600 }}>
                                → AI Prompt Generator — generate better prompts for all AI content tools
                            </Link>
                            <Link href="/tools/word-counter" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600 }}>
                                → Word Counter with Readability Score — keep your answers concise and scannable
                            </Link>
                        </div>
                        <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" as const, gap: 10 }}>
                            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" as const, letterSpacing: "0.08em", fontWeight: 700 }}>Also recommended</p>
                            <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                                If you&apos;re building an email list while adapting to AI search —{" "}
                                <a href="https://bit.ly/aweberjustin" target="_blank" rel="noopener noreferrer sponsored" style={{ color: accent, textDecoration: "underline" }}>AWeber</a>{" "}
                                is the email platform I use and recommend. Your email list is the one traffic channel Google&apos;s AI cannot take from you.
                            </p>
                            <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                                For AI-first content strategy and GEO (Generative Engine Optimisation) services, visit{" "}
                                <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: accent, textDecoration: "underline" }}>AdvertsGPT</a>.
                            </p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <h2 style={{ ...h2Style, marginTop: 60 }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
                        {FAQS.map((faq, i) => (
                            <div key={i} style={{ padding: "24px 0", borderBottom: i < FAQS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                                <p style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: "white", lineHeight: 1.4 }}>{faq.question}</p>
                                <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>

                    {/* Related Reading */}
                    <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 16px" }}>Related Reading</p>
                        <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                            <Link href="/blog/cover-letter-generator-guide" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>
                                → How to Write Content That Gets Cited by AI Search Engines
                            </Link>
                            <Link href="/blog/how-to-tailor-cover-letter-to-job-description" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>
                                → Tailoring for AI-First Search — Adapting Your Content Strategy
                            </Link>
                            <Link href="/blog/utm-builder-guide" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>
                                → UTM Builder Guide — Track Your Content Performance After Google's AI Redesign
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Back to Blog */}
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
