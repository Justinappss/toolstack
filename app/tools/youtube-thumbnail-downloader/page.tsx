"use client";
import { useState, useCallback } from "react";
import { MoreTools } from "@/components/MoreTools";

const accent = "#ff0000";
const accentRgb = "255,0,0";

const RESOLUTIONS = [
  { key: "maxresdefault", label: "Max Resolution", size: "1280×720", badge: "Best" },
  { key: "sddefault",     label: "Standard",       size: "640×480",  badge: "" },
  { key: "hqdefault",     label: "High Quality",   size: "480×360",  badge: "" },
  { key: "mqdefault",     label: "Medium Quality", size: "320×180",  badge: "" },
  { key: "default",       label: "Default",        size: "120×90",   badge: "" },
];

function extractVideoId(input: string): string | null {
  const s = input.trim();
  // youtu.be/ID
  const short = s.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (short) return short[1];
  // watch?v=ID or shorts/ID or embed/ID
  const long = s.match(/(?:v=|shorts\/|embed\/)([a-zA-Z0-9_-]{11})/);
  if (long) return long[1];
  // bare 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  return null;
}

function thumbUrl(id: string, res: string) {
  return `https://img.youtube.com/vi/${id}/${res}.jpg`;
}

export default function YoutubeThumbnailDownloader() {
  const [input, setInput] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleFetch = useCallback(() => {
    setError("");
    setVideoId(null);
    const id = extractVideoId(input);
    if (!id) {
      setError("Couldn't find a valid YouTube video ID. Paste the full video URL or just the 11-character ID.");
      return;
    }
    setVideoId(id);
  }, [input]);

  const handleDownload = useCallback(async (res: string) => {
    if (!videoId) return;
    setDownloading(res);
    try {
      const url = `/api/proxy-thumbnail?url=${encodeURIComponent(thumbUrl(videoId, res))}&filename=thumbnail-${res}.jpg`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `thumbnail-${videoId}-${res}.jpg`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      setError("Download failed. Try right-clicking the image and saving it manually.");
    } finally {
      setDownloading(null);
    }
  }, [videoId]);

  const handleCopyUrl = useCallback((url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    });
  }, []);

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 20,
    padding: "24px",
  };

  return (
    <div style={{ background: "#080810", minHeight: "100vh", padding: "72px 20px 100px" }}>
      {/* Ambient blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-15%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(${accentRgb},0.12) 0%, transparent 70%)`, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>ToolStack</a>
          <span>/</span>
          <a href="/tools" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Tools</a>
          <span>/</span>
          <span style={{ color: accent }}>YouTube Thumbnail Downloader</span>
        </nav>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {["Free Forever", "No Signup", "All Resolutions", "Shorts & Videos"].map(b => (
              <span key={b} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", padding: "5px 12px", borderRadius: 999, background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.25)`, color: accent }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: 46, fontWeight: 900, color: "white", margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            YouTube{" "}
            <span style={{ background: `linear-gradient(135deg, ${accent}, #fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Thumbnail
            </span>{" "}
            Downloader
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
            Paste any YouTube URL and instantly download the thumbnail in every available resolution — Max, SD, HQ, MQ and Default. 100% free, no account needed.
          </p>
        </div>

        {/* Input card */}
        <div style={{ ...cardStyle, marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 10 }}>
            YouTube Video URL or ID
          </label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleFetch()}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              style={{
                flex: "1 1 260px", padding: "14px 16px", borderRadius: 12,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                color: "white", fontSize: 15, outline: "none",
              }}
            />
            <button
              onClick={handleFetch}
              disabled={!input.trim()}
              style={{
                padding: "14px 28px", borderRadius: 12, border: "none", cursor: input.trim() ? "pointer" : "not-allowed",
                background: input.trim() ? `linear-gradient(135deg, ${accent}, #fbbf24)` : "rgba(255,255,255,0.08)",
                color: input.trim() ? "#000" : "rgba(255,255,255,0.3)", fontWeight: 800, fontSize: 15,
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}
            >
              Get Thumbnails
            </button>
          </div>
          {error && (
            <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 10, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#f87171", fontSize: 13 }}>
              {error}
            </div>
          )}
          <p style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            Works with youtube.com/watch, youtu.be, YouTube Shorts, and bare video IDs.
          </p>
        </div>

        {/* Results */}
        {videoId && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {RESOLUTIONS.map(res => {
              const url = thumbUrl(videoId, res.key);
              const isCopied = copiedUrl === url;
              const isDownloading = downloading === res.key;
              return (
                <div key={res.key} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  {/* Thumbnail preview */}
                  <div style={{ flex: "none", width: 160, height: 90, borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <img
                      src={url}
                      alt={`${res.label} thumbnail`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.2"; }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "white" }}>{res.label}</span>
                      {res.badge && (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: `rgba(${accentRgb},0.18)`, border: `1px solid rgba(${accentRgb},0.35)`, color: accent, letterSpacing: "0.05em" }}>
                          {res.badge}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "monospace" }}>{res.size} px</span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      onClick={() => handleCopyUrl(url)}
                      style={{
                        padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)",
                        background: isCopied ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)",
                        color: isCopied ? "#34d399" : "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600, cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isCopied ? "✓ Copied" : "Copy URL"}
                    </button>
                    <button
                      onClick={() => handleDownload(res.key)}
                      disabled={isDownloading}
                      style={{
                        padding: "10px 20px", borderRadius: 10, border: "none",
                        background: isDownloading ? "rgba(255,255,255,0.08)" : `linear-gradient(135deg, ${accent}, #fbbf24)`,
                        color: isDownloading ? "rgba(255,255,255,0.4)" : "#000", fontSize: 13, fontWeight: 800,
                        cursor: isDownloading ? "not-allowed" : "pointer", whiteSpace: "nowrap",
                      }}
                    >
                      {isDownloading ? "Downloading…" : "↓ Download"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* How it works */}
        <section style={{ marginTop: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 8, letterSpacing: "-0.01em" }}>How to Download a YouTube Thumbnail</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, marginBottom: 32 }}>Three steps, under 10 seconds.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { n: "1", title: "Paste the URL", body: "Copy any YouTube video URL — regular videos, Shorts, or even just the 11-character video ID — and paste it into the box above." },
              { n: "2", title: "Click Get Thumbnails", body: "We instantly fetch all available thumbnail resolutions directly from YouTube's CDN. No server processing, results appear in under a second." },
              { n: "3", title: "Download Your Size", body: "Preview each resolution, then click Download for the size you need. Max Resolution (1280×720) is best for most uses. All downloads are watermark-free." },
            ].map(s => (
              <div key={s.n} style={{ ...cardStyle }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(${accentRgb},0.15)`, border: `1px solid rgba(${accentRgb},0.25)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 16, fontWeight: 900, color: accent }}>{s.n}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO content */}
        <section style={{ marginTop: 56, ...cardStyle }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: "0 0 16px" }}>YouTube Thumbnail Sizes Explained</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14.5, lineHeight: 1.7, margin: "0 0 16px" }}>
            YouTube stores thumbnails at five standard resolutions for every video. <strong style={{ color: "white" }}>Max Resolution (1280×720)</strong> is the largest available and is ideal for presentations, blog posts, or social media reposts. If a video was uploaded at lower quality, the Max Resolution thumbnail may not exist — in that case HQ Default (480×360) is the highest available.
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14.5, lineHeight: 1.7, margin: "0 0 16px" }}>
            Unlike most thumbnail downloaders that only give you one size, ToolStack shows all five resolutions simultaneously so you can pick the right one for your use case. Standard Definition (640×480) works well for email thumbnails and small embeds, while Medium Quality (320×180) is perfect for grid layouts and icon-sized previews.
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
            Thumbnail URLs follow the pattern <code style={{ background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: 4, fontSize: 13, color: accent }}>img.youtube.com/vi/VIDEO_ID/QUALITY.jpg</code> — they are publicly accessible from YouTube&apos;s CDN and do not require authentication to access.
          </p>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 24, letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                q: "Is it legal to download YouTube thumbnails?",
                a: "YouTube thumbnails are publicly accessible images displayed on YouTube's own pages. Downloading them for personal use, reference, or non-commercial purposes is generally accepted. However, thumbnails may be subject to copyright — always credit the original creator if you republish or reuse them commercially.",
              },
              {
                q: "Why is my Max Resolution thumbnail showing a grey placeholder?",
                a: "Not all videos have a Max Resolution (1280×720) thumbnail. Older videos or those uploaded at low quality may only have SD, HQ or MQ thumbnails. If maxresdefault shows as blank, use the HQ or SD size instead — those are almost always available.",
              },
              {
                q: "Does this work with YouTube Shorts?",
                a: "Yes. YouTube Shorts use the same video ID system as regular videos. Paste the full Shorts URL (e.g. youtube.com/shorts/VIDEO_ID) and all available thumbnail resolutions will appear instantly.",
              },
              {
                q: "What is the highest quality YouTube thumbnail size?",
                a: "The highest quality is maxresdefault.jpg at 1280×720 pixels. This is the thumbnail YouTube uses on the video page itself. For most modern videos uploaded after 2013, this resolution is available.",
              },
              {
                q: "Can I download thumbnails in bulk for multiple videos?",
                a: "Currently the tool supports one video at a time. Paste each URL separately and download the size you need. All downloads are instant and free — no limits on how many videos you can process.",
              },
              {
                q: "What is the best YouTube thumbnail downloader?",
                a: "ToolStack's YouTube Thumbnail Downloader shows all five resolutions simultaneously, provides instant previews, and lets you download or copy the URL for each size — all free with no signup required. Most competitors only show one or two sizes and require you to navigate between pages.",
              },
              {
                q: "Do I need to create an account to download thumbnails?",
                a: "No. ToolStack is completely free with no account required. Paste your URL, preview the thumbnails, and download — nothing else needed.",
              },
            ].map((f, i) => (
              <div key={i} style={{ ...cardStyle, padding: "20px 24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 8px" }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.65 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <MoreTools currentSlug="youtube-thumbnail-downloader" />

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "YouTube Thumbnail Downloader",
              "description": "Download any YouTube video thumbnail in HD, Full HD and Max resolution instantly. Free, no signup.",
              "url": "https://toolstack.tech/tools/youtube-thumbnail-downloader",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web",
              "browserRequirements": "Requires JavaScript",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "featureList": ["All 5 thumbnail resolutions", "Instant preview", "One-click download", "Copy URL", "Works with Shorts", "No signup required"],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://toolstack.tech/tools" },
                { "@type": "ListItem", "position": 3, "name": "YouTube Thumbnail Downloader", "item": "https://toolstack.tech/tools/youtube-thumbnail-downloader" },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Is it legal to download YouTube thumbnails?", "acceptedAnswer": { "@type": "Answer", "text": "YouTube thumbnails are publicly accessible images. Downloading them for personal or non-commercial reference is generally accepted, but thumbnails may be copyrighted — always credit the original creator if republishing commercially." } },
                { "@type": "Question", "name": "Why is my Max Resolution thumbnail showing a grey placeholder?", "acceptedAnswer": { "@type": "Answer", "text": "Not all videos have a Max Resolution (1280×720) thumbnail. Older or low-quality videos may only have SD or HQ sizes. Use HQ Default as a fallback." } },
                { "@type": "Question", "name": "Does this work with YouTube Shorts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Paste the full Shorts URL and all available thumbnail resolutions will appear instantly." } },
                { "@type": "Question", "name": "What is the highest quality YouTube thumbnail size?", "acceptedAnswer": { "@type": "Answer", "text": "maxresdefault.jpg at 1280×720 pixels is the highest quality, used by YouTube on the video page itself." } },
                { "@type": "Question", "name": "What is the best YouTube thumbnail downloader?", "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's YouTube Thumbnail Downloader shows all five resolutions simultaneously with instant previews and one-click downloads — all free with no signup required." } },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
