"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";

interface CheckResult {
    url: string;
    host: string;
    isUp: boolean;
    status: number | null;
    statusText: string;
    responseTime: number | null;
    checkedAt: string;
}

const EXAMPLES = [
    "google.com",
    "github.com",
    "stackoverflow.com",
    "vercel.com",
    "reddit.com",
];

function getStatusColor(result: CheckResult) {
    if (!result.isUp) return "#f87171";
    if (result.responseTime && result.responseTime < 500) return "#34d399";
    if (result.responseTime && result.responseTime < 1500) return "#fbbf24";
    return "#f97316";
}

function getSpeedLabel(ms: number | null) {
    if (!ms) return "—";
    if (ms < 500) return "Fast";
    if (ms < 1500) return "Moderate";
    return "Slow";
}

function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString();
}

export default function WebsiteDownChecker() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CheckResult | null>(null);
    const [history, setHistory] = useState<CheckResult[]>([]);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const check = async (urlToCheck?: string) => {
        const url = urlToCheck ?? input.trim();
        if (!url) return;
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch("/api/website-down-checker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data);
            setHistory(prev => [data, ...prev].slice(0, 5));
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Website Down Checker",
                "description": "Check if any website is down or just you. Instantly see HTTP status code, response time, and whether a site is up or down. Free, no signup required.",
                "url": "https://toolstack.tech/tools/website-down-checker",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Web",
                "browserRequirements": "Requires JavaScript",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "featureList": [
                    "Check if any website is up or down",
                    "HTTP status code and response",
                    "Response time measurement",
                    "Check history for last 5 sites",
                    "No signup required",
                ],
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "Dev", "item": "https://toolstack.tech/tools?category=dev" },
                    { "@type": "ListItem", "position": 3, "name": "Website Down Checker", "item": "https://toolstack.tech/tools/website-down-checker" },
                ],
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How do I check if a website is down?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Enter the website URL into the checker and click Check. The tool sends a request to the site's server and reports back the HTTP status code, response time, and whether the site is up or down. Results are returned in seconds." },
                    },
                    {
                        "@type": "Question",
                        "name": "What does a 200 status code mean?",
                        "acceptedAnswer": { "@type": "Answer", "text": "A 200 status code means the website is up and responding normally. Other 2xx codes also indicate success. 5xx codes (500, 502, 503) indicate the server is having problems. If no status code is returned, the server couldn't be reached at all." },
                    },
                    {
                        "@type": "Question",
                        "name": "Why might a site show as down for me but up for others?",
                        "acceptedAnswer": { "@type": "Answer", "text": "A site can be down in one region but up in another due to regional server outages, CDN issues, or DNS propagation problems. This tool checks from the server's location. If the site shows as up here but you can't access it, the issue may be with your local network, ISP, or DNS settings." },
                    },
                    {
                        "@type": "Question",
                        "name": "What is a good response time for a website?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Under 500ms is considered fast. 500ms to 1500ms is moderate. Over 1500ms is slow and may indicate server performance issues. Response time measures how long the server takes to respond to a request, not how long the full page takes to load." },
                    },
                    {
                        "@type": "Question",
                        "name": "What does HTTP 503 mean?",
                        "acceptedAnswer": { "@type": "Answer", "text": "HTTP 503 means 'Service Unavailable' — the server is temporarily unable to handle the request, usually due to maintenance or overload. The site is technically reachable but not serving content. This is different from a complete outage where no connection can be made." },
                    },
                ],
            },
        ],
    };

    const statusColor = result ? getStatusColor(result) : "#818cf8";

    return (
        <div style={{ minHeight: "100vh", background: "#080810" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Background glows */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>ToolStack</Link>
                    <span>›</span>
                    <Link href="/tools?category=dev" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Dev</Link>
                    <span>›</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>Website Down Checker</span>
                </nav>

                {/* Hero */}
                <div style={{ marginBottom: 36 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {[
                            { label: "Instant Check", color: "#34d399" },
                            { label: "HTTP Status", color: "#22d3ee" },
                            { label: "Response Time", color: "#f59e0b" },
                            { label: "No Signup", color: "#818cf8" },
                        ].map(b => (
                            <span key={b.label} style={{
                                fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999,
                                background: `${b.color}18`, border: `1px solid ${b.color}30`, color: b.color,
                            }}>{b.label}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                        Is it{" "}
                        <span style={{ background: "linear-gradient(135deg, #34d399, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Down?
                        </span>
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 520, lineHeight: 1.65, margin: 0 }}>
                        Check if any website is down or just you. See HTTP status, response time, and server availability in seconds.
                    </p>
                </div>

                {/* Input */}
                <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: 28, marginBottom: 20 }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && check()}
                            placeholder="Enter a URL — e.g. github.com"
                            style={{
                                flex: 1, minWidth: 200, padding: "14px 18px", borderRadius: 12,
                                background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)",
                                color: "white", fontSize: 15, fontFamily: "inherit", outline: "none",
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = "rgba(52,211,153,0.4)"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                        />
                        <button
                            onClick={() => check()}
                            disabled={loading || !input.trim()}
                            style={{
                                padding: "14px 28px", borderRadius: 12, border: "none", cursor: loading ? "not-allowed" : "pointer",
                                background: loading ? "rgba(52,211,153,0.3)" : "linear-gradient(135deg, #34d399, #22d3ee)",
                                color: loading ? "rgba(255,255,255,0.5)" : "#080810",
                                fontSize: 15, fontWeight: 800, transition: "all 0.2s", whiteSpace: "nowrap",
                            }}
                        >
                            {loading ? "Checking..." : "Check Site"}
                        </button>
                    </div>

                    {/* Examples */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", alignSelf: "center" }}>Try:</span>
                        {EXAMPLES.map(ex => (
                            <button key={ex} onClick={() => { setInput(ex); check(ex); }} style={{
                                fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)",
                                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 8, padding: "4px 10px", cursor: "pointer",
                            }}>
                                {ex}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", fontSize: 13, fontWeight: 600 }}>
                            {error}
                        </div>
                    )}
                </div>

                {/* Result */}
                {result && (
                    <div style={{
                        background: result.isUp ? "rgba(52,211,153,0.05)" : "rgba(248,113,113,0.05)",
                        border: `1px solid ${result.isUp ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`,
                        borderRadius: 24, padding: 32, marginBottom: 20,
                    }}>
                        {/* Status headline */}
                        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: 16,
                                background: result.isUp ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 26, flexShrink: 0,
                            }}>
                                {result.isUp ? "✓" : "✕"}
                            </div>
                            <div>
                                <p style={{ fontSize: 22, fontWeight: 900, color: result.isUp ? "#34d399" : "#f87171", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                                    {result.isUp ? "It's just you." : "It's down for everyone."}
                                </p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0 }}>
                                    {result.host} · checked at {formatTime(result.checkedAt)}
                                </p>
                            </div>
                        </div>

                        {/* Stats grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                            <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>HTTP Status</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: statusColor, letterSpacing: "-0.02em" }}>
                                    {result.status ?? "—"}
                                </div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{result.statusText || "No response"}</div>
                            </div>

                            <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Response Time</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: statusColor, letterSpacing: "-0.02em" }}>
                                    {result.responseTime ? `${result.responseTime}ms` : "—"}
                                </div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{getSpeedLabel(result.responseTime)}</div>
                            </div>

                            <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Availability</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: statusColor, letterSpacing: "-0.02em" }}>
                                    {result.isUp ? "Up" : "Down"}
                                </div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>Right now</div>
                            </div>
                        </div>

                        <button
                            onClick={() => check(result.url)}
                            style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        >
                            Check again
                        </button>
                    </div>
                )}

                {/* History */}
                {history.length > 1 && (
                    <div style={{ marginBottom: 32 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Recent Checks</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {history.slice(1).map((h, i) => (
                                <div key={i} style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    padding: "12px 16px", background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, flexWrap: "wrap", gap: 8,
                                }}>
                                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{h.host}</span>
                                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                        <span style={{ fontSize: 12, color: h.isUp ? "#34d399" : "#f87171", fontWeight: 700 }}>{h.isUp ? "Up" : "Down"}</span>
                                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{h.responseTime}ms</span>
                                        <button onClick={() => { setInput(h.url); check(h.url); }} style={{ fontSize: 12, color: "#818cf8", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 }}>Recheck</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {!result && !loading && !error && (
                    <div style={{ padding: "48px 24px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, marginBottom: 32 }}>
                        <div style={{ fontSize: 40, marginBottom: 16 }}>🌐</div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>Enter a URL to check if it's up</p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>Works with any website — paste a URL or click an example above</p>
                    </div>
                )}

                {/* HTTP Status Guide */}
                <section style={{ marginBottom: 48, padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>HTTP Status Code Guide</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                            { code: "200", label: "OK", desc: "Site is up and responding normally.", color: "#34d399" },
                            { code: "301/302", label: "Redirect", desc: "Site is up but redirecting to another URL.", color: "#22d3ee" },
                            { code: "403", label: "Forbidden", desc: "Server is reachable but blocking access.", color: "#fbbf24" },
                            { code: "404", label: "Not Found", desc: "Server is up but this page doesn't exist.", color: "#f97316" },
                            { code: "500", label: "Server Error", desc: "Server is having internal problems.", color: "#f87171" },
                            { code: "503", label: "Unavailable", desc: "Server is overloaded or under maintenance.", color: "#f87171" },
                            { code: "—", label: "No Response", desc: "Server could not be reached at all.", color: "#f87171" },
                        ].map(s => (
                            <div key={s.code} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                                <span style={{ fontSize: 13, fontWeight: 800, color: s.color, minWidth: 52, flexShrink: 0 }}>{s.code}</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)", minWidth: 100, flexShrink: 0 }}>{s.label}</span>
                                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{s.desc}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            { q: "How do I check if a website is down?", a: "Enter the URL and click Check Site. The tool sends a request to the server and returns the HTTP status code, response time, and whether the site is up or down. Results appear in seconds." },
                            { q: "What does a 200 status code mean?", a: "200 means the site is up and responding normally. 5xx codes (500, 502, 503) indicate server problems. No response at all means the server couldn't be reached." },
                            { q: "Why is the site down for me but up here?", a: "If this tool shows the site as up but you can't access it, the issue is likely with your local network, ISP, or DNS settings — not the site itself. Try flushing your DNS cache or using a different network." },
                            { q: "What is a good response time?", a: "Under 500ms is fast. 500ms–1500ms is moderate. Over 1500ms is slow. Very slow response times can indicate an overloaded server even if the site is technically 'up'." },
                            { q: "What does HTTP 503 mean?", a: "503 means the server is temporarily unavailable — usually due to maintenance or traffic overload. The site should come back online shortly. It's different from a full outage where no connection can be made." },
                        ].map(({ q, a }) => (
                            <div key={q} style={{ padding: "20px 24px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px", lineHeight: 1.4 }}>{q}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <MoreTools currentSlug="website-down-checker" />
                <AdvertiseGPTBanner />
            </div>
        </div>
    );
}
