"use client";
export const dynamic = "force-static";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

// Official pull rates per pack (from in-game offering rates disclosure)
const RARITIES = [
  { id: "ex",        label: "◆◆◆◆ Double Rare (ex)",  rate: 0.0500,  color: "#3b82f6", bg: "#1e3a5f", symbol: "◆◆◆◆" },
  { id: "art",       label: "☆ Art Rare",              rate: 0.02572, color: "#a855f7", bg: "#3b1f5e", symbol: "☆"    },
  { id: "super",     label: "☆☆ Super Rare",           rate: 0.0050,  color: "#ec4899", bg: "#5b1a3a", symbol: "☆☆"   },
  { id: "immersive", label: "☆☆☆ Immersive Rare",      rate: 0.00222, color: "#f59e0b", bg: "#5c3a0d", symbol: "☆☆☆"  },
  { id: "crown",     label: "♛ Crown Rare",            rate: 0.00040, color: "#fbbf24", bg: "#5c4500", symbol: "♛"    },
  { id: "godpack",   label: "✦ Rare Pack (God Pack)",  rate: 0.00050, color: "#22c55e", bg: "#14462b", symbol: "✦"    },
];

const FAQS = [
  {
    q: "What are the official pull rates in Pokémon TCG Pocket?",
    a: "Per pack: Double Rare (ex) 5.00%, Art Rare 2.572%, Super Rare 0.500%, Immersive Rare 0.222%, Crown Rare 0.040%, Rare Pack (God Pack) 0.050%. These rates are disclosed in-game via the 'Offering Rates' button on the pack selection screen.",
  },
  {
    q: "How many packs does it take to get a Crown Rare?",
    a: "On average, it takes 2,500 packs to pull one Crown Rare (1 ÷ 0.04% = 2,500). To have a 50% chance, you need approximately 1,733 packs. To have a 90% chance, you need approximately 5,756 packs. Crown Rares are the rarest cards in a standard pull — rarer even than God Packs.",
  },
  {
    q: "What is a God Pack (Rare Pack) in Pokémon TCG Pocket?",
    a: "A Rare Pack, commonly called a God Pack, is a special pack where all 5 cards are rarity ☆ or higher. The odds are approximately 1 in 2,000 packs (0.05%). Inside a God Pack, each card has roughly a 5% chance of being a Crown Rare, with the rest being Art Rares, Super Rares, or Immersive Rares.",
  },
  {
    q: "What are the odds of pulling an Immersive Rare?",
    a: "Immersive Rares have a 0.222% pull rate per pack. On average you need 450 packs to get one. To have a 50% chance, you need around 312 packs. These are the stunning full-art animated cards — rarer than Crown Rares by pack count, though Crown Rares are harder to get for a specific card.",
  },
  {
    q: "How do I calculate the odds for a specific card?",
    a: "Divide the rarity pull rate by the total number of cards at that rarity in the set. For example, if there are 10 Crown Rares in a set and the pull rate is 0.04% per pack, your odds of pulling one specific Crown Rare is 0.004% per pack — meaning ~25,000 packs on average for a single target card.",
  },
  {
    q: "Does Pokémon TCG Pocket have a pity system?",
    a: "Yes. The game guarantees a 4◆ or higher card at least once every 10 packs from a specific set. This pity counter resets when you pull a 4◆ or higher. This makes ex cards more accessible than the raw 5% rate suggests, but does not affect rates for Crown Rares, Immersive Rares, or God Packs.",
  },
];

function pAtLeastOne(rate: number, packs: number): number {
  return 1 - Math.pow(1 - rate, packs);
}

function packsForProbability(rate: number, prob: number): number {
  if (prob <= 0) return 0;
  if (prob >= 1) return Infinity;
  return Math.log(1 - prob) / Math.log(1 - rate);
}

function pct(n: number): string {
  if (n >= 0.9995) return "99.9%+";
  return (n * 100).toFixed(n < 0.001 ? 4 : n < 0.01 ? 3 : n < 0.1 ? 2 : 1) + "%";
}

function fmtPacks(n: number): string {
  if (!isFinite(n)) return "∞";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return Math.round(n).toLocaleString();
  return Math.round(n).toString();
}

const TAB_STYLE = (active: boolean) => ({
  padding: "8px 18px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
  transition: "all 0.15s",
  background: active ? "#6366f1" : "rgba(255,255,255,0.06)",
  color: active ? "#fff" : "rgba(255,255,255,0.55)",
});

const card = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  padding: "20px 24px",
  marginBottom: 16,
};

