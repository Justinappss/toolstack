"use client";
import { useState } from "react";

export function YouTubeLite({ videoId, title }: { videoId: string; title: string }) {
    const [playing, setPlaying] = useState(false);

    if (playing) {
        return (
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "16/9", position: "relative" }}>
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: "none", position: "absolute", top: 0, left: 0 }}
                />
            </div>
        );
    }

    return (
        <button
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            style={{ width: "100%", aspectRatio: "16/9", position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", padding: 0, display: "block", background: "#0a0a0a" }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#ff0000", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                    <span style={{ color: "white", fontSize: 22, marginLeft: 5 }}>▶</span>
                </div>
            </div>
        </button>
    );
}
