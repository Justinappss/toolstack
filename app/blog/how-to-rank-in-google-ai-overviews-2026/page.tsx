"use client";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

const FAQS = [
    {
        question: "What is GEO (Generative Engine Optimisation)?",
        answer: "GEO stands for Generative Engine Optimisation — the practice of structuring your content so it gets cited inside AI-generated answers from Google AI Overviews, ChatGPT, Perplexity, and other AI search engines. Unlike traditional SEO, which focuses on ranking position, GEO focuses on being the source an AI extracts its answer from. The two disciplines are complementary — sites that rank well AND structure their content for AI citation perform best in 2026.",
    },
    {
        question: "How is GEO different from traditional SEO?",
        answer: "Traditional SEO optimises for ranking position — the goal is to appear at number one in the blue link results. GEO optimises for citation — the goal is to be the page Google's AI pulls its answer from, which appears above the blue links entirely. The techniques differ too: SEO focuses on backlinks, domain authority, and keyword density. GEO focuses on answer clarity, direct phrasing, question-based headings, FAQ schema, and topical depth. In 2026, you need both.",
    },
    {
        question: "What types of content get cited in Google AI Overviews?",
        answer: "Pages most frequently cited in AI Overviews share four characteristics: the answer appears in the first paragraph (not buried in an introduction), headers are phrased as real questions, the page includes an FAQ section with FAQPage schema markup, and the content contains specific facts and named entities rather than vague claims. Tool pages, how-to guides, and FAQ-heavy content are cited more often than long-form opinion pieces or keyword-stuffed paragraphs.",
    },
    {
        question: "Does FAQ schema actually help with AI Overviews?",
        answer: "Yes — FAQPage JSON-LD schema is one of the clearest signals you can send to Google's AI about the structure of your content. It explicitly labels which sections are questions and which are answers, making it significantly easier for the AI crawler to extract and cite specific Q&A pairs. Pages with FAQPage schema are cited in AI Overviews at a higher rate than structurally identical pages without it. Adding schema to existing FAQ sections is one of the highest-ROI changes you can make today.",
    },
    {
        question: "How quickly can I see results from GEO optimisation?",
        answer: "Changes to existing high-ranking pages — adding direct answer paragraphs, rewriting H2s as questions, adding FAQ sections with schema — can produce measurable changes in AI Overview citations within 2 to 6 weeks. The speed depends on how frequently Google recrawls the page and how competitive the query is. New content written from scratch using GEO principles will typically begin being cited within 4 to 8 weeks of indexing.",
    },
    {
        question: "Do I need to rewrite all my content for GEO?",
        answer: "No — start with your three to five best-performing pages. The highest-leverage changes are: adding a direct answer in the first paragraph, rewriting two or three H2s as questions, adding a five to eight question FAQ section sourced from Google's People Also Ask results, and adding FAQPage schema to those answers. These changes to a single existing page take roughly 45 minutes and can produce AI Overview citations without writing any new content.",
    },
    {
        question: "What is the difference between AI Overviews and Google AI Mode?",
        answer: "AI Overviews are the AI-generated summary boxes that appear at the top of standard Google search results for informational queries — present on over 40% of searches as of 2026. Google AI Mode — launched in May 2026 — is a fully conversational search experience where every result is AI-generated. AI Mode handles multi-step queries and longer research tasks. Both cite external sources, meaning both are surfaces where GEO optimisation can earn your website visibility.",
    },
    {
        question: "How do I check if my page has been cited in an AI Overview?",
        answer: "Search for the primary query your page targets on Google and look for the AI Overview box at the top of results. If your page is cited, you will see a small source chip with your site's favicon and URL underneath the AI answer. You can also use Google Search Console — filter by query and check for impressions coming from AI Overview placements, which Google has started reporting separately. Third-party tools like SE Ranking and Semrush have also added AI Overview tracking in 2026.",
    },
];

const accent = "#10b981";
const accentBg = "rgba(16,185,129,0.06)";
const accentBorder = "rgba(16,185,129,0.18)";

