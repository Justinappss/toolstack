import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "Regex Cheat Sheet for Beginners: The Patterns You Actually Use | ToolStack",
    description: "A practical regex reference covering the patterns developers reach for most. Character classes, anchors, quantifiers, groups, and real-world examples — with a free tester.",
    alternates: { canonical: "https://toolstack.tech/blog/regex-cheat-sheet-beginners" },
    openGraph: {
        title: "Regex Cheat Sheet for Beginners: The Patterns You Actually Use",
        description: "The regex patterns developers use most often — explained clearly with real examples. Test them instantly in your browser.",
        url: "https://toolstack.tech/blog/regex-cheat-sheet-beginners",
        siteName: "ToolStack",
        type: "article",
    },
};

const FAQS = [
    {
        question: "What does .* mean in regex?",
        answer: ". matches any single character except a newline. * means 'zero or more of the preceding token'. So .* together means 'match any character, any number of times' — it's a greedy wildcard. It will match as much as possible. For example, in the string 'hello world', .* matches the entire string. Use .*? (lazy) if you want the shortest possible match."
    },
    {
        question: "What is the difference between + and * in regex?",
        answer: "* means zero or more occurrences of the preceding character or group. + means one or more occurrences. The practical difference: * will match even if the character isn't present at all, while + requires at least one match. For example, \\d* matches an empty string or any number of digits, while \\d+ requires at least one digit."
    },
    {
        question: "What does ^ mean in regex?",
        answer: "^ has two meanings depending on context. At the start of a pattern (e.g. ^hello), it anchors the match to the beginning of the string — only matches if the string starts with 'hello'. Inside a character class (e.g. [^abc]), it negates the class — matches any character that is NOT a, b, or c. The context always makes it clear which meaning applies."
    },
    {
        question: "How do I match an email address with regex?",
        answer: "A regex that matches most valid email addresses: ^[\\w.+\\-]+@[\\w\\-]+\\.[a-zA-Z]{2,}$. This covers the format local-part@domain.tld. It won't catch 100% of edge cases in the RFC 5321 spec (which allows unusual formats like quoted strings), but it handles every real-world email format you'll encounter. For production, always validate email by sending a confirmation — regex alone is not enough."
    },
    {
        question: "What is a capturing group in regex?",
        answer: "A capturing group is created with parentheses: (pattern). It does two things: it groups part of the pattern together (like brackets in maths), and it captures the matched text so you can reference it later. In most languages, you access captured groups as $1, $2 (for replace operations) or match[1], match[2] (in code). Use (?:pattern) for a non-capturing group if you only need the grouping, not the capture."
    },
];

const accent = "#10b981";
const accentBg = "rgba(16,185,129,0.06)";
const accentBorder = "rgba(16,185,129,0.18)";

