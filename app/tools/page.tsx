"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ALL_TOOLS, CATEGORIES, CATEGORY_MAP } from "./tool-data";
import ShaderBanner from "@/components/ui/ShaderBanner";
function ToolsGrid() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam ? (CATEGORY_MAP[categoryParam.toLowerCase()] ?? "All") : "All";

  const filtered = activeCategory === "All"
    ? ALL_TOOLS
    : ALL_TOOLS.filter(t => t.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#06060c" }}>
      <ShaderBanner />
      {/* Glow bg */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-10%", left: "-10%",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "120px 24px 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 40, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>All Tools</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            All Free Tools
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: 560, lineHeight: 1.6 }}>
            {ALL_TOOLS.length} tools live. No signup, no ads, instant results. More added every week.
          </p>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {CATEGORIES.map(cat => {
            const isActive = cat === activeCategory;
            const href = cat === "All" ? "/tools" : `/tools/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;
            return (
              <Link key={cat} href={href} style={{
                padding: "8px 18px", borderRadius: 999,
                border: `1px solid ${isActive ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`,
                background: isActive ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                fontSize: 13, fontWeight: isActive ? 700 : 600,
                color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                transition: "all 0.15s",
              }}>
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Tools grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {filtered.map(tool => (
            <Link key={tool.href} href={tool.href} style={{ textDecoration: "none" }}>
              <div style={{
                padding: "24px 26px",
                borderRadius: 20,
                background: `rgba(${tool.accentRgb},0.06)`,
                border: `1px solid rgba(${tool.accentRgb},0.18)`,
                height: "100%",
                transition: "transform 0.15s, box-shadow 0.15s",
                cursor: "pointer",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px rgba(${tool.accentRgb},0.15)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 13,
                      background: `rgba(${tool.accentRgb},0.15)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, color: tool.accent, fontWeight: 700,
                      flexShrink: 0,
                    }}>{tool.icon}</div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
                      padding: "3px 10px", borderRadius: 999,
                      background: `rgba(${tool.accentRgb},0.12)`,
                      border: `1px solid rgba(${tool.accentRgb},0.25)`,
                      color: tool.accent,
                    }}>{tool.category}</span>
                  </div>
                  {tool.badge && (
                    <span style={{
                      fontSize: 10, fontWeight: 800, letterSpacing: "0.08em",
                      padding: "3px 9px", borderRadius: 999,
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      color: "#a5b4fc",
                    }}>{tool.badge}</span>
                  )}
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 8px", lineHeight: 1.3 }}>{tool.title}</h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 16px", lineHeight: 1.6 }}>{tool.desc}</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: tool.accent }}>Use free →</div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 72, padding: "40px 32px", borderRadius: 24,
          background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#818cf8", letterSpacing: "0.06em", margin: "0 0 12px" }}>COMING SOON</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            More tools on the way
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", margin: 0, maxWidth: 480, marginInline: "auto" }}>
            PDF tools, image converters, unit converter, readability checker, and many more — all free, no signup.
          </p>
        </div>

      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense>
      <ToolsGrid />
    </Suspense>
  );
}
