"use client";
import { useState } from "react";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const FAQS = [
  { q: "What is the best card grading company in 2026?", a: "PSA is the best for sports cards if maximising resale value is your priority \u2014 they hold 67% market share and command 10-30% higher prices. For Pok\u00e9mon and TCG cards, CGC is the specialist choice. For budget submissions or vintage cards, SGC at $15-$18 per card offers the best value." },
  { q: "Is PSA or BGS better?", a: "PSA is better for resale liquidity and standard sports cards. BGS (Beckett) is better if you want subgrades \u2014 detailed scores for centering, corners, edges and surface. A BGS Black Label 10 (perfect subgrades) can be worth significantly more than a PSA 10 for the same card." },
  { q: "How long does PSA grading take in 2026?", a: "PSA turnaround times in 2026 range from 5 days (Super Express at $299.99) to 95 days (Value Bulk at $24.99, Collectors Club members only). The standard Value tier costs $32.99 with a 45-day turnaround." },
  { q: "Is SGC cheaper than PSA?", a: "Yes. SGC is significantly cheaper than PSA. SGC Economy starts at $15 per card vs PSA Value Bulk at $24.99. SGC is 47-52% cheaper per card on comparable tiers. However, PSA-graded cards typically sell for 10-30% more, so the extra cost may be worth it for valuable cards." },
  { q: "Should I use CGC for Pok\u00e9mon cards?", a: "Yes. CGC is the leading grading service for Pok\u00e9mon and other TCG cards (Yu-Gi-Oh, Magic: The Gathering). The Pok\u00e9mon collecting community specifically seeks CGC-graded cards, and CGC" },
  { q: "What does BGS Black Label mean?", a: "BGS Black Label is awarded to cards that receive a 10 on all four subgrades (centering, corners, edges and surface). It is the rarest and most desirable grade in the hobby, often commanding 200-500% more than a standard BGS 10 or PSA 10 for the same card." }
];


const ACCENT = "#f59e0b";
const ACCENT_RGB = "245,158,11";

