"use client";

import { useState } from "react";
import { Download, RefreshCw, MonitorPlay, Video } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { saveToHistory } from "@/components/HistorySidebar";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

interface VideoData {
  title: string;
  thumbnail: string;
  downloadUrl: string;
  duration: number;
}

const HOW_IT_WORKS = [
  { step: "01", title: "Copy the Link", body: "Copy the URL of the YouTube video you want to download. Works with shorts, vlogs, and standard videos.", color: "#ff4040", bg: "rgba(255,64,64,0.07)", border: "rgba(255,64,64,0.18)" },
  { step: "02", title: "Process the Video", body: "Our backend decrypts the YouTube signature and extracts the highest quality MP4 file available.", color: "#f59e0b", bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.18)" },
  { step: "03", title: "Download Instantly", body: "Click download to save the raw video file directly to your device. No watermarks, no compression.", color: "#34d399", bg: "rgba(52,211,153,0.07)", border: "rgba(52,211,153,0.18)" },
];

const FAQS = [
  { q: "Is this YouTube Video Downloader really free?", a: "Yes! ToolStack's YouTube Video Downloader is 100% free. There are no hidden fees, no subscriptions, and absolutely no limits on how many videos you can download." },
  { q: "What is the best YouTube downloader?", a: "The best YouTube video downloader is one that provides raw, uncompressed MP4 files without forcing you to watch ads or download shady software. ToolStack provides a secure, ad-free experience directly in your browser." },
  { q: "Does this work for YouTube Shorts?", a: "Absolutely. You can paste the URL of any standard YouTube video or YouTube Short, and our tool will extract the highest quality MP4 format available." },
  { q: "What format are the videos downloaded in?", a: "All videos are processed and downloaded in high-quality MP4 format, ensuring perfect compatibility with video editors like CapCut, Premiere Pro, and Final Cut." },
  { q: "Do I need to install any software?", a: "No. Our tool is entirely web-based. We handle the complex signature deciphering on our backend servers, so you can download videos on any device (Mac, Windows, iOS, Android) without installing anything." },
];

