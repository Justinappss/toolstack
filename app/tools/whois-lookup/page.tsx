"use client";
import { useState } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

interface WhoisResult {
    domain: string;
    status: string[];
    registrar: string | null;
    registrationDate: string | null;
    expiryDate: string | null;
    updatedDate: string | null;
    nameservers: string[];
    daysUntilExpiry: number | null;
}

const accent = "#f97316";
const accentBg = "rgba(249,115,22,0.08)";
const accentBorder = "rgba(249,115,22,0.2)";

const EXAMPLES = ["github.com", "stripe.com", "shopify.com", "cloudflare.com", "vercel.com"];

function fmt(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function expiryColor(days: number | null) {
    if (days === null) return "rgba(255,255,255,0.5)";
    if (days < 0) return "#f87171";
    if (days <= 30) return "#fbbf24";
    return "#34d399";
}

function expiryLabel(days: number | null) {
    if (days === null) return "Unknown";
    if (days < 0) return `Expired ${Math.abs(days)} days ago`;
    if (days === 0) return "Expires today";
    if (days === 1) return "1 day left";
    return `${days.toLocaleString()} days left`;
}

function statusBadge(status: string[], days: number | null) {
    if (days !== null && days < 0) return { label: "Expired", color: "#f87171", bg: "rgba(248,113,113,0.1)" };
    if (days !== null && days <= 30) return { label: "Expiring Soon", color: "#fbbf24", bg: "rgba(251,191,36,0.1)" };
    const hasActive = status.some(s => s.toLowerCase().includes("ok") || s.toLowerCase().includes("active"));
    if (hasActive || (days !== null && days > 30)) return { label: "Active", color: "#34d399", bg: "rgba(52,211,153,0.1)" };
    return { label: "Registered", color: "#34d399", bg: "rgba(52,211,153,0.1)" };
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "WHOIS Domain Lookup",
            "description": "Look up any domain's registration date, expiry, registrar, and nameservers instantly.",
            "url": "https://toolstack.tech/tools/whois-lookup",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                { "@type": "ListItem", "position": 2, "name": "Utility", "item": "https://toolstack.tech/tools?category=utility" },
                { "@type": "ListItem", "position": 3, "name": "WHOIS Domain Lookup", "item": "https://toolstack.tech/tools/whois-lookup" },
            ],
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "What is WHOIS?", "acceptedAnswer": { "@type": "Answer", "text": "WHOIS is a protocol used to query databases that store the registered owners of internet resources, most commonly domain names. A WHOIS lookup returns information including the registrar, registration date, expiry date, nameservers, and sometimes registrant contact details (when not redacted for privacy)." } },
                { "@type": "Question", "name": "Why is registrant information hidden?", "acceptedAnswer": { "@type": "Answer", "text": "Since GDPR came into force in 2018, most domain registrars in Europe and many worldwide now redact personal details from public WHOIS records to protect registrant privacy. You will see the registrar name and domain dates, but personal contact information is replaced with privacy-protection service details." } },
                { "@type": "Question", "name": "What happens when a domain expires?", "acceptedAnswer": { "@type": "Answer", "text": "When a domain expires, it first enters a grace period (typically 30 days) where the owner can still renew it. After that, it enters a redemption period (up to 30 more days) where renewal is possible but expensive. Finally, the domain is released and becomes available for anyone to register. An expired domain can cause websites and email to stop working immediately." } },
                { "@type": "Question", "name": "What are nameservers?", "acceptedAnswer": { "@type": "Answer", "text": "Nameservers are the DNS servers that control where a domain's traffic is directed. When you visit a website, your computer queries the domain's nameservers to find the IP address of the server. Nameservers are set at the registrar level and typically look like ns1.example.com. Most domains have 2–4 nameservers for redundancy." } },
                { "@type": "Question", "name": "What is the best WHOIS lookup tool?", "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's WHOIS Domain Lookup is one of the best free options — it uses the modern RDAP protocol to return registration date, expiry date, registrar, nameservers, and domain status flags for any domain instantly. It includes an expiry countdown and visual indicator, requires no signup, and works on any device." } },
                { "@type": "Question", "name": "How do I find out who owns a domain?", "acceptedAnswer": { "@type": "Answer", "text": "Enter the domain name into a WHOIS lookup tool and check the registrant field. Since GDPR in 2018, personal registrant details are often redacted and replaced with privacy service details. You can still see the registrar (company that sold the domain), registration date, expiry date, and nameservers in most WHOIS results." } },
            ],
        },
    ],
};

