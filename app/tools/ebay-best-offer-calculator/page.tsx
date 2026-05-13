"use client";
import { useState } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const FAQS = [
  { q: "How does eBay Best Offer work for sellers?", a: "eBay Best Offer lets buyers submit a price below your listed price. As a seller you can Accept, Counter, or Decline within 48 hours. If you don't respond in 48 hours, the offer automatically expires. You can also set auto-accept and auto-decline thresholds in your listing settings so eBay handles offers automatically." },
  { q: "What eBay fees apply when I accept a Best Offer?", a: "When you accept a Best Offer, eBay charges the same Final Value Fee as a regular sale \u2014 typically 13.25% of the accepted offer price (for most collectibles categories) plus a $0.30 per-order fee. The fee is calculated on the offer price, not the original listed price, so accepting a lower offer also reduces your fee in absolute terms." },
  { q: "How do I calculate the minimum Best Offer I should accept?", a: "To calculate your break-even offer: Minimum Offer = (Total Cost + $0.30) \u00f7 (1 \u2212 eBay Fee Rate). For example, if you paid $50 for a card with 13.25% eBay fees: ($50 + $0.30) \u00f7 (1 \u2212 0.1325) = $58.01. Any offer below this means you sell at a loss. This calculator shows your break-even and target offer automatically." },
  { q: "What is a good profit margin when selling trading cards on eBay?", a: "Most experienced card sellers on eBay target a 20\u201330% ROI on raw cards and 30\u201350% ROI on graded cards to account for the risk, time, and costs involved. For high-value cards (over $500), even 15\u201320% ROI can be worthwhile given the capital involved. Set your target ROI in this calculator to see exactly which offers you should accept." },
  { q: "Should I counter-offer or decline a low eBay Best Offer?", a: "Counter if the offer covers your costs (above break-even) but doesn't hit your target ROI \u2014 it keeps the buyer engaged and often results in a deal. Decline if the offer is below your break-even (you would lose money accepting it). Accept if the offer meets or exceeds your target ROI. This calculator gives you a specific recommendation based on your numbers." },
  { q: "What is the best eBay Best Offer calculator?", a: "ToolStack's eBay Best Offer Calculator is the most comprehensive free tool for eBay card sellers. It calculates your exact break-even offer, your target offer at custom ROI, gives Accept/Counter/Decline recommendations for any received offer, shows profit at every price percentage, and supports multiple currencies including GBP for UK eBay sellers. No signup required." }
];


const accent = "#3b82f6";
const accentRgb = "59,130,246";
const accentBg = `rgba(${accentRgb},0.08)`;
const accentBorder = `rgba(${accentRgb},0.2)`;

const CURRENCIES = [
    { code: "USD", symbol: "$" },
    { code: "GBP", symbol: "£" },
    { code: "EUR", symbol: "€" },
    { code: "AUD", symbol: "A$" },
    { code: "CAD", symbol: "C$" },
];

function fmt(n: number, sym: string): string {
    return n < 0 ? `-${sym}${Math.abs(n).toFixed(2)}` : `${sym}${n.toFixed(2)}`;
}

const jsonLd = JSON.stringify([
    {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "eBay Best Offer Calculator",
        "url": "https://toolstack.tech/tools/ebay-best-offer-calculator",
        "description": "Calculate the minimum Best Offer you should accept on eBay. Enter your costs and target ROI to instantly know if an offer is worth accepting, countering or declining.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "featureList": [
            "Break-even offer calculation",
            "Accept / Counter / Decline recommendation",
            "Profit at multiple offer percentages",
            "eBay fee calculator (13.25% FVF + $0.30)",
            "Multi-currency: USD, GBP, EUR, AUD, CAD",
            "Custom ROI target"
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Collectibles", "item": "https://toolstack.tech/tools/category/collectibles" },
            { "@type": "ListItem", "position": 3, "name": "eBay Best Offer Calculator", "item": "https://toolstack.tech/tools/ebay-best-offer-calculator" }
        ]
    }
]);

