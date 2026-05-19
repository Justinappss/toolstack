"use client";
import { useState } from "react";
import Link from "next/link";

const accent = "#38bdf8";
const accentBorder = "rgba(56,189,248,0.18)";
const accentBg = "rgba(56,189,248,0.06)";

const CHANNELS = [
    { id: "email", label: "📧 Email / Newsletter", source: "newsletter", medium: "email", content: "header-cta" },
    { id: "google", label: "🔵 Google Ads", source: "google", medium: "cpc", content: "headline-v1" },
    { id: "facebook", label: "📘 Facebook / Meta", source: "facebook", medium: "paid-social", content: "carousel-v1" },
    { id: "linkedin", label: "💼 LinkedIn", source: "linkedin", medium: "paid-social", content: "sponsored-post" },
    { id: "organic", label: "📌 Organic Social", source: "instagram", medium: "social", content: "bio-link" },
    { id: "tiktok", label: "🎵 TikTok", source: "tiktok", medium: "paid-social", content: "video-ad-v1" },
];

const TIPS: Record<string, { rule: string; example: string; warning: string }> = {
    email: {
        rule: "Tag every link in every broadcast — header, body, footer CTA all get different utm_content values.",
        example: "utm_source=newsletter&utm_medium=email&utm_campaign=may-2026&utm_content=header-cta",
        warning: "Untagged email links are GA4's #1 cause of inflated Direct traffic.",
    },
    google: {
        rule: "Add utm_term with your target keyword. Google auto-tags gclid but manual UTMs give cleaner cross-channel comparisons.",
        example: "utm_source=google&utm_medium=cpc&utm_campaign=brand-search&utm_term=free+utm+builder",
        warning: "Never mix manual UTMs with auto-tagging disabled — they'll conflict in GA4.",
    },
    facebook: {
        rule: "Use utm_content to identify your creative variant (carousel-blue, video-v2). Essential for A/B testing ad creative.",
        example: "utm_source=facebook&utm_medium=paid-social&utm_campaign=may-promo&utm_content=carousel-blue",
        warning: "Facebook's own analytics and GA4 will show different numbers — that's normal. UTMs make GA4 accurate.",
    },
    linkedin: {
        rule: "Separate paid (paid-social) from organic posts (social) in utm_medium. They have very different conversion patterns.",
        example: "utm_source=linkedin&utm_medium=paid-social&utm_campaign=b2b-lead-gen&utm_content=sponsored-post",
        warning: "LinkedIn's tracking pixel and UTMs can double-count. UTMs in GA4 are the source of truth.",
    },
    organic: {
        rule: "Tag your bio link and any swipe-up / link-in-bio destinations. Organic social without UTMs shows as Direct in GA4.",
        example: "utm_source=instagram&utm_medium=social&utm_campaign=organic-may26&utm_content=bio-link",
        warning: "Never add UTMs to internal links (page to page on your own site) — it resets the session source.",
    },
    tiktok: {
        rule: "TikTok ad traffic is often misattributed. Always tag destination URLs with utm_source=tiktok and utm_medium=paid-social.",
        example: "utm_source=tiktok&utm_medium=paid-social&utm_campaign=product-launch&utm_content=video-ad-v1",
        warning: "TikTok's in-app browser can strip UTM tags on some devices. Test your links before launching.",
    },
};

export function UtmlPlanRecommender() {
    const [selected, setSelected] = useState<string | null>(null);
    const tip = selected ? TIPS[selected] : null;
    const channel = selected ? CHANNELS.find(c => c.id === selected) : null;

    return (
        <div style={{ margin: "0 0 40px", padding: "28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>UTM Plan Recommender</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 20px" }}>What's your primary marketing channel?</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {CHANNELS.map(c => (
                    <button
                        key={c.id}
                        onClick={() => setSelected(c.id)}
                        style={{
                            padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                            background: selected === c.id ? accent : "rgba(255,255,255,0.05)",
                            color: selected === c.id ? "#050505" : "rgba(255,255,255,0.75)",
                            border: `1px solid ${selected === c.id ? accent : "rgba(255,255,255,0.1)"}`,
                        }}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {tip && channel && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: accent, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Your UTM rule</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>{tip.rule}</p>
                    </div>
                    <div style={{ padding: "14px 20px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.65)", wordBreak: "break-all" }}>
                        ?{tip.example}
                    </div>
                    <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", fontSize: 13, color: "rgba(255,180,180,0.85)", lineHeight: 1.55 }}>
                        ⚠️ {tip.warning}
                    </div>
                    <Link href="/tools/utm-builder" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, background: accent, color: "#050505", fontSize: 13, fontWeight: 800, textDecoration: "none", width: "fit-content", marginTop: 4 }}>
                        Build this link now →
                    </Link>
                </div>
            )}
        </div>
    );
}
