"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#22d3ee";

const PROFILES = [
    { dob: "1990-03-15", years: 36, months: 1, days: 14, zodiac: "Pisces", emoji: "♓", days_total: 13183 },
    { dob: "1985-08-22", years: 40, months: 8, days: 7, zodiac: "Leo", emoji: "♌", days_total: 14861 },
    { dob: "1995-11-04", years: 30, months: 5, days: 25, zodiac: "Scorpio", emoji: "♏", days_total: 11135 },
    { dob: "2000-06-30", years: 25, months: 9, days: 30, zodiac: "Cancer", emoji: "♋", days_total: 9436 },
];

export function AgeCalculatorThumbnail() {
    const [idx, setIdx] = useState(0);
    const p = PROFILES[idx];
    const [ticked, setTicked] = useState(p.days_total);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % PROFILES.length), 2900);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const target = p.days_total;
        let frame: number;
        const step = () => {
            setTicked(curr => {
                const diff = target - curr;
                if (Math.abs(diff) < 1) return target;
                return Math.round(curr + diff * 0.15);
            });
            frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [p.days_total]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #051422 0%, #0a2440 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>AGE CALC</span>
                <motion.span
                    key={`d-${idx}`}
                    initial={{ y: -4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        fontSize: 10, color: "white", fontWeight: 800,
                        background: "rgba(34,211,238,0.15)",
                        padding: "3px 9px", borderRadius: 99,
                        border: `1px solid rgba(34,211,238,0.4)`,
                        fontFamily: "ui-monospace, monospace",
                    }}
                >
                    {p.dob}
                </motion.span>
            </div>

            {/* Big age display */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
                {/* Years */}
                <motion.div
                    key={`y-${idx}`}
                    initial={{ scale: 0.7, opacity: 0, rotateY: -90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 16 }}
                    style={{
                        flex: 1.4,
                        background: `rgba(34,211,238,0.18)`,
                        border: `1px solid ${ACCENT}`,
                        borderRadius: 10,
                        padding: "12px 14px",
                        textAlign: "center",
                        boxShadow: `0 0 20px rgba(34,211,238,0.25)`,
                    }}
                >
                    <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em" }}>YEARS</div>
                    <div style={{
                        fontSize: 38, fontWeight: 900, color: ACCENT,
                        letterSpacing: "-0.04em", lineHeight: 1,
                        textShadow: `0 0 16px rgba(34,211,238,0.6)`,
                    }}>
                        {p.years}
                    </div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontWeight: 700, marginTop: 2 }}>
                        {p.months}m {p.days}d
                    </div>
                </motion.div>
                {/* Zodiac */}
                <motion.div
                    key={`z-${idx}`}
                    initial={{ scale: 0.6, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.15 }}
                    style={{
                        flex: 1,
                        background: "rgba(0,0,0,0.5)",
                        border: "1px solid rgba(34,211,238,0.25)",
                        borderRadius: 10,
                        padding: "10px 12px",
                        textAlign: "center",
                    }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 6, -6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            fontSize: 32,
                            color: ACCENT,
                            textShadow: `0 0 14px rgba(34,211,238,0.6)`,
                            lineHeight: 1,
                        }}
                    >
                        {p.emoji}
                    </motion.div>
                    <div style={{ fontSize: 10, color: "white", fontWeight: 800, marginTop: 4 }}>
                        {p.zodiac}
                    </div>
                </motion.div>
            </div>

            {/* Bottom — total days */}
            <div style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(34,211,238,0.18)",
                borderRadius: 6,
                padding: "5px 10px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontWeight: 800, letterSpacing: "0.1em" }}>
                    TOTAL DAYS LIVED
                </span>
                <motion.span
                    style={{
                        fontSize: 14, fontWeight: 900, color: ACCENT,
                        fontVariantNumeric: "tabular-nums",
                        textShadow: `0 0 8px rgba(34,211,238,0.4)`,
                        fontFamily: "ui-monospace, monospace",
                    }}
                >
                    {ticked.toLocaleString()}
                </motion.span>
            </div>
        </div>
    );
}
