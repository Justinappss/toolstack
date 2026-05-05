"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#10b981";

const QUERIES = [
    [
        { kw: "SELECT", body: "id, name, email" },
        { indent: 1, kw: "FROM", body: "users" },
        { indent: 1, kw: "WHERE", body: "active = true" },
        { indent: 2, kw: "AND", body: "created_at > '2024-01-01'" },
        { indent: 1, kw: "ORDER BY", body: "created_at DESC" },
    ],
    [
        { kw: "INSERT INTO", body: "orders (sku, qty)" },
        { indent: 1, kw: "VALUES", body: "('PR-91', 4)," },
        { indent: 1, kw: "", body: "('PR-92', 2);" },
    ],
    [
        { kw: "UPDATE", body: "products" },
        { indent: 1, kw: "SET", body: "stock = stock - 1" },
        { indent: 1, kw: "WHERE", body: "id = 8472;" },
    ],
];

export function SqlFormatterThumbnail() {
    const [idx, setIdx] = useState(0);
    const [shown, setShown] = useState(0);
    const q = QUERIES[idx];

    useEffect(() => {
        if (shown < q.length) {
            const id = setTimeout(() => setShown(s => s + 1), 280);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => {
            setShown(0);
            setIdx(i => (i + 1) % QUERIES.length);
        }, 1700);
        return () => clearTimeout(id);
    }, [shown, q.length]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #050a08 0%, #0a1612 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}>
            {/* Top tab */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 4 }}>
                    {["postgres", "mysql", "sqlite"].map((d, i) => (
                        <motion.div key={d}
                            animate={{
                                background: i === idx % 3 ? `rgba(16,185,129,0.25)` : `rgba(16,185,129,0.05)`,
                                borderColor: i === idx % 3 ? ACCENT : `rgba(16,185,129,0.15)`,
                            }}
                            style={{
                                fontSize: 8.5, fontWeight: 800,
                                color: i === idx % 3 ? "white" : "rgba(255,255,255,0.5)",
                                padding: "3px 8px", borderRadius: 4,
                                border: `1px solid`,
                                letterSpacing: "0.06em",
                            }}
                        >
                            {d}
                        </motion.div>
                    ))}
                </div>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>SQL</span>
            </div>

            {/* Code editor */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.5)",
                border: `1px solid rgba(16,185,129,0.2)`,
                borderRadius: 8,
                padding: "9px 0",
                display: "flex",
                position: "relative",
            }}>
                {/* Line numbers */}
                <div style={{
                    width: 24, padding: "0 6px",
                    fontSize: 9, color: "rgba(16,185,129,0.4)",
                    fontWeight: 700,
                    textAlign: "right",
                    borderRight: "1px solid rgba(16,185,129,0.1)",
                }}>
                    {Array.from({ length: q.length }).map((_, i) => (
                        <div key={i} style={{ lineHeight: "16px" }}>{i + 1}</div>
                    ))}
                </div>
                {/* Lines */}
                <div style={{ flex: 1, padding: "0 10px", fontSize: 11, lineHeight: "16px" }}>
                    {q.map((line, i) => (
                        <motion.div
                            key={`${idx}-${i}`}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: i < shown ? 1 : 0, x: i < shown ? 0 : -8 }}
                            transition={{ duration: 0.2 }}
                            style={{ paddingLeft: (line.indent || 0) * 12 }}
                        >
                            <span style={{ color: "#a5b4fc", fontWeight: 800 }}>{line.kw}</span>
                            {line.kw && line.body && <span> </span>}
                            <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{line.body}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom — status */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 8.5, fontWeight: 900, color: ACCENT,
                        letterSpacing: "0.14em",
                    }}
                >
                    ✓ FORMATTED · {q.length} lines
                </motion.span>
                <span style={{
                    fontSize: 8.5, fontWeight: 800, color: "rgba(255,255,255,0.5)",
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    padding: "2px 7px", borderRadius: 4,
                    letterSpacing: "0.08em",
                }}>
                    COPY ⌘C
                </span>
            </div>
        </div>
    );
}
