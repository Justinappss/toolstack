"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#a855f7";

const SCENARIOS = [
    { product: "2025 Topps Chrome", ev: 4.82, packs: 24, hit: "Auto" },
    { product: "Pokémon 151 ETB", ev: 7.14, packs: 10, hit: "Hyper Rare" },
    { product: "Panini Prizm '25", ev: 3.96, packs: 12, hit: "Silver" },
    { product: "Pokémon Surging", ev: 5.40, packs: 36, hit: "Special Art" },
];

export function PackBreakEvThumbnail() {
    const [idx, setIdx] = useState(0);
    const s = SCENARIOS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SCENARIOS.length), 2800);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            position: "relative", overflow: "hidden",
            background: "#06070d",
        }}>
            {/* Original thumbnail image */}
            <img
                loading="lazy"
                src="/tools/pack-break-ev-calculator-preview.png"
                alt="Pack Break EV preview"
                style={{
                    width: "100%", height: 220,
                    objectFit: "cover", objectPosition: "top center",
                    display: "block",
                }}
            />

            {/* Light sweep */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", inset: 0, width: "30%",
                    background: `linear-gradient(90deg, transparent, rgba(168,85,247,0.18), transparent)`,
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                }}
            />

            {/* Floating sparkles */}
            {[0, 1, 2, 3].map(i => (
                <motion.div key={i}
                    animate={{
                        y: [0, -14, 0],
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        left: `${15 + i * 22}%`,
                        top: `${25 + (i % 2) * 35}%`,
                        fontSize: 14, color: ACCENT,
                        textShadow: `0 0 8px ${ACCENT}`,
                        pointerEvents: "none",
                    }}
                >
                    ✦
                </motion.div>
            ))}

            {/* Top — product label */}
            <motion.div
                key={`p-${idx}`}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                    position: "absolute", top: 12, left: 12, right: 12,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    zIndex: 4,
                }}
            >
                <span style={{
                    fontSize: 9, fontWeight: 900,
                    background: "rgba(0,0,0,0.7)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    padding: "4px 9px", borderRadius: 99,
                    border: `1px solid rgba(168,85,247,0.5)`,
                    letterSpacing: "0.05em",
                    fontFamily: "Inter, sans-serif",
                }}>
                    {s.product}
                </span>
                <motion.span
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 8.5, fontWeight: 900,
                        background: `rgba(168,85,247,0.85)`,
                        color: "white",
                        padding: "4px 9px", borderRadius: 99,
                        letterSpacing: "0.1em",
                        fontFamily: "Inter, sans-serif",
                        boxShadow: `0 0 12px rgba(168,85,247,0.5)`,
                    }}
                >
                    🎯 HIT: {s.hit}
                </motion.span>
            </motion.div>

            {/* Bottom — EV result panel */}
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
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    boxShadow: `0 8px 24px rgba(168,85,247,0.3)`,
                    zIndex: 4,
                }}
            >
                <div>
                    <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em", fontFamily: "Inter, sans-serif" }}>EV / PACK</div>
                    <motion.div
                        key={`v-${idx}`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 280 }}
                        style={{
                            fontSize: 22, fontWeight: 900, color: ACCENT,
                            letterSpacing: "-0.02em", lineHeight: 1,
                            textShadow: `0 0 14px rgba(168,85,247,0.5)`,
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        ${s.ev.toFixed(2)}
                    </motion.div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.55)", fontWeight: 900, letterSpacing: "0.18em", fontFamily: "Inter, sans-serif" }}>{s.packs} PACKS</div>
                    <div style={{
                        fontSize: 14, fontWeight: 900, color: "white", marginTop: 1,
                        fontFamily: "Inter, sans-serif",
                    }}>
                        ${(s.ev * s.packs).toFixed(0)} total
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
