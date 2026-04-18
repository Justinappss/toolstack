import { NextRequest, NextResponse } from "next/server";

const MODE_INSTRUCTIONS: Record<string, string> = {
  standard: "Rewrite the text using different words and sentence structures while preserving the exact meaning. Keep the same length and tone.",
  fluency: "Rewrite the text to improve its flow, readability and natural sound. Fix awkward phrasing, vary sentence length, and make it smooth to read. Keep the same meaning.",
  formal: "Rewrite the text in a professional, formal tone suitable for business communication, reports or official documents. Remove casual language and contractions.",
  academic: "Rewrite the text in an academic, scholarly tone suitable for essays, research papers or academic writing. Use precise vocabulary and formal sentence structures.",
  creative: "Rewrite the text in a more vivid, expressive and engaging way. Use stronger word choices, more varied sentence structures, and make it more compelling to read.",
  shorten: "Rewrite the text more concisely, reducing its length by approximately 30-40% while keeping all the key information and meaning. Remove redundancy and filler words.",
};

export async function POST(req: NextRequest) {
  try {
    const { text, mode } = await req.json();

    if (!text || text.trim().length < 10) {
      return NextResponse.json({ error: "Please enter at least 10 characters of text to paraphrase." }, { status: 400 });
    }

    if (text.trim().length > 5000) {
      return NextResponse.json({ error: "Text is too long. Please keep it under 5,000 characters." }, { status: 400 });
    }

    const instruction = MODE_INSTRUCTIONS[mode] ?? MODE_INSTRUCTIONS.standard;

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) return NextResponse.json({ error: "Service unavailable" }, { status: 500 });

    const systemPrompt = `You are a professional writing assistant specialised in paraphrasing and rewriting text.

Your task: ${instruction}

Critical rules:
- Return ONLY the rewritten text — no explanation, no preamble, no "Here is your rewritten text:" prefix
- Do NOT add quotes around the output
- Preserve all factual content accurately
- Do not add new information that wasn't in the original
- Match the original language (if it's English, return English)`;

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
          { role: "user", content: text.trim() },
        ],
        temperature: 0.75,
        max_tokens: 2000,
      }),
    });

    const json = await response.json();
    const result = json.choices?.[0]?.message?.content?.trim() ?? "";

    if (!result) throw new Error("Empty response from AI");

    return NextResponse.json({ result });
  } catch (err) {
    console.error("paraphrasing-tool error:", err);
    return NextResponse.json({ error: "Failed to paraphrase text. Please try again." }, { status: 500 });
  }
}
