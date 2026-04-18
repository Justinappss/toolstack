import { NextRequest, NextResponse } from "next/server";

const PLATFORM_CONFIG: Record<string, { popular: number; medium: number; niche: number; info: string }> = {
  instagram: { popular: 5, medium: 12, niche: 13, info: "Instagram: Up to 30 hashtags recommended for maximum reach" },
  tiktok:    { popular: 2, medium: 3,  niche: 3,  info: "TikTok: 5–8 hashtags perform best — quality over quantity" },
  linkedin:  { popular: 1, medium: 2,  niche: 2,  info: "LinkedIn: 3–5 hashtags keep it professional and searchable" },
  twitter:   { popular: 1, medium: 1,  niche: 1,  info: "X / Twitter: 1–3 hashtags — more hurts engagement" },
  youtube:   { popular: 3, medium: 6,  niche: 6,  info: "YouTube: Up to 15 hashtags in description; first 3 show above title" },
};

export async function POST(req: NextRequest) {
  try {
    const { topic, platform, tone } = await req.json();

    if (!topic?.trim()) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const cfg = PLATFORM_CONFIG[platform] ?? PLATFORM_CONFIG.instagram;
    const totalCount = cfg.popular + cfg.medium + cfg.niche;

    const prompt = `You are a social media expert. Generate exactly ${totalCount} hashtags for ${platform} about: "${topic}".
Tone / style: ${tone || "professional"}.

Return ONLY this JSON structure (no markdown, no code blocks):
{
  "popular": ["#tag1", "#tag2", ...],
  "medium": ["#tag1", "#tag2", ...],
  "niche": ["#tag1", "#tag2", ...],
  "pro_tip": "One specific, actionable tip for using these hashtags on ${platform} to maximise reach."
}

Rules:
- popular: exactly ${cfg.popular} hashtags — broad, 1M+ posts, highly competitive (e.g. #marketing #fitness)
- medium: exactly ${cfg.medium} hashtags — mid-range, 100k–1M posts, good reach-to-competition ratio
- niche: exactly ${cfg.niche} hashtags — highly specific to "${topic}", under 100k posts, very targeted
- Every hashtag starts with #, no spaces inside the tag
- No duplicate hashtags across any group
- All hashtags must be directly relevant to the topic
- The pro_tip must be specific to ${platform} behaviour and the "${topic}" niche`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 0.75,
        messages: [
          {
            role: "system",
            content: "You are a social media hashtag strategist. Return valid JSON only — no markdown, no code fences, no commentary.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI error:", err);
      return NextResponse.json({ error: "AI generation failed. Please try again." }, { status: 500 });
    }

    const data = await res.json();
    let content: string = data.choices?.[0]?.message?.content ?? "";
    content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    let parsed: { popular: string[]; medium: string[]; niche: string[]; pro_tip: string };
    try {
      parsed = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
      }
      parsed = JSON.parse(jsonMatch[0]);
    }

    return NextResponse.json({
      popular: parsed.popular ?? [],
      medium: parsed.medium ?? [],
      niche: parsed.niche ?? [],
      pro_tip: parsed.pro_tip ?? "",
      platform,
      platformInfo: cfg.info,
      totalCount,
    });
  } catch (err) {
    console.error("Hashtag generator error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
