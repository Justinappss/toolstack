import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Email Subject Line Tester — Spam Score & Open Rate Analysis | ToolStack",
  description: "Score your email subject lines for open rate potential, spam triggers, and length. Get AI-suggested alternatives. Free, no signup.",
  keywords: [
    "email subject line tester",
    "email subject line scorer",
    "email open rate checker",
    "spam trigger word checker",
    "email subject line analyser",
    "best email subject lines",
    "email subject line generator",
    "power words for email subject lines",
    "email marketing tools",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/email-subject-line-tester",
  },
  openGraph: {
    title: "Free Email Subject Line Tester — Spam Score & Open Rate Analysis | ToolStack",
    description: "Score your email subject lines for spam triggers, open rate potential, and length. Get AI-rewritten alternatives. Free, no signup.",
    url: "https://toolstack.tech/tools/email-subject-line-tester",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Email Subject Line Tester — Spam Score & Open Rate Analysis | ToolStack",
    description: "Score your email subject lines for spam triggers, open rate potential, and length. AI alternatives included. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
