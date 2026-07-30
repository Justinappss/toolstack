"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";

/* ── Brand accents (original violet/pink palette — not Rockstar trade dress) ── */
const PRIMARY = "#a78bfa";
const PRIMARY_DIM = "rgba(167,139,250,0.1)";
const PRIMARY_BORDER = "rgba(167,139,250,0.25)";
const SECONDARY = "#ff2e88";
const SECONDARY_DIM = "rgba(255,46,136,0.1)";
const SECONDARY_BORDER = "rgba(255,46,136,0.28)";

/* ── Confirmed edition pricing ── */
const PRICES = {
  USD: { standard: 79.99, ultimate: 99.99, diff: 20, sym: "$" },
  GBP: { standard: 69.99, ultimate: 89.99, diff: 20, sym: "£" },
} as const;

type Currency = keyof typeof PRICES;

type Row = {
  feature: string;
  standard: boolean;
  ultimate: boolean;
  note?: string;
};

const ROWS: Row[] = [
  { feature: "Full Jason & Lucia story", standard: true, ultimate: true, note: "reported" },
  { feature: "Complete map (all of Leonida, incl. Vice City)", standard: true, ultimate: true, note: "reported" },
  { feature: "Every core gameplay mechanic", standard: true, ultimate: true, note: "reported" },
  { feature: "Access to 5 Ultimate-only shops", standard: false, ultimate: true, note: "reported" },
  { feature: "Extra vehicles & weapons from those shops", standard: false, ultimate: true, note: "reported" },
  { feature: "2 additional side missions", standard: false, ultimate: true, note: "reported" },
  { feature: "Exclusive salon options (Jason facial hair, Lucia makeup)", standard: false, ultimate: true, note: "reported" },
];

const FAQS = [
  {
    q: "What's the difference between the GTA 6 Standard and Ultimate Edition?",
    a: "The Standard Edition ($79.99 / £69.99) is reported to contain the complete game — the full Jason and Lucia story, the entire state of Leonida including Vice City, and every core gameplay mechanic. The Ultimate Edition ($99.99 / £89.99) is reported to add access to five Ultimate-only in-game shops, extra vehicles, weapons and cosmetics tied to those shops, two additional side missions, and exclusive salon options for Jason and Lucia. As far as has been reported, nothing of the main story or map is withheld from Standard.",
  },
  {
    q: "Is the GTA 6 Ultimate Edition worth the extra $20 / £20?",
    a: "For most players, no — Standard already contains the entire game and story, so you aren't missing any content by skipping Ultimate. Ultimate is reported to add convenience items: extra shops, vehicles, weapons, two side missions and cosmetic salon options, not additional story. It's worth it only if those specific extras matter to you personally.",
  },
  {
    q: "Does the Vice City Pack pre-order bonus come only with the Ultimate Edition?",
    a: "No — this is a common point of confusion. The Vice City Pack (the '55 Vapid Stanier, the Shore Court Garage, exclusive outfits, hairstyles and weapon patterns) is a separate pre-order bonus that comes with BOTH the Standard and Ultimate Edition, as long as you pre-order before 20 November 2026. It is not an Ultimate-exclusive perk.",
  },
  {
    q: "When does GTA 6 release and on which platforms?",
    a: "GTA 6 releases on 19 November 2026 for PlayStation 5 and Xbox Series X|S only. Digital pre-loads open on 12 November 2026. No PC version has been announced.",
  },
  {
    q: "What am I NOT missing if I buy the Standard Edition?",
    a: "You get the complete Jason and Lucia story, the full map of Leonida including Vice City, and every core gameplay mechanic — the entire game. What you don't get is access to five Ultimate-only shops, some extra vehicles and weapons, two additional side missions, and exclusive salon cosmetic options — none of which affect the story or map.",
  },
];

function Included({ color = PRIMARY }: { color?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color, fontWeight: 700, fontSize: 13.5 }}>
      <span aria-hidden="true">✓</span> Included
    </span>
  );
}
function NotIncluded() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.35)", fontWeight: 600, fontSize: 13.5 }}>
      <span aria-hidden="true">✕</span> Not included
    </span>
  );
}

