"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const RED = "#ef4444";
const PURPLE = "#a78bfa";
const CYAN = "#22d3ee";
const ACCENT = "#fb923c";

const TOKENS = [
    {
        header: { alg: "HS256", typ: "JWT" },
        payload: { sub: "1234", name: "Justin", iat: 1735000000, role: "founder" },
        valid: true,
    },
    {
        header: { alg: "RS256", typ: "JWT" },
        payload: { sub: "9921", email: "user@toolstack.tech", exp: 1736500000 },
        valid: true,
    },
    {
        header: { alg: "HS256", typ: "JWT" },
        payload: { sub: "8472", iat: 1700000000, exp: 1701000000 },
        valid: false,
    },
];

const HEX = "abcdef0123456789";

export function JwtDecoderThumbnail() {
    const [idx, setIdx] = useState(0);
    const [sig, setSig] = useState("a3f9c2b...");

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % TOKENS.length), 3000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            const len = 12;
            const s = Array.from({ length: len }, () => HEX[Math.floor(Math.random() * HEX.length)]).join("");
            setSig(s.slice(0, 7) + "...");
        }, 200);
        return () => clearInterval(id);
    }, []);

    const t = TOKENS[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a0d00 0%, #2a1500 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em", fontFamily: "Inter, sans-serif" }}>JWT DECODER</span>
                <motion.div
                    key={`v-${idx}`}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    style={{
                        fontSize: 9, fontWeight: 900,
                        color: t.valid ? "#22c55e" : "#ef4444",
                        background: t.valid ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                        padding: "3px 8px", borderRadius: 99,
                        border: `1px solid ${t.valid ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                        letterSpacing: "0.1em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    {t.valid ? "✓ VALID" : "✗ EXPIRED"}
                </motion.div>
            </div>

            {/* Token (stylized) */}
            <div style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(251,146,60,0.2)",
                borderRadius: 6,
                padding: "6px 9px",
                fontSize: 9, lineHeight: 1.3,
                wordBreak: "break-all",
                color: "rgba(255,255,255,0.85)",
            }}>
                <span style={{ color: RED }}>eyJhbGciOiJIUzI1...</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>.</span>
                <span style={{ color: PURPLE }}>eyJzdWIiOiIxMjM0...</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>.</span>
                <span style={{ color: CYAN }}>{sig}</span>
            </div>

            {/* Three sections */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 6 }}>
                {/* HEADER */}
                <motion.div
                    key={`h-${idx}`}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        background: `rgba(239,68,68,0.1)`,
                        border: `1px solid rgba(239,68,68,0.3)`,
                        borderRadius: 6, padding: "6px 8px",
                    }}
                >
                    <div style={{ fontSize: 7.5, fontWeight: 900, color: RED, letterSpacing: "0.16em", marginBottom: 3 }}>HEADER</div>
                    <div style={{ fontSize: 9, color: "white", lineHeight: 1.4 }}>
                        <div><span style={{ color: RED }}>alg:</span> &quot;{t.header.alg}&quot;</div>
                        <div><span style={{ color: RED }}>typ:</span> &quot;{t.header.typ}&quot;</div>
                    </div>
                </motion.div>

                {/* PAYLOAD */}
                <motion.div
                    key={`p-${idx}`}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        background: `rgba(167,139,250,0.1)`,
                        border: `1px solid rgba(167,139,250,0.3)`,
                        borderRadius: 6, padding: "6px 8px",
                    }}
                >
                    <div style={{ fontSize: 7.5, fontWeight: 900, color: PURPLE, letterSpacing: "0.16em", marginBottom: 3 }}>PAYLOAD</div>
                    <div style={{ fontSize: 9, color: "white", lineHeight: 1.4 }}>
                        {Object.entries(t.payload).slice(0, 3).map(([k, v]) => (
                            <div key={k}>
                                <span style={{ color: PURPLE }}>{k}:</span>
                                <span style={{ color: "#22d3ee" }}> {typeof v === "string" ? `"${v}"` : v}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
