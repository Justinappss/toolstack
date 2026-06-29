import { NextRequest, NextResponse } from "next/server";

// Same-origin proxy for images (generated ads + scraped brand assets) so the client
// <canvas> can read them without cross-origin tainting. SSRF guard: https only,
// private/internal hosts blocked, and only image content is passed through.
export const runtime = "nodejs";

// block loopback, private ranges, link-local, and bare/internal hostnames
const BLOCKED_HOST = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|0\.|::1?$|\[::|metadata\.|.*\.internal$|.*\.local$)/i;

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  let host: string;
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") throw new Error();
    host = u.hostname;
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }
  if (!host || BLOCKED_HOST.test(host)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 9000);
  let res: Response;
  try {
    res = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "User-Agent": "Mozilla/5.0 (compatible; ToolStackBot/1.0)" } });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
  } finally {
    clearTimeout(t);
  }
  if (!res.ok) return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
  const type = res.headers.get("content-type") || "image/webp";
  // allow images plus icon/octet-stream (favicon services often mislabel .ico)
  const ok = type.startsWith("image/") || /icon|octet-stream/i.test(type);
  if (!ok) return NextResponse.json({ error: "Not an image" }, { status: 415 });
  const buf = await res.arrayBuffer();
  return new NextResponse(buf, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
