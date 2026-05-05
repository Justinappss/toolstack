"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#f97316";

const DOMAINS = [
    { domain: "stripe.com", registrar: "MarkMonitor", created: "1995-09-12", expires: "2030-09-11", ns: "ns1.cloudflare.com" },
    { domain: "vercel.app", registrar: "Tucows", created: "2017-04-22", expires: "2027-04-22", ns: "ns3.dnsimple.com" },
    { domain: "github.com", registrar: "MarkMonitor Inc.", created: "2007-10-09", expires: "2028-10-09", ns: "ns-1283.awsdns" },
    { domain: "toolstack.tech", registrar: "Cloudflare", created: "2026-01-12", expires: "2027-01-12", ns: "elsa.ns.cloudflare.com" },
];

export function WhoisLookupThumbnail() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % DOMAINS.length), 2700);
        return () => clearInterval(id);
    }, []);

    const d = DOMAINS[idx];

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a0d00 0%, #2a1500 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>WHOIS</span>
                <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                        fontSize: 9, fontWeight: 800, color: ACCENT,
                        background: "rgba(249,115,22,0.15)",
                        padding: "3px 8px", borderRadius: 99,
                        border: `1px solid rgba(249,115,22,0.3)`,
                        letterSpacing: "0.1em",
                    }}
                >
                    ● REGISTERED
                </motion.span>
            </div>

            {/* Domain card */}
            <motion.div
                key={`d-${idx}`}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                style={{
                    background: `rgba(249,115,22,0.18)`,
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 8,
                    padding: "10px 14px",
                    boxShadow: `0 0 16px rgba(249,115,22,0.2)`,
                }}
            >
                <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 900, letterSpacing: "0.18em", marginBottom: 2 }}>DOMAIN</div>
                <div style={{
                    fontSize: 18, fontWeight: 900, color: "white",
                    fontFamily: "ui-monospace, monospace",
                    letterSpacing: "-0.01em",
                    textShadow: `0 0 10px rgba(249,115,22,0.4)`,
                }}>
                    {d.domain}
                </div>
            </motion.div>

            {/* Detail rows */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                    { label: "Registrar", value: d.registrar, delay: 0 },
                    { label: "Created", value: d.created, delay: 0.1 },
                    { label: "Expires", value: d.expires, delay: 0.2, highlight: true },
                    { label: "Nameserver", value: d.ns, delay: 0.3, mono: true },
                ].map(row => (
                    <motion.div
                        key={`${idx}-${row.label}`}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: row.delay }}
                        style={{
                            background: row.highlight ? "rgba(249,115,22,0.12)" : "rgba(0,0,0,0.4)",
                            border: row.highlight ? `1px solid rgba(249,115,22,0.3)` : "1px solid rgba(249,115,22,0.12)",
                            borderRadius: 5,
                            padding: "5px 10px",
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            fontSize: 9.5,
                        }}
                    >
                        <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 800, letterSpacing: "0.06em" }}>{row.label}</span>
                        <span style={{
                            color: row.highlight ? ACCENT : "white",
                            fontWeight: 800,
                            fontFamily: row.mono ? "ui-monospace, monospace" : "inherit",
                            fontSize: row.mono ? 9 : 10,
                        }}>
                            {row.value}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
