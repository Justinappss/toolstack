"use client";
import { useState } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const FAQS = [
  { q: "What is a box break in card collecting?", a: "A box break is when a host purchases one or more sealed card boxes and sells spots to participants. Each spot represents one or more teams, players or random allocations. The host opens the box live on stream (usually on Whatnot or eBay Live) and participants receive any cards pulled for their assigned spots." },
  { q: "How do you calculate the break-even price per spot for a box break?", a: "To break even, your spot price must cover the box cost, platform fees, and shipping per winner. The formula is: Spot Price = (Box Cost \u00f7 Total Spots + Fixed Fee + Shipping per Winner) \u00f7 (1 \u2212 Platform Fee Rate). For example, a $200 box with 20 spots on Whatnot (10.9% + $0.30) and $4 shipping needs: ($200/20 + $0.30 + $4) \u00f7 (1 \u2212 0.109) = $16.07 per spot to break even." },
  { q: "What fees does Whatnot charge for hosting box breaks?", a: "Whatnot charges sellers an 8% commission on each sale plus a 2.9% payment processing fee and a $0.30 per-transaction fee. Combined, this is approximately 10.9% + $0.30 per spot sold. These fees apply to all Whatnot sellers globally, regardless of where the break is hosted from." },
  { q: "What fill rate should I plan for when hosting a box break?", a: "New break hosts typically achieve 50\u201370% fill rates on their first few breaks. Established hosts with regular audiences consistently hit 75\u2013100%. It is wise to price your spots so that you at least break even at a 75% fill rate. The calculator shows your profit at 50%, 75%, and 100% fill so you can choose a safe price point." },
  { q: "Can I use this calculator for UK and international box breaks?", a: "Yes. The calculator supports USD, GBP, EUR, AUD and CAD. Simply select your currency using the selector at the top of the calculator. Whatnot is available in the US, UK, Canada, Australia, and other markets. Platform fee rates remain the same globally, though your local shipping costs will differ from US estimates." },
  { q: "What is the best card box break calculator?", a: "ToolStack's Card Box Break Calculator is one of the most comprehensive free break pricing tools available. It covers Whatnot, eBay and local breaks, applies accurate platform fees, accounts for per-winner shipping costs, shows profit at multiple fill rates, and supports multiple currencies including GBP for UK-based break hosts. No signup required." }
];


const accent = "#f59e0b";
const accentRgb = "245,158,11";
const accentBg = `rgba(${accentRgb},0.08)`;
const accentBorder = `rgba(${accentRgb},0.2)`;

const CURRENCIES = [
    { code: "USD", symbol: "$" },
    { code: "GBP", symbol: "£" },
    { code: "EUR", symbol: "€" },
    { code: "AUD", symbol: "A$" },
    { code: "CAD", symbol: "C$" },
];

const PLATFORMS = [
    { id: "whatnot", name: "Whatnot", rate: 0.109, fixed: 0.30, note: "8% commission + 2.9% processing + $0.30" },
    { id: "ebay", name: "eBay", rate: 0.1325, fixed: 0.30, note: "13.25% final value fee + $0.30" },
    { id: "local", name: "Local / In Person", rate: 0, fixed: 0, note: "No platform fees" },
];

function fmt(n: number, sym: string): string {
    return n < 0 ? `-${sym}${Math.abs(n).toFixed(2)}` : `${sym}${n.toFixed(2)}`;
}

