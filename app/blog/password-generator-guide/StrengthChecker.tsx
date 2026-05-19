"use client";
import { useState } from "react";

const accent = "#10b981";
const TOOL_LINK = "https://toolstack.tech/tools/password-generator";

function analyze(pw: string) {
    const len = pw.length;
    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSymbol = /[^A-Za-z0-9]/.test(pw);
    let score = 0;
    if (len >= 8) score++;
    if (len >= 12) score++;
    if (len >= 16) score++;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;
    let label: string, color: string, time: string;
    if (score <= 3) { label = "Weak"; color = "#ef4444"; time = "under 1 second"; }
    else if (score <= 4) { label = "Fair"; color = "#f97316"; time = "a few minutes"; }
    else if (score <= 5) { label = "Strong"; color = "#eab308"; time = "several years"; }
    else { label = "Very Strong"; color = accent; time = "thousands of years"; }
    return { label, color, time, hasUpper, hasLower, hasNumber, hasSymbol, len, score };
}

export function StrengthChecker() {
    const [pw, setPw] = useState("");
    const [show, setShow] = useState(false);
    const r = pw ? analyze(pw) : null;

    return (
        <div>
            <div style={{ position: "relative", marginBottom: 16 }}>
                <input
                    type={show ? "text" : "password"}
                    value={pw}
                    onChange={e => setPw(e.target.value)}
                    placeholder="Paste a password to check its strength..."
                    style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 56px 12px 16px", color: "white", fontSize: 15, boxSizing: "border-box", fontFamily: "monospace", outline: "none" }}
                />
                <button onClick={() => setShow(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 13 }}>
                    {show ? "Hide" : "Show"}
                </button>
            </div>
            {r && (
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                        <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${Math.min(100, (r.score / 7) * 100)}%`, background: r.color, borderRadius: 99, transition: "width 0.3s" }} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: r.color, minWidth: 90 }}>{r.label}</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
                        <p style={{ margin: "0 0 12px", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                            Estimated crack time: <strong style={{ color: "white" }}>{r.time}</strong>
                        </p>
                        {[
                            { label: "12+ characters", pass: r.len >= 12 },
                            { label: "Uppercase letters (A–Z)", pass: r.hasUpper },
                            { label: "Lowercase letters (a–z)", pass: r.hasLower },
                            { label: "Numbers (0–9)", pass: r.hasNumber },
                            { label: "Symbols (!@#$%...)", pass: r.hasSymbol },
                        ].map(({ label, pass }) => (
                            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                                <span style={{ fontSize: 15, color: pass ? accent : "#ef4444", lineHeight: 1 }}>{pass ? "✓" : "✗"}</span>
                                <span style={{ fontSize: 13, color: pass ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)", textDecoration: pass ? "none" : "line-through" }}>{label}</span>
                            </div>
                        ))}
                    </div>
                    {r.label !== "Very Strong" && (
                        <a href={TOOL_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: accent, color: "white", textDecoration: "none", textAlign: "center", padding: "12px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
                            Generate a Stronger Password Free →
                        </a>
                    )}
                    {r.label === "Very Strong" && (
                        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, padding: "12px 18px", textAlign: "center", fontSize: 14, color: accent, fontWeight: 600 }}>
                            ✓ This password is very strong. Make sure it&apos;s unique and stored in a password manager.
                        </div>
                    )}
                </div>
            )}
            {!pw && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 0 12px" }}>Or skip straight to generating one:</p>
                    <a href={TOOL_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: accent, color: "white", textDecoration: "none", padding: "11px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
                        Generate Password Free →
                    </a>
                </div>
            )}
        </div>
    );
}
