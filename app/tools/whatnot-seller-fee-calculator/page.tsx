"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const FAQS = [
  { q: "How much does Whatnot charge sellers?", a: "Whatnot charges sellers an 8% commission fee plus 2.9% + $0.30 payment processing on most categories. So on a $100 sale, you pay $8 commission + $3.20 payment processing = $11.20 total fees, netting $88.80. Coins & Currency is discounted to 4% commission, and Electronics to 5%. Orders over $1,500 drop the commission to 0% (only payment processing applies)." },
  { q: "Is selling on Whatnot cheaper than eBay?", a: "For most categories, Whatnot" },
  { q: "What is the Whatnot high-value order fee?", a: "For orders over $1,500 on Whatnot, the seller commission drops to 0%. You only pay the 2.9% + $0.30 payment processing fee. On a $2,000 sale this means fees of just $58.30 compared to $258.30 at the standard 8% + payment rate \u2014 a significant saving for high-value card and collectible sales." },
  { q: "Does Whatnot charge for shipping?", a: "Whatnot sellers are responsible for their own shipping costs. Whatnot provides prepaid shipping labels at negotiated rates, but the cost is deducted from your earnings. Shipping is separate from the commission and payment processing fees calculated here." },
  { q: "What are the Whatnot seller fees for Pok\u00e9mon cards?", a: "Pok\u00e9mon cards and other trading card games fall under Whatnot" },
  { q: "What is the best Whatnot seller fee calculator?", a: "ToolStack" }
];


const accent = "#f97316";
const accentBg = "rgba(249,115,22,0.08)";
const accentBorder = "rgba(249,115,22,0.2)";

interface Category {
    name: string;
    commissionRate: number;
    note?: string;
}

const CATEGORIES: Category[] = [
    { name: "Trading Cards & Collectibles", commissionRate: 0.08 },
    { name: "Sports Memorabilia", commissionRate: 0.08 },
    { name: "Pokémon / TCG Cards", commissionRate: 0.08 },
    { name: "Sneakers", commissionRate: 0.08 },
    { name: "Streetwear & Apparel", commissionRate: 0.08 },
    { name: "Luxury & Jewellery", commissionRate: 0.08 },
    { name: "Electronics", commissionRate: 0.05 },
    { name: "Coins & Currency", commissionRate: 0.04 },
    { name: "Other", commissionRate: 0.08 },
];

const PAYMENT_RATE = 0.029;
const PAYMENT_FIXED = 0.30;
const HIGH_VALUE_THRESHOLD = 1500;
const HIGH_VALUE_COMMISSION = 0;

const CURRENCIES = [
    { code: "USD", symbol: "$" },
    { code: "GBP", symbol: "£" },
    { code: "EUR", symbol: "€" },
    { code: "AUD", symbol: "A$" },
    { code: "CAD", symbol: "C$" },
];

// eBay trading cards: 12.9% + $0.30
const EBAY_RATE = 0.129;
const EBAY_FIXED = 0.30;

function calcWhatnot(salePrice: number, commissionRate: number) {
    const isHighValue = salePrice >= HIGH_VALUE_THRESHOLD;
    const effectiveCommission = isHighValue ? HIGH_VALUE_COMMISSION : commissionRate;
    const commissionFee = salePrice * effectiveCommission;
    const paymentFee = salePrice * PAYMENT_RATE + PAYMENT_FIXED;
    const totalFees = commissionFee + paymentFee;
    const netPayout = salePrice - totalFees;
    const effectiveRate = salePrice > 0 ? (totalFees / salePrice) * 100 : 0;
    return { commissionFee, paymentFee, totalFees, netPayout, effectiveRate, isHighValue };
}

function calcEbay(salePrice: number) {
    const fee = salePrice * EBAY_RATE + EBAY_FIXED;
    const net = salePrice - fee;
    const rate = salePrice > 0 ? (fee / salePrice) * 100 : 0;
    return { fee, net, rate };
}

