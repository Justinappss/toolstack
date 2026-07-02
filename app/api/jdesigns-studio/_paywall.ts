// Shared paywall guard for all Design Studio generate endpoints.
// Identity: whop_token cookie (paid) OR x-device-id header (free trial).
// KILL SWITCH: paywall is OFF unless DS_PAYWALL_ENABLED === "true" — so it can
// deploy fully dormant and be flipped on only after a real login test passes.
import { NextRequest, NextResponse } from "next/server";
import { checkAllowance, recordUsage, FREE_GENS, type Plan } from "./_meter";
import { resolvePlan } from "./_whop";

export type Operation = "scan" | "concepts" | "ideas" | "image" | "animate" | "brandbook";

export type GuardResult =
  | { allowed: true; userKey: string; plan: Plan }
  | { allowed: false; response: NextResponse };

const ENABLED = process.env.DS_PAYWALL_ENABLED === "true";

function deviceId(req: NextRequest): string {
  const h = req.headers.get("x-device-id");
  if (h && /^[a-z0-9]{16,64}$/i.test(h)) return h;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  return `ip:${ip}`;
}

export async function withPaywall(req: NextRequest, op: Operation): Promise<GuardResult> {
  // Kill switch: paywall disabled → everything allowed, nothing metered.
  if (!ENABLED) return { allowed: true, userKey: "disabled", plan: "own" };

  // token lives in an httpOnly cookie (set by the OAuth callback) — read it server-side.
  const token = req.cookies.get("whop_token")?.value;
  let userKey: string;
  let plan: Plan;

  if (token) {
    const r = await resolvePlan(token);
    if (!r) {
      userKey = `device:${deviceId(req)}`;
      plan = "free";
    } else {
      userKey = `whop:${r.userId}`;
      plan = r.plan;
    }
  } else {
    userKey = `device:${deviceId(req)}`;
    plan = "free";
  }

  const a = await checkAllowance(userKey, plan, op);
  if (!a.allowed) {
    const trial = a.reason === "trial_used";
    return {
      allowed: false,
      response: NextResponse.json(
        {
          error: trial
            ? `You've used all ${FREE_GENS} free generations. Log in with Whop to keep creating.`
            : "You've reached this month's fair-use limit. Upgrade to Power, or own the system for unlimited.",
          code: a.reason,
          remaining: 0,
        },
        { status: 402 },
      ),
    };
  }
  return { allowed: true, userKey, plan };
}

export async function recordPaywallUsage(userKey: string, plan: Plan, op: Operation) {
  if (!ENABLED || userKey === "disabled") return;
  await recordUsage(userKey, plan, op);
}
