import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const { title, context, type } = await req.json();

        if (!title) {
            return NextResponse.json({ error: "Video title is required" }, { status: 400 });
        }

        const prompt = `
            Act as a YouTube SEO Expert for a premium creator utility platform.
            Your task is to generate the "SEO Trinity" for a video titled: "${title}"
            Additional Context/Topic: ${context || "N/A"}
            Content Type: ${type || "Standard Video"}

            SEO Trends 2026 Focus:
            1. Semantic Weight: The first tag MUST be an exact match or extremely close variant of the core keyword from the title.
            2. Tag Diet: Provide a balanced mix of 10 Specific tags, 10 Category tags, and 5 Broad tags.
            3. Search Intent: Prioritize high-intent, long-tail phrases.
            4. Description Hooks: Create 3 variations of the "First 100 Characters" description hook designed for maximum CTR in mobile search results.

            Return ONLY a valid JSON object with the following structure:
            {
                "tags": {
                    "specific": ["tag1", "tag2", ...],
                    "category": ["tag1", "tag2", ...],
                    "broad": ["tag1", "tag2", ...]
                },
                "commaString": "tag1, tag2, tag3...",
                "descriptionHooks": [
                    "Hook 1...",
                    "Hook 2...",
                    "Hook 3..."
                ],
                "seoScore": 0-100,
                "primaryKeyword": "string"
            }
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a YouTube SEO expert. Response must be pure JSON." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;
        if (!content) {
            throw new Error("No response from OpenAI");
        }

        return NextResponse.json(JSON.parse(content));

    } catch (error: any) {
        console.error("YouTube Tag Generator API Error:", error);
        return NextResponse.json({ error: "Failed to generate tags. Please try again." }, { status: 500 });
    }
}
