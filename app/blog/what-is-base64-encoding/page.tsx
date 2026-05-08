import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "What Is Base64 Encoding and When Should You Use It?",
    description: "Base64 turns binary data into plain text so it can travel safely over the web. Learn how it works, when to use it, and when not to — with a free.",
    alternates: { canonical: "https://toolstack.tech/blog/what-is-base64-encoding" },
    openGraph: {
        title: "What Is Base64 Encoding and When Should You Use It?",
        description: "Base64 turns binary data into plain text so it can travel safely over the web. Learn how it works, when to use it, and when not to.",
        url: "https://toolstack.tech/blog/what-is-base64-encoding",
        siteName: "ToolStack",
        type: "article",
    },
};

const FAQS = [
    {
        question: "Is Base64 a form of encryption?",
        answer: "No. Base64 is encoding, not encryption. It transforms data into a different representation, but anyone who sees the Base64 string can decode it instantly — no key required. Never use Base64 to hide sensitive data like passwords or tokens. Use proper encryption (AES, RSA) for that. Base64 is for safe transport, not security."
    },
    {
        question: "Why does Base64 output end with == or =?",
        answer: "Base64 works in groups of 3 bytes at a time, converting them to 4 characters. If the input isn't divisible by 3, padding characters (=) are added to fill the final group. One = means the last group had 2 bytes; == means it had 1 byte. The padding ensures decoders know exactly where the data ends."
    },
    {
        question: "Does Base64 make data larger?",
        answer: "Yes — Base64-encoded data is roughly 33% larger than the original. Every 3 bytes of input become 4 characters of output. This is the trade-off: you gain compatibility (plain text travels anywhere) but pay in size. For large files like images or videos, this overhead adds up — which is why Base64 is better suited to small payloads like API tokens or embedded icons."
    },
    {
        question: "What is the difference between Base64 and Base64url?",
        answer: "Standard Base64 uses + and / characters, which have special meaning in URLs (+ is a space, / is a path separator). Base64url replaces + with - and / with _, making the output safe to include in URLs and filenames without percent-encoding. JWTs use Base64url for exactly this reason. When in doubt about which to use, check whether your output will appear in a URL — if yes, use Base64url."
    },
    {
        question: "Can I use Base64 to embed images in HTML or CSS?",
        answer: "Yes. Data URIs use Base64 to embed image content directly in HTML or CSS, eliminating a separate HTTP request. The format is: data:[mimetype];base64,[encoded-data]. For example: <img src=\"data:image/png;base64,iVBORw0KGgo...\">. This is useful for small icons (under ~5KB) where the round-trip cost of an HTTP request outweighs the 33% size overhead. For larger images, a regular URL is faster."
    },
];

const accent = "#f59e0b";
const accentBg = "rgba(245,158,11,0.06)";
const accentBorder = "rgba(245,158,11,0.18)";

