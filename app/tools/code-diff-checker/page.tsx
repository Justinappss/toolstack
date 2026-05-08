"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { DiffEditor } from "@monaco-editor/react";
import { ArrowLeftRight, Trash2, Code2 } from "lucide-react";
import { saveToHistory } from "@/components/HistorySidebar";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const FAQS = [
  {
    q: "What is a Diff Checker?",
    a: "A diff checker is a tool that compares two sets of text or code side-by-side and highlights the exact differences (additions, deletions, and modifications). It is essential for code review, finding minute changes in config files, and auditing API responses.",
  },
  {
    q: "Is it safe to paste sensitive code here?",
    a: "Yes, completely. This diff checker runs 100% locally in your browser using the Monaco Editor engine. Your code is never transmitted to our servers, making it perfectly safe for proprietary source code, credentials, and PII.",
  },
  {
    q: "What languages are supported?",
    a: "The tool automatically defaults to JSON formatting, but because it relies on the underlying VS Code engine, you can paste JavaScript, TypeScript, HTML, CSS, SQL, Python, Markdown, or plain text and the diff algorithm will accurately highlight the logical gaps.",
  },
  {
    q: "What is the best code diff checker?",
    a: "ToolStack's Code Diff Checker is one of the best free options because it uses the same Monaco Editor engine that powers VS Code — giving you IDE-grade syntax highlighting and diff visualization directly in your browser, with no signup, no upload limits, and complete privacy.",
  },
  {
    q: "How do I compare two JSON files?",
    a: "Select JSON from the Format dropdown, paste your original JSON into the left panel and your modified JSON into the right panel, then click Diff. The editor highlights added lines in green and removed lines in red, making it easy to spot structural or value-level differences at a glance.",
  },
  {
    q: "Can I use this to review code changes before committing?",
    a: "Yes. Paste the original version of your file on the left and the modified version on the right to see a clear side-by-side diff before you commit. It is a quick sanity check for spotting unintended changes, leftover debug statements, or formatting inconsistencies.",
  },
];

