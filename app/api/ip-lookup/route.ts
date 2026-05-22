import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Get real IP from Vercel/proxy headers
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    let ip = forwarded ? forwarded.split(",")[0].trim() : realIp ?? "127.0.0.1";

    // Strip IPv6 prefix if present
    if (ip.startsWith("::ffff:")) ip = ip.slice(7);

    // Fallback for local dev
    if (ip === "127.0.0.1" || ip === "::1") {
        return NextResponse.json({
            ip: "127.0.0.1",
            city: "Localhost",
            region: "Development",
            country_name: "Local",
            country_code: "",
            org: "Local Network",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            latitude: null,
            longitude: null,
            hostname: "localhost",
            is_local: true,
        });
    }

    try {
        const res = await fetch(`https://ipapi.co/${ip}/json/`, {
            headers: { "User-Agent": "toolstack-ip-lookup/1.0" },
            next: { revalidate: 0 },
        });

        if (!res.ok) throw new Error("Geolocation lookup failed");

        const data = await res.json();

        if (data.error) throw new Error(data.reason ?? "Lookup failed");

        return NextResponse.json(formatResponse(data, false));
    } catch (e: unknown) {
        return NextResponse.json({ error: e instanceof Error ? e.message : "Lookup failed" }, { status: 500 });
    }
}

function formatResponse(data: Record<string, unknown>, is_local: boolean) {
    const org = typeof data.org === "string" ? data.org : "";
    const asn = typeof data.asn === "string" ? data.asn : (org.match(/^(AS\d+)/)?.[1] ?? null);
    const orgName = org.replace(/^AS\d+\s*/, "").trim() || null;
    const ip = typeof data.ip === "string" ? data.ip : "";
    const version = ip.includes(":") ? "IPv6" : "IPv4";

    return {
        ip,
        version,
        city: data.city ?? null,
        region: data.region ?? null,
        country_name: data.country_name ?? null,
        country_code: data.country_code ?? null,
        asn,
        org: orgName,
        timezone: data.timezone ?? null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        hostname: data.hostname ?? null,
        currency: data.currency ?? null,
        languages: data.languages ?? null,
        in_eu: data.in_eu ?? false,
        is_local,
    };
}

export async function POST(req: NextRequest) {
    try {
        const { ip: queryIp } = await req.json();
        if (!queryIp || typeof queryIp !== "string") {
            return NextResponse.json({ error: "Invalid IP address" }, { status: 400 });
        }

        const clean = queryIp.trim();
        const res = await fetch(`https://ipapi.co/${clean}/json/`, {
            headers: { "User-Agent": "toolstack-ip-lookup/1.0" },
        });

        if (!res.ok) throw new Error("Geolocation lookup failed");
        const data = await res.json();
        if (data.error) throw new Error(data.reason ?? "Invalid IP or lookup failed");

        return NextResponse.json(formatResponse(data, false));
    } catch (e: unknown) {
        return NextResponse.json({ error: e instanceof Error ? e.message : "Lookup failed" }, { status: 500 });
    }
}
