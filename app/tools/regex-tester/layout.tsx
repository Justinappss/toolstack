import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester — Test Regular Expressions Online | ToolStack",
  description:
    "Free online Regex Tester. Instantly test and debug regular expressions against strings with real-time visual highlighting and match details.",
  keywords: [
    "regex tester",
    "regular expression tester",
    "online regex checker",
    "test regex",
    "regex match highligher",
    "javascript regex tester",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/regex-tester",
  },
  openGraph: {
    title: "Regex Tester — Test Regular Expressions Online | ToolStack",
    description:
      "Instantly test and debug regular expressions against strings with real-time visual highlighting and match details.",
    url: "https://toolstack.tech/tools/regex-tester",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Tester — Test Regular Expressions Online | ToolStack",
    description:
      "Instantly test and debug regular expressions against strings with real-time visual highlighting and match details.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
