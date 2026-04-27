"use client";
import { useState } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

const CURRENCIES = [
    { code: "GBP", symbol: "£" },
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "AUD", symbol: "A$" },
    { code: "CAD", symbol: "C$" },
];

const CARD_TYPES = [
    { id: "sports", name: "Sports Cards", emoji: "🏆", hit1: "Autograph", hit2: "Relic / Patch", hit3: "Short Print", hit4: "Parallel / Prizm" },
    { id: "pokemon", name: "Pokémon TCG", emoji: "⚡", hit1: "Full Art / Alt Art", hit2: "Rainbow / Gold Rare", hit3: "Holo Rare", hit4: "Reverse Holo" },
    { id: "football", name: "Football Cards", emoji: "⚽", hit1: "Autograph", hit2: "Relic / Patch", hit3: "Short Print", hit4: "Parallel / Prizm" },
    { id: "other", name: "Other TCG / Cards", emoji: "🃏", hit1: "Hit Type 1", hit2: "Hit Type 2", hit3: "Hit Type 3", hit4: "Hit Type 4" },
];

const PLATFORMS = [
    { id: "ebay", name: "eBay", rate: 0.1325, fixed: 0.30, note: "13.25% FVF + $0.30" },
    { id: "whatnot", name: "Whatnot", rate: 0.109, fixed: 0.30, note: "8% + 2.9% processing + $0.30" },
    { id: "local", name: "Local / Cash", rate: 0, fixed: 0, note: "No fees" },
];

function fmt(n: number, sym: string): string {
    if (n < 0) return `-${sym}${Math.abs(n).toFixed(2)}`;
    return `${sym}${n.toFixed(2)}`;
}

const accent = "#a855f7";
const accentLight = "rgba(168,85,247,0.12)";
const accentBorder = "rgba(168,85,247,0.3)";

const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 20,
    padding: "28px 28px",
    marginBottom: 16,
};

const label: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: 8,
    display: "block",
};

const input: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: "12px 16px",
    fontSize: 15,
    color: "white",
    outline: "none",
    boxSizing: "border-box",
};

type HitRow = {
    id: string;
    label: string;
    rate: string;   // "1 per N packs"
    value: string;  // avg market value
};

