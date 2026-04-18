import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Signature Generator — Free HTML Signatures | ToolStack",
  description:
    "Create professional email signatures for Gmail, Outlook & Apple Mail. 4 templates, custom colors, social links. Free, no signup, instant HTML copy.",
  keywords: [
    "email signature generator",
    "free email signature",
    "HTML email signature",
    "Gmail signature generator",
    "Outlook signature generator",
    "professional email signature",
    "email signature template",
    "email signature maker",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/email-signature-generator",
  },
  openGraph: {
    title: "Email Signature Generator — Free HTML Signatures | ToolStack",
    description:
      "Create professional email signatures for Gmail, Outlook & Apple Mail. 4 templates, custom colors, social links. Free, no signup.",
    url: "https://toolstack.tech/tools/email-signature-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Signature Generator — Free HTML Signatures | ToolStack",
    description:
      "Create professional email signatures for Gmail, Outlook & Apple Mail. 4 templates, custom colors, social links. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
