import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown to HTML Converter — Edit & Preview MD Instantly | ToolStack",
  description:
    "Free online Markdown to HTML converter. Write, edit, and preview Markdown files instantly. Export perfectly formatted clean HTML code.",
  keywords: [
    "markdown editor",
    "markdown to html",
    "online markdown preview",
    "md to html converter",
    "markdown compiler",
    "github flavored markdown",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/markdown-editor",
  },
  openGraph: {
    title: "Markdown to HTML Converter — Edit & Preview MD Instantly | ToolStack",
    description:
      "Free online Markdown to HTML converter. Write, edit, and preview Markdown files instantly. Export perfectly formatted clean HTML code.",
    url: "https://toolstack.tech/tools/markdown-editor",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to HTML Converter — Edit & Preview MD Instantly | ToolStack",
    description:
      "Write, edit, and convert your Markdown files to clean HTML code instantly in your browser.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
