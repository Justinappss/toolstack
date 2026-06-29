import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

function normalizeUrl(input: string): string {
  let u = input.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  return u;
}

async function fetchPageText(url: string): Promise<{ title: string; description: string; text: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ToolStackBot/1.0; +https://toolstack.tech)" },
    });
    const html = await res.text();
    const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "").trim();
    const description = (
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ||
      html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i)?.[1] ||
      ""
    ).trim();
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 3500);
    return { title, description, text };
  } catch {
    return { title: "", description: "", text: "" };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const target = normalizeUrl(url);
    const domain = target.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    const page = await fetchPageText(target);

    const systemPrompt = `You are a brand identity analyst. Given a website's domain and scraped content, infer its brand identity for a social-media carousel builder.

Use your knowledge of well-known brands (e.g. coca-cola.com → red/black/cream, joyful, nostalgic) AND the scraped content. If the brand is unknown, infer a tasteful, coherent identity from the content.

Return ONLY a JSON object:
{
  "name": "Brand Name",
  "tagline": "Short one-line description of the brand (max ~10 words)",
  "vibes": ["Vibe1","Vibe2","Vibe3","Vibe4"],
  "palette": [
    {"name":"PRIMARY","hex":"#RRGGBB"},
    {"name":"INK","hex":"#RRGGBB"},
    {"name":"ACCENT","hex":"#RRGGBB"},
    {"name":"PAPER","hex":"#RRGGBB"}
  ],
  "fonts": {"display":"A Google Font name","body":"A Google Font name"}
}

Rules: exactly 4 vibes (single Title-case words), exactly 4 palette swatches with valid 6-digit hex, real Google Font names. No commentary.`;

    const userContent = `Domain: ${domain}
Page title: ${page.title || "(none)"}
Meta description: ${page.description || "(none)"}
Scraped content: ${page.text || "(could not fetch — infer from the domain/brand)"}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        temperature: 0.6,
        max_tokens: 500,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);

    return NextResponse.json({ brand: { ...parsed, url: domain } });
  } catch (error: any) {
    console.error("Jdesigns scan API error:", error);
    return NextResponse.json({ error: error.message || "Failed to scan brand" }, { status: 500 });
  }
}
