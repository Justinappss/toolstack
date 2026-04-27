"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

interface JwtResult {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
    isExpired: boolean | null;
    expiresAt: string | null;
    issuedAt: string | null;
    notBefore: string | null;
    issuer: string | null;
    subject: string | null;
    audience: string | null;
}

function base64UrlDecode(str: string): string {
    // Pad to multiple of 4
    const padded = str + "===".slice((str.length + 3) % 4);
    // Replace URL-safe chars
    const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");
    try {
        return decodeURIComponent(
            atob(base64)
                .split("")
                .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
    } catch {
        return atob(base64);
    }
}

function formatTimestamp(ts: unknown): string | null {
    if (typeof ts !== "number") return null;
    const d = new Date(ts * 1000);
    return d.toUTCString();
}

function decodeJwt(token: string): JwtResult {
    const parts = token.trim().split(".");
    if (parts.length !== 3) throw new Error("Invalid JWT: must have 3 parts separated by dots.");

    let header: Record<string, unknown>;
    let payload: Record<string, unknown>;

    try {
        header = JSON.parse(base64UrlDecode(parts[0]));
    } catch {
        throw new Error("Invalid JWT: header could not be decoded.");
    }

    try {
        payload = JSON.parse(base64UrlDecode(parts[1]));
    } catch {
        throw new Error("Invalid JWT: payload could not be decoded.");
    }

    const signature = parts[2];
    const now = Math.floor(Date.now() / 1000);

    const exp = typeof payload.exp === "number" ? payload.exp : null;
    const isExpired = exp !== null ? now > exp : null;
    const expiresAt = formatTimestamp(exp);
    const issuedAt = formatTimestamp(payload.iat);
    const notBefore = formatTimestamp(payload.nbf);
    const issuer = typeof payload.iss === "string" ? payload.iss : null;
    const subject = typeof payload.sub === "string" ? payload.sub : null;
    const audience = Array.isArray(payload.aud)
        ? payload.aud.join(", ")
        : typeof payload.aud === "string"
        ? payload.aud
        : null;

    return { header, payload, signature, isExpired, expiresAt, issuedAt, notBefore, issuer, subject, audience };
}

function JsonBlock({ data }: { data: Record<string, unknown> }) {
    return (
        <pre style={{
            margin: 0,
            padding: "20px",
            background: "rgba(0,0,0,0.3)",
            borderRadius: 12,
            fontSize: 13,
            lineHeight: 1.7,
            color: "#a5f3fc",
            overflowX: "auto",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
        }}>
            {JSON.stringify(data, null, 2)
                .replace(/"([^"]+)":/g, (_, k) => `"${k}":`)
                .split("\n")
                .map((line, i) => {
                    const keyMatch = line.match(/^(\s*)"([^"]+)":/);
                    const valueMatch = line.match(/:\s*(".*"|true|false|null|\d+)/);
                    if (keyMatch && valueMatch) {
                        const indent = keyMatch[1];
                        const key = keyMatch[2];
                        const val = valueMatch[1];
                        const isString = val.startsWith('"');
                        return (
                            <span key={i}>
                                {indent}
                                <span style={{ color: "#818cf8" }}>&quot;{key}&quot;</span>
                                <span style={{ color: "rgba(255,255,255,0.4)" }}>: </span>
                                <span style={{ color: isString ? "#34d399" : "#fbbf24" }}>{val}</span>
                                {line.endsWith(",") ? <span style={{ color: "rgba(255,255,255,0.3)" }}>,</span> : null}
                                {"\n"}
                            </span>
                        );
                    }
                    return <span key={i}>{line}{"\n"}</span>;
                })}
        </pre>
    );
}

