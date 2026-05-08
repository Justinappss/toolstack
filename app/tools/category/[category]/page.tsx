import Link from "next/link";
import { ALL_TOOLS, CATEGORIES, CATEGORY_MAP } from "../../page";
import { CATEGORY_SEO_CONTENT } from "./category-content";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryParam = category.toLowerCase();
  
  if (!CATEGORY_MAP[categoryParam]) {
    notFound();
  }
  
  const activeCategory = CATEGORY_MAP[categoryParam];
  const filtered = ALL_TOOLS.filter(t => t.category === activeCategory);
  
  const seoContent = CATEGORY_SEO_CONTENT[categoryParam] || CATEGORY_SEO_CONTENT["default"];

  return (
    <div style={{ minHeight: "100vh", background: "#06060c" }}>
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
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{activeCategory}</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            {activeCategory} Tools
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: 560, lineHeight: 1.6 }}>
            {filtered.length} free {activeCategory.toLowerCase()} utilities. No signup, no ads, instant results.
          </p>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {CATEGORIES.map(cat => {
            const isActive = cat === activeCategory;
            const href = cat === "All" ? "/tools" : `/tools/category/${cat.toLowerCase()}`;
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
          marginBottom: 80
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
              }}>
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

        {/* ─── E-E-A-T CATEGORY AUTHORITY TEXT ── */}
        <section style={{ 
          padding: "48px 56px",
          borderRadius: 32,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          marginBottom: 80
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 24 }}>
              <div style={{ width: 28, height: 2, background: "linear-gradient(90deg, #10b981, #34d399)", borderRadius: 2 }} />
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#34d399" }}>Category Guide</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 32 }}>
            {seoContent.title}
          </h2>
          <div style={{ maxWidth: 840 }}>
            {seoContent.content}
          </div>
        </section>

        {/* ─── ADVERTSGPT BANNER ────────────────────────────────────── */}
        <AdvertiseGPTBanner />

      </div>
    </div>
  );
}
