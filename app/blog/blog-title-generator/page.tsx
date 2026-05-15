import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "SEO Blog Title Generator: Write Titles That Rank and Get Clicked (2026)",
    description: "Most blog titles fail before anyone reads the post. This free SEO blog title generator writes 10 optimised titles in 10 seconds — no login, no limits, no paywall.",
    alternates: { canonical: "https://toolstack.tech/blog/blog-title-generator" },
    openGraph: {
        title: "SEO Blog Title Generator: Write Titles That Rank and Get Clicked (2026)",
        description: "Most blog titles fail before anyone reads the post. This free SEO blog title generator writes 10 optimised titles in 10 seconds — no login, no limits.",
        url: "https://toolstack.tech/blog/blog-title-generator",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-15",
        modifiedTime: "2026-05-15",
        images: [{ url: "https://toolstack.tech/blog/blog-title-generator/infographic.png", width: 2752, height: 1536 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "SEO Blog Title Generator: Write Titles That Rank and Get Clicked (2026)",
        description: "Most blog titles fail before anyone reads the post. Free tool, 10 titles, no login.",
        images: ["https://toolstack.tech/blog/blog-title-generator/infographic.png"],
    },
};

const FAQS = [
    {
        question: "What is an SEO blog title generator?",
        answer: "An SEO blog title generator is a tool that writes blog post titles optimised for both search engine rankings and human click-through rates. It combines keyword placement, title structure, character count limits, and copywriting psychology to produce titles that rank in Google and get clicked in search results."
    },
    {
        question: "How many titles does ToolStack generate per query?",
        answer: "Ten. Across ten different title types: SEO, listicle, how-to, curiosity, story, question, stat-led, contrarian, specific result, and comparison. Each comes with the copywriting principle behind it so you understand why it works — not just what it says."
    },
    {
        question: "How is this different from HubSpot's blog title generator?",
        answer: "HubSpot's tool requires you to create an account and generates one title at a time with limited SEO focus. ToolStack generates 10 titles across 10 types, requires no account, enforces character count limits, and explains the psychology behind each output — all free with no usage limits."
    },
    {
        question: "What's the ideal blog title length for SEO?",
        answer: "Under 70 characters for full visibility in Google desktop search results. Under 60 is safest for mobile. Google truncates anything above 70 characters — your keyword and hook disappear. ToolStack's generator checks character count on every output automatically."
    },
    {
        question: "Does my blog title affect SEO rankings?",
        answer: "Yes — significantly. Your title tag is one of the top three on-page SEO factors. Google uses it to understand what your page is about. Placing your target keyword in the first three words of the title sends a stronger ranking signal than burying it at the end. Your title also controls click-through rate, which is itself a ranking signal."
    },
    {
        question: "What are the title types ToolStack generates?",
        answer: "SEO (keyword-led, built to rank), Listicle (numbered list format), How-To (high search intent), Curiosity (information gap hook), Story (narrative angle), Question (mirrors search queries), Stat-Led (credibility anchor), Contrarian (challenges assumptions), Specific Result (concrete outcome), and Comparison (decision-stage readers)."
    },
    {
        question: "Is this blog title generator really free?",
        answer: "Yes. No login, no credit card, no trial period, no usage limits. ToolStack has 60+ free browser-based tools — none require payment or signup of any kind. The blog title generator is one of them."
    },
];

const accent = "#34d399";
const accentBg = "rgba(52,211,153,0.06)";
const accentBorder = "rgba(52,211,153,0.18)";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="SEO Blog Title Generator: Write Titles That Rank and Get Clicked (2026)"
                description="Most blog titles fail before anyone reads the post. This free SEO blog title generator writes 10 optimised titles in 10 seconds — no login, no limits, no paywall."
                url="https://toolstack.tech/blog/blog-title-generator"
                datePublished="2026-05-15"
                dateModified="2026-05-15"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>SEO Blog Title Generator</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Content Tools</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>May 15, 2026 · 8 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        SEO Blog Title Generator: Write Titles That Rank and Get Clicked (2026)
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · May 15, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* TL;DR */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ 8 out of 10 people read headlines. 2 out of 10 read anything else. Your title does most of the work.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Blog titles fail for two reasons: keyword-stuffed or all-emotion with no search signal.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Google cuts off titles above 70 characters — specificity and keyword placement both matter.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ <Link href="/tools/blog-title-generator" style={{ color: "#818cf8" }}>ToolStack&apos;s free SEO blog title generator</Link> produces 10 title types instantly — no login needed.</li>
                    </ul>
                </div>

                {/* Video */}
                <div style={{ marginBottom: 48, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
                        <iframe
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                            src="https://www.youtube.com/embed/Q-ANgok15rk"
                            title="Blog Title Generator — Free Tool That Writes 10 SEO Titles Instantly"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.02)" }}>
                        <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Watch: Mastering Blog Titles — the psychology, the formulas, and the free tool</p>
                    </div>
                </div>

                {/* Infographic */}
                <div style={{ marginBottom: 48 }}>
                    <Image
                        src="/blog/blog-title-generator/infographic.png"
                        alt="The Anatomy of an SEO-Optimised Blog Title — infographic showing the universal formula (Number + Keyword + Specific Outcome + Time modifier), the 5 title formulas that work, the 60-character safe zone rule, and headline stats including 8/10 people read headlines and +36% clicks with numbers"
                        width={2752}
                        height={1536}
                        style={{ width: "100%", height: "auto", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)" }}
                        priority
                    />
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <p style={{ margin: "0 0 22px" }}>
                        Eight out of ten people read a headline. Two out of ten read anything else. That ratio is why your blog title isn&apos;t just a label — it&apos;s a ranking signal, a click trigger, and a promise to the reader all at once. Write it wrong and none of the content below it matters.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Why Most Blog Titles Fail at SEO</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Most blog titles fail for one of two reasons — and they sit at opposite extremes.
                    </p>

                    {[
                        {
                            num: "01",
                            title: "Keyword-stuffed — reads like a robot",
                            body: 'Titles like "Blog Title Generator Free AI SEO Tool Online 2026" technically contain the keyword. Google understands them. Humans skip them. They signal low quality before anyone clicks, and high bounce rates send that signal back to Google.'
                        },
                        {
                            num: "02",
                            title: "All emotion, no search signal",
                            body: 'Titles like "The Secret Nobody Tells You About Writing" get curiosity clicks from social media. They rank for nothing because they match no search query. Great for newsletters, useless for organic traffic.'
                        },
                    ].map(({ num, title, body }) => (
                        <div key={num} style={{ display: "flex", gap: 20, margin: "0 0 20px", padding: "24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: accent, fontFamily: "monospace", flexShrink: 0, paddingTop: 2 }}>{num}</div>
                            <div>
                                <h3 style={{ fontSize: 17, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{title}</h3>
                                <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{body}</p>
                            </div>
                        </div>
                    ))}

                    <p style={{ margin: "22px 0 22px" }}>
                        A good <Link href="/tools/blog-title-generator" style={{ color: "#818cf8" }}>SEO blog title generator</Link> fixes both. It combines keyword placement with copywriting psychology so the title ranks and reads like a human wrote it.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The 70-Character Rule Google Enforces</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Google cuts off title tags above approximately 70 characters in desktop search results. Mobile starts truncating closer to 60. When your title gets cut, your keyword and hook disappear — the reader sees an incomplete sentence and moves to the next result.
                    </p>

                    <div style={{ margin: "0 0 32px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        {[
                            { zone: "0–60 characters", label: "Safe Zone ✅", desc: "Fully visible on desktop and mobile", color: "#34d399", bg: "rgba(52,211,153,0.05)" },
                            { zone: "60–70 characters", label: "Caution ⚠️", desc: "May be truncated on some mobile devices", color: "#f59e0b", bg: "rgba(245,158,11,0.05)" },
                            { zone: "70+ characters", label: "Truncated ❌", desc: "Cut off in search results — keyword disappears", color: "#f87171", bg: "rgba(248,113,113,0.05)" },
                        ].map((row, i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 130px 1fr", fontSize: 14, background: row.bg, borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                                <div style={{ padding: "14px 18px", color: "rgba(255,255,255,0.5)", fontFamily: "monospace", fontSize: 12 }}>{row.zone}</div>
                                <div style={{ padding: "14px 18px", color: row.color, fontWeight: 700, fontSize: 13 }}>{row.label}</div>
                                <div style={{ padding: "14px 18px", color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{row.desc}</div>
                            </div>
                        ))}
                    </div>

                    <p style={{ margin: "0 0 22px" }}>
                        ToolStack&apos;s generator checks character count on every output. You never publish a truncated title again.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Specificity Is the Difference Between a Click and a Skip</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Vague titles get ignored. Specific titles get clicked. This is the single biggest lever in blog title optimisation — and it costs nothing to fix.
                    </p>

                    <div className="grid-2col">
                        <div style={{ padding: "24px", borderRadius: 16, border: "1px solid rgba(248,113,113,0.25)", background: "rgba(248,113,113,0.05)" }}>
                            <p style={{ fontSize: 11, fontWeight: 800, color: "#f87171", letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>❌ Vague</p>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.6)", margin: "0 0 12px", lineHeight: 1.4 }}>&ldquo;How to Improve Email Marketing&rdquo;</p>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.6 }}>No number. No timeframe. No promise. Ranks for nothing. Gets skipped by everyone.</p>
                        </div>
                        <div style={{ padding: "24px", borderRadius: 16, border: `1px solid ${accentBorder}`, background: accentBg }}>
                            <p style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>✅ Specific</p>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 12px", lineHeight: 1.4 }}>&ldquo;7 Ways to Double Open Rates in 30 Days&rdquo;</p>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>Numbered. Time-bound. Concrete promise. Ranks AND converts.</p>
                        </div>
                    </div>

                    <p style={{ margin: "0 0 22px" }}>
                        The difference isn&apos;t creativity — it&apos;s structure. A number, a specific outcome, and a timeframe transform a generic title into one people click. ToolStack builds that structure into every output automatically.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>10 Title Types — One for Every Intent</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Different content needs different title structures. ToolStack generates all ten types simultaneously so you can pick the one that matches your reader&apos;s intent:
                    </p>

                    {[
                        { type: "SEO", desc: "Keyword-led, built to rank. Matches search intent exactly.", example: '"Free Blog Title Generator for SEO Writers"' },
                        { type: "Listicle", desc: "Numbered list format. Sets a clear expectation of depth.", example: '"7 Blog Title Formulas That Get Clicked Every Time"' },
                        { type: "How-To", desc: "High search intent. Promises a specific transformation.", example: '"How to Write a Blog Title That Ranks on Google"' },
                        { type: "Curiosity", desc: "Information gap hook. Hard to ignore.", example: '"The Blog Title Mistake That\'s Killing Your Traffic"' },
                        { type: "Story", desc: "Narrative angle. Great for newsletters and social.", example: '"I Rewrote 50 Blog Titles in One Day — Here\'s What Happened"' },
                        { type: "Question", desc: "Mirrors search queries directly.", example: '"Are Your Blog Titles Hurting Your SEO?"' },
                        { type: "Stat-Led", desc: "Credibility anchor. Data-backed authority.", example: '"80% of Blog Posts Fail Because of This Title Error"' },
                        { type: "Contrarian", desc: "Challenges assumptions. Stops the scroll.", example: '"Why \'Clickbait\' Titles Are Actually Winning at SEO"' },
                        { type: "Specific Result", desc: "Concrete outcome. Highest converting for bottom-of-funnel.", example: '"7 Ways to Double Open Rates in 30 Days"' },
                        { type: "Comparison", desc: "Decision-stage readers. High commercial intent.", example: '"Blog Title Generator: ToolStack vs HubSpot vs Portent"' },
                    ].map(({ type, desc, example }) => (
                        <div key={type} style={{ display: "flex", gap: 16, margin: "0 0 12px", padding: "18px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", alignItems: "flex-start" }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: accent, fontFamily: "monospace", flexShrink: 0, paddingTop: 2, minWidth: 90 }}>{type}</span>
                            <div>
                                <p style={{ margin: "0 0 4px", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{desc}</p>
                                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>{example}</p>
                            </div>
                        </div>
                    ))}

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How the SEO Blog Title Generator Works</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        The <Link href="/tools/blog-title-generator" style={{ color: "#818cf8" }}>ToolStack Blog Title Generator</Link> is three steps:
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column" as const, gap: 12 }}>
                        {[
                            "Enter your topic and target keyword — just describe what your post is about",
                            "GPT-4o generates 10 titles across all 10 types with the copywriting principle behind each one",
                            "Pick the best title, copy it, and publish — no editing needed",
                        ].map((step, i) => (
                            <li key={i} style={{ display: "flex", gap: 16, fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                                <span style={{ color: accent, fontWeight: 800, fontFamily: "monospace", flexShrink: 0 }}>0{i + 1}</span>
                                {step}
                            </li>
                        ))}
                    </ul>
                    <p style={{ margin: "0 0 22px" }}>
                        No login. No AI credits. No monthly plan. Unlimited queries. It runs entirely in your browser.
                    </p>

                    <AdBlock type="horizontal" />

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Free vs Paid: How It Compares</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        HubSpot&apos;s blog ideas generator requires a free account and returns one result at a time. Portent&apos;s title maker generates one quirky clickbait title with no SEO intent. CoSchedule scores headlines but doesn&apos;t write them. ToolStack writes ten across ten types — free, instantly, with no account.
                    </p>

                    <div className="table-scroll" style={{ margin: "0 0 32px", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ minWidth: 480 }}>
                        {[
                            { label: "Price", toolstack: "Free forever", others: "Free (gated) or $29+/month" },
                            { label: "Login required", toolstack: "No", others: "Yes (HubSpot, CoSchedule)" },
                            { label: "Results per query", toolstack: "10 title types", others: "1 result" },
                            { label: "SEO-focused output", toolstack: "Yes", others: "Partial or none" },
                            { label: "Psychology explained", toolstack: "Yes — per title", others: "No" },
                            { label: "Character count check", toolstack: "Yes — automatic", others: "CoSchedule only" },
                        ].map((row, i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 14, background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                                <div style={{ padding: "14px 18px", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", fontSize: 12, borderRight: "1px solid rgba(255,255,255,0.06)" }}>{row.label}</div>
                                <div style={{ padding: "14px 18px", color: "#34d399", fontWeight: 600, borderRight: "1px solid rgba(255,255,255,0.06)" }}>{row.toolstack}</div>
                                <div style={{ padding: "14px 18px", color: "rgba(255,255,255,0.45)" }}>{row.others}</div>
                            </div>
                        ))}
                        </div>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Pair Great Titles With a List That Brings Readers Back</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        A great title gets the first click. An email list gets every click after that. Once someone lands on your blog, the smartest move is capturing them on a list so you can bring them back without depending on the algorithm.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        We use <a href="https://www.aweber.com/easy-email.htm?id=502593" target="_blank" rel="noopener noreferrer sponsored" style={{ color: "#818cf8" }}>AWeber</a> at ToolStack — free to start, integrates with any CMS, and gives you a direct channel your audience that Google updates can&apos;t touch. For AI-powered ad copy and SEO content at scale, <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: "#818cf8" }}>AdvertsGPT</a> is built exactly for that.
                    </p>

                    {/* Main CTA */}
                    <div style={{ margin: "52px 0 0", padding: "32px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, textAlign: "center" as const }}>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 8px" }}>Generate 10 SEO blog titles in 10 seconds</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 20px" }}>Free. No login. No limits. 10 title types, psychology explained for each.</p>
                        <Link href="/tools/blog-title-generator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #059669 0%, #34d399 100%)", color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                            Try the Generator Free →
                        </Link>
                    </div>
                </div>

                {/* FAQs */}
                <div style={{ marginTop: 64 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "0 0 28px" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {FAQS.map(({ question, answer }) => (
                            <div key={question} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", margin: "0 0 10px" }}>{question}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <Link href="/blog/free-meta-description-generator" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← Free Meta Description Generator</Link>
                    <Link href="/tools/blog-title-generator" style={{ fontSize: 14, fontWeight: 700, color: accent, textDecoration: "none" }}>Try the Generator →</Link>
                </div>
            </div>
        </main>
    );
}
