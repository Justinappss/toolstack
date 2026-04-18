import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Cover Letter Generator — GPT-4o, 4 Tones | ToolStack",
  description: "Generate a professional cover letter in seconds with GPT-4o. 4 tone modes: Professional, Confident, Creative, and Concise. ATS-friendly, no signup.",
  keywords: [
    "cover letter generator",
    "AI cover letter generator",
    "free cover letter generator",
    "cover letter writer",
    "professional cover letter generator",
    "GPT-4o cover letter",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/cover-letter-generator",
  },
  openGraph: {
    title: "Free AI Cover Letter Generator — GPT-4o, 4 Tones | ToolStack",
    description: "Craft high-conversion cover letters with CoverLetter Pro. 4 industrial tone modes powered by GPT-4o.",
    url: "https://toolstack.tech/tools/cover-letter-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Cover Letter Generator — GPT-4o, 4 Tones | ToolStack",
    description: "High-conversion cover letters with CoverLetter Pro. 4 tone modes, GPT-4o powered.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
