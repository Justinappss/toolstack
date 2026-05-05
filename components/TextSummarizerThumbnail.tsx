"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#34d399";

const SAMPLES = [
    {
        long: "The board met for three hours on Tuesday to discuss Q3 performance. Revenue grew 18% year-over-year, driven primarily by new enterprise contracts in EMEA. However, churn ticked up to 6.2%, raising concerns about retention. The team approved a $1.2M budget increase for customer success.",
        bullets: [
            "Revenue +18% YoY (EMEA enterprise driving growth)",
            "Churn rose to 6.2% — retention concern",
            "$1.2M approved for customer success expansion",
        ],
    },
    {
        long: "Building tools for the open web is the most rewarding work I've done. The community feedback shapes every feature, distribution is harder than building, and the best growth channels are the ones nobody else is using. The internet got too greedy with simple utilities — I'm betting people still want things that just work.",
        bullets: [
            "Community feedback shapes every feature shipped",
            "Distribution is harder than building",
            "Best growth channels are underused",
            "Bet: people want simple tools that just work",
        ],
    },
];

type Phase = "input" | "summarize" | "output";

export function TextSummarizerThumbnail() {
    const [idx, setIdx] = useState(0);
    const [phase, setPhase] = useState<Phase>("input");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("summarize"), 1200);
        const t2 = setTimeout(() => setPhase("output"), 2000);
        const t3 = setTimeout(() => {
            setPhase("input");
            setIdx(i => (i + 1) % SAMPLES.length);
        }, 3800);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [idx]);

    const s = SAMPLES[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #061613 0%, #0a2620 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>SUMMARIZE</span>
                <motion.div
                    key={phase}
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        fontSize: 9, fontWeight: 800, color: ACCENT,
                        background: "rgba(52,211,153,0.15)",
                        padding: "3px 8px", borderRadius: 99,
                        border: `1px solid rgba(52,211,153,0.3)`,
                        letterSpacing: "0.1em",
                    }}
                >
                    {phase === "input" ? "READING" : phase === "summarize" ? "● PROCESSING" : "✓ BULLETS"}
                </motion.div>
            </div>

            {/* Long input — fades during summarize */}
            <motion.div
                animate={{
                    opacity: phase === "input" ? 1 : phase === "summarize" ? 0.4 : 0.15,
                    height: phase === "output" ? 36 : "auto",
                }}
                transition={{ duration: 0.6 }}
                style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    padding: "8px 11px",
                    fontSize: 9.5, lineHeight: 1.45,
                    color: "rgba(255,255,255,0.7)",
                    overflow: "hidden",
                    flexShrink: 0,
                }}
            >
                {s.long}
            </motion.div>

            {/* Arrow + processing */}
            <AnimatePresence>
                {phase === "summarize" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                            position: "absolute", left: 0, right: 0, top: "45%",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                            zIndex: 5,
                        }}
                    >
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            style={{ fontSize: 18, color: ACCENT }}>⟳</motion.span>
                        <span style={{
                            fontSize: 11, fontWeight: 900, color: ACCENT,
                            letterSpacing: "0.14em",
                            background: "rgba(6,22,19,0.9)",
                            padding: "5px 12px", borderRadius: 99,
                            border: `1px solid ${ACCENT}`,
                            boxShadow: `0 0 16px rgba(52,211,153,0.4)`,
                        }}>
                            CONDENSING
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bullets — appears in output */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, justifyContent: "flex-end" }}>
                {phase === "output" && s.bullets.map((b, i) => (
                    <motion.div
                        key={`${idx}-${i}`}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.12 }}
                        style={{
                            background: `rgba(52,211,153,0.12)`,
                            border: `1px solid rgba(52,211,153,0.3)`,
                            borderRadius: 6,
                            padding: "5px 10px",
                            fontSize: 10, color: "white", fontWeight: 600,
                            display: "flex", alignItems: "flex-start", gap: 6,
                        }}
                    >
                        <span style={{ color: ACCENT, fontWeight: 900 }}>▸</span>
                        <span style={{ flex: 1 }}>{b}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