function YouTube3DDevice() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", userSelect: "none" }}>
      {/* Device body */}
      <div style={{
        position: "relative",
        width: "min(440px, 100%)",
        aspectRatio: "16/10",
        borderRadius: 28,
        background: "linear-gradient(175deg, #1c1c2e 0%, #12121e 50%, #0a0a14 100%)",
        boxShadow: [
          "0 60px 120px rgba(0,0,0,0.75)",
          "0 0 0 1px rgba(255,255,255,0.07)",
          "inset 0 1px 0 rgba(255,255,255,0.12)",
          "inset 0 -1px 0 rgba(0,0,0,0.5)",
          "0 0 80px rgba(255,0,0,0.12)",
        ].join(", "),
      }}>

        {/* Screen bezel inset */}
        <div style={{
          position: "absolute",
          inset: "8% 6%",
          borderRadius: 18,
          background: "linear-gradient(180deg, #08080f 0%, #050508 100%)",
          boxShadow: "inset 0 4px 20px rgba(0,0,0,0.8), inset 0 0 60px rgba(255,0,0,0.08)",
          overflow: "hidden",
        }}>
          {/* Scanlines */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
            pointerEvents: "none",
          }} />

          {/* Red screen glow */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(255,0,0,0.14) 0%, transparent 70%)",
          }} />

          {/* Corner brand */}
          <div style={{ position: "absolute", top: "11%", left: "6%", fontSize: 10, fontWeight: 900, color: "#ff4040", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.9 }}>▶ TOOLSTACK</div>

          {/* Format chips */}
          <div style={{ position: "absolute", top: "11%", right: "6%", display: "flex", gap: 5 }}>
            {["HD", "MP4"].map(label => (
              <span key={label} style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", padding: "2px 7px", borderRadius: 999, background: "rgba(255,64,64,0.2)", border: "1px solid rgba(255,64,64,0.35)", color: "#ff8080" }}>{label}</span>
            ))}
          </div>

          {/* 3D Play button */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 72,
            height: 72,
            borderRadius: 22,
            background: "linear-gradient(170deg, #ff3030 0%, #cc0000 50%, #8c0000 100%)",
            boxShadow: [
              "0 0 50px rgba(255,0,0,0.55)",
              "0 10px 0 rgba(0,0,0,0.5)",
              "0 12px 30px rgba(0,0,0,0.6)",
              "inset 0 1px 0 rgba(255,160,160,0.5)",
              "inset 0 -2px 0 rgba(0,0,0,0.35)",
            ].join(", "),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Play triangle */}
            <div style={{
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "14px 0 14px 24px",
              borderColor: "transparent transparent transparent white",
              marginLeft: 5,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }} />
          </div>

          {/* Bottom info bar */}
          <div style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}>
            {["Shorts", "Standard", "Playlists"].map(label => (
              <span key={label} style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
            ))}
          </div>

          {/* Screen reflection */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "35%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
            borderRadius: "18px 18px 0 0",
            pointerEvents: "none",
          }} />
        </div>

        {/* Left side notch detail */}
        <div style={{ position: "absolute", left: -3, top: "30%", width: 6, height: 18, borderRadius: "0 4px 4px 0", background: "linear-gradient(90deg, #0a0a14, #1c1c2e)", boxShadow: "2px 0 4px rgba(0,0,0,0.5)" }} />

        {/* Top LED indicator */}
        <div style={{ position: "absolute", top: "3.5%", left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", background: "#ff0000", boxShadow: "0 0 8px #ff0000, 0 0 16px rgba(255,0,0,0.5)" }} />

        {/* Bottom logo area */}
        <div style={{ position: "absolute", bottom: "3%", left: "50%", transform: "translateX(-50%)", fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.15)", letterSpacing: "0.2em", textTransform: "uppercase" }}>TOOLSTACK.TECH</div>
      </div>

      {/* Stand neck */}
      <div style={{ width: 60, height: 18, background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)", borderTop: "none", borderRadius: "0 0 8px 8px" }} />
      {/* Stand base */}
      <div style={{ width: 120, height: 8, borderRadius: 999, background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 8px 20px rgba(0,0,0,0.5)" }} />
    </div>
  );
}

export default function YouTubeVideoDownloader() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleProcess = async () => {
    if (!url.trim()) { setError("Please paste a valid YouTube URL."); return; }
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=...)");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/youtube-video-downloader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResults(data);
      saveToHistory({ toolName: "YouTube Downloader", slug: "youtube-video-downloader", data: { title: data.title } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to process video. The video might be private or age-restricted.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadClick = () => {
    if (results?.downloadUrl) window.location.href = results.downloadUrl;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white" }}>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        { "@context": "https://schema.org", "@type": "WebApplication", "name": "Free YouTube Video Downloader", "description": "Download YouTube videos and Shorts in high quality MP4 format for free. No ads, no watermarks, no software required.", "url": "https://toolstack.tech/tools/youtube-video-downloader", "applicationCategory": "MultimediaApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "featureList": ["High Quality MP4 Download", "YouTube Shorts Support", "No Watermarks", "Ad-Free Interface"] },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" }, { "@type": "ListItem", "position": 2, "name": "Video Tools", "item": "https://toolstack.tech/tools/category/video" }, { "@type": "ListItem", "position": 3, "name": "YouTube Video Downloader", "item": "https://toolstack.tech/tools/youtube-video-downloader" }] },
        { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
      ]) }} />

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,0,0.09) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,0,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools/category/video" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Video</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>YouTube Video Downloader</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {[
              { label: "High Quality MP4", color: "#ff4040" },
              { label: "YouTube Shorts", color: "#f59e0b" },
              { label: "No Watermarks", color: "#34d399" },
              { label: "Free Forever", color: "#818cf8" },
            ].map(b => (
              <span key={b.label} style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: `${b.color}18`, border: `1px solid ${b.color}30`, color: b.color }}>{b.label}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Free YouTube{" "}
            <span style={{ background: "linear-gradient(135deg, #ff0000, #ff4d4d 50%, #ff8080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Video Downloader
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", maxWidth: 540, lineHeight: 1.65, margin: 0 }}>
            Download raw, uncompressed YouTube videos and Shorts instantly. No ads, no shady redirects — just high-quality MP4 files ready for your next project.
          </p>
        </div>

        {/* 3D Device + Tool layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28, alignItems: "center", marginBottom: 28 }}>

          {/* 3D Device */}
          <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
            <YouTube3DDevice />
          </div>

          {/* Input Panel */}
          <div style={{
            background: "linear-gradient(180deg, rgba(20,10,10,0.7) 0%, rgba(10,5,5,0.8) 100%)",
            border: "1px solid rgba(255,64,64,0.18)",
            borderRadius: 24,
            padding: "28px",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.07)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,64,64,0.15)", border: "1px solid rgba(255,64,64,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MonitorPlay size={18} color="#ff4040" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "white" }}>YouTube URL</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Videos, Shorts & Playlists</div>
              </div>
            </div>

            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Paste URL</label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleProcess()}
              placeholder="https://www.youtube.com/watch?v=..."
              style={{
                width: "100%",
                padding: "16px 18px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                color: "white",
                outline: "none",
                fontSize: 15,
                marginBottom: 16,
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.target.style.borderColor = "rgba(255,64,64,0.4)")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />

            <button
              onClick={handleProcess}
              disabled={loading || !url.trim()}
              style={{
                width: "100%",
                height: 56,
                borderRadius: 14,
                background: loading || !url.trim()
                  ? "rgba(255,0,0,0.35)"
                  : "linear-gradient(180deg, #ff2020 0%, #cc0000 60%, #990000 100%)",
                color: "white",
                fontWeight: 800,
                fontSize: 15,
                border: loading || !url.trim() ? "1px solid rgba(255,0,0,0.2)" : "1px solid rgba(255,100,100,0.3)",
                cursor: loading || !url.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: loading || !url.trim() ? "none" : "0 6px 0 rgba(0,0,0,0.4), 0 0 30px rgba(255,0,0,0.2), inset 0 1px 0 rgba(255,150,150,0.3)",
                transition: "transform 0.1s, box-shadow 0.1s",
              }}
              onMouseDown={e => { if (!loading && url.trim()) { e.currentTarget.style.transform = "translateY(3px)"; e.currentTarget.style.boxShadow = "0 3px 0 rgba(0,0,0,0.4), 0 0 20px rgba(255,0,0,0.15), inset 0 1px 0 rgba(255,150,150,0.2)"; } }}
              onMouseUp={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 0 rgba(0,0,0,0.4), 0 0 30px rgba(255,0,0,0.2), inset 0 1px 0 rgba(255,150,150,0.3)"; }}
            >
              {loading
                ? <><RefreshCw size={18} style={{ animation: "spin 1s linear infinite" }} /> Extracting Video...</>
                : <><MonitorPlay size={18} /> Process Video</>}
            </button>

            {error && (
              <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", fontSize: 13, fontWeight: 600 }}>
                {error}
              </div>
            )}

            {/* Feature list */}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {["No watermarks added", "Direct from YouTube servers", "Compatible with CapCut & Premiere"].map(feat => (
                <div key={feat} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  <span style={{ color: "#34d399", fontSize: 14, fontWeight: 700 }}>✓</span>
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <AnimatePresence>
          {results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                background: "linear-gradient(180deg, rgba(10,20,10,0.7) 0%, rgba(5,12,5,0.8) 100%)",
                border: "1px solid rgba(52,211,153,0.2)",
                borderRadius: 24,
                padding: "28px",
                marginBottom: 28,
                boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(52,211,153,0.06), inset 0 1px 0 rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#34d399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 999, padding: "3px 10px", letterSpacing: "0.06em" }}>✓ READY TO DOWNLOAD</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "center" }}>
                <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
                  <img src={results.thumbnail} alt={results.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.85)", padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "white", backdropFilter: "blur(8px)" }}>
                    {formatDuration(results.duration)}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: 0, lineHeight: 1.4 }}>{results.title}</h3>

                  <div style={{ display: "flex", gap: 8 }}>
                    {["MP4", "High Quality", "No Watermark"].map(tag => (
                      <span key={tag} style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#34d399" }}>{tag}</span>
                    ))}
                  </div>

                  <button
                    onClick={handleDownloadClick}
                    style={{
                      height: 54,
                      borderRadius: 14,
                      background: "linear-gradient(180deg, #22e093 0%, #16a34a 60%, #0f7a35 100%)",
                      color: "#04140a",
                      fontWeight: 900,
                      fontSize: 15,
                      border: "1px solid rgba(52,211,153,0.3)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      boxShadow: "0 6px 0 rgba(0,0,0,0.35), 0 0 30px rgba(52,211,153,0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
                      transition: "transform 0.1s, box-shadow 0.1s",
                    }}
                    onMouseDown={e => { e.currentTarget.style.transform = "translateY(3px)"; e.currentTarget.style.boxShadow = "0 3px 0 rgba(0,0,0,0.35)"; }}
                    onMouseUp={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 0 rgba(0,0,0,0.35), 0 0 30px rgba(52,211,153,0.2), inset 0 1px 0 rgba(255,255,255,0.25)"; }}
                  >
                    <Download size={18} /> Download MP4
                  </button>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
                    Extracted directly from YouTube. No compression added.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state when no results */}
        {!results && !loading && (
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: "36px",
            marginBottom: 28,
            textAlign: "center",
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: "rgba(255,64,64,0.08)", border: "1px solid rgba(255,64,64,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Video size={24} color="#ff4040" />
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: "rgba(255,255,255,0.6)", margin: "0 0 8px" }}>Ready to Download</h4>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>Paste a YouTube URL above and click Process Video</p>
          </div>
        )}

        {/* How It Works */}
        <section style={{ marginTop: 64, marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 6 }}>How It Works</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>Three steps to get the raw video file.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {HOW_IT_WORKS.map(item => (
              <div key={item.step} style={{
                padding: "22px 22px",
                borderRadius: 20,
                background: item.bg,
                border: `1px solid ${item.border}`,
                boxShadow: `0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
                backdropFilter: "blur(8px)",
              }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", color: item.color, marginBottom: 10, textTransform: "uppercase" }}>Step {item.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <div style={{
          padding: "36px",
          borderRadius: 24,
          background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          marginBottom: 64,
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 18px", letterSpacing: "-0.02em" }}>Why Raw Footage Matters for Creators</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 28 }}>
            Whether you are building a documentary, reaction video, or high-converting ad, the quality of your source material defines your output. ToolStack extracts the raw stream — no re-encoding, no quality loss.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { t: "Video Ads", d: "High-quality raw clips for scroll-stopping ad creatives. Pair with AdvertiseGPT for maximum ROI." },
              { t: "Fair Use & Analysis", d: "Create educational breakdowns or critiques with uncompressed footage for deep zooms without pixelation." },
              { t: "Cross-Platform", d: "Download Shorts to repurpose across TikTok and Instagram Reels with perfect clarity." },
            ].map(x => (
              <div key={x.t}>
                <h3 style={{ color: "#ff4040", fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{x.t}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />

        {/* FAQ */}
        <div style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: "white", textAlign: "center", marginBottom: 32, letterSpacing: "-0.02em" }}>Common Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 720, margin: "0 auto" }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{
                borderRadius: 16,
                border: `1px solid ${faqOpen === i ? "rgba(255,64,64,0.2)" : "rgba(255,255,255,0.07)"}`,
                background: faqOpen === i ? "rgba(255,64,64,0.05)" : "rgba(255,255,255,0.025)",
                overflow: "hidden",
                transition: "border-color 0.2s, background 0.2s",
              }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{ width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
                >
                  <span style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{f.q}</span>
                  <span style={{ color: "#ff4040", fontSize: 18, fontWeight: 300, flexShrink: 0, transform: faqOpen === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 22px 18px", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <MoreTools currentSlug="youtube-video-downloader" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }` }} />
    </div>
  );
}