const GRADERS = [
  {
    id: "psa",
    name: "PSA",
    full: "Professional Sports Authenticator",
    logo: "PSA",
    color: "#3b82f6",
    colorRgb: "59,130,246",
    founded: 1991,
    marketShare: 67,
    scale: "1–10 (whole numbers)",
    subgrades: false,
    specialty: "Sports cards, high-value cards",
    slabStyle: "Standard case",
    tiers: [
      { name: "Value Bulk", price: 24.99, days: 95, note: "Collectors Club only" },
      { name: "Value", price: 32.99, days: 45, note: "" },
      { name: "Regular", price: 79.99, days: 25, note: "" },
      { name: "Express", price: 149.99, days: 10, note: "" },
      { name: "Super Express", price: 299.99, days: 5, note: "" },
    ],
    resalePremium: "+10–30%",
    resaleNote: "Highest resale value. PSA 10 commands the biggest premiums.",
    bestFor: ["High-value sports cards", "Maximum resale value", "Mainstream collector cards"],
    notBestFor: ["Budget submissions", "TCG/Pokémon", "Vintage cards"],
    pros: ["Largest market share (67%)", "Highest resale premiums", "Most liquid — easiest to sell", "Widely accepted by all buyers"],
    cons: ["Most expensive entry tier", "Slowest standard turnaround", "Whole numbers only (no 9.5)"],
  },
  {
    id: "bgs",
    name: "BGS",
    full: "Beckett Grading Services",
    logo: "BGS",
    color: "#8b5cf6",
    colorRgb: "139,92,246",
    founded: 1999,
    marketShare: 20,
    scale: "1–10 (half-point increments)",
    subgrades: true,
    specialty: "Premium cards, subgrade collectors",
    slabStyle: "Black label for perfect 10",
    tiers: [
      { name: "Economy", price: 19, days: 90, note: "No subgrades" },
      { name: "Standard", price: 24.95, days: 45, note: "Subgrades included" },
      { name: "Express", price: 49.95, days: 15, note: "Subgrades included" },
      { name: "Premium", price: 124.95, days: 5, note: "Subgrades included" },
    ],
    resalePremium: "+5–15% (BGS 10 Black Label +200–500%)",
    resaleNote: "BGS 10 Black Label (perfect subgrades) commands massive premiums.",
    bestFor: ["High-end premium collectors", "Cards where centering matters", "BGS Black Label hunters"],
    notBestFor: ["Quick flips", "Budget grading", "First-time submitters"],
    pros: ["Subgrades (centering, corners, edges, surface)", "Half-point scale (9.5 grade exists)", "Black Label 10 = grail status", "Detailed grade breakdown"],
    cons: ["Less liquid than PSA", "Higher prices at Express/Premium tier", "Slower to sell BGS vs PSA"],
  },
  {
    id: "sgc",
    name: "SGC",
    full: "Sportscard Guaranty Corporation",
    logo: "SGC",
    color: "#10b981",
    colorRgb: "16,185,129",
    founded: 1998,
    marketShare: 10,
    scale: "1–10 (whole numbers)",
    subgrades: false,
    specialty: "Vintage cards, budget submissions",
    slabStyle: "Tuxedo slab (black/white)",
    tiers: [
      { name: "Economy", price: 15, days: 90, note: "" },
      { name: "Standard", price: 18, days: 45, note: "" },
      { name: "Express", price: 30, days: 10, note: "" },
    ],
    resalePremium: "+0–10%",
    resaleNote: "Growing acceptance. Best value-to-cost ratio for mid-range cards.",
    bestFor: ["Budget submissions", "Vintage cards (pre-1980)", "Quick turnaround on a budget"],
    notBestFor: ["Maximum resale value", "Pokémon/TCG", "High-value modern cards"],
    pros: ["Cheapest entry tier ($15)", "Fastest standard turnaround", "Vintage card specialist", "Iconic tuxedo slab design"],
    cons: ["Lower market share = less liquid", "Fewer buyers recognise SGC vs PSA", "No subgrades"],
  },
  {
    id: "cgc",
    name: "CGC",
    full: "Certified Guaranty Company",
    logo: "CGC",
    color: "#f97316",
    colorRgb: "249,115,22",
    founded: 2000,
    marketShare: 8,
    scale: "1–10 (half-point increments)",
    subgrades: false,
    specialty: "Pokémon, Yu-Gi-Oh, MTG, TCG cards",
    slabStyle: "Clear case with colour label",
    tiers: [
      { name: "Bulk", price: 15, days: 120, note: "120 business days" },
      { name: "Economy", price: 18, days: 45, note: "45 business days" },
      { name: "Standard", price: 55, days: 20, note: "20 business days" },
      { name: "Express", price: 100, days: 5, note: "5 business days" },
    ],
    resalePremium: "+5–20% (TCG)",
    resaleNote: "Best-in-class for Pokémon and TCG. Growing fast in 2026.",
    bestFor: ["Pokémon cards", "Yu-Gi-Oh cards", "Magic: The Gathering", "Any TCG card"],
    notBestFor: ["Vintage sports cards", "When PSA resale premium matters", "Quick submissions on budget"],
    pros: ["Best reputation for Pokémon/TCG", "Competitive bulk pricing", "Half-point scale", "Growing market acceptance for TCG"],
    cons: ["Bulk tier is very slow (120 business days)", "Standard tier ($55) expensive", "Less established for sports cards"],
  },
];

type CardType = "sports" | "pokemon" | "vintage" | "other";
type Priority = "cost" | "speed" | "resale" | "balance";
type CardValue = "under50" | "50to200" | "200to500" | "500to2000" | "over2000";

