"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#60a5fa";

const SERPS = [
    {
        title: "Best Free SEO Tools — 2026 Edition",
        url: "toolstack.tech › blog › best-seo-tools",
        desc: "Discover 27 free SEO tools that beat the paid alternatives — keyword research, audits, schema generators and more.",
        ctr: 8.4,
    },
    {
        title: "How to Build a Side Project in 30 Days",
        url: "toolstack.tech › blog › build-side-project",
        desc: "A step-by-step guide for indie hackers — from idea validation to launch, no team, no budget required.",
        ctr: 6.2,
    },
    {
        title: "Free QR Code Generator — No Sign-up Needed",
        url: "toolstack.tech › tools › qr-code-generator",
        desc: "Generate QR codes for URLs, WiFi, vCards and more. Download as PNG or SVG. 100% free, no email required.",
        ctr: 11.7,
    },
];

export function MetaDescriptionThumbnail() {
    const [idx, setIdx] = useState(0);
    const [typed, setTyped] = useState("");
    const s = SERPS[idx];

    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i += 2;
            setTyped(s.desc.slice(0, i));
            if (i >= s.desc.length) {
                clearInterval(id);
                setTimeout(() => {
                    setTyped("");
                    setIdx(j => (j + 1) % SERPS.length);
                }, 1500);
            }
        }, 22);
        return () => clearInterval(id);
    }, [idx, s.desc]);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #0a1424 0%, #14243f 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 10, color: "#4285f4", fontWeight: 800 }}>G</span>
                    <span style={{ fontSize: 10, color: "#ea4335", fontWeight: 800 }}>o</span>
                    <span style={{ fontSize: 10, color: "#fbbc05", fontWeight: 800 }}>o</span>
                    <span style={{ fontSize: 10, color: "#4285f4", fontWeight: 800 }}>g</span>
                    <span style={{ fontSize: 10, color: "#0f9d58", fontWeight: 800 }}>l</span>
                    <span style={{ fontSize: 10, color: "#ea4335", fontWeight: 800 }}>e</span>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 700, marginLeft: 5, letterSpacing: "0.1em" }}>SERP PREVIEW</span>
                </div>
                <motion.div
                    key={`c-${idx}`}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 14 }}
                    style={{
                        fontSize: 9, fontWeight: 900, color: "#22c55e",
                        background: "rgba(34,197,94,0.15)",
                        padding: "3px 8px", borderRadius: 99,
                        border: `1px solid rgba(34,197,94,0.3)`,
                        textShadow: "0 0 6px rgba(34,197,94,0.4)",
                    }}
                >
                    {s.ctr}% CTR
                </motion.div>
            </div>

            {/* SERP card */}
            <div style={{
                flex: 1,
                background: "rgba(255,255,255,0.95)",
                borderRadius: 8,
                padding: "10px 14px",
                display: "flex", flexDirection: "column", gap: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}>
                {/* URL */}
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: "#5f6368" }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f1f3f4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800, color: "#202124" }}>T</div>
                    <span style={{ fontWeight: 600 }}>{s.url}</span>
                </div>
                {/* Title */}
                <motion.div
                    key={`t-${idx}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        fontSize: 14, fontWeight: 600, color: "#1a0dab",
                        lineHeight: 1.25,
                    }}
                >
                    {s.title}
                </motion.div>
                {/* Description */}
                <div style={{
                    fontSize: 10, color: "#4d5156",
                    lineHeight: 1.5,
                    fontWeight: 400,
                    minHeight: 44,
                }}>
                    {typed}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        style={{ color: ACCENT }}
                    >
                        |
                    </motion.span>
                </div>
            </div>

            {/* Bottom — char count */}
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.55)",
            }}>
                <span style={{ color: ACCENT, fontWeight: 800, letterSpacing: "0.1em" }}>● AI GENERATED</span>
                <span>
                    <motion.span
                        key={typed.length}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        style={{ color: typed.length <= 160 ? "#22c55e" : "#ef4444", fontWeight: 800 }}
                    >
                        {typed.length}
                    </motion.span>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}> / 160 chars</span>
                </span>
            </div>
        </div>
    );
}
