"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#a78bfa";

const PLATFORMS = [
    { name: "Instagram", icon: "📷", color: "#e879f9" },
    { name: "TikTok", icon: "🎵", color: "#22d3ee" },
    { name: "LinkedIn", icon: "💼", color: "#60a5fa" },
    { name: "X / Twitter", icon: "𝕏", color: "#ffffff" },
];

const SETS = [
    ["#fitness", "#workout", "#gymlife", "#fitfam", "#nopainnogain", "#strongnotskinny"],
    ["#travel", "#wanderlust", "#explore", "#adventure", "#travelgram", "#instatravel"],
    ["#food", "#foodie", "#instafood", "#yummy", "#foodporn", "#delicious"],
    ["#startup", "#entrepreneur", "#founder", "#hustle", "#buildinpublic", "#sidehustle"],
];

export function HashtagGeneratorThumbnail() {
    const [setIdx, setSetIdx] = useState(0);
    const [platformIdx, setPlatformIdx] = useState(0);
    const [reach, setReach] = useState(124);

    useEffect(() => {
        const id = setInterval(() => {
            setSetIdx(i => (i + 1) % SETS.length);
            setPlatformIdx(i => (i + 1) % PLATFORMS.length);
        }, 3000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setReach(r => r + Math.floor(Math.random() * 9 - 3));
        }, 600);
        return () => clearInterval(id);
    }, []);

    const platform = PLATFORMS[platformIdx];
    const tags = SETS[setIdx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #18062b 0%, #2a0a4a 100%)",
            padding: "14px 16px",
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", flexDirection: "column", gap: 9,
        }}>
            {/* Top: platform selector */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em" }}>HASHTAGS</span>
                <motion.div
                    key={platformIdx}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 16 }}
                    style={{
                        display: "flex", alignItems: "center", gap: 5,
                        background: `${platform.color}25`,
                        border: `1px solid ${platform.color}50`,
                        padding: "3px 9px", borderRadius: 99,
                        fontSize: 9.5, fontWeight: 800,
                        color: platform.color === "#ffffff" ? "white" : platform.color,
                        letterSpacing: "0.04em",
                    }}
                >
                    <span style={{ fontSize: 11 }}>{platform.icon}</span>
                    {platform.name}
                </motion.div>
            </div>

            {/* Hashtag cloud */}
            <div style={{
                flex: 1,
                display: "flex", flexWrap: "wrap", gap: 5,
                alignContent: "flex-start",
                background: "rgba(167,139,250,0.05)",
                border: "1px solid rgba(167,139,250,0.15)",
                borderRadius: 10,
                padding: 9,
                position: "relative",
                minHeight: 80,
            }}>
                <AnimatePresence mode="sync">
                    {tags.map((tag, i) => (
                        <motion.span
                            key={`${setIdx}-${tag}`}
                            initial={{ opacity: 0, scale: 0.4, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.4, y: -10 }}
                            transition={{
                                type: "spring", stiffness: 200, damping: 14,
                                delay: i * 0.08,
                            }}
                            style={{
                                fontSize: 11, fontWeight: 700,
                                color: ACCENT,
                                background: `rgba(167,139,250,0.18)`,
                                border: `1px solid rgba(167,139,250,0.4)`,
                                padding: "3.5px 9px", borderRadius: 99,
                                letterSpacing: "0.01em",
                                textShadow: `0 0 6px rgba(167,139,250,0.3)`,
                            }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </AnimatePresence>
            </div>

            {/* Bottom: stats + button */}
            <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
                <div style={{
                    flex: 1,
                    background: "rgba(167,139,250,0.08)",
                    border: `1px solid rgba(167,139,250,0.25)`,
                    borderRadius: 6, padding: "5px 9px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                    <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.1em" }}>EST. REACH</span>
                    <motion.span
                        key={reach}
                        initial={{ y: -4, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            fontSize: 13, fontWeight: 900, color: ACCENT,
                            textShadow: `0 0 8px rgba(167,139,250,0.5)`,
                        }}
                    >
                        {reach}K
                    </motion.span>
                </div>
                <motion.div
                    animate={{
                        boxShadow: [
                            `0 0 6px rgba(167,139,250,0.3)`,
                            `0 0 14px rgba(167,139,250,0.6)`,
                            `0 0 6px rgba(167,139,250,0.3)`,
                        ]
                    }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{
                        background: ACCENT, color: "#18062b",
                        fontSize: 10, fontWeight: 900, letterSpacing: "0.06em",
                        padding: "7px 14px", borderRadius: 6,
                        display: "flex", alignItems: "center",
                    }}
                >
                    ⚡ COPY ALL
                </motion.div>
            </div>
        </div>
    );
}
