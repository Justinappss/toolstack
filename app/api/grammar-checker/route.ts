import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length < 5) {
      return NextResponse.json({ error: "Please enter at least 5 characters to check." }, { status: 400 });
    }

    if (text.trim().length > 5000) {
      return NextResponse.json({ error: "Text is too long. Please keep it under 5,000 characters." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) return NextResponse.json({ error: "Service unavailable." }, { status: 500 });

    const systemPrompt = `You are a professional grammar and writing editor. Your job is to check text for grammar, spelling, punctuation, clarity and style errors, then return a detailed correction report.

Rules:
- Fix ALL errors: grammar, spelling, punctuation, sentence structure, subject-verb agreement, tense consistency, article usage, preposition errors
- Do NOT rewrite sentences unnecessarily — only correct actual errors
- Preserve the author's voice and meaning
- Give a grammar score from 0–100 (100 = perfect, no errors)
- For each correction, classify it as one of: Grammar, Spelling, Punctuation, Clarity, Style

Return ONLY valid JSON in exactly this format:
{
  "correctedText": "The full corrected version of the text",
  "score": 85,
  "corrections": [
    {
      "original": "the exact original phrase with the error",
      "corrected": "the corrected phrase",
      "type": "Grammar",
      "explanation": "Brief, clear explanation of the rule (e.g. 'Subject-verb agreement: use \"are\" with plural subjects')"
    }
  ]
}

If the text has no errors, return an empty corrections array and score of 100.
The correctedText must always be present — if no errors, return the original text unchanged.`;

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
          { role: "user", content: `Check this text:\n\n${text.trim()}` },
        ],
        temperature: 0.2,
        max_tokens: 2000,
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
    console.error("grammar-checker error:", err);
    return NextResponse.json({ error: "Failed to check grammar. Please try again." }, { status: 500 });
  }
}
