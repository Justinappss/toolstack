import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "Salary After Tax 2025: UK vs US — What You Actually Take Home",
    description: "Exact take-home pay after tax for UK and US salaries in 2025/26. Full breakdown of income tax, National Insurance, and FICA with a free salary calculator for both countries.",
    alternates: { canonical: "https://toolstack.tech/blog/salary-after-tax-uk-us-2025" },
    openGraph: {
        title: "Salary After Tax 2025: UK vs US — What You Actually Take Home",
        description: "Exact take-home pay after tax for UK and US salaries in 2025/26. Full breakdown of income tax, National Insurance, and FICA.",
        url: "https://toolstack.tech/blog/salary-after-tax-uk-us-2025",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-28",
        modifiedTime: "2026-05-28",
        images: [{ url: "https://toolstack.tech/blog/salary-after-tax-uk-us-2025/hero-banner.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Salary After Tax 2025: UK vs US — What You Take Home",
        description: "UK PAYE and US Federal take-home pay compared. Free calculator included.",
        images: ["https://toolstack.tech/blog/salary-after-tax-uk-us-2025/hero-banner.png"],
    },
};

const FAQS = [
    {
        question: "What is the UK take-home pay on a £40,000 salary in 2025/26?",
        answer: "On a £40,000 salary in the UK for 2025/26, your take-home pay is approximately £32,320 per year — around £2,693 per month. This assumes England, Wales or Northern Ireland, standard 1257L tax code, no student loan, and no pension contributions. Income tax is £5,486 and National Insurance is £2,194.",
    },
    {
        question: "How is National Insurance calculated in the UK 2025/26?",
        answer: "National Insurance is 8% on earnings between £12,570 and £50,270, then 2% on anything above £50,270. It is calculated on gross earnings and stacks on top of income tax — meaning UK earners effectively face a combined 28% marginal rate in the basic rate band (20% income tax + 8% NI).",
    },
    {
        question: "Does the US or UK have higher income tax?",
        answer: "At equivalent mid-range salaries ($50k/£40k), US federal take-home is slightly higher than UK take-home. The UK's National Insurance contribution stacks on top of income tax in a way the US FICA does not at that level. At higher incomes (£100k+), the UK's 40–45% bands make the UK system significantly heavier, especially above £100,000 where the Personal Allowance tapers and creates an effective 60% marginal rate.",
    },
    {
        question: "What is the UK Personal Allowance for 2025/26?",
        answer: "The Personal Allowance for 2025/26 is £12,570. This is the amount you can earn tax-free. Above £100,000, the allowance is gradually removed — you lose £1 of allowance for every £2 earned above £100,000. This creates an effective 60% marginal tax rate on income between £100,000 and £125,140.",
    },
    {
        question: "What is the difference between marginal rate and effective tax rate?",
        answer: "Your marginal rate is the tax rate on your last pound or dollar of income. Your effective rate is the average rate across your whole salary. Because tax systems use progressive bands, only the income in each bracket gets taxed at that rate — not your entire salary. A UK earner on £60,000 has a 40% marginal rate but an effective rate closer to 27%, because the first £12,570 is tax-free and the next £37,700 is taxed at only 20%.",
    },
    {
        question: "Does the salary calculator include state tax for US users?",
        answer: "No — the US calculation covers federal income tax and FICA only (Social Security and Medicare). State income tax varies from 0% (Texas, Florida, Nevada) to over 13% (California) and is not included. Your actual take-home will be lower if you live in a state with income tax.",
    },
    {
        question: "Can I use the salary calculator for a Scotland-based salary?",
        answer: "The UK calculation uses England, Wales and Northern Ireland tax bands. Scotland has its own income tax rates set by the Scottish Government, which differ from the UK-wide rates. For Scottish calculations, you should use a Scotland-specific calculator or check HMRC's guidance on Scottish income tax.",
    },
    {
        question: "How do I work out my monthly salary after tax?",
        answer: "Enter your annual gross salary into the ToolStack salary calculator, select UK or US, and hit Calculate. Your monthly take-home is shown instantly alongside the full annual breakdown, effective tax rate, and a visual chart of where your salary goes. No signup required.",
    },
];

const accent = "#34d399";
const accentBg = "rgba(52,211,153,0.06)";
const accentBorder = "rgba(52,211,153,0.18)";

const h2Style: React.CSSProperties = {
    fontSize: "clamp(20px,3vw,26px)",
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.02em",
    margin: "52px 0 16px",
    lineHeight: 1.2,
};

const h3Style: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 700,
    color: "rgba(255,255,255,0.9)",
    margin: "32px 0 12px",
    lineHeight: 1.3,
};

