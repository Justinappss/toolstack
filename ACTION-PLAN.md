# ToolStack SEO Action Plan
**Generated:** 2026-05-09  
**Current Score:** 79/100 (up from 64/100)  
**Target:** 88/100

---

## CRITICAL — Fix Immediately

*None. All critical indexing blockers resolved.*

---

## HIGH — Fix Within 1 Week

### 1. Fix Category Page Brand Suffix (On-Page SEO)
**Impact:** Medium | **Effort:** 30 min
All 16 category pages show "Free Dev Tools" in browser tab/SERP — no "| ToolStack" brand.
Root cause: Next.js template not cascading through nested layout chain.
**Fix:** In `app/tools/category/[category]/layout.tsx`, change:
```
title: `Free ${activeCategory} Tools`,
```
to:
```
title: `Free ${activeCategory} Tools | ToolStack`,
```

### 2. Add Article Schema to Blog Posts (Schema)
**Impact:** Medium | **Effort:** 1 hour
19 blog posts have no structured data. Article schema enables rich results.
**Fix:** Create `components/ui/ArticleSchema.tsx` (similar to FaqPageSchema.tsx) and add to `app/blog/layout.tsx` or each post's layout.

### 3. Add Author Attribution to Blog Posts (Content E-E-A-T)
**Impact:** High | **Effort:** 2 hours
Google's E-E-A-T guidance requires visible authorship. Add "Written by Justin Pirrie" with a short bio to all blog posts.
**Fix:** Add author block component to blog post layout template.

---

## MEDIUM — Fix Within 1 Month

### 4. Create About/Founder Page (Content E-E-A-T)
**Impact:** High | **Effort:** 2 hours
No /about page exists. This reduces trust signals significantly for a utility site. Include: founder story, expertise, site mission.

### 5. Increase Blog Post Word Count (Content Quality)
**Impact:** High | **Effort:** Ongoing
Average ~945 words per post. Competitive tool-related keywords need 1,500-2,500 words. Expand each post with more examples, FAQs, and comparisons.

### 6. Fix ToolSchemaInjector to Be Server-Side (Schema)
**Impact:** Medium | **Effort:** 2 hours
Currently `ToolSchemaInjector` uses `usePathname()` (client-side). Move schema injection to server-rendered layout using `params` instead, so Googlebot sees it on first crawl without JS execution.

### 7. Add Inter-Blog Cross-Links (On-Page SEO)
**Impact:** Medium | **Effort:** 1 hour
Blog posts reference tools but don't link to related posts. Add 2-3 "Related articles" links per post to improve crawl depth and topical authority.

### 8. Expand Category Page Content (Content Quality)
**Impact:** Medium | **Effort:** 4 hours
Category pages currently show only tool cards. Add a 100-150 word editorial intro per category explaining what the tools are and who they're for. This gives Google more indexable content per category URL.

---

## LOW — Backlog

### 9. Backlink Acquisition Campaign
**Impact:** Very High (long-term) | **Effort:** Ongoing
CommonCrawl shows 0 referring domains. Priority targets:
- r/webdev, r/programming, r/Entrepreneur posts (already done: r/SideProject)
- Hacker News Show HN post
- Tool directories: AlternativeTo, Product Hunt, Futurepedia, There's An AI For That
- Guest posts on developer/marketing blogs

### 10. llms-full.txt (AI Search Readiness)
**Impact:** Low-Medium | **Effort:** 1 hour
Create `/public/llms-full.txt` with full page content for each tool. Improves AI citation quality for ChatGPT Browse, Perplexity, Claude.

### 11. CSP Header (Technical SEO)
**Impact:** Low | **Effort:** 4 hours
Content-Security-Policy header is missing. Complex to implement with Google Ads/Analytics but would improve security score.

### 12. WebP Audit for All Pages (Images)
**Impact:** Low | **Effort:** 1 hour
Verify all `<img>` tags use Next.js `<Image>` component for automatic WebP conversion. Pages using raw `<img>` tags miss this optimization.

---

## Score Projection If All HIGH Items Fixed

| Fix | Score Impact |
|-----|-------------|
| Category brand suffix | +1 (On-Page) |
| Article schema on blog | +2 (Schema) |
| Author attribution | +3 (Content E-E-A-T) |
| **Estimated new score** | **~85/100** |
