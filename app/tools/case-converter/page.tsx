"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";
import { HowToSchema } from "@/components/ui/HowToSchema";

// ─── Case conversion functions ───────────────────────────────────────────────
const MINOR_WORDS = new Set([
  "a","an","the","and","but","or","for","nor","on","at","to","by","in","of","up","as","is","it","vs","via",
]);

function toUpperCase(s: string)    { return s.toUpperCase(); }
function toLowerCase(s: string)    { return s.toLowerCase(); }
function toTitleCase(s: string)    {
  return s.split(/\s+/).map((w, i) => {
    const l = w.toLowerCase();
    const core = l.replace(/^[^a-z0-9]*/i, "").replace(/[^a-z0-9]*$/i, "");
    if (i !== 0 && MINOR_WORDS.has(core)) return l;
    return l.charAt(0).toUpperCase() + l.slice(1);
  }).join(" ");
}
function toSentenceCase(s: string) {
  return s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
}
function toAlternatingCase(s: string) {
  return s.split("").map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join("");
}
function toInverseCase(s: string) {
  return s.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
}
function toCamelCase(s: string) {
  return s.trim().split(/[\s_\-]+/).map((w, i) => {
    const clean = w.replace(/[^a-zA-Z0-9]/g, "");
    if (!clean) return "";
    return i === 0 ? clean.toLowerCase() : clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
  }).join("");
}
function toPascalCase(s: string) {
  return s.trim().split(/[\s_\-]+/).map(w => {
    const clean = w.replace(/[^a-zA-Z0-9]/g, "");
    if (!clean) return "";
    return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
  }).join("");
}
function toSnakeCase(s: string) {
  return s.trim().replace(/[\s\-]+/g, "_").replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
}
function toKebabCase(s: string) {
  return s.trim().replace(/[\s_]+/g, "-").replace(/[^a-zA-Z0-9\-]/g, "").toLowerCase();
}

// ─── Mode config ─────────────────────────────────────────────────────────────
const STANDARD_MODES = [
  { id: "upper",       label: "UPPER CASE",    fn: toUpperCase,      example: "HELLO WORLD" },
  { id: "lower",       label: "lower case",    fn: toLowerCase,      example: "hello world" },
  { id: "title",       label: "Title Case",    fn: toTitleCase,      example: "Hello World" },
  { id: "sentence",    label: "Sentence case", fn: toSentenceCase,   example: "Hello world" },
  { id: "alternating", label: "AlTeRnAtInG",   fn: toAlternatingCase,example: "HeLlO wOrLd" },
  { id: "inverse",     label: "iNVERSE",       fn: toInverseCase,    example: "hELLO wORLD" },
];

const DEV_MODES = [
  { id: "camel",   label: "camelCase",   fn: toCamelCase,   example: "helloWorld" },
  { id: "pascal",  label: "PascalCase",  fn: toPascalCase,  example: "HelloWorld" },
  { id: "snake",   label: "snake_case",  fn: toSnakeCase,   example: "hello_world" },
  { id: "kebab",   label: "kebab-case",  fn: toKebabCase,   example: "hello-world" },
];

const ALL_MODES = [...STANDARD_MODES, ...DEV_MODES];

