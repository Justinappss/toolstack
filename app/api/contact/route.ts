import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const name = (body.name || "").trim();
        const email = (body.email || "").trim();
        const message = (body.message || "").trim();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        if (message.length > 2000) {
            return NextResponse.json({ error: "Message too long" }, { status: 400 });
        }

        console.log(`[CONTACT] From: ${name} <${email}> — "${message.slice(0, 100)}"`);

        const botMessage = `📬 *ToolStack Contact*\n👤 ${name}\n📧 ${email}\n💬 "${message}"`;
        const telegramUrl = `https://api.callmebot.com/text.php?user=@Juspir&text=${encodeURIComponent(botMessage)}`;
        await fetch(telegramUrl);

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
