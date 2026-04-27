import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favicon Generator — Create Free Text & Emoji Icons | ToolStack",
  description:
    "Generate perfectly sized favicons for your website instantly. Create from text or emojis. Downloads a ZIP with all standard PNG formats — favicon, Apple Touch Icon, and PWA icons. Free, no signup.",
  keywords: [
    "favicon generator",
    "free favicon maker",
    "text to favicon",
    "emoji favicon",
    "favicon png generator",
    "apple touch icon generator",
    "website icon creator",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/favicon-generator",
  },
  openGraph: {
    title: "Favicon Generator — Create Free Text & Emoji Icons | ToolStack",
    description:
      "Generate perfectly sized favicons from text or emojis. Downloads a ZIP with all standard PNG formats — favicon, Apple Touch Icon, and PWA icons. Free, no signup.",
    url: "https://toolstack.tech/tools/favicon-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favicon Generator — Create Free Text & Emoji Icons | ToolStack",
    description:
      "Generate favicons from text or emojis. Downloads a ZIP with favicon, Apple Touch Icon, and PWA PNG formats. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
