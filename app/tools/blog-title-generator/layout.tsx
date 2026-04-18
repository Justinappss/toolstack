import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Blog Title Generator — AI-Powered Headlines | ToolStack",
  description: "Generate 10 click-worthy blog title variations instantly with GPT-4o. SEO, curiosity, and contrarian frameworks. Free, no signup.",
  keywords: [
    "blog title generator",
    "blog post title generator",
    "headline generator",
    "blog name generator",
    "catchy blog titles",
    "AI title generator",
    "blog post ideas",
    "content title generator",
    "SEO title generator",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/blog-title-generator",
  },
  openGraph: {
    title: "Free Blog Title Generator — AI-Powered Headlines | ToolStack",
    description: "Generate 10 click-worthy blog title variations instantly with GPT-4o. SEO, curiosity, and contrarian frameworks.",
    url: "https://toolstack.tech/tools/blog-title-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Blog Title Generator — AI-Powered Headlines | ToolStack",
    description: "Generate 10 click-worthy blog title variations instantly with GPT-4o. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
