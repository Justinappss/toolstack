"use client";
import { useState } from "react";

const accent = "#f97316";
const accentBorder = "rgba(249,115,22,0.25)";

export function PlanFinder() {
    const [result, setResult] = useState<{ plan: string; price: string; reason: string } | null>(null);

    function recommend() {
        const articles = (document.getElementById("rs-articles-per-month") as HTMLSelectElement)?.value;
        const competitors = (document.getElementById("rs-needs-competitor") as HTMLSelectElement)?.value;

        let plan = "Free Trial";
        let price = "$0 — 3 articles, no card";
        let reason = "3 free articles let you evaluate RankSpot's output quality in your specific niche before committing. Judge the keyword choices and content quality yourself — zero risk.";

        if (articles === "heavy") {
            plan = "Premium";
            price = "$149/month";
            reason = "60 articles/month with 10 competitor slots. Right for agencies, niche portfolio operators, or founders treating SEO content as their primary customer acquisition channel.";
        } else if (articles === "moderate" || competitors === "yes") {
            plan = "Growth";
            price = "$79/month";
            reason = "30 articles/month with 5 competitor slots. The best value for most solo founders and content marketers. Competitor tracking lets you steal rival traffic before they notice.";
        } else if (articles === "few") {
            plan = "Starter";
            price = "$39/month";
            reason = "10 articles/month is the right starting cadence for new blogs. Enough to build topical authority in 3–4 months without overcommitting budget on a new channel.";
        }

        setResult({ plan, price, reason });
    }

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 8 }}>How many SEO articles do you need per month?</label>
                <select id="rs-articles-per-month" style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", color: "white", fontSize: 14, cursor: "pointer" }}>
                    <option value="trial">Just testing — let me try a few first</option>
                    <option value="few">1–10 articles (getting started)</option>
                    <option value="moderate">11–30 articles (growing fast)</option>
                    <option value="heavy">30+ articles (agency / scale mode)</option>
                </select>
            </div>
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 8 }}>Do you need to track competitor keywords?</label>
                <select id="rs-needs-competitor" style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", color: "white", fontSize: 14, cursor: "pointer" }}>
                    <option value="no">No — I&apos;ll build my own keyword list</option>
                    <option value="yes">Yes — I want to target what competitors rank for</option>
                </select>
            </div>
            <button onClick={recommend} style={{ background: accent, color: "white", border: "none", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%" }}>
                Find My Plan →
            </button>
            {result && (
                <div style={{ background: "rgba(249,115,22,0.1)", border: `1px solid ${accentBorder}`, borderRadius: 10, padding: "18px 22px", marginTop: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: accent, marginBottom: 8 }}>RECOMMENDED PLAN</div>
                    <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{result.plan}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: accent, marginBottom: 10 }}>{result.price}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{result.reason}</div>
                </div>
            )}
        </div>
    );
}
