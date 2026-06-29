"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DECKS = [
  { tag: "SHARE", title: "Share a\nSummer", bg: "#E11D2E", fg: "#fff", chip: "#F4B740" },
  { tag: "TIP", title: "3 ways to\nstand out", bg: "#1B1830", fg: "#fff", chip: "#8B7CF6" },
  { tag: "STORY", title: "Our origin\nstory", bg: "#0E7C66", fg: "#fff", chip: "#F2B441" },
];

export function JdesignsStudioThumbnail() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % DECKS.length), 1800);
    return () => clearInterval(id);
  }, []);
  const d = DECKS[i];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg,#EEF1FF,#FBF6FF)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* back cards */}
      <div style={{ position: "absolute", width: 92, height: 116, borderRadius: 12, background: "#fff", boxShadow: "0 8px 18px -8px rgba(60,50,120,.4)", transform: "rotate(-9deg) translate(-30px,6px)" }} />
      <div style={{ position: "absolute", width: 92, height: 116, borderRadius: 12, background: "#EDE9FB", transform: "rotate(8deg) translate(30px,6px)" }} />
      {/* front card */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            position: "relative",
            width: 96,
            height: 120,
            borderRadius: 13,
            background: d.bg,
            color: d.fg,
            padding: 11,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 14px 26px -10px rgba(0,0,0,.5)",
          }}
        >
          <span style={{ alignSelf: "flex-start", fontSize: 7, fontWeight: 800, letterSpacing: ".1em", background: d.chip, color: "#1B1830", padding: "2px 5px", borderRadius: 4 }}>
            {d.tag}
          </span>
          <div style={{ fontFamily: "'Newsreader',Georgia,serif", fontWeight: 700, fontSize: 16, lineHeight: 1.05, whiteSpace: "pre-line" }}>{d.title}</div>
          <div style={{ display: "flex", gap: 3 }}>
            {DECKS.map((_, k) => (
              <span key={k} style={{ width: 5, height: 5, borderRadius: 3, background: k === i ? d.chip : "rgba(255,255,255,.4)" }} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
