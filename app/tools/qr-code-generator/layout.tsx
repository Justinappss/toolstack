import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator — No Expiry, No Signup | ToolStack",
  description: "Generate high-resolution QR codes for URLs, WiFi, email, and more. Static, direct-encoded with no expiry and no watermark. Free, no signup required.",
  keywords: [
    "qr code generator",
    "free qr code generator",
    "qr code generator no signup",
    "qr code maker",
    "create qr code free",
    "qr code generator download",
    "qr code generator no expiry",
    "wifi qr code generator",
    "qr code no watermark",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/qr-code-generator",
  },
  openGraph: {
    title: "Free QR Code Generator — No Expiry, No Signup | ToolStack",
    description: "Generate high-resolution QR codes for URLs, WiFi, email, and more. Static, no expiry, no watermark.",
    url: "https://toolstack.tech/tools/qr-code-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator — No Expiry, No Signup | ToolStack",
    description: "Generate high-resolution QR codes for URLs, WiFi, email, and more. No expiry, no watermark, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
