"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#38bdf8";

function format(ms: number) {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms / 1000) % 60);
    const cs = Math.floor((ms % 1000) / 10);
    return { m, s, cs };
}

export function StopwatchThumbnail() {
    const [ms, setMs] = useState(0);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let last = Date.now();
        let nextLap = 4500;
        const id = setInterval(() => {
            const now = Date.now();
            const delta = now - last;
            last = now;
            setMs(prev => {
                const newMs = prev + delta;
                if (newMs >= nextLap) {
                    setLaps(l => [newMs, ...l].slice(0, 3));
                    nextLap = newMs + 3500 + Math.random() * 2000;
                }
                if (newMs > 60000) return 0;
                return newMs;
            });
        }, 30);
        return () => clearInterval(id);
    }, []);

    const t = format(ms);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #051422 0%, #0a2440 100%)",
            padding: "14px 16px",
            display: "flex", gap: 12,
            position: "relative", overflow: "hidden",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}>
            {/* Left — clock */}
            <div style={{ flex: 1.3, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
                    />
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em" }}>RECORDING</span>
                </div>
                <div style={{
                    display: "flex", alignItems: "baseline", gap: 4,
                    fontSize: 38, fontWeight: 900, color: ACCENT,
                    letterSpacing: "-0.02em",
                    textShadow: `0 0 16px rgba(56,189,248,0.6)`,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                }}>
                    <span>{String(t.m).padStart(2, "0")}</span>
                    <span style={{ color: "rgba(56,189,248,0.5)" }}>:</span>
                    <span>{String(t.s).padStart(2, "0")}</span>
                    <span style={{ color: "rgba(56,189,248,0.5)" }}>.</span>
                    <span style={{ fontSize: 24, opacity: 0.85 }}>{String(t.cs).padStart(2, "0")}</span>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                    {[
                        { label: "STOP", color: "#ef4444" },
                        { label: "LAP", color: ACCENT },
                        { label: "RESET", color: "rgba(255,255,255,0.4)" },
                    ].map((b, i) => (
                        <motion.div key={b.label}
                            animate={i === 1 ? { scale: [1, 1.05, 1] } : {}}
                            transition={i === 1 ? { duration: 1.4, repeat: Infinity } : {}}
                            style={{
                                fontSize: 8.5, fontWeight: 900,
                                color: i === 1 ? "#051422" : "white",
                                background: i === 1 ? ACCENT : "rgba(255,255,255,0.06)",
                                border: `1px solid ${i === 1 ? ACCENT : "rgba(255,255,255,0.1)"}`,
                                padding: "5px 0", borderRadius: 5,
                                letterSpacing: "0.1em",
                                flex: 1, textAlign: "center",
                            }}
                        >
                            {b.label}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right — laps */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(255,255,255,0.5)", letterSpacing: "0.16em", marginBottom: 2 }}>LAPS</span>
                <div style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.5)",
                    border: `1px solid rgba(56,189,248,0.2)`,
                    borderRadius: 8,
                    padding: "6px 9px",
                    display: "flex", flexDirection: "column", gap: 4,
                }}>
                    {laps.length === 0 ? (
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontStyle: "italic", textAlign: "center", paddingTop: 14 }}>
                            press LAP to mark
                        </div>
                    ) : (
                        laps.map((l, i) => {
                            const ft = format(l);
                            return (
                                <motion.div
                                    key={l}
                                    initial={{ x: 16, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 - i * 0.2 }}
                                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                                    style={{
                                        display: "flex", justifyContent: "space-between",
                                        fontSize: 10, fontWeight: 700,
                                        color: i === 0 ? ACCENT : "rgba(255,255,255,0.6)",
                                    }}
                                >
                                    <span>#{laps.length - i}</span>
                                    <span style={{ fontVariantNumeric: "tabular-nums" }}>
                                        {String(ft.m).padStart(2, "0")}:{String(ft.s).padStart(2, "0")}.{String(ft.cs).padStart(2, "0")}
                                    </span>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
