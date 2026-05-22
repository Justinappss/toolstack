---
title: "What Is a UUID? Format, Versions & When to Use One"
description: UUID stands for Universally Unique Identifier. Learn how UUIDs are formatted, the difference between v1, v3, v4, and v5, when to use UUID vs auto-increment, and how to generate one instantly.
url: "https://toolstack.tech/blog/what-is-a-uuid"
last_updated: 2026-05-10
author: Justin Pirrie
site: ToolStack — Free AI & Utility Tools (toolstack.tech)
---

# What Is a UUID? Format, Versions & When to Use One

UUID stands for Universally Unique Identifier. Learn how UUIDs are formatted, the difference between v1, v3, v4, and v5, when to use UUID vs auto-increment, and how to generate one instantly.

**Published:** 2026-05-10  
**Author:** Justin Pirrie, Founder of ToolStack  
**URL:** https://toolstack.tech/blog/what-is-a-uuid  
**Free:** Yes — no signup required

## UUID Format Explained

## UUID v1 vs v3 vs v4 vs v5

## UUID vs Auto-Increment IDs

## How to Generate a UUID

## Frequently Asked Questions

**Q: What is a UUID?**

UUID stands for Universally Unique Identifier. It's a 128-bit label used to uniquely identify information in computer systems. UUIDs are standardised in RFC 4122. They're also sometimes called GUIDs (Globally Unique Identifiers), especially in Microsoft ecosystems — the two terms describe the same format.

---

**Q: Can two UUIDs ever be the same?**

A version 4 UUID has 122 bits of randomness, giving 2^122 (approximately 5.3 × 10^36) possible values. The probability of generating two identical UUIDs is so low it's considered negligible in practice — you'd need to generate about 1 billion UUIDs per second for 86 years to have a 50% chance of a single collision. In real systems, UUID collisions are effectively impossible.

---

**Q: What are the different UUID versions?**

There are five UUID versions: v1 uses the current timestamp plus the machine's MAC address (unique but reveals hardware identity). v2 is similar to v1 but for DCE security and is rarely used. v3 generates a UUID by hashing a namespace and name using MD5 — same inputs always produce the same UUID. v4 is randomly generated with no meaningful data embedded — this is the most common version for general use. v5 is like v3 but uses SHA-1 instead of MD5.

---

**Q: When should I use UUID instead of auto-increment IDs?**

Use UUID when: you generate IDs in multiple databases or services and need them to be globally unique without coordination; you don't want to expose sequential IDs to users (which reveals record counts and makes scraping trivial); you need to create an ID before inserting into the database (useful for distributed systems). Use auto-increment when: simplicity is the priority, you're building a simple single-database app, performance is critical (UUID primary keys make B-tree indexes less efficient), and sequential ordering by ID is useful.

---

**Q: How do I generate a UUID in code?**

In Node.js: `import { randomUUID } from 'node:crypto'; const id = randomUUID();` — available natively since Node 14.17. In Python: `import uuid; id = str(uuid.uuid4())`. In Go: use the google/uuid package. In SQL (PostgreSQL): `SELECT gen_random_uuid()`. In the browser (no install required): use ToolStack's free UUID Generator at toolstack.tech/tools/uuid-generator.

---


---

*Read the full article at https://toolstack.tech/blog/what-is-a-uuid*
