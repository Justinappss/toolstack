"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#fbbf24";

const SCENARIOS = [
    { country: "🇺🇸 USA", bill: 84, tip: 20, people: 4 },
    { country: "🇬🇧 UK", bill: 62, tip: 12.5, people: 2 },
    { country: "🇮🇹 Italy", bill: 48, tip: 10, people: 3 },
    { country: "🇪🇸 Spain", bill: 38, tip: 10, people: 2 },
    { country: "🇫🇷 France", bill: 95, tip: 15, people: 5 },
];

export function TipCalculatorThumbnail() {
    const [idx, setIdx] = useState(0);
    const s = SCENARIOS[idx];
    const tipAmt = +(s.bill * s.tip / 100).toFixed(2);
    const total = +(s.bill + tipAmt).toFixed(2);
    const perPerson = +(total / s.people).toFixed(2);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SCENARIOS.length), 2700);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a1300 0%, #2a1d00 100%)",
            padding: "14px 16px",
            display: "flex", gap: 12,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Left — receipt style */}
            <div style={{
                flex: 1.1,
                background: "rgba(0,0,0,0.5)",
                border: `1px solid rgba(251,191,36,0.2)`,
                borderRadius: 8,
                padding: "10px 12px",
                display: "flex", flexDirection: "column", gap: 5,
                fontFamily: "ui-monospace, monospace",
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(251,191,36,0.2)", paddingBottom: 5 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: ACCENT, letterSpacing: "0.12em" }}>BILL</span>
                    <motion.span key={`b-${idx}`} initial={{ x: -4, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                        style={{ fontSize: 10, fontWeight: 700, color: "white" }}>
                        ${s.bill.toFixed(2)}
                    </motion.span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>Tip ({s.tip}%)</span>
                    <motion.span key={`t-${idx}`} initial={{ x: -4, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                        style={{ fontSize: 10, color: ACCENT, fontWeight: 800 }}>
                        +${tipAmt.toFixed(2)}
                    </motion.span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed rgba(251,191,36,0.2)", paddingTop: 5, marginTop: "auto" }}>
                    <span style={{ fontSize: 9, fontWeight: 900, color: "white" }}>TOTAL</span>
                    <motion.span key={`tt-${idx}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.2 }}
                        style={{
                            fontSize: 14, fontWeight: 900, color: ACCENT,
                            textShadow: `0 0 10px rgba(251,191,36,0.4)`,
                        }}>
                        ${total.toFixed(2)}
                    </motion.span>
                </div>
            </div>

            {/* Right — split between people */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 8.5, fontWeight: 900, color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em" }}>SPLIT</span>
                    <motion.span key={`c-${idx}`} initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                        style={{
                            fontSize: 9, fontWeight: 800, color: ACCENT,
                            background: "rgba(251,191,36,0.15)", padding: "3px 7px", borderRadius: 99,
                            border: `1px solid rgba(251,191,36,0.3)`,
                        }}>
                        {s.country}
                    </motion.span>
                </div>
                {/* People icons */}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {Array.from({ length: s.people }).map((_, i) => (
                        <motion.div
                            key={`${idx}-${i}`}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 280 }}
                            style={{
                                fontSize: 18, padding: "2px 4px",
                                background: `rgba(251,191,36,0.12)`,
                                border: `1px solid rgba(251,191,36,0.3)`,
                                borderRadius: 6,
                            }}
                        >
                            👤
                        </motion.div>
                    ))}
                </div>
                {/* Per-person */}
                <div style={{
                    flex: 1,
                    background: `rgba(251,191,36,0.18)`,
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 8,
                    padding: "8px 12px",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    boxShadow: `0 0 16px rgba(251,191,36,0.2)`,
                }}>
                    <span style={{ fontSize: 8, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>EACH</span>
                    <motion.div
                        key={`p-${idx}`}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.3 }}
                        style={{
                            fontSize: 22, fontWeight: 900, color: ACCENT,
                            lineHeight: 1, letterSpacing: "-0.02em",
                            textShadow: `0 0 12px rgba(251,191,36,0.5)`,
                        }}
                    >
                        ${perPerson.toFixed(2)}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
