import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

const FAQS = [
    {
        question: "What are the official Pokémon TCG Pocket pull rates?",
        answer: "Pokémon TCG Pocket publishes pull rates officially inside the app under the Pack Points tab. Per 5-card pack: ex cards 5.000%, Art Rare 2.572%, Super Rare 0.500%, Immersive Rare 0.222%, Crown Rare 0.040%, God Pack 0.050%. These are the exact rates used in the ToolStack Pokémon TCG Pocket pull calculator.",
    },
    {
        question: "How many packs do you need to pull a Crown Rare in Pokémon TCG Pocket?",
        answer: "Using the binomial probability formula on the official 0.040% Crown Rare rate: you need 1,733 packs for a 50% chance and 5,756 packs for a 90% chance of pulling at least one Crown Rare. At 2 free packs per day, that's 867 days (2.4 years) for a coin-flip chance. Use the free pull rate calculator at toolstack.tech/tools/pokemon-tcg-pocket-pull-calculator to run your own targets.",
    },
    {
        question: "What is the God Pack rate in Pokémon TCG Pocket?",
        answer: "The official God Pack rate in Pokémon TCG Pocket is 0.050% per pack — that's 1 in every 2,000 packs. A God Pack is a special pack where all 5 cards are rare or higher. You need 1,386 packs for a 50% probability and 4,605 packs for 90% probability of pulling one.",
    },
    {
        question: "How does the pity system work in Pokémon TCG Pocket?",
        answer: "Pokémon TCG Pocket guarantees a ◆◆◆◆ (Diamond 4) ex card or better every 10 packs from the same set. This is a minimum floor — it doesn't affect the probability of pulling Crown Rares, God Packs, Immersive Rares or Super Rares. The pity counter resets when you switch to a different pack set. It only tracks packs opened from the same set.",
    },
    {
        question: "How do I calculate my pull probability in Pokémon TCG Pocket?",
        answer: "The formula is P(at least 1) = 1 − (1 − rate)^packs. For example, opening 100 packs at a 5% ex rate: 1 − (0.95)^100 = 99.4% probability. For rarer cards like Crown Rare (0.040%), 100 packs gives only 3.9%. The free Pokémon TCG Pocket pull calculator at toolstack.tech handles this formula automatically — enter your packs or target probability and get instant results.",
    },
    {
        question: "What is the Immersive Rare drop rate in Pokémon TCG Pocket?",
        answer: "The official Immersive Rare rate is 0.222% per pack — roughly 1 in every 450 packs. For a 50% probability you need 312 packs; for 90% you need 1,038 packs. On the free daily 2-pack track that's 156 days for a coin-flip chance.",
    },
    {
        question: "Is it worth spending money on Pokémon TCG Pocket packs?",
        answer: "It depends entirely on which rarity you're targeting. ex cards (5.00%) and Art Rares (2.572%) are very achievable free-to-play — you'd expect an ex within 14 packs and an Art Rare within 27. Super Rares require more patience (~139 packs for 50%). Crown Rares and God Packs require 1,700+ packs for even a 50% chance — at approximately $1 per pack, that's over $1,700 to flip a coin on a Crown Rare. Use the calculator to decide based on your specific target.",
    },
    {
        question: "Do pull rates reset between sets in Pokémon TCG Pocket?",
        answer: "The pull rates themselves are fixed per rarity and don't change between sets. The pity system counter does reset when you switch pack sets — your 10-pack pity guarantee only tracks packs from the same set. Splitting your packs between multiple sets therefore resets each pity counter separately.",
    },
];

const accent = "#6366f1";
const accentLight = "#a5b4fc";   // lighter indigo — passes contrast on dark bg
const accentBtn = "#4f46e5";     // darker indigo — white text passes 4.5:1 on this
const accentBg = "rgba(99,102,241,0.06)";
const accentBorder = "rgba(99,102,241,0.18)";