const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyIsIm5hbWUiOiJKdXN0aW4gUGlycmllIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE2MDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoder() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<JwtResult | null>(null);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        if (!input.trim()) { setResult(null); setError(""); return; }
        try {
            setResult(decodeJwt(input));
            setError("");
        } catch (e) {
            setError((e as Error).message);
            setResult(null);
        }
    }, [input]);

    const copy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 1800);
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "JWT Decoder",
                "description": "Decode and inspect any JSON Web Token instantly. View header, payload, and signature. Check expiry, issuer, subject, and all claims. 100% client-side — your token never leaves your browser.",
                "url": "https://toolstack.tech/tools/jwt-decoder",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Web",
                "browserRequirements": "Requires JavaScript",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "featureList": [
                    "Decode JWT header, payload and signature",
                    "Check token expiry status instantly",
                    "View all standard claims (iss, sub, aud, exp, iat, nbf)",
                    "Syntax-highlighted JSON output",
                    "Copy individual sections",
                    "100% client-side — token never sent to a server",
                ],
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "Dev", "item": "https://toolstack.tech/tools?category=dev" },
                    { "@type": "ListItem", "position": 3, "name": "JWT Decoder", "item": "https://toolstack.tech/tools/jwt-decoder" },
                ],
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is a JWT token?",
                        "acceptedAnswer": { "@type": "Answer", "text": "A JSON Web Token (JWT) is a compact, URL-safe token format used to securely transmit information between parties. It consists of three base64url-encoded parts: a header (algorithm and type), a payload (claims/data), and a signature — separated by dots. JWTs are widely used for authentication and authorization in web APIs." },
                    },
                    {
                        "@type": "Question",
                        "name": "Is it safe to paste my JWT token into a decoder?",
                        "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's JWT Decoder runs entirely in your browser. Your token is never sent to any server, logged, or stored. The decoding happens locally using JavaScript. That said, avoid pasting production tokens with sensitive payloads into any online tool as a general security practice — use this tool for debugging and development tokens." },
                    },
                    {
                        "@type": "Question",
                        "name": "What does the JWT decoder show?",
                        "acceptedAnswer": { "@type": "Answer", "text": "The decoder shows: the decoded header (algorithm, token type), the decoded payload (all claims including sub, iss, aud, iat, exp, nbf and any custom claims), the raw signature string, and a human-readable expiry status showing whether the token is valid or expired." },
                    },
                    {
                        "@type": "Question",
                        "name": "What are JWT claims?",
                        "acceptedAnswer": { "@type": "Answer", "text": "JWT claims are key-value pairs in the payload. Standard registered claims include: iss (issuer), sub (subject/user ID), aud (audience), exp (expiration time as Unix timestamp), iat (issued at), and nbf (not before). Custom claims can be anything the application needs to store, such as user roles or permissions." },
                    },
                    {
                        "@type": "Question",
                        "name": "Can this tool verify a JWT signature?",
                        "acceptedAnswer": { "@type": "Answer", "text": "No — signature verification requires the secret key or public key used to sign the token. This tool decodes and inspects the header and payload only, which is sufficient for debugging purposes. To verify a signature you need the signing key, which should never be shared publicly." },
                    },
                    {
                        "@type": "Question",
                        "name": "What is the best JWT decoder?",
                        "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's JWT Decoder is one of the best free options because it decodes entirely in your browser — your token is never sent to any server. It displays the header, payload, and signature with syntax highlighting, shows human-readable expiry times, and flags whether the token is currently valid or expired. No signup required." },
                    },
                ],
            },
        ],
    };

    return (
        <div style={{ minHeight: "100vh", background: "#080810" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Background glows */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 65%)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)", filter: "blur(80px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>ToolStack</Link>
                    <span>›</span>
                    <Link href="/tools?category=dev" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Dev</Link>
                    <span>›</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>JWT Decoder</span>
                </nav>

                {/* Hero */}
                <div style={{ marginBottom: 36 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {[
                            { label: "Client-Side Only", color: "#34d399" },
                            { label: "Token Never Sent", color: "#f59e0b" },
                            { label: "No Signup", color: "#818cf8" },
                            { label: "Dev Tool", color: "#22d3ee" },
                        ].map(b => (
                            <span key={b.label} style={{
                                fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999,
                                background: `${b.color}18`, border: `1px solid ${b.color}30`, color: b.color,
                            }}>{b.label}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                        JWT{" "}
                        <span style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Decoder
                        </span>
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 580, lineHeight: 1.65, margin: 0 }}>
                        Paste any JSON Web Token to instantly decode the header, payload, and claims. Check expiry, issuer, subject, and more. Your token never leaves your browser.
                    </p>
                </div>

                {/* Input */}
                <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: 28, marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                        <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                            JWT Token
                        </label>
                        <button
                            onClick={() => setInput(SAMPLE_JWT)}
                            style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, padding: "4px 12px", cursor: "pointer" }}
                        >
                            Load sample token
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Paste your JWT token here — e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U"
                        rows={5}
                        style={{
                            width: "100%", padding: "14px 16px", borderRadius: 12,
                            background: "rgba(0,0,0,0.3)", border: error ? "1px solid rgba(248,113,113,0.4)" : "1px solid rgba(255,255,255,0.1)",
                            color: "#a5f3fc", fontSize: 13, fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6,
                            transition: "border-color 0.2s",
                        }}
                        onFocus={e => { if (!error) e.currentTarget.style.borderColor = "rgba(245,158,11,0.35)"; }}
                        onBlur={e => { if (!error) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                    />
                    {error && (
                        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", fontSize: 13, fontWeight: 600 }}>
                            {error}
                        </div>
                    )}
                    {input && !error && (
                        <button
                            onClick={() => { setInput(""); setResult(null); }}
                            style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Results */}
                {result && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>

                        {/* Status bar */}
                        <div style={{
                            display: "flex", flexWrap: "wrap", gap: 12, padding: "16px 20px",
                            background: result.isExpired === true
                                ? "rgba(248,113,113,0.07)"
                                : result.isExpired === false
                                ? "rgba(52,211,153,0.07)"
                                : "rgba(255,255,255,0.03)",
                            border: `1px solid ${result.isExpired === true ? "rgba(248,113,113,0.2)" : result.isExpired === false ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.07)"}`,
                            borderRadius: 16,
                            alignItems: "center",
                        }}>
                            <span style={{
                                fontWeight: 800, fontSize: 14,
                                color: result.isExpired === true ? "#f87171" : result.isExpired === false ? "#34d399" : "rgba(255,255,255,0.6)",
                            }}>
                                {result.isExpired === true ? "⚠ Token Expired" : result.isExpired === false ? "✓ Token Valid" : "○ No Expiry Claim"}
                            </span>
                            {result.expiresAt && (
                                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                                    Expires: <span style={{ color: "rgba(255,255,255,0.7)" }}>{result.expiresAt}</span>
                                </span>
                            )}
                            {result.issuedAt && (
                                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                                    Issued: <span style={{ color: "rgba(255,255,255,0.7)" }}>{result.issuedAt}</span>
                                </span>
                            )}
                        </div>

                        {/* Claims summary */}
                        {(result.issuer || result.subject || result.audience || result.notBefore) && (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                                {result.issuer && (
                                    <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Issuer (iss)</div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "#f59e0b", wordBreak: "break-all" }}>{result.issuer}</div>
                                    </div>
                                )}
                                {result.subject && (
                                    <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Subject (sub)</div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "#818cf8", wordBreak: "break-all" }}>{result.subject}</div>
                                    </div>
                                )}
                                {result.audience && (
                                    <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Audience (aud)</div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "#22d3ee", wordBreak: "break-all" }}>{result.audience}</div>
                                    </div>
                                )}
                                {result.notBefore && (
                                    <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Not Before (nbf)</div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)", wordBreak: "break-all" }}>{result.notBefore}</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Header */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, overflow: "hidden" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                <span style={{ fontSize: 13, fontWeight: 800, color: "#f59e0b", letterSpacing: "0.04em" }}>HEADER</span>
                                <button
                                    onClick={() => copy(JSON.stringify(result.header, null, 2), "header")}
                                    style={{ fontSize: 12, fontWeight: 600, color: copied === "header" ? "#34d399" : "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                                >
                                    {copied === "header" ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <JsonBlock data={result.header} />
                        </div>

                        {/* Payload */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, overflow: "hidden" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                <span style={{ fontSize: 13, fontWeight: 800, color: "#818cf8", letterSpacing: "0.04em" }}>PAYLOAD</span>
                                <button
                                    onClick={() => copy(JSON.stringify(result.payload, null, 2), "payload")}
                                    style={{ fontSize: 12, fontWeight: 600, color: copied === "payload" ? "#34d399" : "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                                >
                                    {copied === "payload" ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <JsonBlock data={result.payload} />
                        </div>

                        {/* Signature */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, overflow: "hidden" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                <span style={{ fontSize: 13, fontWeight: 800, color: "#34d399", letterSpacing: "0.04em" }}>SIGNATURE</span>
                                <button
                                    onClick={() => copy(result.signature, "sig")}
                                    style={{ fontSize: 12, fontWeight: 600, color: copied === "sig" ? "#34d399" : "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                                >
                                    {copied === "sig" ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <div style={{ padding: "20px", background: "rgba(0,0,0,0.3)" }}>
                                <code style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", wordBreak: "break-all", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                                    {result.signature}
                                </code>
                                <p style={{ margin: "12px 0 0", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                                    Signature verification requires the secret/public key. This tool decodes only — it does not verify.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {!result && !error && !input && (
                    <div style={{ padding: "48px 24px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, marginBottom: 32 }}>
                        <div style={{ width: 64, height: 64, borderRadius: 18, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", fontSize: 28 }}>
                            🔑
                        </div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>Paste a JWT token above to decode it</p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 0 16px" }}>Or click "Load sample token" to see an example</p>
                    </div>
                )}

                {/* What is JWT section */}
                <section style={{ marginBottom: 48, padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>What is a JWT?</h2>
                    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
                        <p style={{ margin: "0 0 16px" }}>
                            A <strong style={{ color: "rgba(255,255,255,0.8)" }}>JSON Web Token (JWT)</strong> is a compact, URL-safe token format used to securely transmit information between parties. It consists of three base64url-encoded sections separated by dots:
                        </p>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
                            {[
                                { label: "Header", color: "#f59e0b", desc: "Algorithm (HS256, RS256) and token type" },
                                { label: "Payload", color: "#818cf8", desc: "Claims — user data, roles, expiry, issuer" },
                                { label: "Signature", color: "#34d399", desc: "Verifies the token wasn't tampered with" },
                            ].map(s => (
                                <div key={s.label} style={{ flex: "1 1 180px", padding: "14px 16px", background: `${s.color}10`, border: `1px solid ${s.color}25`, borderRadius: 12 }}>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.label}</div>
                                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{s.desc}</div>
                                </div>
                            ))}
                        </div>
                        <p style={{ margin: 0 }}>
                            JWTs are widely used in <strong style={{ color: "rgba(255,255,255,0.8)" }}>API authentication</strong> — when you log in to an app, a JWT is issued and sent with every subsequent request to prove your identity. The payload is only base64-encoded, not encrypted, so never put sensitive data (passwords, secrets) in a JWT payload.
                        </p>
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            { q: "What is a JWT token?", a: "A JSON Web Token (JWT) is a compact token used for authentication and authorization. It has three parts: a header (algorithm), a payload (claims/user data), and a signature. It's base64url encoded and separated by dots." },
                            { q: "Is it safe to paste my JWT here?", a: "Yes — this decoder runs entirely in your browser. Your token is never sent to any server. That said, avoid pasting live production tokens with sensitive data into any online tool as a security best practice." },
                            { q: "Why can't you verify the signature?", a: "Signature verification requires the secret key or public key used to sign the token. That key is never in the token itself. This tool decodes and inspects the header and payload, which is what you need for debugging." },
                            { q: "What are JWT claims?", a: "Claims are key-value pairs in the payload. Standard ones include: iss (issuer), sub (subject/user ID), aud (audience), exp (expiry timestamp), iat (issued at), and nbf (not before). Custom claims can include roles, permissions, or any application data." },
                            { q: "What does 'token expired' mean?", a: "The exp claim in the payload is a Unix timestamp. If the current time is past that timestamp, the token is expired and will be rejected by the server. You need to refresh or re-issue the token." },
                            { q: "What is the best JWT decoder?", a: "ToolStack's JWT Decoder is one of the best free options because it decodes entirely in your browser — your token is never sent to any server. It displays the header, payload, and signature with syntax highlighting, shows human-readable expiry times, and flags whether the token is currently valid or expired. No signup required." },
                        ].map(({ q, a }) => (
                            <div key={q} style={{ padding: "20px 24px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px", lineHeight: 1.4 }}>{q}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <MoreTools currentSlug="jwt-decoder" />
                
            </div>
        </div>
    );
}
