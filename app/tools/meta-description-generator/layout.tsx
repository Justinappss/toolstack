import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Meta Description Generator — Google SERP Preview | ToolStack",
  description: "Generate high-CTR meta descriptions with GPT-4o. Live Google SERP preview shows exactly how your snippet appears in search results. Free, no signup.",
  keywords: [
    "meta description generator",
    "free meta description generator",
    "ai meta description generator",
    "seo meta description tool",
    "google serp preview tool",
    "meta description character counter",
    "meta description examples",
    "seo description writer",
    "meta tag generator",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/meta-description-generator",
  },
  openGraph: {
    title: "Free AI Meta Description Generator — Google SERP Preview | ToolStack",
    description: "Generate high-CTR meta descriptions with SnippetPro AI. Live Google SERP previews, industrial-grade scoring, and AI-powered authority generation.",
    url: "https://toolstack.tech/tools/meta-description-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Meta Description Generator — Google SERP Preview | ToolStack",
    description: "Generate high-CTR meta descriptions with SnippetPro AI. Live Google SERP previews, industrial-grade scoring, and AI-powered authority generation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
