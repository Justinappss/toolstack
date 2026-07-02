-- Design Studio usage metering table. Run once in Supabase → SQL Editor.
create table if not exists ds_usage (
  user_key    text primary key,             -- whop user id (paid) or device id (free trial)
  plan        text not null default 'free',  -- free | starter | power | own
  period_start date not null default (date_trunc('month', now())::date),
  gens        int  not null default 0,       -- lifetime gens (free trial caps on this)
  cost_cents  int  not null default 0,       -- spend this period (paid caps on this)
  updated_at  timestamptz default now()
);

-- writes happen server-side with the service_role key, so lock the table down to the public.
alter table ds_usage enable row level security;
-- (no public policies = anon/browser cannot read or write; only service_role bypasses RLS)
