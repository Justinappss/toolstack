import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Character Counter — Real-Time Limits for Twitter, LinkedIn & More | ToolStack",
  description: "Count characters, words, and sentences in real time. See character limits for Twitter, LinkedIn, Instagram, and SMS side by side. Free, no signup.",
  keywords: [
    "character counter",
    "character count online",
    "letter counter",
    "character counter with spaces",
    "twitter character counter",
    "instagram character limit",
    "linkedin character limit",
    "word counter",
    "text character counter",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/character-counter",
  },
  openGraph: {
    title: "Free Character Counter — Real-Time Limits for Twitter, LinkedIn & More | ToolStack",
    description: "Count characters, words, and sentences in real time. Character limits for Twitter, LinkedIn, Instagram, and SMS. Free, no signup.",
    url: "https://toolstack.tech/tools/character-counter",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Character Counter — Real-Time Limits for Twitter, LinkedIn & More | ToolStack",
    description: "Real-time character and word counting with platform-specific limits for Twitter, LinkedIn, Instagram, and SMS. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
