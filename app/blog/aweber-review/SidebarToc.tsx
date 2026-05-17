"use client";

const accent = "#2563eb";

export function SidebarToc({ affiliateLink }: { affiliateLink: string }) {
    const items = [
        { id: "what-is", label: "What Is AWeber?" },
        { id: "vs-competitors", label: "vs Mailchimp & Kit" },
        { id: "features", label: "6 Core Features" },
        { id: "setup", label: "Setup Guide" },
        { id: "pricing", label: "Pricing Plans" },
        { id: "pros-cons", label: "Pros & Cons" },
        { id: "who-for", label: "Who It's For" },
        { id: "results", label: "Real Results" },
        { id: "plan-recommender", label: "Find Your Plan" },
        { id: "faq", label: "FAQ" },
        { id: "verdict", label: "Final Verdict" },
    ];

    return (
        <aside style={{ position: "sticky", top: 100, height: "fit-content" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>ON THIS PAGE</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map(({ id, label }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", padding: "6px 10px", borderRadius: 7, borderLeft: "2px solid transparent", transition: "all 0.15s" }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.color = "white";
                            (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = accent;
                            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,99,235,0.07)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
                            (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = "transparent";
                            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                        }}
                    >
                        {label}
                    </a>
                ))}
            </nav>
            <a
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", marginTop: 20, background: accent, color: "white", textAlign: "center", padding: "11px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none" }}
            >
                Try AWeber Free →
            </a>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: 6 }}>500 subscribers free</div>
        </aside>
    );
}
