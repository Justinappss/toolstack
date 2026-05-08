import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free VAT & GST Calculator — 40+ Countries",
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
    title: "Free VAT & GST Calculator — 40+ Countries",
    description: "Add or remove VAT for 40+ countries instantly. Standard and reduced rates pre-loaded, invoice calculator included. Free, no signup.",
    url: "https://toolstack.tech/tools/vat-calculator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free VAT & GST Calculator — 40+ Countries",
    description: "Add or remove VAT for 40+ countries instantly. Standard and reduced rates, invoice calculator. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
