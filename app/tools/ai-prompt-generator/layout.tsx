import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Prompt Generator — Free ChatGPT, Claude & Gemini Prompts",
  description:
    "Free AI prompt generator for ChatGPT, Claude & Gemini. Use RISEN, Chain-of-Thought & STAR frameworks. Includes strength scoring. No signup required.",
  keywords: [
    "ai prompt generator",
    "chatgpt prompt generator",
    "claude prompt generator",
    "gemini prompt generator",
    "prompt engineering tool",
    "RISEN framework prompts",
    "chain of thought prompting",
    "free prompt generator",
    "best ai prompts",
    "prompt generator no signup",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/ai-prompt-generator",
  },
  openGraph: {
    title: "AI Prompt Generator — Free ChatGPT, Claude & Gemini Prompts",
    description:
      "Generate expert AI prompts using RISEN, Chain-of-Thought, STAR & more. Supports ChatGPT, Claude, Gemini, Perplexity, Grok and Copilot. Free forever.",
    url: "https://toolstack.tech/tools/ai-prompt-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prompt Generator — Free ChatGPT, Claude & Gemini Prompts",
    description:
      "Generate expert AI prompts using RISEN, Chain-of-Thought, STAR & more. Free forever, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
