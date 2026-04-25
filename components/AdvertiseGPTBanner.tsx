"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── RadarViz ────────────────────────────────────────────────────────────────
const RADAR_MODELS = [
  { name: "ChatGPT",    a: -20,  r: 0.72 },
  { name: "Gemini",     a:  40,  r: 0.58 },
  { name: "Perplexity", a:  95,  r: 0.80 },
  { name: "Claude",     a: 150,  r: 0.45 },
  { name: "Copilot",    a: 205,  r: 0.68 },
  { name: "Meta AI",    a: 260,  r: 0.55 },
  { name: "Grok",       a: 310,  r: 0.78 },
];

function RadarViz() {
  const [sweep, setSweep] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();
    const tick = (t: number) => {
      const elapsed = (t - startRef.current) / 1000;
      setSweep((elapsed * 72) % 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const size = 260;
  const cx = size / 2, cy = size / 2;
  const rMax = size / 2 - 14;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        <defs>
          <radialGradient id="bnrRadarBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="oklch(0.72 0.20 300)" stopOpacity="0.18" />
            <stop offset="60%" stopColor="oklch(0.30 0.10 290)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="bnrSweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="oklch(0.80 0.22 320)" stopOpacity="0" />
            <stop offset="80%" stopColor="oklch(0.80 0.22 320)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.92 0.18 340)" stopOpacity="0.95" />
          </linearGradient>
          <filter id="bnrGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>

        <circle cx={cx} cy={cy} r={rMax + 4} fill="url(#bnrRadarBg)" />
        {[0.3, 0.55, 0.8, 1].map((k) => (
          <circle key={k} cx={cx} cy={cy} r={rMax * k}
            fill="none" stroke="color-mix(in oklch, white 10%, transparent)" strokeWidth="1" />
        ))}
        <line x1={cx - rMax} y1={cy} x2={cx + rMax} y2={cy}
          stroke="color-mix(in oklch, white 6%, transparent)" strokeWidth="1" />
        <line x1={cx} y1={cy - rMax} x2={cx} y2={cy + rMax}
          stroke="color-mix(in oklch, white 6%, transparent)" strokeWidth="1" />

        <g transform={`rotate(${sweep} ${cx} ${cy})`}>
          <path
            d={`M ${cx} ${cy} L ${cx + rMax} ${cy} A ${rMax} ${rMax} 0 0 0 ${cx + rMax * Math.cos(-0.9)} ${cy + rMax * Math.sin(-0.9)} Z`}
            fill="url(#bnrSweepGrad)"
          />
          <line x1={cx} y1={cy} x2={cx + rMax} y2={cy}
            stroke="oklch(0.92 0.18 340)" strokeWidth="1.5" opacity="0.9" />
        </g>

        {RADAR_MODELS.map((m) => {
          const rad = (m.a * Math.PI) / 180;
          const x = cx + Math.cos(rad) * rMax * m.r;
          const y = cy + Math.sin(rad) * rMax * m.r;
          const diff = Math.abs(((sweep - m.a + 360) % 360));
          const near = Math.min(diff, 360 - diff);
          const intensity = Math.max(0, 1 - near / 40);
          const r = 2.5 + intensity * 3.5;
          return (
            <g key={m.name}>
              {intensity > 0.1 && (
                <circle cx={x} cy={y} r={r + 6}
                  fill="oklch(0.80 0.22 320)" opacity={intensity * 0.4} filter="url(#bnrGlow)" />
              )}
              <circle cx={x} cy={y} r={r}
                fill={intensity > 0.5 ? "oklch(0.95 0.16 340)" : "oklch(0.85 0.18 310)"} />
              <text x={x + 8} y={y + 3} fontSize="9"
                fontFamily="Geist Mono, monospace"
                fill={intensity > 0.3 ? "oklch(0.95 0.08 310)" : "oklch(0.65 0.02 290)"}
                letterSpacing="0.04em">
                {m.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r="3" fill="oklch(0.95 0.16 340)" />
        <circle cx={cx} cy={cy} r="7" fill="none" stroke="oklch(0.80 0.20 310)" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
}

// ─── Counter ─────────────────────────────────────────────────────────────────
function Counter({ to, duration = 1400 }: { to: number; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span>{v}</span>;
}

// ─── SubscriberFeed ──────────────────────────────────────────────────────────
const SUB_POOL = [
  { name: "maya.chen",  email: "maya@figma.com",  c1: "oklch(0.75 0.18 30)",  c2: "oklch(0.70 0.20 355)" },
  { name: "alex.w",     email: "aw@stripe.co",    c1: "oklch(0.75 0.16 220)", c2: "oklch(0.70 0.18 260)" },
  { name: "priya.k",    email: "priya@substack",  c1: "oklch(0.78 0.16 160)", c2: "oklch(0.72 0.18 195)" },
  { name: "jordan.p",   email: "j@linear.app",    c1: "oklch(0.72 0.20 305)", c2: "oklch(0.68 0.22 340)" },
  { name: "sam.reyes",  email: "sam@vercel.com",  c1: "oklch(0.78 0.14 90)",  c2: "oklch(0.72 0.18 140)" },
  { name: "nora.w",     email: "nora@notion.so",  c1: "oklch(0.75 0.18 15)",  c2: "oklch(0.70 0.20 55)" },
  { name: "dev.patel",  email: "dev@ramp.com",    c1: "oklch(0.75 0.16 240)", c2: "oklch(0.70 0.20 285)" },
  { name: "chloe.t",    email: "chloe@raycast",   c1: "oklch(0.80 0.14 190)", c2: "oklch(0.72 0.18 230)" },
];

type SubItem = typeof SUB_POOL[0] & { id: number; t: number };

function Avatar({ c1, c2, initial }: { c1: string; c2: string; initial: string }) {
  return (
    <div style={{
      width: 24, height: 24, borderRadius: 999,
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      color: "white",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, fontWeight: 700,
      boxShadow: "0 0 0 1.5px color-mix(in oklch, white 14%, transparent), 0 4px 10px -2px rgba(0,0,0,.3)",
      flex: "none" as const,
    }}>{initial}</div>
  );
}

function SubscriberFeed() {
  const [items, setItems] = useState<SubItem[]>(() =>
    Array.from({ length: 3 }, (_, i) => ({
      ...SUB_POOL[i % SUB_POOL.length],
      id: -i,
      t: Date.now() - i * 1600,
    }))
  );
  const idRef = useRef(1);

  useEffect(() => {
    const iv = setInterval(() => {
      setItems((prev) => {
        const next = SUB_POOL[Math.floor(Math.random() * SUB_POOL.length)];
        return [{ ...next, id: idRef.current++, t: Date.now() }, ...prev.slice(0, 2)];
      });
    }, 1800);
    return () => clearInterval(iv);
  }, []);

  const relTime = (t: number) => {
    const s = Math.max(1, Math.floor((Date.now() - t) / 1000));
    return s < 60 ? s + "s ago" : Math.floor(s / 60) + "m ago";
  };

  return (
    <div style={{
      borderRadius: 14,
      border: "1px solid color-mix(in oklch, white 10%, transparent)",
      background: "linear-gradient(180deg, oklch(0.14 0.02 230 / .8), oklch(0.11 0.02 235 / .8))",
      padding: "12px 14px",
      backdropFilter: "blur(12px)",
      overflow: "hidden",
      boxShadow: "0 10px 30px -15px oklch(0.10 0.10 220 / .6), inset 0 1px 0 color-mix(in oklch, white 8%, transparent)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          fontFamily: "'Geist Mono', monospace",
          fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const,
          color: "oklch(0.85 0.10 190)",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999,
            background: "oklch(0.80 0.18 150)",
            boxShadow: "0 0 8px oklch(0.80 0.18 150)",
            animation: "pulseDot 1.4s ease-in-out infinite",
          }} />
          Live · new subscribers
        </div>
        <span style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 10,
          color: "oklch(0.58 0.012 270)", fontVariantNumeric: "tabular-nums" as const,
        }}>
          +{12 + (Math.abs(items[0]?.id ?? 0) % 5)} /hr
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
        {items.map((item, idx) => (
          <div key={item.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "7px 8px", borderRadius: 9,
            background: idx === 0
              ? "linear-gradient(90deg, oklch(0.25 0.10 200 / .55), transparent)"
              : "transparent",
            opacity: 1 - idx * 0.18,
            animation: idx === 0 ? "bannerSlideIn .5s ease-out" : undefined,
          }}>
            <Avatar c1={item.c1} c2={item.c2} initial={item.name[0].toUpperCase()} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 12, fontWeight: 600, color: "oklch(0.97 0.005 270)",
                whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis",
              }}>{item.name}</div>
              <div style={{
                fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "oklch(0.58 0.012 270)",
                whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis",
              }}>{item.email}</div>
            </div>
            <div style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 9.5,
              color: "oklch(0.58 0.012 270)", flex: "none" as const,
            }}>
              {idx === 0 ? "now" : relTime(item.t)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shared style helpers ────────────────────────────────────────────────────
const statNum: React.CSSProperties = {
  fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em",
  lineHeight: 1, fontVariantNumeric: "tabular-nums" as const,
  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
};
const statLabel: React.CSSProperties = {
  fontSize: 11, color: "oklch(0.58 0.012 270)", marginTop: 5,
  fontFamily: "'Geist Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase" as const,
};
const liveChip: React.CSSProperties = {
  position: "absolute", top: 18, right: 18, zIndex: 2,
  display: "flex", alignItems: "center", gap: 8,
  padding: "6px 10px", borderRadius: 999,
  border: "1px solid color-mix(in oklch, white 10%, transparent)",
  background: "color-mix(in oklch, black 30%, transparent)",
  backdropFilter: "blur(6px)",
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10.5, letterSpacing: "0.08em", color: "oklch(0.58 0.012 270)",
};
const shimmerSpan: React.CSSProperties = {
  position: "absolute", inset: 0,
  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,.28) 50%, transparent 70%)",
  transform: "translateX(-100%)",
  animation: "bannerShimmer 3.2s ease-in-out infinite",
  pointerEvents: "none",
};

// ─── BannerRadar (AdvertsGPT) ────────────────────────────────────────────────
function BannerRadar() {
  return (
    <div style={{
      position: "relative", borderRadius: 28, padding: "32px 28px",
      overflow: "hidden",
      background:
        "radial-gradient(120% 80% at 0% 0%, oklch(0.22 0.09 300 / .45), transparent 55%)," +
        "radial-gradient(120% 80% at 100% 100%, oklch(0.24 0.14 340 / .35), transparent 55%)," +
        "linear-gradient(180deg, oklch(0.17 0.03 280), oklch(0.13 0.02 275))",
      border: "1px solid color-mix(in oklch, white 10%, transparent)",
      boxShadow:
        "0 1px 0 0 color-mix(in oklch, white 12%, transparent) inset," +
        "0 40px 80px -30px oklch(0.10 0.10 300 / .6)," +
        "0 0 0 1px oklch(0.30 0.15 300 / .12)",
      color: "oklch(0.97 0.005 270)",
      height: "100%", display: "flex", flexDirection: "column" as const,
    }}>
      {/* LIVE chip */}
      <div style={liveChip}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "oklch(0.80 0.18 150)", boxShadow: "0 0 8px oklch(0.80 0.18 150)" }} />
        LIVE · v2.3
      </div>

      {/* Eyebrow */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "7px 14px", borderRadius: 999,
        fontFamily: "'Geist Mono', monospace",
        fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" as const,
        color: "oklch(0.92 0.10 320)",
        background: "linear-gradient(90deg, oklch(0.30 0.14 300 / .45), oklch(0.30 0.18 340 / .35))",
        border: "1px solid color-mix(in oklch, oklch(0.80 0.20 320) 35%, transparent)",
        boxShadow: "0 0 30px -6px oklch(0.70 0.22 320 / .5)",
        alignSelf: "flex-start",
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: "oklch(0.85 0.20 320)", boxShadow: "0 0 10px oklch(0.85 0.20 320)", animation: "pulseDot 1.4s ease-in-out infinite" }} />
        SCANNING 10+ AI MODELS
      </div>

      {/* Model pills */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 7, margin: "20px 0 22px" }}>
        {["ChatGPT","Gemini","Perplexity","Claude","Copilot","Meta AI","Grok"].map((n) => (
          <span key={n} style={{
            padding: "6px 11px", borderRadius: 999,
            fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" as const,
            color: "oklch(0.88 0.02 300)",
            background: "color-mix(in oklch, white 4%, transparent)",
            border: "1px solid color-mix(in oklch, white 10%, transparent)",
          }}>{n}</span>
        ))}
      </div>

      {/* Headline */}
      <h2 style={{
        fontFamily: "'Geist', sans-serif",
        fontSize: 32, lineHeight: 1.08, fontWeight: 700,
        letterSpacing: "-0.02em", margin: "0 0 12px",
      }}>
        Is your brand{" "}
        <em style={{
          backgroundImage: "linear-gradient(92deg, oklch(0.82 0.20 300) 0%, oklch(0.78 0.24 340) 50%, oklch(0.88 0.18 60) 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
          fontStyle: "italic",
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
        }}>invisible</em>{" "}
        to AI?
      </h2>

      <p style={{ color: "oklch(0.75 0.01 270)", fontSize: 14.5, lineHeight: 1.55, margin: "0 0 18px" }}>
        AdvertsGPT scans your site across{" "}
        <strong style={{ color: "oklch(0.97 0.005 270)" }}>10 AI models</strong>{" "}
        in 60 seconds and shows you how to rank in AI search before your competitors do.
      </p>

      {/* Live radar panel */}
      <div style={{
        borderRadius: 14,
        border: "1px solid color-mix(in oklch, white 10%, transparent)",
        background: "linear-gradient(180deg, oklch(0.16 0.03 285 / .8), oklch(0.12 0.02 280 / .8))",
        padding: "12px 14px", backdropFilter: "blur(12px)", overflow: "hidden",
        boxShadow: "0 10px 30px -15px oklch(0.10 0.10 300 / .6), inset 0 1px 0 color-mix(in oklch, white 8%, transparent)",
        display: "flex", gap: 12, alignItems: "center", marginBottom: 20,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 7,
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: "oklch(0.88 0.12 320)", marginBottom: 8,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "oklch(0.80 0.18 150)", boxShadow: "0 0 8px oklch(0.80 0.18 150)", animation: "pulseDot 1.4s ease-in-out infinite" }} />
            Live · scanning AI models
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 5 }}>
            {[{ n: "ChatGPT", pct: 92 }, { n: "Gemini", pct: 78 }, { n: "Perplexity", pct: 64 }].map((m) => (
              <div key={m.n} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ flex: "none", fontSize: 11, color: "oklch(0.75 0.01 270)", fontFamily: "'Geist Mono', monospace", width: 70 }}>{m.n}</span>
                <div style={{ flex: 1, height: 5, borderRadius: 999, background: "color-mix(in oklch, white 6%, transparent)", overflow: "hidden", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, width: m.pct + "%", background: "linear-gradient(90deg, oklch(0.70 0.20 300), oklch(0.78 0.22 340))", borderRadius: 999, boxShadow: "0 0 10px oklch(0.78 0.22 340 / .6)" }} />
                </div>
                <span style={{ flex: "none", fontSize: 10.5, fontFamily: "'Geist Mono', monospace", color: "oklch(0.88 0.12 320)", width: 30, textAlign: "right" as const }}>{m.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        {/* Mini radar (scaled down) */}
        <div style={{ flex: "none", width: 120, height: 120, position: "relative", transform: "scale(0.46)", transformOrigin: "center", margin: "-70px" }}>
          <RadarViz />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 20, marginBottom: 20, alignItems: "end" }}>
        <div>
          <div style={{ ...statNum, backgroundImage: "linear-gradient(180deg, oklch(0.88 0.20 310), oklch(0.72 0.22 340))" }}>
            <Counter to={10} duration={900} />+
          </div>
          <div style={statLabel}>AI models</div>
        </div>
        <div>
          <div style={{ ...statNum, backgroundImage: "linear-gradient(180deg, oklch(0.88 0.20 310), oklch(0.72 0.22 340))" }}>
            <Counter to={60} duration={1400} />s
          </div>
          <div style={statLabel}>Full audit</div>
        </div>
        <div>
          <div style={{ ...statNum, backgroundImage: "linear-gradient(180deg, oklch(0.88 0.20 310), oklch(0.72 0.22 340))" }}>
            Free
          </div>
          <div style={statLabel}>No card</div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: "auto" }}>
        <Link
          href="https://advertsgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            width: "100%", padding: "16px 20px", borderRadius: 14,
            border: "1px solid color-mix(in oklch, oklch(0.80 0.20 320) 40%, transparent)",
            background: "linear-gradient(92deg, oklch(0.56 0.22 290), oklch(0.62 0.26 330), oklch(0.72 0.22 350))",
            color: "white", fontWeight: 600, fontSize: 15, letterSpacing: "-0.005em",
            textDecoration: "none", overflow: "hidden",
            boxShadow: "0 1px 0 color-mix(in oklch, white 30%, transparent) inset, 0 18px 40px -12px oklch(0.55 0.25 320 / .55)",
          }}
        >
          <span style={shimmerSpan} />
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ position: "relative" }}>
            <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 L13 2 Z" fill="white" />
          </svg>
          <span style={{ position: "relative" }}>Check Your AI Score — Free</span>
        </Link>
        <div style={{ textAlign: "center" as const, marginTop: 12, fontSize: 12, color: "oklch(0.58 0.012 270)", fontFamily: "'Geist Mono', monospace" }}>
          <span style={{ color: "oklch(0.80 0.14 320)" }}>●</span> Free instant audit — takes 60 seconds
        </div>
      </div>
    </div>
  );
}

