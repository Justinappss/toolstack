"use client";

import { useState } from "react";
import { Download, RefreshCw, Check, Video, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { saveToHistory } from "@/components/HistorySidebar";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

// ─── TYPES ─────────────────────────────────────────────────────────────────
interface VideoData {
  title: string;
  thumbnail: string;
  downloadUrl: string;
  duration: number;
}

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  { step: "01", title: "Copy the Link", body: "Copy the URL of the YouTube video you want to download. Works with shorts, vlogs, and standard videos.", color: "#ff0000", bg: "rgba(255,0,0,0.10)", border: "rgba(255,0,0,0.25)" },
  { step: "02", title: "Process the Video", body: "Our backend decrypts the YouTube signature and extracts the highest quality MP4 file available.", color: "#ff4d4d", bg: "rgba(255,102,102,0.10)", border: "rgba(255,102,102,0.25)" },
  { step: "03", title: "Download Instantly", body: "Click download to save the raw video file directly to your device. No watermarks, no compression.", color: "#34d399", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.25)" },
];

const FAQS = [
  {
    q: "Is this YouTube Video Downloader really free?",
    a: "Yes! ToolStack's YouTube Video Downloader is 100% free. There are no hidden fees, no subscriptions, and absolutely no limits on how many videos you can download.",
  },
  {
    q: "What is the best YouTube downloader?",
    a: "The best YouTube video downloader is one that provides raw, uncompressed MP4 files without forcing you to watch ads or download shady software. ToolStack provides a secure, ad-free experience directly in your browser.",
  },
  {
    q: "Does this work for YouTube Shorts?",
    a: "Absolutely. You can paste the URL of any standard YouTube video or YouTube Short, and our tool will extract the highest quality MP4 format available.",
  },
  {
    q: "What format are the videos downloaded in?",
    a: "All videos are processed and downloaded in high-quality MP4 format, ensuring perfect compatibility with video editors like CapCut, Premiere Pro, and Final Cut.",
  },
  {
    q: "Do I need to install any software?",
    a: "No. Our tool is entirely web-based. We handle the complex signature deciphering on our backend servers, so you can download videos on any device (Mac, Windows, iOS, Android) without installing anything.",
  },
];

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
    if (!url.trim()) {
      setError("Please paste a valid YouTube URL.");
      return;
    }
    
    // Basic client-side validation
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
      
      saveToHistory({
        toolName: "YouTube Downloader",
        slug: "youtube-video-downloader",
        data: { title: data.title }
      });

    } catch (err: any) {
      setError(err.message || "Failed to process video. The video might be private or age-restricted.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadClick = () => {
    if (results?.downloadUrl) {
      // Direct browser navigation to the download stream
      window.location.href = results.downloadUrl;
    }
  };

  const youtubeRed = "#ff0000";

  return (
    <div style={{ minHeight: "100vh", background: "#06060c", color: "white", padding: "120px 20px 80px" }}>
      {/* Dynamic Background Glow */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,0,0.08) 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 65%)", filter: "blur(90px)" }} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Free YouTube Video Downloader",
          "description": "Download YouTube videos and Shorts in high quality MP4 format for free. No ads, no watermarks, no software required.",
          "url": "https://toolstack.tech/tools/youtube-video-downloader",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["High Quality MP4 Download", "YouTube Shorts Support", "No Watermarks", "Ad-Free Interface"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "SEO Tools", "item": "https://toolstack.tech/tools?category=seo" },
            { "@type": "ListItem", "position": 3, "name": "YouTube Video Downloader", "item": "https://toolstack.tech/tools/youtube-video-downloader" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1040, margin: "0 auto" }}>
        {/* Header Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <Link href="/tools?category=seo" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>SEO Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>YouTube Video Downloader</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(255,0,0,0.12)", border: "1px solid rgba(255,0,0,0.3)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#fca5a5" }}>✓ High Quality MP4 · No Watermarks · Free Forever</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            Free YouTube<br />
            <span style={{ background: "linear-gradient(135deg, #ff0000 0%, #ff4d4d 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Video Downloader.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 580, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
             Download raw, uncompressed YouTube videos and Shorts instantly. No ads, no shady redirects, just pure high-quality MP4 files ready for your next project.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, alignItems: "start" }}>
          
          {/* Input Panel */}
          <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "32px" }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Paste YouTube URL</label>
              <input 
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                style={{ width: "100%", padding: "18px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, color: "white", outline: "none", fontSize: 16, transition: "border-color 0.2s" }}
                onFocus={e => (e.target.style.borderColor = "rgba(255,255,255,0.3)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            <button 
              onClick={handleProcess}
              disabled={loading || !url.trim()}
              style={{ width: "100%", height: 60, borderRadius: 14, background: loading || !url.trim() ? "rgba(255,0,0,0.5)" : youtubeRed, color: "white", fontWeight: 800, fontSize: 16, border: "none", cursor: loading || !url.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "transform 0.1s" }}
              onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)"; }}
              onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              {loading ? <><RefreshCw size={20} style={{ animation: "spin 1s linear infinite" }} /> Extracting Video...</> : <><MonitorPlay size={20} /> Process Video</>}
            </button>
            {error && <p style={{ marginTop: 16, color: "#f87171", fontSize: 13, fontWeight: 600, textAlign: "center" }}>{error}</p>}
          </div>

          {/* Results Panel */}
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "32px", minHeight: 300, display: "flex", flexDirection: "column", backdropFilter: "blur(10px)" }}>
            <AnimatePresence mode="wait">
              {!results ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Video size={32} />
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 8 }}>Ready to Download</h4>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 240 }}>Paste a URL on the left to extract the highest quality MP4 file.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 16, lineHeight: 1.4 }}>{results.title}</h3>
                  
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", marginBottom: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
                    <img src={results.thumbnail} alt={results.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.8)", padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700, color: "white" }}>
                      {formatDuration(results.duration)}
                    </div>
                  </div>

                  <button 
                    onClick={handleDownloadClick}
                    style={{ width: "100%", height: 60, borderRadius: 14, background: "#34d399", color: "#06060c", fontWeight: 900, fontSize: 16, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "transform 0.1s" }}
                    onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)"; }}
                    onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    <Download size={20} /> Download High Quality MP4
                  </button>
                  <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 12 }}>
                    File is extracted directly from YouTube's servers. No compression added.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* How It Works */}
        <section style={{ marginTop: 80, marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How It Works</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>The fastest way to grab raw footage.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} style={{ padding: "22px 20px", borderRadius: 18, background: item.bg, border: `1px solid ${item.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: item.color, marginBottom: 12 }}>STEP {item.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Authority Bridge (AdvertiseGPT / GEO SEO) */}
        <div style={{ padding: "48px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>The Power of Raw Footage for Content Creators</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            Whether you are building a documentary, reaction video, or a high-converting video ad, the quality of your source material dictates the trust of your audience. ToolStack's downloader bypassing typical web compression to give you the raw stream.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "Video Ads & Marketing", d: "High-quality raw clips are essential when editing ad creatives that need to stop the scroll. Pair this with our AdvertiseGPT engine for maximum ROI." },
              { t: "Fair Use & Analysis", d: "If you are creating educational breakdowns or critiques, having uncompressed footage allows for deep zooms without pixelation." },
              { t: "Cross-Platform Strategy", d: "Download high-quality YouTube Shorts to repurpose across TikTok and Instagram Reels with perfect clarity." }
            ].map(x => (
              <div key={x.t}>
                <h3 style={{ color: "#34d399", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{x.t}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />
        {/* FAQ Section */}
        <div style={{ marginTop: 80, marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", textAlign: "center", marginBottom: 40 }}>Common Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 800, margin: "0 auto" }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
                <button 
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>{f.q}</span>
                  <div style={{ transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: youtubeRed }}>
                    <MonitorPlay size={16} />
                  </div>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 24px 20px", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <MoreTools currentSlug="youtube-video-downloader" />
        
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      ` }} />
    </div>
  );
}