function getRecommendation(cardType: CardType, priority: Priority, cardValue: CardValue) {
  if (cardType === "pokemon") {
    return {
      grader: "cgc",
      tier: priority === "cost" ? "Bulk" : priority === "speed" ? "Express" : "Economy",
      reason: "CGC is the #1 choice for Pokémon and TCG cards. Buyers specifically seek CGC-graded Pokémon cards and premiums are strong.",
    };
  }
  if (cardType === "vintage") {
    return {
      grader: "sgc",
      tier: priority === "cost" ? "Economy" : priority === "speed" ? "Express" : "Standard",
      reason: "SGC is the vintage card specialist. Their tuxedo slab is iconic for pre-1980 cards and their graders have deep vintage expertise.",
    };
  }
  if (priority === "resale" || cardValue === "over2000" || cardValue === "500to2000") {
    return {
      grader: "psa",
      tier: priority === "speed" ? "Express" : cardValue === "over2000" ? "Regular" : "Value",
      reason: "For high-value cards or maximum resale, PSA commands 10–30% higher prices. The fee pays for itself on cards over $200.",
    };
  }
  if (priority === "cost" || cardValue === "under50") {
    return {
      grader: "sgc",
      tier: "Economy",
      reason: "SGC at $15 is the best entry option. For cards under $50, keeping grading costs low is critical to positive ROI.",
    };
  }
  if (priority === "speed") {
    return {
      grader: "sgc",
      tier: "Express",
      reason: "SGC Express at $30 gives you a 10-day turnaround — the fastest affordable option in the industry.",
    };
  }
  return {
    grader: "psa",
    tier: "Value",
    reason: "PSA Value tier gives you the best balance of cost, market liquidity and resale premium for mainstream sports cards.",
  };
}