// ─── BannerGrowth (AWeber) ───────────────────────────────────────────────────
function BannerGrowth() {
  return (
    <div style={{
      position: "relative", borderRadius: 28, padding: "32px 28px",
      overflow: "hidden",
      background:
        "radial-gradient(120% 80% at 100% 0%, oklch(0.24 0.10 210 / .45), transparent 55%)," +
        "radial-gradient(120% 80% at 0% 100%, oklch(0.22 0.12 180 / .30), transparent 55%)," +
        "linear-gradient(180deg, oklch(0.16 0.02 230), oklch(0.12 0.02 240))",
      border: "1px solid color-mix(in oklch, white 10%, transparent)",
      boxShadow:
        "0 1px 0 0 color-mix(in oklch, white 12%, transparent) inset," +
        "0 40px 80px -30px oklch(0.10 0.10 220 / .6)",
      color: "oklch(0.97 0.005 270)",
      height: "100%", display: "flex", flexDirection: "column" as const,
    }}>
      {/* 500 FREE chip */}
      <div style={liveChip}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "oklch(0.80 0.18 150)", boxShadow: "0 0 8px oklch(0.80 0.18 150)" }} />
        500 FREE
      </div>

      {/* Eyebrow */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "7px 14px", borderRadius: 999,
        fontFamily: "'Geist Mono', monospace",
        fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" as const,
        color: "oklch(0.92 0.10 200)",
        background: "linear-gradient(90deg, oklch(0.30 0.12 220 / .45), oklch(0.28 0.10 190 / .35))",
        border: "1px solid color-mix(in oklch, oklch(0.80 0.16 200) 40%, transparent)",
        boxShadow: "0 0 30px -6px oklch(0.75 0.18 210 / .5)",
        alignSelf: "flex-start",
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: "oklch(0.85 0.16 180)", boxShadow: "0 0 10px oklch(0.85 0.16 180)", animation: "pulseDot 1.4s ease-in-out infinite" }} />
        FREE EMAIL MARKETING
      </div>

      {/* Feature pills */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 7, margin: "20px 0 22px" }}>
        {["Newsletters","Landing Pages","Automation","Sign-up Forms"].map((n) => (
          <span key={n} style={{
            padding: "6px 11px", borderRadius: 999,
            fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" as const,
            color: "oklch(0.88 0.02 230)",
            background: "color-mix(in oklch, white 4%, transparent)",
            border: "1px solid color-mix(in oklch, white 10%, transparent)",
          }}>{n}</span>
        ))}
      </div>

      {/* Headline */}
      <h2 style={{
        fontFamily: "'Geist', sans-serif",
        fontSize: 32, lineHeight: 1.08, fontWeight: 700,
        letterSpacing: "-0.02em", margin: "0 0 12px",
      }}>
        Your list is{" "}
        <em style={{
          backgroundImage: "linear-gradient(92deg, oklch(0.82 0.16 180), oklch(0.78 0.18 220), oklch(0.72 0.20 250))",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
          fontStyle: "italic",
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
        }}>leaking money</em>.
      </h2>

      <p style={{ color: "oklch(0.75 0.01 270)", fontSize: 14.5, lineHeight: 1.55, margin: "0 0 18px" }}>
        AWeber gives you everything to build and grow an email list —{" "}
        <strong style={{ color: "oklch(0.97 0.005 270)" }}>newsletters, landing pages, automation</strong>{" "}
        and 700+ templates.
      </p>

      {/* Live subscriber feed */}
      <div style={{ marginBottom: 20 }}>
        <SubscriberFeed />
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 20, marginBottom: 20, alignItems: "end" }}>
        <div>
          <div style={{ ...statNum, backgroundImage: "linear-gradient(180deg, oklch(0.90 0.14 190), oklch(0.72 0.18 230))" }}>
            <Counter to={500} />
          </div>
          <div style={statLabel}>Free subs</div>
        </div>
        <div>
          <div style={{ ...statNum, backgroundImage: "linear-gradient(180deg, oklch(0.90 0.14 190), oklch(0.72 0.18 230))" }}>
            <Counter to={700} />+
          </div>
          <div style={statLabel}>Templates</div>
        </div>
        <div>
          <div style={{ ...statNum, backgroundImage: "linear-gradient(180deg, oklch(0.90 0.14 190), oklch(0.72 0.18 230))" }}>
            Free
          </div>
          <div style={statLabel}>No card</div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: "auto" }}>
        <a
          href="https://www.aweber.com/easy-email.htm?id=502593"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            width: "100%", padding: "16px 20px", borderRadius: 14,
            border: "1px solid color-mix(in oklch, oklch(0.80 0.16 220) 40%, transparent)",
            background: "linear-gradient(92deg, oklch(0.58 0.16 200), oklch(0.64 0.20 225), oklch(0.72 0.16 185))",
            color: "white", fontWeight: 600, fontSize: 15, letterSpacing: "-0.005em",
            textDecoration: "none", overflow: "hidden",
            boxShadow: "0 1px 0 color-mix(in oklch, white 30%, transparent) inset, 0 18px 40px -12px oklch(0.55 0.20 210 / .55)",
          }}
        >
          <span style={shimmerSpan} />
          <svg width="16" height="14" viewBox="0 0 20 14" style={{ position: "relative" }}>
            <rect x="0.5" y="0.5" width="19" height="13" rx="2" fill="none" stroke="white" strokeWidth="1.5"/>
            <path d="M 1 2 L 10 8 L 19 2" fill="none" stroke="white" strokeWidth="1.5" />
          </svg>
          <span style={{ position: "relative" }}>Start Free — No Credit Card</span>
        </a>
        <div style={{ textAlign: "center" as const, marginTop: 12, fontSize: 12, color: "oklch(0.58 0.012 270)", fontFamily: "'Geist Mono', monospace" }}>
          <span style={{ color: "oklch(0.85 0.14 180)" }}>●</span> Free forever up to 500 subscribers
        </div>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function AdvertiseGPTBanner() {
  // Load Geist + Instrument Serif fonts once
  useEffect(() => {
    const fontId = "bnr-v2-fonts";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@1&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{ margin: "72px auto 0", maxWidth: 900, padding: "0 4px" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20,
        alignItems: "stretch",
      }}>
        <div
          className="bnr-wrap"
          style={{
            "--glowA": "oklch(0.70 0.26 320 / 0.9)",
            "--glowB": "oklch(0.72 0.22 285 / 0.9)",
            "--auraAnim": "auraDriftV",
          } as React.CSSProperties}
        >
          <div className="bnr-inner">
            <BannerRadar />
          </div>
        </div>
        <div
          className="bnr-wrap"
          style={{
            "--glowA": "oklch(0.75 0.18 205 / 0.9)",
            "--glowB": "oklch(0.70 0.20 235 / 0.9)",
            "--auraAnim": "auraDriftC",
          } as React.CSSProperties}
        >
          <div className="bnr-inner">
            <BannerGrowth />
          </div>
        </div>
      </div>
    </div>
  );
}
