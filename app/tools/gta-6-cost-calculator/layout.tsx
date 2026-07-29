import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTA 6 Cost Calculator — What It'll Really Cost You to Play",
  description: "Free GTA 6 cost calculator. GTA 6 launches 19 Nov 2026 on PS5 and Xbox Series X|S only. Work out your true day-one cost — game, console, storage, online sub, minus trade-in. No signup.",
  keywords: ["GTA 6 cost calculator", "how much will GTA 6 cost", "GTA 6 price", "do I need a PS5 for GTA 6", "GTA 6 total cost", "GTA 6 console cost", "GTA 6 Ultimate Edition price", "GTA 6 release date"],
  alternates: {
    canonical: "https://toolstack.tech/tools/gta-6-cost-calculator",
  },
  openGraph: {
    title: "GTA 6 Cost Calculator — What It'll Really Cost You to Play",
    description: "GTA 6 lands 19 Nov 2026 on PS5 and Xbox Series X|S only. Calculate your true day-one cost: game, console, storage, online sub, minus trade-in.",
    url: "https://toolstack.tech/tools/gta-6-cost-calculator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTA 6 Cost Calculator — What It'll Really Cost You to Play",
    description: "GTA 6 lands 19 Nov 2026, consoles only. Work out your real day-one cost. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
