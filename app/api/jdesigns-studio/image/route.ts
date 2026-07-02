import { NextRequest, NextResponse } from "next/server";
import { withPaywall, recordPaywallUsage } from "../_paywall";

// fal.ai image generation. Key stays server-side (FAL_KEY) — never exposed to the browser.
export const runtime = "nodejs";
export const maxDuration = 60;

const MODELS: Record<string, string> = {
  recraft: "fal-ai/recraft-v3",        // best for branded social graphics + on-brand imagery
  ideogram: "fal-ai/ideogram/v3",      // best-in-class legible text (baked-text ads)
  flux: "fal-ai/flux/dev",             // budget photographic workhorse
  "flux-pro": "fal-ai/flux-pro/v1.1",  // top-quality photographic
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/.{1,2}/g);
  if (!m || m.length < 3) return null;
  const [r, g, b] = m.map((x) => parseInt(x, 16));
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return { r, g, b };
}

export async function POST(req: NextRequest) {
  try {
    // Paywall: check allowance before generating
    const guard = await withPaywall(req, "image");
    if (!guard.allowed) return guard.response;

    const {
      prompt,
      model = "recraft",
      width = 1080,
      height = 1350,
      style = "realistic_image",
      colors = [],
    } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const key = process.env.FAL_KEY?.trim();
    if (!key) {
      return NextResponse.json({ error: "Image service not configured" }, { status: 500 });
    }

    const modelId = MODELS[model] || MODELS.recraft;
    const body: Record<string, unknown> = {
      prompt,
      image_size: { width, height },
    };

    if (modelId.includes("recraft")) {
      body.style = style;
      const rgb = (colors as string[]).map(hexToRgb).filter(Boolean);
      if (rgb.length) body.colors = rgb;
    } else if (modelId.includes("ideogram")) {
      body.rendering_speed = "BALANCED";
      body.expand_prompt = false;
      body.num_images = 1;
    } else {
      body.num_images = 1;
    }

    const res = await fetch(`https://fal.run/${modelId}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      const msg = data?.detail || data?.error || "Image generation failed";
      return NextResponse.json({ error: typeof msg === "string" ? msg : "Image generation failed" }, { status: 502 });
    }

    const url = data?.images?.[0]?.url;
    if (!url) {
      return NextResponse.json({ error: "No image returned" }, { status: 502 });
    }

    await recordPaywallUsage(guard.userKey, guard.plan, "image");
    return NextResponse.json({ url, model: modelId });
  } catch (error: any) {
    console.error("Jdesigns image API error:", error);
    return NextResponse.json({ error: error.message || "Image generation failed" }, { status: 500 });
  }
}
