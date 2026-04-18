import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colour Contrast Checker — WCAG Accessibility Tester | ToolStack",
  description:
    "Check your colour combinations against WCAG 2.1 accessibility guidelines. Free, visual contrast checker for AA and AAA compliance. Ensures readable, accessible web design.",
  keywords: [
    "colour contrast checker",
    "color contrast calculator",
    "WCAG accessibility checker",
    "AA and AAA compliance",
    "accessible colors",
    "contrast ratio calculator",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/color-contrast-checker",
  },
  openGraph: {
    title: "Colour Contrast Checker — WCAG Accessibility Tester | ToolStack",
    description:
      "Check your colour combinations against WCAG 2.1 accessibility guidelines. Free, visual contrast checker for AA and AAA compliance.",
    url: "https://toolstack.tech/tools/color-contrast-checker",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colour Contrast Checker — WCAG Accessibility Tester | ToolStack",
    description:
      "Check your colour combinations against WCAG accessibility guidelines in real-time.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
