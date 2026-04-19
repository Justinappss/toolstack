import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator — 6 Free Percentage Calculators | ToolStack",
  description: "Calculate percentages instantly: what is X% of Y, X is what % of Y, percentage increase/decrease, percentage change and more. Free, no signup, works on mobile.",
  keywords: [
    "percentage calculator",
    "percent calculator",
    "what is x percent of y",
    "percentage increase calculator",
    "percentage decrease calculator",
    "percentage change calculator",
    "percentage difference calculator",
    "how to calculate percentage",
    "free percentage calculator",
    "percent of a number calculator",
  ],
  alternates: { canonical: "https://toolstack.tech/tools/percentage-calculator" },
  openGraph: {
    title: "Percentage Calculator — 6 Free Percentage Calculators | ToolStack",
    description: "Six percentage calculators in one: find a percentage, calculate increase/decrease, percentage change, and more. Free and instant.",
    url: "https://toolstack.tech/tools/percentage-calculator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator — 6 Calculators in One",
    description: "Find percentages, calculate changes, increase/decrease — six modes, instant results, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
