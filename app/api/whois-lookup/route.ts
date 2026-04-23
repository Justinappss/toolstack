import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let domain = req.nextUrl.searchParams.get("domain") ?? "";
    if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

    // Clean input — strip protocol, www, path
    domain = domain
        .replace(/^https?:\/\//i, "")
        .replace(/^www\./i, "")
        .split("/")[0]
        .toLowerCase()
        .trim();

    if (!domain || !/^[a-z0-9][a-z0-9\-]*(\.[a-z0-9\-]+)+$/.test(domain)) {
        return NextResponse.json({ error: "Enter a valid domain (e.g. example.com)" }, { status: 400 });
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(`https://rdap.org/domain/${domain}`, {
            headers: { Accept: "application/rdap+json, application/json" },
            signal: controller.signal,
        });
        clearTimeout(timeout);

        if (res.status === 404) {
            return NextResponse.json({ error: "Domain not found — it may not be registered." }, { status: 404 });
        }
        if (!res.ok) {
            return NextResponse.json({ error: `Registry returned ${res.status}. Try again shortly.` }, { status: 502 });
        }

        const contentType = res.headers.get("content-type") ?? "";
        if (!contentType.includes("json")) {
            return NextResponse.json({ error: "Registry returned an unexpected response. This TLD may not support RDAP." }, { status: 502 });
        }

        const data = await res.json();

        // Parse events into a flat map
        const events: Record<string, string> = {};
        if (Array.isArray(data.events)) {
            for (const e of data.events) {
                events[String(e.eventAction).toLowerCase()] = e.eventDate;
            }
        }

        // Parse registrar from entities
        let registrar: string | null = null;
        if (Array.isArray(data.entities)) {
            for (const entity of data.entities) {
                if (Array.isArray(entity.roles) && entity.roles.includes("registrar")) {
                    const vcard = entity.vcardArray?.[1];
                    if (Array.isArray(vcard)) {
                        const fn = (vcard as unknown[][]).find(v => Array.isArray(v) && v[0] === "fn");
                        if (fn) registrar = fn[3] as string;
                    }
                    if (!registrar && Array.isArray(entity.publicIds)) {
                        const iana = (entity.publicIds as { type: string; identifier: string }[])
                            .find(p => p.type === "IANA Registrar ID");
                        if (iana) registrar = `IANA Registrar #${iana.identifier}`;
                    }
                    if (registrar) break;
                }
            }
        }

        // Parse nameservers
        const nameservers: string[] = [];
        if (Array.isArray(data.nameservers)) {
            for (const ns of data.nameservers) {
                if (ns.ldhName) nameservers.push(ns.ldhName.toLowerCase());
            }
        }

        const expiryDate: string | null = events["expiration"] ?? events["expiry"] ?? null;
        const registrationDate: string | null = events["registration"] ?? null;
        const updatedDate: string | null = events["last changed"] ?? null;

        let daysUntilExpiry: number | null = null;
        if (expiryDate) {
            daysUntilExpiry = Math.ceil(
                (new Date(expiryDate).getTime() - Date.now()) / 86_400_000
            );
        }

        return NextResponse.json({
            domain,
            status: Array.isArray(data.status) ? data.status : [],
            registrar,
            registrationDate,
            expiryDate,
            updatedDate,
            nameservers,
            daysUntilExpiry,
        });
    } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
            return NextResponse.json({ error: "Request timed out. The registry may be slow." }, { status: 504 });
        }
        return NextResponse.json({ error: "Lookup failed. Please try again." }, { status: 500 });
    }
}
