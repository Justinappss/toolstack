// Starts the Whop OAuth flow — builds the authorize URL (SDK, handles state) and redirects.
import { NextRequest, NextResponse } from "next/server";
import { getLoginUrl } from "../../_whop";

export const runtime = "nodejs";

const REDIRECT_URI = process.env.WHOP_REDIRECT_URI || "https://toolstack.tech/api/jdesigns-studio/whop/callback";

export async function GET(_req: NextRequest) {
  const { url, state } = getLoginUrl(REDIRECT_URI);
  const res = NextResponse.redirect(url);
  res.cookies.set("whop_state", state, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 600 });
  return res;
}
