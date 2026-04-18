import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free YouTube Tag Generator — SEO Tags & Descriptions | ToolStack",
  description: "Generate optimised YouTube tags and description hooks with GPT-4o. Improve your video's search visibility with relevant, balanced tag sets. Free, no signup.",
  keywords: ["youtube tag generator", "youtube seo tool", "video tags", "youtube metadata", "generate youtube tags", "youtube description generator", "free youtube tags"],
  alternates: {
    canonical: "https://toolstack.tech/tools/youtube-tag-generator",
  },
  openGraph: {
    title: "Free YouTube Tag Generator — SEO Tags & Descriptions | ToolStack",
    description: "Generate optimised YouTube tags and description hooks with GPT-4o. Improve your video's search visibility. Free, no signup.",
    url: "https://toolstack.tech/tools/youtube-tag-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Tag Generator — SEO Tags & Descriptions | ToolStack",
    description: "Generate optimised YouTube tags and description hooks with GPT-4o. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
