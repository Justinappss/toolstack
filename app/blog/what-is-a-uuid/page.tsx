import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "What Is a UUID? Format, Versions & When to Use One",
    description: "UUID stands for Universally Unique Identifier. Learn how UUIDs are formatted, the difference between v1, v3, v4, and v5, when to use UUID vs auto-increment, and how to generate one instantly.",
    alternates: { canonical: "https://toolstack.tech/blog/what-is-a-uuid" },
    openGraph: {
        title: "What Is a UUID? Format, Versions & When to Use One",
        description: "Understand UUID format, versions (v1 through v5), uniqueness guarantees, and when UUID beats auto-increment for database IDs.",
        url: "https://toolstack.tech/blog/what-is-a-uuid",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-11",
        modifiedTime: "2026-05-11",
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
        title: "What Is a UUID? Format, Versions & When to Use One",
        description: "Understand UUID format, versions (v1 through v5), uniqueness guarantees, and when UUID beats auto-increment for database IDs.",
        images: ["https://toolstack.tech/og-image.png"],
    },
};

const FAQS = [
    {
        question: "What does UUID stand for?",
        answer: "UUID stands for Universally Unique Identifier. It's a 128-bit label used to uniquely identify information in computer systems. UUIDs are standardised in RFC 4122. They're also sometimes called GUIDs (Globally Unique Identifiers), especially in Microsoft ecosystems — the two terms describe the same format."
    },
    {
        question: "How unique is a UUID? Can two ever be the same?",
        answer: "A version 4 UUID has 122 bits of randomness, giving 2^122 (approximately 5.3 × 10^36) possible values. The probability of generating two identical UUIDs is so low it's considered negligible in practice — you'd need to generate about 1 billion UUIDs per second for 86 years to have a 50% chance of a single collision. In real systems, UUID collisions are effectively impossible."
    },
    {
        question: "What are the different UUID versions?",
        answer: "There are five UUID versions: v1 uses the current timestamp plus the machine's MAC address (unique but reveals hardware identity). v2 is similar to v1 but for DCE security and is rarely used. v3 generates a UUID by hashing a namespace and name using MD5 — same inputs always produce the same UUID. v4 is randomly generated with no meaningful data embedded — this is the most common version for general use. v5 is like v3 but uses SHA-1 instead of MD5."
    },
    {
        question: "When should I use UUID instead of auto-increment?",
        answer: "Use UUID when: you generate IDs in multiple databases or services and need them to be globally unique without coordination; you don't want to expose sequential IDs to users (which reveals record counts and makes scraping trivial); you need to create an ID before inserting into the database (useful for distributed systems). Use auto-increment when: simplicity is the priority, you're building a simple single-database app, performance is critical (UUID primary keys make B-tree indexes less efficient), and sequential ordering by ID is useful."
    },
    {
        question: "How do I generate a UUID in code?",
        answer: "In Node.js: import { randomUUID } from 'node:crypto'; const id = randomUUID(); — available natively since Node 14.17. In Python: import uuid; id = str(uuid.uuid4()). In Go: use the google/uuid package. In SQL (PostgreSQL): SELECT gen_random_uuid(). In the browser (no install required): use ToolStack's free UUID Generator."
    },
];

