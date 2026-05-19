"use client";
import { useState, useEffect } from "react";

const accent = "#10b981";

const items = [
    { id: "why-it-matters", label: "Why Password Strength Matters" },
    { id: "how-to-generate", label: "How to Use a Generator" },
    { id: "statistics", label: "Password Security Stats" },
    { id: "expert-advice", label: "Expert Security Advice" },
    { id: "comparison", label: "Generator Comparison" },
    { id: "case-study", label: "Real Business Case Study" },
    { id: "strength-checker", label: "Strength Checker Tool" },
    { id: "action-plan", label: "7-Day Security Plan" },
    { id: "predictions", label: "Future of Passwords" },
    { id: "faq", label: "FAQs" },
];

export function SidebarToc({ toolLink }: { toolLink: string }) {
    const [active, setActive] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
            { rootMargin: "-20% 0px -70% 0px" }
        );
        items.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, []);

    return (
        <aside style={{ position: "sticky", top: 100, width: 220 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 16px", marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>ON THIS PAGE</div>
                {items.map(({ id, label }) => (
                    <a key={id} href={`#${id}`} style={{ display: "block", fontSize: 12, padding: "5px 8px", borderRadius: 6, marginBottom: 2, color: active === id ? accent : "rgba(255,255,255,0.45)", background: active === id ? "rgba(16,185,129,0.08)" : "transparent", textDecoration: "none", transition: "all 0.15s", borderLeft: active === id ? `2px solid ${accent}` : "2px solid transparent" }}>
                        {label}
                    </a>
                ))}
            </div>
            <a href={toolLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: accent, color: "white", textDecoration: "none", textAlign: "center", padding: "13px 16px", borderRadius: 12, fontWeight: 700, fontSize: 13, lineHeight: 1.4 }}>
                Generate Password Free →
            </a>
        </aside>
    );
}
