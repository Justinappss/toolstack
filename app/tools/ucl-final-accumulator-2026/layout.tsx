import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UCL Final 2026 Accumulator Calculator — PSG vs Arsenal",
  description: "Free Champions League final accumulator calculator. PSG vs Arsenal, 30 May 2026. Enter your odds, see combined return, profit and implied probability instantly. No signup.",
  keywords: ["UCL final accumulator", "Champions League final calculator", "PSG vs Arsenal accumulator", "UCL final acca", "Champions League 2026 odds calculator", "football accumulator calculator"],
  alternates: {
    canonical: "https://toolstack.tech/tools/ucl-final-accumulator-2026",
  },
  openGraph: {
    title: "UCL Final 2026 Accumulator Calculator — PSG vs Arsenal",
    description: "Free Champions League final accumulator calculator. PSG vs Arsenal, 30 May 2026. Enter your odds, see combined return, profit and implied probability instantly. No signup.",
    url: "https://toolstack.tech/tools/ucl-final-accumulator-2026",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UCL Final 2026 Accumulator Calculator — PSG vs Arsenal",
    description: "Free Champions League final accumulator calculator. PSG vs Arsenal, 30 May 2026. No signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
