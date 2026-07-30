import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTA 6 Edition Comparison — Standard vs Ultimate Edition",
  description: "GTA 6 Standard ($79.99/£69.99) vs Ultimate ($99.99/£89.99): full feature comparison, the honest £20/$20 verdict, and why the Vice City Pack isn't Ultimate-exclusive. Free, no signup.",
  keywords: ["GTA 6 Standard vs Ultimate", "GTA 6 edition comparison", "is GTA 6 Ultimate Edition worth it", "GTA 6 Vice City Pack", "GTA 6 pre-order bonus", "GTA 6 editions explained", "GTA 6 Ultimate Edition contents", "GTA 6 Standard Edition price"],
  alternates: {
    canonical: "https://toolstack.tech/tools/gta-6-edition-comparison",
  },
  openGraph: {
    title: "GTA 6 Edition Comparison — Standard vs Ultimate Edition",
    description: "Side-by-side GTA 6 Standard vs Ultimate comparison, plus the honest verdict on whether the extra $20/£20 is worth it and why the Vice City Pack isn't Ultimate-only.",
    url: "https://toolstack.tech/tools/gta-6-edition-comparison",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTA 6 Edition Comparison — Standard vs Ultimate Edition",
    description: "Standard vs Ultimate, feature by feature, plus the honest £20/$20 verdict. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
