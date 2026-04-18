"use client";

import { useState, useCallback, useEffect } from "react";
import { Download, Copy, Check, Trash2, Eye, Code } from "lucide-react";
import Link from "next/link";
import { marked } from "marked";
import { saveToHistory } from "@/components/HistorySidebar";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";
import { MoreTools } from "@/components/MoreTools";
import { PipeDataButton } from "@/components/PipeDataButton";

const INITIAL_MD = `# Welcome to the Markdown Editor! 👋

This is a **real-time** Markdown to HTML converter. You can use it to draft blog posts, README files, or web copy.

## Key Features
- **Live Preview:** See changes perfectly rendered instantly.
- **HTML Export:** One-click copy raw HTML.
- **GitHub Flavored:** Supports tables, task lists, and standard formatting.

### Table Example

| Feature | Support |
|---------|---------|
| Tables | ✅ |
| Code Blocks | ✅ |
| Blockquotes | ✅ |

### Code Example

\`\`\`javascript
function convertMarkdown() {
  console.log("It's fully client-side and secure!");
}
\`\`\`

> "A well-written document is an exercise in empathy." 
> — Standard Proverb

Enjoy writing your next great piece of content!`;

const HOW_IT_WORKS = [
  { step: "01", title: "Write in Markdown", body: "Type or paste your Markdown syntax directly into the left panel. It supports all standard syntax including bold, headers, lists, code blocks, and tables.", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
  { step: "02", title: "Live Render", body: "Watch the visual preview update in real-time. This ensures your formatting, line breaks, and blockquotes look exactly how you expect them to before finalising.", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
  { step: "03", title: "Export HTML", body: "Switch to HTML mode or click Copy to instantly grab perfectly structured semantic HTML code that you can drop straight into your CMS or website.", color: "#6366f1", bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.25)" },
];

const FAQS = [
  {
    q: "What is Markdown?",
    a: "Markdown is a lightweight markup language with plain-text-formatting syntax. Its design allows it to be easily converted to many output formats, but the original purpose was to be highly readable as plain text without looking like it's been marked up with complex tags or formatting instructions.",
  },
  {
    q: "Is this GitHub Flavored Markdown (GFM) compatible?",
    a: "Yes. Our compiler utilizes standardized Markdown parsing that supports tables, code blocks, and strikethroughs which are commonly used in GitHub README files and modern documentation sites.",
  },
  {
    q: "Does this save my text?",
    a: "No. This tool operates 100% locally in your web browser. Nothing you type is saved or transmitted to a database. If you close the tab, your text will be lost, ensuring complete privacy for sensitive documentation.",
  },
  {
    q: "Can I copy the raw HTML?",
    a: "Yes! There are two ways: You can either click the global 'Copy HTML' button, or you can switch the right-hand panel view from 'Visual Preview' to 'Raw HTML' to inspect the exact semantic tags generated from your text.",
  },
  {
    q: "What kind of HTML does it output?",
    a: "It generates clean, semantic HTML5 tags without any inline styles or complicated CSS classes. This ensures your output is completely portable and will inherit the styling of whatever platform or CMS you paste it into.",
  },
];

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(INITIAL_MD);
  const [htmlObj, setHtmlObj] = useState<{ __html: string } | null>(null);
  const [rawHtml, setRawHtml] = useState("");
  
  const [viewMode, setViewMode] = useState<"visual" | "html">("visual");
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // V2 Pipe Integration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("pipe") === "true") {
        const pipedData = localStorage.getItem("toolstack_pipe_payload");
        if (pipedData) {
          setMarkdown(pipedData);
          localStorage.removeItem("toolstack_pipe_payload");
          window.history.replaceState({}, '', '/tools/markdown-editor');
        }
      }
    }
  }, []);

  useEffect(() => {
    // Enable GFM by default in marked (gfm is true by default, but we can verify)
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
  }, []);

  useEffect(() => {
    async function compile() {
      try {
        const result = await marked.parse(markdown || "");
        setRawHtml(result);
        setHtmlObj({ __html: result });
      } catch (err) {
        console.error(err);
      }
    }
    compile();
  }, [markdown]);

  const handleCopyMD = () => {
    if (!markdown) return;
    navigator.clipboard.writeText(markdown);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyHTML = () => {
    if (!rawHtml) return;
    navigator.clipboard.writeText(rawHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleDownloadFile = () => {
    if (!markdown) return;
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const recordHistory = useCallback(() => {
    if (!markdown || markdown === INITIAL_MD) return;
    saveToHistory({
      toolName: "Markdown Editor",
      slug: "markdown-editor",
      data: { excerpt: markdown.substring(0, 30) + "..." },
    });
  }, [markdown]);

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", padding: "120px 20px 80px" }}>
      {/* Ambient Glows */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
      </div>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Free Markdown to HTML Converter — ToolStack",
          "description": "Write, edit, and preview Markdown files instantly. Export perfectly formatted clean HTML code.",
          "url": "https://toolstack.tech/tools/markdown-editor",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Writing Tools", "item": "https://toolstack.tech/tools?category=writing" },
            { "@type": "ListItem", "position": 3, "name": "Markdown Editor", "item": "https://toolstack.tech/tools/markdown-editor" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>
        
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", maxWidth: 1000, margin: "0 auto 32px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Writing Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Markdown Editor</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center", maxWidth: 1000, margin: "0 auto 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#6ee7b7" }}>{"\u2713"} Real-Time Preview {"\u00b7"} Semantic HTML {"\u00b7"} 100% Client Side</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            Markdown to HTML <br />
            <span style={{ background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Live Editor.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Instantly render your Markdown into beautiful visual previews, or extract perfectly compiled semantic HTML code.
          </p>
        </div>

        {/* ── Main Dual Pane Workspace ───────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 64 }} className="md-dual-pane">
          
          {/* Left Pane: Editor */}
          <div style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24 }}>
            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Markdown Input</span>
              
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { setMarkdown(""); recordHistory(); }} style={{
                  background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "rgba(255,255,255,0.5)",
                  padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600
                }}>
                  <Trash2 size={14} /> Clear
                </button>
                <button onClick={handleDownloadFile} style={{
                  background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "rgba(255,255,255,0.8)",
                  padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600
                }}>
                  <Download size={14} /> Save .md
                </button>
                <button onClick={handleCopyMD} style={{
                  background: copiedMd ? "#10b981" : "rgba(255,255,255,0.08)", border: `1px solid ${copiedMd ? "#10b981" : "rgba(255,255,255,0.1)"}`,
                  color: "white", borderRadius: 8, padding: "6px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, transition: "all 0.2s"
                }}>
                  {copiedMd ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
            </div>
            
            <textarea
              value={markdown}
              onChange={e => setMarkdown(e.target.value)}
              onBlur={recordHistory}
              placeholder="Start typing markdown here..."
              spellCheck="false"
              style={{
                width: "100%", height: 600, padding: 24, fontSize: 15, fontFamily: "monospace",
                color: "#e2e8f0", background: "none", border: "none",
                resize: "none", outline: "none", lineHeight: 1.6,
              }}
            />
          </div>

          {/* Right Pane: Render */}
          <div style={{ display: "flex", flexDirection: "column", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, boxShadow: "inset 0 4px 20px rgba(0,0,0,0.4)" }}>
            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.05)", padding: 4, borderRadius: 12 }}>
                <button onClick={() => setViewMode("visual")} style={{
                  padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: viewMode === "visual" ? "#3b82f6" : "transparent",
                  color: viewMode === "visual" ? "white" : "rgba(255,255,255,0.6)",
                  fontSize: 12, fontWeight: 800, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6
                }}>
                  <Eye size={14} /> Visual
                </button>
                <button onClick={() => setViewMode("html")} style={{
                  padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: viewMode === "html" ? "#10b981" : "transparent",
                  color: viewMode === "html" ? "white" : "rgba(255,255,255,0.6)",
                  fontSize: 12, fontWeight: 800, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6
                }}>
                  <Code size={14} /> HTML
                </button>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <PipeDataButton payload={viewMode === "html" ? rawHtml : ""} disabled={viewMode !== "html" || !rawHtml} />
                <button onClick={handleCopyHTML} disabled={!rawHtml} style={{
                background: copiedHtml ? "#10b981" : "rgba(255,255,255,0.05)", border: `1px solid ${copiedHtml ? "#10b981" : "rgba(255,255,255,0.1)"}`,
                color: "white", padding: "6px 14px", borderRadius: 8, cursor: rawHtml ? "pointer" : "default", opacity: rawHtml ? 1 : 0.5,
                display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, transition: "all 0.2s"
              }}>
                  {copiedHtml ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy HTML</>}
                </button>
              </div>
            </div>
            
            <div style={{ padding: 24, overflowY: "auto", height: 600 }}>
              {viewMode === "visual" ? (
                <div 
                  className="prose prose-invert max-w-none" 
                  style={{ color: "#d1d5db" }}
                  dangerouslySetInnerHTML={htmlObj || { __html: "" }} 
                />
              ) : (
                <pre style={{ margin: 0, fontFamily: "monospace", fontSize: 14, color: "#6ee7b7", whiteSpace: "pre-wrap" }}>
                  {rawHtml}
                </pre>
              )}
            </div>
          </div>
          
        </div>
        
        {/* Style injection for markdown prose manually since prose requires tailwind plugin usually */}
        <style dangerouslySetInnerHTML={{ __html: `
          .prose h1, .prose h2, .prose h3 { color: white; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 700; }
          .prose h1 { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
          .prose p { margin-bottom: 1em; line-height: 1.7; }
          .prose a { color: #3b82f6; text-decoration: underline; }
          .prose strong { color: white; font-weight: 700; }
          .prose blockquote { border-left: 4px solid #10b981; padding-left: 16px; color: rgba(255,255,255,0.6); font-style: italic; margin: 1.5em 0; background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 0 8px 8px 0; }
          .prose ul { list-style-type: disc; padding-left: 24px; margin-bottom: 1em; }
          .prose ol { list-style-type: decimal; padding-left: 24px; margin-bottom: 1em; }
          .prose li { margin-bottom: 0.25em; }
          .prose code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em; color: #fca5a5; }
          .prose pre { background: #1e1e2d; padding: 16px; border-radius: 8px; overflow-x: auto; margin-bottom: 1em; border: 1px solid rgba(255,255,255,0.05); }
          .prose pre code { background: none; padding: 0; color: #e2e8f0; font-size: 14px; }
          .prose table { width: 100%; border-collapse: collapse; margin-bottom: 1.5em; }
          .prose th, .prose td { border: 1px solid rgba(255,255,255,0.1); padding: 8px 12px; text-align: left; }
          .prose th { background: rgba(255,255,255,0.05); color: white; }
          
          @media (max-width: 900px) {
            .md-dual-pane { grid-template-columns: 1fr !important; }
          }
        `}} />

        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* ── How It Works ──────────────────────────────────────── */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How to use the compiler</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Perfectly designed for blog posts, readmes, and copy-writing.</p>
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
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>Why Developers and Writers Use Markdown in 2026</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
              <strong style={{ color: "white" }}>Markdown</strong> is rapidly becoming the universal language of content creation on the web. It bridges the critical gap between complex, messy word processors (like Microsoft Word) and the strict, syntactical demands of HTML web browsers. By using simple typographic marks to indicate formatting, writers can compose text at incredibly high speeds without lifting their hands off the keyboard.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
              {[
                { t: "Portability & CMS Native", d: "Content written in Markdown is universally portable. Whether importing straight into Headless CMS systems (like Sanity or Contentful), posting to GitHub repositories, or converting sequentially via React pipelines, your formatted document will never break." },
                { t: "Clean HTML Generation", d: "The principal benefit of writing in our Markdown Editor over a WYSIWYG (What You See Is What You Get) visual editor is the HTML output. Visual editors notoriously inject dirty CSS classes and redundant spans into their code. This engine guarantees 100% semantic compliance." },
                { t: "Distraction Free", d: "Eliminating the toolbar fundamentally changes the psychological approach to writing. Rather than hunting for the 'Bold' button or struggling with bullet point alignments, writers maintain their flow state by injecting rapid symbols like `#` for headings and `**` for emphasis." },
              ].map((item, i) => (
                <div key={i} style={{ padding: "20px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.t}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>

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

          <MoreTools currentSlug="markdown-editor" />
          <AdvertiseGPTBanner />
        </div>
      </div>
    </div>
  );
}
