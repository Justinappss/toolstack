import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const filename = req.nextUrl.searchParams.get("filename") ?? "thumbnail.jpg";

  if (!url) return new NextResponse("Missing url", { status: 400 });

  // Only allow YouTube thumbnail CDN
  if (!url.startsWith("https://img.youtube.com/vi/")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const res = await fetch(url);
    if (!res.ok) return new NextResponse("Not found", { status: 404 });
    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Failed to fetch thumbnail", { status: 500 });
  }
}
