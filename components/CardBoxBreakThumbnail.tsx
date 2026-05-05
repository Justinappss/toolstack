"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#f59e0b";

const SCENARIOS = [
    { boxCost: 280, spots: 16, breakeven: 22, sold: 13, fillRate: 81 },
    { boxCost: 540, spots: 30, breakeven: 24, sold: 28, fillRate: 93 },
    { boxCost: 180, spots: 12, breakeven: 19, sold: 6, fillRate: 50 },
    { boxCost: 720, spots: 24, breakeven: 38, sold: 22, fillRate: 92 },
];

export function CardBoxBreakThumbnail() {
    const [idx, setIdx] = useState(0);
    const s = SCENARIOS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SCENARIOS.length), 2700);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            position: "relative", overflow: "hidden",
            background: "#06070d",
        }}>
            <img
                src="/tools/card-box-break-calculator-preview.png"
                alt="Card Box Break preview"
                style={{
                    width: "100%", height: 220,
                    objectFit: "cover", objectPosition: "top center",
                    display: "block",
                }}
            />

            {/* Light sweep */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", inset: 0, width: "25%",
                    background: `linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)`,
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                }}
            />

            {/* Top — spot price label */}
            <motion.div
                key={`p-${idx}`}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                    position: "absolute", top: 12, left: 12,
                    fontSize: 9, fontWeight: 900,
                    background: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    padding: "4px 10px", borderRadius: 99,
                    border: `1px solid ${ACCENT}`,
                    letterSpacing: "0.06em",
                    fontFamily: "Inter, sans-serif",
                    zIndex: 4,
                }}
            >
                💰 ${s.breakeven}/spot to break even
            </motion.div>

            {/* Top right — fill rate gauge */}
            <motion.div
                key={`g-${idx}`}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280 }}
                style={{
                    position: "absolute", top: 12, right: 12,
                    width: 50, height: 50,
                    zIndex: 4,
                }}
            >
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx="50" cy="50" r="40" fill="rgba(0,0,0,0.7)" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="9" />
                    <motion.circle
                        cx="50" cy="50" r="40" fill="none"
                        stroke={ACCENT} strokeWidth="9"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - s.fillRate / 100) }}
                        transition={{ duration: 0.9 }}
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 4px ${ACCENT})` }}
                    />
                </svg>
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 900, color: ACCENT,
                    textShadow: `0 0 6px rgba(245,158,11,0.6)`,
                    fontFamily: "Inter, sans-serif",
                }}>
                    {s.fillRate}%
                </div>
            </motion.div>

            {/* Bottom — spots breakdown */}
            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.25 }}
                style={{
                    position: "absolute", bottom: 12, left: 12, right: 12,
                    background: "rgba(6,7,13,0.92)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 10,
                    padding: "9px 12px",
                    boxShadow: `0 8px 24px rgba(245,158,11,0.3)`,
                    zIndex: 4,
                    display: "flex", flexDirection: "column", gap: 5,
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 8, fontWeight: 900, color: ACCENT, letterSpacing: "0.16em", fontFamily: "Inter, sans-serif" }}>SPOTS SOLD</span>
                    <motion.span
                        key={`s-${idx}`}
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 280 }}
                        style={{
                            fontSize: 16, fontWeight: 900, color: ACCENT,
                            textShadow: `0 0 10px rgba(245,158,11,0.5)`,
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        {s.sold} <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>/ {s.spots}</span>
                    </motion.span>
                </div>
                <div style={{ height: 5, background: "rgba(245,158,11,0.15)", borderRadius: 99, overflow: "hidden" }}>
                    <motion.div
                        animate={{ width: `${(s.sold / s.spots) * 100}%` }}
                        transition={{ duration: 0.7 }}
                        style={{ height: "100%", background: `linear-gradient(90deg, ${ACCENT}, #facc15)`, boxShadow: `0 0 6px ${ACCENT}` }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
