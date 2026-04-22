"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";

const PAGE_SIZES = [
    { label: "A4", value: "a4", w: 210, h: 297 },
    { label: "Letter (US)", value: "letter", w: 215.9, h: 279.4 },
    { label: "Legal (US)", value: "legal", w: 215.9, h: 355.6 },
    { label: "A3", value: "a3", w: 297, h: 420 },
];

const FONT_SIZES = [10, 11, 12, 14, 16, 18];

const FONTS = ["Helvetica", "Times", "Courier"];

export default function PdfGeneratorPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pageSize, setPageSize] = useState("a4");
    const [fontSize, setFontSize] = useState(12);
    const [font, setFont] = useState("Helvetica");
    const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("document");

    const generate = useCallback(async () => {
        if (!content.trim() && !title.trim()) return;
        setLoading(true);
        try {
            const { jsPDF } = await import("jspdf");
            const size = PAGE_SIZES.find(p => p.value === pageSize)!;
            const doc = new jsPDF({ orientation, unit: "mm", format: pageSize as any });

            const pageW = orientation === "portrait" ? size.w : size.h;
            const pageH = orientation === "portrait" ? size.h : size.w;
            const margin = 20;
            const maxW = pageW - margin * 2;
            let y = margin;

            // Title
            if (title.trim()) {
                doc.setFont(font, "bold");
                doc.setFontSize(fontSize + 6);
                const titleLines = doc.splitTextToSize(title.trim(), maxW);
                titleLines.forEach((line: string) => {
                    if (y + 10 > pageH - margin) { doc.addPage(); y = margin; }
                    doc.text(line, margin, y);
                    y += (fontSize + 6) * 0.4 + 2;
                });
                y += 4;
                // Underline
                doc.setDrawColor(180, 180, 180);
                doc.line(margin, y, pageW - margin, y);
                y += 8;
            }

            // Body
            if (content.trim()) {
                doc.setFont(font, "normal");
                doc.setFontSize(fontSize);
                const lineHeight = fontSize * 0.4 + 2;
                const paragraphs = content.split(/\n\n+/);
                paragraphs.forEach((para, pi) => {
                    const lines = doc.splitTextToSize(para.trim(), maxW);
                    lines.forEach((line: string) => {
                        if (y + lineHeight > pageH - margin) { doc.addPage(); y = margin; }
                        doc.text(line, margin, y);
                        y += lineHeight;
                    });
                    if (pi < paragraphs.length - 1) y += lineHeight * 0.6;
                });
            }

            // Page numbers
            const totalPages = doc.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFont(font, "normal");
                doc.setFontSize(9);
                doc.setTextColor(150, 150, 150);
                doc.text(`${i} / ${totalPages}`, pageW - margin, pageH - 10, { align: "right" });
                doc.setTextColor(0, 0, 0);
            }

            doc.save(`${fileName || "document"}.pdf`);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [title, content, pageSize, fontSize, font, orientation, fileName]);

    const charCount = content.length;
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

    return (
        <div style={{ minHeight: "100vh", background: "#06060c" }}>
            {/* Hero */}
            <div style={{
                background: "linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(6,6,12,0) 60%)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                padding: "56px 24px 40px",
            }}>
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <Link href="/tools" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
                            All Tools
                        </Link>
                        <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>PDF Generator</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: 14,
                            background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 22, flexShrink: 0,
                        }}>📄</div>
                        <h1 style={{ fontSize: 32, fontWeight: 900, color: "white", margin: 0, letterSpacing: "-0.03em" }}>
                            PDF Generator
                        </h1>
                    </div>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>
                        Type or paste your text, customise fonts and page size, then download as a clean PDF instantly. No signup, no watermarks.
                    </p>
                </div>
            </div>

            {/* Tool */}
            <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>

                {/* Settings bar */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 12,
                    marginBottom: 20,
                    padding: 16,
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.07)",
                }}>
                    {/* Page size */}
                    <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                            Page Size
                        </label>
                        <select value={pageSize} onChange={e => setPageSize(e.target.value)} style={{
                            width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 8, padding: "7px 10px", color: "white", fontSize: 13, cursor: "pointer",
                        }}>
                            {PAGE_SIZES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                    </div>
                    {/* Orientation */}
                    <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                            Orientation
                        </label>
                        <select value={orientation} onChange={e => setOrientation(e.target.value as any)} style={{
                            width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 8, padding: "7px 10px", color: "white", fontSize: 13, cursor: "pointer",
                        }}>
                            <option value="portrait">Portrait</option>
                            <option value="landscape">Landscape</option>
                        </select>
                    </div>
                    {/* Font */}
                    <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                            Font
                        </label>
                        <select value={font} onChange={e => setFont(e.target.value)} style={{
                            width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 8, padding: "7px 10px", color: "white", fontSize: 13, cursor: "pointer",
                        }}>
                            {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                    {/* Font size */}
                    <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                            Font Size
                        </label>
                        <select value={fontSize} onChange={e => setFontSize(Number(e.target.value))} style={{
                            width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 8, padding: "7px 10px", color: "white", fontSize: 13, cursor: "pointer",
                        }}>
                            {FONT_SIZES.map(s => <option key={s} value={s}>{s}pt</option>)}
                        </select>
                    </div>
                    {/* File name */}
                    <div style={{ gridColumn: "span 1" }}>
                        <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                            File Name
                        </label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                value={fileName}
                                onChange={e => setFileName(e.target.value)}
                                placeholder="document"
                                style={{
                                    flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px 0 0 8px", padding: "7px 10px", color: "white", fontSize: 13, outline: "none",
                                }}
                            />
                            <span style={{
                                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                                borderLeft: "none", borderRadius: "0 8px 8px 0", padding: "7px 10px",
                                fontSize: 12, color: "rgba(255,255,255,0.4)",
                            }}>.pdf</span>
                        </div>
                    </div>
                </div>

                {/* Title input */}
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Document title (optional)"
                    style={{
                        width: "100%", boxSizing: "border-box",
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 18,
                        fontWeight: 700, outline: "none", marginBottom: 12,
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                />

                {/* Content textarea */}
                <div style={{ position: "relative" }}>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder={"Start typing your document content here...\n\nSeparate paragraphs with a blank line.\n\nYou can paste text from Word, Notion, Google Docs, or anywhere else."}
                        rows={20}
                        style={{
                            width: "100%", boxSizing: "border-box",
                            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 12, padding: "16px", color: "white", fontSize: 14,
                            lineHeight: 1.7, outline: "none", resize: "vertical", fontFamily: "inherit",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                    <div style={{
                        position: "absolute", bottom: 12, right: 14,
                        fontSize: 11, color: "rgba(255,255,255,0.25)", pointerEvents: "none",
                    }}>
                        {wordCount} words · {charCount} chars
                    </div>
                </div>

                {/* Download button */}
                <button
                    onClick={generate}
                    disabled={loading || (!content.trim() && !title.trim())}
                    style={{
                        marginTop: 16, width: "100%", padding: "16px",
                        background: loading || (!content.trim() && !title.trim())
                            ? "rgba(239,68,68,0.3)"
                            : "linear-gradient(135deg, #ef4444, #dc2626)",
                        border: "none", borderRadius: 12, color: "white",
                        fontSize: 16, fontWeight: 800, cursor: loading || (!content.trim() && !title.trim()) ? "not-allowed" : "pointer",
                        letterSpacing: "-0.01em", transition: "opacity 0.15s",
                    }}
                >
                    {loading ? "Generating PDF…" : "⬇ Download PDF"}
                </button>

                {/* Info cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 40 }}>
                    {[
                        { icon: "🔒", title: "100% Private", desc: "Everything happens in your browser. Your text never leaves your device." },
                        { icon: "🚫", title: "No Watermarks", desc: "Your PDF is clean — no ToolStack branding, no ads, no stamps." },
                        { icon: "⚡", title: "Instant Download", desc: "No waiting, no email, no account. Click and download in seconds." },
                        { icon: "📐", title: "Multiple Formats", desc: "A4, Letter, Legal, A3 — portrait or landscape. Whatever you need." },
                    ].map(card => (
                        <div key={card.title} style={{
                            padding: "20px", background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14,
                        }}>
                            <div style={{ fontSize: 22, marginBottom: 8 }}>{card.icon}</div>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{card.title}</p>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div style={{ marginTop: 56 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", marginBottom: 24, letterSpacing: "-0.02em" }}>
                        Frequently Asked Questions
                    </h2>
                    {[
                        {
                            q: "Is my text sent to any server?",
                            a: "No. The PDF is generated entirely in your browser using JavaScript. Nothing is uploaded or stored.",
                        },
                        {
                            q: "Can I use this for professional documents?",
                            a: "Yes. The output is a clean, properly formatted PDF with no watermarks. Use it for reports, letters, notes, or any text document.",
                        },
                        {
                            q: "How do I add multiple paragraphs?",
                            a: "Leave a blank line between paragraphs — the same way you would in any word processor. The generator preserves paragraph spacing automatically.",
                        },
                        {
                            q: "What fonts are available?",
                            a: "Helvetica (clean, modern), Times (classic serif), and Courier (monospaced, great for code or scripts). These are the standard PDF-embedded fonts.",
                        },
                        {
                            q: "Can I generate a multi-page PDF?",
                            a: "Yes. If your content exceeds one page, the generator automatically adds new pages and numbers each one.",
                        },
                    ].map(({ q, a }) => (
                        <div key={q} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{q}</p>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>{a}</p>
                        </div>
                    ))}
                </div>

                <AdvertiseGPTBanner />
                <MoreTools currentHref="/tools/pdf-generator" />
            </div>
        </div>
    );
}
