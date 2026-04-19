import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { description, style } = await req.json();
        if (!description?.trim()) {
            return NextResponse.json({ error: "Description is required." }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY?.trim();
        if (!apiKey) return NextResponse.json({ error: "Service unavailable." }, { status: 500 });

        const styleGuides: Record<string, string> = {
            brand: "professional, memorable, versatile — suitable for logos, marketing materials, and digital brand identity",
            ui: "clean, accessible, high-contrast — optimised for web interfaces with strong visual hierarchy",
            dark: "deep, dramatic, premium dark theme — rich darks with glowing accent colors",
            minimal: "restrained, elegant, near-monochromatic — subtle tones with one focal accent",
            vibrant: "bold, energetic, saturated — maximum visual impact, youthful and dynamic",
            nature: "organic, earthy, grounded — inspired by natural materials, plants, and landscapes",
        };

        const systemPrompt = `You are a world-class brand designer. Always respond with valid JSON only — no markdown, no explanation, no extra text.`;

        const userPrompt = `Generate a perfect 5-color palette for: "${description.trim()}"

Style direction: ${styleGuides[style] || styleGuides.brand}

Return ONLY a JSON object with a "palette" key containing exactly 5 objects:
{ "palette": [
  { "hex": "#1a2b3c", "name": "Creative Color Name", "role": "Primary", "usage": "Main brand color, CTAs, key headings" },
  { "hex": "#2d3e50", "name": "Creative Color Name", "role": "Secondary", "usage": "Supporting elements, hover states, dividers" },
  { "hex": "#e8a030", "name": "Creative Color Name", "role": "Accent", "usage": "Highlights, icons, badges, interactive elements" },
  { "hex": "#f4f5f7", "name": "Creative Color Name", "role": "Background", "usage": "Page backgrounds, card surfaces, containers" },
  { "hex": "#1c1d22", "name": "Creative Color Name", "role": "Text", "usage": "Body copy, labels, secondary text" }
]}

Rules:
- Hexes must be valid 6-digit hex codes starting with #
- All 5 roles must appear exactly once: Primary, Secondary, Accent, Background, Text
- Colors must work together harmoniously
- Names must be creative and evocative (never generic like "Blue" or "Gray")
- Background must be light enough for the Text color to be readable on it (WCAG AA)
- Usage must be specific and practical`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                temperature: 0.85,
                max_tokens: 800,
            }),
        });

        const json = await response.json();
        let content = json.choices?.[0]?.message?.content || "";
        content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

        let parsed;
        try {
            parsed = JSON.parse(content);
        } catch {
            const match = content.match(/\{[\s\S]*\}/);
            if (match) parsed = JSON.parse(match[0]);
            else throw new Error("Could not parse AI response");
        }

        const palette = Array.isArray(parsed) ? parsed : (parsed.palette ?? Object.values(parsed)[0]);

        if (!Array.isArray(palette) || palette.length !== 5) {
            return NextResponse.json({ error: "Invalid palette generated. Please try again." }, { status: 500 });
        }

        return NextResponse.json({ palette });
    } catch (err) {
        console.error("Color palette error:", err);
        return NextResponse.json({ error: "Failed to generate palette. Please try again." }, { status: 500 });
    }
}
