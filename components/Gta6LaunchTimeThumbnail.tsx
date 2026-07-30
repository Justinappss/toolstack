"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#22d3ee";
const PINK = "#ff2e88";

const SCENARIOS = [
    { city: "Auckland", time: "12:00 AM NZDT", delta: "First" },
    { city: "London", time: "12:00 AM GMT", delta: "+13h" },
    { city: "New York", time: "12:00 AM EST", delta: "+18h" },
    { city: "Honolulu", time: "12:00 AM HST", delta: "+23h" },
];

export function Gta6LaunchTimeThumbnail() {
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
                background: "linear-gradient(150deg, #0b0b16 0%, #0a1620 100%)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "14px 16px",
                fontFamily: "'Inter', -apple-system, sans-serif",
            }}
        >
            {/* neon wash */}
            <div style={{ position: "absolute", top: -60, left: -40, width: 200, height: 200, background: `radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 70%)`, borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: -70, right: -50, width: 210, height: 210, background: `radial-gradient(circle, rgba(255,46,136,0.16) 0%, transparent 70%)`, borderRadius: "50%" }} />

            {/* header */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT }}>
                    Launch time
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
                        {s.city}
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
                            {s.delta}
                        </span>
                        <motion.span
                            key={`t-${idx}`}
                            initial={{ scale: 0.92, opacity: 0.6 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                fontSize: 16,
                                fontWeight: 900,
                                letterSpacing: "-0.02em",
                                fontVariantNumeric: "tabular-nums",
                                background: `linear-gradient(135deg, ${ACCENT}, ${PINK})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {s.time}
                        </motion.span>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
