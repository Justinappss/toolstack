import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { subject, score, spamWords, powerWords, breakdown } = await req.json();

        if (!subject || subject.trim().length < 3) {
            return NextResponse.json({ error: "Subject line is too short." }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY?.trim();
        if (!apiKey) return NextResponse.json({ error: "Service unavailable" }, { status: 500 });

        const issuesList = [
            spamWords?.length > 0 ? `Spam trigger words detected: ${spamWords.join(", ")}` : null,
            breakdown?.length?.score < 13 ? `Length issue: ${subject.length} chars (ideal is 40–60)` : null,
            breakdown?.power?.score === 0 ? "No power words — add urgency, curiosity, or value language" : null,
            breakdown?.caps?.score === 0 ? "ALL CAPS detected — remove" : null,
            breakdown?.punctuation?.score < 8 ? "Excessive punctuation (!!!, ???) — reduce" : null,
            breakdown?.emoji?.score < 5 ? "Too many emojis — trim to 1 max" : null,
        ].filter(Boolean).join("; ");

        const systemPrompt = `You are a world-class email marketing copywriter who specialises in subject lines that maximise open rates. You write punchy, clear, compelling subject lines that feel human — not spammy.`;

        const userPrompt = `Original subject line: "${subject}"
Current score: ${score}/100
Issues to fix: ${issuesList || "None — just make it even better"}
Power words already used: ${powerWords?.map((p: { word: string }) => p.word).join(", ") || "none"}

Generate 5 improved subject line alternatives, each using a different angle. Every subject line must:
- Be 40–60 characters
- Contain NO spam trigger words (free offer, act now, guaranteed, click here, buy now, earn money, etc.)
- Use natural capitalisation (not ALL CAPS)
- Use a maximum of 1 emoji (or none)
- Feel natural and human — not like a generic template

The 5 angles:
1. Urgency — time-sensitive, creates pressure to act now
2. Curiosity — makes them wonder what's inside, piques interest
3. Value-led — leads with a clear benefit or offer
4. Personalised — speaks directly to "you", feels one-to-one
5. FOMO — fear of missing out, what they'll lose by not opening

Return ONLY valid JSON:
{
  "alternatives": [
    { "text": "...", "angle": "Urgency", "angleDesc": "Creates pressure to open now" },
    { "text": "...", "angle": "Curiosity", "angleDesc": "Makes them wonder what's inside" },
    { "text": "...", "angle": "Value-led", "angleDesc": "Leads with a clear benefit" },
    { "text": "...", "angle": "Personalised", "angleDesc": "Speaks directly to the reader" },
    { "text": "...", "angle": "FOMO", "angleDesc": "Fear of missing out" }
  ]
}`;

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

        return NextResponse.json(parsed);
    } catch (err) {
        console.error("email-subject-line-tester error:", err);
        return NextResponse.json({ error: "Failed to generate alternatives. Please try again." }, { status: 500 });
    }
}