export default function WhoisLookupPage() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<WhoisResult | null>(null);
    const [error, setError] = useState("");
    const [notFound, setNotFound] = useState(false);

    const lookup = async (domain?: string) => {
        const d = (domain ?? input).trim();
        if (!d) return;
        setLoading(true);
        setResult(null);
        setError("");
        setNotFound(false);

        try {
            const res = await fetch(`/api/whois-lookup?domain=${encodeURIComponent(d)}`);
            const data = await res.json();
            if (!res.ok) {
                if (res.status === 404) {
                    setNotFound(true);
                } else {
                    setError(data.error ?? "Lookup failed. Please try again.");
                }
            } else {
                setResult(data);
                setInput(data.domain);
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const badge = result ? statusBadge(result.status, result.daysUntilExpiry) : null;

    // Expiry bar percentage — 0–100 based on days left in a 1-year window
    const expiryPct = result?.daysUntilExpiry !== null && result?.daysUntilExpiry !== undefined
        ? Math.max(0, Math.min(100, (result.daysUntilExpiry / 365) * 100))
        : null;

    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px", position: "relative" }}>
                    <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                        <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>ToolStack</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/tools?category=utility" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Utility</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>WHOIS Lookup</span>
                    </nav>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Domain</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Free · No signup</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 16, color: "white" }}>
                        WHOIS Domain Lookup
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", maxWidth: 520, lineHeight: 1.65, marginBottom: 40 }}>
                        Check registration date, expiry, registrar, and nameservers for any domain instantly.
                    </p>

                    {/* Input */}
                    <div style={{ display: "flex", gap: 10, maxWidth: 620, flexWrap: "wrap" }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && lookup()}
                            placeholder="example.com"
                            style={{
                                flex: 1, minWidth: 200, padding: "14px 18px", borderRadius: 12,
                                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                color: "white", fontSize: 15, outline: "none",
                                fontFamily: "monospace",
                            }}
                        />
                        <button
                            onClick={() => lookup()}
                            disabled={loading || !input.trim()}
                            style={{
                                padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 14,
                                background: loading || !input.trim() ? "rgba(249,115,22,0.3)" : accent,
                                color: "white", border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                                transition: "opacity 0.2s",
                            }}
                        >
                            {loading ? "Looking up…" : "Look Up"}
                        </button>
                    </div>

                    {/* Example chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                        {EXAMPLES.map(d => (
                            <button key={d} onClick={() => { setInput(d); lookup(d); }}
                                style={{ padding: "5px 12px", borderRadius: 999, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: 12, cursor: "pointer", fontFamily: "monospace" }}>
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results */}
            <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 20px 100px" }}>

                {error && (
                    <div style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", fontSize: 14, marginBottom: 32 }}>
                        {error}
                    </div>
                )}

                {notFound && (
                    <div style={{ padding: "32px 36px", borderRadius: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                        <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
                        <p style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.85)", margin: "0 0 8px" }}>Domain not found</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>This domain may not be registered, or it may use a TLD not yet supported by RDAP.</p>
                    </div>
                )}

                {result && badge && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                        {/* Status banner */}
                        <div style={{ padding: "24px 28px", borderRadius: 20, background: `${badge.bg}`, border: `1px solid ${badge.color}30`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${badge.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                                    {badge.label === "Expired" ? "⚠️" : badge.label === "Expiring Soon" ? "⏰" : "✅"}
                                </div>
                                <div>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 4px" }}>Domain status</p>
                                    <p style={{ fontSize: 22, fontWeight: 900, color: badge.color, margin: 0, fontFamily: "monospace" }}>{result.domain}</p>
                                </div>
                            </div>
                            <span style={{ padding: "6px 16px", borderRadius: 999, fontWeight: 700, fontSize: 13, color: badge.color, background: badge.bg, border: `1px solid ${badge.color}40` }}>
                                {badge.label}
                            </span>
                        </div>

                        {/* Expiry bar */}
                        {result.daysUntilExpiry !== null && (
                            <div style={{ padding: "24px 28px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Domain expiry</span>
                                    <span style={{ fontSize: 15, fontWeight: 700, color: expiryColor(result.daysUntilExpiry) }}>{expiryLabel(result.daysUntilExpiry)}</span>
                                </div>
                                <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${expiryPct ?? 0}%`, borderRadius: 999, background: expiryColor(result.daysUntilExpiry), transition: "width 0.6s ease" }} />
                                </div>
                                {result.expiryDate && (
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "10px 0 0" }}>Expires {fmt(result.expiryDate)}</p>
                                )}
                            </div>
                        )}

                        {/* Dates grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                            {[
                                { label: "Registered", value: result.registrationDate ? fmt(result.registrationDate) : "Unknown" },
                                { label: "Expires", value: result.expiryDate ? fmt(result.expiryDate) : "Unknown" },
                                { label: "Last Updated", value: result.updatedDate ? fmt(result.updatedDate) : "Unknown" },
                            ].map(({ label, value }) => (
                                <div key={label} style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>{label}</p>
                                    <p style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: 0 }}>{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Registrar */}
                        {result.registrar && (
                            <div style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Registrar</p>
                                <p style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: 0 }}>{result.registrar}</p>
                            </div>
                        )}

                        {/* Nameservers */}
                        {result.nameservers.length > 0 && (
                            <div style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" }}>Nameservers</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {result.nameservers.map(ns => (
                                        <span key={ns} style={{ padding: "5px 12px", borderRadius: 8, background: `${accent}12`, border: `1px solid ${accent}25`, color: accent, fontSize: 13, fontFamily: "monospace", fontWeight: 600 }}>
                                            {ns}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Status flags */}
                        {result.status.length > 0 && (
                            <div style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" }}>Domain Flags</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {result.status.map(s => (
                                        <span key={s} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "monospace" }}>
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* What to look for section */}
                {!result && !loading && !error && !notFound && (
                    <div style={{ marginTop: 8 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>What you'll get</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                            {[
                                ["📅", "Registration & expiry dates", "See exactly when the domain was registered and when it needs to be renewed."],
                                ["🏢", "Registrar", "Which company manages the domain registration — GoDaddy, Namecheap, Cloudflare, etc."],
                                ["🌐", "Nameservers", "Which DNS servers the domain points to — reveals the hosting provider."],
                                ["🔒", "Status flags", "Domain lock status and any restrictions (clientDeleteProhibited, etc)."],
                            ].map(([icon, title, desc]) => (
                                <div key={title as string} style={{ padding: "20px 22px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.85)", margin: "0 0 6px" }}>{title}</p>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.6 }}>{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQ */}
                <section style={{ marginBottom: 56, marginTop: 56 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            { q: "What is WHOIS?", a: "WHOIS is a protocol used to query databases that store information about registered domain names. A WHOIS lookup returns the registrar, registration date, expiry date, nameservers, and sometimes registrant contact details (when not redacted for privacy)." },
                            { q: "Why is registrant information hidden?", a: "Since GDPR in 2018, most registrars redact personal registrant details from public WHOIS records. You will still see the registrar, domain dates, and nameservers, but personal contact information is replaced with privacy-protection service details." },
                            { q: "What happens when a domain expires?", a: "After expiry, the domain enters a grace period (typically 30 days) where the owner can still renew. Then a redemption period (up to 30 more days) where renewal is possible but costly. After that, the domain is released and anyone can register it. An expired domain causes websites and email to stop working immediately." },
                            { q: "What are nameservers?", a: "Nameservers are the DNS servers that control where a domain's traffic goes. They are set at the registrar level and typically look like ns1.example.com. Most domains have 2–4 nameservers for redundancy. The nameservers reveal which hosting provider or CDN the domain uses." },
                            { q: "What is the best WHOIS lookup tool?", a: "ToolStack's WHOIS Domain Lookup is one of the best free options — it uses the modern RDAP protocol to return registration date, expiry, registrar, nameservers, and domain status flags for any domain instantly. It includes an expiry countdown, requires no signup, and works on any device." },
                            { q: "How do I find out who owns a domain?", a: "Enter the domain into a WHOIS lookup tool and check the registrant field. Since GDPR, personal details are often redacted. You can still see the registrar, registration date, expiry date, and nameservers in most results — enough to identify the hosting provider and when the domain was acquired." },
                        ].map(({ q, a }) => (
                            <div key={q} style={{ padding: "18px 20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{q}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <MoreTools currentSlug="whois-lookup" />
                
            </div>
        </main>
    );
}
