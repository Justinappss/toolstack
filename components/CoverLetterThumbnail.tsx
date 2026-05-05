"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#34d399";

const LETTERS = [
    {
        company: "Stripe",
        role: "Senior Frontend Engineer",
        tone: "Professional",
        body: "Dear Hiring Manager,\n\nWith 8 years building production-grade React applications, I'm excited to apply for the Senior Frontend Engineer role at Stripe. My passion for clean architecture and developer experience aligns deeply with your team's mission.\n\nIn my current role at Acme, I led the migration of our checkout flow to Next.js 14, reducing TTI by 47%.",
    },
    {
        company: "Notion",
        role: "Product Designer",
        tone: "Enthusiastic",
        body: "Hi Notion team!\n\nI've been a Notion power user since 2019 — every workflow I touch ends up there. The chance to design at the company that reshaped how I think about productivity is genuinely exciting.\n\nMy portfolio includes redesigning a 200K-user dashboard at Linear, where I shipped a Q3 update that lifted activation by 32%.",
    },
];

export function CoverLetterThumbnail() {
    const [idx, setIdx] = useState(0);
    const [progress, setProgress] = useState(0);
    const letter = LETTERS[idx];

    useEffect(() => {
        // Type the letter
        const text = letter.body;
        let i = 0;
        const id = setInterval(() => {
            i += 4;
            setProgress(i);
            if (i >= text.length) {
                clearInterval(id);
                setTimeout(() => {
                    setProgress(0);
                    setIdx(j => (j + 1) % LETTERS.length);
                }, 1400);
            }
        }, 18);
        return () => clearInterval(id);
    }, [idx, letter.body]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #061613 0%, #0a2620 100%)",
            padding: "14px 16px",
            display: "flex", gap: 10,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Left — letter document */}
            <div style={{
                flex: 1.7,
                background: "rgba(255,255,255,0.97)",
                borderRadius: 6,
                padding: "12px 14px",
                position: "relative",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 9, lineHeight: 1.55,
                color: "#1a1a1a",
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
            }}>
                {/* Letter content */}
                <div style={{ whiteSpace: "pre-wrap", fontWeight: 400 }}>
                    {letter.body.slice(0, progress)}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        style={{ color: "#10b981", fontWeight: 700 }}
                    >
                        |
                    </motion.span>
                </div>
                {/* Watermark/letterhead corner */}
                <div style={{
                    position: "absolute", top: 8, right: 10,
                    fontSize: 6, fontWeight: 900, color: "rgba(0,0,0,0.3)",
                    letterSpacing: "0.2em",
                }}>
                    DRAFT
                </div>
            </div>

            {/* Right — meta panel */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        style={{ fontSize: 11, color: ACCENT }}
                    >
                        ✦
                    </motion.span>
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.14em" }}>AI WRITING</span>
                </div>
                <div style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(52,211,153,0.2)",
                    borderRadius: 6,
                    padding: "6px 9px",
                }}>
                    <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.14em" }}>FOR</div>
                    <motion.div
                        key={`c-${idx}`}
                        initial={{ y: -3, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ fontSize: 11, fontWeight: 900, color: "white" }}
                    >
                        {letter.company}
                    </motion.div>
                </div>
                <div style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(52,211,153,0.2)",
                    borderRadius: 6,
                    padding: "6px 9px",
                }}>
                    <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: "0.14em" }}>ROLE</div>
                    <motion.div
                        key={`r-${idx}`}
                        initial={{ y: -3, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        style={{ fontSize: 9.5, fontWeight: 700, color: "white", lineHeight: 1.2 }}
                    >
                        {letter.role}
                    </motion.div>
                </div>
                <div style={{
                    background: `rgba(52,211,153,0.15)`,
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 6,
                    padding: "6px 9px",
                    boxShadow: `0 0 10px rgba(52,211,153,0.2)`,
                }}>
                    <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.14em" }}>TONE</div>
                    <motion.div
                        key={`t-${idx}`}
                        initial={{ scale: 0.7 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                        style={{ fontSize: 11, fontWeight: 900, color: ACCENT }}
                    >
                        {letter.tone}
                    </motion.div>
                </div>
                {/* Progress bar */}
                <div style={{ marginTop: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 7.5, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", marginBottom: 3 }}>
                        <span>WRITING</span>
                        <span style={{ color: ACCENT }}>{Math.min(100, Math.round(progress / letter.body.length * 100))}%</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(52,211,153,0.15)", borderRadius: 99, overflow: "hidden" }}>
                        <motion.div
                            animate={{ width: `${Math.min(100, progress / letter.body.length * 100)}%` }}
                            style={{ height: "100%", background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
