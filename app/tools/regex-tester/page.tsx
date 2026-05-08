"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { AlertCircle, Filter, BookOpen, ChevronRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import { saveToHistory } from "@/components/HistorySidebar";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const HOW_IT_WORKS = [
  { step: "01", title: "Write your Pattern", body: "Type your raw regular expression pattern in the top field. You don't need to include the forward slashes (/) as they are automatically applied.", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)" },
  { step: "02", title: "Apply Flags", body: "Enter flags such as 'g' (global), 'i' (case-insensitive), or 'm' (multi-line) in the secondary input box alongside the pattern to modify the search behavior.", color: "#eab308", bg: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.25)" },
  { step: "03", title: "Visual Testing", body: "Paste your target test string into the text area. The tool will instantly parse the combinations and highlight exactly where the pattern registers a match.", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
];

const FAQS = [
  {
    q: "What is a Regular Expression (Regex)?",
    a: "A Regular Expression is a sequence of characters that specifies a search pattern in text. Usually such patterns are used by string-searching algorithms for 'find' or 'find and replace' operations on strings, or for input validation.",
  },
  {
    q: "What flavor of Regex does this use?",
    a: "This tool utilizes standard JavaScript (ECMAScript) Regular Expressions. Due to its web-native environment, it parses patterns flawlessly exactly as they would run in a Node.js server or a Chrome browser client.",
  },
  {
    q: "What are Regex Flags?",
    a: "Flags are optional parameters added to the end of a regular expression that modify its behavior. The most common flags are 'g' (Global: find all matches rather than stopping at the first), 'i' (Ignore Case: match upper and lower case identically), and 'm' (Multiline: allows ^ and $ to match the start/end of every line).",
  },
  {
    q: "Why is my regex not matching anything?",
    a: "Check if you have forgotten the 'g' flag, or if your pattern contains unescaped special characters. Characters like ., +, *, ?, ^, $, (, ), [, ], {, }, |, \\ need to be escaped with a backslash (\\) if you want to match them literally.",
  },
  {
    q: "Is my test data uploaded anywhere?",
    a: "Absolutely not. ToolStack's Regex Tester evaluates everything directly within your local browser runtime. We never send your test strings or analytical data to external servers, making it 100% safe to test sensitive proprietary logs.",
  },
  {
    q: "What is the best free online Regex tester?",
    a: "ToolStack's Regex Tester is a fast, free option that provides real-time visual highlighting of matches as you type. It supports all standard ECMAScript flags (g, i, m), displays every match with its index position, includes a built-in cheatsheet, and runs entirely in your browser with no data sent to any server.",
  },
];

const QUICK_REFERENCE = [
  { pattern: "[abc]", desc: "A single character of: a, b or c" },
  { pattern: "[^abc]", desc: "Any single character EXCEPT: a, b or c" },
  { pattern: "[a-z]", desc: "Any single character in the range a-z" },
  { pattern: ".", desc: "Any single character except newline" },
  { pattern: "\\s", desc: "Any whitespace character" },
  { pattern: "\\d", desc: "Any digit (0-9)" },
  { pattern: "\\w", desc: "Any word character (a-zA-Z0-9_)" },
  { pattern: "a*", desc: "Zero or more of a" },
  { pattern: "a+", desc: "One or more of a" },
  { pattern: "^", desc: "Start of string / line" },
  { pattern: "$", desc: "End of string / line" },
];

