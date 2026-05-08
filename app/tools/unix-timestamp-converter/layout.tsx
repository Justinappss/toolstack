import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Epoch Timestamp Converter — Timestamp to Date",
  description:
    "Free online Unix Epoch Timestamp Converter. Instantly convert timestamps to human-readable dates, or convert dates into seconds and milliseconds.",
  keywords: [
    "unix timestamp converter",
    "epoch converter",
    "timestamp to date",
    "date to timestamp",
    "unix time",
    "epoch time calculator",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/unix-timestamp-converter",
  },
  openGraph: {
    title: "Unix Epoch Timestamp Converter — Timestamp to Date",
    description:
      "Instantly convert timestamps to human-readable dates, or convert dates into seconds and milliseconds.",
    url: "https://toolstack.tech/tools/unix-timestamp-converter",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unix Epoch Timestamp Converter — Timestamp to Date",
    description:
      "Instantly convert timestamps to human-readable dates, or convert dates into seconds and milliseconds.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
