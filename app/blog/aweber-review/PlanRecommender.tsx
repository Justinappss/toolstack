"use client";
import { useState } from "react";

const accent = "#2563eb";
const accentBorder = "rgba(37,99,235,0.25)";

export function PlanRecommender() {
    const [result, setResult] = useState<{ plan: string; price: string; reason: string } | null>(null);

    function recommend() {
        const size = (document.getElementById("aw-list-size") as HTMLSelectElement)?.value;
        const goal = (document.getElementById("aw-goal") as HTMLSelectElement)?.value;

        let plan = "Free Plan";
        let price = "$0 — up to 500 subscribers";
        let reason = "The free plan gives you everything you need to start building your list — drag-and-drop builder, landing pages, sign-up forms, and basic automation. No card required. Start here, upgrade when you hit 500 subscribers.";

        if (size === "large" || goal === "ecommerce") {
            plan = "Plus";
            price = "$20/month (annual)";
            reason = "Plus unlocks advanced segmentation, unlimited A/B testing, behavioural automation, and priority support. Right for established businesses treating email as their primary revenue channel.";
        } else if (size === "medium" || goal === "automation") {
            plan = "Lite";
            price = "$15/month";
            reason = "Lite gives you unlimited email sends, advanced automation sequences, and removal of AWeber branding. The right step up once you're past 500 subscribers and need proper autoresponder sequences.";
        } else if (goal === "doneforyou") {
            plan = "Done For You";
            price = "$79 one-time";
            reason = "AWeber's team builds your entire email system in 7 days — opt-in forms, welcome sequence, templates, and integrations. Ideal if you want a professional setup without learning the platform yourself.";
        }

        setResult({ plan, price, reason });
    }

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 8 }}>How big is your current email list?</label>
                <select id="aw-list-size" style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", color: "white", fontSize: 14, cursor: "pointer" }}>
                    <option value="none">I&apos;m starting from zero</option>
                    <option value="small">Under 500 subscribers</option>
                    <option value="medium">500–5,000 subscribers</option>
                    <option value="large">5,000+ subscribers</option>
                </select>
            </div>
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 8 }}>What&apos;s your main goal?</label>
                <select id="aw-goal" style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", color: "white", fontSize: 14, cursor: "pointer" }}>
                    <option value="start">Just start building a list</option>
                    <option value="automation">Set up automated email sequences</option>
                    <option value="ecommerce">Sell products via email</option>
                    <option value="doneforyou">I want it built for me</option>
                </select>
            </div>
            <button onClick={recommend} style={{ background: accent, color: "white", border: "none", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%" }}>
                Find My Plan →
            </button>
            {result && (
                <div style={{ background: "rgba(37,99,235,0.1)", border: `1px solid ${accentBorder}`, borderRadius: 10, padding: "18px 22px", marginTop: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: accent, marginBottom: 8 }}>RECOMMENDED PLAN</div>
                    <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{result.plan}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: accent, marginBottom: 10 }}>{result.price}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{result.reason}</div>
                </div>
            )}
        </div>
    );
}
