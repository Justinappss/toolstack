"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRIMARY = "#a78bfa";
const SECONDARY = "#ff2e88";

const SCENARIOS = [
    {
        label: "Standard",
        price: "$79.99",
        lines: ["Full story", "Complete map", "All mechanics"],
        color: PRIMARY,
    },
    {
        label: "Ultimate",
        price: "$99.99",
        lines: ["5 extra shops", "2 side missions", "Salon options"],
        color: SECONDARY,
    },
    {
        label: "Both editions",
        price: "🎁 Vice City Pack",
        lines: ["Pre-order bonus", "Not Ultimate-only", "Ends 20 Nov"],
        color: SECONDARY,
    },
];

export function Gta6EditionComparisonThumbnail() {
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
            <div style={{ position: "absolute", top: -60, left: -40, width: 200, height: 200, background: `radial-gradient(circle, rgba(167,139,250,0.24) 0%, transparent 70%)`, borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: -70, right: -50, width: 210, height: 210, background: `radial-gradient(circle, rgba(255,46,136,0.16) 0%, transparent 70%)`, borderRadius: "50%" }} />

            {/* header */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: PRIMARY }}>
                    Edition compare
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
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
                        <motion.span
                            key={`p-${idx}`}
                            initial={{ scale: 0.92, opacity: 0.6 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                fontSize: 15,
                                fontWeight: 900,
                                letterSpacing: "-0.02em",
                                fontVariantNumeric: "tabular-nums",
                                color: s.color,
                            }}
                        >
                            {s.price}
                        </motion.span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {s.lines.map(l => (
                            <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: "rgba(255,255,255,0.72)" }}>
                                <span style={{ color: s.color, fontWeight: 800 }} aria-hidden="true">✓</span>
                                <span>{l}</span>
                            </div>
                        ))}
                    </div>
                    {s.label === "Ultimate" && (
                        <div style={{ marginTop: 4, fontSize: 6.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                            Reported, not confirmed
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
