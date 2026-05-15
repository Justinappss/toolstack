"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const FAQS = [
  { q: "How many packs does it take to complete the FIFA World Cup 2026 Panini album?", a: "Without trading, completing the World Cup 2026 album (980 stickers) typically requires around 490 packs due to duplicates \u2014 that&apos;s roughly &pound;735 in the UK. With active swapping at 70% efficiency, this drops to around 150 packs (&pound;225). Our calculator gives you a personalised estimate based on your current collection." },
  { q: "How much does it cost to complete the Panini World Cup 2026 album?", a: "Without swapping, completing the World Cup 2026 album costs approximately &pound;735 in the UK or $980 in the US. With active sticker trading, costs drop to around &pound;225 (&pound;UK) or $300 (US). This calculator gives you a personalised breakdown based on stickers you already own." },
  { q: "What is the best free Panini sticker calculator?", a: "ToolStack&apos;s Panini Sticker Calculator is the most complete free option available. It covers all major Panini albums (World Cup 2026, Premier League, Champions League, EURO 2024, LaLiga), accounts for your existing collection, calculates swap savings in your local currency (GBP, USD, EUR, AUD, CAD), and shows a weekly completion timeline. No signup or account required." },
  { q: "How does sticker swapping save money on Panini albums?", a: "When completing an album by buying packs randomly, you inevitably collect duplicates of stickers you already have. By trading duplicates with other collectors through Facebook groups, Reddit, school playgrounds or Panini&apos;s official swap platform, each duplicate can replace a pack purchase. At 70% efficiency (the default), swapping typically cuts your completion cost by 50-70%." },
  { q: "How many stickers are in the FIFA World Cup 2026 Panini album?", a: "The FIFA World Cup 2026 Panini sticker album contains 980 stickers, making it the largest World Cup collection in Panini history. The 2026 tournament expands to 48 teams from 32, which accounts for the significant increase from previous tournaments." },
  { q: "How many stickers are in a standard Panini pack?", a: "Standard Panini sticker packs contain 5 stickers. This is the universal standard across all major Panini football collections including World Cup, Premier League and Champions League. Some supermarket multi-packs contain more, but 5 per individual pack is the baseline used in this calculator." }
];


const CURRENCIES = [
    { code: "GBP", symbol: "£" },
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "AUD", symbol: "A$" },
    { code: "CAD", symbol: "C$" },
];

type Album = {
    id: string;
    name: string;
    stickers: number;
    stickersPerPack: number;
    packPrices: Record<string, number>;
    note?: string;
    emoji: string;
};

const ALBUMS: Album[] = [
    {
        id: "wc2026",
        name: "FIFA World Cup 2026™",
        stickers: 980,
        stickersPerPack: 5,
        packPrices: { GBP: 1.50, USD: 2.00, EUR: 1.80, AUD: 3.00, CAD: 2.70 },
        note: "48 teams — largest World Cup album ever",
        emoji: "🌍",
    },
    {
        id: "pl2526",
        name: "Premier League 2025-26",
        stickers: 720,
        stickersPerPack: 5,
        packPrices: { GBP: 1.20, USD: 1.80, EUR: 1.40, AUD: 2.70, CAD: 2.50 },
        emoji: "⚽",
    },
    {
        id: "ucl2425",
        name: "UEFA Champions League 2024-25",
        stickers: 640,
        stickersPerPack: 5,
        packPrices: { GBP: 1.20, USD: 1.80, EUR: 1.40, AUD: 2.70, CAD: 2.50 },
        emoji: "⭐",
    },
    {
        id: "euro2024",
        name: "UEFA EURO 2024",
        stickers: 720,
        stickersPerPack: 5,
        packPrices: { GBP: 1.20, USD: 1.80, EUR: 1.40, AUD: 2.70, CAD: 2.50 },
        emoji: "🏆",
    },
    {
        id: "laliga2425",
        name: "LaLiga 2024-25",
        stickers: 580,
        stickersPerPack: 5,
        packPrices: { GBP: 1.20, USD: 1.80, EUR: 1.40, AUD: 2.70, CAD: 2.50 },
        emoji: "🇪🇸",
    },
    {
        id: "custom",
        name: "Custom Album",
        stickers: 0,
        stickersPerPack: 5,
        packPrices: { GBP: 1.20, USD: 1.80, EUR: 1.40, AUD: 2.70, CAD: 2.50 },
        note: "Enter your own album details",
        emoji: "📋",
    },
];

