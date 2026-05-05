"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#34d399";
const RED = "#ef4444";

const SAMPLES = [
    {
        text: "Their going to the store yesterday and bought alot of stuff but it dont matter.",
        errors: [
            { word: "Their", fix: "They're" },
            { word: "alot", fix: "a lot" },
            { word: "dont", fix: "doesn't" },
        ],
    },
    {
        text: "Me and her was suprised when the package arrive last week without no warning.",
        errors: [
            { word: "Me and her", fix: "She and I" },
            { word: "was", fix: "were" },
            { word: "suprised", fix: "surprised" },
        ],
    },
];

type Phase = "checking" | "fixed";

export function GrammarCheckerThumbnail() {
    const [idx, setIdx] = useState(0);
    const [phase, setPhase] = useState<Phase>("checking");

    useEffect(() => {
        // Cycle: checking 1.6s -> fixed 1.4s -> next sample
        const t1 = setTimeout(() => setPhase("fixed"), 1600);
        const t2 = setTimeout(() => {
            setPhase("checking");
            setIdx(i => (i + 1) % SAMPLES.length);
        }, 3000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [idx]);

    const sample = SAMPLES[idx];
    const errCount = sample.errors.length;

    // Render with errors highlighted (or fixed)
    const renderText = () => {
        let text = sample.text;
        const elements: React.ReactNode[] = [];
        let key = 0;
        for (const err of sample.errors) {
            const i = text.indexOf(err.word);
            if (i < 0) continue;
            if (i > 0) elements.push(<span key={key++}>{text.slice(0, i)}</span>);
            const replacement = phase === "fixed" ? err.fix : err.word;
            elements.push(
                <motion.span
                    key={key++}
                    animate={{
                        background: phase === "checking" ? `rgba(239,68,68,0.25)` : `rgba(52,211,153,0.25)`,
                        color: phase === "checking" ? RED : ACCENT,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontWeight: 700,
                        padding: "1px 3px",
                        borderRadius: 3,
                        textDecorationLine: phase === "checking" ? "underline" : "none",
                        textDecorationStyle: "wavy",
                        textDecorationColor: RED,
                    }}
                >
                    {replacement}
                </motion.span>
            );
            text = text.slice(i + err.word.length);
        }
        if (text) elements.push(<span key={key++}>{text}</span>);
        return elements;
    };

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #061613 0%, #0a2620 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>GRAMMAR</span>
                <motion.div
                    key={phase}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    style={{
                        fontSize: 9, fontWeight: 900,
                        color: phase === "checking" ? RED : ACCENT,
                        background: phase === "checking" ? `rgba(239,68,68,0.15)` : `rgba(52,211,153,0.15)`,
                        padding: "3px 8px", borderRadius: 99,
                        border: `1px solid ${phase === "checking" ? "rgba(239,68,68,0.3)" : "rgba(52,211,153,0.3)"}`,
                        letterSpacing: "0.1em",
                    }}
                >
                    {phase === "checking" ? `⚠ ${errCount} ISSUES` : "✓ ALL CLEAR"}
                </motion.div>
            </div>

            {/* Text body */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.5)",
                border: `1px solid ${phase === "checking" ? "rgba(239,68,68,0.25)" : "rgba(52,211,153,0.3)"}`,
                borderRadius: 8,
                padding: "10px 12px",
                fontSize: 11.5, lineHeight: 1.55,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
                position: "relative",
                transition: "border 0.3s",
            }}>
                {renderText()}
            </div>

            {/* Bottom — fix list */}
            <div style={{ display: "flex", gap: 5, flexWrap: "nowrap", overflow: "hidden" }}>
                {sample.errors.map((err, i) => (
                    <motion.div
                        key={`${idx}-${i}`}
                        animate={{
                            background: phase === "fixed" ? `rgba(52,211,153,0.18)` : `rgba(239,68,68,0.15)`,
                            borderColor: phase === "fixed" ? `rgba(52,211,153,0.4)` : `rgba(239,68,68,0.35)`,
                        }}
                        style={{
                            fontSize: 8.5, fontWeight: 800,
                            padding: "4px 8px", borderRadius: 5,
                            border: "1px solid",
                            display: "flex", alignItems: "center", gap: 4,
                            flex: 1,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <span style={{ color: phase === "fixed" ? ACCENT : RED }}>
                            {phase === "fixed" ? "✓" : "✗"}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.5)", textDecoration: "line-through", fontSize: 8 }}>{err.word}</span>
                        <span style={{ color: ACCENT, fontWeight: 900 }}>→</span>
                        <span style={{ color: "white", fontSize: 8.5 }}>{err.fix}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
