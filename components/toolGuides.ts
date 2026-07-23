// Tool -> related blog guide(s) map. Powers the "Related Guides" internal-linking
// block rendered by <MoreTools/> on each tool page. Keeps authority flowing
// between a tool and the article(s) that explain it (topical clusters).
export type Guide = { slug: string; title: string };

export const TOOL_GUIDES: Record<string, Guide[]> = {
  "password-generator": [
    { slug: "password-generator-guide", title: "Best Free Password Generator 2026: Create Strong Passwords Instantly" },
  ],
  "utm-builder": [
    { slug: "utm-builder-guide", title: "The Complete UTM Builder Guide (With Examples)" },
    { slug: "what-are-utm-parameters", title: "What Are UTM Parameters? A Plain-English Guide" },
  ],
  "qr-code-generator": [
    { slug: "how-to-generate-qr-code-wifi", title: "How to Generate a QR Code for Your WiFi (No App Needed)" },
  ],
  "meta-description-generator": [
    { slug: "free-meta-description-generator", title: "Free Meta Description Generator: Stop Google Rewriting Your Snippets" },
    { slug: "perfect-meta-description-anatomy", title: "The Anatomy of a Perfect Meta Description (With Examples)" },
  ],
  "cover-letter-generator": [
    { slug: "cover-letter-generator-guide", title: "How to Write a Cover Letter That Gets Interviews" },
    { slug: "how-to-tailor-cover-letter-to-job-description", title: "How to Tailor Your Cover Letter to the Job Description" },
  ],
  "email-subject-line-tester": [
    { slug: "email-subject-line-tester-guide", title: "Email Subject Lines That Get Opened: The Complete Guide" },
    { slug: "how-to-write-cold-email-subject-lines", title: "How to Write Cold Email Subject Lines That Actually Get Opened" },
  ],
  "hashtag-generator": [
    { slug: "hashtag-generator-guide", title: "How to Use Hashtags for Reach: The Complete Guide" },
  ],
  "ai-prompt-generator": [
    { slug: "ai-prompt-generator-guide", title: "Prompt Engineering: A Complete Guide to Writing Better AI Prompts" },
  ],
  "json-formatter": [
    { slug: "json-formatting-guide-for-developers", title: "JSON Formatting Guide for Developers: Syntax, Validation & Errors" },
    { slug: "mastering-json-visual-guide", title: "JSON for Beginners: A Visual Guide to Formatting & Validation" },
  ],
  "jwt-decoder": [
    { slug: "what-is-a-jwt-token", title: "What Is a JWT Token? Structure, Claims & How to Decode One" },
  ],
  "uuid-generator": [
    { slug: "what-is-a-uuid", title: "What Is a UUID? Format, Versions & When to Use One" },
  ],
  "base64-encoder-decoder": [
    { slug: "what-is-base64-encoding", title: "What Is Base64 Encoding and When Should You Use It?" },
  ],
  "ip-address-lookup": [
    { slug: "what-is-my-ip-address", title: "What Is My IP Address and What Can It Reveal?" },
    { slug: "how-to-use-ip-address-lookup", title: "How to Use an IP Address Lookup Tool" },
  ],
  "ssl-checker": [
    { slug: "ssl-certificate-checker-guide", title: "SSL Certificate Explained: What It Is, How to Check It & When It Expires" },
  ],
  "website-down-checker": [
    { slug: "is-it-down-or-just-me", title: "Is It Down or Just Me? How to Check if a Website Is Down" },
  ],
  "word-counter": [
    { slug: "word-count-checker-guide", title: "Word Count Checker Guide: Limits, Readability & Reading Time" },
  ],
  "character-counter": [
    { slug: "word-count-checker-guide", title: "Word Count Checker Guide: Limits, Readability & Reading Time" },
  ],
  "case-converter": [
    { slug: "understanding-case-sensitivity", title: "camelCase vs snake_case vs PascalCase: When to Use Each" },
  ],
  "regex-tester": [
    { slug: "regex-cheat-sheet-beginners", title: "Regex Cheat Sheet for Beginners: The Patterns You Actually Use" },
  ],
  "pdf-generator": [
    { slug: "how-to-create-pdf-free", title: "How to Create a PDF for Free — No Word, No Adobe Required" },
  ],
  "compound-interest-calculator": [
    { slug: "how-a-compound-interest-calculator-works-plain-english", title: "How Does a Compound Interest Calculator Work? (Plain English)" },
  ],
  "salary-calculator": [
    { slug: "salary-after-tax-uk-us-2025", title: "Salary After Tax 2025: UK vs US — What You Actually Take Home" },
  ],
  "youtube-transcript": [
    { slug: "free-youtube-transcript-extractor-no-signup-no-limits", title: "Free YouTube Transcript Extractor — No Signup, No Limits" },
  ],
  "blog-title-generator": [
    { slug: "blog-title-generator", title: "SEO Blog Title Generator: Write Titles That Rank and Get Clicked" },
  ],
  "pokemon-tcg-pocket-pull-calculator": [
    { slug: "pokemon-tcg-pocket-pull-rates", title: "Pokémon TCG Pocket Pull Rates Explained" },
  ],
};
