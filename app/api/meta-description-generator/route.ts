import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { pageTitle, pageTopic, targetKeyword, tone, audience } = await req.json();

        if (!pageTopic || pageTopic.trim().length < 10) {
            return NextResponse.json({ error: "Please describe your page in more detail." }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY?.trim();
        if (!apiKey) return NextResponse.json({ error: "Service unavailable" }, { status: 500 });

        const toneGuide: Record<string, string> = {
            professional: "authoritative, trustworthy, expert — suitable for B2B or professional services",
            persuasive: "benefit-driven, compelling, focused on value — ideal for sales or landing pages",
            friendly: "warm, approachable, conversational — great for blogs or consumer brands",
            urgent: "creates FOMO, time-sensitive, action-oriented — strong for offers or deadlines",
            informative: "educational, clear, factual — perfect for guides, how-tos, and documentation",
        };

        const systemPrompt = `You are a world-class SEO copywriter who specialises in writing meta descriptions that maximise click-through rate from Google search results.

Rules for every description you write:
- Between 150 and 160 characters EXACTLY (count carefully — this is critical)
- Include the target keyword naturally in the first half where possible
- No keyword stuffing — keyword appears once only
- Include a clear call-to-action or value proposition
- Never start with the page title verbatim
- No vague filler phrases like "In this article..." or "Learn more about..."
- Every word must earn its place

Tone to use: ${toneGuide[tone] || toneGuide.professional}
${audience ? `Target audience: ${audience}` : ""}

Write exactly 5 meta description variants, each with a different angle:
1. Benefit-led: Lead with the most compelling benefit for the reader
2. Feature-focused: Highlight what makes this page/tool/content stand out
3. Urgency/FOMO: Create a sense of what they'll miss if they don't click
4. Question-led: Open with a question the reader is already asking
5. CTA-first: Lead with a strong action verb and clear next step

Return ONLY valid JSON in this exact format:
{
  "descriptions": [
    { "text": "...", "angle": "Benefit-led", "angleDesc": "Leads with your reader's main gain" },
    { "text": "...", "angle": "Feature-focused", "angleDesc": "Highlights what makes this stand out" },
    { "text": "...", "angle": "Urgency / FOMO", "angleDesc": "Makes missing out feel costly" },
    { "text": "...", "angle": "Question-led", "angleDesc": "Mirrors what readers are searching" },
    { "text": "...", "angle": "CTA-first", "angleDesc": "Strong action verb leads the way" }
  ]
}`;

        const userPrompt = `Page title: ${pageTitle || "Not provided"}
Page topic / content: ${pageTopic}
Target keyword: ${targetKeyword || "Not specified"}

Generate 5 meta descriptions following the system instructions exactly.`;

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
                temperature: 0.8,
                max_tokens: 1000,
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

        return NextResponse.json(parsed);
    } catch (err) {
        console.error("meta-description-generator error:", err);
        return NextResponse.json({ error: "Failed to generate descriptions. Please try again." }, { status: 500 });
    }
}
