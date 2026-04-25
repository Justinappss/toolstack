import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Stopwatch — Free Timer with Laps & Countdown",
  description: "Free online stopwatch with lap times, countdown timer, and keyboard shortcuts. Runs in your browser — no download, no signup. Accurate to the millisecond.",
  keywords: [
    "online stopwatch",
    "stopwatch online",
    "free online stopwatch",
    "online timer",
    "countdown timer online",
    "stopwatch with laps",
    "online countdown",
    "timer online free",
    "lap timer online",
    "interval timer online",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/online-stopwatch",
  },
  openGraph: {
    title: "Online Stopwatch — Free Timer with Laps & Countdown",
    description: "Free online stopwatch with lap times, countdown timer and keyboard shortcuts. No download, no signup.",
    url: "https://toolstack.tech/tools/online-stopwatch",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Stopwatch — Free Timer with Laps & Countdown",
    description: "Free online stopwatch with lap times and countdown timer. No download, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
