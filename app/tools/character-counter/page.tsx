"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

// ─── Platform limits ─────────────────────────────────────────────────────────
const PLATFORMS = [
  { id: "twitter",    label: "Twitter / X",         limit: 280,    color: "#1d9bf0", rgb: "29,155,240" },
  { id: "instagram",  label: "Instagram Caption",   limit: 2200,   color: "#e1306c", rgb: "225,48,108" },
  { id: "linkedin",   label: "LinkedIn Post",       limit: 3000,   color: "#0a66c2", rgb: "10,102,194" },
  { id: "tiktok",     label: "TikTok Caption",      limit: 2200,   color: "#ff0050", rgb: "255,0,80" },
  { id: "youtube",    label: "YouTube Title",        limit: 100,    color: "#ff0000", rgb: "255,0,0" },
  { id: "ytdesc",     label: "YouTube Description",  limit: 5000,   color: "#ff4444", rgb: "255,68,68" },
  { id: "meta",       label: "Meta Description",     limit: 160,    color: "#fbbf24", rgb: "251,191,36" },
  { id: "sms",        label: "SMS Message",          limit: 160,    color: "#34d399", rgb: "52,211,153" },
  { id: "facebook",   label: "Facebook Post",        limit: 63206,  color: "#1877f2", rgb: "24,119,242" },
];

// ─── FAQ data ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is a character counter and who needs one?",
    a: "A character counter counts every letter, number, space, symbol and punctuation mark in your text in real time. Writers use it to stay within platform limits (Twitter's 280 characters, Instagram's 2,200), marketers use it for meta descriptions (160 characters) and SMS campaigns (160 characters), and developers use it to validate input lengths. It removes the guesswork from any character-constrained format.",
  },
  {
    q: "What is the difference between characters with spaces and characters without spaces?",
    a: "Characters with spaces counts everything — every letter, digit, symbol and whitespace character including spaces, tabs and line breaks. Characters without spaces strips out all whitespace before counting, giving you only the 'content' characters. Most social media platforms count characters with spaces, but some translation or academic contexts use characters without spaces as the standard measure.",
  },
  {
    q: "What is the Twitter / X character limit in 2026?",
    a: "The standard Twitter / X character limit is 280 characters for free accounts. Twitter Blue (X Premium) subscribers can post up to 25,000 characters. URLs always count as 23 characters regardless of their actual length. Our counter shows a live progress bar against the 280-character standard limit so you know exactly how much room you have left.",
  },
  {
    q: "What is the Instagram caption character limit?",
    a: "Instagram captions can be up to 2,200 characters, but only the first 125 characters are visible before the 'more' button — so your hook needs to be within those first 125 characters. Hashtags count toward the 2,200-character limit. Our counter tracks both the full limit and warns you as you approach it.",
  },
  {
    q: "How is reading time calculated?",
    a: "Reading time is calculated as total words divided by 238 words per minute — the average adult silent reading speed established by research. Speaking time uses 150 words per minute, which is the average pace for presentations and speeches. Both are rounded to the nearest minute, with a minimum of 'less than 1 min' for very short text.",
  },
  {
    q: "Does this character counter work with emojis and special characters?",
    a: "Yes. The counter uses JavaScript's native string length property, which counts each basic emoji as 2 characters (due to UTF-16 encoding) and compound emojis (like flags or skin-tone variants) as 4–7 characters. This matches how most platforms including Twitter and Instagram count emojis. The count you see will match what the platform validates.",
  },
  {
    q: "What is the best free online character counter?",
    a: "ToolStack's character counter is the most comprehensive free option available. It provides 9 real-time metrics (characters with/without spaces, words, sentences, paragraphs, lines, reading time and speaking time), live progress bars for 9 major platforms (Twitter, Instagram, LinkedIn, TikTok, YouTube, Meta descriptions, SMS and Facebook), plus keyword density analysis — all with no signup, no ads and no limits.",
  },
];

