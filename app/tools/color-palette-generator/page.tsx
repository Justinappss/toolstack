"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";

interface ColorSwatch {
    hex: string;
    name: string;
    role: string;
    usage: string;
}

const STYLE_PRESETS = [
    { id: "brand", label: "Brand Identity", icon: "◆" },
    { id: "ui", label: "UI / Web", icon: "⬡" },
    { id: "dark", label: "Dark Theme", icon: "◉" },
    { id: "minimal", label: "Minimal", icon: "◻" },
    { id: "vibrant", label: "Vibrant", icon: "★" },
    { id: "nature", label: "Natural", icon: "◈" },
];

const EXAMPLES = [
    "modern fintech startup",
    "luxury skincare brand",
    "dark cyberpunk game",
    "organic coffee shop",
    "children's learning app",
    "sustainable fashion brand",
];

const ROLE_ORDER = ["Primary", "Secondary", "Accent", "Background", "Text"];

function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null;
}

function hexToHsl(hex: string): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return "";
    let r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return `${Math.round(h * 360)}° ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function getTextColor(hex: string): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return "white";
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.55 ? "#1a1a2e" : "white";
}

function SwatchCard({ swatch, index }: { swatch: ColorSwatch; index: number }) {
    const [copied, setCopied] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), index * 80);
        return () => clearTimeout(t);
    }, [index]);

    const textCol = getTextColor(swatch.hex);
    const rgb = hexToRgb(swatch.hex);
    const hsl = hexToHsl(swatch.hex);

    function copy() {
        navigator.clipboard.writeText(swatch.hex.toUpperCase());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.03)",
            display: "flex",
            flexDirection: "column",
        }}>
            {/* Color block */}
            <div
                onClick={copy}
                style={{
                    background: swatch.hex,
                    height: 160,
                    position: "relative",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 16,
                    transition: "filter 0.15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.filter = "brightness(1.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.filter = "brightness(1)"; }}
            >
                <span style={{
                    fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: textCol,
                    padding: "4px 10px", borderRadius: 999,
                    background: textCol === "white" ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.35)",
                    display: "inline-block", alignSelf: "flex-start",
                }}>{swatch.role}</span>

                <div>
                    <p style={{ fontSize: 20, fontWeight: 900, color: textCol, margin: 0, letterSpacing: "0.04em", fontFamily: "monospace" }}>
                        {swatch.hex.toUpperCase()}
                    </p>
                    <p style={{ fontSize: 12, color: textCol, opacity: 0.75, margin: "3px 0 0", fontWeight: 600 }}>{swatch.name}</p>
                </div>

                {copied && (
                    <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
                        borderRadius: 0,
                    }}>
                        <span style={{ fontSize: 15, fontWeight: 800, color: "white" }}>✓ Copied!</span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>{swatch.usage}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: "auto" }}>
                    {rgb && (
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                            rgb({rgb.r}, {rgb.g}, {rgb.b})
                        </span>
                    )}
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                        hsl({hsl})
                    </span>
                </div>
                <button
                    onClick={copy}
                    style={{
                        padding: "8px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)",
                        fontSize: 12, fontWeight: 700, cursor: "pointer", width: "100%",
                        transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                >
                    {copied ? "✓ Copied!" : "Copy Hex"}
                </button>
            </div>
        </div>
    );
}

function buildCssVars(palette: ColorSwatch[]): string {
    const lines = palette.map(c => `  --color-${c.role.toLowerCase()}: ${c.hex.toUpperCase()};`);
    return `:root {\n${lines.join("\n")}\n}`;
}

function buildTailwind(palette: ColorSwatch[]): string {
    const entries = palette.map(c => `    '${c.role.toLowerCase()}': '${c.hex.toUpperCase()}',`);
    return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n${entries.join("\n")}\n      },\n    },\n  },\n}`;
}

function buildScss(palette: ColorSwatch[]): string {
    const lines = palette.map(c => `$color-${c.role.toLowerCase()}: ${c.hex.toUpperCase()};`);
    return lines.join("\n");
}