interface MatchResult {
  match: string;
  index: number;
  length: number;
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("[A-Z][a-z]+");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("Hello world! This is a Regex testing tool. Welcome to ToolStack.");
  const [error, setError] = useState<string | null>(null);
  
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const { matches, highlightedNodes } = useMemo(() => {
    setError(null);
    if (!pattern) return { matches: [], highlightedNodes: [testString] };

    try {
      const regex = new RegExp(pattern, flags);
      const tempMatches: MatchResult[] = [];
      const nodes: React.ReactNode[] = [];
      let lastIndex = 0;

      // Handle non-global regex separately to avoid infinite loops
      if (!regex.global) {
        const match = regex.exec(testString);
        if (match) {
          tempMatches.push({ match: match[0], index: match.index, length: match[0].length });
          
          nodes.push(testString.substring(0, match.index));
          nodes.push(
            <span key={0} style={{ background: "rgba(139,92,246,0.3)", borderBottom: "2px solid #8b5cf6", borderRadius: 2 }}>
              {match[0]}
            </span>
          );
          nodes.push(testString.substring(match.index + match[0].length));
        } else {
          nodes.push(testString);
        }
      } else {
        // Global regex
        let match;
        let iterationRegex = new RegExp(pattern, flags); // create fresh regex to loop
        
        while ((match = iterationRegex.exec(testString)) !== null) {
          // Prevent infinite loops on zero-length matches (like '^' or '.*' behaving weirdly)
          if (match.index === iterationRegex.lastIndex) {
            iterationRegex.lastIndex++;
          }
          
          if (match[0].length === 0) continue; // skip pure zero length highlighting to avoid breaking UI

          tempMatches.push({ match: match[0], index: match.index, length: match[0].length });
          
          // Text before match
          nodes.push(testString.substring(lastIndex, match.index));
          // Highlighted match
          nodes.push(
            <span key={match.index} style={{ background: "rgba(16,185,129,0.3)", borderBottom: "2px solid #10b981", borderRadius: 2 }}>
              {match[0]}
            </span>
          );
          
          lastIndex = iterationRegex.lastIndex;
        }
        // Remaining text
        nodes.push(testString.substring(lastIndex));
      }

      return { matches: tempMatches, highlightedNodes: nodes.length ? nodes : [testString] };
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Invalid Regular Expression");
      return { matches: [], highlightedNodes: [testString] };
    }
  }, [pattern, flags, testString]);

  const recordHistory = useCallback(() => {
    if (!pattern) return;
    saveToHistory({
      toolName: "Regex Tester",
      slug: "regex-tester",
      data: { pattern: `/${pattern}/${flags}`, testString: testString.substring(0, 15) },
    });
  }, [pattern, flags, testString]);

  const handleCopyCode = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white",
    outline: "none", fontSize: 16, fontFamily: "monospace", transition: "border 0.2s"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", padding: "120px 20px 80px" }}>
      {/* Ambient Glows */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
      </div>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Regex Tester",
          "description": "Instantly test and debug regular expressions against strings with real-time visual highlighting and match details.",
          "url": "https://toolstack.tech/tools/regex-tester",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Dev Tools", "item": "https://toolstack.tech/tools/category/dev" },
            { "@type": "ListItem", "position": 3, "name": "Regex Tester", "item": "https://toolstack.tech/tools/regex-tester" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1040, margin: "0 auto" }}>
        
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <Link href="/tools/category/dev" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Dev Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Regex Tester</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#ddd6fe" }}>{"\u2713"} ECMAScript Standard {"\u00b7"} Zero Latency {"\u00b7"} Client-Side Private</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            Regular Expression <br />
            <span style={{ background: "linear-gradient(135deg, #a78bfa 0%, #34d399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Visual Tester.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Build, test, and debug Regex patterns against sample text interactively with real-time semantic highlighting.
          </p>
        </div>

        {/* ── Main Workspace ───────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, marginBottom: 48 }}>
          
          {/* Regex Input Constructor */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: error ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "32px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Regular Expression</h2>
              {error && <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fca5a5", fontSize: 13 }}><AlertCircle size={14} /> {error}</div>}
            </div>
            
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.2)", userSelect: "none" }}>/</div>
              <input 
                type="text" 
                value={pattern}
                onChange={e => setPattern(e.target.value)}
                onBlur={recordHistory}
                style={{ ...inputStyle, flex: 1, color: error ? "#fca5a5" : "#e2e8f0" }}
                placeholder="Enter regex pattern here..."
                spellCheck="false"
              />
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.2)", userSelect: "none" }}>/</div>
              <div style={{ width: 100, position: "relative" }}>
                 <input 
                  type="text" 
                  value={flags}
                  onChange={e => setFlags(e.target.value)}
                  onBlur={recordHistory}
                  style={{ ...inputStyle, paddingRight: 32, textAlign: "center" }}
                  placeholder="gmi"
                  spellCheck="false"
                />
                <Filter size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>
            {/* Test String Input */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Test String</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{testString.length} chars</span>
              </div>
              
              <div style={{ position: "relative", width: "100%", height: 320 }}>
                {/* The highlighted div perfectly overlaps the textarea so it "appears" to highlight the text */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, bottom: 0, padding: 24, fontSize: 16, fontFamily: "monospace",
                  color: "transparent", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 24, overflowY: "auto", whiteSpace: "pre-wrap", wordWrap: "break-word", lineHeight: 1.6, zIndex: 1
                }}>
                  {highlightedNodes}
                </div>
                
                <textarea
                  value={testString}
                  onChange={e => setTestString(e.target.value)}
                  onBlur={recordHistory}
                  spellCheck="false"
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0, padding: 24, fontSize: 16, fontFamily: "monospace",
                    color: "white", background: "transparent", border: "1px solid transparent",
                    borderRadius: 24, resize: "none", outline: "none", whiteSpace: "pre-wrap", wordWrap: "break-word", lineHeight: 1.6, zIndex: 2
                  }}
                />
              </div>
            </div>

