import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Generator — PDF, No Watermark, No Signup | ToolStack",
  description: "Create professional invoices instantly and export to PDF. No watermarks, no signup, supports VAT/GST and multiple currencies. Free forever.",
  keywords: [
    "free invoice generator",
    "invoice generator no signup",
    "online invoice maker",
    "invoice template free",
    "invoice generator PDF",
    "create invoice online",
    "vat invoice generator",
    "invoice no watermark",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/invoice-generator",
  },
  openGraph: {
    title: "Free Invoice Generator — PDF, No Watermark, No Signup | ToolStack",
    description: "Create professional invoices instantly and export to PDF. No watermarks, no signup, supports VAT/GST and multiple currencies.",
    url: "https://toolstack.tech/tools/invoice-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator — PDF, No Watermark, No Signup | ToolStack",
    description: "Professional PDF invoices in seconds. No watermarks, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
