"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#10b981";

const TESTS = [
    {
        pattern: "\\b[\\w.]+@[\\w.]+\\.\\w+\\b",
        label: "EMAIL",
        text: "Contact us at hello@toolstack.tech or sales@example.com today.",
        matches: ["hello@toolstack.tech", "sales@example.com"],
    },
    {
        pattern: "\\b\\d{3}-\\d{3}-\\d{4}\\b",
        label: "PHONE",
        text: "Call 555-867-5309 or text 415-555-1212 for help.",
        matches: ["555-867-5309", "415-555-1212"],
    },
    {
        pattern: "https?://\\S+",
        label: "URL",
        text: "Visit https://toolstack.tech and http://example.org",
        matches: ["https://toolstack.tech", "http://example.org"],
    },
    {
        pattern: "#\\w+",
        label: "HASHTAG",
        text: "Loving the new #buildinpublic energy on #SaaS Twitter",
        matches: ["#buildinpublic", "#SaaS"],
    },
];

export function RegexTesterThumbnail() {
    const [idx, setIdx] = useState(0);
    const t = TESTS[idx];

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % TESTS.length), 2700);
        return () => clearInterval(id);
    }, []);

    // Highlight matches in the text
    const renderHighlighted = () => {
        let remaining = t.text;
        const parts: { text: string; match: boolean }[] = [];
        for (const m of t.matches) {
            const i = remaining.indexOf(m);
            if (i >= 0) {
                if (i > 0) parts.push({ text: remaining.slice(0, i), match: false });
                parts.push({ text: m, match: true });
                remaining = remaining.slice(i + m.length);
            }
        }
        if (remaining) parts.push({ text: remaining, match: false });
        return parts;
    };

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #051410 0%, #0a2018 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em" }}>REGEX TESTER</span>
                <motion.span
                    key={idx}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 14 }}
                    style={{
                        fontSize: 9, fontWeight: 800, color: ACCENT,
                        background: "rgba(16,185,129,0.15)",
                        padding: "3px 8px", borderRadius: 4,
                        letterSpacing: "0.12em",
                        border: `1px solid rgba(16,185,129,0.35)`,
                    }}
                >
                    {t.label}
                </motion.span>
            </div>

            {/* Pattern input */}
            <div style={{
                background: "rgba(0,0,0,0.5)",
                border: `1px solid rgba(16,185,129,0.3)`,
                borderRadius: 6,
                padding: "8px 10px",
                display: "flex", alignItems: "center", gap: 5,
            }}>
                <span style={{ fontSize: 10, color: ACCENT, fontWeight: 800 }}>/</span>
                <motion.span
                    key={`p-${idx}`}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontSize: 10.5, color: "white", fontWeight: 700, flex: 1,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}
                >
                    {t.pattern}
                </motion.span>
                <span style={{ fontSize: 10, color: ACCENT, fontWeight: 800 }}>/g</span>
            </div>

            {/* Test text with highlighted matches */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(16,185,129,0.15)",
                borderRadius: 6,
                padding: "9px 11px",
                fontSize: 10.5, lineHeight: 1.55,
                color: "rgba(255,255,255,0.7)",
                fontFamily: "ui-monospace, monospace",
            }}>
                <motion.div key={`t-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    {renderHighlighted().map((part, i) =>
                        part.match ? (
                            <motion.span
                                key={i}
                                initial={{ background: `rgba(16,185,129,0)` }}
                                animate={{ background: `rgba(16,185,129,0.4)` }}
                                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                                style={{
                                    color: ACCENT,
                                    fontWeight: 800,
                                    padding: "1px 3px",
                                    borderRadius: 3,
                                    border: `1px solid ${ACCENT}`,
                                    boxShadow: `0 0 6px rgba(16,185,129,0.3)`,
                                }}
                            >
                                {part.text}
                            </motion.span>
                        ) : (
                            <span key={i}>{part.text}</span>
                        )
                    )}
                </motion.div>
            </div>

            {/* Bottom — match counter */}
            <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontSize: 9, fontWeight: 800, color: ACCENT, letterSpacing: "0.06em",
                }}
            >
                <span>✓ {t.matches.length} matches</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>· 0.04ms</span>
            </motion.div>
        </div>
    );
}
