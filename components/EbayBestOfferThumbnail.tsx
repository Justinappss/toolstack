"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#3b82f6";

const OFFERS = [
    { listed: 120, offer: 95, breakeven: 78, decision: "ACCEPT", color: "#22c55e", profit: 17 },
    { listed: 240, offer: 165, breakeven: 180, decision: "DECLINE", color: "#ef4444", profit: -15 },
    { listed: 80, offer: 62, breakeven: 55, decision: "COUNTER", color: "#f59e0b", counter: 70, profit: 7 },
    { listed: 320, offer: 280, breakeven: 215, decision: "ACCEPT", color: "#22c55e", profit: 65 },
];

export function EbayBestOfferThumbnail() {
    const [idx, setIdx] = useState(0);
    const o = OFFERS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % OFFERS.length), 2700);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            position: "relative", overflow: "hidden",
            background: "#06070d",
        }}>
            <img
                src="/tools/ebay-best-offer-calculator-preview.png"
                alt="eBay Best Offer preview"
                style={{
                    width: "100%", height: 220,
                    objectFit: "cover", objectPosition: "top center",
                    display: "block",
                }}
            />

            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.85) 100%)",
                pointerEvents: "none",
            }} />

            {/* Top — listing + offer */}
            <motion.div
                key={`o-${idx}`}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
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
                    padding: "4px 9px", borderRadius: 99,
                    border: `1px solid rgba(255,255,255,0.18)`,
                    letterSpacing: "0.06em",
                    fontFamily: "Inter, sans-serif",
                }}>
                    LISTED ${o.listed}
                </span>
                <motion.span
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    style={{
                        fontSize: 9, fontWeight: 900,
                        background: `rgba(59,130,246,0.85)`,
                        color: "white",
                        padding: "4px 9px", borderRadius: 99,
                        boxShadow: `0 0 12px rgba(59,130,246,0.5)`,
                        letterSpacing: "0.06em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    OFFER ${o.offer}
                </motion.span>
            </motion.div>

            {/* Center — big decision */}
            <motion.div
                key={`d-${idx}`}
                initial={{ scale: 0.6, opacity: 0, y: 8 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                style={{
                    position: "absolute",
                    top: "44%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: `${o.color}20`,
                    backdropFilter: "blur(12px)",
                    border: `2px solid ${o.color}`,
                    borderRadius: 12,
                    padding: "8px 18px",
                    boxShadow: `0 0 24px ${o.color}80`,
                    zIndex: 4,
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 18, fontWeight: 900,
                        color: o.color,
                        letterSpacing: "0.15em",
                        textShadow: `0 0 14px ${o.color}`,
                        textAlign: "center",
                    }}
                >
                    {o.decision === "ACCEPT" ? "✓ ACCEPT" : o.decision === "DECLINE" ? "✗ DECLINE" : "↔ COUNTER"}
                </motion.div>
                {o.counter && (
                    <div style={{
                        fontSize: 10, fontWeight: 800, color: "white",
                        marginTop: 2, textAlign: "center", letterSpacing: "0.06em",
                    }}>
                        @ ${o.counter}
                    </div>
                )}
            </motion.div>

            {/* Bottom — profit calc */}
            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.25 }}
                style={{
                    position: "absolute", bottom: 12, left: 12, right: 12,
                    background: "rgba(6,7,13,0.92)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${o.color}`,
                    borderRadius: 10,
                    padding: "8px 12px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    boxShadow: `0 8px 24px ${o.color}40`,
                    zIndex: 4,
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <div>
                    <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.55)", fontWeight: 900, letterSpacing: "0.16em" }}>BREAK-EVEN</div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: "white" }}>${o.breakeven}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 7.5, color: o.color, fontWeight: 900, letterSpacing: "0.16em" }}>NET PROFIT</div>
                    <motion.div
                        key={`p-${idx}`}
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 280 }}
                        style={{
                            fontSize: 16, fontWeight: 900, color: o.color,
                            textShadow: `0 0 10px ${o.color}80`,
                        }}
                    >
                        {o.profit > 0 ? "+" : ""}${o.profit}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
