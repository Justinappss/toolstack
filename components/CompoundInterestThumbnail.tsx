"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#fbbf24";

const SCENARIOS = [
    { p: 5000, monthly: 200, rate: 8, years: 30, final: 365000 },
    { p: 10000, monthly: 500, rate: 7, years: 25, final: 480000 },
    { p: 2000, monthly: 100, rate: 9, years: 20, final: 89000 },
    { p: 25000, monthly: 1000, rate: 6, years: 15, final: 365000 },
];

export function CompoundInterestThumbnail() {
    const [idx, setIdx] = useState(0);
    const s = SCENARIOS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SCENARIOS.length), 3200);
        return () => clearInterval(id);
    }, []);

    // Build chart points
    const points: { x: number; y: number }[] = [];
    for (let yr = 0; yr <= s.years; yr++) {
        const monthlyRate = s.rate / 100 / 12;
        const months = yr * 12;
        const fvP = s.p * Math.pow(1 + monthlyRate, months);
        const fvM = s.monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        const total = fvP + fvM;
        points.push({ x: yr, y: total });
    }
    const maxY = points[points.length - 1].y;
    const path = points.map((p, i) => {
        const px = (p.x / s.years) * 100;
        const py = 100 - (p.y / maxY) * 100;
        return `${i === 0 ? "M" : "L"} ${px} ${py}`;
    }).join(" ");

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a1100 0%, #2a1a05 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontWeight: 800, letterSpacing: "0.16em" }}>FINAL VALUE</div>
                    <motion.div
                        key={`f-${idx}`}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 14 }}
                        style={{
                            fontSize: 24, fontWeight: 900, color: ACCENT,
                            lineHeight: 1, letterSpacing: "-0.02em",
                            textShadow: `0 0 14px rgba(251,191,36,0.5)`,
                        }}
                    >
                        £{(maxY / 1000).toFixed(0)}K
                    </motion.div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontWeight: 800, letterSpacing: "0.12em" }}>{s.years} YEARS · {s.rate}%</div>
                    <div style={{ fontSize: 9, color: ACCENT, fontWeight: 700, marginTop: 2 }}>+£{s.monthly}/mo</div>
                </div>
            </div>

            {/* Growth chart */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.4)",
                border: `1px solid rgba(251,191,36,0.2)`,
                borderRadius: 8,
                padding: "8px 10px",
                position: "relative",
                overflow: "hidden",
            }}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                    <defs>
                        <linearGradient id="grow" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    {[25, 50, 75].map(y => (
                        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(251,191,36,0.08)" strokeWidth="0.3" />
                    ))}
                    {/* Filled area */}
                    <motion.path
                        key={`area-${idx}`}
                        d={`${path} L 100 100 L 0 100 Z`}
                        fill="url(#grow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    {/* Line */}
                    <motion.path
                        key={`line-${idx}`}
                        d={path}
                        fill="none"
                        stroke={ACCENT}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        style={{ filter: `drop-shadow(0 0 4px ${ACCENT})` }}
                    />
                    {/* End dot */}
                    <motion.circle
                        key={`dot-${idx}`}
                        cx="100" cy={100 - (points[points.length - 1].y / maxY) * 100}
                        r="2" fill={ACCENT}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: [0, 1.4, 1] }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                        style={{ filter: `drop-shadow(0 0 6px ${ACCENT})` }}
                    />
                </svg>
                {/* Axis labels */}
                <div style={{ position: "absolute", left: 10, bottom: 4, fontSize: 7, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>YR 0</div>
                <div style={{ position: "absolute", right: 10, bottom: 4, fontSize: 7, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>YR {s.years}</div>
            </div>

            {/* Bottom — input recap */}
            <div style={{
                display: "flex", gap: 6,
                fontSize: 9, fontWeight: 700,
            }}>
                <div style={{ flex: 1, background: "rgba(251,191,36,0.08)", borderRadius: 5, padding: "4px 7px", border: "1px solid rgba(251,191,36,0.18)", textAlign: "center" }}>
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>start </span>
                    <span style={{ color: "white", fontWeight: 800 }}>£{s.p.toLocaleString()}</span>
                </div>
                <div style={{ flex: 1, background: "rgba(251,191,36,0.08)", borderRadius: 5, padding: "4px 7px", border: "1px solid rgba(251,191,36,0.18)", textAlign: "center" }}>
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>+ </span>
                    <span style={{ color: ACCENT, fontWeight: 800 }}>£{((maxY - s.p - s.monthly * s.years * 12) / 1000).toFixed(0)}K</span>
                    <span style={{ color: "rgba(255,255,255,0.5)" }}> int</span>
                </div>
            </div>
        </div>
    );
}
