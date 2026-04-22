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

        return NextResponse.json({
            ip: data.ip,
            city: data.city,
            region: data.region,
            country_name: data.country_name,
            country_code: data.country_code,
            org: data.org,
            timezone: data.timezone,
            latitude: data.latitude,
            longitude: data.longitude,
            hostname: data.hostname ?? null,
            currency: data.currency,
            languages: data.languages,
            is_local: false,
        });
    } catch (e: unknown) {
        return NextResponse.json({ error: e instanceof Error ? e.message : "Lookup failed" }, { status: 500 });
    }
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

        return NextResponse.json({
            ip: data.ip,
            city: data.city,
            region: data.region,
            country_name: data.country_name,
            country_code: data.country_code,
            org: data.org,
            timezone: data.timezone,
            latitude: data.latitude,
            longitude: data.longitude,
            hostname: data.hostname ?? null,
            currency: data.currency,
            languages: data.languages,
            is_local: false,
        });
    } catch (e: unknown) {
        return NextResponse.json({ error: e instanceof Error ? e.message : "Lookup failed" }, { status: 500 });
    }
}