export default function DiffCheckerPage() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [language, setLanguage] = useState("json");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // V2 Pipe Integration for Original
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("pipe") === "true") {
        const pipedData = localStorage.getItem("toolstack_pipe_payload");
        if (pipedData) {
          setOriginal(pipedData);
          localStorage.removeItem("toolstack_pipe_payload");
          window.history.replaceState({}, '', '/tools/code-diff-checker');
        }
      }
    }
  }, []);

  const recordHistory = useCallback(() => {
    if (!original && !modified) return;
    saveToHistory({
      toolName: "Code Diff Checker",
      slug: "code-diff-checker",
      data: { excerpt: "Compared two snippets" },
    });
  }, [original, modified]);

  const clear = () => {
    setOriginal("");
    setModified("");
  };

  const swap = () => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#06060c", color: "white", padding: "120px 20px 80px" }}>
      {/* Ambient Glows */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,63,94,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
      </div>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Code Diff Checker",
          "description": "Compare two JSON or code files side-by-side with an IDE-grade visual diff editor.",
          "url": "https://toolstack.tech/tools/code-diff-checker",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Dev Tools", "item": "https://toolstack.tech/tools/category/dev" },
            { "@type": "ListItem", "position": 3, "name": "Code Diff Checker", "item": "https://toolstack.tech/tools/code-diff-checker" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>
        
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", maxWidth: 1000, margin: "0 auto 32px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <Link href="/tools/category/dev" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Dev Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Code Diff Checker</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center", maxWidth: 1000, margin: "0 auto 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#fda4af" }}>{"\u2713"} Visual Comparisons {"\u00b7"} IDE Engine {"\u00b7"} 100% Local</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            Code Diff <br />
            <span style={{ background: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Checker.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Compare API responses, config files, or raw code side-by-side using an IDE-grade visual diff engine that instantly isolates logical changes.
          </p>
        </div>

        {/* Toolbar */}
        <div style={{ 
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, 
          padding: "16px 24px", marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Code2 size={16} color="#fb923c" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Format:</span>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white", fontSize: 13, outline: "none", cursor: "pointer" }}>
              <option value="json">JSON</option>
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="plaintext">Plain Text</option>
              <option value="sql">SQL</option>
              <option value="python">Python</option>
              <option value="markdown">Markdown</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={swap} style={{
              background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 8, color: "#a5b4fc",
              padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, transition: "all 0.2s"
            }}>
              <ArrowLeftRight size={14} /> Swap
            </button>
            <button onClick={clear} style={{
              background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: 8, color: "#fda4af",
              padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, transition: "all 0.2s"
            }}>
              <Trash2 size={14} /> Clear Both
            </button>
          </div>
        </div>

        {/* Input Areas */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em", background: "rgba(0,0,0,0.5)", padding: "4px 8px", borderRadius: 6, pointerEvents: "none" }}>Original</div>
            <textarea 
              value={original} 
              onBlur={recordHistory}
              onChange={e => setOriginal(e.target.value)} 
              placeholder="Paste original document here..." 
              style={{ width: "100%", height: 180, borderRadius: 16, background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: 16, fontFamily: "monospace", fontSize: 13, resize: "vertical", outline: "none", transition: "border-color 0.2s" }} 
              onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.4)"}
              onBlurCapture={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em", background: "rgba(0,0,0,0.5)", padding: "4px 8px", borderRadius: 6, pointerEvents: "none" }}>Modified</div>
            <textarea 
              value={modified} 
              onBlur={recordHistory}
              onChange={e => setModified(e.target.value)} 
              placeholder="Paste modified document here..." 
              style={{ width: "100%", height: 180, borderRadius: 16, background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: 16, fontFamily: "monospace", fontSize: 13, resize: "vertical", outline: "none", transition: "border-color 0.2s" }} 
              onFocus={e => e.target.style.borderColor = "rgba(244,63,94,0.4)"}
              onBlurCapture={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
          </div>
        </div>

        {/* Diff Workspace Container */}
        <div style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, boxShadow: "inset 0 4px 20px rgba(0,0,0,0.4)", marginBottom: 64, height: 600, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ padding: "12px 24px", borderRight: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.3)" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Diff Engine: Original Visual Output</span>
            </div>
            <div style={{ padding: "12px 24px", background: "rgba(0,0,0,0.3)" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Diff Engine: Modified Visual Output</span>
            </div>
          </div>
          
          <div style={{ flex: 1, position: "relative" }}>
            <DiffEditor
              height="100%"
              language={language}
              theme="vs-dark"
              original={original}
              modified={modified}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "monospace",
                padding: { top: 24, bottom: 24 },
                renderSideBySide: true,
                readOnly: true,
                wordWrap: "on",
                scrollBeyondLastLine: false,
                renderIndicators: true
              }}
              loading={<div style={{ padding: 24, color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "monospace", textAlign: "center" }}>Loading High-Performance Diff Engine...</div>}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          
           <FaqPageSchema faqs={FAQS} />
           {/* FAQ */}
           <section style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{ borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                    width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", textAlign: "left" as const,
                  }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: 0 }}>{faq.q}</h3>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 18, fontWeight: 300, flexShrink: 0, marginLeft: "auto", transform: faqOpen === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                  </button>
                  {faqOpen === i && (
                    <div style={{ padding: "0 22px 18px", borderTop: "1px solid transparent" }}>
                      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SEO Description */}
          <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Code Diff Checker: Free Online Tool</h2>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>
                Comparing two versions of code to find what changed is one of the most common developer tasks — code reviews, bug hunts, merge conflict resolution, and version rollbacks all require it. Doing it by eye is slow and error-prone. Our Code Diff Checker puts two code blocks side by side, highlights additions in green, deletions in red, and shows you exactly which lines changed.
              </p>
              <p style={{ marginBottom: 16 }}>
                Paste your original code in the left panel and the modified version in the right panel. The tool instantly highlights all differences: added lines, removed lines, and modified lines. You can toggle between side-by-side view and unified diff view. Line numbers are shown on both sides, and syntax highlighting works for over 50 programming languages.
              </p>
              <p style={{ marginBottom: 16 }}>
                Common uses include reviewing a pull request by comparing new code against the base branch, debugging by comparing a working version to a broken one, resolving git merge conflicts by seeing both versions clearly, and tracking down which change introduced a bug by comparing before and after.
              </p>
              <p style={{ marginBottom: 0 }}>
                Most diff tools require you to upload files or use a CLI. Ours works directly in your browser — paste two blocks of code and get an instant visual diff with no accounts, no file uploads, and no data leaving your machine. Free, unlimited diffs, no signup required.
              </p>
            </div>
          </section>

          <MoreTools currentSlug="code-diff-checker" />
          
        </div>
      </div>
    </div>
  );
}
