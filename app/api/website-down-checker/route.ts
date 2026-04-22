import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { url } = await req.json();
        if (!url?.trim()) {
            return NextResponse.json({ error: "URL is required." }, { status: 400 });
        }

        // Normalise URL
        let normalised = url.trim();
        if (!/^https?:\/\//i.test(normalised)) {
            normalised = "https://" + normalised;
        }

        let parsedUrl: URL;
        try {
            parsedUrl = new URL(normalised);
        } catch {
            return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
        }

        const start = Date.now();
        let status: number | null = null;
        let isUp = false;
        let statusText = "";
        let responseTime: number | null = null;

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);

            const response = await fetch(parsedUrl.toString(), {
                method: "HEAD",
                signal: controller.signal,
                redirect: "follow",
            });

            clearTimeout(timeout);
            responseTime = Date.now() - start;
            status = response.status;
            statusText = response.statusText || "";
            isUp = response.status < 500;
        } catch (err: unknown) {
            responseTime = Date.now() - start;
            if (err instanceof Error && err.name === "AbortError") {
                statusText = "Request timed out";
            } else {
                statusText = "Connection refused or DNS error";
            }
            isUp = false;
            status = null;
        }

        return NextResponse.json({
            url: parsedUrl.toString(),
            host: parsedUrl.hostname,
            isUp,
            status,
            statusText,
            responseTime,
            checkedAt: new Date().toISOString(),
        });
    } catch (err) {
        console.error("website-down-checker error:", err);
        return NextResponse.json({ error: "Failed to check website. Please try again." }, { status: 500 });
    }
}
