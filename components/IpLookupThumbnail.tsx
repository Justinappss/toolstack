"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#818cf8";

const LOCATIONS = [
    { ip: "203.0.113.42", city: "London", country: "🇬🇧 UK", isp: "Cloudflare", lat: 32, lng: 50 },
    { ip: "198.51.100.7", city: "San Francisco", country: "🇺🇸 USA", lat: 38, lng: 18, isp: "Comcast" },
    { ip: "192.0.2.91", city: "Tokyo", country: "🇯🇵 Japan", isp: "NTT", lat: 38, lng: 82 },
    { ip: "203.0.113.55", city: "Sydney", country: "🇦🇺 AUS", isp: "Telstra", lat: 76, lng: 88 },
    { ip: "198.51.100.30", city: "Dubai", country: "🇦🇪 UAE", isp: "Etisalat", lat: 50, lng: 64 },
];

export function IpLookupThumbnail() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % LOCATIONS.length), 2400);
        return () => clearInterval(id);
    }, []);

    const loc = LOCATIONS[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #0a0c1f 0%, #161636 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 9,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>IP LOOKUP</span>
                <motion.span
                    key={`ip-${idx}`}
                    initial={{ y: -4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        fontSize: 11, color: "white", fontWeight: 800,
                        background: "rgba(0,0,0,0.5)",
                        padding: "3px 10px", borderRadius: 99,
                        border: `1px solid ${ACCENT}`,
                        fontFamily: "ui-monospace, monospace",
                        boxShadow: `0 0 10px rgba(129,140,248,0.3)`,
                    }}
                >
                    {loc.ip}
                </motion.span>
            </div>

            {/* World map (stylized) */}
            <div style={{
                flex: 1,
                background: "rgba(0,0,0,0.5)",
                border: `1px solid rgba(129,140,248,0.2)`,
                borderRadius: 8,
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Grid lines */}
                <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(129,140,248,0.08)" strokeWidth="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100" height="60" fill="url(#grid)" />
                    {/* Continents shapes (very abstract) */}
                    <ellipse cx="22" cy="22" rx="14" ry="11" fill="rgba(129,140,248,0.18)" />
                    <ellipse cx="50" cy="20" rx="13" ry="9" fill="rgba(129,140,248,0.18)" />
                    <ellipse cx="78" cy="24" rx="14" ry="10" fill="rgba(129,140,248,0.18)" />
                    <ellipse cx="36" cy="42" rx="6" ry="9" fill="rgba(129,140,248,0.18)" />
                    <ellipse cx="58" cy="40" rx="8" ry="11" fill="rgba(129,140,248,0.18)" />
                    <ellipse cx="80" cy="46" rx="6" ry="5" fill="rgba(129,140,248,0.18)" />
                </svg>
                {/* Pin */}
                <motion.div
                    key={`p-${idx}`}
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    style={{
                        position: "absolute",
                        left: `${loc.lng}%`, top: `${loc.lat}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                            position: "absolute",
                            inset: -8,
                            borderRadius: "50%",
                            background: ACCENT,
                            opacity: 0.4,
                        }}
                    />
                    <div style={{
                        position: "relative",
                        width: 14, height: 14, borderRadius: "50%",
                        background: ACCENT,
                        border: "2px solid white",
                        boxShadow: `0 0 12px ${ACCENT}, 0 4px 6px rgba(0,0,0,0.4)`,
                    }} />
                </motion.div>
                {/* Location label */}
                <motion.div
                    key={`l-${idx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        position: "absolute",
                        left: 10, bottom: 10,
                        background: "rgba(0,0,0,0.75)",
                        border: `1px solid ${ACCENT}`,
                        borderRadius: 6,
                        padding: "5px 10px",
                        boxShadow: `0 4px 12px rgba(0,0,0,0.5)`,
                    }}
                >
                    <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>LOCATION</div>
                    <div style={{ fontSize: 11, color: "white", fontWeight: 800 }}>
                        {loc.city}, <span style={{ color: ACCENT }}>{loc.country}</span>
                    </div>
                </motion.div>
            </div>

            {/* Bottom — meta */}
            <div style={{
                display: "flex", gap: 6,
                fontSize: 9, fontWeight: 700,
            }}>
                <div style={{ flex: 1, background: "rgba(129,140,248,0.08)", borderRadius: 5, padding: "4px 7px", border: "1px solid rgba(129,140,248,0.18)" }}>
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>ISP </span>
                    <span style={{ color: "white", fontWeight: 800 }}>{loc.isp}</span>
                </div>
                <div style={{ flex: 1, background: "rgba(129,140,248,0.08)", borderRadius: 5, padding: "4px 7px", border: "1px solid rgba(129,140,248,0.18)" }}>
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>Type </span>
                    <span style={{ color: ACCENT, fontWeight: 800 }}>IPv4</span>
                </div>
            </div>
        </div>
    );
}
