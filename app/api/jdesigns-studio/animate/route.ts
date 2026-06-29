import { NextRequest, NextResponse } from "next/server";

// Image-to-video via fal.ai (premium add-on). Key stays server-side.
// NOTE: i2v is slow (~30s–2min). Sync call here is fine locally / on Vercel Pro
// (maxDuration). For production at scale, switch to fal's queue + polling.
export const runtime = "nodejs";
export const maxDuration = 300;

const I2V_MODELS: Record<string, string> = {
  kling: "fal-ai/kling-video/v1.6/standard/image-to-video",
  wan: "fal-ai/wan-i2v",
  svd: "fal-ai/stable-video",
};

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, prompt, model = "kling", aspectRatio = "9:16", duration = 5 } = await req.json();
    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
    }
    const key = process.env.FAL_KEY?.trim();
    if (!key) {
      return NextResponse.json({ error: "Video service not configured" }, { status: 500 });
    }

    const modelId = I2V_MODELS[model] || I2V_MODELS.kling;
    const body: Record<string, unknown> = {
      image_url: imageUrl,
      prompt: prompt || "subtle, elegant cinematic motion; gentle camera push and soft parallax; premium and smooth; no warping",
    };
    if (modelId.includes("kling")) {
      body.duration = String(duration) === "10" ? "10" : "5";
      body.aspect_ratio = aspectRatio;
    }

    const res = await fetch(`https://fal.run/${modelId}`, {
      method: "POST",
      headers: { Authorization: `Key ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data?.detail || data?.error || "Animation failed";
      return NextResponse.json({ error: typeof msg === "string" ? msg : "Animation failed" }, { status: 502 });
    }
    const url = data?.video?.url || data?.video?.video?.url;
    if (!url) {
      return NextResponse.json({ error: "No video returned" }, { status: 502 });
    }
    return NextResponse.json({ url, model: modelId });
  } catch (error: any) {
    console.error("Jdesigns animate API error:", error);
    return NextResponse.json({ error: error.message || "Animation failed" }, { status: 500 });
  }
}
