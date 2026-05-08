import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Word Counter & Readability Checker — Flesch Score",
  description: "Count words, characters, sentences, and paragraphs in real time. Get a Flesch readability score and estimated reading time. Free, no signup.",
  keywords: [
    "word counter",
    "word counter online",
    "character counter",
    "readability score",
    "reading time calculator",
    "word count tool",
    "flesch reading ease",
    "keyword density checker",
    "sentence counter",
    "free word counter",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/word-counter",
  },
  openGraph: {
    title: "Free Word Counter & Readability Checker — Flesch Score",
    description: "Count words, characters, sentences, and paragraphs in real time. Get a Flesch readability score and estimated reading time.",
    url: "https://toolstack.tech/tools/word-counter",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Word Counter & Readability Checker — Flesch Score",
    description: "Real-time word count, character count, readability score, and reading time. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
