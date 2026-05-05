"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#f472b6";

const PARAMS = [
    { key: "utm_source", value: "linkedin", color: "#60a5fa" },
    { key: "utm_medium", value: "social", color: "#34d399" },
    { key: "utm_campaign", value: "launch_2026", color: "#fbbf24" },
    { key: "utm_content", value: "video_post", color: "#a78bfa" },
    { key: "utm_term", value: "free_tools", color: "#fb923c" },
];

export function UtmBuilderThumbnail() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setStep(s => (s + 1) % (PARAMS.length + 2));
        }, 700);
        return () => clearInterval(id);
    }, []);

    const visibleParams = PARAMS.slice(0, Math.max(0, Math.min(step, PARAMS.length)));
    const queryString = visibleParams.map(p => `${p.key}=${p.value}`).join("&");
    const fullUrl = `toolstack.tech/?${queryString}`;

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1f0a18 0%, #2a0a25 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>UTM BUILDER</span>
                <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 9, fontWeight: 800, color: ACCENT,
                        background: "rgba(244,114,182,0.15)",
                        padding: "3px 8px", borderRadius: 99,
                        border: `1px solid rgba(244,114,182,0.3)`,
                        letterSpacing: "0.1em",
                    }}
                >
                    ● BUILDING
                </motion.span>
            </div>

            {/* Param rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {PARAMS.map((p, i) => (
                    <motion.div key={p.key}
                        animate={{
                            background: i < step ? `${p.color}15` : "rgba(255,255,255,0.03)",
                            borderColor: i < step ? `${p.color}50` : "rgba(255,255,255,0.06)",
                            opacity: i < step ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: "flex", alignItems: "center",
                            padding: "4px 8px",
                            borderRadius: 5,
                            border: "1px solid",
                            fontSize: 9.5,
                            fontFamily: "ui-monospace, monospace",
                            gap: 6,
                        }}
                    >
                        <motion.span
                            animate={{ opacity: i < step ? 1 : 0 }}
                            style={{ color: p.color, fontWeight: 800, fontSize: 9 }}
                        >
                            {i < step ? "✓" : "○"}
                        </motion.span>
                        <span style={{ color: p.color, fontWeight: 700, minWidth: 92 }}>{p.key}</span>
                        <span style={{ color: "rgba(255,255,255,0.4)" }}>=</span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: i < step ? 1 : 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ color: "white", fontWeight: 600 }}
                        >
                            {p.value}
                        </motion.span>
                    </motion.div>
                ))}
            </div>

            {/* Bottom — full URL output */}
            <div style={{
                marginTop: "auto",
                background: `rgba(244,114,182,0.12)`,
                border: `1px solid ${ACCENT}`,
                borderRadius: 6,
                padding: "8px 10px",
                position: "relative",
                boxShadow: `0 0 14px rgba(244,114,182,0.2)`,
            }}>
                <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em", marginBottom: 3 }}>FINAL URL</div>
                <motion.div
                    style={{
                        fontSize: 9, color: "white", fontWeight: 600,
                        fontFamily: "ui-monospace, monospace",
                        wordBreak: "break-all",
                        lineHeight: 1.4,
                    }}
                >
                    <span style={{ color: ACCENT }}>https://</span>
                    {fullUrl}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        style={{ color: ACCENT }}
                    >
                        |
                    </motion.span>
                </motion.div>
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                        position: "absolute",
                        right: 8, top: 8,
                        fontSize: 8, fontWeight: 900, color: ACCENT,
                        background: "rgba(244,114,182,0.2)",
                        padding: "2px 6px", borderRadius: 4,
                        letterSpacing: "0.08em",
                    }}
                >
                    COPY
                </motion.div>
            </div>
        </div>
    );
}
