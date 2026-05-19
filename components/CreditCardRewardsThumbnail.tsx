"use client";
import { useState, useEffect } from "react";

const A = "#f59e0b";

const SCENARIOS = [
    {
        label: "Business",
        spend: [
            { cat: "Advertising", amt: "$6,000/yr" },
            { cat: "Internet & Phone", amt: "$1,800/yr" },
            { cat: "Travel", amt: "$2,400/yr" },
        ],
        card: "Chase Ink Preferred",
        annual: "$563",
        current: "$144",
        gap: "$419",
    },
    {
        label: "Personal",
        spend: [
            { cat: "Dining", amt: "$4,800/yr" },
            { cat: "Travel", amt: "$3,600/yr" },
            { cat: "Groceries", amt: "$2,400/yr" },
        ],
        card: "Amex Gold Card",
        annual: "$612",
        current: "$108",
        gap: "$504",
    },
    {
        label: "Business",
        spend: [
            { cat: "Office Supplies", amt: "$3,600/yr" },
            { cat: "Shipping", amt: "$1,200/yr" },
            { cat: "Everything Else", amt: "$4,800/yr" },
        ],
        card: "Chase Ink Cash",
        annual: "$396",
        current: "$96",
        gap: "$300",
    },
];

export function CreditCardRewardsThumbnail() {
    const [idx, setIdx] = useState(0);
    const [phase, setPhase] = useState<"inputs" | "calculating" | "result">("inputs");
    const [dots, setDots] = useState(0);

    const s = SCENARIOS[idx];

    useEffect(() => {
        if (phase === "inputs") {
            const t = setTimeout(() => setPhase("calculating"), 1800);
            return () => clearTimeout(t);
        }
        if (phase === "calculating") {
            if (dots < 3) {
                const t = setTimeout(() => setDots(d => d + 1), 280);
                return () => clearTimeout(t);
            }
            const t = setTimeout(() => setPhase("result"), 300);
            return () => clearTimeout(t);
        }
        if (phase === "result") {
            const t = setTimeout(() => {
                setPhase("inputs");
                setDots(0);
                setIdx(i => (i + 1) % SCENARIOS.length);
            }, 2400);
            return () => clearTimeout(t);
        }
    }, [phase, dots]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #0a0800, #130e00)",
            padding: "12px 14px",
            display: "flex", flexDirection: "column", gap: 8,
            overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
            position: "relative",
        }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11 }}>💳</span>
                <span style={{ fontSize: 9, color: A, fontWeight: 900, letterSpacing: "0.16em" }}>REWARDS OPTIMISER</span>
                <div style={{
                    marginLeft: "auto",
                    background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)",
                    borderRadius: 4, padding: "1px 5px", fontSize: 8, fontWeight: 800, color: A,
                }}>
                    {s.label}
                </div>
            </div>

            {phase === "inputs" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    {s.spend.map((item, i) => (
                        <div key={i} style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 6, padding: "5px 9px",
                        }}>
                            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{item.cat}</span>
                            <span style={{ fontSize: 9, color: A, fontWeight: 800, fontFamily: "monospace" }}>{item.amt}</span>
                        </div>
                    ))}
                    <div style={{ marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.08em" }}>ANALYSING SPEND</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                    </div>
                </div>
            )}

            {phase === "calculating" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <div style={{
                        width: 26, height: 26,
                        border: `2px solid ${A}`, borderTopColor: "transparent",
                        borderRadius: "50%", animation: "ccSpin 0.65s linear infinite",
                    }} />
                    <span style={{ fontSize: 9, color: A, fontWeight: 800, letterSpacing: "0.12em" }}>
                        CALCULATING{".".repeat(dots)}
                    </span>
                    <style>{`@keyframes ccSpin { to { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            {phase === "result" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{
                        background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)",
                        borderRadius: 7, padding: "6px 10px",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                        <div>
                            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.45)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Best card</div>
                            <div style={{ fontSize: 9, color: "white", fontWeight: 800, marginTop: 1 }}>{s.card}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Annual value</div>
                            <div style={{ fontSize: 13, color: A, fontWeight: 900, fontFamily: "monospace" }}>{s.annual}</div>
                        </div>
                    </div>

                    <div style={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                        background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
                        borderRadius: 7, padding: "8px 10px", gap: 2,
                    }}>
                        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.45)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>You're leaving on the table</div>
                        <div style={{ fontSize: 30, fontWeight: 900, color: "#ef4444", fontFamily: "monospace", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                            {s.gap}<span style={{ fontSize: 13 }}>/yr</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
