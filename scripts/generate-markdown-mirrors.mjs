#!/usr/bin/env node
/**
 * generate-markdown-mirrors.mjs
 *
 * Generates clean AI-readable markdown mirrors for every blog post and tool page.
 * Output: public/blog/[slug]/index.md  +  public/tools/[slug]/index.md
 * Mirrors are served at toolstack.tech/blog/[slug]/index.md via vercel.json headers.
 *
 * Usage:  node scripts/generate-markdown-mirrors.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT    = path.resolve(__dirname, '..');
const PUBLIC  = path.join(ROOT, 'public');
const TODAY   = new Date().toISOString().split('T')[0];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Return first capture from first matching regex, or fallback. */
function grab(content, fallback, ...patterns) {
  for (const re of patterns) {
    const m = content.match(re);
    if (m?.[1]) return m[1].trim();
  }
  return fallback;
}

/**
 * Extract FAQs from a TSX file.
 * Handles both { question: "...", answer: "..." } and { q: "...", a: "..." }.
 * Returns an array of { q, a } objects.
 */
function extractFaqs(content) {
  // Find the FAQS block — stop at ];  (handles both inline and multiline)
  const blockMatch = content.match(/const FAQS\s*=\s*\[([\s\S]*?)\];/);
  if (!blockMatch) return [];
  const block = blockMatch[1];

  const questions = [];
  const answers   = [];

  // question: "..."  OR  q: "..."
  const qRe = /(?:question|(?<!\w)q):\s*"((?:[^"\\]|\\.)*)"/g;
  // answer: "..."    OR  a: "..."
  const aRe = /(?:answer|(?<!\w)a):\s*"((?:[^"\\]|\\.)*)"/g;

  let m;
  while ((m = qRe.exec(block)) !== null) questions.push(unescape(m[1]));
  while ((m = aRe.exec(block)) !== null) answers.push(unescape(m[1]));

  const count = Math.min(questions.length, answers.length);
  return Array.from({ length: count }, (_, i) => ({ q: questions[i], a: answers[i] }));
}

/** Decode common HTML/JSX escapes in extracted strings. */
function unescape(s) {
  return s
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\\"/g, '"')
    .replace(/\\n/g, ' ')
    .replace(/\\t/g, ' ');
}

// Headings that are navigation/chrome, not article content
const SKIP_HEADINGS = new Set([
  'frequently asked questions', 'related articles', 'back to blog',
  'explore developer tools', 'more tools', 'faq',
]);

/**
 * Extract h2/h3 heading text from JSX content.
 * Strips inline style props and nested elements, returns clean strings.
 */
function extractHeadings(content) {
  const headings = [];
  // Match <h2 ...>text</h2> — text may span one line only
  const re = /<h([23])[^>]*>\s*([^<\n{][^<\n]*?)\s*<\/h\1>/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const level = parseInt(m[1], 10);
    const text  = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length > 3 && !SKIP_HEADINGS.has(text.toLowerCase())) {
      headings.push({ level, text });
    }
  }
  return headings;
}

/** Build the YAML frontmatter block. */
function frontmatter(fields) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fields)) {
    const str = String(v);
    // Quote values containing colons so YAML parsers don't choke
    const safe = str.includes(':') ? `"${str.replace(/"/g, '\\"')}"` : str;
    lines.push(`${k}: ${safe}`);
  }
  lines.push('---');
  return lines.join('\n');
}

// ─── Blog post mirror ─────────────────────────────────────────────────────────

function buildBlogMirror(slug, pagePath) {
  const content = fs.readFileSync(pagePath, 'utf8');

  const title = grab(content, slug,
    /title:\s*"([^"]+)"/,
    /headline:\s*"([^"]+)"/,
  );
  const description = grab(content, '',
    /description:\s*"([^"]+)"/,
  );
  const url = grab(content, `https://toolstack.tech/blog/${slug}`,
    /canonical:\s*"(https:\/\/toolstack\.tech\/[^"]+)"/,
  );
  const datePublished = grab(content, TODAY,
    /datePublished[=:]\s*"([0-9]{4}-[0-9]{2}-[0-9]{2})"/,
  );

  const faqs     = extractFaqs(content);
  const headings = extractHeadings(content);

  const fm = frontmatter({
    title,
    description,
    url,
    last_updated: TODAY,
    author: 'Justin Pirrie',
    site: 'ToolStack — Free AI & Utility Tools (toolstack.tech)',
  });

  const lines = [fm, '', `# ${title}`, '', description, '',
    `**Published:** ${datePublished}  `,
    `**Author:** Justin Pirrie, Founder of ToolStack  `,
    `**URL:** ${url}  `,
    `**Free:** Yes — no signup required`,
    '',
  ];

  if (headings.length > 0) {
    lines.push('## Article Contents', '');
    for (const h of headings) {
      lines.push(`${'#'.repeat(h.level)} ${h.text}`, '');
    }
  }

  if (faqs.length > 0) {
    lines.push('## Frequently Asked Questions', '');
    for (const faq of faqs) {
      lines.push(`**Q: ${faq.q}**`, '', faq.a, '', '---', '');
    }
  }

  lines.push('', `---`, '', `*Read the full article at ${url}*`);
  return lines.join('\n');
}