export default function GradingComparisonPage() {
  const [activeTab, setActiveTab] = useState<"compare" | "fees" | "recommend">("recommend");
  const [cardType, setCardType] = useState<CardType>("sports");
  const [priority, setPriority] = useState<Priority>("balance");
  const [cardValue, setCardValue] = useState<CardValue>("50to200");
  const [selectedGrader, setSelectedGrader] = useState<string | null>(null);

  const rec = getRecommendation(cardType, priority, cardValue);
  const recGrader = GRADERS.find(g => g.id === rec.grader)!;
  const recTier = recGrader.tiers.find(t => t.name === rec.tier) ?? recGrader.tiers[0];

  const detailGrader = selectedGrader ? GRADERS.find(g => g.id === selectedGrader) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "PSA vs BGS vs SGC vs CGC Grading Comparison Tool",
        description: "Free interactive tool comparing PSA, BGS, SGC and CGC card grading companies on fees, turnaround times, resale value and best use cases.",
        url: "https://toolstack.tech/tools/grading-company-comparison",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "PSA vs BGS vs SGC vs CGC side-by-side comparison",
          "Personalised grader recommendation engine",
          "Full fee breakdown for all tiers",
          "Turnaround time comparison",
          "Resale value and market share data",
          "Best-for guide by card type",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ToolStack", item: "https://toolstack.tech" },
          { "@type": "ListItem", position: 2, name: "Collectibles", item: "https://toolstack.tech/tools?category=collectibles" },
          { "@type": "ListItem", position: 3, name: "Grading Company Comparison", item: "https://toolstack.tech/tools/grading-company-comparison" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the best card grading company in 2026?", acceptedAnswer: { "@type": "Answer", text: "PSA is the best for sports cards if maximising resale value is your priority — they hold 67% market share and command 10-30% higher prices. For Pokémon and TCG cards, CGC is the specialist choice. For budget submissions or vintage cards, SGC at $15-$18 per card offers the best value." } },
          { "@type": "Question", name: "Is PSA or BGS better?", acceptedAnswer: { "@type": "Answer", text: "PSA is better for resale liquidity and standard sports cards. BGS (Beckett) is better if you want subgrades — detailed scores for centering, corners, edges and surface. A BGS Black Label 10 (perfect subgrades) can be worth significantly more than a PSA 10 for the same card." } },
          { "@type": "Question", name: "How long does PSA grading take in 2026?", acceptedAnswer: { "@type": "Answer", text: "PSA turnaround times in 2026 range from 5 days (Super Express at $299.99) to 95 days (Value Bulk at $24.99, Collectors Club members only). The standard Value tier costs $32.99 with a 45-day turnaround." } },
          { "@type": "Question", name: "Is SGC cheaper than PSA?", acceptedAnswer: { "@type": "Answer", text: "Yes. SGC is significantly cheaper than PSA. SGC Economy starts at $15 per card vs PSA Value Bulk at $24.99. SGC is 47-52% cheaper per card on comparable tiers. However, PSA-graded cards typically sell for 10-30% more, so the extra cost may be worth it for valuable cards." } },
          { "@type": "Question", name: "Should I use CGC for Pokémon cards?", acceptedAnswer: { "@type": "Answer", text: "Yes. CGC is the leading grading service for Pokémon and other TCG cards (Yu-Gi-Oh, Magic: The Gathering). The Pokémon collecting community specifically seeks CGC-graded cards, and CGC's half-point scale (e.g. 9.5) adds nuance that Pokémon collectors value." } },
          { "@type": "Question", name: "What does BGS Black Label mean?", acceptedAnswer: { "@type": "Answer", text: "BGS Black Label is awarded to cards that receive a 10 on all four subgrades (centering, corners, edges and surface). It is the rarest and most desirable grade in the hobby, often commanding 200-500% more than a standard BGS 10 or PSA 10 for the same card." } },
        ],
      },
    ],
  };

  const wrap: React.CSSProperties = {
    background: "#080810",
    minHeight: "100vh",
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#fff",
  };
  const glow: React.CSSProperties = {
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    background: `radial-gradient(900px 600px at 15% 10%, rgba(${ACCENT_RGB},.08), transparent 60%), radial-gradient(900px 600px at 85% 85%, rgba(99,102,241,.08), transparent 60%)`,
  };
  const content: React.CSSProperties = {
    position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px",
  };
  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 20, padding: "24px 28px", marginBottom: 16,
  };
  const badge = (color: string): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase",
    background: `rgba(${color},.12)`, border: `1px solid rgba(${color},.3)`,
    color: `rgb(${color})`,
  });

  return (
    <div style={wrap}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        .gcg-tab { border: none; cursor: pointer; font-family: inherit; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 10px; transition: all .18s; }
        .gcg-tab.active { background: rgba(${ACCENT_RGB},.18); border: 1px solid rgba(${ACCENT_RGB},.4); color: rgb(${ACCENT_RGB}); }
        .gcg-tab.inactive { background: transparent; border: 1px solid rgba(255,255,255,.07); color: rgba(255,255,255,.5); }
        .gcg-tab.inactive:hover { border-color: rgba(255,255,255,.18); color: rgba(255,255,255,.75); }
        .gcg-grader-btn { border: 2px solid transparent; cursor: pointer; font-family: inherit; border-radius: 16px; transition: all .18s; text-align: left; }
        .gcg-grader-btn:hover { transform: translateY(-2px); }
        .gcg-pill { border: none; cursor: pointer; font-family: inherit; font-size: 12px; font-weight: 600; padding: 7px 14px; border-radius: 999px; transition: all .15s; }
        .gcg-pill.active { background: rgba(${ACCENT_RGB},.2); border: 1px solid rgba(${ACCENT_RGB},.45); color: rgb(${ACCENT_RGB}); }
        .gcg-pill.inactive { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09); color: rgba(255,255,255,.5); }
        .gcg-pill.inactive:hover { border-color: rgba(255,255,255,.2); color: rgba(255,255,255,.75); }
        .gcg-row { display: grid; gap: 0; border-bottom: 1px solid rgba(255,255,255,.06); }
        .gcg-row:last-child { border-bottom: none; }
        details summary { cursor: pointer; list-style: none; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>
      <div style={glow} />

      <div style={content}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,.38)", marginBottom: 20 }}>
          <a href="/" style={{ color: "rgba(255,255,255,.6)", textDecoration: "none" }}>ToolStack</a>
          <span>/</span>
          <a href="/tools/category/collectibles" style={{ color: "rgba(255,255,255,.6)", textDecoration: "none" }}>Collectibles</a>
          <span>/</span>
          <span style={{ color: ACCENT }}>Grading Company Comparison</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {["Free Forever", "No Signup", "Updated 2026", "All 4 Graders"].map(b => (
              <span key={b} style={badge(ACCENT_RGB)}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            PSA vs BGS vs SGC vs CGC{" "}
            <span style={{ background: `linear-gradient(135deg, ${ACCENT}, #f97316)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              2026 Comparison
            </span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.6)", margin: 0, lineHeight: 1.6, maxWidth: 580 }}>
            Compare all four major card grading companies on fees, turnaround times and resale value. Get a personalised recommendation in seconds.
          </p>
        </div>

        {/* Tab nav */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { id: "recommend", label: "🎯 Find My Grader" },
            { id: "compare", label: "⚖️ Side-by-Side" },
            { id: "fees", label: "💰 Full Fee Tables" },
          ].map(t => (
            <button key={t.id} className={`gcg-tab ${activeTab === t.id ? "active" : "inactive"}`}
              onClick={() => setActiveTab(t.id as typeof activeTab)}>{t.label}</button>
          ))}
        </div>

        {/* ─── RECOMMEND TAB ─── */}
        {activeTab === "recommend" && (
          <div>
            <div style={card}>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px" }}>Find Your Grader</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", margin: "0 0 24px" }}>Answer 3 questions — get an instant recommendation.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.55)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 10px" }}>What type of card?</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {([["sports","⚾ Sports Card"],["pokemon","🃏 Pokémon / TCG"],["vintage","🏛️ Vintage (pre-1980)"],["other","📋 Other"]] as [CardType,string][]).map(([v,l]) => (
                      <button key={v} className={`gcg-pill ${cardType === v ? "active" : "inactive"}`} onClick={() => setCardType(v)}>{l}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.55)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 10px" }}>Estimated raw card value?</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {([["under50","Under $50"],["50to200","$50–$200"],["200to500","$200–$500"],["500to2000","$500–$2K"],["over2000","$2K+"]] as [CardValue,string][]).map(([v,l]) => (
                      <button key={v} className={`gcg-pill ${cardValue === v ? "active" : "inactive"}`} onClick={() => setCardValue(v)}>{l}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.55)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 10px" }}>Your priority?</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {([["cost","💸 Lowest Cost"],["speed","⚡ Fastest Turnaround"],["resale","📈 Maximum Resale"],["balance","⚖️ Best Balance"]] as [Priority,string][]).map(([v,l]) => (
                      <button key={v} className={`gcg-pill ${priority === v ? "active" : "inactive"}`} onClick={() => setPriority(v)}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation result */}
            <div style={{ background: `linear-gradient(135deg, rgba(${recGrader.colorRgb},.12), rgba(${recGrader.colorRgb},.06))`, border: `1px solid rgba(${recGrader.colorRgb},.3)`, borderRadius: 20, padding: "24px 28px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `rgba(${recGrader.colorRgb},.2)`, border: `1px solid rgba(${recGrader.colorRgb},.4)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: `rgb(${recGrader.colorRgb})`, flexShrink: 0 }}>{recGrader.logo}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 2 }}>Our recommendation</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{recGrader.name} — {recTier.name} Tier</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "Cost per card", value: `$${recTier.price.toFixed(2)}` },
                  { label: "Est. turnaround", value: `~${recTier.days} days` },
                  { label: "Resale premium", value: recGrader.resalePremium },
                  { label: "Market share", value: `${recGrader.marketShare}%` },
                ].map(s => (
                  <div key={s.label} style={{ background: "rgba(255,255,255,.05)", borderRadius: 12, padding: "12px 16px" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.7)", margin: 0, lineHeight: 1.6 }}>{rec.reason}</p>
              {recTier.note && <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", margin: "8px 0 0" }}>Note: {recTier.note}</p>}
            </div>

            {/* Why not the others */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              {GRADERS.filter(g => g.id !== rec.grader).map(g => (
                <div key={g.id} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: "16px 18px" }}>
                  <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6, color: `rgb(${g.colorRgb})` }}>{g.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", lineHeight: 1.55 }}>
                    From ${g.tiers[0].price} · {g.tiers[0].days}d turnaround
                    <br />Best for: {g.bestFor[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── COMPARE TAB ─── */}
        {activeTab === "compare" && (
          <div>
            {/* Grader cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12, marginBottom: 20 }}>
              {GRADERS.map(g => (
                <button key={g.id} className="gcg-grader-btn"
                  onClick={() => setSelectedGrader(selectedGrader === g.id ? null : g.id)}
                  style={{ background: selectedGrader === g.id ? `rgba(${g.colorRgb},.14)` : "rgba(255,255,255,.03)", borderColor: selectedGrader === g.id ? `rgba(${g.colorRgb},.5)` : "rgba(255,255,255,.08)", padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(${g.colorRgb},.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: `rgb(${g.colorRgb})`, flexShrink: 0 }}>{g.logo}</div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: 900, fontSize: 16, color: "#fff" }}>{g.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>Est. {g.founded}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>From</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: `rgb(${g.colorRgb})` }}>${g.tiers[0].price}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,.06)", overflow: "hidden", marginBottom: 8 }}>
                    <div style={{ height: "100%", width: `${g.marketShare}%`, background: `rgb(${g.colorRgb})`, borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{g.marketShare}% market share</div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            {detailGrader && (
              <div style={{ background: `rgba(${detailGrader.colorRgb},.08)`, border: `1px solid rgba(${detailGrader.colorRgb},.25)`, borderRadius: 20, padding: "24px 28px", marginBottom: 20 }}>
                <h3 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 900 }}>{detailGrader.name} — {detailGrader.full}</h3>
                <p style={{ margin: "0 0 20px", fontSize: 13, color: "rgba(255,255,255,.5)" }}>{detailGrader.specialty}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Best for</div>
                    {detailGrader.bestFor.map(b => <div key={b} style={{ fontSize: 13, color: "rgba(255,255,255,.75)", marginBottom: 4, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: `rgb(${detailGrader.colorRgb})` }}>✓</span>{b}
                    </div>)}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Pros</div>
                    {detailGrader.pros.map(p => <div key={p} style={{ fontSize: 13, color: "rgba(255,255,255,.75)", marginBottom: 4 }}>+ {p}</div>)}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Cons</div>
                    {detailGrader.cons.map(c => <div key={c} style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginBottom: 4 }}>− {c}</div>)}
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 12, padding: "14px 18px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Resale value</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: `rgb(${detailGrader.colorRgb})`, marginBottom: 4 }}>{detailGrader.resalePremium}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>{detailGrader.resaleNote}</div>
                </div>
              </div>
            )}

            {/* Quick comparison table */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>Quick Comparison</h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,.03)" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", color: "rgba(255,255,255,.45)", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>Feature</th>
                      {GRADERS.map(g => <th key={g.id} style={{ padding: "12px 16px", textAlign: "center", color: `rgb(${g.colorRgb})`, fontWeight: 800, fontSize: 13 }}>{g.name}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Entry price", vals: GRADERS.map(g => `$${g.tiers[0].price}`) },
                      { label: "Fastest tier", vals: GRADERS.map(g => `$${g.tiers[g.tiers.length-1].price}`) },
                      { label: "Fastest turnaround", vals: GRADERS.map(g => `${g.tiers[g.tiers.length-1].days} days`) },
                      { label: "Grade scale", vals: GRADERS.map(g => g.scale) },
                      { label: "Subgrades", vals: GRADERS.map(g => g.subgrades ? "✅ Yes" : "❌ No") },
                      { label: "Market share", vals: GRADERS.map(g => `${g.marketShare}%`) },
                      { label: "Resale premium", vals: GRADERS.map(g => g.resalePremium) },
                      { label: "Best for", vals: GRADERS.map(g => g.bestFor[0]) },
                    ].map((row, i) => (
                      <tr key={row.label} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.02)", borderTop: "1px solid rgba(255,255,255,.05)" }}>
                        <td style={{ padding: "12px 16px", color: "rgba(255,255,255,.6)", fontWeight: 600 }}>{row.label}</td>
                        {row.vals.map((v, j) => <td key={j} style={{ padding: "12px 16px", textAlign: "center", color: v.startsWith("✅") ? "#34d399" : v.startsWith("❌") ? "#f87171" : "rgba(255,255,255,.8)", fontWeight: 600 }}>{v}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── FEES TAB ─── */}
        {activeTab === "fees" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {GRADERS.map(g => (
              <div key={g.id} style={{ background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 20, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 24px", background: `rgba(${g.colorRgb},.08)`, borderBottom: "1px solid rgba(255,255,255,.08)", flexWrap: "wrap" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${g.colorRgb},.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: `rgb(${g.colorRgb})`, flexShrink: 0 }}>{g.logo}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 17, color: "#fff" }}>{g.name} — {g.full}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.45)" }}>Scale: {g.scale} · {g.subgrades ? "Subgrades included" : "No subgrades"}</div>
                  </div>
                </div>
                <div>
                  {g.tiers.map((t, i) => (
                    <div key={t.name} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px auto", alignItems: "center", padding: "14px 24px", borderBottom: i < g.tiers.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none", gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{t.name}</div>
                        {t.note && <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{t.note}</div>}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: `rgb(${g.colorRgb})` }}>${t.price.toFixed(2)}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>per card</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.75)" }}>~{t.days}d</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>turnaround</div>
                      </div>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.days <= 10 ? "#34d399" : t.days <= 45 ? ACCENT : "rgba(255,255,255,.2)", flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)", margin: "4px 0 0", textAlign: "center" }}>
              Fees current as of 2026. All fees are charged in USD by PSA, BGS, SGC and CGC regardless of your location — UK, EU and international collectors will be billed in USD. Always verify current rates on the grading company&apos;s official website before submitting.
            </p>
          </div>
        )}

        {/* How it works */}
        <section style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 6px" }}>How to Choose the Right Grading Company</h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, margin: "0 0 24px" }}>Four questions to answer before you submit anything.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { n: "1", title: "What type of card is it?", body: "Pokémon and TCG collectors seek CGC. Sports card buyers prefer PSA. Vintage specialists often buy SGC. Match your grader to where you plan to sell." },
              { n: "2", title: "What is the raw card worth?", body: "Grading costs must make financial sense. PSA at $80 only justifies itself on a card worth $300+. SGC at $15 works for sub-$100 cards." },
              { n: "3", title: "How fast do you need it?", body: "Turnaround time is a hidden cost. SGC Standard is ~45 days vs PSA Regular at ~25 days. For hype cards, speed can be worth the premium." },
              { n: "4", title: "Do you want subgrades?", body: "BGS is the only major grader with subgrades (centering, corners, edges, surface). A BGS Black Label 10 can be worth 3-5x a standard PSA 10." },
            ].map(s => (
              <div key={s.n} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: "20px 20px" }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: `rgba(${ACCENT_RGB},.15)`, border: `1px solid rgba(${ACCENT_RGB},.3)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: ACCENT, marginBottom: 12 }}>{s.n}</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 800 }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>


        <FaqPageSchema faqs={FAQS} />

        {/* FAQ */}
        <section style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 16px" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { q: "What is the best card grading company in 2026?", a: "PSA is the best for maximising resale value on sports cards — they hold 67% market share. For Pokémon and TCG cards, CGC is the specialist. For budget submissions or vintage cards, SGC offers the best value at $15–$18 per card." },
              { q: "Is PSA or BGS better?", a: "PSA is better for resale liquidity and mainstream sports cards. BGS (Beckett) is better if you want subgrades — detailed scores for centering, corners, edges and surface. A BGS Black Label 10 (perfect subgrades) can be worth significantly more than a PSA 10 for the same card." },
              { q: "How long does PSA grading take in 2026?", a: "PSA turnaround times in 2026 range from 5 days (Super Express, $299.99) to 95 days (Value Bulk, $24.99 — Collectors Club only). The Value tier costs $32.99 with a 45-day turnaround and is the most popular option." },
              { q: "Is SGC cheaper than PSA?", a: "Yes. SGC Economy starts at $15 per card vs PSA Value Bulk at $24.99. SGC is 47–52% cheaper on comparable tiers. However, PSA-graded cards typically sell for 10–30% more, so the extra cost can pay off on valuable cards." },
              { q: "Should I use CGC for Pokémon cards?", a: "Yes. CGC is the leading choice for Pokémon and TCG cards. The Pokémon community specifically seeks CGC-graded cards, premiums are strong, and CGC&apos;s half-point scale (e.g. 9.5) adds nuance that Pokémon collectors value." },
              { q: "What does BGS Black Label mean?", a: "BGS Black Label is awarded when a card receives a 10 on all four subgrades (centering, corners, edges and surface). It is the rarest and most desirable grade in the hobby, often commanding 200–500% more than a standard PSA 10 for the same card." },
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
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 12px" }}>PSA vs BGS vs SGC vs CGC: The Complete 2026 Guide</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.75, margin: "0 0 14px" }}>
            The card grading industry has transformed since 2020. PSA remains the dominant force with 67% market share, but competition has intensified. Collectors Holdings now owns both PSA and SGC and has a pending deal for BGS — meaning one company could soon control 80% of grading volume. CGC has emerged as the clear leader for Pokémon and TCG cards, filling a gap that PSA never fully owned.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.75, margin: "0 0 14px" }}>
            The practical decision comes down to three variables: where you plan to sell, what the card is worth raw, and how fast you need it back. A PSA 10 still commands the highest prices on eBay for sports cards, but SGC at $15 per card makes financial sense for anything under $100. BGS subgrades are a niche play — valuable for pristine premium cards where centering and corner quality justify the extra scrutiny.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.75, margin: 0 }}>
            For Pokémon collectors, CGC is now the standard. eBay search data confirms buyers filter specifically for CGC on Pokémon singles, and CGC&apos;s half-point scale (9, 9.5, 10) is preferred by TCG collectors over PSA&apos;s whole-number system. The Bulk tier at $15 per card with 120 business day turnaround is slow, but Economy at $18 with 45-day turnaround is competitive for non-urgent submissions.
          </p>
        </section>

        <div style={{ marginTop: 48 }}>
          {/* SEO Description */}
          <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Grading Company Comparison: Free Online Tool</h2>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>
                Choosing a grading company is one of the most consequential decisions in card investing — PSA, BGS, SGC, and CGC each have different fee structures, turnaround times, grading standards, and market reputations. A 9.5 in BGS doesn't mean the same thing as a 9.5 in PSA. Our Grading Company Comparison tool puts all four major graders side by side so you can make the most profitable decision.
              </p>
              <p style={{ marginBottom: 16 }}>
                Enter your card's estimated raw value and the grade you're targeting. Select all four grading companies and the service level you want. The tool compares submission fees, estimated turnaround time, the resale premium for the target grade vs. raw, and calculates your net profit and ROI for each company.
              </p>
              <p style={{ marginBottom: 16 }}>
                Common uses include deciding between PSA and BGS for a vintage sports card submission, comparing economy vs. regular vs. express submission economics, understanding the resale premium difference between PSA 10 and BGS 9.5 for a specific card, and planning bulk submissions across multiple cards of mixed value.
              </p>
              <p style={{ marginBottom: 0 }}>
                Most graders' websites show their own fees in isolation. This tool shows them all together with your specific card's economics factored in — so you're comparing the actual ROI of each submission, not just the fee. Free, always current with latest fee schedules, no signup required.
              </p>
            </div>
          </section>

          <MoreTools currentSlug="grading-company-comparison" />
        </div>
      </div>
    </div>
  );
}
