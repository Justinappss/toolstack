import { NextRequest, NextResponse } from "next/server";

const MODE_PROMPTS: Record<string, string> = {
  paragraph:      "Write a clear, flowing prose summary in paragraph form. Capture all key points naturally.",
  bullets:        "Write 5–7 concise bullet points. Start each bullet with '• ' on its own line. Each bullet = one distinct idea.",
  key_takeaways:  "Extract exactly 3 of the most critical insights or conclusions. Start each with '• ' on its own line.",
  executive:      "Write a formal executive summary: one sentence of context, 2–3 sentences of core findings, one sentence of implications. Formal professional tone.",
};

const LENGTH_PROMPTS: Record<string, string> = {
  short:    "Be very concise. Maximum 2–3 sentences or 3 bullet points.",
  medium:   "Standard length. 4–5 sentences or 5–7 bullet points.",
  detailed: "Be thorough. Cover all key points fully. 7–8 sentences or 8–10 bullet points.",
};

export async function POST(req: NextRequest) {
  try {
    const { text, mode = "paragraph", length = "medium" } = await req.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json({ error: "Please enter at least 20 characters to summarize." }, { status: 400 });
    }
    if (text.trim().length > 5000) {
      return NextResponse.json({ error: "Text is too long. Please keep it under 5,000 characters." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) return NextResponse.json({ error: "Service unavailable." }, { status: 500 });

    const modeInstruction  = MODE_PROMPTS[mode]   ?? MODE_PROMPTS.paragraph;
    const lengthInstruction = LENGTH_PROMPTS[length] ?? LENGTH_PROMPTS.medium;

    const systemPrompt = `You are a professional text summarizer. Your job is to create accurate, clear summaries that preserve key information without adding anything not in the original.

Mode: ${modeInstruction}
Length: ${lengthInstruction}

Rules:
- NEVER add information not present in the original text
- NEVER start with "This article...", "The text discusses..." — go straight into the content
- Preserve all important facts, numbers, names and dates
- Use plain, clear language
- For bullet modes: start each bullet with '• ' on its own line

Return ONLY valid JSON in exactly this format:
{
  "summary": "the full summary text here"
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
          { role: "user", content: `Summarize this text:\n\n${text.trim()}` },
        ],
        temperature: 0.3,
        max_tokens: 1200,
      }),
    });

    const json = await response.json();
    let content = json.choices?.[0]?.message?.content ?? "";
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
    console.error("text-summarizer error:", err);
    return NextResponse.json({ error: "Failed to summarize. Please try again." }, { status: 500 });
  }
}
