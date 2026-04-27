"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Description {
    text: string;
    angle: string;
    angleDesc: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function charStatus(len: number): { color: string; label: string; barColor: string } {
    if (len === 0) return { color: "rgba(255,255,255,0.2)", label: "0 / 160", barColor: "rgba(255,255,255,0.1)" };
    if (len < 100) return { color: "#f87171", label: `${len} / 160 — too short`, barColor: "#f87171" };
    if (len < 140) return { color: "#fbbf24", label: `${len} / 160 — a bit short`, barColor: "#fbbf24" };
    if (len <= 160) return { color: "#34d399", label: `${len} / 160 — perfect`, barColor: "#34d399" };
    if (len <= 170) return { color: "#fbbf24", label: `${len} / 160 — slightly long`, barColor: "#fbbf24" };
    return { color: "#f87171", label: `${len} / 160 — too long (will be truncated)`, barColor: "#f87171" };
}

function ctrScore(text: string, keyword: string): number {
    if (!text) return 0;
    const lower = text.toLowerCase();
    const kw = keyword.toLowerCase().trim();
    let score = 0;

    // Length (0–30)
    const len = text.length;
    if (len >= 150 && len <= 160) score += 30;
    else if (len >= 135 && len <= 170) score += 18;
    else if (len >= 110 && len <= 180) score += 8;

    // Keyword present (0–25)
    if (kw && lower.includes(kw)) score += 25;
    else if (kw) score += 0;
    else score += 12; // no keyword given — neutral

    // CTA words (0–20)
    const ctaWords = ["learn", "discover", "get", "find", "try", "start", "see", "explore", "download", "join", "read", "shop", "compare", "check", "unlock", "boost", "improve", "save", "create", "build", "optimize", "optimise", "generate", "use", "access"];
    if (ctaWords.some(w => lower.includes(w))) score += 20;

    // Power words (0–15)
    const powerWords = ["free", "best", "top", "proven", "easy", "fast", "instant", "save", "boost", "expert", "ultimate", "complete", "simple", "quick", "step-by-step", "complete guide", "no signup", "without", "exactly", "guaranteed"];
    const found = powerWords.filter(w => lower.includes(w));
    score += Math.min(found.length * 5, 15);

    // Not starting with a generic phrase (0–10)
    const genericStarts = ["in this", "this page", "this article", "this guide", "welcome to", "here you"];
    if (!genericStarts.some(s => lower.startsWith(s))) score += 10;

    return Math.min(score, 100);
}

function scoreLabel(score: number): { label: string; color: string } {
    if (score >= 85) return { label: "Excellent CTR", color: "#34d399" };
    if (score >= 70) return { label: "Good CTR", color: "#6ee7b7" };
    if (score >= 55) return { label: "Average CTR", color: "#fbbf24" };
    if (score >= 35) return { label: "Weak CTR", color: "#fb923c" };
    return { label: "Poor CTR", color: "#f87171" };
}

