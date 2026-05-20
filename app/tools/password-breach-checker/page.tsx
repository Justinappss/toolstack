"use client";
import { useState } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

const ACCENT = "#10b981";
const ACCENT_RGB = "16,185,129";

const FAQS = [
    { q: "Is my password sent to any server?", a: "No. Your password never leaves your device. We hash it locally using the Web Crypto API, then send only the first 5 characters of that hash to the HaveIBeenPwned API — never the password or full hash." },
    { q: "What is the HaveIBeenPwned Pwned Passwords API?", a: "HaveIBeenPwned is a database of over 900 million passwords exposed in real-world data breaches. The Pwned Passwords API uses k-anonymity so you can check passwords without ever exposing them." },
    { q: "What does 'pwned' mean?", a: "A password is 'pwned' if it has appeared in at least one known data breach. Even if it was someone else's account, attackers now have that password in their dictionaries and will try it against yours." },
    { q: "How many times does a password need to appear before I should worry?", a: "Even once is enough to change it. A password that appears even once in breached data is known to attackers and should be replaced immediately with a unique randomly generated password." },
    { q: "What is k-anonymity?", a: "K-anonymity is a privacy technique where only a partial SHA-1 hash prefix (5 characters) is sent to the API. The server returns all matching hash suffixes, and your device checks locally — the server never knows which password you checked." },
    { q: "What should I do if my password is breached?", a: "Change it immediately on every site where you used it. Use a password manager to generate a unique random password for each account. Enable two-factor authentication wherever available." },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "Password Breach Checker",
            "description": "Check if your password has been exposed in a data breach using the HaveIBeenPwned Pwned Passwords API. Your password never leaves your device — k-anonymity keeps it private.",
            "url": "https://toolstack.tech/tools/password-breach-checker",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                { "@type": "ListItem", "position": 2, "name": "Security", "item": "https://toolstack.tech/tools/category/security" },
                { "@type": "ListItem", "position": 3, "name": "Password Breach Checker", "item": "https://toolstack.tech/tools/password-breach-checker" },
            ],
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "Is my password sent to any server?", "acceptedAnswer": { "@type": "Answer", "text": "No. Your password never leaves your device. We hash it locally using the Web Crypto API, then send only the first 5 characters of that SHA-1 hash to the HaveIBeenPwned API — never the password or full hash." } },
                { "@type": "Question", "name": "What is the HaveIBeenPwned Pwned Passwords API?", "acceptedAnswer": { "@type": "Answer", "text": "HaveIBeenPwned is a database of over 900 million passwords exposed in real-world data breaches. The Pwned Passwords API uses k-anonymity so you can check passwords without ever exposing them." } },
                { "@type": "Question", "name": "What does pwned mean?", "acceptedAnswer": { "@type": "Answer", "text": "A password is pwned if it has appeared in at least one known data breach. Even if it was someone else's account, attackers now have that password in their dictionaries and will try it against yours." } },
                { "@type": "Question", "name": "What is k-anonymity?", "acceptedAnswer": { "@type": "Answer", "text": "K-anonymity is a privacy technique where only a partial SHA-1 hash prefix (5 characters) is sent to the API. The server returns all matching hash suffixes, and your device checks locally — the server never knows which password you checked." } },
                { "@type": "Question", "name": "What should I do if my password is breached?", "acceptedAnswer": { "@type": "Answer", "text": "Change it immediately on every site where you used it. Use a password manager to generate a unique random password for each account. Enable two-factor authentication wherever available." } },
                { "@type": "Question", "name": "How many times does a password need to appear before I should worry?", "acceptedAnswer": { "@type": "Answer", "text": "Even once is enough to change it. A password that appears even once in breached data is known to attackers and should be replaced immediately with a unique randomly generated password." } },
            ],
        },
    ],
};

