"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#34d399";

const SAMPLES = [
    {
        md: `# Build in Public

Ship **fast**, learn _faster_.

- Stay scrappy
- Listen to users
- [Visit toolstack](https://toolstack.tech)`,
        html: [
            { tag: "h1", content: "Build in Public" },
            { tag: "p", content: ["Ship ", { bold: true, text: "fast" }, ", learn ", { italic: true, text: "faster" }, "."] },
            { tag: "ul", items: ["Stay scrappy", "Listen to users", { link: true, text: "Visit toolstack" }] },
        ],
    },
    {
        md: `## What I learned

> Distribution > product

1. Build in 30 days
2. Ship every Friday
3. Talk to **20 users**`,
        html: [
            { tag: "h2", content: "What I learned" },
            { tag: "blockquote", content: "Distribution > product" },
            { tag: "ol", items: ["Build in 30 days", "Ship every Friday", ["Talk to ", { bold: true, text: "20 users" }]] },
        ],
    },
];

export function MarkdownEditorThumbnail() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SAMPLES.length), 3500);
        return () => clearInterval(id);
    }, []);

    const s = SAMPLES[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #061613 0%, #0a2620 100%)",
            display: "flex", flexDirection: "column",
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top bar */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 14px",
                borderBottom: `1px solid rgba(52,211,153,0.15)`,
            }}>
                <div style={{ display: "flex", gap: 5 }}>
                    {["#ef4444", "#f59e0b", ACCENT].map(c => (
                        <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                    ))}
                </div>
                <span style={{ fontSize: 8.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>MARKDOWN ↔ HTML</span>
            </div>

            {/* Split view */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(52,211,153,0.15)" }}>
                {/* MD source */}
                <motion.div
                    key={`md-${idx}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                        background: "rgba(0,0,0,0.55)",
                        padding: "10px 12px",
                        fontSize: 9, lineHeight: 1.5,
                        fontFamily: "ui-monospace, monospace",
                        color: "rgba(255,255,255,0.85)",
                        whiteSpace: "pre-wrap",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em", marginBottom: 5 }}>SOURCE</div>
                    {s.md.split("\n").map((line, i) => {
                        let display = line;
                        const colors: { from: string; color: string }[] = [];
                        if (line.startsWith("#")) colors.push({ from: line, color: "#a78bfa" });
                        if (line.startsWith(">")) colors.push({ from: line, color: "#fbbf24" });
                        return (
                            <div key={i} style={{
                                color: line.startsWith("#") ? "#a78bfa" : line.startsWith(">") ? "#fbbf24" : line.match(/^[-*\d]/) ? "#22d3ee" : "rgba(255,255,255,0.85)",
                                fontWeight: line.startsWith("#") ? 800 : 500,
                            }}>
                                {display || " "}
                            </div>
                        );
                    })}
                </motion.div>

                {/* HTML preview */}
                <motion.div
                    key={`hp-${idx}`}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                        background: "rgba(255,255,255,0.97)",
                        padding: "10px 12px",
                        fontSize: 9, lineHeight: 1.45,
                        color: "#1a1a1a",
                        overflow: "hidden",
                    }}
                >
                    <div style={{ fontSize: 7.5, color: "#10b981", fontWeight: 900, letterSpacing: "0.18em", marginBottom: 5 }}>PREVIEW</div>
                    {idx === 0 && (
                        <>
                            <div style={{ fontSize: 13, fontWeight: 800, color: "#0a0a0a", marginBottom: 4 }}>Build in Public</div>
                            <div style={{ fontSize: 9, color: "#333", marginBottom: 4 }}>
                                Ship <b>fast</b>, learn <i>faster</i>.
                            </div>
                            <ul style={{ margin: 0, paddingLeft: 14, fontSize: 9, color: "#333" }}>
                                <li>Stay scrappy</li>
                                <li>Listen to users</li>
                                <li><span style={{ color: "#10b981", textDecoration: "underline" }}>Visit toolstack</span></li>
                            </ul>
                        </>
                    )}
                    {idx === 1 && (
                        <>
                            <div style={{ fontSize: 11, fontWeight: 800, color: "#0a0a0a", marginBottom: 4 }}>What I learned</div>
                            <div style={{
                                borderLeft: "2px solid #10b981",
                                paddingLeft: 6,
                                fontStyle: "italic",
                                fontSize: 9, color: "#333",
                                marginBottom: 4,
                            }}>
                                Distribution &gt; product
                            </div>
                            <ol style={{ margin: 0, paddingLeft: 14, fontSize: 9, color: "#333" }}>
                                <li>Build in 30 days</li>
                                <li>Ship every Friday</li>
                                <li>Talk to <b>20 users</b></li>
                            </ol>
                        </>
                    )}
                </motion.div>
            </div>

            {/* Bottom — sync indicator */}
            <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                    padding: "5px 14px",
                    fontSize: 8.5, fontWeight: 800,
                    color: ACCENT, letterSpacing: "0.12em",
                    borderTop: `1px solid rgba(52,211,153,0.15)`,
                    display: "flex", justifyContent: "space-between",
                }}
            >
                <span>● LIVE PREVIEW</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>{s.md.split("\n").length} lines · 0ms</span>
            </motion.div>
        </div>
    );
}
