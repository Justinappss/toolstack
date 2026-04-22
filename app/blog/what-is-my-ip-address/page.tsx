import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "What Is My IP Address and What Can It Reveal? | ToolStack",
    description: "Your IP address is visible to every website you visit. Learn what it is, what it reveals about you, the difference between IPv4 and IPv6, and how to hide it with a VPN.",
    alternates: { canonical: "https://toolstack.tech/blog/what-is-my-ip-address" },
    openGraph: {
        title: "What Is My IP Address and What Can It Reveal?",
        description: "Learn what your IP address is, what it reveals about your location and ISP, and how to hide it.",
        url: "https://toolstack.tech/blog/what-is-my-ip-address",
        siteName: "ToolStack",
        type: "article",
    },
};

const FAQS = [
    {
        question: "Can someone find my home address from my IP address?",
        answer: "No. An IP address reveals your approximate city or region and your ISP — not your home address, name, or any personal details. Only your ISP has the records that link your IP to your physical address, and they only release that information under a court order or law enforcement request."
    },
    {
        question: "Does my IP address change?",
        answer: "Most home internet connections use a dynamic IP, which changes periodically — sometimes daily, sometimes when you restart your router. Businesses often pay for a static IP that never changes. Mobile data connections also change IP frequently as you move between cell towers."
    },
    {
        question: "What is the difference between a public and private IP address?",
        answer: "Your public IP is the address the internet sees — assigned by your ISP, shared by all devices on your home network. Your private IP is assigned by your router to your specific device (e.g. 192.168.1.5) and is only visible within your local network. This tool shows your public IP."
    },
    {
        question: "Does a VPN completely hide my IP address?",
        answer: "A VPN replaces your visible IP with one from the VPN server, so websites see the VPN's IP instead of yours. However, your VPN provider can still see your real IP. If the VPN has a no-logs policy and is based in a privacy-friendly jurisdiction, your real IP remains private even from them."
    },
    {
        question: "What is IPv6 and do I have it?",
        answer: "IPv6 is the newer IP address format designed to replace IPv4 (which is running out of addresses). IPv4 looks like 8.8.8.8 — four numbers up to 255. IPv6 looks like 2001:4860:4860::8888. Most modern devices and ISPs support both simultaneously (dual-stack). Check your IP lookup result to see which you're using."
    },
];

const accent = "#818cf8";
const accentBg = "rgba(129,140,248,0.06)";
const accentBorder = "rgba(129,140,248,0.18)";