// ─── Tool page mirror ─────────────────────────────────────────────────────────

function buildToolMirror(slug, toolDir) {
  const pagePath   = path.join(toolDir, 'page.tsx');
  const layoutPath = path.join(toolDir, 'layout.tsx');

  if (!fs.existsSync(pagePath)) return null;

  const pageContent   = fs.readFileSync(pagePath, 'utf8');
  const layoutContent = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf8') : '';
  const combined      = layoutContent + '\n' + pageContent;

  // Metadata may live in layout.tsx (generateMetadata) or page.tsx
  const title = grab(combined, slug,
    /title:\s*'([^']+)'/,
    /title:\s*"([^"]+)"/,
  );
  // Strip template suffix like " | ToolStack"
  const cleanTitle = title.split('|')[0].split('—')[0].trim();

  const description = grab(combined, '',
    /description:\s*'([^']+)'/,
    /description:\s*"([^"]+)"/,
  );
  const url = grab(combined, `https://toolstack.tech/tools/${slug}`,
    /canonical:\s*'(https:\/\/toolstack\.tech\/[^']+)'/,
    /canonical:\s*"(https:\/\/toolstack\.tech\/[^"]+)"/,
  );

  const faqs = extractFaqs(pageContent);

  const fm = frontmatter({
    title: cleanTitle,
    description,
    url,
    last_updated: TODAY,
    author: 'Justin Pirrie',
    site: 'ToolStack — Free AI & Utility Tools (toolstack.tech)',
  });

  const lines = [fm, '', `# ${cleanTitle}`, '', description, '',
    `**URL:** ${url}  `,
    `**Free:** Yes — no signup, no account, no limits  `,
    `**Runs:** 100% in your browser — no data sent to any server  `,
    `**Author:** Justin Pirrie, Founder of ToolStack`,
    '',
  ];

  if (faqs.length > 0) {
    lines.push('## Frequently Asked Questions', '');
    for (const faq of faqs) {
      lines.push(`**Q: ${faq.q}**`, '', faq.a, '', '---', '');
    }
  }

  lines.push('', `---`, '', `*Use this tool free at ${url}*`);
  return lines.join('\n');
}

// ─── Main ────────────────────────────────────────────────────────────────────

let blogCount = 0, toolCount = 0;
const errors = [];

// Blog posts
const blogAppDir = path.join(ROOT, 'app/blog');
for (const slug of fs.readdirSync(blogAppDir)) {
  const pagePath = path.join(blogAppDir, slug, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;

  try {
    const md     = buildBlogMirror(slug, pagePath);
    const outDir = path.join(PUBLIC, 'blog', slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.md'), md, 'utf8');
    console.log(`  ✓ blog/${slug}`);
    blogCount++;
  } catch (e) {
    errors.push(`blog/${slug}: ${e.message}`);
    console.log(`  ✗ blog/${slug}: ${e.message}`);
  }
}

// Tool pages
const toolsAppDir = path.join(ROOT, 'app/tools');
for (const slug of fs.readdirSync(toolsAppDir)) {
  const toolDir = path.join(toolsAppDir, slug);
  if (!fs.statSync(toolDir).isDirectory()) continue;

  // Handle nested dirs like sql-formatter/[[...dialect]]/
  let resolvedDir = toolDir;
  if (!fs.existsSync(path.join(toolDir, 'page.tsx'))) {
    const sub = fs.readdirSync(toolDir).find(f =>
      fs.existsSync(path.join(toolDir, f, 'page.tsx'))
    );
    if (sub) resolvedDir = path.join(toolDir, sub);
    else continue;
  }

  try {
    const md = buildToolMirror(slug, resolvedDir);
    if (!md) continue;
    const outDir = path.join(PUBLIC, 'tools', slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.md'), md, 'utf8');
    console.log(`  ✓ tools/${slug}`);
    toolCount++;
  } catch (e) {
    errors.push(`tools/${slug}: ${e.message}`);
    console.log(`  ✗ tools/${slug}: ${e.message}`);
  }
}

console.log(`\n✅  ${blogCount} blog mirrors + ${toolCount} tool mirrors generated`);
if (errors.length) {
  console.log(`\n⚠   ${errors.length} error(s):`);
  errors.forEach(e => console.log(`    - ${e}`));
}

// Emit a summary of all mirror URLs (used to update llms.txt)
const isDir = (base, name) => fs.statSync(path.join(base, name)).isDirectory();
const blogBase  = path.join(PUBLIC, 'blog');
const toolsBase = path.join(PUBLIC, 'tools');
const allMirrors = [
  ...fs.readdirSync(blogBase).filter(s => isDir(blogBase, s)).map(s => `https://toolstack.tech/blog/${s}/index.md`),
  ...fs.readdirSync(toolsBase).filter(s => isDir(toolsBase, s)).map(s => `https://toolstack.tech/tools/${s}/index.md`),
];

fs.writeFileSync(path.join(ROOT, 'scripts/.mirror-urls.json'), JSON.stringify(allMirrors, null, 2));
console.log(`\n📋  Mirror URL list saved to scripts/.mirror-urls.json`);
