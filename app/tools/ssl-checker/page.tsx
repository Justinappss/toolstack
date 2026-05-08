"use client";
import { useState } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const FAQS = [
  { q: "What is an SSL certificate?", a: "An SSL certificate is a digital certificate that authenticates a website" },
  { q: "How long do SSL certificates last?", a: "Modern SSL certificates are valid for a maximum of 397 days (about 13 months). After that, they must be renewed. Let" },
  { q: "What does it mean if an SSL certificate has expired?", a: "An expired SSL certificate means the website" },
  { q: "Who issues SSL certificates?", a: "SSL certificates are issued by Certificate Authorities (CAs). Major CAs include Let" },
  { q: "What is the best SSL certificate checker?", a: "ToolStack" }
];


interface SslResult {
    domain: string;
    isValid: boolean;
    daysRemaining: number;
    percentUsed: number;
    validFrom: string;
    validTo: string;
    subject: { cn: string; org: string | null };
    issuer: { cn: string; org: string | null };
    sans: string[];
    fingerprint: string | null;
    bits: number | null;
}

const EXAMPLES = ["google.com", "github.com", "stripe.com", "cloudflare.com"];

function daysColor(days: number) {
    if (days < 0) return "#f87171";
    if (days <= 14) return "#f87171";
    if (days <= 30) return "#fbbf24";
    return "#34d399";
}

function daysLabel(days: number) {
    if (days < 0) return "Expired";
    if (days === 0) return "Expires today";
    if (days === 1) return "1 day left";
    return `${days} days left`;
}

function fmt(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "SSL Certificate Checker",
            "description": "Check any website's SSL certificate instantly. See validity, expiry date, issuer, and covered domains.",
            "url": "https://toolstack.tech/tools/ssl-checker",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                { "@type": "ListItem", "position": 2, "name": "Security", "item": "https://toolstack.tech/tools?category=security" },
                { "@type": "ListItem", "position": 3, "name": "SSL Certificate Checker", "item": "https://toolstack.tech/tools/ssl-checker" },
            ],
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "What is an SSL certificate?", "acceptedAnswer": { "@type": "Answer", "text": "An SSL certificate is a digital certificate that authenticates a website's identity and enables encrypted HTTPS connections. It ensures that data sent between your browser and the website is encrypted and cannot be intercepted." } },
                { "@type": "Question", "name": "How long do SSL certificates last?", "acceptedAnswer": { "@type": "Answer", "text": "Modern SSL certificates are valid for a maximum of 397 days (about 13 months). After that, they must be renewed. Let's Encrypt certificates are valid for 90 days and auto-renew. An expired certificate causes browser security warnings." } },
                { "@type": "Question", "name": "What does it mean if an SSL certificate has expired?", "acceptedAnswer": { "@type": "Answer", "text": "An expired SSL certificate means the website's security credentials are out of date. Browsers will show a warning page and the connection will not be encrypted. The site owner needs to renew their certificate immediately." } },
                { "@type": "Question", "name": "Who issues SSL certificates?", "acceptedAnswer": { "@type": "Answer", "text": "SSL certificates are issued by Certificate Authorities (CAs). Major CAs include Let's Encrypt (free), DigiCert, Comodo, and GlobalSign. Let's Encrypt now powers the majority of HTTPS certificates on the web." } },
                { "@type": "Question", "name": "What is the best SSL certificate checker?", "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's SSL Certificate Checker is one of the best free options — it instantly shows the certificate's validity status, exact expiry date, days remaining, issuer, key strength, and all covered domains (SANs). It flags certs expiring within 30 days and requires no signup." } },
            ],
        },
    ],
};

