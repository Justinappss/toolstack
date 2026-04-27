import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Lorem Ipsum Generator — Paragraphs, Sentences & HTML | ToolStack",
  description: "Generate placeholder text in paragraphs, sentences, words, or HTML format. Classic Lorem Ipsum or randomised variations. Free, no signup.",
  keywords: [
    "lorem ipsum generator",
    "lorem ipsum",
    "placeholder text generator",
    "dummy text generator",
    "lorem ipsum paragraphs",
    "lorem ipsum HTML",
    "placeholder text",
    "dummy text",
    "lorem ipsum free",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/lorem-ipsum-generator",
  },
  openGraph: {
    title: "Free Lorem Ipsum Generator — Paragraphs, Sentences & HTML | ToolStack",
    description: "Generate placeholder text in paragraphs, sentences, words, or HTML format. Classic Lorem Ipsum or randomised variations. Free, no signup.",
    url: "https://toolstack.tech/tools/lorem-ipsum-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Lorem Ipsum Generator — Paragraphs, Sentences & HTML | ToolStack",
    description: "Generate placeholder text in paragraphs, sentences, words, or HTML format. Classic Lorem Ipsum or randomised variations. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