export default function PokemonTCGPocketPullCalculator() {
  const [tab, setTab] = useState<"odds" | "packs" | "specific">("odds");

  // Tab 1: I've opened X packs
  const [packsOpened, setPacksOpened] = useState(100);

  // Tab 2: Packs needed for target probability
  const [targetProb, setTargetProb] = useState(50);

  // Tab 3: Specific card
  const [specificRarity, setSpecificRarity] = useState("crown");
  const [cardsAtRarity, setCardsAtRarity] = useState(10);
  const [specificPacks, setSpecificPacks] = useState(500);

  const oddsResults = useMemo(() =>
    RARITIES.map(r => ({
      ...r,
      prob: pAtLeastOne(r.rate, packsOpened),
    })),
    [packsOpened]
  );

  const packsResults = useMemo(() =>
    RARITIES.map(r => ({
      ...r,
      packs50: packsForProbability(r.rate, 0.50),
      packs75: packsForProbability(r.rate, 0.75),
      packs90: packsForProbability(r.rate, 0.90),
      packsTarget: packsForProbability(r.rate, targetProb / 100),
    })),
    [targetProb]
  );

  const specificR = RARITIES.find(r => r.id === specificRarity) ?? RARITIES[4];
  const specificRate = specificR.rate / Math.max(1, cardsAtRarity);
  const specificOdds = pAtLeastOne(specificRate, specificPacks);
  const specificAvg = Math.round(1 / specificRate);
  const specific50 = Math.ceil(packsForProbability(specificRate, 0.50));
  const specific90 = Math.ceil(packsForProbability(specificRate, 0.90));

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0f0c29,#302b63,#1a1a2e)", color: "#e2e8f0", fontFamily: "system-ui,sans-serif" }}>
      <FaqPageSchema faqs={FAQS} />

      {/* Header */}
      <div style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "12px 24px" }}>
        <Link href="/tools" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>← All Tools</Link>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
          <h1 style={{ fontSize: "clamp(24px,5vw,38px)", fontWeight: 800, margin: "0 0 12px", background: "linear-gradient(90deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Pokémon TCG Pocket Pull Calculator
          </h1>
          <p style={{ color: "rgba(226,232,240,0.6)", fontSize: 16, margin: 0, maxWidth: 520, marginInline: "auto" }}>
            Calculate your odds of pulling Crown Rares, Immersive Rares, God Packs and more — based on official in-game pull rates.
          </p>
        </div>

        {/* Pull rate reference */}
        <div style={{ ...card, marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 14, textTransform: "uppercase" }}>Official Pull Rates Per Pack</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8 }}>
            {RARITIES.map(r => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: r.bg, border: `1px solid ${r.color}40`, borderRadius: 8, padding: "8px 12px" }}>
                <span style={{ fontSize: 13, color: r.color, fontWeight: 600 }}>{r.symbol} {r.id === "godpack" ? "God Pack" : r.label.split(" ").slice(1).join(" ")}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{(r.rate * 100).toFixed(r.rate < 0.001 ? 4 : r.rate < 0.01 ? 3 : r.rate < 0.1 ? 2 : 1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          <button style={TAB_STYLE(tab === "odds")}    onClick={() => setTab("odds")}>📦 I've opened X packs</button>
          <button style={TAB_STYLE(tab === "packs")}   onClick={() => setTab("packs")}>🎯 Packs needed</button>
          <button style={TAB_STYLE(tab === "specific")} onClick={() => setTab("specific")}>🃏 Specific card</button>
        </div>

        {/* Tab 1: Odds from packs opened */}
        {tab === "odds" && (
          <div>
            <div style={card}>
              <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 8, fontWeight: 600 }}>Packs opened</label>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <input
                  type="range" min={1} max={5000} value={packsOpened}
                  onChange={e => setPacksOpened(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "#6366f1" }}
                />
                <input
                  type="number" min={1} max={99999} value={packsOpened}
                  onChange={e => setPacksOpened(Math.max(1, Number(e.target.value)))}
                  style={{ width: 90, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 15, fontWeight: 700, textAlign: "center" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {oddsResults.map(r => (
                <div key={r.id} style={{ background: r.bg, border: `1px solid ${r.color}40`, borderRadius: 12, padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, color: r.color, fontSize: 15 }}>{r.label}</span>
                    <span style={{ fontWeight: 800, fontSize: 22, color: "#fff" }}>{pct(r.prob)}</span>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 6, height: 6, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min(100, r.prob * 100)}%`, background: r.color, borderRadius: 6, transition: "width 0.3s" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4, fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
                    <span>Avg 1 every {fmtPacks(1 / r.rate)} packs · ~{(r.rate * packsOpened).toFixed(r.rate * packsOpened < 0.1 ? 3 : r.rate * packsOpened < 1 ? 2 : 1)} expected pulls</span>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>50% in {Math.ceil(packsForProbability(r.rate, 0.5) / 2)} days F2P</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...card, marginTop: 24, background: "rgba(99,102,241,0.1)", borderColor: "#6366f140" }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>💡 Pity system reminder</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                You&apos;re guaranteed at least one <strong>◆◆◆◆ ex</strong> or better every <strong>10 packs</strong> from the same set. This resets when you pull one.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Packs needed */}
        {tab === "packs" && (
          <div>
            <div style={card}>
              <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 8, fontWeight: 600 }}>Target probability</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[25, 50, 75, 90, 95, 99].map(p => (
                  <button key={p} onClick={() => setTargetProb(p)}
                    style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
                      background: targetProb === p ? "#6366f1" : "rgba(255,255,255,0.08)",
                      color: targetProb === p ? "#fff" : "rgba(255,255,255,0.6)" }}>
                    {p}%
                  </button>
                ))}
                <input type="number" min={1} max={99} value={targetProb}
                  onChange={e => setTargetProb(Math.max(1, Math.min(99, Number(e.target.value))))}
                  style={{ width: 70, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 14, textAlign: "center" }}
                  placeholder="%" />
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left",  padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Rarity</th>
                    <th style={{ textAlign: "center", padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>50%</th>
                    <th style={{ textAlign: "center", padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>75%</th>
                    <th style={{ textAlign: "center", padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>90%</th>
                    <th style={{ textAlign: "center", padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(99,102,241,0.15)", borderRadius: "6px 6px 0 0" }}>{targetProb}%</th>
                    <th style={{ textAlign: "center", padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Days F2P</th>
                  </tr>
                </thead>
                <tbody>
                  {packsResults.map(r => (
                    <tr key={r.id}>
                      <td style={{ padding: "12px 16px", background: r.bg, border: `1px solid ${r.color}30`, borderRight: "none", borderRadius: "10px 0 0 10px", fontWeight: 700, color: r.color, fontSize: 14 }}>{r.symbol} {r.label.split("(")[0].trim()}</td>
                      <td style={{ padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: "none", borderRight: "none", textAlign: "center", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{fmtPacks(r.packs50)}</td>
                      <td style={{ padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: "none", borderRight: "none", textAlign: "center", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{fmtPacks(r.packs75)}</td>
                      <td style={{ padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: "none", borderRight: "none", textAlign: "center", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{fmtPacks(r.packs90)}</td>
                      <td style={{ padding: "12px 16px", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderLeft: "none", borderRight: "none", textAlign: "center", fontSize: 15, fontWeight: 800, color: "#a5b4fc" }}>{fmtPacks(r.packsTarget)}</td>
                      <td style={{ padding: "12px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: "none", borderRadius: "0 10px 10px 0", textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{isFinite(r.packsTarget) ? `${Math.ceil(r.packsTarget / 2).toLocaleString()}d` : "∞"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 8, textAlign: "center" }}>Packs needed to achieve target probability of pulling at least one card of that rarity</div>
          </div>
        )}

        {/* Tab 3: Specific card */}
        {tab === "specific" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div style={card}>
                <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 8, fontWeight: 600 }}>Card rarity</label>
                <select value={specificRarity} onChange={e => setSpecificRarity(e.target.value)}
                  style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 14 }}>
                  {RARITIES.map(r => (
                    <option key={r.id} value={r.id} style={{ background: "#1a1a2e" }}>{r.symbol} {r.label.split("(")[0].trim()}</option>
                  ))}
                </select>
              </div>
              <div style={card}>
                <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 8, fontWeight: 600 }}>Cards at this rarity in set</label>
                <input type="number" min={1} max={100} value={cardsAtRarity}
                  onChange={e => setCardsAtRarity(Math.max(1, Number(e.target.value)))}
                  style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 20, fontWeight: 700, textAlign: "center", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div style={{ ...card, background: "rgba(99,102,241,0.08)", borderColor: "#6366f140", marginBottom: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, textAlign: "center" }}>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Chance per pack</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: specificR.color }}>{(specificRate * 100).toFixed(4)}%</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Average packs</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{fmtPacks(specificAvg)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Rarity rate</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "rgba(255,255,255,0.6)" }}>{(specificR.rate * 100).toFixed(specificR.rate < 0.001 ? 4 : 3)}%</div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                { label: "50% chance", packs: specific50, color: "#22c55e" },
                { label: "90% chance", packs: specific90, color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>Packs for {s.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{fmtPacks(s.packs)}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>{isFinite(s.packs) ? `${Math.ceil(s.packs / 2).toLocaleString()} days F2P` : "∞"}</div>
                </div>
              ))}
            </div>

            <div style={card}>
              <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 8, fontWeight: 600 }}>Simulate: packs I&apos;ve opened</label>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <input type="range" min={1} max={10000} value={specificPacks}
                  onChange={e => setSpecificPacks(Number(e.target.value))}
                  style={{ flex: 1, accentColor: specificR.color }} />
                <input type="number" min={1} max={999999} value={specificPacks}
                  onChange={e => setSpecificPacks(Math.max(1, Number(e.target.value)))}
                  style={{ width: 90, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 15, fontWeight: 700, textAlign: "center" }} />
              </div>
              <div style={{ marginTop: 16, textAlign: "center" }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: specificR.color }}>{pct(specificOdds)}</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", display: "block", marginTop: 4 }}>
                  chance of pulling your specific {specificR.symbol} card in {specificPacks.toLocaleString()} packs
                </span>
              </div>
            </div>
          </div>
        )}

        {/* How to use */}
        <div style={{ ...card, marginTop: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 24px", letterSpacing: "-0.01em" }}>How to Use the Pull Rate Calculator</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { step: "1", title: "Tab 1 — I've opened X packs", desc: "Enter how many packs you've already opened. See your probability of having pulled each rarity at least once, plus expected pull count and F2P days context." },
              { step: "2", title: "Tab 2 — Packs needed", desc: "Choose a target probability (25% to 99%) or type a custom %. See exactly how many packs you need for each rarity — with the Days F2P column showing the real time cost." },
              { step: "3", title: "Tab 3 — Specific card", desc: "Select a rarity and enter how many cards exist at that rarity in the set. The calculator divides the pull rate to give you true odds for one specific card — the number most players never check." },
            ].map(s => (
              <div key={s.step}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#a5b4fc", marginBottom: 12 }}>{s.step}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Educational */}
        <div style={{ ...card }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.01em" }}>Understanding Pokémon TCG Pocket Pull Rates</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 16px" }}>
            Pokémon TCG Pocket publishes its pull rates officially in-game under the Offering Rates button on the pack selection screen. Per 5-card pack: ex (Double Rare) at 5.000%, Art Rare at 2.572%, Super Rare at 0.500%, Immersive Rare at 0.222%, Crown Rare at 0.040%, and God Pack (Rare Pack) at 0.050%.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 16px" }}>
            The key formula this calculator uses is: <strong style={{ color: "rgba(255,255,255,0.8)" }}>P(at least 1) = 1 − (1 − rate)^packs</strong>. This is the binomial probability formula — it tells you the chance of pulling a card at least once across any number of packs. Each pack is an independent event; opening 1,000 packs without a Crown Rare does not increase your odds on pack 1,001.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: 0 }}>
            Crown Rare is 125× rarer than an ex card. The gap between everyday pulls and top-tier rarity is enormous in pack-count terms — which is why the F2P days column matters. At 2 free packs per day, a 50% Crown Rare probability takes 867 days. Knowing these numbers before you spend is the whole point of the tool.
          </p>
        </div>

        {/* FAQ */}
        <div style={{ ...card }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 24px", letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", paddingBottom: i < FAQS.length - 1 ? 20 : 0 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 8px", lineHeight: 1.4 }}>{faq.q}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Authority bridge */}
        <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 16, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(129,140,248,0.8)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>More Collectibles Tools</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 0 12px", lineHeight: 1.6 }}>
            Calculate pack break EV, card grading profit, eBay best offers and card flip ROI — all free, no signup.
          </p>
          <Link href="/tools/category/collectibles" style={{ fontSize: 13, fontWeight: 700, color: "#818cf8", textDecoration: "none" }}>
            View all collectibles tools →
          </Link>
        </div>

        {/* SEO description */}
        <section style={{ padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>The Most Accurate Free Pokémon TCG Pocket Pull Calculator</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Most Pokémon TCG Pocket pull rate tools show a single percentage and stop there. This calculator goes further: it converts that percentage into real pack counts for 50%, 75%, and 90% probability targets, shows the expected number of pulls for your pack count, and — crucially — displays how many days each milestone takes at the free daily 2-pack limit. That last number is the one that changes how players think about Crown Rares and God Packs.
            </p>
            <p style={{ marginBottom: 16 }}>
              All rates are sourced directly from Pokémon TCG Pocket's official in-game Offering Rates disclosure. The pull rates used are: Double Rare (ex) 5.000%, Art Rare 2.572%, Super Rare 0.500%, Immersive Rare 0.222%, Crown Rare 0.040%, God Pack (Rare Pack) 0.050%. The probability formula is the standard binomial: P(at least 1) = 1 − (1 − rate)^packs.
            </p>
            <p style={{ marginBottom: 0 }}>
              The Specific Card tab is the most powerful feature: enter the rarity and how many cards exist at that rarity in the set, and the calculator divides the pull rate to give you the true per-card probability. A Crown Rare in a set with 3 Crown Rares has an effective rate of 0.013% — roughly 1 in 7,500 packs on average. Most pull rate calculators don't account for this. This one does.
            </p>
          </div>
        </section>

        <MoreTools currentSlug="pokemon-tcg-pocket-pull-calculator" />
      </div>
    </div>
  );
}
