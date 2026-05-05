"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#f59e0b";
const GOLD = "#fbbf24";

const TEAMS = [
    { flag: "🇧🇷", name: "BRAZIL", style: "Samba flair · Attacking flow", player: "Vinícius Jr.", color: "#facc15", gradient: "linear-gradient(135deg, #16a34a 0%, #facc15 100%)" },
    { flag: "🇫🇷", name: "FRANCE", style: "Counter-attack masters", player: "Mbappé", color: "#3b82f6", gradient: "linear-gradient(135deg, #1e3a8a 0%, #ef4444 100%)" },
    { flag: "🇦🇷", name: "ARGENTINA", style: "Defensive grit + Messi magic", player: "Lautaro", color: "#60a5fa", gradient: "linear-gradient(135deg, #60a5fa 0%, #ffffff 100%)" },
    { flag: "🇪🇸", name: "SPAIN", style: "Tiki-taka · Pure technique", player: "Pedri", color: "#facc15", gradient: "linear-gradient(135deg, #dc2626 0%, #facc15 100%)" },
    { flag: "🇲🇦", name: "MOROCCO", style: "Underdog story · Defensive iron", player: "Hakimi", color: "#dc2626", gradient: "linear-gradient(135deg, #16a34a 0%, #dc2626 100%)" },
    { flag: "🇵🇹", name: "PORTUGAL", style: "Deepest squad ever", player: "Leão", color: "#16a34a", gradient: "linear-gradient(135deg, #16a34a 0%, #dc2626 100%)" },
];

const QUESTIONS = ["?", "?", "?", "?", "?"];

type Phase = "quiz" | "rolling" | "match";

