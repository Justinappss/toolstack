"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";
import { HowToSchema } from "@/components/ui/HowToSchema";

type Correction = {
  original: string;
  corrected: string;
  type: "Grammar" | "Spelling" | "Punctuation" | "Clarity" | "Style";
  explanation: string;
};

type Result = {
  correctedText: string;
  score: number;
  corrections: Correction[];
};

const TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Grammar:     { bg: "rgba(56,189,248,0.1)",   border: "rgba(56,189,248,0.3)",   text: "#38bdf8" },
  Spelling:    { bg: "rgba(248,113,113,0.1)",  border: "rgba(248,113,113,0.3)",  text: "#f87171" },
  Punctuation: { bg: "rgba(251,191,36,0.1)",   border: "rgba(251,191,36,0.3)",   text: "#fbbf24" },
  Clarity:     { bg: "rgba(167,139,250,0.1)",  border: "rgba(167,139,250,0.3)",  text: "#a78bfa" },
  Style:       { bg: "rgba(52,211,153,0.1)",   border: "rgba(52,211,153,0.3)",   text: "#34d399" },
};

const FAQS = [
  {
    q: "Is this grammar checker really free with no word limit?",
    a: "Yes — 100% free, no signup required, and no word limit (up to 5,000 characters per check). You can check as many documents as you want. There is no daily cap, no credit system, and no paywall. ToolStack's grammar checker is free forever.",
  },
  {
    q: "How is this different from Grammarly?",
    a: "Grammarly's free plan only flags basic grammar errors with no explanations. It requires you to install a browser extension or create an account. ToolStack's grammar checker uses GPT-4o — a more advanced model than Grammarly's underlying engine — explains every single correction with the grammar rule, requires no signup, no extension, and has no word limit on the free tier.",
  },
  {
    q: "What does the grammar score mean?",
    a: "The grammar score (0–100) reflects how error-free your text is. A score of 100 means no errors were found. Scores of 90–99 indicate minor issues such as a missed comma or one spelling error. Scores below 75 suggest multiple errors that could affect readability and professionalism. The score considers grammar, spelling, punctuation, clarity and style together.",
  },
  {
    q: "What types of errors does it detect?",
    a: "The tool detects five categories: Grammar (subject-verb agreement, tense consistency, article usage, preposition errors), Spelling (misspelled words, incorrect homophones), Punctuation (missing commas, incorrect apostrophes, run-on sentences), Clarity (awkward phrasing, ambiguous sentences), and Style (unnecessary repetition, passive voice overuse, weak word choices).",
  },
  {
    q: "Is my text stored or shared?",
    a: "No. Your text is sent to OpenAI's GPT-4o API to generate corrections and is not stored on our servers. ToolStack does not log, save or share the content you submit. OpenAI's API terms apply to the text processing, but ToolStack itself retains no data from your sessions.",
  },
  {
    q: "Can I use this for professional documents and essays?",
    a: "Yes — the tool is well-suited for emails, reports, essays, cover letters, blog posts and professional documents. For academic work, always review AI suggestions before submitting, as context-specific language (technical jargon, intentional stylistic choices) may be flagged unnecessarily. Use it as a thorough first pass, then apply your own judgment.",
  },
  {
    q: "What is the best free grammar checker?",
    a: "ToolStack's grammar checker stands out because it uses GPT-4o (more capable than traditional rule-based tools), explains every correction with the underlying grammar rule, detects five error categories, shows a grammar score, has no word limit per check, and requires no signup or browser extension — unlike Grammarly, ProWritingAid or Hemingway Editor which all require accounts or charge for full functionality.",
  },
];

function scoreColour(score: number) {
  if (score >= 90) return { text: "#34d399", glow: "rgba(52,211,153,0.3)", label: "Excellent" };
  if (score >= 75) return { text: "#fbbf24", glow: "rgba(251,191,36,0.3)", label: "Good" };
  if (score >= 60) return { text: "#f97316", glow: "rgba(249,115,22,0.3)", label: "Needs work" };
  return { text: "#f87171", glow: "rgba(248,113,113,0.3)", label: "Major issues" };
}

