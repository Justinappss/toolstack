"use client";

import { useState, useCallback, useEffect } from "react";
import { Clock, Copy, Check, ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";
import { saveToHistory } from "@/components/HistorySidebar";
import { MoreTools } from "@/components/MoreTools";

const HOW_IT_WORKS = [
  { step: "01", title: "Epoch to Date", body: "Paste your raw Unix timestamp (either in 10-digit seconds or 13-digit milliseconds) into the top field to instantly calculate the exact human-readable date and time.", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
  { step: "02", title: "Date to Epoch", body: "Alternatively, use the graphical date and time pickers in the bottom module to generate an exact machine-readable Unix timestamp for your databases.", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)" },
  { step: "03", title: "Timezone Shift", body: "The tool automatically displays output in both your local browser timezone and standard UTC to prevent critical server infrastructure errors.", color: "#eab308", bg: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.25)" },
];

const FAQS = [
  {
    q: "What is a Unix Timestamp (Epoch)?",
    a: "Unix time (or Epoch time) is a system for describing a specific point in time. It represents the number of seconds that have elapsed since the Unix epoch, which is exactly 00:00:00 UTC on January 1, 1970, disregarding leap seconds.",
  },
  {
    q: "Should I use Seconds or Milliseconds?",
    a: "It depends on the language. Standard Unix timestamps are in seconds (e.g. 1700000000). However, JavaScript's native Date objects operate exclusively in milliseconds (e.g. 1700000000000). If your timestamp is 13 digits long, it's in milliseconds.",
  },
  {
    q: "What is the Year 2038 Problem?",
    a: "Due to legacy 32-bit integer limitations in older computing systems, the highest Unix timestamp they can calculate is 2147483647 (which is January 19, 2038). When the clock hits that number, those specific older computers may roll over to negative numbers and crash.",
  },
  {
    q: "Does this handle my local timezone?",
    a: "Yes. Unix time itself is absolute and inherently UTC. However, to make it human-readable, this converter parses the absolute timestamp and shifts it visually to match your exact local computer timezone automatically.",
  },
];

export default function UnixConverter() {
  // Current Time Ticker
  const [nowReal, setNowReal] = useState(Date.now());
  useEffect(() => {
    const int = setInterval(() => setNowReal(Date.now()), 1000);
    return () => clearInterval(int);
  }, []);

  // Timestamp to Date
  const [inputTs, setInputTs] = useState("");
  const [outputDateLocal, setOutputDateLocal] = useState("");
  const [outputDateUtc, setOutputDateUtc] = useState("");
  const [tsError, setTsError] = useState("");

  // Date to Timestamp
  const [inputDate, setInputDate] = useState(""); // YYYY-MM-DDTHH:mm
  const [outputTsSec, setOutputTsSec] = useState("");
  const [outputTsMs, setOutputTsMs] = useState("");

  const [copied, setCopied] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Initialize Date Picker to Now
  useEffect(() => {
    const tzOffsetMs = new Date().getTimezoneOffset() * 60000;
    const localIso = new Date(Date.now() - tzOffsetMs).toISOString().slice(0, 16);
    setInputDate(localIso);
  }, []);

  // Process Timestamp to Date
  useEffect(() => {
    if (!inputTs) {
      setOutputDateLocal("");
      setOutputDateUtc("");
      setTsError("");
      return;
    }

    let ts = Number(inputTs);
    if (isNaN(ts)) {
      setTsError("Invalid timestamp number format.");
      setOutputDateLocal("");
      setOutputDateUtc("");
      return;
    }

    // Auto-detect seconds vs ms (heuristic: if < 10000000000 it's likely seconds, meaning before year 2286)
    if (inputTs.length <= 10) {
      ts = ts * 1000; // convert to ms for JS Date
    }

    try {
      const d = new Date(ts);
      if (isNaN(d.getTime())) throw new Error();
      
      setOutputDateLocal(d.toLocaleString([], { dateStyle: 'full', timeStyle: 'long' }));
      setOutputDateUtc(d.toUTCString());
      setTsError("");
    } catch {
      setTsError("Timestamp out of typical date bounds.");
      setOutputDateLocal("");
      setOutputDateUtc("");
    }
  }, [inputTs]);

  // Process Date to Timestamp
  useEffect(() => {
    if (!inputDate) {
      setOutputTsSec("");
      setOutputTsMs("");
      return;
    }

    const d = new Date(inputDate);
    if (!isNaN(d.getTime())) {
      setOutputTsMs(Math.floor(d.getTime()).toString());
      setOutputTsSec(Math.floor(d.getTime() / 1000).toString());
    }
  }, [inputDate]);

  const handleCopy = (text: string, id: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const recordHistory = useCallback((type: string) => {
    saveToHistory({
      toolName: "Unix Epoch Converter",
      slug: "unix-timestamp-converter",
      data: { action: type },
    });
  }, []);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white",
    outline: "none", fontSize: 16, fontFamily: "monospace", transition: "border 0.2s"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", padding: "120px 20px 80px" }}>
      {/* Ambient Glows */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "5%", left: "40%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 50%)", filter: "blur(100px)" }} />
      </div>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Free Unix Timestamp Converter — ToolStack",
          "description": "Instantly convert Unix epochs to human-readable dates or generate exact timestamps.",
          "url": "https://toolstack.tech/tools/unix-timestamp-converter",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Dev Tools", "item": "https://toolstack.tech/tools?category=dev" },
            { "@type": "ListItem", "position": 3, "name": "Unix Timestamp Converter", "item": "https://toolstack.tech/tools/unix-timestamp-converter" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto" }}>
        
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Dev Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Epoch Converter</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#6ee7b7" }}>{"\u2713"} Sec & MS Support {"\u00b7"} Auto-Timezone {"\u00b7"} Client Side</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            Unix Timestamp <br />
            <span style={{ background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Epoch Converter.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Translate integers into formatted dates, or generate UTC Epochs instantly.
          </p>
        </div>

        {/* ── Live Clock Ticker ───────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <div style={{ 
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, 
            padding: "16px 32px", display: "flex", alignItems: "center", gap: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Clock size={20} color="#10b981" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Current Epoch (sec)</span>
                <span style={{ fontSize: 20, fontFamily: "monospace", fontWeight: 700, color: "white" }}>{Math.floor(nowReal / 1000)}</span>
              </div>
            </div>
            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Current Epoch (ms)</span>
              <span style={{ fontSize: 20, fontFamily: "monospace", fontWeight: 700, color: "#6ee7b7" }}>{nowReal}</span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32, marginBottom: 64 }}>
          {/* ── Timestamp to Date Module ───────────────────────────────── */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "32px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: "linear-gradient(90deg, #10b981, transparent)" }} />
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 24px", display: "flex", alignItems: "center", gap: 10 }}>
              <ArrowDown size={18} color="#10b981" /> Timestamp to Date
            </h2>
            
            <div style={{ marginBottom: 24 }}>
              <input 
                type="text" 
                value={inputTs} 
                onChange={e => setInputTs(e.target.value)} 
                onBlur={() => recordHistory("ts_to_date")}
                style={inputStyle} 
                placeholder="Enter timestamp (e.g. 1713374825)" 
              />
              <p style={{ fontSize: 12, color: tsError ? "#ef4444" : "rgba(255,255,255,0.35)", marginTop: 8, margin: "8px 0 0" }}>
                {tsError || "Supports both seconds (10 digits) and milliseconds (13 digits)."}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              <div style={{ background: "rgba(0,0,0,0.4)", padding: "16px 20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 8, letterSpacing: "0.05em" }}>Local Browser Time</span>
                <div style={{ fontSize: 15, color: "white", minHeight: 24, fontWeight: 600 }}>{outputDateLocal || "—"}</div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.4)", padding: "16px 20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 8, letterSpacing: "0.05em" }}>UTC / GMT</span>
                <div style={{ fontSize: 15, color: "#6ee7b7", minHeight: 24, fontWeight: 600 }}>{outputDateUtc || "—"}</div>
              </div>
            </div>
          </div>

          {/* ── Date to Timestamp Module ───────────────────────────────── */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "32px", position: "relative", overflow: "hidden" }}>
             <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: "linear-gradient(90deg, #3b82f6, transparent)" }} />
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 24px", display: "flex", alignItems: "center", gap: 10 }}>
              <ArrowUp size={18} color="#3b82f6" /> Date to Timestamp
            </h2>
            
            <div style={{ marginBottom: 24 }}>
              <input 
                type="datetime-local" 
                value={inputDate} 
                onChange={e => setInputDate(e.target.value)} 
                onBlur={() => recordHistory("date_to_ts")}
                style={{ ...inputStyle, fontFamily: "inherit" }} 
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.4)", padding: "16px 20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <span style={{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 8, letterSpacing: "0.05em" }}>Epoch Seconds (Unix)</span>
                  <div style={{ fontSize: 18, color: "white", minHeight: 24, fontFamily: "monospace" }}>{outputTsSec || "—"}</div>
                </div>
                <button onClick={() => handleCopy(outputTsSec, "sec")} disabled={!outputTsSec} style={{
                  background: copied === "sec" ? "#10b981" : "rgba(255,255,255,0.1)", border: "none",
                  color: "white", padding: "8px", borderRadius: 8, cursor: outputTsSec ? "pointer" : "default", opacity: outputTsSec ? 1 : 0.5,
                  transition: "all 0.2s"
                }}>
                  {copied === "sec" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.4)", padding: "16px 20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <span style={{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 8, letterSpacing: "0.05em" }}>Epoch Milliseconds (JS)</span>
                  <div style={{ fontSize: 18, color: "#93c5fd", minHeight: 24, fontFamily: "monospace" }}>{outputTsMs || "—"}</div>
                </div>
                <button onClick={() => handleCopy(outputTsMs, "ms")} disabled={!outputTsMs} style={{
                  background: copied === "ms" ? "#10b981" : "rgba(255,255,255,0.1)", border: "none",
                  color: "white", padding: "8px", borderRadius: 8, cursor: outputTsMs ? "pointer" : "default", opacity: outputTsMs ? 1 : 0.5,
                  transition: "all 0.2s"
                }}>
                  {copied === "ms" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── How It Works ──────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How to use the compiler</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Handle database times securely.</p>
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
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>The Engineering Standard for Time Architecture</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            <strong style={{ color: "white" }}>Unix Epoch Time</strong> is universally recognized as the safest and most mathematically robust method for storing dates in modern database architectures. Instead of relying on complex, regional string combinations (like `YYYY-MM-DD`), the system simply increments a single integer by exactly one every second, bypassing all geopolitical timezones, daylight savings rules, and formatting contradictions entirely.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "Solving Local Shifts", d: "When a user in London schedules a calendar event for 2 PM and shares it with a user in New York, the server logs a single Unix epoch integer. The frontend dashboard then parses that integer differently based on the viewer's local device, rendering the event simultaneously at 9 AM in New York without any backend adjustments." },
              { t: "Database Indexing Performance", d: "Saving a column as a `TIMESTAMP` string costs significant bytes and heavily fragments database indexes. Utilizing an integer format (like `INT` or `BIGINT`) allows the database to sort sequentially and compress data much more efficiently." },
              { t: "The Millisecond Problem", d: "While traditional Unix systems run entirely on seconds, JavaScript relies on thousands. The `Date.now()` JS function generates a 13-digit millisecond value. Forgetting you divide that backend epoch variable by 1,000 is one of the most common architecture crashes observed in React frameworks." },
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

        <MoreTools currentSlug="unix-timestamp-converter" />
        
      </div>
    </div>
  );
}
