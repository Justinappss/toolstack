"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#34d399";

const SAMPLES = [
    "Just shipped 57 free tools. No signup. No ads. The internet got greedy — I'm betting people still want things that just work. toolstack.tech",
    "Building in public for 3 months. Got #1 on r/SideProject. 6,100 views in 24 hours. Lessons learned and what worked.",
    "If your SaaS pitch starts with 'sign up for a free trial' you've already lost. Try this instead.",
];

const PLATFORMS = [
    { name: "X / Twitter", limit: 280, color: "#ffffff" },
    { name: "LinkedIn", limit: 3000, color: "#60a5fa" },
    { name: "Instagram", limit: 2200, color: "#e879f9" },
    { name: "Bluesky", limit: 300, color: "#22d3ee" },
];

export function CharacterCounterThumbnail() {
    const [idx, setIdx] = useState(0);
    const [typed, setTyped] = useState("");
    const text = SAMPLES[idx];

    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setTyped(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(id);
                setTimeout(() => {
                    setTyped("");
                    setIdx(j => (j + 1) % SAMPLES.length);
                }, 1400);
            }
        }, 28);
        return () => clearInterval(id);
    }, [idx, text]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #061613 0%, #0a2620 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>CHAR COUNTER</span>
                <motion.div
                    key={typed.length}
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15 }}
                    style={{
                        fontSize: 18, fontWeight: 900, color: ACCENT,
                        textShadow: `0 0 10px rgba(52,211,153,0.5)`,
                        fontVariantNumeric: "tabular-nums",
                        lineHeight: 1,
                    }}
                >
                    {typed.length}
                </motion.div>
            </div>

            {/* Text input */}
            <div style={{
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(52,211,153,0.2)",
                borderRadius: 8,
                padding: "8px 11px",
                fontSize: 10, lineHeight: 1.45,
                color: "white", fontWeight: 500,
                minHeight: 50,
            }}>
                {typed}
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    style={{ color: ACCENT, marginLeft: 1 }}
                >
                    |
                </motion.span>
            </div>

            {/* Platform progress bars */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, justifyContent: "center" }}>
                {PLATFORMS.map(p => {
                    const pct = Math.min(100, (typed.length / p.limit) * 100);
                    const overLimit = typed.length > p.limit;
                    const danger = pct > 90;
                    return (
                        <div key={p.name}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, fontWeight: 700, marginBottom: 2 }}>
                                <span style={{ color: p.color }}>● {p.name}</span>
                                <span style={{
                                    color: overLimit ? "#ef4444" : danger ? "#fbbf24" : "rgba(255,255,255,0.6)",
                                    fontWeight: 800,
                                    fontVariantNumeric: "tabular-nums",
                                }}>
                                    {typed.length} / {p.limit.toLocaleString()}
                                </span>
                            </div>
                            <div style={{ height: 4, background: "rgba(52,211,153,0.1)", borderRadius: 99, overflow: "hidden" }}>
                                <motion.div
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                        height: "100%",
                                        background: overLimit ? "#ef4444" : danger ? "#fbbf24" : p.color,
                                        boxShadow: `0 0 6px ${overLimit ? "#ef4444" : danger ? "#fbbf24" : p.color}`,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
