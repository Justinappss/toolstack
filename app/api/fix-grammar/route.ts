import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json();
        if (!text?.trim()) return NextResponse.json({ error: "No text provided" }, { status: 400 });
        if (text.length > 10000) return NextResponse.json({ error: "Text too long — max 10,000 characters" }, { status: 400 });

        const apiKey = process.env.OPENAI_API_KEY?.trim();
        if (!apiKey) return NextResponse.json({ error: "Service unavailable" }, { status: 500 });

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: `You are a professional editor and grammar expert. Your job is to fix grammar, spelling, punctuation, and sentence structure errors in the text provided.

Rules:
- Fix all grammar, spelling, punctuation and syntax errors
- Preserve the original tone, voice, and meaning completely — do not rewrite or paraphrase
- Do not add or remove sentences unless a sentence is grammatically incomplete
- Do not change the structure or layout — preserve line breaks and paragraphs
- Return ONLY the corrected text, nothing else — no explanations, no preamble, no "Here is the corrected text:" prefix
- If the text is already correct, return it exactly as-is`
                    },
                    { role: "user", content: text },
                ],
                max_tokens: 4000,
                temperature: 0.1,
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("[fix-grammar]", response.status, err);
            return NextResponse.json({ error: "AI error — try again" }, { status: 500 });
        }

        const data = await response.json();
        const fixed = data.choices[0]?.message?.content || text;
        return NextResponse.json({ fixed });
    } catch (error) {
        console.error("[fix-grammar] error:", error);
        return NextResponse.json({ error: "Request failed" }, { status: 500 });
    }
}
