"use client";

const accent = "#8b5cf6";

const TOC: [string, string][] = [
    ["#what-we-tested", "What We Tested"],
    ["#contenders", "The Contenders"],
    ["#auto-clip", "Auto Clip Selection"],
    ["#captions", "Caption Accuracy"],
    ["#speed-output", "Speed & Output"],
    ["#pricing", "Pricing Compared"],
    ["#verdict-table", "The Verdict Table"],
    ["#who-should-switch", "Who Should Switch"],
    ["#faq", "FAQ"],
];

export function SidebarToc({ affiliateLink }: { affiliateLink: string }) {
    return (
        <aside style={{ position: "sticky", top: 100, height: "fit-content" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.55)", marginBottom: 14 }}>CONTENTS</div>
                <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
                    {TOC.map(([href, label], i) => (
                        <li key={href}>
                            <a
                                href={href}
                                style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 8, color: "rgba(255,255,255,0.65)", fontSize: 13, textDecoration: "none" }}
                                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = accent; el.style.background = "rgba(139,92,246,0.08)"; }}
                                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.65)"; el.style.background = "transparent"; }}
                            >
                                <span style={{ fontSize: 10, color: "rgba(139,92,246,0.9)", fontWeight: 700, minWidth: 14 }}>{i + 1}</span>
                                {label}
                            </a>
                        </li>
                    ))}
                </ol>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <a
                        href={affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "block", background: "#6d28d9", color: "white", padding: "10px 14px", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none", textAlign: "center" }}
                    >
                        Try Opus Clip Free →
                    </a>
                </div>
            </div>
        </aside>
    );
}
