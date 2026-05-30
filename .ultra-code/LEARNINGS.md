# LEARNINGS — Append Only

## L-001 — 2026-05-30 — Read the SOP before touching a single file
Both the UCL tool and the AWeber blog needed post-deploy fixes because the SOP checklist was not run upfront.
The SOP has 20+ checklist items. Skipping even 3 costs a re-deploy and user-visible errors.
**Next time:** open SOP-NEW-TOOL.md or SOP-BLOG.md as the first action, before writing any code or content.

## L-002 — 2026-05-30 — "Medium" means Medium.com, not complexity level
User said "i have medium open lets do that" and the intent was to write on Medium.com — not to choose a medium-difficulty approach.
**Next time:** when a user names a platform (Medium, Reddit, X), treat it as a destination, not an adjective.

## L-003 — 2026-05-30 — Homepage LIVE_TOOLS is a separate hardcoded list
The /tools page pulls from tool-data.ts. The homepage does NOT — it has its own LIVE_TOOLS array in app/page.tsx.
Adding to tool-data.ts alone does not make a tool appear on the homepage.
**Next time:** always update app/page.tsx LIVE_TOOLS as a separate explicit step.
