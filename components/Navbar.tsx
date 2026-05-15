"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ToolSearch } from "./ToolSearch";
import { ALL_TOOLS as MORE_TOOLS } from "./MoreTools";

// Transform MoreTools registry into ToolSearch format
function buildSearchTools() {
    return MORE_TOOLS.map(t => ({
        title: t.name,
        desc: t.desc,
        href: `/tools/${t.slug}`,
        accent: t.color,
        accentRgb: t.bg.match(/rgba?\(([^)]+)\)/)?.[1]?.split(",").slice(0, 3).join(",") ?? "129,140,248",
        category: t.badge ?? "",
        badge: null as null,
        image: `/tools/${t.slug}-preview.png`,
    }));
}

const NAV_LINKS = [
    ["All Tools", "/tools"],
    ["Blog", "/blog"],
    ["AI Tools", "/tools/category/ai"],
    ["SEO", "/tools/category/seo"],
    ["Writing", "/tools/category/writing"],
    ["Dev", "/tools/category/dev"],
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const searchTools = useMemo(() => buildSearchTools(), []);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <header style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
            transition: "all 0.4s ease",
            padding: scrolled ? "10px 0" : "18px 0",
            background: scrolled ? "rgba(8,8,14,0.85)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                    <img
                        src="/favicon.png"
                        alt="ToolStack"
                        width={34}
                        height={34}
                        style={{ borderRadius: 10, boxShadow: "0 4px 16px rgba(99,102,241,0.4)", flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 17, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                        Tool<span style={{ color: "#818cf8" }}>Stack</span>
                    </span>
                </Link>

                <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {NAV_LINKS.map(([label, href]) => (
                        <Link key={label} href={href} style={{
                            padding: "7px 14px", borderRadius: 10,
                            fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.5)",
                            textDecoration: "none", transition: "color 0.15s, background 0.15s",
                        }}
                            onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {!isMobile && (
                        <button onClick={() => setSearchOpen(true)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "8px 16px", borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
                            <Search size={14} /> Search
                        </button>
                    )}

                    {!isMobile && (
                        <Link href="/tools" style={{ background: "white", border: "none", color: "black", padding: "8px 16px", borderRadius: 12, display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                            Browse Tools →
                        </Link>
                    )}

                    {isMobile && (
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        style={{
                            width: 44, height: 44, borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center",
                            justifyContent: "center", cursor: "pointer", color: "white",
                        }}
                    >
                        {open ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /></svg>
                        )}
                    </button>
                    )}
                </div>
            </div>

            {open && (
                <>
                    {/* Backdrop — tap outside to close */}
                    <div
                        onClick={() => setOpen(false)}
                        style={{
                            position: "fixed", inset: 0, zIndex: -1,
                            background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(2px)",
                        }}
                    />
                    <div className="mobile-nav" style={{
                        background: "#0d0d14", borderTop: "1px solid rgba(255,255,255,0.06)",
                        padding: "16px 24px 24px",
                    }}>
                        {/* Mobile search */}
                        <button
                            onClick={() => { setSearchOpen(true); setOpen(false); }}
                            style={{
                                width: "100%", marginBottom: 12,
                                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.6)", padding: "13px 16px", borderRadius: 12,
                                cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                                fontSize: 14, fontWeight: 500, textAlign: "left",
                            }}
                        >
                            <Search size={16} />
                            Search tools…
                        </button>

                        {NAV_LINKS.map(([label, href]) => (
                            <Link key={label} href={href} onClick={() => setOpen(false)} style={{
                                display: "block", padding: "13px 16px", borderRadius: 12,
                                fontSize: 15, fontWeight: 600, color: "white",
                                textDecoration: "none", transition: "background 0.15s",
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                            >
                                {label}
                            </Link>
                        ))}
                        <Link href="/tools" onClick={() => setOpen(false)} style={{
                            display: "block", marginTop: 12, padding: "14px 16px", borderRadius: 12,
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                            fontSize: 15, fontWeight: 700, color: "white", textDecoration: "none",
                            textAlign: "center",
                        }}>
                            Browse All Tools →
                        </Link>
                    </div>
                </>
            )}
            <ToolSearch tools={searchTools} isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </header>
    );
}