const mono: React.CSSProperties = {
    fontFamily: "monospace",
    background: "rgba(245,158,11,0.1)",
    border: "1px solid rgba(245,158,11,0.2)",
    padding: "2px 7px",
    borderRadius: 5,
    fontSize: "0.88em",
    color: "#f59e0b",
};

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="What Is Base64 Encoding and When Should You Use It?"
                description="Base64 turns binary data into plain text so it can travel safely over the web. Learn how it works, when to use it, and when not to."
                url="https://toolstack.tech/blog/what-is-base64-encoding"
                datePublished="2026-05-03"
                dateModified="2026-05-03"
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
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>What Is Base64 Encoding</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Engineering</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>May 3, 2026 · 5 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        What Is Base64 Encoding and When Should You Use It?
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · May 3, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Base64 converts binary data to plain ASCII text so it travels safely through systems that only handle text.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ It is encoding, not encryption — anyone can decode it instantly. Never use it for security.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Encode and decode any string instantly with the free <Link href="/tools/base64-encoder-decoder" style={{ color: accent }}>Base64 Encoder / Decoder</Link>.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>
                    <p style={{ margin: "0 0 22px" }}>
                        You have almost certainly encountered Base64 without knowing it. It appears in JWT tokens, email attachments, embedded images in CSS, API authentication headers, and data URIs. Understanding what it is — and what it is not — saves you from two common mistakes: thinking it provides security, and not knowing when it is the right tool.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Use the <Link href="/tools/base64-encoder-decoder" style={{ color: accent }}>Base64 Encoder / Decoder</Link> alongside this post to see the output for any input you have in mind.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The Problem Base64 Solves</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        Binary data — images, audio, compiled files — contains byte values that many text-based protocols cannot handle. Email (SMTP), HTTP headers, and XML parsers all expect printable ASCII characters. If you try to send raw binary through them, the data gets corrupted.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Base64 solves this by re-encoding binary bytes into a 64-character alphabet: <code style={mono}>A–Z</code>, <code style={mono}>a–z</code>, <code style={mono}>0–9</code>, <code style={mono}>+</code>, and <code style={mono}>/</code>. Every byte value in that alphabet is printable and safe to transmit through any text-based system.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How It Works</h2>
                    <p style={{ margin: "0 0 16px" }}>Base64 converts data in groups of 3 bytes → 4 characters:</p>
                    <div style={{ padding: "20px 24px", borderRadius: 12, background: "rgba(245,158,11,0.04)", border: `1px solid ${accentBorder}`, marginBottom: 24, fontFamily: "monospace", fontSize: 13, lineHeight: 2 }}>
                        <div style={{ color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{`// Input: "Man" (3 bytes)`}</div>
                        <div style={{ color: "rgba(255,255,255,0.7)" }}>M = 77  →  01001101</div>
                        <div style={{ color: "rgba(255,255,255,0.7)" }}>a = 97  →  01100001</div>
                        <div style={{ color: "rgba(255,255,255,0.7)" }}>n = 110 →  01101110</div>
                        <div style={{ color: "rgba(255,255,255,0.3)", margin: "8px 0" }}>──────────────────────────</div>
                        <div style={{ color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{`// Combined 24 bits → split into four 6-bit groups:`}</div>
                        <div style={{ color: "rgba(255,255,255,0.7)" }}>010011 | 010110 | 000101 | 101110</div>
                        <div style={{ color: "rgba(255,255,255,0.3)", margin: "8px 0" }}>──────────────────────────</div>
                        <div style={{ color: accent, fontWeight: 700 }}>Output: "TWFu"</div>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        Each 6-bit group maps to one of the 64 characters in the Base64 alphabet. 3 input bytes always produce exactly 4 output characters. If the input length is not divisible by 3, <code style={mono}>=</code> padding is added to complete the final group.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Where You Will See It</h2>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Use Case</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Example</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>Why Base64?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["HTTP Basic Auth", "Authorization: Basic dXNlcjpwYXNz", "Encodes username:password for headers"],
                                    ["JWT tokens", "eyJhbGciOiJSUzI1NiJ9...", "Encodes header + payload as Base64url"],
                                    ["Email attachments", "MIME encoded files", "SMTP only handles 7-bit ASCII text"],
                                    ["Data URIs", "data:image/png;base64,...", "Embeds binary images in HTML/CSS"],
                                    ["API keys / secrets", "Many SaaS token formats", "Compact, URL-safe string representation"],
                                    ["SSH keys", "ssh-rsa AAAA...", "Encodes the binary key material"],
                                ].map(([use, example, why], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{use}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", color: accent, fontSize: 12 }}>{example}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{why}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Base64 vs Base64url</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        Standard Base64 uses <code style={mono}>+</code> and <code style={mono}>/</code>, which are reserved characters in URLs. Base64url replaces them:
                    </p>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Variant</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Characters</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>Use when</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Base64", "+ and /", "Email, file storage, data URIs"],
                                    ["Base64url", "- and _ (instead of + and /)", "URLs, JWTs, filenames, query strings"],
                                ].map(([variant, chars, use], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", fontWeight: 600, fontFamily: "monospace" }}>{variant}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", color: accent }}>{chars}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>{use}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>When Not to Use It</h2>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 28 }}>
                        {[
                            ["Do not use it for security", "Base64 is reversible by anyone with a decoder. Storing passwords as Base64 is equivalent to storing them in plain text. Use bcrypt, scrypt, or Argon2 for passwords. Use AES-256 for symmetric encryption of sensitive data."],
                            ["Do not use it for large files", "Base64 inflates file size by ~33%. A 10MB image becomes ~13.3MB encoded. Serve images as files with proper caching rather than embedding them as data URIs."],
                            ["Do not use it as compression", "Base64 makes data larger, not smaller. If you need to reduce payload size, use gzip or Brotli compression, then optionally encode if the transport requires text."],
                        ].map(([title, body]) => (
                            <div key={title as string} style={{ padding: "18px 22px", borderRadius: 12, background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)" }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: "#f87171", margin: "0 0 6px" }}>✗ {title}</p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65 }}>{body}</p>
                            </div>
                        ))}
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Quick Reference: Encoding in Code</h2>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 24 }}>
                        {[
                            ["JavaScript (browser)", 'btoa("hello")          // encode\natob("aGVsbG8=")     // decode'],
                            ["JavaScript (Node.js)", 'Buffer.from("hello").toString("base64")      // encode\nBuffer.from("aGVsbG8=", "base64").toString() // decode'],
                            ["Python", 'import base64\nbase64.b64encode(b"hello")  # encode\nbase64.b64decode("aGVsbG8=")  # decode'],
                            ["Bash", 'echo -n "hello" | base64     # encode\necho "aGVsbG8=" | base64 -d  # decode'],
                        ].map(([lang, code]) => (
                            <div key={lang as string} style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" as const, letterSpacing: "0.07em", margin: "0 0 10px" }}>{lang}</p>
                                <pre style={{ fontFamily: "monospace", fontSize: 12, color: accent, margin: 0, whiteSpace: "pre-wrap" as const }}>{code}</pre>
                            </div>
                        ))}
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        For one-off tasks, skip the code entirely — paste any string into the <Link href="/tools/base64-encoder-decoder" style={{ color: accent }}>Base64 Encoder / Decoder</Link> and get the result instantly.
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
