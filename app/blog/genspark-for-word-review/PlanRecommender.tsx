"use client";
import { useState } from "react";

const accent = "#7c3aed";
const accentBorder = "rgba(124,58,237,0.25)";

export function PlanRecommender() {
    const [result, setResult] = useState<{ plan: string; reason: string } | null>(null);

    function recommend() {
        const docs = (document.getElementById("docs-per-week") as HTMLSelectElement)?.value;
        const research = (document.getElementById("needs-research") as HTMLSelectElement)?.value;

        let plan = "Free ($0/month)";
        let reason = "100 credits/day covers light document work comfortably at no cost.";

        if (docs === "heavy" || (docs === "moderate" && research === "yes")) {
            plan = "Pro ($249.99/month)";
            reason = "High volume + research demands exceed the Plus credit limit. Pro's 125,000 credits/month prevents interruptions.";
        } else if (docs === "moderate" || research !== "no") {
            plan = "Plus ($24.99/month)";
            reason = "10,000 monthly credits handle regular writing and research queries. Access to GPT-5.1 and Claude Opus 4.5 improves output quality significantly.";
        }

        setResult({ plan, reason });
    }

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 8 }}>How many documents do you write per week?</label>
                <select id="docs-per-week" style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", color: "white", fontSize: 14, cursor: "pointer" }}>
                    <option value="few">1–5 documents (light use)</option>
                    <option value="moderate">6–20 documents (regular writer)</option>
                    <option value="heavy">20+ documents (power user / team)</option>
                </select>
            </div>
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 8 }}>Do you need live web research?</label>
                <select id="needs-research" style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", color: "white", fontSize: 14, cursor: "pointer" }}>
                    <option value="no">No — I mostly draft and edit</option>
                    <option value="sometimes">Sometimes — 1–2 research queries per day</option>
                    <option value="yes">Yes — research is core to my workflow</option>
                </select>
            </div>
            <button onClick={recommend} style={{ background: accent, color: "white", border: "none", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%" }}>
                Find My Plan →
            </button>
            {result && (
                <div style={{ background: "rgba(124,58,237,0.1)", border: `1px solid ${accentBorder}`, borderRadius: 10, padding: "18px 22px", marginTop: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: accent, marginBottom: 8 }}>RECOMMENDED PLAN</div>
                    <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{result.plan}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{result.reason}</div>
                </div>
            )}
        </div>
    );
}
