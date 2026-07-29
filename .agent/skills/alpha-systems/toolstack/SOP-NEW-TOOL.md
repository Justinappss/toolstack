# SOP — NEW TOOL

Reconstructed 2026-07-30 from `scripts/sop-check.js` plus a working reference tool, after the original was found missing. `CLAUDE.md` requires reading this before writing any code.

**Gate:** `node scripts/sop-check.js tool <slug>` must print **ALL CHECKS PASSED (20)**. Do not push otherwise.

**Reference implementations:** `app/tools/gta-6-cost-calculator/` (newest, event-driven calculator) and `app/tools/ucl-final-accumulator-2026/`.

---

## 1. Two files in `app/tools/<slug>/`

### `layout.tsx` — metadata only

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "...",
  description: "...",          // ~155 chars, lead with the benefit
  keywords: [...],             // 6-8 real search phrases
  alternates: { canonical: "https://toolstack.tech/tools/<slug>" },
  openGraph: { title, description, url, siteName: "ToolStack", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

Checked for: `export const metadata`, `canonical`, `openGraph`.

### `page.tsx` — the tool

Must contain, or the gate fails:

- `"use client"` on line 1 (double quotes — the check is literal)
- `import { MoreTools } from "@/components/MoreTools";` and `<MoreTools currentSlug="<slug>" />`
- `import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";` and `<AdvertiseGPTBanner />`
- One JSON-LD `<script type="application/ld+json">` with an `@graph` containing **`WebApplication`**, **`BreadcrumbList`** and **`FAQPage`**
- A breadcrumb `<nav>`: `ToolStack › <Category> › <Tool name>`

### House style (match it — don't invent a new look)

Inline styles throughout, no CSS modules. Page shell:

```tsx
<div style={{ minHeight: "100vh", background: "#080810", color: "white",
              fontFamily: "'Inter', -apple-system, sans-serif" }}>
```

Then: two fixed radial-gradient ambient glows → content wrapper `maxWidth: 860, padding: "72px 20px 100px"` → breadcrumb → hero (pill badges, `clamp(28px, 5vw, 46px)` 900-weight h1 with a gradient-clipped second half, 17px muted lede) → tool card → context card → FAQ card → `MoreTools` → `AdvertiseGPTBanner`.

Declare `cardStyle` / `labelStyle` / `inputStyle` once as `React.CSSProperties` and reuse. Use `fontVariantNumeric: "tabular-nums"` on any figure that updates live. Put `whiteSpace: "nowrap"` on input prefix chips (`$`, `−$`) or they wrap onto two lines.

---

## 2. Thumbnail component

`components/<PascalSlug>Thumbnail.tsx`, exporting a named function. Client component, `framer-motion`, cycles 2-4 scenarios on a `setInterval` (~2800ms) so the card animates in the tool grid.

**Filename rule (this is what the gate actually tests):** the check splits the slug on `-`, drops a trailing `-<digits>` group, keeps words longer than 2 characters, and requires the lowercased filename to contain *every* remaining word. For `gta-6-cost-calculator` the words are `gta`, `cost`, `calculator` → `Gta6CostCalculatorThumbnail.tsx` satisfies it.

---

## 3. Register in seven places

| # | File | What to add |
|---|------|-------------|
| 1 | `app/tools/tool-data.ts` | Entry in `ALL_TOOLS`: `{ title, desc, href, category, accent, accentRgb, badge, icon }` |
| 2 | `app/page.tsx` | Entry in `LIVE_TOOLS` — **rich format** with `accent`/`accentRgb`, plus an `image` |
| 3 | `components/Footer.tsx` | `{ label, href }` in the tools list |
| 4 | `components/MoreTools.tsx` | `{ slug, name, desc, icon, color, bg, border, badge }` |
| 5 | `components/ToolSearch.tsx` | `import` the thumbnail **and** add `"<Tool title>": <Thumbnail>` to the map (keyed by title, not slug) |
| 6 | `app/sitemap.ts` | Slug string in the tools array |
| 7 | `public/llms.txt` | Two lines: a `- [Title](url): desc` listing **and** a `- <url>/index.md` line |

**New category?** Add it to `CATEGORIES` *and* `CATEGORY_MAP` in `tool-data.ts`. The `app/tools/category/[category]` route generates from those, so the category page appears automatically.

---

## 4. Verify before pushing

```bash
node scripts/sop-check.js tool <slug>          # must be 20/20

npx tsc --noEmit -p tsconfig.json 2>&1 | grep "<slug>"   # must be empty
# NOTE: the repo has pre-existing TS errors elsewhere (10015-alternative,
# several blog pages, jdesigns-studio, next.config, app/page.tsx LIVE_TOOLS
# union). Filter to your own files; do not try to fix those here.

npx next dev -p 3577                            # then:
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3577/tools/<slug>   # 200
```

Screenshot the route with headless Chrome and actually look at it — the gate cannot catch layout bugs.

Deploy: `git push main` → Vercel ~2.5 min. New routes 404 until the build finishes.

---

## 5. Legal guardrail for third-party-brand tools

When a tool references someone else's product (a game, a platform, a console):

- Reference the name in plain text only. **No** logos, brand fonts, artwork, characters, map imagery or trade dress.
- Build an original palette that evokes the subject without copying it.
- Add a disclaimer: not affiliated with / endorsed by the rights holder, name used for identification only.
- Never state a price, spec or date you have not verified — cite the confirmed figure and make estimates user-editable.

This matters doubly while AdSense approval is pending: an IP complaint is a fast rejection.
