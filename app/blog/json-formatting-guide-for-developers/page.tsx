import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "JSON Formatting Guide for Developers: Syntax, Validation & Common Errors",
    description: "JSON is everywhere — APIs, config files, databases. This guide covers syntax rules, common errors, and how to validate and format JSON without installing.",
    alternates: { canonical: "https://toolstack.tech/blog/json-formatting-guide-for-developers" },
    openGraph: {
        title: "JSON Formatting Guide for Developers: Syntax, Validation & Common Errors",
        description: "JSON syntax rules, common errors explained, and how to validate and format JSON instantly in your browser.",
        url: "https://toolstack.tech/blog/json-formatting-guide-for-developers",
        siteName: "ToolStack",
        type: "article",
    },
};

const FAQS = [
    {
        question: "What is the difference between JSON and JavaScript objects?",
        answer: "JSON is a text format — a string. A JavaScript object is a live data structure in memory. JSON requires all keys to be double-quoted strings, does not allow trailing commas, and cannot contain functions, undefined values, or comments. JavaScript objects are more permissive. JSON.parse() converts a JSON string into a JS object; JSON.stringify() does the reverse."
    },
    {
        question: "Why does JSON not allow comments?",
        answer: "JSON was designed by Douglas Crockford as a minimal, machine-readable data interchange format. Comments were intentionally excluded to keep parsing unambiguous and fast. If you need annotated config files, consider JSONC (JSON with Comments, used by VS Code) or YAML instead."
    },
    {
        question: "What is the difference between null and undefined in JSON?",
        answer: "JSON supports null as a valid value. It does not support undefined at all — if you try to JSON.stringify() an object with undefined values, those keys are silently dropped from the output. This is a common source of bugs when serialising JavaScript objects."
    },
    {
        question: "How do I validate JSON without installing anything?",
        answer: "Use ToolStack's free JSON Formatter — paste your JSON, and it instantly highlights syntax errors with the exact line and character position. No signup, no install, runs entirely in your browser."
    },
];

