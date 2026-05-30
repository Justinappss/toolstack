"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#22c55e";
const UCL = "#60a5fa";
const GOLD = "#fbbf24";

const SCENARIOS = [
    {
        legs: [
            { flag: "🇫🇷", match: "PSG Win", odds: 2.20 },
            { flag: "⚽", match: "BTTS Yes", odds: 1.75 },
            { flag: "🥅", match: "Over 2.5 Goals", odds: 1.90 },
        ],
        stake: 20,
    },
    {
        legs: [
            { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", match: "Arsenal Win", odds: 3.10 },
            { flag: "⚽", match: "Saka Anytime", odds: 3.50 },
            { flag: "🎯", match: "Over 1.5 Goals", odds: 1.35 },
            { flag: "✅", match: "Draw No Bet PSG", odds: 1.65 },
        ],
        stake: 10,
    },
    {
        legs: [
            { flag: "🤝", match: "Draw at HT", odds: 2.80 },
            { flag: "⚽", match: "BTTS Yes", odds: 1.75 },
            { flag: "🏆", match: "PSG Lift Trophy", odds: 2.20 },
        ],
        stake: 50,
    },
];

export function UCLFinalAccumulatorThumbnail() {
    const [idx, setIdx] = useState(0);
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setStage(s => (s + 1) % 4);
        }, 900);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setIdx(i => (i + 1) % SCENARIOS.length);
            setStage(0);
        }, 4800);
        return () => clearInterval(id);
    }, []);

    const s = SCENARIOS[idx];
    const combined = s.legs.reduce((p, l) => p * l.odds, 1);
    const payout = combined * s.stake;
    const visibleLegs = stage >= 1 ? s.legs : [];
    const showPayout = stage >= 2;

    return (
        <div style={{
            width: "100%", height: 220,
            position: "relative", overflow: "hidden",
            background: "linear-gradient(145deg, #04060e 0%, #080d1a 50%, #04060e 100%)",
        }}>
            {/* UCL star field background */}
            {[...Array(12)].map((_, i) => (
                <motion.div key={i}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
                    style={{
                        position: "absolute",
                        left: `${8 + i * 8}%`,
                        top: `${10 + (i % 4) * 20}%`,
                        width: 2, height: 2,
                        borderRadius: "50%",
                        background: i % 3 === 0 ? GOLD : "white",
                        pointerEvents: "none",
                    }}
                />
            ))}

            {/* Sweeping UCL glow */}
            <motion.div
                animate={{ x: ["-60%", "160%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", inset: 0, width: "35%",
                    background: `linear-gradient(90deg, transparent, rgba(96,165,250,0.14), rgba(34,197,94,0.12), transparent)`,
                    pointerEvents: "none",
                    transform: "skewX(-12deg)",
                }}
            />

            {/* Top bar — LIVE badge + stake */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                    position: "absolute", top: 10, left: 10, right: 10,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    zIndex: 4,
                }}
            >
                <motion.span
                    animate={{
                        boxShadow: [
                            `0 0 8px ${ACCENT}`,
                            `0 0 20px ${ACCENT}`,
                            `0 0 8px ${ACCENT}`,
                        ]
                    }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{
                        fontSize: 8.5, fontWeight: 900,
                        background: ACCENT,
                        color: "#04060e",
                        padding: "3px 9px", borderRadius: 99,
                        letterSpacing: "0.16em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    ⭐ UCL FINAL ACCA
                </motion.span>
                <motion.span
                    key={`s-${idx}`}
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    style={{
                        fontSize: 8.5, fontWeight: 900,
                        background: "rgba(0,0,0,0.8)",
                        backdropFilter: "blur(10px)",
                        color: "white",
                        padding: "3px 9px", borderRadius: 99,
                        border: `1px solid rgba(96,165,250,0.5)`,
                        letterSpacing: "0.06em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    £{s.stake} stake
                </motion.span>
            </motion.div>

            {/* Match label */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                    position: "absolute", top: 34, left: 10, right: 10,
                    fontSize: 9.5, fontWeight: 800,
                    color: UCL,
                    letterSpacing: "0.1em",
                    fontFamily: "Inter, sans-serif",
                    zIndex: 4,
                    textAlign: "center",
                    textTransform: "uppercase",
                }}
            >
                PSG vs Arsenal · Budapest
            </motion.div>

            {/* Legs */}
            <div style={{
                position: "absolute",
                top: "30%", left: 10, right: 10,
                display: "flex", flexDirection: "column", gap: 3,
                zIndex: 4,
            }}>
                <AnimatePresence>
                    {visibleLegs.slice(0, 3).map((leg, i) => (
                        <motion.div
                            key={`${idx}-${i}`}
                            initial={{ x: -28, opacity: 0, scale: 0.88 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ x: 28, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 230, damping: 18, delay: i * 0.1 }}
                            style={{
                                background: "rgba(4,6,14,0.88)",
                                backdropFilter: "blur(8px)",
                                border: `1px solid rgba(96,165,250,0.35)`,
                                borderRadius: 6,
                                padding: "3px 8px",
                                display: "flex", alignItems: "center", gap: 6,
                                fontFamily: "Inter, sans-serif",
                            }}
                        >
                            <span style={{ fontSize: 12 }}>{leg.flag}</span>
                            <span style={{ fontSize: 8.5, color: "rgba(255,255,255,0.85)", fontWeight: 700, flex: 1 }}>
                                {leg.match}
                            </span>
                            <span style={{
                                fontSize: 11, fontWeight: 900, color: ACCENT,
                                fontFamily: "ui-monospace, monospace",
                                textShadow: `0 0 6px rgba(34,197,94,0.4)`,
                            }}>
                                {leg.odds.toFixed(2)}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {s.legs.length > 3 && stage >= 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        style={{
                            fontSize: 8, fontWeight: 800, color: UCL,
                            textAlign: "center",
                            background: "rgba(4,6,14,0.7)",
                            padding: "2px 7px", borderRadius: 99,
                            alignSelf: "center",
                            border: "1px solid rgba(96,165,250,0.3)",
                            letterSpacing: "0.06em",
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        + {s.legs.length - 3} more legs
                    </motion.div>
                )}
            </div>

            {/* Payout panel */}
            <motion.div
                animate={{
                    y: showPayout ? 0 : 80,
                    opacity: showPayout ? 1 : 0,
                    boxShadow: showPayout ? [
                        `0 8px 24px rgba(34,197,94,0.35)`,
                        `0 8px 32px rgba(251,191,36,0.45)`,
                        `0 8px 24px rgba(34,197,94,0.35)`,
                    ] : `0 0 0px rgba(0,0,0,0)`,
                }}
                transition={{ duration: 0.4, boxShadow: { duration: 1.8, repeat: Infinity } }}
                style={{
                    position: "absolute", bottom: 10, left: 10, right: 10,
                    background: "rgba(4,6,14,0.96)",
                    backdropFilter: "blur(14px)",
                    border: `1.5px solid ${ACCENT}`,
                    borderRadius: 10,
                    padding: "8px 12px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    zIndex: 4,
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <div>
                    <div style={{ fontSize: 7, color: UCL, fontWeight: 900, letterSpacing: "0.16em" }}>COMBINED ODDS</div>
                    <motion.div
                        key={`c-${idx}`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 280 }}
                        style={{
                            fontSize: 15, fontWeight: 900, color: "white",
                            fontFamily: "ui-monospace, monospace",
                        }}
                    >
                        {combined.toFixed(2)}×
                    </motion.div>
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 7, color: GOLD, fontWeight: 900, letterSpacing: "0.16em" }}>POTENTIAL PAYOUT</div>
                    <motion.div
                        key={`p-${idx}`}
                        initial={{ scale: 0.7, y: 5 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.12 }}
                        style={{
                            fontSize: 20, fontWeight: 900, color: GOLD,
                            letterSpacing: "-0.02em", lineHeight: 1,
                            textShadow: `0 0 12px rgba(251,191,36,0.5)`,
                        }}
                    >
                        £{payout.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </motion.div>
                </div>
            </motion.div>

            {/* Building dots */}
            {!showPayout && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        position: "absolute", bottom: 18, left: 0, right: 0,
                        display: "flex", justifyContent: "center", gap: 4,
                        zIndex: 4,
                    }}
                >
                    {[0, 1, 2].map(i => (
                        <motion.div key={i}
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                            style={{
                                width: 5, height: 5, borderRadius: "50%",
                                background: ACCENT,
                                boxShadow: `0 0 8px ${ACCENT}`,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
}