            {/* Match Results */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Found Matches</span>
                <span style={{ 
                  background: matches.length > 0 ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.05)", 
                  color: matches.length > 0 ? "#34d399" : "rgba(255,255,255,0.4)", 
                  padding: "2px 8px", borderRadius: 12, fontSize: 12, fontWeight: 700 
                }}>
                  {matches.length} Match{matches.length !== 1 ? "es" : ""}
                </span>
              </div>
              
              <div style={{
                width: "100%", height: 320, padding: 24, overflowY: "auto",
                background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 24, display: "flex", flexDirection: "column", gap: 12
              }}>
                {error ? (
                  <div style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic", textAlign: "center", marginTop: 40 }}>Invalid pattern syntax</div>
                ) : matches.length === 0 ? (
                  <div style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic", textAlign: "center", marginTop: 40 }}>No matches found in the test string.</div>
                ) : (
                  matches.map((m, idx) => (
                    <div key={idx} style={{ 
                      background: "rgba(255,255,255,0.03)", padding: "12px 16px", borderRadius: 12, borderLeft: "3px solid #10b981",
                      display: "flex", flexDirection: "column", gap: 8
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Match {idx + 1}</span>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Index: {m.index}</span>
                      </div>
                      <div style={{ fontFamily: "monospace", fontSize: 14, color: "#e2e8f0", wordBreak: "break-all" }}>
                        {m.match}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Cheatsheet ──────────────────────────────────────────── */}
        <div style={{ background: "rgba(139,92,246,0.03)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 24, padding: "32px 40px", marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa" }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "white" }}>Regex Cheatsheet</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" }}>Quick reference for building your patterns.</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {QUICK_REFERENCE.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: i < QUICK_REFERENCE.length - 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <code style={{ fontSize: 13, color: "#a78bfa", fontFamily: "monospace", background: "rgba(255,255,255,0.04)", padding: "4px 8px", borderRadius: 6, minWidth: 60, textAlign: "center" }}>
                  {item.pattern}
                </code>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── How It Works ──────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How to use the Tester</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Master regular expressions natively.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {HOW_IT_WORKS.map(item => (
              <div key={item.step} style={{ padding: "22px 20px", borderRadius: 18, background: item.bg, border: `1px solid ${item.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: item.color, marginBottom: 12 }}>STEP {item.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content (Authority Bridge) ────────────────────── */}
        <div style={{ padding: "48px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>Advanced Regex Optimization Standard</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            <strong style={{ color: "white" }}>Regular Expressions (Regex)</strong> heavily penalize poorly written syntactic algorithms. While crafting a pattern that matches the correct string is step one, writing a pattern that matches the string without causing a <em style={{ color: "#fca5a5" }}>Catastrophic Backtracking</em> event is step two. Web developers testing complex form validations rely on ECMAScript engines natively to understand algorithmic latency.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "Lookaheads and Lookbehinds", d: "Modern software architecture requires complex validation. Utilizing positive lookaheads (?=...) ensures the engine validates requirements (such as enforcing both numbers and letters in a password field) without inherently consuming the characters, thereby retaining the initial parsing match state." },
              { t: "Avoiding Infinite Loops", d: "When utilizing Global flags (g) combined with wildcard asterisks (*) on certain engines, the parser can infinitely loop over zero-length boundaries. Using visual testers limits deployment latency failures by proactively surfacing infinite loops." },
              { t: "Cross-Platform Nuances", d: "The JavaScript regex flavor inherently lacks certain server-side features (like dotall `/s` modifiers in older environments, though recently patched, or `.NET` specific logic). Running your strings through this visualizer effectively guarantees standard frontend compatibility." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "20px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />
        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                  width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" as const,
                }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: 0 }}>{faq.q}</h3>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 18, fontWeight: 300, flexShrink: 0, marginLeft: 12, transform: faqOpen === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 22px 18px" }}>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SEO Description */}
        <section style={{ marginTop: 56, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>The Best Free Online Regex Tester in 2025</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Regular expressions (regex) are one of the most powerful tools in a developer's arsenal — and one of the most frustrating to debug. ToolStack's Regex Tester gives you a real-time, visual environment to write, test, and refine your patterns against any input string. Every match is highlighted instantly as you type, with full group capture details and match index positions shown inline.
            </p>
            <p style={{ marginBottom: 16 }}>
              Unlike other regex testers that require you to submit and wait, ToolStack evaluates your pattern on every keystroke. You see matches appear, disappear, and shift in real time — making it dramatically faster to iterate on complex patterns. The tool supports all standard JavaScript regex flags including global (g), case-insensitive (i), multiline (m), dotAll (s), and unicode (u).
            </p>
            <p style={{ marginBottom: 16 }}>
              Whether you're validating email addresses, parsing log files, extracting data from HTML, or building input validation for a web form, this regex tester handles it all. The built-in cheatsheet covers character classes, quantifiers, anchors, lookaheads, lookbehinds, and named groups — everything you need without leaving the page.
            </p>
            <p style={{ marginBottom: 16 }}>
              Professional developers use regex daily for tasks like search-and-replace in code editors, data cleaning in ETL pipelines, log analysis in DevOps, and input sanitization in web applications. A reliable, fast regex tester is essential for productive development — and ToolStack's implementation is engineered to be the fastest and most intuitive option available.
            </p>
            <p style={{ marginBottom: 0 }}>
              ToolStack's Regex Tester is completely free, requires no signup, and runs entirely in your browser — your patterns and test strings never leave your device. Built for developers, by developers, with a focus on speed, clarity, and zero friction.
            </p>
          </div>
        </section>

        {/* Related Tools */}
        <section style={{ marginTop: 24, padding: "24px 28px", borderRadius: 16, background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.12)" }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(96,165,250,0.8)", letterSpacing: "0.06em", textTransform: "uppercase" as const, margin: "0 0 8px" }}>Related Developer Tools</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 12px", lineHeight: 1.6 }}>
            Format and validate JSON, check if a website is down, and more — all free, no signup.
          </p>
          <a href="/tools/category/developer" style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", textDecoration: "none" }}>View all developer tools →</a>
        </section>

        <MoreTools currentSlug="regex-tester" />
        
      </div>
    </div>
  );
}
