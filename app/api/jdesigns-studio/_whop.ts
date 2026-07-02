// Whop integration via the official @whop/api SDK (OAuth + access checks).
// Env: WHOP_CLIENT_ID (app_...), WHOP_APP_API_KEY (rotated apik_...).
import { WhopServerSdk } from "@whop/api";
import type { Plan } from "./_meter";

const APP_ID = process.env.WHOP_CLIENT_ID || "";
const APP_API_KEY = process.env.WHOP_APP_API_KEY || "";

function sdk() {
  return WhopServerSdk({ appId: APP_ID, appApiKey: APP_API_KEY });
}

// Access passes (Whop products) → internal tier, checked in priority order.
// Studio Pass is one product (Starter $29 + Power $99 plans) → treated as "power" cap for now.
const ACCESS_PASSES: Array<[string, Plan]> = [
  ["prod_EH6iWxTArcjYE", "own"],    // Done-For-You Campaign Manager ($1k)
  ["prod_LpfQ0gWijddbm", "power"],  // Studio Pass (Starter/Power)
];

/** Build the Whop login URL. Returns { url, state } — store state in a cookie for CSRF. */
export function getLoginUrl(redirectUri: string): { url: string; state: string } {
  return sdk().oauth.getAuthorizationUrl({ redirectUri, scope: ["read_user"] });
}

/** Exchange the OAuth code for an access token. Returns the token or null. */
export async function exchangeCode(code: string, redirectUri: string): Promise<string | null> {
  try {
    const res = await sdk().oauth.exchangeCode({ code, redirectUri });
    if (!res.ok) {
      console.error("[whop] exchangeCode failed", (res as any).code);
      return null;
    }
    return res.tokens.access_token;
  } catch (e) {
    console.error("[whop] exchangeCode error", e);
    return null;
  }
}

/** Resolve the logged-in user's id + plan from their OAuth access token. */
export async function resolvePlan(accessToken: string): Promise<{ userId: string; plan: Plan } | null> {
  try {
    // 1) who is this? (OIDC userinfo → sub)
    const ui = await fetch("https://api.whop.com/oauth/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!ui.ok) { console.error("[whop] userinfo failed", ui.status); return null; }
    const u = await ui.json();
    const userId = u?.sub || u?.id || "";
    if (!userId) { console.error("[whop] userinfo no sub", JSON.stringify(u).slice(0, 200)); return null; }

    // 2) which pass do they hold? (app-key SDK, priority order)
    const client = sdk();
    for (const [accessPassId, tier] of ACCESS_PASSES) {
      const r = await client.access.checkIfUserHasAccessToAccessPass({ accessPassId, userId });
      console.log("[whop] access", accessPassId, JSON.stringify(r));
      if (r?.hasAccess) return { userId, plan: tier };
    }
    return { userId, plan: "free" }; // logged in, no active paid pass
  } catch (e) {
    console.error("[whop] resolvePlan error", e);
    return null;
  }
}
