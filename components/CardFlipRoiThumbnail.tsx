"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#10b981";

const FLIPS = [
    { card: "Patrick Mahomes RC", buy: 85, sell: 220, fees: 31, profit: 104, roi: 122 },
    { card: "Pikachu Holo Promo", buy: 45, sell: 180, fees: 24, profit: 111, roi: 247 },
    { card: "Luka Doncic SP", buy: 320, sell: 750, fees: 110, profit: 320, roi: 100 },
    { card: "Charizard 1st Ed", buy: 950, sell: 2200, fees: 305, profit: 945, roi: 99 },
];

export function CardFlipRoiThumbnail() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % FLIPS.length), 2700);
        return () => clearInterval(id);
    }, []);

    const f = FLIPS[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #051410 0%, #0a2018 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>FLIP ROI</span>
                <motion.span
                    key={`c-${idx}`}
                    initial={{ x: -6, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    style={{
                        fontSize: 10, color: "white", fontWeight: 800,
                        background: "rgba(16,185,129,0.18)",
                        padding: "3px 9px", borderRadius: 99,
                        border: `1px solid ${ACCENT}`,
                    }}
                >
                    {f.card}
                </motion.span>
            </div>

            {/* Buy → Sell flow */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <motion.div
                    key={`b-${idx}`}
                    initial={{ y: 6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        flex: 1,
                        background: "rgba(0,0,0,0.45)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        borderRadius: 6,
                        padding: "6px 10px",
                    }}
                >
                    <div style={{ fontSize: 7.5, color: "#ef4444", fontWeight: 900, letterSpacing: "0.14em" }}>BUY</div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "white", lineHeight: 1.1 }}>
                        ${f.buy}
                    </div>
                </motion.div>
                <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ fontSize: 14, color: ACCENT, fontWeight: 900, textShadow: `0 0 8px ${ACCENT}` }}
                >
                    →
                </motion.span>
                <motion.div
                    key={`s-${idx}`}
                    initial={{ y: 6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    style={{
                        flex: 1,
                        background: `rgba(16,185,129,0.18)`,
                        border: `1px solid ${ACCENT}`,
                        borderRadius: 6,
                        padding: "6px 10px",
                        boxShadow: `0 0 10px rgba(16,185,129,0.2)`,
                    }}
                >
                    <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.14em" }}>SELL</div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: ACCENT, lineHeight: 1.1, textShadow: `0 0 8px rgba(16,185,129,0.4)` }}>
                        ${f.sell}
                    </div>
                </motion.div>
            </div>

            {/* Fees breakdown */}
            <div style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(16,185,129,0.15)",
                borderRadius: 6,
                padding: "6px 10px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: 9,
            }}>
                <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>
                    eBay 12.9% + ship + cost
                </span>
                <motion.span
                    key={`f-${idx}`}
                    initial={{ y: -2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ color: "#ef4444", fontWeight: 900 }}
                >
                    -${f.fees}
                </motion.span>
            </div>

            {/* Profit + ROI cards */}
            <div style={{ flex: 1, display: "flex", gap: 6 }}>
                <motion.div
                    key={`p-${idx}`}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, delay: 0.45 }}
                    style={{
                        flex: 1,
                        background: `rgba(16,185,129,0.2)`,
                        border: `1px solid ${ACCENT}`,
                        borderRadius: 8,
                        padding: "8px 12px",
                        display: "flex", flexDirection: "column", justifyContent: "center",
                        boxShadow: `0 0 14px rgba(16,185,129,0.25)`,
                    }}
                >
                    <div style={{ fontSize: 8, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>NET PROFIT</div>
                    <div style={{
                        fontSize: 22, fontWeight: 900, color: ACCENT,
                        lineHeight: 1, letterSpacing: "-0.02em",
                        textShadow: `0 0 12px rgba(16,185,129,0.5)`,
                    }}>
                        +${f.profit}
                    </div>
                </motion.div>
                <motion.div
                    key={`r-${idx}`}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, delay: 0.55 }}
                    style={{
                        flex: 1,
                        background: "rgba(0,0,0,0.5)",
                        border: "1px solid rgba(16,185,129,0.3)",
                        borderRadius: 8,
                        padding: "8px 12px",
                        display: "flex", flexDirection: "column", justifyContent: "center",
                    }}
                >
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.55)", fontWeight: 900, letterSpacing: "0.16em" }}>ROI</div>
                    <div style={{
                        fontSize: 22, fontWeight: 900, color: "white",
                        lineHeight: 1, letterSpacing: "-0.02em",
                    }}>
                        {f.roi}%
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
