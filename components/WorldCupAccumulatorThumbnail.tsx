"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#22c55e";
const GOLD = "#fbbf24";

const SCENARIOS = [
    {
        legs: [
            { team: "🇧🇷", match: "Brazil ML", odds: 1.85 },
            { team: "🇫🇷", match: "France -1", odds: 2.10 },
            { team: "🇪🇸", match: "Spain ML", odds: 1.75 },
            { team: "🇦🇷", match: "Argentina BTTS", odds: 1.95 },
        ],
        stake: 50,
    },
    {
        legs: [
            { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", match: "England Win", odds: 2.40 },
            { team: "🇩🇪", match: "Germany Over 2.5", odds: 2.05 },
            { team: "🇵🇹", match: "Portugal Clean Sheet", odds: 3.20 },
        ],
        stake: 25,
    },
    {
        legs: [
            { team: "🇺🇸", match: "USA Advance", odds: 1.65 },
            { team: "🇲🇽", match: "Mexico GG", odds: 1.85 },
            { team: "🇳🇱", match: "Netherlands ML", odds: 1.55 },
            { team: "🇮🇹", match: "Italy Over 1.5", odds: 1.45 },
            { team: "🇧🇪", match: "Belgium DC", odds: 1.30 },
        ],
        stake: 100,
    },
];

export function WorldCupAccumulatorThumbnail() {
    const [idx, setIdx] = useState(0);
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setStage(s => (s + 1) % 4);
        }, 800);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setIdx(i => (i + 1) % SCENARIOS.length);
            setStage(0);
        }, 4500);
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
            background: "#06070d",
        }}>
            <img
                loading="lazy"
                src="/tools/world-cup-accumulator-calculator-preview.png"
                alt="World Cup Accumulator preview"
                style={{
                    width: "100%", height: 220,
                    objectFit: "cover", objectPosition: "top center",
                    display: "block",
                }}
            />

            {/* Gradient legibility overlay */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.92) 100%)",
                pointerEvents: "none",
            }} />

            {/* Stadium light sweep */}
            <motion.div
                animate={{ x: ["-50%", "150%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", inset: 0, width: "40%",
                    background: `linear-gradient(90deg, transparent, rgba(34,197,94,0.18), rgba(251,191,36,0.18), transparent)`,
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                    transform: "skewX(-15deg)",
                }}
            />

            {/* Floating gold sparkles */}
            {[0, 1, 2, 3, 4].map(i => (
                <motion.div key={i}
                    animate={{
                        y: [0, -20, -40],
                        opacity: [0, 1, 0],
                        scale: [0.6, 1.2, 0.6],
                        rotate: [0, 180],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        left: `${15 + i * 18}%`,
                        bottom: "30%",
                        fontSize: 12, color: GOLD,
                        textShadow: `0 0 10px ${GOLD}`,
                        pointerEvents: "none",
                    }}
                >
                    ✦
                </motion.div>
            ))}

            {/* Top — LIVE BET banner */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                    position: "absolute", top: 12, left: 12, right: 12,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    zIndex: 4,
                }}
            >
                <motion.span
                    animate={{
                        boxShadow: [
                            `0 0 8px ${ACCENT}`,
                            `0 0 18px ${ACCENT}`,
                            `0 0 8px ${ACCENT}`,
                        ]
                    }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 9, fontWeight: 900,
                        background: ACCENT,
                        color: "#06070d",
                        padding: "4px 10px", borderRadius: 99,
                        letterSpacing: "0.18em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    🏆 LIVE ACCA
                </motion.span>
                <motion.span
                    key={`s-${idx}`}
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    style={{
                        fontSize: 9, fontWeight: 900,
                        background: "rgba(0,0,0,0.78)",
                        backdropFilter: "blur(10px)",
                        color: "white",
                        padding: "4px 10px", borderRadius: 99,
                        border: `1px solid ${GOLD}`,
                        letterSpacing: "0.08em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    £{s.stake} stake
                </motion.span>
            </motion.div>

            {/* Middle — leg flags stacking */}
            <div style={{
                position: "absolute",
                top: "32%", left: 12, right: 12,
                display: "flex", flexDirection: "column", gap: 3,
                zIndex: 4,
            }}>
                <AnimatePresence>
                    {visibleLegs.slice(0, 3).map((leg, i) => (
                        <motion.div
                            key={`${idx}-${i}`}
                            initial={{ x: -30, opacity: 0, scale: 0.85 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ x: 30, opacity: 0 }}
                            transition={{
                                type: "spring", stiffness: 220, damping: 18,
                                delay: i * 0.12,
                            }}
                            style={{
                                background: "rgba(6,7,13,0.85)",
                                backdropFilter: "blur(8px)",
                                border: `1px solid rgba(34,197,94,0.4)`,
                                borderRadius: 6,
                                padding: "3px 8px",
                                display: "flex", alignItems: "center", gap: 6,
                                fontFamily: "Inter, sans-serif",
                                boxShadow: `0 4px 12px rgba(0,0,0,0.4)`,
                            }}
                        >
                            <span style={{ fontSize: 13 }}>{leg.team}</span>
                            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.85)", fontWeight: 700, flex: 1 }}>
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
                        transition={{ delay: 0.5 }}
                        style={{
                            fontSize: 8.5, fontWeight: 800, color: ACCENT,
                            textAlign: "center",
                            background: "rgba(6,7,13,0.7)",
                            padding: "2px 7px", borderRadius: 99,
                            alignSelf: "center",
                            border: "1px solid rgba(34,197,94,0.3)",
                            letterSpacing: "0.06em",
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        + {s.legs.length - 3} more legs
                    </motion.div>
                )}
            </div>

            {/* Bottom — payout panel */}
            <motion.div
                animate={{
                    y: showPayout ? 0 : 80,
                    opacity: showPayout ? 1 : 0,
                    boxShadow: showPayout ? [
                        `0 8px 24px rgba(34,197,94,0.4)`,
                        `0 8px 30px rgba(251,191,36,0.5)`,
                        `0 8px 24px rgba(34,197,94,0.4)`,
                    ] : `0 0 0px rgba(0,0,0,0)`,
                }}
                transition={{ duration: 0.4, boxShadow: { duration: 1.6, repeat: Infinity } }}
                style={{
                    position: "absolute", bottom: 12, left: 12, right: 12,
                    background: "rgba(6,7,13,0.95)",
                    backdropFilter: "blur(14px)",
                    border: `1.5px solid ${ACCENT}`,
                    borderRadius: 10,
                    padding: "9px 12px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    zIndex: 4,
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <div>
                    <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em" }}>COMBINED ODDS</div>
                    <motion.div
                        key={`c-${idx}`}
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 280 }}
                        style={{
                            fontSize: 16, fontWeight: 900, color: "white",
                            fontFamily: "ui-monospace, monospace",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        {combined.toFixed(2)}×
                    </motion.div>
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 7.5, color: GOLD, fontWeight: 900, letterSpacing: "0.18em" }}>POTENTIAL PAYOUT</div>
                    <motion.div
                        key={`p-${idx}`}
                        initial={{ scale: 0.7, y: 6 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }}
                        style={{
                            fontSize: 22, fontWeight: 900, color: GOLD,
                            letterSpacing: "-0.02em", lineHeight: 1,
                            textShadow: `0 0 14px rgba(251,191,36,0.55)`,
                        }}
                    >
                        £{payout.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </motion.div>
                </div>
            </motion.div>

            {/* Building indicator (when not showing payout) */}
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
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                y: [0, -3, 0],
                            }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                            style={{
                                width: 6, height: 6, borderRadius: "50%",
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