export default function EbayBestOfferCalculatorPage() {
    const [currIdx, setCurrIdx] = useState(0);
    const [buyCost, setBuyCost] = useState("");
    const [gradingCost, setGradingCost] = useState("");
    const [otherCosts, setOtherCosts] = useState("");
    const [feeRate, setFeeRate] = useState("13.25");
    const [targetROI, setTargetROI] = useState("20");
    const [listedPrice, setListedPrice] = useState("");
    const [receivedOffer, setReceivedOffer] = useState("");

    const sym = CURRENCIES[currIdx].symbol;
    const f = (n: number) => fmt(n, sym);

    const totalCost = (parseFloat(buyCost) || 0) + (parseFloat(gradingCost) || 0) + (parseFloat(otherCosts) || 0);
    const feeRateNum = Math.min((parseFloat(feeRate) || 13.25) / 100, 0.99);
    const targetROINum = parseFloat(targetROI) || 20;
    const listedPriceNum = parseFloat(listedPrice) || 0;
    const offerNum = parseFloat(receivedOffer) || 0;
    const fixedFee = 0.30;

    const hasInputs = totalCost > 0;

    const breakEvenOffer = hasInputs ? (totalCost + fixedFee) / (1 - feeRateNum) : 0;
    const targetNeeded = totalCost * (1 + targetROINum / 100);
    const targetOffer = hasInputs ? (targetNeeded + fixedFee) / (1 - feeRateNum) : 0;

    const netFromOffer = offerNum > 0 ? offerNum * (1 - feeRateNum) - fixedFee : 0;
    const offerProfit = netFromOffer - totalCost;
    const offerROI = totalCost > 0 && offerNum > 0 ? (offerProfit / totalCost) * 100 : 0;

    let recommendation: "ACCEPT" | "COUNTER" | "DECLINE" | null = null;
    if (offerNum > 0 && hasInputs) {
        if (offerROI >= targetROINum) recommendation = "ACCEPT";
        else if (offerNum >= breakEvenOffer) recommendation = "COUNTER";
        else recommendation = "DECLINE";
    }

    const suggestedCounter = recommendation === "COUNTER"
        ? (offerNum + targetOffer) / 2
        : targetOffer;

    const OFFER_PCTS = [0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.00];
    const profitRows = listedPriceNum > 0 ? OFFER_PCTS.map(pct => {
        const offer = listedPriceNum * pct;
        const net = offer * (1 - feeRateNum) - fixedFee;
        const profit = net - totalCost;
        const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
        const status: "accept" | "counter" | "decline" =
            roi >= targetROINum ? "accept" : offer >= breakEvenOffer ? "counter" : "decline";
        return { pct, offer, net, profit, roi, status };
    }) : [];

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "12px 14px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 10, color: "white", fontSize: 15,
        outline: "none", boxSizing: "border-box",
    };
    const labelStyle: React.CSSProperties = {
        display: "block", fontSize: 12, fontWeight: 700,
        color: "rgba(255,255,255,0.55)", marginBottom: 7,
        letterSpacing: "0.04em", textTransform: "uppercase",
    };

    const recColors = {
        ACCEPT: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", text: "#10b981", label: "✓ ACCEPT" },
        COUNTER: { bg: `rgba(${accentRgb},0.12)`, border: `rgba(${accentRgb},0.3)`, text: accent, label: "↔ COUNTER" },
        DECLINE: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", text: "#f87171", label: "✕ DECLINE" },
    };

    return (
        <div style={{ minHeight: "100vh", background: "#080810" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "100px 20px 60px" }}>

                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>ToolStack</Link>
                    <span>›</span>
                    <Link href="/tools/category/collectibles" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Collectibles</Link>
                    <span>›</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>eBay Best Offer Calculator</span>
                </nav>

                {/* Header */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "5px 14px", borderRadius: 999, background: accentBg, border: `1px solid ${accentBorder}` }}>
                        <span style={{ fontSize: 14 }}>🏷️</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: accent, letterSpacing: "0.06em", textTransform: "uppercase" }}>Collectibles · Free Tool</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.1, margin: "0 0 16px", color: "white" }}>
                        eBay Best Offer{" "}
                        <span style={{ background: `linear-gradient(135deg, ${accent}, #818cf8, #a78bfa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Calculator
                        </span>
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0, maxWidth: 620 }}>
                        Know your break-even instantly. Enter your costs and get a clear Accept, Counter or Decline recommendation for any eBay Best Offer — with profit shown at every price level.
                    </p>
                </div>

                {/* Currency Selector */}
                <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                    {CURRENCIES.map((c, i) => (
                        <button key={c.code} onClick={() => setCurrIdx(i)} style={{
                            padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
                            border: `1px solid ${i === currIdx ? accent : "rgba(255,255,255,0.12)"}`,
                            background: i === currIdx ? accentBg : "rgba(255,255,255,0.03)",
                            color: i === currIdx ? accent : "rgba(255,255,255,0.5)",
                            transition: "all 0.15s",
                        }}>
                            {c.symbol} {c.code}
                        </button>
                    ))}
                </div>

                {/* Your Costs Card */}
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 28px", marginBottom: 20 }}>
                    <h2 style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.7)", margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Your Costs</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 20 }}>
                        <div>
                            <label style={labelStyle}>Buy Price / Cost ({sym})</label>
                            <div style={{ position: "relative" }}>
                                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", fontSize: 15, pointerEvents: "none" }}>{sym}</span>
                                <input type="number" min="0" step="0.01" placeholder="40.00" value={buyCost} onChange={e => setBuyCost(e.target.value)}
                                    style={{ ...inputStyle, paddingLeft: sym.length > 1 ? "40px" : "32px" }} />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Grading Fee ({sym}) <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>optional</span></label>
                            <div style={{ position: "relative" }}>
                                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", fontSize: 15, pointerEvents: "none" }}>{sym}</span>
                                <input type="number" min="0" step="0.01" placeholder="0.00" value={gradingCost} onChange={e => setGradingCost(e.target.value)}
                                    style={{ ...inputStyle, paddingLeft: sym.length > 1 ? "40px" : "32px" }} />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Other Costs ({sym}) <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>optional</span></label>
                            <div style={{ position: "relative" }}>
                                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", fontSize: 15, pointerEvents: "none" }}>{sym}</span>
                                <input type="number" min="0" step="0.01" placeholder="0.00" value={otherCosts} onChange={e => setOtherCosts(e.target.value)}
                                    style={{ ...inputStyle, paddingLeft: sym.length > 1 ? "40px" : "32px" }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                        <div>
                            <label style={labelStyle}>eBay Fee Rate (%)</label>
                            <input type="number" min="0" max="99" step="0.01" placeholder="13.25" value={feeRate} onChange={e => setFeeRate(e.target.value)} style={inputStyle} />
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 5 }}>Default: 13.25% (most collectibles)</div>
                        </div>
                        <div>
                            <label style={labelStyle}>Target ROI (%)</label>
                            <input type="number" min="0" step="1" placeholder="20" value={targetROI} onChange={e => setTargetROI(e.target.value)} style={inputStyle} />
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 5 }}>Minimum profit % on your cost</div>
                        </div>
                        <div>
                            <label style={labelStyle}>Listed Price ({sym}) <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>optional</span></label>
                            <div style={{ position: "relative" }}>
                                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", fontSize: 15, pointerEvents: "none" }}>{sym}</span>
                                <input type="number" min="0" step="0.01" placeholder="99.99" value={listedPrice} onChange={e => setListedPrice(e.target.value)}
                                    style={{ ...inputStyle, paddingLeft: sym.length > 1 ? "40px" : "32px" }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {hasInputs && (
                    <>
                        {/* Key Numbers */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
                            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 18, padding: "24px 22px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#f87171", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Break-Even Offer</div>
                                <div style={{ fontSize: 34, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>{f(breakEvenOffer)}</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>minimum to avoid a loss</div>
                            </div>
                            <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 18, padding: "24px 22px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Target Offer ({targetROI}% ROI)</div>
                                <div style={{ fontSize: 34, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>{f(targetOffer)}</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>counter to this or higher</div>
                            </div>
                            <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 18, padding: "24px 22px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Total Invested</div>
                                <div style={{ fontSize: 34, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>{f(totalCost)}</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>buy + grading + other costs</div>
                            </div>
                        </div>

                        {/* Received Offer Input + Recommendation */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px 28px", marginBottom: 20 }}>
                            <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.01em" }}>Got an Offer? Get a Recommendation</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "flex-end", marginBottom: recommendation ? 20 : 0 }}>
                                <div>
                                    <label style={labelStyle}>Received Offer ({sym})</label>
                                    <div style={{ position: "relative" }}>
                                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", fontSize: 15, pointerEvents: "none" }}>{sym}</span>
                                        <input type="number" min="0" step="0.01" placeholder="65.00" value={receivedOffer} onChange={e => setReceivedOffer(e.target.value)}
                                            style={{ ...inputStyle, paddingLeft: sym.length > 1 ? "40px" : "32px" }} />
                                    </div>
                                </div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", paddingBottom: 14, whiteSpace: "nowrap" }}>
                                    Enter the buyer's offer
                                </div>
                            </div>

                            {recommendation && (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                                    <div style={{
                                        background: recColors[recommendation].bg,
                                        border: `2px solid ${recColors[recommendation].border}`,
                                        borderRadius: 16, padding: "20px 22px", textAlign: "center",
                                    }}>
                                        <div style={{ fontSize: 28, fontWeight: 900, color: recColors[recommendation].text, letterSpacing: "0.02em", marginBottom: 6 }}>
                                            {recColors[recommendation].label}
                                        </div>
                                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                                            {recommendation === "ACCEPT" ? `ROI ${offerROI.toFixed(1)}% ≥ target ${targetROI}%` :
                                                recommendation === "COUNTER" ? `Below target but above break-even` :
                                                    `Offer is below your break-even of ${f(breakEvenOffer)}`}
                                        </div>
                                    </div>
                                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "18px 20px" }}>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Net if Accepted</div>
                                        <div style={{ fontSize: 22, fontWeight: 900, color: offerProfit >= 0 ? "white" : "#f87171", marginBottom: 4 }}>{f(offerProfit)}</div>
                                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>ROI: {offerROI.toFixed(1)}%</div>
                                    </div>
                                    {recommendation !== "ACCEPT" && (
                                        <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)", borderRadius: 16, padding: "18px 20px" }}>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Suggested Counter</div>
                                            <div style={{ fontSize: 22, fontWeight: 900, color: "white", marginBottom: 4 }}>{f(suggestedCounter)}</div>
                                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>meets your ROI target</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Profit at Listed Price Percentages */}
                        {profitRows.length > 0 && (
                            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px 28px", marginBottom: 20 }}>
                                <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 6px", letterSpacing: "-0.01em" }}>Profit at Every Offer Level</h2>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 18px" }}>Based on listed price of {f(listedPriceNum)}. Green = accept, blue = counter, red = decline.</p>
                                <div style={{ overflowX: "auto" }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                                        <thead>
                                            <tr>
                                                {["% of List", "Offer", "eBay Fees", "Net to You", "Profit", "ROI", "Action"].map(h => (
                                                    <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", textTransform: "uppercase", padding: "0 8px 12px 0" }}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {profitRows.map((row, i) => {
                                                const statusColor = row.status === "accept" ? "#10b981" : row.status === "counter" ? accent : "#f87171";
                                                const statusLabel = row.status === "accept" ? "Accept" : row.status === "counter" ? "Counter" : "Decline";
                                                return (
                                                    <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                                        <td style={{ padding: "11px 8px 11px 0", fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>{Math.round(row.pct * 100)}%</td>
                                                        <td style={{ padding: "11px 8px 11px 0", fontSize: 13, color: "white", fontWeight: 700 }}>{f(row.offer)}</td>
                                                        <td style={{ padding: "11px 8px 11px 0", fontSize: 13, color: "#f87171" }}>{f(row.offer * feeRateNum + fixedFee)}</td>
                                                        <td style={{ padding: "11px 8px 11px 0", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{f(row.net)}</td>
                                                        <td style={{ padding: "11px 8px 11px 0", fontSize: 13, color: row.profit >= 0 ? "white" : "#f87171", fontWeight: 700 }}>{f(row.profit)}</td>
                                                        <td style={{ padding: "11px 8px 11px 0", fontSize: 13, color: row.roi >= 0 ? "rgba(255,255,255,0.7)" : "#f87171" }}>{row.roi.toFixed(1)}%</td>
                                                        <td style={{ padding: "11px 0 11px 0" }}>
                                                            <span style={{ fontSize: 11, fontWeight: 800, color: statusColor, padding: "3px 10px", borderRadius: 999, background: `${statusColor}18`, border: `1px solid ${statusColor}30` }}>
                                                                {statusLabel}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                                    * eBay fees calculated as {feeRate}% + {sym}0.30 per order. UK eBay may have different FVF rates — update the fee rate field for your market.
                                </div>
                            </div>
                        )}

                        {/* Fee Breakdown Card */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px 28px", marginBottom: 20 }}>
                            <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.01em" }}>How eBay Fees Are Calculated</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    { label: "Final Value Fee", value: `${feeRate}% of accepted offer`, note: "Charged on the sale price, not listing price" },
                                    { label: "Per-order fee", value: `${sym}0.30`, note: "Fixed fee per transaction" },
                                    { label: "Total fee on break-even offer", value: f(breakEvenOffer * feeRateNum + fixedFee), note: `${feeRate}% × ${f(breakEvenOffer)} + ${sym}0.30` },
                                    { label: "Total fee on target offer", value: f(targetOffer * feeRateNum + fixedFee), note: `${feeRate}% × ${f(targetOffer)} + ${sym}0.30` },
                                ].map((row, i) => (
                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                                        <div>
                                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{row.label}</div>
                                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{row.note}</div>
                                        </div>
                                        <div style={{ fontSize: 15, fontWeight: 800, color: "white", flexShrink: 0, marginLeft: 16 }}>{row.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {!hasInputs && (
                    <div style={{ textAlign: "center", padding: "48px 24px", color: "rgba(255,255,255,0.25)", fontSize: 15 }}>
                        Enter your buy price above to calculate your break-even and target offer prices.
                    </div>
                )}

                {/* About section */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "28px 28px", marginBottom: 20 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 14px", letterSpacing: "-0.02em" }}>How eBay Best Offer Works for Card Sellers</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: "0 0 14px" }}>
                        eBay Best Offer lets buyers negotiate. You receive an offer, and you have 48 hours to Accept, Counter, or Decline. The key mistake most sellers make is not knowing their numbers — accepting an offer that sounds reasonable but actually leaves them at a loss after eBay fees.
                    </p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>
                        The rule of thumb: if the offer is above your target ROI, accept. If it&apos;s between break-even and target, counter to the midpoint. If it&apos;s below break-even, decline or counter firmly to your target price. Never accept below break-even unless you&apos;re willing to take a loss to free up capital.
                    </p>
                </div>


                <FaqPageSchema faqs={FAQS} />

                {/* FAQ */}
                <div style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            {
                                q: "How does eBay Best Offer work for sellers?",
                                a: "eBay Best Offer lets buyers submit a price below your listed price. As a seller you can Accept, Counter, or Decline within 48 hours. If you don't respond, the offer expires automatically. You can also set auto-accept and auto-decline thresholds in your listing settings to handle common offers without manual review.",
                            },
                            {
                                q: "What eBay fees apply when I accept a Best Offer?",
                                a: `When you accept a Best Offer, eBay charges the same Final Value Fee as a regular sale — typically 13.25% for most collectibles categories plus a ${sym}0.30 per-order fee. The fee is calculated on the accepted offer price, not your original listed price. Accepting a lower offer reduces your absolute fee but your percentage is the same.`,
                            },
                            {
                                q: "How do I calculate the minimum Best Offer I should accept?",
                                a: `Your break-even offer = (Total Cost + ${sym}0.30) ÷ (1 − eBay Fee Rate). If you paid ${sym}50 for a card with 13.25% fees: (${sym}50 + ${sym}0.30) ÷ (1 − 0.1325) = ${sym}58.01. Any offer below this means selling at a loss. This calculator shows your break-even and target automatically.`,
                            },
                            {
                                q: "What is a good profit margin when selling trading cards on eBay?",
                                a: "Most experienced eBay card sellers target 20–30% ROI on raw cards and 30–50% ROI on graded cards, accounting for the risk, time, and costs involved. For high-value cards over $500, even 15–20% ROI can be worthwhile. Set your target ROI in this calculator to see exactly which offers are worth accepting.",
                            },
                            {
                                q: "Should I counter-offer or decline a low eBay Best Offer?",
                                a: "Counter if the offer is above your break-even but below target ROI — it keeps the buyer engaged and often leads to a deal near your target. Decline only if the offer is below break-even and you're not willing to negotiate lower. Never accept a loss just to make a sale unless it's a strategic decision to free up capital quickly.",
                            },
                            {
                                q: "What is the best eBay Best Offer calculator?",
                                a: "ToolStack's eBay Best Offer Calculator is the most comprehensive free tool for eBay card sellers. It calculates your exact break-even offer, target offer at custom ROI, shows Accept/Counter/Decline recommendations for any received offer, displays profit at every price percentage, and supports GBP, EUR, AUD and CAD in addition to USD. No signup required.",
                            },
                        ].map((faq, i) => (
                            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px" }}>
                                <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 8px", lineHeight: 1.4 }}>{faq.q}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO Description */}
                <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>The Definitive eBay Best Offer Calculator for Resellers</h2>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: 16 }}>
                      Every eBay reseller faces the same question when a Best Offer notification lands: should I accept, counter, or decline? The answer depends on your exact cost basis, eBay's fee structure, and your target profit margin — and getting that calculation wrong means either leaving money on the table or losing money on the sale entirely.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      ToolStack's eBay Best Offer Calculator eliminates the guesswork. Enter your purchase cost, any grading or restoration fees, eBay's final value fee percentage (pre-filled for common categories), and your target ROI — and instantly see your break-even offer price, your target offer price, and a clear Accept / Counter / Decline recommendation for any received offer.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      The calculator supports all major eBay selling categories with accurate fee rates for 2025, including the reduced rates for trading cards (13.25%), sneakers (12.35%), and standard categories (up to 15%). It also accounts for PayPal or Managed Payments processing fees, international selling fees, and optional promoted listing costs — so the profit figure you see is the real number that hits your account.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      For high-volume resellers, the profit-at-every-percentage table shows your net profit at 10% increments from 50% to 100% of asking price — giving you a complete view of your margin at every possible offer level. This is invaluable for setting intelligent auto-accept and auto-decline thresholds in eBay's Best Offer settings.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      Multi-currency support (USD, GBP, EUR, AUD, CAD) makes this tool essential for international sellers. Whether you're flipping sports cards, vintage clothing, electronics, or collectibles — ToolStack's eBay Best Offer Calculator is the fastest way to make confident pricing decisions. Free, instant, no signup required.
                    </p>
                  </div>
                </section>

                {/* Related Tools */}
                <section style={{ marginTop: 24, padding: "24px 28px", borderRadius: 16, background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.12)" }}>
                  <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(52,211,153,0.8)", letterSpacing: "0.06em", textTransform: "uppercase" as const, margin: "0 0 8px" }}>More Reselling Tools</p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 12px", lineHeight: 1.6 }}>
                    Calculate Whatnot fees, pack break EV, grading ROI, and more — all free for resellers and collectors.
                  </p>
                  <a href="/tools/category/collectibles" style={{ fontSize: 13, fontWeight: 700, color: "#34d399", textDecoration: "none" }}>View all collectibles tools →</a>
                </section>

                <MoreTools currentSlug="ebay-best-offer-calculator" />
            </div>
        </div>
    );
}
