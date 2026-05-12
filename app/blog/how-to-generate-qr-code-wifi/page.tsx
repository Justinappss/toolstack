import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "How to Generate a QR Code for Your WiFi (No App Needed)",
    description: "Let guests connect to your WiFi instantly by scanning a QR code — no typing passwords. Learn how to create one free in seconds, and what format it uses.",
    alternates: { canonical: "https://toolstack.tech/blog/how-to-generate-qr-code-wifi" },
    openGraph: {
        title: "How to Generate a QR Code for Your WiFi (No App Needed)",
        description: "Create a free WiFi QR code in seconds. Guests scan it and connect automatically — no password typing required.",
        url: "https://toolstack.tech/blog/how-to-generate-qr-code-wifi",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-04-23",
        modifiedTime: "2026-04-23",
        images: [{ url: "https://toolstack.tech/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "How to Generate a QR Code for Your WiFi (No App Needed)",
        description: "Create a free WiFi QR code in seconds. Guests scan it and connect automatically — no password typing required.",
        images: ["https://toolstack.tech/og-image.png"],
    },
};

const FAQS = [
    {
        question: "Is it safe to share a WiFi QR code?",
        answer: "It depends on who you share it with. The QR code contains your WiFi password in plain text — anyone who scans it gets the password. For a home network, it's safe to print and display for guests. For a business, use a separate guest network with its own QR code, and rotate the password regularly. Never share a QR code that contains your primary business or personal network password publicly."
    },
    {
        question: "Do WiFi QR codes work on iPhone?",
        answer: "Yes. iPhones running iOS 11 or later can scan WiFi QR codes directly with the built-in Camera app — no third-party app needed. Point the camera at the code and tap the notification that appears to connect automatically. Android devices running Android 10 or later also support this natively through the Camera or Settings app."
    },
    {
        question: "What is the WIFI: format in a QR code?",
        answer: "WiFi QR codes use a standardised plain-text format: WIFI:T:WPA;S:NetworkName;P:Password;;. T is the security type (WPA, WEP, or nopass for open networks), S is the SSID (network name), and P is the password. This format is recognised by all modern smartphone cameras. The double semicolon at the end terminates the record."
    },
    {
        question: "What if my network name or password contains special characters?",
        answer: "Special characters like commas, semicolons, backslashes, and quote marks need to be escaped with a backslash in the WIFI: format. For example, a password of pa$$;word becomes pa$$\\;word. Most QR code generators handle this automatically. If you're building the string manually, check that any ;, ,, \", or \\ in your SSID or password are properly escaped."
    },
    {
        question: "Can I print the QR code?",
        answer: "Yes — and you should. A printed WiFi QR code at a desk, on a menu, or by the front door is far more practical than verbally spelling out a password. Download the QR code as PNG or SVG from the generator and print at whatever size you need. SVG scales to any size without losing quality, making it ideal for print. PNG is fine for standard paper printing."
    },
];

const accent = "#22d3ee";
const accentBg = "rgba(34,211,238,0.06)";
const accentBorder = "rgba(34,211,238,0.18)";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="How to Generate a QR Code for Your WiFi (No App Needed)"
                description="Create a free WiFi QR code in seconds. Guests scan it and connect automatically — no password typing required."
                url="https://toolstack.tech/blog/how-to-generate-qr-code-wifi"
                datePublished="2026-04-23"
                dateModified="2026-04-23"
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
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>WiFi QR Code Generator</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Utility</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 23, 2026 · 4 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        How to Generate a QR Code for Your WiFi (No App Needed)
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · April 23, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ A WiFi QR code lets guests connect instantly by scanning — no password required.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Works on all modern iPhones and Android devices with the built-in camera.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Generate one free in seconds with the <Link href="/tools/qr-code-generator" style={{ color: accent }}>QR Code Generator</Link> — no app, no signup.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>
                    <p style={{ margin: "0 0 22px" }}>
                        Telling someone your WiFi password — especially one that looks like <code style={{ fontFamily: "monospace", color: accent, fontSize: 14 }}>xK9#mP2$qR7!</code> — is one of those small frictions that shouldn't exist in 2026. A WiFi QR code eliminates it entirely. Your guest scans, their phone connects. Done.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        You don't need an app. You don't need to pay for anything. The <Link href="/tools/qr-code-generator" style={{ color: accent }}>ToolStack QR Code Generator</Link> has a dedicated WiFi mode — select WiFi, enter your network name and password, and download the code as a PNG or SVG.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How to Create a WiFi QR Code</h2>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 12 }}>
                        {([
                            ["Open the QR Code Generator", `Go to the free tool at /tools/qr-code-generator and select the WiFi tab.`],
                            ["Enter your network details", "Type your network name (SSID) exactly as it appears — capitalisation matters. Enter your WiFi password. Select your security type: WPA/WPA2 for most modern routers, WEP for older ones, or None for open networks."],
                            ["Generate and download", "Click Generate. Download as PNG for printing or SVG for scalable/print-ready use. The QR code is created entirely in your browser — your password never leaves your device."],
                            ["Test it before printing", "Scan the QR code with your phone camera before you print or display it. If it connects, it works. If not, double-check the SSID and password for typos."],
                        ] as [string, string][]).map(([label, desc], i) => (
                            <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: accent, marginTop: 2 }}>{i + 1}</span>
                                <span><strong style={{ color: "rgba(255,255,255,0.85)" }}>{label}</strong> — {desc}</span>
                            </li>
                        ))}
                    </ul>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>What the QR Code Actually Contains</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        A WiFi QR code is just a machine-readable version of this text string:
                    </p>
                    <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontSize: 13, color: accent, marginBottom: 22, wordBreak: "break-all" as const }}>
                        WIFI:T:WPA;S:YourNetworkName;P:YourPassword;;
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        The fields are: <strong style={{ color: "white" }}>T</strong> (security type — WPA, WEP, or nopass), <strong style={{ color: "white" }}>S</strong> (SSID — your network name), and <strong style={{ color: "white" }}>P</strong> (password). Modern smartphone cameras read this format natively — iOS 11+, Android 10+, and most Android camera apps since 2019.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Where to Use It</h2>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Location</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Tip</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Home / guest room", "Print A6 size, place in a small frame on the desk or bedside table"],
                                    ["Airbnb / rental property", "Laminate it and attach to the welcome card — saves you answering messages about WiFi"],
                                    ["Café or restaurant", "Add to table cards or the menu — separate guest network recommended"],
                                    ["Office reception", "Display on the front desk — use a dedicated visitor VLAN, not your staff network"],
                                    ["Events / pop-ups", "Print large format on a banner or A3 sheet — visible from a distance"],
                                ].map(([location, tip], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{location}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{tip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Security: Should You Worry?</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        The QR code encodes your password in plain text. Anyone who can photograph or screenshot the code gets the password. For home use, this is fine — you control who sees it. For businesses, the answer is a dedicated guest network with its own SSID and password, rotated monthly. Display the guest QR code, never the staff network one.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        The ToolStack generator runs entirely in your browser — your network name and password are never sent to any server. You can verify this by generating a QR code while offline.
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
