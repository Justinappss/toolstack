"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

interface IpData {
    ip: string;
    city: string;
    region: string;
    country_name: string;
    country_code: string;
    org: string;
    timezone: string;
    latitude: number | null;
    longitude: number | null;
    hostname: string | null;
    currency: string | null;
    languages: string | null;
    is_local: boolean;
}

const FLAG_URL = (code: string) => `https://flagcdn.com/32x24/${code.toLowerCase()}.png`;

const FIELD_STYLE: React.CSSProperties = {
    padding: "18px 20px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "IP Address Lookup",
            "description": "Find your public IP address instantly. See your location, ISP, timezone, hostname and coordinates. Also look up any IP address.",
            "url": "https://toolstack.tech/tools/ip-address-lookup",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                { "@type": "ListItem", "position": 2, "name": "Utility", "item": "https://toolstack.tech/tools?category=utility" },
                { "@type": "ListItem", "position": 3, "name": "IP Address Lookup", "item": "https://toolstack.tech/tools/ip-address-lookup" },
            ],
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "What is my IP address?", "acceptedAnswer": { "@type": "Answer", "text": "Your IP address is a unique number assigned to your device by your Internet Service Provider (ISP). It identifies your device on the internet and is used to route data to and from your connection. Use this tool to see your current public IP address instantly." } },
                { "@type": "Question", "name": "Can websites see my IP address?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every website you visit can see your public IP address. It's visible in every request your browser makes. To hide your IP, you need a VPN or proxy service, which replaces your real IP with one from the VPN server." } },
                { "@type": "Question", "name": "What does my IP address reveal?", "acceptedAnswer": { "@type": "Answer", "text": "Your IP reveals your approximate location (city and region), your ISP, and your timezone. It does not reveal your exact home address, name, or personal details. The location shown is typically the location of your ISP's nearest server, not your exact address." } },
                { "@type": "Question", "name": "How do I hide my IP address?", "acceptedAnswer": { "@type": "Answer", "text": "The most common ways to hide your IP are: (1) Use a VPN — it routes your traffic through a server in another location, replacing your IP. (2) Use Tor browser — routes through multiple nodes. (3) Use a proxy server. A VPN is the most practical option for most users." } },
                { "@type": "Question", "name": "What is the best IP address lookup tool?", "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's IP Address Lookup is one of the best free options — it automatically detects your public IP on page load and shows your city, region, country, ISP, timezone, coordinates, and hostname. You can also look up any IP address. It's free, instant, and requires no signup." } },
            ],
        },
    ],
};

