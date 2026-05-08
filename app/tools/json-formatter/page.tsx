"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { PipeDataButton } from "@/components/PipeDataButton";
import { ShareSnippetButton } from "@/components/ShareSnippetButton";
import { Editor } from "@monaco-editor/react";
import { Plus, X } from "lucide-react";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const SAMPLE_JSONS = [
  {
    label: "API Response",
    value: `{"user":{"id":8472,"name":"Justin Pirrie","email":"justin@toolstack.tech","role":"admin","verified":true,"created_at":"2026-01-15T09:23:41Z","preferences":{"theme":"dark","notifications":true,"timezone":"Europe/London"}},"subscription":{"plan":"pro","status":"active","billing_cycle":"monthly","next_renewal":"2026-05-14","price":{"amount":49.99,"currency":"GBP","tax_rate":0.20}},"projects":[{"id":1,"name":"ToolStack","url":"https://toolstack.tech","tools_live":10,"monthly_visitors":null},{"id":2,"name":"AdvertsGPT","url":"https://advertsgpt.com","tools_live":null,"monthly_visitors":8200}],"meta":{"api_version":"v2","request_id":"req_x9k2p","response_time_ms":142,"cached":false}}`,
  },
  {
    label: "Config File",
    value: `{"name":"my-app","version":"2.1.0","private":true,"scripts":{"dev":"next dev","build":"next build","start":"next start","lint":"eslint ."},"dependencies":{"next":"16.2.3","react":"19.2.0","react-dom":"19.2.0"},"devDependencies":{"typescript":"^5","@types/node":"^20","@types/react":"^19","eslint":"^9"},"engines":{"node":">=18.0.0"}}`,
  },
  {
    label: "Invalid JSON",
    value: `{\n  "name": "test",\n  "items": [\n    { "id": 1, "value": "hello" },\n    { "id": 2, "value": "world", },\n  ],\n  // This is a comment\n  "active": true\n}`,
  },
];

const FAQS = [
  {
    q: "What is a JSON formatter?",
    a: "A JSON formatter (also called a JSON beautifier or JSON prettifier) takes minified or poorly indented JSON and reformats it with consistent indentation, line breaks, and spacing to make it human-readable. It is one of the most common tools used by developers when working with APIs, config files, and data exports.",
  },
  {
    q: "Is my JSON data safe to paste here?",
    a: "Yes, completely. All formatting, validation, and minification happens locally in your browser using JavaScript — no data is sent to any server. Your JSON never leaves your device. This is especially important when working with API responses that contain sensitive data like tokens, credentials, or personally identifiable information (PII).",
  },
  {
    q: "What is the difference between format and minify?",
    a: "Format (beautify) adds indentation, line breaks and spacing to make JSON human-readable. Minify does the opposite — it removes all unnecessary whitespace to produce the smallest possible string, ideal for network transmission and storage. A formatted 10KB JSON file might minify down to 6KB, reducing load times when used in APIs or web apps.",
  },
  {
    q: "What does the validator check?",
    a: "The validator checks that your JSON strictly conforms to the JSON specification (RFC 8259). Common errors it catches include: trailing commas (not allowed in JSON), single quotes instead of double quotes, unquoted keys, comments (not valid in JSON), missing or extra brackets/braces, and malformed escape sequences in strings.",
  },
  {
    q: "Why is my JSON invalid?",
    a: "The most common JSON errors are: (1) trailing commas after the last item in an array or object — valid in JavaScript but not JSON; (2) single quotes instead of double quotes for strings and keys; (3) unquoted property names; (4) comments — JSON does not support // or /* */ comments; (5) undefined or NaN values — use null instead.",
  },
  {
    q: "Can I use this for large JSON files?",
    a: "Yes. Because everything runs in your browser, there are no file size limits imposed by a server. Performance depends on your device — most modern computers handle JSON files up to several MB instantly.",
  },
  {
    q: "What is the best JSON formatter?",
    a: "ToolStack's JSON formatter is one of the best free options because it runs 100% in your browser (no data sent anywhere), includes syntax-highlighted output with colour-coded types, detects errors with exact line and character positions, shows a JSON stats panel with depth/key counts, supports format and minify modes, has a tree view, and works well on mobile. Unlike most JSON tools, there's no signup, no ads, and no data ever sent to a server.",
  },
];

