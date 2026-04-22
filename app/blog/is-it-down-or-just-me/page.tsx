import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "Is It Down or Just Me? How to Check if a Website Is Down | ToolStack",
    description: "Can't access a website? Learn how to tell if it's down for everyone or just you, what HTTP status codes mean, and how to diagnose connection problems in under a minute.",
    alternates: { canonical: "https://toolstack.tech/blog/is-it-down-or-just-me" },
    openGraph: {
        title: "Is It Down or Just Me? How to Check if a Website Is Down",
        description: "Learn how to tell if a website is down for everyone or just you, and what to do about it.",
        url: "https://toolstack.tech/blog/is-it-down-or-just-me",
        siteName: "ToolStack",
        type: "article",
    },
};

const FAQS = [
    {
        question: "How can I tell if a website is down for everyone?",
        answer: "Use a website down checker like the free tool at ToolStack. It sends a request to the site's server from an external location. If it gets a response, the site is up and the issue is on your end. If it can't connect, the site is down for everyone."
    },
    {
        question: "What does HTTP 503 mean?",
        answer: "HTTP 503 means 'Service Unavailable' — the server received your request but can't handle it right now, usually due to overload or maintenance. The site is technically reachable (unlike a full outage) but not serving content. It usually resolves within minutes to hours."
    },
    {
        question: "Why is a site down for me but up for others?",
        answer: "Your ISP's DNS servers may have a stale or incorrect record for the domain. Your local network, firewall, or browser cache might be blocking the connection. The site might be geo-blocked in your region. Try flushing your DNS cache (ipconfig /flushdns on Windows, sudo dscacheutil -flushcache on Mac) or switching to a different network."
    },
    {
        question: "What should I do while waiting for a site to come back up?",
        answer: "If the site is genuinely down, there's little you can do beyond waiting. Check the site's official social media for incident updates. For critical services, check their status page (most companies have one at status.example.com). If it's a service you pay for and the downtime is significant, document the outage duration for potential service credits."
    },
];

const accent = "#22d3ee";
const accentBg = "rgba(34,211,238,0.06)";
const accentBorder = "rgba(34,211,238,0.18)";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Is It Down or Just Me? How to Check if a Website Is Down"
                description="Learn how to tell if a website is down for everyone or just you, what HTTP status codes mean, and how to diagnose connection problems."
                url="https://toolstack.tech/blog/is-it-down-or-just-me"
                datePublished="2026-04-22"
                dateModified="2026-04-22"
                faqs={FAQS}
            />

            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Is It Down or Just Me</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Dev</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 22, 2026 · 5 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        Is It Down or Just Me? How to Check if a Website Is Down
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · April 22, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Use an external checker to confirm whether a site is down for everyone or just you.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ If it's just you: flush DNS, clear cache, or try another network.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Check instantly with the free <Link href="/tools/website-down-checker" style={{ color: accent }}>Website Down Checker</Link>.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>
                    <p style={{ margin: "0 0 22px" }}>
                        You try to open a website and nothing loads. Before you spend 20 minutes troubleshooting your router or clearing your browser cache, you need to answer one question first: is the site actually down, or is the problem on your end?
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        The <Link href="/tools/website-down-checker" style={{ color: accent }}>Website Down Checker</Link> answers this in seconds — enter any URL and it sends a fresh request from an external server, returning the HTTP status code and response time.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Step 1: Check From an External Source</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Your browser can only tell you that it can't reach the site. It can't tell you whether the server is down for everyone or whether the problem is between you and the server. An external down checker sends a request from a completely separate network, bypassing your ISP, DNS, and local connection entirely.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        If the checker returns a successful response (HTTP 200), the site is up — the issue is on your side. If the checker also fails to connect, the site is genuinely down.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>HTTP Status Codes Explained</h2>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Code</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Meaning</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>Is site up?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["200", "OK — request succeeded", "Yes ✓"],
                                    ["301/302", "Redirect — site is up, redirecting you", "Yes ✓"],
                                    ["403", "Forbidden — server up, blocking access", "Yes (but blocked)"],
                                    ["404", "Not Found — server up, page missing", "Server yes, page no"],
                                    ["500", "Internal Server Error", "No ✗"],
                                    ["502", "Bad Gateway — upstream server failed", "No ✗"],
                                    ["503", "Service Unavailable — overloaded/maintenance", "No ✗"],
                                    ["—", "No response — server unreachable", "No ✗"],
                                ].map(([code, meaning, up], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontWeight: 700, color: accent }}>{code}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>{meaning}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{up}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>If the Site Is Up But You Can't Access It</h2>
                    <p style={{ margin: "0 0 16px" }}>The problem is on your end. Try these fixes in order:</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 14 }}>
                        {[
                            ["Flush your DNS cache", "Windows: open Command Prompt and run ipconfig /flushdns. Mac: run sudo dscacheutil -flushcache in Terminal. This clears stale DNS records that might be pointing to the wrong server."],
                            ["Try a different browser", "Rules out browser-specific cache or extension issues."],
                            ["Disable your VPN", "VPNs can sometimes block certain domains or route traffic through servers that have issues with the site."],
                            ["Switch networks", "Try your mobile data instead of Wi-Fi. If it loads on mobile data, the issue is with your home network or ISP."],
                            ["Check your hosts file", "On rare occasions, a local hosts file entry can block a domain. Advanced users can check at C:\\Windows\\System32\\drivers\\etc\\hosts (Windows) or /etc/hosts (Mac/Linux)."],
                        ].map(([label, desc]) => (
                            <li key={label as string} style={{ paddingLeft: 20, position: "relative" as const }}>
                                <span style={{ position: "absolute" as const, left: 0, color: accent }}>→</span>
                                <strong style={{ color: "rgba(255,255,255,0.9)" }}>{label}</strong> — {desc}
                            </li>
                        ))}
                    </ul>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>If the Site Is Down for Everyone</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        There's nothing you can do except wait. Most outages are resolved within minutes to hours. Check the site's social media accounts or their status page (usually at <em>status.example.com</em>) for updates. If it's a service you pay for, document the start time of the outage — most SLAs include credits for significant downtime.
                    </p>
                </div>

                <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                        {FAQS.map((faq, i) => (
                            <div key={i} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}>
                                <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 10, fontSize: 15, lineHeight: 1.4 }}>{faq.question}</p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0 }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

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
