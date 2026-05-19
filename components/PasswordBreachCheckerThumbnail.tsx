"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#10b981";

type Phase = "typing" | "hashing" | "safe" | "breached";

const SCENARIOS: { password: string; count: number; safe: boolean }[] = [
    { password: "X9#mQ!vLpR2@", count: 0, safe: true },
    { password: "password123",  count: 3861493, safe: false },
    { password: "Tr0ub4dor&3",  count: 0, safe: true },
    { password: "qwerty",       count: 3912816, safe: false },
];

function fmtCount(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
    return n.toString();
}

export function PasswordBreachCheckerThumbnail() {
    const [scenarioIdx, setScenarioIdx] = useState(0);
    const [phase, setPhase] = useState<Phase>("typing");
    const [shown, setShown] = useState(0);

    const scenario = SCENARIOS[scenarioIdx];
    const pw = scenario.password;

    useEffect(() => {
        setPhase("typing");
        setShown(0);

        const typingInterval = setInterval(() => {
            setShown(s => {
                if (s < pw.length) return s + 1;
                clearInterval(typingInterval);
                return s;
            });
        }, 90);

        const hashTimer = setTimeout(() => setPhase("hashing"), pw.length * 90 + 200);
        const resultTimer = setTimeout(() => setPhase(scenario.safe ? "safe" : "breached"), pw.length * 90 + 1400);
        const nextTimer = setTimeout(() => {
            setScenarioIdx(i => (i + 1) % SCENARIOS.length);
        }, pw.length * 90 + 3200);

        return () => {
            clearInterval(typingInterval);
            clearTimeout(hashTimer);
            clearTimeout(resultTimer);
            clearTimeout(nextTimer);
        };
    }, [scenarioIdx]);

    const hashHex = "a3f8c1d2e4b5069712839a1b2c3d4e5f6a7b8c9d";

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #050a0a 0%, #071210 50%, #050a0a 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 10,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
            position: "relative", overflow: "hidden",
        }}>
            {/* Background grid */}
            <div style={{
                position: "absolute", inset: 0, opacity: 0.35,
                backgroundImage: `
                    linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "18px 18px",
            }} />

            {/* Shimmer sweep */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", top: 0, bottom: 0, width: "28%",
                    background: `linear-gradient(90deg, transparent, rgba(16,185,129,0.07), transparent)`,
                    pointerEvents: "none",
                }}
            />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <motion.div
                        animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
                    />
                    <span style={{ fontSize: 9.5, color: ACCENT, fontWeight: 800, letterSpacing: "0.16em" }}>BREACH_CHECK</span>
                </div>
                <span style={{ fontSize: 8.5, color: "rgba(255,255,255,0.3)", fontWeight: 700, letterSpacing: "0.1em" }}>HIBP API · K-ANON</span>
            </div>

            {/* Password input */}
            <div style={{
                position: "relative", zIndex: 2,
                padding: "9px 12px",
                background: "rgba(0,0,0,0.5)",
                border: `1px solid rgba(16,185,129,${phase === "typing" ? 0.6 : 0.25})`,
                borderRadius: 7,
                boxShadow: phase === "typing" ? `0 0 14px rgba(16,185,129,0.2)` : "none",
                transition: "border-color 0.4s, box-shadow 0.4s",
                display: "flex", alignItems: "center", gap: 6,
            }}>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>PW</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: "0.12em", flex: 1, overflow: "hidden", whiteSpace: "nowrap" }}>
                    {"●".repeat(shown)}
                    {phase === "typing" && shown < pw.length && (
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            style={{ color: ACCENT }}
                        >▌</motion.span>
                    )}
                </span>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>👁</span>
            </div>

            {/* Hash display */}
            <AnimatePresence mode="wait">
                {(phase === "hashing" || phase === "safe" || phase === "breached") && (
                    <motion.div
                        key="hash"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            position: "relative", zIndex: 2,
                            padding: "7px 10px",
                            background: "rgba(0,0,0,0.4)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 6,
                        }}
                    >
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", fontWeight: 700, marginBottom: 3, letterSpacing: "0.1em" }}>SHA-1 PREFIX SENT →</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ fontSize: 10, color: ACCENT, fontWeight: 800, fontFamily: "monospace" }}>
                                {hashHex.slice(0, 5).toUpperCase()}
                            </span>
                            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "monospace" }}>
                                {hashHex.slice(5, 20).toUpperCase()}
                            </span>
                            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.12)", fontFamily: "monospace" }}>…</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence mode="wait">
                {phase === "hashing" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", zIndex: 2 }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                            style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid rgba(16,185,129,0.2)`, borderTopColor: ACCENT }}
                        />
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "0.1em" }}>QUERYING 900M+ RECORDS…</span>
                    </motion.div>
                )}

                {phase === "safe" && (
                    <motion.div
                        key="safe"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "relative", zIndex: 2,
                            padding: "10px 12px",
                            background: "rgba(16,185,129,0.08)",
                            border: "1px solid rgba(16,185,129,0.35)",
                            borderRadius: 8,
                            display: "flex", alignItems: "center", gap: 10,
                            boxShadow: "0 0 20px rgba(16,185,129,0.12)",
                        }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                            style={{ fontSize: 18 }}
                        >✅</motion.span>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 900, color: ACCENT, letterSpacing: "0.05em" }}>NOT FOUND IN ANY BREACH</div>
                            <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>0 records matched · password is safe</div>
                        </div>
                    </motion.div>
                )}

                {phase === "breached" && (
                    <motion.div
                        key="breached"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "relative", zIndex: 2,
                            padding: "10px 12px",
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.35)",
                            borderRadius: 8,
                            display: "flex", alignItems: "center", gap: 10,
                            boxShadow: "0 0 20px rgba(239,68,68,0.1)",
                        }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 0.4 }}
                            style={{ fontSize: 18 }}
                        >🚨</motion.span>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 900, color: "#ef4444", letterSpacing: "0.05em" }}>
                                PWNED {fmtCount(scenario.count)} TIMES
                            </div>
                            <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>change this password immediately</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