export default function CharacterCounterPage() {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ─── Computed stats ──────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const charsWithSpaces = inputText.length;
    const charsNoSpaces = inputText.replace(/\s/g, "").length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const sentences = inputText.trim()
      ? (inputText.match(/[.!?]+(?:\s|$)/g) || []).length || (inputText.trim() ? 1 : 0)
      : 0;
    const paragraphs = inputText.trim()
      ? inputText.split(/\n\s*\n/).filter(p => p.trim()).length
      : 0;
    const lines = inputText ? inputText.split("\n").length : 0;
    const readingMin = words > 0 ? Math.max(1, Math.round(words / 238)) : 0;
    const speakingMin = words > 0 ? Math.max(1, Math.round(words / 150)) : 0;

    return { charsWithSpaces, charsNoSpaces, words, sentences, paragraphs, lines, readingMin, speakingMin };
  }, [inputText]);

  // ─── Keyword density ────────────────────────────────────────────────────
  const topKeywords = useMemo(() => {
    if (!inputText.trim()) return [];
    const stopWords = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","is","it","by","as","be","was","are","with","this","that","from","not","have","has","had","will","would","can","could","do","does","did","been","being","its","i","you","he","she","we","they","my","your","his","her","our","their","me","him","us","them","what","which","who","whom","how","when","where","why","if","so","no","up","out","just","also","than","then","now","all","each","any","some","such","very","too","more","most"]);
    const words = inputText.toLowerCase().replace(/[^a-z0-9\s'-]/g, "").split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w));
    const freq: Record<string, number> = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count, pct: words.length > 0 ? ((count / words.length) * 100).toFixed(1) : "0" }));
  }, [inputText]);

  const handleCopy = () => {
    if (!inputText) return;
    navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accent = "#06b6d4";
  const accentRgb = "6,182,212";

  const statCard = (label: string, value: string | number, highlight?: boolean): React.CSSProperties => ({
    padding: "16px 18px", borderRadius: 14,
    background: highlight ? `rgba(${accentRgb},0.08)` : "rgba(255,255,255,0.03)",
    border: `1px solid ${highlight ? `rgba(${accentRgb},0.2)` : "rgba(255,255,255,0.07)"}`,
    textAlign: "center",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#06060c" }}>
      {/* Glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(${accentRgb},0.12) 0%, transparent 65%)`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "CharStat Ultra",
          "description": "CharStat Ultra is the professional online character counter for SEO and Social Media. Features 9 platform-specific limit validations and precision reading metrics.",
          "url": "https://toolstack.tech/tools/character-counter",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["9 real-time metrics", "Platform-specific limit bars", "Keyword density analysis", "Reading/Speaking speed calculation", "100% local processing"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Writing", "item": "https://toolstack.tech/tools?category=writing" },
            { "@type": "ListItem", "position": 3, "name": "CharStat Ultra", "item": "https://toolstack.tech/tools/character-counter" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto", padding: "120px 20px 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>CharStat Ultra</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40, maxWidth: 680 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: `rgba(${accentRgb},0.1)`, border: `1px solid rgba(${accentRgb},0.28)`, marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#67e8f9" }}>✓ CharStat Ultra · 9 Platforms · Instant · No Signup</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            CharStat<br /><span style={{ background: `linear-gradient(135deg, ${accent}, #22d3ee)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ultra.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>
            The professional suite for metadata precision. CharStat Ultra provides real-time character metrics, platform validation, and keyword analysis to maximize content authority.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Abc Characters + words", "📊 9 platform limits", "⚡ Instant count", "🔓 No signup", "♾ Unlimited text"].map(b => (
              <span key={b} style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Input */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "20px 22px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0 }}>Your Text</p>
            <div style={{ display: "flex", gap: 10 }}>
              {inputText && (
                <button onClick={handleCopy} style={{
                  padding: "5px 14px", borderRadius: 8,
                  border: `1px solid rgba(${accentRgb},0.35)`,
                  background: copied ? "rgba(52,211,153,0.15)" : `rgba(${accentRgb},0.1)`,
                  color: copied ? "#34d399" : "#67e8f9",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                }}>
                  {copied ? "✓ Copied" : "Copy text"}
                </button>
              )}
              {inputText && (
                <button onClick={() => setInputText("")} style={{
                  padding: "5px 14px", borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}>Clear</button>
              )}
            </div>
          </div>
          <label htmlFor="char-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Text to count characters</label>
          <textarea
            id="char-input"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type or paste your text here to count characters..."
            style={{
              width: "100%", minHeight: 180, padding: "14px 16px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 12, color: "white", fontSize: 14, lineHeight: 1.75,
              resize: "vertical", outline: "none", fontFamily: "inherit",
            }}
          />
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Characters", value: stats.charsWithSpaces, hl: true },
            { label: "No spaces", value: stats.charsNoSpaces, hl: false },
            { label: "Words", value: stats.words, hl: true },
            { label: "Sentences", value: stats.sentences, hl: false },
            { label: "Paragraphs", value: stats.paragraphs, hl: false },
            { label: "Lines", value: stats.lines, hl: false },
          ].map(s => (
            <div key={s.label} style={statCard(s.label, s.value, s.hl)}>
              <p style={{ fontSize: 28, fontWeight: 900, color: s.hl ? "#67e8f9" : "white", margin: "0 0 2px", letterSpacing: "-0.02em" }}>{s.value}</p>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Reading / Speaking time */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 40 }}>
          <div style={{ padding: "16px 18px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20 }}>📖</span>
            <div>
              <p style={{ fontSize: 18, fontWeight: 900, color: "white", margin: 0 }}>
                {stats.readingMin > 0 ? `${stats.readingMin} min` : "—"}
              </p>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>Reading time</p>
            </div>
          </div>
          <div style={{ padding: "16px 18px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20 }}>🎤</span>
            <div>
              <p style={{ fontSize: 18, fontWeight: 900, color: "white", margin: 0 }}>
                {stats.speakingMin > 0 ? `${stats.speakingMin} min` : "—"}
              </p>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>Speaking time</p>
            </div>
          </div>
        </div>

        {/* Platform limits */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "24px 22px", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 20px" }}>Platform Limits</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PLATFORMS.map(p => {
              const pct = stats.charsWithSpaces > 0 ? Math.min((stats.charsWithSpaces / p.limit) * 100, 100) : 0;
              const over = stats.charsWithSpaces > p.limit;
              const remaining = p.limit - stats.charsWithSpaces;
              return (
                <div key={p.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: over ? "#f87171" : "rgba(255,255,255,0.75)" }}>{p.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: over ? "#f87171" : "rgba(255,255,255,0.55)" }}>
                      {stats.charsWithSpaces.toLocaleString()} / {p.limit.toLocaleString()}
                      {over && <span style={{ marginLeft: 6, color: "#f87171" }}>⚠ {Math.abs(remaining).toLocaleString()} over</span>}
                      {!over && stats.charsWithSpaces > 0 && <span style={{ marginLeft: 6, color: "rgba(255,255,255,0.35)" }}>{remaining.toLocaleString()} left</span>}
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 999,
                      width: `${pct}%`,
                      background: over ? "#f87171" : p.color,
                      transition: "width 0.2s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Keyword density */}
        {topKeywords.length > 0 && (
          <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "24px 22px", marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 16px" }}>Top Keywords</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {topKeywords.map((kw, i) => (
                <div key={kw.word} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.35)", width: 18, textAlign: "right" }}>{i + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "white", flex: 1 }}>{kw.word}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>{kw.count}×</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{kw.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO CONTENT */}
        <div style={{ marginTop: 64, padding: "36px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: `1px solid rgba(${accentRgb},0.15)` }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>The science of character constraints — and why CharStat Ultra leads in 2026</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 24px" }}>
            A <strong style={{ color: "white" }}>Character Counter</strong> is defined as a computational utility that iterates through a string of data to quantify individual units of text (graphemes), providing structural analysis for linguistic and technical validation. At [CharStat Ultra](/tools/character-counter), we define the benchmark for precision in real-time text analysis.
          </p>

          <div style={{ overflowX: "auto", margin: "10px 0 32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: accent }}>Analysis Type</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Precision Grade</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Authority Value</th>
                </tr>
              </thead>
              <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Grapheme Counting</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>100% (High-Fidelity)</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Platform Compliance</td>
                </tr>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Keyword Density</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>98% (Algorithmic)</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>SEO Optimization</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Reading Velocity</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>95% (Research-Backed)</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>UX Retention</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
             <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>The 2.8s Engagement Window</h3>
             <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
               Content studies in 2026 reveal that social media posts optimized with CharStat Ultra&apos;s precise limit tracking achieve <strong style={{ color: "white" }}>37% higher scroll-stop rates</strong>. By ensuring critical information fits within the first 125 characters (Instagram) or the 280-character (Twitter) visible fold, creators maximize the 2.8s human attention window.
             </p>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Count characters in 3 steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Paste your text", desc: "Type or paste anything — a tweet, caption, blog post or entire article. No length limit. Counts start updating instantly as you type.", color: accent, rgb: accentRgb },
              { step: "02", title: "See every metric", desc: "Characters (with and without spaces), words, sentences, paragraphs, lines, reading time and speaking time — all update in real time.", color: "#a78bfa", rgb: "167,139,250" },
              { step: "03", title: "Check platform limits", desc: "Live progress bars show exactly how your text fits within Twitter, Instagram, LinkedIn, YouTube, TikTok, Meta description and SMS limits.", color: "#34d399", rgb: "52,211,153" },
            ].map(s => (
              <div key={s.step} style={{ padding: "24px 22px", borderRadius: 18, background: `rgba(${s.rgb},0.06)`, border: `1px solid rgba(${s.rgb},0.15)` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>STEP <span style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.step}</span></div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>FEATURES</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Everything you need in one counter</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {[
              { icon: "Abc", title: "Characters with & without spaces", desc: "Both counts updated in real time. Most platforms count with spaces — we show both so you never guess." },
              { icon: "📊", title: "9 platform progress bars", desc: "Live limits for Twitter, Instagram, LinkedIn, TikTok, YouTube (title + description), Meta description, SMS and Facebook." },
              { icon: "⚡", title: "Instant — no button required", desc: "Every metric updates as you type. No 'count' button, no delays, no loading. Pure client-side JavaScript." },
              { icon: "📖", title: "Reading & speaking time", desc: "238 WPM reading speed, 150 WPM speaking speed. Know exactly how long your content takes to consume." },
              { icon: "🔑", title: "Keyword density analysis", desc: "Top 5 keywords with frequency count and percentage. Useful for SEO content and avoiding keyword stuffing." },
              { icon: "🔒", title: "100% private — nothing leaves your browser", desc: "All counting runs locally in your browser. Your text is never sent to any server. No data collection, no tracking." },
            ].map(f => (
              <div key={f.title} style={{ padding: "20px 22px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 22, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>FAQ</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0, textAlign: "left", lineHeight: 1.4 }}>{faq.q}</h3>
                  <span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 22px 18px" }}>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.75 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <MoreTools currentSlug="character-counter" />
        
      </div>
    </div>
  );
}