const pStyle: React.CSSProperties = { margin: "0 0 22px" };

const UK_TABLE = [
    { salary: "£30,000", tax: "£3,486", ni: "£1,394", net: "£25,120", monthly: "£2,093", rate: "16.3%" },
    { salary: "£40,000", tax: "£5,486", ni: "£2,194", net: "£32,320", monthly: "£2,693", rate: "19.2%" },
    { salary: "£50,000", tax: "£7,486", ni: "£2,994", net: "£39,520", monthly: "£3,293", rate: "20.9%" },
    { salary: "£60,000", tax: "£11,432", ni: "£3,211", net: "£45,357", monthly: "£3,780", rate: "24.4%" },
    { salary: "£75,000", tax: "£17,432", ni: "£3,512", net: "£54,056", monthly: "£4,505", rate: "27.9%" },
];

const US_TABLE = [
    { salary: "$40,000", tax: "$2,816", fica: "$3,060", net: "$34,124", monthly: "$2,844", rate: "14.7%" },
    { salary: "$50,000", tax: "$4,016", fica: "$3,825", net: "$42,159", monthly: "$3,513", rate: "15.7%" },
    { salary: "$75,000", tax: "$8,341", fica: "$5,738", net: "$60,921", monthly: "$5,077", rate: "18.8%" },
    { salary: "$100,000", tax: "$13,841", fica: "$7,650", net: "$78,509", monthly: "$6,542", rate: "21.5%" },
];

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Salary After Tax 2025: UK vs US — What You Actually Take Home"
                description="Exact take-home pay after tax for UK and US salaries in 2025/26. Full breakdown of income tax, National Insurance, and FICA with a free salary calculator for both countries."
                url="https://toolstack.tech/blog/salary-after-tax-uk-us-2025"
                datePublished="2026-05-28"
                dateModified="2026-05-28"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Salary After Tax UK vs US 2025</span>
                    </div>

                    {/* Tag + date */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Finance</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>May 28, 2026 · 9 min read</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        Salary After Tax 2025: UK vs US — What You Actually Take Home
                    </h1>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                        <img src="/images/justin-pirrie-headshot.png" alt="Justin Pirrie" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>Founder, ToolStack · May 28, 2026</p>
                        </div>
                    </div>

                    </div>
            </div>

            {/* Hero banner */}
            <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>
                <div style={{ margin: "32px 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                    <img
                        src="/blog/salary-after-tax-uk-us-2025/hero-banner.png"
                        alt="Salary After Tax UK vs US 2025/26 — take-home pay comparison for UK PAYE and US Federal"
                        style={{ width: "100%", height: "auto", display: "block" }}
                    />
                </div>
            </div>

            {/* Body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* Direct answer */}
                <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: "0 0 32px", fontWeight: 500 }}>
                    <strong style={{ color: "white" }}>On a £40,000 UK salary in 2025/26, you take home £32,320 per year — £2,693 per month.</strong> On an equivalent $50,000 US salary, a single filer keeps $42,159 — $3,513 per month. The gap widens sharply above £50,000 where UK higher-rate tax and National Insurance stack. Use the <Link href="/tools/salary-calculator" style={{ color: accent, textDecoration: "underline" }}>free salary calculator</Link> to get your exact figure in seconds.
                </p>

                {/* Inline CTA */}
                <div style={{ margin: "0 0 40px", padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, display: "flex", flexDirection: "column", gap: 12 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>Calculate your exact take-home pay — UK or US</p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: 0 }}>Full PAYE + NI breakdown for UK. Federal + FICA for US. Annual and monthly. Free, no signup.</p>
                    <Link href="/tools/salary-calculator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: accent, color: "#001a0d", fontSize: 14, fontWeight: 800, textDecoration: "none", width: "fit-content" }}>
                        Calculate My Take-Home →
                    </Link>
                </div>

                {/* Key Takeaways */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: "rgba(52,211,153,0.04)", marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 16px" }}>Key Takeaways</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 12 }}>
                        {[
                            "UK earners lose ~19% to income tax + NI on a £40k salary — the same gross buys you more in the US at federal level",
                            "Your marginal rate and effective rate are never the same number — UK earners on £60k are in the 40% band but their effective rate is closer to 27%",
                            "Above £100,000 in the UK, the Personal Allowance tapers creating an effective 60% marginal rate — not widely understood",
                            "US calculations above cover federal tax only — state tax (0–13%) is not included and can significantly reduce take-home",
                        ].map((item, i) => (
                            <li key={i} style={{ display: "flex", gap: 14, fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                                <span style={{ fontWeight: 900, color: accent, flexShrink: 0 }}>→</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Audio player */}
                <div style={{ margin: "0 0 32px", padding: "20px 24px", borderRadius: 16, background: "rgba(52,211,153,0.05)", border: `1px solid ${accentBorder}` }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 10px" }}>🎙 Listen to this article</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 12px" }}>Why Your Gross Salary Is an Illusion — NotebookLM Audio Overview</p>
                    <audio controls style={{ width: "100%", borderRadius: 8, accentColor: accent }}>
                        <source src="/blog/salary-after-tax-uk-us-2025/salary-podcast.m4a" type="audio/mp4" />
                    </audio>
                </div>

                {/* YouTube embed */}
                <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "16/9", position: "relative" }}>
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/piA8aP3ehrg"
                        title="Salary After Tax UK vs US 2025 — What You Actually Take Home"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                    />
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    {/* H2: UK */}
                    <h2 style={h2Style}>How UK Take-Home Pay Works in 2025/26</h2>
                    <p style={pStyle}>
                        UK income tax is calculated on earnings above your Personal Allowance — £12,570 for 2025/26. The system is progressive: only the income that falls within each band gets taxed at that rate, never your full salary.
                    </p>
                    <p style={pStyle}>
                        What makes the UK system heavier than it looks on paper is National Insurance. NI is 8% on earnings between £12,570 and £50,270, then 2% above. It stacks directly on top of income tax, meaning a basic-rate UK earner has a combined 28% marginal rate on most of their taxable income — not 20%.
                    </p>

                    {/* Animated infographic 1 — UK tax breakdown */}
                    <div style={{ margin: "8px 0 32px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <video autoPlay loop muted playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/salary-after-tax-uk-us-2025/tax-breakdown-animated.mp4" type="video/mp4" />
                        </video>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center" as const, padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>UK tax bands 2025/26 — how income tax and NI stack on your salary</p>
                    </div>

                    <h3 style={h3Style}>UK Take-Home Pay Table — 2025/26</h3>
                    <p style={pStyle}>All figures assume England, Wales or Northern Ireland, standard 1257L tax code, employee NI Category A, no student loan, no pension deductions.</p>

                    <div style={{ overflowX: "auto" as const, margin: "0 0 40px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    {["Gross Salary", "Income Tax", "National Insurance", "Take-Home (Annual)", "Take-Home (Monthly)", "Effective Rate"].map((h, i) => (
                                        <th key={i} style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: i === 0 ? accent : "rgba(255,255,255,0.7)", fontWeight: 700, textAlign: "left" as const, whiteSpace: "nowrap" as const }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {UK_TABLE.map((row, i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700 }}>{row.salary}</td>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(244,114,182,0.85)" }}>{row.tax}</td>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(251,191,36,0.85)" }}>{row.ni}</td>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700 }}>{row.net}</td>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(52,211,153,0.7)" }}>{row.monthly}</td>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>{row.rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h3 style={h3Style}>The £100k Trap — the tax band nobody talks about</h3>
                    <p style={pStyle}>
                        Above £100,000, HMRC tapers your Personal Allowance — you lose £1 of the £12,570 allowance for every £2 earned above £100,000. By £125,140, your Personal Allowance is gone entirely. This creates an effective marginal tax rate of 60% on income between £100,000 and £125,140. It is one of the most punishing band quirks in any major tax system, and it catches people who get a pay rise into that range off guard.
                    </p>

                    {/* H2: US */}
                    <h2 style={h2Style}>How US Federal Tax Works in 2025</h2>
                    <p style={pStyle}>
                        The US federal system starts with a standard deduction — $14,600 for single filers and $29,200 for married filing jointly in 2024. You only pay federal income tax on income above this threshold. Seven brackets then apply progressively from 10% to 37%.
                    </p>
                    <p style={pStyle}>
                        On top of income tax, workers pay FICA: Social Security at 6.2% on the first $168,600 of earnings, plus Medicare at 1.45% on all income (with an additional 0.9% above $200,000). Unlike the UK's NI, Social Security has a wage cap — once you earn above $168,600, you stop paying it.
                    </p>

                    <h3 style={h3Style}>US Federal Take-Home Pay Table — 2025 (Single filer)</h3>
                    <p style={pStyle}>Federal tax only. State income tax not included — adds 0–13% depending on state.</p>

                    <div style={{ overflowX: "auto" as const, margin: "0 0 40px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    {["Gross Salary", "Federal Tax", "FICA", "Take-Home (Annual)", "Take-Home (Monthly)", "Effective Rate"].map((h, i) => (
                                        <th key={i} style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: i === 0 ? "#60a5fa" : "rgba(255,255,255,0.7)", fontWeight: 700, textAlign: "left" as const, whiteSpace: "nowrap" as const }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {US_TABLE.map((row, i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700 }}>{row.salary}</td>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(244,114,182,0.85)" }}>{row.tax}</td>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(251,191,36,0.85)" }}>{row.fica}</td>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "#60a5fa", fontWeight: 700 }}>{row.net}</td>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(96,165,250,0.7)" }}>{row.monthly}</td>
                                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>{row.rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* H2: UK vs US side-by-side */}
                    <h2 style={h2Style}>UK vs US: Who Actually Keeps More?</h2>
                    <p style={pStyle}>
                        At equivalent mid-range salaries, US federal take-home edges ahead of UK take-home — largely because National Insurance stacks on top of UK income tax in a way FICA doesn't at those levels. The gap narrows and reverses at very high incomes where the US 37% top bracket bites harder.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "0 0 32px" }}>
                        <div style={{ borderRadius: 16, border: "1px solid rgba(52,211,153,0.2)", background: "rgba(52,211,153,0.04)", overflow: "hidden" }}>
                            <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(52,211,153,0.15)", background: "rgba(52,211,153,0.07)" }}>
                                <p style={{ fontSize: 13, fontWeight: 800, color: accent, margin: 0 }}>🇬🇧 UK — £40,000</p>
                            </div>
                            <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column" as const, gap: 10 }}>
                                {[["Income Tax", "£5,486", "rgba(244,114,182,0.8)"], ["National Insurance", "£2,194", "rgba(251,191,36,0.8)"], ["Take-Home / yr", "£32,320", accent], ["Take-Home / mo", "£2,693", accent]].map(([k, v, c]) => (
                                    <div key={k} style={{ display: "flex", justifyContent: "space-between" as const }}>
                                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{k}</span>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: c as string }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ borderRadius: 16, border: "1px solid rgba(96,165,250,0.2)", background: "rgba(96,165,250,0.04)", overflow: "hidden" }}>
                            <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(96,165,250,0.15)", background: "rgba(96,165,250,0.07)" }}>
                                <p style={{ fontSize: 13, fontWeight: 800, color: "#60a5fa", margin: 0 }}>🇺🇸 US — $50,000</p>
                            </div>
                            <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column" as const, gap: 10 }}>
                                {[["Federal Tax", "$4,016", "rgba(244,114,182,0.8)"], ["FICA", "$3,825", "rgba(251,191,36,0.8)"], ["Take-Home / yr", "$42,159", "#60a5fa"], ["Take-Home / mo", "$3,513", "#60a5fa"]].map(([k, v, c]) => (
                                    <div key={k} style={{ display: "flex", justifyContent: "space-between" as const }}>
                                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{k}</span>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: c as string }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Static infographic — UK vs US salary comparison */}
                    <div style={{ margin: "8px 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <img
                            src="/blog/salary-after-tax-uk-us-2025/uk-us-salary-infographic.png"
                            alt="UK vs US salary after tax comparison 2025/26 — take-home pay breakdown across income levels for both countries"
                            style={{ width: "100%", display: "block" }}
                            loading="lazy"
                        />
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center" as const, padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>UK vs US take-home pay 2025/26 — where your salary actually goes in each country</p>
                    </div>

                    {/* H2: Real examples */}
                    <h2 style={h2Style}>Real Examples — Decoding a Job Offer</h2>
                    <p style={pStyle}>
                        When you receive an offer letter, the number on the page is your gross salary. Here's what that actually means in your bank account each month for some common UK salary levels.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 14, margin: "0 0 32px" }}>
                        {[
                            { label: "£35,000 offer", monthly: "£2,443/month", note: "Income tax: £4,486 · NI: £1,794 · Annual take-home: £28,720" },
                            { label: "£40,000 offer", monthly: "£2,693/month", note: "Income tax: £5,486 · NI: £2,194 · Annual take-home: £32,320" },
                            { label: "£45,000 offer", monthly: "£2,943/month", note: "Income tax: £6,486 · NI: £2,594 · Annual take-home: £35,920" },
                            { label: "£50,000 offer", monthly: "£3,293/month", note: "Income tax: £7,486 · NI: £2,994 · Annual take-home: £39,520" },
                        ].map(({ label, monthly, note }) => (
                            <div key={label} style={{ padding: "18px 22px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "space-between" as const, alignItems: "flex-start" as const, flexWrap: "wrap" as const, gap: 8 }}>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 4px" }}>{label}</p>
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>{note}</p>
                                </div>
                                <p style={{ fontSize: 20, fontWeight: 900, color: accent, margin: 0 }}>{monthly}</p>
                            </div>
                        ))}
                    </div>

                    <p style={pStyle}>
                        The difference between a £35,000 and £45,000 offer is £500 gross per month — but only £500 net. Because you're in the basic rate band for both, every extra £1,000 of gross salary delivers roughly £720 extra after tax and NI. Worth knowing before you negotiate.
                    </p>

                    {/* Animated infographic 2 — UK vs US comparison */}
                    <div style={{ margin: "8px 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <video autoPlay loop muted playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/salary-after-tax-uk-us-2025/uk-us-comparison-animated.mp4" type="video/mp4" />
                        </video>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center" as const, padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>UK vs US salary comparison animated — equivalent incomes, different tax realities</p>
                    </div>

                    {/* H2: How to use the calculator */}
                    <h2 style={h2Style}>How to Use the Salary Calculator</h2>
                    <p style={pStyle}>
                        The <Link href="/tools/salary-calculator" style={{ color: accent, textDecoration: "underline" }}>ToolStack salary calculator</Link> covers both UK PAYE (2024/25 rates) and US Federal tax (2024 brackets). It's free, no account required, and gives you the full breakdown in one click.
                    </p>

                    {/* Tool screenshot — UK result */}
                    <div style={{ margin: "0 0 32px", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <img src="/blog/salary-after-tax-uk-us-2025/screenshot-tool-uk-result.png" alt="ToolStack salary calculator showing UK £50,000 take-home pay — income tax, National Insurance, monthly and annual net breakdown" style={{ width: "100%", display: "block" }} loading="lazy" />
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center" as const, padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>The free ToolStack salary calculator — full UK PAYE breakdown in one click</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, margin: "0 0 32px" }}>
                        {[
                            ["1", "Select your country", "Choose 🇬🇧 UK (Income Tax + NI) or 🇺🇸 US (Federal Tax + FICA)"],
                            ["2", "Enter your gross salary", "Annual or monthly — toggle between the two. Enter the number from your contract or offer letter"],
                            ["3", "Set filing status (US only)", "Single or Married Filing Jointly — this changes your standard deduction and brackets significantly"],
                            ["4", "Hit Calculate", "Your monthly take-home, annual take-home, total deductions, effective tax rate, and a full line-item breakdown appear instantly"],
                        ].map(([n, title, desc]) => (
                            <div key={n} style={{ display: "flex", gap: 16, padding: "16px 20px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", alignItems: "flex-start" as const }}>
                                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: accent }}>{n}</div>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 4px" }}>{title}</p>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div style={{ margin: "40px 0 0", padding: "28px 32px", borderRadius: 20, background: `linear-gradient(135deg, rgba(52,211,153,0.08), rgba(99,102,241,0.06))`, border: `1px solid ${accentBorder}` }}>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Know what you're actually worth before you accept.</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 20px", lineHeight: 1.65 }}>
                            UK and US take-home pay calculated instantly. Free, no signup, covers both countries.
                        </p>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
                            <Link href="/tools/salary-calculator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: accent, color: "#001a0d", fontSize: 14, fontWeight: 800, textDecoration: "none" }}>
                                Open Free Salary Calculator →
                            </Link>
                            <a href="https://bit.ly/aweberjustin" target="_blank" rel="noopener noreferrer sponsored" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                                Build your email list with AWeber →
                            </a>
                        </div>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "14px 0 0" }}>
                            Need help with content strategy and GEO? <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: accent, textDecoration: "underline" }}>AdvertsGPT</a> helps you get found in AI search.
                        </p>
                    </div>
                </div>

                {/* FAQs */}
                <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {FAQS.map((faq, i) => (
                            <div key={i} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}>
                                <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 10, fontSize: 15, lineHeight: 1.4 }}>{faq.question}</p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related */}
                <div style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 20 }}>Related</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                            { href: "/tools/salary-calculator", label: "Free Salary Calculator — UK PAYE + US Federal Take-Home Pay" },
                            { href: "/blog/utm-builder-guide", label: "Free UTM Builder for GA4: Build Campaign URLs in 10 Seconds" },
                            { href: "/blog/aweber-review", label: "AWeber Review 2026: Best Email Tool for Creators?" },
                        ].map(({ href, label }) => (
                            <Link key={href} href={href} style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Back to blog */}
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
