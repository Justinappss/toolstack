"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { relatedPosts } from "./blogPosts";

// Renders a topic-clustered "Related Reading" block under a blog article.
// Reads the current /blog/<slug> from the path, finds same-topic posts, and
// hides itself on the blog index or when there are no matches.
export function RelatedPosts() {
  const pathname = usePathname() || "";
  const m = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (!m) return null;
  const slug = m[1];
  const related = relatedPosts(slug, 3);
  if (related.length === 0) return null;

  return (
    <section style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px 72px" }}>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "0 0 20px" }}>
          Related Reading
        </h2>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
          {related.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                padding: "18px 20px", borderRadius: 14,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(99,102,241,0.1)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: "white", lineHeight: 1.4 }}>{p.title}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#a5b4fc", whiteSpace: "nowrap" as const }}>Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedPosts;
