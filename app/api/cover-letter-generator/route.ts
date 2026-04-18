import { NextRequest, NextResponse } from "next/server";

const TONE_INSTRUCTIONS: Record<string, string> = {
  professional: "Formal and authoritative. Strong vocabulary, measured tone. Confident but not boastful.",
  enthusiastic: "Energetic and passionate. Show genuine excitement about the role and company. Warm, human voice.",
  concise:      "Direct and efficient. No filler sentences. Every word earns its place. Under 250 words total.",
  creative:     "Distinctive voice that stands out. A memorable opening hook. Still professional but with personality.",
};

export async function POST(req: NextRequest) {
  try {
    const { jobTitle, company, background, tone = "professional", hiringManager = "" } = await req.json();

    if (!jobTitle?.trim()) return NextResponse.json({ error: "Please enter the job title." }, { status: 400 });
    if (!company?.trim())  return NextResponse.json({ error: "Please enter the company name." }, { status: 400 });
    if (!background?.trim() || background.trim().length < 20) {
      return NextResponse.json({ error: "Please add at least a sentence about your background." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) return NextResponse.json({ error: "Service unavailable." }, { status: 500 });

    const greeting = hiringManager?.trim()
      ? `Dear ${hiringManager.trim()},`
      : "Dear Hiring Manager,";

    const toneInstruction = TONE_INSTRUCTIONS[tone] ?? TONE_INSTRUCTIONS.professional;

    const systemPrompt = `You are an expert career coach and professional cover letter writer. Write a compelling, personalised cover letter.

Details:
- Role: ${jobTitle.trim()} at ${company.trim()}
- Candidate background: ${background.trim()}
- Tone: ${toneInstruction}
- Greeting to use: "${greeting}"

Structure (3 paragraphs):
1. Opening — a strong, specific hook about why this role and company. Never start with "I am writing to express my interest." Open with impact.
2. Middle — draw directly from the candidate's background to highlight 2-3 specific, relevant achievements or skills. Be concrete.
3. Closing — restate enthusiasm, mention next steps (interview), sign off professionally.

Rules:
- NEVER invent facts not provided by the candidate
- NEVER use tired clichés: "team player", "passionate about", "I would be a great fit", "I am excited to"
- Use the exact greeting provided
- End with: "Yours sincerely," on its own line, then a blank line
- Aim for 260–320 words (or under 250 for Concise tone)

Return ONLY valid JSON:
{
  "letter": "the full cover letter text with \\n\\n between paragraphs"
}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Write the cover letter now." },
        ],
        temperature: 0.7,
        max_tokens: 800,
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
    console.error("cover-letter-generator error:", err);
    return NextResponse.json({ error: "Failed to generate cover letter. Please try again." }, { status: 500 });
  }
}
