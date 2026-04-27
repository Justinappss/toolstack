import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PSA vs BGS vs SGC vs CGC — Free Grading Comparison 2026",
  description: "Compare PSA, BGS, SGC and CGC on fees, turnaround times and resale value. Free grading comparison tool — find the best company for your card in seconds.",
  keywords: [
    "PSA vs BGS",
    "PSA vs SGC",
    "PSA vs CGC 2026",
    "card grading company comparison",
    "best card grading company 2026",
    "PSA BGS SGC fees",
    "grading company comparison tool",
    "which card grader is best",
    "PSA vs Beckett grading",
    "card grading fees 2026",
  ],
  alternates: { canonical: "https://toolstack.tech/tools/grading-company-comparison" },
  openGraph: {
    title: "PSA vs BGS vs SGC vs CGC — Free Grading Comparison 2026",
    description: "Compare all 4 major card grading companies on fees, speed and resale value. Free interactive tool.",
    url: "https://toolstack.tech/tools/grading-company-comparison",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PSA vs BGS vs SGC vs CGC Comparison 2026",
    description: "Compare card grading companies on fees, turnaround and resale value. Free tool.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
