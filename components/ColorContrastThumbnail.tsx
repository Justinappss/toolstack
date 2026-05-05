"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#e879f9";

const PAIRS = [
    { fg: "#0a0a0f", bg: "#ffffff", ratio: 19.4, aa: "PASS", aaa: "PASS" },
    { fg: "#7c3aed", bg: "#fef3c7", ratio: 7.2, aa: "PASS", aaa: "PASS" },
    { fg: "#94a3b8", bg: "#1e293b", ratio: 4.6, aa: "PASS", aaa: "FAIL" },
    { fg: "#f87171", bg: "#fef2f2", ratio: 2.8, aa: "FAIL", aaa: "FAIL" },
    { fg: "#22c55e", bg: "#0a0a0f", ratio: 9.8, aa: "PASS", aaa: "PASS" },
];

export function ColorContrastThumbnail() {
    const [idx, setIdx] = useState(0);
    const p = PAIRS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % PAIRS.length), 2200);
        return () => clearInterval(id);
    }, []);

    const passing = p.aa === "PASS" && p.aaa === "PASS";

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a062a 0%, #2a0a3a 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>WCAG CONTRAST</span>
                <motion.span
                    key={`r-${idx}`}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 14 }}
                    style={{
                        fontSize: 14, fontWeight: 900,
                        color: passing ? "#22c55e" : "#ef4444",
                        textShadow: `0 0 10px ${passing ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)"}`,
                    }}
                >
                    {p.ratio.toFixed(1)}:1
                </motion.span>
            </div>

            {/* Color preview swatches */}
            <motion.div
                key={`s-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, background: p.bg }}
                transition={{ duration: 0.5 }}
                style={{
                    flex: 1,
                    background: p.bg,
                    borderRadius: 8,
                    padding: "12px 14px",
                    display: "flex", flexDirection: "column", justifyContent: "center", gap: 6,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <motion.span
                    animate={{ color: p.fg }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontSize: 22, fontWeight: 900, letterSpacing: "-0.01em", lineHeight: 1.1,
                    }}
                >
                    Aa Build great UX
                </motion.span>
                <motion.span
                    animate={{ color: p.fg }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontSize: 11, fontWeight: 600, opacity: 0.85,
                    }}
                >
                    Smaller body copy at 12px regular weight
                </motion.span>
                {/* Hex labels */}
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                    <div style={{
                        fontSize: 8, fontWeight: 800,
                        background: "rgba(0,0,0,0.4)",
                        padding: "2px 6px", borderRadius: 3,
                        fontFamily: "ui-monospace, monospace",
                        color: "white",
                    }}>
                        FG {p.fg.toUpperCase()}
                    </div>
                    <div style={{
                        fontSize: 8, fontWeight: 800,
                        background: "rgba(0,0,0,0.4)",
                        padding: "2px 6px", borderRadius: 3,
                        fontFamily: "ui-monospace, monospace",
                        color: "white",
                    }}>
                        BG {p.bg.toUpperCase()}
                    </div>
                </div>
            </motion.div>

            {/* Bottom — pass/fail badges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {[
                    { level: "AA", req: "4.5:1", val: p.aa },
                    { level: "AAA", req: "7:1", val: p.aaa },
                ].map(b => (
                    <motion.div key={b.level}
                        animate={{
                            background: b.val === "PASS" ? "rgba(34,197,94,0.18)" : "rgba(239,68,68,0.18)",
                            borderColor: b.val === "PASS" ? "#22c55e" : "#ef4444",
                        }}
                        style={{
                            border: "1px solid",
                            borderRadius: 6,
                            padding: "5px 10px",
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                        }}
                    >
                        <div>
                            <div style={{ fontSize: 9, fontWeight: 900, color: "white", letterSpacing: "0.1em" }}>{b.level}</div>
                            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>need {b.req}</div>
                        </div>
                        <div style={{
                            fontSize: 11, fontWeight: 900,
                            color: b.val === "PASS" ? "#22c55e" : "#ef4444",
                            textShadow: `0 0 6px ${b.val === "PASS" ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)"}`,
                            letterSpacing: "0.1em",
                        }}>
                            {b.val === "PASS" ? "✓" : "✗"} {b.val}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
