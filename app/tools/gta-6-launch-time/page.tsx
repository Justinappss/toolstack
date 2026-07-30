"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";

/* ── Brand accents (original neon-dusk palette, inverse of the cost
      calculator — not Rockstar trade dress) ── */
const ACCENT = "#22d3ee";
const ACCENT_DIM = "rgba(34,211,238,0.1)";
const ACCENT_BORDER = "rgba(34,211,238,0.25)";
const PINK = "#ff2e88";
const PINK_DIM = "rgba(255,46,136,0.1)";
const PINK_BORDER = "rgba(255,46,136,0.25)";

/* ── Verified facts. Release date + pre-load date are Rockstar-confirmed.
      Unlock TIME is NOT confirmed — we assume midnight local time per zone,
      the usual pattern for major console launches, and label it "expected"
      everywhere it appears. ── */
const RELEASE_DATE = { y: 2026, m: 11, d: 19 };
const PRELOAD_DATE = { y: 2026, m: 11, d: 12 };

/* ── Timezone math ──────────────────────────────────────────────────────
   Compute the UTC instant of local midnight in an arbitrary IANA zone
   without hand-rolling any fixed offset. We ask Intl.DateTimeFormat what
   wall-clock time a given UTC instant shows in that zone, diff it against
   that instant to get the zone's offset at that moment, then invert it to
   find the UTC instant whose local wall-clock in that zone is midnight.
   Iterating twice settles the value correctly even right around a DST
   transition. ── */
function timeZoneOffsetMs(date: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts: Record<string, string> = {};
  for (const p of dtf.formatToParts(date)) {
    if (p.type !== "literal") parts[p.type] = p.value;
  }
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return asUTC - date.getTime();
}

function zonedMidnightUtcMs(year: number, month: number, day: number, timeZone: string): number {
  let guess = Date.UTC(year, month - 1, day, 0, 0, 0);
  for (let i = 0; i < 2; i++) {
    const offset = timeZoneOffsetMs(new Date(guess), timeZone);
    guess = Date.UTC(year, month - 1, day, 0, 0, 0) - offset;
  }
  return guess;
}

/* ── Zone catalogue. DEFAULT_TZ (London) is the SSR-safe first render —
      the user's real zone is detected client-side in an effect so the
      server and first client paint always match. ── */
type ZoneInfo = { tz: string; city: string };

const ZONES: ZoneInfo[] = [
  { tz: "Pacific/Auckland", city: "Auckland" },
  { tz: "Australia/Sydney", city: "Sydney" },
  { tz: "Asia/Tokyo", city: "Tokyo" },
  { tz: "Asia/Shanghai", city: "Shanghai" },
  { tz: "Asia/Kolkata", city: "Mumbai / Delhi" },
  { tz: "Asia/Dubai", city: "Dubai" },
  { tz: "Europe/Moscow", city: "Moscow" },
  { tz: "Europe/Berlin", city: "Berlin" },
  { tz: "Europe/London", city: "London" },
  { tz: "Atlantic/Reykjavik", city: "Reykjavik" },
  { tz: "America/Sao_Paulo", city: "São Paulo" },
  { tz: "America/New_York", city: "New York" },
  { tz: "America/Chicago", city: "Chicago" },
  { tz: "America/Denver", city: "Denver" },
  { tz: "America/Los_Angeles", city: "Los Angeles" },
  { tz: "Pacific/Honolulu", city: "Honolulu" },
];

const DEFAULT_TZ = "Europe/London";

/* Precomputed once at module load — deterministic given fixed dates and
   zone strings, so identical on server and client (no "now" involved). */
const ZONE_ROWS = ZONES
  .map(z => ({
    ...z,
    unlockMs: zonedMidnightUtcMs(RELEASE_DATE.y, RELEASE_DATE.m, RELEASE_DATE.d, z.tz),
    preloadMs: zonedMidnightUtcMs(PRELOAD_DATE.y, PRELOAD_DATE.m, PRELOAD_DATE.d, z.tz),
  }))
  .sort((a, b) => a.unlockMs - b.unlockMs);