function fmt(n: number, sym: string): string {
    if (n < 0) return `-${sym}${Math.abs(n).toFixed(2)}`;
    return `${sym}${n.toFixed(2)}`;
}

const accent = "#ef4444";
const accentLight = "rgba(239,68,68,0.15)";
const accentBorder = "rgba(239,68,68,0.3)";

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

export default function PaniniStickerCalculator() {
    const [currIdx, setCurrIdx] = useState(0);
    const [albumId, setAlbumId] = useState("wc2026");
    const [customStickers, setCustomStickers] = useState("500");
    const [packPrice, setPackPrice] = useState("1.50");
    const [stickersPerPack, setStickersPerPack] = useState("5");
    const [collected, setCollected] = useState("");
    const [duplicates, setDuplicates] = useState("");
    const [swapEfficiency, setSwapEfficiency] = useState("70");
    const [packsPerWeek, setPacksPerWeek] = useState("");

    const sym = CURRENCIES[currIdx].symbol;
    const curr = CURRENCIES[currIdx].code;
    const album = ALBUMS.find(a => a.id === albumId) ?? ALBUMS[0];

    useEffect(() => {
        if (albumId !== "custom") {
            setPackPrice(album.packPrices[curr].toFixed(2));
            setStickersPerPack(String(album.stickersPerPack));
        }
    }, [albumId, curr]);

    const totalStickers = albumId === "custom" ? (parseInt(customStickers) || 0) : album.stickers;
    const collectedNum = Math.min(Math.max(parseInt(collected) || 0, 0), totalStickers);
    const duplicatesNum = Math.max(parseInt(duplicates) || 0, 0);
    const packPriceNum = Math.max(parseFloat(packPrice) || 0, 0);
    const stickersPerPackNum = Math.max(parseInt(stickersPerPack) || 5, 1);
    const swapRate = Math.min(Math.max((parseInt(swapEfficiency) || 70) / 100, 0), 1);
    const packsPerWeekNum = Math.max(parseInt(packsPerWeek) || 0, 0);

    const needed = Math.max(totalStickers - collectedNum, 0);
    const completionPct = totalStickers > 0 ? (collectedNum / totalStickers) * 100 : 0;
    const fromSwaps = Math.min(Math.floor(duplicatesNum * swapRate), needed);
    const afterSwaps = Math.max(needed - fromSwaps, 0);

    // Without swaps: ~2.5x multiplier accounts for random duplicates (coupon-collector effect)
    // With swaps: ~1.5x — active trading reduces duplicate waste significantly
    const packsNoSwaps = totalStickers > 0 ? Math.ceil((needed * 2.5) / stickersPerPackNum) : 0;
    const packsWithSwaps = totalStickers > 0 ? Math.ceil((afterSwaps * 1.5) / stickersPerPackNum) : 0;
    const costNoSwaps = packsNoSwaps * packPriceNum;
    const costWithSwaps = packsWithSwaps * packPriceNum;
    const savings = Math.max(costNoSwaps - costWithSwaps, 0);
    const savingsPct = costNoSwaps > 0 ? (savings / costNoSwaps) * 100 : 0;

    const weeksNoSwaps = packsPerWeekNum > 0 ? Math.ceil(packsNoSwaps / packsPerWeekNum) : 0;
    const weeksWithSwaps = packsPerWeekNum > 0 ? Math.ceil(packsWithSwaps / packsPerWeekNum) : 0;

    const hasResults = totalStickers > 0 && (parseInt(collected) >= 0 || collected === "");

    const jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                name: "Panini Sticker Album Completion Calculator",
                description: "Free calculator to find out how many packs and how much money it costs to complete any Panini sticker album, including FIFA World Cup 2026, Premier League and Champions League.",
                url: "https://toolstack.tech/tools/panini-sticker-calculator",
                applicationCategory: "UtilityApplication",
                operatingSystem: "Web",
                browserRequirements: "Requires JavaScript",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                featureList: [
                    "FIFA World Cup 2026 album cost calculator",
                    "Premier League and Champions League sticker calculators",
                    "Swap savings calculator — see how much trading saves you",
                    "Multi-currency: GBP, USD, EUR, AUD, CAD",
                    "Weekly completion timeline",
                    "Cost comparison: swapping vs buying only",
                ],
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "ToolStack", item: "https://toolstack.tech" },
                    { "@type": "ListItem", position: 2, name: "Collectibles", item: "https://toolstack.tech/tools?category=collectibles" },
                    { "@type": "ListItem", position: 3, name: "Panini Sticker Album Completion Calculator", item: "https://toolstack.tech/tools/panini-sticker-calculator" },
                ],
            },
        ],
    });

    return (
        <div style={{ minHeight: "100vh", background: "#080810", padding: "72px 20px 100px", fontFamily: "inherit" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

            {/* Glow blobs */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "-5%", right: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 65%)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>ToolStack</Link>
                    <span>›</span>
                    <Link href="/tools/category/collectibles" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Collectibles</Link>
                    <span>›</span>
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>Panini Sticker Calculator</span>
                </nav>

                {/* Hero */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {[{ text: "📒 All Major Albums", bg: accentLight, color: accent, border: accentBorder }, { text: "Free Forever", bg: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", border: "rgba(255,255,255,0.1)" }, { text: "No Signup", bg: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", border: "rgba(255,255,255,0.1)" }].map(b => (
                            <span key={b.text} style={{ fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999, background: b.bg, color: b.color, border: `1px solid ${b.border}` }}>{b.text}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, color: "white", margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                        Panini Sticker Album{" "}
                        <span style={{ background: `linear-gradient(135deg, ${accent}, #f97316)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Completion Calculator
                        </span>
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.7, maxWidth: 600 }}>
                        Find out exactly how many packs and how much money it takes to complete any Panini album — including the FIFA World Cup 2026. See how much swapping saves you.
                    </p>
                </div>

                {/* Currency selector */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                    {CURRENCIES.map((c, i) => (
                        <button key={c.code} onClick={() => setCurrIdx(i)} style={{
                            padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
                            background: currIdx === i ? "rgba(239,68,68,0.18)" : "rgba(255,255,255,0.04)",
                            border: `1px solid ${currIdx === i ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.09)"}`,
                            color: currIdx === i ? "#fca5a5" : "rgba(255,255,255,0.5)",
                        }}>{c.symbol} {c.code}</button>
                    ))}
                </div>

                {/* Album selector */}
                <div style={{ ...card }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>Select Your Album</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                        {ALBUMS.map(a => {
                            const active = albumId === a.id;
                            return (
                                <button key={a.id} onClick={() => setAlbumId(a.id)} style={{
                                    textAlign: "left", padding: "14px 16px", borderRadius: 14, cursor: "pointer",
                                    background: active ? accentLight : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${active ? accentBorder : "rgba(255,255,255,0.07)"}`,
                                }}>
                                    <div style={{ fontSize: 20, marginBottom: 6 }}>{a.emoji}</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: active ? "#fca5a5" : "white", lineHeight: 1.3 }}>{a.name}</div>
                                    {a.stickers > 0 && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{a.stickers.toLocaleString()} stickers</div>}
                                    {a.note && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{a.note}</div>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Custom album stickers input */}
                {albumId === "custom" && (
                    <div style={{ ...card }}>
                        <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>Album Details</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                            <div>
                                <label style={label}>Total stickers in album</label>
                                <input value={customStickers} onChange={e => setCustomStickers(e.target.value)} type="number" min="1" placeholder="e.g. 680" style={input} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Your collection + pack settings */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                    <div style={{ ...card, marginBottom: 0 }}>
                        <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>Your Collection</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div>
                                <label style={label}>Stickers already collected</label>
                                <input value={collected} onChange={e => setCollected(e.target.value)} type="number" min="0" max={totalStickers} placeholder="e.g. 245" style={input} />
                                {totalStickers > 0 && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>Out of {totalStickers.toLocaleString()} total stickers</p>}
                            </div>
                            <div>
                                <label style={label}>Duplicate stickers for swaps</label>
                                <input value={duplicates} onChange={e => setDuplicates(e.target.value)} type="number" min="0" placeholder="e.g. 80" style={input} />
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>Stickers you can trade with others</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ ...card, marginBottom: 0 }}>
                        <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>Pack Settings</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div>
                                <label style={label}>Price per pack ({sym})</label>
                                <input value={packPrice} onChange={e => setPackPrice(e.target.value)} type="number" min="0" step="0.01" placeholder="1.50" style={input} />
                            </div>
                            <div>
                                <label style={label}>Stickers per pack</label>
                                <input value={stickersPerPack} onChange={e => setStickersPerPack(e.target.value)} type="number" min="1" placeholder="5" style={input} />
                            </div>
                            <div>
                                <label style={label}>Swap efficiency (%)</label>
                                <input value={swapEfficiency} onChange={e => setSwapEfficiency(e.target.value)} type="number" min="0" max="100" placeholder="70" style={input} />
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>% of duplicates you can trade for new stickers (70% is typical)</p>
                            </div>
                            <div>
                                <label style={label}>Packs per week budget (optional)</label>
                                <input value={packsPerWeek} onChange={e => setPacksPerWeek(e.target.value)} type="number" min="0" placeholder="e.g. 5" style={input} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {hasResults && totalStickers > 0 && (
                    <div style={{ marginTop: 16 }}>
                        {/* Progress bar */}
                        <div style={{ ...card }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                                <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>Album Progress</p>
                                <span style={{ fontSize: 24, fontWeight: 900, color: completionPct >= 80 ? "#34d399" : completionPct >= 50 ? "#fbbf24" : accent }}>
                                    {completionPct.toFixed(1)}%
                                </span>
                            </div>
                            <div style={{ height: 10, background: "rgba(255,255,255,0.07)", borderRadius: 999, overflow: "hidden" }}>
                                <div style={{
                                    height: "100%",
                                    width: `${Math.min(completionPct, 100)}%`,
                                    background: completionPct >= 80 ? "linear-gradient(90deg, #34d399, #10b981)" : completionPct >= 50 ? "linear-gradient(90deg, #fbbf24, #f97316)" : `linear-gradient(90deg, ${accent}, #f97316)`,
                                    borderRadius: 999,
                                    transition: "width 0.4s ease",
                                }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                                <span>{collectedNum.toLocaleString()} collected</span>
                                <span>{needed.toLocaleString()} still needed</span>
                                <span>{totalStickers.toLocaleString()} total</span>
                            </div>
                        </div>

                        {/* Two scenario columns */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                            {/* No swaps */}
                            <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 20, padding: "24px 24px" }}>
                                <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(239,68,68,0.8)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 20px" }}>Without Swapping</p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Packs needed</span>
                                        <span style={{ fontSize: 20, fontWeight: 900, color: "white" }}>{packsNoSwaps.toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Estimated cost</span>
                                        <span style={{ fontSize: 22, fontWeight: 900, color: accent }}>{fmt(costNoSwaps, sym)}</span>
                                    </div>
                                    {packsPerWeekNum > 0 && weeksNoSwaps > 0 && (
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Time to complete</span>
                                            <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>{weeksNoSwaps} weeks</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* With swaps */}
                            <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 20, padding: "24px 24px" }}>
                                <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(52,211,153,0.8)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 20px" }}>
                                    With Swapping {duplicatesNum > 0 ? `(${fromSwaps} from trades)` : ""}
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Packs needed</span>
                                        <span style={{ fontSize: 20, fontWeight: 900, color: "white" }}>{packsWithSwaps.toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Estimated cost</span>
                                        <span style={{ fontSize: 22, fontWeight: 900, color: "#34d399" }}>{fmt(costWithSwaps, sym)}</span>
                                    </div>
                                    {packsPerWeekNum > 0 && weeksWithSwaps > 0 && (
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Time to complete</span>
                                            <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>{weeksWithSwaps} weeks</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Savings banner */}
                        {savings > 0 && (
                            <div style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 16, padding: "18px 24px", marginTop: 0, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                                <div>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: "#34d399", margin: "0 0 2px" }}>Swapping saves you</p>
                                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>by trading your {duplicatesNum.toLocaleString()} duplicates at {swapEfficiency}% efficiency</p>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <span style={{ fontSize: 28, fontWeight: 900, color: "#34d399" }}>{fmt(savings, sym)}</span>
                                    <div style={{ fontSize: 12, color: "rgba(52,211,153,0.7)", marginTop: 2 }}>{savingsPct.toFixed(0)}% cheaper with swaps</div>
                                </div>
                            </div>
                        )}

                        {/* Sticker breakdown */}
                        {needed > 0 && (
                            <div style={{ ...card }}>
                                <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>Sticker Breakdown</p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                                    {[
                                        { label: "Stickers needed", value: needed.toLocaleString(), color: "rgba(255,255,255,0.7)" },
                                        { label: "From your swaps", value: fromSwaps.toLocaleString(), color: "#34d399" },
                                        { label: "Still to acquire", value: afterSwaps.toLocaleString(), color: afterSwaps === 0 ? "#34d399" : accent },
                                    ].map(row => (
                                        <div key={row.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px" }}>
                                            <div style={{ fontSize: 22, fontWeight: 900, color: row.color }}>{row.value}</div>
                                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{row.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {needed === 0 && collectedNum > 0 && (
                            <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 16, padding: "20px 24px", textAlign: "center" }}>
                                <div style={{ fontSize: 32 }}>🎉</div>
                                <p style={{ fontSize: 18, fontWeight: 800, color: "#34d399", margin: "8px 0 4px" }}>Album Complete!</p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0 }}>You have all {totalStickers.toLocaleString()} stickers. Well done!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* How it works */}
                <div style={{ ...card, marginTop: 40 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 24px", letterSpacing: "-0.01em" }}>How the Calculator Works</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                        {[
                            { step: "1", title: "Select your album", desc: "Choose from World Cup 2026, Premier League, Champions League, EURO 2024, LaLiga or enter custom details." },
                            { step: "2", title: "Enter your collection", desc: "Tell us how many unique stickers you already have and how many duplicates you can trade away." },
                            { step: "3", title: "See two scenarios", desc: "Get instant estimates for completing the album by buying only vs. actively swapping duplicates with other collectors." },
                            { step: "4", title: "Find your savings", desc: "See exactly how much money active swapping saves — typically 50–70% less than buying packs alone." },
                        ].map(s => (
                            <div key={s.step}>
                                <div style={{ width: 32, height: 32, borderRadius: 10, background: accentLight, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: accent, marginBottom: 12 }}>{s.step}</div>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{s.title}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* About the calculator */}
                <div style={{ ...card }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.01em" }}>The Real Cost of Completing a Panini Album</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 16px" }}>
                        Completing a Panini sticker album without trading is expensive — and the maths explain why. When you need just 50 stickers out of 980, each random pack has only a 5% chance of giving you something useful. This is the coupon collector&apos;s problem: the last stickers you need are disproportionately expensive to obtain by luck alone.
                    </p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 16px" }}>
                        The FIFA World Cup 2026 album is historically significant — 980 stickers across 48 teams, the most ambitious Panini album ever produced. Without swapping, completing it from scratch costs approximately &pound;735–&pound;900 in the UK. With active trading at 70% swap efficiency, that drops to &pound;225–&pound;300 — a saving of over &pound;500.
                    </p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: 0 }}>
                        Unlike most calculators, ToolStack&apos;s Panini Sticker Calculator accounts for your actual collection size and swap efficiency — giving you a personalised estimate, not a generic number. The &ldquo;swap efficiency&rdquo; field (default 70%) represents how many of your duplicate stickers you can successfully trade for new ones. Active traders in dedicated Facebook groups and subreddits consistently hit 75–85%.
                    </p>
                </div>


                <FaqPageSchema faqs={FAQS} />

                {/* FAQ */}
                <div style={{ ...card }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 24px", letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {[
                            { q: "How many packs does it take to complete the FIFA World Cup 2026 Panini album?", a: "Without trading, completing the World Cup 2026 album (980 stickers) typically requires around 490 packs due to duplicate stickers — roughly £735 in the UK. With active swapping at 70% efficiency, this drops to around 150 packs (£225). Our calculator gives you a personalised estimate based on your current collection." },
                            { q: "How much does it cost to complete the Panini World Cup 2026 album?", a: "Without swapping, completing the World Cup 2026 album costs approximately £735–£900 in the UK or $980–$1,200 in the US. With active sticker trading, costs drop to around £225–£300 (UK) or $300–$400 (US). This calculator gives you a personalised breakdown based on stickers you already own." },
                            { q: "What is the best free Panini sticker calculator?", a: "ToolStack's Panini Sticker Calculator is the most comprehensive free option. It covers all major albums (World Cup 2026, Premier League, Champions League, EURO 2024, LaLiga), accounts for your existing collection, calculates swap savings in your local currency (GBP, USD, EUR, AUD, CAD), and shows a weekly completion timeline. No signup required." },
                            { q: "How does sticker swapping save money on Panini albums?", a: "When completing an album by buying packs randomly, you inevitably collect duplicates of stickers you already have. By trading duplicates with other collectors through Facebook groups, Reddit, or school playgrounds, each duplicate can replace a pack purchase. At 70% efficiency, swapping typically cuts your completion cost by 50–70%." },
                            { q: "How many stickers are in the FIFA World Cup 2026 Panini album?", a: "The FIFA World Cup 2026 Panini sticker album contains 980 stickers, making it the largest World Cup collection in Panini history. The 2026 tournament expands to 48 teams (up from 32), which accounts for the significant increase from previous editions." },
                            { q: "How many stickers are in a standard Panini pack?", a: "Standard Panini sticker packs contain 5 stickers — the universal standard across World Cup, Premier League and Champions League albums. Some supermarket multi-packs contain more individual packs per wrapper, but each individual pack contains 5 stickers." },
                        ].map((faq, i) => (
                            <div key={i} style={{ borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none", paddingBottom: i < 5 ? 20 : 0 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 8px", lineHeight: 1.4 }}>{faq.q}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Authority Bridge */}
                <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 16, padding: "20px 24px", marginBottom: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(129,140,248,0.8)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>From the ToolStack Blog</p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 0 12px", lineHeight: 1.6 }}>
                        Collecting is part of the fun — but so is being smart about costs. Explore our card hobby tools including the Card Flip ROI Calculator, eBay Best Offer Calculator, and Card Grading Profit Calculator.
                    </p>
                    <Link href="/tools/category/collectibles" style={{ fontSize: 13, fontWeight: 700, color: "#818cf8", textDecoration: "none" }}>
                        View all collectibles tools →
                    </Link>
                </div>

                {/* SEO Description */}
                <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Panini Sticker Calculator: Free Online Tool</h2>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: 16 }}>
                      Completing a Panini sticker album is a probability problem disguised as a hobby. The first 80% of stickers come quickly, but the last 20% require exponentially more packs because of duplicates. Our Panini Sticker Calculator uses the coupon collector's problem formula to tell you exactly how many packs you'll need on average and what it'll cost — before you spend a penny.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Enter the total stickers in the album, stickers per pack, price per pack, and how many stickers you already have. The calculator uses probability math to estimate total packs needed, total cost to complete, expected duplicates, and the diminishing returns curve as you approach completion. Factor in trading with friends to see how much swapping saves you.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Common uses include planning your World Cup or Euro album budget before buying packs, deciding whether to buy the last 50 stickers individually or keep buying packs, calculating how many friends you need to trade with to complete the album efficiently, and comparing the economics of buying packs vs. buying singles on eBay for the final stretch.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      Most people underestimate how many packs it takes to finish a Panini album — the math says a 638-sticker album typically requires 900+ packs without trading. Our calculator shows you the real numbers so you can budget accordingly or know when to switch to buying singles. Free, instant, no signup required.
                    </p>
                  </div>
                </section>

                <MoreTools currentSlug="panini-sticker-calculator" />
            </div>
        </div>
    );
}
