"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  ScanLine,
  Lightbulb,
  Image as ImageIcon,
  LayoutGrid,
  CalendarClock,
  Loader2,
  RefreshCw,
  Wand2,
  ArrowRight,
  Bookmark,
  Download,
  Trash2,
  BookOpen,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { Pricing } from "./Pricing";
import { MoreTools } from "@/components/MoreTools";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";
import { saveAd, listAds, deleteAd, type SavedAd } from "./savedAds";
import designSystemsData from "./designSystems.json";

type DesignSystem = { slug: string; name: string; category: string; blurb: string; directive: string };
const DESIGN_SYSTEMS = designSystemsData as DesignSystem[];
const dsBySlug = (slug?: string) => DESIGN_SYSTEMS.find((d) => d.slug === slug);

type Swatch = { name: string; hex: string };
type Brand = {
  name: string;
  tagline: string;
  vibes: string[];
  palette: Swatch[];
  fonts: { display: string; body: string };
  url?: string;
  // deep brand-learning fields (from the scan) — sharpen creatives + power the Brand Book
  overview?: string;
  values?: string[];
  aesthetic?: string[];
  tone?: string[];
  coverPrompt?: string;
  renderStyle?: string; // photographic | illustration | vector — drives the ad render medium
  logo?: string; // real brand logo pulled from the site
  images?: string[]; // real on-page brand images
  designSystem?: string; // matched Open Design system slug — drives creative art direction
  fetched?: boolean; // whether the live site was actually read (vs inferred from the domain)
};
type Concept = {
  name: string;
  angle: string;
  goal: string;
  audience: string;
  bigIdea: string;
};
type Slide = { type: "hook" | "point" | "cta"; headline: string; sub?: string };
// an editable text/button block laid over the AI image (x/y = % centre, size = % of canvas width)
type TextLayer = {
  id: string;
  text: string;
  x: number;
  y: number;
  size: number;
  font: string;
  color: string;
  align: "left" | "center" | "right";
  weight: number;
  plate: boolean;
  plateColor: string;
  kind: "text" | "button";
};
type Idea = {
  kind: string;
  title: string;
  blurb: string;
  caption: string;
  slides: Slide[];
  imagePrompt: string;
  imageUrl?: string;
  images?: string[];
  imageLoading?: boolean;
  imageError?: string; // inline error if this post's render failed
  mode?: "baked" | "editable"; // baked = AI designs the whole ad (default); editable = text-free image + editable layers
  animError?: string; // inline error if animation failed
  layers?: TextLayer[]; // legacy single layout (fallback)
  logo?: { x: number; y: number; size: number; plate: boolean }; // legacy single logo (fallback)
  // each image variant keeps its OWN text + logo layout (keyed by the variant's URL),
  // so editing one variant never moves text on the others
  layersByImage?: Record<string, TextLayer[]>;
  logoByImage?: Record<string, { x: number; y: number; size: number; plate: boolean }>;
  videoUrl?: string;
  animating?: boolean;
  animSeconds?: number;
};

const DEFAULT_BRAND: Brand = {
  name: "Your Brand",
  tagline: "Scan a website to pull its real identity",
  vibes: ["Bold", "Modern", "Friendly", "Premium"],
  palette: [
    { name: "PRIMARY", hex: "#6C5CE7" },
    { name: "INK", hex: "#1B1830" },
    { name: "ACCENT", hex: "#F4B740" },
    { name: "PAPER", hex: "#F4F2EC" },
  ],
  fonts: { display: "Playfair Display", body: "Poppins" },
};

const FEATURES = [
  { label: "Scan Brand", Icon: ScanLine, accent: "#6C8CF7" },
  { label: "Pick Campaign", Icon: Lightbulb, accent: "#22C7B8" },
  { label: "AI Images", Icon: ImageIcon, accent: "#8B7CF6" },
  { label: "Carousels", Icon: LayoutGrid, accent: "#F2B441" },
  { label: "Schedule", Icon: CalendarClock, accent: "#F2748B" },
];

