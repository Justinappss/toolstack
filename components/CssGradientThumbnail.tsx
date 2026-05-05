"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PRESETS = [
    { from: "#f43f5e", to: "#fbbf24", angle: 135, name: "SUNSET" },
    { from: "#3b82f6", to: "#a855f7", angle: 90, name: "OCEAN" },
    { from: "#10b981", to: "#06b6d4", angle: 45, name: "EMERALD" },
    { from: "#ec4899", to: "#8b5cf6", angle: 180, name: "ORCHID" },
    { from: "#f97316", to: "#ef4444", angle: 60, name: "EMBER" },
];

export function CssGradientThumbnail() {
    const [idx, setIdx] = useState(0);
    const p = PRESETS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % PRESETS.length), 2400);
        return () => clearInterval(id);
    }, []);

    const cssLine = `linear-gradient(${p.angle}deg, ${p.from}, ${p.to})`;

    return (
        <div style={{
            width: "100%", height: 220,
            background: "#06070d",
            padding: "14px 16px",
            position: "relative", overflow: "hidden",
            fontFamily: "ui-monospace, monospace",
            display: "flex", flexDirection: "column", gap: 10,
        }}>
            {/* Live gradient block */}
            <motion.div
                animate={{
                    background: cssLine,
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                    flex: 1,
                    borderRadius: 10,
                    position: "relative",
                    boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
                    overflow: "hidden",
                }}
            >
                {/* Color stops as floating dots */}
                <motion.div
                    animate={{ background: p.from, boxShadow: `0 0 14px ${p.from}` }}
                    transition={{ duration: 1.2 }}
                    style={{
                        position: "absolute", top: "50%", left: "12%",
                        transform: "translate(-50%, -50%)",
                        width: 14, height: 14, borderRadius: "50%",
                        border: "2px solid white",
                    }}
                />
                <motion.div
                    animate={{ background: p.to, boxShadow: `0 0 14px ${p.to}` }}
                    transition={{ duration: 1.2 }}
                    style={{
                        position: "absolute", top: "50%", right: "12%",
                        transform: "translate(50%, -50%)",
                        width: 14, height: 14, borderRadius: "50%",
                        border: "2px solid white",
                    }}
                />
                <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: "absolute",
                        top: 10, left: 12,
                        fontSize: 11, fontWeight: 900, color: "white",
                        letterSpacing: "0.16em",
                        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                >
                    {p.name}
                </motion.span>
                <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: "absolute",
                        top: 10, right: 12,
                        fontSize: 11, fontWeight: 900, color: "white",
                        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                >
                    {p.angle}°
                </motion.span>
            </motion.div>

            {/* CSS code preview */}
            <div style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "8px 10px",
                fontSize: 9, lineHeight: 1.5,
                color: "rgba(255,255,255,0.85)",
                position: "relative",
            }}>
                <span style={{ color: "#a78bfa", fontWeight: 700 }}>background</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>: </span>
                <motion.span
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ color: "#10b981" }}
                >
                    {cssLine}
                </motion.span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>;</span>
                <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        position: "absolute",
                        right: 8, top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 8, fontWeight: 900, color: "#10b981",
                        background: "rgba(16,185,129,0.15)",
                        padding: "2px 6px", borderRadius: 4,
                        letterSpacing: "0.1em",
                    }}
                >
                    COPY
                </motion.span>
            </div>
        </div>
    );
}
