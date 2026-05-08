"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#f59e0b";

const COMPANIES = [
    { name: "PSA", color: "#dc2626", price: 25, days: 65, premium: 100 },
    { name: "BGS", color: "#3b82f6", price: 30, days: 90, premium: 88 },
    { name: "SGC", color: "#10b981", price: 18, days: 30, premium: 75 },
    { name: "CGC", color: "#a855f7", price: 22, days: 45, premium: 80 },
];

export function GradingComparisonThumbnail() {
    const [highlight, setHighlight] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setHighlight(h => (h + 1) % COMPANIES.length);
        }, 1300);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            position: "relative", overflow: "hidden",
            background: "#06070d",
        }}>
            <img
                loading="lazy"
                src="/tools/grading-company-comparison-preview.png"
                alt="Grading Company Comparison preview"
                style={{
                    width: "100%", height: 220,
                    objectFit: "cover", objectPosition: "top center",
                    display: "block",
                }}
            />

            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.85) 100%)",
                pointerEvents: "none",
            }} />

            {/* Top label */}
            <motion.div
                style={{
                    position: "absolute", top: 12, left: 12, right: 12,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    zIndex: 4,
                }}
            >
                <span style={{
                    fontSize: 9, fontWeight: 900,
                    background: "rgba(0,0,0,0.78)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    padding: "4px 10px", borderRadius: 99,
                    border: `1px solid ${ACCENT}`,
                    letterSpacing: "0.1em",
                    fontFamily: "Inter, sans-serif",
                }}>
                    🏆 GRADING COMPARISON
                </span>
                <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 8.5, fontWeight: 900,
                        background: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(10px)",
                        color: ACCENT,
                        padding: "4px 9px", borderRadius: 99,
                        border: `1px solid rgba(245,158,11,0.4)`,
                        letterSpacing: "0.1em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    ● 4 COMPANIES
                </motion.span>
            </motion.div>

            {/* Bottom — comparison rows */}
            <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.25 }}
                style={{
                    position: "absolute", bottom: 12, left: 12, right: 12,
                    background: "rgba(6,7,13,0.94)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 10,
                    padding: "8px 10px",
                    boxShadow: `0 8px 24px rgba(245,158,11,0.3)`,
                    zIndex: 4,
                    fontFamily: "Inter, sans-serif",
                    display: "flex", flexDirection: "column", gap: 3,
                }}
            >
                {/* Header */}
                <div style={{
                    display: "grid", gridTemplateColumns: "1.1fr 0.9fr 0.9fr 1fr",
                    gap: 6, fontSize: 7, fontWeight: 900,
                    color: "rgba(255,255,255,0.45)", letterSpacing: "0.16em",
                }}>
                    <span></span>
                    <span style={{ textAlign: "right" }}>FEE</span>
                    <span style={{ textAlign: "right" }}>TIME</span>
                    <span style={{ textAlign: "right" }}>PREMIUM</span>
                </div>
                {/* Rows */}
                {COMPANIES.map((c, i) => (
                    <motion.div
                        key={c.name}
                        animate={{
                            background: i === highlight ? `${c.color}20` : `${c.color}00`,
                            borderColor: i === highlight ? c.color : `${c.color}00`,
                            scale: i === highlight ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: "grid", gridTemplateColumns: "1.1fr 0.9fr 0.9fr 1fr",
                            gap: 6, alignItems: "center",
                            border: "1px solid",
                            borderRadius: 4, padding: "3px 7px",
                            fontSize: 10, fontWeight: 800, color: "white",
                        }}
                    >
                        <span style={{ color: c.color, fontSize: 11, fontWeight: 900 }}>● {c.name}</span>
                        <span style={{ textAlign: "right" }}>${c.price}</span>
                        <span style={{ textAlign: "right" }}>{c.days}d</span>
                        <span style={{ textAlign: "right" }}>
                            <motion.span
                                animate={i === highlight ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 0.4 }}
                                style={{ color: c.color, fontWeight: 900 }}
                            >
                                {c.premium}%
                            </motion.span>
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