const FAQS = [
  {
    q: "What is ToolStack Design Studio?",
    a: "It's an AI ad & campaign studio. You scan any brand website to pull its identity, colors and fonts, let GPT-4o pitch on-brand campaign concepts, expand any of them into a series of finished, ready-to-post ads, and render branded visuals with AI — all in your browser.",
  },
  {
    q: "How does the brand scan work?",
    a: "Paste a brand's website and ToolStack Design Studio reads the page and infers the brand name, tagline, vibe, a four-colour palette and a font pairing. You can fine-tune any of it before pitching campaigns.",
  },
  {
    q: "Which AI image model does it use?",
    a: "Images are rendered with fal.ai (Recraft V3 by default — the best model for branded social graphics with real typography). Each post comes back as a complete, designed ad — headline, sub-line, brand wordmark and call-to-action all laid out on-brand.",
  },
  {
    q: "Is it free to try?",
    a: "Yes — you get 5 free generations to make real ads on your brand, no signup needed to start. After that, plans start at $29/month, or you can own the whole system outright. See pricing above.",
  },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolStack Design Studio — AI Ad & Campaign Studio",
      applicationCategory: "DesignApplication",
      operatingSystem: "All",
      url: "https://toolstack.tech/tools/jdesigns-studio",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://toolstack.tech" },
        { "@type": "ListItem", position: 2, name: "Tools", item: "https://toolstack.tech/tools" },
        { "@type": "ListItem", position: 3, name: "ToolStack Design Studio", item: "https://toolstack.tech/tools/jdesigns-studio" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const POSTLY_LINK = "https://poster.ly?atp=toolstack";

// the brand's scanned render medium → the Recraft V3 style used for ad creatives
const RECRAFT_STYLE: Record<string, string> = {
  photographic: "realistic_image",
  illustration: "digital_illustration",
  vector: "vector_illustration",
};

// optional look the customer can force, overriding the brand's auto-picked medium.
// each maps to a Recraft base style + a prompt modifier that locks the look.
const STYLE_PRESETS: { key: string; label: string; style: string; modifier: string }[] = [
  { key: "auto", label: "Auto (match brand)", style: "", modifier: "" },
  { key: "photographic", label: "Photographic", style: "realistic_image", modifier: "photorealistic commercial photography" },
  { key: "illustration", label: "Illustration", style: "digital_illustration", modifier: "clean modern digital illustration" },
  { key: "vector", label: "Vector / Flat", style: "vector_illustration", modifier: "flat vector illustration, bold simple shapes" },
  { key: "cartoon", label: "Cartoon", style: "digital_illustration", modifier: "bold cartoon style, thick outlines, flat cel shading, fun and playful" },
  { key: "vintage", label: "Vintage / Historic", style: "realistic_image", modifier: "vintage historic aesthetic, aged paper and print textures, retro period-accurate look" },
  { key: "watercolor", label: "Watercolor", style: "digital_illustration", modifier: "soft hand-painted watercolor, organic washes and bleeds" },
  { key: "render3d", label: "3D Render", style: "realistic_image", modifier: "glossy 3D render, soft studio lighting, octane-style depth" },
];

const FONT_OPTIONS = ["Playfair Display", "Newsreader", "Poppins", "DM Serif Display", "Bebas Neue", "Space Grotesk", "Anton", "Pacifico"];

const FORMATS: Record<string, { label: string; sub: string; w: number; h: number }> = {
  portrait: { label: "Portrait", sub: "4:5", w: 1080, h: 1350 },
  square: { label: "Square", sub: "1:1", w: 1080, h: 1080 },
  story: { label: "Story / Reel", sub: "9:16", w: 1080, h: 1920 },
  landscape: { label: "Landscape", sub: "16:9", w: 1920, h: 1080 },
};
function fitBox(w: number, h: number, maxW: number, maxH: number) {
  const r = w / h;
  let cw = maxW;
  let ch = maxW / r;
  if (ch > maxH) {
    ch = maxH;
    cw = maxH * r;
  }
  return { cw: Math.round(cw), ch: Math.round(ch) };
}

// ─── Device ID & paywall helpers ──────────────────────────────────────────
function getDeviceId(): string {
  let id = localStorage.getItem("jd_device_id");
  if (id) return id;
  // Generate a stable random fingerprint stored in localStorage
  const chars = "abcdef0123456789";
  let h = "";
  for (let i = 0; i < 32; i++) h += chars[Math.floor(Math.random() * chars.length)];
  localStorage.setItem("jd_device_id", h);
  return h;
}

function getWhopPlan(): string | null {
  // whop_plan is a readable cookie set on login (the auth token itself is httpOnly)
  const m = document.cookie.match(/(?:^|;\s*)whop_plan=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : null;
}

async function api<T>(path: string, body: unknown): Promise<T & { _paywall?: { code: string; remaining: number } }> {
  const deviceId = getDeviceId();
  // whop_token (httpOnly) rides automatically on same-origin requests; only the device id needs sending
  const headers: Record<string, string> = { "Content-Type": "application/json", "x-device-id": deviceId };
  const res = await fetch(path, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    // 402 = paywall hit — carry the paywall info so the caller can show the upgrade prompt
    if (res.status === 402) {
      return { _paywall: { code: data?.code || "trial_used", remaining: data?.remaining ?? 0 } } as any;
    }
    throw new Error(data?.error || "Request failed");
  }
  return data as T;
}

export default function JdesignsStudioPage() {
  const [brandUrl, setBrandUrl] = useState("coca-cola.com");
  const [scanning, setScanning] = useState(false);
  const [brand, setBrand] = useState<Brand>(DEFAULT_BRAND);
  const [direction, setDirection] = useState("");
  const [ideaCount, setIdeaCount] = useState(3);
  const [format, setFormat] = useState("portrait");
  const [styleKey, setStyleKey] = useState("auto");
  const [generating, setGenerating] = useState(false);
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [loadingConcepts, setLoadingConcepts] = useState(false);
  const [campaign, setCampaign] = useState<Concept | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [builtByCampaign, setBuiltByCampaign] = useState<Record<string, Idea[]>>({});
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<number | null>(null);
  // paywall state
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallReason, setPaywallReason] = useState<"trial" | "cap">("trial");
  const [remaining, setRemaining] = useState(5);
  const [loggedIn, setLoggedIn] = useState(false);
  // real brand assets — scraped on scan, overridable/extendable by customer uploads
  const [logoUrl, setLogoUrl] = useState("");
  const [brandImages, setBrandImages] = useState<string[]>([]);
  const [designSystem, setDesignSystem] = useState(""); // matched/overridable Open Design system
  const [scanFetched, setScanFetched] = useState(true); // false when the site couldn't be read (best-guess)

  function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }
  async function onUploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setLogoUrl(await readFileAsDataUrl(file));
    e.target.value = "";
  }
  async function onUploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const urls = await Promise.all(files.map(readFileAsDataUrl));
    if (urls.length) setBrandImages((prev) => [...urls, ...prev]);
    e.target.value = "";
  }

  // data URLs (uploads) load directly; remote images go through the same-origin proxy so canvas stays untainted
  const proxied = (u: string) => (!u ? "" : u.startsWith("data:") ? u : "/api/jdesigns-studio/proxy?url=" + encodeURIComponent(u));

  // ─── Whop OAuth login ──────────────────────────────────────────────────
  const WHOP_AUTH_URL = "/api/jdesigns-studio/whop/login"; // server route builds the authorize URL + CSRF state
  useEffect(() => {
    const plan = getWhopPlan();
    setLoggedIn(!!plan && plan !== "free");
  }, []);

  function handlePaywall(pw: { code: string; remaining: number }) {
    if (pw.code === "trial_used") {
      setPaywallReason("trial");
      setRemaining(0);
    } else {
      setPaywallReason("cap");
      setRemaining(pw.remaining);
    }
    setShowPaywall(true);
  }

  // Surface any OAuth callback error on mount (login state is handled by getWhopPlan above)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authErr = params.get("auth_error");
    if (authErr) {
      setError(authErr === "no_code" ? "" : `Login issue: ${authErr.replace(/_/g, " ")}`);
      // Clean the URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // ---- unified ad editor: drag/place the logo AND the editable text layers ----
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragIdRef = useRef<string | null>(null); // "logo" or a text-layer id
  const [selLayer, setSelLayer] = useState<string>("headline"); // which element the controls panel edits
  const [editing, setEditing] = useState(false); // layered ads open as a finished preview; Edit reveals the controls

  const DEFAULT_LOGO = { x: 84, y: 91, size: 12, plate: false }; // bottom-right corner — clear of the top headline
  // the currently-selected variant is the edit target; each variant owns its own layout
  const imgKey = (it: Idea) => it.imageUrl || "__base__";
  const logoOf = (it: Idea) => ({ ...DEFAULT_LOGO, ...(it.logoByImage?.[imgKey(it)] || it.logo || {}) });
  function updateLogo(idx: number, patch: Partial<NonNullable<Idea["logo"]>>) {
    setIdeas((prev) => prev.map((it, i) => {
      if (i !== idx) return it;
      const key = imgKey(it);
      return { ...it, logoByImage: { ...(it.logoByImage || {}), [key]: { ...logoOf(it), ...patch } } };
    }));
  }

  // default text/CTA layers derived from the campaign copy (headline, sub, CTA)
  function defaultLayers(it: Idea): TextLayer[] {
    const cta = it.slides?.find((s) => s.type === "cta");
    const layers: TextLayer[] = [
      { id: "headline", text: it.slides?.[0]?.headline || it.title || "", x: 50, y: 20, size: 9, font: brand.fonts?.display || "Playfair Display", color: "#ffffff", align: "center", weight: 800, plate: false, plateColor: "#000000", kind: "text" },
      { id: "sub", text: it.slides?.[0]?.sub || "", x: 50, y: 32, size: 4, font: brand.fonts?.body || "Poppins", color: "#ffffff", align: "center", weight: 600, plate: false, plateColor: "#000000", kind: "text" },
      { id: "cta", text: cta?.headline || "Learn more", x: 50, y: 88, size: 4, font: brand.fonts?.body || "Poppins", color: "#ffffff", align: "center", weight: 800, plate: true, plateColor: primary, kind: "button" },
    ];
    return layers.filter((l) => l.text.trim());
  }
  const layersOf = (it: Idea): TextLayer[] => {
    const byImg = it.layersByImage?.[imgKey(it)];
    if (byImg && byImg.length) return byImg;
    if (it.layers && it.layers.length) return it.layers;
    return defaultLayers(it);
  };
  function updateLayer(idx: number, id: string, patch: Partial<TextLayer>) {
    setIdeas((prev) => prev.map((it, i) => {
      if (i !== idx) return it;
      const key = imgKey(it);
      const next = layersOf(it).map((l) => (l.id === id ? { ...l, ...patch } : l));
      return { ...it, layersByImage: { ...(it.layersByImage || {}), [key]: next } };
    }));
  }

  function startDrag(e: React.PointerEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    dragIdRef.current = id;
    setSelLayer(id);
  }
  function onCanvasMove(e: React.PointerEvent, idx: number) {
    const id = dragIdRef.current;
    if (!id || !canvasRef.current) return;
    const r = canvasRef.current.getBoundingClientRect();
    const x = Math.min(97, Math.max(3, ((e.clientX - r.left) / r.width) * 100));
    const y = Math.min(97, Math.max(3, ((e.clientY - r.top) / r.height) * 100));
    if (id === "logo") updateLogo(idx, { x, y });
    else updateLayer(idx, id, { x, y });
  }
  function endDrag() {
    dragIdRef.current = null;
  }

  // knock out the logo's solid/near-white background → transparent PNG (no more white block)
  async function removeLogoBg() {
    if (!logoUrl) return;
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = proxied(logoUrl);
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.naturalWidth || 256;
      c.height = img.naturalHeight || 256;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const data = ctx.getImageData(0, 0, c.width, c.height);
      const d = data.data;
      // sample the four corners → average background colour
      const corners = [0, (c.width - 1) * 4, (c.height - 1) * c.width * 4, (c.width * c.height - 1) * 4];
      let br = 0, bg = 0, bb = 0;
      corners.forEach((p) => { br += d[p]; bg += d[p + 1]; bb += d[p + 2]; });
      br /= 4; bg /= 4; bb /= 4;
      const tol = 50; // colour distance tolerance
      for (let i = 0; i < d.length; i += 4) {
        const dist = Math.sqrt((d[i] - br) ** 2 + (d[i + 1] - bg) ** 2 + (d[i + 2] - bb) ** 2);
        if (dist < tol) d[i + 3] = 0;
        else if (dist < tol * 1.8) d[i + 3] = Math.round((d[i + 3] * (dist - tol)) / (tol * 0.8)); // feather edges
      }
      ctx.putImageData(data, 0, 0);
      setLogoUrl(c.toDataURL("image/png"));
    } catch {
      setError("Couldn't process the logo — try uploading a transparent PNG instead.");
    }
  }

  // all editable elements composited over the AI image: text/CTA layers + the real logo
  function AdOverlays({ idea, idx, w, editable, logoDraggable }: { idea: Idea; idx: number; w: number; editable?: boolean; logoDraggable?: boolean }) {
    const lp = logoOf(idea);
    const logoSize = w * (lp.size / 100);
    const canDragLogo = logoDraggable ?? editable; // logo is movable in baked mode too, not only when editing text
    return (
      <>
        {idea.mode !== "baked" && layersOf(idea).map((l) => {
          const fontPx = w * (l.size / 100);
          const isBtn = l.kind === "button";
          const selected = editable && selLayer === l.id;
          return (
            <div
              key={l.id}
              onPointerDown={editable ? (e) => startDrag(e, l.id) : undefined}
              style={{
                position: "absolute",
                left: `${l.x}%`,
                top: `${l.y}%`,
                transform: "translate(-50%,-50%)",
                maxWidth: "90%",
                cursor: editable ? "move" : "default",
                touchAction: editable ? "none" : undefined,
                padding: isBtn ? `${fontPx * 0.55}px ${fontPx * 1.1}px` : l.plate ? `${fontPx * 0.32}px ${fontPx * 0.5}px` : 0,
                background: isBtn || l.plate ? l.plateColor : "transparent",
                borderRadius: isBtn ? fontPx * 0.9 : w * 0.02,
                outline: selected ? "1.5px dashed rgba(255,255,255,.9)" : "1.5px dashed transparent",
                outlineOffset: 2,
              }}
            >
              <div style={{ fontFamily: `'${l.font}', sans-serif`, fontWeight: l.weight, fontSize: fontPx, color: l.color, textAlign: l.align, lineHeight: 1.08, whiteSpace: "pre-wrap", textShadow: !l.plate && !isBtn ? "0 1px 6px rgba(0,0,0,.6)" : "none", pointerEvents: "none" }}>
                {l.text}
              </div>
            </div>
          );
        })}
        {logoUrl && (
          <div
            onPointerDown={canDragLogo ? (e) => startDrag(e, "logo") : undefined}
            style={{
              position: "absolute",
              left: `${lp.x}%`,
              top: `${lp.y}%`,
              transform: "translate(-50%,-50%)",
              padding: lp.plate ? w * 0.02 : 0,
              background: lp.plate ? "rgba(255,255,255,.95)" : "transparent",
              borderRadius: w * 0.03,
              boxShadow: lp.plate ? "0 2px 10px rgba(0,0,0,.25)" : "none",
              lineHeight: 0,
              cursor: canDragLogo ? "move" : "default",
              touchAction: canDragLogo ? "none" : undefined,
              outline: canDragLogo && selLayer === "logo" ? "1.5px dashed rgba(255,255,255,.9)" : undefined,
              outlineOffset: 2,
            }}
          >
            <img src={proxied(logoUrl)} alt="brand logo" draggable={false} style={{ display: "block", height: logoSize, width: "auto", maxWidth: w * 0.6, objectFit: "contain", pointerEvents: "none", filter: lp.plate ? "none" : "drop-shadow(0 1px 4px rgba(0,0,0,.45))" }} />
          </div>
        )}
      </>
    );
  }
  // persistent library of every ad rendered (IndexedDB-backed, survives reloads)
  type GalleryItem = { id: string; url: string; brand: string; campaign: string; title: string };
  const [saved, setSaved] = useState<GalleryItem[]>([]);
  const [savedView, setSavedView] = useState<GalleryItem | null>(null); // saved-ad lightbox

  // load the saved library once on mount; object URLs are revoked on unmount
  useEffect(() => {
    let urls: string[] = [];
    listAds()
      .then((ads) => {
        const items = ads.map((a) => {
          const url = URL.createObjectURL(a.blob);
          urls.push(url);
          return { id: a.id, url, brand: a.brand, campaign: a.campaign, title: a.title };
        });
        setSaved(items);
      })
      .catch(() => {});
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  // dynamically load the brand's Google Fonts so previews render in-brand
  useEffect(() => {
    const fams = [brand.fonts?.display, brand.fonts?.body]
      .filter(Boolean)
      .map((f) => f!.trim().replace(/\s+/g, "+"))
      .map((f) => `family=${f}:wght@400;500;600;700;800`)
      .join("&");
    if (!fams) return;
    const id = "jd-brand-fonts";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    const href = `https://fonts.googleapis.com/css2?${fams}&display=swap`;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [brand.fonts?.display, brand.fonts?.body]);

  // load the editor's font picker options once
  useEffect(() => {
    const id = "jd-editor-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?" + FONT_OPTIONS.map((f) => "family=" + f.replace(/\s+/g, "+")).join("&") + "&display=swap";
    document.head.appendChild(link);
  }, []);

  // each time a different ad opens in the preview, start in the finished (non-editing) view
  useEffect(() => {
    setEditing(false);
  }, [preview]);

  const primary = brand.palette?.[0]?.hex || "#6C5CE7";
  const ink = brand.palette?.[1]?.hex || "#1B1830";
  const accent = brand.palette?.[2]?.hex || "#F4B740";
  const paper = brand.palette?.[3]?.hex || "#F4F2EC";

  // once a real brand is scanned, the studio re-skins to feel personal to them
  const themed = !!brand.url;
  const dispFont = `'${brand.fonts?.display || "Newsreader"}', Georgia, serif`;
  const eyebrow = themed ? primary : "#B0A892"; // section labels adopt the brand colour

  // per-slide visual treatment (cover/point/cta) using the brand palette
  const slideViz = (i: number, total: number, img?: string): { photo: boolean; img?: string; bg: string; fg: string; rule: string; role: string } => {
    if (i === 0 && img) return { photo: true, img, bg: "#000", fg: "#fff", rule: accent, role: "Hook" };
    if (i === 0) return { photo: false, bg: primary, fg: "#fff", rule: accent, role: "Hook" };
    if (i === total - 1) return { photo: false, bg: accent, fg: ink, rule: ink, role: "CTA" };
    return i % 2 === 0
      ? { photo: false, bg: paper, fg: ink, rule: primary, role: "Point" }
      : { photo: false, bg: ink, fg: "#fff", rule: accent, role: "Point" };
  };

  // ---- preview panel ----
  const ctlLabel: React.CSSProperties = { display: "block", fontSize: 10, fontWeight: 800, letterSpacing: ".1em", color: "#B0A892", textTransform: "uppercase", marginBottom: 6 };

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  // render the AI ad image to a PNG and download it at the chosen resolution
  async function downloadCover(idx: number, scale: number) {
    const it = ideas[idx];
    if (!it.imageUrl) return;
    const fmt = FORMATS[format];
    const W = Math.round(fmt.w * scale);
    const H = Math.round(fmt.h * scale);
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/api/jdesigns-studio/proxy?url=" + encodeURIComponent(it.imageUrl);
    try {
      await img.decode();
    } catch {
      setError("Couldn't load the image for download — try again.");
      return;
    }
    const ir = img.width / img.height || W / H;
    const cr = W / H;
    let dw = W, dh = H, dx = 0, dy = 0;
    if (ir > cr) {
      dh = H;
      dw = H * ir;
      dx = (W - dw) / 2;
    } else {
      dw = W;
      dh = W / ir;
      dy = (H - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);

    // composite the editable text / CTA layers (default mode; skipped only for baked AI-text ads)
    for (const l of it.mode !== "baked" ? layersOf(it) : []) {
      const text = (l.text || "").trim();
      if (!text) continue;
      const fontPx = W * (l.size / 100);
      try { await document.fonts.load(`${l.weight} ${fontPx}px '${l.font}'`); } catch {}
      ctx.font = `${l.weight} ${fontPx}px '${l.font}', sans-serif`;
      ctx.textBaseline = "alphabetic";
      const maxW = W * 0.84;
      const words = text.split(/\s+/);
      const lines: string[] = [];
      let line = "";
      for (const wd of words) {
        const t = line ? line + " " + wd : wd;
        if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = wd; } else line = t;
      }
      if (line) lines.push(line);
      const lineH = fontPx * 1.12;
      const blockH = lines.length * lineH;
      let blockW = 0;
      for (const ln of lines) blockW = Math.max(blockW, ctx.measureText(ln).width);
      const cx = (W * l.x) / 100;
      const cy = (H * l.y) / 100;
      const isBtn = l.kind === "button";
      if (isBtn || l.plate) {
        const padX = isBtn ? fontPx * 1.1 : fontPx * 0.5;
        const padY = isBtn ? fontPx * 0.55 : fontPx * 0.32;
        const rectW = blockW + padX * 2, rectH = blockH + padY * 2;
        roundRect(ctx, cx - rectW / 2, cy - rectH / 2, rectW, rectH, isBtn ? rectH / 2 : W * 0.02);
        ctx.fillStyle = l.plateColor;
        ctx.fill();
      } else {
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = fontPx * 0.4;
        ctx.shadowOffsetY = fontPx * 0.05;
      }
      ctx.fillStyle = l.color;
      ctx.textAlign = l.align;
      const anchorX = l.align === "left" ? cx - blockW / 2 : l.align === "right" ? cx + blockW / 2 : cx;
      let baseY = cy - blockH / 2 + fontPx * 0.82;
      for (const ln of lines) { ctx.fillText(ln, anchorX, baseY); baseY += lineH; }
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
    }

    // composite the real brand logo at the customer's chosen position / size / plate
    if (logoUrl) {
      try {
        const lp = logoOf(it);
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = proxied(logoUrl);
        await logo.decode();
        const lh = W * (lp.size / 100);
        const lw = Math.min(W * 0.6, (logo.width / logo.height || 1) * lh);
        const cx = (W * lp.x) / 100;
        const cy = (H * lp.y) / 100;
        if (lp.plate) {
          const pad = W * 0.02;
          roundRect(ctx, cx - lw / 2 - pad, cy - lh / 2 - pad, lw + pad * 2, lh + pad * 2, W * 0.03);
          ctx.fillStyle = "rgba(255,255,255,0.95)";
          ctx.fill();
        } else {
          ctx.shadowColor = "rgba(0,0,0,0.45)";
          ctx.shadowBlur = W * 0.012;
          ctx.shadowOffsetY = W * 0.004;
        }
        ctx.drawImage(logo, cx - lw / 2, cy - lh / 2, lw, lh);
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
      } catch {
        /* logo couldn't load (e.g. CORS) — keep the ad, just skip the overlay */
      }
    }

    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      setError("Download failed — try again.");
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${(brand.name || "cover").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${(it.kind || "cover").toLowerCase()}-${W}x${H}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function onScan() {
    if (!brandUrl.trim() || scanning) return;
    setScanning(true);
    setError("");
    try {
      // one deep brand-learning pass — powers the creatives AND the Brand Book
      const scanRes = await api<{ brand: Brand }>("/api/jdesigns-studio/brandbook", { url: brandUrl });
      if (scanRes._paywall) { handlePaywall(scanRes._paywall); return; }
      const b = scanRes.brand;
      const learned: Brand = {
        name: b.name || "Brand",
        tagline: b.tagline || "",
        vibes: b.vibes?.slice(0, 4) || [],
        palette: b.palette?.slice(0, 4) || DEFAULT_BRAND.palette,
        fonts: b.fonts || DEFAULT_BRAND.fonts,
        url: b.url,
        overview: b.overview,
        values: b.values,
        aesthetic: b.aesthetic,
        tone: b.tone,
        coverPrompt: b.coverPrompt,
        renderStyle: b.renderStyle,
        logo: b.logo,
        images: b.images,
        designSystem: b.designSystem,
      };
      setBrand(learned);
      setLogoUrl(b.logo || "");
      setBrandImages(b.images || []);
      setDesignSystem(b.designSystem || "");
      setScanFetched(b.fetched !== false);
      // stash the full profile so the Brand Book opens instantly with no re-scan
      try {
        sessionStorage.setItem("jdesigns:brand", JSON.stringify(learned));
      } catch {
        /* ignore storage failures */
      }
      setConcepts([]);
      setCampaign(null);
      setIdeas([]);
      setBuiltByCampaign({});
    } catch (e: any) {
      setError(e.message || "Scan failed");
    } finally {
      setScanning(false);
    }
  }

  // step 1 — pitch 3 campaign concepts to choose from
  async function onGenerateConcepts() {
    if (loadingConcepts) return;
    setLoadingConcepts(true);
    setError("");
    setCampaign(null);
    setIdeas([]);
    setBuiltByCampaign({});
    try {
      const concRes = await api<{ concepts: Concept[] }>("/api/jdesigns-studio/concepts", {
        brand,
        direction,
      });
      if (concRes._paywall) { handlePaywall(concRes._paywall); return; }
      setConcepts(concRes.concepts);
    } catch (e: any) {
      setError(e.message || "Couldn't pitch campaigns");
    } finally {
      setLoadingConcepts(false);
    }
  }

  // step 2 — open a campaign. Each campaign holds its own series: build it on first
  // open, then just switch back to it (no regen, no lost edits) on later opens.
  async function onPickConcept(concept: Concept) {
    if (generating) return;
    // stash the campaign we're leaving so its built series + edits survive the switch
    if (campaign && campaign.name !== concept.name && ideas.length) {
      setBuiltByCampaign((prev) => ({ ...prev, [campaign.name]: ideas }));
    }
    setError("");
    setPreview(null);
    // already built once → restore it instantly, don't re-spend on generation
    const existing = builtByCampaign[concept.name];
    if (existing && existing.length) {
      setCampaign(concept);
      setIdeas(existing);
      return;
    }
    setCampaign(concept);
    setIdeas([]);
    setGenerating(true);
    try {
      const ds = dsBySlug(designSystem);
      const ideasRes = await api<{ ideas: Idea[] }>("/api/jdesigns-studio/ideas", {
        brand,
        direction,
        count: ideaCount,
        campaign: concept,
        designDirective: ds ? `${ds.name} design language — ${ds.directive || ds.blurb}` : "",
      });
      if (ideasRes._paywall) { handlePaywall(ideasRes._paywall); return; }
      const built = ideasRes.ideas.map((i) => ({ ...i }));
      setIdeas(built);
      setBuiltByCampaign((prev) => ({ ...prev, [concept.name]: built }));
    } catch (e: any) {
      setError(e.message || "Campaign generation failed");
    } finally {
      setGenerating(false);
    }
  }

  async function onGenImage(idx: number, modeOverride?: "baked" | "editable") {
    const mode = modeOverride ?? ideas[idx].mode ?? "baked";
    setIdeas((prev) => prev.map((it, i) => (i === idx ? { ...it, imageLoading: true, imageError: undefined } : it)));
    try {
      const it = ideas[idx];
      const scene = it.imagePrompt;
      const hook = it.slides?.[0];
      const ctaSlide = it.slides?.find((s) => s.type === "cta");
      // baked = AI designs the whole ad with the copy painted in; editable = clean text-free image for the layer editor
      const basePrompt =
        mode === "baked"
          ? `${scene}\n\nRender this as a FINISHED, fully-designed advertisement. Include ONLY these three pieces of text, exactly as written, correctly spelled — and NO other words, NO body copy, NO fine print, NO lorem ipsum, NO captions: headline "${(hook?.headline || it.title || "").trim()}"${hook?.sub ? `, sub-line "${hook.sub.trim()}"` : ""}, call-to-action button "${(ctaSlide?.headline || "Learn more").trim()}". Premium ad typography, clear hierarchy, on-brand colours. Leave the bottom-right corner clean for a logo. Do NOT draw any logo, wordmark or brand name.`
          : `${scene}\n\nImagery ONLY — absolutely no text, words, letters, headlines, logos, wordmarks or UI anywhere in the image. Leave clean negative space across the top and bottom for text added later.`;
      // optional forced customer style on top of the brand's auto-picked medium
      const preset = STYLE_PRESETS.find((p) => p.key === styleKey);
      const recraftStyle = preset && preset.key !== "auto" ? preset.style : RECRAFT_STYLE[brand.renderStyle || ""] || "digital_illustration";
      const prompt = preset && preset.key !== "auto" ? `${basePrompt}\n\nRender style OVERRIDE — render entirely as: ${preset.modifier}.` : basePrompt;
      // baked text → Ideogram (best-in-class legibility); text-free scene → Recraft (best on-brand imagery)
      const model = mode === "baked" ? "ideogram" : "recraft";
      // fire 3 parallel renders → 3 on-brand variants to choose from
      const reqs = Array.from({ length: 3 }).map(() =>
        api<{ url: string }>("/api/jdesigns-studio/image", {
          prompt,
          model,
          width: FORMATS[format].w,
          height: FORMATS[format].h,
          style: recraftStyle,
          colors: brand.palette.map((p) => p.hex),
        })
          .then((r) => {
            if (r._paywall) throw new Error("paywall");
            return r.url;
          })
          .catch(() => null)
      );
      const urls = (await Promise.all(reqs)).filter(Boolean) as string[];
      if (!urls.length) throw new Error("Image generation failed");
      // flip the mode only once the matching image lands (avoids a text/no-text flash)
      setIdeas((prev) => prev.map((x, i) => (i === idx ? { ...x, images: urls, imageUrl: urls[0], imageLoading: false, mode } : x)));
      persistAds(urls, { brand: brand.name, campaign: campaign?.name || "", title: ideas[idx].title });
    } catch (e: any) {
      setIdeas((prev) => prev.map((x, i) => (i === idx ? { ...x, imageLoading: false, imageError: e.message || "Couldn't render — try again." } : x)));
    }
  }

  // fetch each rendered ad through the proxy, store the blob in IndexedDB, and add it to the gallery
  async function persistAds(urls: string[], meta: { brand: string; campaign: string; title: string }) {
    for (const url of urls) {
      try {
        const res = await fetch("/api/jdesigns-studio/proxy?url=" + encodeURIComponent(url));
        if (!res.ok) continue;
        const blob = await res.blob();
        const id = crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
        const ad: SavedAd = { id, blob, brand: meta.brand, campaign: meta.campaign, title: meta.title, format, createdAt: Date.now() };
        await saveAd(ad);
        const objUrl = URL.createObjectURL(blob);
        setSaved((prev) => [{ id, url: objUrl, brand: meta.brand, campaign: meta.campaign, title: meta.title }, ...prev]);
      } catch {
        /* skip a single failed save — never block generation */
      }
    }
  }

  async function removeSaved(id: string) {
    setSaved((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it) URL.revokeObjectURL(it.url);
      return prev.filter((x) => x.id !== id);
    });
    try {
      await deleteAd(id);
    } catch {
      /* ignore */
    }
  }

  async function downloadSaved(item: GalleryItem) {
    const blob = await fetch(item.url).then((r) => r.blob());
    const ext = blob.type.includes("png") ? "png" : blob.type.includes("jpeg") ? "jpg" : "webp";
    const slug = (s: string) => (s || "ad").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const a = document.createElement("a");
    a.href = item.url;
    a.download = `${slug(item.brand)}-${slug(item.title)}.${ext}`;
    a.click();
  }

  function selectImage(idx: number, url: string) {
    setIdeas((prev) => prev.map((it, i) => (i === idx ? { ...it, imageUrl: url, videoUrl: undefined } : it)));
  }

  // animate ONLY the selected cover of one post (premium, explicit click — never all variants/slides)
  async function animate(idx: number) {
    const it = ideas[idx];
    if (!it?.imageUrl) return;
    setIdeas((prev) => prev.map((x, i) => (i === idx ? { ...x, animating: true, animError: undefined } : x)));
    try {
      const fmt = FORMATS[format];
      const aspectRatio = fmt.w > fmt.h ? "16:9" : fmt.w === fmt.h ? "1:1" : "9:16";
      const animRes = await api<{ url: string }>("/api/jdesigns-studio/animate", { imageUrl: it.imageUrl, aspectRatio, duration: it.animSeconds || 5 });
      if (animRes._paywall) { handlePaywall(animRes._paywall); return; }
      setIdeas((prev) => prev.map((x, i) => (i === idx ? { ...x, videoUrl: animRes.url, animating: false } : x)));
    } catch (e: any) {
      setIdeas((prev) => prev.map((x, i) => (i === idx ? { ...x, animating: false, animError: e.message || "Animation failed — try again." } : x)));
    }
  }


  function updateCaption(idx: number, val: string) {
    setIdeas((prev) => prev.map((it, i) => (i === idx ? { ...it, caption: val } : it)));
  }

  return (
    <div style={{ background: "#F7F6F2", minHeight: "100vh", color: "#221F1A" }}>
      {/* ===================== BANNER ===================== */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: themed
            ? `linear-gradient(160deg, ${primary}1f 0%, ${accent}14 55%, #FFFFFF 100%)`
            : "linear-gradient(160deg,#EEF1FF 0%,#F4F1FF 55%,#FBF6FF 100%)",
          borderBottom: themed ? `1px solid ${primary}2e` : "1px solid #E7E3F5",
          padding: "44px 20px 0",
        }}
      >
        {/* soft glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: themed
              ? `radial-gradient(circle, ${primary}33 0%, ${primary}00 70%)`
              : "radial-gradient(circle,#DCE2FF 0%,rgba(220,226,255,0) 70%)",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          {/* logo + wordmark */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: themed ? (logoUrl ? "#fff" : primary) : "#16131F",
                border: themed && logoUrl ? `1px solid ${primary}33` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: themed ? `0 8px 22px ${primary}47` : "0 8px 22px rgba(22,19,31,.28)",
                color: "#fff",
                fontFamily: dispFont,
                fontWeight: 800,
                fontSize: 28,
              }}
            >
              {themed && logoUrl ? (
                <img src={proxied(logoUrl)} alt={brand.name} style={{ width: "72%", height: "72%", objectFit: "contain" }} />
              ) : themed ? (
                (brand.name || "B").charAt(0).toUpperCase()
              ) : (
                <Sparkles size={28} color="#fff" strokeWidth={2.2} />
              )}
            </div>
            {themed ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".24em", textTransform: "uppercase", color: primary }}>
                  Design Studio
                </span>
                <span style={{ fontFamily: dispFont, fontWeight: 800, fontSize: 40, letterSpacing: "-.01em", color: ink, lineHeight: 1 }}>
                  {brand.name}
                </span>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontStyle: "italic", fontWeight: 600, fontSize: 40, letterSpacing: "-.01em", color: "#16131F" }}>
                  ToolStack
                </span>
                <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: ".24em", textTransform: "uppercase", color: "#9A93B8" }}>
                  Design Studio
                </span>
              </div>
            )}
          </div>

          {/* ─── HERO hook (cold visitors only) ─── */}
          {!themed && (
            <h1 style={{ maxWidth: 820, margin: "10px auto 16px", fontFamily: dispFont, fontWeight: 800, fontSize: "clamp(33px,5.3vw,58px)", lineHeight: 1.03, letterSpacing: "-.02em", color: ink }}>
              Paste your website.<br />Get a month of on-brand ads.
            </h1>
          )}

          <p
            style={{
              maxWidth: 650,
              margin: "0 auto 26px",
              fontSize: 18.5,
              lineHeight: 1.5,
              color: "#4B4760",
              fontWeight: 500,
            }}
          >
            {themed
              ? `${brand.name}'s own design studio — campaigns, finished ads and a brand book, all rendered in your colours, fonts and voice.`
              : "Design Studio reads your real brand — logo, colours, fonts, voice — then builds full campaigns of finished, ready-to-post ads. No designer. No agency. No blank canvas. Schedule the whole month everywhere in one click."}
          </p>

          {/* primary CTA → the free trial lives in the builder below; login is secondary */}
          {!loggedIn && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 11, marginBottom: 8 }}>
              <a
                href="#ds-builder"
                style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 32px", borderRadius: 13, background: primary, color: "#fff", fontWeight: 800, fontSize: 17, textDecoration: "none", boxShadow: `0 16px 34px -12px ${primary}` }}
              >
                Try it free — 5 ads, no card <ArrowRight size={19} strokeWidth={2.6} />
              </a>
              <a href={WHOP_AUTH_URL} style={{ fontSize: 13, fontWeight: 600, color: primary, textDecoration: "none", opacity: 0.85 }}>
                Already own it? Log in with Whop →
              </a>
            </div>
          )}
          {loggedIn && (
            <div style={{ textAlign: "center", marginBottom: 12, fontSize: 13.5, color: "#4B4760", fontWeight: 600 }}>
              ✅ Connected to Whop — unlimited generations
            </div>
          )}

          {/* ownership angle — the real differentiator, planted in the hero */}
          {!themed && (
            <div style={{ marginTop: 14, marginBottom: 4, display: "flex", justifyContent: "center" }}>
              <a href="#ds-pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 999, background: `${ink}0f`, border: `1px solid ${ink}26`, color: ink, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                💎 Or own the whole studio outright — your own AI ad agency, yours to resell <ArrowRight size={15} strokeWidth={2.6} />
              </a>
            </div>
          )}

          {/* feature tiles */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 18,
              paddingBottom: 46,
            }}
          >
            {FEATURES.map(({ label, Icon, accent: a }) => (
              <div key={label} style={{ width: 130, textAlign: "center" }}>
                <div
                  style={{
                    height: 96,
                    borderRadius: 16,
                    background: "#fff",
                    boxShadow: "0 10px 26px -14px rgba(60,50,120,.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: `4px solid ${a}`,
                  }}
                >
                  <Icon size={34} color={a} strokeWidth={1.8} />
                </div>
                <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: "#3A3550" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* decorative baseline */}
        <div
          aria-hidden
          style={{
            height: 6,
            background: themed
              ? `linear-gradient(90deg, ${primary}, ${accent}, ${ink}, ${primary})`
              : "linear-gradient(90deg,#6C8CF7,#22C7B8,#8B7CF6,#F2B441,#F2748B)",
            opacity: 0.9,
          }}
        />
      </section>

      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ maxWidth: 1240, margin: "0 auto", padding: "16px 20px 0", fontSize: 13, color: "#8A8275" }}>
        <a href="https://toolstack.tech" style={{ color: "#8A8275", textDecoration: "none" }}>ToolStack</a>
        {" / "}
        <a href="/tools" style={{ color: "#8A8275", textDecoration: "none" }}>Tools</a>
        {" / "}
        <span style={{ color: "#3A3550", fontWeight: 600 }}>Design Studio</span>
      </nav>

      {/* ===================== BUILDER ===================== */}
      <div id="ds-builder" className="jd-cols" style={{ maxWidth: 1240, margin: "0 auto", padding: "26px 20px 80px", scrollMarginTop: 20 }}>
        {/* LEFT: brand source */}
        <aside
          className="jd-aside"
          style={{
            background: "#fff",
            border: "1px solid #ECE7DC",
            borderRadius: 18,
            padding: 22,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", color: eyebrow, textTransform: "uppercase", marginBottom: 13 }}>
            01 — Brand source
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <input
              value={brandUrl}
              onChange={(e) => setBrandUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onScan()}
              placeholder="brand-website.com"
              style={{
                flex: 1,
                height: 44,
                padding: "0 13px",
                border: "1px solid #E4DECF",
                borderRadius: 11,
                background: "#FBFAF6",
                fontSize: 14,
                fontWeight: 500,
                minWidth: 0,
                outline: "none",
              }}
            />
            <button
              onClick={onScan}
              disabled={scanning || !brandUrl.trim()}
              style={{
                height: 44,
                padding: "0 18px",
                border: "none",
                borderRadius: 11,
                background: primary,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                opacity: scanning || !brandUrl.trim() ? 0.55 : 1,
                cursor: scanning || !brandUrl.trim() ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              {scanning ? <Loader2 size={15} className="jd-spin" /> : <ScanLine size={15} />}
              {scanning ? "Scanning" : "Scan"}
            </button>
          </div>

          {themed && !scanFetched && (
            <div style={{ background: "#FFF7E6", border: "1px solid #F5D78A", borderRadius: 11, padding: "10px 12px", marginBottom: 18, fontSize: 12, color: "#8A6D1E", lineHeight: 1.45 }}>
              We couldn&apos;t read that site directly — this is an AI best-guess from the address. Double-check the URL (try the full <b>https://…</b>) or upload your logo &amp; tweak below.
            </div>
          )}

          {/* identity */}
          <div style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 16 }}>
            <div
              style={{
                flex: "0 0 auto",
                width: 48,
                height: 48,
                borderRadius: 13,
                background: primary,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Pacifico',cursive",
                fontSize: 24,
              }}
            >
              {(brand.name || "B").charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <input
                value={brand.name}
                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                style={{ width: "100%", border: "none", background: "transparent", fontSize: 17, fontWeight: 700, outline: "none" }}
              />
              <input
                value={brand.tagline}
                onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
                style={{ width: "100%", border: "none", background: "transparent", fontSize: 12.5, color: "#8A8275", outline: "none" }}
              />
            </div>
          </div>

          {/* vibes */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
            {brand.vibes.map((v, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 27,
                  padding: "0 11px",
                  borderRadius: 8,
                  background: "#F4F1E9",
                  border: "1px solid #EBE5D7",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#5C554A",
                }}
              >
                {v}
              </span>
            ))}
          </div>

          {/* palette */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".16em", color: "#B0A892", textTransform: "uppercase", marginBottom: 12 }}>
            Palette
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {brand.palette.map((sw, i) => (
              <div key={i} style={{ flex: 1, minWidth: 0, textAlign: "center" }}>
                <label style={{ display: "block", position: "relative", height: 56, borderRadius: 12, cursor: "pointer", border: "1px solid rgba(0,0,0,.08)", background: sw.hex }}>
                  <input
                    type="color"
                    value={sw.hex}
                    onChange={(e) => {
                      const palette = brand.palette.slice();
                      palette[i] = { ...palette[i], hex: e.target.value };
                      setBrand({ ...brand, palette });
                    }}
                    style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }}
                  />
                </label>
                <div style={{ marginTop: 7, fontSize: 9.5, fontWeight: 700, letterSpacing: ".08em", color: "#9A9182" }}>{sw.name}</div>
              </div>
            ))}
          </div>

          {/* fonts */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".16em", color: "#B0A892", textTransform: "uppercase", marginBottom: 10 }}>
            Typefaces
          </div>
          <div style={{ border: "1px solid #ECE7DC", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#B0A892" }}>DISPLAY · {brand.fonts.display}</div>
            <div style={{ fontFamily: `'${brand.fonts.display}',serif`, fontSize: 26 }}>{brand.name}</div>
          </div>
          <div style={{ border: "1px solid #ECE7DC", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#B0A892" }}>BODY · {brand.fonts.body}</div>
            <div style={{ fontFamily: `'${brand.fonts.body}',sans-serif`, fontSize: 14, color: "#4B4660" }}>
              {brand.tagline || "On-brand body copy preview."}
            </div>
          </div>

          {/* brand assets — real logo + images pulled from the site, plus customer uploads */}
          <div style={{ marginTop: 18, fontSize: 11, fontWeight: 700, letterSpacing: ".16em", color: eyebrow, textTransform: "uppercase", marginBottom: 10 }}>
            Brand assets
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 12, border: "1px solid #ECE7DC", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
              {logoUrl ? (
                <img
                  src={proxied(logoUrl)}
                  alt="brand logo"
                  onError={() => {
                    const ddg = brand.url ? `https://icons.duckduckgo.com/ip3/${brand.url}.ico` : "";
                    setLogoUrl((cur) => (ddg && cur !== ddg && !cur.startsWith("data:") ? ddg : ""));
                  }}
                  style={{ maxWidth: "82%", maxHeight: "82%", objectFit: "contain" }}
                />
              ) : (
                <ImageIcon size={22} color="#C9C1AE" />
              )}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#3B362E" }}>Logo</div>
              <div style={{ fontSize: 11, color: "#8A8275", lineHeight: 1.35, marginBottom: 6 }}>{logoUrl ? "Overlaid on every ad you generate." : "Not found — upload one for branded ads."}</div>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, color: primary, cursor: "pointer" }}>
                <Upload size={12} /> {logoUrl ? "Replace" : "Upload logo"}
                <input type="file" accept="image/*" onChange={onUploadLogo} style={{ display: "none" }} />
              </label>
            </div>
          </div>
          {brandImages.length > 0 && (
            <div style={{ fontSize: 11, color: "#8A8275", marginBottom: 6 }}>Wrong logo? Click the right asset to use it:</div>
          )}
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {brandImages.slice(0, 8).map((src, i) => (
              <button
                key={i}
                onClick={() => setLogoUrl(src)}
                title="Use this as the logo"
                style={{ width: 46, height: 46, borderRadius: 8, overflow: "hidden", border: logoUrl === src ? `2.5px solid ${primary}` : "1px solid #ECE7DC", background: "#fff", padding: 0, cursor: "pointer" }}
              >
                <img src={proxied(src)} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </button>
            ))}
            <label title="Add your own images" style={{ width: 46, height: 46, borderRadius: 8, border: "1.5px dashed #D8D0BE", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#A79E8A" }}>
              <Upload size={16} />
              <input type="file" accept="image/*" multiple onChange={onUploadImages} style={{ display: "none" }} />
            </label>
          </div>

          {/* brand book hand-off — carries the scanned URL so there's no re-scan */}
          <a
            href={`/tools/jdesigns-studio/brand-book?url=${encodeURIComponent(brandUrl)}`}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16, height: 46, borderRadius: 12, border: `1.5px solid ${primary}`, background: `${primary}0d`, color: primary, fontSize: 14, fontWeight: 800, textDecoration: "none" }}
          >
            <BookOpen size={16} /> Open Brand Book →
          </a>
          <div style={{ fontSize: 11, color: "#A79E8A", marginTop: 8, textAlign: "center", lineHeight: 1.4 }}>Already built from your scan — opens ready, cover renders automatically, export as PDF.</div>
        </aside>

        {/* RIGHT: direction + ideas */}
        <main className="jd-main" style={{ minWidth: 0 }}>
          {/* direction */}
          <div style={{ background: "#fff", border: "1px solid #ECE7DC", borderRadius: 18, padding: 22, marginBottom: 22 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", color: eyebrow, textTransform: "uppercase", marginBottom: 12 }}>
              02 — Direction
            </div>
            <textarea
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              placeholder={`e.g. Summer launch — light, joyful, get people sharing with someone they love.`}
              rows={2}
              style={{ width: "100%", border: "1px solid #E4DECF", borderRadius: 12, padding: "12px 14px", fontSize: 16, fontFamily: "'Newsreader',Georgia,serif", resize: "none", outline: "none", marginBottom: 16 }}
            />
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#8A8275", fontWeight: 600, marginBottom: 8 }}>Format</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {Object.entries(FORMATS).map(([key, f]) => (
                  <button key={key} onClick={() => setFormat(key)} style={{ padding: "7px 14px", borderRadius: 10, border: format === key ? `2px solid ${primary}` : "1px solid #E4DECF", background: format === key ? `${primary}12` : "#FBFAF6", cursor: "pointer", color: "#3B362E", display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.15, gap: 1 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700 }}>{f.label}</span>
                    <span style={{ fontSize: 9.5, color: "#9A9182", fontWeight: 600 }}>{f.sub}</span>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#8A8275", fontWeight: 600, marginBottom: 8 }}>Style</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {STYLE_PRESETS.map((s) => (
                  <button key={s.key} onClick={() => setStyleKey(s.key)} title={s.key === "auto" ? "Render in the brand's natural medium" : s.modifier} style={{ padding: "7px 12px", borderRadius: 10, border: styleKey === s.key ? `2px solid ${primary}` : "1px solid #E4DECF", background: styleKey === s.key ? `${primary}12` : "#FBFAF6", cursor: "pointer", color: "#3B362E", fontSize: 12.5, fontWeight: 700 }}>
                    {s.label}
                  </button>
                ))}
              </div>
              {styleKey !== "auto" && (
                <div style={{ fontSize: 11, color: "#A79E8A", marginTop: 7 }}>Overriding the brand&apos;s natural look — every ad will render in this style.</div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13, color: "#8A8275", fontWeight: 600 }}>Posts</span>
                <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid #E4DECF", borderRadius: 10, overflow: "hidden" }}>
                  <button onClick={() => setIdeaCount((c) => Math.max(1, c - 1))} style={{ width: 38, height: 38, border: "none", background: "#FBFAF6", fontSize: 18, cursor: "pointer", color: "#6B6456" }}>−</button>
                  <span style={{ width: 40, textAlign: "center", fontWeight: 700 }}>{ideaCount}</span>
                  <button onClick={() => setIdeaCount((c) => Math.min(6, c + 1))} style={{ width: 38, height: 38, border: "none", background: "#FBFAF6", fontSize: 18, cursor: "pointer", color: "#6B6456" }}>+</button>
                </div>
              </div>
              <button
                onClick={onGenerateConcepts}
                disabled={loadingConcepts || generating}
                style={{
                  height: 46,
                  padding: "0 22px",
                  border: "none",
                  borderRadius: 12,
                  background: primary,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: loadingConcepts || generating ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  boxShadow: `0 6px 18px -6px ${primary}`,
                }}
              >
                {loadingConcepts ? <Loader2 size={17} className="jd-spin" /> : <Sparkles size={17} />}
                {loadingConcepts ? "Pitching campaigns…" : concepts.length ? "Re-pitch campaigns" : "Pitch 3 campaigns"}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: "#FFF1F0", border: "1px solid #FFD6D2", color: "#B4322B", borderRadius: 12, padding: "12px 16px", marginBottom: 18, fontSize: 14 }}>
              {error}
            </div>
          )}

          {/* empty state */}
          {concepts.length === 0 && !loadingConcepts && !campaign && (
            <div style={{ textAlign: "center", color: "#A79E8A", padding: "60px 20px", border: "1.5px dashed #E2DBCB", borderRadius: 18, background: "#fff" }}>
              <LayoutGrid size={34} style={{ opacity: 0.5 }} />
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 600 }}>Scan a brand, set a direction, and pitch 3 campaign concepts — then pick one to build out.</div>
            </div>
          )}

          {/* campaign gallery — all 3 stay here; build any on demand, switch freely without losing work */}
          {concepts.length > 0 && (
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", color: eyebrow, textTransform: "uppercase", marginBottom: 6 }}>
                03 — Your campaigns
              </div>
              <div style={{ fontSize: 13, color: "#8A8275", marginBottom: 14 }}>Three distinct campaigns from your brand. Build each into its own post series — switch between them any time.</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginBottom: 24 }}>
                {concepts.map((c, i) => {
                  const isActive = campaign?.name === c.name;
                  const builtCount = isActive ? ideas.length : (builtByCampaign[c.name]?.length || 0);
                  const isBuilt = builtCount > 0;
                  const isBuilding = generating && isActive && ideas.length === 0;
                  const baseBorder = isActive ? primary : "#ECE7DC";
                  return (
                    <button
                      key={i}
                      onClick={() => onPickConcept(c)}
                      disabled={generating}
                      style={{ textAlign: "left", background: isActive ? `${primary}0a` : "#fff", border: `1.5px solid ${baseBorder}`, borderRadius: 18, padding: 20, cursor: generating ? "default" : "pointer", display: "flex", flexDirection: "column", gap: 10, transition: "border-color .15s, box-shadow .15s", boxShadow: isActive ? `0 10px 26px -14px ${primary}` : "none" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.boxShadow = `0 10px 26px -14px ${primary}`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = baseBorder; e.currentTarget.style.boxShadow = isActive ? `0 10px 26px -14px ${primary}` : "none"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: primary, background: `${primary}1a`, padding: "3px 8px", borderRadius: 6 }}>Campaign {i + 1}</span>
                        {isBuilt && <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", color: "#1B8a5a", background: "#1B8a5a1a", padding: "3px 8px", borderRadius: 6 }}>✓ {builtCount} post{builtCount === 1 ? "" : "s"}</span>}
                      </div>
                      <div style={{ fontSize: 21, fontWeight: 800, fontFamily: "'Newsreader',Georgia,serif", lineHeight: 1.1 }}>{c.name}</div>
                      <div style={{ fontSize: 14, color: "#5C554A", fontStyle: "italic" }}>{c.angle}</div>
                      <div style={{ fontSize: 13, color: "#8A8275", lineHeight: 1.5 }}>{c.bigIdea}</div>
                      <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#8A8275" }}>
                        <span><strong style={{ color: "#5C554A" }}>Goal:</strong> {c.goal}</span>
                        <span><strong style={{ color: "#5C554A" }}>Audience:</strong> {c.audience}</span>
                      </div>
                      <span style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 7, height: 40, padding: "0 16px", borderRadius: 10, background: isActive ? "#fff" : primary, color: isActive ? primary : "#fff", border: isActive ? `1.5px solid ${primary}` : "none", fontSize: 13.5, fontWeight: 800, alignSelf: "flex-start", boxShadow: isActive ? "none" : `0 8px 20px -8px ${primary}` }}>
                        {isBuilding ? <Loader2 size={15} className="jd-spin" /> : isActive ? <CheckCircle2 size={15} /> : <Sparkles size={15} />}
                        {isActive ? "Viewing" : isBuilt ? "View campaign" : "Build this campaign"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* chosen campaign header */}
          {campaign && (
            <div style={{ background: `linear-gradient(135deg, ${primary}, ${ink})`, borderRadius: 18, padding: "22px 24px", marginBottom: 20, color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 320px", minWidth: 0 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.7, marginBottom: 6 }}>Your campaign</div>
                  <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Newsreader',Georgia,serif", lineHeight: 1.05 }}>{campaign.name}</div>
                  <div style={{ fontSize: 14.5, opacity: 0.92, fontStyle: "italic", marginTop: 6 }}>{campaign.angle}</div>
                  <div style={{ fontSize: 13, opacity: 0.85, marginTop: 8, display: "flex", gap: 18, flexWrap: "wrap" }}>
                    <span><strong>Goal:</strong> {campaign.goal}</span>
                    <span><strong>Audience:</strong> {campaign.audience}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (campaign && ideas.length) setBuiltByCampaign((prev) => ({ ...prev, [campaign.name]: ideas }));
                    setCampaign(null);
                    setIdeas([]);
                    setPreview(null);
                  }}
                  disabled={generating}
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 40, padding: "0 16px", borderRadius: 10, background: "rgba(255,255,255,.16)", border: "1px solid rgba(255,255,255,.3)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: generating ? "default" : "pointer", whiteSpace: "nowrap" }}
                >
                  ← All campaigns
                </button>
              </div>
            </div>
          )}

          {campaign && generating && ideas.length === 0 && (
            <div style={{ textAlign: "center", color: "#A79E8A", padding: "48px 20px", border: "1.5px dashed #E2DBCB", borderRadius: 18, background: "#fff", marginBottom: 20 }}>
              <Loader2 size={28} className="jd-spin" style={{ opacity: 0.7 }} />
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 600 }}>Building “{campaign.name}” — writing your post series…</div>
            </div>
          )}

          {ideas.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", background: "linear-gradient(135deg,#FFFBF0,#FFF4E0)", border: `1px solid ${accent}66`, borderRadius: 16, padding: "18px 22px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CalendarClock size={23} color="#fff" /></div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16.5, fontFamily: "'Newsreader',Georgia,serif" }}>Ready to post? Schedule your carousels</div>
                  <div style={{ fontSize: 13, color: "#8A8275", marginTop: 2 }}>Download your covers, then auto-schedule them to every platform in Postly — pick your times and you&apos;re done.</div>
                </div>
              </div>
              <a href={POSTLY_LINK} target="_blank" rel="noopener noreferrer sponsored" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px", borderRadius: 12, background: primary, color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: `0 10px 24px -8px ${primary}`, whiteSpace: "nowrap" }}>Schedule it in Postly <ArrowRight size={18} /></a>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {ideas.map((idea, idx) => {
              const hook = idea.slides?.[0];
              return (
                <div key={idx} style={{ background: "#fff", border: "1px solid #ECE7DC", borderRadius: 18, padding: 20, display: "flex", gap: 22, flexWrap: "wrap" }}>
                  {/* left: caption */}
                  <div style={{ flex: "1 1 340px", minWidth: 280 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: primary, background: `${primary}1a`, padding: "3px 8px", borderRadius: 6 }}>
                        {idea.kind}
                      </span>
                      <span style={{ fontSize: 17, fontWeight: 800, fontFamily: "'Newsreader',Georgia,serif" }}>{idea.title}</span>
                    </div>
                    <div style={{ fontSize: 13.5, color: "#8A8275", marginBottom: 12 }}>{idea.blurb}</div>
                    {hook?.headline && (
                      <div style={{ marginBottom: 14, padding: "10px 13px", borderRadius: 11, background: `${primary}0d`, border: `1px solid ${primary}22` }}>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", color: "#B0A892", textTransform: "uppercase", marginBottom: 3 }}>Hook on the ad</div>
                        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Newsreader',Georgia,serif", color: "#221F1A" }}>{hook.headline}</div>
                      </div>
                    )}
                    <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", color: "#B0A892", textTransform: "uppercase" }}>Caption</label>
                    <textarea
                      value={idea.caption}
                      onChange={(e) => updateCaption(idx, e.target.value)}
                      rows={6}
                      style={{ width: "100%", border: "1px solid #EFEADF", borderRadius: 12, padding: "12px 14px", fontSize: 13.5, lineHeight: 1.5, background: "#FCFBF7", resize: "vertical", outline: "none" }}
                    />
                    <div style={{ marginTop: 12 }}>
                      <a href={POSTLY_LINK} target="_blank" rel="noopener noreferrer sponsored" style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 38, padding: "0 14px", borderRadius: 9, border: `1px solid ${primary}`, color: primary, fontSize: 13, fontWeight: 700, textDecoration: "none", background: `${primary}0d` }}>
                        <CalendarClock size={14} /> Schedule in Postly
                      </a>
                    </div>
                  </div>

                  {/* right: carousel deck — hover to fan, click to preview */}
                  <div style={{ flex: "0 0 250px" }}>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".14em", color: "#B0A892", textTransform: "uppercase", marginBottom: 10 }}>Carousel · hover to fan, click to preview</div>
                    <div
                      className="jd-deck"
                      onClick={() => setPreview(idx)}
                      title="Hover to fan · click to preview all slides"
                      style={{ position: "relative", width: 226, height: 250, cursor: "pointer", margin: "0 auto" }}
                    >
                      {(() => {
                        const imgList = idea.images ?? [];
                        const imgs = imgList.length
                          ? [idea.imageUrl || imgList[0], ...imgList.filter((u) => u !== (idea.imageUrl || imgList[0]))]
                          : [];
                        if (imgs.length) {
                          return (
                            <>
                              {[2, 1].map((slot) => {
                                const url = imgs[slot];
                                if (!url) return null;
                                const off = slot === 2 ? { left: 36, bottom: 22 } : { left: 18, bottom: 11 };
                                return (
                                  <div key={slot} className={slot === 2 ? "jd-cardb2" : "jd-cardb1"} style={{ position: "absolute", ...off, width: 176, height: 220, borderRadius: 13, overflow: "hidden", boxShadow: "0 8px 20px -10px rgba(0,0,0,.45)", background: "#000" }}>
                                    <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                  </div>
                                );
                              })}
                              <div className="jd-cardf" style={{ position: "absolute", left: 0, bottom: 0, width: 182, height: 228, borderRadius: 13, overflow: "hidden", boxShadow: "0 16px 34px -12px rgba(0,0,0,.55)", background: "#000" }}>
                                {idea.videoUrl ? (
                                  <video src={idea.videoUrl} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : (
                                  <img src={imgs[0]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                                )}
                                <AdOverlays idea={idea} idx={idx} w={182} />
                              </div>
                            </>
                          );
                        }
                        return (
                          <>
                            {[2, 1].map((slot) => {
                              const sl = idea.slides?.[slot];
                              if (!sl) return null;
                              const v = slideViz(slot, idea.slides?.length || 5);
                              const off = slot === 2 ? { left: 36, bottom: 22 } : { left: 18, bottom: 11 };
                              return (
                                <div key={slot} className={slot === 2 ? "jd-cardb2" : "jd-cardb1"} style={{ position: "absolute", ...off, width: 176, height: 220, borderRadius: 13, overflow: "hidden", boxShadow: "0 8px 20px -10px rgba(0,0,0,.45)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "14px 13px", background: v.bg, color: v.fg }}>
                                  <span style={{ alignSelf: "flex-start", fontSize: 7, fontWeight: 800, letterSpacing: ".1em", padding: "2px 5px", borderRadius: 4, background: "rgba(0,0,0,.26)", color: "#fff" }}>{v.role}</span>
                                  <div>
                                    <div style={{ fontFamily: `'${brand.fonts.display}',serif`, fontWeight: 700, fontSize: 16, lineHeight: 1.05 }}>{sl.headline}</div>
                                    <div style={{ marginTop: 8, height: 2, width: 22, background: v.rule, borderRadius: 2 }} />
                                  </div>
                                </div>
                              );
                            })}
                            <div className="jd-cardf" style={{ position: "absolute", left: 0, bottom: 0, width: 182, height: 228, borderRadius: 13, overflow: "hidden", boxShadow: "0 16px 34px -12px rgba(0,0,0,.55)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px 15px", background: primary, color: "#fff" }}>
                              <span style={{ alignSelf: "flex-start", fontSize: 7, fontWeight: 800, letterSpacing: ".1em", padding: "2px 6px", borderRadius: 4, background: "rgba(0,0,0,.28)", color: "#fff" }}>HOOK</span>
                              <div>
                                <div style={{ fontFamily: `'${brand.fonts.display}',serif`, fontWeight: 700, fontSize: 22, lineHeight: 1.04 }}>{hook?.headline || idea.title}</div>
                                <div style={{ marginTop: 9, height: 2.5, width: 28, background: accent, borderRadius: 2 }} />
                                <div style={{ marginTop: 8, fontSize: 8.5, opacity: 0.85 }}>{brand.name} · {idea.slides?.length || 5} slides</div>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                      <div style={{ position: "absolute", top: -3, right: -3, width: 30, height: 30, borderRadius: 9, background: "#fff", border: "1px solid #E4DECF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px -3px rgba(0,0,0,.3)", zIndex: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C554A" strokeWidth="2"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 16 }}>
                      {Array.from({ length: idea.images?.length || idea.slides?.length || 5 }).map((_, i) => (
                        <span key={i} style={{ width: 6, height: 6, borderRadius: 3, background: i === 0 ? primary : "#D9D2C4" }} />
                      ))}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onGenImage(idx); }}
                      disabled={idea.imageLoading}
                      style={{ width: 226, margin: "14px auto 0", height: 46, border: "none", borderRadius: 11, background: primary, color: "#fff", fontSize: 14, fontWeight: 800, cursor: idea.imageLoading ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 8px 20px -8px ${primary}` }}
                    >
                      {idea.imageLoading ? <Loader2 size={15} className="jd-spin" /> : idea.images?.length ? <RefreshCw size={15} /> : <Wand2 size={15} />}
                      {idea.imageLoading ? "Rendering 3…" : idea.images?.length ? "Regenerate (3)" : "Generate AI images"}
                    </button>
                    {idea.imageError && !idea.imageLoading && (
                      <div style={{ width: 226, margin: "10px auto 0", background: "#FFF1F0", border: "1px solid #FFD6D2", color: "#B4322B", borderRadius: 9, padding: "8px 10px", fontSize: 12, lineHeight: 1.4, textAlign: "center" }}>
                        {idea.imageError} <span style={{ fontWeight: 700 }}>Tap to retry.</span>
                      </div>
                    )}
                    {idea.images && idea.images.length > 0 && (
                      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
                        {idea.images.map((url, k) => (
                          <button
                            key={k}
                            onClick={(e) => { e.stopPropagation(); selectImage(idx, url); }}
                            title={`Use variant ${k + 1}`}
                            style={{ width: 54, height: 68, borderRadius: 9, overflow: "hidden", padding: 0, cursor: "pointer", background: "#000", border: idea.imageUrl === url ? `2.5px solid ${primary}` : "2px solid #E4DECF", boxShadow: "0 4px 12px -6px rgba(0,0,0,.4)" }}
                          >
                            <img src={url} alt={`Variant ${k + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          </button>
                        ))}
                      </div>
                    )}
                    {idea.images && idea.images.length > 0 && (
                      <div style={{ width: 226, margin: "12px auto 0" }}>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", color: "#B0A892", textTransform: "uppercase", marginBottom: 6, textAlign: "center" }}>Download</div>
                        <div style={{ display: "flex", gap: 6 }}>
                          {([["HD", 1], ["2K", 2], ["4K", 4]] as const).map(([lab, s]) => (
                            <button
                              key={lab}
                              onClick={(e) => { e.stopPropagation(); downloadCover(idx, s); }}
                              title={`${FORMATS[format].w * s} × ${FORMATS[format].h * s}px`}
                              style={{ flex: 1, height: 38, borderRadius: 9, border: "none", background: primary, color: "#fff", cursor: "pointer", fontSize: 12.5, fontWeight: 800, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1.1 }}
                            >
                              {lab}
                              <span style={{ fontSize: 8, opacity: 0.82, fontWeight: 600 }}>{FORMATS[format].w * s}px</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 12, color: "#A79E8A", marginTop: 22 }}>
            Ads by fal.ai · Campaigns &amp; captions by GPT-4o. Each post renders as a complete, designed ad — headline, sub-line, wordmark and CTA, on-brand.
          </p>
        </main>
      </div>

      {/* SAVED ADS LIBRARY */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "8px 20px 44px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Bookmark size={21} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 24, fontWeight: 800, lineHeight: 1.1 }}>Saved ads <span style={{ color: "#A79E8A", fontWeight: 600 }}>· {saved.length}</span></h2>
              <div style={{ fontSize: 13, color: "#8A8275", marginTop: 2 }}>Every ad you generate is kept here on this device — reload-safe. Click any ad to preview, download or remove.</div>
            </div>
          </div>
          {saved.length === 0 ? (
            <div style={{ textAlign: "center", color: "#A79E8A", padding: "48px 20px", border: "1.5px dashed #E2DBCB", borderRadius: 16, background: "#fff" }}>
              <Bookmark size={28} style={{ opacity: 0.5 }} />
              <div style={{ marginTop: 10, fontSize: 14.5, fontWeight: 600 }}>No saved ads yet. Generate an ad above and it lands here automatically — and stays after you reload.</div>
            </div>
          ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 14 }}>
            {saved.map((item) => (
              <button
                key={item.id}
                onClick={() => setSavedView(item)}
                title="Click to preview"
                className="jd-saved-card"
                style={{ textAlign: "left", padding: 0, background: "#fff", border: "1px solid #ECE7DC", borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", cursor: "pointer", transition: "border-color .15s, box-shadow .15s, transform .15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.boxShadow = `0 12px 28px -16px ${primary}`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ECE7DC"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ position: "relative", aspectRatio: "4 / 5", background: "#000" }}>
                  <img src={item.url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "9px 11px", minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, fontFamily: "'Newsreader',Georgia,serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title || "Ad"}</div>
                  {item.campaign && <div style={{ fontSize: 11, color: "#8A8275", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.campaign}</div>}
                </div>
              </button>
            ))}
          </div>
          )}
        </section>

      {/* saved-ad lightbox */}
      {savedView && (
        <div onClick={() => setSavedView(null)} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(28,24,19,.62)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "jdfade .2s ease both" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", background: "#fff", borderRadius: 18, width: "min(560px,96vw)", maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 30px 80px -20px rgba(0,0,0,.6)" }}>
            <button onClick={() => setSavedView(null)} aria-label="Close preview" style={{ position: "absolute", top: 14, right: 14, zIndex: 8, width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,.4)", background: "rgba(0,0,0,.5)", color: "#fff", cursor: "pointer", fontSize: 19, lineHeight: 1 }}>×</button>
            <div style={{ background: "#000", display: "flex", alignItems: "center", justifyContent: "center", maxHeight: "64vh", overflow: "hidden" }}>
              <img src={savedView.url} alt={savedView.title} style={{ maxWidth: "100%", maxHeight: "64vh", objectFit: "contain", display: "block" }} />
            </div>
            <div style={{ padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 17, fontWeight: 800, fontFamily: "'Newsreader',Georgia,serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{savedView.title || "Ad"}</div>
                <div style={{ fontSize: 12.5, color: "#8A8275", marginTop: 2 }}>{savedView.campaign ? `${savedView.campaign} · ` : ""}{savedView.brand}</div>
              </div>
              <div style={{ display: "flex", gap: 9, flexShrink: 0 }}>
                <button
                  onClick={() => { const id = savedView.id; removeSaved(id); setSavedView(null); }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 42, padding: "0 16px", borderRadius: 10, border: "1px solid #E4DECF", background: "#FBFAF6", color: "#B4322B", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}
                >
                  <Trash2 size={15} /> Delete
                </button>
                <button
                  onClick={() => downloadSaved(savedView)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 42, padding: "0 20px", borderRadius: 10, border: "none", background: primary, color: "#fff", fontSize: 13.5, fontWeight: 800, cursor: "pointer", boxShadow: `0 8px 20px -8px ${primary}` }}
                >
                  <Download size={15} /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAYWALL MODAL — shown when free trial runs out or cap is hit */}
      {showPaywall && (
        <div onClick={() => setShowPaywall(false)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(28,24,19,.55)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "jdfade .2s ease both" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, maxWidth: 460, width: "100%", padding: "36px 28px", boxShadow: "0 30px 80px -20px rgba(0,0,0,.6)", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>
              {paywallReason === "trial" ? "🎨" : "📊"}
            </div>
            <h3 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 24, fontWeight: 700, margin: "0 0 8px", color: "#221F1A" }}>
              {paywallReason === "trial" ? "Free trial used" : "Monthly cap reached"}
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: "#5C554A", margin: "0 0 20px" }}>
              {paywallReason === "trial"
                ? "You've used all 5 free generations. Subscribe to keep creating unlimited on-brand ads."
                : "You've hit your plan's monthly usage limit. Upgrade or wait for next billing period."}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href={loggedIn ? "https://whop.com/checkout/plan_E7y48vqdXAWO9" : WHOP_AUTH_URL}
                style={{ display: "block", padding: "14px 0", borderRadius: 12, border: "none", background: "#6c5ce7", color: "#fff", fontSize: 15, fontWeight: 800, textDecoration: "none", cursor: "pointer" }}
              >
                {loggedIn ? "Upgrade to Studio Pass — $29/mo" : "Log in with Whop to continue"}
              </a>
              <button
                onClick={() => setShowPaywall(false)}
                style={{ padding: "10px 0", borderRadius: 12, border: "1.5px solid #E4DECF", background: "#FBFAF6", color: "#5C554A", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                Maybe later
              </button>
            </div>
            {paywallReason === "trial" && !loggedIn && (
              <div style={{ marginTop: 16, fontSize: 12.5, color: "#A79E8A", lineHeight: 1.45 }}>
                No credit card needed to try. Plans start at $29/mo.
              </div>
            )}
          </div>
        </div>
      )}

      {/* WHY IT'S DIFFERENT — the wedge, stated plainly */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 20px 8px" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 28px" }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".18em", color: primary, textTransform: "uppercase", marginBottom: 10 }}>Why it&apos;s different</div>
          <h2 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 32, fontWeight: 800, lineHeight: 1.12, color: ink }}>Every other AI tool ignores the one thing that matters: your brand.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
          {[
            ["🎯", "Not templates — your real brand", "It scans your site and pulls your actual logo, colours, fonts and voice. The ads look like you — not a stock template with your name slapped on."],
            ["📅", "Full campaigns, not one-off images", "Three campaign concepts, each built into a finished post series — a whole month of content, not a single graphic you still have to figure out."],
            ["🚀", `Finished & scheduled, not "here's a draft"`, "Real logo placed, editable text, HD-to-4K downloads, and one-click scheduling to every platform. It's done — not homework."],
          ].map(([e, t, d]) => (
            <div key={t} style={{ background: "#fff", border: "1px solid #ECE7DC", borderRadius: 16, padding: "22px 22px" }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{e}</div>
              <div style={{ fontSize: 17, fontWeight: 800, fontFamily: "'Newsreader',Georgia,serif", marginBottom: 7, color: ink }}>{t}</div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: "#5C554A" }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 22, fontSize: 13.5, fontWeight: 600, color: "#6B6456" }}>
          No card to start · 5 free ads · works for any website · your images stay private on your device
        </div>
      </section>

      {/* PRICING — adopts the scanned brand's colours in-session */}
      <div id="ds-pricing" style={{ scrollMarginTop: 20 }}>
        <Pricing primary={primary} ink={ink} accent={accent} />
      </div>

      {/* AFFILIATE — recruit affiliates via Whop (own storefront enrol link) */}
      <section style={{ maxWidth: 880, margin: "0 auto", padding: "8px 20px 36px" }}>
        <div style={{ background: "linear-gradient(135deg,#f3f1ff,#efe9ff)", border: "1px solid #e2dbff", borderRadius: 20, padding: "28px 30px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6D5EF5", marginBottom: 8 }}>Affiliate program</div>
            <h2 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Love it? Get paid to share it.</h2>
            <p style={{ color: "#5C554A", fontSize: 15, lineHeight: 1.55 }}>Earn <strong>40% on every Done-For-You sale</strong> — that&apos;s <strong>$400 each</strong> — plus <strong>20% recurring</strong> on every Studio Pass subscriber you refer. Free to join, paid out through Whop.</p>
          </div>
          <a href="https://whop.com/toolstack-design-studio" target="_blank" rel="noopener noreferrer" style={{ background: "#6D5EF5", color: "#fff", fontWeight: 800, fontSize: 16, textDecoration: "none", padding: "14px 26px", borderRadius: 14, whiteSpace: "nowrap", boxShadow: "0 10px 28px rgba(109,94,245,.35)" }}>Become an affiliate →</a>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 880, margin: "0 auto", padding: "10px 20px 40px" }}>
        <h2 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 28, marginBottom: 18 }}>Frequently asked questions</h2>
        {FAQS.map((f, i) => (
          <details key={i} style={{ borderBottom: "1px solid #ECE7DC", padding: "14px 0" }}>
            <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 15.5 }}>{f.q}</summary>
            <p style={{ marginTop: 8, color: "#5C554A", fontSize: 14.5, lineHeight: 1.55 }}>{f.a}</p>
          </details>
        ))}
      </section>

      {/* cross-links + cross-sell — bottom of page, never interrupts the funnel */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px 8px" }}>
        <MoreTools currentSlug="jdesigns-studio" />
        <AdvertiseGPTBanner />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />

      {/* full carousel preview */}
      {preview !== null && ideas[preview] && (
        <div onClick={() => setPreview(null)} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(28,24,19,.55)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "jdfade .2s ease both" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", background: "#EFECE3", borderRadius: 20, width: "min(1100px,96vw)", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 30px 80px -20px rgba(0,0,0,.6)" }}>
            <button onClick={() => setPreview(null)} aria-label="Close preview" style={{ position: "absolute", top: 16, right: 16, zIndex: 8, width: 38, height: 38, borderRadius: 10, border: "1px solid #E0D9CA", background: "#fff", color: "#8A8275", cursor: "pointer", fontSize: 20 }}>×</button>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 60px 18px 22px", borderBottom: "1px solid #E2DBCB" }}>
              <div style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 20, fontWeight: 700 }}>{ideas[preview].title}</div>
              <div style={{ fontSize: 12, color: "#8A8275", fontWeight: 600 }}>{ideas[preview].images?.length ? `${ideas[preview].images.length} images` : `${ideas[preview].slides?.length || 0} slides`} · {brand.name}</div>
            </div>
            {(() => {
              const pv = ideas[preview];
              const plist = pv.images ?? [];
              const pimgs = plist.length ? [pv.imageUrl || plist[0], ...plist.filter((u) => u !== (pv.imageUrl || plist[0]))] : [];
              if (pimgs.length) {
                const fmt = FORMATS[format];
                const box = fitBox(fmt.w, fmt.h, 440, 460);
                return (
                  <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
                    {/* canvas */}
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 26, background: "#E7E3D9", minWidth: 0 }}>
                      <div ref={canvasRef} onPointerMove={(e) => onCanvasMove(e, preview)} onPointerUp={endDrag} onPointerLeave={endDrag} style={{ position: "relative", width: box.cw, height: box.ch, borderRadius: 14, overflow: "hidden", boxShadow: "0 24px 50px -18px rgba(0,0,0,.55)", background: "#000", touchAction: "none" }}>
                        {pv.videoUrl ? (
                          <video src={pv.videoUrl} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <img src={pv.imageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                        <AdOverlays idea={pv} idx={preview} w={box.cw} editable={editing} logoDraggable={editing || pv.mode === "baked"} />
                      </div>
                    </div>
                    {/* controls */}
                    <div style={{ flex: "0 0 272px", borderLeft: "1px solid #E2DBCB", background: "#fff", padding: 18, overflowY: "auto", display: "flex", flexDirection: "column", gap: 15 }}>
                      <div>
                        <label style={ctlLabel}>Ad variant</label>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                          {pimgs.map((url, i) => (
                            <button key={i} onClick={() => selectImage(preview, url)} style={{ width: 50, height: 62, borderRadius: 8, overflow: "hidden", padding: 0, cursor: "pointer", background: "#000", border: pv.imageUrl === url ? `2.5px solid ${primary}` : "2px solid #E4DECF" }}>
                              <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {(() => {
                        const layers = layersOf(pv);
                        const tabs = [
                          ...layers.map((l) => ({ id: l.id, label: l.id === "headline" ? "Headline" : l.id === "sub" ? "Sub-line" : l.id === "cta" ? "Button" : l.id })),
                          ...(logoUrl ? [{ id: "logo", label: "Logo" }] : []),
                        ];
                        const sel = layers.find((l) => l.id === selLayer);
                        const fonts = Array.from(new Set([brand.fonts.display, brand.fonts.body, ...FONT_OPTIONS].filter(Boolean)));
                        const swatches = Array.from(new Set(["#ffffff", "#000000", ...brand.palette.map((p) => p.hex)]));
                        const miniLbl: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#8A8275", marginBottom: 4 };
                        const chk: React.CSSProperties = { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#3B362E" };
                        const swatchRow = (val: string, on: (c: string) => void) => (
                          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                            {swatches.map((c) => (
                              <button key={c} onClick={() => on(c)} style={{ width: 24, height: 24, borderRadius: 6, background: c, border: val.toLowerCase() === c.toLowerCase() ? `2.5px solid ${primary}` : "1px solid #ddd", cursor: "pointer", padding: 0 }} />
                            ))}
                            <input type="color" value={val} onChange={(e) => on(e.target.value)} style={{ width: 28, height: 26, border: "none", background: "none", cursor: "pointer", padding: 0 }} />
                          </div>
                        );
                        const lp = logoOf(pv);
                        const layered = pv.mode !== "baked";
                        const logoControlsJsx = (
                          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <div><div style={miniLbl}>Logo size</div><input type="range" min={6} max={45} step={1} value={lp.size} onChange={(e) => updateLogo(preview, { size: parseInt(e.target.value, 10) })} style={{ width: "100%", accentColor: primary }} /></div>
                            <label style={chk}><input type="checkbox" checked={lp.plate} onChange={(e) => updateLogo(preview, { plate: e.target.checked })} /> White background plate</label>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button onClick={removeLogoBg} title="Make the logo's solid background transparent" style={{ flex: 1, height: 34, borderRadius: 8, border: "1px solid #E4DECF", background: "#FBFAF6", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#3B362E" }}>Remove background</button>
                              <button onClick={() => updateLogo(preview, { x: DEFAULT_LOGO.x, y: DEFAULT_LOGO.y, size: DEFAULT_LOGO.size })} style={{ height: 34, padding: "0 12px", borderRadius: 8, border: "1px solid #E4DECF", background: "#FBFAF6", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#5C554A" }}>Reset</button>
                            </div>
                          </div>
                        );
                        const textControlsJsx = sel ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <textarea value={sel.text} onChange={(e) => updateLayer(preview, sel.id, { text: e.target.value })} rows={2} placeholder="Type your text…" style={{ width: "100%", border: `1.5px solid ${primary}55`, borderRadius: 9, padding: "8px 10px", fontSize: 14, fontFamily: `'${brand.fonts.display}',serif`, resize: "vertical", outline: "none" }} />
                            <div><div style={miniLbl}>Size — {sel.size.toFixed(1)}</div><input type="range" min={2} max={18} step={0.5} value={sel.size} onChange={(e) => updateLayer(preview, sel.id, { size: parseFloat(e.target.value) })} style={{ width: "100%", accentColor: primary }} /></div>
                            <div><div style={miniLbl}>Font</div>
                              <select value={sel.font} onChange={(e) => updateLayer(preview, sel.id, { font: e.target.value })} style={{ width: "100%", height: 34, border: "1px solid #E4DECF", borderRadius: 8, padding: "0 8px", fontSize: 12.5, background: "#FBFAF6", cursor: "pointer" }}>
                                {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
                              </select>
                            </div>
                            <div><div style={miniLbl}>Colour</div>{swatchRow(sel.color, (c) => updateLayer(preview, sel.id, { color: c }))}</div>
                            <div style={{ display: "flex", gap: 6 }}>
                              {(["left", "center", "right"] as const).map((a) => (
                                <button key={a} onClick={() => updateLayer(preview, sel.id, { align: a })} style={{ flex: 1, height: 32, borderRadius: 8, border: sel.align === a ? `2px solid ${primary}` : "1px solid #E4DECF", background: sel.align === a ? `${primary}14` : "#FBFAF6", cursor: "pointer", fontSize: 11.5, fontWeight: 700, textTransform: "capitalize" }}>{a}</button>
                              ))}
                            </div>
                            <div style={{ display: "flex", gap: 6 }}>
                              {([["Regular", 400], ["Bold", 700], ["Black", 800]] as const).map(([lab, wt]) => (
                                <button key={lab} onClick={() => updateLayer(preview, sel.id, { weight: wt })} style={{ flex: 1, height: 32, borderRadius: 8, border: sel.weight === wt ? `2px solid ${primary}` : "1px solid #E4DECF", background: sel.weight === wt ? `${primary}14` : "#FBFAF6", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>{lab}</button>
                              ))}
                            </div>
                            <label style={chk}><input type="checkbox" checked={sel.plate} onChange={(e) => updateLayer(preview, sel.id, { plate: e.target.checked })} /> Background behind text</label>
                            {(sel.plate || sel.kind === "button") && (
                              <div><div style={miniLbl}>Background colour</div>{swatchRow(sel.plateColor, (c) => updateLayer(preview, sel.id, { plateColor: c }))}</div>
                            )}
                          </div>
                        ) : null;
                        const outlineBtn: React.CSSProperties = { marginTop: 10, width: "100%", height: 40, borderRadius: 9, border: `1.5px solid ${primary}`, background: `${primary}0d`, color: primary, fontWeight: 800, fontSize: 12.5, cursor: pv.imageLoading ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 };
                        return (
                          <div style={{ borderTop: "1px solid #EFEADF", paddingTop: 13 }}>
                            {/* LAYERED · finished view (default) — looks done; editing is behind a button */}
                            {layered && !editing && (
                              <>
                                <label style={ctlLabel}>Your finished ad</label>
                                <div style={{ fontSize: 11, color: "#A79E8A", marginBottom: 12 }}>Done for you — text is crisp and always spelled right. Tweak anything, or try the painted version.</div>
                                <button onClick={() => setEditing(true)} style={{ width: "100%", height: 42, borderRadius: 9, border: "none", background: primary, color: "#fff", fontWeight: 800, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>✎ Edit text &amp; layout</button>
                                <button onClick={() => onGenImage(preview, "baked")} disabled={pv.imageLoading} style={outlineBtn}>
                                  {pv.imageLoading ? (<><Loader2 size={14} className="jd-spin" /> Re-rendering…</>) : "✦ Try AI-designed (baked) version"}
                                </button>
                              </>
                            )}

                            {/* LAYERED · editor (after Edit) */}
                            {layered && editing && (
                              <>
                                <label style={ctlLabel}>Edit · text &amp; layers</label>
                                <div style={{ fontSize: 11, color: "#A79E8A", marginBottom: 10 }}>Drag any element on the image. Pick one to edit:</div>
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                                  {tabs.map((t) => (
                                    <button key={t.id} onClick={() => setSelLayer(t.id)} style={{ padding: "6px 10px", borderRadius: 8, border: selLayer === t.id ? `2px solid ${primary}` : "1px solid #E4DECF", background: selLayer === t.id ? `${primary}12` : "#FBFAF6", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#3B362E" }}>{t.label}</button>
                                  ))}
                                </div>
                                {selLayer === "logo" && logoUrl ? logoControlsJsx : selLayer !== "logo" ? textControlsJsx : null}
                                <button onClick={() => setEditing(false)} style={{ marginTop: 14, width: "100%", height: 40, borderRadius: 9, border: "none", background: "#16131F", color: "#fff", fontWeight: 800, fontSize: 12.5, cursor: "pointer" }}>✓ Done editing</button>
                              </>
                            )}

                            {/* BAKED · AI-designed view */}
                            {!layered && (
                              <>
                                <label style={ctlLabel}>Logo &amp; customise</label>
                                <div style={{ fontSize: 11, color: "#A79E8A", marginBottom: 10 }}>This ad is AI-designed — done for you. Drag the logo, or switch to editable text to take full control.</div>
                                {logoUrl && logoControlsJsx}
                                <button onClick={() => { setEditing(true); onGenImage(preview, "editable"); }} disabled={pv.imageLoading} style={outlineBtn}>
                                  {pv.imageLoading ? (<><Loader2 size={14} className="jd-spin" /> Re-rendering…</>) : "✎ Customise text & layout"}
                                </button>
                                <div style={{ fontSize: 10.5, color: "#A79E8A", marginTop: 6, textAlign: "center", lineHeight: 1.4 }}>Re-renders text-free so you can move &amp; edit every word — spelling guaranteed.</div>
                              </>
                            )}
                          </div>
                        );
                      })()}
                      <div style={{ borderTop: "1px solid #EFEADF", paddingTop: 13 }}>
                        <label style={ctlLabel}>Animate <span style={{ color: accent, fontWeight: 800 }}>✨ Premium</span></label>
                        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                          {([5, 10] as const).map((s) => (
                            <button key={s} onClick={() => setIdeas((prev) => prev.map((x, i) => (i === preview ? { ...x, animSeconds: s } : x)))} disabled={pv.animating} style={{ flex: 1, height: 32, borderRadius: 8, border: (pv.animSeconds || 5) === s ? `2px solid ${primary}` : "1px solid #E4DECF", background: (pv.animSeconds || 5) === s ? `${primary}14` : "#FBFAF6", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#3B362E" }}>{s} sec</button>
                          ))}
                        </div>
                        <button onClick={() => animate(preview)} disabled={pv.animating} style={{ width: "100%", height: 42, borderRadius: 9, border: "none", background: pv.animating ? "#B7AE9A" : "#16131F", color: "#fff", cursor: pv.animating ? "default" : "pointer", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                          {pv.animating ? (<><Loader2 size={15} className="jd-spin" /> Animating… (~1 min)</>) : pv.videoUrl ? (<><RefreshCw size={15} /> Re-animate</>) : (<><Sparkles size={15} /> Animate this image</>)}
                        </button>
                        {pv.animError && !pv.animating && (
                          <div style={{ marginTop: 8, background: "#FFF1F0", border: "1px solid #FFD6D2", color: "#B4322B", borderRadius: 8, padding: "7px 9px", fontSize: 11.5, lineHeight: 1.4, textAlign: "center" }}>{pv.animError}</div>
                        )}
                        {pv.videoUrl && (
                          <a href={"/api/jdesigns-studio/proxy?url=" + encodeURIComponent(pv.videoUrl)} download={`${(brand.name || "cover").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-animated.mp4`} style={{ display: "block", textAlign: "center", marginTop: 8, fontSize: 12.5, fontWeight: 700, color: primary, textDecoration: "none" }}>↓ Download video (MP4)</a>
                        )}
                      </div>
                      <div style={{ borderTop: "1px solid #EFEADF", paddingTop: 13 }}>
                        <label style={ctlLabel}>Download PNG</label>
                        <div style={{ display: "flex", gap: 6 }}>
                          {([["HD", 1], ["2K", 2], ["4K", 4]] as const).map(([lab, s]) => (
                            <button key={lab} onClick={() => downloadCover(preview, s)} title={`${FORMATS[format].w * s} × ${FORMATS[format].h * s}px`} style={{ flex: 1, height: 42, borderRadius: 9, border: "none", background: primary, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 800, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1.1 }}>
                              {lab}
                              <span style={{ fontSize: 8.5, opacity: 0.82, fontWeight: 600 }}>{FORMATS[format].w * s}px</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: "#A79E8A", lineHeight: 1.4 }}>Your campaign ad, designed by AI. Pick a variant, animate it, or download.</div>
                    </div>
                  </div>
                );
              }
              return (
                <>
                  <div style={{ flex: 1, minHeight: 0, overflowX: "auto", display: "flex", alignItems: "center", padding: "36px 40px" }}>
                    <div style={{ display: "flex", gap: 22, margin: "auto" }}>
                      {(pv.slides || []).map((sl, i) => {
                        const v = slideViz(i, pv.slides?.length || 1);
                        return (
                          <div key={i} style={{ position: "relative", flex: "0 0 auto", width: 236, height: 295, borderRadius: 15, overflow: "hidden", boxShadow: "0 20px 44px -16px rgba(0,0,0,.5)", background: v.bg, color: v.fg, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "22px 20px" }}>
                            <span style={{ alignSelf: "flex-start", fontSize: 8, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", padding: "3px 7px", borderRadius: 5, background: "rgba(0,0,0,.24)", color: "#fff" }}>{v.role}</span>
                            <div>
                              <div style={{ fontFamily: `'${brand.fonts.display}',serif`, fontWeight: 700, fontSize: 27, lineHeight: 1.05, whiteSpace: "pre-line" }}>{sl.headline}</div>
                              <div style={{ marginTop: 10, height: 3, width: 30, background: v.rule, borderRadius: 3 }} />
                              {sl.sub && <div style={{ marginTop: 10, fontFamily: `'${brand.fonts.body}',sans-serif`, fontSize: 12.5, lineHeight: 1.45, opacity: 0.92 }}>{sl.sub}</div>}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                              <span style={{ fontSize: 9, opacity: 0.7 }}>{brand.name}</span>
                              <span style={{ minWidth: 20, height: 20, padding: "0 5px", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, background: "rgba(0,0,0,.18)", color: v.fg }}>{i + 1}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", gap: 7, padding: "0 0 22px" }}>
                    {(pv.slides || []).map((_, i) => (
                      <span key={i} style={{ width: 7, height: 7, borderRadius: 4, background: i === 0 ? primary : "#CFC7B6" }} />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      <style>{`
        .jd-spin { animation: jdspin .8s linear infinite; }
        @keyframes jdspin { to { transform: rotate(360deg); } }
        @keyframes jdfade { from { opacity: 0 } to { opacity: 1 } }
        .jd-deck .jd-cardf, .jd-deck .jd-cardb1, .jd-deck .jd-cardb2 { transition: transform .36s cubic-bezier(.2,.85,.3,1.05), box-shadow .32s; }
        .jd-cardf { transform: rotate(0deg); }
        .jd-cardb1 { transform: rotate(-1.6deg); }
        .jd-cardb2 { transform: rotate(3.6deg); }
        .jd-deck:hover .jd-cardf { transform: translate(-46px,4px) rotate(-10deg); box-shadow: 0 24px 42px -14px rgba(0,0,0,.55); }
        .jd-deck:hover .jd-cardb1 { transform: translate(0,-16px) rotate(0deg); box-shadow: 0 20px 38px -14px rgba(0,0,0,.5); }
        .jd-deck:hover .jd-cardb2 { transform: translate(46px,4px) rotate(10deg); box-shadow: 0 20px 38px -14px rgba(0,0,0,.5); }
        .jd-cols { display: flex; gap: 22px; align-items: flex-start; }
        .jd-aside { flex: 0 0 340px; position: sticky; top: 20px; }
        .jd-main { flex: 1; }
        @media (max-width: 900px) {
          .jd-cols { flex-direction: column; }
          .jd-aside { position: static; flex: 1 1 auto; width: 100%; }
          .jd-main { width: 100%; }
        }
      `}</style>
    </div>
  );
}
