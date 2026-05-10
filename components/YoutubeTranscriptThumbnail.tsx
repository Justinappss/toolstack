"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#f87171";
const ACCENT_DIM = "rgba(248,113,113,";

const VIDEOS = [
    {
        url: "youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Rick Astley - Never Gonna Give You Up",
        lines: [
            { t: "0:00", text: "We're no strangers to love" },
            { t: "0:04", text: "You know the rules and so do I" },
            { t: "0:08", text: "A full commitment's what I'm thinking of" },
            { t: "0:12", text: "You wouldn't get this from any other guy" },
        ],
    },
    {
        url: "youtube.com/watch?v=jNQXAC9IVRw",
        title: "Me at the zoo — first YouTube video ever",
        lines: [
            { t: "0:00", text: "Alright so here we are in front of the elephants" },
            { t: "0:04", text: "And the cool thing about these guys is that" },
            { t: "0:07", text: "They have really, really, really long trunks" },
            { t: "0:11", text: "And that's, that's cool" },
        ],
    },
    {
        url: "youtube.com/watch?v=9bZkp7q19f0",
        title: "PSY - GANGNAM STYLE (강남스타일) M/V",
        lines: [
            { t: "0:00", text: "오빤 강남스타일" },
            { t: "0:04", text: "강남스타일" },
            { t: "0:07", text: "오빤 강남스타일" },
            { t: "0:11", text: "강남스타일" },
        ],
    },
];

export function YoutubeTranscriptThumbnail() {
    const [vidIdx, setVidIdx] = useState(0);
    const [shown, setShown] = useState(0);
    const [copying, setCopying] = useState(false);

    const v = VIDEOS[vidIdx];

    useEffect(() => {
        if (shown < v.lines.length) {
            const id = setTimeout(() => setShown(s => s + 1), 350);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => {
            setShown(0);
            setVidIdx(i => (i + 1) % VIDEOS.length);
        }, 1800);
        return () => clearTimeout(id);
    }, [shown, vidIdx, v.lines.length]);

    useEffect(() => {
        if (!copying) return;
        const id = setTimeout(() => setCopying(false), 900);
        return () => clearTimeout(id);
    }, [copying]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a0000 0%, #200808 50%, #0d0008 100%)",
            padding: "12px 14px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Corner glow */}
            <div style={{
                position: "absolute", top: -40, right: -40,
                width: 140, height: 140, borderRadius: "50%",
                background: `radial-gradient(circle, ${ACCENT_DIM}0.15) 0%, transparent 70%)`,
                pointerEvents: "none",
            }} />

            {/* Top row — label + word count badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.div
                        animate={{ scale: [1, 1.18, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                            background: ACCENT, borderRadius: 4,
                            padding: "2px 6px",
                            fontSize: 9, fontWeight: 900, color: "white",
                            boxShadow: `0 0 8px ${ACCENT_DIM}0.6)`,
                        }}
                    >
                        ▶
                    </motion.div>
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>TRANSCRIPT</span>
                </div>
                <motion.div
                    key={`wc-${vidIdx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        fontSize: 8, fontWeight: 800,
                        color: "rgba(255,255,255,0.65)",
                        background: `${ACCENT_DIM}0.1)`,
                        border: `1px solid ${ACCENT_DIM}0.3)`,
                        padding: "3px 8px", borderRadius: 99,
                        fontFamily: "ui-monospace, monospace",
                    }}
                >
                    {v.lines.length * 8}w · {v.lines.length * 2}s read
                </motion.div>
            </div>

            {/* URL input bar */}
            <motion.div
                key={`url-${vidIdx}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: "rgba(0,0,0,0.5)",
                    border: `1px solid ${ACCENT_DIM}0.3)`,
                    borderRadius: 7,
                    padding: "5px 10px",
                    display: "flex", alignItems: "center", gap: 6,
                }}
            >
                <span style={{ fontSize: 8, color: ACCENT, fontWeight: 900 }}>▶</span>
                <span style={{
                    fontSize: 9, fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "ui-monospace, monospace",
                    overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                    flex: 1,
                }}>
                    {v.url}
                </span>
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    style={{ width: 7, height: 12, background: ACCENT, borderRadius: 1, flexShrink: 0 }}
                />
            </motion.div>

            {/* Video title */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`title-${vidIdx}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    style={{
                        fontSize: 9, fontWeight: 700,
                        color: "rgba(255,255,255,0.75)",
                        overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                        paddingLeft: 2,
                    }}
                >
                    <span style={{ color: ACCENT, marginRight: 4 }}>▶</span>
                    {v.title}
                </motion.div>
            </AnimatePresence>

            {/* Transcript lines */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.4)",
                border: `1px solid ${ACCENT_DIM}0.15)`,
                borderRadius: 7,
                padding: "7px 9px",
                display: "flex", flexDirection: "column", gap: 4,
                overflow: "hidden",
            }}>
                <AnimatePresence>
                    {v.lines.slice(0, shown).map((line, i) => (
                        <motion.div
                            key={`${vidIdx}-${i}`}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            style={{ display: "flex", alignItems: "flex-start", gap: 7 }}
                        >
                            <span style={{
                                fontSize: 8, fontWeight: 800,
                                color: ACCENT,
                                fontFamily: "ui-monospace, monospace",
                                flexShrink: 0, marginTop: 1,
                                opacity: 0.85,
                            }}>
                                {line.t}
                            </span>
                            <span style={{
                                fontSize: 9, fontWeight: 500,
                                color: i === shown - 1 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
                                lineHeight: 1.3,
                            }}>
                                {line.text}
                            </span>
                        </motion.div>
                    ))}
                    {shown < v.lines.length && (
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.7, repeat: Infinity }}
                            style={{ fontSize: 11, color: ACCENT, paddingLeft: 28 }}
                        >
                            ●
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom action bar */}
            <div style={{ display: "flex", gap: 5 }}>
                <motion.div
                    animate={{
                        boxShadow: [
                            `0 0 6px ${ACCENT_DIM}0.25)`,
                            `0 0 14px ${ACCENT_DIM}0.55)`,
                            `0 0 6px ${ACCENT_DIM}0.25)`,
                        ]
                    }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    onClick={() => setCopying(true)}
                    style={{
                        flex: 1,
                        background: copying ? `${ACCENT_DIM}0.25)` : `${ACCENT_DIM}0.12)`,
                        border: `1px solid ${ACCENT_DIM}0.4)`,
                        borderRadius: 5, padding: "5px 0",
                        fontSize: 9, fontWeight: 900, letterSpacing: "0.07em",
                        color: copying ? "white" : ACCENT,
                        textAlign: "center",
                        transition: "background 0.2s, color 0.2s",
                        cursor: "pointer",
                    }}
                >
                    {copying ? "✓ COPIED" : "⎘ COPY MD"}
                </motion.div>
                <div style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 5, padding: "5px 10px",
                    fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,0.55)",
                    display: "flex", alignItems: "center", gap: 4,
                }}>
                    ↓ .md
                </div>
            </div>
        </div>
    );
}
