import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";
import { YouTubeLite } from "@/components/YouTubeLite";

const SLUG = "aweber-vs-beehiiv";
const PUB_DATE = "2026-05-29";
const AWEBER_LINK = "https://bit.ly/aweberjustin";
const BEEHIIV_LINK = "https://www.beehiiv.com/?via=justin-pirrie";
const accentB = "#f59e0b";
const accentBBg = "rgba(245,158,11,0.08)";
const accentBBorder = "rgba(245,158,11,0.22)";
const accentA = "#2563eb";
const accentABg = "rgba(37,99,235,0.08)";
const accentABorder = "rgba(37,99,235,0.22)";

export const metadata: Metadata = {
    title: "AWeber vs Beehiiv: Why Creators Are Switching After the Price Hike (2026)",
    description: "AWeber raised prices 50–150% in late 2024. Beehiiv gives 2,500 free subscribers plus a built-in Ad Network, Boosts, and paid subscriptions. Full 2026 comparison with data.",
    alternates: { canonical: `https://toolstack.tech/blog/${SLUG}` },
    openGraph: {
        title: "AWeber vs Beehiiv: Why Creators Are Switching After the Price Hike (2026)",
        description: "AWeber raised prices 50–150%. Beehiiv offers 2,500 free subscribers, Ad Network, Boosts, paid subscriptions. Who wins for newsletter creators?",
        url: `https://toolstack.tech/blog/${SLUG}`,
        siteName: "ToolStack",
        type: "article",
        publishedTime: PUB_DATE,
        modifiedTime: PUB_DATE,
        images: [{ url: `https://toolstack.tech/blog/${SLUG}/hero-banner.png`, width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "AWeber vs Beehiiv 2026: The Price Hike That Changed Everything",
        description: "2,500 free subs vs 300. Built-in monetisation vs zero. Full comparison after AWeber's controversial price increase.",
        images: [`https://toolstack.tech/blog/${SLUG}/hero-banner.png`],
    },
};

const FAQS = [
    {
        question: "Is AWeber still worth it after the 2024 price increase?",
        answer: "For enterprise teams needing complex B2B automation, AWeber's 99.8% deliverability and advanced conditional workflows still justify the cost. For solo newsletter creators, the 50–150% price hike makes Beehiiv the better value — especially since Beehiiv's free tier covers 2,500 subscribers vs AWeber's 300.",
    },
    {
        question: "How much can I make with Beehiiv Boosts?",
        answer: "Beehiiv Boosts earnings vary by niche and audience size. Creators report $1–5 per new subscriber driven through Boosts, with Beehiiv taking a 20% platform fee on earnings. The Ad Network also allows direct sponsorship deals. Most creators with 5,000+ engaged subscribers see meaningful passive income from the built-in monetisation tools.",
    },
    {
        question: "Can I switch from AWeber to Beehiiv without losing subscribers?",
        answer: "Yes — Beehiiv has a direct migration import tool. Export your subscriber list from AWeber as a CSV, upload to Beehiiv, and subscribers transfer over. You may want to send a re-engagement email to clean the list. The process typically takes under 2 hours.",
    },
    {
        question: "What is the Beehiiv free plan limit?",
        answer: "Beehiiv's free Launch plan supports up to 2,500 subscribers with unlimited sends and core features including the newsletter builder, landing pages, and analytics. No credit card required. AWeber's free tier was cut to 300 subscribers in late 2024.",
    },
    {
        question: "Does AWeber allow affiliate marketing?",
        answer: "Yes — AWeber is one of the most affiliate-friendly email platforms and permits affiliate links in emails as long as you follow CAN-SPAM/GDPR rules. Many platforms like Mailchimp restrict affiliate content. AWeber also runs a 30% recurring commission affiliate program.",
    },
    {
        question: "What is Beehiiv's deliverability compared to AWeber?",
        answer: "AWeber uses its own sending infrastructure with a 99.8% deliverability rate, backed by 27 years of inbox relationship building. Beehiiv uses a third-party ESP — deliverability is not independently audited. For high-stakes transactional or B2B email, AWeber's own infrastructure is an advantage.",
    },
    {
        question: "Which is better for beginners — AWeber or Beehiiv?",
        answer: "Beehiiv wins for beginners. The interface is modern and designed for newsletter creators rather than enterprise marketers. The free plan covering 2,500 subscribers means you can build a real audience before paying anything. AWeber has a steeper learning curve and a dated interface.",
    },
    {
        question: "Does Beehiiv have a free trial?",
        answer: "Beehiiv offers a 14-day free trial on paid plans. Via our link below, you get 20% OFF for your first 3 months. The Launch plan is permanently free up to 2,500 subscribers — no trial period needed.",
    },
];

const COMPARISON_ROWS = [
    { feature: "Free tier", aweber: "300 subscribers", beehiiv: "2,500 subscribers", winner: "beehiiv" },
    { feature: "Starting price", aweber: "$15/mo (Lite)", beehiiv: "$0 (Launch)", winner: "beehiiv" },
    { feature: "Deliverability", aweber: "99.8% (own infra)", beehiiv: "Third-party ESP", winner: "aweber" },
    { feature: "Built-in monetisation", aweber: "None", beehiiv: "Ad Network + Boosts + Paid subs", winner: "beehiiv" },
    { feature: "Growth tools", aweber: "None", beehiiv: "Boosts, Magic Links, Referrals", winner: "beehiiv" },
    { feature: "AI tools", aweber: "Minimal", beehiiv: "Writer, image gen, website builder", winner: "beehiiv" },
    { feature: "Automation", aweber: "Advanced (conditional branching)", beehiiv: "Automations v3 + Workflows", winner: "tie" },
    { feature: "Support", aweber: "24/7 phone + live chat", beehiiv: "Scale+ only", winner: "aweber" },
    { feature: "Interface", aweber: "Dated, complex", beehiiv: "Modern, intuitive", winner: "beehiiv" },
    { feature: "Best for", aweber: "Enterprise / B2B teams", beehiiv: "Newsletter creators", winner: "tie" },
];

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="AWeber vs Beehiiv: Why Creators Are Switching After the Price Hike (2026)"
                description="AWeber raised prices 50–150% in late 2024. Beehiiv offers 2,500 free subscribers, a built-in Ad Network, Boosts, and paid subscriptions. Full comparison."
                url={`https://toolstack.tech/blog/${SLUG}`}
                datePublished={PUB_DATE}
                dateModified={PUB_DATE}
                faqs={FAQS}
            />

            {/* ── HERO ── */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "10%", left: "30%", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "20%", right: "20%", width: 400, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.52)" }}>
                        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
                        <span>/</span>
                        <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</Link>
                        <span>/</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>AWeber vs Beehiiv</span>
                    </div>

                    {/* Badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
                        <span style={{ background: accentBBg, border: `1px solid ${accentBBorder}`, color: accentB, padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>EMAIL MARKETING</span>
                        <span style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600 }}>PRICE HIKE ALERT</span>
                        <span style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 99, fontSize: 12 }}>Updated May 2026</span>
                        <span style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 99, fontSize: 12 }}>10 min read</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em" }}>
                        AWeber vs Beehiiv: Why Creators Are Switching After the 50% Price Hike
                    </h1>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                        <Image src="/blog/aweber-vs-beehiiv/author-avatar.jpg" alt="Justin Pirrie" width={36} height={36} style={{ borderRadius: "50%", flexShrink: 0 }} />
                        <div>
                            <div style={{ color: "white", fontWeight: 600, fontSize: 14 }}>Justin Pirrie</div>
                            <div>Founder, ToolStack · May 29, 2026</div>
                        </div>
                    </div>

                    {/* Hero banner */}
                    <div style={{ marginBottom: 40, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                        <Image
                            src="/blog/aweber-vs-beehiiv/hero-banner.png"
                            alt="AWeber vs Beehiiv 2026 — The Price Hike That Changed Everything"
                            width={1200}
                            height={630}
                            style={{ width: "100%", height: "auto", display: "block" }}
                            priority
                        />
                    </div>

                    {/* Direct answer */}
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 20 }}>
                        <strong style={{ color: "white" }}>For newsletter creators, Beehiiv wins in 2026.</strong> AWeber raised prices by 50–150% in late 2024 and simultaneously cut its free tier from 500 to just 300 subscribers. Beehiiv gives you 2,500 free subscribers, a built-in Ad Network, Boosts monetisation, and AI writing tools — all things AWeber doesn&apos;t offer at any price.
                    </p>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 36 }}>
                        AWeber is still the right call for enterprise teams running complex B2B automation who need a 99.8% deliverability guarantee backed by own sending infrastructure. But for solo creators, bloggers, and anyone growing a newsletter from scratch — the math doesn&apos;t work in AWeber&apos;s favour anymore.
                    </p>

                    {/* ToolStack inline CTA */}
                    <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "20px 24px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#10b981", marginBottom: 4 }}>Free Email Tool — No Signup</div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>Writing subject lines for your newsletter? Test them free — scores open rate potential, spam triggers, and power words instantly.</div>
                        </div>
                        <Link href="/tools/email-subject-line-tester" style={{ background: "#10b981", color: "#000", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
                            Test Subject Lines Free →
                        </Link>
                    </div>

                    {/* Dual CTA */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
                        <a href={BEEHIIV_LINK} target="_blank" rel="noopener noreferrer" style={{ background: accentB, color: "#000", padding: "16px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center", display: "block" }}>
                            Try Beehiiv Free →
                            <div style={{ fontSize: 11, fontWeight: 400, marginTop: 4, opacity: 0.7 }}>14-day trial + 20% OFF 3 months</div>
                        </a>
                        <a href={AWEBER_LINK} target="_blank" rel="noopener noreferrer" style={{ background: accentABg, border: `1px solid ${accentABorder}`, color: "white", padding: "16px 20px", borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: "none", textAlign: "center", display: "block" }}>
                            Try AWeber Free →
                            <div style={{ fontSize: 11, fontWeight: 400, marginTop: 4, opacity: 0.6 }}>Up to 300 subscribers</div>
                        </a>
                    </div>

                    {/* Key Takeaways */}
                    <div style={{ background: "rgba(245,158,11,0.05)", border: `1px solid ${accentBBorder}`, borderRadius: 14, padding: "24px 28px", marginBottom: 40 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>KEY TAKEAWAYS</div>
                        <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                            {[
                                "AWeber cut its free tier to 300 subs and raised prices 50–150% in late 2024 — the main reason creators are leaving",
                                "Beehiiv's free Launch plan covers 2,500 subscribers with unlimited sends — 8× more than AWeber's free tier",
                                "Beehiiv has built-in Ad Network, Boosts, and paid subscriptions — AWeber has zero native monetisation at any price point",
                                "AWeber wins on deliverability (99.8%, own infrastructure) and complex automation — still better for enterprise B2B use cases",
                                "Beehiiv Scale at $49/mo unlocks all monetisation tools; AWeber Plus at $20–30/mo is comparable but without any creator revenue features",
                            ].map((item, i) => (
                                <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Audio player */}
                    <div style={{ margin: "0 0 32px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 28px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>🎙 NOTEBOOKLM AUDIO OVERVIEW</div>
                        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Rather listen? Deep Dive Podcast</div>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: "0 0 16px" }}>A conversational breakdown of AWeber vs Beehiiv — the price hike story, monetisation features, and who should use what. Produced with NotebookLM.</p>
                        <audio controls style={{ width: "100%", borderRadius: 8 }}>
                            <source src="/blog/aweber-vs-beehiiv/podcast.m4a" type="audio/mp4" />
                        </audio>
                    </div>

                    {/* YouTube embed */}
                    <YouTubeLite videoId="EwUkNIvLMFw" title="AWeber vs Beehiiv 2026: The Price Hike That Changed Everything" />
                </div>
            </div>

            {/* ── BODY ── */}
            <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 24px 120px" }}>

                <AdBlock type="horizontal" />

                {/* The Price Hike Story */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>The Price Hike That Changed Everything</h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 16 }}>
                        In late 2024, AWeber — one of the oldest email platforms in the industry, founded in 1998 — quietly made two changes that sent creators to Google searching for alternatives. First, they cut the free plan from 500 subscribers to 300. Second, they raised prices across all paid tiers by 50% to 150% depending on your subscriber count.
                    </p>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 16 }}>
                        A creator with 5,000 subscribers went from paying around $30/month to $60/month overnight. A creator at 10,000 subscribers saw their bill nearly triple. The timing was particularly bad: Beehiiv had just launched its full monetisation suite, and the contrast between &ldquo;pay more for the same thing&rdquo; vs &ldquo;pay less and actually earn money&rdquo; was stark.
                    </p>
                    <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 8, letterSpacing: "0.04em" }}>WHAT CHANGED ON AWEBER</div>
                        <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                            {[
                                "Free tier: 500 → 300 subscribers (40% reduction)",
                                "Lite plan: Price increased 50–80% depending on list size",
                                "Plus plan: Price increased 100–150% at higher subscriber tiers",
                                "No new features shipped to justify the increase",
                            ].map((item, i) => (
                                <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                        AWeber has not officially commented on the reasoning beyond &ldquo;market alignment.&rdquo; The email marketing community hasn&apos;t been forgiving.
                    </p>
                </section>

                {/* Infographic 1 */}
                <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 56, display: "block" }} aria-label="AWeber vs Beehiiv platform evaluation infographic">
                    <source src="/blog/aweber-vs-beehiiv/infographic-1.mp4" type="video/mp4" />
                </video>

                {/* Comparison Table */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}>AWeber vs Beehiiv: Full Feature Comparison</h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>Based on current 2026 pricing and features. Primary keyword: <em>AWeber vs Beehiiv</em>.</p>
                    <div style={{ overflowX: "auto", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "14px 20px", textAlign: "left", color: "rgba(255,255,255,0.45)", fontWeight: 600, fontSize: 12, letterSpacing: "0.05em", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>FEATURE</th>
                                    <th style={{ padding: "14px 20px", textAlign: "center", color: "#60a5fa", fontWeight: 700, fontSize: 13, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>AWEBER</th>
                                    <th style={{ padding: "14px 20px", textAlign: "center", color: accentB, fontWeight: 700, fontSize: 13, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>BEEHIIV</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON_ROWS.map((row, i) => (
                                    <tr key={i} style={{ borderBottom: i < COMPARISON_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                                        <td style={{ padding: "14px 20px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{row.feature}</td>
                                        <td style={{ padding: "14px 20px", textAlign: "center", color: row.winner === "aweber" ? "#60a5fa" : row.winner === "tie" ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.55)" }}>
                                            {row.winner === "aweber" && <span style={{ marginRight: 6 }}>✓</span>}
                                            {row.aweber}
                                        </td>
                                        <td style={{ padding: "14px 20px", textAlign: "center", color: row.winner === "beehiiv" ? accentB : row.winner === "tie" ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.55)" }}>
                                            {row.winner === "beehiiv" && <span style={{ marginRight: 6 }}>✓</span>}
                                            {row.beehiiv}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Infographic 2 */}
                <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 56, display: "block" }} aria-label="AWeber vs Beehiiv feature comparison infographic">
                    <source src="/blog/aweber-vs-beehiiv/infographic-2.mp4" type="video/mp4" />
                </video>

                {/* Pricing Deep Dive */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>Pricing: The Numbers Don&apos;t Lie</h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 24 }}>
                        At the 0–2,500 subscriber level, the comparison isn&apos;t even close. Beehiiv is free. AWeber costs $15/month and gives you a fraction of the features. Here&apos;s what both platforms charge at key subscriber milestones:
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                        {[
                            { platform: "AWeber", color: accentA, bg: accentABg, border: accentABorder, tiers: [
                                { size: "0–300 subs", price: "Free" },
                                { size: "301–500 subs", price: "$15/mo (Lite)" },
                                { size: "501–2,500 subs", price: "$20–30/mo (Plus)" },
                                { size: "2,501–5,000 subs", price: "$40–60/mo" },
                                { size: "5,001–10,000 subs", price: "$70–100/mo" },
                            ]},
                            { platform: "Beehiiv", color: accentB, bg: accentBBg, border: accentBBorder, tiers: [
                                { size: "0–2,500 subs", price: "Free (Launch)" },
                                { size: "2,501–10,000 subs", price: "$49/mo (Scale)" },
                                { size: "10,001+ subs", price: "$109/mo (Max)" },
                                { size: "Paid subs income", price: "Unlocked on Scale" },
                                { size: "Ad Network income", price: "Unlocked on Scale" },
                            ]},
                        ].map(({ platform, color, bg, border, tiers }) => (
                            <div key={platform} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 14, padding: "24px 20px" }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: platform === "AWeber" ? "#60a5fa" : color, marginBottom: 16 }}>{platform} Pricing</div>
                                {tiers.map(({ size, price }) => (
                                    <div key={size} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 13 }}>
                                        <span style={{ color: "rgba(255,255,255,0.6)" }}>{size}</span>
                                        <span style={{ color: "white", fontWeight: 600 }}>{price}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                        The key inflection point: at 5,000 subscribers, Beehiiv Scale ($49/mo) includes full monetisation features and costs less than AWeber&apos;s equivalent tier. By the time you hit 10,000 subscribers, Beehiiv Max ($109/mo) vs AWeber ($70–100/mo) is nearly the same price — but Beehiiv gives you tools to <em>earn</em> from your list.
                    </p>
                </section>

                {/* Product Screenshots */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>What Each Platform Looks Like</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#60a5fa", marginBottom: 10, letterSpacing: "0.05em" }}>AWEBER</div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/blog/aweber-vs-beehiiv/screenshot-aweber.png" alt="AWeber email marketing platform interface" style={{ width: "100%", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", display: "block" }} />
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: accentB, marginBottom: 10, letterSpacing: "0.05em" }}>BEEHIIV</div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/blog/aweber-vs-beehiiv/screenshot-beehiiv.png" alt="Beehiiv newsletter platform interface" style={{ width: "100%", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", display: "block" }} />
                        </div>
                    </div>
                </section>

                {/* Monetisation — the real differentiator */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>Monetisation: Beehiiv&apos;s Biggest Advantage</h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 20 }}>
                        AWeber is an email marketing platform. Beehiiv is a creator revenue platform that happens to send email. That distinction matters more than any pricing comparison.
                    </p>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 24 }}>
                        AWeber has <strong style={{ color: "white" }}>zero built-in monetisation features</strong>. If you want to earn from your list, you need third-party tools, manual sponsorship outreach, and separate payment processors. Beehiiv bakes all of this in:
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                        {[
                            { title: "Beehiiv Ad Network", desc: "Brands pay to appear in your newsletter. Beehiiv matches you with advertisers — you accept or decline, they pay directly. Beehiiv takes 20% of earnings. Available on Scale ($49/mo).", accent: accentB },
                            { title: "Boosts", desc: "Get paid $1–5 per new subscriber you send to other newsletters in Beehiiv's network. Run cross-promotions that pay out directly into your account. Beehiiv takes a 20% platform fee.", accent: accentB },
                            { title: "Paid Subscriptions", desc: "Charge readers monthly or annually for premium content. Stripe handles payments; Beehiiv manages tiers. Build a recurring revenue stream directly from your newsletter audience.", accent: accentB },
                            { title: "Referral Program", desc: "Reward existing subscribers for referring new ones. Set up automated reward milestones (exclusive content, merch, etc.) that incentivise word-of-mouth growth.", accent: accentB },
                        ].map(({ title, desc, accent }) => (
                            <div key={title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px", borderLeft: `3px solid ${accent}` }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 8 }}>{title}</div>
                                <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ background: accentBBg, border: `1px solid ${accentBBorder}`, borderRadius: 12, padding: "20px 24px" }}>
                        <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                            <strong style={{ color: accentB }}>The bottom line:</strong> A Beehiiv newsletter with 5,000 engaged subscribers can realistically earn $500–2,000/month from Boosts and Ad Network alone — before you count paid subscriptions. AWeber offers none of this natively. You&apos;d need to build that infrastructure yourself.
                        </p>
                    </div>
                </section>

                {/* Deliverability */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>Deliverability: The One Area AWeber Still Wins</h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 16 }}>
                        AWeber&apos;s 99.8% deliverability rate is backed by infrastructure the company has built over 27 years. They own their sending domain, operate their own servers, and have dedicated teams managing inbox relationships with Gmail, Yahoo, and Microsoft. This matters for:
                    </p>
                    <ul style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                        {[
                            "High-volume senders (100k+ per send) where small deliverability differences compound",
                            "B2B transactional email where inbox placement is critical",
                            "Regulated industries (finance, healthcare) where compliance is non-negotiable",
                        ].map((item, i) => (
                            <li key={i} style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{item}</li>
                        ))}
                    </ul>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                        Beehiiv uses a third-party ESP for sending — deliverability is solid in practice but not independently audited. For most newsletter creators sending 2–4 emails a month to engaged audiences, the difference is negligible. For enterprise senders, it&apos;s worth considering.
                    </p>
                </section>

                {/* Infographic 3 */}
                <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 56, display: "block" }} aria-label="AWeber vs Beehiiv value shift infographic">
                    <source src="/blog/aweber-vs-beehiiv/infographic-3.mp4" type="video/mp4" />
                </video>

                {/* Who should use what */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>Who Should Use Which Platform</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div style={{ background: accentBBg, border: `1px solid ${accentBBorder}`, borderRadius: 14, padding: "24px 20px" }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: accentB, marginBottom: 16 }}>Choose Beehiiv if...</div>
                            {[
                                "You're a newsletter creator or blogger",
                                "You have under 2,500 subscribers (free forever)",
                                "You want to monetise via ads, Boosts, or paid subscriptions",
                                "You want modern UX without a learning curve",
                                "You want AI writing and website tools built in",
                                "You're switching from AWeber after the price hike",
                            ].map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                                    <span style={{ color: accentB, flexShrink: 0, marginTop: 1 }}>✓</span>
                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{item}</span>
                                </div>
                            ))}
                            <a href={BEEHIIV_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: accentB, color: "#000", padding: "13px 20px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center", marginTop: 20 }}>
                                Try Beehiiv Free →
                            </a>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textAlign: "center", marginTop: 8 }}>14-day trial + 20% OFF 3 months</div>
                        </div>
                        <div style={{ background: accentABg, border: `1px solid ${accentABorder}`, borderRadius: 14, padding: "24px 20px" }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: "#60a5fa", marginBottom: 16 }}>Choose AWeber if...</div>
                            {[
                                "You're running complex B2B email automation",
                                "You need conditional branching and multi-step workflows",
                                "Deliverability is critical (enterprise, regulated industries)",
                                "You need 24/7 phone support on all plans",
                                "You integrate with 150+ specific third-party tools",
                                "You have a multi-user team managing campaigns",
                            ].map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                                    <span style={{ color: accentA, flexShrink: 0, marginTop: 1 }}>✓</span>
                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{item}</span>
                                </div>
                            ))}
                            <a href={AWEBER_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: accentABg, border: `1px solid ${accentABorder}`, color: "white", padding: "13px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none", textAlign: "center", marginTop: 20 }}>
                                Try AWeber Free →
                            </a>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textAlign: "center", marginTop: 8 }}>Up to 300 subscribers</div>
                        </div>
                    </div>
                </section>

                {/* Migration */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>How to Switch from AWeber to Beehiiv (Under 2 Hours)</h2>
                    {[
                        { step: "1", title: "Export from AWeber", desc: "Go to AWeber → Subscribers → Export. Download as CSV. Include all subscriber fields you want to keep (email, name, tags, custom fields)." },
                        { step: "2", title: "Create your Beehiiv account", desc: `Sign up at Beehiiv via the link below for your 14-day trial + 20% OFF. Set up your newsletter name, description, and branding before importing.` },
                        { step: "3", title: "Import your list", desc: "Beehiiv → Audience → Import Subscribers. Upload your CSV. Map fields appropriately. Beehiiv supports custom fields and tags on import." },
                        { step: "4", title: "Send a re-engagement email", desc: "Notify your list you've moved. This also cleans inactive subscribers and protects your deliverability score on the new platform." },
                        { step: "5", title: "Set up your monetisation", desc: "Apply for the Ad Network, configure Boosts, and optionally set up paid subscription tiers — things you couldn't do on AWeber at all." },
                    ].map(({ step, title, desc }) => (
                        <div key={step} style={{ display: "flex", gap: 20, marginBottom: 24 }}>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: accentBBg, border: `1px solid ${accentBBorder}`, color: accentB, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{step}</div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 6 }}>{title}</div>
                                <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{desc}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Conclusion CTA */}
                <section style={{ background: accentBBg, border: `1px solid ${accentBBorder}`, borderRadius: 16, padding: "36px 32px", marginBottom: 56, textAlign: "center" }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Ready to Make the Switch?</h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 28, maxWidth: 520, margin: "0 auto 28px" }}>
                        Beehiiv gives you 2,500 free subscribers, a built-in Ad Network, Boosts, and AI tools — everything AWeber charges extra for and still doesn&apos;t offer. Via ToolStack you get a 14-day free trial plus 20% OFF your first 3 months.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href={BEEHIIV_LINK} target="_blank" rel="noopener noreferrer" style={{ background: accentB, color: "#000", padding: "16px 32px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                            Start Free on Beehiiv →
                        </a>
                        <a href={AWEBER_LINK} target="_blank" rel="noopener noreferrer" style={{ background: "transparent", border: `1px solid ${accentABorder}`, color: "rgba(255,255,255,0.7)", padding: "16px 32px", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                            Try AWeber Instead
                        </a>
                    </div>
                    <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 10 }}>Want help growing your newsletter with AI-powered content?</div>
                        <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#a78bfa", textDecoration: "none" }}>
                            AdvertsGPT — GEO &amp; AEO content agency →
                        </a>
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 12 }}>
                        Affiliate disclosure: ToolStack earns a commission if you sign up via these links, at no extra cost to you.
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28, letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {FAQS.map((faq, i) => (
                            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 24, marginBottom: 24 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 10, marginTop: 0 }}>{faq.question}</h3>
                                <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                    ← Back to Blog
                </Link>
            </div>
        </main>
    );
}
