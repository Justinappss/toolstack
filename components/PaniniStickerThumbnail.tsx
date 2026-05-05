"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#ef4444";

const ALBUMS = [
    { album: "World Cup 2026", total: 678, packs: 152, cost: 380 },
    { album: "Premier League 25", total: 540, packs: 124, cost: 310 },
    { album: "Champions League", total: 460, packs: 96, cost: 240 },
];

export function PaniniStickerThumbnail() {
    const [idx, setIdx] = useState(0);
    const [sticking, setSticking] = useState(0);
    const a = ALBUMS[idx];

    useEffect(() => {
        const id = setInterval(() => {
            setIdx(i => (i + 1) % ALBUMS.length);
        }, 3000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setSticking(s => (s + 1) % 5);
        }, 600);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            position: "relative", overflow: "hidden",
            background: "#06070d",
        }}>
            <img
                src="/tools/panini-sticker-calculator-preview.png"
                alt="Panini Sticker preview"
                style={{
                    width: "100%", height: 220,
                    objectFit: "cover", objectPosition: "top center",
                    display: "block",
                }}
            />

            {/* Floating sticker emojis */}
            {["⭐", "🏆", "⚽", "🎯"].map((emoji, i) => (
                <motion.div key={i}
                    animate={{
                        y: [0, -16, 0],
                        rotate: [-8, 8, -8],
                        opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        left: `${18 + i * 20}%`,
                        top: `${30 + (i % 2) * 25}%`,
                        fontSize: 18,
                        textShadow: `0 4px 8px rgba(0,0,0,0.6)`,
                        pointerEvents: "none",
                    }}
                >
                    {emoji}
                </motion.div>
            ))}

            {/* Top — album label */}
            <motion.div
                key={`a-${idx}`}
                initial={{ y: -10, opacity: 0 }}
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
                    background: "rgba(0,0,0,0.78)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    padding: "4px 9px", borderRadius: 99,
                    border: `1px solid ${ACCENT}`,
                    letterSpacing: "0.05em",
                    fontFamily: "Inter, sans-serif",
                }}>
                    📖 {a.album}
                </span>
                <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 9, fontWeight: 900,
                        background: `${ACCENT}`,
                        color: "white",
                        padding: "4px 10px", borderRadius: 99,
                        letterSpacing: "0.08em",
                        fontFamily: "Inter, sans-serif",
                        boxShadow: `0 0 12px rgba(239,68,68,0.6)`,
                    }}
                >
                    {a.total} STICKERS
                </motion.span>
            </motion.div>

            {/* Bottom — packs needed + cost */}
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
                    boxShadow: `0 8px 24px rgba(239,68,68,0.3)`,
                    zIndex: 4,
                }}
            >
                <div>
                    <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em", fontFamily: "Inter, sans-serif" }}>PACKS TO COMPLETE</div>
                    <motion.div
                        key={`pk-${idx}`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 280 }}
                        style={{
                            fontSize: 22, fontWeight: 900, color: ACCENT,
                            letterSpacing: "-0.02em", lineHeight: 1,
                            textShadow: `0 0 14px rgba(239,68,68,0.5)`,
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        {a.packs}
                    </motion.div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.55)", fontWeight: 900, letterSpacing: "0.18em", fontFamily: "Inter, sans-serif" }}>EST. COST</div>
                    <div style={{
                        fontSize: 16, fontWeight: 900, color: "white", marginTop: 1,
                        fontFamily: "Inter, sans-serif",
                    }}>
                        £{a.cost}
                    </div>
                </div>
                {/* Sticking indicator */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{
                        position: "absolute",
                        right: -2, top: -8,
                        width: 16, height: 16, borderRadius: "50%",
                        background: ACCENT,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 9, fontWeight: 900, color: "white",
                        boxShadow: `0 0 8px ${ACCENT}`,
                    }}
                >
                    {sticking + 1}
                </motion.div>
            </motion.div>
        </div>
    );
}
