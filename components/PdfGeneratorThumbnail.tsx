"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#ef4444";

export function PdfGeneratorThumbnail() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setProgress(p => {
                const next = p + 4;
                return next > 110 ? 0 : next;
            });
        }, 70);
        return () => clearInterval(id);
    }, []);

    const phase = progress < 30 ? "PARSING" : progress < 65 ? "RENDERING" : progress < 95 ? "EMBEDDING FONTS" : "✓ READY";
    const linesShown = Math.min(8, Math.floor(progress / 12));

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1f0a0a 0%, #2d0d0d 100%)",
            padding: "14px 16px",
            display: "flex", gap: 12,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Left — PDF preview document */}
            <div style={{
                flex: 1.1,
                background: "white",
                borderRadius: 4,
                padding: "10px 11px",
                position: "relative",
                boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
                overflow: "hidden",
                fontFamily: "Georgia, serif",
                fontSize: 8,
                color: "#1a1a1a",
                lineHeight: 1.55,
            }}>
                {/* Header line */}
                <div style={{
                    fontSize: 11, fontWeight: 800, color: "#0a0a0a",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: 3, marginBottom: 4,
                }}>
                    Document Title
                </div>
                {/* Content lines */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            opacity: i < linesShown ? 1 : 0,
                            scaleX: i < linesShown ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            height: 4,
                            background: i % 3 === 0 ? "#999" : "#ddd",
                            borderRadius: 1,
                            marginBottom: 3,
                            width: i % 4 === 0 ? "85%" : i % 4 === 1 ? "100%" : i % 4 === 2 ? "92%" : "70%",
                            transformOrigin: "left",
                        }}
                    />
                ))}
                {/* Page corner fold */}
                <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: 14, height: 14,
                    background: "linear-gradient(225deg, #f3f4f6 50%, transparent 50%)",
                }} />
                <div style={{
                    position: "absolute", top: 2, right: 2,
                    fontSize: 6, color: "#ef4444", fontWeight: 900,
                    letterSpacing: "0.15em",
                }}>
                    PDF
                </div>
                {/* Page number */}
                <div style={{
                    position: "absolute", bottom: 4, left: 0, right: 0,
                    textAlign: "center",
                    fontSize: 6, color: "#999", fontWeight: 600,
                }}>
                    page 1 of 1
                </div>
            </div>

            {/* Right — generation panel */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.span
                        animate={{ rotate: progress < 95 ? 360 : 0 }}
                        transition={{ duration: 1, repeat: progress < 95 ? Infinity : 0, ease: "linear" }}
                        style={{ fontSize: 12, color: ACCENT }}
                    >
                        ⟳
                    </motion.span>
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.14em" }}>
                        PDF GENERATOR
                    </span>
                </div>

                <div style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 6,
                    padding: "6px 9px",
                }}>
                    <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.16em" }}>FORMAT</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "white", marginTop: 1 }}>A4 · Portrait</div>
                </div>

                <div style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 6,
                    padding: "6px 9px",
                }}>
                    <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.16em" }}>FONT</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "white", marginTop: 1 }}>Inter · 12pt</div>
                </div>

                {/* Status + Progress bar */}
                <div style={{ marginTop: "auto" }}>
                    <div style={{
                        display: "flex", justifyContent: "space-between", marginBottom: 3,
                        fontSize: 8.5, fontWeight: 800,
                    }}>
                        <motion.span
                            key={phase}
                            initial={{ opacity: 0, y: -2 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: ACCENT, letterSpacing: "0.1em" }}
                        >
                            {phase}
                        </motion.span>
                        <span style={{ color: "rgba(255,255,255,0.6)" }}>{Math.min(100, progress)}%</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(239,68,68,0.15)", borderRadius: 99, overflow: "hidden" }}>
                        <motion.div
                            animate={{ width: `${Math.min(100, progress)}%` }}
                            transition={{ duration: 0.06 }}
                            style={{
                                height: "100%",
                                background: `linear-gradient(90deg, ${ACCENT}, #f87171)`,
                                boxShadow: `0 0 8px ${ACCENT}`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
