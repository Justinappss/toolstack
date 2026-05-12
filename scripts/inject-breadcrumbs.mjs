#!/usr/bin/env node
/**
 * inject-breadcrumbs.mjs
 *
 * Injects BreadcrumbList JSON-LD into every tool layout.tsx and creates
 * layout.tsx files for every blog post directory.
 *
 * Usage: node scripts/inject-breadcrumbs.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'app/tools');
const BLOG_DIR  = path.join(ROOT, 'app/blog');

function makeBreadcrumb(items) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

let toolCount = 0, blogCount = 0;
const errors = [];

// ── Tool layouts ─────────────────────────────────────────────────────────────

const toolDirs = fs.readdirSync(TOOLS_DIR).filter(s => {
  const p = path.join(TOOLS_DIR, s);
  return fs.statSync(p).isDirectory();
});

for (const slug of toolDirs) {
  // Find the layout.tsx — may be at the slug root or inside a nested subdir
  let layoutPath = path.join(TOOLS_DIR, slug, 'layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    const sub = fs.readdirSync(path.join(TOOLS_DIR, slug)).find(f =>
      fs.existsSync(path.join(TOOLS_DIR, slug, f, 'layout.tsx'))
    );
    if (sub) layoutPath = path.join(TOOLS_DIR, slug, sub, 'layout.tsx');
    else continue;
  }

  let content = fs.readFileSync(layoutPath, 'utf8');

  // Skip if breadcrumb already present
  if (content.includes('BreadcrumbList')) {
    console.log(`  – tools/${slug} (already has breadcrumb)`);
    continue;
  }

  // Extract clean tool name from first title field
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  if (!titleMatch) {
    errors.push(`tools/${slug}: no title found`);
    continue;
  }
  const cleanName = titleMatch[1].split('|')[0].split('—')[0].trim();

  const breadcrumbJson = makeBreadcrumb([
    { name: 'Home',    url: 'https://toolstack.tech' },
    { name: 'Tools',   url: 'https://toolstack.tech/tools' },
    { name: cleanName, url: `https://toolstack.tech/tools/${slug}` },
  ]);

  // Replace the passthrough Layout function (handles all whitespace variants)
  const oldLayout = /export default function Layout\(\{ children \}: \{ children: React\.ReactNode \}\) \{\s*return <>\{children\}<\/>;?\s*\}/s;
  if (!oldLayout.test(content)) {
    errors.push(`tools/${slug}: Layout function pattern not matched`);
    continue;
  }

  const newLayout = `export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '${breadcrumbJson.replace(/'/g, "\\'")}' }} />
      {children}
    </>
  );
}`;

  content = content.replace(oldLayout, newLayout);
  fs.writeFileSync(layoutPath, content, 'utf8');
  console.log(`  ✓ tools/${slug}`);
  toolCount++;
}

// ── Blog layouts ──────────────────────────────────────────────────────────────

for (const slug of fs.readdirSync(BLOG_DIR)) {
  const postDir = path.join(BLOG_DIR, slug);
  if (!fs.statSync(postDir).isDirectory()) continue;

  const pagePath   = path.join(postDir, 'page.tsx');
  const layoutPath = path.join(postDir, 'layout.tsx');

  if (!fs.existsSync(pagePath)) continue;
  if (fs.existsSync(layoutPath)) {
    // Check if breadcrumb already injected
    const existing = fs.readFileSync(layoutPath, 'utf8');
    if (existing.includes('BreadcrumbList')) {
      console.log(`  – blog/${slug} (already has breadcrumb)`);
      continue;
    }
  }

  const pageContent = fs.readFileSync(pagePath, 'utf8');

  // Extract title from metadata (handles single or double quotes, and multi-line)
  const titleMatch = pageContent.match(/title:\s*["']([^"']+)["']/);
  if (!titleMatch) {
    errors.push(`blog/${slug}: no title found`);
    continue;
  }
  const title = titleMatch[1];

  const breadcrumbJson = makeBreadcrumb([
    { name: 'Home',  url: 'https://toolstack.tech' },
    { name: 'Blog',  url: 'https://toolstack.tech/blog' },
    { name: title,   url: `https://toolstack.tech/blog/${slug}` },
  ]);

  const layoutContent = `export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '${breadcrumbJson.replace(/'/g, "\\'")}' }} />
      {children}
    </>
  );
}
`;

  fs.writeFileSync(layoutPath, layoutContent, 'utf8');
  console.log(`  ✓ blog/${slug}`);
  blogCount++;
}

console.log(`\n✅  BreadcrumbList injected: ${toolCount} tool layouts + ${blogCount} blog layouts`);
if (errors.length) {
  console.log(`\n⚠   ${errors.length} error(s):`);
  errors.forEach(e => console.log(`    - ${e}`));
}
