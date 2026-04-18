import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Text Summarizer — GPT-4o, 4 Summary Modes | ToolStack",
  description: "Summarise any text instantly with GPT-4o. Four modes: Paragraph, Bullet Points, Key Takeaways, and Executive Brief. Free, no signup, no length limit.",
  keywords: [
    "text summarizer",
    "free text summarizer",
    "AI summarizer",
    "summarize text online",
    "article summarizer",
    "text summarizer free",
    "AI text summarizer",
    "summarize paragraph",
    "online summarizer",
    "summarizer no signup",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/text-summarizer",
  },
  openGraph: {
    title: "Free AI Text Summarizer — GPT-4o, 4 Summary Modes | ToolStack",
    description: "Illuminate the core of any document with SummaLens AI. Advanced GPT-4o powered text summarization with 4 specialized modes.",
    url: "https://toolstack.tech/tools/text-summarizer",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Text Summarizer — GPT-4o, 4 Summary Modes | ToolStack",
    description: "Illuminate the core of any document with SummaLens AI. Advanced GPT-4o powered text summarization with 4 specialized modes.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
