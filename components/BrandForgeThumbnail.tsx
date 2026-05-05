"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#fb923c";

const NAMES = [
    { name: "Lumora", domain: "lumora.io", taken: false, score: 94 },
    { name: "Quiplo", domain: "quiplo.co", taken: false, score: 88 },
    { name: "Vinaro", domain: "vinaro.com", taken: true, score: 72 },
    { name: "Brixly", domain: "brixly.app", taken: false, score: 91 },
    { name: "Norven", domain: "norven.io", taken: false, score: 89 },
    { name: "Zaphir", domain: "zaphir.co", taken: false, score: 85 },
];

export function BrandForgeThumbnail() {
    const [visible, setVisible] = useState<typeof NAMES>([]);

    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            const next = NAMES[i % NAMES.length];
            setVisible(prev => {
                const newList = [next, ...prev].slice(0, 3);
                return newList;
            });
            i++;
        }, 1300);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a0d00 0%, #2a1500 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        style={{ fontSize: 12, color: ACCENT, filter: `drop-shadow(0 0 6px ${ACCENT})` }}
                    >
                        🔥
                    </motion.span>
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em" }}>BRAND FORGE AI</span>
                </div>
                <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 8.5, fontWeight: 800, color: ACCENT,
                        background: "rgba(251,146,60,0.15)",
                        padding: "3px 8px", borderRadius: 99,
                        border: `1px solid rgba(251,146,60,0.3)`,
                        letterSpacing: "0.1em",
                    }}
                >
                    ● GENERATING
                </motion.span>
            </div>

            {/* Prompt */}
            <div style={{
                background: "rgba(251,146,60,0.08)",
                border: `1px solid rgba(251,146,60,0.25)`,
                borderRadius: 6,
                padding: "6px 10px",
                fontSize: 10, color: "white", fontWeight: 600,
                fontStyle: "italic",
            }}>
                <span style={{ color: ACCENT, fontWeight: 800, fontStyle: "normal" }}>Vibe: </span>
                modern, premium, 5–7 letters, .com or .io available
            </div>

            {/* Name cards */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                <AnimatePresence mode="popLayout">
                    {visible.map((n, i) => (
                        <motion.div
                            key={`${n.name}-${i}`}
                            layout
                            initial={{ x: -20, opacity: 0, scale: 0.95 }}
                            animate={{ x: 0, opacity: 1 - i * 0.18, scale: 1 }}
                            exit={{ x: 20, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 220, damping: 22 }}
                            style={{
                                background: i === 0 ? `rgba(251,146,60,0.18)` : `rgba(0,0,0,0.4)`,
                                border: i === 0 ? `1px solid ${ACCENT}` : "1px solid rgba(251,146,60,0.15)",
                                borderRadius: 8,
                                padding: "8px 11px",
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                boxShadow: i === 0 ? `0 0 14px rgba(251,146,60,0.25)` : "none",
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <span style={{ fontSize: 14, fontWeight: 900, color: i === 0 ? ACCENT : "white", letterSpacing: "-0.01em", textShadow: i === 0 ? `0 0 8px rgba(251,146,60,0.4)` : "none" }}>
                                    {n.name}
                                </span>
                                <span style={{ fontSize: 8.5, color: "rgba(255,255,255,0.55)", fontFamily: "ui-monospace, monospace" }}>
                                    {n.domain}
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                {n.taken ? (
                                    <span style={{
                                        fontSize: 8, fontWeight: 900, color: "#ef4444",
                                        background: "rgba(239,68,68,0.15)",
                                        padding: "2px 7px", borderRadius: 4,
                                        border: "1px solid rgba(239,68,68,0.3)",
                                        letterSpacing: "0.1em",
                                    }}>
                                        TAKEN
                                    </span>
                                ) : (
                                    <span style={{
                                        fontSize: 8, fontWeight: 900, color: "#22c55e",
                                        background: "rgba(34,197,94,0.15)",
                                        padding: "2px 7px", borderRadius: 4,
                                        border: "1px solid rgba(34,197,94,0.3)",
                                        letterSpacing: "0.1em",
                                    }}>
                                        ✓ FREE
                                    </span>
                                )}
                                <span style={{
                                    fontSize: 11, fontWeight: 900, color: ACCENT,
                                    fontVariantNumeric: "tabular-nums",
                                }}>
                                    {n.score}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
