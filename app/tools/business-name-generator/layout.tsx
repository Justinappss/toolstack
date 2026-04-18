import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Business Name Generator — 100% Free Brand Naming Tool | No Signup",
  description: "Generate premium, memorable business names with AI. Get brand meanings, domain availability checks, and trademark search links instantly. 100% free, no signup required.",
  keywords: [
    "business name generator",
    "ai business name generator",
    "startup name generator",
    "company name ideas",
    "brand name generator",
    "free business name tool",
    "brand identity generator",
    "naming ideas for business"
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/business-name-generator",
  },
  openGraph: {
    title: "AI Business Name Generator — 100% Free Brand Naming Tool",
    description: "Generate premium, memorable business names with AI. Get brand meanings, domain availability checks, and trademark search links instantly.",
    url: "https://toolstack.tech/tools/business-name-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Business Name Generator — 100% Free Brand Naming Tool",
    description: "Generate premium, memorable business names with AI. Get brand meanings, domain availability checks, and trademark search links instantly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
