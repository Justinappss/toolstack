import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Down Checker — Is It Down For Everyone Or Just Me?",
  description: "Check if any website is down or just you. See the HTTP status code, response time, and server availability in seconds. Free, no signup required.",
  keywords: [
    "website down checker",
    "is it down for everyone or just me",
    "is it down",
    "site down checker",
    "website status checker",
    "HTTP status code checker",
    "server down checker",
    "check if website is down",
    "is the website down",
    "website uptime checker",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/website-down-checker",
  },
  openGraph: {
    title: "Website Down Checker — Is It Down For Everyone Or Just Me?",
    description: "Check if any website is down or just you. See HTTP status, response time and availability in seconds. Free, no signup.",
    url: "https://toolstack.tech/tools/website-down-checker",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Down Checker — Is It Down For Everyone Or Just Me?",
    description: "Check if any website is down or just you. HTTP status code and response time. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
