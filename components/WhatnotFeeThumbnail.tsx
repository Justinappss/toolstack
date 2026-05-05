"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#f97316";

const SCENARIOS = [
    { sale: 100, commission: 8, processing: 2.50, net: 89.50, category: "Cards" },
    { sale: 250, commission: 20, processing: 5.50, net: 224.50, category: "Toys" },
    { sale: 80, commission: 6.40, processing: 2.00, net: 71.60, category: "Comics" },
    { sale: 420, commission: 33.60, processing: 8.30, net: 378.10, category: "Sneakers" },
];

export function WhatnotFeeThumbnail() {
    const [idx, setIdx] = useState(0);
    const s = SCENARIOS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SCENARIOS.length), 2700);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            position: "relative", overflow: "hidden",
            background: "#06070d",
        }}>
            <img
                src="/tools/whatnot-seller-fee-calculator-preview.png"
                alt="Whatnot Seller Fee preview"
                style={{
                    width: "100%", height: 220,
                    objectFit: "cover", objectPosition: "top center",
                    display: "block",
                }}
            />

            {/* Gradient darken overlay for legibility */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.85) 100%)",
                pointerEvents: "none",
            }} />

            {/* Live pulse */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", inset: 0, width: "30%",
                    background: `linear-gradient(90deg, transparent, rgba(249,115,22,0.18), transparent)`,
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                }}
            />

            {/* Top — category & sale */}
            <motion.div
                key={`c-${idx}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    position: "absolute", top: 12, left: 12, right: 12,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    zIndex: 4,
                }}
            >
                <span style={{
                    fontSize: 9, fontWeight: 900,
                    background: "rgba(0,0,0,0.7)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    padding: "4px 10px", borderRadius: 99,
                    border: `1px solid ${ACCENT}`,
                    letterSpacing: "0.06em",
                    fontFamily: "Inter, sans-serif",
                }}>
                    🛍 {s.category}
                </span>
                <motion.span
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 280 }}
                    style={{
                        fontSize: 9, fontWeight: 900,
                        background: "rgba(0,0,0,0.75)",
                        backdropFilter: "blur(10px)",
                        color: "white",
                        padding: "4px 10px", borderRadius: 99,
                        border: `1px solid rgba(255,255,255,0.2)`,
                        letterSpacing: "0.06em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    SALE: ${s.sale}
                </motion.span>
            </motion.div>

            {/* Bottom — fee breakdown bar + net */}
            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.25 }}
                style={{
                    position: "absolute", bottom: 12, left: 12, right: 12,
                    background: "rgba(6,7,13,0.92)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 10,
                    padding: "10px 12px",
                    boxShadow: `0 8px 24px rgba(249,115,22,0.3)`,
                    zIndex: 4,
                    display: "flex", flexDirection: "column", gap: 6,
                    fontFamily: "Inter, sans-serif",
                }}
            >
                {/* Stacked bar */}
                <div style={{ height: 14, borderRadius: 4, overflow: "hidden", display: "flex", background: "rgba(249,115,22,0.1)" }}>
                    <motion.div
                        animate={{ width: `${(s.commission / s.sale) * 100}%` }}
                        transition={{ duration: 0.6 }}
                        style={{
                            height: "100%",
                            background: `linear-gradient(180deg, #ef4444, #b91c1c)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 7, fontWeight: 900, color: "white", letterSpacing: "0.08em",
                        }}
                    >
                        WN
                    </motion.div>
                    <motion.div
                        animate={{ width: `${(s.processing / s.sale) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        style={{
                            height: "100%",
                            background: `linear-gradient(180deg, ${ACCENT}, #c2410c)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 7, fontWeight: 900, color: "white", letterSpacing: "0.08em",
                        }}
                    >
                        TX
                    </motion.div>
                    <motion.div
                        animate={{ width: `${(s.net / s.sale) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            height: "100%",
                            background: `linear-gradient(180deg, #22c55e, #15803d)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 7, fontWeight: 900, color: "white", letterSpacing: "0.08em",
                            boxShadow: `0 0 6px rgba(34,197,94,0.5)`,
                        }}
                    >
                        NET ${s.net.toFixed(0)}
                    </motion.div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 8.5, color: "rgba(255,255,255,0.55)", fontWeight: 800 }}>
                        Whatnot 8% + 2.5%+$0.25
                    </span>
                    <motion.span
                        key={`n-${idx}`}
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        style={{
                            fontSize: 16, fontWeight: 900, color: "#22c55e",
                            textShadow: `0 0 10px rgba(34,197,94,0.5)`,
                        }}
                    >
                        ${s.net.toFixed(2)}
                    </motion.span>
                </div>
            </motion.div>
        </div>
    );
}
