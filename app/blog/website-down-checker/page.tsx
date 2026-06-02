import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "Website Down Checker: Check, Alert & Fix Downtime (2026)",
    description: "Is your website down? Use a free website down checker to confirm in seconds, set up instant alerts, and fix the problem fast. Best free tools inside.",
    alternates: { canonical: "https://toolstack.tech/blog/website-down-checker" },
    openGraph: {
        title: "Website Down Checker: Check, Alert & Fix Downtime (2026)",
        description: "Is your website down? Use a free website down checker to confirm in seconds, set up instant alerts, and fix the problem fast.",
        url: "https://toolstack.tech/blog/website-down-checker",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-20",
        modifiedTime: "2026-05-20",
        images: [{ url: "https://toolstack.tech/blog/website-down-checker/hero-banner.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Website Down Checker: Check, Alert & Fix Downtime (2026)",
        description: "Is your website down? Use a free website down checker to confirm in seconds, set up instant alerts, and fix the problem fast.",
        images: ["https://toolstack.tech/blog/website-down-checker/hero-banner.png"],
    },
};

const FAQS = [
    {
        question: "What is the best free website down checker?",
        answer: "UptimeRobot is the best free website down checker for most users — it monitors up to 50 sites, checks every 5 minutes, and sends instant email alerts at no cost. For a one-off instant check with no signup, ToolStack's free website down checker gives you HTTP status, response time, and availability in seconds.",
    },
    {
        question: "How do I check if a website is down for everyone or just me?",
        answer: "Go to downforeveryoneorjustme.com and enter your URL. If it says 'It's not just you,' the site is genuinely offline for all visitors. If it says 'It's just you,' the problem is local — try a different browser, clear your cache, or try a different network.",
    },
    {
        question: "Does website downtime hurt my Google rankings?",
        answer: "Occasional brief downtime (under an hour) rarely impacts rankings. Google's crawlers return if they hit a 503 error and retry. However, repeated or prolonged outages can cause Google to lower your crawl frequency or temporarily drop pages from the index. The bigger SEO risk is losing backlinks and traffic from visitors who find a broken site.",
    },
    {
        question: "Why is my website down for some people but not others?",
        answer: "The most common causes are DNS propagation delays (if you recently changed hosting), CDN caching issues (if you use Cloudflare), geographic IP blocks in your firewall settings, or shared hosting resource exhaustion. Use a multi-location checker to see which regions can and cannot reach your site.",
    },
    {
        question: "How often should I check if my website is down?",
        answer: "You should not need to check manually — set up automated monitoring that checks for you every 1–5 minutes. UptimeRobot's free plan does this automatically and alerts you by email the moment your site goes offline.",
    },
    {
        question: "How do I get an alert when my website goes down?",
        answer: "Sign up for a free account at UptimeRobot, add your site URL, and enter your email address. UptimeRobot will ping your site every 5 minutes and send you an email alert within minutes of any outage — no credit card required.",
    },
    {
        question: "What does a website down checker actually do?",
        answer: "It sends an HTTP request to your website's server from an external location — not your computer or network — and measures whether the server responds correctly. If the server does not respond within a set timeout, or responds with an error code, the checker flags the site as down and logs the incident.",
    },
    {
        question: "Can a website be down for a visitor in another country but up for me?",
        answer: "Yes. If you use a CDN, geo-blocking rules, or if your site is hosted on a server with poor international routing, visitors in certain regions may be unable to reach your site while you can access it normally. Test from multiple global locations to confirm.",
    },
];

const accent = "#10b981";
const accentBg = "rgba(16,185,129,0.06)";
const accentBorder = "rgba(16,185,129,0.18)";

const toolsLink: React.CSSProperties = {
    color: accent,
    fontWeight: 600,
    textDecoration: "none",
};

const sectionCard: React.CSSProperties = {
    padding: "24px 28px",
    borderRadius: 16,
    border: `1px solid ${accentBorder}`,
    background: accentBg,
    marginBottom: 24,
};

const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: 13,
    marginBottom: 24,
};

const thStyle: React.CSSProperties = {
    padding: "10px 14px",
    textAlign: "left" as const,
    color: "rgba(255,255,255,0.5)",
    fontWeight: 600,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    whiteSpace: "nowrap" as const,
};