export default function PackBreakEvCalculator() {
    const [currIdx, setCurrIdx] = useState(1); // USD default
    const [cardTypeId, setCardTypeId] = useState("sports");
    const [boxPrice, setBoxPrice] = useState("");
    const [packsPerBox, setPacksPerBox] = useState("24");
    const [cardsPerPack, setCardsPerPack] = useState("10");
    const [platformId, setPlatformId] = useState("ebay");
    const [shippingPerHit, setShippingPerHit] = useState("4.00");

    const cardType = CARD_TYPES.find(c => c.id === cardTypeId) ?? CARD_TYPES[0];

    const [hits, setHits] = useState<HitRow[]>([
        { id: "h1", label: "", rate: "", value: "" },
        { id: "h2", label: "", rate: "", value: "" },
        { id: "h3", label: "", rate: "", value: "" },
        { id: "h4", label: "", rate: "", value: "" },
    ]);

    const sym = CURRENCIES[currIdx].symbol;
    const platform = PLATFORMS.find(p => p.id === platformId) ?? PLATFORMS[0];

    const hitLabels = [cardType.hit1, cardType.hit2, cardType.hit3, cardType.hit4];

    const boxPriceNum = parseFloat(boxPrice) || 0;
    const packsNum = Math.max(parseInt(packsPerBox) || 1, 1);
    const shippingNum = parseFloat(shippingPerHit) || 0;

    type HitCalc = {
        label: string;
        hitsPerBox: number;
        grossValue: number;
        feeAmount: number;
        shippingAmount: number;
        netValue: number;
        rate: number;
        value: number;
    };

    const hitCalcs: HitCalc[] = hits.map((h, i) => {
        const rateNum = parseFloat(h.rate) || 0;
        const valueNum = parseFloat(h.value) || 0;
        if (rateNum <= 0 || valueNum <= 0) return { label: hitLabels[i], hitsPerBox: 0, grossValue: 0, feeAmount: 0, shippingAmount: 0, netValue: 0, rate: 0, value: 0 };
        const hitsPerBox = packsNum / rateNum;
        const grossValue = hitsPerBox * valueNum;
        const feeAmount = hitsPerBox * (valueNum * platform.rate + platform.fixed);
        const shippingAmount = hitsPerBox * shippingNum;
        const netValue = grossValue - feeAmount - shippingAmount;
        return { label: hitLabels[i], hitsPerBox, grossValue, feeAmount, shippingAmount, netValue, rate: rateNum, value: valueNum };
    });

    const totalHitsPerBox = hitCalcs.reduce((a, b) => a + b.hitsPerBox, 0);
    const totalGross = hitCalcs.reduce((a, b) => a + b.grossValue, 0);
    const totalFees = hitCalcs.reduce((a, b) => a + b.feeAmount, 0);
    const totalShipping = hitCalcs.reduce((a, b) => a + b.shippingAmount, 0);
    const totalNet = totalGross - totalFees - totalShipping;

    const ev = totalNet - boxPriceNum;
    const evPct = boxPriceNum > 0 ? (totalNet / boxPriceNum) * 100 : 0;
    const evStatus = ev > 0 ? "POSITIVE" : ev < -0.01 ? "NEGATIVE" : "BREAK EVEN";
    const statusColor = ev > 0 ? "#34d399" : ev < -0.01 ? "#f87171" : "#fbbf24";

    const hasBoxPrice = boxPriceNum > 0;
    const hasAnyHit = hitCalcs.some(h => h.hitsPerBox > 0);
    const showResults = hasBoxPrice && hasAnyHit;

    const scenarios = [
        { name: "Bear Case", pct: 0.7, color: "#f87171", note: "70% of expected value" },
        { name: "Base Case", pct: 1.0, color: "#fbbf24", note: "100% of expected value" },
        { name: "Bull Case", pct: 1.3, color: "#34d399", note: "130% of expected value" },
    ].map(s => {
        const scenarioNet = totalNet * s.pct;
        const scenarioEv = scenarioNet - boxPriceNum;
        const scenarioEvPct = boxPriceNum > 0 ? (scenarioNet / boxPriceNum) * 100 : 0;
        return { ...s, scenarioNet, scenarioEv, scenarioEvPct };
    });

    const updateHit = (id: string, field: "rate" | "value", val: string) => {
        setHits(prev => prev.map(h => h.id === id ? { ...h, [field]: val } : h));
    };

    const jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                name: "Pack Break EV Calculator",
                description: "Free trading card pack break expected value calculator. Enter your box price, hit rates and average card values to see your EV per pack, net profit after platform fees, and bear/base/bull scenarios.",
                url: "https://toolstack.tech/tools/pack-break-ev-calculator",
                applicationCategory: "UtilityApplication",
                operatingSystem: "Web",
                browserRequirements: "Requires JavaScript",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                featureList: [
                    "Expected value (EV) calculation for any box break",
                    "Supports Pokémon TCG, sports cards and football cards",
                    "eBay and Whatnot fee deduction built in",
                    "Bear / Base / Bull scenario analysis",
                    "EV per pack and EV% of box price",
                    "Multi-currency: GBP, USD, EUR, AUD, CAD",
                ],
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "ToolStack", item: "https://toolstack.tech" },
                    { "@type": "ListItem", position: 2, name: "Collectibles", item: "https://toolstack.tech/tools?category=collectibles" },
                    { "@type": "ListItem", position: 3, name: "Pack Break EV Calculator", item: "https://toolstack.tech/tools/pack-break-ev-calculator" },
                ],
            },
            {
                "@type": "FAQPage",
                mainEntity: [
                    { "@type": "Question", name: "What is expected value (EV) in card breaks?", acceptedAnswer: { "@type": "Answer", text: "Expected value (EV) is the average monetary return you&apos;d expect from opening a box if you could open it thousands of times. A positive EV means the box is theoretically worth more than it costs — you expect to profit on average. A negative EV means you expect to lose money on average. EV is a guide, not a guarantee — individual results vary widely due to luck." } },
                    { "@type": "Question", name: "How do I calculate the EV of a box break?", acceptedAnswer: { "@type": "Answer", text: "EV = (hits per box for each hit type × average value of that hit type) − box cost − platform fees − shipping. For example: a 24-pack box with 1 auto per 12 packs (2 autos expected), each worth $80, gives $160 gross. Subtract eBay fees (13.25% + $0.30 per sale) and shipping gives your net EV. Our calculator does all of this automatically." } },
                    { "@type": "Question", name: "What is the best free pack break EV calculator?", acceptedAnswer: { "@type": "Answer", text: "ToolStack&apos;s Pack Break EV Calculator is the most comprehensive free tool available. It supports Pokémon TCG, sports cards and football cards, includes eBay, Whatnot and local fee structures, runs bear/base/bull scenario analysis, shows EV per pack and EV percentage, and works in GBP, USD, EUR, AUD and CAD. No signup required." } },
                    { "@type": "Question", name: "What EV percentage is good for a box break?", acceptedAnswer: { "@type": "Answer", text: "An EV% above 100% means positive EV — you theoretically expect to profit. Most retail and hobby boxes have an EV% of 60–90%, meaning collectors accept a built-in negative EV for the experience of opening. Professional breakers typically look for boxes with EV% above 85% to run viable break businesses after accounting for break fees and margin." } },
                    { "@type": "Question", name: "How do platform fees affect break EV?", acceptedAnswer: { "@type": "Answer", text: "Platform fees significantly reduce EV. eBay charges 13.25% + $0.30 per card sold (Trading Cards category). Whatnot charges 10.9% + $0.30. On a $100 auto, eBay takes $13.55 and Whatnot takes $11.20 — a difference of $2.35. Across many sales this adds up. Selling locally eliminates fees entirely but limits your buyer pool and typically achieves lower prices." } },
                    { "@type": "Question", name: "Is pack EV the same as box EV?", acceptedAnswer: { "@type": "Answer", text: "Box EV is the total expected value of opening an entire box. Pack EV is simply the box EV divided by the number of packs. Pack EV is useful for comparing products — if a 24-pack hobby box has an EV of $120 vs $80 box cost, the EV per pack is $5 vs $3.33 cost per pack. Most buying decisions are made at the box level, but pack EV helps compare across different box sizes." } },
                    { "@type": "Question", name: "How does Pokémon box EV compare to sports cards?", acceptedAnswer: { "@type": "Answer", text: "Pokémon boxes typically have lower EV% than premium sports card hobby boxes — most modern Pokémon sets hover around 60–80% EV, while sports card hobby boxes can range from 70% to over 100% for sought-after products. However, Pokémon boxes benefit from massive secondary market liquidity — almost any hit sells quickly. Sports card EV is more player-dependent and can swing wildly based on current news." } },
                ],
            },
        ],
    });

    return (
        <div style={{ minHeight: "100vh", background: "#080810", padding: "72px 20px 100px", fontFamily: "inherit" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

            {/* Glow blobs */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "-5%", right: "10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 65%)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: "5%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>ToolStack</Link>
                    <span>›</span>
                    <Link href="/tools?category=collectibles" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Collectibles</Link>
                    <span>›</span>
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>Pack Break EV Calculator</span>
                </nav>

                {/* Hero */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {[{ text: "🎁 Any Box Type", bg: accentLight, color: accent, border: accentBorder }, { text: "Free Forever", bg: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", border: "rgba(255,255,255,0.1)" }, { text: "No Signup", bg: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", border: "rgba(255,255,255,0.1)" }].map(b => (
                            <span key={b.text} style={{ fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999, background: b.bg, color: b.color, border: `1px solid ${b.border}` }}>{b.text}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, color: "white", margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                        Pack Break{" "}
                        <span style={{ background: `linear-gradient(135deg, ${accent}, #6366f1)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            EV Calculator
                        </span>
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.7, maxWidth: 600 }}>
                        Is this box worth opening? Enter hit rates and average card values to calculate your expected value per pack — with eBay and Whatnot fees already factored in.
                    </p>
                </div>

                {/* Currency + Card Type */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                    {CURRENCIES.map((c, i) => (
                        <button key={c.code} onClick={() => setCurrIdx(i)} style={{
                            padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
                            background: currIdx === i ? accentLight : "rgba(255,255,255,0.04)",
                            border: `1px solid ${currIdx === i ? accentBorder : "rgba(255,255,255,0.09)"}`,
                            color: currIdx === i ? "#d8b4fe" : "rgba(255,255,255,0.5)",
                        }}>{c.symbol} {c.code}</button>
                    ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                    {CARD_TYPES.map(ct => (
                        <button key={ct.id} onClick={() => setCardTypeId(ct.id)} style={{
                            padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
                            background: cardTypeId === ct.id ? accentLight : "rgba(255,255,255,0.04)",
                            border: `1px solid ${cardTypeId === ct.id ? accentBorder : "rgba(255,255,255,0.09)"}`,
                            color: cardTypeId === ct.id ? "#d8b4fe" : "rgba(255,255,255,0.5)",
                            display: "flex", alignItems: "center", gap: 6,
                        }}><span>{ct.emoji}</span>{ct.name}</button>
                    ))}
                </div>

                {/* Box config */}
                <div style={{ ...card }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 20px" }}>Box Configuration</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                        <div>
                            <label style={label}>Box price ({sym})</label>
                            <input value={boxPrice} onChange={e => setBoxPrice(e.target.value)} type="number" min="0" step="0.01" placeholder="e.g. 120.00" style={input} />
                        </div>
                        <div>
                            <label style={label}>Packs per box</label>
                            <input value={packsPerBox} onChange={e => setPacksPerBox(e.target.value)} type="number" min="1" placeholder="24" style={input} />
                        </div>
                        <div>
                            <label style={label}>Cards per pack</label>
                            <input value={cardsPerPack} onChange={e => setCardsPerPack(e.target.value)} type="number" min="1" placeholder="10" style={input} />
                        </div>
                    </div>
                </div>

                {/* Hit rates table */}
                <div style={{ ...card }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>Hit Rates &amp; Values</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "0 0 20px", lineHeight: 1.5 }}>
                        Enter how often each hit type appears (e.g. &quot;12&quot; = 1 per 12 packs) and its average market value. Leave blank to skip a hit type.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {hits.map((h, i) => (
                            <div key={h.id} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 18px" }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: accent, margin: "0 0 14px" }}>{hitLabels[i]}</p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                                    <div>
                                        <label style={label}>1 per __ packs</label>
                                        <input value={h.rate} onChange={e => updateHit(h.id, "rate", e.target.value)} type="number" min="0" step="0.5" placeholder="e.g. 12" style={input} />
                                        {h.rate && parseFloat(h.rate) > 0 && packsPerBox && (
                                            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 5 }}>
                                                ≈ {(packsNum / parseFloat(h.rate)).toFixed(1)} per box
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label style={label}>Avg market value ({sym})</label>
                                        <input value={h.value} onChange={e => updateHit(h.id, "value", e.target.value)} type="number" min="0" step="0.01" placeholder="e.g. 60.00" style={input} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform + shipping */}
                <div style={{ ...card }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>Selling Platform &amp; Costs</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {PLATFORMS.map(p => (
                            <button key={p.id} onClick={() => setPlatformId(p.id)} style={{
                                padding: "9px 18px", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer",
                                background: platformId === p.id ? accentLight : "rgba(255,255,255,0.04)",
                                border: `1px solid ${platformId === p.id ? accentBorder : "rgba(255,255,255,0.09)"}`,
                                color: platformId === p.id ? "#d8b4fe" : "rgba(255,255,255,0.5)",
                                textAlign: "left",
                            }}>
                                <div>{p.name}</div>
                                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 500, marginTop: 2 }}>{p.note}</div>
                            </button>
                        ))}
                    </div>
                    <div style={{ maxWidth: 240 }}>
                        <label style={label}>Shipping cost per hit ({sym})</label>
                        <input value={shippingPerHit} onChange={e => setShippingPerHit(e.target.value)} type="number" min="0" step="0.01" placeholder="4.00" style={input} />
                    </div>
                </div>

                {/* Results */}
                {showResults && (
                    <div>
                        {/* EV summary */}
                        <div style={{ background: ev > 0 ? "rgba(52,211,153,0.08)" : ev < 0 ? "rgba(248,113,113,0.08)" : "rgba(251,191,36,0.08)", border: `1px solid ${ev > 0 ? "rgba(52,211,153,0.25)" : ev < 0 ? "rgba(248,113,113,0.25)" : "rgba(251,191,36,0.25)"}`, borderRadius: 20, padding: "28px 28px", marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                                <div>
                                    <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>Box Expected Value</p>
                                    <div style={{ fontSize: 42, fontWeight: 900, color: statusColor, letterSpacing: "-0.02em" }}>{fmt(ev, sym)}</div>
                                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>
                                        {ev > 0 ? "Positive EV — this box theoretically pays for itself" : ev < -0.01 ? "Negative EV — expected loss on this box" : "Break even — EV covers box cost exactly"}
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>EV %</div>
                                    <div style={{ fontSize: 36, fontWeight: 900, color: statusColor }}>{evPct.toFixed(0)}%</div>
                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>of box cost recovered</div>
                                </div>
                            </div>

                            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
                                {[
                                    { label: "Gross EV", val: fmt(totalGross, sym) },
                                    { label: "Total fees", val: `-${sym}${totalFees.toFixed(2)}` },
                                    { label: "Total shipping", val: `-${sym}${totalShipping.toFixed(2)}` },
                                    { label: "Net EV", val: fmt(totalNet, sym) },
                                    { label: "EV per pack", val: fmt(totalNet / packsNum, sym) },
                                    { label: "Hits per box", val: totalHitsPerBox.toFixed(1) },
                                ].map(stat => (
                                    <div key={stat.label}>
                                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</div>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: "white", marginTop: 4 }}>{stat.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hit breakdown */}
                        <div style={{ ...card }}>
                            <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>Hit Breakdown</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {/* Header */}
                                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 8, padding: "8px 12px", fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    <span>Hit Type</span>
                                    <span style={{ textAlign: "right" }}>Per Box</span>
                                    <span style={{ textAlign: "right" }}>Gross</span>
                                    <span style={{ textAlign: "right" }}>Fees</span>
                                    <span style={{ textAlign: "right" }}>Net</span>
                                </div>
                                {hitCalcs.filter(h => h.hitsPerBox > 0).map((h, i) => (
                                    <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 8, padding: "12px 12px", background: "rgba(255,255,255,0.025)", borderRadius: 10, fontSize: 13 }}>
                                        <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{h.label}</span>
                                        <span style={{ textAlign: "right", color: "rgba(255,255,255,0.55)" }}>{h.hitsPerBox.toFixed(1)}</span>
                                        <span style={{ textAlign: "right", color: "rgba(255,255,255,0.7)" }}>{fmt(h.grossValue, sym)}</span>
                                        <span style={{ textAlign: "right", color: "#f87171" }}>-{sym}{(h.feeAmount + h.shippingAmount).toFixed(2)}</span>
                                        <span style={{ textAlign: "right", color: h.netValue > 0 ? "#34d399" : "#f87171", fontWeight: 700 }}>{fmt(h.netValue, sym)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Scenarios */}
                        <div style={{ ...card }}>
                            <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>Scenarios</p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                                {scenarios.map(s => (
                                    <div key={s.name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px" }}>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.name}</div>
                                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>{s.note}</div>
                                        <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{fmt(s.scenarioEv, sym)}</div>
                                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.scenarioEvPct.toFixed(0)}% EV</div>
                                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>Net: {fmt(s.scenarioNet, sym)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* How it works */}
                <div style={{ ...card, marginTop: showResults ? 0 : 8 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 24px", letterSpacing: "-0.01em" }}>How to Use the Pack Break EV Calculator</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                        {[
                            { step: "1", title: "Select card type", desc: "Choose Pokémon, sports cards, football cards or other to auto-label your hit type fields correctly." },
                            { step: "2", title: "Enter box config", desc: "Input the box price, packs per box and cards per pack from the product listing or box description." },
                            { step: "3", title: "Fill in hit rates", desc: "For each hit type, enter how many packs per hit (e.g. 12 = 1 auto per 12 packs) and the average market value from recent eBay sales." },
                            { step: "4", title: "Review your EV", desc: "See expected value, EV%, net profit after fees, and bear/base/bull scenarios — instantly calculated as you type." },
                        ].map(s => (
                            <div key={s.step}>
                                <div style={{ width: 32, height: 32, borderRadius: 10, background: accentLight, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: accent, marginBottom: 12 }}>{s.step}</div>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{s.title}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Educational content */}
                <div style={{ ...card }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.01em" }}>Understanding Pack Break Expected Value</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 16px" }}>
                        Expected value (EV) is the mathematical average return from opening a box, calculated by multiplying the probability of each hit by its market value. A box with positive EV means that, on average across many openings, you&apos;d profit. A negative EV means you&apos;d lose money on average — though any individual box could massively outperform or underperform.
                    </p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 16px" }}>
                        Most modern retail boxes carry negative EV — manufacturers price packs at a premium over expected card value. Hobby boxes (sealed cases with guaranteed hit rates) tend to have better EV than retail. Sealed case buys can approach or exceed 100% EV for sought-after products.
                    </p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: 0 }}>
                        Unlike competitors that only show gross EV, ToolStack&apos;s calculator deducts platform fees (eBay at 13.25% + $0.30, or Whatnot at 10.9% + $0.30) and your per-hit shipping cost — giving you a realistic net EV figure. The three scenarios (Bear/Base/Bull at 70%/100%/130% of expected value) account for natural luck variance in any given box.
                    </p>
                </div>

                {/* FAQ */}
                <div style={{ ...card }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 24px", letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {[
                            { q: "What is expected value (EV) in card breaks?", a: "Expected value (EV) is the average monetary return you'd expect from opening a box across many openings. Positive EV means you theoretically profit on average. Negative EV means an expected loss. EV is a statistical guide — individual results vary widely due to luck." },
                            { q: "How do I calculate pack break EV?", a: "EV = (hits per box × average value) − box cost − platform fees − shipping. For a 24-pack box with 1 auto per 12 packs (2 autos), each worth $80: gross = $160. Subtract eBay fees (13.25% + $0.30 = $21.20) and shipping ($8) = net $130.80. EV = $130.80 − box cost." },
                            { q: "What is the best free pack break EV calculator?", a: "ToolStack's Pack Break EV Calculator covers Pokémon, sports cards and football cards, includes eBay and Whatnot fee deduction, runs bear/base/bull scenarios, shows EV per pack and EV percentage, and works in GBP, USD, EUR, AUD and CAD. No signup required." },
                            { q: "What EV% is good for a box break?", a: "100%+ means positive EV — the box theoretically covers its own cost. Most retail boxes land at 60–90% EV. Professional breakers typically target 85%+ to maintain margins. Sealed case buys on hot products can hit 100–120% EV." },
                            { q: "How do platform fees affect break EV?", a: "Significantly. eBay takes 13.25% + $0.30 per card; Whatnot takes 10.9% + $0.30. On a $100 auto, eBay takes $13.55 vs Whatnot's $11.20. Across 20 hits per case, the difference adds up to $47 — a material impact on total EV." },
                            { q: "Is pack EV the same as box EV?", a: "Box EV is the total expected value of an entire box. Pack EV = box EV ÷ packs per box. Pack EV helps you compare different box formats — a 36-pack box vs a 12-pack box at the same total EV works out to different per-pack economics." },
                            { q: "How does Pokémon box EV compare to sports cards?", a: "Pokémon retail boxes typically run 60–80% EV. Sports card hobby boxes range widely — from 70% on slow products to 100%+ on sought-after releases. Pokémon benefits from massive secondary market liquidity; sports card EV swings more based on individual player performance and news." },
                        ].map((faq, i) => (
                            <div key={i} style={{ borderBottom: i < 6 ? "1px solid rgba(255,255,255,0.05)" : "none", paddingBottom: i < 6 ? 20 : 0 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 8px", lineHeight: 1.4 }}>{faq.q}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Authority Bridge */}
                <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 16, padding: "20px 24px", marginBottom: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(129,140,248,0.8)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>More Collectibles Tools</p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 0 12px", lineHeight: 1.6 }}>
                        Calculate break spot pricing, eBay best offers, card grading profit and more — all free, no signup.
                    </p>
                    <Link href="/tools?category=collectibles" style={{ fontSize: 13, fontWeight: 700, color: "#818cf8", textDecoration: "none" }}>
                        View all collectibles tools →
                    </Link>
                </div>

                <MoreTools currentSlug="pack-break-ev-calculator" />
            </div>
        </div>
    );
}
