import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder — Encode & Decode Strings Instantly | ToolStack",
  description:
    "Free online Base64 encoder and decoder. Convert text to Base64 format or decode Base64 strings back to readable text instantly with 100% privacy.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "text to base64",
    "decode base64",
    "online base64 tool",
    "base64 string converter",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/base64-encoder-decoder",
  },
  openGraph: {
    title: "Base64 Encoder & Decoder — Instantly Convert Strings | ToolStack",
    description:
      "Free online Base64 encoder and decoder. Convert text to Base64 format or decode Base64 strings back to readable text instantly.",
    url: "https://toolstack.tech/tools/base64-encoder-decoder",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder & Decoder — Instantly Convert Strings | ToolStack",
    description:
      "Free online Base64 encoder and decoder. Convert text to Base64 format or decode Base64 strings back to readable text instantly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
