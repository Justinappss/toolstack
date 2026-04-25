"use client";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSending(true);
        setError("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });
            if (!res.ok) throw new Error("Failed");
            setSent(true);
        } catch {
            setError("Something went wrong. Please email us directly.");
        } finally {
            setSending(false);
        }
    }

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "12px 16px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.04)",
        color: "white",
        fontSize: 15,
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.15s",
    };

    return (
        <div style={{ minHeight: "100vh", background: "#06060c" }}>
            <div style={{ maxWidth: 680, margin: "0 auto", padding: "120px 24px 80px" }}>

                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 40, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
                    <span>›</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>Contact</span>
                </nav>

                <h1 style={{ fontSize: 42, fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                    Get in touch
                </h1>
                <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", margin: "0 0 48px", lineHeight: 1.6 }}>
                    Have a question, found a bug, or want to suggest a tool? We read every message.
                </p>

                {/* Direct email */}
                <div style={{
                    padding: "20px 24px",
                    borderRadius: 14,
                    background: "rgba(99,102,241,0.07)",
                    border: "1px solid rgba(99,102,241,0.18)",
                    marginBottom: 40,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}>
                    <span style={{ fontSize: 20 }}>✉</span>
                    <div>
                        <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Email us directly</p>
                        <a href="mailto:juzzy@daijavu.uk" style={{ fontSize: 15, color: "#a5b4fc", textDecoration: "none", fontWeight: 600 }}>
                            juzzy@daijavu.uk
                        </a>
                    </div>
                </div>

                {/* Form */}
                {!sent ? (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                                    Your name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Jane Smith"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    style={inputStyle}
                                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; }}
                                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="jane@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    style={inputStyle}
                                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; }}
                                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                                Message
                            </label>
                            <textarea
                                required
                                rows={6}
                                placeholder="What's on your mind?"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                                onFocus={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; }}
                                onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                            />
                        </div>
                        {error && (
                            <p style={{ fontSize: 13, color: "#f87171", margin: 0 }}>{error}</p>
                        )}
                        <button
                            type="submit"
                            disabled={sending}
                            style={{
                                padding: "14px 32px",
                                borderRadius: 12,
                                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                                border: "none",
                                color: "white",
                                fontSize: 15,
                                fontWeight: 700,
                                cursor: sending ? "not-allowed" : "pointer",
                                alignSelf: "flex-start",
                                opacity: sending ? 0.6 : 1,
                                transition: "opacity 0.15s",
                            }}
                            onMouseEnter={e => { if (!sending) (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
                            onMouseLeave={e => { if (!sending) (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                        >
                            {sending ? "Sending…" : "Send message →"}
                        </button>
                    </form>
                ) : (
                    <div style={{
                        padding: "32px",
                        borderRadius: 16,
                        background: "rgba(52,211,153,0.08)",
                        border: "1px solid rgba(52,211,153,0.2)",
                        textAlign: "center",
                    }}>
                        <p style={{ fontSize: 32, margin: "0 0 12px" }}>✓</p>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 8px" }}>Message ready to send</h2>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0 }}>Your email client should have opened. If not, email us directly at juzzy@daijavu.uk</p>
                    </div>
                )}

                {/* Common topics */}
                <div style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: "0 0 24px" }}>Common topics</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                        {[
                            { icon: "🐛", title: "Bug reports", desc: "Found something broken? Tell us which tool and what happened." },
                            { icon: "💡", title: "Tool requests", desc: "Got an idea for a tool we should build? We want to hear it." },
                            { icon: "🤝", title: "Partnerships", desc: "Sponsorships, affiliate deals or press enquiries." },
                            { icon: "📋", title: "General feedback", desc: "Anything else — we read every message." },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} style={{
                                padding: "20px",
                                borderRadius: 14,
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                            }}>
                                <span style={{ fontSize: 24 }}>{icon}</span>
                                <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "10px 0 6px" }}>{title}</p>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.5 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
