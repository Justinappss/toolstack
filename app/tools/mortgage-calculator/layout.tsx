import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator — Free Monthly Payment Calculator | ToolStack",
  description: "Calculate your monthly mortgage payment, total interest and full amortisation schedule instantly. Supports repayment and interest-only mortgages. 15 countries, no signup.",
  keywords: [
    "mortgage calculator",
    "monthly mortgage payment calculator",
    "mortgage repayment calculator",
    "home loan calculator",
    "mortgage interest calculator",
    "amortisation calculator",
    "interest only mortgage calculator",
    "free mortgage calculator",
    "uk mortgage calculator",
    "mortgage overpayment calculator",
  ],
  alternates: { canonical: "https://toolstack.tech/tools/mortgage-calculator" },
  openGraph: {
    title: "Mortgage Calculator — Free Monthly Payment Calculator | ToolStack",
    description: "Calculate monthly payments, total interest and full amortisation schedule for any mortgage. Free, instant, no signup.",
    url: "https://toolstack.tech/tools/mortgage-calculator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Calculator — Free Monthly Payment Calculator",
    description: "Monthly payments, total interest, and amortisation schedule. Free, instant, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
