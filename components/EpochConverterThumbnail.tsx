"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#10b981";

const TIMEZONES = [
    { tz: "UTC", offset: 0, flag: "🌐" },
    { tz: "London", offset: 0, flag: "🇬🇧" },
    { tz: "New York", offset: -5, flag: "🇺🇸" },
    { tz: "Tokyo", offset: 9, flag: "🇯🇵" },
];

export function EpochConverterThumbnail() {
    const [epoch, setEpoch] = useState(1735000000);
    const [tzIdx, setTzIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setEpoch(e => e + 1);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setTzIdx(i => (i + 1) % TIMEZONES.length);
        }, 1500);
        return () => clearInterval(id);
    }, []);

    const tz = TIMEZONES[tzIdx];
    const date = new Date((epoch + tz.offset * 3600) * 1000);
    const dateStr = date.toUTCString().split(" ").slice(0, 4).join(" ");
    const timeStr = date.toUTCString().split(" ")[4];

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
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em", fontFamily: "Inter, sans-serif" }}>UNIX EPOCH</span>
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
                />
            </div>

            {/* Big epoch number */}
            <div style={{
                background: "rgba(0,0,0,0.55)",
                border: `1px solid ${ACCENT}`,
                borderRadius: 10,
                padding: "12px 14px",
                textAlign: "center",
                boxShadow: `0 0 18px rgba(16,185,129,0.2)`,
            }}>
                <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em", marginBottom: 3, fontFamily: "Inter, sans-serif" }}>
                    EPOCH SECONDS
                </div>
                <motion.div
                    key={epoch}
                    initial={{ y: -3, opacity: 0.8 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    style={{
                        fontSize: 26, fontWeight: 900, color: ACCENT,
                        letterSpacing: "-0.01em", lineHeight: 1,
                        textShadow: `0 0 14px rgba(16,185,129,0.5)`,
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {epoch.toLocaleString()}
                </motion.div>
            </div>

            {/* Conversion arrow */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <div style={{ flex: 1, height: 1, background: "rgba(16,185,129,0.2)" }} />
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ fontSize: 11, color: ACCENT }}
                >
                    ⇅
                </motion.span>
                <div style={{ flex: 1, height: 1, background: "rgba(16,185,129,0.2)" }} />
            </div>

            {/* Human-readable date */}
            <div style={{
                flex: 1,
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 8,
                padding: "8px 11px",
                display: "flex", flexDirection: "column", gap: 4,
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.6)", fontWeight: 800, letterSpacing: "0.16em", fontFamily: "Inter, sans-serif" }}>
                        HUMAN
                    </span>
                    <motion.span
                        key={tzIdx}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 280 }}
                        style={{
                            fontSize: 9, fontWeight: 800, color: ACCENT,
                            background: "rgba(16,185,129,0.15)",
                            padding: "2px 7px", borderRadius: 99,
                            border: `1px solid rgba(16,185,129,0.3)`,
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        {tz.flag} {tz.tz}
                    </motion.span>
                </div>
                <motion.div
                    key={`d-${tzIdx}`}
                    initial={{ x: -4, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    style={{ fontSize: 11, color: "white", fontWeight: 800, lineHeight: 1.4 }}
                >
                    {dateStr}
                </motion.div>
                <motion.div
                    key={`t-${epoch}`}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    style={{
                        fontSize: 14, color: ACCENT, fontWeight: 900,
                        textShadow: `0 0 8px rgba(16,185,129,0.5)`,
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {timeStr}
                </motion.div>
            </div>
        </div>
    );
}