export function WorldCupTeamFinderThumbnail() {
    const [idx, setIdx] = useState(0);
    const [phase, setPhase] = useState<Phase>("quiz");
    const [progress, setProgress] = useState(0);
    const [rollIdx, setRollIdx] = useState(0);

    // Cycle through phases
    useEffect(() => {
        if (phase === "quiz") {
            if (progress < 5) {
                const id = setTimeout(() => setProgress(p => p + 1), 280);
                return () => clearTimeout(id);
            }
            const id = setTimeout(() => setPhase("rolling"), 250);
            return () => clearTimeout(id);
        }
        if (phase === "rolling") {
            const id = setTimeout(() => setPhase("match"), 1100);
            return () => clearTimeout(id);
        }
        // match → reset
        const id = setTimeout(() => {
            setPhase("quiz");
            setProgress(0);
            setIdx(i => (i + 1) % TEAMS.length);
        }, 2200);
        return () => clearTimeout(id);
    }, [phase, progress]);

    // Slot-machine roll during rolling phase
    useEffect(() => {
        if (phase !== "rolling") return;
        const id = setInterval(() => {
            setRollIdx(r => (r + 1) % TEAMS.length);
        }, 80);
        return () => clearInterval(id);
    }, [phase]);

    const team = TEAMS[idx];
    const rollingTeam = TEAMS[rollIdx];
    const showTeam = phase === "match";

    return (
        <div style={{
            width: "100%", height: 220,
            position: "relative", overflow: "hidden",
            background: "#06070d",
        }}>
            <img
                src="/tools/world-cup-team-finder-preview.png"
                alt="World Cup Team Finder preview"
                style={{
                    width: "100%", height: 220,
                    objectFit: "cover", objectPosition: "top center",
                    display: "block",
                }}
            />

            {/* Darkening + dramatic gradient */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.95) 100%)",
                pointerEvents: "none",
            }} />

            {/* Stadium light beam */}
            <motion.div
                animate={{ x: ["-50%", "150%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", inset: 0, width: "35%",
                    background: `linear-gradient(90deg, transparent, rgba(245,158,11,0.18), rgba(251,191,36,0.18), transparent)`,
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                    transform: "skewX(-12deg)",
                }}
            />

            {/* Confetti burst on match */}
            {showTeam && [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <motion.div key={i}
                    initial={{ y: "100%", x: "50%", opacity: 1, rotate: 0 }}
                    animate={{
                        y: ["100%", `${20 + Math.random() * 30}%`, "-20%"],
                        x: `${20 + i * 9}%`,
                        opacity: [0, 1, 0],
                        rotate: [0, 360 + i * 45],
                    }}
                    transition={{ duration: 1.6, delay: i * 0.06, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        width: 7, height: 11,
                        background: i % 2 === 0 ? team.color : GOLD,
                        borderRadius: 1,
                        boxShadow: `0 0 6px ${i % 2 === 0 ? team.color : GOLD}`,
                        pointerEvents: "none",
                        zIndex: 5,
                    }}
                />
            ))}

            {/* Top — header */}
            <motion.div
                style={{
                    position: "absolute", top: 12, left: 12, right: 12,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    zIndex: 4,
                }}
            >
                <motion.span
                    animate={{
                        boxShadow: [
                            `0 0 8px rgba(245,158,11,0.4)`,
                            `0 0 16px rgba(245,158,11,0.7)`,
                            `0 0 8px rgba(245,158,11,0.4)`,
                        ]
                    }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{
                        fontSize: 9, fontWeight: 900,
                        background: `${ACCENT}`,
                        color: "#1a0d00",
                        padding: "4px 10px", borderRadius: 99,
                        letterSpacing: "0.16em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    🏆 TEAM FINDER
                </motion.span>
                <motion.div
                    style={{ display: "flex", gap: 4 }}
                >
                    {QUESTIONS.map((_, i) => (
                        <motion.div key={i}
                            animate={{
                                background: i < progress ? ACCENT : "rgba(255,255,255,0.2)",
                                scale: i === progress - 1 && phase === "quiz" ? [1, 1.4, 1] : 1,
                            }}
                            transition={{ duration: 0.3 }}
                            style={{
                                width: 7, height: 7, borderRadius: "50%",
                                boxShadow: i < progress ? `0 0 8px ${ACCENT}` : "none",
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Center — quiz / rolling / match content */}
            <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 3,
                pointerEvents: "none",
            }}>
                <AnimatePresence mode="wait">
                    {phase === "quiz" && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                style={{
                                    fontSize: 26,
                                    filter: `drop-shadow(0 0 8px ${GOLD})`,
                                }}
                            >
                                ✦
                            </motion.div>
                            <span style={{
                                fontSize: 11, fontWeight: 900, color: "white",
                                letterSpacing: "0.18em", fontFamily: "Inter, sans-serif",
                                background: "rgba(0,0,0,0.7)",
                                backdropFilter: "blur(8px)",
                                padding: "5px 12px", borderRadius: 99,
                                border: `1px solid ${GOLD}`,
                                textShadow: `0 0 8px rgba(251,191,36,0.5)`,
                            }}>
                                ANSWER {progress}/5
                            </span>
                        </motion.div>
                    )}
                    {phase === "rolling" && (
                        <motion.div
                            key="rolling"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.3 }}
                            transition={{ duration: 0.25 }}
                            style={{
                                fontSize: 60,
                                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.6))",
                            }}
                        >
                            <motion.span
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.15, repeat: Infinity }}
                                style={{ display: "inline-block" }}
                            >
                                {rollingTeam.flag}
                            </motion.span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom — match panel (visible during match phase) */}
            <AnimatePresence>
                {showTeam && (
                    <motion.div
                        key={`match-${idx}`}
                        initial={{ y: 90, opacity: 0, scale: 0.92 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 90, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 180, damping: 18 }}
                        style={{
                            position: "absolute", bottom: 12, left: 12, right: 12,
                            background: "rgba(6,7,13,0.94)",
                            backdropFilter: "blur(14px)",
                            border: `2px solid ${team.color}`,
                            borderRadius: 12,
                            padding: "10px 14px",
                            zIndex: 4,
                            fontFamily: "Inter, sans-serif",
                            boxShadow: `0 8px 30px ${team.color}60, 0 0 24px ${team.color}40`,
                            overflow: "hidden",
                        }}
                    >
                        {/* Gradient accent bar */}
                        <div style={{
                            position: "absolute", top: 0, left: 0, right: 0, height: 3,
                            background: team.gradient,
                        }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <motion.div
                                animate={{
                                    scale: [1, 1.08, 1],
                                    rotate: [0, -5, 5, 0],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    fontSize: 38,
                                    filter: `drop-shadow(0 0 12px ${team.color})`,
                                    lineHeight: 1,
                                }}
                            >
                                {team.flag}
                            </motion.div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <motion.div
                                    initial={{ x: -8, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    style={{
                                        fontSize: 8.5, fontWeight: 900,
                                        color: team.color,
                                        letterSpacing: "0.18em",
                                        textShadow: `0 0 6px ${team.color}80`,
                                    }}
                                >
                                    ✓ PERFECT MATCH
                                </motion.div>
                                <motion.div
                                    initial={{ x: -8, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    style={{
                                        fontSize: 22, fontWeight: 900, color: "white",
                                        letterSpacing: "-0.02em", lineHeight: 1.05,
                                        textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                                    }}
                                >
                                    {team.name}
                                </motion.div>
                                <motion.div
                                    initial={{ x: -8, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    style={{
                                        fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 600,
                                        marginTop: 2,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {team.style}
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 280, delay: 0.5 }}
                                style={{
                                    background: `${team.color}25`,
                                    border: `1px solid ${team.color}`,
                                    borderRadius: 6,
                                    padding: "4px 8px",
                                    textAlign: "center",
                                    boxShadow: `0 0 10px ${team.color}40`,
                                }}
                            >
                                <div style={{ fontSize: 7, color: team.color, fontWeight: 900, letterSpacing: "0.14em" }}>STAR</div>
                                <div style={{
                                    fontSize: 10, fontWeight: 900, color: "white",
                                    whiteSpace: "nowrap",
                                }}>
                                    {team.player}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
