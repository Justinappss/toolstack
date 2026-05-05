"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#34d399";

const TONES = ["Formal", "Friendly", "Concise", "Academic", "Creative"];

const SAMPLES = [
    {
        original: "We have decided to implement these changes immediately.",
        rewrites: [
            { tone: "Formal", text: "The board has resolved to enact these modifications without delay." },
            { tone: "Friendly", text: "Heads up — we're rolling out these changes right away!" },
            { tone: "Concise", text: "Changes go live now." },
            { tone: "Academic", text: "An immediate implementation of the proposed changes has been approved." },
            { tone: "Creative", text: "Buckle up — the new rules just hit the ground running." },
        ],
    },
    {
        original: "The product is currently unavailable in your region.",
        rewrites: [
            { tone: "Formal", text: "Regrettably, this product remains inaccessible within your locale at present." },
            { tone: "Friendly", text: "Sorry — we don't ship to your area just yet!" },
            { tone: "Concise", text: "Not available where you are." },
            { tone: "Academic", text: "Geographical restrictions presently preclude access to this product." },
            { tone: "Creative", text: "This one's playing hard to get in your neck of the woods." },
        ],
    },
];

export function ParaphrasingThumbnail() {
    const [sIdx, setSIdx] = useState(0);
    const [tIdx, setTIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setTIdx(t => {
                const next = t + 1;
                if (next >= TONES.length) {
                    setSIdx(s => (s + 1) % SAMPLES.length);
                    return 0;
                }
                return next;
            });
        }, 1800);
        return () => clearInterval(id);
    }, []);

    const sample = SAMPLES[sIdx];
    const rewrite = sample.rewrites[tIdx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #061613 0%, #0a2620 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top — tone selector */}
            <div style={{ display: "flex", gap: 3 }}>
                {TONES.map((t, i) => (
                    <motion.div key={t}
                        animate={{
                            background: i === tIdx ? `rgba(52,211,153,0.3)` : `rgba(52,211,153,0.05)`,
                            borderColor: i === tIdx ? ACCENT : `rgba(52,211,153,0.15)`,
                            scale: i === tIdx ? 1.05 : 1,
                        }}
                        style={{
                            fontSize: 8.5, fontWeight: 800,
                            color: i === tIdx ? "white" : "rgba(255,255,255,0.5)",
                            padding: "3px 6px", borderRadius: 4,
                            border: `1px solid`,
                            letterSpacing: "0.04em",
                            flex: 1, textAlign: "center",
                        }}
                    >
                        {t}
                    </motion.div>
                ))}
            </div>

            {/* Original */}
            <div style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "8px 11px",
            }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.14em", marginBottom: 3 }}>
                    ORIGINAL
                </div>
                <motion.div
                    key={`o-${sIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        fontSize: 10.5, color: "rgba(255,255,255,0.75)",
                        lineHeight: 1.45, fontWeight: 500,
                    }}
                >
                    {sample.original}
                </motion.div>
            </div>

            {/* Arrow + status */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ fontSize: 14, color: ACCENT, fontWeight: 900, textShadow: `0 0 8px ${ACCENT}` }}
                >
                    ↓
                </motion.div>
                <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 8, fontWeight: 900, color: ACCENT,
                        letterSpacing: "0.14em",
                    }}
                >
                    REWRITING IN {rewrite.tone.toUpperCase()}
                </motion.span>
                <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    style={{ fontSize: 14, color: ACCENT, fontWeight: 900, textShadow: `0 0 8px ${ACCENT}` }}
                >
                    ↓
                </motion.div>
            </div>

            {/* Rewritten */}
            <div style={{
                flex: 1,
                background: `rgba(52,211,153,0.12)`,
                border: `1px solid ${ACCENT}`,
                borderRadius: 8,
                padding: "9px 12px",
                boxShadow: `0 0 16px rgba(52,211,153,0.2)`,
            }}>
                <div style={{ fontSize: 8, color: ACCENT, fontWeight: 900, letterSpacing: "0.14em", marginBottom: 3 }}>
                    REWRITTEN
                </div>
                <motion.div
                    key={`r-${sIdx}-${tIdx}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        fontSize: 11, color: "white",
                        lineHeight: 1.4, fontWeight: 600,
                    }}
                >
                    {rewrite.text}
                </motion.div>
            </div>
        </div>
    );
}