const code: React.CSSProperties = {
    fontFamily: "monospace",
    background: "rgba(255,255,255,0.07)",
    padding: "2px 7px",
    borderRadius: 4,
    fontSize: "0.88em",
    color: "rgba(255,255,255,0.85)",
};

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="What Is My IP Address and What Can It Reveal?"
                description="Your IP address is visible to every website you visit. Learn what it is, what it reveals about you, and how to hide it with a VPN."
                url="https://toolstack.tech/blog/what-is-my-ip-address"
                datePublished="2026-04-22"
                dateModified="2026-04-22"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>What Is My IP Address</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Privacy</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 22, 2026 · 6 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        What Is My IP Address and What Can It Reveal?
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
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Your IP address is a unique number that identifies your device on the internet.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ It reveals your approximate location, ISP and timezone — not your home address.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Use the free <Link href="/tools/ip-address-lookup" style={{ color: accent }}>IP Address Lookup</Link> to see yours instantly.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <p style={{ margin: "0 0 22px" }}>
                        Every time you visit a website, send an email, or stream a video, your device reveals a number to the internet. That number is your IP address — and it's more visible than most people realise.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Use the <Link href="/tools/ip-address-lookup" style={{ color: accent }}>IP Address Lookup tool</Link> to see your current IP, location and ISP right now. Then read on to understand exactly what that information means.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>What Is an IP Address?</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        IP stands for Internet Protocol. An IP address is a numerical label assigned to every device that connects to a network — your laptop, phone, smart TV, router. It serves two purposes: identifying the device and providing its location on the network so data can be routed to and from it correctly.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Think of it like a postal address for your internet connection. Without it, websites wouldn't know where to send the data you requested.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>IPv4 vs IPv6: What's the Difference?</h2>
                    <p style={{ margin: "0 0 16px" }}>There are two versions of IP addresses in use today:</p>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Version</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Format</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>Example</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["IPv4", "Four numbers 0–255, dot-separated", "192.168.1.1"],
                                    ["IPv6", "Eight groups of hex digits, colon-separated", "2001:4860:4860::8888"],
                                ].map(([v, f, e], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700 }}>{v}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>{f}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{e}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        IPv4 has roughly 4.3 billion possible addresses — a number that seemed unlimited in 1983 but has since been exhausted. IPv6 provides 340 undecillion addresses (a 39-digit number), effectively unlimited. Most devices now support both simultaneously, a setup called dual-stack.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>What Does Your IP Address Actually Reveal?</h2>
                    <p style={{ margin: "0 0 16px" }}>Your IP address exposes the following to any website you visit:</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 12 }}>
                        {[
                            ["Approximate location", "City and region — typically accurate to within 20–50 miles. Not your street address."],
                            ["Your ISP", "The company providing your internet connection (e.g. BT, Virgin Media, Comcast)."],
                            ["Timezone", "Inferred from your location, used to serve localised content."],
                            ["Connection type", "Whether you're on residential broadband, a corporate network, a VPN, or a data centre."],
                            ["Hostname", "Sometimes reveals your ISP or organisation name in the reverse DNS record."],
                        ].map(([label, desc]) => (
                            <li key={label as string} style={{ paddingLeft: 20, position: "relative" as const }}>
                                <span style={{ position: "absolute" as const, left: 0, color: accent }}>→</span>
                                <strong style={{ color: "rgba(255,255,255,0.9)" }}>{label}</strong> — {desc}
                            </li>
                        ))}
                    </ul>
                    <p style={{ margin: "0 0 22px" }}>
                        What it does <em>not</em> reveal: your name, home address, email, phone number, or any other personally identifiable information. That data is held only by your ISP.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Public vs Private IP: Which One Matters?</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Your <strong style={{ color: "white" }}>public IP</strong> is what the internet sees. It's assigned by your ISP and is shared across all devices on your home or office network. The IP Lookup tool shows your public IP.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Your <strong style={{ color: "white" }}>private IP</strong> is assigned by your router to each individual device on your local network (e.g. <span style={code}>192.168.1.5</span>). It's invisible to the outside world and only used for communication between devices on the same network.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How to Hide Your IP Address</h2>
                    <p style={{ margin: "0 0 16px" }}>There are three practical methods:</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 14 }}>
                        <li style={{ paddingLeft: 20, position: "relative" as const }}>
                            <span style={{ position: "absolute" as const, left: 0, color: accent }}>1.</span>
                            <strong style={{ color: "rgba(255,255,255,0.9)" }}>VPN (Virtual Private Network)</strong> — Routes your traffic through a server in another location. Websites see the VPN server's IP instead of yours. The most practical option for most people. Look for no-logs policies and jurisdiction outside Five Eyes.
                        </li>
                        <li style={{ paddingLeft: 20, position: "relative" as const }}>
                            <span style={{ position: "absolute" as const, left: 0, color: accent }}>2.</span>
                            <strong style={{ color: "rgba(255,255,255,0.9)" }}>Tor Browser</strong> — Routes traffic through multiple volunteer-operated nodes, making origin tracing extremely difficult. Much slower than a VPN. Best for high-sensitivity browsing, not everyday use.
                        </li>
                        <li style={{ paddingLeft: 20, position: "relative" as const }}>
                            <span style={{ position: "absolute" as const, left: 0, color: accent }}>3.</span>
                            <strong style={{ color: "rgba(255,255,255,0.9)" }}>Proxy server</strong> — Similar to a VPN but typically unencrypted and less private. Common for bypassing geo-restrictions on specific sites but not recommended for general privacy.
                        </li>
                    </ul>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Check Your IP Address Now</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Use the free <Link href="/tools/ip-address-lookup" style={{ color: accent }}>IP Address Lookup tool</Link> to see your current public IP, location, ISP, timezone and hostname — no signup, no install, instant results. You can also look up any IP address to see where it's located and who it belongs to.
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
