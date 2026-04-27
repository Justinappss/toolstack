"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

const MODES = [
  { id: "paragraph",     label: "¶ Paragraph",      desc: "Flowing prose summary" },
  { id: "bullets",       label: "• Bullets",         desc: "5–7 key point bullets" },
  { id: "key_takeaways", label: "✦ Key Takeaways",   desc: "3 critical insights" },
  { id: "executive",     label: "◈ Executive",       desc: "Formal one-pager" },
];

const LENGTHS = [
  { id: "short",    label: "Short" },
  { id: "medium",   label: "Medium" },
  { id: "detailed", label: "Detailed" },
];

const FAQS = [
  {
    q: "Is this text summarizer really free with no word limit?",
    a: "Yes — 100% free, no signup, no daily cap. You can summarize up to 5,000 characters (roughly 700–800 words) per request. Unlike QuillBot's free plan which caps at 600 words and requires an account, ToolStack's summarizer is completely unlimited in use.",
  },
  {
    q: "How is this different from QuillBot's summarizer?",
    a: "QuillBot's free summarizer limits you to 600 words, offers only paragraph and bullet modes, and requires an account. ToolStack's summarizer uses GPT-4o (more capable than QuillBot's engine), supports 5,000 characters, includes 4 modes (paragraph, bullets, key takeaways and executive summary), 3 length options, and requires zero signup.",
  },
  {
    q: "What is the difference between the 4 summary modes?",
    a: "Paragraph mode creates a flowing prose summary — best for general reading. Bullets mode extracts 5–7 distinct key points — best for quick scanning. Key Takeaways isolates the 3 most critical insights — best when you need the absolute core. Executive mode creates a structured formal summary with context, findings and implications — best for professional documents and reports.",
  },
  {
    q: "What types of text can I summarize?",
    a: "Any text content — articles, blog posts, reports, essays, research papers, meeting notes, emails, book chapters, product descriptions, news stories. The tool works best on factual and informational text. It cannot summarize images, PDFs (paste the text first) or URLs.",
  },
  {
    q: "How accurate is AI text summarization?",
    a: "GPT-4o produces highly accurate summaries that preserve key facts, figures, names and conclusions. The tool is instructed never to add information not present in the original. That said, always review AI summaries before using in professional or academic contexts — context-specific nuance can occasionally be compressed out.",
  },
  {
    q: "What is the best free AI text summarizer?",
    a: "ToolStack's summarizer stands out because it uses GPT-4o (the most capable model available), supports 4 distinct summarization modes, offers 3 length levels, processes up to 5,000 characters free, and requires no account — unlike QuillBot (word-limited, account required), Jasper (paid), or TLDR This (no length control). It's the most full-featured free summarizer available.",
  },
  {
    q: "Can I use this for academic papers and research?",
    a: "Yes — the tool works well for summarizing research papers and academic articles you've pasted in. Use Key Takeaways mode to extract the 3 most important findings, or Executive mode for a structured abstract-style summary. Always cite the original source; never submit an AI summary as your own academic work.",
  },
];

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function readingTime(words: number): string {
  const seconds = Math.round((words / 238) * 60);
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

export default function TextSummarizerPage() {
  const [inputText, setInputText]   = useState("");
  const [mode, setMode]             = useState("paragraph");
  const [length, setLength]         = useState("medium");
  const [summary, setSummary]       = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [copied, setCopied]         = useState(false);
  const [openFaq, setOpenFaq]       = useState<number | null>(null);

  const charCount    = inputText.length;
  const origWords    = wordCount(inputText);
  const summWords    = wordCount(summary);
  const reductionPct = origWords > 0 && summWords > 0 ? Math.round((1 - summWords / origWords) * 100) : 0;

  const handleSummarize = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError("");
    setSummary("");
    setCopied(false);
    try {
      const res = await fetch("/api/text-summarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode, length }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setSummary(data.summary ?? "");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [inputText, mode, length]);

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBullet = mode === "bullets" || mode === "key_takeaways";
  const bulletLines = isBullet
    ? summary.split("\n").filter(l => l.trim().startsWith("•")).map(l => l.replace(/^•\s*/, "").trim())
    : [];

  const accent    = "#f97316";
  const accentRgb = "249,115,22";

  const pillBase: React.CSSProperties = {
    padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700,
    cursor: "pointer", transition: "all 0.15s", border: "1px solid",
    whiteSpace: "nowrap" as const,
  };

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
          "name": "Text Summarizer",
          "description": "Free AI text summarizer powered by GPT-4o. Summarise any article, report or essay in 4 modes: Paragraph, Bullet Points, Key Takeaways, and Executive Brief. No signup, no word limit.",
          "url": "https://toolstack.tech/tools/text-summarizer",
          "applicationCategory": "WritingApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["4 summary modes (Paragraph, Bullets, Takeaways, Executive)", "GPT-4o powered", "No signup required", "No length limit", "Reading time analysis"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Writing", "item": "https://toolstack.tech/tools?category=writing" },
            { "@type": "ListItem", "position": 3, "name": "Text Summarizer", "item": "https://toolstack.tech/tools/text-summarizer" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "120px 20px 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Text Summarizer</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40, maxWidth: 700 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: `rgba(${accentRgb},0.1)`, border: `1px solid rgba(${accentRgb},0.28)`, marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fdba74" }}>¶ Text Summarizer · GPT-4o · No Word Limit · No Signup</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Text<br /><span style={{ background: `linear-gradient(135deg, ${accent}, #fb923c)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Summarizer.</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 24px" }}>
            Paste any article, report or essay and get a concise summary instantly. Choose from 4 modes — Paragraph, Bullets, Key Takeaways, or Executive Brief — and 3 length levels. Powered by GPT-4o. Free, no signup.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["¶ 4 summary modes", "↕ 3 length options", "♾ 5,000 chars free", "🔓 No signup", "⚡ Instant results"].map(b => (
              <span key={b} style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "20px 24px", marginBottom: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            {/* Mode pills */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "0 0 10px" }}>Mode</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {MODES.map(m => {
                  const active = mode === m.id;
                  return (
                    <button key={m.id} onClick={() => setMode(m.id)} style={{
                      ...pillBase,
                      background: active ? `rgba(${accentRgb},0.15)` : "rgba(255,255,255,0.04)",
                      borderColor: active ? `rgba(${accentRgb},0.5)` : "rgba(255,255,255,0.08)",
                      color: active ? accent : "rgba(255,255,255,0.55)",
                    }}>
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Length toggle */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "0 0 10px" }}>Length</p>
              <div style={{ display: "flex", gap: 0, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, border: "1px solid rgba(255,255,255,0.08)" }}>
                {LENGTHS.map(l => {
                  const active = length === l.id;
                  return (
                    <button key={l.id} onClick={() => setLength(l.id)} style={{
                      padding: "6px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
                      border: "none", transition: "all 0.15s",
                      background: active ? `rgba(${accentRgb},0.2)` : "transparent",
                      color: active ? accent : "rgba(255,255,255,0.45)",
                    }}>
                      {l.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Editor grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 12, marginBottom: 12 }}>

          {/* Input */}
          <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "20px 22px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>Your Text</p>
              <div style={{ display: "flex", gap: 14 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{origWords} words</span>
                <span style={{ fontSize: 12, color: charCount > 4500 ? "#f87171" : "rgba(255,255,255,0.5)" }}>{charCount}/5000</span>
              </div>
            </div>
            <label htmlFor="summarizer-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Text to summarize</label>
            <textarea
              id="summarizer-input"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              maxLength={5000}
              placeholder="Paste any article, report, essay or text you want to summarize..."
              style={{
                flex: 1, minHeight: 260, width: "100%", padding: "14px 16px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 12, color: "white", fontSize: 14, lineHeight: 1.75,
                resize: "vertical", outline: "none", fontFamily: "inherit",
              }}
            />
            {inputText && (
              <button onClick={() => { setInputText(""); setSummary(""); setError(""); }} style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                Clear
              </button>
            )}
          </div>

          {/* Output */}
          <div style={{ background: "rgba(255,255,255,0.035)", border: `1px solid ${summary ? `rgba(${accentRgb},0.2)` : "rgba(255,255,255,0.09)"}`, borderRadius: 18, padding: "20px 22px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>Summary</p>
              {summary && (
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{summWords} words</span>
                  {reductionPct > 0 && (
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#34d399" }}>{reductionPct}% shorter</span>
                  )}
                  <button onClick={handleCopy} style={{
                    padding: "4px 12px", borderRadius: 7, border: `1px solid rgba(${accentRgb},0.35)`,
                    background: copied ? "rgba(52,211,153,0.15)" : `rgba(${accentRgb},0.1)`,
                    color: copied ? "#34d399" : "#fdba74", fontSize: 12, fontWeight: 700, cursor: "pointer",
                  }}>
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div style={{ flex: 1, minHeight: 260, display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
                {[100, 88, 95, 72, 80, 60].map((w, i) => (
                  <div key={i} style={{ height: 14, borderRadius: 7, background: "rgba(255,255,255,0.07)", width: `${w}%`, animation: "pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.1}s` }} />
                ))}
                <style>{`@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}`}</style>
                <p style={{ fontSize: 13, color: `rgba(${accentRgb},0.6)`, marginTop: 8 }}>Summarizing with GPT-4o...</p>
              </div>
            ) : summary ? (
              <div style={{ flex: 1 }}>
                {/* Reading time saved */}
                {origWords > 0 && (
                  <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                      Original: <strong style={{ color: "rgba(255,255,255,0.65)" }}>{readingTime(origWords)} read</strong>
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>→</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                      Summary: <strong style={{ color: "#34d399" }}>{readingTime(summWords)} read</strong>
                    </span>
                  </div>
                )}
                {isBullet && bulletLines.length > 0 ? (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {bulletLines.map((line, i) => (
                      <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: accent, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>•</span>
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.85)", margin: 0, whiteSpace: "pre-wrap" }}>{summary}</p>
                )}
              </div>
            ) : (
              <div style={{ flex: 1, minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textAlign: "center", lineHeight: 1.6 }}>
                  Your summary<br />will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summarise button */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
          <button
            onClick={handleSummarize}
            disabled={!inputText.trim() || loading}
            style={{
              padding: "16px 48px", borderRadius: 14,
              background: inputText.trim() && !loading ? `linear-gradient(135deg, #ea580c, ${accent})` : "rgba(255,255,255,0.06)",
              border: "none", cursor: inputText.trim() && !loading ? "pointer" : "not-allowed",
              fontSize: 16, fontWeight: 800, color: inputText.trim() && !loading ? "white" : "rgba(255,255,255,0.3)",
              boxShadow: inputText.trim() && !loading ? `0 8px 32px rgba(${accentRgb},0.3)` : "none",
              transition: "all 0.15s", display: "flex", alignItems: "center", gap: 10,
            }}
            onMouseEnter={e => { if (inputText.trim() && !loading) { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; } }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
          >
            {loading ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
                <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                Summarizing...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" /></svg>
                Summarize — Free
              </>
            )}
          </button>
          {summary && (
            <button onClick={() => { setSummary(""); setInputText(""); }} style={{
              padding: "16px 24px", borderRadius: 14, fontSize: 14, fontWeight: 700, cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)",
            }}>
              ← New text
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#fca5a5", fontSize: 14, marginBottom: 32, textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* HOW IT WORKS */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Summarize any text in 3 steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Paste your text", desc: "Paste any article, report, essay or document. Up to 5,000 characters — no signup, no daily cap.", color: accent, rgb: accentRgb },
              { step: "02", title: "Choose mode & length", desc: "Pick a summary mode (paragraph, bullets, takeaways or executive) and a length (short, medium or detailed).", color: "#a78bfa", rgb: "167,139,250" },
              { step: "03", title: "Copy your summary", desc: "GPT-4o analyses the text and returns your summary in seconds. Copy it, share it, or use it — it's yours.", color: "#34d399", rgb: "52,211,153" },
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
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>FEATURES</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>More than a basic summariser</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { icon: "¶",  title: "4 summary modes",      desc: "Paragraph for reading, Bullets for scanning, Key Takeaways for the essentials, Executive for formal documents. QuillBot free only offers 2 modes.", color: accent },
              { icon: "↕",  title: "3 length controls",    desc: "Short (2–3 sentences), Medium (4–5 sentences), or Detailed (7–8 sentences). Get exactly the depth you need.", color: "#a78bfa" },
              { icon: "✦",  title: "GPT-4o quality",       desc: "Not a rule-based extractive summariser. GPT-4o understands meaning, context and importance — it writes summaries, not just copies sentences.", color: "#38bdf8" },
              { icon: "⏱",  title: "Reading time stats",   desc: "See how much reading time you've saved — from a 4-minute article to a 30-second summary. Instantly know the value of the compression.", color: "#34d399" },
              { icon: "♾",  title: "5,000 characters free", desc: "Roughly 700–800 words per request. No daily cap, no credit system, no paid plan required. Summarise as many texts as you need.", color: "#fb7185" },
              { icon: "🔓", title: "No account needed",    desc: "Open the tool, paste your text, get your summary. No email, no password, no extension. ToolStack's summariser is free forever.", color: accent },
            ].map(f => (
              <div key={f.title} style={{ padding: "24px 22px", borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 22, marginBottom: 14, color: f.color }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MODES GUIDE */}
        <div style={{ marginTop: 64, padding: "36px 40px", borderRadius: 20, background: `rgba(${accentRgb},0.04)`, border: `1px solid rgba(${accentRgb},0.12)` }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Which summary mode should you use?</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 28px" }}>Each mode is optimised for a different use case. Here's when to use each one.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { mode: "¶ Paragraph", when: "General reading, blog posts, news articles", why: "Produces a natural, flowing summary you can read quickly — ideal when you want context preserved." },
              { mode: "• Bullets",   when: "Meeting notes, listicles, how-to guides", why: "Breaks complex content into scannable points — best when you'll reference the summary multiple times." },
              { mode: "✦ Takeaways", when: "Research papers, technical reports", why: "Cuts through everything to surface the 3 most important conclusions or findings." },
              { mode: "◈ Executive", when: "Business reports, proposals, memos", why: "Structures the summary formally: context → findings → implications. Professional, ready to share." },
            ].map(m => (
              <div key={m.mode} style={{ padding: "20px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: accent, margin: "0 0 6px" }}>{m.mode}</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)", margin: "0 0 8px" }}>Best for: {m.when}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>{m.why}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>FAQ</p>
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

        <MoreTools currentSlug="text-summarizer" />
        
      </div>
    </div>
  );
}
