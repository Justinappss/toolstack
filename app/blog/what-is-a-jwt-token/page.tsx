import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "What Is a JWT Token? Structure, Claims & How to Decode One | ToolStack",
    description: "JWT tokens are used in almost every modern API for authentication. Learn how they're structured, what the three parts mean, common claims to know, and how to decode one instantly.",
    alternates: { canonical: "https://toolstack.tech/blog/what-is-a-jwt-token" },
    openGraph: {
        title: "What Is a JWT Token? Structure, Claims & How to Decode One",
        description: "Understand JWT token structure, the header/payload/signature, common claims, and security best practices — plus decode one instantly.",
        url: "https://toolstack.tech/blog/what-is-a-jwt-token",
        siteName: "ToolStack",
        type: "article",
    },
};

const FAQS = [
    {
        question: "Is a JWT token secure?",
        answer: "A JWT is not encrypted by default — the header and payload are just Base64-encoded, meaning anyone who has the token can read its contents. Security comes from the signature: the server verifies the token hasn't been tampered with. Never store sensitive data (passwords, payment info) in a JWT payload. For sensitive data, use encrypted JWTs (JWE) or keep that data server-side."
    },
    {
        question: "What's the difference between JWT and a session cookie?",
        answer: "A session cookie stores a session ID on the server. The server must look up that ID in a database on every request. A JWT is stateless — the token itself contains all the user's claims, and the server verifies the signature without any database lookup. JWTs work better for distributed systems and APIs; session cookies are simpler for traditional web apps."
    },
    {
        question: "What does 'exp' mean in a JWT?",
        answer: "exp is the expiration time claim — a Unix timestamp (seconds since Jan 1, 1970) after which the token is no longer valid. For example, exp: 1745000000 means the token expires at that Unix time. Most JWTs have a short exp (15 minutes to 24 hours) to limit the damage if a token is stolen."
    },
    {
        question: "Can I decode a JWT without the secret key?",
        answer: "Yes. The header and payload of a JWT are only Base64url-encoded, not encrypted. Anyone can decode and read them. You need the secret key only to verify the signature — to confirm the token hasn't been tampered with. The ToolStack JWT Decoder decodes any JWT instantly in your browser without needing the secret."
    },
    {
        question: "What happens if a JWT signature is invalid?",
        answer: "The server should reject the request entirely. An invalid signature means the token was either tampered with, signed with a different key, or forged. A properly implemented API will return a 401 Unauthorized response. Never accept a JWT with a failed signature check."
    },
];

