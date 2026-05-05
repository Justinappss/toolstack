"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#fbbf24";

const SCENARIOS = [
    { loan: 250000, rate: 5.5, years: 25, monthly: 1535, principal: 41, interest: 59 },
    { loan: 320000, rate: 4.8, years: 30, monthly: 1681, principal: 52, interest: 48 },
    { loan: 180000, rate: 6.2, years: 20, monthly: 1308, principal: 44, interest: 56 },
    { loan: 425000, rate: 5.2, years: 25, monthly: 2540, principal: 43, interest: 57 },
];

export function MortgageCalculatorThumbnail() {
    const [idx, setIdx] = useState(0);
    const s = SCENARIOS[idx];
    const [tickedMonthly, setTickedMonthly] = useState(s.monthly);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SCENARIOS.length), 3000);
        return () => clearInterval(id);
    }, []);

    // Tick monthly toward target
    useEffect(() => {
        const target = s.monthly;
        let frame: number;
        const step = () => {
            setTickedMonthly(curr => {
                const diff = target - curr;
                if (Math.abs(diff) < 5) return target;
                return Math.round(curr + diff * 0.18);
            });
            frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [s.monthly]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a1100 0%, #2a1a05 100%)",
            padding: "14px 16px",
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
            {/* Top label */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.2em" }}>MORTGAGE</span>
                <motion.span
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                    style={{
                        fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 800,
                        background: "rgba(251,191,36,0.15)", padding: "3px 8px",
                        borderRadius: 4, letterSpacing: "0.08em",
                        border: `1px solid rgba(251,191,36,0.3)`,
                    }}
                >
                    {s.years}YR · {s.rate}%
                </motion.span>
            </div>

            {/* Main area: pie + monthly */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* Pie chart */}
                <div style={{ position: "relative", width: 86, height: 86, flexShrink: 0 }}>
                    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(251,191,36,0.18)" strokeWidth="13" />
                        <motion.circle
                            cx="50" cy="50" r="42" fill="none"
                            stroke={ACCENT} strokeWidth="13"
                            strokeDasharray={`${2 * Math.PI * 42}`}
                            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - s.principal / 100) }}
                            transition={{ duration: 0.9, ease: "easeInOut" }}
                            style={{ filter: `drop-shadow(0 0 6px ${ACCENT})` }}
                        />
                    </svg>
                    <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexDirection: "column",
                    }}>
                        <span style={{ fontSize: 18, fontWeight: 900, color: ACCENT, lineHeight: 1, textShadow: `0 0 10px rgba(251,191,36,0.4)` }}>
                            {s.principal}%
                        </span>
                        <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: "0.08em", marginTop: 2 }}>PRINCIPAL</span>
                    </div>
                </div>

                {/* Monthly payment */}
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.16em", marginBottom: 3 }}>
                        MONTHLY PAYMENT
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                        <span style={{ fontSize: 14, color: ACCENT, fontWeight: 700 }}>£</span>
                        <motion.span
                            style={{
                                fontSize: 28, fontWeight: 900, color: ACCENT, letterSpacing: "-0.02em",
                                textShadow: `0 0 14px rgba(251,191,36,0.5)`,
                                lineHeight: 1,
                            }}
                        >
                            {tickedMonthly.toLocaleString()}
                        </motion.span>
                    </div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", marginTop: 4, fontWeight: 600 }}>
                        on £{s.loan.toLocaleString()} loan
                    </div>
                </div>
            </div>

            {/* Bottom — interest vs principal split bar */}
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", marginBottom: 4 }}>
                    <span style={{ color: ACCENT }}>● Principal {s.principal}%</span>
                    <span style={{ color: "#f97316" }}>● Interest {s.interest}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, overflow: "hidden", display: "flex", background: "rgba(251,191,36,0.15)" }}>
                    <motion.div
                        animate={{ width: `${s.principal}%` }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        style={{ height: "100%", background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
                    />
                    <motion.div
                        animate={{ width: `${s.interest}%` }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        style={{ height: "100%", background: "#f97316" }}
                    />
                </div>
            </div>
        </div>
    );
}
