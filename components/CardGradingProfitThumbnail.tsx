"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#f59e0b";

const SCENARIOS = [
    { card: "Mike Trout '11", raw: 42, graded: 480, grade: "PSA 10", company: "PSA", profit: 388 },
    { card: "Tom Brady RC", raw: 180, graded: 2400, grade: "BGS 9.5", company: "BGS", profit: 2120 },
    { card: "Charizard 1st", raw: 320, graded: 6800, grade: "PSA 10", company: "PSA", profit: 6380 },
    { card: "LeBron Topps", raw: 95, graded: 1100, grade: "SGC 10", company: "SGC", profit: 905 },
];

export function CardGradingProfitThumbnail() {
    const [idx, setIdx] = useState(0);
    const s = SCENARIOS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SCENARIOS.length), 2900);
        return () => clearInterval(id);
    }, []);

    const roi = Math.round(((s.profit) / s.raw) * 100);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a0d00 0%, #2a1a05 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>GRADING ROI</span>
                <motion.span
                    key={`c-${idx}`}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    style={{
                        fontSize: 10, fontWeight: 900, color: "white",
                        background: "rgba(245,158,11,0.18)",
                        padding: "3px 9px", borderRadius: 99,
                        border: `1px solid ${ACCENT}`,
                        letterSpacing: "0.04em",
                    }}
                >
                    {s.card}
                </motion.span>
            </div>

            {/* Card transformation */}
            <div style={{ flex: 1, display: "flex", alignItems: "stretch", gap: 8 }}>
                {/* Raw card */}
                <motion.div
                    key={`r-${idx}`}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    style={{
                        flex: 1,
                        background: "rgba(0,0,0,0.45)",
                        border: "1px solid rgba(245,158,11,0.2)",
                        borderRadius: 8,
                        padding: "8px 10px",
                        display: "flex", flexDirection: "column", justifyContent: "space-between",
                    }}
                >
                    <div>
                        <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.16em" }}>RAW</div>
                        <div style={{
                            background: "linear-gradient(135deg, #4a3000, #2a1a05)",
                            borderRadius: 4, padding: "8px 0",
                            marginTop: 5, marginBottom: 5,
                            textAlign: "center",
                            border: "1px solid rgba(255,255,255,0.08)",
                            fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 700,
                        }}>
                            🃏 ungraded
                        </div>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "white", textAlign: "center" }}>
                        ${s.raw}
                    </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 26, fontSize: 18, color: ACCENT, fontWeight: 900,
                        textShadow: `0 0 10px ${ACCENT}`,
                    }}
                >
                    →
                </motion.div>

                {/* Graded card */}
                <motion.div
                    key={`g-${idx}`}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        flex: 1,
                        background: `rgba(245,158,11,0.18)`,
                        border: `1px solid ${ACCENT}`,
                        borderRadius: 8,
                        padding: "8px 10px",
                        display: "flex", flexDirection: "column", justifyContent: "space-between",
                        boxShadow: `0 0 14px rgba(245,158,11,0.25)`,
                    }}
                >
                    <div>
                        <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>GRADED</div>
                        <motion.div
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.4, stiffness: 280 }}
                            style={{
                                background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                                borderRadius: 4, padding: "6px 0",
                                marginTop: 5, marginBottom: 5,
                                textAlign: "center",
                                fontSize: 10, color: "#1a0d00", fontWeight: 900,
                                letterSpacing: "0.05em",
                                boxShadow: `0 0 10px ${ACCENT}`,
                            }}
                        >
                            🏆 {s.grade}
                        </motion.div>
                    </div>
                    <div style={{
                        fontSize: 18, fontWeight: 900, color: ACCENT,
                        textAlign: "center", letterSpacing: "-0.01em",
                        textShadow: `0 0 12px rgba(245,158,11,0.5)`,
                    }}>
                        ${s.graded}
                    </div>
                </motion.div>
            </div>

            {/* Bottom — profit + ROI */}
            <div style={{ display: "flex", gap: 6 }}>
                <div style={{
                    flex: 1,
                    background: "rgba(34,197,94,0.18)",
                    border: "1px solid rgba(34,197,94,0.4)",
                    borderRadius: 6,
                    padding: "5px 10px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                    <span style={{ fontSize: 8.5, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em" }}>PROFIT</span>
                    <motion.span
                        key={`p-${idx}`}
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.5 }}
                        style={{ fontSize: 13, fontWeight: 900, color: "#22c55e", textShadow: `0 0 8px rgba(34,197,94,0.5)` }}
                    >
                        +${s.profit}
                    </motion.span>
                </div>
                <div style={{
                    background: `rgba(245,158,11,0.2)`,
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 6,
                    padding: "5px 10px",
                    display: "flex", alignItems: "center", gap: 5,
                }}>
                    <span style={{ fontSize: 8.5, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em" }}>ROI</span>
                    <motion.span
                        key={`r-${idx}`}
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.55 }}
                        style={{ fontSize: 13, fontWeight: 900, color: ACCENT, textShadow: `0 0 8px rgba(245,158,11,0.5)` }}
                    >
                        {roi.toLocaleString()}%
                    </motion.span>
                </div>
            </div>
        </div>
    );
}
