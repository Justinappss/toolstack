"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#ff0000";

const VIDEOS = [
    { title: "How I built 57 free tools", channel: "ToolStack", from: "#1a4ddb", to: "#a855f7" },
    { title: "Why SaaS pricing is broken", channel: "Indie Hacker", from: "#f97316", to: "#dc2626" },
    { title: "The fastest way to ship", channel: "Buildspace", from: "#10b981", to: "#06b6d4" },
];

const RESOLUTIONS = [
    { name: "MAX", size: "1280×720" },
    { name: "SD", size: "640×480" },
    { name: "HQ", size: "480×360" },
    { name: "MQ", size: "320×180" },
    { name: "DEFAULT", size: "120×90" },
];

export function YoutubeThumbnailDownloaderThumbnail() {
    const [idx, setIdx] = useState(0);
    const v = VIDEOS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % VIDEOS.length), 2800);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a0000 0%, #2a0a0a 100%)",
            padding: "14px 16px",
            display: "flex", gap: 12,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Left — main thumbnail */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        style={{
                            background: ACCENT, borderRadius: 4,
                            padding: "2px 6px",
                            fontSize: 9, fontWeight: 900, color: "white",
                            boxShadow: `0 0 8px ${ACCENT}`,
                        }}
                    >
                        ▶
                    </motion.div>
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>THUMBNAIL</span>
                </div>
                <motion.div
                    key={`v-${idx}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220 }}
                    style={{
                        flex: 1,
                        borderRadius: 6,
                        background: `linear-gradient(135deg, ${v.from}, ${v.to})`,
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    {/* Play button overlay */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        style={{
                            position: "absolute",
                            top: "50%", left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 36, height: 28,
                            background: "rgba(0,0,0,0.7)",
                            borderRadius: 6,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 14, color: "white",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                        }}
                    >
                        ▶
                    </motion.div>
                    {/* Bottom gradient + duration */}
                    <div style={{
                        position: "absolute", left: 0, right: 0, bottom: 0,
                        padding: "12px 8px 6px",
                        background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.7))",
                        fontSize: 9, fontWeight: 800, color: "white",
                        textAlign: "right",
                    }}>
                        12:47
                    </div>
                    {/* Title overlay */}
                    <div style={{
                        position: "absolute", top: 6, left: 8, right: 8,
                        fontSize: 10, fontWeight: 900, color: "white",
                        textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                        lineHeight: 1.2,
                    }}>
                        {v.title}
                    </div>
                </motion.div>
                <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>
                    {v.channel}
                </div>
            </div>

            {/* Right — resolution download list */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.55)", fontWeight: 800, letterSpacing: "0.16em", marginBottom: 2 }}>
                    DOWNLOAD
                </div>
                {RESOLUTIONS.map((r, i) => (
                    <motion.div
                        key={`${idx}-${r.name}`}
                        initial={{ x: 16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.08, type: "spring", stiffness: 220 }}
                        style={{
                            background: i === 0 ? `rgba(255,0,0,0.18)` : "rgba(0,0,0,0.4)",
                            border: i === 0 ? `1px solid ${ACCENT}` : "1px solid rgba(255,0,0,0.15)",
                            borderRadius: 5,
                            padding: "5px 9px",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            boxShadow: i === 0 ? `0 0 10px rgba(255,0,0,0.2)` : "none",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 9.5, fontWeight: 900, color: i === 0 ? "white" : "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}>
                                {r.name}
                            </span>
                            <span style={{ fontSize: 7.5, fontWeight: 700, color: "rgba(255,255,255,0.45)", fontFamily: "ui-monospace, monospace" }}>
                                {r.size}
                            </span>
                        </div>
                        <motion.span
                            animate={i === 0 ? { y: [0, -2, 0] } : {}}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            style={{
                                fontSize: 11,
                                color: i === 0 ? ACCENT : "rgba(255,255,255,0.4)",
                                fontWeight: 900,
                            }}
                        >
                            ↓
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
