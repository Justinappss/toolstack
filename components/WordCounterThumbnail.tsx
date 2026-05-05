"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#34d399";

const PARAS = [
    "Building a SaaS in public has been the most rewarding decision I've made. The transparency creates accountability, and the community feedback shapes every feature.",
    "Marketing without a budget is a creativity exercise. You learn that distribution is harder than product, and that the best growth channels are the ones nobody else is using.",
    "Every tool I built came from a frustration. Format JSON without ads. Generate passwords without sign-ups. Calculate margins without subscriptions.",
];

export function WordCounterThumbnail() {
    const [paraIdx, setParaIdx] = useState(0);
    const [typed, setTyped] = useState("");
    const wordCount = typed.trim().split(/\s+/).filter(Boolean).length;
    const charCount = typed.length;
    const readability = Math.min(100, Math.max(20, 92 - wordCount * 0.4));

    useEffect(() => {
        const text = PARAS[paraIdx];
        let i = 0;
        const id = setInterval(() => {
            i += 2;
            setTyped(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(id);
                setTimeout(() => {
                    setTyped("");
                    setParaIdx(p => (p + 1) % PARAS.length);
                }, 1400);
            }
        }, 22);
        return () => clearInterval(id);
    }, [paraIdx]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #061613 0%, #0a2620 100%)",
            padding: "14px 16px",
            display: "flex", gap: 12,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Left — typing area */}
            <div style={{ flex: 1.4, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
                    />
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>WRITING</span>
                </div>
                <div style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.4)",
                    border: `1px solid rgba(52,211,153,0.2)`,
                    borderRadius: 8,
                    padding: "9px 11px",
                    fontSize: 10, lineHeight: 1.5,
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 500,
                    overflow: "hidden",
                }}>
                    {typed}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        style={{ color: ACCENT, marginLeft: 1 }}
                    >
                        |
                    </motion.span>
                </div>
            </div>

            {/* Right — stats */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{
                    background: "rgba(52,211,153,0.1)",
                    border: `1px solid rgba(52,211,153,0.3)`,
                    borderRadius: 8,
                    padding: "8px 10px",
                    textAlign: "center",
                }}>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.55)", fontWeight: 800, letterSpacing: "0.16em", marginBottom: 1 }}>WORDS</div>
                    <motion.div
                        key={wordCount}
                        initial={{ y: -4, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            fontSize: 28, fontWeight: 900, color: ACCENT,
                            lineHeight: 1, letterSpacing: "-0.02em",
                            textShadow: `0 0 14px rgba(52,211,153,0.5)`,
                        }}
                    >
                        {wordCount}
                    </motion.div>
                </div>
                <div style={{
                    background: "rgba(0,0,0,0.4)",
                    borderRadius: 6,
                    padding: "5px 8px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    <span style={{ fontSize: 8, color: "rgba(255,255,255,0.55)", fontWeight: 800, letterSpacing: "0.1em" }}>CHARS</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "white" }}>{charCount}</span>
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ fontSize: 8, color: "rgba(255,255,255,0.55)", fontWeight: 800, letterSpacing: "0.1em" }}>READABILITY</span>
                        <span style={{ fontSize: 9, fontWeight: 900, color: ACCENT }}>{readability.toFixed(0)}</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(52,211,153,0.15)", borderRadius: 99, overflow: "hidden" }}>
                        <motion.div
                            animate={{ width: `${readability}%` }}
                            transition={{ duration: 0.4 }}
                            style={{ height: "100%", background: `linear-gradient(90deg, #fbbf24, ${ACCENT})`, boxShadow: `0 0 6px ${ACCENT}` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
