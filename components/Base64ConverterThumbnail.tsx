"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#10b981";

const PAIRS = [
    { plain: "hello world", encoded: "aGVsbG8gd29ybGQ=" },
    { plain: "toolstack.tech", encoded: "dG9vbHN0YWNrLnRlY2g=" },
    { plain: "Build in public", encoded: "QnVpbGQgaW4gcHVibGlj" },
    { plain: "free tools 2026", encoded: "ZnJlZSB0b29scyAyMDI2" },
];

type Mode = "encode" | "decode";

export function Base64ConverterThumbnail() {
    const [idx, setIdx] = useState(0);
    const [mode, setMode] = useState<Mode>("encode");

    useEffect(() => {
        const id = setInterval(() => {
            setMode(m => m === "encode" ? "decode" : "encode");
            setIdx(i => (i + 1) % PAIRS.length);
        }, 2200);
        return () => clearInterval(id);
    }, []);

    const p = PAIRS[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #051410 0%, #0a2018 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em", fontFamily: "Inter, sans-serif" }}>BASE64</span>
                {/* Mode toggle */}
                <div style={{ display: "flex", background: "rgba(0,0,0,0.5)", borderRadius: 99, padding: 2, border: "1px solid rgba(16,185,129,0.2)" }}>
                    {(["encode", "decode"] as Mode[]).map(m => (
                        <motion.div key={m}
                            animate={{
                                background: mode === m ? ACCENT : "rgba(16,185,129,0)",
                                color: mode === m ? "#051410" : "rgba(255,255,255,0.5)",
                            }}
                            style={{
                                fontSize: 8.5, fontWeight: 900,
                                padding: "3px 9px", borderRadius: 99,
                                letterSpacing: "0.1em",
                                fontFamily: "Inter, sans-serif",
                            }}
                        >
                            {m.toUpperCase()}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Source */}
            <div style={{
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "8px 11px",
            }}>
                <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.55)", fontWeight: 800, letterSpacing: "0.16em", marginBottom: 3 }}>
                    {mode === "encode" ? "PLAIN TEXT" : "BASE64"}
                </div>
                <motion.div
                    key={`s-${idx}-${mode}`}
                    initial={{ x: -6, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontSize: 12, color: "white", fontWeight: 700,
                        wordBreak: "break-all",
                    }}
                >
                    {mode === "encode" ? p.plain : p.encoded}
                </motion.div>
            </div>

            {/* Conversion arrow */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <div style={{ flex: 1, height: 1, background: "rgba(16,185,129,0.2)" }} />
                <motion.div
                    animate={{ rotate: mode === "encode" ? 0 : 180 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    style={{
                        fontSize: 14, color: ACCENT, fontWeight: 900,
                        textShadow: `0 0 8px ${ACCENT}`,
                    }}
                >
                    ↓
                </motion.div>
                <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 8, fontWeight: 900, color: ACCENT,
                        letterSpacing: "0.14em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    {mode === "encode" ? "ENCODING" : "DECODING"}
                </motion.span>
                <div style={{ flex: 1, height: 1, background: "rgba(16,185,129,0.2)" }} />
            </div>

            {/* Output */}
            <div style={{
                flex: 1,
                background: `rgba(16,185,129,0.12)`,
                border: `1px solid ${ACCENT}`,
                borderRadius: 8,
                padding: "8px 11px",
                position: "relative",
                boxShadow: `0 0 14px rgba(16,185,129,0.2)`,
            }}>
                <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em", marginBottom: 3 }}>
                    {mode === "encode" ? "BASE64" : "DECODED"}
                </div>
                <motion.div
                    key={`o-${idx}-${mode}`}
                    initial={{ x: 6, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    style={{
                        fontSize: 12, color: ACCENT, fontWeight: 800,
                        wordBreak: "break-all",
                        textShadow: `0 0 8px rgba(16,185,129,0.4)`,
                    }}
                >
                    {mode === "encode" ? p.encoded : p.plain}
                </motion.div>
            </div>
        </div>
    );
}
