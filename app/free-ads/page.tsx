import type { Metadata } from "next";
import { CTA } from "./CTA";

export const metadata: Metadata = {
  title: "Get a Month of On-Brand Ads From Your Website — Free to Try",
  description:
    "Paste your website and get finished, on-brand ad campaigns built by AI in minutes — your logo, colours, voice. 5 free, no card. Own the whole studio for a one-time price.",
  alternates: { canonical: "https://toolstack.tech/free-ads" },
  robots: { index: false, follow: false }, // paid-traffic LP — keep out of the index
  openGraph: {
    title: "Paste your website. Get a month of on-brand ads.",
    description: "Finished, on-brand ad campaigns from your site — built by AI in minutes. Free to try.",
    url: "https://toolstack.tech/free-ads",
    siteName: "ToolStack",
    type: "website",
    images: [{ url: "https://toolstack.tech/jdesigns-studio-og.jpg", width: 1200, height: 630 }],
  },
};

const STUDIO = "/tools/jdesigns-studio#ds-builder";
const O = "#FF7A18";
const CARD = "rgba(255,255,255,0.04)";
const LINE = "rgba(255,255,255,0.09)";

const btn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 10, background: `linear-gradient(92deg,${O},#FFB347)`,
  color: "#1a0f04", fontWeight: 850, fontSize: 21, padding: "18px 34px", borderRadius: 15,
  textDecoration: "none", boxShadow: `0 16px 44px -8px ${O}`,
};

export default function FreeAdsLanding() {
  return (
    <div style={{ background: "#0B0B10", color: "#fff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: 1080, margin: "0 auto", padding: "70px 24px 90px",
          backgroundImage:
            "radial-gradient(900px 520px at 88% -8%, rgba(255,122,24,.22), transparent 60%), radial-gradient(700px 560px at -8% 108%, rgba(120,90,255,.16), transparent 60%)",
        }}
      >
        {/* Hero */}
        <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${LINE}`, background: CARD, borderRadius: 999, padding: "8px 18px", fontSize: 14, fontWeight: 700, color: "#cfcfe0", marginBottom: 22 }}>
            🎨 ToolStack Design Studio
          </div>
          <h1 style={{ fontSize: "clamp(38px,7vw,68px)", fontWeight: 850, lineHeight: 1.02, letterSpacing: "-0.02em", margin: 0, textWrap: "balance" as never }}>
            Paste your website.{" "}
            <span style={{ background: `linear-gradient(92deg,${O},#FFB347)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Get a month of on-brand ads.</span>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.5, color: "#bcbcce", maxWidth: 620, margin: "22px auto 0" }}>
            It reads your real brand — logo, colours, fonts, voice — and builds finished, ready-to-post ad campaigns in minutes. No designer. No agency. No blank canvas.
          </p>
          <div style={{ marginTop: 34, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <CTA href={STUDIO} style={btn}>Get 3 free ads from your site →</CTA>
            <span style={{ fontSize: 14, color: "#8f8fa3" }}>5 free generations · no card · takes 2 minutes</span>
          </div>
        </div>

        {/* Proof — real ads */}
        <div style={{ marginTop: 56 }}>
          <p style={{ textAlign: "center", fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#8f8fa3", marginBottom: 16 }}>
            Real ads it generated — from a single URL
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {["ad1", "ad2", "ad3"].map((a) => (
              <div key={a} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${LINE}`, boxShadow: "0 22px 50px rgba(0,0,0,.5)", aspectRatio: "3/4" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/free-ads/${a}.png`} alt="AI-generated on-brand ad" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 14 }}>
          {[
            { n: "1", t: "Paste your website", d: "It scans your real brand identity in seconds." },
            { n: "2", t: "Pick a campaign", d: "Get 3 campaign directions — choose one to build." },
            { n: "3", t: "Download & post", d: "Finished ads in 4K, ready for every platform." },
          ].map((s) => (
            <div key={s.n} style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 16, padding: "20px 22px" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(92deg,${O},#FFB347)`, color: "#1a0f04", fontWeight: 850, display: "grid", placeItems: "center", marginBottom: 12 }}>{s.n}</div>
              <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{s.t}</div>
              <div style={{ fontSize: 14.5, color: "#a6a6bb", lineHeight: 1.5 }}>{s.d}</div>
            </div>
          ))}
        </div>

        {/* Own it teaser */}
        <div style={{ marginTop: 56, background: "linear-gradient(180deg,rgba(255,122,24,.12),rgba(255,255,255,.03))", border: `1px solid rgba(255,122,24,.35)`, borderRadius: 20, padding: "30px 28px", textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 850 }}>Love it? Own the whole studio.</div>
          <p style={{ fontSize: 16, color: "#c7c7d6", maxWidth: 560, margin: "10px auto 20px", lineHeight: 1.55 }}>
            Agencies charge $2,000+/month, forever. For one payment you get your <b style={{ color: "#fff" }}>own private ad studio</b> — unlimited ads for pennies, no monthly fee, plus white-label &amp; resell rights.
          </p>
          <CTA href={STUDIO} style={btn}>Start free →</CTA>
        </div>

        <p style={{ marginTop: 40, textAlign: "center", fontSize: 13, color: "#7d7d90" }}>ToolStack Design Studio · toolstack.tech</p>
      </div>
    </div>
  );
}
