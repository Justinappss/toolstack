# TENSIONS — Honesty Log

## T-001 — SOP not read before building
Both recent releases (UCL tool, AWeber blog) had post-deploy fixes because the SOP was not fully checked before pushing.
The SOP files exist at `.agent/skills/alpha-systems/toolstack/SOP-NEW-TOOL.md` and `SOP-BLOG.md` but are not enforced — they rely on the agent remembering to check them.
**Unresolved:** no automated gate exists yet.

## T-002 — Homepage image placeholder
UCL Final tool uses `/tools/ai-prompt-generator-preview.png` as its homepage card image — a placeholder from another tool. Not the right image but not broken. Low priority but wrong.

## T-003 — Lighthouse not run on UCL tool
Step 10 of SOP-NEW-TOOL.md requires Lighthouse 100/100/100 before marking done. Not run yet on the UCL tool.
