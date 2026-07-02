// Whop OAuth callback — exchanges the code (via @whop/api SDK), sets the session cookie.
import { NextRequest, NextResponse } from "next/server";
import { exchangeCode, resolvePlan } from "../../_whop";

export const runtime = "nodejs";

const STUDIO_URL = "https://toolstack.tech/tools/jdesigns-studio";
const REDIRECT_URI = process.env.WHOP_REDIRECT_URI || "https://toolstack.tech/api/jdesigns-studio/whop/callback";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const state = searchParams.get("state");
    const savedState = req.cookies.get("whop_state")?.value;

    if (error) return NextResponse.redirect(new URL(`${STUDIO_URL}?auth_error=${error}`));
    if (!code) return NextResponse.redirect(new URL(`${STUDIO_URL}?auth_error=no_code`));
    if (!state || state !== savedState) return NextResponse.redirect(new URL(`${STUDIO_URL}?auth_error=state_mismatch`));

    const token = await exchangeCode(code, REDIRECT_URI);
    if (!token) return NextResponse.redirect(new URL(`${STUDIO_URL}?auth_error=exchange_failed`));

    // resolve plan for a UI-readable indicator (the gate re-verifies server-side anyway)
    const resolved = await resolvePlan(token);
    const plan = resolved?.plan || "free";

    const res = NextResponse.redirect(new URL(STUDIO_URL));
    res.cookies.set("whop_token", token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
    res.cookies.set("whop_plan", plan, { httpOnly: false, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
    res.cookies.delete("whop_state");
    return res;
  } catch (err: any) {
    console.error("[whop] callback error", err);
    return NextResponse.redirect(new URL(`${STUDIO_URL}?auth_error=callback_error`));
  }
}
