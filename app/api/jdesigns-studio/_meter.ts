// Design Studio usage metering — free-trial + per-plan fair-use cost cap.
// Dormant until wired into the generate routes + Whop login lands.
import { createClient } from "@supabase/supabase-js";

export const FREE_GENS = 5;
// only actual ad renders count against the free trial — scan/concepts/ideas are free setup steps
const COUNTS_FREE = new Set(["image", "animate"]);
// weighted cost per operation, in cents (image = 3 variants; animate = Kling)
export const OP_COST_CENTS: Record<string, number> = {
  scan: 2, concepts: 2, ideas: 3, image: 15, animate: 50, brandbook: 3,
};
// monthly fair-use cost caps per plan, in cents
export const PLAN_CAP_CENTS: Record<string, number | null> = {
  free: null,        // free uses a gen-count cap (FREE_GENS), not a cost cap
  starter: 2400,     // $24/mo → ~$4 floor after Whop fee
  power: 8500,       // $85/mo
  own: null,         // BYOK — unlimited, never metered here
};

export type Plan = "free" | "starter" | "power" | "own";
export type Allowance = { allowed: boolean; reason?: "trial_used" | "cap_hit"; plan: Plan; remaining?: number };

function svc() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

function periodStart(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-01`;
}

// read (and lazily reset on new month) the usage row for a user key
async function getRow(userKey: string, plan: Plan) {
  const sb = svc();
  const { data } = await sb.from("ds_usage").select("*").eq("user_key", userKey).maybeSingle();
  const ps = periodStart();
  if (!data) {
    const row = { user_key: userKey, plan, period_start: ps, gens: 0, cost_cents: 0 };
    await sb.from("ds_usage").upsert(row);
    return row;
  }
  if (data.period_start !== ps && plan !== "free") {
    // new month → reset the paid cost window (free trial never resets)
    const row = { user_key: userKey, plan, period_start: ps, gens: data.gens, cost_cents: 0 };
    await sb.from("ds_usage").upsert(row);
    return row;
  }
  return data;
}

export async function checkAllowance(userKey: string, plan: Plan, op: string): Promise<Allowance> {
  if (plan === "own") return { allowed: true, plan };
  const cost = OP_COST_CENTS[op] ?? 5;
  const row = await getRow(userKey, plan);
  if (plan === "free") {
    if (!COUNTS_FREE.has(op)) return { allowed: true, plan, remaining: Math.max(0, FREE_GENS - row.gens) }; // cheap setup step
    const remaining = Math.max(0, FREE_GENS - row.gens);
    return remaining > 0
      ? { allowed: true, plan, remaining }
      : { allowed: false, reason: "trial_used", plan, remaining: 0 };
  }
  const cap = PLAN_CAP_CENTS[plan];
  if (cap == null) return { allowed: true, plan };
  return row.cost_cents + cost <= cap
    ? { allowed: true, plan, remaining: cap - row.cost_cents }
    : { allowed: false, reason: "cap_hit", plan, remaining: 0 };
}

// call AFTER a successful generation to record the spend
export async function recordUsage(userKey: string, plan: Plan, op: string) {
  if (plan === "own") return;
  const cost = OP_COST_CENTS[op] ?? 5;
  const row = await getRow(userKey, plan);
  await svc().from("ds_usage").upsert({
    user_key: userKey, plan,
    period_start: row.period_start,
    gens: row.gens + (COUNTS_FREE.has(op) ? 1 : 0), // only ad renders count toward the free 5
    cost_cents: row.cost_cents + cost,
    updated_at: new Date().toISOString(),
  });
}