function fmtDateTime(ms: number, zone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(ms));
}

function fmtHourDiff(hours: number, isSelf: boolean): string {
  if (Math.abs(hours) < 0.01) return isSelf ? "Same as you" : "Same time";
  /* Snap to the nearest minute (kills floating-point noise) and express as
     hours + minutes so quarter/half-hour offsets — e.g. Kathmandu's +5:45 —
     render exactly instead of being rounded to one decimal place. */
  const totalMinutes = Math.round(hours * 60);
  const absMinutes = Math.abs(totalMinutes);
  const wholeHours = Math.floor(absMinutes / 60);
  const mins = absMinutes % 60;
  const sign = totalMinutes > 0 ? "+" : "−";
  return mins === 0 ? `${sign}${wholeHours}h` : `${sign}${wholeHours}h ${mins}m`;
}

function fmtUtcInstant(ms: number): string {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts: Record<string, string> = {};
  for (const p of dtf.formatToParts(new Date(ms))) {
    if (p.type !== "literal") parts[p.type] = p.value;
  }
  return `${parts.day} ${parts.month}, ${parts.hour}:${parts.minute} UTC`;
}

export default function Gta6LaunchTime() {
  const [tz, setTz] = useState<string>(DEFAULT_TZ);
  const [nowMs, setNowMs] = useState<number | null>(null);

  /* Detect the user's real timezone after mount only — never during the
     first render, or the server/client HTML would mismatch. The detection
     itself is pushed into a callback (rather than called synchronously in
     the effect body) so it reads as "subscribe, then setState in a
     callback" rather than an effect that sets state outright. */
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (detected) setTz(detected);
      } catch {
        // keep DEFAULT_TZ
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  /* Live clock, also only started after mount for the same reason. */
  useEffect(() => {
    const tick = () => setNowMs(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const zoneOptions = useMemo(() => {
    if (ZONES.some(z => z.tz === tz)) return ZONES;
    const label = tz.split("/").pop()?.replace(/_/g, " ") ?? tz;
    return [{ tz, city: label }, ...ZONES];
  }, [tz]);

  /* Rows for the "who gets it first" table. Built-in zones are precomputed
     in ZONE_ROWS; if the user's detected zone isn't one of them, append a
     row for it so the user always sees their own row in the table too. */
  const tableRows = useMemo(() => {
    if (ZONES.some(z => z.tz === tz)) return ZONE_ROWS;
    const label = tz.split("/").pop()?.replace(/_/g, " ") ?? tz;
    const extra = {
      tz,
      city: label,
      unlockMs: zonedMidnightUtcMs(RELEASE_DATE.y, RELEASE_DATE.m, RELEASE_DATE.d, tz),
      preloadMs: zonedMidnightUtcMs(PRELOAD_DATE.y, PRELOAD_DATE.m, PRELOAD_DATE.d, tz),
    };
    return [...ZONE_ROWS, extra].sort((a, b) => a.unlockMs - b.unlockMs);
  }, [tz]);

  const selectedUnlockMs = useMemo(
    () => zonedMidnightUtcMs(RELEASE_DATE.y, RELEASE_DATE.m, RELEASE_DATE.d, tz),
    [tz]
  );
  const selectedPreloadMs = useMemo(
    () => zonedMidnightUtcMs(PRELOAD_DATE.y, PRELOAD_DATE.m, PRELOAD_DATE.d, tz),
    [tz]
  );

  const countdown = useMemo(() => {
    if (nowMs === null) return null;
    const diff = selectedUnlockMs - nowMs;
    if (diff <= 0) return { unlocked: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      unlocked: false,
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [nowMs, selectedUnlockMs]);

  /* ── Schema ── */
  const faqs = [
    {
      q: "When does GTA 6 come out, and what time will it unlock for me?",
      a: "GTA 6 releases on 19 November 2026 for PlayStation 5 and Xbox Series X|S. Rockstar has not confirmed exact unlock mechanics, so this tool shows the expected unlock — midnight local time in your selected timezone, the usual pattern for major console launches. Treat it as an estimate until Rockstar confirms.",
    },
    {
      q: "Is this unlock time officially confirmed by Rockstar?",
      a: "No. Rockstar has only confirmed the release date (19 November 2026) and the digital pre-load date (12 November 2026) — it has not said how the game unlocks region by region. Midnight local time is the usual pattern for major console launches, not a confirmed promise. Check the official PlayStation Store or Xbox listing closer to launch for the real mechanic.",
    },
    {
      q: "Who gets GTA 6 first around the world?",
      a: "If GTA 6 follows the midnight-local pattern most major console launches use, players in timezones furthest east — like Auckland and Sydney — reach their local midnight first in absolute time, so they'd unlock the game before players in the Americas. The table on this page orders every major timezone by when its local midnight actually falls.",
    },
    {
      q: "What is pre-load, and when does it start?",
      a: "Pre-load lets you download GTA 6 before launch so it's ready to play the moment it unlocks, without a day-one download. Rockstar has confirmed digital pre-load opens on 12 November 2026, a week ahead of the 19 November release.",
    },
    {
      q: "What if Rockstar does a single global unlock instead of per-timezone midnight?",
      a: "It's possible — some publishers unlock every region simultaneously at one UTC moment instead of local midnight. If Rockstar does that, the times on this page won't match reality. Nothing here is official; always confirm the exact unlock time on the PlayStation Store or Xbox listing as launch approaches.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "GTA 6 Launch Time",
        url: "https://toolstack.tech/tools/gta-6-launch-time",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "See the expected GTA 6 unlock moment in your own timezone, a live countdown, and which regions get the game first — unlock mechanics not yet confirmed by Rockstar.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@type": "Organization", name: "ToolStack", url: "https://toolstack.tech" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ToolStack", item: "https://toolstack.tech" },
          { "@type": "ListItem", position: 2, name: "Gaming", item: "https://toolstack.tech/tools/category/gaming" },
          { "@type": "ListItem", position: 3, name: "GTA 6 Launch Time", item: "https://toolstack.tech/tools/gta-6-launch-time" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(f => ({
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
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 15,
    color: "white",
    fontFamily: "inherit",
    outline: "none",
  };

  const countdownBoxStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: "14px 8px",
    textAlign: "center",
    flex: 1,
    minWidth: 64,
  };
  const countdownNumStyle: React.CSSProperties = {
    fontSize: "clamp(22px, 5vw, 34px)",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1,
  };
  const countdownLabelStyle: React.CSSProperties = {
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    marginTop: 6,
  };

  const pad2 = (n: number) => String(n).padStart(2, "0");

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "8%", width: 620, height: 620, background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "45%", right: "-12%", width: 520, height: 520, background: "radial-gradient(circle, rgba(255,46,136,0.09) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 36, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools/category/gaming" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Gaming</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>GTA 6 Launch Time</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {["19 Nov 2026", "Expected — Not Confirmed", "PS5 & Xbox Series X|S", "Free Forever"].map(b => (
              <span key={b} style={{ fontSize: 12, fontWeight: 700, color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 999, padding: "4px 12px" }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            GTA 6{" "}
            <span style={{ background: `linear-gradient(135deg, ${ACCENT}, ${PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Launch Time
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 640, margin: "0 0 18px" }}>
            GTA 6 unlocks 19 November 2026 — but Rockstar hasn&apos;t said exactly when in your timezone. This shows the expected unlock moment, a live countdown, and who gets it first worldwide.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: PINK_DIM, border: `1px solid ${PINK_BORDER}`, borderRadius: 12, padding: "10px 18px" }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "white" }}>Unlock mechanics are not confirmed</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>We assume midnight local time, the usual pattern for major console launches — confirm nearer the date</div>
            </div>
          </div>
        </div>

        {/* ── Tool ── */}
        <div style={cardStyle}>

          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle} htmlFor="timezone">Your timezone</label>
            <select
              id="timezone"
              value={tz}
              onChange={e => setTz(e.target.value)}
              style={inputStyle}
            >
              {zoneOptions.map(z => (
                <option key={z.tz} value={z.tz}>{z.city} — {z.tz}</option>
              ))}
            </select>
          </div>

          {/* Unlock moment */}
          <div style={{ background: `linear-gradient(135deg, ${ACCENT_DIM}, ${PINK_DIM})`, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 14, padding: "22px 22px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
              Expected unlock in your timezone
            </div>
            <div style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 4, fontVariantNumeric: "tabular-nums" }}>
              {fmtDateTime(selectedUnlockMs, tz)}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
              Pre-load opens: <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtDateTime(selectedPreloadMs, tz)}</span>
            </div>
          </div>

          {/* Countdown */}
          <div style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>
              Live countdown
            </div>
            {countdown && countdown.unlocked ? (
              <div style={{ fontSize: 18, fontWeight: 800, color: ACCENT }}>It&apos;s launch day — GTA 6 should be unlocking now.</div>
            ) : (
              <div style={{ display: "flex", gap: 10 }}>
                <div style={countdownBoxStyle}>
                  <div style={countdownNumStyle}>{countdown ? countdown.days : "—"}</div>
                  <div style={countdownLabelStyle}>Days</div>
                </div>
                <div style={countdownBoxStyle}>
                  <div style={countdownNumStyle}>{countdown ? pad2(countdown.hours) : "—"}</div>
                  <div style={countdownLabelStyle}>Hours</div>
                </div>
                <div style={countdownBoxStyle}>
                  <div style={countdownNumStyle}>{countdown ? pad2(countdown.minutes) : "—"}</div>
                  <div style={countdownLabelStyle}>Minutes</div>
                </div>
                <div style={countdownBoxStyle}>
                  <div style={countdownNumStyle}>{countdown ? pad2(countdown.seconds) : "—"}</div>
                  <div style={countdownLabelStyle}>Seconds</div>
                </div>
              </div>
            )}
          </div>

          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: "16px 0 0" }}>
            Release date (19 Nov 2026) and pre-load date (12 Nov 2026) are Rockstar-confirmed. The unlock time shown is our expectation of midnight local time, not a promise — Rockstar could instead unlock every region at one simultaneous global moment.
          </p>
        </div>

        {/* ── Who gets it first ── */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 6px" }}>Who gets it first</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 8px" }}>
            Ordered by when local midnight actually occurs in absolute time — assuming the midnight-local pattern holds.
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: "0 0 16px" }}>
            Unlock time is shown in UTC so every row is directly comparable. In &ldquo;Vs. your time&rdquo;, − means that city unlocks before you, + means after.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
              <thead>
                <tr>
                  {["City", "Unlock instant (UTC)", "Vs. your time"].map(h => (
                    <th key={h} style={{ textAlign: "left", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", padding: "0 12px 10px 0", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map(row => {
                  const isSelf = row.tz === tz;
                  const hoursDiff = (row.unlockMs - selectedUnlockMs) / 3600000;
                  return (
                    <tr
                      key={row.tz}
                      style={{
                        background: isSelf ? ACCENT_DIM : "transparent",
                        border: isSelf ? `1px solid ${ACCENT_BORDER}` : "1px solid transparent",
                      }}
                    >
                      <td style={{ padding: "10px 12px 10px 0", fontSize: 14.5, fontWeight: isSelf ? 800 : 500, color: isSelf ? "white" : "rgba(255,255,255,0.8)", whiteSpace: "nowrap" }}>
                        {row.city}{isSelf ? " (you)" : ""}
                      </td>
                      <td style={{ padding: "10px 12px 10px 0", fontSize: 13.5, color: "rgba(255,255,255,0.7)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                        {fmtUtcInstant(row.unlockMs)}
                      </td>
                      <td style={{ padding: "10px 0", fontSize: 13.5, fontWeight: 700, color: isSelf ? ACCENT : "rgba(255,255,255,0.6)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                        {fmtHourDiff(hoursDiff, isSelf)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 18px" }}>FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {faqs.map(f => (
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
          Unlock times shown are our estimate, not an official Rockstar announcement.
        </p>

        <MoreTools currentSlug="gta-6-launch-time" />
        <AdvertiseGPTBanner />
      </div>
    </div>
  );
}