const accent = "#f59e0b";
const accentBg = "rgba(245,158,11,0.06)";
const accentBorder = "rgba(245,158,11,0.18)";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="What Is a JWT Token? Structure, Claims & How to Decode One"
                description="Understand JWT token structure, the header/payload/signature, common claims, and security best practices."
                url="https://toolstack.tech/blog/what-is-a-jwt-token"
                datePublished="2026-04-22"
                dateModified="2026-04-22"
                faqs={FAQS}
            />

            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>What Is a JWT Token</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Engineering</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 22, 2026 · 6 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        What Is a JWT Token? Structure, Claims & How to Decode One
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
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ A JWT has three parts: header, payload, and signature — separated by dots.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ The payload is readable by anyone. The signature proves it hasn't been tampered with.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Decode any JWT instantly with the free <Link href="/tools/jwt-decoder" style={{ color: accent }}>JWT Decoder</Link>.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>
                    <p style={{ margin: "0 0 22px" }}>
                        If you've ever built or called an API that uses authentication, you've almost certainly dealt with JWTs. They show up in Authorization headers, cookies, and local storage — three dots separating what looks like gibberish. Here's exactly what they contain and how they work.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>What JWT Stands For</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        JWT stands for <strong style={{ color: "white" }}>JSON Web Token</strong>. It's an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. The information is verified and trusted because it's digitally signed — either with a secret (HMAC) or a public/private key pair (RSA or ECDSA).
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The Three Parts of a JWT</h2>
                    <p style={{ margin: "0 0 16px" }}>A JWT looks like this:</p>
                    <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "monospace", fontSize: 13, lineHeight: 1.6, marginBottom: 24, wordBreak: "break-all" as const }}>
                        <span style={{ color: "#f59e0b" }}>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>.</span>
                        <span style={{ color: "#34d399" }}>eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</span>
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>.</span>
                        <span style={{ color: "#818cf8" }}>SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>Three Base64url-encoded segments, separated by dots:</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 14 }}>
                        {([
                            ["Header", "#f59e0b", "Specifies the token type (JWT) and the signing algorithm used (HS256, RS256, etc.). Always decode this first if you're debugging an unknown token."],
                            ["Payload", "#34d399", "Contains the claims — statements about the user and metadata. This is the useful part: user ID, email, roles, expiry time. It is not encrypted — anyone with the token can read it."],
                            ["Signature", "#818cf8", "The cryptographic proof. Created by signing the encoded header + payload with a secret key. The server uses this to verify the token hasn't been modified."],
                        ] as [string, string, string][]).map(([label, color, desc]) => (
                            <li key={label} style={{ paddingLeft: 20, position: "relative" as const }}>
                                <span style={{ position: "absolute" as const, left: 0, color: color }}>→</span>
                                <strong style={{ color: color }}>{label}</strong> — <span style={{ color: "rgba(255,255,255,0.62)" }}>{desc}</span>
                            </li>
                        ))}
                    </ul>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Common JWT Claims</h2>
                    <p style={{ margin: "0 0 16px" }}>The JWT spec defines several registered claim names. You'll see these in almost every token:</p>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Claim</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Name</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>What it contains</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["sub", "Subject", "The user ID — who this token is about"],
                                    ["iss", "Issuer", "Who issued the token (e.g., your API domain)"],
                                    ["exp", "Expiration", "Unix timestamp when the token expires"],
                                    ["iat", "Issued At", "Unix timestamp when the token was created"],
                                    ["nbf", "Not Before", "Token is not valid before this timestamp"],
                                    ["aud", "Audience", "Who the token is intended for"],
                                    ["jti", "JWT ID", "Unique identifier for this token (prevents replay attacks)"],
                                ].map(([claim, name, desc], i) => (
                                    <tr key={claim} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontWeight: 700, color: accent }}>{claim}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{name}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        Beyond these registered claims, applications add their own custom claims — things like <code style={{ fontFamily: "monospace", color: accent, fontSize: 14 }}>role: "admin"</code>, <code style={{ fontFamily: "monospace", color: accent, fontSize: 14 }}>email: "user@example.com"</code>, or <code style={{ fontFamily: "monospace", color: accent, fontSize: 14 }}>permissions: ["read", "write"]</code>.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How to Decode a JWT</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Because the header and payload are just Base64url-encoded (not encrypted), you can decode them without any key. The <Link href="/tools/jwt-decoder" style={{ color: accent }}>ToolStack JWT Decoder</Link> pastes any JWT and instantly shows you the decoded header, payload with all claims, and the signature algorithm — all in your browser with no data sent to a server.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        To decode manually: split the token on the dots, take the first two segments, and Base64url-decode each one. You'll get readable JSON. The third segment (signature) is binary and only useful for verification.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How JWT Authentication Works</h2>
                    <p style={{ margin: "0 0 16px" }}>The typical flow in an API:</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 12 }}>
                        {[
                            "User logs in with their credentials (username/password).",
                            "Server validates credentials, then creates a JWT signed with a secret key and returns it.",
                            "Client stores the JWT (memory, localStorage, or a cookie) and sends it in the Authorization header on subsequent requests: Authorization: Bearer <token>.",
                            "Server receives the request, extracts the token, verifies the signature using its secret key, and checks the exp claim. If both pass, the request is authenticated.",
                            "No database lookup needed — the user's identity and permissions are self-contained in the token.",
                        ].map((step, i) => (
                            <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: accent, marginTop: 2 }}>{i + 1}</span>
                                <span style={{ color: "rgba(255,255,255,0.62)" }}>{step}</span>
                            </li>
                        ))}
                    </ul>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>JWT Security: What Not to Do</h2>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 14 }}>
                        {[
                            ["Never store sensitive data in the payload", "The payload is readable by anyone with the token. Don't put passwords, SSNs, or private keys in there."],
                            ["Use short expiry times", "If a token is stolen, it can be used until it expires. Keep exp at 15–60 minutes for access tokens. Use refresh tokens for longevity."],
                            ["Validate the algorithm", "The alg field in the header should always be validated server-side. The infamous 'alg: none' attack exploits servers that trust whatever algorithm the token specifies."],
                            ["Use HTTPS only", "Tokens sent over plain HTTP can be intercepted. Always use HTTPS in production."],
                        ].map(([label, desc]) => (
                            <li key={label as string} style={{ paddingLeft: 20, position: "relative" as const }}>
                                <span style={{ position: "absolute" as const, left: 0, color: accent }}>→</span>
                                <strong style={{ color: "rgba(255,255,255,0.9)" }}>{label}</strong> — <span>{desc}</span>
                            </li>
                        ))}
                    </ul>
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
