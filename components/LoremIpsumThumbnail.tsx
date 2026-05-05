"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#22d3ee";

const PARAGRAPHS = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id.",
    "Curabitur sagittis hendrerit ante. Aliquam erat volutpat. Praesent dapibus neque id cursus faucibus.",
    "Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem.",
    "Quisque ligula eros ullamcorper quis lacinia quis facilisis sed sapien mauris malesuada arcu.",
];

const TYPES = ["Paragraphs", "Sentences", "Words", "Lists"];

export function LoremIpsumThumbnail() {
    const [visible, setVisible] = useState<number[]>([]);
    const [count, setCount] = useState(3);
    const [typeIdx, setTypeIdx] = useState(0);

    useEffect(() => {
        // Generate 3-5 paragraphs in sequence
        let i = 0;
        setVisible([]);
        const id = setInterval(() => {
            if (i >= count) {
                clearInterval(id);
                setTimeout(() => {
                    const newCount = 2 + Math.floor(Math.random() * 3);
                    setCount(newCount);
                    setTypeIdx(t => (t + 1) % TYPES.length);
                }, 1400);
                return;
            }
            setVisible(v => [...v, (Date.now() + i) % PARAGRAPHS.length]);
            i++;
        }, 480);
        return () => clearInterval(id);
    }, [count]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #051422 0%, #0a2440 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>LOREM IPSUM</span>
                <div style={{ display: "flex", gap: 4 }}>
                    {TYPES.map((t, i) => (
                        <motion.div key={t}
                            animate={{
                                background: i === typeIdx ? `rgba(34,211,238,0.25)` : `rgba(34,211,238,0.05)`,
                                borderColor: i === typeIdx ? ACCENT : `rgba(34,211,238,0.15)`,
                            }}
                            style={{
                                fontSize: 8, fontWeight: 800,
                                color: i === typeIdx ? "white" : "rgba(255,255,255,0.5)",
                                padding: "2px 6px", borderRadius: 4,
                                border: "1px solid",
                                letterSpacing: "0.04em",
                            }}
                        >
                            {t}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Count slider */}
            <div style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(34,211,238,0.2)",
                borderRadius: 6,
                padding: "5px 9px",
                display: "flex", alignItems: "center", gap: 8,
            }}>
                <span style={{ fontSize: 8.5, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.14em" }}>COUNT</span>
                <div style={{ flex: 1, height: 3, background: "rgba(34,211,238,0.15)", borderRadius: 99, position: "relative" }}>
                    <motion.div
                        animate={{ width: `${(count / 5) * 100}%` }}
                        transition={{ type: "spring", stiffness: 120 }}
                        style={{ height: "100%", background: ACCENT, borderRadius: 99, boxShadow: `0 0 6px ${ACCENT}` }}
                    />
                </div>
                <motion.span
                    key={count}
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    style={{
                        fontSize: 12, fontWeight: 900, color: ACCENT,
                        textShadow: `0 0 8px rgba(34,211,238,0.5)`,
                        minWidth: 14, textAlign: "right",
                    }}
                >
                    {count}
                </motion.span>
            </div>

            {/* Streaming paragraphs */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(34,211,238,0.2)",
                borderRadius: 6,
                padding: "8px 11px",
                fontSize: 9, lineHeight: 1.4,
                color: "rgba(255,255,255,0.78)",
                overflow: "hidden",
                position: "relative",
                display: "flex", flexDirection: "column", gap: 5,
            }}>
                <AnimatePresence>
                    {visible.map((p, i) => (
                        <motion.div
                            key={`${count}-${i}`}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span style={{ color: ACCENT, fontWeight: 800 }}>{i + 1}. </span>
                            {PARAGRAPHS[p % PARAGRAPHS.length]}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {visible.length < count && (
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ fontSize: 8.5, color: ACCENT, fontWeight: 800, letterSpacing: "0.14em" }}
                    >
                        ● generating…
                    </motion.div>
                )}
            </div>
        </div>
    );
}