const h2Style: React.CSSProperties = {
    fontSize: 24, fontWeight: 800, color: "white",
    letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2,
};
const pStyle: React.CSSProperties = { margin: "0 0 20px" };

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="How to Rank in Google AI Overviews: The Complete GEO Guide (2026)"
                description="Google AI Overviews now appear on 40%+ of searches. Here's the exact 5-step GEO framework to get your website cited inside Google's AI answers — not just ranked below them."
                url="https://toolstack.tech/blog/how-to-rank-in-google-ai-overviews-2026"
                datePublished="2026-05-24"
                dateModified="2026-05-24"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Google AI Overviews 2026</span>
                    </div>

                    {/* Tag + meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>SEO</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>May 24, 2026 · 9 min read</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        How to Rank in Google AI Overviews: The Complete GEO Guide (2026)
                    </h1>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                        <img src="/images/justin-pirrie-headshot.png" alt="Justin Pirrie" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · May 24, 2026</p>
                        </div>
                    </div>
                </div>

                {/* Hero banner */}
                <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>
                    <div style={{ margin: "32px 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                        <img
                            src="/blog/how-to-rank-in-google-ai-overviews-2026/hero-banner.png"
                            alt="How to Rank in Google AI Overviews 2026 — The Complete GEO Framework"
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* Direct answer */}
                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)", marginBottom: 32 }}>
                    <p style={{ margin: "0 0 20px" }}>
                        <strong style={{ color: "white" }}>Google AI Overviews now appear on over 40% of all searches — and the sites being cited inside them are not necessarily the ones ranked number one.</strong> The game has changed: traditional SEO gets you into the blue links. GEO (Generative Engine Optimisation) gets you inside the AI answer itself, which sits above everything else on the page.
                    </p>
                    <p style={{ margin: "0 0 20px" }}>
                        If your traffic has dropped in 2026 despite holding your rankings, this is likely why. Google&apos;s AI is answering questions your content used to answer — and citing other sources while doing it. The fix is not to rank higher. It is to structure your content so the AI can extract and credit your answer directly.
                    </p>
                    <p style={{ margin: "0 0 20px" }}>
                        This guide gives you the complete five-step framework — the same approach used by the sites currently dominating AI Overview citations — with specific changes you can make to existing pages today.
                    </p>
                </div>

                {/* Inline CTA */}
                <div style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", marginBottom: 40, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" as const }}>
                    <div>
                        <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "white" }}>Free: Write AI-optimised meta descriptions instantly</p>
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
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Google AI Overviews appear on 40%+ of searches — being cited inside one is the new page one.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ GEO and SEO are complementary — ranking well AND being structured for AI citation wins.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ The five-step framework: answer first, question H2s, FAQ sections, topical clusters, schema markup.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Four quick wins on your existing top pages can produce AI Overview citations within 2–6 weeks.</li>
                    </ul>
                </div>

                {/* Audio player */}
                <div style={{ margin: "0 0 32px", padding: "20px 24px", borderRadius: 16, background: "rgba(16,185,129,0.05)", border: `1px solid ${accentBorder}` }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 10px" }}>🎙 Listen to this article</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 12px" }}>Surviving Google&apos;s AI Search — NotebookLM Audio Overview</p>
                    <audio controls style={{ width: "100%", borderRadius: 8, accentColor: accent }}>
                        <source src="/blog/how-to-rank-in-google-ai-overviews-2026/audio-overview.m4a" type="audio/mp4" />
                    </audio>
                </div>

                <AdBlock type="horizontal" />

                {/* Body content */}
                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <h2 style={h2Style}>What Is GEO and Why Does It Matter in 2026?</h2>
                    <p style={pStyle}>
                        GEO — Generative Engine Optimisation — is the discipline of structuring your content to be cited inside AI-generated answers. Every time Google&apos;s AI answers a question, it pulls from existing web pages and credits sources with a small attribution chip. Those citations drive traffic the same way a blue link does, but they sit above the standard results and carry significantly more user attention.
                    </p>
                    <p style={pStyle}>
                        The distinction from traditional SEO matters because the selection criteria are different. SEO ranking is determined primarily by backlinks, domain authority, page speed, and keyword relevance. AI citation is determined primarily by answer clarity, content structure, topical depth, and schema markup. A page with modest domain authority can be cited in an AI Overview if it answers a question more directly and cleanly than a high-authority competitor. That is a fundamental shift in how content competition works.
                    </p>

                    {/* Animated infographic 1 */}
                    <div style={{ margin: "32px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <video autoPlay muted loop playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/how-to-rank-in-google-ai-overviews-2026/infographic-animated-1.mp4" type="video/mp4" />
                        </video>
                    </div>

                    <h2 style={h2Style}>How Google AI Overviews Actually Selects Its Sources</h2>
                    <p style={pStyle}>
                        Google&apos;s AI does not simply cite the page ranked first. It reads multiple pages for a given query and extracts whichever answer is most direct, most clearly structured, and most verifiable. Pages that are regularly selected share four consistent characteristics:
                    </p>

                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, margin: "24px 0 32px" }}>
                        {[
                            { num: "01", title: "The answer is in the first paragraph", desc: "Pages that state the answer immediately — before any context or background — are extracted far more frequently than pages that build to the answer over several paragraphs." },
                            { num: "02", title: "Headers are phrased as questions", desc: "H2s like 'What makes a good meta description?' signal to the AI exactly what each section answers. Decorative labels like 'Meta Description Tips' provide no such signal." },
                            { num: "03", title: "The page contains specific, verifiable facts", desc: "Named entities, numbers, and cited sources make content more extractable. Vague, unsubstantiated claims are passed over consistently." },
                            { num: "04", title: "FAQPage schema is present", desc: "Structured data explicitly labels Q&A pairs for the crawler, reducing the AI's interpretive workload and increasing the likelihood of direct citation." },
                        ].map((item) => (
                            <div key={item.num} style={{ display: "flex", gap: 20, padding: "20px 24px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.025)" }}>
                                <span style={{ fontSize: 12, fontWeight: 800, color: accent, flexShrink: 0, marginTop: 2, letterSpacing: "0.05em" }}>{item.num}</span>
                                <div>
                                    <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{item.title}</p>
                                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 style={h2Style}>The 5-Step GEO Framework</h2>
                    <p style={pStyle}>
                        These five changes — applied to existing pages — account for the majority of AI Overview citation gains reported by content teams in 2026. Apply them in order, starting with your highest-traffic pages.
                    </p>

                    {/* Animated infographic 2 */}
                    <div style={{ margin: "32px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <video autoPlay muted loop playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/how-to-rank-in-google-ai-overviews-2026/infographic-animated-2.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {[
                        {
                            step: "Step 1",
                            title: "Lead With the Answer",
                            body: "The first paragraph after your H1 must directly state the answer to whatever question your page targets. Write it like a dictionary definition — complete, standalone, and accurate in one or two sentences. Everything below provides context, examples, and depth. This single change is responsible for more AI Overview citations than any other adjustment you can make to existing content.",
                        },
                        {
                            step: "Step 2",
                            title: "Rewrite H2s as Real Questions",
                            body: "Go through your existing H2 headings and convert them to the actual questions your audience types into Google. Use the People Also Ask box to find the exact phrasing. 'Email Subject Line Tips' becomes 'What makes a good email subject line?' This mirrors how users search and how Google's AI categorises your content sections — directly improving citation eligibility.",
                        },
                        {
                            step: "Step 3",
                            title: "Add a Proper FAQ Section",
                            body: "Write six to eight questions directly from the People Also Ask results for your target query. Answer each in a single paragraph of under 80 words — direct, factual, complete. Then add FAQPage JSON-LD schema to those questions. The combination of a well-written FAQ and proper schema is the highest-conversion GEO change you can make to an existing page.",
                        },
                        {
                            step: "Step 4",
                            title: "Build Topical Clusters",
                            body: "A single page does not establish topical authority. Google's AI gives significantly more weight to sites that cover a subject across multiple interconnected pages. Structure your content as a cluster: one main guide, three to five supporting posts, and internal links between them. Each supporting post answers a narrower question within the same topic. This signals depth and expertise, not just a single relevant page.",
                        },
                        {
                            step: "Step 5",
                            title: "Add Structured Data Markup",
                            body: "ArticleSchema, FAQPage schema, and BreadcrumbList are the three most important for GEO. They tell Google's AI exactly what type of content it is reading and where the Q&A sections are. Pages without schema require the AI to interpret structure from context alone — more uncertainty means fewer citations. Adding schema to an existing page takes under an hour and the impact compounds.",
                        },
                    ].map((item) => (
                        <div key={item.step} style={{ marginBottom: 16, padding: "24px 28px", borderRadius: 16, border: `1px solid ${accentBorder}`, background: accentBg }}>
                            <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 6px" }}>{item.step}</p>
                            <p style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 12px" }}>{item.title}</p>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.7 }}>{item.body}</p>
                        </div>
                    ))}

                    <h2 style={h2Style}>Traditional SEO vs GEO: What Actually Changed</h2>
                    <p style={pStyle}>
                        The two disciplines are not in conflict. The best-performing content in 2026 optimises for both. But understanding where they diverge is essential to prioritising your time and effort correctly.
                    </p>

                    <div style={{ margin: "32px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <img
                            src="/blog/how-to-rank-in-google-ai-overviews-2026/seo-vs-geo.png"
                            alt="Traditional SEO vs GEO 2026 — What Changed"
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>

                    <div style={{ overflowX: "auto", marginBottom: 40 }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                                    <th style={{ padding: "12px 16px", textAlign: "left", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Factor</th>
                                    <th style={{ padding: "12px 16px", textAlign: "left", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Traditional SEO</th>
                                    <th style={{ padding: "12px 16px", textAlign: "left", color: accent, fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>GEO (2026)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Goal", "Rank #1 in blue links", "Get cited inside the AI answer"],
                                    ["Content style", "Keyword density", "Direct Q&A format"],
                                    ["Headers", "Topic labels", "Real questions (H2s = 'How do I…?')"],
                                    ["Page structure", "Long introductions", "Answer first, context second"],
                                    ["Schema", "Optional extra", "Required baseline"],
                                    ["Metric to track", "Click-through rate", "AI citation rate + brand mentions"],
                                ].map(([factor, seo, geo], i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                                        <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{factor}</td>
                                        <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.45)" }}>{seo}</td>
                                        <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{geo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={h2Style}>Quick Wins You Can Do Today</h2>
                    <p style={pStyle}>
                        You do not need to rewrite your entire site. Pick your three best-performing pages and make these four changes. Each takes under 15 minutes and together they take less than an hour per page.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, margin: "24px 0 32px" }}>
                        {[
                            "Add a direct answer in the first paragraph — one or two complete sentences that fully answer the page's target query before any other context.",
                            "Rewrite two or three H2s as questions using exact phrasing from the People Also Ask box for your target query.",
                            "Add five FAQ entries below your main content — pull questions directly from People Also Ask and keep each answer under 80 words.",
                            "Add FAQPage JSON-LD schema to those FAQ entries. Free schema generators will produce the exact code — paste it into your page head.",
                        ].map((win, i) => (
                            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                <span style={{ width: 28, height: 28, borderRadius: "50%", background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: accent, flexShrink: 0 }}>{i + 1}</span>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.65 }}>{win}</p>
                            </div>
                        ))}
                    </div>

                    <p style={pStyle}>
                        These four changes to a single page take roughly 45 minutes total. Do this for your top three pages and you will have covered the majority of your GEO exposure before writing a single new word. Use ToolStack&apos;s free <Link href="/tools/meta-description-generator" style={{ color: accent, textDecoration: "none" }}>meta description generator</Link> to sharpen your descriptions at the same time — AI Overviews use meta descriptions as context when evaluating and summarising pages.
                    </p>

                    {/* YouTube embed */}
                    <h2 style={h2Style}>Watch: The Full GEO Framework Walkthrough</h2>
                    <p style={pStyle}>
                        This video walks through the complete five-step framework with live examples — including exactly what to change on an existing page to start earning AI Overview citations today.
                    </p>

                    <div style={{ margin: "32px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "16/9", position: "relative" as const }}>
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/nymPvtY5vU8"
                            title="How to Rank in Google AI Overviews 2026 — Complete GEO Framework"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: "absolute" as const, top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                        />
                    </div>

                    <h2 style={h2Style}>The Bigger Picture: Both Matter Now</h2>
                    <p style={pStyle}>
                        Traditional SEO is not dead. The blue links are still there and they still drive significant traffic. What has changed is that the top of the page — the most visible real estate in search — is increasingly owned by AI answers. The sites winning in 2026 do both: they rank well in organic results AND they structure their content to be cited inside the AI answers that sit above those results.
                    </p>
                    <p style={pStyle}>
                        Think of GEO as the next layer of SEO, not a replacement. Every improvement you make for AI citation — clearer answers, better structure, FAQ schema, topical depth — also improves your traditional rankings. The downside of ignoring GEO is not just missed AI Overview citations: it is watching a competitor get cited in the answer box while your page sits immediately below it, invisible to the majority of users who read the summary and stop scrolling.
                    </p>
                    <p style={pStyle}>
                        Start with your best three pages. Apply the five-step framework. Measure AI Overview appearances for your key queries. Then build the habit into every piece of new content from this point forward. The compounding effect of consistent GEO practice over six to twelve months is far larger than any single page optimisation.
                    </p>

                    {/* GEO checklist */}
                    <div style={{ margin: "32px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <img
                            src="/blog/how-to-rank-in-google-ai-overviews-2026/geo-checklist.png"
                            alt="GEO Checklist — 5 Steps to Get Cited in Google AI Overviews"
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>

                </div>

                {/* Conclusion CTA */}
                <div style={{ padding: "32px", borderRadius: 20, background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.03) 100%)", border: `1px solid ${accentBorder}`, marginBottom: 56 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 10px" }}>Take the Next Step</p>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: "0 0 12px", lineHeight: 1.2 }}>Start optimising for AI Overviews today</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.7 }}>
                        Use ToolStack&apos;s free <Link href="/tools/meta-description-generator" style={{ color: accent, textDecoration: "none", fontWeight: 600 }}>meta description generator</Link> to write AI-optimised descriptions for your top pages. No signup, no paywall — results in seconds. Or if you want the whole GEO strategy handled for you, AdvertsGPT builds and executes it end to end.
                    </p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
                        <Link href="/tools/meta-description-generator" style={{ padding: "12px 24px", borderRadius: 12, background: accent, color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                            Try Meta Description Generator Free →
                        </Link>
                        <a href="https://advertisegpt.vercel.app" target="_blank" rel="noopener noreferrer" style={{ padding: "12px 24px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                            Get GEO Done For You — AdvertsGPT →
                        </a>
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "20px 0 0" }}>
                        Want to grow your audience while your SEO adapts?{" "}
                        <a href="https://bit.ly/aweberjustin" target="_blank" rel="noopener noreferrer" style={{ color: accent, textDecoration: "none" }}>
                            AWeber makes email marketing free up to 500 subscribers →
                        </a>
                    </p>
                </div>

                {/* FAQ */}
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 24, letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, marginBottom: 56 }}>
                    {FAQS.map((faq, i) => (
                        <div key={i} style={{ padding: "20px 24px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 8px" }}>{faq.question}</p>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.7 }}>{faq.answer}</p>
                        </div>
                    ))}
                </div>

                {/* Back to blog */}
                <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: 14 }}>
                    ← Back to Blog
                </Link>
            </div>
        </main>
    );
}