export default function Gta6EditionComparison() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const p = PRICES[currency];

  const fmt = (n: number) =>
    `${p.sym}${n.toLocaleString(currency === "GBP" ? "en-GB" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  /* ── Schema ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "GTA 6 Edition Comparison",
        url: "https://toolstack.tech/tools/gta-6-edition-comparison",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "Compare the GTA 6 Standard and Ultimate Edition feature by feature, see the honest verdict on whether the extra $20/£20 is worth it, and understand the separate Vice City pre-order pack.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@type": "Organization", name: "ToolStack", url: "https://toolstack.tech" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ToolStack", item: "https://toolstack.tech" },
          { "@type": "ListItem", position: 2, name: "Gaming", item: "https://toolstack.tech/tools/category/gaming" },
          { "@type": "ListItem", position: 3, name: "GTA 6 Edition Comparison", item: "https://toolstack.tech/tools/gta-6-edition-comparison" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  /* ── Shared styles ── */
  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: "28px 26px",
    marginBottom: 28,
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
    marginBottom: 8,
  };
  const currencyBtn = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "10px 16px",
    borderRadius: 10,
    border: `1px solid ${active ? PRIMARY_BORDER : "rgba(255,255,255,0.12)"}`,
    background: active ? PRIMARY_DIM : "rgba(255,255,255,0.03)",
    color: active ? "white" : "rgba(255,255,255,0.55)",
    fontWeight: 700,
    fontSize: 14,
    fontFamily: "inherit",
    cursor: "pointer",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "8%", width: 620, height: 620, background: "radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "45%", right: "-12%", width: 520, height: 520, background: "radial-gradient(circle, rgba(255,46,136,0.09) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 36, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools/category/gaming" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Gaming</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>GTA 6 Edition Comparison</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {["19 Nov 2026", "PS5 & Xbox Series X|S", "Free Comparison", "No Signup"].map(b => (
              <span key={b} style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, background: PRIMARY_DIM, border: `1px solid ${PRIMARY_BORDER}`, borderRadius: 999, padding: "4px 12px" }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            GTA 6{" "}
            <span style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Edition Comparison
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 640, margin: "0 0 18px" }}>
            Standard or Ultimate? Here&apos;s exactly what the extra {p.sym}{p.diff}{" "}gets you — and what it doesn&apos;t — so you can decide without the marketing spin.
          </p>
        </div>

        {/* ── Currency toggle + price header ── */}
        <div style={cardStyle}>
          <label style={labelStyle} htmlFor="currency-usd">Currency</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
            <button id="currency-usd" type="button" onClick={() => setCurrency("USD")} style={currencyBtn(currency === "USD")}>USD ($)</button>
            <button type="button" onClick={() => setCurrency("GBP")} style={currencyBtn(currency === "GBP")}>GBP (£)</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "18px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>Standard Edition</div>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{fmt(p.standard)}</div>
            </div>
            <div style={{ background: SECONDARY_DIM, border: `1px solid ${SECONDARY_BORDER}`, borderRadius: 12, padding: "18px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>Ultimate Edition</div>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{fmt(p.ultimate)}</div>
            </div>
          </div>
        </div>

        {/* ── Feature comparison table ── */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 6px" }}>Feature by feature</h2>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: "0 0 18px" }}>
            Rows marked &ldquo;reported&rdquo; come from press and community coverage of the Ultimate Edition, not a first-party Rockstar page — confirm final contents on the official PlayStation or Xbox store listing before buying.
          </p>

          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table style={{ width: "100%", minWidth: 480, borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", padding: "0 0 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Feature</th>
                  <th style={{ textAlign: "left", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", padding: "0 0 10px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", whiteSpace: "nowrap" }}>Standard</th>
                  <th style={{ textAlign: "left", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", padding: "0 0 10px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", whiteSpace: "nowrap" }}>Ultimate</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(r => (
                  <tr key={r.feature}>
                    <td style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 14.5, color: "rgba(255,255,255,0.85)" }}>
                      {r.feature}
                      {r.note && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.04em" }}>reported</span>}
                    </td>
                    <td style={{ padding: "12px 0 12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", whiteSpace: "nowrap" }}>
                      {r.standard ? <Included /> : <NotIncluded />}
                    </td>
                    <td style={{ padding: "12px 0 12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", whiteSpace: "nowrap" }}>
                      {r.ultimate ? <Included /> : <NotIncluded />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Vice City Pack — shared pre-order bonus, visually distinct ── */}
          <div style={{ marginTop: 22, background: SECONDARY_DIM, border: `1.5px solid ${SECONDARY_BORDER}`, borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 18 }} aria-hidden="true">🎁</span>
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: SECONDARY, background: "rgba(255,46,136,0.15)", border: `1px solid ${SECONDARY_BORDER}`, borderRadius: 999, padding: "3px 10px" }}>
                Pre-order bonus · not Ultimate-exclusive
              </span>
            </div>
            <div style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 6 }}>Vice City Pack</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: "0 0 12px" }}>
              The &apos;55 Vapid Stanier, the Shore Court Garage, exclusive outfits and hairstyles, and unique weapon patterns — for anyone who pre-orders before 20 November 2026. This is a separate offer from the Ultimate Edition, and it&apos;s the single most confused thing about GTA 6&apos;s editions.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              <div><Included color={SECONDARY} /><span style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Standard + pre-order</span></div>
              <div><Included color={SECONDARY} /><span style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Ultimate + pre-order</span></div>
            </div>
          </div>
        </div>

        {/* ── The £20/$20 question ── */}
        <div style={{ ...cardStyle, background: `linear-gradient(135deg, ${PRIMARY_DIM}, ${SECONDARY_DIM})`, border: `1px solid ${PRIMARY_BORDER}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            The {p.sym}{p.diff} question
          </div>
          <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 12px" }}>Is Ultimate worth it? Honestly — for most people, no.</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: 0 }}>
            Standard Edition already contains the entire game: the full Jason and Lucia story, the complete map, and every core mechanic. Ultimate is reported to add convenience and cosmetics on top — five extra shops, some extra vehicles and weapons, two side missions, and salon options — not story content. If none of that specifically appeals to you, Standard is the better value. If you know you want the extras, Ultimate delivers them. Either way, the choice is yours to make with the full picture, not a marketing headline.
          </p>
        </div>

        {/* ── What you're NOT missing ── */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 14px" }}>What you&apos;re NOT missing in Standard</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "The complete Jason and Lucia story — nothing held back.",
              "The full map of Leonida, including Vice City.",
              "Every core gameplay mechanic in the game.",
              "The Vice City pre-order pack, if you pre-order before 20 Nov 2026.",
            ].map(line => (
              <div key={line} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: PRIMARY, fontWeight: 800, fontSize: 15, lineHeight: 1.5 }} aria-hidden="true">✓</span>
                <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Context ── */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 14px" }}>What we know for certain</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {[
              { k: "Release date", v: "19 November 2026" },
              { k: "Pre-load opens", v: "12 November 2026" },
              { k: "Platforms", v: "PS5, Xbox Series X|S" },
              { k: "PC version", v: "Not announced" },
              { k: "Standard Edition", v: "$79.99 / £69.99" },
              { k: "Ultimate Edition", v: "$99.99 / £89.99" },
            ].map(row => (
              <div key={row.k} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{row.k}</div>
                <div style={{ fontSize: 15, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{row.v}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: "16px 0 0" }}>
            Release date, pre-load date, platforms and both editions&apos; prices above are Rockstar-confirmed. The feature breakdown for both editions — including what&apos;s included in Standard — is reported by press and community sources, not a first-party Rockstar page — confirm the final contents on the official PlayStation or Xbox store listing before buying.
          </p>
        </div>

        {/* ── FAQ ── */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 18px" }}>FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {FAQS.map(f => (
              <div key={f.q}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>{f.q}</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer — nominative reference only */}
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.6, marginBottom: 32 }}>
          ToolStack is an independent tools site and is not affiliated with, endorsed by or sponsored by Rockstar Games or Take-Two Interactive.
          &ldquo;Grand Theft Auto&rdquo; is a trademark of its respective owner and is referenced here for identification purposes only.
        </p>

        <MoreTools currentSlug="gta-6-edition-comparison" />
        <AdvertiseGPTBanner />
      </div>
    </div>
  );
}