export default function IpLookupPage() {
    const [myData, setMyData] = useState<IpData | null>(null);
    const [myLoading, setMyLoading] = useState(true);
    const [myError, setMyError] = useState("");

    const [lookupInput, setLookupInput] = useState("");
    const [lookupData, setLookupData] = useState<IpData | null>(null);
    const [lookupLoading, setLookupLoading] = useState(false);
    const [lookupError, setLookupError] = useState("");

    useEffect(() => {
        fetch("/api/ip-lookup")
            .then(r => r.json())
            .then(d => {
                if (d.error) throw new Error(d.error);
                setMyData(d);
            })
            .catch(e => setMyError(e.message))
            .finally(() => setMyLoading(false));
    }, []);

    const lookup = async () => {
        if (!lookupInput.trim()) return;
        setLookupLoading(true);
        setLookupError("");
        setLookupData(null);
        try {
            const res = await fetch("/api/ip-lookup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ip: lookupInput.trim() }),
            });
            const d = await res.json();
            if (d.error) throw new Error(d.error);
            setLookupData(d);
        } catch (e: unknown) {
            setLookupError(e instanceof Error ? e.message : "Lookup failed");
        } finally {
            setLookupLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#06060c" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(6,6,12,0) 60%)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                padding: "56px 24px 40px",
            }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>
                    <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>ToolStack</Link>
                        <span>›</span>
                        <Link href="/tools?category=utility" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Utility</Link>
                        <span>›</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>IP Address Lookup</span>
                    </nav>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                        {[
                            { label: "Instant", color: "#818cf8" },
                            { label: "Geolocation", color: "#34d399" },
                            { label: "ISP Detection", color: "#f59e0b" },
                            { label: "No Signup", color: "#22d3ee" },
                        ].map(b => (
                            <span key={b.label} style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: `${b.color}18`, border: `1px solid ${b.color}30`, color: b.color }}>{b.label}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                        IP Address Lookup
                    </h1>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65, maxWidth: 520 }}>
                        See your public IP address, location, ISP, timezone and more — instantly. Or look up any IP address.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px" }}>

                {/* My IP card */}
                <div style={{ marginBottom: 32, padding: 28, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "#818cf8", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>Your IP Address</p>

                    {myLoading && (
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Detecting your IP…</div>
                    )}
                    {myError && (
                        <div style={{ color: "#f87171", fontSize: 14 }}>{myError}</div>
                    )}
                    {myData && (
                        <>
                            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                                <div style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", fontFamily: "monospace" }}>
                                    {myData.ip}
                                </div>
                                {myData.country_code && (
                                    <img src={FLAG_URL(myData.country_code)} alt={myData.country_name} style={{ height: 24, borderRadius: 3 }} />
                                )}
                            </div>
                            <IpDetails data={myData} />
                        </>
                    )}
                </div>

                {/* Lookup any IP */}
                <div style={{ marginBottom: 40, padding: 28, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>Look Up Any IP Address</p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <input
                            value={lookupInput}
                            onChange={e => setLookupInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && lookup()}
                            placeholder="e.g. 8.8.8.8"
                            style={{
                                flex: 1, minWidth: 200, padding: "13px 16px", borderRadius: 12,
                                background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)",
                                color: "white", fontSize: 15, fontFamily: "monospace", outline: "none",
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                        />
                        <button
                            onClick={lookup}
                            disabled={lookupLoading || !lookupInput.trim()}
                            style={{
                                padding: "13px 24px", borderRadius: 12, border: "none",
                                background: lookupLoading || !lookupInput.trim() ? "rgba(99,102,241,0.3)" : "linear-gradient(135deg, #6366f1, #818cf8)",
                                color: "white", fontSize: 14, fontWeight: 800, cursor: lookupLoading ? "not-allowed" : "pointer",
                            }}
                        >
                            {lookupLoading ? "Looking up…" : "Look Up"}
                        </button>
                    </div>
                    {lookupError && (
                        <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, color: "#f87171", fontSize: 13 }}>
                            {lookupError}
                        </div>
                    )}
                    {lookupData && (
                        <div style={{ marginTop: 20 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 22, fontWeight: 900, color: "white", fontFamily: "monospace" }}>{lookupData.ip}</span>
                                {lookupData.country_code && (
                                    <img src={FLAG_URL(lookupData.country_code)} alt={lookupData.country_name} style={{ height: 20, borderRadius: 3 }} />
                                )}
                            </div>
                            <IpDetails data={lookupData} />
                        </div>
                    )}
                </div>

                {/* Info cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 56 }}>
                    {[
                        { icon: "🔍", title: "What is an IP?", desc: "An IP address is a unique number assigned to every device on the internet. It identifies where to send data." },
                        { icon: "📍", title: "Location Accuracy", desc: "Geolocation shows your ISP's server location — typically your city or region, not your exact address." },
                        { icon: "🛡️", title: "Hide Your IP", desc: "Use a VPN to mask your real IP address. Your traffic routes through the VPN server instead." },
                        { icon: "🔒", title: "IPv4 vs IPv6", desc: "IPv4 looks like 8.8.8.8. IPv6 is longer: 2001:4860:4860::8888. Both are supported." },
                    ].map(c => (
                        <div key={c.title} style={FIELD_STYLE}>
                            <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
                            <p style={{ fontSize: 13, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{c.title}</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Expert Guide */}
                <section style={{ marginBottom: 48, padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>How IP Address Geolocation Works</h2>
                    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
                        <p style={{ margin: "0 0 16px" }}>
                            When you look up an IP address, the geolocation data (city, country, region) is not pulled from a magical GPS system. Instead, it relies on <strong style={{ color: "rgba(255,255,255,0.8)" }}>IP geolocation databases</strong> maintained by organizations like MaxMind and IP2Location. These providers constantly map IP blocks to physical locations based on data from internet service providers (ISPs), routing registries, and network telemetry.
                        </p>
                        <p style={{ margin: "0 0 16px" }}>
                            The accuracy of an IP lookup varies. At a country level, accuracy is over 99%. At a city level, it drops to roughly 50-80% depending on the country. Because your ISP dynamically assigns IPs, the location shown is usually the <strong style={{ color: "rgba(255,255,255,0.8)" }}>location of the ISP's data center or routing node</strong>, not your physical street address. This is why tools cannot reveal your exact house.
                        </p>
                        <p style={{ margin: 0 }}>
                            If you see an unexpected location, it simply means your ISP is routing your traffic through a data center in that city. If you use a VPN, the lookup will show the VPN server's location, successfully masking your real IP.
                        </p>
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    {[
                        { q: "What is my IP address?", a: "Your IP address is a unique number assigned to your device by your ISP. It identifies your device on the internet. This tool detects it automatically when you load the page." },
                        { q: "Can websites see my IP address?", a: "Yes. Every website you visit receives your IP address. It's part of how the internet works. To hide it, use a VPN — it replaces your real IP with one from the VPN server's location." },
                        { q: "What does my IP reveal?", a: "Your approximate city, region, country, ISP and timezone. It does not reveal your home address, name, or personal details." },
                        { q: "How do I hide my IP address?", a: "Use a VPN service. It routes your traffic through a server elsewhere, replacing your IP. Tor browser also works but is slower. A VPN is the most practical option for most people." },
                        { q: "What's the difference between IPv4 and IPv6?", a: "IPv4 (like 8.8.8.8) is the older format with ~4 billion addresses. IPv6 (like 2001:4860::1) is the newer format with virtually unlimited addresses. Most connections still use IPv4, but IPv6 adoption is growing." },
                        { q: "What is the best IP address lookup tool?", a: "ToolStack's IP Address Lookup is one of the best free options — it automatically detects your public IP on page load and shows your city, region, country, ISP, timezone, coordinates, and hostname. You can also look up any IP address. Free, instant, no signup." },
                        { q: "Are IP addresses permanent?", a: "Most residential internet connections use dynamic IP addresses, meaning your IP can change periodically (e.g., when you restart your router). Businesses often pay for static (permanent) IP addresses." },
                    ].map(({ q, a }) => (
                        <div key={q} style={{ marginBottom: 16, padding: "18px 20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{q}</h3>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{a}</p>
                        </div>
                    ))}
                </section>

                {/* SEO Description */}
                <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>IP Address Lookup: Free Online Tool</h2>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: 16 }}>
                      Your public IP address reveals more about you than most people realize: your approximate geographic location, your Internet Service Provider, your timezone, and in some cases even your organization. Whether you're debugging a network issue, checking what information a website can see about you, or configuring a geo-restricted service, knowing your public IP is genuinely useful.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Open the tool and it instantly displays your public IP address, ISP name, approximate city and region, country, latitude/longitude coordinates, timezone, and whether you're on a VPN or proxy. All information is retrieved locally by your browser — nothing is tracked or logged. Enter any IP address for the same full breakdown.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Common uses include checking what a website sees when you visit it, verifying that a VPN or proxy is working correctly, troubleshooting email deliverability issues, configuring geo-restriction rules in Cloudflare or nginx, and verifying that a new server's IP is correctly configured before DNS propagation.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      Most "what is my IP" sites show you the IP and nothing else. Ours shows you everything: ISP, location, coordinates, timezone, VPN detection, and ASN information. It also works for looking up any IP address, not just your own. Free, no tracking, no logs, no signup required.
                    </p>
                  </div>
                </section>

                <MoreTools currentSlug="ip-address-lookup" />
                
            </div>
        </div>
    );
}

function IpDetails({ data }: { data: IpData }) {
    const fields = [
        { label: "Location", value: [data.city, data.region, data.country_name].filter(Boolean).join(", ") || "Unknown" },
        { label: "ISP / Organisation", value: data.org ?? "Unknown" },
        { label: "Timezone", value: data.timezone ?? "Unknown" },
        { label: "Hostname", value: data.hostname ?? "Not available" },
        { label: "Coordinates", value: data.latitude != null && data.longitude != null ? `${data.latitude}, ${data.longitude}` : "Not available" },
        { label: "Currency", value: data.currency ?? "Not available" },
    ];

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
            {fields.map(f => (
                <div key={f.label} style={{ padding: "12px 16px", background: "rgba(0,0,0,0.2)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 4px" }}>{f.label}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)", margin: 0, wordBreak: "break-word" }}>{f.value}</p>
                </div>
            ))}
        </div>
    );
}