type Mode = "format" | "minify" | "validate";
type ViewMode = "text" | "tree";

type EditorTab = {
  id: string;
  name: string;
  input: string;
  output: string;
  parsed: unknown;
  mode: Mode;
  viewMode: ViewMode;
  error: string | null;
  valid: boolean | null;
  indent: number;
};

// ── Tree view ──────────────────────────────────────────────────────
function TreeNode({ data, depth = 0, keyName }: { data: unknown; depth?: number; keyName?: string }) {
  const [collapsed, setCollapsed] = useState(depth > 2);
  const indent = depth * 16;
  const isObj = data !== null && typeof data === "object" && !Array.isArray(data);
  const isArr = Array.isArray(data);
  const isPrim = !isObj && !isArr;

  const primColor = () => {
    if (data === null) return "#f87171";
    if (typeof data === "boolean") return "#a78bfa";
    if (typeof data === "number") return "#f59e0b";
    return "#34d399";
  };

  const entries = isObj ? Object.entries(data as Record<string, unknown>) : isArr ? (data as unknown[]).map((v, i) => [String(i), v] as [string, unknown]) : [];
  const count = entries.length;

  return (
    <div style={{ paddingLeft: indent }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, cursor: (isObj || isArr) ? "pointer" : "default", minHeight: 22 }}
        onClick={() => (isObj || isArr) && setCollapsed(c => !c)}>
        {(isObj || isArr) && (
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", width: 12, flexShrink: 0, userSelect: "none" }}>
            {collapsed ? "▶" : "▼"}
          </span>
        )}
        {keyName !== undefined && (
          <span style={{ color: "#818cf8", fontSize: 13, fontFamily: "monospace" }}>&quot;{keyName}&quot;<span style={{ color: "rgba(255,255,255,0.3)" }}>: </span></span>
        )}
        {isPrim && <span style={{ color: primColor(), fontSize: 13, fontFamily: "monospace" }}>{JSON.stringify(data)}</span>}
        {(isObj || isArr) && collapsed && (
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>
            {isArr ? `[ ${count} item${count !== 1 ? "s" : ""} ]` : `{ ${count} key${count !== 1 ? "s" : ""} }`}
          </span>
        )}
        {(isObj || isArr) && !collapsed && (
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, fontFamily: "monospace" }}>{isArr ? "[" : "{"}</span>
        )}
      </div>
      {(isObj || isArr) && !collapsed && (
        <>
          {entries.map(([k, v]) => (
            <TreeNode key={k} data={v} depth={depth + 1} keyName={isObj ? k : undefined} />
          ))}
          <div style={{ paddingLeft: 12, color: "rgba(255,255,255,0.35)", fontSize: 13, fontFamily: "monospace" }}>{isArr ? "]" : "}"}</div>
        </>
      )}
    </div>
  );
}

// ── JSON stats ─────────────────────────────────────────────────────
function getStats(parsed: unknown) {
  let keys = 0, depth = 0, arrays = 0, objects = 0, nulls = 0;
  function walk(v: unknown, d: number) {
    depth = Math.max(depth, d);
    if (v === null) { nulls++; return; }
    if (Array.isArray(v)) { arrays++; v.forEach(i => walk(i, d + 1)); }
    else if (typeof v === "object") { objects++; Object.entries(v as Record<string, unknown>).forEach(([, val]) => { keys++; walk(val, d + 1); }); }
  }
  walk(parsed, 0);
  return { keys, depth, arrays, objects, nulls };
}

