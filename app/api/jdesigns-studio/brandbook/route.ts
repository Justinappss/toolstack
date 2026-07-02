import { NextRequest, NextResponse } from "next/server";
import designSystems from "../../../tools/jdesigns-studio/designSystems.json";
import { withPaywall, recordPaywallUsage } from "../_paywall";

export const runtime = "nodejs";
export const maxDuration = 30;

const DS_SLUGS = new Set((designSystems as { slug: string }[]).map((d) => d.slug));
const DS_CATALOG = (designSystems as { slug: string; name: string; blurb: string }[])
  .map((d) => `${d.slug}: ${d.blurb || d.name}`)
  .join("\n");

function normalizeUrl(input: string): string {
  let u = input.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  return u;
}

async function fetchPageText(url: string): Promise<{ title: string; description: string; text: string; html: string }> {
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
      .slice(0, 4000);
    return { title, description, text, html: html.slice(0, 400000) };
  } catch {
    return { title: "", description: "", text: "", html: "" };
  } finally {
    clearTimeout(timeout);
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/gi, "&")
    .replace(/&#0*38;/g, "&")
    .replace(/&#x0*26;/gi, "&")
    .replace(/&#x0*2f;/gi, "/")
    .replace(/&#0*47;/g, "/");
}

function absolutize(src: string, base: string): string {
  try {
    return new URL(decodeEntities(src.trim()), base).href;
  } catch {
    return "";
  }
}

// pull the brand's real logo + a few on-page images so creatives use genuine assets
async function extractAssets(domain: string, html: string, baseUrl: string): Promise<{ logo: string; images: string[] }> {
  // collect on-page images first (skip tiny/tracking pixels and data URIs)
  const imgSrcs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)]
    .map((m) => m[1])
    .filter((s) => s && !s.startsWith("data:") && !/sprite|pixel|1x1|blank|spacer/i.test(s))
    .map((s) => absolutize(s, baseUrl))
    .filter(Boolean);
  const ogImg = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1];
  // surface any image whose filename clearly says "logo" first — that's usually the real wordmark
  const logoNamed = imgSrcs.filter((s) => /logo|wordmark|brandmark/i.test(s) && !/sprite/i.test(s));
  const images = [...new Set([ogImg ? absolutize(ogImg, baseUrl) : "", ...logoNamed, ...imgSrcs].filter(Boolean))].slice(0, 10);

  // logo priority: Clearbit → a "logo"-named on-page image → scraped icons → favicon fallback
  let logo = "";
  try {
    const c = new AbortController();
    const tt = setTimeout(() => c.abort(), 5000);
    const clearbit = `https://logo.clearbit.com/${domain}?size=256`;
    const r = await fetch(clearbit, { signal: c.signal });
    clearTimeout(tt);
    if (r.ok && (r.headers.get("content-type") || "").startsWith("image")) logo = clearbit;
  } catch {
    /* fall through */
  }
  if (!logo && logoNamed[0]) logo = logoNamed[0];
  if (!logo) {
    const valid = (s?: string) => (s && s.trim() && !/^data:/i.test(s.trim()) ? s.trim() : undefined);
    const pick = (re: RegExp) => valid(html.match(re)?.[1]);
    const cand =
      pick(/<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]+href=["']([^"']+)["']/i) ||
      pick(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*apple-touch-icon[^"']*["']/i) ||
      pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      pick(/<meta[^>]+name=["']msapplication-TileImage["'][^>]+content=["']([^"']+)["']/i) ||
      pick(/<link[^>]+rel=["'][^"']*mask-icon[^"']*["'][^>]+href=["']([^"']+)["']/i) ||
      pick(/<link[^>]+rel=["'][^"']*(?:shortcut )?icon[^"']*["'][^>]+href=["']([^"']+)["']/i) ||
      pick(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*icon[^"']*["']/i);
    if (cand) logo = absolutize(cand, baseUrl);
  }
  if (!logo) logo = `https://icons.duckduckgo.com/ip3/${domain}.ico`;

  return { logo, images };
}

export async function POST(req: NextRequest) {
  try {
    // Paywall: check allowance before generating
    const guard = await withPaywall(req, "scan");
    if (!guard.allowed) return guard.response;

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
    // whether we actually read the live site, vs. inferring purely from the domain string
    const fetched = !!(page.text || page.title || page.html);

    const systemPrompt = `You are a brand strategist building a professional brand book. From the domain and scraped content (and your knowledge of well-known brands), produce the brand's full identity.

Return ONLY a JSON object:
{
  "name": "Brand Name",
  "tagline": "A short, punchy brand tagline (max ~8 words)",
  "overview": "2–3 sentence business overview describing what the company does and its scale/mission.",
  "vibes": ["Vibe1","Vibe2","Vibe3","Vibe4"],
  "palette": [
    {"name":"Colour name","hex":"#RRGGBB"},
    {"name":"Colour name","hex":"#RRGGBB"},
    {"name":"Colour name","hex":"#RRGGBB"},
    {"name":"Colour name","hex":"#RRGGBB"}
  ],
  "fonts": {"display":"A real Google Font name","body":"A real Google Font name"},
  "values": ["Value1","Value2","Value3","Value4","Value5"],
  "aesthetic": ["short phrase","short phrase","short phrase","short phrase","short phrase"],
  "tone": ["Word1","Word2","Word3","Word4"],
  "renderStyle": "photographic | illustration | vector — the single visual medium that best fits this brand's marketing creatives",
  "designSystem": "the slug of the single closest-matching design system from the DESIGN SYSTEMS list below",
  "coverPrompt": "A vivid, abstract, on-brand cover image prompt for an AI image model — describe scene, mood, lighting, on-brand colours. NO text, no logos."
}

Rules: exactly 4 vibes (single Title-case words), exactly 4 palette swatches (valid 6-digit hex, descriptive colour names), real Google Font names, 5 values (single Title-case words), 5 aesthetic phrases (2–3 words, lowercase), 4 tone words (Title-case), renderStyle is exactly one of: photographic, illustration, vector. designSystem MUST be one of the exact slugs in the list. No commentary.`;

    const userContent = `Domain: ${domain}
Page title: ${page.title || "(none)"}
Meta description: ${page.description || "(none)"}
Scraped content: ${page.text || "(could not fetch — infer from the brand/domain)"}

DESIGN SYSTEMS (pick the slug whose aesthetic best fits this brand):
${DS_CATALOG}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        temperature: 0.55,
        max_tokens: 900,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);
    const assets = await extractAssets(domain, page.html, target);
    const designSystem = DS_SLUGS.has(parsed.designSystem) ? parsed.designSystem : "clean";
    await recordPaywallUsage(guard.userKey, guard.plan, "scan");
    return NextResponse.json({ brand: { ...parsed, url: domain, logo: assets.logo, images: assets.images, designSystem, fetched } });
  } catch (error: any) {
    console.error("Jdesigns brandbook API error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze brand" }, { status: 500 });
  }
}
