"use client";
import { useState, useEffect } from "react";
import { History, X, Clock, ExternalLink, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/utils/supabase";

export interface HistoryItem {
  id: string;
  toolName: string;
  slug: string;
  timestamp: number;
  data: any;
}

export function HistorySidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      // 1. Try Supabase first
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from("user_history")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(20);
          
        if (!error && data) {
          // Map DB columns to HistoryItem
          const formatted = data.map(dbItem => ({
            id: dbItem.id,
            toolName: dbItem.tool_name,
            slug: dbItem.tool_slug,
            timestamp: new Date(dbItem.created_at).getTime(),
            data: dbItem.data
          }));
          setHistory(formatted);
          return;
        }
      }

      // 2. Fallback to localStorage if no user or fetch failed
      const saved = localStorage.getItem("toolstack_history");
      if (saved) {
        try {
          setHistory(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse history", e);
        }
      }
    };

    loadHistory();
    window.addEventListener("toolstack_new_generation", loadHistory);
    
    // Auto-reload history when auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadHistory();
    });

    return () => {
      window.removeEventListener("toolstack_new_generation", loadHistory);
      subscription.unsubscribe();
    };
  }, []);

  const clearHistory = () => {
    if (confirm("Clear all generation history?")) {
      localStorage.removeItem("toolstack_history");
      setHistory([]);
    }
  };

  const deleteItem = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistic UI update
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem("toolstack_history", JSON.stringify(newHistory));

    // Try Supabase Delete
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user && id.includes('-')) {
      // Supabase uses UUIDs (which contain dashes), local uses Math.random() strings
      await supabase.from("user_history").delete().eq("id", id);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 100,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
            color: "white",
            border: "none",
            boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(99,102,241,0.6)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="View tool history"
        >
          <History size={24} />
          {history.length > 0 && (
            <span style={{
              position: "absolute",
              top: -2,
              right: -2,
              background: "#ef4444",
              color: "white",
              fontSize: 10,
              fontWeight: 900,
              padding: "2px 6px",
              borderRadius: 10,
              border: "2px solid #06060c"
            }}>
              {history.length}
            </span>
          )}
        </motion.button>
      )}

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                zIndex: 1000,
              }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(400px, 100%)",
                background: "#0d0d14",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                zIndex: 1001,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <History size={20} color="#818cf8" />
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: 0 }}>Recent Tools</h3>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ background: "rgba(255,255,255,0.05)", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={18} />
                </button>
              </div>

              {/* List */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                {history.length === 0 ? (
                  <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0.3, textAlign: "center" }}>
                    <Clock size={48} style={{ marginBottom: 16 }} />
                    <p style={{ fontSize: 14 }}>No generation history yet.<br />Try any tool to see it here!</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {history.map((item, i) => (
                      <Link 
                        key={item.id} 
                        href={`/tools/${item.slug}`} 
                        onClick={() => setIsOpen(false)}
                        style={{ textDecoration: "none" }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 14,
                            padding: "16px",
                            cursor: "pointer",
                            position: "relative",
                            overflow: "hidden"
                          }}
                          whileHover={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <span style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#818cf8" }}>{item.toolName}</span>
                            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div style={{ color: "white", fontSize: 13, fontWeight: 700, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                             {item.data?.primaryKeyword || item.data?.[0]?.name || "View Generation"}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{new Date(item.timestamp).toLocaleDateString()}</span>
                            <div style={{ display: "flex", gap: 12 }}>
                              <button onClick={(e) => deleteItem(item.id, e)} style={{ background: "none", border: "none", color: "rgba(239, 68, 68, 0.4)", cursor: "pointer", padding: 0 }} onMouseEnter={e => e.currentTarget.style.color = "#ef4444"} onMouseLeave={e => e.currentTarget.style.color = "rgba(239, 68, 68, 0.4)"}>
                                <Trash2 size={12} />
                              </button>
                              <ExternalLink size={12} color="rgba(255,255,255,0.3)" />
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {history.length > 0 && (
                <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <button 
                    onClick={clearHistory}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: 10,
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      color: "#ef4444",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}
                  >
                    Clear All History
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export async function saveToHistory(item: Omit<HistoryItem, "id" | "timestamp">) {
  if (typeof window === "undefined") return;

  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    // 1. Save to Supabase Cloud
    await supabase.from("user_history").insert([{
      user_id: session.user.id,
      tool_slug: item.slug,
      tool_name: item.toolName,
      data: item.data
    }]);
    window.dispatchEvent(new Event("toolstack_new_generation"));
  } else {
    // 2. Save Local
    const history = JSON.parse(localStorage.getItem("toolstack_history") || "[]");
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now()
    };
    
    const newHistory = [newItem, ...history].slice(0, 20);
    localStorage.setItem("toolstack_history", JSON.stringify(newHistory));
    window.dispatchEvent(new Event("toolstack_new_generation"));
  }
}
