"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#4ade80";
const RED = "#ef4444";

const SITES = [
    { url: "stripe.com", status: 200, ms: 142, up: true },
    { url: "github.com", status: 200, ms: 98, up: true },
    { url: "old-server.io", status: 503, ms: 4200, up: false },
    { url: "vercel.app", status: 200, ms: 67, up: true },
];

export function WebsiteDownThumbnail() {
    const [idx, setIdx] = useState(0);
    const [history, setHistory] = useState<boolean[]>([true, true, false, true, true, true, true, true, true, true]);
    const s = SITES[idx];

    useEffect(() => {
        const id = setInterval(() => {
            setIdx(i => (i + 1) % SITES.length);
            setHistory(h => {
                const next = [...h.slice(1), Math.random() > 0.15];
                return next;
            });
        }, 2200);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #051410 0%, #0a2018 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: s.up ? ACCENT : RED,
                            boxShadow: `0 0 10px ${s.up ? ACCENT : RED}`,
                        }}
                    />
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>UPTIME MONITOR</span>
                </div>
                <motion.span
                    key={`u-${idx}`}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    style={{
                        fontSize: 10, fontWeight: 900,
                        color: s.up ? ACCENT : RED,
                        background: s.up ? "rgba(74,222,128,0.15)" : "rgba(239,68,68,0.15)",
                        padding: "3px 9px", borderRadius: 99,
                        border: `1px solid ${s.up ? "rgba(74,222,128,0.4)" : "rgba(239,68,68,0.4)"}`,
                        letterSpacing: "0.1em",
                    }}
                >
                    {s.up ? "✓ UP" : "✗ DOWN"}
                </motion.span>
            </div>

            {/* URL bar */}
            <motion.div
                key={`url-${idx}`}
                initial={{ x: -6, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                style={{
                    background: "rgba(0,0,0,0.5)",
                    border: `1px solid rgba(74,222,128,0.25)`,
                    borderRadius: 6,
                    padding: "7px 10px",
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "ui-monospace, monospace",
                }}
            >
                <span style={{ color: s.up ? ACCENT : RED, fontWeight: 900 }}>●</span>
                <span style={{ fontSize: 11, color: "white", fontWeight: 800, flex: 1 }}>{s.url}</span>
                <span style={{
                    fontSize: 10, fontWeight: 900,
                    color: s.up ? ACCENT : RED,
                    fontVariantNumeric: "tabular-nums",
                }}>
                    {s.status}
                </span>
            </motion.div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 6 }}>
                <div style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(74,222,128,0.18)",
                    borderRadius: 6,
                    padding: "6px 9px",
                }}>
                    <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.55)", fontWeight: 800, letterSpacing: "0.12em" }}>RESPONSE</div>
                    <div style={{
                        fontSize: 14, fontWeight: 900,
                        color: s.ms < 500 ? ACCENT : RED,
                        textShadow: `0 0 8px ${s.ms < 500 ? "rgba(74,222,128,0.4)" : "rgba(239,68,68,0.4)"}`,
                        fontFamily: "ui-monospace, monospace",
                    }}>
                        {s.ms}ms
                    </div>
                </div>
                <div style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(74,222,128,0.18)",
                    borderRadius: 6,
                    padding: "6px 9px",
                }}>
                    <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.55)", fontWeight: 800, letterSpacing: "0.12em" }}>UPTIME 30d</div>
                    <div style={{
                        fontSize: 14, fontWeight: 900, color: ACCENT,
                        textShadow: `0 0 8px rgba(74,222,128,0.4)`,
                        fontFamily: "ui-monospace, monospace",
                    }}>
                        99.94%
                    </div>
                </div>
            </div>

            {/* History bars */}
            <div>
                <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.16em", marginBottom: 4 }}>
                    LAST 10 CHECKS
                </div>
                <div style={{ display: "flex", gap: 3, height: 18 }}>
                    {history.map((up, i) => (
                        <motion.div
                            key={`${i}-${up}`}
                            initial={{ scaleY: 0.4, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            transition={{ duration: 0.25, delay: i * 0.03 }}
                            style={{
                                flex: 1,
                                background: up ? ACCENT : RED,
                                borderRadius: 2,
                                boxShadow: up ? `0 0 4px ${ACCENT}` : `0 0 4px ${RED}`,
                                opacity: 0.4 + (i / history.length) * 0.6,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