const mono: React.CSSProperties = {
    fontFamily: "monospace",
    background: "rgba(16,185,129,0.1)",
    border: "1px solid rgba(16,185,129,0.2)",
    padding: "2px 7px",
    borderRadius: 5,
    fontSize: "0.88em",
    color: "#10b981",
};

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Regex Cheat Sheet for Beginners: The Patterns You Actually Use"
                description="The regex patterns developers use most often — explained clearly with real examples."
                url="https://toolstack.tech/blog/regex-cheat-sheet-beginners"
                datePublished="2026-04-25"
                dateModified="2026-04-25"
                faqs={FAQS}
            />

            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Regex Cheat Sheet</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Engineering</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 25, 2026 · 6 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        Regex Cheat Sheet for Beginners: The Patterns You Actually Use
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · April 25, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Regex looks intimidating but most real-world use cases need only a dozen patterns.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ This cheat sheet covers character classes, anchors, quantifiers, and groups.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Test any pattern live with the free <Link href="/tools/regex-tester" style={{ color: accent }}>Regex Tester</Link> — real-time highlighting.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>
                    <p style={{ margin: "0 0 22px" }}>
                        Regular expressions look like a keyboard fell down the stairs. But the truth is, most developers use the same 15–20 patterns repeatedly. Once those click, you can read and write regex for most real-world tasks without needing to memorise the full spec.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        This is a practical reference — not an exhaustive one. Use the <Link href="/tools/regex-tester" style={{ color: accent }}>Regex Tester</Link> alongside this post to test any pattern against real input in real time.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Character Classes</h2>
                    <p style={{ margin: "0 0 16px" }}>The most-used shorthand character classes:</p>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Pattern</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Matches</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>Example</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["\\d", "Any digit (0–9)", "\\d+ matches 42 or 9000"],
                                    ["\\D", "Any non-digit", "\\D+ matches hello"],
                                    ["\\w", "Word char (a–z, A–Z, 0–9, _)", "\\w+ matches hello_world"],
                                    ["\\W", "Non-word character", "\\W matches spaces, punctuation"],
                                    ["\\s", "Whitespace (space, tab, newline)", "\\s+ matches gaps between words"],
                                    ["\\S", "Non-whitespace", "\\S+ matches individual words"],
                                    [".", "Any character except newline", "h.t matches hat, hit, hot"],
                                    ["[abc]", "One of a, b, or c", "[aeiou] matches any vowel"],
                                    ["[^abc]", "Anything NOT a, b, or c", "[^0-9] matches non-digits"],
                                    ["[a-z]", "Any lowercase letter", "[a-zA-Z] matches any letter"],
                                ].map(([pattern, matches, example], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontWeight: 700, color: accent }}>{pattern}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)" }}>{matches}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "monospace" }}>{example}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Anchors</h2>
                    <p style={{ margin: "0 0 16px" }}>Anchors don't match characters — they match positions in the string.</p>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Pattern</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Meaning</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["^", "Start of string (or line in multiline mode)"],
                                    ["$", "End of string (or line in multiline mode)"],
                                    ["\\b", "Word boundary — position between a word char and a non-word char"],
                                    ["\\B", "Non-word boundary"],
                                ].map(([pattern, meaning], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontWeight: 700, color: accent }}>{pattern}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}>{meaning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Quantifiers</h2>
                    <p style={{ margin: "0 0 16px" }}>Quantifiers control how many times the preceding token must match.</p>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Quantifier</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Meaning</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["*", "0 or more (greedy)"],
                                    ["+", "1 or more (greedy)"],
                                    ["?", "0 or 1 — makes preceding token optional"],
                                    ["{n}", "Exactly n times"],
                                    ["{n,}", "n or more times"],
                                    ["{n,m}", "Between n and m times"],
                                    ["*? +? ??", "Lazy versions — match as few as possible"],
                                ].map(([q, meaning], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontWeight: 700, color: accent }}>{q}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}>{meaning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Groups and Alternation</h2>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Syntax</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Meaning</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["(abc)", "Capturing group — captures 'abc' for back-referencing"],
                                    ["(?:abc)", "Non-capturing group — groups without capturing"],
                                    ["a|b", "Alternation — matches a or b"],
                                    ["(?=abc)", "Lookahead — matches if followed by 'abc' (doesn't consume)"],
                                    ["(?!abc)", "Negative lookahead — matches if NOT followed by 'abc'"],
                                ].map(([syntax, meaning], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontWeight: 700, color: accent }}>{syntax}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}>{meaning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Patterns You'll Actually Use</h2>
                    <p style={{ margin: "0 0 16px" }}>Copy these directly. Test and tweak them in the <Link href="/tools/regex-tester" style={{ color: accent }}>Regex Tester</Link>.</p>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 24 }}>
                        {[
                            ["Email (basic)", "^[\\w.+\\-]+@[\\w\\-]+\\.[a-zA-Z]{2,}$"],
                            ["UK postcode", "^[A-Z]{1,2}[0-9][0-9A-Z]?\\s?[0-9][A-Z]{2}$"],
                            ["US phone number", "^(\\+1)?[\\s\\-]?\\(?\\d{3}\\)?[\\s\\-]?\\d{3}[\\s\\-]?\\d{4}$"],
                            ["URL (http/https)", "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_+.~#?&/=]*)"],
                            ["IPv4 address", "^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$"],
                            ["Hex colour code", "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"],
                            ["Slug (URL-safe string)", "^[a-z0-9]+(?:-[a-z0-9]+)*$"],
                            ["Strong password", "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$"],
                            ["ISO date (YYYY-MM-DD)", "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$"],
                            ["Trim whitespace", "^\\s+|\\s+$"],
                        ].map(([label, pattern]) => (
                            <div key={label as string} style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.07em", margin: "0 0 8px" }}>{label}</p>
                                <p style={{ fontFamily: "monospace", fontSize: 13, color: accent, margin: 0, wordBreak: "break-all" as const }}>{pattern}</p>
                            </div>
                        ))}
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Flags</h2>
                    <p style={{ margin: "0 0 16px" }}>Flags modify how the entire pattern behaves. Add them after the closing slash: <code style={mono}>/pattern/gi</code></p>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Flag</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Effect</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["g", "Global — find all matches, not just the first"],
                                    ["i", "Case-insensitive — a matches A"],
                                    ["m", "Multiline — ^ and $ match start/end of each line"],
                                    ["s", "Dotall — . matches newlines too"],
                                ].map(([flag, effect], i) => (
                                    <tr key={flag} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontWeight: 700, color: accent }}>{flag}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}>{effect}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