const accent = "#34d399";
const accentBg = "rgba(52,211,153,0.06)";
const accentBorder = "rgba(52,211,153,0.18)";

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
                headline="JSON Formatting Guide for Developers: Syntax, Validation & Common Errors"
                description="JSON is everywhere — APIs, config files, databases. This guide covers syntax rules, common errors, and how to validate and format JSON without installing anything."
                url="https://toolstack.tech/blog/json-formatting-guide-for-developers"
                datePublished="2026-04-16"
                dateModified="2026-04-16"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>JSON Formatting Guide</span>
                    </div>

                    {/* Tag + meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Engineering</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 16, 2026 · 7 min read</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        JSON Formatting Guide for Developers: Syntax, Validation & Common Errors
                    </h1>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · April 16, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* TL;DR */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ All JSON keys must be double-quoted strings — single quotes are invalid.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Trailing commas are not allowed and will throw a parse error.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Use the free <Link href="/tools/json-formatter" style={{ color: "#818cf8" }}>JSON Formatter</Link> to validate and beautify instantly in your browser.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                {/* Body */}
                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <p style={{ margin: "0 0 22px" }}>
                        JSON (JavaScript Object Notation) is the default language of APIs, configuration files, and data storage across virtually every modern stack. Despite its apparent simplicity, it has strict syntax rules that catch developers out repeatedly — especially the ones that work silently in JavaScript but break immediately in JSON.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The Six JSON Data Types</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        JSON supports exactly six value types. Understanding them prevents the most common serialisation bugs.
                    </p>

                    {/* Data types table */}
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Type</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Example</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["String", '"hello"', "Always double-quoted. Single quotes are invalid."],
                                    ["Number", "42, 3.14, -7", "No quotes. NaN and Infinity are not valid JSON numbers."],
                                    ["Boolean", "true, false", "Lowercase only. True or False will parse error."],
                                    ["Null", "null", "Lowercase. undefined is not a valid JSON value."],
                                    ["Array", '[1, "two", true]', "Ordered list. Can mix types. No trailing comma."],
                                    ["Object", '{"key": "value"}', "Keys must be strings. No trailing comma on last pair."],
                                ].map(([type, example, note], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{type}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{example}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The Most Common JSON Errors</h2>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 12px", lineHeight: 1.3 }}>1. Trailing Commas</h3>
                    <p style={{ margin: "0 0 16px" }}>
                        This is the most frequent JSON error. JavaScript objects and arrays allow trailing commas; JSON does not. The last item in an object or array must have no comma after it.
                    </p>

                    {/* Invalid code block */}
                    <div style={{ padding: "18px 22px", borderRadius: 12, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.04)", margin: "0 0 12px" }}>
                        <p style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(239,68,68,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>Invalid — will throw SyntaxError</p>
                        <pre style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "monospace", whiteSpace: "pre-wrap" as const }}>{`{
  "name": "Justin",
  "role": "founder",   ← trailing comma
}`}</pre>
                    </div>

                    {/* Valid code block */}
                    <div style={{ padding: "18px 22px", borderRadius: 12, border: `1px solid ${accentBorder}`, background: accentBg, margin: "0 0 24px" }}>
                        <p style={{ fontSize: 11, fontFamily: "monospace", color: accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>Valid</p>
                        <pre style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "monospace", whiteSpace: "pre-wrap" as const }}>{`{
  "name": "Justin",
  "role": "founder"
}`}</pre>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 12px", lineHeight: 1.3 }}>2. Single-Quoted Keys or Values</h3>
                    <p style={{ margin: "0 0 16px" }}>
                        JSON requires double quotes. Single quotes are not valid, even though they work fine in JavaScript object literals. This catches people who copy-paste from JS code into a JSON file.
                    </p>
                    <div style={{ padding: "18px 22px", borderRadius: 12, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.04)", margin: "0 0 24px" }}>
                        <p style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(239,68,68,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>Invalid</p>
                        <pre style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>{`{'name': 'Justin'}`}</pre>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 12px", lineHeight: 1.3 }}>3. Unescaped Special Characters in Strings</h3>
                    <p style={{ margin: "0 0 16px" }}>
                        If a string contains a double quote, backslash, or control character (like a newline), it must be escaped. A raw newline inside a JSON string is invalid.
                    </p>
                    <div style={{ padding: "18px 22px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", margin: "0 0 24px" }}>
                        <p style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>Escape sequences</p>
                        <pre style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "monospace", whiteSpace: "pre-wrap" as const }}>{`\\" → escaped double quote
\\\\ → escaped backslash
\\n → newline
\\t → tab`}</pre>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Validate and Format Without Installing Anything</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        When you&apos;re debugging an API response or cleaning up a config file, you don&apos;t need a local install or a paid tool. ToolStack&apos;s <Link href="/tools/json-formatter" style={{ color: "#818cf8" }}>JSON Formatter</Link> runs entirely in your browser — paste any JSON, get instant validation with exact error positions, and a clean formatted output you can copy back in one click.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        It also handles minification (compress JSON for API payloads) and tree-view navigation for large nested structures — both free, no signup.
                    </p>
                </div>

                {/* FAQs */}
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


                {/* ─── Related Articles ── */}
                <div style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 20 }}>
                        Related Articles
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                                                <Link href="/blog/regex-cheat-sheet-beginners" style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "14px 18px", borderRadius: 12,
                            background: "rgba(255,255,255,0.025)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            textDecoration: "none", color: "rgba(255,255,255,0.7)",
                            fontSize: 14, fontWeight: 600,
                            transition: "background 0.15s, border-color 0.15s",
                        }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            Regex Cheat Sheet
                        </Link>
                        <Link href="/blog/what-is-a-jwt-token" style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "14px 18px", borderRadius: 12,
                            background: "rgba(255,255,255,0.025)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            textDecoration: "none", color: "rgba(255,255,255,0.7)",
                            fontSize: 14, fontWeight: 600,
                            transition: "background 0.15s, border-color 0.15s",
                        }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            What Is a JWT Token
                        </Link>
                        <Link href="/blog/mastering-json-visual-guide" style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "14px 18px", borderRadius: 12,
                            background: "rgba(255,255,255,0.025)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            textDecoration: "none", color: "rgba(255,255,255,0.7)",
                            fontSize: 14, fontWeight: 600,
                            transition: "background 0.15s, border-color 0.15s",
                        }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            Mastering JSON Visual Guide
                        </Link>
                    </div>
                </div>
                {/* Back to blog */}
                <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link href="/blog" style={{ color: "#818cf8", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                        Back to Blog
                    </Link>
                    <Link href="/tools/category/dev" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        Explore Developer Tools
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </Link>
                </div>

            </div>
        </main>
    );
}