function fmt(n: number, prefix = "$"): string {
    return prefix + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(n: number): string {
    return n.toFixed(2) + "%";
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "Whatnot Seller Fee Calculator",
            "description": "Calculate Whatnot seller fees, commission rates and net payout by category. Compare against eBay to find the best platform for your sales.",
            "url": "https://toolstack.tech/tools/whatnot-seller-fee-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                { "@type": "ListItem", "position": 2, "name": "Collectibles", "item": "https://toolstack.tech/tools/category/collectibles" },
                { "@type": "ListItem", "position": 3, "name": "Whatnot Seller Fee Calculator", "item": "https://toolstack.tech/tools/whatnot-seller-fee-calculator" },
            ],
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How much does Whatnot charge sellers?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Whatnot charges sellers an 8% commission fee plus 2.9% + $0.30 payment processing on most categories. So on a $100 sale, you pay $8 commission + $3.20 payment processing = $11.20 total fees, netting $88.80. Coins & Currency is discounted to 4% commission, and Electronics to 5%. Orders over $1,500 drop the commission to 0% (only payment processing applies)."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is selling on Whatnot cheaper than eBay?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "For most categories, Whatnot's total fees (10.9% + $0.30 at standard 8% commission) are slightly cheaper than eBay (12.9% + $0.30 for trading cards). However, eBay has a vastly larger buyer base, which can drive higher sale prices that more than offset the fee difference. Whatnot's live auction format suits buyers who enjoy the entertainment experience and often pay above market."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the Whatnot high-value order fee?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "For orders over $1,500 on Whatnot, the seller commission drops to 0%. You only pay the 2.9% + $0.30 payment processing fee. On a $2,000 sale this means fees of just $58.30 compared to $258.30 at the standard 8% + payment rate — a significant saving for high-value card and collectible sales."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Does Whatnot charge for shipping?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Whatnot sellers are responsible for their own shipping costs. Whatnot provides prepaid shipping labels at negotiated rates, but the cost is deducted from your earnings. Shipping is separate from the commission and payment processing fees calculated here."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What are the Whatnot seller fees for Pokémon cards?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Pokémon cards and other trading card games fall under Whatnot's standard collectibles category at 8% commission + 2.9% + $0.30 payment processing. On a $50 Charizard sale, fees total $6.70 for a net payout of $43.30. Graded cards (PSA, BGS) sold for over $1,500 benefit from the 0% commission rate."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the best Whatnot seller fee calculator?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "ToolStack's Whatnot Seller Fee Calculator shows your exact net payout, commission and payment processing fees by category, includes a side-by-side eBay comparison, supports bulk item calculations, and works for sellers in any currency — all free with no signup required."
                    }
                },
            ],
        },
    ],
};

