---
source_file: "manual"
type: "standard"
community: "Community None"
tags:
  - graphify/standard
  - graphify/MANUAL
  - community/Community_None
  - blog/standard
  - mandatory
created: "2026-05-17"
---

# ToolStack Blog Article Standard — May 2026

This is the locked standard for every ToolStack blog article going forward. Established from the Genspark for Word review and RankSpot review. Nothing overrides this.

## Required Files Per Article

```
app/blog/[slug]/
  page.tsx          ← main article
  layout.tsx        ← schema JSON-LD (BreadcrumbList + Review + VideoObject)
  SidebarToc.tsx    ← "use client" sticky TOC with affiliate CTA
  PlanRecommender.tsx (or PlanFinder.tsx) ← "use client" interactive plan tool

public/blog/[slug]/
  audio-overview.m4a          ← NotebookLM 40-min podcast
  infographic-animated.mp4    ← animated infographic (MP4)
  infographic-features.png    ← core features visual (OG image)
  infographic-vs-[x].png      ← vs competitor comparison visual
  screenshot-[feature].png    ← min 3 real product screenshots
  author-avatar.jpg           ← real headshot
```

## Article Body Order (fixed sequence)

1. Hero section (breadcrumb, badges, H1, opening answer in 50 words, rating box, TL;DR)
2. Two-column grid starts: `gridTemplateColumns: "220px 1fr"`
3. SidebarToc (sticky left column)
4. Main column:
   - AdBlock horizontal
   - **YouTube embed** (16:9 iframe)
   - **Audio overview player** (`<audio controls>`)
   - Executive summary (4 bullets with stats)
   - Section 1: What Is It
   - **Animated infographic** (`<video autoPlay muted loop playsInline>`)
   - Section 2: vs Competitor — **infographic-vs-[x].png** at top
   - Section 3: Features — **infographic-features.png** at top
   - Section 4: Install guide (5 steps with time estimates)
   - AdBlock horizontal
   - Section 5: Pricing (card grid)
   - Section 6: Pros/Cons
   - Section 7: Who It's For / Who Should Skip
   - Section 8: Real User Results / Case Studies
   - Section 9: 7-Day Action Plan
   - Section 10: Future Predictions (3 bullets with dates)
   - **PlanRecommender** interactive tool
   - FAQ accordions (7+)
   - Final verdict box
   - Author bio (real photo, credentials, testing details)
   - Sources section

## Schema in layout.tsx (3 scripts required)

1. BreadcrumbList — Home > Blog > [Article Title]
2. Review — ratingValue, reviewBody, author, itemReviewed (SoftwareApplication with Offer)
3. VideoObject — name, thumbnailUrl, embedUrl, url, uploadDate, duration

## Accent Colors by Category

| Category | Accent |
|----------|--------|
| SEO / Marketing | `#f97316` (orange) |
| Productivity / Writing | `#7c3aed` (purple) |
| Social Media | `#06b6d4` (cyan) |
| Finance / Calculator | `#22c55e` (green) |

Background always `#050505`.

## NotebookLM Workflow

1. Upload article + all research sources
2. Audio Overview → Deep Dive → Longest → English → Download `.m4a`
3. Infographic prompt (Features): "Create a visual infographic titled '[Tool] Core Features'..."
4. Infographic prompt (vs Competitor): "Create a comparison infographic: '[Tool] vs [Competitor]'..."
5. Convert static PNG to MP4 if animated version needed

## Mandatory Links (every article, no exceptions)

- AWeber: `https://www.aweber.com/easy-email.htm?id=502593` — natural body mention
- AdvertsGPT: `https://advertsgpt.com` — author bio or related section
- ToolStack internal links throughout

## Connections

- [[ToolStack Blog]] - `extends` [MANUAL]
- [[Justin Pirrie (Founder)]] - `authored_by` [MANUAL]
- [[BlogPost()]] - `implements` [MANUAL]

#graphify/standard #graphify/MANUAL #blog/standard #mandatory