export default function ColorPaletteGenerator() {
    const [description, setDescription] = useState("");
    const [style, setStyle] = useState("brand");
    const [palette, setPalette] = useState<ColorSwatch[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [exportFormat, setExportFormat] = useState<"css" | "tailwind" | "scss">("css");
    const [exportCopied, setExportCopied] = useState(false);

    const sortedPalette = palette
        ? [...palette].sort((a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role))
        : null;

    const exportCode = sortedPalette
        ? exportFormat === "css" ? buildCssVars(sortedPalette)
            : exportFormat === "tailwind" ? buildTailwind(sortedPalette)
                : buildScss(sortedPalette)
        : "";

    const generate = useCallback(async () => {
        if (!description.trim()) return;
        setLoading(true);
        setError("");
        setPalette(null);

        try {
            const res = await fetch("/api/color-palette-generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: description.trim(), style }),
            });
            const data = await res.json();
            if (!res.ok || data.error) throw new Error(data.error || "Failed to generate palette.");
            setPalette(data.palette);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [description, style]);

    function copyExport() {
        navigator.clipboard.writeText(exportCode);
        setExportCopied(true);
        setTimeout(() => setExportCopied(false), 2000);
    }

    function copyAll() {
        if (!sortedPalette) return;
        const text = sortedPalette.map(c => `${c.role}: ${c.hex.toUpperCase()} — ${c.name}`).join("\n");
        navigator.clipboard.writeText(text);
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "AI Color Palette Generator",
                "description": "Generate beautiful, professional color palettes from any text description using AI. Get 5 harmonious colors with hex codes, RGB, HSL, CSS variables, Tailwind config and usage guidance.",
                "url": "https://toolstack.tech/tools/color-palette-generator",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "Web",
                "browserRequirements": "Requires JavaScript",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "featureList": [
                    "AI-generated palettes from text descriptions",
                    "5 harmonious colors with named roles",
                    "Hex, RGB, and HSL values",
                    "One-click copy for each color",
                    "CSS variables export",
                    "Tailwind CSS config export",
                    "SCSS variables export",
                    "6 style presets: Brand, UI, Dark, Minimal, Vibrant, Natural",
                    "No signup, completely free",
                ],
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "Design", "item": "https://toolstack.tech/tools?category=design" },
                    { "@type": "ListItem", "position": 3, "name": "AI Color Palette Generator", "item": "https://toolstack.tech/tools/color-palette-generator" },
                ],
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is the best free AI color palette generator?",
                        "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's AI Color Palette Generator is one of the best free options available. Unlike Coolors or Adobe Color, it lets you describe your brand or project in plain text — 'modern fintech startup' or 'luxury skincare brand' — and instantly generates a professional 5-color palette with hex codes, CSS variables, and Tailwind config. No signup required." },
                    },
                    {
                        "@type": "Question",
                        "name": "How do I generate a color palette from a description?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Type a description of your brand, project, or mood into the input field — for example 'dark cyberpunk game' or 'organic coffee shop'. Select a style preset (Brand, UI, Dark, Minimal, Vibrant, or Natural) and click Generate Palette. GPT-4o will create a harmonious 5-color palette tailored to your description in seconds." },
                    },
                    {
                        "@type": "Question",
                        "name": "What do the 5 color roles mean?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Each palette contains 5 roles: Primary (your main brand color, used for CTAs and headings), Secondary (supporting elements and hover states), Accent (highlights, icons, and interactive elements), Background (page backgrounds and card surfaces), and Text (body copy and labels). This role-based system ensures the palette is immediately usable in any design system." },
                    },
                    {
                        "@type": "Question",
                        "name": "How do I export the color palette for CSS or Tailwind?",
                        "acceptedAnswer": { "@type": "Answer", "text": "After generating a palette, scroll to the Export section below the swatches. Choose CSS Variables, Tailwind Config, or SCSS Variables and click Copy Code. The CSS variables export creates a :root block ready to paste into your stylesheet. The Tailwind export creates a colors object for tailwind.config.js. The SCSS export creates $variable declarations." },
                    },
                    {
                        "@type": "Question",
                        "name": "Are the generated color palettes WCAG accessible?",
                        "acceptedAnswer": { "@type": "Answer", "text": "The AI is instructed to ensure the Background and Text color combination meets WCAG AA contrast requirements (minimum 4.5:1 contrast ratio for normal text). The Accent and Primary colors are optimised for use on both light and dark backgrounds. For critical accessibility decisions, always verify contrast ratios using a dedicated contrast checker." },
                    },
                    {
                        "@type": "Question",
                        "name": "Can I generate multiple palettes for the same description?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Click Generate Palette as many times as you like. Each generation uses the same description but produces a different palette — GPT-4o introduces variation so you can explore multiple directions. Switching between style presets (Brand, UI, Dark, etc.) will also produce significantly different results for the same description." },
                    },
                    {
                        "@type": "Question",
                        "name": "What style presets are available?",
                        "acceptedAnswer": { "@type": "Answer", "text": "There are 6 style presets: Brand Identity (professional, versatile, logo-ready), UI/Web (clean, high-contrast, accessible), Dark Theme (rich darks with glowing accents), Minimal (restrained, near-monochromatic with one focal accent), Vibrant (bold, saturated, high-energy), and Natural (organic, earthy, grounded in nature-inspired tones)." },
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
                <div style={{ position: "absolute", top: "-10%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,121,249,0.12) 0%, transparent 65%)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", top: "40%", left: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)", filter: "blur(60px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>ToolStack</Link>
                    <span>›</span>
                    <Link href="/tools?category=design" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Design</Link>
                    <span>›</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>AI Color Palette Generator</span>
                </nav>

                {/* Hero */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {[
                            { label: "AI-Powered", color: "#e879f9" },
                            { label: "Free Forever", color: "#34d399" },
                            { label: "No Signup", color: "#818cf8" },
                            { label: "GPT-4o", color: "#fbbf24" },
                        ].map(b => (
                            <span key={b.label} style={{
                                fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999,
                                background: `rgba(${b.color === "#e879f9" ? "232,121,249" : b.color === "#34d399" ? "52,211,153" : b.color === "#818cf8" ? "129,140,248" : "251,191,36"},0.1)`,
                                border: `1px solid ${b.color}30`,
                                color: b.color,
                            }}>{b.label}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                        AI Color{" "}
                        <span style={{ background: "linear-gradient(135deg, #e879f9, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Palette Generator
                        </span>
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 600, lineHeight: 1.65, margin: 0 }}>
                        Describe your brand or project in plain words. Get a perfect 5-color palette with hex codes, CSS variables, and Tailwind config — instantly.
                    </p>
                </div>

                {/* Main tool card */}
                <div style={{
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 24,
                    padding: "32px",
                    marginBottom: 32,
                }}>
                    {/* Description input */}
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                            Describe Your Project or Brand
                        </label>
                        <div style={{ position: "relative" }}>
                            <input
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter" && !loading) generate(); }}
                                placeholder="e.g. &quot;modern fintech startup&quot; or &quot;dark cyberpunk game&quot;"
                                maxLength={120}
                                style={{
                                    width: "100%",
                                    padding: "14px 18px",
                                    borderRadius: 14,
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "white",
                                    fontSize: 15,
                                    fontFamily: "inherit",
                                    outline: "none",
                                    boxSizing: "border-box",
                                    transition: "border-color 0.2s",
                                }}
                                onFocus={e => { e.currentTarget.style.borderColor = "rgba(232,121,249,0.4)"; }}
                                onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                            />
                        </div>

                        {/* Example pills */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", alignSelf: "center", marginRight: 2 }}>Try:</span>
                            {EXAMPLES.map(ex => (
                                <button key={ex} onClick={() => setDescription(ex)} style={{
                                    fontSize: 11, padding: "4px 10px", borderRadius: 999,
                                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                    color: "rgba(255,255,255,0.45)", cursor: "pointer", fontFamily: "inherit",
                                    transition: "all 0.15s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(232,121,249,0.3)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                                >{ex}</button>
                            ))}
                        </div>
                    </div>

                    {/* Style presets */}
                    <div style={{ marginBottom: 28 }}>
                        <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                            Style Direction
                        </label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {STYLE_PRESETS.map(s => {
                                const isActive = style === s.id;
                                return (
                                    <button key={s.id} onClick={() => setStyle(s.id)} style={{
                                        padding: "8px 16px", borderRadius: 12,
                                        border: `1px solid ${isActive ? "rgba(232,121,249,0.5)" : "rgba(255,255,255,0.08)"}`,
                                        background: isActive ? "rgba(232,121,249,0.12)" : "rgba(255,255,255,0.03)",
                                        color: isActive ? "#e879f9" : "rgba(255,255,255,0.5)",
                                        fontSize: 13, fontWeight: isActive ? 700 : 500,
                                        cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
                                        transition: "all 0.15s", fontFamily: "inherit",
                                    }}>
                                        <span style={{ fontSize: 14 }}>{s.icon}</span>
                                        {s.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Generate button */}
                    <button
                        onClick={generate}
                        disabled={!description.trim() || loading}
                        style={{
                            width: "100%", padding: "15px 0", borderRadius: 14,
                            background: description.trim() && !loading
                                ? "linear-gradient(135deg, #e879f9 0%, #818cf8 100%)"
                                : "rgba(255,255,255,0.06)",
                            color: description.trim() && !loading ? "white" : "rgba(255,255,255,0.25)",
                            fontSize: 15, fontWeight: 800,
                            border: "none", cursor: description.trim() && !loading ? "pointer" : "not-allowed",
                            boxShadow: description.trim() && !loading ? "0 8px 32px rgba(232,121,249,0.3)" : "none",
                            transition: "all 0.2s", fontFamily: "inherit",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                        }}
                    >
                        {loading ? (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                                </svg>
                                Generating Palette...
                            </>
                        ) : (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                                Generate Palette — Free
                            </>
                        )}
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        padding: "16px 20px", borderRadius: 14, marginBottom: 24,
                        background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
                        color: "#f87171", fontSize: 14, fontWeight: 600,
                    }}>
                        {error}
                    </div>
                )}

                {/* Loading skeleton */}
                {loading && (
                    <div style={{ marginBottom: 32 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16 }}>
                            {[0, 1, 2, 3, 4].map(i => (
                                <div key={i} style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <div className="skeleton" style={{ height: 160 }} />
                                    <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.02)" }}>
                                        <div className="skeleton" style={{ height: 12, borderRadius: 6, marginBottom: 8 }} />
                                        <div className="skeleton" style={{ height: 10, borderRadius: 6, width: "70%" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results */}
                {sortedPalette && !loading && (
                    <>
                        {/* Palette header */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                            <div>
                                <h2 style={{ fontSize: 20, fontWeight: 900, color: "white", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Your Palette</h2>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>Click any swatch to copy the hex code</p>
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={copyAll} style={{
                                    padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                    color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "inherit",
                                    transition: "all 0.15s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "white"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                                >Copy All</button>
                                <button onClick={generate} style={{
                                    padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                                    background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.25)",
                                    color: "#e879f9", cursor: "pointer", fontFamily: "inherit",
                                    transition: "all 0.15s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,121,249,0.2)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(232,121,249,0.1)"; }}
                                >↺ Regenerate</button>
                            </div>
                        </div>

                        {/* Swatches grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16, marginBottom: 32 }}>
                            {sortedPalette.map((swatch, i) => (
                                <SwatchCard key={i} swatch={swatch} index={i} />
                            ))}
                        </div>

                        {/* Palette preview bar */}
                        <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 32, border: "1px solid rgba(255,255,255,0.07)", height: 60, display: "flex" }}>
                            {sortedPalette.map((c, i) => (
                                <div key={i} style={{ background: c.hex, flex: 1 }} title={`${c.role}: ${c.hex}`} />
                            ))}
                        </div>

                        {/* Export panel */}
                        <div style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 20,
                            padding: 24,
                            marginBottom: 32,
                        }}>
                            <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.01em" }}>Export Code</h2>
                            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                                {(["css", "tailwind", "scss"] as const).map(fmt => (
                                    <button key={fmt} onClick={() => setExportFormat(fmt)} style={{
                                        padding: "7px 16px", borderRadius: 10,
                                        border: `1px solid ${exportFormat === fmt ? "rgba(232,121,249,0.4)" : "rgba(255,255,255,0.08)"}`,
                                        background: exportFormat === fmt ? "rgba(232,121,249,0.1)" : "rgba(255,255,255,0.03)",
                                        color: exportFormat === fmt ? "#e879f9" : "rgba(255,255,255,0.5)",
                                        fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                                        transition: "all 0.15s",
                                    }}>
                                        {fmt === "css" ? "CSS Variables" : fmt === "tailwind" ? "Tailwind Config" : "SCSS Variables"}
                                    </button>
                                ))}
                            </div>
                            <div style={{ position: "relative" }}>
                                <pre style={{
                                    background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: 12, padding: "16px 20px",
                                    fontSize: 12, color: "rgba(255,255,255,0.75)", fontFamily: "monospace",
                                    margin: 0, overflowX: "auto", lineHeight: 1.7, whiteSpace: "pre-wrap",
                                }}>{exportCode}</pre>
                                <button onClick={copyExport} style={{
                                    position: "absolute", top: 12, right: 12,
                                    padding: "6px 14px", borderRadius: 8,
                                    background: exportCopied ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.08)",
                                    border: `1px solid ${exportCopied ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.12)"}`,
                                    color: exportCopied ? "#34d399" : "rgba(255,255,255,0.6)",
                                    fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                                    transition: "all 0.2s",
                                }}>
                                    {exportCopied ? "✓ Copied!" : "Copy Code"}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Empty state */}
                {!palette && !loading && !error && (
                    <div style={{
                        padding: "48px 24px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 20,
                        textAlign: "center",
                        marginBottom: 32,
                    }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: 18, margin: "0 auto 20px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)",
                        }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e879f9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8a4 4 0 0 1 0 8" />
                                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                            </svg>
                        </div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.5)", margin: "0 0 8px" }}>Your palette will appear here</p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>Describe your project above and click Generate Palette</p>
                    </div>
                )}

                {/* How it works */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>How It Works</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                        {[
                            { step: "01", title: "Describe your project", desc: "Type anything — a brand name, product type, mood, or industry. The more specific you are, the better the palette.", icon: "✍" },
                            { step: "02", title: "Choose a style direction", desc: "Select from 6 presets: Brand Identity, UI/Web, Dark Theme, Minimal, Vibrant, or Natural. Each guides the AI's aesthetic choices.", icon: "◆" },
                            { step: "03", title: "Get your palette instantly", desc: "GPT-4o generates 5 harmonious colors — Primary, Secondary, Accent, Background, and Text — with names and usage guidance.", icon: "✦" },
                            { step: "04", title: "Export and use", desc: "Copy individual hex codes, or export the whole palette as CSS variables, Tailwind config, or SCSS variables in one click.", icon: "⬡" },
                        ].map(item => (
                            <div key={item.step} style={{
                                padding: "24px", borderRadius: 16,
                                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
                            }}>
                                <div style={{ fontSize: 11, fontWeight: 900, color: "rgba(232,121,249,0.6)", letterSpacing: "0.1em", marginBottom: 10 }}>STEP {item.step}</div>
                                <div style={{ fontSize: 22, marginBottom: 12 }}>{item.icon}</div>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.65 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SEO content */}
                <section style={{ marginBottom: 48, padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>What Makes a Great Color Palette?</h2>
                    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
                        <p style={{ margin: "0 0 16px" }}>
                            A professional color palette does more than look attractive — it communicates your brand&apos;s personality, guides user attention, and ensures accessibility. Every palette needs at least five distinct roles: a <strong style={{ color: "rgba(255,255,255,0.8)" }}>Primary</strong> color for brand identity and key actions, a <strong style={{ color: "rgba(255,255,255,0.8)" }}>Secondary</strong> color for supporting elements, an <strong style={{ color: "rgba(255,255,255,0.8)" }}>Accent</strong> color for interactive highlights, a <strong style={{ color: "rgba(255,255,255,0.8)" }}>Background</strong> color for surfaces, and a <strong style={{ color: "rgba(255,255,255,0.8)" }}>Text</strong> color that maintains WCAG contrast standards.
                        </p>
                        <p style={{ margin: "0 0 16px" }}>
                            Unlike traditional color wheel tools like Coolors or Adobe Color — which require you to manually pick and adjust colors — ToolStack&apos;s AI palette generator takes a completely different approach. Describe your brand in natural language and GPT-4o selects colors based on color psychology, industry conventions, and aesthetic harmony. A &quot;luxury skincare brand&quot; gets soft, premium neutrals. A &quot;dark cyberpunk game&quot; gets electric neons on near-black backgrounds.
                        </p>
                        <p style={{ margin: 0 }}>
                            The generated palettes are immediately production-ready. The CSS variables export drops straight into any stylesheet. The Tailwind config integrates directly into your <code style={{ fontSize: 13, background: "rgba(255,255,255,0.07)", padding: "2px 6px", borderRadius: 4 }}>tailwind.config.js</code>. No conversion, no reformatting — just copy and build.
                        </p>
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            {
                                q: "What is the best free AI color palette generator?",
                                a: "ToolStack's AI Color Palette Generator is one of the best free options available. Unlike Coolors or Adobe Color, it lets you describe your brand or project in plain text and instantly generates a professional 5-color palette with hex codes, CSS variables, and Tailwind config. No signup required.",
                            },
                            {
                                q: "How do I generate a color palette from a description?",
                                a: "Type a description of your brand, project, or mood — for example 'dark cyberpunk game' or 'organic coffee shop'. Select a style preset and click Generate Palette. GPT-4o creates a harmonious 5-color palette tailored to your description in seconds.",
                            },
                            {
                                q: "What do the 5 color roles mean?",
                                a: "Primary is your main brand color for CTAs and headings. Secondary supports hover states and secondary elements. Accent highlights icons and interactive elements. Background covers page surfaces and cards. Text ensures readable body copy and labels.",
                            },
                            {
                                q: "How do I export the palette for CSS or Tailwind?",
                                a: "After generating, scroll to the Export section. Choose CSS Variables, Tailwind Config, or SCSS Variables and click Copy Code. CSS variables creates a :root block. Tailwind creates a colors object for tailwind.config.js. SCSS creates $variable declarations.",
                            },
                            {
                                q: "Are the generated palettes WCAG accessible?",
                                a: "The AI is instructed to ensure the Background and Text color combination meets WCAG AA contrast requirements. For critical accessibility decisions, verify contrast ratios using our Colour Contrast Checker tool.",
                            },
                            {
                                q: "Can I generate multiple palettes for the same description?",
                                a: "Yes — click Generate Palette or Regenerate as many times as you like. Each generation introduces variation. Switching between style presets (Brand, UI, Dark, etc.) produces significantly different results for the same description.",
                            },
                            {
                                q: "What style presets are available?",
                                a: "Six style presets: Brand Identity (professional, versatile), UI/Web (clean, accessible), Dark Theme (rich darks with glowing accents), Minimal (restrained, near-monochromatic), Vibrant (bold, saturated), and Natural (organic, earthy).",
                            },
                        ].map(({ q, a }) => (
                            <div key={q} style={{ padding: "20px 24px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px", lineHeight: 1.4 }}>{q}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <MoreTools currentSlug="color-palette-generator" />
                <AdvertiseGPTBanner />
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%); background-size: 200% 100%; animation: skeleton-shimmer 1.5s infinite; }
                @keyframes skeleton-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
            `}</style>
        </div>
    );
}
