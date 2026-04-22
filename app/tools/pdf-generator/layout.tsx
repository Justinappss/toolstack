import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Generator — Create & Download PDF Files Free",
  description: "Type or paste your text, choose font, page size and orientation, then download a clean PDF instantly. No watermarks, no signup, 100% private — runs in your browser.",
  keywords: [
    "PDF generator",
    "text to PDF",
    "create PDF online",
    "make PDF free",
    "PDF creator online",
    "convert text to PDF",
    "online PDF maker",
    "free PDF generator",
    "download PDF",
    "PDF writer online",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/pdf-generator",
  },
  openGraph: {
    title: "PDF Generator — Create & Download PDF Files Free",
    description: "Type or paste text, choose font and page size, download a clean PDF. No watermarks, no signup, 100% private.",
    url: "https://toolstack.tech/tools/pdf-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Generator — Create & Download PDF Files Free",
    description: "Create and download clean PDFs instantly. No watermarks, no signup, runs in your browser.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
