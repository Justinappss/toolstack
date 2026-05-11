"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#ff0000";

const CLIPS = [
    { url: "youtube.com/watch?v=dQw4w9WgXcQ", file: "rickroll_1080p.mp4", size: "128 MB", quality: "1080p" },
    { url: "youtu.be/9bZkp7q19f0", file: "gangnam_style_720p.mp4", size: "84 MB", quality: "720p" },
    { url: "youtube.com/shorts/TcMBFSGVi1c", file: "shorts_vertical.mp4", size: "22 MB", quality: "1080p" },
];

export function YoutubeVideoDownloaderThumbnail() {
    const [idx, setIdx] = useState(0);
    const [fill, setFill] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        setFill(0);
        setDone(false);
        const delay = setTimeout(() => {
            const iv = setInterval(() => {
                setFill(p => {
                    if (p >= 100) { clearInterval(iv); setDone(true); return 100; }
                    return p + 4;
                });
            }, 55);
            return () => clearInterval(iv);
        }, 700);
        const next = setTimeout(() => {
            setIdx(i => (i + 1) % CLIPS.length);
        }, 3400);
        return () => { clearTimeout(delay); clearTimeout(next); };
    }, [idx]);

    const clip = CLIPS[idx];
    const processing = fill > 0 && fill < 100;

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(145deg, #0d0000 0%, #1a0505 50%, #0a000a 100%)",
            padding: "13px 15px 11px",
            display: "flex", flexDirection: "column", gap: 10,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Ambient glow */}
            <div style={{
                position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)",
                width: 200, height: 120, borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(255,0,0,0.12) 0%, transparent 70%)",
                filter: "blur(20px)", pointerEvents: "none",
            }} />

            {/* URL input bar */}
            <div style={{
                background: "rgba(0,0,0,0.6)",
                border: `1px solid ${done ? "rgba(52,211,153,0.5)" : processing ? "rgba(255,0,0,0.45)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 8,
                padding: "6px 10px",
                display: "flex", alignItems: "center", gap: 7,
                transition: "border-color 0.4s",
                boxShadow: processing ? "0 0 12px rgba(255,0,0,0.15)" : "none",
            }}>
                {/* YT favicon dot */}
                <div style={{
                    width: 14, height: 10, borderRadius: 2,
                    background: ACCENT, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "3px 0 3px 5px", borderColor: "transparent transparent transparent white" }} />
                </div>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`url-${idx}`}
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.55)",
                            fontFamily: "ui-monospace, monospace", flex: 1,
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}
                    >
                        {clip.url}
                    </motion.span>
                </AnimatePresence>
                <motion.div
                    animate={done ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8, repeat: done ? 0 : Infinity }}
                    style={{
                        fontSize: 8, fontWeight: 900, letterSpacing: "0.06em",
                        color: done ? "#34d399" : ACCENT,
                        background: done ? "rgba(52,211,153,0.15)" : "rgba(255,0,0,0.15)",
                        border: `1px solid ${done ? "rgba(52,211,153,0.4)" : "rgba(255,0,0,0.35)"}`,
                        padding: "2px 7px", borderRadius: 4,
                        flexShrink: 0,
                    }}
                >
                    {done ? "DONE" : processing ? "PROC..." : "PASTE"}
                </motion.div>
            </div>

            {/* Center: flow diagram */}
            <div style={{
                flex: 1,
                display: "flex", alignItems: "center", gap: 0,
                minHeight: 0,
            }}>
                {/* YouTube source icon */}
                <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    flexShrink: 0, width: 52,
                }}>
                    <motion.div
                        animate={processing ? { boxShadow: ["0 0 8px rgba(255,0,0,0.3)", "0 0 18px rgba(255,0,0,0.6)", "0 0 8px rgba(255,0,0,0.3)"] } : {}}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={{
                            width: 44, height: 32,
                            background: "linear-gradient(145deg, #cc0000, #ff0000)",
                            borderRadius: 7,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 4px 14px rgba(255,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                        }}
                    >
                        <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "7px 0 7px 13px", borderColor: "transparent transparent transparent white" }} />
                    </motion.div>
                    <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.05em" }}>SOURCE</span>
                </div>

                {/* Particle stream */}
                <div style={{ flex: 1, height: 32, position: "relative", overflow: "hidden", margin: "0 4px" }}>
                    <div style={{
                        position: "absolute", top: "50%", left: 0, right: 0,
                        height: 1.5, background: "rgba(255,0,0,0.15)",
                        transform: "translateY(-50%)",
                    }} />
                    {processing && [0, 1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            animate={{ x: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.22, ease: "linear" }}
                            style={{
                                position: "absolute",
                                top: "50%", left: 0,
                                width: 8, height: 8, borderRadius: "50%",
                                background: ACCENT,
                                transform: "translateY(-50%)",
                                boxShadow: `0 0 6px ${ACCENT}`,
                            }}
                        />
                    ))}
                    {!processing && !done && (
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 12, color: "rgba(255,255,255,0.15)" }}>→</div>
                    )}
                    {done && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            style={{
                                position: "absolute", top: "50%", left: 0, right: 0,
                                height: 2, background: "linear-gradient(90deg, #34d399, #10b981)",
                                transform: "translateY(-50%)",
                                transformOrigin: "left",
                                boxShadow: "0 0 6px rgba(52,211,153,0.6)",
                            }}
                        />
                    )}
                </div>

                {/* MP4 file icon — fills up */}
                <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    flexShrink: 0, width: 68,
                }}>
                    <div style={{
                        width: 52, height: 64,
                        position: "relative",
                        borderRadius: "0 8px 8px 8px",
                        border: `1.5px solid ${done ? "rgba(52,211,153,0.6)" : "rgba(255,0,0,0.35)"}`,
                        background: "rgba(0,0,0,0.6)",
                        overflow: "hidden",
                        boxShadow: done ? "0 0 14px rgba(52,211,153,0.25)" : "0 0 10px rgba(255,0,0,0.12)",
                        transition: "border-color 0.4s, box-shadow 0.4s",
                    }}>
                        {/* Dog-ear */}
                        <div style={{
                            position: "absolute", top: 0, right: 0,
                            width: 14, height: 14,
                            background: done ? "rgba(52,211,153,0.3)" : "rgba(255,0,0,0.3)",
                            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                            transition: "background 0.4s",
                        }} />
                        {/* Fill from bottom */}
                        <motion.div
                            style={{
                                position: "absolute", bottom: 0, left: 0, right: 0,
                                background: done
                                    ? "linear-gradient(180deg, rgba(52,211,153,0.3), rgba(16,185,129,0.15))"
                                    : "linear-gradient(180deg, rgba(255,0,0,0.2), rgba(255,0,0,0.08))",
                                transition: "background 0.4s",
                            }}
                            animate={{ height: `${fill}%` }}
                            transition={{ ease: "easeOut", duration: 0.12 }}
                        />
                        {/* Label */}
                        <div style={{
                            position: "absolute", inset: 0,
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", gap: 2,
                        }}>
                            {done ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 280 }}
                                    style={{ fontSize: 16, color: "#34d399" }}>✓</motion.div>
                            ) : (
                                <span style={{ fontSize: 10.5, fontWeight: 900, color: "white", letterSpacing: "0.04em" }}>MP4</span>
                            )}
                            <span style={{
                                fontSize: 7, fontWeight: 800,
                                color: done ? "#34d399" : "rgba(255,255,255,0.45)",
                                letterSpacing: "0.06em",
                            }}>
                                {clip.quality}
                            </span>
                        </div>
                    </div>
                    <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.05em" }}>OUTPUT</span>
                </div>
            </div>

            {/* Bottom file info row */}
            <div style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 6,
                padding: "5px 9px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`file-${idx}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        style={{ fontSize: 8.5, fontWeight: 700, color: "rgba(255,255,255,0.5)", fontFamily: "ui-monospace, monospace" }}
                    >
                        {clip.file}
                    </motion.span>
                </AnimatePresence>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.35)" }}>{clip.size}</span>
                    <motion.span
                        animate={done ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.7, repeat: done ? 0 : Infinity }}
                        style={{
                            fontSize: 8, fontWeight: 900, letterSpacing: "0.06em",
                            color: done ? "#34d399" : ACCENT,
                        }}
                    >
                        {done ? "✓ SAVED" : `${fill}%`}
                    </motion.span>
                </div>
            </div>
        </div>
    );
}
