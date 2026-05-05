"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#e879f9";

const PALETTES = [
    { name: "SUNSET BEACH", colors: ["#FF6B6B", "#FFB347", "#FFE66D", "#4ECDC4", "#1A535C"] },
    { name: "ROYAL FOREST", colors: ["#2D5016", "#73AB84", "#C7DDB5", "#E5F0DB", "#F7F9F4"] },
    { name: "NEON CYBER", colors: ["#FF006E", "#FB5607", "#FFBE0B", "#8338EC", "#3A86FF"] },
    { name: "PASTEL DREAM", colors: ["#FFD6E0", "#C8E7FF", "#D4F1F4", "#FBE7C6", "#B4F8C8"] },
];

export function ColorPaletteThumbnail() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % PALETTES.length), 3000);
        return () => clearInterval(id);
    }, []);

    const p = PALETTES[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a0a25 0%, #2a0a3a 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 10,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top — describe input */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>AI PALETTE</span>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ fontSize: 10, color: ACCENT }}
                >
                    ✦
                </motion.div>
            </div>
            <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                    background: "rgba(232,121,249,0.08)",
                    border: `1px solid rgba(232,121,249,0.25)`,
                    borderRadius: 6,
                    padding: "6px 10px",
                    fontSize: 10, color: "white", fontWeight: 600,
                    fontStyle: "italic",
                }}
            >
                &ldquo;{p.name.toLowerCase()}&rdquo;
            </motion.div>

            {/* 5 swatches */}
            <div style={{ flex: 1, display: "flex", gap: 5 }}>
                {p.colors.map((c, i) => (
                    <motion.div
                        key={`${idx}-${i}`}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring", stiffness: 180, damping: 18,
                            delay: i * 0.08,
                        }}
                        style={{
                            flex: 1,
                            background: c,
                            borderRadius: 8,
                            position: "relative",
                            boxShadow: `0 6px 16px ${c}40`,
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            paddingBottom: 6,
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <span style={{
                            fontSize: 8.5, fontWeight: 900,
                            color: "white",
                            background: "rgba(0,0,0,0.5)",
                            padding: "2px 5px",
                            borderRadius: 3,
                            letterSpacing: "0.04em",
                            fontFamily: "ui-monospace, monospace",
                        }}>
                            {c.toUpperCase()}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Bottom — copy options */}
            <div style={{ display: "flex", gap: 6 }}>
                {["HEX", "RGB", "TAILWIND"].map((fmt, i) => (
                    <motion.div key={fmt}
                        animate={{
                            background: i === 0 ? `rgba(232,121,249,0.25)` : `rgba(232,121,249,0.06)`,
                            borderColor: i === 0 ? ACCENT : `rgba(232,121,249,0.18)`,
                        }}
                        style={{
                            fontSize: 9, fontWeight: 800,
                            color: i === 0 ? "white" : "rgba(255,255,255,0.55)",
                            padding: "5px 0", borderRadius: 5,
                            border: `1px solid`,
                            letterSpacing: "0.08em",
                            flex: 1, textAlign: "center",
                        }}
                    >
                        {fmt}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
