"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const ACCENT = "#4ade80";

const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export function PasswordGeneratorThumbnail() {
    const [pwd, setPwd] = useState<string>("••••••••••••••••");
    const [length, setLength] = useState(16);
    const [strength, setStrength] = useState(0);
    const [regenPulse, setRegenPulse] = useState(false);

    // Char scramble — runs constantly
    useEffect(() => {
        const tick = () => setPwd(Array.from({ length }, rand).join(""));
        tick();
        const id = setInterval(tick, 130);
        return () => clearInterval(id);
    }, [length]);

    // Length oscillation — slides between values
    useEffect(() => {
        const lengths = [12, 16, 20, 24, 16, 8];
        let i = 0;
        const id = setInterval(() => {
            i = (i + 1) % lengths.length;
            setLength(lengths[i]);
            setRegenPulse(true);
            setTimeout(() => setRegenPulse(false), 400);
        }, 3200);
        return () => clearInterval(id);
    }, []);

    // Strength meter wave
    useEffect(() => {
        const id = setInterval(() => setStrength(s => (s + 1) % 5), 320);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%",
            height: 220,
            background: "linear-gradient(135deg, #06070d 0%, #0d1419 50%, #06070d 100%)",
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Animated background grid */}
            <div style={{
                position: "absolute", inset: 0, opacity: 0.4,
                backgroundImage: `
                    linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
            }} />

            {/* Scrolling shimmer */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute",
                    top: 0, bottom: 0, width: "30%",
                    background: `linear-gradient(90deg, transparent, rgba(74,222,128,0.08), transparent)`,
                    pointerEvents: "none",
                }}
            />

            {/* Top bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
                    />
                    <span style={{ fontSize: 9.5, color: ACCENT, fontWeight: 800, letterSpacing: "0.16em" }}>
                        SECURE_GEN
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    {[0, 1, 2, 3].map(i => (
                        <motion.div key={i}
                            animate={{
                                opacity: i <= strength ? 1 : 0.18,
                                scale: i === strength ? [1, 1.4, 1] : 1,
                            }}
                            transition={{ duration: 0.3 }}
                            style={{
                                width: 5, height: 9, borderRadius: 1.5,
                                background: i <= strength ? ACCENT : "rgba(74,222,128,0.18)",
                                boxShadow: i <= strength ? `0 0 4px ${ACCENT}` : "none",
                            }}
                        />
                    ))}
                    <span style={{ fontSize: 8.5, color: ACCENT, fontWeight: 900, marginLeft: 5, letterSpacing: "0.14em" }}>
                        STRONG
                    </span>
                </div>
            </div>

            {/* Big password display */}
            <div style={{
                position: "relative",
                padding: "12px 14px",
                background: "rgba(0,0,0,0.55)",
                borderRadius: 8,
                border: `1px solid rgba(74,222,128,${regenPulse ? 0.85 : 0.4})`,
                boxShadow: `0 0 ${regenPulse ? 24 : 14}px rgba(74,222,128,${regenPulse ? 0.45 : 0.2}), inset 0 0 18px rgba(74,222,128,0.04)`,
                transition: "border 0.4s, box-shadow 0.4s",
                zIndex: 2,
            }}>
                <div style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflow: "hidden",
                    fontSize: 16,
                    fontWeight: 700,
                    color: ACCENT,
                    letterSpacing: "0.06em",
                    textShadow: `0 0 8px rgba(74,222,128,0.55)`,
                    fontFamily: "ui-monospace, monospace",
                    minHeight: 22,
                }}>
                    {pwd}
                </div>
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{
                        position: "absolute",
                        right: 8, top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 11,
                        fontWeight: 900,
                        color: ACCENT,
                        background: "rgba(74,222,128,0.15)",
                        padding: "3px 8px",
                        borderRadius: 5,
                        letterSpacing: "0.1em",
                        border: `1px solid rgba(74,222,128,0.3)`,
                    }}
                >
                    COPY
                </motion.div>
            </div>

            {/* Length slider */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 2 }}>
                <span style={{ fontSize: 8.5, color: "rgba(255,255,255,0.45)", fontWeight: 800, letterSpacing: "0.16em", minWidth: 42 }}>
                    LENGTH
                </span>
                <div style={{ flex: 1, height: 4, background: "rgba(74,222,128,0.12)", borderRadius: 2, position: "relative" }}>
                    <motion.div
                        animate={{ width: `${(length / 24) * 100}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        style={{
                            height: "100%",
                            background: `linear-gradient(90deg, rgba(74,222,128,0.6), ${ACCENT})`,
                            borderRadius: 2,
                            boxShadow: `0 0 8px ${ACCENT}`,
                        }}
                    />
                    <motion.div
                        animate={{ left: `${(length / 24) * 100}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        style={{
                            position: "absolute",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 14, height: 14,
                            borderRadius: "50%",
                            background: ACCENT,
                            boxShadow: `0 0 12px ${ACCENT}, 0 0 24px rgba(74,222,128,0.4)`,
                            border: "2px solid #06070d",
                        }}
                    />
                </div>
                <motion.span
                    key={length}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 14 }}
                    style={{
                        fontSize: 16,
                        fontWeight: 900,
                        color: ACCENT,
                        minWidth: 24,
                        textAlign: "right",
                        textShadow: `0 0 10px rgba(74,222,128,0.6)`,
                    }}
                >
                    {length}
                </motion.span>
            </div>

            {/* Options */}
            <div style={{ display: "flex", gap: 6, fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", position: "relative", zIndex: 2 }}>
                {["A-Z", "a-z", "0-9", "!@#"].map((opt, i) => (
                    <motion.div key={opt}
                        animate={{
                            background: [
                                "rgba(74,222,128,0.10)",
                                "rgba(74,222,128,0.22)",
                                "rgba(74,222,128,0.10)",
                            ],
                        }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }}
                        style={{
                            padding: "5px 8px",
                            borderRadius: 5,
                            color: ACCENT,
                            border: `1px solid rgba(74,222,128,0.32)`,
                            flex: 1,
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 4,
                        }}
                    >
                        <span style={{ fontSize: 8 }}>✓</span>
                        {opt}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
