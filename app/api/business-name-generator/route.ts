import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { industry, vibe, keywords } = await req.json();

    if (!industry || !vibe) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const systemPrompt = `You are a professional brand naming consultant and startup specialist.
Your task is to generate 12 unique, memorable, and high-impact business names for the [${industry}] industry.
The desired brand vibe is [${vibe}].
Specific keywords to include or draw inspiration from: [${keywords || "None provided"}].

For each name, provide:
1. The suggested business name.
2. A single, punchy sentence explaining the 'Brand Origin' or why the name works for this niche.
3. A sub-category of the vibe it represents (e.g., Short & Punchy, Modern Tech, Classic Professional).

Return ONLY a JSON array of objects in this format:
[
  { "name": "Name", "meaning": "One sentence origin/vibe explanation.", "category": "Vibe Sub-category" }
]

Rules:
- NAMES ONLY. No pre-text or post-text.
- No unescaped special characters in JSON strings.
- Ensure the names sound premium and not generic.
- Aim for a mix of compound names, invented words, and thematic phrases.`;

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
          { role: "user", content: `Generate business names for: Industry: ${industry}, Vibe: ${vibe}, Keywords: ${keywords}` }
        ],
        temperature: 0.8,
        max_tokens: 1200,
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content ?? "";

    // Parse the JSON object from OpenAI (since we used response_format: { type: "json_object" })
    let parsedData;
    try {
      parsedData = JSON.parse(content);
      // Ensure we get the array if it's wrapped in a property
      if (!Array.isArray(parsedData) && parsedData.names) {
        parsedData = parsedData.names;
      } else if (!Array.isArray(parsedData) && Object.values(parsedData).length === 1 && Array.isArray(Object.values(parsedData)[0])) {
        parsedData = Object.values(parsedData)[0];
      }
    } catch (e) {
      // Fallback regex to find array if JSON.parse fails
      const arrayMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (arrayMatch) {
        parsedData = JSON.parse(arrayMatch[0]);
      } else {
        throw new Error("Failed to parse AI response into valid JSON array");
      }
    }

    if (!Array.isArray(parsedData)) {
      throw new Error("AI did not return an array of names");
    }

    return NextResponse.json({ names: parsedData });
  } catch (error: any) {
    console.error("Business Name Generator API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate names" }, { status: 500 });
  }
}
