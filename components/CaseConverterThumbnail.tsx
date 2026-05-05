"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#22d3ee";

const CASES = [
    { name: "UPPERCASE", value: "BUILD IN PUBLIC, SHIP DAILY" },
    { name: "lowercase", value: "build in public, ship daily" },
    { name: "Title Case", value: "Build In Public, Ship Daily" },
    { name: "Sentence case", value: "Build in public, ship daily" },
    { name: "camelCase", value: "buildInPublicShipDaily" },
    { name: "PascalCase", value: "BuildInPublicShipDaily" },
    { name: "snake_case", value: "build_in_public_ship_daily" },
    { name: "kebab-case", value: "build-in-public-ship-daily" },
    { name: "CONSTANT", value: "BUILD_IN_PUBLIC_SHIP_DAILY" },
];

export function CaseConverterThumbnail() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % CASES.length), 1300);
        return () => clearInterval(id);
    }, []);

    const c = CASES[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #051422 0%, #0a2440 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>CASE CONVERTER</span>
                <motion.span
                    key={`n-${idx}`}
                    initial={{ y: -4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    style={{
                        fontSize: 9, fontWeight: 900, color: ACCENT,
                        background: `rgba(34,211,238,0.18)`,
                        padding: "3px 9px", borderRadius: 99,
                        border: `1px solid rgba(34,211,238,0.4)`,
                        letterSpacing: "0.06em",
                        fontFamily: "ui-monospace, monospace",
                    }}
                >
                    {c.name}
                </motion.span>
            </div>

            {/* Big text display */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.55)",
                border: `1px solid rgba(34,211,238,0.3)`,
                borderRadius: 10,
                padding: "16px 18px",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 0 18px rgba(34,211,238,0.15)`,
            }}>
                <motion.div
                    key={`v-${idx}`}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    style={{
                        fontSize: 16, fontWeight: 800,
                        color: ACCENT, textAlign: "center",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                        textShadow: `0 0 12px rgba(34,211,238,0.5)`,
                        fontFamily: "ui-monospace, SFMono-Regular, monospace",
                    }}
                >
                    {c.value}
                </motion.div>
            </div>

            {/* Bottom — case selector grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
                {CASES.slice(0, 9).map((cs, i) => (
                    <motion.div key={cs.name}
                        animate={{
                            background: i === idx ? `rgba(34,211,238,0.3)` : `rgba(34,211,238,0.05)`,
                            borderColor: i === idx ? ACCENT : `rgba(34,211,238,0.15)`,
                            scale: i === idx ? 1.05 : 1,
                        }}
                        style={{
                            fontSize: 7.5, fontWeight: 800,
                            color: i === idx ? "white" : "rgba(255,255,255,0.5)",
                            padding: "4px 0", borderRadius: 4,
                            border: "1px solid",
                            textAlign: "center",
                            letterSpacing: "0.02em",
                            fontFamily: "ui-monospace, monospace",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {cs.name}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
