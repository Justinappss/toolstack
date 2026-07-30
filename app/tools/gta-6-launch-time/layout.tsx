import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTA 6 Launch Time — Countdown In Your Timezone",
  description: "Free GTA 6 launch time countdown. See the expected unlock moment on 19 Nov 2026 in your own timezone, a live countdown, and who gets it first worldwide. Unlock mechanics not yet confirmed by Rockstar.",
  keywords: ["GTA 6 launch time", "GTA 6 countdown", "GTA 6 release time", "when does GTA 6 unlock", "GTA 6 midnight release", "GTA 6 timezone", "GTA 6 unlock time my timezone", "GTA 6 who gets it first"],
  alternates: {
    canonical: "https://toolstack.tech/tools/gta-6-launch-time",
  },
  openGraph: {
    title: "GTA 6 Launch Time — Countdown In Your Timezone",
    description: "GTA 6 releases 19 Nov 2026. See the expected unlock moment in your timezone, a live countdown, and who gets it first — mechanics not yet confirmed by Rockstar.",
    url: "https://toolstack.tech/tools/gta-6-launch-time",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTA 6 Launch Time — Countdown In Your Timezone",
    description: "GTA 6 releases 19 Nov 2026. See the expected unlock time in your timezone and a live countdown. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
