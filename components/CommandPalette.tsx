"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { ALL_TOOLS } from "./MoreTools";
import { Search } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <>
      <div 
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          zIndex: 9999, display: "flex", alignItems: "flex-start", justifyContent: "center",
          paddingTop: "15vh"
        }}
        onClick={() => setOpen(false)}
      >
        <div 
          onClick={e => e.stopPropagation()}
          style={{
            width: "100%", maxWidth: 640,
            background: "#0d0d15", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16, overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}
        >
          <Command
            loop
            style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <Search size={18} color="rgba(255,255,255,0.4)" />
              <Command.Input
                autoFocus
                placeholder="Search 25+ tools..."
                style={{
                  width: "100%", padding: "18px 12px",
                  background: "transparent", border: "none", outline: "none",
                  color: "white", fontSize: 16, fontFamily: "inherit"
                }}
              />
            </div>

            <Command.List style={{ maxHeight: 380, overflowY: "auto", padding: 8 }}>
              <Command.Empty style={{ padding: "32px 0", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                No tools found. Try searching "JSON" or "Generator".
              </Command.Empty>

              <Command.Group heading="Utility Tools" style={{ padding: "8px 4px 4px" }}>
                <style dangerouslySetInnerHTML={{__html: `
                  [cmdk-group-heading] {
                    padding: 0 8px 8px;
                    color: rgba(255,255,255,0.4);
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                  }
                  [cmdk-item] {
                    content-visibility: auto;
                    cursor: pointer;
                    height: 48px;
                    border-radius: 8px;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 0 12px;
                    color: rgba(255,255,255,0.8);
                    user-select: none;
                    transition: all 0.1s;
                  }
                  [cmdk-item][data-selected="true"] {
                    background: rgba(255,255,255,0.08);
                    color: white;
                  }
                `}} />
                {ALL_TOOLS.map((tool) => (
                  <Command.Item
                    key={tool.slug}
                    value={tool.name + " " + tool.badge + " " + tool.desc}
                    onSelect={() => {
                      router.push(`/tools/${tool.slug}`);
                      setOpen(false);
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: 6,
                      background: `${tool.color}22`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, color: tool.color, fontWeight: 700,
                    }}>{tool.icon}</div>
                    <span style={{ fontWeight: 600 }}>{tool.name}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>{tool.badge}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>

            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 12, background: "rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <kbd style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 6px", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>↑↓</kbd>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Navigate</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <kbd style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 6px", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>↵</kbd>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Open Tool</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <kbd style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 6px", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>esc</kbd>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Close</span>
              </div>
            </div>
          </Command>
        </div>
      </div>
    </>
  );
}