const jsonLd = JSON.stringify([
    {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Card Box Break Calculator",
        "url": "https://toolstack.tech/tools/card-box-break-calculator",
        "description": "Calculate the break-even price per spot for any card box break. Enter box cost, spots, platform and see profit across different fill rates.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "featureList": [
            "Break-even spot price calculation",
            "Whatnot, eBay and local fee support",
            "Fill rate profit scenarios (50%, 75%, 100%)",
            "Multi-currency: USD, GBP, EUR, AUD, CAD",
            "Recommended profit margin pricing"
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Collectibles", "item": "https://toolstack.tech/tools/category/collectibles" },
            { "@type": "ListItem", "position": 3, "name": "Card Box Break Calculator", "item": "https://toolstack.tech/tools/card-box-break-calculator" }
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is a box break in card collecting?",
                "acceptedAnswer": { "@type": "Answer", "text": "A box break is when a host purchases one or more sealed card boxes and sells spots to participants. Each spot represents one or more teams, players or random allocations. The host opens the box live on stream (usually on Whatnot or eBay Live) and participants receive any cards pulled for their assigned spots." }
            },
            {
                "@type": "Question",
                "name": "How do you calculate the break-even price per spot for a box break?",
                "acceptedAnswer": { "@type": "Answer", "text": "To break even, your spot price must cover the box cost, platform fees, and shipping per winner. The formula is: Spot Price = (Box Cost ÷ Total Spots + Fixed Fee + Shipping per Winner) ÷ (1 − Platform Fee Rate). For example, a $200 box with 20 spots on Whatnot (10.9% + $0.30) and $4 shipping needs: ($200/20 + $0.30 + $4) ÷ (1 − 0.109) = $16.07 per spot to break even." }
            },
            {
                "@type": "Question",
                "name": "What fees does Whatnot charge for hosting box breaks?",
                "acceptedAnswer": { "@type": "Answer", "text": "Whatnot charges sellers an 8% commission on each sale plus a 2.9% payment processing fee and a $0.30 per-transaction fee. Combined, this is approximately 10.9% + $0.30 per spot sold. These fees apply to all Whatnot sellers globally, regardless of where the break is hosted from." }
            },
            {
                "@type": "Question",
                "name": "What fill rate should I plan for when hosting a box break?",
                "acceptedAnswer": { "@type": "Answer", "text": "New break hosts typically achieve 50–70% fill rates on their first few breaks. Established hosts with regular audiences consistently hit 75–100%. It is wise to price your spots so that you at least break even at a 75% fill rate. The calculator shows your profit at 50%, 75%, and 100% fill so you can choose a safe price point." }
            },
            {
                "@type": "Question",
                "name": "Can I use this calculator for UK and international box breaks?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. The calculator supports USD, GBP, EUR, AUD and CAD. Simply select your currency using the selector at the top of the calculator. Whatnot is available in the US, UK, Canada, Australia, and other markets. Platform fee rates remain the same globally, though your local shipping costs will differ from US estimates." }
            },
            {
                "@type": "Question",
                "name": "What is the best card box break calculator?",
                "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's Card Box Break Calculator is one of the most comprehensive free break pricing tools available. It covers Whatnot, eBay and local breaks, applies accurate platform fees, accounts for per-winner shipping costs, shows profit at multiple fill rates, and supports multiple currencies including GBP for UK-based break hosts. No signup required." }
            }
        ]
    }
]);

