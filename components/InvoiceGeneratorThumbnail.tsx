"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#fbbf24";

const ITEMS = [
    { item: "Web design (40h)", qty: 40, rate: 75, total: 3000 },
    { item: "Frontend dev (28h)", qty: 28, rate: 95, total: 2660 },
    { item: "Brand consultation", qty: 1, rate: 850, total: 850 },
    { item: "QA & polish (12h)", qty: 12, rate: 65, total: 780 },
];

export function InvoiceGeneratorThumbnail() {
    const [shown, setShown] = useState(0);

    useEffect(() => {
        if (shown < ITEMS.length) {
            const id = setTimeout(() => setShown(s => s + 1), 480);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => setShown(0), 1700);
        return () => clearTimeout(id);
    }, [shown]);

    const subtotal = ITEMS.slice(0, shown).reduce((sum, i) => sum + i.total, 0);
    const vat = +(subtotal * 0.2).toFixed(2);
    const total = +(subtotal + vat).toFixed(2);

    return (
        <div style={{
            width: "100%", height: 220,
            background: "linear-gradient(135deg, #1a1100 0%, #2a1a05 100%)",
            padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 8,
            position: "relative", overflow: "hidden",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: ACCENT, fontWeight: 900, letterSpacing: "0.16em" }}>INVOICE</span>
                <span style={{
                    fontSize: 9, color: "white", fontWeight: 800,
                    background: "rgba(251,191,36,0.15)",
                    padding: "3px 9px", borderRadius: 99,
                    border: `1px solid rgba(251,191,36,0.3)`,
                    letterSpacing: "0.06em",
                    fontFamily: "ui-monospace, monospace",
                }}>
                    INV #2026-0042
                </span>
            </div>

            {/* Invoice document */}
            <div style={{
                flex: 1,
                background: "white",
                borderRadius: 6,
                padding: "10px 12px",
                color: "#1a1a1a",
                fontFamily: "Helvetica, Arial, sans-serif",
                position: "relative",
                boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                display: "flex", flexDirection: "column", gap: 4,
                overflow: "hidden",
            }}>
                {/* Header row */}
                <div style={{
                    display: "grid", gridTemplateColumns: "2fr 0.6fr 0.7fr 0.7fr",
                    gap: 6,
                    fontSize: 7, fontWeight: 800, color: "#777",
                    letterSpacing: "0.12em",
                    paddingBottom: 3,
                    borderBottom: "1px solid #ddd",
                }}>
                    <span>ITEM</span>
                    <span style={{ textAlign: "right" }}>QTY</span>
                    <span style={{ textAlign: "right" }}>RATE</span>
                    <span style={{ textAlign: "right" }}>AMOUNT</span>
                </div>
                {/* Item rows */}
                {ITEMS.map((it, i) => (
                    <motion.div
                        key={`${i}-${shown}`}
                        initial={{ x: -12, opacity: 0 }}
                        animate={{
                            x: i < shown ? 0 : -12,
                            opacity: i < shown ? 1 : 0.15,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: "grid", gridTemplateColumns: "2fr 0.6fr 0.7fr 0.7fr",
                            gap: 6,
                            fontSize: 8.5, fontWeight: 600, color: "#1a1a1a",
                        }}
                    >
                        <span>{it.item}</span>
                        <span style={{ textAlign: "right", color: "#666" }}>{it.qty}</span>
                        <span style={{ textAlign: "right", color: "#666" }}>£{it.rate}</span>
                        <span style={{ textAlign: "right", fontWeight: 800 }}>£{it.total.toLocaleString()}</span>
                    </motion.div>
                ))}
                {/* Totals */}
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 2, paddingTop: 4, borderTop: "1px solid #ddd" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: "#555" }}>
                        <span>Subtotal</span>
                        <motion.span key={`s-${subtotal}`} initial={{ y: -2 }} animate={{ y: 0 }} style={{ fontWeight: 700 }}>£{subtotal.toLocaleString()}</motion.span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: "#555" }}>
                        <span>VAT (20%)</span>
                        <motion.span key={`v-${vat}`} initial={{ y: -2 }} animate={{ y: 0 }} style={{ fontWeight: 700 }}>£{vat.toLocaleString()}</motion.span>
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "space-between",
                        fontSize: 11, color: "#0a0a0a", fontWeight: 900,
                        marginTop: 2,
                    }}>
                        <span>TOTAL</span>
                        <motion.span
                            key={`t-${total}`}
                            initial={{ scale: 0.85, color: "#10b981" }}
                            animate={{ scale: 1, color: "#0a0a0a" }}
                            transition={{ duration: 0.4 }}
                        >
                            £{total.toLocaleString()}
                        </motion.span>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontSize: 8.5, fontWeight: 800,
                }}
            >
                <span style={{ color: ACCENT, letterSpacing: "0.12em" }}>● PDF READY</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>No watermark · Free</span>
            </motion.div>
        </div>
    );
}
