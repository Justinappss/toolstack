import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free VAT & GST Calculator — 40+ Countries | ToolStack",
  description: "Calculate VAT and GST for 40+ countries. Standard and reduced rates, reverse VAT extraction, and full tax breakdown. Free, no signup.",
  keywords: [
    "vat calculator",
    "gst calculator",
    "tax calculator",
    "vat extraction calculator",
    "professional vat tool",
    "reverse vat calculator",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/vat-calculator",
  },
  openGraph: {
    title: "Free VAT & GST Calculator — 40+ Countries | ToolStack",
    description: "Optimize financial compliance with TaxRefinery Pro. Accurate VAT/GST logic for 40+ countries.",
    url: "https://toolstack.tech/tools/vat-calculator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free VAT & GST Calculator — 40+ Countries | ToolStack",
    description: "Global VAT/GST compliance with TaxRefinery Pro. Accurate, instant financial logic.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