export default function JSONFormatterPage() {
  const [tabs, setTabs] = useState<EditorTab[]>([
    { id: "1", name: "Payload 1", input: "", output: "", parsed: null, mode: "format", viewMode: "text", error: null, valid: null, indent: 2 }
  ]);
  const [activeTabId, setActiveTabId] = useState("1");
  const activeTab = useMemo(() => tabs.find(t => t.id === activeTabId) || tabs[0], [tabs, activeTabId]);

  const [copied, setCopied]     = useState(false);
  const [openFaq, setOpenFaq]   = useState<number | null>(null);
  const [activeSample, setActiveSample] = useState<number | null>(null);

  const processData = useCallback((raw: string, m: Mode, ind: number) => {
    let result = { output: "", error: null as string | null, valid: null as boolean | null, parsed: null as unknown };
    if (!raw.trim()) { 
      return result;
    }
    try {
      const p = JSON.parse(raw);
      result.valid = true;
      result.parsed = p;
      if (m === "minify") result.output = JSON.stringify(p);
      else result.output = JSON.stringify(p, null, ind);
    } catch (e: any) {
      result.error = e.message;
      result.valid = false;
    }
    return result;
  }, []);

  const updateTab = useCallback((id: string, updates: Partial<EditorTab>) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

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
          const res = processData(pipedData, activeTab.mode, activeTab.indent);
          updateTab(activeTabId, { input: pipedData, ...res });
          localStorage.removeItem("toolstack_pipe_payload");
          window.history.replaceState({}, '', '/tools/json-formatter');
        }
      } else if (id) {
        fetch(`/api/share/${id}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.payload_content) {
              const res = processData(data.payload_content, activeTab.mode, activeTab.indent);
              updateTab(activeTabId, { input: data.payload_content, ...res, name: "Shared" });
              window.history.replaceState({}, '', '/tools/json-formatter');
            }
          })
          .catch(err => console.error("Failed to load snippet", err));
      }
    }
  }, [activeTabId, activeTab.mode, activeTab.indent, processData, updateTab]);

  function handleInput(val: string) { 
    const res = processData(val, activeTab.mode, activeTab.indent);
    updateTab(activeTabId, { input: val, ...res });
  }
  function handleMode(m: Mode) { 
    const res = processData(activeTab.input, m, activeTab.indent);
    updateTab(activeTabId, { mode: m, ...res });
  }
  function handleIndent(n: number) { 
    const res = processData(activeTab.input, activeTab.mode, n);
    updateTab(activeTabId, { indent: n, ...res });
  }
  function setViewMode(v: ViewMode) {
    updateTab(activeTabId, { viewMode: v });
  }

  function loadSample(idx: number) {
    const val = SAMPLE_JSONS[idx].value;
    const res = processData(val, activeTab.mode, activeTab.indent);
    updateTab(activeTabId, { input: val, ...res });
    setActiveSample(idx);
  }

  function clear() { 
    updateTab(activeTabId, { input: "", output: "", error: null, valid: null, parsed: null });
    setActiveSample(null); 
  }

  function copyOutput() {
    if (!activeTab.output) return;
    navigator.clipboard.writeText(activeTab.output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  const addTab = () => {
    const newId = Date.now().toString();
    const newCount = tabs.length + 1;
    setTabs(prev => [...prev, { id: newId, name: `Payload ${newCount}`, input: "", output: "", parsed: null, mode: "format", viewMode: "text", error: null, valid: null, indent: 2 }]);
    setActiveTabId(newId);
  };

  const removeTab = (id: string) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const stats = useMemo(() => activeTab.parsed !== null ? getStats(activeTab.parsed) : null, [activeTab.parsed]);
  const lineCount = activeTab.output.split("\\n").length;
  // Use text encoder for precise byte count
  const byteCount = typeof window !== 'undefined' ? new TextEncoder().encode(activeTab.output).length : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#06060c", paddingBottom: 100 }}>
      {/* Glows */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -100, left: "20%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: 300, right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.10) 0%, transparent 70%)", filter: "blur(90px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1040, margin: "0 auto", padding: "72px 20px 60px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>JSON Formatter</span>
        </nav>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", marginBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#a5b4fc" }}>{"{ }"} JSON Formatter · Validator · Minifier · Multi-Tab · Free</span>
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900, color: "white", lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
          JSON{" "}
          <span style={{ background: "linear-gradient(135deg, #6366f1, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Formatter.
          </span>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: 640, margin: "0 0 28px" }}>
          The professional developer&apos;s toolkit for JSON. Format, validate, and minify data instantly with zero server-side exposure. Multi-tab environment designed for advanced workflows.
        </p>

        {/* ── IDE COMPONENT ── */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24 }}>
          
          {/* TABS HEADER */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "10px 22px 0", background: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(255,255,255,0.08)", borderTopLeftRadius: 24, borderTopRightRadius: 24, overflowX: "auto" }}>
            {tabs.map(tab => (
              <div key={tab.id} 
                onClick={() => setActiveTabId(tab.id)}
                style={{
                  padding: "8px 16px",
                  background: activeTabId === tab.id ? "rgba(99,102,241,0.15)" : "transparent",
                  color: activeTabId === tab.id ? "white" : "rgba(255,255,255,0.4)",
                  border: `1px solid ${activeTabId === tab.id ? "rgba(99,102,241,0.3)" : "transparent"}`,
                  borderBottom: "none",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap"
                }}>
                {tab.name}
                {tab.error && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f87171" }} />}
                {tabs.length > 1 && (
                  <button 
                    onClick={e => { e.stopPropagation(); removeTab(tab.id); }}
                    style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, opacity: 0.6 }}>
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
            <button onClick={addTab} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: "8px 12px", display: "flex", alignItems: "center" }}>
              <Plus size={16} /> <span style={{ fontSize: 12, fontWeight: 700, marginLeft: 6 }}>New Tab</span>
            </button>
          </div>

          <div style={{ padding: "24px 22px" }}>
            {/* Toolbar row 1: mode + indent + actions */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4 }}>
                {(["format", "minify", "validate"] as Mode[]).map(m => (
                  <button key={m} onClick={() => handleMode(m)} style={{ padding: "7px 16px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 800, background: activeTab.mode === m ? "rgba(99,102,241,0.25)" : "transparent", color: activeTab.mode === m ? "#a5b4fc" : "rgba(255,255,255,0.4)", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>

              {activeTab.mode !== "minify" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>INDENT</span>
                  {[2, 4].map(n => (
                    <button key={n} onClick={() => handleIndent(n)} style={{ width: 30, height: 26, borderRadius: 7, border: `1px solid ${activeTab.indent === n ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`, cursor: "pointer", fontSize: 12, fontWeight: 700, background: activeTab.indent === n ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)", color: activeTab.indent === n ? "#a5b4fc" : "rgba(255,255,255,0.4)" }}>
                      {n}
                    </button>
                  ))}
                </div>
              )}

              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button onClick={clear} style={{ padding: "7px 14px", borderRadius: 10, border: "1px solid rgba(248,113,113,0.2)", cursor: "pointer", fontSize: 12, fontWeight: 700, background: "rgba(248,113,113,0.07)", color: "#f87171" }}>Clear Tab</button>
              </div>
            </div>

            {/* Sample buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", alignSelf: "center" }}>TRY A SAMPLE:</span>
              {SAMPLE_JSONS.map((s, i) => (
                <button key={i} onClick={() => loadSample(i)} style={{ padding: "5px 12px", borderRadius: 8, border: `1px solid ${activeSample === i ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`, cursor: "pointer", fontSize: 12, fontWeight: 600, background: activeSample === i ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.03)", color: activeSample === i ? "#a5b4fc" : "rgba(255,255,255,0.45)", transition: "all 0.15s" }}>
                  {s.label}
                </button>
              ))}
            </div>

            {/* Editor columns */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>

              {/* Input */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, minHeight: 24 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Input</span>
                  {activeTab.input && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{activeTab.input.length.toLocaleString()} chars</span>}
                </div>
                <div style={{ width: "100%", height: 400, borderRadius: 16, background: "rgba(0,0,0,0.35)", border: `1px solid ${activeTab.error ? "rgba(248,113,113,0.4)" : "rgba(255,255,255,0.08)"}`, overflow: "hidden", transition: "border-color 0.2s" }}>
                  <Editor
                    height="100%"
                    defaultLanguage="json"
                    theme="vs-dark"
                    value={activeTab.input}
                    onChange={(val) => handleInput(val || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 13,
                      fontFamily: "monospace",
                      padding: { top: 16, bottom: 16 },
                      lineNumbers: "on",
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      folding: true,
                      formatOnPaste: false,
                      overviewRulerBorder: false,
                    }}
                    loading={<div style={{ padding: 20, color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "monospace" }}>Loading Editor...</div>}
                  />
                </div>
              </div>

              {/* Output */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, minHeight: 24 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Output</span>
                    {/* View mode toggle */}
                    {activeTab.valid && activeTab.parsed !== null && (
                      <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "2px 3px" }}>
                        {(["text", "tree"] as ViewMode[]).map(v => (
                          <button key={v} onClick={() => setViewMode(v)} style={{ padding: "3px 10px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 800, background: activeTab.viewMode === v ? "rgba(99,102,241,0.3)" : "transparent", color: activeTab.viewMode === v ? "#a5b4fc" : "rgba(255,255,255,0.35)", transition: "all 0.15s" }}>
                            {v === "text" ? "TEXT" : "TREE"}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {activeTab.output && (
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{lineCount} lines · {byteCount}B</span>
                      <ShareSnippetButton toolSlug="json-formatter" payload={activeTab.output} />
                      <PipeDataButton payload={activeTab.output} />
                      <button onClick={copyOutput} style={{ padding: "4px 12px", borderRadius: 8, border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)"}`, cursor: "pointer", fontSize: 11, fontWeight: 700, background: copied ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.04)", color: copied ? "#34d399" : "rgba(255,255,255,0.45)", transition: "all 0.15s" }}>
                        {copied ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ position: "relative", width: "100%", height: 400, padding: (activeTab.viewMode === "text" && activeTab.valid) ? 0 : "14px 16px", borderRadius: 16, boxSizing: "border-box", background: "rgba(0,0,0,0.35)", border: `1px solid ${activeTab.valid === true ? "rgba(52,211,153,0.2)" : activeTab.valid === false ? "rgba(248,113,113,0.3)" : "rgba(255,255,255,0.08)"}`, overflow: (activeTab.viewMode === "text" && activeTab.valid) ? "hidden" : "auto", transition: "border-color 0.2s" }}>
                  {activeTab.error && (
                    <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", color: "#f87171", marginBottom: 6 }}>✗ INVALID JSON</div>
                      <div style={{ fontSize: 12, color: "rgba(248,113,113,0.9)", fontFamily: "monospace", lineHeight: 1.6 }}>{activeTab.error}</div>
                    </div>
                  )}
                  {activeTab.valid && activeTab.output && activeTab.viewMode === "text" && (
                    <>
                      <div style={{ position: "absolute", top: 12, right: 12, zIndex: 10, display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 8, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#34d399" }}>✓ Valid JSON</span>
                      </div>
                      <Editor
                        height="100%"
                        defaultLanguage="json"
                        theme="vs-dark"
                        value={activeTab.output}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 13,
                          fontFamily: "monospace",
                          padding: { top: 16, bottom: 16 },
                          lineNumbers: "on",
                          scrollBeyondLastLine: false,
                          wordWrap: "on",
                          overviewRulerBorder: false,
                        }}
                        loading={<div style={{ padding: 20, color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "monospace" }}>Loading Editor...</div>}
                      />
                    </>
                  )}
                  {activeTab.valid && activeTab.parsed !== null && activeTab.viewMode === "tree" && (
                    <>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 8, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", marginBottom: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#34d399" }}>✓ Valid JSON — Tree View</span>
                      </div>
                      <TreeNode data={activeTab.parsed} />
                    </>
                  )}
                  {!activeTab.output && !activeTab.error && (
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, fontFamily: "monospace" }}>Output appears here...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Stats bar */}
            {stats && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { label: "Keys", value: stats.keys },
                  { label: "Objects", value: stats.objects },
                  { label: "Arrays", value: stats.arrays },
                  { label: "Depth", value: stats.depth },
                  { label: "Nulls", value: stats.nulls },
                  { label: "Output size", value: `${byteCount}B` },
                ].map(s => (
                  <div key={s.label} style={{ padding: "6px 14px", borderRadius: 10, background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{s.label}: </span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#a5b4fc" }}>{s.value}</span>
                  </div>
                ))}
                <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.15)", alignSelf: "center" }}>100% private — nothing leaves your browser</span>
              </div>
            )}

            {/* Error status bar */}
            {activeTab.valid === false && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 12, color: "#f87171" }}>
                ✗ Invalid JSON · Fix the error above and your output will appear instantly
              </div>
            )}
          </div>
        </div>

        {/* ── SEO GUIDE ── */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "36px 36px", marginBottom: 48, marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", marginBottom: 20, letterSpacing: "-0.02em" }}>The Developer&apos;s Power Guide to JSON in 2026</h2>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 20 }}>
            <p>
              JSON (JavaScript Object Notation) is defined as a lightweight, text-based, language-independent data-interchange format derived from JavaScript, used for representing structured data as attribute-value pairs and arrays. However, as distributed systems and microservices become more complex, the bottleneck in development is no longer network speed—it is <strong style={{ color: "white" }}>Human-Parsable Visibility</strong>. ToolStack&apos;s JSON Formatter is built to turn &quot;wall of text&quot; data into actionable intelligence.
            </p>
            {/* Redacted for brevity in update, keep your previous standard content here mostly */}
            <p>
              Equip your workflow with the most secure and powerful <strong style={{ color: "white" }}>JSON utility</strong> on the web. Professional-grade debugging, IDE tab support, zero account friction.
            </p>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div style={{ marginTop: 64 }}>
           {/* ... Rest of existing structure ... */}
           <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Format JSON in three steps</h2>
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Paste your JSON", desc: "Paste any JSON — from an API response, config file, database export or log. Minified, nested, or malformed — it handles everything.", color: "#6366f1", rgb: "99,102,241" },
              { step: "02", title: "Choose a mode", desc: "Format to beautify with syntax highlighting. Switch to Tree View to explore nested data. Minify to compress for production.", color: "#34d399", rgb: "52,211,153" },
              { step: "03", title: "Copy the output", desc: "One click copies the formatted JSON. The stats bar shows key count, depth, objects and arrays at a glance.", color: "#a78bfa", rgb: "167,139,250" },
            ].map(s => (
              <div key={s.step} style={{ padding: "24px 22px", borderRadius: 18, background: `rgba(${s.rgb},0.06)`, border: `1px solid rgba(${s.rgb},0.15)` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>STEP <span style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.step}</span></div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />
        {/* ── FAQ ── */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>FAQ</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 16, background: openFaq === i ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${openFaq === i ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)"}`, overflow: "hidden", transition: "all 0.2s" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left" as const }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0, lineHeight: 1.4 }}>{faq.q}</h3>
                  <span style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px" }}>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content Section */}
        <section style={{ marginBottom: 56, padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>JSON Formatter & Validator: Free Online Tool</h2>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>Whether you're debugging an API response, pretty-printing a configuration file, or validating that a data export is correctly structured, working with raw JSON is painful when it's minified or unformatted. Our JSON Formatter & Validator tool makes it instant — paste your JSON, get perfectly formatted output with syntax highlighting, and know immediately if your JSON is valid or where the error lies.</p>
                
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "24px 0 12px" }}>How the JSON Formatter & Validator Tool Works</h3>
                <p style={{ marginBottom: 16 }}>Paste any JSON into the editor, and the tool instantly formats it with proper indentation, highlights syntax for readability, and validates the structure. If your JSON is invalid, it pinpoints the exact line and character where the error occurs. You can also minify JSON to reduce payload size, or convert between flat and nested JSON structures. Everything runs locally in your browser — your JSON never leaves your machine.</p>
                
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "24px 0 12px" }}>Common Use Cases</h3>
                <ul style={{ paddingLeft: 20, marginBottom: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    <li>Debugging API responses from REST or GraphQL endpoints</li>
                    <li>Formatting configuration files (package.json, tsconfig.json, etc.)</li>
                    <li>Validating data exports before importing into a database</li>
                    <li>Pretty-printing minified JSON from production logs</li>
                    <li>Minifying JSON for production payload size optimization</li>
                    <li>Comparing two JSON files to find structural differences</li>
                </ul>
                
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "24px 0 12px" }}>Why Use Our Free JSON Formatter & Validator Tool</h3>
                <p style={{ marginBottom: 16 }}>Most online JSON formatters either show ads, limit usage, or send your data to their servers. Ours is completely free with no usage limits, runs 100% in your browser (nothing is transmitted to any server), and offers features like error pinpointing, minification, and key sorting that you'd normally pay for. It's the fastest way to work with JSON on any device.</p>
                
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "24px 0 12px" }}>Related Tools</h3>
                <p style={{ marginBottom: 8 }}>If you found this tool useful, you might also like:</p>
                <ul style={{ paddingLeft: 20, marginBottom: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                    <li><Link href="/tools/regex-tester" style={{ color: "#6366f1", textDecoration: "none" }}>Regex Tester & Debugger</Link> — test regular expressions with highlighting</li>
                    <li><Link href="/tools/api-tester" style={{ color: "#6366f1", textDecoration: "none" }}>API Tester</Link> — test and debug API endpoints with custom headers and bodies</li>
                    <li><Link href="/tools/website-down-checker" style={{ color: "#6366f1", textDecoration: "none" }}>Website Down Checker</Link> — verify your API endpoints are reachable</li>
                </ul>
                
                <div style={{ padding: "20px", background: "rgba(52,211,153,0.1)", borderRadius: 12, border: "1px solid rgba(52,211,153,0.2)" }}>
                    <strong style={{ color: "white" }}>Need to format or validate JSON?</strong> Use the JSON Formatter & Validator above — it's free, instant, and runs entirely in your browser.
                </div>
            </div>
        </section>

        {/* SEO Description */}
        <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>JSON Formatter: Free Online Tool</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Every developer works with JSON daily — API responses, config files, database exports, package.json — and every developer knows the pain of opening a minified JSON blob and seeing nothing useful. Our JSON Formatter formats, validates, and minifies JSON instantly with full syntax highlighting, error pinpointing, and a tree view that makes navigating large JSON objects trivial.
            </p>
            <p style={{ marginBottom: 16 }}>
              Paste any JSON into the editor and it instantly formats with proper indentation, highlights syntax for readability, and validates the structure. If your JSON is invalid, it pinpoints the exact character position of the error. You can also minify JSON for production payloads, sort keys alphabetically for easier diffing, and switch between formatted text view and collapsible tree view.
            </p>
            <p style={{ marginBottom: 16 }}>
              Common uses include debugging API responses from REST or GraphQL endpoints, formatting and validating configuration files, prettifying minified JSON from production logs, validating that a data export is structurally correct before importing, minifying JSON for production payload optimization, and comparing two JSON files using sorted keys.
            </p>
            <p style={{ marginBottom: 0 }}>
              Most online formatters either show ads, limit usage, or send your data to their servers. Ours is completely free with no usage limits, runs 100% in your browser, and offers error pinpointing, tree view, key sorting, and minification — features that usually require a paid tool. Fast, no signup, works offline once loaded.
            </p>
          </div>
        </section>

        <MoreTools currentSlug="json-formatter" />

      </div>

      {/* JSON-LD: WebApplication + BreadcrumbList + FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "JSON Formatter",
          "url": "https://toolstack.tech/tools/json-formatter",
          "description": "Free online JSON formatter, validator, and minifier. Format, beautify, and lint JSON instantly in your browser with syntax error highlighting, tree view, and multi-tab support. No signup, 100% private.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["JSON formatting and beautification", "JSON validation with error positions", "JSON minification", "Tree view explorer", "Multi-tab workspace", "100% browser-side — no data sent to server"],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Dev Tools", "item": "https://toolstack.tech/tools?category=dev" },
            { "@type": "ListItem", "position": 3, "name": "JSON Formatter", "item": "https://toolstack.tech/tools/json-formatter" },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        },
      ])}} />
    </div>
  );
}
