"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Download, Copy, Check, Trash2, Database, Settings } from "lucide-react";
import Link from "next/link";
import { format as formatSql } from "sql-formatter";
import { saveToHistory } from "@/components/HistorySidebar";
import { MoreTools } from "@/components/MoreTools";
import { PipeDataButton } from "@/components/PipeDataButton";
import { ShareSnippetButton } from "@/components/ShareSnippetButton";
import { Editor } from "@monaco-editor/react";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const INITIAL_SQL = `SELECT e.id, e.first_name, e.last_name, d.name AS department_name, count(p.id) as total_projects FROM employees e LEFT JOIN departments d ON e.department_id = d.id LEFT JOIN projects p ON e.id = p.employee_id WHERE e.status = 'ACTIVE' AND d.name IN ('Engineering', 'Product') GROUP BY e.id, e.first_name, e.last_name, d.name HAVING count(p.id) > 5 ORDER BY total_projects DESC LIMIT 10;`;

const HOW_IT_WORKS = [
  { step: "01", title: "Paste Raw Query", body: "Paste your minified or badly formatted native SQL query into the left panel. It accepts complex joined statements, CTEs, and nested subqueries.", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)" },
  { step: "02", title: "Choose Dialect", body: "Select your database specific dialect (like PostgreSQL, MySQL, or standard SQL) to ensure the formatter handles unique keywords and quoting styles correctly.", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)" },
  { step: "03", title: "Copy Clean Code", body: "Hit the Format button to instantly generate a perfectly styled, indented, and capitalized query ready for your codebase or code review.", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
];

const FAQS = [
  {
    q: "Why format my SQL?",
    a: "Raw, unformatted SQL queries (especially long ones with multiple table joins or Common Table Expressions) are incredibly difficult to read and debug. Formatting breaks keywords, clauses, and conditions onto new indented lines, making logic errors immediately obvious.",
  },
  {
    q: "What SQL dialects are supported?",
    a: "This editor uses the standard sql-formatter engine which supports Standard SQL, PostgreSQL, MySQL, MariaDB, SQLite, SQL Server (T-SQL), and more. Changing the dialect adjusts how specific proprietary keywords and quotation marks are handled.",
  },
  {
    q: "Are my database queries stored?",
    a: "No. Security is critical when handling database logic. This entire tool operates 100% locally in your web browser. Your table structure, column names, and query logic are never transmitted to our servers.",
  },
  {
    q: "Why did the formatter break my query?",
    a: "If your SQL query has severe syntax errors (like a missing closing parenthesis or unmatched quotes), the formatting algorithm may fail to parse the Abstract Syntax Tree (AST) correctly. Ensure your query is valid SQL.",
  },
  {
    q: "What does 'Keyword Case' do?",
    a: "It standardizes how SQL commands (like SELECT, FROM, WHERE) are capitalized. The industry standard is 'Upper' (capitalized commands, lowercase tables/columns), making it easier to distinguish logic from data visually.",
  },
  {
    q: "What is the best free online SQL formatter?",
    a: "ToolStack's SQL Formatter is one of the best free options available. It uses a professional-grade sql-formatter engine, supports multiple dialects (PostgreSQL, MySQL, SQLite, T-SQL), offers keyword case control, features a Monaco code editor with syntax highlighting, and runs entirely in your browser with no signup required.",
  },
];

type Dialect = "sql" | "postgresql" | "mysql" | "sqlite" | "tsql";

export default function SqlFormatter({ params }: { params: { dialect?: string[] } }) {
  const urlDialect = (params.dialect?.[0] as Dialect) || "sql";
  const [inputSql, setInputSql] = useState(INITIAL_SQL);
  const [outputSql, setOutputSql] = useState("");
  
  const [dialect, setDialect] = useState<Dialect>(urlDialect);
  const [keywordCase, setKeywordCase] = useState<"upper" | "lower" | "preserve">("upper");
  const [indentParams, setIndentParams] = useState(true);
  
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const initRun = React.useRef(false);

  // V2 Pipe & Share Integration
  useEffect(() => {
    if (typeof window !== "undefined" && !initRun.current) {
      initRun.current = true;
      const urlParams = new URLSearchParams(window.location.search);
      const pipe = urlParams.get("pipe");
      const id = urlParams.get("id");

      if (pipe === "true") {
        const pipedData = localStorage.getItem("toolstack_pipe_payload");
        if (pipedData) {
          setInputSql(pipedData);
          localStorage.removeItem("toolstack_pipe_payload");
          window.history.replaceState({}, '', '/tools/sql-formatter');
        }
      } else if (id) {
        fetch(`/api/share/${id}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.payload_content) {
              setInputSql(data.payload_content);
              window.history.replaceState({}, '', '/tools/sql-formatter');
            }
          })
          .catch(err => console.error("Failed to load snippet", err));
      }
    }
  }, []);

  // Auto-format on change or setting change
  useEffect(() => {
    if (!inputSql.trim()) {
      setOutputSql("");
      return;
    }

    try {
      const formatted = formatSql(inputSql, {
        language: dialect,
        keywordCase: keywordCase,
        params: indentParams ? undefined : [], // simplified logic for the params
        logicalOperatorNewline: "before",
      });
      setOutputSql(formatted);
    } catch (err) {
      // If it critically fails to parse, just output the raw input or a minor error note
      setOutputSql("/* Syntax Error: Unable to format query. Check for unclosed strings or parentheses. */\n\n" + inputSql);
    }
  }, [inputSql, dialect, keywordCase, indentParams]);

  const handleCopy = () => {
    if (!outputSql) return;
    navigator.clipboard.writeText(outputSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    if (!outputSql) return;
    const blob = new Blob([outputSql], { type: "application/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "query.sql";
    a.click();
    URL.revokeObjectURL(url);
  };

  const recordHistory = useCallback(() => {
    if (!inputSql || inputSql === INITIAL_SQL) return;
    saveToHistory({
      toolName: "SQL Formatter",
      slug: "sql-formatter",
      data: { dialect, excerpt: inputSql.substring(0, 30) + "..." },
    });
  }, [inputSql, dialect]);

  const selectStyle: React.CSSProperties = {
    padding: "8px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8, color: "white", fontSize: 13, outline: "none", cursor: "pointer", 
  };

  const getMonacoLanguage = () => {
    if (dialect === "postgresql") return "pgsql";
    if (dialect === "tsql" || dialect === "sqlite") return "sql";
    return dialect;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", padding: "120px 20px 80px" }}>
      {/* Ambient Glows */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
      </div>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "SQL Formatter",
          "description": "Instantly beautify raw, messy SQL queries into readable, perfectly indented syntax. Runs securely browser-side.",
          "url": "https://toolstack.tech/tools/sql-formatter",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Dev Tools", "item": "https://toolstack.tech/tools/category/dev" },
            { "@type": "ListItem", "position": 3, "name": "SQL Formatter", "item": "https://toolstack.tech/tools/sql-formatter" },
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
          <Link href="/tools/category/dev" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Dev Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>SQL Formatter</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center", maxWidth: 1000, margin: "0 auto 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#bfdbfe" }}>{"\u2713"} Multi-Dialect {"\u00b7"} Instant Render {"\u00b7"} Secure & Local</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            SQL Query <br />
            <span style={{ background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Formatter.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Instantly beautify raw, minified database queries into perfectly indented, readable syntax for your codebase.
          </p>
        </div>

        {/* ── Settings Bar ────────────────────────────────────────────── */}
        <div style={{ 
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, 
          padding: "16px 24px", marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Database size={16} color="#60a5fa" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Dialect:</span>
            <select value={dialect} onChange={e => setDialect(e.target.value as Dialect)} onBlur={recordHistory} style={selectStyle}>
              <option value="sql">Standard SQL</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="sqlite">SQLite</option>
              <option value="tsql">T-SQL (SQL Server)</option>
            </select>
          </div>

          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }} className="hide-mobile" />

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Settings size={16} color="#a78bfa" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Keyword Case:</span>
            <select value={keywordCase} onChange={e => setKeywordCase(e.target.value as any)} onBlur={recordHistory} style={selectStyle}>
              <option value="upper">UPPERCASE</option>
              <option value="lower">lowercase</option>
              <option value="preserve">Preserve Original</option>
            </select>
          </div>
        </div>

        {/* ── Main Dual Pane Workspace ───────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24, marginBottom: 64 }}>
          
          {/* Left Pane: Input */}
          <div style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Raw SQL</span>
              <button onClick={() => { setInputSql(""); recordHistory(); }} disabled={!inputSql} style={{
                background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "rgba(255,255,255,0.5)",
                padding: "6px 12px", cursor: inputSql ? "pointer" : "default", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, opacity: inputSql ? 1 : 0.5
              }}>
                <Trash2 size={14} /> Clear Input
              </button>
            </div>
            
            <div style={{ width: "100%", height: 500, borderRadius: "0 0 24px 24px", overflow: "hidden" }}>
              <Editor
                height="100%"
                language={getMonacoLanguage()}
                theme="vs-dark"
                value={inputSql}
                onChange={val => {
                  setInputSql(val || "");
                }}
                onMount={() => recordHistory()}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "monospace",
                  padding: { top: 24, bottom: 24 },
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  overviewRulerBorder: false,
                }}
                loading={<div style={{ padding: 24, color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "monospace" }}>Loading Editor...</div>}
              />
            </div>
          </div>

          {/* Right Pane: Output */}
          <div style={{ display: "flex", flexDirection: "column", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, boxShadow: "inset 0 4px 20px rgba(0,0,0,0.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Formatted SQL</span>
              <div style={{ display: "flex", gap: 8 }}>
                <ShareSnippetButton toolSlug="sql-formatter" payload={outputSql} />
                <PipeDataButton payload={outputSql} />
                <button onClick={handleDownloadFile} disabled={!outputSql} style={{
                  background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "rgba(255,255,255,0.8)",
                  padding: "6px 12px", cursor: outputSql ? "pointer" : "default", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, opacity: outputSql ? 1 : 0.5
                }}>
                  <Download size={14} /> Save .sql
                </button>
                <button onClick={handleCopy} disabled={!outputSql} style={{
                  background: copied ? "#10b981" : "rgba(59,130,246,0.15)", border: `1px solid ${copied ? "#10b981" : "rgba(59,130,246,0.3)"}`,
                  color: copied ? "white" : "#bfdbfe", padding: "6px 14px", borderRadius: 8, cursor: outputSql ? "pointer" : "default", opacity: outputSql ? 1 : 0.5,
                  display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, transition: "all 0.2s"
                }}>
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy Code</>}
                </button>
              </div>
            </div>
            
            <div style={{ width: "100%", height: 500, borderRadius: "0 0 24px 24px", overflow: "hidden" }}>
              <Editor
                height="100%"
                language={getMonacoLanguage()}
                theme="vs-dark"
                value={outputSql || "/* Awaiting input... */"}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "monospace",
                  padding: { top: 24, bottom: 24 },
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  overviewRulerBorder: false,
                }}
                loading={<div style={{ padding: 24, color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "monospace" }}>Loading Editor...</div>}
              />
            </div>
          </div>
          
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* ── How It Works ──────────────────────────────────────── */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How to use the compiler</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Perfectly designed for debugging.</p>
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
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>Why Developers Format SQL in 2026</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
              <strong style={{ color: "white" }}>Structured Query Language (SQL)</strong> is notoriously susceptible to becoming messy, unreadable "spaghetti code." Because SQL interpreters ignore whitespace, software engineers often chain massive queries together on a single line when writing data extraction scripts. However, when these queries fail or hit performance bottlenecks, unformatted SQL is nearly impossible to debug.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
              {[
                { t: "Error Isolation", d: "When a complex query with multiple LEFT JOIN and nested WHERE clauses throws an error, formatting it instantly visually isolates the branching logic, allowing you to spot missing parentheses or invalid syntax immediately." },
                { t: "Code Review Standards", d: "Merging dense, single-line SQL queries into production repositories is a bad practice. Reviewers cannot easily read the diff. Pre-formatting your SQL utilizing uppercase standard commands ensures the pull request is clean and readable." },
                { t: "Cross-Dialect Security", d: "Different databases process queries and quotations differently. By utilizing our specific dialect parsing (e.g., PostgreSQL vs MySQL), the formatter guarantees that your quotation logic is preserved exactly as that specific engine expects." },
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

          <MoreTools currentSlug="sql-formatter" />
          
        </div>
      </div>
    </div>
  );
}