function highlightKeyword(text: string, keyword: string): React.ReactNode {
    if (!keyword.trim() || !text) return text;
    const kw = keyword.trim();
    const regex = new RegExp(`(${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
        regex.test(part) ? <strong key={i} style={{ fontWeight: 700, color: "#1a0dab" }}>{part}</strong> : part
    );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SerpPreview({ title, description, keyword, url, mobile }: {
    title: string; description: string; keyword: string; url: string; mobile: boolean;
}) {
    const displayUrl = url || "toolstack.tech › tools › your-page";
    const displayTitle = title || "Your Page Title Goes Here";
    const displayDesc = description || "Your meta description will appear here — this is what searchers see before clicking. Make it compelling and under 160 characters.";

    return (
        <div style={{
            background: "white",
            borderRadius: 12,
            padding: mobile ? "16px" : "20px 24px",
            maxWidth: mobile ? 380 : 600,
            width: "100%",
            fontFamily: "Arial, sans-serif",
            boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        }}>
            {/* URL */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#e8eaed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#bdc1c6" }} />
                </div>
                <div>
                    <div style={{ fontSize: mobile ? 12 : 14, color: "#202124", lineHeight: 1.3, fontWeight: 500 }}>ToolStack</div>
                    <div style={{ fontSize: mobile ? 11 : 12, color: "#4d5156", lineHeight: 1.2 }}>{displayUrl}</div>
                </div>
            </div>
            {/* Title */}
            <div style={{
                fontSize: mobile ? 16 : 20,
                color: "#1a0dab",
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: 4,
                cursor: "pointer",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            }}>
                {displayTitle}
            </div>
            {/* Description */}
            <div style={{
                fontSize: mobile ? 13 : 14,
                color: "#4d5156",
                lineHeight: 1.57,
                wordBreak: "break-word",
            }}>
                {highlightKeyword(displayDesc, keyword)}
            </div>
        </div>
    );
}

function DescriptionCard({ desc, keyword, selected, onSelect, onChange }: {
    desc: Description;
    keyword: string;
    selected: boolean;
    onSelect: () => void;
    onChange: (text: string) => void;
}) {
    const [copied, setCopied] = useState<"text" | "html" | null>(null);
    const status = charStatus(desc.text.length);
    const score = ctrScore(desc.text, keyword);
    const { label: scoreText, color: scoreColor } = scoreLabel(score);

    const copy = (type: "text" | "html") => {
        const val = type === "html"
            ? `<meta name="description" content="${desc.text.replace(/"/g, "&quot;")}">`
            : desc.text;
        navigator.clipboard.writeText(val);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div
            onClick={onSelect}
            style={{
                background: selected ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${selected ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 16,
                padding: "20px 22px",
                cursor: "pointer",
                transition: "all 0.18s",
                position: "relative",
            }}
        >
            {/* Angle badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                        fontSize: 11, fontWeight: 800, letterSpacing: "0.06em",
                        padding: "3px 10px", borderRadius: 999,
                        background: selected ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${selected ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.1)"}`,
                        color: selected ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                    }}>
                        {desc.angle.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{desc.angleDesc}</span>
                </div>
                {/* CTR score */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: `conic-gradient(${scoreColor} ${score}%, rgba(255,255,255,0.07) 0%)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                    }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 8, fontWeight: 800, color: scoreColor }}>{score}</span>
                        </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: scoreColor }}>{scoreText}</span>
                </div>
            </div>

            {/* Editable textarea */}
            <textarea
                value={desc.text}
                onChange={e => { e.stopPropagation(); onChange(e.target.value); }}
                onClick={e => e.stopPropagation()}
                rows={3}
                style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    fontSize: 14,
                    color: "white",
                    lineHeight: 1.6,
                    resize: "vertical",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    marginBottom: 10,
                }}
            />

            {/* Character bar */}
            <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: status.color, fontWeight: 600 }}>{status.label}</span>
                </div>
                <div style={{ height: 4, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                    <div style={{
                        height: "100%",
                        borderRadius: 999,
                        background: status.barColor,
                        width: `${Math.min((desc.text.length / 160) * 100, 100)}%`,
                        transition: "width 0.2s, background 0.2s",
                    }} />
                </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                    onClick={e => { e.stopPropagation(); copy("text"); }}
                    style={{
                        padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                        background: copied === "text" ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${copied === "text" ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                        color: copied === "text" ? "#34d399" : "rgba(255,255,255,0.6)",
                        cursor: "pointer",
                    }}
                >
                    {copied === "text" ? "✓ Copied!" : "Copy Text"}
                </button>
                <button
                    onClick={e => { e.stopPropagation(); copy("html"); }}
                    style={{
                        padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                        background: copied === "html" ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${copied === "html" ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                        color: copied === "html" ? "#34d399" : "rgba(255,255,255,0.6)",
                        cursor: "pointer",
                    }}
                >
                    {copied === "html" ? "✓ Copied!" : "Copy <meta> HTML"}
                </button>
                {!selected && (
                    <button
                        onClick={e => { e.stopPropagation(); onSelect(); }}
                        style={{
                            padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                            background: "rgba(99,102,241,0.1)",
                            border: "1px solid rgba(99,102,241,0.25)",
                            color: "#a5b4fc", cursor: "pointer",
                        }}
                    >
                        Preview in Google →
                    </button>
                )}
                {selected && (
                    <span style={{ padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "#6366f1" }}>
                        ✓ Previewing in Google
                    </span>
                )}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MetaDescriptionGenerator() {
    const [pageTitle, setPageTitle] = useState("");
    const [pageTopic, setPageTopic] = useState("");
    const [targetKeyword, setTargetKeyword] = useState("");
    const [tone, setTone] = useState("professional");
    const [audience, setAudience] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [descriptions, setDescriptions] = useState<Description[]>([]);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [serpMobile, setSerpMobile] = useState(false);

    const generate = useCallback(async () => {
        if (!pageTopic.trim() || pageTopic.trim().length < 10) {
            setError("Please describe your page in at least 10 characters.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/meta-description-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pageTitle, pageTopic, targetKeyword, tone, audience }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to generate");
            setDescriptions(data.descriptions || []);
            setSelectedIdx(0);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [pageTitle, pageTopic, targetKeyword, tone, audience]);

    const updateDescription = (idx: number, text: string) => {
        setDescriptions(prev => prev.map((d, i) => i === idx ? { ...d, text } : d));
    };

    const selected = descriptions[selectedIdx];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Meta Description Generator",
                "description": "Free meta description generator by ToolStack. Generates 5 meta description variants with live Google SERP preview, CTR scoring, and character counters. No signup.",
                "url": "https://toolstack.tech/tools/meta-description-generator",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "Web",
                "browserRequirements": "Requires JavaScript",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "featureList": [
                    "5 meta description variants",
                    "Live Google SERP preview (mobile/desktop)",
                    "CTR scoring",
                    "One-click HTML copy",
                    "Keyword proximity detection",
                    "Tone and audience options"
                ]
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "SEO Tools", "item": "https://toolstack.tech/tools?category=seo" },
                    { "@type": "ListItem", "position": 3, "name": "Meta Description Generator", "item": "https://toolstack.tech/tools/meta-description-generator" }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is the best meta description generator?",
                        "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's free meta description generator is the most complete free option available. It generates 5 click-optimised variants covering benefit-led, feature-focused, urgency, question-led, and CTA-first angles, with a live Google SERP preview, CTR score, character counter, and one-click HTML copy. No signup required." }
                    },
                    {
                        "@type": "Question",
                        "name": "How long should a meta description be?",
                        "acceptedAnswer": { "@type": "Answer", "text": "The ideal length is 150–160 characters. Mobile devices often truncate at 120, so front-load your primary keyword and value hook." }
                    }
                ]
            }
        ]
    };

    return (
        <div style={{ minHeight: "100vh", background: "#080810" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Background */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "-5%", left: "0%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", filter: "blur(100px)" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "0%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(100px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13, color: "rgba(255,255,255,0.3)", flexWrap: "wrap" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>ToolStack</Link>
                    <span>/</span>
                    <Link href="/tools?category=seo" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>All Tools</Link>
                    <span>/</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>Meta Description Generator</span>
                </nav>

                {/* Hero */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {[
                            { label: "✓ Meta Description Generator", color: "#6366f1" },
                            { label: "5 Variants Free", color: "#34d399" },
                            { label: "Live SERP Preview", color: "#38bdf8" },
                            { label: "No Signup", color: "#fbbf24" },
                        ].map(b => (
                            <span key={b.label} style={{
                                fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
                                padding: "4px 12px", borderRadius: 999,
                                background: `${b.color}15`, border: `1px solid ${b.color}30`, color: b.color,
                            }}>{b.label}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: 44, fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.025em" }}>
                        Meta Description<br />
                        <span style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Generator.
                        </span>
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 620, margin: 0 }}>
                        Generate 5 click-optimised meta descriptions at once. Live Google SERP preview shows exactly how each variant appears in search results. CTR scoring, character counter, and one-click HTML copy — free, no signup.
                    </p>
                </div>

                {/* ─── Input Card ─── */}
                <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "32px 28px", marginBottom: 28 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 16 }}>
                        {/* Page Title */}
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 8, letterSpacing: "0.03em" }}>
                                PAGE TITLE <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={pageTitle}
                                onChange={e => setPageTitle(e.target.value)}
                                placeholder="e.g. Best Free AI Prompt Generator"
                                style={{
                                    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 12, padding: "12px 14px", fontSize: 14, color: "white",
                                    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                                }}
                            />
                        </div>
                        {/* Target Keyword */}
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 8, letterSpacing: "0.03em" }}>
                                TARGET KEYWORD <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(recommended)</span>
                            </label>
                            <input
                                type="text"
                                value={targetKeyword}
                                onChange={e => setTargetKeyword(e.target.value)}
                                placeholder="e.g. ai prompt generator"
                                style={{
                                    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 12, padding: "12px 14px", fontSize: 14, color: "white",
                                    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                                }}
                            />
                        </div>
                    </div>

                    {/* Page Topic */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 8, letterSpacing: "0.03em" }}>
                            WHAT IS THIS PAGE ABOUT? <span style={{ color: "#f87171" }}>*</span>
                        </label>
                        <textarea
                            value={pageTopic}
                            onChange={e => setPageTopic(e.target.value)}
                            rows={3}
                            placeholder="Describe your page, product, or content in a few sentences. The more detail you give, the better the descriptions. e.g. A free online tool that generates expert AI prompts for ChatGPT, Claude and Gemini using 6 proven frameworks..."
                            style={{
                                width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 12, padding: "12px 14px", fontSize: 14, color: "white",
                                outline: "none", fontFamily: "inherit", resize: "vertical", lineHeight: 1.6,
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
                        {/* Tone */}
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 8, letterSpacing: "0.03em" }}>TONE</label>
                            <select
                                value={tone}
                                onChange={e => setTone(e.target.value)}
                                style={{
                                    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 12, padding: "12px 14px", fontSize: 14, color: "white",
                                    outline: "none", fontFamily: "inherit", cursor: "pointer",
                                    appearance: "none", boxSizing: "border-box",
                                }}
                            >
                                <option value="professional" style={{ background: "#1a1a2e" }}>Professional — authoritative & trustworthy</option>
                                <option value="persuasive" style={{ background: "#1a1a2e" }}>Persuasive — benefit-driven & compelling</option>
                                <option value="friendly" style={{ background: "#1a1a2e" }}>Friendly — warm & conversational</option>
                                <option value="urgent" style={{ background: "#1a1a2e" }}>Urgent — FOMO & action-oriented</option>
                                <option value="informative" style={{ background: "#1a1a2e" }}>Informative — clear & educational</option>
                            </select>
                        </div>
                        {/* Audience */}
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 8, letterSpacing: "0.03em" }}>
                                TARGET AUDIENCE <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={audience}
                                onChange={e => setAudience(e.target.value)}
                                placeholder="e.g. freelance marketers, SaaS founders"
                                style={{
                                    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 12, padding: "12px 14px", fontSize: 14, color: "white",
                                    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                                }}
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 12, padding: "12px 16px", marginBottom: 16, color: "#f87171", fontSize: 14 }}>
                            {error}
                        </div>
                    )}

                    {/* Generate Button */}
                    <button
                        onClick={generate}
                        disabled={loading}
                        style={{
                            width: "100%", padding: "16px 24px", borderRadius: 14, fontSize: 16, fontWeight: 800,
                            background: loading ? "rgba(99,102,241,0.3)" : "linear-gradient(135deg, #3b82f6, #6366f1)",
                            color: loading ? "rgba(255,255,255,0.4)" : "white",
                            border: "none", cursor: loading ? "not-allowed" : "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                            transition: "opacity 0.2s",
                            boxShadow: loading ? "none" : "0 4px 20px rgba(99,102,241,0.35)",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        {loading ? (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                                Generating 5 descriptions...
                            </>
                        ) : (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                Generate 5 Meta Descriptions Free
                            </>
                        )}
                    </button>
                </div>

                {/* ─── Results ─── */}
                {descriptions.length > 0 && (
                    <div>
                        {/* SERP Preview Panel */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px 24px", marginBottom: 24 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                                <div>
                                    <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 4px" }}>Live Google SERP Preview</h2>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>Click any description below to preview it here</p>
                                </div>
                                {/* Desktop/Mobile toggle */}
                                <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 3, gap: 2 }}>
                                    {[{ label: "Desktop", val: false }, { label: "Mobile", val: true }].map(opt => (
                                        <button key={opt.label} onClick={() => setSerpMobile(opt.val)} style={{
                                            padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer",
                                            background: serpMobile === opt.val ? "rgba(255,255,255,0.12)" : "transparent",
                                            color: serpMobile === opt.val ? "white" : "rgba(255,255,255,0.35)",
                                            transition: "all 0.15s",
                                        }}>{opt.label}</button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <SerpPreview
                                    title={pageTitle}
                                    description={selected?.text || ""}
                                    keyword={targetKeyword}
                                    url={pageTitle ? `toolstack.tech › tools › ${pageTitle.toLowerCase().replace(/\s+/g, "-")}` : "toolstack.tech › your-page"}
                                    mobile={serpMobile}
                                />
                            </div>
                        </div>

                        {/* Description Cards */}
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                                <h2 style={{ fontSize: 17, fontWeight: 800, color: "white", margin: 0 }}>Your 5 Meta Descriptions</h2>
                                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Click any card to preview · Edit directly in the box</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {descriptions.map((desc, i) => (
                                    <DescriptionCard
                                        key={i}
                                        desc={desc}
                                        keyword={targetKeyword}
                                        selected={selectedIdx === i}
                                        onSelect={() => setSelectedIdx(i)}
                                        onChange={(text) => updateDescription(i, text)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* CTR Score legend */}
                        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 18px", marginTop: 16 }}>
                            <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", margin: "0 0 8px", letterSpacing: "0.04em" }}>CTR SCORE BREAKDOWN — what the score measures:</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                                {[
                                    { label: "Ideal length (150–160 chars)", pts: "30 pts" },
                                    { label: "Keyword present", pts: "25 pts" },
                                    { label: "CTA word detected", pts: "20 pts" },
                                    { label: "Power words", pts: "up to 15 pts" },
                                    { label: "No generic opener", pts: "10 pts" },
                                ].map(item => (
                                    <div key={item.label} style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                                        <span style={{ color: "#6366f1", fontWeight: 700 }}>{item.pts}</span> — {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading skeleton */}
                {loading && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[0, 1, 2, 3, 4].map(i => (
                            <div key={i} style={{
                                height: 140, borderRadius: 16, background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                animation: "pulse 1.5s ease-in-out infinite",
                                animationDelay: `${i * 0.1}s`,
                            }} />
                        ))}
                    </div>
                )}

                {/* SEO CONTENT */}
                <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 24, padding: "36px 40px", marginBottom: 28, marginTop: 40 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>The five angles that make a meta description click</h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>
                      A <strong style={{ color: "white" }}>meta description</strong> is the grey text below a blue link in Google search results — roughly 150–160 characters to convince someone to click your page over every other result on the page. Writing the same description for every page kills CTR. The most effective approach is to test multiple angles and see which framing resonates with your audience.
                    </p>

                    <div style={{ overflowX: "auto", margin: "10px 0 32px" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                        <thead>
                          <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#6366f1" }}>Angle</th>
                            <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>What it does</th>
                            <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Best used for</th>
                          </tr>
                        </thead>
                        <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                          <tr>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Benefit-Led</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Leads with what the reader gains</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Tools, products, landing pages</td>
                          </tr>
                          <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>CTA-First</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Opens with an action verb</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Commercial intent queries</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Question-Led</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Mirrors the user&apos;s search question</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Informational content, FAQs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                       <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Why Google rewrites your description</h3>
                       <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85 }}>
                         Google rewrites meta descriptions roughly 60–70% of the time when it thinks a different snippet from your page better matches the search query. The best way to reduce rewrites is to write descriptions that directly answer the query, match page content accurately, include the target keyword, and stay within 160 characters. Descriptions that feel promotional or don&apos;t reflect the actual page content are the most likely to be replaced.
                       </p>
                    </div>
                </div>

                {/* ── SEO GUIDE ── */}
                <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "36px 36px", marginBottom: 28, marginTop: 40 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", marginBottom: 20, letterSpacing: "-0.02em" }}>The Ultimate Guide to Meta Descriptions in 2026</h2>
                    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 20 }}>
                        <p>
                            In the era of <strong style={{ color: "white" }}>Generative Search</strong>, your meta description is no longer just a snippet for Google—it is the primary data source for AI models that summarize your page in search results. Understanding the &quot;Double Intent&quot; of meta tags is the key to ranking in 2026.
                        </p>

                        <div>
                            <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>The 155-Character Sales Pitch</h3>
                            <p>
                                While Google can technically read up to 160 characters, <strong style={{ color: "white" }}>mobile truncation</strong> often starts at 120. To maximize Click-Through Rate (CTR), you must front-load your primary value proposition and target keyword in the first 100 characters. Our generator ensures your snippets are &quot;citation-ready&quot; for both humans and AI models.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Why CTR is the New Ranking Signal</h3>
                            <p>
                                As direct &quot;How-to&quot; answers are increasingly handled by AI, the clicks remaining on the SERP are for <strong style={{ color: "white" }}>solutions and services</strong>. A high-CTR meta description signals to search engines that your result is the &quot;Best Match&quot; for a user&apos;s intent, creating a positive feedback loop that raises your organic ranking.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>3 Pillars of a High-Conversion Description</h3>
                            <ul style={{ listStyleType: "circle", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                                <li><strong style={{ color: "white" }}>Benefit-First Language:</strong> Don&apos;t tell them what the page is; tell them what they will GET. Replace &quot;This page is about...&quot; with &quot;Generate expert...&quot; or &quot;Download 50...&quot;</li>
                                <li><strong style={{ color: "white" }}>Eliminate Passive Phrasing:</strong> Use active, commanding verbs. &quot;Optimize your site&quot; is always better than &quot;Your site can be optimized.&quot;</li>
                                <li><strong style={{ color: "white" }}>The Unique Sales Hook:</strong> Mention specific trust signals like &quot;No Signup Required,&quot; &quot;Free Tool,&quot; or &quot;2026 Industry Standard.&quot;</li>
                            </ul>
                        </div>

                        <p>
                            Stop guessing what works. Use our <strong style={{ color: "white" }}>CTR Scoring system</strong> to validate your descriptions against modern search standards before you hit publish. 
                        </p>
                    </div>
                </div>

                {/* ─── How it works ─── */}
                <section style={{ marginTop: 72 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#3b82f6", textTransform: "uppercase", marginBottom: 10 }}>HOW IT WORKS</p>
                    <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", marginBottom: 32, letterSpacing: "-0.02em" }}>What makes a meta description great?</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                        {[
                            { n: "01", title: "150–160 characters", body: "Google truncates at ~160 chars on desktop and ~120 on mobile. Hit 150–160 for the sweet spot — enough to be compelling, nothing wasted.", color: "#34d399" },
                            { n: "02", title: "Keyword near the front", body: "Put your target keyword in the first 120 characters. Google bolds matching terms in the snippet, making your result stand out on the page.", color: "#6366f1" },
                            { n: "03", title: "A clear call-to-action", body: "Words like 'discover', 'learn', 'get started', or 'try free' signal to the reader exactly what to do next — and lift CTR measurably.", color: "#38bdf8" },
                            { n: "04", title: "Unique on every page", body: "Duplicate meta descriptions are an SEO red flag. Every page needs its own description tailored to that page's content and search intent.", color: "#fbbf24" },
                            { n: "05", title: "Match search intent", body: "Your description must match what someone actually wants when they type that query. Informational queries need different language than commercial ones.", color: "#f472b6" },
                            { n: "06", title: "Honest, not clickbait", body: "Google rewrites descriptions it deems misleading. Write exactly what the page delivers — a match between expectation and content reduces bounce rate.", color: "#a78bfa" },
                        ].map(item => (
                            <div key={item.n} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "22px 20px" }}>
                                <div style={{ fontSize: 28, fontWeight: 900, color: item.color, opacity: 0.4, marginBottom: 10, lineHeight: 1 }}>{item.n}</div>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── FAQ ─── */}
                <section style={{ marginTop: 72 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#3b82f6", textTransform: "uppercase", marginBottom: 10 }}>FAQ</p>
                    <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", marginBottom: 32, letterSpacing: "-0.02em" }}>Common questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            {
                                q: "What is the best meta description generator?",
                                a: "ToolStack's free meta description generator generates 5 click-optimised variants at once — covering benefit-led, feature-focused, urgency, question-led, and CTA-first angles. It includes a live Google SERP preview, CTR score, character counter, and one-click HTML copy. Most tools charge for multiple variants. Ours is 100% free, no signup required.",
                            },
                            {
                                q: "How long should a meta description be?",
                                a: "The ideal meta description is 150–160 characters. Google truncates beyond ~160 on desktop and ~120 on mobile. Front-load your keyword and value proposition in the first 120 characters to guarantee visibility on both.",
                            },
                            {
                                q: "Do meta descriptions affect Google rankings?",
                                a: "Meta descriptions are not a direct ranking factor. However, they directly affect click-through rate (CTR), which can indirectly influence rankings. A well-written description with your keyword and a clear CTA can double CTR compared to a weak one.",
                            },
                            {
                                q: "Why does Google rewrite my meta description?",
                                a: "Google rewrites meta descriptions 60–70% of the time when it thinks another snippet from your page better answers the user's query. To reduce rewrites: keep descriptions accurate, include your keyword, avoid promotional language that doesn't match page content, and stay within 160 characters.",
                            },
                            {
                                q: "What should a good meta description include?",
                                a: "A strong meta description includes: your target keyword (ideally in the first half), a clear benefit or value proposition, a call-to-action, a length of 150–160 characters, and unique copy specific to that page. Power words like 'free', 'instant', 'proven', or 'step-by-step' also increase CTR.",
                            },
                            {
                                q: "What is the difference between a meta description and a title tag?",
                                a: "The title tag (meta title) is the clickable blue headline in Google — ideal 50–60 characters. The meta description is the grey text below it — ideal 150–160 characters. Both live in your page's HTML <head>. Both influence CTR from search results. Neither is a direct ranking signal, but both indirectly affect SEO through CTR.",
                            },
                        ].map((item, i) => (
                            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 22px" }}>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", marginBottom: 10 }}>{item.q}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* More Tools + Banner */}
                <MoreTools currentSlug="meta-description-generator" />
                

            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
                select option { background: #1a1a2e; color: white; }
                input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
                input:focus, textarea:focus, select:focus { border-color: rgba(99,102,241,0.4) !important; }
            `}</style>
        </div>
    );
}
