"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#22d3ee";

const SIGS = [
    {
        name: "Justin Pirrie",
        role: "Founder · ToolStack",
        email: "justin@toolstack.tech",
        phone: "+44 20 7123 4567",
        website: "toolstack.tech",
        avatar: "JP",
        color: "#818cf8",
    },
    {
        name: "Alex Rivera",
        role: "Senior Designer",
        email: "alex@notion.so",
        phone: "+1 415 555 0123",
        website: "alex.design",
        avatar: "AR",
        color: "#f472b6",
    },
    {
        name: "Sam Chen",
        role: "Product Engineer",
        email: "sam@stripe.com",
        phone: "+1 212 555 9876",
        website: "samchen.dev",
        avatar: "SC",
        color: "#34d399",
    },
];

export function EmailSignatureThumbnail() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % SIGS.length), 2700);
        return () => clearInterval(id);
    }, []);

    const s = SIGS[idx];

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
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>SIGNATURE</span>
                <div style={{ display: "flex", gap: 4 }}>
                    {["Modern", "Classic", "Bold"].map((t, i) => (
                        <motion.div key={t}
                            animate={{
                                background: i === idx % 3 ? `rgba(34,211,238,0.25)` : `rgba(34,211,238,0.06)`,
                                borderColor: i === idx % 3 ? ACCENT : `rgba(34,211,238,0.18)`,
                            }}
                            style={{
                                fontSize: 8.5, fontWeight: 800,
                                color: i === idx % 3 ? "white" : "rgba(255,255,255,0.55)",
                                padding: "2px 7px", borderRadius: 4,
                                border: `1px solid`,
                            }}
                        >
                            {t}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Email card preview */}
            <div style={{
                flex: 1,
                background: "white",
                borderRadius: 6,
                padding: "10px 12px",
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#1a1a1a",
                position: "relative",
                boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
                overflow: "hidden",
            }}>
                <motion.div
                    key={`s-${idx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                    {/* Avatar */}
                    <motion.div
                        key={`a-${idx}`}
                        initial={{ scale: 0.7, rotate: -6 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 280 }}
                        style={{
                            width: 44, height: 44,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 17, fontWeight: 900, color: "white",
                            boxShadow: `0 4px 10px ${s.color}40`,
                            flexShrink: 0,
                        }}
                    >
                        {s.avatar}
                    </motion.div>
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <motion.div
                            key={`n-${idx}`}
                            initial={{ x: 4, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            style={{ fontSize: 13, fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.01em" }}
                        >
                            {s.name}
                        </motion.div>
                        <div style={{ fontSize: 9.5, color: s.color, fontWeight: 700, marginTop: 1 }}>{s.role}</div>
                        <div style={{
                            height: 1, background: `linear-gradient(90deg, ${s.color}, transparent)`,
                            margin: "5px 0",
                        }} />
                        <div style={{ fontSize: 8.5, color: "#4b5563", lineHeight: 1.5 }}>
                            ✉ {s.email}<br />
                            ✆ {s.phone}<br />
                            🌐 {s.website}
                        </div>
                    </div>
                </motion.div>

                {/* Social icons */}
                <div style={{ position: "absolute", bottom: 10, right: 12, display: "flex", gap: 4 }}>
                    {["L", "T", "G"].map((c, i) => (
                        <motion.div key={c}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                            style={{
                                width: 18, height: 18,
                                borderRadius: 4,
                                background: s.color,
                                color: "white",
                                fontSize: 9, fontWeight: 900,
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            {c}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom — copy HTML */}
            <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontSize: 9, fontWeight: 800,
                }}
            >
                <span style={{ color: ACCENT, letterSpacing: "0.12em" }}>● HTML READY</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Gmail · Outlook · Apple Mail</span>
            </motion.div>
        </div>
    );
}
