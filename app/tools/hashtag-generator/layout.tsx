import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hashtag Generator — Free AI Hashtag Tool for Instagram, TikTok & More",
  description: "Generate AI-powered hashtag sets for Instagram, TikTok, LinkedIn, X and YouTube. Three-tier mix of popular, growing and niche hashtags — free, no signup.",
  keywords: [
    "hashtag generator",
    "free hashtag generator",
    "instagram hashtag generator",
    "tiktok hashtag generator",
    "linkedin hashtags",
    "hashtag finder",
    "best hashtags for instagram",
    "social media hashtags",
    "hashtag tool online",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/hashtag-generator",
  },
  openGraph: {
    title: "Hashtag Generator — Free AI Hashtag Tool for Instagram, TikTok & More",
    description: "Generate AI-powered hashtag sets for Instagram, TikTok, LinkedIn, X and YouTube. Three-tier mix of popular, growing and niche hashtags.",
    url: "https://toolstack.tech/tools/hashtag-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hashtag Generator — Free AI Hashtag Tool for Instagram, TikTok & More",
    description: "Generate AI-powered hashtag sets for Instagram, TikTok, LinkedIn, X and YouTube. Three-tier mix of popular, growing and niche hashtags.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