async function sha1Hex(str: string): Promise<string> {
    const encoded = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-1", encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

type BreachResult = {
    count: number;
    severity: "safe" | "low" | "medium" | "high" | "critical";
};

function getSeverity(count: number): BreachResult["severity"] {
    if (count === 0) return "safe";
    if (count < 10) return "low";
    if (count < 1000) return "medium";
    if (count < 100000) return "high";
    return "critical";
}

const SEVERITY_CONFIG = {
    safe:     { color: "#10b981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  icon: "✅", label: "Not found in any breach",  sub: "Great — this password hasn't appeared in known data breaches." },
    low:      { color: "#eab308", bg: "rgba(234,179,8,0.08)",   border: "rgba(234,179,8,0.25)",   icon: "⚠️", label: "Seen in a handful of breaches", sub: "Rare, but known. Replace it to be safe." },
    medium:   { color: "#f97316", bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.25)",  icon: "🔶", label: "Found in multiple breaches", sub: "This password is in attacker dictionaries. Change it now." },
    high:     { color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.25)",   icon: "🚨", label: "Widely known password",     sub: "Highly dangerous. Change this password everywhere immediately." },
    critical: { color: "#dc2626", bg: "rgba(220,38,38,0.1)",    border: "rgba(220,38,38,0.35)",   icon: "🔥", label: "Extremely common breach password", sub: "This is one of the most breached passwords in existence. Change it on every account right now." },
};

export default function PasswordBreachCheckerPage() {
    const [input, setInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BreachResult | null>(null);
    const [error, setError] = useState("");

    const check = async (pw?: string) => {
        const password = pw ?? input;
        if (!password) return;
        setLoading(true);
        setError("");
        setResult(null);
        try {
            const hash = await sha1Hex(password);
            const prefix = hash.slice(0, 5);
            const suffix = hash.slice(5);
            const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
                headers: { "Add-Padding": "true" },
            });
            if (!res.ok) throw new Error("Could not reach the breach database. Please try again.");
            const text = await res.text();
            const lines = text.split("\r\n");
            let count = 0;
            for (const line of lines) {
                const [lineSuffix, lineCount] = line.split(":");
                if (lineSuffix.toUpperCase() === suffix) {
                    count = parseInt(lineCount, 10);
                    break;
                }
            }
            setResult({ count, severity: getSeverity(count) });
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Check failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const cfg = result ? SEVERITY_CONFIG[result.severity] : null;

    return (
        <div style={{ minHeight: "100vh", background: "#06060c" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div style={{
                background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.08) 0%, rgba(6,6,12,0) 60%)`,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                padding: "56px 24px 40px",
            }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>
                    <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>ToolStack</Link>
                        <span>›</span>
                        <Link href="/tools/category/security" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Security</Link>
                        <span>›</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>Password Breach Checker</span>
                    </nav>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                        {[
                            { label: "100% Private", color: ACCENT },
                            { label: "K-Anonymity", color: "#22d3ee" },
                            { label: "900M+ Passwords", color: "#818cf8" },
                            { label: "No Signup", color: "#f59e0b" },
                        ].map(b => (
                            <span key={b.label} style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: `${b.color}18`, border: `1px solid ${b.color}30`, color: b.color }}>{b.label}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                        Password Breach Checker
                    </h1>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65, maxWidth: 560 }}>
                        Check if your password has been exposed in a data breach. Your password never leaves your device — we use k-anonymity to keep it completely private.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px" }}>

                {/* Privacy banner */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)", borderRadius: 14, marginBottom: 20 }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>🔐</span>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#10b981", margin: "0 0 2px" }}>Your password never leaves your device</p>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>
                            We hash it locally, then send only 5 characters of that hash to HaveIBeenPwned using the k-anonymity model. The full password and hash are never transmitted.
                        </p>
                    </div>
                </div>

                {/* Input */}
                <div style={{ padding: 28, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, marginBottom: 24 }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                        <div style={{ flex: 1, minWidth: 220, position: "relative" }}>
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && check()}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter a password to check…"
                                autoComplete="off"
                                style={{
                                    width: "100%", padding: "14px 48px 14px 18px", borderRadius: 12,
                                    background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)",
                                    color: "white", fontSize: 15, fontFamily: "inherit", outline: "none",
                                    boxSizing: "border-box",
                                }}
                                onFocus={e => { e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.5)`; }}
                                onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                            />
                            <button
                                onClick={() => setShowPassword(v => !v)}
                                style={{
                                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                                    background: "none", border: "none", cursor: "pointer",
                                    fontSize: 16, color: "rgba(255,255,255,0.4)", padding: 4,
                                }}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "🙈" : "👁"}
                            </button>
                        </div>
                        <button
                            onClick={() => check()}
                            disabled={loading || !input}
                            style={{
                                padding: "14px 28px", borderRadius: 12, border: "none",
                                background: loading || !input ? `rgba(${ACCENT_RGB},0.3)` : `linear-gradient(135deg, ${ACCENT}, #34d399)`,
                                color: loading || !input ? "rgba(255,255,255,0.4)" : "#06060c",
                                fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", whiteSpace: "nowrap",
                            }}
                        >
                            {loading ? "Checking…" : "Check Password"}
                        </button>
                    </div>
                    {error && (
                        <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, color: "#f87171", fontSize: 13, fontWeight: 600 }}>
                            {error}
                        </div>
                    )}
                </div>

                {/* Result */}
                {result && cfg && (
                    <div style={{ marginBottom: 32 }}>
                        {/* Status banner */}
                        <div style={{
                            padding: "24px 28px", borderRadius: 20, marginBottom: 16,
                            background: cfg.bg, border: `1px solid ${cfg.border}`,
                            display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
                        }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                                background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
                            }}>
                                {cfg.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 20, fontWeight: 900, color: cfg.color, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                                    {cfg.label}
                                </p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                                    {cfg.sub}
                                </p>
                            </div>
                            {result.count > 0 && (
                                <div style={{ textAlign: "right" }}>
                                    <p style={{ fontSize: 28, fontWeight: 900, color: cfg.color, margin: 0, letterSpacing: "-0.02em" }}>
                                        {result.count.toLocaleString()}x
                                    </p>
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>seen in breaches</p>
                                </div>
                            )}
                        </div>

                        {/* Action guidance */}
                        {result.severity !== "safe" && (
                            <div style={{ padding: "20px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, marginBottom: 16 }}>
                                <p style={{ fontSize: 13, fontWeight: 800, color: "white", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.07em" }}>What to do now</p>
                                {[
                                    "Change this password on every account where you use it",
                                    "Use a unique randomly generated password for each account",
                                    "Enable two-factor authentication wherever available",
                                    "Consider using a password manager to handle unique passwords",
                                ].map((step, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: `rgba(${ACCENT_RGB},0.15)`, border: `1px solid rgba(${ACCENT_RGB},0.3)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: ACCENT, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>{step}</p>
                                    </div>
                                ))}
                                <Link href="/tools/password-generator" style={{ display: "inline-block", marginTop: 12, padding: "10px 20px", borderRadius: 10, background: `rgba(${ACCENT_RGB},0.15)`, border: `1px solid rgba(${ACCENT_RGB},0.3)`, color: ACCENT, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                                    Generate a strong replacement password →
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty state */}
                {!result && !loading && !error && (
                    <div style={{ padding: "48px 24px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, marginBottom: 40 }}>
                        <div style={{ fontSize: 40, marginBottom: 16 }}>🛡️</div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>Enter a password to check if it's been breached</p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>Checked against 900 million+ real-world breach records</p>
                    </div>
                )}

                {/* Info cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 56 }}>
                    {[
                        { icon: "🔐", title: "100% Private", desc: "Your password is hashed locally. Only 5 characters of the hash go to the API. The server never sees your password." },
                        { icon: "🗄️", title: "900M+ Passwords", desc: "The HaveIBeenPwned database holds over 900 million real passwords from hundreds of public data breaches." },
                        { icon: "🧮", title: "K-Anonymity Model", desc: "Only the first 5 chars of a SHA-1 hash are sent. The API returns all matching suffixes and your device checks locally." },
                        { icon: "⚡", title: "Instant Results", desc: "Checks happen in under a second. No account, no email, no tracking — just instant breach verification." },
                    ].map(c => (
                        <div key={c.title} style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
                            <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
                            <p style={{ fontSize: 13, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{c.title}</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    {FAQS.map(({ q, a }) => (
                        <div key={q} style={{ marginBottom: 16, padding: "18px 20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{q}</h3>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{a}</p>
                        </div>
                    ))}
                </section>

                <MoreTools currentSlug="password-breach-checker" />

            </div>
        </div>
    );
}
