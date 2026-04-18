import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Code Diff Checker — Compare Files Side by Side | ToolStack",
  description: "Compare two code blocks or text files side-by-side with visual diff highlighting. Runs entirely in your browser — 100% private. Free, no signup.",
  keywords: ["code diff checker", "file diff tool", "compare code online", "text diff checker", "json diff", "diff viewer", "code comparison tool"],
  alternates: {
    canonical: "https://toolstack.tech/tools/code-diff-checker",
  },
  openGraph: {
    title: "Free Code Diff Checker — Compare Files Side by Side | ToolStack",
    description: "Compare two code blocks or text files side-by-side with visual diff highlighting. Runs entirely in your browser. Free, no signup.",
    url: "https://toolstack.tech/tools/code-diff-checker",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Code Diff Checker — Compare Files Side by Side | ToolStack",
    description: "Visual side-by-side code comparison with diff highlighting. Runs in your browser, 100% private.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
