import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "camelCase vs snake_case vs PascalCase: When to Use Each",
    description: "The wrong naming convention in a codebase creates friction and bugs. This guide covers camelCase, snake_case, PascalCase, kebab-case, and.",
    alternates: { canonical: "https://toolstack.tech/blog/understanding-case-sensitivity" },
    openGraph: {
        title: "camelCase vs snake_case vs PascalCase: When to Use Each",
        description: "Covers camelCase, snake_case, PascalCase, kebab-case and SCREAMING_SNAKE_CASE — with rules for every language and context. Free case converter included.",
        url: "https://toolstack.tech/blog/understanding-case-sensitivity",
        siteName: "ToolStack",
        type: "article",
    },
};

const FAQS = [
    {
        question: "Why does naming convention matter in programming?",
        answer: "Naming conventions matter for three reasons: readability (consistent style makes code scannable), tooling (linters, bundlers, and frameworks often rely on conventions to auto-discover files), and collaboration (teams work faster when everyone follows the same rules). Inconsistent naming in a large codebase is a real source of bugs — especially in case-sensitive languages and file systems."
    },
    {
        question: "Is JavaScript camelCase or PascalCase?",
        answer: "Both — context-dependent. Variables and functions use camelCase (getUserById). Classes and React components use PascalCase (UserCard). Constants use SCREAMING_SNAKE_CASE (MAX_RETRIES). CSS class names used in JS/TS typically use camelCase when referenced via styles objects, but kebab-case in CSS files."
    },
    {
        question: "Does Python use snake_case or camelCase?",
        answer: "Python's official style guide (PEP 8) specifies snake_case for variables, functions, and module names. PascalCase is used for class names. SCREAMING_SNAKE_CASE for module-level constants. Unlike JavaScript, camelCase in Python functions is considered non-idiomatic and is discouraged in code reviews."
    },
    {
        question: "What is kebab-case used for?",
        answer: "Kebab-case (words-separated-by-hyphens) is used primarily in HTML attributes, CSS class names, URL slugs, and CLI flags. It is not valid in most programming language identifiers (because the hyphen is interpreted as a minus operator) but is the standard in web contexts: class='user-card', /tools/case-converter, --dry-run."
    },
    {
        question: "How do I convert between cases quickly?",
        answer: "The ToolStack Case Converter handles all conversions instantly — paste your text and it converts to camelCase, PascalCase, snake_case, kebab-case, UPPER_CASE and more in one click. No signup, runs in your browser."
    },
];

