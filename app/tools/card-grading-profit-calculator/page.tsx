"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

const accent = "#f59e0b";
const accentBg = "rgba(245,158,11,0.08)";
const accentBorder = "rgba(245,158,11,0.2)";

type GraderKey = "PSA" | "BGS" | "SGC" | "CSG";

const GRADERS: Record<GraderKey, { name: string; tiers: { name: string; fee: number; days: number }[] }> = {
    PSA: {
        name: "PSA",
        tiers: [
            { name: "Value Bulk", fee: 24.99, days: 95 },
            { name: "Value", fee: 32.99, days: 45 },
            { name: "Regular", fee: 79.99, days: 25 },
            { name: "Express", fee: 149.99, days: 10 },
            { name: "Super Express", fee: 299.99, days: 5 },
        ],
    },
    BGS: {
        name: "BGS (Beckett)",
        tiers: [
            { name: "Economy", fee: 19, days: 90 },
            { name: "Standard", fee: 24.95, days: 45 },
            { name: "Express", fee: 49.95, days: 15 },
            { name: "Premium", fee: 124.95, days: 5 },
        ],
    },
    SGC: {
        name: "SGC",
        tiers: [
            { name: "Economy", fee: 15, days: 90 },
            { name: "Standard", fee: 18, days: 45 },
            { name: "Express", fee: 30, days: 10 },
        ],
    },
    CSG: {
        name: "CSG",
        tiers: [
            { name: "Economy", fee: 15, days: 60 },
            { name: "Standard", fee: 25, days: 30 },
            { name: "Express", fee: 50, days: 10 },
        ],
    },
};

const EBAY_RATE = 0.129;
const EBAY_FIXED = 0.30;

function calcResult(buyPrice: number, salePrice: number, gradingFee: number, shipping: number, includeEbay: boolean) {
    const ebayFee = includeEbay ? salePrice * EBAY_RATE + EBAY_FIXED : 0;
    const totalCost = buyPrice + gradingFee + shipping;
    const netRevenue = salePrice - ebayFee;
    const profit = netRevenue - totalCost;
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
    return { ebayFee, totalCost, netRevenue, profit, roi };
}

function fmt(n: number, prefix = "$"): string {
    const abs = Math.abs(n);
    const str = abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (n < 0 ? "-" : "") + prefix + str;
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "Card Grading Profit Calculator",
            "description": "Calculate your profit after grading trading cards. Compare PSA, BGS, SGC and CSG fees to find the most profitable grading option.",
            "url": "https://toolstack.tech/tools/card-grading-profit-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                { "@type": "ListItem", "position": 2, "name": "Collectibles", "item": "https://toolstack.tech/tools?category=collectibles" },
                { "@type": "ListItem", "position": 3, "name": "Card Grading Profit Calculator", "item": "https://toolstack.tech/tools/card-grading-profit-calculator" },
            ],
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Is it worth grading trading cards?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Grading is worth it when the increase in sale price from a graded card exceeds the combined costs of grading fees, shipping, and selling platform fees. A PSA 10 gem mint can sell for 5-10x the raw card price for modern star players and key vintage cards. For bulk low-value cards (under $20 raw), grading rarely makes financial sense — the fees eat all profit."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the cheapest PSA grading service?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "PSA's cheapest tier is Value Bulk at $24.99 per card with a 95-day turnaround. Cards must be worth under $499 to qualify. The Value tier is $32.99 with a 45-day turnaround. PSA regularly changes its pricing and turnaround times, so check PSA's website for the latest figures."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How much does BGS grading cost?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "BGS (Beckett Grading Services) starts at $19 per card for Economy tier (90 days). Standard is $24.95 (45 days), Express $49.95 (15 days), and Premium $124.95 (5 days). BGS grades use sub-grades for corners, edges, surface and centering, making a BGS 10 Black Label one of the most coveted grades in the hobby."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Which grading company is best — PSA, BGS, or SGC?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "PSA graded cards command the highest average sale prices on eBay and are the most widely recognised, making them the best choice for most cards. BGS is preferred for modern cards where the sub-grade system can unlock premium premiums for near-perfect copies. SGC is popular for vintage pre-war and early 20th century cards, offering competitive pricing at $15 economy. The best choice depends on the card era, type and target buyer."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What are the eBay selling fees for graded cards?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "eBay charges 12.9% of the total sale amount plus $0.30 per order for trading cards. This means on a $100 graded card sale, you pay $13.20 in eBay fees, netting $86.80 before shipping costs. Some sellers use alternative platforms like PWCC, Whatnot or Goldin to reduce fees on high-value cards."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the best card grading profit calculator?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "ToolStack's Card Grading Profit Calculator lets you compare PSA, BGS, SGC and CSG fees side by side, includes eBay selling fees, and instantly shows net profit and ROI — all free with no signup required."
                    }
                },
            ],
        },
    ],
};

