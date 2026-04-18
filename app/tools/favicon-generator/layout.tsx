import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favicon Generator — Create Free Text & Emoji Icons | ToolStack",
  description:
    "Generate beautiful favicons for your website instantly. Create from text or emojis. Generates standard formats (PNG, ICO, Apple Touch). Free, no signup required.",
  keywords: [
    "favicon generator",
    "free favicon maker",
    "text to favicon",
    "emoji favicon",
    "generate favicon.ico",
    "apple touch icon generator",
    "website icon creator",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/favicon-generator",
  },
  openGraph: {
    title: "Favicon Generator — Create Free Text & Emoji Icons | ToolStack",
    description:
      "Generate beautiful favicons for your website instantly. Create from text or emojis. Generates perfectly sized standard formats.",
    url: "https://toolstack.tech/tools/favicon-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favicon Generator — Create Free Text & Emoji Icons | ToolStack",
    description:
      "Generate perfectly sized favicons (PNG, ICO, Apple Touch) for your website in seconds.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
