import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator — Free Take-Home Pay Calculator | ToolStack",
  description: "Calculate your take-home pay after tax and National Insurance. Full UK PAYE and US Federal calculations. See your monthly and annual net salary instantly. Free, no signup.",
  keywords: [
    "salary calculator",
    "take home pay calculator",
    "net salary calculator",
    "uk salary calculator",
    "income tax calculator",
    "paye calculator",
    "us salary calculator",
    "after tax salary calculator",
    "national insurance calculator",
    "gross to net salary",
  ],
  alternates: { canonical: "https://toolstack.tech/tools/salary-calculator" },
  openGraph: {
    title: "Salary Calculator — Free Take-Home Pay Calculator | ToolStack",
    description: "Calculate your net take-home pay after income tax and NI/social security. UK PAYE and US Federal. Free and instant.",
    url: "https://toolstack.tech/tools/salary-calculator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Calculator — Free Take-Home Pay Calculator",
    description: "Net take-home pay after tax. UK PAYE and US Federal calculations. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
