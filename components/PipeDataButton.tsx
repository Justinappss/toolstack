"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowRightLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PipeDataButtonProps {
  payload: string;
  disabled?: boolean;
}

const TOOL_PIPELINES = [
  { slug: "base64-encoder-decoder", name: "Base64 Converter" },
  { slug: "code-diff-checker", name: "Code Diff Checker" },
  { slug: "json-formatter", name: "JSON Formatter" },
  { slug: "markdown-editor", name: "Markdown Editor" },
  { slug: "regex-tester", name: "Regex Tester" },
  { slug: "word-counter", name: "Word Counter" },
];

export function PipeDataButton({ payload, disabled = false }: PipeDataButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePipeData = (slug: string) => {
    if (!payload.trim()) return;
    
    // Save to global local storage bridge
    localStorage.setItem("toolstack_pipe_payload", payload);
    setOpen(false);
    
    // Redirect with the initialization query flag
    router.push(`/tools/${slug}?pipe=true`);
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button 
        onClick={() => setOpen(!open)}
        disabled={disabled || !payload.trim()}
        style={{
          background: "rgba(167, 139, 250, 0.15)",
          border: "1px solid rgba(167, 139, 250, 0.3)",
          color: "#c4b5fd",
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
        onMouseEnter={e => { if (!disabled && payload.trim()) e.currentTarget.style.background = "rgba(167, 139, 250, 0.25)" }}
        onMouseLeave={e => { if (!disabled && payload.trim()) e.currentTarget.style.background = "rgba(167, 139, 250, 0.15)" }}
      >
        <ArrowRightLeft size={14} /> Send to Tool
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: 8,
              width: 220,
              background: "#1e1e2d",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 8,
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              gap: 4
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", padding: "8px 12px 4px", color: "rgba(255,255,255,0.4)" }}>
              Pipe Data Into...
            </div>
            {TOOL_PIPELINES.map(tool => (
              <button
                key={tool.slug}
                onClick={() => handlePipeData(tool.slug)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  padding: "10px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "background 0.15s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {tool.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
