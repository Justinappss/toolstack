"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

interface Tool {
    title: string;
    desc: string;
    href: string;
    accent: string;
    accentRgb: string;
    category: string;
    badge: string | null;
    image: string;
}

export function ToolSearch({ tools = [], isOpen, onClose }: { tools?: Tool[]; isOpen?: boolean; onClose?: () => void }) {
    // Modal mode: isOpen prop is provided. Inline mode: isOpen is undefined.
    const isModalMode = isOpen !== undefined;

    // Close on Escape
    useEffect(() => {
        if (!isModalMode) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose?.(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isModalMode, onClose]);

    // In modal mode, render nothing when closed
    if (isModalMode && !isOpen) return null;
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [requestText, setRequestText] = useState("");
    const [requestSent, setRequestSent] = useState(false);
    const [sending, setSending] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(tools.map(t => t.category))).sort();
        return ["All", ...cats];
    }, [tools]);

    const filtered = useMemo(() => {
        let list = activeCategory === "All" ? tools : tools.filter(t => t.category === activeCategory);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(t =>
                t.title.toLowerCase().includes(q) ||
                t.desc.toLowerCase().includes(q) ||
                t.category.toLowerCase().includes(q)
            );
        }
        return list;
    }, [query, activeCategory, tools]);

    const noResults = filtered.length === 0 && (query.trim().length > 0 || activeCategory !== "All");

    async function handleRequest() {
        const text = requestText.trim();
        if (!text || sending) return;

        setSending(true);
        try {
            await fetch("/api/tool-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: text }),
            });
            setRequestSent(true);
            setRequestText("");
        } catch {
            // silently fail
        }
        setSending(false);
    }

    const inner = (
        <>
            {/* Category pills */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 20,
            }}>
                {categories.map(cat => {
                    const isActive = cat === activeCategory;
                    return (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setQuery(""); }}
                            style={{
                                padding: "7px 16px",
                                borderRadius: 999,
                                border: `1px solid ${isActive ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`,
                                background: isActive ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                                fontSize: 13,
                                fontWeight: isActive ? 700 : 600,
                                color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                                cursor: "pointer",
                                transition: "all 0.15s",
                                fontFamily: "inherit",
                            }}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Search bar */}
            <div style={{
                position: "relative",
                marginBottom: 36,
                maxWidth: 560,
            }}>
                <div style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.04)",
                    border: query.trim()
                        ? "1px solid rgba(99,102,241,0.4)"
                        : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    padding: "0 18px",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxShadow: query.trim()
                        ? "0 0 24px rgba(99,102,241,0.12)"
                        : "none",
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => { setQuery(e.target.value); setRequestSent(false); }}
                        placeholder="Search tools — e.g. 'password', 'SEO', 'AI writer'..."
                        style={{
                            flex: 1,
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            padding: "16px 14px",
                            fontSize: 15,
                            fontWeight: 500,
                            color: "white",
                            fontFamily: "inherit",
                        }}
                    />
                    {query && (
                        <button
                            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                            style={{
                                background: "rgba(255,255,255,0.08)",
                                border: "none",
                                borderRadius: 8,
                                padding: "4px 8px",
                                cursor: "pointer",
                                color: "rgba(255,255,255,0.5)",
                                fontSize: 12,
                                fontWeight: 700,
                            }}
                        >✕</button>
                    )}
                </div>
                {query.trim() && !noResults && (
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 8, paddingLeft: 4 }}>
                        {filtered.length} tool{filtered.length !== 1 ? "s" : ""} found
                    </p>
                )}
            </div>

            {/* Tool grid */}
            {filtered.length > 0 && (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: 24,
                    marginBottom: 24,
                }}>
                    {filtered.map((tool) => (
                        <Link key={tool.title} href={tool.href} style={{ textDecoration: "none" }}>
                            <div
                                className="tool-card-v2"
                                style={{
                                    "--accent-rgb": tool.accentRgb,
                                    "--accent": tool.accent,
                                    background: "rgba(255,255,255,0.025)",
                                    border: `1px solid rgba(${tool.accentRgb},0.15)`,
                                    borderRadius: 20,
                                    height: "100%",
                                    cursor: "pointer",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "border-color 0.3s, box-shadow 0.3s",
                                } as React.CSSProperties}
                            >
                                {/* Preview Image */}
                                <div style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    borderBottom: `1px solid rgba(${tool.accentRgb},0.12)`,
                                }}>
                                    <div style={{
                                        position: "absolute", inset: 0,
                                        background: "linear-gradient(180deg, transparent 60%, rgba(6,6,12,0.85) 100%)",
                                        zIndex: 1, pointerEvents: "none",
                                    }} />
                                    <img
                                        src={tool.image}
                                        alt={`${tool.title} interface preview`}
                                        width={680}
                                        height={400}
                                        style={{
                                            width: "100%",
                                            height: 220,
                                            objectFit: "cover",
                                            objectPosition: "top center",
                                            display: "block",
                                            transition: "transform 0.4s ease",
                                        }}
                                        className="tool-card-img"
                                        loading="lazy"
                                    />
                                    <div style={{
                                        position: "absolute", top: 14, left: 14,
                                        display: "flex", gap: 6, zIndex: 2,
                                    }}>
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 999,
                                            letterSpacing: "0.06em", textTransform: "uppercase",
                                            background: "rgba(6,6,12,0.75)",
                                            backdropFilter: "blur(8px)",
                                            border: `1px solid rgba(${tool.accentRgb},0.35)`,
                                            color: tool.accent,
                                        }}>{tool.category}</span>
                                        {tool.badge && (
                                            <span style={{
                                                fontSize: 10, fontWeight: 800, padding: "4px 10px", borderRadius: 999,
                                                background: `rgba(${tool.accentRgb},0.25)`,
                                                backdropFilter: "blur(8px)",
                                                border: `1px solid rgba(${tool.accentRgb},0.4)`,
                                                color: "white",
                                            }}>{tool.badge}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: "20px 22px 22px" }}>
                                    <h3 style={{
                                        fontSize: 17, fontWeight: 800, color: "white",
                                        margin: "0 0 8px", letterSpacing: "-0.01em", lineHeight: 1.25,
                                    }}>
                                        {tool.title}
                                    </h3>
                                    <p style={{
                                        fontSize: 13, color: "rgba(255,255,255,0.45)",
                                        lineHeight: 1.6, margin: "0 0 16px",
                                    }}>
                                        {tool.desc}
                                    </p>
                                    <div style={{
                                        display: "inline-flex", alignItems: "center", gap: 6,
                                        fontSize: 13, fontWeight: 800, color: tool.accent,
                                    }}>
                                        Try it free <ArrowRight size={13} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* No results — Request a tool */}
            {noResults && (
                <div style={{
                    padding: "48px 36px",
                    background: "linear-gradient(145deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.04) 100%)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: 24,
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: 24,
                }}>
                    <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(30px)" }} />
                    <div style={{ position: "absolute", bottom: -40, left: -40, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(20px)" }} />

                    <div style={{ position: "relative" }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: 18,
                            background: "rgba(99,102,241,0.12)",
                            border: "1px solid rgba(99,102,241,0.25)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 20px",
                        }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                                <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                        </div>

                        <h3 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 8, letterSpacing: "-0.02em" }}>
                            {query.trim() ? `No tools found for "${query}"` : `No tools in ${activeCategory} yet`}
                        </h3>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
                            {query.trim()
                                ? "We don't have that tool yet — but tell us what you need and we'll build it."
                                : "More tools are being added every week. Tell us what you'd like to see."}
                        </p>

                        {requestSent ? (
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 10,
                                padding: "16px 28px", borderRadius: 16,
                                background: "rgba(52,211,153,0.1)",
                                border: "1px solid rgba(52,211,153,0.3)",
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <span style={{ fontSize: 15, fontWeight: 700, color: "#34d399" }}>
                                    Request received! We&apos;ll review it and build it if it fits.
                                </span>
                            </div>
                        ) : (
                            <div style={{ maxWidth: 460, margin: "0 auto" }}>
                                <textarea
                                    value={requestText}
                                    onChange={e => setRequestText(e.target.value)}
                                    placeholder={`Tell us what kind of tool you're looking for...\ne.g. "A tool that converts CSV to JSON" or "An image compressor"`}
                                    rows={3}
                                    style={{
                                        width: "100%",
                                        padding: "14px 18px",
                                        borderRadius: 14,
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        color: "white",
                                        fontSize: 14,
                                        fontFamily: "inherit",
                                        resize: "vertical",
                                        outline: "none",
                                        marginBottom: 14,
                                    }}
                                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; }}
                                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                                />
                                <button
                                    onClick={handleRequest}
                                    disabled={!requestText.trim() || sending}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: 8,
                                        padding: "13px 28px", borderRadius: 12,
                                        background: requestText.trim()
                                            ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                                            : "rgba(255,255,255,0.06)",
                                        color: requestText.trim() ? "white" : "rgba(255,255,255,0.3)",
                                        fontSize: 14, fontWeight: 800,
                                        border: "none", cursor: requestText.trim() ? "pointer" : "not-allowed",
                                        boxShadow: requestText.trim() ? "0 4px 20px rgba(99,102,241,0.35)" : "none",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {sending ? "Sending..." : "Request This Tool"}
                                    {!sending && (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );

    if (!isModalMode) return inner;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                display: "flex", alignItems: "flex-start", justifyContent: "center",
                padding: "80px 24px 40px",
                overflowY: "auto",
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: "100%", maxWidth: 760,
                    background: "#0d0d16",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 20,
                    padding: "28px 28px 32px",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                    position: "relative",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute", top: 16, right: 16,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8, width: 32, height: 32,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: "rgba(255,255,255,0.5)",
                    }}
                >
                    <X size={15} />
                </button>
                {inner}
            </div>
        </div>
    );
}
