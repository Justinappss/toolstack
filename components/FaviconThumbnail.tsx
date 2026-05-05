"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#10b981";

const ICONS = [
    { letter: "T", bg: "linear-gradient(135deg, #818cf8, #6366f1)" },
    { letter: "S", bg: "linear-gradient(135deg, #f472b6, #ec4899)" },
    { letter: "Q", bg: "linear-gradient(135deg, #22d3ee, #06b6d4)" },
    { letter: "★", bg: "linear-gradient(135deg, #fbbf24, #f59e0b)" },
    { letter: "✦", bg: "linear-gradient(135deg, #34d399, #10b981)" },
];

const SIZES = [16, 32, 48, 64, 128];

export function FaviconThumbnail() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % ICONS.length), 2200);
        return () => clearInterval(id);
    }, []);

    const icon = ICONS[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #051410 0%, #0a2018 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>FAVICON</span>
                <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 9, fontWeight: 900, color: ACCENT,
                        background: "rgba(16,185,129,0.15)",
                        padding: "3px 8px", borderRadius: 99,
                        border: `1px solid rgba(16,185,129,0.3)`,
                        letterSpacing: "0.1em",
                    }}
                >
                    ● 5 SIZES
                </motion.span>
            </div>

            {/* Source icon */}
            <div style={{
                background: "rgba(0,0,0,0.5)",
                border: `1px solid rgba(16,185,129,0.2)`,
                borderRadius: 8,
                padding: "10px 12px",
                display: "flex", alignItems: "center", gap: 12,
            }}>
                <motion.div
                    key={`m-${idx}`}
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    style={{
                        width: 64, height: 64,
                        borderRadius: 14,
                        background: icon.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 38, fontWeight: 900, color: "white",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                    }}
                >
                    {icon.letter}
                </motion.div>
                <div>
                    <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.16em" }}>SOURCE</div>
                    <div style={{ fontSize: 12, color: "white", fontWeight: 800 }}>512 × 512 PNG</div>
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: 9, color: ACCENT, fontWeight: 700, marginTop: 2, letterSpacing: "0.06em" }}
                    >
                        ↓ generating sizes
                    </motion.div>
                </div>
            </div>

            {/* Generated sizes row */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(16,185,129,0.15)",
                borderRadius: 8,
                padding: "8px 10px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                {SIZES.map((sz, i) => (
                    <motion.div
                        key={`${idx}-${sz}`}
                        initial={{ y: 10, opacity: 0, scale: 0.6 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18, delay: i * 0.12 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
                    >
                        <div style={{
                            width: Math.max(14, sz * 0.32), height: Math.max(14, sz * 0.32),
                            borderRadius: Math.max(2, sz * 0.06),
                            background: icon.bg,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: Math.max(8, sz * 0.18), fontWeight: 900, color: "white",
                            boxShadow: `0 0 8px rgba(0,0,0,0.4)`,
                        }}>
                            {icon.letter}
                        </div>
                        <span style={{ fontSize: 7.5, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", fontFamily: "ui-monospace, monospace" }}>
                            {sz}px
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
