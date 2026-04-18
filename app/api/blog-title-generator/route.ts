import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic, audience, contentType } = await req.json();

    if (!topic?.trim()) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const prompt = `You are an expert content strategist and copywriter. Generate 10 blog post titles for the topic: "${topic}".
${audience ? `Target audience: ${audience}.` : ""}
${contentType ? `Content type: ${contentType}.` : ""}

Return ONLY this JSON (no markdown, no code blocks):
{
  "titles": [
    { "title": "...", "type": "SEO", "why": "One sentence explaining why this title works." },
    { "title": "...", "type": "Listicle", "why": "..." },
    { "title": "...", "type": "How-To", "why": "..." },
    { "title": "...", "type": "Question", "why": "..." },
    { "title": "...", "type": "Curiosity", "why": "..." },
    { "title": "...", "type": "Power Words", "why": "..." },
    { "title": "...", "type": "Beginner", "why": "..." },
    { "title": "...", "type": "Advanced", "why": "..." },
    { "title": "...", "type": "Contrarian", "why": "..." },
    { "title": "...", "type": "Story", "why": "..." }
  ]
}

Rules:
- Each title must be genuinely different in structure and angle
- Titles should be compelling, specific, and click-worthy
- Listicle: use numbers (e.g. "7 Ways to...")
- How-To: action-focused ("How to X Without Y")
- Question: sparks curiosity ("Why Does X Keep Failing?")
- Curiosity: creates an open loop the reader must close
- Power Words: include emotional trigger words (proven, secret, ultimate, effortless, etc.)
- Contrarian: challenges conventional wisdom ("Stop Doing X — Here's Why")
- Story: personal or narrative angle ("I Did X for 30 Days — Here's What Happened")
- Keep all titles under 70 characters for SEO`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 0.85,
        messages: [
          {
            role: "system",
            content: "You are a blog title expert. Return valid JSON only — no markdown, no code fences.",
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

    let parsed: { titles: { title: string; type: string; why: string }[] };
    try {
      parsed = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
      }
      parsed = JSON.parse(jsonMatch[0]);
    }

    return NextResponse.json({ titles: parsed.titles ?? [] });
  } catch (err) {
    console.error("Blog title generator error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
