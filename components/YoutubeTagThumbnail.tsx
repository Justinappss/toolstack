"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#ff0000";

const SETS = [
    { topic: "AI Tutorial", tags: ["chatgpt", "ai tools 2026", "prompt engineering", "machine learning", "openai api"], views: "4.2M" },
    { topic: "Coding", tags: ["nextjs 16", "react hooks", "typescript", "fullstack dev", "side project"], views: "2.8M" },
    { topic: "Productivity", tags: ["notion templates", "morning routine", "deep work", "side hustle", "no-code"], views: "1.6M" },
];

export function YoutubeTagThumbnail() {
    const [idx, setIdx] = useState(0);
    const [shown, setShown] = useState(0);

    useEffect(() => {
        if (shown < SETS[idx].tags.length) {
            const id = setTimeout(() => setShown(s => s + 1), 220);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => {
            setShown(0);
            setIdx(i => (i + 1) % SETS.length);
        }, 1700);
        return () => clearTimeout(id);
    }, [shown, idx]);

    const s = SETS[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a0000 0%, #2a0a0a 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        style={{
                            background: ACCENT,
                            borderRadius: 4,
                            padding: "2px 6px",
                            fontSize: 9, fontWeight: 900, color: "white",
                            letterSpacing: "0.06em",
                            boxShadow: `0 0 10px ${ACCENT}`,
                        }}
                    >
                        ▶
                    </motion.div>
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>YT TAGS</span>
                </div>
                <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 9, fontWeight: 900, color: "white",
                        background: "rgba(255,0,0,0.2)",
                        padding: "3px 8px", borderRadius: 99,
                        border: `1px solid rgba(255,0,0,0.4)`,
                        letterSpacing: "0.06em",
                    }}
                >
                    EST. {s.views} VIEWS
                </motion.span>
            </div>

            {/* Topic */}
            <motion.div
                key={`t-${idx}`}
                initial={{ x: -8, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                style={{
                    background: "rgba(255,0,0,0.08)",
                    border: "1px solid rgba(255,0,0,0.25)",
                    borderRadius: 6,
                    padding: "5px 10px",
                    fontSize: 10, fontWeight: 700, color: "white",
                }}
            >
                <span style={{ color: ACCENT, fontWeight: 800, marginRight: 4 }}>VIDEO:</span>
                {s.topic} — Complete Guide
            </motion.div>

            {/* Tag cloud */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,0,0,0.15)",
                borderRadius: 8,
                padding: "9px 11px",
                display: "flex", flexWrap: "wrap", gap: 5,
                alignContent: "flex-start",
            }}>
                <AnimatePresence>
                    {s.tags.slice(0, shown).map((tag, i) => (
                        <motion.span
                            key={`${idx}-${tag}`}
                            initial={{ scale: 0, y: 8 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0, y: -8 }}
                            transition={{ type: "spring", stiffness: 280, damping: 18 }}
                            style={{
                                fontSize: 10.5, fontWeight: 700,
                                color: "white",
                                background: `rgba(255,0,0,${0.18 + (i % 3) * 0.05})`,
                                padding: "4px 10px", borderRadius: 99,
                                border: `1px solid rgba(255,0,0,0.4)`,
                                fontFamily: "ui-monospace, monospace",
                                textShadow: "0 0 6px rgba(255,0,0,0.3)",
                            }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                    {shown < s.tags.length && (
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            style={{
                                fontSize: 11, color: ACCENT, fontWeight: 900,
                                padding: "4px 8px",
                            }}
                        >
                            ●
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom — copy CTA */}
            <motion.div
                animate={{
                    boxShadow: [
                        `0 0 6px rgba(255,0,0,0.3)`,
                        `0 0 14px rgba(255,0,0,0.6)`,
                        `0 0 6px rgba(255,0,0,0.3)`,
                    ]
                }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                    background: ACCENT, color: "white",
                    fontSize: 10, fontWeight: 900, letterSpacing: "0.08em",
                    padding: "6px 0", borderRadius: 6,
                    textAlign: "center",
                }}
            >
                ⚡ COPY ALL TAGS
            </motion.div>
        </div>
    );
}
