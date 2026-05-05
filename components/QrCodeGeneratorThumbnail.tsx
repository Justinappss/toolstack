"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#22d3ee";
const URLS = [
    "toolstack.tech",
    "github.com",
    "wa.me/447",
    "linkedin.com",
];

const GRID = 9;

function genPattern(seed: number): boolean[][] {
    const rows: boolean[][] = [];
    let s = seed * 9301 + 49297;
    for (let r = 0; r < GRID; r++) {
        const row: boolean[] = [];
        for (let c = 0; c < GRID; c++) {
            // Force the 3 corner finder squares to be filled
            const isFinder =
                (r < 3 && c < 3) ||
                (r < 3 && c >= GRID - 3) ||
                (r >= GRID - 3 && c < 3);
            if (isFinder) {
                const inner = (r === 0 || r === 2 || r === GRID - 1 || r === GRID - 3 || c === 0 || c === 2 || c === GRID - 1 || c === GRID - 3);
                const center = (r === 1 && c === 1) || (r === 1 && c === GRID - 2) || (r === GRID - 2 && c === 1);
                row.push(inner || center);
            } else {
                s = (s * 9301 + 49297) % 233280;
                row.push((s / 233280) > 0.5);
            }
        }
        rows.push(row);
    }
    return rows;
}

export function QrCodeGeneratorThumbnail() {
    const [seed, setSeed] = useState(1);
    const [urlIdx, setUrlIdx] = useState(0);
    const [pattern, setPattern] = useState<boolean[][]>(() => genPattern(1));

    useEffect(() => {
        const id = setInterval(() => {
            setSeed(s => s + 1);
            setUrlIdx(i => (i + 1) % URLS.length);
        }, 2400);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        setPattern(genPattern(seed));
    }, [seed]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #021419 0%, #062430 100%)",
            padding: "14px 16px",
            position: "relative", overflow: "hidden",
            display: "flex", alignItems: "center", gap: 14,
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* QR pattern */}
            <div style={{
                width: 140, height: 140,
                padding: 8, background: "white",
                borderRadius: 10, flexShrink: 0,
                boxShadow: `0 0 20px rgba(34,211,238,0.3)`,
                display: "grid",
                gridTemplateColumns: `repeat(${GRID}, 1fr)`,
                gridTemplateRows: `repeat(${GRID}, 1fr)`,
                gap: 1,
            }}>
                {pattern.flat().map((on, i) => (
                    <motion.div
                        key={`${seed}-${i}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25, delay: (i % GRID + Math.floor(i / GRID)) * 0.018 }}
                        style={{
                            background: on ? "#06070d" : "transparent",
                            borderRadius: 1,
                        }}
                    />
                ))}
            </div>

            {/* Right side info */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                <div style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em" }}>QR CODE</div>
                <div style={{
                    background: "rgba(34,211,238,0.08)",
                    border: `1px solid rgba(34,211,238,0.25)`,
                    borderRadius: 8,
                    padding: "8px 10px",
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11, color: "white", fontWeight: 700,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }}>
                    <motion.span
                        key={urlIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span style={{ color: ACCENT }}>https://</span>{URLS[urlIdx]}
                    </motion.span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    {["PNG", "SVG", "JPG"].map((fmt, i) => (
                        <motion.div key={fmt}
                            animate={{
                                background: i === 0 ? `rgba(34,211,238,0.25)` : `rgba(34,211,238,0.08)`,
                                borderColor: i === 0 ? ACCENT : `rgba(34,211,238,0.2)`,
                            }}
                            style={{
                                fontSize: 9, fontWeight: 800,
                                color: i === 0 ? "white" : "rgba(255,255,255,0.55)",
                                padding: "4px 9px", borderRadius: 5,
                                border: `1px solid`,
                                letterSpacing: "0.06em",
                                flex: 1, textAlign: "center",
                            }}
                        >
                            {fmt}
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    animate={{
                        boxShadow: [
                            `0 0 6px rgba(34,211,238,0.3)`,
                            `0 0 14px rgba(34,211,238,0.6)`,
                            `0 0 6px rgba(34,211,238,0.3)`,
                        ]
                    }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{
                        background: ACCENT, color: "#06070d",
                        fontSize: 10, fontWeight: 900, letterSpacing: "0.06em",
                        padding: "7px 0", borderRadius: 6,
                        textAlign: "center",
                    }}
                >
                    ↓ DOWNLOAD
                </motion.div>
            </div>
        </div>
    );
}