export default function WhatnotSellerFeeCalculator() {
    const [salePrice, setSalePrice] = useState("100");
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [quantity, setQuantity] = useState("1");
    const [currIdx, setCurrIdx] = useState(0);
    const sym = CURRENCIES[currIdx].symbol;
    const f = (n: number) => fmt(n, sym);

    const category = CATEGORIES[categoryIndex];
    const qty = Math.max(1, parseInt(quantity) || 1);

    const result = useMemo(() => {
        const price = parseFloat(salePrice) || 0;
        if (price <= 0) return null;
        const single = calcWhatnot(price, category.commissionRate);
        const ebay = calcEbay(price);
        return { single, ebay, total: {
            commissionFee: single.commissionFee * qty,
            paymentFee: single.paymentFee * qty,
            totalFees: single.totalFees * qty,
            netPayout: single.netPayout * qty,
        }};
    }, [salePrice, category.commissionRate, qty]);

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "12px 14px", borderRadius: 10,
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
        color: "white", fontSize: 15, outline: "none", boxSizing: "border-box",
    };
    const labelStyle: React.CSSProperties = {
        fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8, display: "block",
    };

    const price = parseFloat(salePrice) || 0;
    const isHighValue = price >= HIGH_VALUE_THRESHOLD;

    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
                        <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>ToolStack</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/tools/category/collectibles" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Collectibles</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Whatnot Seller Fee Calculator</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Marketplace</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Free · No signup</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 16, color: "white" }}>
                        Whatnot Seller Fee Calculator
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", maxWidth: 560, lineHeight: 1.65, marginBottom: 0 }}>
                        See exactly what Whatnot charges and what you actually take home — with a side-by-side eBay comparison. Covers all categories including the $1,500 high-value rate.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 20px 100px" }}>

                {/* Main calculator */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 24 }}>

                    {/* Inputs */}
                    <div style={{ padding: "28px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 16px" }}>Your Sale Details</h2>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                            {CURRENCIES.map((c, i) => (
                                <button key={c.code} onClick={() => setCurrIdx(i)} style={{ padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1px solid ${currIdx === i ? accentBorder : "rgba(255,255,255,0.1)"}`, background: currIdx === i ? accentBg : "rgba(255,255,255,0.04)", color: currIdx === i ? accent : "rgba(255,255,255,0.5)" }}>{c.code} {c.symbol}</button>
                            ))}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                            <div>
                                <label style={labelStyle}>Sale Price ({sym})</label>
                                <input type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} min="0" step="0.01" style={inputStyle} placeholder="100.00" />
                                {isHighValue && (
                                    <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", fontSize: 12, color: "#34d399", fontWeight: 600 }}>
                                        ✓ High-value order — 0% commission applies (over $1,500)
                                    </div>
                                )}
                            </div>

                            <div>
                                <label style={labelStyle}>Category</label>
                                <select value={categoryIndex} onChange={e => setCategoryIndex(parseInt(e.target.value))} style={inputStyle}>
                                    {CATEGORIES.map((cat, i) => (
                                        <option key={cat.name} value={i}>
                                            {cat.name} — {isHighValue ? "0" : (cat.commissionRate * 100).toFixed(0)}% commission
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={labelStyle}>Number of Items</label>
                                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} min="1" step="1" style={inputStyle} placeholder="1" />
                            </div>
                        </div>

                        {/* Fee summary pills */}
                        <div style={{ marginTop: 24, padding: "16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Applied Rate</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: accentBg, border: `1px solid ${accentBorder}`, color: accent }}>
                                    {isHighValue ? "0" : (category.commissionRate * 100).toFixed(0)}% Commission
                                </span>
                                <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)", color: "#60a5fa" }}>
                                    2.9% + {sym}0.30 Processing
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {result ? (
                            <>
                                {/* Net payout headline */}
                                <div style={{ padding: "28px", borderRadius: 20, background: accentBg, border: `1px solid ${accentBorder}`, textAlign: "center" }}>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>
                                        {qty > 1 ? `Net Payout (×${qty})` : "Net Payout"}
                                    </p>
                                    <p style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: accent, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                                        {f(qty > 1 ? result.total.netPayout : result.single.netPayout)}
                                    </p>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                                        {fmtPct(result.single.effectiveRate)} effective fee rate
                                    </p>
                                </div>

                                {/* Per-item breakdown */}
                                <div style={{ padding: "24px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 16px" }}>
                                        Per-item Breakdown
                                    </p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        {[
                                            { label: "Sale price", value: f(price), color: "rgba(255,255,255,0.7)" },
                                            { label: `Commission (${isHighValue ? "0" : (category.commissionRate * 100).toFixed(0)}%${isHighValue ? " — high value" : ""})`, value: f(result.single.commissionFee), color: accent, minus: true },
                                            { label: `Payment processing (2.9% + ${sym}0.30)`, value: f(result.single.paymentFee), color: "#60a5fa", minus: true },
                                        ].map(row => (
                                            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{row.label}</span>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: row.color }}>{row.minus ? "−" : ""}{row.value}</span>
                                            </div>
                                        ))}
                                        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Total fees</span>
                                            <span style={{ fontSize: 14, fontWeight: 800, color: "#f87171" }}>−{f(result.single.totalFees)}</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Your net payout</span>
                                            <span style={{ fontSize: 14, fontWeight: 800, color: "#34d399" }}>{f(result.single.netPayout)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* eBay comparison */}
                                <div style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>vs eBay Trading Cards</p>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                        <div style={{ padding: "14px", borderRadius: 12, background: accentBg, border: `1px solid ${accentBorder}`, textAlign: "center" }}>
                                            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: accent }}>WHATNOT</p>
                                            <p style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 900, color: "white" }}>{f(result.single.netPayout)}</p>
                                            <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{fmtPct(result.single.effectiveRate)} fees</p>
                                        </div>
                                        <div style={{ padding: "14px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                                            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>EBAY (US)</p>
                                            <p style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 900, color: "white" }}>{f(result.ebay.net)}</p>
                                            <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{fmtPct(result.ebay.rate)} fees</p>
                                        </div>
                                    </div>
                                    {result.single.netPayout > result.ebay.net ? (
                                        <p style={{ margin: "10px 0 0", fontSize: 12, color: "#34d399", fontWeight: 600 }}>
                                            ✓ Whatnot saves you {f(result.single.netPayout - result.ebay.net)} per item vs eBay (US)
                                        </p>
                                    ) : (
                                        <p style={{ margin: "10px 0 0", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                                            eBay (US) pays {f(result.ebay.net - result.single.netPayout)} more per item at this price
                                        </p>
                                    )}
                                    <p style={{ margin: "6px 0 0", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>eBay rates shown for US market. UK/EU eBay fees differ — check your local seller rates.</p>
                                </div>
                            </>
                        ) : (
                            <div style={{ padding: "40px 28px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                                <img src="/images/whatnot-hero.png" alt="Whatnot Fee Calculator" width="180" height="180" style={{ marginBottom: 20, filter: "drop-shadow(0 20px 40px rgba(249,115,22,0.4))", userSelect: "none" }} />
                                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", margin: 0 }}>Enter a sale price to see your Whatnot payout.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bulk results */}
                {result && qty > 1 && (
                    <div style={{ marginBottom: 32, padding: "24px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 16px" }}>Total for {qty} Items</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                            {[
                                { label: "Gross Revenue", value: f(price * qty), color: "rgba(255,255,255,0.8)" },
                                { label: "Commission Fees", value: f(result.total.commissionFee), color: accent },
                                { label: "Processing Fees", value: f(result.total.paymentFee), color: "#60a5fa" },
                                { label: "Total Fees", value: f(result.total.totalFees), color: "#f87171" },
                                { label: "Net Payout", value: f(result.total.netPayout), color: "#34d399" },
                            ].map(item => (
                                <div key={item.label} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</p>
                                    <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: item.color }}>{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Category rate table */}
                <div style={{ marginBottom: 48 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 6px", letterSpacing: "-0.01em" }}>Whatnot Fee Rates by Category</h2>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 16px" }}>All categories have the same 2.9% + $0.30 payment processing. Commission varies.</p>
                    <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    {["Category", "Commission", "Processing", "Total Rate", "Net on $100"].map(h => (
                                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {CATEGORIES.filter((c, i, arr) => arr.findIndex(x => x.commissionRate === c.commissionRate) === i).map((cat, i) => {
                                    const r = calcWhatnot(100, cat.commissionRate);
                                    return (
                                        <tr key={cat.name} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                                            <td style={{ padding: "12px 16px", color: "white", fontWeight: 600 }}>{cat.name}</td>
                                            <td style={{ padding: "12px 16px", color: accent, fontWeight: 700 }}>{(cat.commissionRate * 100).toFixed(0)}%</td>
                                            <td style={{ padding: "12px 16px", color: "#60a5fa" }}>2.9% + {sym}0.30</td>
                                            <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.6)" }}>{fmtPct(r.effectiveRate)}</td>
                                            <td style={{ padding: "12px 16px", color: "#34d399", fontWeight: 700 }}>{f(r.netPayout)}</td>
                                        </tr>
                                    );
                                })}
                                <tr style={{ background: "rgba(52,211,153,0.04)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                                    <td style={{ padding: "12px 16px", color: "#34d399", fontWeight: 700 }}>Any category (≥$1,500)</td>
                                    <td style={{ padding: "12px 16px", color: "#34d399", fontWeight: 700 }}>0%</td>
                                    <td style={{ padding: "12px 16px", color: "#60a5fa" }}>2.9% + $0.30</td>
                                    <td style={{ padding: "12px 16px", color: "#34d399" }}>2.93%</td>
                                    <td style={{ padding: "12px 16px", color: "#34d399", fontWeight: 700 }}>—</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p style={{ margin: "8px 0 0", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Rates accurate as of 2025. Always verify current rates on whatnot.com before making pricing decisions.</p>
                </div>

                {/* GEO / How it works */}
                <div style={{ marginBottom: 48 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 20px", letterSpacing: "-0.01em" }}>How Whatnot Seller Fees Work</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                        {[
                            { icon: "💰", title: "Commission fee", body: "Whatnot charges 8% of the sale price for most categories (collectibles, sneakers, apparel). Coins & Currency is discounted to 4%, Electronics to 5%." },
                            { icon: "💳", title: "Payment processing", body: "A flat 2.9% + $0.30 is charged on every transaction — similar to Stripe or PayPal. This applies on top of the commission and cannot be avoided." },
                            { icon: "🏆", title: "High-value exemption", body: "Orders over $1,500 benefit from 0% commission — you only pay the 2.9% + $0.30 processing fee. This makes Whatnot very competitive for high-value graded cards." },
                            { icon: "📦", title: "Shipping is separate", body: "Whatnot fees don't include shipping. You charge buyers for shipping (or offer free shipping) and purchase a label through Whatnot's integrated system at negotiated rates." },
                        ].map(step => (
                            <div key={step.title} style={{ display: "flex", gap: 16, padding: "20px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                <div style={{ fontSize: 24, flexShrink: 0, lineHeight: 1 }}>{step.icon}</div>
                                <div>
                                    <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: "white" }}>{step.title}</p>
                                    <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{step.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <FaqPageSchema faqs={FAQS} />

                {/* FAQ */}
                <div style={{ marginBottom: 48 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 20px", letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            { q: "How much does Whatnot charge sellers?", a: "Whatnot charges an 8% commission + 2.9% + $0.30 payment processing on most categories. On a $100 sale, total fees are $11.20, netting you $88.80. Coins & Currency is 4% commission and Electronics is 5%." },
                            { q: "Is Whatnot better than eBay for selling cards?", a: "Whatnot's total effective fee on a $100 collectibles sale (11.2%) is lower than eBay's (13.2%), saving around $2 per $100. However, eBay has a far larger buyer pool. Whatnot's live auction format can drive above-market prices through competitive bidding and entertainment value — many sellers find they sell faster on Whatnot despite similar or slightly lower fees." },
                            { q: "What is the Whatnot $1,500 high-value discount?", a: "Any single order over $1,500 on Whatnot has its commission dropped to 0%. You still pay 2.9% + $0.30 payment processing. On a $2,000 graded card sale, this saves you $160 in commission fees versus the standard 8% rate." },
                            { q: "Does Whatnot charge a monthly fee?", a: "No — Whatnot has no monthly subscription or listing fees. You only pay fees when you make a sale. This makes it zero-risk to start selling compared to platforms with monthly store fees." },
                            { q: "Is Whatnot available in the UK and internationally?", a: "Yes — Whatnot operates in the US, UK, Canada, Australia and across Europe. The core fee structure (8% commission + 2.9% payment processing) applies across regions. Fixed processing fees may vary slightly by currency. Always check Whatnot's current seller terms for your specific region." },
                            { q: "What is the best Whatnot seller fee calculator?", a: "ToolStack's Whatnot Seller Fee Calculator shows your exact net payout and fee breakdown by category, includes the $1,500 high-value discount, a live eBay comparison, bulk calculation for multiple items, and multi-currency display — free with no signup required." },
                        ].map((item, i) => (
                            <div key={i} style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <p style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: "white" }}>{item.q}</p>
                                <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO Description */}
                <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>The Most Accurate Whatnot Fee Calculator for Live Sellers</h2>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: 16 }}>
                      Whatnot has become the dominant live-selling marketplace for trading cards, collectibles, sneakers, and streetwear — but understanding the exact fee structure is critical before you price your inventory. Unlike eBay's single final value fee, Whatnot uses a dual-layer system: a seller commission (varying by category) plus a separate payment processing fee on every transaction.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      ToolStack's Whatnot Seller Fee Calculator breaks this down to the penny. Enter your sale price, select your category, and instantly see the commission fee, payment processing charge, total fees, and your exact net payout. The tool covers all Whatnot categories including Trading Cards & Collectibles (8%), Coins & Currency (4%), Electronics (5%), and the critical high-value threshold at $1,500 where commission drops to 0%.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      What makes this calculator essential for Whatnot sellers is the built-in eBay comparison. Every sale shows a side-by-side view of your Whatnot net payout versus what you'd receive selling the same item on eBay — using eBay's current Trading Cards final value fee of 13.25% + $0.30. This lets you make informed platform decisions based on actual numbers, not guesswork.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      For sellers running live shows with multiple items, the bulk calculator multiplies your per-item breakdown across any quantity — giving you total commission fees, total processing fees, and total net payout for an entire show's worth of sales. Combined with multi-currency support (USD, GBP, EUR, AUD, CAD), this is the most comprehensive Whatnot fee tool available.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      Whether you're a new Whatnot seller trying to understand the fee structure, or a seasoned live-seller optimising your pricing strategy across platforms, ToolStack's calculator gives you the clarity you need. Completely free, no signup, no data stored — just accurate fee calculations in seconds.
                    </p>
                  </div>
                </section>

                {/* Related Tools */}
                <section style={{ marginTop: 24, padding: "24px 28px", borderRadius: 16, background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.12)" }}>
                  <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(249,115,22,0.8)", letterSpacing: "0.06em", textTransform: "uppercase" as const, margin: "0 0 8px" }}>More Marketplace Tools</p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 12px", lineHeight: 1.6 }}>
                    Calculate eBay best offers, pack break EV, card flip ROI, and more — all free for sellers and collectors.
                  </p>
                  <a href="/tools/category/collectibles" style={{ fontSize: 13, fontWeight: 700, color: "#f97316", textDecoration: "none" }}>View all collectibles tools →</a>
                </section>

                <MoreTools currentSlug="whatnot-seller-fee-calculator" />
            </div>
        </main>
    );
}
