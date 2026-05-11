---
title: What Is a JWT Token? Structure, Claims & How to Decode One
description: JWT tokens are used in almost every modern API for authentication. Learn how they're structured, what the three parts mean, common claims to know, and how to decode one instantly.
url: "https://toolstack.tech/blog/what-is-a-jwt-token"
last_updated: 2026-05-09
author: Justin Pirrie
site: ToolStack — Free AI & Utility Tools (toolstack.tech)
---

# What Is a JWT Token? Structure, Claims & How to Decode One

JWT tokens are used in almost every modern API for authentication. Learn how they're structured, what the three parts mean, common claims to know, and how to decode one instantly.

**Published:** 2026-04-22  
**Author:** Justin Pirrie, Founder of ToolStack  
**URL:** https://toolstack.tech/blog/what-is-a-jwt-token  
**Free:** Yes — no signup required

## Article Contents

## What JWT Stands For

## The Three Parts of a JWT

## Common JWT Claims

## How to Decode a JWT

## How JWT Authentication Works

## JWT Security: What Not to Do

## Frequently Asked Questions

**Q: Is a JWT token secure?**

A JWT is not encrypted by default — the header and payload are just Base64-encoded, meaning anyone who has the token can read its contents. Security comes from the signature: the server verifies the token hasn't been tampered with. Never store sensitive data (passwords, payment info) in a JWT payload. For sensitive data, use encrypted JWTs (JWE) or keep that data server-side.

---

**Q: What's the difference between JWT and a session cookie?**

A session cookie stores a session ID on the server. The server must look up that ID in a database on every request. A JWT is stateless — the token itself contains all the user's claims, and the server verifies the signature without any database lookup. JWTs work better for distributed systems and APIs; session cookies are simpler for traditional web apps.

---

**Q: What does 'exp' mean in a JWT?**

exp is the expiration time claim — a Unix timestamp (seconds since Jan 1, 1970) after which the token is no longer valid. For example, exp: 1745000000 means the token expires at that Unix time. Most JWTs have a short exp (15 minutes to 24 hours) to limit the damage if a token is stolen.

---

**Q: Can I decode a JWT without the secret key?**

Yes. The header and payload of a JWT are only Base64url-encoded, not encrypted. Anyone can decode and read them. You need the secret key only to verify the signature — to confirm the token hasn't been tampered with. The ToolStack JWT Decoder decodes any JWT instantly in your browser without needing the secret.

---

**Q: What happens if a JWT signature is invalid?**

The server should reject the request entirely. An invalid signature means the token was either tampered with, signed with a different key, or forged. A properly implemented API will return a 401 Unauthorized response. Never accept a JWT with a failed signature check.

---


---

*Read the full article at https://toolstack.tech/blog/what-is-a-jwt-token*