"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { X, LogIn } from "lucide-react";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage(null);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      setMessage({ text: "Check your email for the login link!", type: "success" });
    } catch (error: any) {
      setMessage({ text: error.error_description || error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.origin }});
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin }});
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div 
        onClick={e => e.stopPropagation()} 
        style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 32, width: "100%", maxWidth: 400, position: "relative", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
          <X size={20} />
        </button>
        
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #a78bfa, #3b82f6)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <LogIn color="white" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", margin: 0 }}>ToolStack ID</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" }}>Sign in to save presets and history across devices.</p>
        </div>

        {message && (
          <div style={{ background: message.type === "error" ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", color: message.type === "error" ? "#fca5a5" : "#6ee7b7", padding: "12px 16px", borderRadius: 8, fontSize: 13, marginBottom: 16, border: `1px solid ${message.type === "error" ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"}` }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", outline: "none" }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ width: "100%", padding: "12px", background: "white", color: "black", border: "none", borderRadius: 12, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Sending Magic Link..." : "Continue with Email"}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Or</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button onClick={handleGithubLogin} style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            Continue with GitHub
          </button>
          <button onClick={handleGoogleLogin} style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
