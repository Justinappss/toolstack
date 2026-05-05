"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#fbbf24";

const SCENARIOS = [
    { gross: 45000, tax: 6486, ni: 3194, net: 35320, country: "🇬🇧 UK" },
    { gross: 75000, tax: 16432, ni: 5044, net: 53524, country: "🇬🇧 UK" },
    { gross: 95000, tax: 23932, ni: 5644, net: 65424, country: "🇬🇧 UK" },
    { gross: 60000, tax: 8800, ni: 3500, net: 47700, country: "🇺🇸 US" },
    { gross: 120000, tax: 28500, ni: 8200, net: 83300, country: "🇺🇸 US" },
];

export function SalaryCalculatorThumbnail() {
    const [idx, setIdx] = useState(0);
    const s = SCENARIOS[idx];
    const total = s.gross;
    const taxPct = (s.tax / total) * 100;
    const niPct = (s.ni / total) * 100;
    const netPct = (s.net / total) * 100;

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SCENARIOS.length), 2800);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a1100 0%, #2a1a05 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>SALARY → TAKE-HOME</span>
                <motion.span
                    key={idx}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    style={{
                        fontSize: 10, fontWeight: 800, color: "white",
                        background: "rgba(251,191,36,0.18)",
                        padding: "3px 9px", borderRadius: 99,
                        border: `1px solid rgba(251,191,36,0.35)`,
                    }}
                >
                    {s.country}
                </motion.span>
            </div>

            {/* Gross input bar */}
            <div style={{
                background: "rgba(0,0,0,0.45)",
                border: `1px solid rgba(251,191,36,0.25)`,
                borderRadius: 8,
                padding: "8px 11px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontWeight: 800, letterSpacing: "0.12em" }}>GROSS</span>
                <motion.span
                    key={`g-${idx}`}
                    initial={{ y: -3, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        fontSize: 14, fontWeight: 800, color: "white",
                    }}
                >
                    £{s.gross.toLocaleString()}
                </motion.span>
            </div>

            {/* Stacked deductions bar */}
            <div>
                <div style={{ height: 18, borderRadius: 6, overflow: "hidden", display: "flex", background: "rgba(251,191,36,0.1)" }}>
                    <motion.div
                        animate={{ width: `${taxPct}%` }}
                        transition={{ duration: 0.7 }}
                        style={{
                            height: "100%",
                            background: `linear-gradient(180deg, #ef4444, #b91c1c)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 8.5, fontWeight: 900, color: "white", letterSpacing: "0.06em",
                        }}
                    >
                        TAX
                    </motion.div>
                    <motion.div
                        animate={{ width: `${niPct}%` }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        style={{
                            height: "100%",
                            background: `linear-gradient(180deg, #f97316, #c2410c)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 8, fontWeight: 900, color: "white", letterSpacing: "0.06em",
                        }}
                    >
                        NI
                    </motion.div>
                    <motion.div
                        animate={{ width: `${netPct}%` }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{
                            height: "100%",
                            background: `linear-gradient(180deg, ${ACCENT}, #d97706)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 8.5, fontWeight: 900, color: "#1a1100", letterSpacing: "0.06em",
                            boxShadow: `0 0 10px ${ACCENT}`,
                        }}
                    >
                        TAKE HOME
                    </motion.div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 8.5, fontWeight: 800 }}>
                    <span style={{ color: "#ef4444" }}>£{s.tax.toLocaleString()}</span>
                    <span style={{ color: "#f97316" }}>£{s.ni.toLocaleString()}</span>
                    <span style={{ color: ACCENT }}>£{s.net.toLocaleString()}</span>
                </div>
            </div>

            {/* Big take-home */}
            <div style={{
                flex: 1,
                background: `rgba(251,191,36,0.18)`,
                border: `1px solid ${ACCENT}`,
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: `0 0 20px rgba(251,191,36,0.25)`,
            }}>
                <div>
                    <div style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em" }}>NET / YEAR</div>
                    <motion.div
                        key={`n-${idx}`}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.15 }}
                        style={{
                            fontSize: 22, fontWeight: 900, color: ACCENT,
                            lineHeight: 1.1, letterSpacing: "-0.02em",
                            textShadow: `0 0 12px rgba(251,191,36,0.45)`,
                        }}
                    >
                        £{s.net.toLocaleString()}
                    </motion.div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.55)", fontWeight: 700, letterSpacing: "0.1em" }}>PER MONTH</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "white", marginTop: 2 }}>
                        £{Math.round(s.net / 12).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
