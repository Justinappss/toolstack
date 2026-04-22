import { NextRequest, NextResponse } from "next/server";
import tls from "tls";

function checkSSL(hostname: string): Promise<tls.PeerCertificate> {
    return new Promise((resolve, reject) => {
        const socket = tls.connect(
            { host: hostname, port: 443, servername: hostname, rejectUnauthorized: false },
            () => {
                const cert = socket.getPeerCertificate(true);
                socket.destroy();
                if (!cert || !Object.keys(cert).length) {
                    reject(new Error("No certificate returned"));
                } else {
                    resolve(cert);
                }
            }
        );
        socket.setTimeout(10000, () => {
            socket.destroy();
            reject(new Error("Connection timed out after 10 seconds"));
        });
        socket.on("error", (err) => reject(err));
    });
}

function parseSANs(san: string | undefined): string[] {
    if (!san) return [];
    return san
        .split(",")
        .map(s => s.trim().replace(/^DNS:/, "").replace(/^IP Address:/, ""))
        .filter(Boolean);
}

export async function POST(req: NextRequest) {
    try {
        const { domain } = await req.json();
        if (!domain || typeof domain !== "string") {
            return NextResponse.json({ error: "Please enter a domain name" }, { status: 400 });
        }

        // Strip protocol and path
        let hostname = domain.trim().toLowerCase()
            .replace(/^https?:\/\//, "")
            .replace(/\/.*$/, "")
            .replace(/:\d+$/, "");

        if (!hostname) {
            return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
        }

        const cert = await checkSSL(hostname);

        const validFrom = new Date(cert.valid_from);
        const validTo = new Date(cert.valid_to);
        const now = new Date();
        const daysRemaining = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const isValid = now >= validFrom && now <= validTo;
        const totalDays = Math.floor((validTo.getTime() - validFrom.getTime()) / (1000 * 60 * 60 * 24));
        const daysUsed = Math.floor((now.getTime() - validFrom.getTime()) / (1000 * 60 * 60 * 24));
        const percentUsed = Math.min(100, Math.max(0, Math.round((daysUsed / totalDays) * 100)));

        const sans = parseSANs((cert as any).subjectaltname);

        return NextResponse.json({
            domain: hostname,
            isValid,
            daysRemaining,
            percentUsed,
            validFrom: validFrom.toISOString(),
            validTo: validTo.toISOString(),
            subject: {
                cn: cert.subject?.CN ?? hostname,
                org: cert.subject?.O ?? null,
            },
            issuer: {
                cn: cert.issuer?.CN ?? "Unknown",
                org: cert.issuer?.O ?? null,
            },
            sans: sans.slice(0, 20),
            fingerprint: cert.fingerprint ?? null,
            bits: (cert as any).bits ?? null,
        });
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "SSL check failed";
        const isNoSsl = msg.includes("ECONNREFUSED") || msg.includes("ENOTFOUND") || msg.includes("timed out");
        return NextResponse.json({
            error: isNoSsl
                ? "Could not connect to the domain. Make sure it exists and has HTTPS enabled."
                : msg,
        }, { status: 500 });
    }
}
