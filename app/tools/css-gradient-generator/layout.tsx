import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Gradient Generator — Free Linear & Radial Gradients | ToolStack",
  description:
    "Create beautiful CSS gradients with a visual editor. Linear, radial and conic gradients with multi-stop colours. Copy CSS code instantly. Free, no signup.",
  keywords: [
    "CSS gradient generator",
    "CSS gradient maker",
    "linear gradient CSS",
    "radial gradient generator",
    "CSS background gradient",
    "gradient color picker",
    "conic gradient CSS",
    "CSS gradient tool",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/css-gradient-generator",
  },
  openGraph: {
    title: "CSS Gradient Generator — Free Linear & Radial Gradients | ToolStack",
    description:
      "Create beautiful CSS gradients with a visual editor. Linear, radial and conic. Copy CSS instantly. Free, no signup.",
    url: "https://toolstack.tech/tools/css-gradient-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Gradient Generator — Free Linear & Radial Gradients | ToolStack",
    description:
      "Create beautiful CSS gradients with a visual editor. Linear, radial and conic. Copy CSS instantly. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
