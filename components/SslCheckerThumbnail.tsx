"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#34d399";

const DOMAINS = [
    { domain: "toolstack.tech", issuer: "Let's Encrypt", days: 87 },
    { domain: "stripe.com", issuer: "DigiCert SHA2", days: 312 },
    { domain: "vercel.app", issuer: "Let's Encrypt", days: 64 },
    { domain: "github.com", issuer: "Sectigo Limited", days: 248 },
];

const CHECKS = [
    "Establishing TLS connection",
    "Validating certificate chain",
    "Checking expiry & SAN",
    "Verifying issuer & serial",
];

export function SslCheckerThumbnail() {
    const [idx, setIdx] = useState(0);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step < CHECKS.length) {
            const id = setTimeout(() => setStep(s => s + 1), 320);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => {
            setStep(0);
            setIdx(i => (i + 1) % DOMAINS.length);
        }, 1900);
        return () => clearTimeout(id);
    }, [step]);

    const d = DOMAINS[idx];
    const complete = step >= CHECKS.length;

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #061613 0%, #0a2620 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>SSL CHECK</span>
                <motion.div
                    animate={{ scale: complete ? [1, 1.15, 1] : 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        fontSize: 9, fontWeight: 900,
                        color: complete ? "#22c55e" : ACCENT,
                        background: complete ? "rgba(34,197,94,0.15)" : "rgba(52,211,153,0.15)",
                        padding: "3px 9px", borderRadius: 99,
                        border: `1px solid ${complete ? "rgba(34,197,94,0.3)" : "rgba(52,211,153,0.3)"}`,
                        letterSpacing: "0.1em",
                    }}
                >
                    🔒 {complete ? "VALID" : "CHECKING"}
                </motion.div>
            </div>

            {/* Domain bar */}
            <div style={{
                background: "rgba(0,0,0,0.5)",
                border: `1px solid rgba(52,211,153,0.25)`,
                borderRadius: 6,
                padding: "7px 10px",
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "ui-monospace, monospace",
            }}>
                <span style={{ color: ACCENT, fontWeight: 800, fontSize: 11 }}>https://</span>
                <motion.span
                    key={`u-${idx}`}
                    initial={{ x: -4, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    style={{ fontSize: 11, color: "white", fontWeight: 700, flex: 1 }}
                >
                    {d.domain}
                </motion.span>
                <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                        fontSize: 8.5, color: ACCENT, fontWeight: 900,
                        background: "rgba(52,211,153,0.15)",
                        padding: "2px 6px", borderRadius: 4,
                        letterSpacing: "0.08em",
                    }}
                >
                    SCAN
                </motion.span>
            </div>

            {/* Check list */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(52,211,153,0.15)",
                borderRadius: 6,
                padding: "8px 10px",
                display: "flex", flexDirection: "column", gap: 5,
            }}>
                {CHECKS.map((c, i) => {
                    const done = i < step;
                    const active = i === step && !complete;
                    return (
                        <motion.div key={c}
                            animate={{
                                opacity: done || active ? 1 : 0.35,
                            }}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                fontSize: 9.5,
                                color: done ? ACCENT : active ? "white" : "rgba(255,255,255,0.4)",
                                fontWeight: done ? 800 : 600,
                            }}
                        >
                            {active ? (
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    style={{ fontSize: 10 }}
                                >
                                    ⟳
                                </motion.span>
                            ) : (
                                <span>{done ? "✓" : "○"}</span>
                            )}
                            <span>{c}</span>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom — cert details (shown when complete) */}
            <motion.div
                animate={{ opacity: complete ? 1 : 0.3 }}
                style={{
                    display: "flex", gap: 6,
                    fontSize: 9, fontWeight: 700,
                }}
            >
                <div style={{ flex: 1, background: "rgba(52,211,153,0.08)", borderRadius: 5, padding: "4px 7px", border: "1px solid rgba(52,211,153,0.18)" }}>
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>Issuer </span>
                    <span style={{ color: "white", fontWeight: 800 }}>{d.issuer}</span>
                </div>
                <div style={{ background: "rgba(52,211,153,0.18)", borderRadius: 5, padding: "4px 8px", border: `1px solid rgba(52,211,153,0.4)` }}>
                    <span style={{ color: ACCENT, fontWeight: 900 }}>{d.days}d</span>
                </div>
            </motion.div>
        </div>
    );
}
