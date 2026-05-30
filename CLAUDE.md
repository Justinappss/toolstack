@AGENTS.md

## Pre-Deploy SOP Gate (mandatory — never skip)

Before every `git push` for a new tool or blog, run the SOP checker:

```bash
# For a new tool:
node scripts/sop-check.js tool <slug>

# For a new blog:
node scripts/sop-check.js blog <slug>
```

**DO NOT push if any check fails.** Fix all failures first, then re-run until you see "ALL CHECKS PASSED".

The SOP files are at:
- `.agent/skills/alpha-systems/toolstack/SOP-NEW-TOOL.md` — new tools
- `.agent/skills/alpha-systems/toolstack/SOP-BLOG.md` — blog posts

Read the relevant SOP **before writing a single line of code or content**.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- ALWAYS read graphify-out/GRAPH_REPORT.md before reading any source files, running grep/glob searches, or answering codebase questions. The graph is your primary map of the codebase.
- IF graphify-out/wiki/index.md EXISTS, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