const FAQS = [
  {
    q: "What is a case converter and what is it used for?",
    a: "A case converter transforms text between different capitalisation formats. Writers use it to fix accidentally capitalised text (CapsLock errors), marketers use it to format headlines in title case, and developers use camelCase, snake_case, PascalCase and kebab-case for naming variables, functions and URLs. It saves hours of manual reformatting.",
  },
  {
    q: "What is the difference between title case and sentence case?",
    a: "Title Case capitalises the first letter of every significant word (minor words like 'a', 'the', 'and' stay lowercase unless first). Example: 'The Quick Brown Fox Jumps'. Sentence case only capitalises the very first word and proper nouns. Example: 'The quick brown fox jumps'. Use title case for headings, sentence case for body text.",
  },
  {
    q: "What is camelCase and when do developers use it?",
    a: "camelCase writes compound words with no spaces, lowercase first word, uppercase start for every subsequent word — like 'helloWorld' or 'getUserName'. It's the standard naming convention for JavaScript and TypeScript variables, functions and methods, as well as JSON property keys. The name comes from the hump-like uppercase letters.",
  },
  {
    q: "What is snake_case used for?",
    a: "snake_case replaces spaces with underscores and uses all lowercase — like 'hello_world' or 'user_id'. It's the standard convention for Python variable names, database column names, and file names in many projects. It's highly readable because the underscores visually separate words clearly.",
  },
  {
    q: "What is kebab-case used for?",
    a: "kebab-case replaces spaces with hyphens and uses all lowercase — like 'hello-world' or 'my-component'. It's used for URL slugs (domain.com/my-blog-post), CSS class names, HTML attributes, and React/Vue component file names. The name comes from words threaded together like items on a kebab skewer.",
  },
  {
    q: "What is PascalCase and how is it different from camelCase?",
    a: "PascalCase is like camelCase but the very first letter is also capitalised — 'HelloWorld' instead of 'helloWorld'. It's the standard convention for class names and constructor functions in JavaScript/TypeScript, component names in React, and type names in most languages. Both remove spaces; the only difference is whether the first letter is upper or lower.",
  },
  {
    q: "What is the best free online case converter?",
    a: "ToolStack's case converter offers 10 conversion modes — more than any other free tool. Standard modes (UPPER, lower, Title, Sentence, Alternating, Inverse) plus all four developer modes (camelCase, PascalCase, snake_case, kebab-case). Conversions are instant (no API call needed), it works on unlimited text, requires no signup, and shows live word and character counts.",
  },
];

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode]           = useState("upper");
  const [copied, setCopied]       = useState(false);
  const [openFaq, setOpenFaq]     = useState<number | null>(null);

  const selectedMode = ALL_MODES.find(m => m.id === mode) ?? ALL_MODES[0];

  const outputText = useMemo(() => {
    if (!inputText) return "";
    return selectedMode.fn(inputText);
  }, [inputText, selectedMode]);

  const charCount  = inputText.length;
  const wordCount  = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const lineCount  = inputText ? inputText.split("\n").length : 0;
  const outChars   = outputText.length;

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accent    = "#14b8a6";
  const accentRgb = "20,184,166";

  const modeBtn = (m: typeof STANDARD_MODES[0], active: boolean): React.CSSProperties => ({
    padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700,
    cursor: "pointer", transition: "all 0.15s",
    border: `1px solid ${active ? `rgba(${accentRgb},0.5)` : "rgba(255,255,255,0.08)"}`,
    background: active ? `rgba(${accentRgb},0.15)` : "rgba(255,255,255,0.04)",
    color: active ? accent : "rgba(255,255,255,0.55)",
    fontFamily: m.id === "camel" || m.id === "pascal" || m.id === "snake" || m.id === "kebab" ? "monospace" : "inherit",
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
          "name": "Case Converter",
          "description": "Free online text case converter with 10+ modes: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and more. Instant, no signup.",
          "url": "https://toolstack.tech/tools/case-converter",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["10+ case conversion modes", "Instant real-time formatting", "Professional developer modes", "Word/Char/Line counting", "No signup required"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Utility", "item": "https://toolstack.tech/tools/category/utility" },
            { "@type": "ListItem", "position": 3, "name": "Case Converter", "item": "https://toolstack.tech/tools/case-converter" },
          ],
        },
        
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto", padding: "120px 20px 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Case Converter</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40, maxWidth: 680 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: `rgba(${accentRgb},0.1)`, border: `1px solid rgba(${accentRgb},0.28)`, marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#5eead4" }}>✓ Case Converter · 10+ Modes · Instant · No Signup</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Case<br /><span style={{ background: `linear-gradient(135deg, ${accent}, #2dd4bf)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Converter.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>
            Convert text between 10+ formats instantly — UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more. Results update in real time as you type. Free, no signup.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Aa 10 case formats", "⚡ Instant conversion", "{ } Developer modes", "🔓 No signup", "♾ Unlimited text"].map(b => (
              <span key={b} style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Mode selector */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "20px 24px", marginBottom: 12 }}>
          {/* Standard modes */}
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 10px" }}>Standard</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
            {STANDARD_MODES.map(m => (
              <button key={m.id} onClick={() => setMode(m.id)} style={modeBtn(m, mode === m.id)}>
                {m.label}
              </button>
            ))}
          </div>
          {/* Developer modes */}
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 10px" }}>Developer</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {DEV_MODES.map(m => (
              <button key={m.id} onClick={() => setMode(m.id)} style={modeBtn(m, mode === m.id)}>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "20px 22px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>Your Text</p>
            <div style={{ display: "flex", gap: 14 }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{wordCount} words</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{charCount} chars</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{lineCount} lines</span>
            </div>
          </div>
          <label htmlFor="case-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Text to convert case</label>
          <textarea
            id="case-input"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
            style={{
              width: "100%", minHeight: 160, padding: "14px 16px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 12, color: "white", fontSize: 14, lineHeight: 1.75,
              resize: "vertical", outline: "none", fontFamily: "inherit",
            }}
          />
          {inputText && (
            <button onClick={() => setInputText("")} style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              Clear
            </button>
          )}
        </div>

        {/* Output */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: `1px solid ${outputText ? `rgba(${accentRgb},0.2)` : "rgba(255,255,255,0.09)"}`, borderRadius: 18, padding: "20px 22px", marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>Result</p>
              {outputText && (
                <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: `rgba(${accentRgb},0.12)`, color: accent, border: `1px solid rgba(${accentRgb},0.25)` }}>
                  {selectedMode.label}
                </span>
              )}
            </div>
            {outputText && (
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{outChars} chars</span>
                <button onClick={handleCopy} style={{
                  padding: "5px 14px", borderRadius: 8,
                  border: `1px solid rgba(${accentRgb},0.35)`,
                  background: copied ? "rgba(52,211,153,0.15)" : `rgba(${accentRgb},0.1)`,
                  color: copied ? "#34d399" : "#5eead4",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                }}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>
          {outputText ? (
            <p style={{
              fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.88)", margin: 0, whiteSpace: "pre-wrap",
              fontFamily: ["camel","pascal","snake","kebab"].includes(mode) ? "monospace" : "inherit",
              wordBreak: "break-all",
            }}>
              {outputText}
            </p>
          ) : (
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, textAlign: "center", padding: "24px 0" }}>
              Converted text will appear here
            </p>
          )}
        </div>

        {/* HOW IT WORKS */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Convert case in 3 steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Paste your text", desc: "Type or paste any text — a word, sentence, paragraph or thousands of words. No length limit. Works instantly.", color: accent, rgb: accentRgb },
              { step: "02", title: "Pick a case format", desc: "Click any of the 10 mode buttons. Your text converts instantly with no button press needed — real-time as you type.", color: "#a78bfa", rgb: "167,139,250" },
              { step: "03", title: "Copy and use it", desc: "Click Copy to grab the converted text to your clipboard. Paste directly into your code editor, document or wherever you need it.", color: "#34d399", rgb: "52,211,153" },
            ].map(s => (
              <div key={s.step} style={{ padding: "24px 22px", borderRadius: 18, background: `rgba(${s.rgb},0.06)`, border: `1px solid rgba(${s.rgb},0.15)` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>STEP <span style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.step}</span></div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MODES GUIDE */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>ALL 10 MODES</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Every case format explained</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {ALL_MODES.map(m => {
              const isDev = DEV_MODES.some(d => d.id === m.id);
              return (
                <div key={m.id} style={{ padding: "18px 20px", borderRadius: 14, background: isDev ? `rgba(${accentRgb},0.04)` : "rgba(255,255,255,0.03)", border: `1px solid ${isDev ? `rgba(${accentRgb},0.12)` : "rgba(255,255,255,0.07)"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: isDev ? accent : "white", fontFamily: isDev ? "monospace" : "inherit" }}>{m.label}</span>
                    {isDev && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: `rgba(${accentRgb},0.15)`, color: accent }}>DEV</span>}
                  </div>
                  <span style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(255,255,255,0.5)" }}>{m.example}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO CONTENT */}
        <div style={{ marginTop: 64, padding: "36px 40px", borderRadius: 20, background: `rgba(${accentRgb},0.04)`, border: `1px solid rgba(${accentRgb},0.12)` }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Text case formats explained — and when each one matters</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 16px" }}>
            A <strong style={{ color: "white" }}>case converter</strong> transforms text between capitalisation formats — from human-readable styles like Title Case and Sentence case, to programming conventions like camelCase and snake_case. Each format has a specific use context: Title Case for headings and article titles, camelCase for JavaScript variables, snake_case for Python and database columns, kebab-case for URLs and CSS class names. ToolStack&apos;s case converter handles all 10 formats instantly in your browser.
          </p>

          <div style={{ overflowX: "auto", margin: "10px 0 24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: accent }}>Formatting Mode</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Primary Domain</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Readability Grade</th>
                </tr>
              </thead>
              <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Title Case</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Marketing / SEO</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Excellent</td>
                </tr>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>camelCase</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Software Engineering</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>High (Technical)</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Snake_Case</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Databases / URLs</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Highest (Machine)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
             <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>When does case conversion actually matter?</h3>
             <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
               Case matters most in three situations: writing code (variable naming conventions differ by language), copying content between platforms (a heading pasted into a CMS often needs Title Case), and preparing data for import (database fields frequently require consistent lowercase or snake_case). Doing this manually is error-prone — one miscased variable name in code causes a reference error; one inconsistent field in a CSV import can corrupt a batch. This converter handles it instantly.
             </p>
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />
        <HowToSchema
          name="Case Converter"
          description="Convert text between upper case, lower case, title case, sentence case, camelCase, snake_case, and more — instantly."
          steps={[
            { name: "Paste your text", text: "Paste or type the text you want to convert. The tool supports unlimited text length and works entirely in your browser." },
            { name: "Choose the case format", text: "Select your target case format — UPPER, lower, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, or alternating case." },
            { name: "Copy the converted text", text: "Your converted text appears instantly. Click copy to paste it into your document, email, or code editor." },
          ]}
        />
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
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Case Converter: Free Online Tool</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Sometimes you just need to change "Hello World" into "hello world" or "HELLO WORLD" — and you don't want to retype the whole thing or manually fix it in a text editor. Our Case Converter handles every text case format you could need: lowercase, UPPERCASE, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and more. Paste in your text, click a case style, and copy the result.
            </p>
            <p style={{ marginBottom: 16 }}>
              Paste any text into the input field and choose your target case format from the toolbar. Instant conversion, no page reload. Supports all major case conventions including camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, and more. You can convert the entire text or selectively highlight and convert specific portions. Copy to clipboard with one click.
            </p>
            <p style={{ marginBottom: 16 }}>
              Common uses include converting code variable names between camelCase and snake_case conventions, formatting titles and headings for blog posts, documents, or slide decks, converting imported data from CSV or Excel into consistent case formats, creating URL-safe slugs from article titles (kebab-case), and standardizing data imports for databases or CMS platforms.
            </p>
            <p style={{ marginBottom: 0 }}>
              This is one of those tools that's embarrassingly useful for how simple it is. Most online converters only offer 4-5 formats. Ours offers 15+ including some that developers specifically need like dot.case and path/case. It runs entirely in your browser, preserves all special characters, and doesn't limit how much text you can convert at once. Free, no ads, no signup, no usage limits.
            </p>
          </div>
        </section>

        <MoreTools currentSlug="case-converter" />
        
      </div>
    </div>
  );
}
