"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#f97316";

const QUESTIONS = [
    { q: "What is 25% of 480?", pct: 25, of: 480, ans: 120 },
    { q: "What is 15% of 200?", pct: 15, of: 200, ans: 30 },
    { q: "What is 60% of 750?", pct: 60, of: 750, ans: 450 },
    { q: "What is 40% of 1250?", pct: 40, of: 1250, ans: 500 },
    { q: "What is 12% of 850?", pct: 12, of: 850, ans: 102 },
];

export function PercentageCalculatorThumbnail() {
    const [idx, setIdx] = useState(0);
    const q = QUESTIONS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % QUESTIONS.length), 2400);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a0d00 0%, #2a1500 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 10,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>PERCENTAGE</span>
                <div style={{ display: "flex", gap: 4 }}>
                    {["of", "Δ%", "+/-"].map((m, i) => (
                        <motion.div key={m}
                            animate={{
                                background: i === 0 ? `rgba(249,115,22,0.25)` : `rgba(249,115,22,0.06)`,
                                borderColor: i === 0 ? ACCENT : `rgba(249,115,22,0.18)`,
                            }}
                            style={{
                                fontSize: 9, fontWeight: 800,
                                color: i === 0 ? "white" : "rgba(255,255,255,0.5)",
                                padding: "2px 8px", borderRadius: 4,
                                border: `1px solid`,
                            }}
                        >
                            {m}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Question */}
            <motion.div
                key={`q-${idx}`}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                    fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)",
                    fontStyle: "italic",
                }}
            >
                {q.q}
            </motion.div>

            {/* Visual: radial gauge + answer */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 14 }}>
                {/* Radial */}
                <div style={{ position: "relative", width: 84, height: 84, flexShrink: 0 }}>
                    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(249,115,22,0.15)" strokeWidth="11" />
                        <motion.circle
                            cx="50" cy="50" r="42" fill="none"
                            stroke={ACCENT} strokeWidth="11"
                            strokeDasharray={`${2 * Math.PI * 42}`}
                            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - q.pct / 100) }}
                            transition={{ duration: 0.9, ease: "easeInOut" }}
                            strokeLinecap="round"
                            style={{ filter: `drop-shadow(0 0 6px ${ACCENT})` }}
                        />
                    </svg>
                    <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexDirection: "column",
                    }}>
                        <motion.span
                            key={`p-${idx}`}
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 280, damping: 14 }}
                            style={{
                                fontSize: 19, fontWeight: 900, color: ACCENT,
                                lineHeight: 1, textShadow: `0 0 10px rgba(249,115,22,0.5)`,
                            }}
                        >
                            {q.pct}%
                        </motion.span>
                    </div>
                </div>

                {/* Answer card */}
                <div style={{
                    flex: 1,
                    background: `rgba(249,115,22,0.18)`,
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 8,
                    padding: "10px 14px",
                    boxShadow: `0 0 16px rgba(249,115,22,0.25)`,
                }}>
                    <div style={{ fontSize: 8, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em", marginBottom: 3 }}>
                        ANSWER
                    </div>
                    <motion.div
                        key={`a-${idx}`}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.2 }}
                        style={{
                            fontSize: 32, fontWeight: 900, color: ACCENT,
                            lineHeight: 1, letterSpacing: "-0.02em",
                            textShadow: `0 0 14px rgba(249,115,22,0.5)`,
                        }}
                    >
                        {q.ans.toLocaleString()}
                    </motion.div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginTop: 3, fontWeight: 600 }}>
                        from {q.of.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Bottom — formula */}
            <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                    fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.04em", textAlign: "center",
                    fontFamily: "ui-monospace, monospace",
                }}
            >
                {q.of} × ({q.pct} / 100) = <span style={{ color: ACCENT }}>{q.ans}</span>
            </motion.div>
        </div>
    );
}
