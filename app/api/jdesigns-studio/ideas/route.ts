import { NextRequest, NextResponse } from "next/server";
import { withPaywall, recordPaywallUsage } from "../_paywall";

export const runtime = "nodejs";
export const maxDuration = 45;

export async function POST(req: NextRequest) {
  try {
    // Paywall: check allowance before generating
    const guard = await withPaywall(req, "ideas");
    if (!guard.allowed) return guard.response;

    const { brand, direction, count = 3, campaign, designDirective } = await req.json();
    if (!brand?.name) {
      return NextResponse.json({ error: "Missing brand" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const n = Math.min(Math.max(parseInt(String(count), 10) || 3, 1), 6);
    const vibes = Array.isArray(brand.vibes) ? brand.vibes.join(", ") : "";
    const palette = Array.isArray(brand.palette)
      ? brand.palette.map((p: any) => `${p.name} ${p.hex}`).join(", ")
      : "";
    const tone = Array.isArray(brand.tone) ? brand.tone.join(", ") : "";
    const values = Array.isArray(brand.values) ? brand.values.join(", ") : "";
    const aesthetic = Array.isArray(brand.aesthetic) ? brand.aesthetic.join(", ") : "";

    const campaignBlock = campaign?.name
      ? `\n\nThese posts are all part of ONE campaign — they must hang together as a series, not feel random:
Campaign: ${campaign.name}
Angle: ${campaign.angle || ""}
Goal: ${campaign.goal || ""}
Audience: ${campaign.audience || ""}
Big idea: ${campaign.bigIdea || ""}
Every post must be a distinct execution of this campaign (a different beat/angle within it) while clearly belonging to the same series. Captions should reinforce the campaign's goal.`
      : "";

    const systemPrompt = `You are a senior social-media creative director. Produce ${n} Instagram/LinkedIn CAROUSEL post ideas for the brand below.${campaignBlock}

Each idea is a 5-slide carousel. Slides: slide 1 = HOOK (scroll-stopping), slides 2-4 = POINT (one idea each), slide 5 = CTA.

Return ONLY a JSON object: { "ideas": [ ... ] }
Each idea object:
{
  "kind": "Short tag like Share / Tip / Story / Myth / List",
  "title": "Idea title (3-5 words)",
  "blurb": "One sentence describing the idea",
  "caption": "Full ready-to-post caption with a hook line, value, soft CTA, and 3-5 hashtags",
  "slides": [
    {"type":"hook","headline":"Punchy headline (max ~6 words)","sub":"Optional short support line"},
    {"type":"point","headline":"...","sub":"..."},
    {"type":"point","headline":"...","sub":"..."},
    {"type":"point","headline":"...","sub":"..."},
    {"type":"cta","headline":"Clear CTA","sub":"Short support line"}
  ],
  "imagePrompt": "A vivid description of the on-brand AD SCENE for this post — the hero subject or product, setting, moment, people/emotion, composition, lighting, mood and on-brand color usage, all expressing the campaign angle and big idea. Describe ONLY the visual scene and art direction (do not mention or instruct any text — text is handled separately). Compose with a clear focal point and clean negative space in the upper third and lower third. Match the brand's render medium, visual aesthetic and design-system art direction above (palette discipline, spacing, geometry). Premium, award-winning commercial photography/illustration."
}

Rules: headlines short and punchy, on-brand for the vibe, no slide headline over ~8 words. The imagePrompt describes a striking on-brand scene (a different beat of the campaign per post) with clean negative space top and bottom — describe imagery only, never a bare flat backdrop. Valid JSON only.`;

    const userContent = `Brand: ${brand.name}
Tagline: ${brand.tagline || ""}
Overview: ${brand.overview || ""}
Vibes: ${vibes}
Tone of voice: ${tone}
Core values: ${values}
Visual aesthetic: ${aesthetic}
Render medium: ${brand.renderStyle || "photographic"}
Fonts: display ${brand.fonts?.display || ""}, body ${brand.fonts?.body || ""}
Palette: ${palette}
${designDirective ? `Design-system art direction (follow this visual language): ${designDirective}` : ""}
Creative direction: ${direction || "Make scroll-stopping, on-brand carousels that fit the vibe."}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        temperature: 0.85,
        max_tokens: 2200,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);
    const ideas = Array.isArray(parsed) ? parsed : parsed.ideas || [];

    await recordPaywallUsage(guard.userKey, guard.plan, "ideas");
    return NextResponse.json({ ideas });
  } catch (error: any) {
    console.error("Jdesigns ideas API error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate ideas" }, { status: 500 });
  }
}
