import { NextRequest, NextResponse } from "next/server";
import { withPaywall, recordPaywallUsage } from "../_paywall";

export const runtime = "nodejs";
export const maxDuration = 45;

export async function POST(req: NextRequest) {
  try {
    // Paywall: check allowance before generating
    const guard = await withPaywall(req, "concepts");
    if (!guard.allowed) return guard.response;

    const { brand, direction } = await req.json();
    if (!brand?.name) {
      return NextResponse.json({ error: "Missing brand" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const vibes = Array.isArray(brand.vibes) ? brand.vibes.join(", ") : "";
    const palette = Array.isArray(brand.palette)
      ? brand.palette.map((p: any) => `${p.name} ${p.hex}`).join(", ")
      : "";
    const tone = Array.isArray(brand.tone) ? brand.tone.join(", ") : "";
    const values = Array.isArray(brand.values) ? brand.values.join(", ") : "";
    const aesthetic = Array.isArray(brand.aesthetic) ? brand.aesthetic.join(", ") : "";

    const systemPrompt = `You are a senior brand campaign strategist. Pitch 3 DISTINCT social-media CAMPAIGN concepts for the brand below.

A campaign is a single big idea that ties a series of posts together — not one post. Each concept must feel genuinely different in angle and emotion, so the user has a real choice.

Return ONLY a JSON object: { "concepts": [ ... ] }
Each concept object:
{
  "name": "Campaign name — punchy, memorable, brand-able (2-4 words)",
  "angle": "The creative angle / through-line in one vivid phrase",
  "goal": "The marketing objective in plain words (e.g. drive first trials, win back lapsed users, launch the summer range)",
  "audience": "Who this speaks to, specifically",
  "bigIdea": "One sentence that sells the whole campaign — what makes it land"
}

Rules: 3 concepts, each a different strategic angle (e.g. one emotional, one bold/contrarian, one practical/value). On-brand for the vibe. Valid JSON only.`;

    const userContent = `Brand: ${brand.name}
Tagline: ${brand.tagline || ""}
Overview: ${brand.overview || ""}
Vibes: ${vibes}
Tone of voice: ${tone}
Core values: ${values}
Visual aesthetic: ${aesthetic}
Palette: ${palette}
Creative direction: ${direction || "Surprise me with campaigns that fit the brand's vibe and would actually perform."}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        temperature: 0.9,
        max_tokens: 1200,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);
    const concepts = Array.isArray(parsed) ? parsed : parsed.concepts || [];

    await recordPaywallUsage(guard.userKey, guard.plan, "concepts");
    return NextResponse.json({ concepts });
  } catch (error: any) {
    console.error("Jdesigns concepts API error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate concepts" }, { status: 500 });
  }
}
