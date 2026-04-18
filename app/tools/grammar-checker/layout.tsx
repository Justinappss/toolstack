import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Grammar Checker — GPT-4o Powered | ToolStack",
  description: "Check and fix grammar, spelling, and punctuation with GPT-4o. Get clear explanations for every correction. Free, no word limit, no signup required.",
  keywords: [
    "grammar checker",
    "free grammar checker",
    "grammar check online",
    "grammar corrector",
    "spell checker",
    "punctuation checker",
    "AI grammar checker",
    "grammar checker no signup",
    "grammar fixer free",
    "GPT-4o grammar checker",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/grammar-checker",
  },
  openGraph: {
    title: "Free AI Grammar Checker — GPT-4o Powered | ToolStack",
    description: "Check and fix grammar, spelling, and punctuation with GPT-4o. Clear explanations for every correction. No word limit, no signup.",
    url: "https://toolstack.tech/tools/grammar-checker",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Grammar Checker — GPT-4o Powered | ToolStack",
    description: "Check and fix grammar, spelling, and punctuation with GPT-4o. Clear explanations for every correction. No word limit, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
