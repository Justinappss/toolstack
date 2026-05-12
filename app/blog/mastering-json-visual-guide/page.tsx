import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "JSON for Beginners: A Visual Guide to Formatting & Validation",
    description: "JSON is the language of APIs and config files. This visual guide covers syntax rules, common errors, nested structures, and how to validate JSON instantly.",
    alternates: { canonical: "https://toolstack.tech/blog/mastering-json-visual-guide" },
    openGraph: {
        title: "JSON for Beginners: A Visual Guide to Formatting & Validation",
        description: "Covers JSON syntax rules, common errors, nested structures, and how to validate JSON instantly in your browser. Free JSON formatter included.",
        url: "https://toolstack.tech/blog/mastering-json-visual-guide",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-04-15",
        modifiedTime: "2026-04-15",
        images: [
            {
                url: "https://toolstack.tech/og-image.png",
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "JSON for Beginners: A Visual Guide to Formatting & Validation",
        description: "Covers JSON syntax rules, common errors, nested structures, and how to validate JSON instantly in your browser. Free JSON formatter included.",
        images: ["https://toolstack.tech/og-image.png"],
    },
};

const FAQS = [
    {
        question: "What is JSON used for?",
        answer: "JSON (JavaScript Object Notation) is used to transmit structured data between a server and a client — it is the standard format for REST API responses. It is also widely used for configuration files (package.json, tsconfig.json), storing user preferences, and exporting/importing data between systems."
    },
    {
        question: "What is the difference between JSON and JavaScript objects?",
        answer: "JSON looks like a JavaScript object but has stricter rules: all keys must be double-quoted strings, trailing commas are not allowed, and values can only be strings, numbers, booleans, null, arrays, or nested objects. JavaScript objects allow unquoted keys, single quotes, and trailing commas. JSON is a data format; a JavaScript object is a runtime data structure."
    },
    {
        question: "Why does JSON not support comments?",
        answer: "JSON was designed by Douglas Crockford specifically as a minimal data interchange format. Comments were excluded intentionally to keep parsing simple and deterministic. If you need comments in config files, consider JSONC (JSON with Comments) which is supported by TypeScript's tsconfig.json, or YAML."
    },
    {
        question: "How do I validate JSON online?",
        answer: "The easiest way is to paste your JSON into the ToolStack JSON Formatter. It will instantly highlight syntax errors with exact line positions, show a formatted version, and allow you to minify or copy the clean output. It runs entirely in your browser — no data is sent to a server."
    },
    {
        question: "What is the difference between JSON.parse() and JSON.stringify()?",
        answer: "JSON.parse() converts a JSON string into a JavaScript object — you use it when you receive data from an API. JSON.stringify() converts a JavaScript object into a JSON string — you use it when you need to send data or store it. A common pattern: fetch('/api/data').then(r => r.json()) uses JSON.parse() internally."
    },
];

const accent = "#34d399";
const accentBg = "rgba(52,211,153,0.06)";
const accentBorder = "rgba(52,211,153,0.18)";

const codeStyle: React.CSSProperties = {
    padding: "20px 24px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.02)",
    margin: "0 0 24px",
    overflowX: "auto",
};

const pre: React.CSSProperties = {
    margin: 0,
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    fontFamily: "monospace",
    whiteSpace: "pre",
    lineHeight: 1.7,
};

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="JSON for Beginners: A Visual Guide to Formatting & Validation"
                description="JSON is the language of APIs and config files. This visual guide covers syntax rules, common errors, nested structures, and how to validate JSON instantly in your browser."
                url="https://toolstack.tech/blog/mastering-json-visual-guide"
                datePublished="2026-04-15"
                dateModified="2026-04-15"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>JSON Visual Guide</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Engineering</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 15, 2026 · 7 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        JSON for Beginners: A Visual Guide to Formatting & Validation
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · April 15, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* TL;DR */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ JSON keys must be double-quoted strings. Trailing commas and comments are not valid.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ The six valid value types: string, number, boolean, null, array, object.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Validate and format your JSON instantly with the free <Link href="/tools/json-formatter" style={{ color: "#818cf8" }}>JSON Formatter</Link>.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <p style={{ margin: "0 0 22px" }}>
                        JSON powers virtually every modern API, config file, and data pipeline. You&apos;ll encounter it in REST APIs, package.json, environment configs, database exports, and localStorage. Learning to read, write, and debug it confidently is a foundational skill — and it takes about 20 minutes.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>What Valid JSON Looks Like</h2>
                    <p style={{ margin: "0 0 16px" }}>Here is a complete, valid JSON object representing a user:</p>
                    <div style={codeStyle}>
                        <pre style={pre}>{`{
  "id": 1,
  "name": "Justin Pirrie",
  "email": "justin@toolstack.tech",
  "isPro": false,
  "tags": ["seo", "developer", "marketer"],
  "address": {
    "city": "London",
    "country": "UK"
  },
  "deletedAt": null
}`}</pre>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>Every element here demonstrates one of JSON&apos;s six valid value types.</p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The 6 Valid Value Types</h2>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 32px" }}>
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
                                    ["String", '"Hello, world"', "Must use double quotes — single quotes are invalid"],
                                    ["Number", "42 or 3.14", "No quotes. Supports integers and floats"],
                                    ["Boolean", "true or false", "Lowercase only — True is invalid"],
                                    ["Null", "null", "Lowercase only — NULL or Null are invalid"],
                                    ["Array", '["a", "b", "c"]', "Ordered list, any mix of value types"],
                                    ["Object", '{ "key": "value" }', "Unordered set of key/value pairs"],
                                ].map(([type, example, note], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{type}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontSize: 13, color: accent }}>{example}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The 5 Most Common JSON Errors</h2>
                    {[
                        { title: "Trailing comma", bad: '{ "name": "Justin", }', fix: '{ "name": "Justin" }', note: "The comma after the last property (or last array item) is invalid in JSON. JavaScript allows it; JSON does not." },
                        { title: "Single-quoted strings", bad: "{ 'name': 'Justin' }", fix: '{ "name": "Justin" }', note: "JSON requires double quotes for both keys and string values. Single quotes are a JavaScript convention, not a JSON standard." },
                        { title: "Unquoted keys", bad: "{ name: 'Justin' }", fix: '{ "name": "Justin" }', note: "Every key in a JSON object must be a double-quoted string — no exceptions. This catches people coming from JavaScript object literals." },
                        { title: "Comments", bad: '{ "name": "Justin" // user }', fix: '{ "name": "Justin" }', note: "JSON has no comment syntax. Remove all // and /* */ comments before parsing. Use JSONC or a pre-processor if you need annotated config files." },
                        { title: "undefined value", bad: '{ "value": undefined }', fix: '{ "value": null }', note: "undefined is a JavaScript concept and is not a valid JSON value type. Use null to represent the absence of a value." },
                    ].map(({ title, bad, fix, note }) => (
                        <div key={title} style={{ margin: "0 0 28px", padding: "24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 14px" }}>{title}</h3>
                            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, marginBottom: 12 }}>
                                <div style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.04)", fontFamily: "monospace", fontSize: 13, color: "#f87171" }}>✗ {bad}</div>
                                <div style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(52,211,153,0.2)", background: "rgba(52,211,153,0.04)", fontFamily: "monospace", fontSize: 13, color: "#34d399" }}>✓ {fix}</div>
                            </div>
                            <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{note}</p>
                        </div>
                    ))}

                    <AdBlock type="horizontal" />

                    {/* CTA */}
                    <div style={{ margin: "52px 0 0", padding: "32px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, textAlign: "center" as const }}>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 8px" }}>Validate your JSON in one click</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 20px" }}>The free JSON Formatter catches syntax errors with exact line positions, formats your payload, and runs entirely in your browser. No data sent anywhere.</p>
                        <Link href="/tools/json-formatter" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                            Open JSON Formatter Free →
                        </Link>
                    </div>
                </div>

                {/* FAQs */}
                <div style={{ marginTop: 64 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "0 0 28px" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {FAQS.map(({ question, answer }) => (
                            <div key={question} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", margin: "0 0 10px" }}>{question}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <Link href="/blog" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← Back to Blog</Link>
                    <Link href="/tools/json-formatter" style={{ fontSize: 14, fontWeight: 700, color: accent, textDecoration: "none" }}>Open JSON Formatter →</Link>
                </div>
            </div>
        </main>
    );
}