const accent = "#818cf8";
const accentBg = "rgba(129,140,248,0.06)";
const accentBorder = "rgba(129,140,248,0.18)";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="What Is a UUID? Format, Versions & When to Use One"
                description="Understand UUID format, versions (v1 through v5), uniqueness guarantees, and when UUID beats auto-increment for database IDs."
                url="https://toolstack.tech/blog/what-is-a-uuid"
                datePublished="2026-05-11"
                dateModified="2026-05-11"
                faqs={FAQS}
            />

            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>What Is a UUID</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Engineering</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>May 11, 2026 · 5 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        What Is a UUID? Format, Versions & When to Use One
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · May 11, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ UUID is a 128-bit identifier formatted as 8-4-4-4-12 hex characters.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Version 4 (random) is the right choice for most use cases.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Generate one instantly with the free <Link href="/tools/uuid-generator" style={{ color: accent }}>UUID Generator</Link>.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>
                    <p style={{ margin: "0 0 22px" }}>
                        You've seen them in URLs, database columns, and API responses: <code style={{ fontFamily: "monospace", color: accent, fontSize: 14 }}>550e8400-e29b-41d4-a716-446655440000</code>. That's a UUID — a 128-bit identifier designed to be unique across every system in the world without any central coordination.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Here's exactly what they are, why they look the way they do, and when to use them.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>UUID Format</h2>
                    <p style={{ margin: "0 0 16px" }}>A UUID has 32 hexadecimal digits arranged in five groups separated by hyphens:</p>
                    <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "monospace", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                        <span style={{ color: "#38bdf8" }}>xxxxxxxx</span>
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>-</span>
                        <span style={{ color: "#34d399" }}>xxxx</span>
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>-</span>
                        <span style={{ color: accent }}>Mxxx</span>
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>-</span>
                        <span style={{ color: "#f472b6" }}>Nxxx</span>
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>-</span>
                        <span style={{ color: "#fb923c" }}>xxxxxxxxxxxx</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 12 }}>
                        {[
                            ["#38bdf8", "8 hex digits", "32 bits — time_low in v1, random in v4"],
                            ["#34d399", "4 hex digits", "16 bits — time_mid in v1, random in v4"],
                            [accent, "4 hex digits (M = version)", "M indicates the version: 1, 2, 3, 4, or 5"],
                            ["#f472b6", "4 hex digits (N = variant)", "N is 8, 9, a, or b for RFC 4122 UUIDs"],
                            ["#fb923c", "12 hex digits", "48 bits — node/MAC in v1, random in v4"],
                        ].map(([color, label, desc]) => (
                            <li key={label} style={{ paddingLeft: 20, position: "relative" as const }}>
                                <span style={{ position: "absolute" as const, left: 0, color: color }}>→</span>
                                <strong style={{ color: color }}>{label}</strong> — <span style={{ color: "rgba(255,255,255,0.62)" }}>{desc}</span>
                            </li>
                        ))}
                    </ul>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>UUID Versions Explained</h2>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 20, marginBottom: 32 }}>
                        {[
                            { v: "v1", color: "#38bdf8", label: "Timestamp + MAC address", desc: "Generated from the current time and your machine's MAC address. Guaranteed unique even across machines — but leaks your hardware identity and generates sequential IDs that expose insert order." },
                            { v: "v2", color: "#34d399", label: "DCE Security", desc: "A variant of v1 used for DCE RPC. Rarely encountered in modern applications. You almost certainly don't need this." },
                            { v: "v3", color: accent, label: "Namespace + Name (MD5)", desc: "Deterministic — the same namespace and name always produce the same UUID. Uses MD5 hashing. Use this when you need the same logical entity to always have the same ID (e.g., a URL → UUID mapping)." },
                            { v: "v4", color: "#f472b6", label: "Random (use this one)", desc: "122 bits of cryptographic randomness. No embedded metadata. Not sequential, not guessable. The right default for database primary keys, session tokens, and any use case where you need a unique opaque ID." },
                            { v: "v5", color: "#fb923c", label: "Namespace + Name (SHA-1)", desc: "Like v3 but uses SHA-1 instead of MD5. Prefer v5 over v3 when you need the namespace+name determinism pattern — SHA-1 is stronger than MD5, even for non-cryptographic purposes." },
                        ].map(item => (
                            <div key={item.v} style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: `1px solid ${item.color}20` }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                    <span style={{ fontSize: 11, fontWeight: 800, color: item.color, padding: "3px 8px", borderRadius: 6, background: `${item.color}15`, border: `1px solid ${item.color}25` }}>{item.v}</span>
                                    <strong style={{ color: "white", fontSize: 15 }}>{item.label}</strong>
                                </div>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>UUID vs Auto-Increment: Which Should You Use?</h2>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 28px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", fontWeight: 700, textAlign: "left" as const }}>Factor</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>UUID v4</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "#38bdf8", fontWeight: 700, textAlign: "left" as const }}>Auto-increment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Global uniqueness", "Yes — no coordination needed", "Only within one database"],
                                    ["Reveals record count", "No — opaque random ID", "Yes — IDs are sequential"],
                                    ["Guessable", "No", "Yes"],
                                    ["Multi-database safe", "Yes", "Requires coordination"],
                                    ["B-tree index performance", "Lower — random inserts cause page splits", "Higher — sequential inserts"],
                                    ["Can generate before insert", "Yes", "No — need a DB round-trip"],
                                    ["Human readability", "Low", "High (1, 2, 3…)"],
                                ].map(([factor, uuid, auto], i) => (
                                    <tr key={factor} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: 13 }}>{factor}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{uuid}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{auto}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        For distributed systems, APIs, and anything exposed in URLs, UUID v4 is the default. For a simple single-database CRUD app with no external exposure, auto-increment is simpler and performs better.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How to Generate a UUID</h2>
                    <p style={{ margin: "0 0 16px" }}>Code examples for the most common languages:</p>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 32 }}>
                        {[
                            ["Node.js 14.17+", "import { randomUUID } from 'node:crypto';\nconst id = randomUUID();"],
                            ["Python", "import uuid\nid = str(uuid.uuid4())"],
                            ["Go", "import \"github.com/google/uuid\"\nid := uuid.New().String()"],
                            ["PostgreSQL", "SELECT gen_random_uuid();"],
                            ["PHP 8.1+", "$id = (string) Str::uuid(); // Laravel\n// or: $id = vsprintf('%s%s-%s-%04x-%04x-%s%s%s', str_split(bin2hex(random_bytes(16)), 4));"],
                        ].map(([lang, code]) => (
                            <div key={lang} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <div style={{ padding: "8px 16px", background: "rgba(255,255,255,0.04)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{lang}</div>
                                <div style={{ padding: "14px 16px", background: "rgba(0,0,0,0.3)", fontFamily: "monospace", fontSize: 13, color: accent, lineHeight: 1.7, whiteSpace: "pre" as const }}>{code}</div>
                            </div>
                        ))}
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        Or skip the code entirely — the <Link href="/tools/uuid-generator" style={{ color: accent }}>ToolStack UUID Generator</Link> generates one or a hundred v4 UUIDs instantly in your browser. Useful for test data, seed scripts, or any time you need IDs right now without opening a REPL.
                    </p>

                    <div style={{ padding: "28px 32px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, margin: "48px 0" }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 12px" }}>Generate UUIDs instantly</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 20px", lineHeight: 1.7 }}>
                            v4 UUIDs, bulk generation, one-click copy. No signup, runs in your browser.
                        </p>
                        <Link href="/tools/uuid-generator" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "12px 20px", borderRadius: 12,
                            background: accent, color: "#050505",
                            fontSize: 14, fontWeight: 700, textDecoration: "none",
                        }}>
                            Open UUID Generator →
                        </Link>
                    </div>
                </div>

                {/* FAQs */}
                <div style={{ marginTop: 72 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 32 }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
                        {FAQS.map((faq, i) => (
                            <div key={i} style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", margin: "0 0 12px", lineHeight: 1.4 }}>{faq.question}</h3>
                                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.7 }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
