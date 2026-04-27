import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Paraphrasing Tool — 6 Rewriting Modes, GPT-4o | ToolStack",
  description: "Rephrase and rewrite text in 6 modes: Standard, Fluency, Formal, Academic, Creative, and Shorten. Powered by GPT-4o. Free, no signup.",
  keywords: [
    "paraphrasing tool",
    "paraphrase online",
    "free paraphrasing tool",
    "reword text online",
    "text rewriter",
    "article rewriter",
    "paraphrase generator",
    "ai paraphraser",
    "sentence rewriter",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/paraphrasing-tool",
  },
  openGraph: {
    title: "Free AI Paraphrasing Tool — 6 Rewriting Modes, GPT-4o | ToolStack",
    description: "Rephrase and rewrite text in 6 modes: Standard, Fluency, Formal, Academic, Creative, and Shorten. Powered by GPT-4o. Free, no signup.",
    url: "https://toolstack.tech/tools/paraphrasing-tool",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Paraphrasing Tool — 6 Rewriting Modes, GPT-4o | ToolStack",
    description: "Rephrase and rewrite text in 6 modes: Standard, Fluency, Formal, Academic, Creative, and Shorten. Powered by GPT-4o. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
