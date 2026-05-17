"use client";

const accent = "#7c3aed";

const TOC = [
    ["#what-is", "What Is It?"],
    ["#vs-copilot", "vs Microsoft Copilot"],
    ["#features", "6 Core Features"],
    ["#install", "How to Install"],
    ["#pricing", "Pricing Plans"],
    ["#who-for", "Who It's For"],
    ["#users", "User Reviews"],
    ["#limitations", "Limitations"],
    ["#verdict", "Verdict"],
    ["#faq", "FAQ"],
];

export function SidebarToc({ affiliateLink }: { affiliateLink: string }) {
    return (
        <aside style={{ position: "sticky", top: 100, height: "fit-content" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>CONTENTS</div>
                <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
                    {TOC.map(([href, label], i) => (
                        <li key={href}>
                            <a
                                href={href}
                                style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 8, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}
                                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = accent; el.style.background = "rgba(124,58,237,0.08)"; }}
                                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.5)"; el.style.background = "transparent"; }}
                            >
                                <span style={{ fontSize: 10, color: "rgba(124,58,237,0.5)", fontWeight: 700, minWidth: 14 }}>{i + 1}</span>
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
                        style={{ display: "block", background: accent, color: "white", padding: "10px 14px", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none", textAlign: "center" }}
                    >
                        Try Free →
                    </a>
                </div>
            </div>
        </aside>
    );
}
