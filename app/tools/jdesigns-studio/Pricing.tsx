import { Check, ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   WHOP CHECKOUT LINKS — paste your Whop product URLs here once created.
   Until a link is filled, its button points to "#". One place to edit.
   ──────────────────────────────────────────────────────────────────────── */
export const WHOP_LINKS = {
  selfUse: "https://whop.com/checkout/plan_E7y48vqdXAWO9",   // Studio Pass · Starter $29/mo checkout — used at the in-app UPGRADE prompt after the 5 free gens (the free trial itself is app-side, NOT a Whop product)
  power: "https://whop.com/checkout/plan_xleGyCKLW7YcM",     // Studio Pass · Power — $99/mo (hosted, ~$85 cost cap). Same Whop product as Starter; use its plan checkout URL (or reuse the product URL).
  ownSystem: "https://whop.com/checkout/plan_g2bzz1utiDpPa", // Done-For-You Campaign Manager — $1,000 one-time, own your system + bring your own keys
  affiliate: "", // Whop affiliate SIGNUP link for the $1,000 product (40% = $400/sale). Paste once Hermes returns it; empty → callout hidden.
};

const POSTLY_LINK = "https://poster.ly?atp=toolstack";

// generations someone gets before the paywall — enough to feel the "wow", cheap insurance against abuse
const FREE_GENERATIONS = 5;

type Tier = {
  key: string;
  eyebrow: string;
  name: string;
  tagline: string;
  price: string;
  per: string;
  highlight?: string;
  features: string[];
  ctaLabel: string;
  ctaLink: string;
  badge?: string;
  featured?: boolean;
  guarantee?: string;
};

const TIERS: Tier[] = [
  {
    key: "studio-pass",
    eyebrow: "Self-serve · monthly",
    name: "Studio Pass",
    tagline: "Create on-brand ads whenever you want — we host everything.",
    price: "$29",
    per: "/mo",
    highlight: `${FREE_GENERATIONS} free generations to start — no card`,
    features: [
      "Create as much as you want, all on your brand",
      "Nothing to install — runs in your browser",
      "Full campaigns, finished ads, Brand Book",
      "HD downloads + one-click Postly scheduling",
      "Cancel anytime",
    ],
    ctaLabel: "Start free",
    ctaLink: "/tools/jdesigns-studio", // free trial lives IN the app (5 gens, no card) — not a Whop paywall; WHOP_LINKS.selfUse is hit later at the in-app upgrade prompt
    badge: "Start here",
  },
  {
    key: "power",
    eyebrow: "Self-serve · monthly",
    name: "Power",
    tagline: "For heavy users who live in the studio.",
    price: "$99",
    per: "/mo",
    highlight: "Built for high-volume creators",
    features: [
      "Everything in Starter",
      "Far higher monthly usage",
      "Priority generation",
      "2K / 4K downloads + Animate",
      "Cancel anytime",
    ],
    ctaLabel: "Go Power",
    ctaLink: WHOP_LINKS.power,
    badge: "Power user",
  },
  {
    key: "own-system",
    eyebrow: "Own it · one-time",
    name: "Own Your Ad Studio",
    tagline: "Not a subscription — your own AI ad agency, yours to keep and resell.",
    price: "$1,000",
    per: " one-time",
    highlight: "$3,200+ value · no monthly fee, ever",
    features: [
      "Your own private studio on your keys — unlimited ads at pennies each",
      "We build & deploy the whole thing FOR you, fully branded",
      "Your first month of campaigns done-for-you — start with finished ads",
      "Full Brand Book PDF for your business",
      "White-label + resell rights — sell it to your own clients",
      "1:1 onboarding call + step-by-step video playbook",
      "🎁 Bonus: “First 3 Clients” playbook + proven ad swipe file",
      "🎁 Bonus: 90 days priority support",
    ],
    ctaLabel: "Own it for $1,000",
    ctaLink: WHOP_LINKS.ownSystem,
    badge: "Own the machine",
    featured: true,
    guarantee: "7-day guarantee: your studio live + first campaign produced within 7 days — or we keep working free until it is.",
  },
];

export function Pricing({
  primary = "#6C5CE7",
  ink = "#16131F",
  accent = "#F4B740",
}: {
  primary?: string;
  ink?: string;
  accent?: string;
}) {
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "8px 20px 48px" }}>
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 30px" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".18em", color: primary, textTransform: "uppercase", marginBottom: 10 }}>Pricing</div>
        <h2 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 34, fontWeight: 800, lineHeight: 1.1, color: ink }}>Use it monthly, or own it outright</h2>
        <p style={{ fontSize: 15.5, color: "#6B6456", marginTop: 12, lineHeight: 1.55 }}>
          Start free, then pay as you go on a simple monthly plan — or skip the subscription and own the whole system for life. Either way: pro, on-brand ads with no designer and no agency.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, alignItems: "stretch", maxWidth: 1100, margin: "0 auto" }}>
        {TIERS.map((t) => {
          const featured = t.featured;
          return (
            <div
              key={t.key}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                background: featured ? `linear-gradient(170deg, ${ink} 0%, ${primary} 145%)` : "#fff",
                color: featured ? "#fff" : ink,
                border: featured ? "none" : "1.5px solid #ECE7DC",
                borderRadius: 20,
                padding: "28px 26px 26px",
                boxShadow: featured ? `0 26px 56px -22px ${primary}` : "0 12px 30px -22px rgba(0,0,0,.3)",
              }}
            >
              {t.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    padding: "4px 9px",
                    borderRadius: 7,
                    background: featured ? accent : `${primary}1a`,
                    color: featured ? ink : primary,
                  }}
                >
                  {t.badge}
                </span>
              )}

              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: featured ? "rgba(255,255,255,.7)" : primary, marginBottom: 8 }}>{t.eyebrow}</div>
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Newsreader',Georgia,serif", lineHeight: 1.08 }}>{t.name}</div>
              <div style={{ fontSize: 14, fontStyle: "italic", color: featured ? "rgba(255,255,255,.86)" : "#6B6456", marginTop: 6, marginBottom: 18 }}>{t.tagline}</div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 6 }}>
                <span style={{ fontSize: 40, fontWeight: 800, fontFamily: "'Newsreader',Georgia,serif", lineHeight: 1 }}>{t.price}</span>
                <span style={{ fontSize: 14.5, fontWeight: 600, opacity: 0.7 }}>{t.per}</span>
              </div>
              {t.highlight && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, alignSelf: "flex-start", fontSize: 12.5, fontWeight: 700, padding: "5px 11px", borderRadius: 8, marginBottom: 18, background: featured ? "rgba(255,255,255,.14)" : `${primary}12`, color: featured ? "#fff" : primary }}>
                  ✦ {t.highlight}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {t.features.map((f) => (
                  <div key={f} style={{ display: "flex", gap: 9, fontSize: 13.5, lineHeight: 1.45, color: featured ? "rgba(255,255,255,.9)" : "#3B362E" }}>
                    <Check size={16} strokeWidth={2.6} style={{ flexShrink: 0, marginTop: 1, color: featured ? accent : primary }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {t.guarantee && (
                <div style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 12.5, lineHeight: 1.45, fontWeight: 600, padding: "11px 13px", borderRadius: 11, marginBottom: 18, background: featured ? "rgba(255,255,255,.12)" : `${accent}1e`, color: featured ? "#fff" : "#3B362E" }}>
                  <span style={{ flexShrink: 0 }}>🛡️</span><span>{t.guarantee}</span>
                </div>
              )}

              <a
                href={t.ctaLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  height: 52,
                  borderRadius: 12,
                  background: featured ? "#fff" : primary,
                  color: featured ? ink : "#fff",
                  fontSize: 15,
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: featured ? "0 10px 24px -10px rgba(0,0,0,.45)" : `0 10px 24px -10px ${primary}`,
                }}
              >
                {t.ctaLabel} <ArrowRight size={17} />
              </a>
            </div>
          );
        })}
      </div>

      {/* anchor: monthly → own it */}
      <div style={{ textAlign: "center", maxWidth: 620, margin: "22px auto 0", fontSize: 13.5, color: "#6B6456", lineHeight: 1.55 }}>
        An agency charges <strong style={{ color: ink }}>$2,000–$5,000 every month, forever.</strong> Owning your studio is <strong style={{ color: ink }}>$1,000 once</strong> — you keep the machine that makes the ads, run unlimited campaigns on your own keys, and can even resell it to your own clients. Start on $29/mo to try it; own it the moment you&apos;re serious.
        <div style={{ marginTop: 8 }}>
          Every plan schedules straight to your channels with{" "}
          <a href={POSTLY_LINK} target="_blank" rel="noopener noreferrer sponsored" style={{ color: primary, fontWeight: 700, textDecoration: "none" }}>Postly</a>.
        </div>
      </div>

      {/* affiliate recruitment — only renders once the signup link is set */}
      {WHOP_LINKS.affiliate && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", maxWidth: 760, margin: "26px auto 0", padding: "16px 22px", borderRadius: 14, border: `1px dashed ${primary}55`, background: `${primary}08` }}>
          <div style={{ fontSize: 14, color: "#4B4636", lineHeight: 1.5 }}>
            <strong style={{ color: ink }}>Earn $400 per sale.</strong> Refer the Done-For-You Campaign Manager and keep <strong style={{ color: ink }}>40%</strong> of every $1,000 sale.
          </div>
          <a
            href={WHOP_LINKS.affiliate}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 42, padding: "0 18px", borderRadius: 10, background: ink, color: "#fff", fontSize: 13.5, fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Become an affiliate <ArrowRight size={16} />
          </a>
        </div>
      )}
    </section>
  );
}
