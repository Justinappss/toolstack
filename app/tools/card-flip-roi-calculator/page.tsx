"use client";
import { useState, useCallback } from "react";
import { MoreTools } from "@/components/MoreTools";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";

const ACCENT = "#10b981";
const ACCENT_RGB = "16,185,129";

const PLATFORMS = [
  { id: "ebay", name: "eBay", icon: "🛒", feeRate: 0.1325, fixedFee: 0.30, notes: "13.25% + $0.30 (trading cards category)" },
  { id: "whatnot", name: "Whatnot", icon: "🔥", feeRate: 0.108, fixedFee: 0.30, notes: "8% commission + 2.9% payment + $0.30" },
  { id: "comc", name: "COMC", icon: "📦", feeRate: 0.15, fixedFee: 0.25, notes: "15% + $0.25 per sale" },
  { id: "facebook", name: "Facebook", icon: "📱", feeRate: 0.05, fixedFee: 0, notes: "5% for shipped sales, 0% local pickup" },
  { id: "local", name: "Local / Cash", icon: "🤝", feeRate: 0, fixedFee: 0, notes: "0% fees — full take-home" },
];

const SHIPPING_OPTIONS = [
  { id: "pwe", name: "PWE (No tracking)", cost: 0.73, note: "Plain white envelope, stamp only" },
  { id: "bmwt", name: "BMWT", cost: 3.50, note: "Bubble mailer with top loader + tracking" },
  { id: "flat", name: "Padded Flat Rate", cost: 8.95, note: "USPS Priority padded flat rate" },
  { id: "box", name: "Card Box", cost: 10.50, note: "Full box with padding, perfect for slabs" },
  { id: "none", name: "Local / No shipping", cost: 0, note: "Buyer picks up or buyer pays shipping" },
];

function calcFlip(buyPrice: number, sellPrice: number, platformId: string, shippingId: string, gradingCost: number, suppliesCost: number) {
  const platform = PLATFORMS.find(p => p.id === platformId)!;
  const shipping = SHIPPING_OPTIONS.find(s => s.id === shippingId)!;
  const platformFee = sellPrice * platform.feeRate + platform.fixedFee;
  const totalCost = buyPrice + gradingCost + suppliesCost;
  const netRevenue = sellPrice - platformFee - shipping.cost;
  const profit = netRevenue - totalCost;
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
  const breakEven = totalCost + platformFee + shipping.cost;
  const effectiveRate = sellPrice > 0 ? ((platformFee + shipping.cost) / sellPrice) * 100 : 0;
  return { platformFee, shippingCost: shipping.cost, totalCost, netRevenue, profit, roi, breakEven, effectiveRate };
}

function fmt(n: number) {
  return n < 0 ? `-$${Math.abs(n).toFixed(2)}` : `$${n.toFixed(2)}`;
}