export default function SslCheckerPage() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SslResult | null>(null);
    const [error, setError] = useState("");

    const check = async (domain?: string) => {
        const d = domain ?? input.trim();
        if (!d) return;
        setLoading(true);
        setError("");
        setResult(null);
        try {
            const res = await fetch("/api/ssl-checker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ domain: d }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Check failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#06060c" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div style={{
                background: "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(6,6,12,0) 60%)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                padding: "56px 24px 40px",
            }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>
                    <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>ToolStack</Link>
                        <span>›</span>
                        <Link href="/tools?category=security" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Security</Link>
                        <span>›</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>SSL Certificate Checker</span>
                    </nav>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                        {[
                            { label: "Instant Check", color: "#34d399" },
                            { label: "Expiry Date", color: "#22d3ee" },
                            { label: "Issuer Details", color: "#818cf8" },
                            { label: "No Signup", color: "#f59e0b" },
                        ].map(b => (
                            <span key={b.label} style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: `${b.color}18`, border: `1px solid ${b.color}30`, color: b.color }}>{b.label}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                        SSL Certificate Checker
                    </h1>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65, maxWidth: 520 }}>
                        Check any website's SSL certificate instantly. See validity, expiry date, issuer, and which domains are covered.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px" }}>

                {/* Input */}
                <div style={{ padding: 28, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, marginBottom: 24 }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && check()}
                            placeholder="Enter a domain — e.g. github.com"
                            style={{
                                flex: 1, minWidth: 220, padding: "14px 18px", borderRadius: 12,
                                background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)",
                                color: "white", fontSize: 15, fontFamily: "inherit", outline: "none",
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = "rgba(52,211,153,0.5)"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                        />
                        <button
                            onClick={() => check()}
                            disabled={loading || !input.trim()}
                            style={{
                                padding: "14px 28px", borderRadius: 12, border: "none",
                                background: loading || !input.trim() ? "rgba(52,211,153,0.3)" : "linear-gradient(135deg, #34d399, #22d3ee)",
                                color: loading || !input.trim() ? "rgba(255,255,255,0.4)" : "#06060c",
                                fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", whiteSpace: "nowrap",
                            }}
                        >
                            {loading ? "Checking…" : "Check SSL"}
                        </button>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", alignSelf: "center" }}>Try:</span>
                        {EXAMPLES.map(ex => (
                            <button key={ex} onClick={() => { setInput(ex); check(ex); }} style={{
                                fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)",
                                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 8, padding: "4px 10px", cursor: "pointer",
                            }}>{ex}</button>
                        ))}
                    </div>
                    {error && (
                        <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, color: "#f87171", fontSize: 13, fontWeight: 600 }}>
                            {error}
                        </div>
                    )}
                </div>

                {/* Result */}
                {result && (
                    <div style={{ marginBottom: 32 }}>
                        {/* Status banner */}
                        <div style={{
                            padding: "24px 28px", borderRadius: 20, marginBottom: 16,
                            background: result.isValid ? "rgba(52,211,153,0.06)" : "rgba(248,113,113,0.06)",
                            border: `1px solid ${result.isValid ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)"}`,
                            display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
                        }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                                background: result.isValid ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)",
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
                            }}>
                                {result.isValid ? "🔒" : "🔓"}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 20, fontWeight: 900, color: result.isValid ? "#34d399" : "#f87171", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                                    {result.isValid ? "Certificate is Valid" : "Certificate is Invalid"}
                                </p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                                    {result.subject.cn} · {result.issuer.org ?? result.issuer.cn}
                                </p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: 28, fontWeight: 900, color: daysColor(result.daysRemaining), margin: 0, letterSpacing: "-0.02em" }}>
                                    {daysLabel(result.daysRemaining)}
                                </p>
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>
                                    Expires {fmt(result.validTo)}
                                </p>
                            </div>
                        </div>

                        {/* Expiry progress bar */}
                        <div style={{ marginBottom: 16, padding: "16px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Issued {fmt(result.validFrom)}</span>
                                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Expires {fmt(result.validTo)}</span>
                            </div>
                            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                                <div style={{
                                    height: "100%", borderRadius: 99,
                                    width: `${result.percentUsed}%`,
                                    background: result.percentUsed > 85
                                        ? "linear-gradient(90deg, #f87171, #ef4444)"
                                        : result.percentUsed > 70
                                            ? "linear-gradient(90deg, #fbbf24, #f59e0b)"
                                            : "linear-gradient(90deg, #34d399, #22d3ee)",
                                    transition: "width 0.5s ease",
                                }} />
                            </div>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "8px 0 0" }}>
                                {result.percentUsed}% of certificate lifetime used
                            </p>
                        </div>

                        {/* Details grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 16 }}>
                            {[
                                { label: "Common Name", value: result.subject.cn },
                                { label: "Organisation", value: result.subject.org ?? "Not specified" },
                                { label: "Issued By", value: result.issuer.org ?? result.issuer.cn },
                                { label: "Key Strength", value: result.bits ? `${result.bits}-bit` : "Not available" },
                            ].map(f => (
                                <div key={f.label} style={{ padding: "16px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 6px" }}>{f.label}</p>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)", margin: 0, wordBreak: "break-word" }}>{f.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* SANs */}
                        {result.sans.length > 0 && (
                            <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 12px" }}>
                                    Covered Domains ({result.sans.length})
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {result.sans.map(san => (
                                        <span key={san} style={{
                                            fontSize: 12, fontFamily: "monospace", fontWeight: 600,
                                            padding: "4px 10px", borderRadius: 8,
                                            background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)",
                                            color: "#34d399",
                                        }}>{san}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty state */}
                {!result && !loading && !error && (
                    <div style={{ padding: "48px 24px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, marginBottom: 40 }}>
                        <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>Enter a domain to check its SSL certificate</p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>Works with any website that has HTTPS enabled</p>
                    </div>
                )}

                {/* Info cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 56 }}>
                    {[
                        { icon: "🔑", title: "What is SSL?", desc: "SSL/TLS certificates encrypt data between your browser and a website, protecting passwords and personal data in transit." },
                        { icon: "📅", title: "Certificate Expiry", desc: "SSL certs expire after 13 months max. Expired certs cause browser warnings. Most sites auto-renew using Let's Encrypt." },
                        { icon: "🏢", title: "Certificate Types", desc: "DV (domain validated) is the most common. OV and EV certificates include organisation verification for extra trust." },
                        { icon: "⚠️", title: "Expiry Warnings", desc: "We flag certs expiring within 30 days in yellow and 14 days in red. Contact your hosting provider if yours is about to expire." },
                    ].map(c => (
                        <div key={c.title} style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
                            <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
                            <p style={{ fontSize: 13, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{c.title}</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
                        </div>
                    ))}
                </div>


                <FaqPageSchema faqs={FAQS} />

                {/* FAQ */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    {[
                        { q: "What is an SSL certificate?", a: "An SSL certificate authenticates a website's identity and enables HTTPS encryption. It ensures data sent between your browser and the website is encrypted and can't be intercepted." },
                        { q: "How long do SSL certificates last?", a: "Modern SSL certs are valid for a maximum of 397 days (~13 months). Let's Encrypt certificates last 90 days and auto-renew. An expired certificate triggers browser security warnings." },
                        { q: "What happens when an SSL certificate expires?", a: "Browsers show a security warning page. Visitors see 'Your connection is not private'. The site owner must renew immediately to restore HTTPS. Data is no longer encrypted on expired certs." },
                        { q: "Who issues SSL certificates?", a: "Certificate Authorities (CAs) issue SSL certs. Major ones include Let's Encrypt (free, powers most of the web), DigiCert, Comodo, and Sectigo. Let's Encrypt has become dominant for standard HTTPS." },
                        { q: "What are SANs (Subject Alternative Names)?", a: "SANs are the list of domains a single certificate covers. A certificate for example.com might also cover www.example.com and api.example.com. Wildcard certs cover *.example.com — any subdomain." },
                        { q: "What is the best SSL certificate checker?", a: "ToolStack's SSL Certificate Checker is one of the best free options — it instantly shows the certificate's validity status, exact expiry date, days remaining, issuer, key strength, and all covered domains (SANs). It flags certs expiring within 30 days and requires no signup." },
                    ].map(({ q, a }) => (
                        <div key={q} style={{ marginBottom: 16, padding: "18px 20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{q}</h3>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{a}</p>
                        </div>
                    ))}
                </section>

                <MoreTools currentSlug="ssl-checker" />
                
            </div>
        </div>
    );
}
