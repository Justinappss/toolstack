"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#34d399";

const TITLES = [
    { text: "How I Got 6,100 Reddit Views in 24 Hours (As a Solo Founder)", style: "STORY", score: 89 },
    { text: "10 Free Tools That Replaced My $200/Month SaaS Stack", style: "LISTICLE", score: 94 },
    { text: "Why Sign-up Walls Are Killing the Modern Internet", style: "OPINION", score: 81 },
    { text: "The Anti-Friction Framework: Build Tools People Actually Use", style: "HOW-TO", score: 86 },
    { text: "I Built 57 Free Tools in 90 Days. Here's What I Learned", style: "STORY", score: 92 },
];

export function BlogTitleThumbnail() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % TITLES.length), 2400);
        return () => clearInterval(id);
    }, []);

    const t = TITLES[idx];

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
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        style={{ fontSize: 11, color: ACCENT }}
                    >
                        ✦
                    </motion.span>
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>BLOG TITLES</span>
                </div>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>
                    {idx + 1}<span style={{ color: "rgba(255,255,255,0.3)" }}>/{TITLES.length}</span>
                </span>
            </div>

            {/* Stacked title cards (current on top) */}
            <div style={{ flex: 1, position: "relative" }}>
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={idx}
                        initial={{ y: 28, opacity: 0, rotate: -3 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -28, opacity: 0, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 200, damping: 22 }}
                        style={{
                            position: "absolute", inset: 0,
                            background: `rgba(52,211,153,0.1)`,
                            border: `1px solid rgba(52,211,153,0.4)`,
                            borderRadius: 10,
                            padding: "12px 14px",
                            display: "flex", flexDirection: "column", justifyContent: "space-between",
                            boxShadow: `0 0 18px rgba(52,211,153,0.2), 0 4px 12px rgba(0,0,0,0.3)`,
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{
                                fontSize: 8.5, fontWeight: 900, color: ACCENT,
                                background: `rgba(52,211,153,0.18)`,
                                padding: "3px 8px", borderRadius: 99,
                                border: `1px solid rgba(52,211,153,0.3)`,
                                letterSpacing: "0.12em",
                            }}>
                                {t.style}
                            </span>
                            <span style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                                <motion.span
                                    initial={{ scale: 0.7 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 280 }}
                                    style={{
                                        fontSize: 16, fontWeight: 900, color: "#22c55e",
                                        textShadow: `0 0 8px rgba(34,197,94,0.4)`,
                                    }}
                                >
                                    {t.score}
                                </motion.span>
                                <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>/100</span>
                            </span>
                        </div>
                        <div style={{
                            fontSize: 13, fontWeight: 800, color: "white",
                            lineHeight: 1.3, letterSpacing: "-0.01em",
                        }}>
                            {t.text}
                        </div>
                        <div style={{ display: "flex", gap: 5 }}>
                            {["Power", "Curiosity", "Number"].map((tag, i) => (
                                <motion.span key={tag}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                    style={{
                                        fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.65)",
                                        background: "rgba(52,211,153,0.06)",
                                        padding: "2px 6px", borderRadius: 4,
                                        border: "1px solid rgba(52,211,153,0.15)",
                                    }}
                                >
                                    ✓ {tag}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom — auto-cycle indicator */}
            <div style={{ display: "flex", gap: 3 }}>
                {TITLES.map((_, i) => (
                    <motion.div key={i}
                        animate={{
                            background: i === idx ? ACCENT : "rgba(52,211,153,0.18)",
                            scale: i === idx ? 1.15 : 1,
                        }}
                        style={{ flex: 1, height: 3, borderRadius: 99 }}
                    />
                ))}
            </div>
        </div>
    );
}