export default function CardFlipROIPage() {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [platform, setPlatform] = useState("ebay");
  const [shipping, setShipping] = useState("bmwt");
  const [gradingCost, setGradingCost] = useState("");
  const [suppliesCost, setSuppliesCost] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const buy = parseFloat(buyPrice) || 0;
  const sell = parseFloat(sellPrice) || 0;
  const grading = parseFloat(gradingCost) || 0;
  const supplies = parseFloat(suppliesCost) || 0;

  const hasValues = buy > 0 && sell > 0;
  const result = hasValues ? calcFlip(buy, sell, platform, shipping, grading, supplies) : null;

  const allPlatformResults = hasValues
    ? PLATFORMS.map(p => ({
        ...p,
        ...calcFlip(buy, sell, p.id, shipping, grading, supplies),
      }))
    : null;

  const profitColor = !result ? "#fff" : result.profit > 0 ? "#34d399" : result.profit < 0 ? "#f87171" : "#fbbf24";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Card Flip ROI Calculator",
        description: "Free calculator showing exact profit and ROI for sports card flips. Includes eBay, Whatnot, COMC and local platform fees, shipping costs and break-even price.",
        url: "https://toolstack.tech/tools/card-flip-roi-calculator",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Real-time profit and ROI calculation",
          "eBay 13.25% trading card fee built in",
          "Multi-platform comparison (eBay, Whatnot, COMC, local)",
          "Card shipping cost options (PWE, BMWT, flat rate, box)",
          "Break-even sell price calculator",
          "Grading cost inclusion option",
          "Supplies cost tracker",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ToolStack", item: "https://toolstack.tech" },
          { "@type": "ListItem", position: 2, name: "Collectibles", item: "https://toolstack.tech/tools?category=collectibles" },
          { "@type": "ListItem", position: 3, name: "Card Flip ROI Calculator", item: "https://toolstack.tech/tools/card-flip-roi-calculator" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the eBay fee for selling sports cards in 2026?", acceptedAnswer: { "@type": "Answer", text: "eBay charges 13.25% of the total sale price (including shipping) plus $0.30 per order for trading cards in 2026. On a $100 card, that is $13.55 in fees, leaving you with $86.45 before shipping and your buy cost." } },
          { "@type": "Question", name: "How do I calculate my ROI on a card flip?", acceptedAnswer: { "@type": "Answer", text: "ROI = (Net profit / Total cost) x 100. Net profit = sell price minus platform fees, shipping, buy price, grading costs and supplies. For example: buy $20, sell $50 on eBay ($6.93 fee + $3.50 BMWT shipping) = $39.57 net revenue, $19.57 profit on $20 cost = 97.8% ROI." } },
          { "@type": "Question", name: "What is the cheapest way to ship a sports card?", acceptedAnswer: { "@type": "Answer", text: "A PWE (plain white envelope) with a stamp costs around $0.73 and works for low-value raw cards. For tracked shipments, a BMWT (bubble mailer with top loader) runs $3.50-$4.50. USPS padded flat rate envelopes at $8.95 are best for multiple cards or graded slabs." } },
          { "@type": "Question", name: "Is Whatnot cheaper than eBay for selling cards?", acceptedAnswer: { "@type": "Answer", text: "Whatnot charges 8% commission + 2.9% payment processing + $0.30, totalling approximately 10.8% + $0.30. eBay charges 13.25% + $0.30. Whatnot is cheaper on percentage fees for cards under $1,500, but eBay has a larger buyer pool which can offset the fee difference with higher sale prices." } },
          { "@type": "Question", name: "What is a good ROI on a card flip?", acceptedAnswer: { "@type": "Answer", text: "A good card flip ROI is 30% or more after all fees. Professional flippers target 50-100% ROI on quick flips. Anything under 20% ROI is generally not worth the effort once you factor in time. For graded cards, ROI is lower because grading costs are a fixed overhead." } },
          { "@type": "Question", name: "What does break-even mean for a card flip?", acceptedAnswer: { "@type": "Answer", text: "Break-even is the minimum sell price where you make exactly $0 profit. It accounts for your buy price, platform fees, shipping and any grading or supply costs. Selling above break-even means profit; below means a loss. Always calculate your break-even before listing a card." } },
        ],
      },
    ],
  };

  const wrap: React.CSSProperties = {
    background: "#080810", minHeight: "100vh",
    fontFamily: "'Inter', system-ui, sans-serif", color: "#fff",
  };
  const glow: React.CSSProperties = {
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    background: `radial-gradient(900px 600px at 15% 10%, rgba(${ACCENT_RGB},.07), transparent 60%), radial-gradient(900px 600px at 85% 85%, rgba(99,102,241,.07), transparent 60%)`,
  };
  const content: React.CSSProperties = {
    position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px",
  };
  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 20, padding: "24px 28px", marginBottom: 16,
  };
  const label: React.CSSProperties = {
    display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.55)",
    letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8,
  };
  const input: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 12, padding: "12px 14px", color: "#fff", fontSize: 16, fontWeight: 600,
    outline: "none", fontFamily: "inherit",
  };
  const pill = (active: boolean, color = ACCENT_RGB): React.CSSProperties => ({
    border: `1px solid ${active ? `rgba(${color},.45)` : "rgba(255,255,255,.09)"}`,
    background: active ? `rgba(${color},.18)` : "rgba(255,255,255,.04)",
    color: active ? `rgb(${color})` : "rgba(255,255,255,.55)",
    padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit", transition: "all .15s",
  });

  return (
    <div style={wrap}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
        input:focus { border-color: rgba(${ACCENT_RGB},.5) !important; box-shadow: 0 0 0 3px rgba(${ACCENT_RGB},.12); }
        details summary { cursor: pointer; list-style: none; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>
      <div style={glow} />

      <div style={content}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,.38)", marginBottom: 20 }}>
          <a href="/" style={{ color: "rgba(255,255,255,.6)", textDecoration: "none" }}>ToolStack</a>
          <span>/</span>
          <a href="/tools" style={{ color: "rgba(255,255,255,.6)", textDecoration: "none" }}>Tools</a>
          <span>/</span>
          <span style={{ color: ACCENT }}>Card Flip ROI Calculator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {["Free Forever", "No Signup", "Real eBay Fees", "5 Platforms"].map(b => (
              <span key={b} style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: `rgba(${ACCENT_RGB},.12)`, border: `1px solid rgba(${ACCENT_RGB},.3)`, color: ACCENT }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Card Flip{" "}
            <span style={{ background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              ROI Calculator
            </span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.6)", margin: 0, lineHeight: 1.6, maxWidth: 560 }}>
            See your real profit after platform fees, shipping and costs — before you list. eBay&apos;s 13.25% trading card fee and 5 platforms built in.
          </p>
        </div>

        {/* Main calc */}
        <div style={card}>
          {/* Prices */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
            <div>
              <label style={label}>Buy price</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.45)", fontWeight: 700 }}>$</span>
                <input type="number" min="0" step="0.01" placeholder="0.00" value={buyPrice} onChange={e => setBuyPrice(e.target.value)}
                  style={{ ...input, paddingLeft: 28 }} />
              </div>
            </div>
            <div>
              <label style={label}>Expected sell price</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.45)", fontWeight: 700 }}>$</span>
                <input type="number" min="0" step="0.01" placeholder="0.00" value={sellPrice} onChange={e => setSellPrice(e.target.value)}
                  style={{ ...input, paddingLeft: 28 }} />
              </div>
            </div>
          </div>

          {/* Platform */}
          <div style={{ marginBottom: 20 }}>
            <label style={label}>Platform</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PLATFORMS.map(p => (
                <button key={p.id} onClick={() => setPlatform(p.id)}
                  style={pill(platform === p.id)}>
                  {p.icon} {p.name}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", margin: "8px 0 0" }}>
              {PLATFORMS.find(p => p.id === platform)?.notes}
            </p>
          </div>

          {/* Shipping */}
          <div style={{ marginBottom: 20 }}>
            <label style={label}>Shipping method</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SHIPPING_OPTIONS.map(s => (
                <button key={s.id} onClick={() => setShipping(s.id)}
                  style={pill(shipping === s.id)}>
                  {s.name} {s.cost > 0 ? `($${s.cost.toFixed(2)})` : "(Free)"}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", margin: "8px 0 0" }}>
              {SHIPPING_OPTIONS.find(s => s.id === shipping)?.note}
            </p>
          </div>

          {/* Advanced */}
          <div>
            <button onClick={() => setShowAdvanced(v => !v)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,.45)", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
              {showAdvanced ? "▾" : "▸"} {showAdvanced ? "Hide" : "Show"} additional costs (grading, supplies)
            </button>
            {showAdvanced && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 16 }}>
                <div>
                  <label style={label}>Grading cost</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.45)", fontWeight: 700 }}>$</span>
                    <input type="number" min="0" step="0.01" placeholder="0.00" value={gradingCost} onChange={e => setGradingCost(e.target.value)}
                      style={{ ...input, paddingLeft: 28 }} />
                  </div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)", margin: "6px 0 0" }}>PSA, BGS, SGC, CGC fee</p>
                </div>
                <div>
                  <label style={label}>Supplies cost</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.45)", fontWeight: 700 }}>$</span>
                    <input type="number" min="0" step="0.01" placeholder="0.00" value={suppliesCost} onChange={e => setSuppliesCost(e.target.value)}
                      style={{ ...input, paddingLeft: 28 }} />
                  </div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)", margin: "6px 0 0" }}>Sleeve, top loader, team bag</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {result && (
          <>
            {/* Main profit card */}
            <div style={{ background: result.profit > 0 ? "rgba(16,185,129,.1)" : result.profit < 0 ? "rgba(248,113,113,.1)" : "rgba(251,191,36,.1)", border: `1px solid ${result.profit > 0 ? "rgba(16,185,129,.3)" : result.profit < 0 ? "rgba(248,113,113,.3)" : "rgba(251,191,36,.3)"}`, borderRadius: 20, padding: "24px 28px", marginBottom: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.45)", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Net profit</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: profitColor, lineHeight: 1 }}>{fmt(result.profit)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.45)", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>ROI</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: profitColor, lineHeight: 1 }}>{result.roi.toFixed(1)}%</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.45)", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Break-even</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{fmt(result.breakEven)}</div>
                </div>
              </div>
            </div>

            {/* Fee breakdown */}
            <div style={card}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 800 }}>Full Breakdown</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { label: "Sale price", value: fmt(sell), dimmed: false },
                  { label: `Platform fee (${PLATFORMS.find(p=>p.id===platform)?.name})`, value: `−${fmt(result.platformFee)}`, dimmed: true },
                  { label: `Shipping (${SHIPPING_OPTIONS.find(s=>s.id===shipping)?.name})`, value: `−${fmt(result.shippingCost)}`, dimmed: true },
                  { label: "Net revenue", value: fmt(result.netRevenue), dimmed: false, bold: true },
                  null,
                  { label: "Buy price", value: `−${fmt(buy)}`, dimmed: true },
                  ...(grading > 0 ? [{ label: "Grading cost", value: `−${fmt(grading)}`, dimmed: true }] : []),
                  ...(supplies > 0 ? [{ label: "Supplies", value: `−${fmt(supplies)}`, dimmed: true }] : []),
                  { label: "Total cost", value: `−${fmt(result.totalCost)}`, dimmed: false, bold: true },
                  null,
                  { label: "Net profit", value: fmt(result.profit), dimmed: false, bold: true, highlight: true },
                  { label: "Effective fee rate", value: `${result.effectiveRate.toFixed(1)}%`, dimmed: true },
                ].map((row, i) => {
                  if (!row) return <div key={i} style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "8px 0" }} />;
                  return (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      <span style={{ fontSize: 13, color: row.dimmed ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.85)", fontWeight: row.bold ? 700 : 500 }}>{row.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: row.highlight ? profitColor : row.dimmed ? "rgba(255,255,255,.55)" : "#fff" }}>{row.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Platform comparison */}
            {allPlatformResults && (
              <div style={{ ...card, padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>Platform Comparison</h3>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,.4)" }}>Same card — same shipping — different platform</p>
                </div>
                {allPlatformResults
                  .sort((a, b) => b.profit - a.profit)
                  .map((p, i) => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", borderBottom: i < allPlatformResults.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none", background: p.id === platform ? "rgba(255,255,255,.04)" : "transparent" }}>
                      <span style={{ fontSize: 20, width: 28, flexShrink: 0 }}>{p.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>Fee: {fmt(p.platformFee)} · Rate: {(p.platformFee / sell * 100).toFixed(1)}%</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontWeight: 900, fontSize: 16, color: p.profit > 0 ? "#34d399" : p.profit < 0 ? "#f87171" : "#fbbf24" }}>{fmt(p.profit)}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{p.roi.toFixed(0)}% ROI</div>
                      </div>
                      {i === 0 && <div style={{ fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 999, background: "rgba(52,211,153,.15)", border: "1px solid rgba(52,211,153,.3)", color: "#34d399", flexShrink: 0 }}>BEST</div>}
                    </div>
                  ))}
              </div>
            )}
          </>
        )}

        {/* Empty state */}
        {!hasValues && (
          <div style={{ border: "1px dashed rgba(255,255,255,.1)", borderRadius: 20, padding: "40px 28px", textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📈</div>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, margin: 0 }}>Enter your buy price and expected sell price above to see your profit, ROI and break-even.</p>
          </div>
        )}

        {/* How it works */}
        <section style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 6px" }}>How to Calculate Your Card Flip ROI</h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, margin: "0 0 24px" }}>Four steps to know your real take-home before you list.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { n: "1", title: "Enter your costs", body: "Input what you paid for the card. Add grading costs (PSA, BGS etc.) and supplies if applicable. This is your total cost basis." },
              { n: "2", title: "Set your sell price", body: "Enter the price you expect to sell at. Use recent eBay sold listings (filter: Sold Items) to find the realistic market price." },
              { n: "3", title: "Pick your platform", body: "eBay charges 13.25% + $0.30 for trading cards. Whatnot charges ~10.8% + $0.30. Local sales have zero fees but a smaller buyer pool." },
              { n: "4", title: "Choose shipping", body: "BMWT (bubble mailer with top loader) at ~$3.50 is the standard for tracked card shipping. PWE at $0.73 works for low-value raw cards only." },
            ].map(s => (
              <div key={s.n} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: "20px 20px" }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: `rgba(${ACCENT_RGB},.15)`, border: `1px solid rgba(${ACCENT_RGB},.3)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: ACCENT, marginBottom: 12 }}>{s.n}</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 800 }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 16px" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { q: "What is the eBay fee for selling sports cards in 2026?", a: "eBay charges 13.25% of the total sale price (including shipping) plus $0.30 per order for trading cards in 2026. On a $100 sale, that is $13.55 in fees, leaving you with $86.45 before shipping costs and your buy price." },
              { q: "How do I calculate my ROI on a card flip?", a: "ROI = (Net profit ÷ Total cost) × 100. Net profit = sell price minus platform fees, shipping, buy price, grading and supplies. Example: buy $20, sell $50 on eBay ($6.93 fee + $3.50 BMWT) = $39.57 net revenue, $19.57 profit on $20 cost = 97.8% ROI." },
              { q: "What is the cheapest way to ship a sports card?", a: "A PWE (plain white envelope) with a stamp costs around $0.73 and works for low-value raw cards. For tracked shipments, a BMWT (bubble mailer with top loader) runs $3.50-$4.50. USPS padded flat rate envelopes at $8.95 are best for multiple cards or graded slabs." },
              { q: "Is Whatnot cheaper than eBay for selling cards?", a: "Whatnot charges 8% commission + 2.9% payment processing + $0.30, totalling approximately 10.8% + $0.30. eBay charges 13.25% + $0.30. Whatnot is cheaper on percentage fees for most sales, but eBay has a larger buyer pool which can drive higher final prices." },
              { q: "What is a good ROI on a card flip?", a: "A good card flip ROI is 30% or more after all fees. Professional flippers target 50-100% ROI on quick flips. Anything under 20% ROI is generally not worth the effort once you factor in your time. Graded card flips typically have lower ROI due to the fixed grading cost." },
              { q: "What does break-even mean for a card flip?", a: "Break-even is the minimum sell price where you make exactly $0 profit. It accounts for your buy price, platform fees, shipping and all costs. Selling above break-even is profit; below is a loss. Always calculate your break-even before listing." },
            ].map(({ q, a }) => (
              <details key={q} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: "14px 18px" }}>
                <summary style={{ fontWeight: 700, fontSize: 14, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{q}</h3>
                  <span style={{ color: ACCENT, fontSize: 18, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ margin: "12px 0 0", fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.65 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* SEO content */}
        <section style={{ marginTop: 64, padding: "32px 28px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 12px" }}>Why Most Card Flippers Underestimate Their Costs</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.75, margin: "0 0 14px" }}>
            The most common mistake in card flipping is calculating profit as &quot;sell price minus buy price.&quot; That number is fiction. eBay takes 13.25% + $0.30 from every trading card sale. A card you sell for $50 nets you $43.25 before shipping. Add $3.50 for a tracked BMWT shipment and your net revenue is $39.75 — not $50.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.75, margin: "0 0 14px" }}>
            For graded cards, the numbers get more complex. A $25 PSA grading fee is a fixed cost that only makes financial sense on cards worth $200 or more. On a $100 raw card graded at PSA Value tier, your total cost is $125 before platform fees and shipping. You need the graded card to sell above $148 just to break even.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.75, margin: 0 }}>
            Platform choice matters more than most sellers realise. Whatnot&apos;s lower fee rate (10.8% vs eBay&apos;s 13.25%) can mean an extra $5–$20 per card on higher-value flips. Local cash sales eliminate all fees but introduce liquidity risk — you need a buyer in your area willing to pay market price. The right platform depends on your card&apos;s value and your need for speed.
          </p>
        </section>

        <div style={{ marginTop: 48 }}>
          <MoreTools currentSlug="card-flip-roi-calculator" />
        </div>
        <AdvertiseGPTBanner />
      </div>
    </div>
  );
}
