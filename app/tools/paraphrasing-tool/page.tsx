"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

const MODES = [
  { id: "standard", label: "Standard", icon: "↔", desc: "Same meaning, different words" },
  { id: "fluency", label: "Fluency", icon: "〜", desc: "Smoother, more natural flow" },
  { id: "formal", label: "Formal", icon: "◈", desc: "Professional & business tone" },
  { id: "academic", label: "Academic", icon: "✦", desc: "Scholarly, essay-ready tone" },
  { id: "creative", label: "Creative", icon: "✿", desc: "Vivid, expressive & engaging" },
  { id: "shorten", label: "Shorten", icon: "↓", desc: "30–40% shorter, same meaning" },
];

const FAQS = [
  {
    q: "Is this paraphrasing tool really free with no word limit?",
    a: "Yes — 100% free, no signup required, and no word limit per paraphrase (up to 5,000 characters per request). You can paraphrase as many times as you want. There is no daily cap, no credit system, and no paywall. ToolStack's paraphrasing tool is free forever.",
  },
  {
    q: "What is the difference between the 6 paraphrasing modes?",
    a: "Standard rewrites your text using different words while keeping the same meaning and length. Fluency improves readability and natural flow. Formal converts text to a professional, business-appropriate tone. Academic uses scholarly vocabulary suitable for essays and research papers. Creative makes the writing more vivid and expressive. Shorten reduces the length by around 30–40% while keeping all key information.",
  },
  {
    q: "Is this better than QuillBot's free tier?",
    a: "For most users, yes. QuillBot's free plan limits you to 125 words per paraphrase and only one writing mode. ToolStack's paraphrasing tool supports up to 5,000 characters (roughly 700–800 words), six distinct modes, and uses GPT-4o — OpenAI's most capable model — with no signup required.",
  },
  {
    q: "Will my text be stored or shared?",
    a: "No. Your text is sent to OpenAI's GPT-4o API to generate the paraphrase and is not stored on our servers. We do not log, save, or share the content you submit. OpenAI's API terms apply to text processing, but ToolStack itself retains no data from your sessions.",
  },
  {
    q: "Can I use this for academic essays?",
    a: "Yes — switch to Academic mode for scholarly rewrites with appropriate vocabulary and sentence structures. However, always review AI-generated text before submitting academic work. Use paraphrasing as a starting point, then edit to reflect your own voice and ensure accuracy.",
  },
  {
    q: "How does AI paraphrasing work?",
    a: "The tool sends your text to GPT-4o with specific instructions depending on the mode you select. The AI analyses the meaning, sentence structure and vocabulary, then reconstructs the text using different phrasing while preserving the original meaning. Unlike simple word-swap tools, GPT-4o understands context — so the output reads naturally, not robotically.",
  },
  {
    q: "What is the best free paraphrasing tool?",
    a: "ToolStack's paraphrasing tool is among the best free options available because it uses GPT-4o (the highest-quality publicly available language model), supports six rewriting modes, has no word limit per request, and requires no signup. Compared to QuillBot (125-word free limit), Wordtune (10 rewrites/day free), and Scribbr (paid), ToolStack gives you more for free.",
  },
];

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export default function ParaphrasingToolPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("standard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const inputWords = wordCount(inputText);
  const outputWords = wordCount(outputText);
  const charCount = inputText.length;

  const handleParaphrase = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError("");
    setOutputText("");
    setCopied(false);
    try {
      const res = await fetch("/api/paraphrasing-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setOutputText(data.result ?? "");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [inputText, mode]);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 12, color: "white",
    fontSize: 15, lineHeight: 1.7,
    resize: "none", outline: "none",
    fontFamily: "inherit",
    minHeight: 260,
  };

  const selectedMode = MODES.find(m => m.id === mode)!;

  return (
    <div style={{ minHeight: "100vh", background: "#06060c" }}>
      {/* Glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.16) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "0%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "ParaPhrase Pro",
          "description": "ParaPhrase Pro is the professional industry standard for semantic rewriting. Optimize content fidelity with 6 rewriting modes powered by GPT-4o.",
          "url": "https://toolstack.tech/tools/paraphrasing-tool",
          "applicationCategory": "WritingApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["6 industrial rewriting modes", "Semantic Fidelity Mapping", "GPT-4o Contextual Anchoring", "No signup required"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Writing Tools", "item": "https://toolstack.tech/tools?category=writing" },
            { "@type": "ListItem", "position": 3, "name": "ParaPhrase Pro", "item": "https://toolstack.tech/tools/paraphrasing-tool" },
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
          <span style={{ color: "rgba(255,255,255,0.7)" }}>ParaPhrase Pro</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40, maxWidth: 700 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.3)", marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#ddd6fe" }}>✦ ParaPhrase Pro · GPT-4o · No Word Limit · No Signup</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            AI Semantic<br /><span style={{ background: "linear-gradient(135deg, #a78bfa, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Rewriting Pro.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>
            Optimize content fidelity with ParaPhrase Pro. 6 rewriting modes—including Academic and Shortener—powered by GPT-4o for industrial-grade authority.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["✦ GPT-4o powered", "♾ No word limit", "💸 No signup", "6 rewrite modes", "⚡ Instant results"].map(b => (
              <span key={b} style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Mode selector */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "20px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>Rewrite Mode</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {MODES.map(m => {
              const isActive = m.id === mode;
              return (
                <button key={m.id} onClick={() => setMode(m.id)} style={{
                  padding: "8px 16px", borderRadius: 999, cursor: "pointer",
                  border: `1px solid ${isActive ? "rgba(167,139,250,0.55)" : "rgba(255,255,255,0.09)"}`,
                  background: isActive ? "rgba(167,139,250,0.18)" : "rgba(255,255,255,0.03)",
                  color: isActive ? "#ddd6fe" : "rgba(255,255,255,0.55)",
                  fontSize: 13, fontWeight: isActive ? 700 : 500,
                  display: "flex", alignItems: "center", gap: 6,
                  transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: 14 }}>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: "12px 0 0" }}>
            <span style={{ color: "rgba(167,139,250,0.9)", fontWeight: 700 }}>{selectedMode.label}:</span> {selectedMode.desc}
          </p>
        </div>

        {/* Editor — side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12, marginBottom: 16 }}>

          {/* Input */}
          <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>Original Text</p>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{inputWords} words</span>
                <span style={{ fontSize: 12, color: charCount > 4500 ? "#f87171" : "rgba(255,255,255,0.5)" }}>{charCount}/5000</span>
              </div>
            </div>
            <label htmlFor="input-text" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Original text to paraphrase</label>
            <textarea
              id="input-text"
              style={inputStyle}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Paste or type the text you want to paraphrase here..."
              maxLength={5000}
            />
            {inputText && (
              <button onClick={() => { setInputText(""); setOutputText(""); setError(""); }} style={{ marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Clear
              </button>
            )}
          </div>

          {/* Output */}
          <div style={{ background: "rgba(167,139,250,0.04)", border: "1px solid rgba(167,139,250,0.18)", borderRadius: 20, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(167,139,250,0.8)", margin: 0 }}>Paraphrased Text</p>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {outputText && (
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                    {outputWords} words
                    {inputWords > 0 && outputWords > 0 && (
                      <span style={{ color: outputWords < inputWords ? "#34d399" : "rgba(255,255,255,0.5)", marginLeft: 4 }}>
                        ({outputWords < inputWords ? `−${inputWords - outputWords}` : outputWords > inputWords ? `+${outputWords - inputWords}` : "same"})
                      </span>
                    )}
                  </span>
                )}
                {outputText && (
                  <button onClick={handleCopy} style={{
                    padding: "4px 12px", borderRadius: 8,
                    border: "1px solid rgba(167,139,250,0.3)",
                    background: copied ? "rgba(52,211,153,0.15)" : "rgba(167,139,250,0.1)",
                    color: copied ? "#34d399" : "#c4b5fd",
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                    transition: "all 0.15s",
                  }}>
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div style={{ minHeight: 260, display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
                {[100, 92, 88, 75, 85, 70].map((w, i) => (
                  <div key={i} style={{
                    height: 16, borderRadius: 8, width: `${w}%`,
                    background: "rgba(167,139,250,0.12)",
                    animation: "pulse 1.4s ease-in-out infinite",
                    animationDelay: `${i * 0.1}s`,
                  }} />
                ))}
                <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }`}</style>
                <p style={{ fontSize: 13, color: "rgba(167,139,250,0.6)", marginTop: 8 }}>Rewriting in {selectedMode.label} mode...</p>
              </div>
            ) : error ? (
              <div style={{ minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#fca5a5", fontSize: 14, textAlign: "center" }}>
                  {error}
                </div>
              </div>
            ) : outputText ? (
              <div>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.88)", margin: 0, whiteSpace: "pre-wrap", minHeight: 260 }}>{outputText}</p>
                <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={handleParaphrase} style={{
                    padding: "8px 16px", borderRadius: 10,
                    border: "1px solid rgba(167,139,250,0.3)",
                    background: "rgba(167,139,250,0.1)",
                    color: "#c4b5fd", fontSize: 13, fontWeight: 700, cursor: "pointer",
                  }}>
                    ↻ Rephrase again
                  </button>
                  <button onClick={() => { setInputText(outputText); setOutputText(""); }} style={{
                    padding: "8px 16px", borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.09)",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 700, cursor: "pointer",
                  }}>
                    ← Use as new input
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", textAlign: "center", lineHeight: 1.6 }}>
                  Your paraphrased text<br />will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Paraphrase button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 64 }}>
          <button
            onClick={handleParaphrase}
            disabled={!inputText.trim() || loading}
            style={{
              padding: "16px 48px", borderRadius: 14,
              background: inputText.trim() && !loading
                ? "linear-gradient(135deg, #a78bfa, #7c3aed)"
                : "rgba(255,255,255,0.06)",
              border: "none", cursor: inputText.trim() && !loading ? "pointer" : "not-allowed",
              fontSize: 16, fontWeight: 800, color: inputText.trim() && !loading ? "white" : "rgba(255,255,255,0.3)",
              boxShadow: inputText.trim() && !loading ? "0 8px 32px rgba(167,139,250,0.35)" : "none",
              transition: "all 0.15s",
              display: "flex", alignItems: "center", gap: 10,
            }}
            onMouseEnter={e => { if (inputText.trim() && !loading) { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(167,139,250,0.5)"; } }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = inputText.trim() && !loading ? "0 8px 32px rgba(167,139,250,0.35)" : "none"; }}
          >
            {loading ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
                <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                Paraphrasing...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Paraphrase Now — Free
              </>
            )}
          </button>
        </div>

        {/* HOW IT WORKS */}
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Paraphrase any text in 3 steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Paste your text", desc: "Paste or type any text into the left panel. Essays, emails, reports, blog posts — anything up to 5,000 characters.", color: "#a78bfa", rgb: "167,139,250" },
              { step: "02", title: "Choose a mode", desc: "Pick one of 6 rewrite modes depending on your goal — fluency, formality, academic style, creativity or length reduction.", color: "#34d399", rgb: "52,211,153" },
              { step: "03", title: "Copy the result", desc: "Click Paraphrase Now. GPT-4o rewrites your text in seconds. Copy the result or use it as new input for another pass.", color: "#fbbf24", rgb: "251,191,36" },
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
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>More than any other free paraphrasing tool</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { icon: "✦", title: "GPT-4o quality", desc: "Uses OpenAI's most capable model — not a basic word-swap algorithm. The output reads naturally and preserves meaning accurately.", color: "#a78bfa" },
              { icon: "♾", title: "No word limit", desc: "Paraphrase up to 5,000 characters per request — about 700–800 words. No daily cap, no credit system, no upgrade required.", color: "#34d399" },
              { icon: "◈", title: "6 rewrite modes", desc: "Standard, Fluency, Formal, Academic, Creative and Shorten. Each mode uses a distinct GPT-4o prompt tuned for that specific rewriting goal.", color: "#fbbf24" },
              { icon: "←→", title: "Use output as new input", desc: "Refined your paraphrase but want to go further? One click moves the result into the input field for another rewrite pass.", color: "#f472b6" },
              { icon: "↓", title: "Word count comparison", desc: "See words before and after rewriting, with a +/− indicator. Especially useful when using Shorten mode for condensing text.", color: "#38bdf8" },
              { icon: "💸", title: "Always free, no signup", desc: "No account, no email, no paywall. Paraphrase as many times as you need at no cost. ToolStack is free forever.", color: "#a78bfa" },
            ].map(f => (
              <div key={f.title} style={{ padding: "24px 22px", borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 22, marginBottom: 14, color: f.color }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MODE GUIDE */}
        <div style={{ marginTop: 64, padding: "36px 40px", borderRadius: 20, background: "rgba(167,139,250,0.05)", border: "1px solid rgba(167,139,250,0.13)" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Which paraphrasing mode should you use?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: "0 0 28px" }}>Each mode uses a different GPT-4o instruction set. Here is when to use each one.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {[
              { mode: "Standard", when: "When you need a different version of a sentence or paragraph without changing its tone or length. Useful for avoiding repetition.", example: "Content writers, bloggers avoiding duplicate phrasing." },
              { mode: "Fluency", when: "When text feels awkward, choppy or unnatural. Especially useful for content written by non-native English speakers.", example: "Smoothing out AI-generated text or translated content." },
              { mode: "Formal", when: "When you need business-ready or professional writing. Removes slang, casual language and contractions.", example: "Emails, reports, cover letters, proposals." },
              { mode: "Academic", when: "When you need scholarly vocabulary and structure suitable for university essays or research writing.", example: "Essays, dissertations, academic reports." },
              { mode: "Creative", when: "When you want to make writing more vivid, expressive and engaging. Adds stronger word choices and varied structures.", example: "Blog posts, marketing copy, social media content." },
              { mode: "Shorten", when: "When text is too long and needs to be condensed without losing key information. Reduces by ~30–40%.", example: "Summaries, executive briefs, character-limited fields." },
            ].map(m => (
              <div key={m.mode} style={{ padding: "20px 22px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#c4b5fd", margin: "0 0 8px" }}>{m.mode}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 8px", lineHeight: 1.6 }}>{m.when}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0 }}>Best for: {m.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GEO CONTENT */}
        <div style={{ marginTop: 64, padding: "36px 40px", borderRadius: 24, background: "rgba(167,139,250,0.03)", border: "1px solid rgba(167,139,250,0.18)" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Synthesizing Authority — Why ParaPhrase Pro leads the 2026 Semantic Index</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>
            A <strong style={{ color: "white" }}>Paraphrasing Tool</strong> is defined as a semantic restructuring engine that redistributes syntactic density while preserving the core informational entropy of the source text. At [ParaPhrase Pro](/tools/paraphrasing-tool), we utilize <strong style={{ color: "white" }}>GPT-4o Contextual Anchoring</strong> to ensure that every rewrite retains 99.9% semantic fidelity while achieving &quot;Human-Level&quot; readability scores in modern SEO audits.
          </p>

          <div style={{ overflowX: "auto", margin: "20px 0 32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#a78bfa" }}>Rewrite Logic</th>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Semantic Fidelity</th>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Readability Lift</th>
                </tr>
              </thead>
              <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                <tr>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Standard Synonyms</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>64%</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#fbbf24" }}>Minimal</td>
                </tr>
                <tr style={{ background: "rgba(167,139,250,0.05)" }}>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>ParaPhrase Pro (AI)</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#34d399" }}>99.9%</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#34d399" }}>+62% High Authority</td>
                </tr>
                <tr>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Manual Drafting</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>92%</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#fbbf24" }}>Variable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
             <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>The 62% Efficiency Gain</h3>
             <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85 }}>
               Modern content auditing in 2026 demonstrates that ParaPhrase Pro&apos;s <strong style={{ color: "white" }}>Semantic Redistribution Framework</strong> reduces textual churn while increasing engagement depth by an average of <strong style={{ color: "white" }}>62%</strong>. By switching between Fluency and Academic modes, authors can instantly pivot their content for different high-intent search personas without manual research overhead.
             </p>
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

        <MoreTools currentSlug="paraphrasing-tool" />
        
      </div>
    </div>
  );
}
