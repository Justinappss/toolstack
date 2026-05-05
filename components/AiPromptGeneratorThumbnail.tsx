"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#818cf8";

const FRAMEWORKS = ["RISEN", "STAR", "Chain-of-Thought", "5W1H", "ReAct"];
const RESPONSES = [
    "Acting as a senior copywriter, write a punchy LinkedIn hook…",
    "Generate 5 variations of this email opener with a friendly tone…",
    "Draft a SEO meta description that drives 3% CTR for…",
    "Outline a 7-day product launch plan starting from…",
];

export function AiPromptGeneratorThumbnail() {
    const [fwIdx, setFwIdx] = useState(0);
    const [respIdx, setRespIdx] = useState(0);
    const [typed, setTyped] = useState("");

    // Cycle frameworks
    useEffect(() => {
        const id = setInterval(() => setFwIdx(i => (i + 1) % FRAMEWORKS.length), 1400);
        return () => clearInterval(id);
    }, []);

    // Type response then cycle
    useEffect(() => {
        const text = RESPONSES[respIdx];
        let i = 0;
        const id = setInterval(() => {
            i++;
            setTyped(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(id);
                setTimeout(() => {
                    setTyped("");
                    setRespIdx(r => (r + 1) % RESPONSES.length);
                }, 1600);
            }
        }, 28);
        return () => clearInterval(id);
    }, [respIdx]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #0a0a18 0%, #15152a 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 10,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Floating sparkles */}
            {[0, 1, 2, 3].map(i => (
                <motion.div key={i}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        left: `${15 + i * 22}%`,
                        top: `${30 + (i % 2) * 30}%`,
                        fontSize: 11, color: ACCENT,
                        opacity: 0,
                        pointerEvents: "none",
                        textShadow: `0 0 8px ${ACCENT}`,
                    }}
                >
                    ✦
                </motion.div>
            ))}

            {/* Top — framework pills */}
            <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "nowrap", overflow: "hidden" }}>
                <span style={{ fontSize: 8.5, color: "rgba(255,255,255,0.45)", fontWeight: 800, letterSpacing: "0.16em", marginRight: 4 }}>FRAMEWORK</span>
                {FRAMEWORKS.map((f, i) => (
                    <motion.div key={f}
                        animate={{
                            background: i === fwIdx ? `rgba(129,140,248,0.4)` : `rgba(129,140,248,0.08)`,
                            borderColor: i === fwIdx ? ACCENT : `rgba(129,140,248,0.2)`,
                            scale: i === fwIdx ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            fontSize: 8.5, fontWeight: 800,
                            color: i === fwIdx ? "white" : "rgba(255,255,255,0.55)",
                            padding: "3px 7px", borderRadius: 99,
                            border: `1px solid`,
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {f}
                    </motion.div>
                ))}
            </div>

            {/* Chat bubble — user request */}
            <div style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "9px 12px",
                fontSize: 10, color: "rgba(255,255,255,0.7)",
            }}>
                <span style={{ color: ACCENT, fontWeight: 800, marginRight: 4 }}>YOU</span>
                I need a prompt for…
            </div>

            {/* AI response box */}
            <div style={{
                flex: 1,
                background: "rgba(129,140,248,0.08)",
                border: `1px solid rgba(129,140,248,0.3)`,
                borderRadius: 10,
                padding: "10px 12px",
                position: "relative",
                boxShadow: `0 0 16px rgba(129,140,248,0.15)`,
                display: "flex", flexDirection: "column", gap: 4,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        style={{ fontSize: 10, color: ACCENT }}
                    >
                        ✦
                    </motion.div>
                    <span style={{ fontSize: 8.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.14em" }}>EXPERT PROMPT</span>
                </div>
                <div style={{
                    fontSize: 10.5, lineHeight: 1.5,
                    color: "white", fontWeight: 500,
                }}>
                    {typed}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        style={{ color: ACCENT, marginLeft: 1 }}
                    >
                        |
                    </motion.span>
                </div>
            </div>

            {/* Bottom — generate button */}
            <motion.div
                animate={{
                    boxShadow: [
                        `0 0 8px rgba(129,140,248,0.3)`,
                        `0 0 16px rgba(129,140,248,0.6)`,
                        `0 0 8px rgba(129,140,248,0.3)`,
                    ]
                }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                    background: ACCENT, color: "white",
                    fontSize: 10, fontWeight: 900, letterSpacing: "0.06em",
                    padding: "7px 0", borderRadius: 6,
                    textAlign: "center",
                }}
            >
                ⚡ GENERATE PROMPT
            </motion.div>
        </div>
    );
}
