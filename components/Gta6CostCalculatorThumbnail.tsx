"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#ff2e88";
const CYAN = "#22d3ee";

const SCENARIOS = [
    {
        setup: "Already own a PS5",
        lines: [
            { label: "Standard Edition", value: 79.99 },
        ],
        total: 79.99,
    },
    {
        setup: "Upgrading from PS4",
        lines: [
            { label: "Ultimate Edition", value: 99.99 },
            { label: "PS5 Digital", value: 599.99 },
            { label: "Trade-in", value: -120 },
        ],
        total: 579.98,
    },
    {
        setup: "New to Xbox",
        lines: [
            { label: "Standard Edition", value: 79.99 },
            { label: "Series S 1TB", value: 599.99 },
        ],
        total: 679.98,
    },
];

const fmt = (n: number) =>
    `$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function Gta6CostCalculatorThumbnail() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % SCENARIOS.length), 2800);
        return () => clearInterval(t);
    }, []);

    const s = SCENARIOS[idx];

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                background: "linear-gradient(150deg, #0b0b16 0%, #140a1a 100%)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "14px 16px",
                fontFamily: "'Inter', -apple-system, sans-serif",
            }}
        >
            {/* neon wash */}
            <div style={{ position: "absolute", top: -60, left: -40, width: 200, height: 200, background: `radial-gradient(circle, rgba(255,46,136,0.22) 0%, transparent 70%)`, borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: -70, right: -50, width: 210, height: 210, background: `radial-gradient(circle, rgba(34,211,238,0.16) 0%, transparent 70%)`, borderRadius: "50%" }} />

            {/* header */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT }}>
                    Day-one cost
                </span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>19 NOV 2026</span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    style={{ position: "relative" }}
                >
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>
                        {s.setup}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 3.5, marginBottom: 10 }}>
                        {s.lines.map(l => (
                            <div key={l.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: l.value < 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.72)" }}>
                                <span>{l.label}</span>
                                <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
                                    {l.value < 0 ? `−${fmt(l.value)}` : fmt(l.value)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            borderTop: "1px solid rgba(255,255,255,0.12)",
                            paddingTop: 8,
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                        }}
                    >
                        <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                            Total
                        </span>
                        <motion.span
                            key={`t-${idx}`}
                            initial={{ scale: 0.92, opacity: 0.6 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                fontSize: 19,
                                fontWeight: 900,
                                letterSpacing: "-0.03em",
                                fontVariantNumeric: "tabular-nums",
                                background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {fmt(s.total)}
                        </motion.span>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