const accent = "#22d3ee";
const accentBg = "rgba(34,211,238,0.06)";
const accentBorder = "rgba(34,211,238,0.18)";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="camelCase vs snake_case vs PascalCase: When to Use Each"
                description="The wrong naming convention in a codebase creates friction and bugs. This guide covers camelCase, snake_case, PascalCase, kebab-case, and SCREAMING_SNAKE_CASE — with rules for every language and context."
                url="https://toolstack.tech/blog/understanding-case-sensitivity"
                datePublished="2026-04-13"
                dateModified="2026-04-13"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Case Sensitivity Guide</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Engineering</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 13, 2026 · 5 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        camelCase vs snake_case vs PascalCase: When to Use Each
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · April 13, 2026</p>
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
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ camelCase for JS/TS variables and functions. PascalCase for classes and React components.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ snake_case for Python, Ruby, SQL. kebab-case for URLs, CSS, HTML attributes.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Convert between all cases instantly with the free <Link href="/tools/case-converter" style={{ color: "#818cf8" }}>Case Converter</Link>.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <p style={{ margin: "0 0 22px" }}>
                        Naming convention is one of those things that feels trivial until you&apos;re debugging a production issue at 2am because a Python function used camelCase and the downstream JSON parser expected snake_case. The rules aren&apos;t arbitrary — they are ecosystem conventions that determine how your code integrates with frameworks, linters, and other people&apos;s code.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The 5 Naming Conventions Explained</h2>

                    {[
                        {
                            name: "camelCase",
                            example: "getUserById, isLoggedIn, totalItemCount",
                            color: "#818cf8",
                            when: "JavaScript/TypeScript variables, functions, object keys. React props (onClick, className). JSON keys in API responses.",
                            avoid: "Python code, database column names, CSS class names, URL slugs.",
                        },
                        {
                            name: "PascalCase",
                            example: "UserProfile, InvoiceGenerator, HttpClient",
                            color: "#c084fc",
                            when: "Class names in all OOP languages. React and Next.js component names. TypeScript interfaces and type aliases. File names for components (UserCard.tsx).",
                            avoid: "Variables, functions, and database fields. Anything that isn't a constructor or type.",
                        },
                        {
                            name: "snake_case",
                            example: "user_id, created_at, max_retry_count",
                            color: "#34d399",
                            when: "Python variables, functions, and module names (PEP 8). Ruby variables. SQL column and table names. REST API query parameters.",
                            avoid: "JavaScript (unless you're working with Python-generated API data). CSS class names.",
                        },
                        {
                            name: "kebab-case",
                            example: "user-profile, invoice-generator, --dry-run",
                            color: "#22d3ee",
                            when: "CSS class names and IDs. URL slugs and route paths. HTML data attributes (data-user-id). CLI flags (--output-dir). NPM package names.",
                            avoid: "Any programming language identifier — the hyphen is a minus operator in most languages.",
                        },
                        {
                            name: "SCREAMING_SNAKE_CASE",
                            example: "MAX_RETRIES, API_BASE_URL, DEFAULT_TIMEOUT",
                            color: "#fbbf24",
                            when: "Module-level constants in Python (PEP 8). Environment variable names. Configuration constants in JavaScript/TypeScript. SQL named constraints.",
                            avoid: "Regular variables and function names — SCREAMING signals immutability and configuration, not logic.",
                        },
                    ].map(({ name, example, color, when, avoid }) => (
                        <div key={name} style={{ margin: "0 0 28px", padding: "24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                <code style={{ fontSize: 17, fontWeight: 800, color, fontFamily: "monospace", background: "transparent", padding: 0 }}>{name}</code>
                            </div>
                            <div style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>{example}</div>
                            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}><span style={{ color: "#34d399", fontWeight: 700 }}>Use when: </span>{when}</div>
                                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}><span style={{ color: "#f87171", fontWeight: 700 }}>Avoid for: </span>{avoid}</div>
                            </div>
                        </div>
                    ))}

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Quick Reference by Language</h2>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 32px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Language</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>Variables/Functions</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>Classes</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>Constants</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["JavaScript / TypeScript", "camelCase", "PascalCase", "SCREAMING_SNAKE"],
                                    ["Python", "snake_case", "PascalCase", "SCREAMING_SNAKE"],
                                    ["Go", "camelCase", "PascalCase", "PascalCase or camelCase"],
                                    ["Ruby", "snake_case", "PascalCase", "SCREAMING_SNAKE"],
                                    ["Java / Kotlin", "camelCase", "PascalCase", "SCREAMING_SNAKE"],
                                    ["SQL", "snake_case", "PascalCase", "SCREAMING_SNAKE"],
                                    ["CSS", "kebab-case", "N/A", "N/A"],
                                    ["URLs / Slugs", "kebab-case", "N/A", "N/A"],
                                ].map(([lang, vars, cls, consts], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{lang}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontSize: 13, color: "#818cf8" }}>{vars}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontSize: 13, color: "#c084fc" }}>{cls}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace", fontSize: 13, color: "#fbbf24" }}>{consts}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <AdBlock type="horizontal" />

                    {/* CTA */}
                    <div style={{ margin: "52px 0 0", padding: "32px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, textAlign: "center" as const }}>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 8px" }}>Convert between cases in one click</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 20px" }}>The free Case Converter handles camelCase, PascalCase, snake_case, kebab-case, UPPER_CASE and more. Paste your text and get every format instantly.</p>
                        <Link href="/tools/case-converter" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                            Open Case Converter Free →
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
                    <Link href="/tools/case-converter" style={{ fontSize: 14, fontWeight: 700, color: accent, textDecoration: "none" }}>Open Case Converter →</Link>
                </div>
            </div>
        </main>
    );
}
