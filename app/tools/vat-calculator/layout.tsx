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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Free VAT & GST Calculator","item":"https://toolstack.tech/tools/vat-calculator"}]}' }} />
      {children}
    </>
  );
}
