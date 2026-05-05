"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#38bdf8";

const HEX = "0123456789abcdef";
const rh = () => HEX[Math.floor(Math.random() * HEX.length)];

function genV4() {
    // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    let s = "";
    for (let i = 0; i < 32; i++) {
        if (i === 8 || i === 12 || i === 16 || i === 20) s += "-";
        if (i === 12) s += "4";
        else if (i === 16) s += HEX[8 + Math.floor(Math.random() * 4)];
        else s += rh();
    }
    return s;
}

export function UuidGeneratorThumbnail() {
    const [uuids, setUuids] = useState<string[]>([]);

    useEffect(() => {
        // Initial 4
        setUuids(Array.from({ length: 4 }, genV4));
        const id = setInterval(() => {
            setUuids(prev => {
                const next = [genV4(), ...prev.slice(0, 3)];
                return next;
            });
        }, 900);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #051422 0%, #0a2540 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em" }}>UUID v4</span>
                <div style={{ display: "flex", gap: 4 }}>
                    {["v4", "v1", "ULID", "NanoID"].map((f, i) => (
                        <motion.div key={f}
                            animate={{
                                background: i === 0 ? `rgba(56,189,248,0.25)` : `rgba(56,189,248,0.06)`,
                                borderColor: i === 0 ? ACCENT : `rgba(56,189,248,0.15)`,
                            }}
                            style={{
                                fontSize: 8, fontWeight: 800,
                                color: i === 0 ? "white" : "rgba(255,255,255,0.5)",
                                padding: "2.5px 6px", borderRadius: 4,
                                border: `1px solid`,
                                letterSpacing: "0.04em",
                            }}
                        >
                            {f}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* UUID list */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.5)",
                border: `1px solid rgba(56,189,248,0.2)`,
                borderRadius: 8,
                padding: "8px 10px",
                display: "flex", flexDirection: "column", gap: 6,
                overflow: "hidden",
            }}>
                {uuids.map((u, i) => (
                    <motion.div
                        key={u}
                        initial={{ y: -16, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: i === 0 ? 1 : 0.85 - i * 0.15, scale: 1 }}
                        exit={{ y: 16, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 20 }}
                        style={{
                            fontSize: 11, fontWeight: 700,
                            color: i === 0 ? ACCENT : "rgba(255,255,255,0.7)",
                            letterSpacing: "0.02em",
                            textShadow: i === 0 ? `0 0 8px rgba(56,189,248,0.45)` : "none",
                            display: "flex", alignItems: "center", gap: 6,
                        }}
                    >
                        {i === 0 && (
                            <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                style={{
                                    fontSize: 7, fontWeight: 900,
                                    background: `rgba(56,189,248,0.25)`,
                                    color: ACCENT,
                                    padding: "1px 4px", borderRadius: 3,
                                    letterSpacing: "0.1em",
                                }}
                            >
                                NEW
                            </motion.span>
                        )}
                        <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", flex: 1 }}>
                            {u}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Bottom */}
            <motion.div
                animate={{
                    boxShadow: [
                        `0 0 6px rgba(56,189,248,0.3)`,
                        `0 0 14px rgba(56,189,248,0.6)`,
                        `0 0 6px rgba(56,189,248,0.3)`,
                    ]
                }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                    background: ACCENT, color: "#051422",
                    fontSize: 9.5, fontWeight: 900, letterSpacing: "0.06em",
                    padding: "6px 0", borderRadius: 6,
                    textAlign: "center",
                }}
            >
                ⚡ GENERATE 100 MORE
            </motion.div>
        </div>
    );
}
