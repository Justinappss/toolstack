import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator — Beautify, Minify & Lint Online | ToolStack",
  description: "Format, validate, and minify JSON instantly in your browser. Syntax error highlighting with exact line and character positions. Free, no signup, 100% private.",
  keywords: [
    "json formatter",
    "json beautifier",
    "json validator",
    "json formatter online",
    "json prettifier",
    "format json online free",
    "json minifier",
    "json viewer online",
    "json lint",
    "json formatter free no signup",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/json-formatter",
  },
  openGraph: {
    title: "Free JSON Formatter & Validator — Beautify, Minify & Lint Online | ToolStack",
    description: "Format, validate, and minify JSON instantly in your browser. Syntax error highlighting, tree view, multi-tab support. Free, no signup, 100% private.",
    url: "https://toolstack.tech/tools/json-formatter",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Formatter & Validator — Beautify, Minify & Lint Online | ToolStack",
    description: "Format, validate, and minify JSON instantly in your browser. Syntax error highlighting, tree view, multi-tab support. Free, no signup, 100% private.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