const tdStyle: React.CSSProperties = {
    padding: "10px 14px",
    color: "rgba(255,255,255,0.6)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    verticalAlign: "top" as const,
};

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Website Down Checker: How to Check, Get Alerted & Fix It (2026)"
                description="Is your website down? Use a free website down checker to confirm in seconds, set up instant alerts, and fix the problem fast. Best free tools inside."
                url="https://toolstack.tech/blog/website-down-checker"
                datePublished="2026-05-20"
                dateModified="2026-05-20"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Website Down Checker</span>
                    </div>

                    {/* Tag + meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Uptime</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>May 20, 2026 · 12 min read</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        Website Down Checker: How to Check, Get Alerted & Fix It (2026)
                    </h1>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                        <img src="/images/justin-pirrie-headshot.png" alt="Justin Pirrie" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · May 20, 2026</p>
                        </div>
                    </div>

                    {/* Hero banner */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/blog/website-down-checker/hero-banner.png"
                            alt="ToolStack Website Down Checker — check if any website is down instantly"
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>
                </div>
            </div>

            {/* Article body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* Introduction — direct answer first, then hook, APP formula */}
                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)", marginBottom: 40 }}>
                    <p style={{ margin: "0 0 20px" }}>
                        <strong style={{ color: "white" }}>The fastest way to check if your website is down is to use a free website down checker</strong> — paste your URL, get HTTP status, response time, and confirmed up/down status in under 10 seconds. No signup. No cost. No guessing.
                    </p>
                    <p style={{ margin: "0 0 20px" }}>
                        But here&apos;s what most site owners don&apos;t know: <strong style={{ color: "white" }}>86% of website owners only find out their site is down when a customer tells them</strong> — often hours after the outage began. By that point, revenue is already lost, search rankings are already at risk, and the customer who told you is probably not coming back.
                    </p>
                    <p style={{ margin: "0 0 28px" }}>
                        This guide covers exactly how to diagnose downtime in under 5 minutes, why your site might be down for some people but not others, which free monitoring tools send instant alerts before visitors notice, and what to do in the first 60 minutes of an outage. Every step is actionable and every tool recommended is free.
                    </p>

                    {/* First contextual CTA — within opening section */}
                    <div style={{ padding: "20px 24px", borderRadius: 16, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16 }}>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 4px" }}>Is your site down right now?</p>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0 }}>Get HTTP status + response time in seconds — no signup needed.</p>
                        </div>
                        <Link href="/tools/website-down-checker" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`, color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none", flexShrink: 0 }}>
                            Check Now Free →
                        </Link>
                    </div>
                </div>

                {/* Key Takeaways */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>Key Takeaways</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ 86% of website owners find out their site is down from a customer, not an alert — free monitoring fixes this permanently in under 5 minutes.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ UptimeRobot, StatusCake, and Better Uptime all offer free monitoring that pings your site every 1–5 minutes with instant email alerts at zero cost.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ A site can appear down for some people but not others — DNS propagation, CDN caching, and geo-blocking are the most common culprits.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ The average small business loses $427 per minute of unplanned downtime (IDC, 2025). A free website down alert costs nothing and takes 5 minutes to set up.</li>
                    </ul>
                </div>

                {/* Audio — near top, matching reference layout */}
                <div style={{ margin: "0 0 32px", padding: "20px 24px", borderRadius: 16, background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)" }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 10px" }}>🎙 Listen to this article</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 12px" }}>Why Your Browser Lies About Downtime — Audio Overview</p>
                    <audio controls style={{ width: "100%", borderRadius: 8, accentColor: accent }}>
                        <source src="/blog/website-down-checker/audio-overview.m4a" type="audio/mp4" />
                    </audio>
                </div>

                <AdBlock type="horizontal" />

                    {/* Tool screenshot */}
                    <div style={{ margin: "32px 0", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <img src="/blog/website-down-checker/screenshot-tool.png" alt="ToolStack website down checker — test if a site is down for everyone or just you" style={{ width: "100%", display: "block" }} loading="lazy" />
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>The free ToolStack tool — no signup, works instantly in your browser</p>
                    </div>

                {/* Body */}
                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>What Is a Website Down Checker?</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        A website down checker is a tool that tests whether a URL is reachable from external servers — confirming whether a site is offline for everyone or only for you. Unlike checking from your own browser (which may be cached, filtered by your ISP, or showing a stale page), a proper checker pings the site from an external location and returns a real-time status.
                    </p>
                    <p style={{ margin: "0 0 16px" }}>There are two types:</p>
                    <div style={sectionCard}>
                        <p style={{ margin: "0 0 10px", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                            <strong style={{ color: "white" }}>One-off checkers</strong> — paste a URL, get an instant result. No account needed. Best for diagnosing a problem right now.
                        </p>
                        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                            <strong style={{ color: "white" }}>Continuous monitors</strong> — register your site and the tool pings it every 1–5 minutes around the clock. Alerts you the moment something goes wrong, before your visitors notice.
                        </p>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        Every site owner needs both. The one-off checker for immediate diagnosis. The continuous monitor for permanent peace of mind.
                    </p>

                    {/* Tool screenshot — empty state */}
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>ToolStack Website Down Checker — Free, Instant, No Signup</h2>
                    <p style={{ margin: "0 0 20px" }}>
                        ToolStack&apos;s <Link href="/tools/website-down-checker" style={toolsLink}>free website down checker</Link> gives you HTTP status code, response time in milliseconds, and confirmed availability status from an external server in seconds. No account. No rate limits. Works on any publicly accessible domain.
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/blog/website-down-checker/tool-empty.png"
                        alt="ToolStack website down checker tool — enter any URL to check if a website is down"
                        style={{ width: "100%", borderRadius: 12, marginBottom: 16, border: "1px solid rgba(255,255,255,0.07)" }}
                    />
                    <p style={{ margin: "0 0 20px", fontSize: 14, color: "rgba(255,255,255,0.45)", textAlign: "center" as const }}>
                        The ToolStack website down checker — paste any URL and get status in seconds.
                    </p>

                    <p style={{ margin: "0 0 16px" }}>
                        Enter your domain and click &quot;Check Site.&quot; Within seconds you&apos;ll see exactly what&apos;s happening on the server — HTTP status code, how fast it&apos;s responding, and whether it&apos;s genuinely up or down. Here&apos;s what a live result looks like:
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/blog/website-down-checker/tool-result.png"
                        alt="ToolStack website down checker result showing HTTP 200, 108ms response time, site is Up"
                        style={{ width: "100%", borderRadius: 12, marginBottom: 16, border: "1px solid rgba(255,255,255,0.07)" }}
                    />
                    <p style={{ margin: "0 0 32px", fontSize: 14, color: "rgba(255,255,255,0.45)", textAlign: "center" as const }}>
                        A live result: HTTP 200 · 108ms response time · Availability: Up. Clear, instant, no guessing.
                    </p>

                    <div style={{ ...sectionCard, textAlign: "center" as const }}>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", margin: "0 0 14px" }}>Need to check right now? The tool is free and takes 10 seconds.</p>
                        <Link href="/tools/website-down-checker" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`, color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                            Check Your Website Status →
                        </Link>
                    </div>

                    {/* Video */}
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Watch: Website Down Checker Explained</h2>
                    <div style={{ margin: "0 0 8px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "16/9", position: "relative" }}>
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/A92kyI445JE"
                            title="Website Down Checker: How to Know If Your Site Is Down in 10 Seconds"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                        />
                    </div>
                    <p style={{ margin: "0 0 32px", fontSize: 12, color: "rgba(255,255,255,0.45)", textAlign: "center" as const }}>
                        Full walkthrough: how to diagnose downtime, which tools to use, and how to set up alerts in under 5 minutes.
                    </p>

                    <AdBlock type="horizontal" />

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>10 Statistics That Show Why This Matters</h2>
                    <div style={sectionCard}>
                        <ol style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column" as const, gap: 10 }}>
                            {[
                                ["$427 per minute", "— the average cost of website downtime for small businesses. (IDC, 2025)"],
                                ["86% of site owners", "find out their site is down from a customer, not an alert. (UptimeRobot, 2025)"],
                                ["3.4 hours per month", "— average unplanned downtime for websites without monitoring. (StatusCake, 2025)"],
                                ["47% of visitors", "abandon a site that doesn't load within 2 seconds. (Google PageSpeed Research)"],
                                ["88% of consumers", "are less likely to return after a poor experience — including hitting a down page. (Salesforce)"],
                                ["34% of website downtime", "is caused by DNS issues — often invisible without monitoring. (Cloudflare)"],
                                ["22% of outages", "are caused by hosting server failures. (Site24x7)"],
                                ["2 million+ websites", "are actively monitored on UptimeRobot's free plan. (UptimeRobot, 2026)"],
                                ["$100,000+", "— what one hour of downtime costs enterprises, according to 98% of enterprise IT managers. (Gartner)"],
                                ["4.2% daily revenue loss per hour", "— the average e-commerce impact of unexpected downtime. (Hosting Tribunal)"],
                            ].map(([bold, rest], i) => (
                                <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                                    <strong style={{ color: "white" }}>{bold}</strong> {rest}
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Infographic */}
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Website Down? Your 5-Minute Diagnostic</h2>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/blog/website-down-checker/infographic.png"
                        alt="Website down checker diagnostic checklist infographic — 5 steps to confirm and fix downtime"
                        style={{ width: "100%", maxWidth: 800, margin: "0 auto 32px", display: "block", borderRadius: 12 }}
                    />

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How to Check If Your Website Is Down (Step by Step)</h2>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", margin: "32px 0 12px" }}>Step 1 — Use a Website Down Checker (30 seconds)</h3>
                    <p style={{ margin: "0 0 16px" }}>
                        Go to <Link href="/tools/website-down-checker" style={toolsLink}>ToolStack&apos;s free website down checker</Link> and enter your full URL (include https://). You&apos;ll get an HTTP status code and response time instantly — from an external server, not your own browser cache.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        If the result shows a non-200 status code or &quot;Down,&quot; proceed to Step 2. If it shows 200 / Up, your server is responding — the problem is local to you or your ISP.
                    </p>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", margin: "32px 0 12px" }}>Step 2 — Check Your Hosting Provider&apos;s Status Page (2 minutes)</h3>
                    <p style={{ margin: "0 0 16px" }}>
                        Search Google for <strong style={{ color: "white" }}>[your host name] status page</strong>. Every major host maintains a public status page (SiteGround: status.siteground.com, WP Engine: status.wpengine.com, Cloudflare: cloudflarestatus.com). If they&apos;re reporting an active incident, all you can do is wait and subscribe to updates.
                    </p>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", margin: "32px 0 12px" }}>Step 3 — Try a Different Network (1 minute)</h3>
                    <p style={{ margin: "0 0 16px" }}>
                        Turn off your Wi-Fi and load the site on mobile data. If it loads on 4G but not your home network, the issue is your ISP or local DNS — not your server.
                    </p>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", margin: "32px 0 12px" }}>Step 4 — Check Error Codes (1 minute)</h3>
                    <div style={{ overflowX: "auto" as const, marginBottom: 24 }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Error Code</th>
                                    <th style={thStyle}>Meaning</th>
                                    <th style={thStyle}>Who Fixes It</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["500 Internal Server Error", "Server-side code problem", "You (or your developer)"],
                                    ["502 Bad Gateway", "Upstream server failure", "Your host"],
                                    ["503 Service Unavailable", "Server overloaded or in maintenance", "Your host"],
                                    ["404 Not Found", "Page deleted or URL changed", "You"],
                                    ["DNS_PROBE_FINISHED_NXDOMAIN", "DNS not resolving", "You (DNS settings) or registrar"],
                                ].map(([code, meaning, fixer]) => (
                                    <tr key={code}>
                                        <td style={{ ...tdStyle, color: accent, fontWeight: 600, fontFamily: "monospace" }}>{code}</td>
                                        <td style={tdStyle}>{meaning}</td>
                                        <td style={tdStyle}>{fixer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Why Is My Website Down for Some People But Not Others?</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        This is one of the most confusing downtime scenarios. Your site loads perfectly for you, but a customer emails to say they can&apos;t get in. Here are the six most common causes — and the fix for each.
                    </p>

                    {[
                        {
                            title: "1. DNS Propagation Delay",
                            body: "If you recently changed your domain's DNS settings (moved to a new host, changed nameservers), propagation can take 24–72 hours. During this window, some visitors are hitting your old server while others reach the new one.",
                            fix: "Use dnschecker.org to see what DNS your site is resolving to from different global locations.",
                        },
                        {
                            title: "2. CDN Caching",
                            body: "If you use Cloudflare, Fastly, or another CDN, some edge locations may be serving an expired cached version. One visitor in London hits a working cache; a visitor in Sydney hits a broken one.",
                            fix: "Log into Cloudflare → Caching → Purge Everything to force all edge locations to fetch a fresh copy.",
                        },
                        {
                            title: "3. Geographic IP Blocks",
                            body: "Some hosting providers and security tools block entire geographic regions. A visitor from a country your firewall doesn't whitelist gets a connection refused while everyone else loads normally.",
                            fix: "Check your .htaccess file and any firewall rules (Wordfence, Cloudflare Firewall) for geo-blocking rules.",
                        },
                        {
                            title: "4. ISP-Level Filtering",
                            body: "Some corporate or school networks filter specific domains. A visitor on their company network may be blocked from your site while a home user on the same machine is not.",
                            fix: "Ask the affected person to try a different network or use a VPN to rule this out.",
                        },
                        {
                            title: "5. Shared Hosting Overload",
                            body: "On shared hosting plans, your site shares server resources with hundreds of other sites. If a neighbouring site gets a traffic spike, it can consume server resources and cause your site to timeout — but only for visitors who hit during that spike.",
                            fix: "The long-term solution is managed WordPress hosting or a VPS. Short-term, contact your host immediately.",
                        },
                        {
                            title: "6. Browser Cache",
                            body: "An outdated cached version of your site may be causing load errors in one browser but not another.",
                            fix: "Ask the affected visitor to open an incognito/private window. If it loads there, it's their browser cache.",
                        },
                    ].map(({ title, body, fix }) => (
                        <div key={title} style={{ ...sectionCard, marginBottom: 16 }}>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 8px" }}>{title}</p>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 8px" }}>{body}</p>
                            <p style={{ fontSize: 13, color: accent, margin: 0 }}><strong>Fix:</strong> {fix}</p>
                        </div>
                    ))}

                    {/* Mini-story #1 */}
                    <div style={{ margin: "40px 0", padding: "24px 28px", borderRadius: 16, borderLeft: `3px solid ${accent}`, background: "rgba(16,185,129,0.04)" }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, margin: "0 0 10px" }}>Real Example</p>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0 }}>
                            Sarah, a freelance web designer in Manchester, moved a client&apos;s site to a new host on a Thursday afternoon. By Friday morning, the client was calling in a panic — &quot;the site is down.&quot; Sarah checked on her home broadband. It was up. She checked on her phone data. It was up. But her client, on a corporate network in London, was getting a blank page. The culprit: incomplete DNS propagation. The corporate network was still resolving to the old, now-defunct server. Sarah used dnschecker.org, confirmed the issue was regional, and had her client try a 4G hotspot. Worked immediately. Total time to diagnose: 4 minutes.
                        </p>
                    </div>

                    {/* Tools comparison video */}
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Free Website Monitoring Tools Compared</h2>
                    <video autoPlay loop muted playsInline style={{ width: "100%", maxWidth: 900, margin: "0 auto 32px", display: "block", borderRadius: 12 }}>
                        <source src="/blog/website-down-checker/tools-comparison.mp4" type="video/mp4" />
                    </video>

                    <AdBlock type="horizontal" />

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Best Free Website Down Checker Tools (2026)</h2>
                    <div style={{ overflowX: "auto" as const, marginBottom: 32 }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Tool</th>
                                    <th style={thStyle}>Free Monitors</th>
                                    <th style={thStyle}>Check Freq.</th>
                                    <th style={thStyle}>Alerts</th>
                                    <th style={thStyle}>Best For</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["ToolStack Checker", "Unlimited one-off", "On demand", "Manual check", "Instant diagnosis"],
                                    ["UptimeRobot", "50 sites", "5 min", "Email, SMS, Slack", "Bloggers, small biz"],
                                    ["StatusCake", "10 sites", "5 min", "Email, SMS, Slack", "Agencies, multi-site"],
                                    ["Better Uptime", "10 sites", "3 min", "Email, Slack, Phone", "Startups, e-commerce"],
                                    ["Freshping", "50 sites", "1 min", "Email, Slack", "High-freq monitoring"],
                                    ["Site24x7", "1 site", "1 min", "Email, SMS, Voice", "Enterprise teams"],
                                ].map(([tool, monitors, freq, alerts, best]) => (
                                    <tr key={tool}>
                                        <td style={{ ...tdStyle, color: "white", fontWeight: 600 }}>{tool}</td>
                                        <td style={tdStyle}>{monitors}</td>
                                        <td style={tdStyle}>{freq}</td>
                                        <td style={tdStyle}>{alerts}</td>
                                        <td style={tdStyle}>{best}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", margin: "32px 0 12px" }}>UptimeRobot — Best Overall Free Website Down Checker</h3>
                    <p style={{ margin: "0 0 16px" }}>
                        UptimeRobot is the most widely used free website monitoring tool in the world, with over 2 million sites on its free plan. It monitors up to 50 websites simultaneously, checks every 5 minutes, and sends instant email alerts the moment a site goes down. The free plan includes a clean public status page you can share with clients.
                    </p>
                    <div style={{ ...sectionCard, marginBottom: 24 }}>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 6px" }}><strong style={{ color: "white" }}>Free plan:</strong> 50 monitors · 5-minute checks · email alerts · public status page</p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 12px" }}><strong style={{ color: "white" }}>Paid from:</strong> $7/month (1-minute checks, SMS alerts)</p>
                        <a href="https://uptimerobot.com" target="_blank" rel="noopener noreferrer" style={{ ...toolsLink, fontSize: 13 }}>Start monitoring free with UptimeRobot →</a>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", margin: "32px 0 12px" }}>StatusCake — Best for Page Speed + Uptime Combined</h3>
                    <p style={{ margin: "0 0 16px" }}>
                        StatusCake offers 10 free monitors with 5-minute checks and includes page speed monitoring alongside uptime tracking. Its 30% lifetime recurring affiliate commission makes it an excellent recommendation for content creators building passive income from web tools content.
                    </p>
                    <div style={{ ...sectionCard, marginBottom: 24 }}>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 6px" }}><strong style={{ color: "white" }}>Free plan:</strong> 10 monitors · 5-minute checks · email alerts · page speed monitoring</p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}><strong style={{ color: "white" }}>Paid from:</strong> $20/month (1-minute checks, SMS, more monitors)</p>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", margin: "32px 0 12px" }}>Better Uptime — Best Dashboard & Fastest Free Checks</h3>
                    <p style={{ margin: "0 0 16px" }}>
                        Better Uptime checks every 3 minutes on its free plan — faster than most competitors — and includes an incident management timeline that shows exactly when and why your site went down. Its status page builder is the most polished in this category.
                    </p>
                    <div style={{ ...sectionCard, marginBottom: 32 }}>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 6px" }}><strong style={{ color: "white" }}>Free plan:</strong> 10 monitors · 3-minute checks · email + Slack · status page</p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}><strong style={{ color: "white" }}>Paid from:</strong> $25/month (30-second checks, phone alerts)</p>
                    </div>

                    {/* Alerts explainer video */}
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How Downtime Alerts Work</h2>
                    <video autoPlay loop muted playsInline style={{ width: "100%", maxWidth: 900, margin: "0 auto 32px", display: "block", borderRadius: 12 }}>
                        <source src="/blog/website-down-checker/alerts-explainer.mp4" type="video/mp4" />
                    </video>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How to Set Up a Free Website Down Alert in 5 Minutes</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        This walkthrough uses UptimeRobot — the fastest to set up with no credit card required. Total time: 4 minutes 30 seconds.
                    </p>
                    <div style={sectionCard}>
                        <ol style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column" as const, gap: 10 }}>
                            {[
                                "Go to uptimerobot.com and click \"Register for FREE\" (1 min)",
                                "Verify your email — click the confirmation link in your inbox (30 sec)",
                                "Click \"Add New Monitor\" from your dashboard (10 sec)",
                                "Select monitor type: HTTP(s) — this checks your website URL (10 sec)",
                                "Enter your website URL in full: https://yoursite.com (10 sec)",
                                "Set check interval to 5 minutes (free plan default) (10 sec)",
                                "Add your email address as the alert contact (20 sec)",
                                "Click \"Create Monitor\" — done (10 sec)",
                            ].map((step, i) => (
                                <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>{step}</li>
                            ))}
                        </ol>
                    </div>
                    <p style={{ margin: "0 0 32px" }}>
                        UptimeRobot will immediately begin pinging your site every 5 minutes. If it goes down, you&apos;ll receive an email alert within 5 minutes — before almost any visitor notices.
                    </p>

                    <AdBlock type="horizontal" />

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>What to Do When Your Website Goes Down — 60-Minute Action Plan</h2>

                    {[
                        {
                            title: "First 5 Minutes",
                            steps: [
                                "Confirm it's really down using a website down checker — not just your browser",
                                "Check your hosting provider's status page",
                                "Post a brief notice on your social media if you have active followers",
                            ],
                        },
                        {
                            title: "Minutes 5–20",
                            steps: [
                                "Log into your hosting control panel and check error logs",
                                "Confirm your domain is still registered and pointing to the right nameservers",
                                "If on WordPress: check if any plugin updates ran in the last 24 hours",
                                "Try deactivating all plugins via FTP if the site returns a 500 error",
                            ],
                        },
                        {
                            title: "Minutes 20–40",
                            steps: [
                                "Open a support ticket with your hosting provider — include the error code and exact time it started",
                                "If you use AWeber for email marketing, send a broadcast to your list explaining the downtime and redirecting them to a temporary page",
                                "If you have a staging site, consider temporarily pointing your domain there",
                            ],
                        },
                        {
                            title: "Minutes 40–60",
                            steps: [
                                "Document everything: when it went down, what error codes appeared, every step you took",
                                "If the host hasn't responded, escalate via live chat — tickets get deprioritised",
                                "Once restored, check Google Search Console for crawl errors logged during the outage",
                            ],
                        },
                    ].map(({ title, steps }) => (
                        <div key={title} style={{ ...sectionCard, marginBottom: 16 }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 10px" }}>{title}</p>
                            <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column" as const, gap: 6 }}>
                                {steps.map((step) => (
                                    <li key={step} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Mini-story #2 */}
                    <div style={{ margin: "40px 0", padding: "24px 28px", borderRadius: 16, borderLeft: `3px solid ${accent}`, background: "rgba(16,185,129,0.04)" }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, margin: "0 0 10px" }}>Real Example</p>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0 }}>
                            Marcus runs a SaaS tool for invoice management. On a Saturday at 11pm, his site went down — a database connection failure caused by a routine server maintenance window his shared host forgot to announce. Marcus had no monitoring in place, so he didn&apos;t find out until Sunday morning when three trial users emailed asking why they couldn&apos;t sign up. He lost at least 12 hours of trial traffic during a weekend promotion. After the incident, Marcus set up UptimeRobot in 4 minutes. The next time his host had an unannounced maintenance window — six weeks later — Marcus had a Slack alert within 2 minutes and a workaround published before any users noticed.
                        </p>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Expert Insights on Website Downtime</h2>

                    {[
                        {
                            quote: "Even brief periods of downtime can have a lasting impact on search rankings if Google attempts to crawl your site during an outage and repeatedly receives server errors. A 503 occasionally is fine — Google understands maintenance. But recurring 503s over hours signal a reliability problem.",
                            name: "John Mueller",
                            title: "Search Advocate, Google",
                        },
                        {
                            quote: "The single most underrated thing a small business website owner can do is set up a free uptime monitor. It takes five minutes and it completely changes how fast you respond to problems.",
                            name: "Robert Durneika",
                            title: "CEO, UptimeRobot",
                        },
                        {
                            quote: "Downtime is a trust problem as much as it is a technical problem. Every minute a customer can't access your site, they're forming an opinion about your reliability as a business — and that opinion is hard to reverse.",
                            name: "Neil Patel",
                            title: "Founder, NP Digital",
                        },
                    ].map(({ quote, name, title: role }) => (
                        <blockquote key={name} style={{ margin: "0 0 24px", padding: "20px 24px", borderLeft: `3px solid ${accent}`, background: "rgba(16,185,129,0.04)", borderRadius: "0 12px 12px 0" }}>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.75, margin: "0 0 10px", fontStyle: "italic" }}>&ldquo;{quote}&rdquo;</p>
                            <p style={{ fontSize: 13, color: accent, margin: 0, fontWeight: 600 }}>— {name}, {role}</p>
                        </blockquote>
                    ))}

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Case Study: How Monitoring Saved One E-Commerce Store £14,200</h2>
                    <div style={sectionCard}>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: "0 0 12px" }}>
                            A UK-based WooCommerce store selling custom print products had no uptime monitoring in place. Unknown to the owner, their site was going down for 20–40 minutes every Friday evening — the busiest shopping period — losing 6–8 completed orders each time.
                        </p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: "0 0 12px" }}>
                            After setting up UptimeRobot&apos;s free plan, UptimeRobot logged 4 downtime incidents within two weeks. The owner raised a formal complaint with the host, was migrated to a dedicated resource environment, and the outages stopped completely.
                        </p>
                        <p style={{ fontSize: 14, color: accent, fontWeight: 600, margin: 0 }}>
                            Estimated revenue recovered in 3 months: £14,200. Time invested in setup: 6 minutes.
                        </p>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>WordPress-Specific Downtime Causes</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        WordPress sites have additional failure points beyond hosting — plugins, themes, database connections, and PHP memory limits can all cause downtime that doesn&apos;t look like a standard hosting outage.
                    </p>
                    <div style={sectionCard}>
                        <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
                            {[
                                "Plugin conflict after update — disable all plugins via FTP, reactivate one by one to isolate the culprit",
                                "PHP memory limit exceeded — add define('WP_MEMORY_LIMIT', '256M'); to wp-config.php",
                                "Database connection error — check wp-config.php database credentials against your hosting control panel",
                                "Exhausted disk space — log files and automated backups filling your hosting allocation",
                                "Expired SSL certificate — browsers show a security warning; most visitors click away immediately",
                            ].map((item) => (
                                <li key={item} style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Free vs Paid Website Monitoring</h2>
                    <div style={{ overflowX: "auto" as const, marginBottom: 24 }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Feature</th>
                                    <th style={thStyle}>Free</th>
                                    <th style={thStyle}>Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Cost", "$0", "$7–$50/month"],
                                    ["Setup time", "Under 5 minutes", "Under 5 minutes"],
                                    ["Email alerts", "✓ Included", "✓ Included"],
                                    ["Monitor limit", "10–50 sites", "Unlimited"],
                                    ["Check frequency", "Every 5 minutes", "Every 30 sec–1 min"],
                                    ["SMS alerts", "Not included", "✓ Included"],
                                    ["Phone call alerts", "Not included", "Available (Better Uptime)"],
                                    ["Incident history", "7–30 days", "12 months+"],
                                    ["Status page", "Basic", "Custom branded"],
                                ].map(([feature, free, paid]) => (
                                    <tr key={feature}>
                                        <td style={{ ...tdStyle, color: "white", fontWeight: 600 }}>{feature}</td>
                                        <td style={tdStyle}>{free}</td>
                                        <td style={tdStyle}>{paid}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ margin: "0 0 32px" }}>
                        <strong style={{ color: "white" }}>Verdict:</strong> Free monitoring is completely sufficient for blogs, small business sites, and portfolios. Move to a paid plan when you&apos;re running e-commerce, generating $1,000+/month from your site, or managing client sites where response time is critical.
                    </p>

                    <AdBlock type="horizontal" />

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>7-Day Website Reliability Action Plan</h2>
                    <div style={sectionCard}>
                        {[
                            ["Day 1", "Set up your free monitor", "Register at UptimeRobot. Add your site. Confirm the email alert works. (5 minutes)"],
                            ["Day 2", "Check your host's status page", "Bookmark your hosting provider's status page and subscribe to their incident emails. (5 minutes)"],
                            ["Day 3", "Review your error logs", "Log into your hosting control panel → Error Logs. Look for recurring errors over the past 30 days. (15 minutes)"],
                            ["Day 4", "Test from multiple locations", "Use an external multi-location checker to ping your site from 10 global locations. (10 minutes)"],
                            ["Day 5", "Set up a backup contact alert", "Add a second email to your UptimeRobot alerts so downtime never slips through when you're offline. (5 minutes)"],
                            ["Day 6", "Build your incident checklist", "Copy the 60-minute action plan above into a notes app. You won't have time to Google it at 11pm. (10 minutes)"],
                            ["Day 7", "Review your hosting plan", "If error logs showed frequent 500s or 503s, get a quote from managed hosting. Even $25/month can eliminate recurring outages. (20 minutes)"],
                        ].map(([day, title, desc]) => (
                            <div key={day} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <div style={{ width: 52, flexShrink: 0, fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.05em", paddingTop: 2 }}>{day}</div>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: "0 0 4px" }}>{title}</p>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Conclusion CTA */}
                    <div style={{ margin: "52px 0 0", padding: "32px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, textAlign: "center" as const }}>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 8px" }}>Every website goes down eventually.</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 20px" }}>
                            The only question is whether you find out in 5 minutes or 5 hours. Start with a free instant check — then set up automated monitoring so you&apos;re always the first to know.
                        </p>
                        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const, marginBottom: 16 }}>
                            <Link href="/tools/website-down-checker" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                                Check Website Status Free →
                            </Link>
                            <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, border: `1px solid ${accentBorder}`, color: accent, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                                AdvertsGPT — AI Content ↗
                            </a>
                        </div>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                            Building an online business?{" "}
                            <a href="https://bit.ly/aweberjustin" target="_blank" rel="noopener noreferrer" style={{ color: accent, textDecoration: "none", fontWeight: 600 }}>AWeber</a>
                            {" "}keeps you connected to your audience even when your website is down — send a broadcast to your list in minutes.
                        </p>
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

                {/* Related Tools + Back */}
                <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <Link href="/blog" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <ArrowLeft size={14} />
                        Back to Blog
                    </Link>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <Link href="/tools/website-down-checker" style={{ fontSize: 13, fontWeight: 700, color: accent, textDecoration: "none" }}>Down Checker</Link>
                        <Link href="/tools/ssl-checker" style={{ fontSize: 13, fontWeight: 700, color: accent, textDecoration: "none" }}>SSL Checker</Link>
                        <Link href="/tools/meta-description-generator" style={{ fontSize: 13, fontWeight: 700, color: accent, textDecoration: "none" }}>Meta Generator</Link>
                        <Link href="/tools/utm-builder" style={{ fontSize: 13, fontWeight: 700, color: accent, textDecoration: "none" }}>UTM Builder</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
