"use client";
import { useState } from "react";

const accent = "#8b5cf6";
const accentBorder = "rgba(139,92,246,0.25)";

export function PlanFinder() {
    const [result, setResult] = useState<{ plan: string; price: string; reason: string } | null>(null);

    function recommend() {
        const volume = (document.getElementById("oc-video-volume") as HTMLSelectElement)?.value;
        const team = (document.getElementById("oc-team-size") as HTMLSelectElement)?.value;

        let plan = "Free Plan";
        let price = "$0/month — 60 credits (60 min of video)";
        let reason = "The free plan gives you 60 minutes of input video per month with watermarked exports. More than enough to test whether Opus Clip's AI picks the same highlights you would — zero commitment required.";

        if (volume === "heavy" || team === "team") {
            plan = "Pro";
            price = "$49/month (or ~$29/mo billed annually)";
            reason = "300 credits/month with team collaboration (2 seats), 100GB cloud storage, and full access to the AI hook generator and B-Roll features. Right for agencies and content teams publishing daily across multiple platforms.";
        } else if (volume === "moderate") {
            plan = "Starter";
            price = "$19/month";
            reason = "150 credits/month removes the watermark and unlocks one brand template. The right entry point if you publish 2–3 long-form videos per week and want clean exports without paying for features you won't use yet.";
        }

        setResult({ plan, price, reason });
    }

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 8 }}>How much long-form video do you publish per month?</label>
                <select id="oc-video-volume" style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", color: "white", fontSize: 14, cursor: "pointer" }}>
                    <option value="trial">Just testing — I want to see the quality first</option>
                    <option value="moderate">1–4 hours/month (podcaster, YouTuber, webinars)</option>
                    <option value="heavy">5+ hours/month (daily content or agency volume)</option>
                </select>
            </div>
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 8 }}>Are you working solo or with a team?</label>
                <select id="oc-team-size" style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", color: "white", fontSize: 14, cursor: "pointer" }}>
                    <option value="solo">Solo creator</option>
                    <option value="team">Team (2+ people editing or scheduling)</option>
                </select>
            </div>
            <button onClick={recommend} style={{ background: accent, color: "white", border: "none", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%" }}>
                Find My Plan →
            </button>
            {result && (
                <div style={{ background: "rgba(139,92,246,0.1)", border: `1px solid ${accentBorder}`, borderRadius: 10, padding: "18px 22px", marginTop: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: accent, marginBottom: 8 }}>RECOMMENDED PLAN</div>
                    <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{result.plan}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: accent, marginBottom: 10 }}>{result.price}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{result.reason}</div>
                </div>
            )}
        </div>
    );
}
