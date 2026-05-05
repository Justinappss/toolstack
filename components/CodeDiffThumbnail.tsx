"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ADDED = "#22c55e";
const REMOVED = "#ef4444";
const ACCENT = "#f472b6";

const DIFFS = [
    {
        title: "auth.ts",
        lines: [
            { type: "ctx" as const, text: "function login(user, pass) {" },
            { type: "rem" as const, text: "  if (pass === user.password)" },
            { type: "add" as const, text: "  if (await bcrypt.compare(pass, user.hash))" },
            { type: "ctx" as const, text: "    return signToken(user);" },
            { type: "rem" as const, text: "  return null;" },
            { type: "add" as const, text: "  throw new AuthError('invalid');" },
            { type: "ctx" as const, text: "}" },
        ],
    },
    {
        title: "api.ts",
        lines: [
            { type: "ctx" as const, text: "export const fetchUser = async (id) => {" },
            { type: "rem" as const, text: "  const r = await fetch(`/u/${id}`);" },
            { type: "add" as const, text: "  const r = await fetch(`/api/v2/users/${id}`);" },
            { type: "rem" as const, text: "  return r.json();" },
            { type: "add" as const, text: "  if (!r.ok) throw r;" },
            { type: "add" as const, text: "  return await r.json();" },
            { type: "ctx" as const, text: "};" },
        ],
    },
];

export function CodeDiffThumbnail() {
    const [idx, setIdx] = useState(0);
    const d = DIFFS[idx];
    const adds = d.lines.filter(l => l.type === "add").length;
    const rems = d.lines.filter(l => l.type === "rem").length;

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % DIFFS.length), 3500);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a0a18 0%, #2a0a25 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <motion.span
                    key={idx}
                    initial={{ x: -6, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    style={{
                        fontSize: 10, fontWeight: 800, color: "white",
                        background: "rgba(0,0,0,0.4)",
                        padding: "3px 10px", borderRadius: 5,
                        border: `1px solid rgba(244,114,182,0.3)`,
                    }}
                >
                    📄 {d.title}
                </motion.span>
                <div style={{ display: "flex", gap: 5 }}>
                    <span style={{ fontSize: 9, fontWeight: 900, color: ADDED, background: `rgba(34,197,94,0.15)`, padding: "2px 6px", borderRadius: 4, border: `1px solid rgba(34,197,94,0.3)` }}>+{adds}</span>
                    <span style={{ fontSize: 9, fontWeight: 900, color: REMOVED, background: `rgba(239,68,68,0.15)`, padding: "2px 6px", borderRadius: 4, border: `1px solid rgba(239,68,68,0.3)` }}>-{rems}</span>
                </div>
            </div>

            {/* Diff lines */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.55)",
                border: `1px solid rgba(244,114,182,0.15)`,
                borderRadius: 8,
                padding: "8px 0",
                fontSize: 10, lineHeight: "16px",
                overflow: "hidden",
            }}>
                {d.lines.map((line, i) => {
                    const bg =
                        line.type === "add" ? `rgba(34,197,94,0.13)` :
                        line.type === "rem" ? `rgba(239,68,68,0.13)` : "transparent";
                    const color =
                        line.type === "add" ? "#bbf7d0" :
                        line.type === "rem" ? "#fecaca" : "rgba(255,255,255,0.6)";
                    const sign =
                        line.type === "add" ? "+" :
                        line.type === "rem" ? "-" : " ";
                    const signColor =
                        line.type === "add" ? ADDED :
                        line.type === "rem" ? REMOVED : "rgba(255,255,255,0.3)";
                    return (
                        <motion.div
                            key={`${idx}-${i}`}
                            initial={{ x: line.type === "add" ? 12 : line.type === "rem" ? -12 : 0, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.25, delay: i * 0.06 }}
                            style={{
                                display: "flex",
                                background: bg,
                                paddingLeft: 4,
                            }}
                        >
                            <span style={{ width: 14, color: signColor, fontWeight: 900, textAlign: "center" }}>{sign}</span>
                            <span style={{ color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{line.text}</span>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom — stats */}
            <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                    display: "flex", justifyContent: "space-between",
                    fontSize: 9, fontWeight: 800,
                }}
            >
                <span style={{ color: ACCENT, letterSpacing: "0.1em" }}>● {d.lines.length} CHANGES</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>side-by-side · unified</span>
            </motion.div>
        </div>
    );
}
