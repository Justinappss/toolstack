import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const REQUESTS_FILE = path.join(process.cwd(), "tool-requests.json");

function readRequests(): Array<{ query: string; timestamp: string; id: string }> {
    try {
        if (fs.existsSync(REQUESTS_FILE)) {
            return JSON.parse(fs.readFileSync(REQUESTS_FILE, "utf-8"));
        }
    } catch { /* empty */ }
    return [];
}

function writeRequests(data: Array<{ query: string; timestamp: string; id: string }>) {
    try {
        fs.writeFileSync(REQUESTS_FILE, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("[tool-requests] Failed to write:", e);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const query = (body.query || "").trim();
        if (!query || query.length > 500) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const entry = {
            query,
            timestamp: new Date().toISOString(),
            id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        };

        // Log to console (visible in Vercel logs)
        console.log(`[TOOL REQUEST] "${query}" at ${entry.timestamp} — id: ${entry.id}`);

        // Write to local file (works in dev, may not persist on serverless)
        const existing = readRequests();
        existing.push(entry);
        writeRequests(existing);

        // Telegram Push Notification
        try {
            const botMessage = `🚨 *ToolStack Lead* 🚨\nSomeone requested a new tool:\n💬 "${query}"`;
            const telegramUrl = `https://api.callmebot.com/text.php?user=@Juspir&text=${encodeURIComponent(botMessage)}`;
            
            // We MUST await this on Vercel, otherwise the serverless function 
            // exits instantly and kills the request mid-flight.
            await fetch(telegramUrl);
        } catch (e) {
            console.error("Failed to trigger Telegram notification:", e);
        }

        return NextResponse.json({ success: true, id: entry.id });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET() {
    const requests = readRequests();
    return NextResponse.json({ requests, count: requests.length });
}
