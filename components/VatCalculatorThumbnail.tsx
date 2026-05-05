"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#fbbf24";

const SCENARIOS = [
    { country: "🇬🇧 UK", rate: 20, net: 100 },
    { country: "🇩🇪 Germany", rate: 19, net: 250 },
    { country: "🇫🇷 France", rate: 20, net: 480 },
    { country: "🇮🇪 Ireland", rate: 23, net: 75 },
    { country: "🇮🇹 Italy", rate: 22, net: 320 },
];

export function VatCalculatorThumbnail() {
    const [idx, setIdx] = useState(0);
    const s = SCENARIOS[idx];
    const vat = +(s.net * s.rate / 100).toFixed(2);
    const gross = +(s.net + vat).toFixed(2);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SCENARIOS.length), 2400);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a1100 0%, #2a1a05 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 10,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em" }}>VAT</span>
                <motion.div
                    key={idx}
                    initial={{ y: -4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontSize: 10, color: "white", fontWeight: 800,
                        background: "rgba(251,191,36,0.18)",
                        padding: "3px 9px", borderRadius: 99,
                        border: `1px solid rgba(251,191,36,0.35)`,
                    }}
                >
                    {s.country} · {s.rate}%
                </motion.div>
            </div>

            {/* Net → Gross flow */}
            <div style={{ flex: 1, display: "flex", alignItems: "stretch", gap: 6 }}>
                <div style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.45)",
                    border: `1px solid rgba(251,191,36,0.25)`,
                    borderRadius: 8,
                    padding: "10px 12px",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                    <span style={{ fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em" }}>NET</span>
                    <motion.div
                        key={`n-${idx}`}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 14 }}
                        style={{
                            fontSize: 22, fontWeight: 900, color: "white",
                            letterSpacing: "-0.02em", lineHeight: 1,
                        }}
                    >
                        £{s.net}
                    </motion.div>
                </div>
                <motion.div
                    animate={{ x: [-3, 3, -3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 28, fontSize: 22, fontWeight: 900,
                        color: ACCENT,
                        textShadow: `0 0 10px ${ACCENT}`,
                    }}
                >
                    →
                </motion.div>
                <div style={{
                    flex: 1.1,
                    background: `rgba(251,191,36,0.15)`,
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 8,
                    padding: "10px 12px",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    boxShadow: `0 0 16px rgba(251,191,36,0.25)`,
                }}>
                    <span style={{ fontSize: 8, fontWeight: 900, color: ACCENT, letterSpacing: "0.14em" }}>GROSS</span>
                    <motion.div
                        key={`g-${idx}`}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.15 }}
                        style={{
                            fontSize: 24, fontWeight: 900, color: ACCENT,
                            letterSpacing: "-0.02em", lineHeight: 1,
                            textShadow: `0 0 12px rgba(251,191,36,0.45)`,
                        }}
                    >
                        £{gross}
                    </motion.div>
                </div>
            </div>

            {/* Bottom — VAT breakdown */}
            <div style={{
                background: "rgba(0,0,0,0.4)",
                borderRadius: 6,
                padding: "6px 10px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
                    + VAT @ {s.rate}%
                </span>
                <motion.span
                    key={`v-${idx}`}
                    initial={{ y: -3, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    style={{
                        fontSize: 12, fontWeight: 900, color: ACCENT,
                        textShadow: `0 0 8px rgba(251,191,36,0.4)`,
                    }}
                >
                    £{vat}
                </motion.span>
            </div>
        </div>
    );
}