export default function GrammarCheckerPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  const handleCheck = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);
    try {
      const res = await fetch("/api/grammar-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [inputText]);

  const handleCopy = () => {
    if (!result?.correctedText) return;
    navigator.clipboard.writeText(result.correctedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "16px 18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 14, color: "white",
    fontSize: 15, lineHeight: 1.75,
    resize: "none", outline: "none",
    fontFamily: "inherit",
    minHeight: 200,
  };

  const sc = result ? scoreColour(result.score) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#06060c" }}>
      {/* Glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "0%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Grammar Checker",
          "description": "Free AI grammar checker by ToolStack. Check and fix grammar, spelling, punctuation, clarity and style with GPT-4o. Every correction explained with the grammar rule. No word limit, no signup.",
          "url": "https://toolstack.tech/tools/grammar-checker",
          "applicationCategory": "WritingApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["Professional grammar scoring", "5 error categories", "Rule-based explanations", "No word limit", "GPT-4o powered", "No signup required"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Writing", "item": "https://toolstack.tech/tools/category/writing" },
            { "@type": "ListItem", "position": 3, "name": "Grammar Checker", "item": "https://toolstack.tech/tools/grammar-checker" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <HowToSchema
        name="Grammar Checker"
        description="Fix grammar, spelling, punctuation, clarity and style with GPT-4o in 3 simple steps."
        steps={[
          { name: "Paste your text into the editor", text: "Paste any text — an email, essay, blog post, cover letter or report — up to 5,000 characters. No signup required." },
          { name: "Review highlighted grammar and style suggestions", text: "GPT-4o analyses your text for grammar, spelling, punctuation, clarity and style errors. See every issue highlighted with an explanation." },
          { name: "Apply fixes with one click", text: "Copy the corrected version of your text. Each fix includes the grammar rule explained — so you learn why it was wrong, not just what to change." },
        ]}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "120px 20px 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Grammar Checker</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40, maxWidth: 680 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.28)", marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#7dd3fc" }}>✓ AI Grammar Checker · GPT-4o · No Word Limit · No Signup</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Free AI<br /><span style={{ background: "linear-gradient(135deg, #38bdf8, #7dd3fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Grammar Checker.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>
            Check and fix grammar, spelling, punctuation, clarity and style with GPT-4o. Get a corrected version of your text plus an explanation for every single fix. No word limit, no signup.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["✓ GPT-4o powered", "♾ No word limit", "🔓 No signup", "📋 Every fix explained", "⚡ Instant results"].map(b => (
              <span key={b} style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Input card */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "24px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>Your Text</p>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{wordCount} words</span>
              <span style={{ fontSize: 12, color: charCount > 4500 ? "#f87171" : "rgba(255,255,255,0.5)" }}>{charCount}/5000</span>
            </div>
          </div>
          <label htmlFor="grammar-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Text to check for grammar errors</label>
          <textarea
            id="grammar-input"
            style={inputStyle}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Paste your text here — an email, essay, report, blog post or any writing you want to check..."
            maxLength={5000}
          />
          {inputText && (
            <button onClick={() => { setInputText(""); setResult(null); setError(""); }} style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              Clear
            </button>
          )}
        </div>

        {/* Check button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <button
            onClick={handleCheck}
            disabled={!inputText.trim() || loading}
            style={{
              padding: "16px 48px", borderRadius: 14,
              background: inputText.trim() && !loading ? "linear-gradient(135deg, #0ea5e9, #38bdf8)" : "rgba(255,255,255,0.06)",
              border: "none", cursor: inputText.trim() && !loading ? "pointer" : "not-allowed",
              fontSize: 16, fontWeight: 800, color: inputText.trim() && !loading ? "white" : "rgba(255,255,255,0.3)",
              boxShadow: inputText.trim() && !loading ? "0 8px 32px rgba(56,189,248,0.3)" : "none",
              transition: "all 0.15s",
              display: "flex", alignItems: "center", gap: 10,
            }}
            onMouseEnter={e => { if (inputText.trim() && !loading) { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(56,189,248,0.45)"; } }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = inputText.trim() && !loading ? "0 8px 32px rgba(56,189,248,0.3)" : "none"; }}
          >
            {loading ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
                <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                Checking grammar...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Check Grammar — Free
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#fca5a5", fontSize: 14, marginBottom: 24, textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "32px 28px", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 28 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(56,189,248,0.1)", animation: "pulse 1.4s ease-in-out infinite" }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 14, borderRadius: 7, background: "rgba(255,255,255,0.07)", marginBottom: 10, width: "40%", animation: "pulse 1.4s ease-in-out infinite" }} />
                <div style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.05)", width: "60%", animation: "pulse 1.4s ease-in-out infinite" }} />
              </div>
            </div>
            {[100, 92, 85, 78, 90].map((w, i) => (
              <div key={i} style={{ height: 13, borderRadius: 7, background: "rgba(255,255,255,0.06)", marginBottom: 10, width: `${w}%`, animation: "pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.1}s` }} />
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}`}</style>
            <p style={{ fontSize: 13, color: "rgba(56,189,248,0.6)", marginTop: 16 }}>Analysing grammar, spelling, punctuation, clarity and style...</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <>
            {/* Score + corrected text */}
            <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "28px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>

                {/* Score */}
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 88, height: 88, borderRadius: "50%",
                    border: `3px solid ${sc!.text}`,
                    boxShadow: `0 0 24px ${sc!.glow}`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    background: `${sc!.glow.replace("0.3", "0.08")}`,
                  }}>
                    <span style={{ fontSize: 28, fontWeight: 900, color: sc!.text, lineHeight: 1 }}>{result.score}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: sc!.text, letterSpacing: "0.05em", opacity: 0.8 }}>/100</span>
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 800, color: sc!.text, margin: "8px 0 0", letterSpacing: "0.05em" }}>{sc!.label.toUpperCase()}</p>
                </div>

                {/* Summary */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>
                    {result.corrections.length === 0 ? "No errors found" : `${result.corrections.length} correction${result.corrections.length === 1 ? "" : "s"} found`}
                  </p>
                  {result.corrections.length === 0 ? (
                    <p style={{ fontSize: 15, color: "#34d399", fontWeight: 700, margin: 0 }}>Your text is grammatically correct. Well done.</p>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {(["Grammar", "Spelling", "Punctuation", "Clarity", "Style"] as const).map(type => {
                        const count = result.corrections.filter(c => c.type === type).length;
                        if (!count) return null;
                        const tc = TYPE_COLORS[type];
                        return (
                          <span key={type} style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text }}>
                            {count} {type}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Corrected text */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>Corrected Text</p>
                  <button onClick={handleCopy} style={{
                    padding: "5px 14px", borderRadius: 8,
                    border: "1px solid rgba(56,189,248,0.3)",
                    background: copied ? "rgba(52,211,153,0.15)" : "rgba(56,189,248,0.1)",
                    color: copied ? "#34d399" : "#7dd3fc",
                    fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                  }}>
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.88)", margin: 0, whiteSpace: "pre-wrap" }}>{result.correctedText}</p>
              </div>
            </div>

            {/* Correction breakdown */}
            {result.corrections.length > 0 && (
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "24px 28px", marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 18px" }}>Correction Breakdown</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {result.corrections.map((c, i) => {
                    const tc = TYPE_COLORS[c.type] ?? TYPE_COLORS.Grammar;
                    return (
                      <div key={i} style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 999, background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text, flexShrink: 0 }}>{c.type}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 13, color: "#f87171", textDecoration: "line-through", fontStyle: "italic" }}>{c.original}</span>
                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>→</span>
                            <span style={{ fontSize: 13, color: "#34d399", fontWeight: 600 }}>{c.corrected}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{c.explanation}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
              {result.corrections.length > 0 && (
                <button onClick={() => { setInputText(result.correctedText); setResult(null); }} style={{
                  padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  border: "1px solid rgba(56,189,248,0.3)", background: "rgba(56,189,248,0.08)", color: "#7dd3fc",
                }}>
                  ↺ Check corrected text again
                </button>
              )}
              <button onClick={() => { setResult(null); setInputText(""); }} style={{
                padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)",
              }}>
                ← Check another text
              </button>
            </div>
          </>
        )}

        {/* HOW IT WORKS */}
        <div style={{ marginTop: result ? 16 : 0 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Fix your grammar in 3 steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Paste your text", desc: "Paste any text — an email, essay, blog post, cover letter or report. Up to 5,000 characters, no signup required.", color: "#38bdf8", rgb: "56,189,248" },
              { step: "02", title: "Check grammar", desc: "Click Check Grammar. GPT-4o analyses your text for grammar, spelling, punctuation, clarity and style errors in seconds.", color: "#a78bfa", rgb: "167,139,250" },
              { step: "03", title: "Review every fix", desc: "See your grammar score, the corrected text ready to copy, and a full breakdown of each error with the rule explained.", color: "#34d399", rgb: "52,211,153" },
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
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>More than a spell check</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { icon: "✦", title: "GPT-4o grammar engine", desc: "Uses OpenAI's most capable model — not a rigid rule-based checker. It understands context, so it catches nuanced errors that basic tools miss.", color: "#38bdf8" },
              { icon: "📋", title: "Every correction explained", desc: "Each fix comes with the grammar rule behind it. You don't just get a corrected text — you learn why it was wrong. Grammarly charges for this.", color: "#a78bfa" },
              { icon: "◎", title: "Grammar score 0–100", desc: "An at-a-glance quality rating for your text. Track improvements as you revise. Excellent (90+), Good (75–89), Needs Work (60–74), Major Issues (<60).", color: "#fbbf24" },
              { icon: "⬡", title: "5 error categories", desc: "Grammar, Spelling, Punctuation, Clarity and Style — each colour-coded and explained separately so you know exactly what kind of issues your writing has.", color: "#34d399" },
              { icon: "♾", title: "No word limit", desc: "Check up to 5,000 characters per request — roughly 700–800 words. No daily cap, no credit system, no plan required.", color: "#f472b6" },
              { icon: "💸", title: "Free forever, no signup", desc: "No account, no browser extension, no monthly fee. Check as many documents as you need. ToolStack grammar checker is free forever.", color: "#38bdf8" },
            ].map(f => (
              <div key={f.title} style={{ padding: "24px 22px", borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 22, marginBottom: 14, color: f.color }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO CONTENT */}
        <div style={{ marginTop: 64, padding: "36px 40px", borderRadius: 20, background: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.12)" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Why grammar still matters — and why free tools fall short</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 16px" }}>
            A <strong style={{ color: "white" }}>grammar checker</strong> analyses text for syntactical errors, misspellings, punctuation mistakes and stylistic issues and suggests corrections. Grammar matters because readers lose trust in content with frequent errors — whether that&apos;s a client reading a proposal, a hiring manager scanning a cover letter, or a Google algorithm evaluating page quality for search rankings.
          </p>

          <div style={{ overflowX: "auto", margin: "10px 0 24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#38bdf8" }}>Feature</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>ToolStack</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>Basic rule-based checkers</th>
                </tr>
              </thead>
              <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>AI model</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>GPT-4o (understands context)</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Pattern matching only</td>
                </tr>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Correction explanations</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Every fix explained with the rule</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>None, or paid only</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Data privacy</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Not stored by ToolStack</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Varies — often stored</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
             <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Why explanations matter more than corrections</h3>
             <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
               Most free grammar checkers highlight what&apos;s wrong but don&apos;t explain why. You fix the flagged word, make the same mistake again next week, and never improve. ToolStack&apos;s checker includes the grammar rule behind every correction — so you understand the error, not just the fix. That&apos;s the difference between a spell check and a writing lesson.
             </p>
          </div>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 16px" }}>
            Most free grammar checkers address the surface problem without teaching you anything. They highlight errors — sometimes incorrectly — with no explanation of the underlying rule. You fix the flagged word, make the same mistake again next week, and never improve. ToolStack's grammar checker takes a different approach: every correction includes the grammar rule, so you understand what you got wrong and why.
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>
            Common errors the tool catches: subject-verb disagreement ("the team are" vs "the team is"), incorrect apostrophe use ("its" vs "it's"), comma splices, tense inconsistency, dangling modifiers, incorrect homophones ("affect" vs "effect", "there" vs "their"), missing articles, and overuse of passive voice. Unlike browser-based tools that only check spelling, this tool analyses full sentence structure and contextual meaning — the difference between a basic spell check and a professional copy-edit.
          </p>
        </div>

        {/* COMPARISON TABLE */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>COMPARISON</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>ToolStack vs. Grammarly vs. Word</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 12, letterSpacing: "0.05em" }}>FEATURE</th>
                  {[
                    { name: "ToolStack", accent: "#38bdf8", highlight: true },
                    { name: "Grammarly Free", accent: "rgba(255,255,255,0.4)", highlight: false },
                    { name: "Microsoft Word", accent: "rgba(255,255,255,0.4)", highlight: false },
                  ].map(h => (
                    <th key={h.name} style={{
                      textAlign: "center", padding: "12px 16px",
                      borderBottom: `2px solid ${h.highlight ? "rgba(56,189,248,0.4)" : "rgba(255,255,255,0.08)"}`,
                      color: h.highlight ? "#38bdf8" : "rgba(255,255,255,0.55)",
                      fontWeight: 800, fontSize: 13,
                      background: h.highlight ? "rgba(56,189,248,0.05)" : "transparent",
                      borderRadius: h.highlight ? "12px 12px 0 0" : 0,
                    }}>{h.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Explanations per correction", ts: "✓ Every fix", gr: "✗ Paid only", wd: "✗ None" },
                  { feature: "AI model", ts: "GPT-4o", gr: "Proprietary", wd: "Rule-based" },
                  { feature: "Grammar score", ts: "✓ 0–100", gr: "✗", wd: "✗" },
                  { feature: "No signup required", ts: "✓ Always", gr: "✗ Account needed", wd: "✗ Microsoft account" },
                  { feature: "No browser extension", ts: "✓ Web-based", gr: "✗ Extension needed", wd: "✗ Desktop app" },
                  { feature: "5 error categories", ts: "✓ Included", gr: "Partial (free)", wd: "Spelling only" },
                  { feature: "Free to use", ts: "✓ Forever", gr: "Partial", wd: "Paid software" },
                ].map((row, i) => (
                  <tr key={row.feature} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                    <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.65)", fontSize: 13, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{row.feature}</td>
                    {[
                      { val: row.ts, highlight: true },
                      { val: row.gr, highlight: false },
                      { val: row.wd, highlight: false },
                    ].map((cell, ci) => (
                      <td key={ci} style={{
                        padding: "12px 16px", textAlign: "center", fontSize: 13, fontWeight: cell.highlight ? 700 : 400,
                        color: cell.highlight ? (cell.val.startsWith("✓") ? "#34d399" : "#38bdf8") : (cell.val.startsWith("✗") ? "#f87171" : "rgba(255,255,255,0.55)"),
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        background: cell.highlight ? "rgba(56,189,248,0.03)" : "transparent",
                      }}>{cell.val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />
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

        {/* SEO Description */}
        <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Grammar Checker: Free Online Tool</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Grammarly costs $12/month for the premium version — but most people only need a grammar checker a few times a week, not every day. Our AI Grammar Checker powered by GPT-4o gives you the same quality of corrections: grammar, spelling, punctuation, word choice, sentence structure, and tone — with plain-English explanations for every correction so you actually learn why something was wrong.
            </p>
            <p style={{ marginBottom: 16 }}>
              Paste your text into the input and click Check. GPT-4o analyzes it for grammar errors, spelling mistakes, punctuation issues, run-on sentences, passive voice overuse, and style suggestions. Each correction is highlighted with an explanation of what was wrong and why, so you're not just getting a correction — you're getting a mini lesson.
            </p>
            <p style={{ marginBottom: 16 }}>
              Common uses include checking job application emails before sending, proofreading cover letters and resumes before submission, reviewing client communications for professionalism, checking blog post drafts for grammar issues before publishing, and editing academic essays for grammar school applications.
            </p>
            <p style={{ marginBottom: 0 }}>
              Most free grammar checkers are rule-based and miss nuance. Ours uses GPT-4o — the same model behind ChatGPT — which understands context, tone, and intent, not just rules. It catches things rule-based tools miss: awkward phrasing, wordy sentences, incorrect word usage, and inconsistent tense. Free, no character limits, no signup required.
            </p>
          </div>
        </section>

        <MoreTools currentSlug="grammar-checker" />
        
      </div>
    </div>
  );
}