const h2Style: React.CSSProperties = {
    fontSize: "clamp(20px,3vw,26px)",
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.02em",
    margin: "52px 0 16px",
    lineHeight: 1.2,
};

const pStyle: React.CSSProperties = { margin: "0 0 22px" };

const PULL_RATES = [
    { rarity: "◆◆◆◆ ex", rate: "5.000%", oneIn: "20 packs", packs50: "14 packs", packs90: "46 packs", ftp50: "7 days", ftp90: "23 days" },
    { rarity: "☆ Art Rare", rate: "2.572%", oneIn: "39 packs", packs50: "27 packs", packs90: "90 packs", ftp50: "14 days", ftp90: "45 days" },
    { rarity: "☆☆ Super Rare", rate: "0.500%", oneIn: "200 packs", packs50: "139 packs", packs90: "461 packs", ftp50: "70 days", ftp90: "231 days" },
    { rarity: "☆☆☆ Immersive", rate: "0.222%", oneIn: "450 packs", packs50: "312 packs", packs90: "1,038 packs", ftp50: "156 days", ftp90: "519 days" },
    { rarity: "✦ God Pack", rate: "0.050%", oneIn: "2,000 packs", packs50: "1,386 packs", packs90: "4,605 packs", ftp50: "693 days", ftp90: "2,303 days" },
    { rarity: "♛ Crown Rare", rate: "0.040%", oneIn: "2,500 packs", packs50: "1,733 packs", packs90: "5,756 packs", ftp50: "867 days", ftp90: "2,878 days" },
];

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Pokémon TCG Pocket Pull Rates Explained: Crown Rare, God Pack & Every Rarity"
                description="The official Pokémon TCG Pocket pull rates decoded. How many packs you need for Crown Rare, God Pack, Immersive Rare and every rarity — with a free pull probability calculator."
                url="https://toolstack.tech/blog/pokemon-tcg-pocket-pull-rates"
                datePublished="2026-05-26"
                dateModified="2026-05-26"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.65)" }}>Pokémon TCG Pocket Pull Rates</span>
                    </div>

                    {/* Tag + date */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accentLight, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Collectibles</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>May 26, 2026 · 10 min read</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        Pokémon TCG Pocket Pull Rates Explained: Crown Rare, God Pack &amp; Every Rarity
                    </h1>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                        <img src="/images/justin-pirrie-headshot.png" alt="Justin Pirrie" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>Founder, ToolStack · May 26, 2026</p>
                        </div>
                    </div>

                    {/* Hero banner */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                        <img
                            src="/blog/pokemon-tcg-pocket-pull-rates/hero-banner.png"
                            alt="Pokémon TCG Pocket Pull Rates — Crown Rare to God Pack"
                            style={{ width: "100%", height: "auto", display: "block" }}
                            loading="eager"
                        />
                    </div>

                </div>
            </div>

            {/* Body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* Direct answer */}
                <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: "0 0 32px", fontWeight: 500 }}>
                    <strong style={{ color: "white" }}>Pokémon TCG Pocket pull rates are published officially in-game</strong> under the Pack Points tab. The top-line numbers: ex cards pull at 5.000%, Art Rares at 2.572%, Super Rares at 0.500%, Immersive Rares at 0.222%, God Packs at 0.050%, and Crown Rares at 0.040%. What those percentages mean for your actual pack count is a different question — and the answer to some of them is genuinely surprising. Use the{" "}
                    <Link href="/tools/pokemon-tcg-pocket-pull-calculator" style={{ color: accent, textDecoration: "underline" }}>free Pokémon TCG Pocket pull calculator</Link>{" "}
                    to run your own numbers instantly.
                </p>

                {/* Inline CTA */}
                <div style={{ margin: "0 0 40px", padding: "24px 28px", borderRadius: 16, background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", flexDirection: "column", gap: 12 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>Calculate your exact pull odds — free, no signup</p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: 0 }}>Enter how many packs you're opening or set a target probability — get results for every rarity in seconds.</p>
                    <Link href="/tools/pokemon-tcg-pocket-pull-calculator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: accentBtn, color: "white", fontSize: 14, fontWeight: 800, textDecoration: "none", width: "fit-content" }}>
                        Try the Pull Calculator Free →
                    </Link>
                </div>

                {/* Key Takeaways */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accentLight, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 16px" }}>Key Takeaways</p>
                    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12, counterReset: "summary" }}>
                        {[
                            "Crown Rare (0.040%) and God Pack (0.050%) are in a completely different tier — you need 1,733 and 1,386 packs respectively for a 50% probability.",
                            "ex cards and Art Rares are achievable F2P within weeks — the free 2-pack daily limit gets you to a 50% ex chance in just 7 days.",
                            "The pity system (guaranteed ◆◆◆◆ every 10 packs per set) helps at the low end but does nothing for Crown Rares or God Packs.",
                            "A specific Crown Rare from a set with 3 Crown Rares has a real rate of ~0.013% — roughly 1 in 7,500 packs.",
                        ].map((item, i) => (
                            <li key={i} style={{ display: "flex", gap: 14, fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                                <span style={{ fontWeight: 900, color: accentLight, flexShrink: 0, fontSize: 15 }}>{i + 1}.</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Audio player */}
                <div style={{ margin: "0 0 32px", padding: "20px 24px", borderRadius: 16, background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)" }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: accentLight, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>🎙 Listen to this article</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 12px" }}>Pokémon TCG Pocket Pull Rates — NotebookLM Audio Overview</p>
                    <audio controls style={{ width: "100%", borderRadius: 8, accentColor: accent }}>
                        <source src="/blog/pokemon-tcg-pocket-pull-rates/pokemon-pull-rates-podcast.m4a" type="audio/mp4" />
                    </audio>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    {/* Official rates table */}
                    <h2 style={h2Style}>The Official Pokémon TCG Pocket Pull Rates</h2>
                    <p style={pStyle}>
                        These rates are sourced directly from Pokémon TCG Pocket's in-app disclosure under Pack Points. They apply per 5-card pack and don't change based on how many packs you've previously opened — each pack is an independent event.
                    </p>

                    <div style={{ overflowX: "auto", margin: "0 0 12px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accentLight, fontWeight: 700, textAlign: "left" }}>Rarity</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" }}>Official Rate</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", fontWeight: 700, textAlign: "left" }}>1 in...</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", fontWeight: 700, textAlign: "left" }}>Packs for 50%</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", fontWeight: 700, textAlign: "left" }}>Packs for 90%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PULL_RATES.map((r, i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap" }}>{r.rarity}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accentLight, fontWeight: 700, fontSize: 13 }}>{r.rate}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{r.oneIn}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{r.packs50}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{r.packs90}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "0 0 28px" }}>
                        Source: Official Pokémon TCG Pocket in-game pack rate disclosure. Probability calculations use P(at least 1) = 1 − (1 − rate)^n.
                    </p>

                    {/* Infographic #1 — static */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 12px 32px rgba(0,0,0,0.3)" }}>
                        <img
                            src="/blog/pokemon-tcg-pocket-pull-rates/infographic-pack-odds.png"
                            alt="Pokémon TCG Pocket pull rates infographic — rarity hierarchy, Crown Rare 0.04%, Immersive Rare 0.222%, God Pack 0.05%, ex 5%, pity system and target card difficulty explained"
                            style={{ width: "100%", height: "auto", display: "block" }}
                            loading="lazy"
                        />
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>Save this — full pull rate hierarchy with pity system and specific card difficulty</p>
                    </div>

                    {/* The exponential gap */}
                    <h2 style={h2Style}>The Number That Changes How You Think About Pull Rates</h2>
                    <p style={pStyle}>
                        Crown Rare is <strong style={{ color: "white" }}>125× rarer than an ex card</strong>. Put another way: in the time it takes to reach a 90% Crown Rare probability (5,756 packs), you would statistically pull approximately 288 ex cards along the way. The game is designed so that the common-to-medium rarities feel accessible — they are — while the top-tier rarities remain genuinely rare.
                    </p>
                    <p style={pStyle}>
                        The gap between God Pack (0.050%) and Crown Rare (0.040%) is small in percentage terms but both land in the same practical tier: most players will never pull one without significant investment. The YouTube video below walks through what these numbers mean in real pack-count and cost terms.
                    </p>

                    {/* YouTube embed */}
                    <div style={{ margin: "32px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "16/9", position: "relative" }}>
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/iO7YXjG0fPk"
                            title="Pokémon TCG Pocket Pull Rates Explained — Crown Rare, God Pack & Every Rarity Odds"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                        />
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textAlign: "center", margin: "-20px 0 32px" }}>Full pull rate breakdown — what the official numbers actually mean for your pack count</p>

                    {/* Animated infographic 1 */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <video autoPlay loop muted playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/pokemon-tcg-pocket-pull-rates/infographic-animated.mp4" type="video/mp4" />
                        </video>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>Pull rate odds visualised — every rarity tier</p>
                    </div>

                    {/* How probability works */}
                    <h2 style={h2Style}>How Pack Probability Actually Works</h2>
                    <p style={pStyle}>
                        The key formula is: <strong style={{ color: "white" }}>P(at least 1) = 1 − (1 − rate)^packs</strong>. This is the binomial probability formula — it tells you the chance of pulling a card at least once across a given number of packs.
                    </p>
                    <p style={pStyle}>
                        For the ex rate of 5%: open 14 packs and you have a 51% chance of pulling at least one. Open 46 packs and that rises to 90%. This is why ex cards feel frequent — a couple of weeks of free daily packs and you're statistically likely to have pulled one.
                    </p>
                    <p style={pStyle}>
                        For Crown Rare at 0.040%: open 100 packs and you have a 3.9% chance. Open 500 packs and you're at 18.1%. You need 1,733 packs to reach even a 50% probability. The maths doesn't lie — and it explains why God Pack viral videos feel so extraordinary. They are.
                    </p>
                    <p style={pStyle}>
                        Critically, <strong style={{ color: "white" }}>each pack is independent</strong>. Opening 1,000 packs without a Crown Rare doesn't increase your odds on pack 1,001. The probability resets every single time. This is the gambler's fallacy in action — feeling like you're "due" a rare pull doesn't make it more likely.
                    </p>

                    {/* F2P track */}
                    <h2 style={h2Style}>The Free-to-Play Track: What You Can Pull on 2 Packs Per Day</h2>
                    <p style={pStyle}>
                        Pokémon TCG Pocket gives every player 2 free packs every 24 hours. Here's what the daily grind looks like in terms of probability milestones:
                    </p>

                    <div style={{ overflowX: "auto", margin: "0 0 40px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accentLight, fontWeight: 700, textAlign: "left" }}>Target Rarity</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontWeight: 700, textAlign: "left" }}>Days to 50% (F2P)</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontWeight: 700, textAlign: "left" }}>Days to 90% (F2P)</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontWeight: 700, textAlign: "left" }}>Verdict</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["◆◆◆◆ ex", "7 days", "23 days", "✅ Very achievable"],
                                    ["☆ Art Rare", "14 days", "45 days", "✅ Achievable"],
                                    ["☆☆ Super Rare", "70 days", "231 days", "⚠️ Takes patience"],
                                    ["☆☆☆ Immersive", "156 days", "519 days", "⚠️ Long grind"],
                                    ["✦ God Pack", "693 days", "2,303 days", "❌ Practically never F2P"],
                                    ["♛ Crown Rare", "867 days", "2,878 days", "❌ Practically never F2P"],
                                ].map(([rarity, d50, d90, verdict], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 600, fontSize: 13 }}>{rarity}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{d50}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{d90}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: verdict.startsWith("✅") ? "#4ade80" : verdict.startsWith("⚠️") ? "#fbbf24" : "rgba(255,100,100,0.9)", fontSize: 13, fontWeight: 600 }}>{verdict}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Animated infographic 2 */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <video autoPlay loop muted playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/pokemon-tcg-pocket-pull-rates/infographic-animated-2.mp4" type="video/mp4" />
                        </video>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>Free-to-play timeline — how long each rarity takes on daily packs</p>
                    </div>

                    {/* Pity system */}
                    <h2 style={h2Style}>The Pity System: What It Does (and Doesn't) Guarantee</h2>
                    <p style={pStyle}>
                        Pokémon TCG Pocket's pity system guarantees a ◆◆◆◆ ex or higher card every 10 packs from the same set. This is a genuine help for building a playable collection — over 100 packs you're guaranteed at least 10 ex cards from pity alone, regardless of your luck.
                    </p>
                    <p style={pStyle}>
                        What it doesn't do: the pity system has no effect on Super Rare, Immersive Rare, Crown Rare, or God Pack pulls. Those remain fully governed by their independent per-pack probability. There is no secondary pity for rarer cards — only the base ◆◆◆◆ floor.
                    </p>
                    <p style={pStyle}>
                        Important: the pity counter tracks packs from a single set. Opening 5 packs from Set A and 5 packs from Set B does not trigger the Set A pity. Each set has its own independent 10-pack counter. If you're trying to efficiently use pity, pick one set and stay with it.
                    </p>

                    {/* Specific card problem */}
                    <h2 style={h2Style}>The Specific Card Problem</h2>
                    <p style={pStyle}>
                        The pull rates above are for <em>any</em> card at that rarity. If you're hunting a specific Crown Rare — say, one particular card in a set that contains three Crown Rares — divide the probability by three.
                    </p>
                    <p style={pStyle}>
                        A specific Crown Rare in a 3-Crown set: 0.040% ÷ 3 = <strong style={{ color: "white" }}>0.013%</strong>. That's roughly 1 in 7,500 packs. For a 90% chance of that specific card you'd need approximately 17,700 packs.
                    </p>
                    <p style={pStyle}>
                        The{" "}
                        <Link href="/tools/pokemon-tcg-pocket-pull-calculator" style={{ color: accent, textDecoration: "underline" }}>pull calculator's specific card tab</Link>{" "}
                        handles this automatically — enter the number of cards at that rarity in the set and it adjusts the probability. Most players who try this tab are surprised by how much rarer a specific card is versus any card at that rarity.
                    </p>

                    {/* Animated infographic 3 */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <video autoPlay loop muted playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/pokemon-tcg-pocket-pull-rates/infographic-animated-3.mp4" type="video/mp4" />
                        </video>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "10px 16px", margin: 0, background: "rgba(255,255,255,0.02)" }}>Specific card probability — how rarity divides across a set</p>
                    </div>

                    {/* God Pack reality check */}
                    <h2 style={h2Style}>God Pack Reality Check</h2>
                    <p style={pStyle}>
                        God Pack videos go viral because they feel miraculous — and statistically, they are. The 0.050% rate means that in a pool of 2,000 players each opening one pack, only 1 pulls a God Pack. The other 1,999 don't make videos.
                    </p>
                    <p style={pStyle}>
                        This is survivorship bias at work. The player who hits a God Pack on pack 200 gets a viral clip. The hundreds of players who opened 3,000 packs and never saw one don't document it — but they exist in far greater numbers. Plan for the average, not the highlight reel.
                    </p>

                    {/* Spending guide */}
                    <h2 style={h2Style}>If You're Deciding Whether to Spend</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "0 0 40px" }}>
                        {[
                            { target: "Chasing ex cards", verdict: "Reasonable", color: "#4ade80", body: "ex cards at 5% are excellent value. $14 in packs gives you a 50% shot. Over a small bundle you'll almost certainly pull several. F2P is also fine — 7 days of free packs gets you there." },
                            { target: "Chasing Art Rares", verdict: "Reasonable", color: "#4ade80", body: "At $27 approximate cost for 50% odds, Art Rares are very achievable. Expect to pull one or more from any moderate bundle. F2P works well here too — 2 weeks of daily packs." },
                            { target: "Chasing Super Rares", verdict: "Budget carefully", color: "#fbbf24", body: "139 packs for 50% at ~$1/pack = ~$139. Budget $150-$200 and accept you may need to target whichever Super Rare appears, not necessarily the exact one you want." },
                            { target: "Chasing Crown Rare / God Pack", verdict: "Avoid if budget-conscious", color: "rgba(255,100,100,0.9)", body: "1,700+ packs for a 50% chance at ~$1/pack = $1,700+. The expected cost to flip a coin on a Crown Rare is genuinely high. Know this number before you spend — it's the most important thing the pull rates tell you." },
                        ].map(({ target, verdict, color, body }, i) => (
                            <div key={i} style={{ padding: "20px 24px", borderRadius: 14, border: `1px solid ${color}30`, background: `${color}08` }}>
                                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{target}</span>
                                    <span style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 999, border: `1px solid ${color}30`, background: `${color}15` }}>{verdict}</span>
                                </div>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.65 }}>{body}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA mid-article */}
                    <div style={{ margin: "0 0 40px", padding: "24px 28px", borderRadius: 16, background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", flexDirection: "column", gap: 12 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>Run your exact numbers before you spend</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: 0 }}>Enter your target rarity and budget into the calculator — see precisely what probability your spend buys you.</p>
                        <Link href="/tools/pokemon-tcg-pocket-pull-calculator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: accentBtn, color: "white", fontSize: 14, fontWeight: 800, textDecoration: "none", width: "fit-content" }}>
                            Open Pull Calculator →
                        </Link>
                    </div>

                    {/* Related tools */}
                    <h2 style={h2Style}>Related Collectibles Tools</h2>
                    <p style={pStyle}>If you're deep in the TCG hobby, these tools are all free and built for the same decisions:</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 0 40px" }}>
                        {[
                            { href: "/tools/pack-break-ev-calculator", label: "Pack Break EV Calculator — Expected value for any box break" },
                            { href: "/tools/card-grading-profit-calculator", label: "Card Grading Profit Calculator — Is grading your pull worth it?" },
                            { href: "/tools/ebay-best-offer-calculator", label: "eBay Best Offer Calculator — Know your break-even before you accept" },
                            { href: "/tools/card-flip-roi-calculator", label: "Card Flip ROI Calculator — See real profit after all fees" },
                        ].map(({ href, label }) => (
                            <Link key={href} href={href} style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div style={{ margin: "40px 0 0", padding: "28px 32px", borderRadius: 20, background: `linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.06))`, border: `1px solid ${accentBorder}` }}>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Know your odds before you open a single pack.</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 20px", lineHeight: 1.65 }}>
                            Free pull rate calculator — enter your pack count or probability target, see results for every rarity in seconds. No signup, no ads.
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                            <Link href="/tools/pokemon-tcg-pocket-pull-calculator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: accentBtn, color: "white", fontSize: 14, fontWeight: 800, textDecoration: "none" }}>
                                Calculate My Pull Odds →
                            </Link>
                            <a href="https://www.aweber.com/easy-email.htm?id=502593" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                                ✉️ AWeber
                            </a>
                            <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                                ⚡ AdvertsGPT
                            </a>
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {FAQS.map((faq, i) => (
                            <div key={i} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}>
                                <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 10, fontSize: 15, lineHeight: 1.4 }}>{faq.question}</p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Back to blog */}
                <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <Link href="/blog" style={{ color: "#818cf8", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                        Back to Blog
                    </Link>
                </div>
            </div>
        </main>
    );
}
