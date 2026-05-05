"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#10b981";

const SAMPLES = [
    [
        { k: '"name"', v: '"Justin"' },
        { k: '"age"', v: "32" },
        { k: '"role"', v: '"founder"' },
        { k: '"active"', v: "true" },
    ],
    [
        { k: '"id"', v: "8472" },
        { k: '"sku"', v: '"PR-91"' },
        { k: '"price"', v: "29.99" },
        { k: '"stock"', v: "true" },
    ],
    [
        { k: '"city"', v: '"London"' },
        { k: '"lat"', v: "51.5074" },
        { k: '"lng"', v: "-0.1278" },
        { k: '"tz"', v: '"GMT"' },
    ],
];

export function JsonFormatterThumbnail() {
    const [sampleIdx, setSampleIdx] = useState(0);
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        if (visible < 4) {
            const id = setTimeout(() => setVisible(v => v + 1), 220);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => {
            setVisible(0);
            setSampleIdx(i => (i + 1) % SAMPLES.length);
        }, 1800);
        return () => clearTimeout(id);
    }, [visible, sampleIdx]);

    const sample = SAMPLES[sampleIdx];

    return (
        <div style={{
            width: "100%",
            height: 220,
            background: "linear-gradient(135deg, #050a08 0%, #0a1612 100%)",
            display: "flex",
            position: "relative",
            overflow: "hidden",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}>
            {/* Top strip */}
            <div style={{
                position: "absolute", top: 8, left: 14, right: 14, zIndex: 3,
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", gap: 5 }}>
                    {["#ef4444", "#f59e0b", ACCENT].map(c => (
                        <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                    ))}
                </div>
                <span style={{ fontSize: 9, color: "rgba(16,185,129,0.7)", fontWeight: 800, letterSpacing: "0.16em" }}>data.json</span>
            </div>

            {/* Left column: minified */}
            <div style={{
                flex: 1, padding: "30px 12px 14px 16px",
                borderRight: `1px solid rgba(16,185,129,0.15)`,
                position: "relative",
            }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.14em", marginBottom: 6 }}>MIN</div>
                <div style={{
                    fontSize: 8.5, color: "rgba(255,255,255,0.45)",
                    wordBreak: "break-all", lineHeight: 1.5,
                }}>
                    {`{${sample.map(s => `${s.k}:${s.v}`).join(",")}}`}
                </div>
            </div>

            {/* Format arrow */}
            <motion.div
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 32, height: 32, borderRadius: "50%",
                    background: ACCENT,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 900, color: "#050a08",
                    boxShadow: `0 0 20px ${ACCENT}, 0 4px 12px rgba(16,185,129,0.4)`,
                    zIndex: 4,
                }}
            >
                →
            </motion.div>

            {/* Right column: formatted */}
            <div style={{ flex: 1, padding: "30px 14px 14px 16px", position: "relative" }}>
                <div style={{ fontSize: 8, color: ACCENT, fontWeight: 800, letterSpacing: "0.14em", marginBottom: 6 }}>FORMATTED</div>
                <div style={{ fontSize: 10, lineHeight: 1.55, color: "rgba(255,255,255,0.7)" }}>
                    <div>{`{`}</div>
                    {sample.map((s, i) => (
                        <motion.div key={`${sampleIdx}-${i}`}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: i < visible ? 1 : 0, x: i < visible ? 0 : -8 }}
                            transition={{ duration: 0.2 }}
                            style={{ paddingLeft: 12 }}
                        >
                            <span style={{ color: "#a5f3fc" }}>{s.k}</span>
                            <span style={{ color: "rgba(255,255,255,0.4)" }}>: </span>
                            <span style={{ color: ACCENT, fontWeight: 700 }}>{s.v}</span>
                            {i < sample.length - 1 && <span style={{ color: "rgba(255,255,255,0.4)" }}>,</span>}
                        </motion.div>
                    ))}
                    <div>{`}`}</div>
                </div>
            </div>

            {/* Bottom status */}
            <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                style={{
                    position: "absolute", bottom: 8, right: 14,
                    fontSize: 8, fontWeight: 900, color: ACCENT,
                    letterSpacing: "0.16em", padding: "3px 7px",
                    border: `1px solid rgba(16,185,129,0.4)`, borderRadius: 4,
                    background: `rgba(16,185,129,0.1)`,
                }}
            >
                ✓ VALID
            </motion.div>
        </div>
    );
}