export default function CardGradingProfitCalculator() {
    const [buyPrice, setBuyPrice] = useState("25");
    const [salePrice, setSalePrice] = useState("150");
    const [grader, setGrader] = useState<GraderKey>("PSA");
    const [tierIndex, setTierIndex] = useState(0);
    const [shipping, setShipping] = useState("15");
    const [includeEbay, setIncludeEbay] = useState(true);

    const currentTiers = GRADERS[grader].tiers;
    const safeTierIndex = Math.min(tierIndex, currentTiers.length - 1);
    const selectedTier = currentTiers[safeTierIndex];

    const result = useMemo(() => {
        const buy = parseFloat(buyPrice) || 0;
        const sale = parseFloat(salePrice) || 0;
        const ship = parseFloat(shipping) || 0;
        if (sale <= 0) return null;
        return calcResult(buy, sale, selectedTier.fee, ship, includeEbay);
    }, [buyPrice, salePrice, selectedTier.fee, shipping, includeEbay]);

    const comparison = useMemo(() => {
        const buy = parseFloat(buyPrice) || 0;
        const sale = parseFloat(salePrice) || 0;
        const ship = parseFloat(shipping) || 0;
        if (sale <= 0) return null;
        return (Object.keys(GRADERS) as GraderKey[]).map(key => {
            const cheapest = GRADERS[key].tiers[0];
            const r = calcResult(buy, sale, cheapest.fee, ship, includeEbay);
            return { key, name: GRADERS[key].name, tier: cheapest.name, fee: cheapest.fee, ...r };
        });
    }, [buyPrice, salePrice, shipping, includeEbay]);

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "12px 14px", borderRadius: 10,
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
        color: "white", fontSize: 15, outline: "none", boxSizing: "border-box",
    };
    const labelStyle: React.CSSProperties = {
        fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8, display: "block",
    };

    const profitColor = result ? (result.profit >= 0 ? "#34d399" : "#f87171") : "white";

    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
                        <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>ToolStack</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/tools?category=collectibles" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Collectibles</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Card Grading Profit Calculator</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Collectibles</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Free · No signup</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 16, color: "white" }}>
                        Card Grading Profit Calculator
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", maxWidth: 560, lineHeight: 1.65, marginBottom: 0 }}>
                        Is grading your card worth it? Enter your numbers and instantly see profit, ROI and a side-by-side comparison of PSA, BGS, SGC and CSG fees.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 20px 100px" }}>

                {/* Main calculator */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 24 }}>

                    {/* Inputs */}
                    <div style={{ padding: "28px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 24px" }}>Your Card Details</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                            <div>
                                <label style={labelStyle}>Card Purchase Price ($)</label>
                                <input type="number" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} min="0" step="0.01" style={inputStyle} placeholder="25.00" />
                            </div>

                            <div>
                                <label style={labelStyle}>Expected Graded Sale Price ($)</label>
                                <input type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} min="0" step="0.01" style={inputStyle} placeholder="150.00" />
                                <p style={{ margin: "6px 0 0", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Check recent eBay sold listings for a comped grade</p>
                            </div>

                            <div>
                                <label style={labelStyle}>Grading Company</label>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {(Object.keys(GRADERS) as GraderKey[]).map(key => (
                                        <button key={key} onClick={() => { setGrader(key); setTierIndex(0); }}
                                            style={{
                                                padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer",
                                                background: grader === key ? accentBg : "rgba(255,255,255,0.04)",
                                                border: `1px solid ${grader === key ? accentBorder : "rgba(255,255,255,0.08)"}`,
                                                color: grader === key ? accent : "rgba(255,255,255,0.5)",
                                            }}>
                                            {key}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Service Tier</label>
                                <select
                                    value={safeTierIndex}
                                    onChange={e => setTierIndex(parseInt(e.target.value))}
                                    style={inputStyle}
                                >
                                    {currentTiers.map((tier, i) => (
                                        <option key={tier.name} value={i}>{tier.name} — ${tier.fee} (~{tier.days} days)</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={labelStyle}>Shipping & Handling ($)</label>
                                <input type="number" value={shipping} onChange={e => setShipping(e.target.value)} min="0" step="0.01" style={inputStyle} placeholder="15.00" />
                                <p style={{ margin: "6px 0 0", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Round-trip shipping to grader</p>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                <div>
                                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Include eBay selling fees</p>
                                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>12.9% + $0.30 per sale</p>
                                </div>
                                <button
                                    onClick={() => setIncludeEbay(v => !v)}
                                    style={{
                                        width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
                                        background: includeEbay ? accent : "rgba(255,255,255,0.15)",
                                        position: "relative", transition: "background 0.2s",
                                    }}
                                >
                                    <span style={{
                                        position: "absolute", top: 3, left: includeEbay ? 23 : 3,
                                        width: 18, height: 18, borderRadius: 9, background: "white",
                                        transition: "left 0.2s",
                                    }} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {result ? (
                            <>
                                {/* Profit headline */}
                                <div style={{ padding: "28px", borderRadius: 20, background: result.profit >= 0 ? "rgba(52,211,153,0.08)" : "rgba(248,113,113,0.08)", border: `1px solid ${result.profit >= 0 ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`, textAlign: "center" }}>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Net Profit / Loss</p>
                                    <p style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: profitColor, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                                        {fmt(result.profit)}
                                    </p>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                                        ROI: <strong style={{ color: profitColor }}>{result.roi >= 0 ? "+" : ""}{result.roi.toFixed(1)}%</strong>
                                    </p>
                                </div>

                                {/* Cost breakdown */}
                                <div style={{ padding: "24px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 16px" }}>Cost Breakdown</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        {[
                                            { label: "Card purchase price", value: fmt(parseFloat(buyPrice) || 0), color: "rgba(255,255,255,0.7)" },
                                            { label: `${grader} ${selectedTier.name} grading`, value: fmt(selectedTier.fee), color: accent },
                                            { label: "Shipping & handling", value: fmt(parseFloat(shipping) || 0), color: "rgba(255,255,255,0.7)" },
                                            ...(includeEbay ? [{ label: "eBay fees (12.9% + $0.30)", value: fmt(result.ebayFee), color: "#f472b6" }] : []),
                                        ].map(row => (
                                            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{row.label}</span>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: row.color }}>{row.value}</span>
                                            </div>
                                        ))}
                                        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Total costs</span>
                                            <span style={{ fontSize: 14, fontWeight: 800, color: "#f87171" }}>{fmt(result.totalCost)}</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Net revenue</span>
                                            <span style={{ fontSize: 14, fontWeight: 800, color: "#34d399" }}>{fmt(result.netRevenue)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Turnaround info */}
                                <div style={{ padding: "18px 20px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 14 }}>
                                    <div style={{ fontSize: 24, flexShrink: 0 }}>⏱</div>
                                    <div>
                                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{grader} {selectedTier.name}</p>
                                        <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Estimated turnaround: ~{selectedTier.days} business days</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ padding: "40px 28px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                                <img src="/images/card-grading-hero.png" alt="Card Grading Calculator" width="180" height="180" style={{ marginBottom: 20, filter: "drop-shadow(0 20px 40px rgba(245,158,11,0.4))", userSelect: "none" }} />
                                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", margin: 0 }}>Enter your card details to see profit calculation.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Grader comparison table */}
                {comparison && (
                    <div style={{ marginBottom: 48 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 6px", letterSpacing: "-0.01em" }}>Grader Comparison</h2>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 16px" }}>Economy/cheapest tier for each company with your current values</p>
                        <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                                <thead>
                                    <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                        {["Grader", "Tier", "Fee", "Est. Days", "Net Profit", "ROI"].map(h => (
                                            <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparison.map((row, i) => {
                                        const isSelected = row.key === grader;
                                        const pColor = row.profit >= 0 ? "#34d399" : "#f87171";
                                        return (
                                            <tr key={row.key} style={{
                                                background: isSelected ? `${accentBg}` : (i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent"),
                                                borderTop: "1px solid rgba(255,255,255,0.04)",
                                                cursor: "pointer",
                                            }}
                                                onClick={() => { setGrader(row.key); setTierIndex(0); }}>
                                                <td style={{ padding: "12px 16px" }}>
                                                    <span style={{ fontWeight: 800, color: isSelected ? accent : "white" }}>{row.key}</span>
                                                    {isSelected && <span style={{ marginLeft: 8, fontSize: 10, background: accentBg, border: `1px solid ${accentBorder}`, color: accent, padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>SELECTED</span>}
                                                </td>
                                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.6)" }}>{row.tier}</td>
                                                <td style={{ padding: "12px 16px", color: accent, fontWeight: 700 }}>{fmt(row.fee)}</td>
                                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>{GRADERS[row.key].tiers[0].days}d</td>
                                                <td style={{ padding: "12px 16px", color: pColor, fontWeight: 700 }}>{fmt(row.profit)}</td>
                                                <td style={{ padding: "12px 16px", color: pColor, fontWeight: 700 }}>{row.roi >= 0 ? "+" : ""}{row.roi.toFixed(1)}%</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <p style={{ margin: "8px 0 0", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Click a row to switch to that grader. Fees accurate as of 2025 — always verify on each grader&apos;s website.</p>
                    </div>
                )}

                {/* Grade Value Guide */}
                <div style={{ marginBottom: 48, padding: "28px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 6px", letterSpacing: "-0.01em" }}>PSA Grade Value Multipliers</h2>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 20px" }}>Typical sale price vs raw (ungraded) value — varies hugely by card era and player</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
                        {[
                            { grade: "PSA 10 Gem Mint", mult: "5–15×", note: "Best case scenario", color: "#f59e0b" },
                            { grade: "PSA 9 Mint", mult: "2–4×", note: "Most realistic target", color: "#34d399" },
                            { grade: "PSA 8 NM-MT", mult: "1–2×", note: "Often break-even", color: "#60a5fa" },
                            { grade: "PSA 7 NM", mult: "0.7–1×", note: "Usually a loss", color: "#f87171" },
                        ].map(g => (
                            <div key={g.grade} style={{ padding: "16px", borderRadius: 12, background: `${g.color}10`, border: `1px solid ${g.color}25` }}>
                                <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: g.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{g.grade}</p>
                                <p style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 900, color: "white" }}>{g.mult}</p>
                                <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{g.note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GEO content */}
                <div style={{ marginBottom: 48 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 20px", letterSpacing: "-0.01em" }}>How to Calculate Card Grading Profit</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                        {[
                            { icon: "1", title: "Find your buy price", body: "What did you pay for the raw (ungraded) card? Include any transaction fees or shipping you paid to acquire it." },
                            { icon: "2", title: "Research graded comps", body: "Search eBay sold listings for the same card in your target grade (e.g. PSA 9). This is your expected sale price." },
                            { icon: "3", title: "Choose a grader & tier", body: "PSA commands the highest prices but BGS suits modern cards. Pick the service tier that matches your holding period and card value." },
                            { icon: "4", title: "Check the ROI", body: "If your ROI is under 20%, consider whether the capital is better deployed elsewhere in your collection — or skip grading entirely." },
                        ].map(step => (
                            <div key={step.icon} style={{ display: "flex", gap: 16, padding: "20px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                <div style={{ width: 32, height: 32, borderRadius: 8, background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: accent, flexShrink: 0 }}>{step.icon}</div>
                                <div>
                                    <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: "white" }}>{step.title}</p>
                                    <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{step.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div style={{ marginBottom: 48 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 20px", letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            { q: "Is it worth grading trading cards?", a: "Grading is worth it when the increase in sale price from a graded card exceeds the combined costs of grading fees, shipping, and eBay fees. A PSA 10 gem mint can sell for 5-15× the raw card price for modern star players and key vintage cards. For low-value cards under $20 raw, grading rarely makes sense." },
                            { q: "Which grading company gives the highest sale prices?", a: "PSA graded cards typically command the highest average sale prices on eBay and secondary markets, driven by their recognition and population report system. BGS is preferred for modern cards where sub-grades can unlock premiums. SGC is popular for vintage pre-war cards." },
                            { q: "How long does card grading take?", a: "Turnaround times vary by service tier and current grading volume. PSA Value Bulk runs ~95 days, BGS Economy ~90 days, and SGC Economy ~90 days. Express and premium tiers reduce this to 5-15 days but at significantly higher cost per card." },
                            { q: "What cards are worth grading?", a: "Cards worth grading typically have strong demand in a PSA 9 or 10, are in near-mint condition, and have a realistic expected graded sale price at least 3× the raw value plus all fees. Key rookies, autographs, refractors, and first editions from iconic sets are the most profitable candidates." },
                            { q: "What are the eBay selling fees for graded cards?", a: "eBay charges 12.9% of the total sale amount plus $0.30 per order for trading cards. On a $100 sale you pay $13.20 in fees, netting $86.80 before shipping. Some sellers use Whatnot, PWCC or Goldin to reduce fees on high-value cards." },
                            { q: "What is the best card grading profit calculator?", a: "ToolStack's Card Grading Profit Calculator lets you compare PSA, BGS, SGC and CSG fees side by side, includes eBay selling fees, and instantly shows net profit and ROI — all free with no signup required." },
                        ].map((item, i) => (
                            <div key={i} style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <p style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: "white" }}>{item.q}</p>
                                <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <MoreTools currentSlug="card-grading-profit-calculator" />
            </div>
        </main>
    );
}