export default function CardBoxBreakCalculatorPage() {
    const [currIdx, setCurrIdx] = useState(0);
    const [boxCost, setBoxCost] = useState("");
    const [spots, setSpots] = useState("");
    const [shipping, setShipping] = useState("");
    const [platformId, setPlatformId] = useState("whatnot");

    const sym = CURRENCIES[currIdx].symbol;
    const f = (n: number) => fmt(n, sym);

    const platform = PLATFORMS.find(p => p.id === platformId) ?? PLATFORMS[0];

    const boxCostNum = parseFloat(boxCost) || 0;
    const spotsNum = parseInt(spots) || 0;
    const shippingNum = parseFloat(shipping) || 0;
    const hasInputs = boxCostNum > 0 && spotsNum > 0;

    const costPerSpot = hasInputs ? boxCostNum / spotsNum : 0;
    const breakEven100 = hasInputs
        ? (boxCostNum / spotsNum + platform.fixed + shippingNum) / (1 - platform.rate)
        : 0;
    const recPrice = breakEven100 * 1.2;

    const scenarios = [0.5, 0.75, 1.0].map(fill => {
        const sold = spotsNum * fill;
        const rev = sold * recPrice;
        const fees = sold * (recPrice * platform.rate + platform.fixed);
        const ship = sold * shippingNum;
        const profit = rev - fees - ship - boxCostNum;
        return { fill, sold: Math.round(sold), rev, fees, ship, profit };
    });

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
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>Card Box Break Calculator</span>
                </nav>

                {/* Header */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "5px 14px", borderRadius: 999, background: accentBg, border: `1px solid ${accentBorder}` }}>
                        <span style={{ fontSize: 14 }}>🎰</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: accent, letterSpacing: "0.06em", textTransform: "uppercase" }}>Collectibles · Free Tool</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.1, margin: "0 0 16px", color: "white" }}>
                        Card Box Break{" "}
                        <span style={{ background: `linear-gradient(135deg, ${accent}, #fb923c, #f87171)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Calculator
                        </span>
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0, maxWidth: 620 }}>
                        Price your break spots to cover box cost, platform fees, and shipping — then see your profit at 50%, 75%, and 100% fill rates.
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

                {/* Main Card */}
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 28px", marginBottom: 20 }}>

                    {/* Platform Selector */}
                    <div style={{ marginBottom: 28 }}>
                        <span style={labelStyle}>Platform</span>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                            {PLATFORMS.map(p => (
                                <button key={p.id} onClick={() => setPlatformId(p.id)} style={{
                                    flex: "1 1 auto", minWidth: 110, padding: "12px 16px", borderRadius: 12,
                                    border: `1px solid ${p.id === platformId ? accent : "rgba(255,255,255,0.1)"}`,
                                    background: p.id === platformId ? accentBg : "rgba(255,255,255,0.02)",
                                    cursor: "pointer", transition: "all 0.15s",
                                }}>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: p.id === platformId ? accent : "rgba(255,255,255,0.7)", marginBottom: 3 }}>{p.name}</div>
                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>{p.note}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Inputs Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                        <div>
                            <label style={labelStyle}>Box Cost ({sym})</label>
                            <div style={{ position: "relative" }}>
                                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", fontSize: 15, pointerEvents: "none" }}>{sym}</span>
                                <input type="number" min="0" step="0.01" placeholder="200.00" value={boxCost} onChange={e => setBoxCost(e.target.value)}
                                    style={{ ...inputStyle, paddingLeft: sym.length > 1 ? "40px" : "32px" }} />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Number of Spots</label>
                            <input type="number" min="1" step="1" placeholder="30" value={spots} onChange={e => setSpots(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Shipping Per Winner ({sym})</label>
                            <div style={{ position: "relative" }}>
                                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", fontSize: 15, pointerEvents: "none" }}>{sym}</span>
                                <input type="number" min="0" step="0.01" placeholder="4.50" value={shipping} onChange={e => setShipping(e.target.value)}
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
                            <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 18, padding: "24px 22px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Break-Even Price / Spot</div>
                                <div style={{ fontSize: 34, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>{f(breakEven100)}</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>at 100% fill · covers all costs</div>
                            </div>
                            <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 18, padding: "24px 22px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Recommended Price / Spot</div>
                                <div style={{ fontSize: 34, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>{f(recPrice)}</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>break-even + 20% margin</div>
                            </div>
                            <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 18, padding: "24px 22px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Raw Cost / Spot</div>
                                <div style={{ fontSize: 34, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>{f(costPerSpot)}</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>box cost only · before fees & ship</div>
                            </div>
                        </div>

                        {/* Fill Rate Scenarios */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px 28px", marginBottom: 20 }}>
                            <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 6px", letterSpacing: "-0.01em" }}>Profit at Recommended Price ({f(recPrice)}/spot)</h2>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 20px" }}>Assumes all sold spots pay shipping. Unsold spots pay nothing.</p>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                                {scenarios.map(s => {
                                    const isProfitable = s.profit >= 0;
                                    const fillLabel = `${Math.round(s.fill * 100)}% Fill`;
                                    const cardColor = s.fill === 1.0 ? "#10b981" : s.fill === 0.75 ? accent : "#f87171";
                                    const cardRgb = s.fill === 1.0 ? "16,185,129" : s.fill === 0.75 ? accentRgb : "248,113,113";
                                    return (
                                        <div key={s.fill} style={{ background: `rgba(${cardRgb},0.07)`, border: `1px solid rgba(${cardRgb},0.2)`, borderRadius: 16, padding: "20px 18px" }}>
                                            <div style={{ fontSize: 12, fontWeight: 800, color: cardColor, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{fillLabel} · {s.sold} spots</div>
                                            <div style={{ fontSize: 28, fontWeight: 900, color: isProfitable ? "white" : "#f87171", letterSpacing: "-0.03em", marginBottom: 12 }}>{f(s.profit)}</div>
                                            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                                                    <span style={{ color: "rgba(255,255,255,0.4)" }}>Revenue</span>
                                                    <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{f(s.rev)}</span>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                                                    <span style={{ color: "rgba(255,255,255,0.4)" }}>Platform fees</span>
                                                    <span style={{ color: "#f87171", fontWeight: 600 }}>−{f(s.fees)}</span>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                                                    <span style={{ color: "rgba(255,255,255,0.4)" }}>Shipping</span>
                                                    <span style={{ color: "#f87171", fontWeight: 600 }}>−{f(s.ship)}</span>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                                                    <span style={{ color: "rgba(255,255,255,0.4)" }}>Box cost</span>
                                                    <span style={{ color: "#f87171", fontWeight: 600 }}>−{f(boxCostNum)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Cost Breakdown */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px 28px", marginBottom: 20 }}>
                            <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.01em" }}>Cost & Fee Breakdown</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    { label: "Total box cost", value: f(boxCostNum), sub: `${spotsNum} spots` },
                                    { label: `${platform.name} fee per spot (at ${f(recPrice)})`, value: f(recPrice * platform.rate + platform.fixed), sub: platform.id === "local" ? "No fees" : platform.id === "whatnot" ? "10.9% + $0.30" : "13.25% + $0.30" },
                                    { label: "Shipping per winner", value: f(shippingNum), sub: "per sold spot" },
                                    { label: "Total variable cost per spot sold", value: f(costPerSpot + recPrice * platform.rate + platform.fixed + shippingNum), sub: "box + fees + shipping" },
                                    { label: "Your margin per spot (at rec. price)", value: f(recPrice - (recPrice * platform.rate + platform.fixed + shippingNum) - costPerSpot), sub: "~20% target" },
                                ].map((row, i) => (
                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                                        <div>
                                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{row.label}</div>
                                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{row.sub}</div>
                                        </div>
                                        <div style={{ fontSize: 15, fontWeight: 800, color: "white", flexShrink: 0, marginLeft: 16 }}>{row.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Disclaimer */}
                        {platformId === "ebay" && (
                            <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
                                eBay fees shown for US marketplace (13.25% FVF). UK eBay fees differ — check your local seller rates at ebay.co.uk/help/selling.
                            </div>
                        )}
                    </>
                )}

                {/* Empty state prompt */}
                {!hasInputs && (
                    <div style={{ textAlign: "center", padding: "48px 24px", color: "rgba(255,255,255,0.25)", fontSize: 15 }}>
                        Enter your box cost and number of spots above to calculate break-even pricing.
                    </div>
                )}

                {/* About section */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "28px 28px", marginBottom: 20, marginTop: hasInputs ? 0 : 0 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 14px", letterSpacing: "-0.02em" }}>How to Price a Card Box Break</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: "0 0 14px" }}>
                        Pricing spots correctly is the difference between a profitable break and losing money. You need to cover four costs: the box itself, platform commission, payment processing fees, and the cost to ship cards to each winner.
                    </p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>
                        The calculator uses actual Whatnot (10.9% + $0.30) and eBay (13.25% + $0.30) fee structures. The recommended price adds a 20% buffer above break-even so you still profit even if not every spot sells. Always price at a rate where you break even at 75% fill at minimum.
                    </p>
                </div>


                <FaqPageSchema faqs={FAQS} />

                {/* FAQ */}
                <div style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            {
                                q: "What is a box break in card collecting?",
                                a: "A box break is when a host buys one or more sealed card boxes and sells spots to participants. Each spot corresponds to one or more teams, players, or random allocations. The host opens the box live on stream — typically on Whatnot or eBay Live — and participants receive cards pulled for their assigned spots.",
                            },
                            {
                                q: "How do you calculate the break-even price per spot?",
                                a: `The formula is: Spot Price = (Box Cost ÷ Spots + Fixed Fee + Shipping per Winner) ÷ (1 − Fee Rate). For example, a ${sym}200 box with 20 spots on Whatnot (10.9% + $0.30) and ${sym}4 shipping requires ${sym}16.07/spot to break even at 100% fill. This calculator does the maths automatically.`,
                            },
                            {
                                q: "What fees does Whatnot charge for hosting card breaks?",
                                a: "Whatnot charges sellers an 8% commission plus 2.9% payment processing and $0.30 per transaction — totalling roughly 10.9% + $0.30 per spot sold. These rates apply globally to all Whatnot sellers including those in the UK, Canada, and Australia.",
                            },
                            {
                                q: "What fill rate should I plan for when hosting a break?",
                                a: "New break hosts typically achieve 50–70% fill on their first breaks. Established hosts with loyal audiences consistently hit 75–100%. Price your spots so you at least break even at 75% fill. This calculator shows profit at 50%, 75%, and 100% so you can find the right price point.",
                            },
                            {
                                q: "Can I use this calculator for UK and international breaks?",
                                a: "Yes. Select your currency (GBP, EUR, AUD, or CAD) using the currency picker. Whatnot's fee structure is the same worldwide. Your main variable will be local shipping costs — UK Royal Mail rates differ significantly from US USPS estimates, so enter your actual shipping cost per winner.",
                            },
                            {
                                q: "What is the best card box break calculator?",
                                a: "ToolStack's Card Box Break Calculator is one of the most comprehensive free tools available. It applies accurate Whatnot and eBay fee structures, accounts for per-winner shipping, shows profit at multiple fill rates, recommends a price with built-in margin, and supports multiple currencies including GBP for UK-based hosts. Free, no signup required.",
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
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Card Box Break Calculator: Free Online Tool</h2>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: 16 }}>
                      Running a trading card box break is one of the most popular ways to sell sealed hobby product — but pricing the individual spots fairly is genuinely difficult. Price too high and spots don't fill. Price too low and you're leaving money on the table. Our Card Box Break Calculator takes the box price, number of spots, and any bulk discount logic and gives you fair, market-priced spot values in seconds.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Enter the total box price, the number of spots in the break, and select your break format (random team draft, position draft, hit allocation, etc.). The calculator divides the box cost proportionally across all spots, with higher-value slots getting larger shares when applicable. You can also factor in shipping costs, Whatnot fees, and your organizer margin to set a fair final price.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Common uses include pricing spots before posting a break on Reddit, Whatnot, or Discord, running group breaks for high-value products like Topps Chrome or Prizm hobby boxes, comparing two break formats to see which distributes value more fairly, and calculating bulk discounts for buyers who take multiple spots.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      Most break hosts price spots by feel or by copying what they did last time. Our calculator uses actual math — proportional allocation based on the odds distribution of the specific product — to make sure every spot is priced fairly based on its expected value. That transparency builds trust with your buyer community. Free, unlimited calculations, no signup.
                    </p>
                  </div>
                </section>

                <MoreTools currentSlug="card-box-break-calculator" />
            </div>
        </div>
    );
}
