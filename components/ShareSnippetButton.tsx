"use client";
import { useState } from "react";
import { Share2, Check, Loader2 } from "lucide-react";

interface ShareSnippetButtonProps {
  toolSlug: string;
  payload: string;
  disabled?: boolean;
}

export function ShareSnippetButton({ toolSlug, payload, disabled = false }: ShareSnippetButtonProps) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!payload.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool_slug: toolSlug, payload_content: payload }),
      });

      if (!res.ok) throw new Error("Failed to share");
      
      const { id } = await res.json();
      const shareUrl = `${window.location.origin}/tools/${toolSlug}?id=${id}`;
      
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to generate share link. Size exceeds limit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleShare}
      disabled={disabled || !payload.trim() || loading}
      style={{
        background: copied ? "rgba(52,211,153,0.15)" : "rgba(59,130,246,0.15)",
        border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(59,130,246,0.3)"}`,
        color: copied ? "#34d399" : "#bfdbfe",
        padding: "6px 14px",
        borderRadius: 8,
        cursor: (!payload.trim() || disabled) ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        fontWeight: 700,
        transition: "all 0.2s",
        opacity: (!payload.trim() || disabled) ? 0.5 : 1
      }}
      onMouseEnter={e => { if (!disabled && payload.trim() && !copied) e.currentTarget.style.background = "rgba(59,130,246,0.25)" }}
      onMouseLeave={e => { if (!disabled && payload.trim() && !copied) e.currentTarget.style.background = "rgba(59,130,246,0.15)" }}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : copied ? <Check size={14} /> : <Share2 size={14} />}
      {copied ? "Link Copied!" : "Share Link"}
    </button>
  );
}
