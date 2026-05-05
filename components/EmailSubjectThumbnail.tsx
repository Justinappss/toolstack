"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#f472b6";

const SUBJECTS = [
    { line: "You're invited to our launch 🎉", score: 87, light: "good" },
    { line: "FREE: Don't miss this AMAZING deal!!", score: 32, light: "bad" },
    { line: "Quick question about your store", score: 76, light: "good" },
    { line: "Your invoice is ready to view", score: 81, light: "good" },
    { line: "🚨 URGENT — open NOW!", score: 24, light: "bad" },
];

export function EmailSubjectThumbnail() {
    const [idx, setIdx] = useState(0);
    const [typed, setTyped] = useState("");
    const s = SUBJECTS[idx];

    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i++;
            setTyped(s.line.slice(0, i));
            if (i >= s.line.length) {
                clearInterval(id);
                setTimeout(() => {
                    setTyped("");
                    setIdx(j => (j + 1) % SUBJECTS.length);
                }, 1700);
            }
        }, 30);
        return () => clearInterval(id);
    }, [idx, s.line]);

    const lightColor = s.light === "good" ? "#22c55e" : s.score > 50 ? "#f59e0b" : "#ef4444";

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1f0a18 0%, #2a0a25 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>SUBJECT TESTER</span>
                {/* Spam light */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        width: 10, height: 10, borderRadius: "50%",
                        background: lightColor,
                        boxShadow: `0 0 12px ${lightColor}`,
                    }}
                />
            </div>

            {/* Inbox row mock */}
            <div style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(244,114,182,0.15)",
                borderRadius: 8,
                padding: "9px 11px",
                display: "flex", flexDirection: "column", gap: 3,
            }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: ACCENT }}>You</span>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>now</span>
                </div>
                <div style={{
                    fontSize: 12, fontWeight: 800, color: "white",
                    minHeight: 18,
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
            </div>

            {/* Score gauge */}
            <div style={{
                background: "rgba(0,0,0,0.4)",
                border: `1px solid rgba(244,114,182,0.2)`,
                borderRadius: 8,
                padding: "10px 12px",
                display: "flex", alignItems: "center", gap: 12,
                flex: 1,
            }}>
                <div style={{ position: "relative", width: 60, height: 60, flexShrink: 0 }}>
                    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(244,114,182,0.15)" strokeWidth="10" />
                        <motion.circle
                            cx="50" cy="50" r="42" fill="none"
                            stroke={lightColor} strokeWidth="10"
                            strokeDasharray={`${2 * Math.PI * 42}`}
                            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - s.score / 100) }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            style={{ filter: `drop-shadow(0 0 6px ${lightColor})` }}
                        />
                    </svg>
                    <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexDirection: "column",
                    }}>
                        <span style={{ fontSize: 18, fontWeight: 900, color: lightColor, lineHeight: 1, textShadow: `0 0 8px ${lightColor}` }}>{s.score}</span>
                        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: "0.08em", marginTop: 1 }}>/100</span>
                    </div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    {[
                        { label: "Length", v: s.line.length <= 50 ? 85 : 45 },
                        { label: "Spam", v: s.light === "good" ? 90 : 25 },
                        { label: "CTR Est.", v: s.score },
                    ].map(m => (
                        <div key={m.label}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em" }}>
                                <span>{m.label}</span>
                                <span style={{ color: lightColor }}>{m.v}%</span>
                            </div>
                            <div style={{ height: 3, background: "rgba(244,114,182,0.12)", borderRadius: 99, overflow: "hidden", marginTop: 1 }}>
                                <motion.div
                                    animate={{ width: `${m.v}%` }}
                                    transition={{ duration: 0.6 }}
                                    style={{ height: "100%", background: lightColor, boxShadow: `0 0 4px ${lightColor}` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
